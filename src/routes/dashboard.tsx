import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Bar, Btn, EmptyState, PageHead, Panel, Pill, Stat, inputClass } from "@/components/tl";
import { downloadCSV } from "@/lib/export";
import { DECISION_LABEL, RISK_CLASS_LABEL } from "@/lib/demo-data";
import { useMetrics, useTrustLoop } from "@/lib/trustloop-store";
import { decisionTone, money, pct, priorityTone, riskTone, shortDate } from "@/lib/ui-maps";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "TrustLoop Overview Dashboard" },
      {
        name: "description",
        content:
          "Monitor enterprise return decisions, adjudication workload, predictive risk signals and autonomous model health in one live operations view.",
      },
      { property: "og:title", content: "TrustLoop Overview Dashboard" },
      {
        property: "og:description",
        content: "Live decision mix, exposure, queue load and model health for the returns programme.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

type Range = "7d" | "30d" | "all";

function DashboardPage() {
  const { cases, clusters, models, audit, claimCase } = useTrustLoop();
  const metrics = useMetrics();
  const navigate = useNavigate();
  const [range, setRange] = useState<Range>("all");
  const [region, setRegion] = useState("all");

  const regions = useMemo(() => Array.from(new Set(cases.map((c) => c.region))).sort(), [cases]);

  const scoped = useMemo(() => {
    const cutoff =
      range === "all" ? 0 : Date.now() - (range === "7d" ? 7 : 30) * 24 * 60 * 60 * 1000;
    return cases
      .filter((c) => (region === "all" ? true : c.region === region))
      .filter((c) => (cutoff ? new Date(c.createdAt).getTime() >= cutoff : true));
  }, [cases, range, region]);

  const mix = useMemo(() => {
    const total = Math.max(1, scoped.length);
    const by = (d: string) => scoped.filter((c) => c.decision === d).length;
    return [
      { key: "auto_approved", label: "Auto approved", count: by("auto_approved"), tone: "positive" as const },
      { key: "human_investigation", label: "Human review", count: by("human_investigation"), tone: "info" as const },
      { key: "auto_rejected", label: "Auto rejected", count: by("auto_rejected"), tone: "negative" as const },
    ].map((r) => ({ ...r, share: r.count / total }));
  }, [scoped]);

  const byRisk = useMemo(() => {
    const total = Math.max(1, scoped.length);
    return (["legitimate", "wardrobing", "policy_abuser", "organized_fraud"] as const).map((k) => ({
      key: k,
      count: scoped.filter((c) => c.riskClass === k).length,
      share: scoped.filter((c) => c.riskClass === k).length / total,
    }));
  }, [scoped]);

  const exposure = scoped
    .filter((c) => c.decision === "auto_rejected" || c.riskClass === "organized_fraud")
    .reduce((s, c) => s + c.value, 0);

  const urgent = useMemo(
    () =>
      scoped
        .filter((c) => c.decision === "human_investigation")
        .sort(
          (a, b) =>
            (a.priority === "critical" ? 0 : a.priority === "high" ? 1 : 2) -
              (b.priority === "critical" ? 0 : b.priority === "high" ? 1 : 2) || b.value - a.value,
        )
        .slice(0, 6),
    [scoped],
  );

  const production = models.find((m) => m.stage === "production");

  return (
    <AppShell>
      <main className="flex-1">
        <PageHead
          eyebrow="Overview // Realtime Engine"
          title="TrustLoop Overview"
          description="Decision mix, financial exposure, adjudication workload and model health — all computed live from the demo dataset."
          actions={
            <>
              <select
                aria-label="Time range"
                value={range}
                onChange={(e) => setRange(e.target.value as Range)}
                className={`${inputClass} w-auto`}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="all">All time</option>
              </select>
              <select
                aria-label="Region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className={`${inputClass} w-auto`}
              >
                <option value="all">All regions</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <Btn icon="tune" onClick={() => navigate({ to: "/settings" })}>
                Adjust thresholds
              </Btn>
              <Btn
                icon="file_download"
                onClick={() => {
                  downloadCSV(
                    "trustloop-dashboard-export",
                    scoped.map((c) => ({
                      case_id: c.id,
                      created_at: c.createdAt,
                      customer: c.customer,
                      region: c.region,
                      value_usd: c.value,
                      decision: c.decision,
                      risk_class: c.riskClass,
                      trust_score: c.mlScore,
                    })),
                  );
                  toast.success(`${scoped.length} cases exported`);
                }}
              >
                Export
              </Btn>
            </>
          }
        />

        <div className="space-y-4 px-6 py-5">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
            <Stat label="Returns in view" value={String(scoped.length)} icon="inventory_2" />
            <Stat
              label="Auto approved"
              value={String(mix[0]?.count ?? 0)}
              hint={pct(mix[0]?.share ?? 0)}
              tone="positive"
              icon="verified"
            />
            <Stat
              label="Human review"
              value={String(mix[1]?.count ?? 0)}
              hint={pct(mix[1]?.share ?? 0)}
              tone="info"
              icon="policy"
            />
            <Stat
              label="Auto rejected"
              value={String(mix[2]?.count ?? 0)}
              hint={pct(mix[2]?.share ?? 0)}
              tone="negative"
              icon="gpp_bad"
            />
            <Stat
              label="Exposure blocked"
              value={money(exposure)}
              hint="fraud + rings"
              tone="negative"
              icon="savings"
            />
            <Stat
              label="Active rings"
              value={String(clusters.filter((c) => c.status !== "cleared").length)}
              hint="entity graph"
              tone="warning"
              icon="hub"
            />
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            <Panel title="Decision mix" subtitle="Share of returns by outcome in the current view." className="xl:col-span-2">
              <div className="space-y-4">
                {mix.map((m) => (
                  <div key={m.key}>
                    <div className="flex items-center justify-between">
                      <span className="text-body-md text-on-surface">{m.label}</span>
                      <span className="font-label-code-sm text-label-code-sm text-on-surface-variant">
                        {m.count} • {pct(m.share)}
                      </span>
                    </div>
                    <div className="mt-1">
                      <Bar value={m.share} tone={m.tone} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {byRisk.map((r) => (
                  <div
                    key={r.key}
                    className="rounded border border-outline-variant/30 bg-surface-container-low p-3"
                  >
                    <div className="flex items-center justify-between">
                      <Pill tone={riskTone[r.key]}>{RISK_CLASS_LABEL[r.key]}</Pill>
                      <span className="font-label-code-sm text-label-code-sm text-on-surface-variant">
                        {r.count} • {pct(r.share)}
                      </span>
                    </div>
                    <div className="mt-2">
                      <Bar value={r.share} tone={riskTone[r.key]} />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Model health" subtitle="Production model serving every decision.">
              {production ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-label-code-sm text-label-code-sm text-on-surface-variant">
                      {production.version}
                    </span>
                    <Pill tone="positive">production</Pill>
                  </div>
                  <div>
                    <div className="flex justify-between text-body-sm text-on-surface-variant">
                      <span>Macro F1</span>
                      <span>{production.macroF1.toFixed(3)}</span>
                    </div>
                    <Bar value={production.macroF1} />
                  </div>
                  <div>
                    <div className="flex justify-between text-body-sm text-on-surface-variant">
                      <span>Abuser recall</span>
                      <span>{pct(production.abuserRecall)}</span>
                    </div>
                    <Bar value={production.abuserRecall} tone="warning" />
                  </div>
                  <div className="flex justify-between text-body-sm text-on-surface-variant">
                    <span>p95 latency</span>
                    <span>{production.latencyMs} ms</span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant">{production.notes}</p>
                  <Link
                    to="/model-registry"
                    className="inline-flex items-center gap-1 text-body-md font-semibold text-primary hover:underline"
                  >
                    Open model registry
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              ) : (
                <EmptyState icon="model_training" title="No production model" detail="Promote a candidate from the registry." />
              )}
            </Panel>
          </div>

          <Panel
            title="Needs human verification"
            subtitle="Highest-priority escalations waiting on a reviewer."
            actions={
              <Link
                to="/review-queue"
                className="text-body-md font-semibold text-primary hover:underline"
              >
                Open full queue
              </Link>
            }
          >
            {urgent.length === 0 ? (
              <EmptyState
                icon="task_alt"
                title="Queue is clear"
                detail="No cases in this view are waiting on human verification."
              />
            ) : (
              <ul className="space-y-2">
                {urgent.map((c) => (
                  <li
                    key={c.id}
                    className="flex flex-wrap items-center gap-3 rounded border border-outline-variant/30 bg-surface-container-low p-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          to="/case/$caseId"
                          params={{ caseId: c.id }}
                          className="font-label-code-sm text-label-code-sm text-primary underline"
                        >
                          {c.id}
                        </Link>
                        <Pill tone={priorityTone[c.priority]}>{c.priority}</Pill>
                        <Pill tone={riskTone[c.riskClass]}>{RISK_CLASS_LABEL[c.riskClass]}</Pill>
                        <Pill tone={decisionTone[c.decision]}>{DECISION_LABEL[c.decision]}</Pill>
                      </div>
                      <p className="mt-1 truncate text-body-md text-on-surface">
                        {c.customer} — {c.product} • {money(c.value)} • trust {pct(c.mlScore)}
                      </p>
                      <p className="font-label-code-sm text-label-code-sm text-outline">
                        {shortDate(c.createdAt)} • {c.reviewer ?? "unassigned"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Btn
                        icon="person_add"
                        onClick={() => {
                          claimCase(c.id);
                          toast.success(`${c.id} claimed`);
                        }}
                      >
                        Claim
                      </Btn>
                      <Btn
                        variant="primary"
                        icon="open_in_new"
                        onClick={() => navigate({ to: "/case/$caseId", params: { caseId: c.id } })}
                      >
                        Investigate
                      </Btn>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel
            title="Recent governance activity"
            subtitle="Latest entries from the immutable audit log."
            actions={
              <Link to="/audit-log" className="text-body-md font-semibold text-primary hover:underline">
                View audit log
              </Link>
            }
          >
            <ol className="space-y-2">
              {audit.slice(0, 6).map((a) => (
                <li key={a.id} className="flex flex-wrap items-center gap-2 text-body-md">
                  <Pill tone="neutral">{a.action}</Pill>
                  <span className="text-on-surface">{a.detail}</span>
                  <span className="ml-auto font-label-code-sm text-label-code-sm text-outline">
                    {shortDate(a.at)}
                  </span>
                </li>
              ))}
            </ol>
          </Panel>
        </div>
      </main>
    </AppShell>
  );
}
