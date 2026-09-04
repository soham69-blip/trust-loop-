import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Bar, Btn, EmptyState, PageHead, Panel, Pill, Stat, inputClass } from "@/components/tl";
import { downloadCSV } from "@/lib/export";
import { DECISION_LABEL, REVIEWERS, RISK_CLASS_LABEL, type Priority } from "@/lib/demo-data";
import { useMetrics, useTrustLoop } from "@/lib/trustloop-store";
import { evidenceTone, money, pct, priorityTone, riskTone, shortDate } from "@/lib/ui-maps";

export const Route = createFileRoute("/review-queue")({
  head: () => ({
    meta: [
      { title: "Human Review Queue | TrustLoop" },
      {
        name: "description",
        content:
          "Triage the returns the engine escalated: claim, assign, prioritise and adjudicate each case with a full audit trail.",
      },
      { property: "og:title", content: "Human Review Queue | TrustLoop" },
      {
        property: "og:description",
        content: "Claim, assign and adjudicate escalated returns in one queue.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReviewQueuePage,
});

const PRIORITIES: Priority[] = ["critical", "high", "normal", "low"];
const ORDER: Record<Priority, number> = { critical: 0, high: 1, normal: 2, low: 3 };

function ReviewQueuePage() {
  const { cases, claimCase, assignCase, setPriority, decideCase, officer } = useTrustLoop();
  const metrics = useMetrics();
  const [priority, setPriorityFilter] = useState<Priority | "all">("all");
  const [mine, setMine] = useState(false);
  const [note, setNote] = useState("");

  const queue = useMemo(() => {
    const rows = cases.filter((c) => c.decision === "human_investigation");
    return rows
      .filter((c) => (priority === "all" ? true : c.priority === priority))
      .filter((c) => (mine ? c.reviewer === officer : true))
      .sort((a, b) => ORDER[a.priority] - ORDER[b.priority] || b.value - a.value);
  }, [cases, priority, mine, officer]);

  const exposure = queue.reduce((s, c) => s + c.value, 0);

  return (
    <AppShell>
      <main className="flex-1">
        <PageHead
          eyebrow="Human Verification // Triage"
          title="Review Queue"
          description="Cases the engine refused to decide alone. Every action here is written to the immutable audit log and can be staged as ground truth for retraining."
          actions={
            <>
              <Btn
                icon="download"
                onClick={() => {
                  downloadCSV(
                    "trustloop-review-queue",
                    queue.map((c) => ({
                      case_id: c.id,
                      priority: c.priority,
                      customer: c.customer,
                      value_usd: c.value,
                      trust_score: c.mlScore,
                      reviewer: c.reviewer ?? "unassigned",
                    })),
                  );
                  toast.success("Queue exported");
                }}
              >
                Export queue
              </Btn>
              <Btn
                variant="primary"
                icon="how_to_reg"
                onClick={() => {
                  const open = queue.filter((c) => !c.reviewer).slice(0, 5);
                  if (!open.length) {
                    toast.error("Nothing unassigned left to claim.");
                    return;
                  }
                  open.forEach((c) => claimCase(c.id));
                  toast.success(`Claimed ${open.length} cases for ${officer}`);
                }}
              >
                Claim next 5
              </Btn>
            </>
          }
        />

        <div className="space-y-4 p-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Stat label="In queue" value={String(metrics.queue)} icon="inbox" hint="awaiting adjudication" />
            <Stat
              label="Assigned to me"
              value={String(metrics.assignedToMe)}
              icon="assignment_ind"
              tone="info"
              hint={officer}
            />
            <Stat
              label="Critical"
              value={String(queue.filter((c) => c.priority === "critical").length)}
              icon="priority_high"
              tone="negative"
              hint="SLA breach risk"
            />
            <Stat label="Exposure" value={money(exposure)} icon="payments" tone="warning" hint="value in queue" />
          </div>

          <Panel
            title={`${queue.length} cases to adjudicate`}
            subtitle="Decisions apply instantly and update the dashboard, analytics and audit log."
            actions={
              <div className="flex flex-wrap items-center gap-2">
                <select
                  className={inputClass}
                  value={priority}
                  onChange={(e) => setPriorityFilter(e.target.value as Priority | "all")}
                >
                  <option value="all">All priorities</option>
                  {PRIORITIES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <label className="flex cursor-pointer items-center gap-2 rounded border border-outline-variant/30 bg-surface-container-low px-3 py-1.5 text-body-md text-on-surface">
                  <input type="checkbox" checked={mine} onChange={(e) => setMine(e.target.checked)} className="accent-primary" />
                  Only mine
                </label>
              </div>
            }
          >
            <input
              className={`${inputClass} mb-3`}
              placeholder="Reviewer note attached to the next decision (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            {queue.length === 0 ? (
              <EmptyState
                icon="task_alt"
                title="Queue clear"
                detail="No escalated returns match this filter. Run a new analysis to generate more work."
              />
            ) : (
              <ul className="space-y-3">
                {queue.map((c) => (
                  <li key={c.id} className="rounded-lg border border-outline-variant/30 bg-surface-container-low p-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Link
                            to="/case/$caseId"
                            params={{ caseId: c.id }}
                            className="font-label-code-sm text-label-code-sm font-bold text-primary hover:underline"
                          >
                            {c.id}
                          </Link>
                          <Pill tone={priorityTone[c.priority]}>{c.priority}</Pill>
                          <Pill tone={riskTone[c.riskClass]}>{RISK_CLASS_LABEL[c.riskClass]}</Pill>
                          <Pill tone={evidenceTone[c.evidenceState]}>{c.evidenceState}</Pill>
                        </div>
                        <div className="mt-1 font-title-md text-title-md font-semibold text-on-surface">
                          {c.customer} • {c.product}
                        </div>
                        <div className="font-label-code-sm text-label-code-sm text-outline">
                          {money(c.value)} • {c.tier} • {c.region} • filed {shortDate(c.createdAt)} • return rate{" "}
                          {pct(c.returnRate, 0)}
                        </div>
                        <p className="mt-1 max-w-2xl text-body-sm text-on-surface-variant">“{c.claim}”</p>
                      </div>
                      <div className="w-44 shrink-0">
                        <div className="flex items-center justify-between font-label-code-sm text-label-code-sm text-on-surface-variant">
                          <span>Trust score</span>
                          <span className="font-bold text-on-surface">{pct(c.mlScore)}</span>
                        </div>
                        <div className="mt-1">
                          <Bar value={c.mlScore} tone={c.mlScore > 0.6 ? "positive" : c.mlScore > 0.35 ? "warning" : "negative"} />
                        </div>
                        <div className="mt-2 font-label-code-sm text-label-code-sm text-outline">
                          Vision {pct(c.visionConfidence, 0)} • Behaviour {pct(c.behavioralRisk, 0)} risk
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-outline-variant/20 pt-3">
                      <select
                        className={inputClass}
                        value={c.reviewer ?? ""}
                        onChange={(e) => {
                          assignCase(c.id, e.target.value || null);
                          toast.success(e.target.value ? `${c.id} assigned to ${e.target.value}` : `${c.id} unassigned`);
                        }}
                      >
                        <option value="">Unassigned</option>
                        {REVIEWERS.map((r) => (
                          <option key={r}>{r}</option>
                        ))}
                      </select>
                      <select
                        className={inputClass}
                        value={c.priority}
                        onChange={(e) => {
                          setPriority(c.id, e.target.value as Priority);
                          toast.success(`${c.id} priority → ${e.target.value}`);
                        }}
                      >
                        {PRIORITIES.map((p) => (
                          <option key={p} value={p}>
                            {p} priority
                          </option>
                        ))}
                      </select>
                      <Btn icon="person_add" onClick={() => { claimCase(c.id); toast.success(`${c.id} claimed`); }}>
                        Claim
                      </Btn>
                      <Btn
                        variant="primary"
                        icon="check"
                        onClick={() => {
                          decideCase(c.id, "auto_approved", { note, stageForTraining: true });
                          toast.success(`${c.id} approved and staged as ground truth`);
                          setNote("");
                        }}
                      >
                        Approve refund
                      </Btn>
                      <Btn
                        variant="danger"
                        icon="block"
                        onClick={() => {
                          decideCase(c.id, "auto_rejected", { note, riskClass: "policy_abuser", stageForTraining: true });
                          toast.success(`${c.id} rejected — labelled abuser`);
                          setNote("");
                        }}
                      >
                        Reject claim
                      </Btn>
                      <Btn
                        icon="gavel"
                        onClick={() => {
                          decideCase(c.id, "pending", { note });
                          toast.success(`${c.id} escalated to manual specialist review`);
                          setNote("");
                        }}
                      >
                        Escalate
                      </Btn>
                      <span className="ml-auto font-label-code-sm text-label-code-sm text-outline">
                        {DECISION_LABEL[c.decision]}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </main>
    </AppShell>
  );
}
