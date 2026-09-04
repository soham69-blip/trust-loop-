import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Bar, Btn, EmptyState, Field, PageHead, Panel, Pill, Stat, inputClass } from "@/components/tl";
import { downloadJSON } from "@/lib/export";
import {
  DECISION_LABEL,
  REVIEWERS,
  RISK_CLASS_LABEL,
  type Decision,
  type Priority,
  type RiskClass,
} from "@/lib/demo-data";
import { useTrustLoop } from "@/lib/trustloop-store";
import { decisionTone, evidenceTone, money, pct, priorityTone, riskTone, shortDate } from "@/lib/ui-maps";

export const Route = createFileRoute("/case/$caseId")({
  head: ({ params }) => {
    const title = `Investigation ${params.caseId} | TrustLoop`;
    const description =
      "Trust passport, four-stream evidence fusion and deterministic drivers behind a flagged return.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CasePage,
});

function CasePage() {
  const { caseId } = Route.useParams();
  const navigate = useNavigate();
  const { cases, clusters, audit, decideCase, assignCase, claimCase, setPriority, officer } =
    useTrustLoop();

  const record = cases.find((c) => c.id === caseId);
  const [note, setNote] = useState("");
  const [riskClass, setRiskClass] = useState<RiskClass | "">("");
  const [stageForTraining, setStageForTraining] = useState(true);

  const caseAudit = useMemo(
    () => audit.filter((a) => a.target === caseId).slice(0, 12),
    [audit, caseId],
  );

  if (!record) {
    return (
      <AppShell>
        <main className="flex-1">
          <PageHead
            eyebrow="Investigation"
            title="Case not found"
            description="No demo case matches this identifier."
          />
          <div className="px-6 py-5">
            <EmptyState
              icon="search_off"
              title={`No case ${caseId}`}
              detail="It may have been reset. Open the returns ledger to pick another case."
            />
            <div className="mt-4">
              <Btn variant="primary" icon="arrow_back" onClick={() => navigate({ to: "/returns" })}>
                Back to all returns
              </Btn>
            </div>
          </div>
        </main>
      </AppShell>
    );
  }

  const cluster = clusters.find((c) => c.id === record.clusterId);

  const decide = (decision: Decision) => {
    decideCase(record.id, decision, {
      ...(note.trim() ? { note: note.trim() } : {}),
      ...(riskClass ? { riskClass } : {}),
      stageForTraining,
    });
    setNote("");
    toast.success(`${record.id} — ${DECISION_LABEL[decision]}`);
  };

  return (
    <AppShell>
      <main className="flex-1">
        <PageHead
          eyebrow={`Investigation // ${record.id}`}
          title={`${record.customer} — ${record.product}`}
          description={`${money(record.value)} • ${record.category} • ${record.region} • filed ${shortDate(record.createdAt)}`}
          actions={
            <>
              <Btn icon="arrow_back" onClick={() => navigate({ to: "/review-queue" })}>
                Queue
              </Btn>
              <Btn
                icon="download"
                onClick={() => {
                  downloadJSON(`trustloop-dossier-${record.id}`, { case: record, cluster, audit: caseAudit });
                  toast.success("Evidence dossier exported");
                }}
              >
                Export dossier
              </Btn>
              <Btn
                variant="primary"
                icon="person_add"
                onClick={() => {
                  claimCase(record.id);
                  toast.success(`${record.id} assigned to ${officer}`);
                }}
              >
                Claim case
              </Btn>
            </>
          }
        />

        <div className="space-y-4 px-6 py-5">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <Stat label="Trust score" value={pct(record.mlScore)} tone={record.mlScore > 0.6 ? "positive" : "negative"} hint={record.mlScore > 0.6 ? "trusted" : "elevated risk"} icon="verified_user" />
            <Stat label="Decision" value={DECISION_LABEL[record.decision]} tone={decisionTone[record.decision]} hint={record.priority} icon="gavel" />
            <Stat label="Risk class" value={RISK_CLASS_LABEL[record.riskClass]} tone={riskTone[record.riskClass]} hint={record.evidenceState} icon="fingerprint" />
            <Stat label="Refund value" value={money(record.value)} hint={`LTV ${money(record.lifetimeValue)}`} icon="payments" />
            <Stat label="Return rate" value={pct(record.returnRate)} tone={record.returnRate > 0.4 ? "negative" : "neutral"} hint={`${record.accountAgeYrs} yr account`} icon="history" />
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            <Panel title="Evidence fusion" subtitle="Four independent streams scored for this return." className="xl:col-span-2">
              <div className="grid gap-3 sm:grid-cols-2">
                <EvidenceCard
                  icon="photo_camera"
                  title="Computer vision"
                  verdict={record.visionVerdict}
                  value={record.visionConfidence}
                  tone={record.visionConfidence >= 0.85 ? "positive" : "negative"}
                />
                <EvidenceCard
                  icon="policy"
                  title="Policy engine"
                  verdict={record.policyCompliant ? "Within return window and policy" : "Policy breach detected"}
                  value={record.policyCompliant ? 1 : 0.2}
                  tone={record.policyCompliant ? "positive" : "negative"}
                />
                <EvidenceCard
                  icon="monitoring"
                  title="Behavioural ML"
                  verdict={`Behavioural risk ${pct(record.behavioralRisk)} • ${record.daysSinceDelivery} days since delivery`}
                  value={1 - record.behavioralRisk}
                  tone={record.behavioralRisk > 0.5 ? "negative" : "positive"}
                />
                <EvidenceCard
                  icon="hub"
                  title="Entity graph"
                  verdict={cluster ? `${cluster.label} (${cluster.status})` : "No ring association found"}
                  value={cluster ? cluster.similarity : 0.05}
                  tone={cluster ? "negative" : "positive"}
                />
              </div>

              <h3 className="mt-5 font-title-md text-title-md font-semibold text-on-surface">
                Deterministic drivers
              </h3>
              <ul className="mt-2 space-y-2">
                {record.drivers.map((d) => (
                  <li
                    key={d.title}
                    className="flex items-start gap-3 rounded border border-outline-variant/30 bg-surface-container-low p-3"
                  >
                    <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                      {d.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-body-md font-semibold text-on-surface">{d.title}</span>
                        <Pill tone={d.tone === "positive" ? "positive" : d.tone === "negative" ? "negative" : "neutral"}>
                          {d.tag}
                        </Pill>
                      </div>
                      <p className="mt-0.5 text-body-sm text-on-surface-variant">{d.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded border border-outline-variant/30 bg-surface-container-low p-3">
                <span className="font-label-code-sm text-label-code-sm uppercase tracking-wider text-outline">
                  Customer claim
                </span>
                <p className="mt-1 text-body-md text-on-surface">{record.claim}</p>
              </div>
            </Panel>

            <div className="space-y-4">
              <Panel title="Human verification" subtitle="Your decision is logged and can seed controlled learning.">
                <div className="space-y-3">
                  <Field label="Reviewer note" hint="Stored on the audit trail with your decision.">
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={3}
                      placeholder="Why is this the right outcome?"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Corrected risk class" hint="Optional — overrides the model classification.">
                    <select
                      value={riskClass}
                      onChange={(e) => setRiskClass(e.target.value as RiskClass | "")}
                      className={inputClass}
                    >
                      <option value="">Keep model classification</option>
                      {(Object.keys(RISK_CLASS_LABEL) as RiskClass[]).map((k) => (
                        <option key={k} value={k}>
                          {RISK_CLASS_LABEL[k]}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <label className="flex items-center gap-2 text-body-md text-on-surface">
                    <input
                      type="checkbox"
                      checked={stageForTraining}
                      onChange={(e) => setStageForTraining(e.target.checked)}
                    />
                    Stage this decision as ground truth
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <Btn variant="primary" icon="check_circle" onClick={() => decide("auto_approved")}>
                      Approve refund
                    </Btn>
                    <Btn variant="danger" icon="block" onClick={() => decide("auto_rejected")}>
                      Reject claim
                    </Btn>
                    <Btn icon="pending_actions" onClick={() => decide("human_investigation")}>
                      Keep investigating
                    </Btn>
                  </div>
                </div>
              </Panel>

              <Panel title="Routing" subtitle="Assignment and priority for this case.">
                <div className="space-y-3">
                  <Field label="Assigned reviewer">
                    <select
                      value={record.reviewer ?? ""}
                      onChange={(e) => {
                        assignCase(record.id, e.target.value || null);
                        toast.success(e.target.value ? `Assigned to ${e.target.value}` : "Unassigned");
                      }}
                      className={inputClass}
                    >
                      <option value="">Unassigned</option>
                      {REVIEWERS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Priority">
                    <select
                      value={record.priority}
                      onChange={(e) => {
                        setPriority(record.id, e.target.value as Priority);
                        toast.success(`Priority set to ${e.target.value}`);
                      }}
                      className={inputClass}
                    >
                      {(["critical", "high", "normal", "low"] as Priority[]).map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <div className="flex flex-wrap gap-2">
                    <Pill tone={priorityTone[record.priority]}>{record.priority}</Pill>
                    <Pill tone={evidenceTone[record.evidenceState]}>{record.evidenceState}</Pill>
                    <Pill tone="neutral">{record.tier}</Pill>
                    <Pill tone="neutral">{record.sku}</Pill>
                  </div>
                </div>
              </Panel>

              {cluster ? (
                <Panel title="Linked ring" subtitle={`${cluster.members.length} linked accounts • ${money(cluster.atRiskValue)} at risk`}>
                  <div className="space-y-2">
                    <Bar value={cluster.similarity} tone="negative" />
                    <p className="text-body-sm text-on-surface-variant">
                      Shared signals: {cluster.sharedAttributes.join(", ")}
                    </p>
                    <Link
                      to="/fraud-radar"
                      className="inline-flex items-center gap-1 text-body-md font-semibold text-primary hover:underline"
                    >
                      Open fraud radar
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                </Panel>
              ) : null}
            </div>
          </div>

          <Panel title="Case audit trail" subtitle="Every action taken against this case.">
            {caseAudit.length === 0 ? (
              <EmptyState icon="history" title="No entries yet" detail="Actions you take on this case appear here instantly." />
            ) : (
              <ol className="space-y-2">
                {caseAudit.map((a) => (
                  <li key={a.id} className="flex flex-wrap items-center gap-2 text-body-md">
                    <Pill tone="neutral">{a.action}</Pill>
                    <span className="text-on-surface">{a.detail}</span>
                    <span className="ml-auto font-label-code-sm text-label-code-sm text-outline">
                      {a.actor} • {shortDate(a.at)}
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </Panel>
        </div>
      </main>
    </AppShell>
  );
}

function EvidenceCard({
  icon,
  title,
  verdict,
  value,
  tone,
}: {
  icon: string;
  title: string;
  verdict: string;
  value: number;
  tone: "positive" | "negative";
}) {
  return (
    <div className="rounded border border-outline-variant/30 bg-surface-container-low p-3">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-body-md font-semibold text-on-surface">
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">{icon}</span>
          {title}
        </span>
        <Pill tone={tone}>{pct(value)}</Pill>
      </div>
      <p className="mt-1 text-body-sm text-on-surface-variant">{verdict}</p>
      <div className="mt-2">
        <Bar value={value} tone={tone} />
      </div>
    </div>
  );
}
