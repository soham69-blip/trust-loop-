import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Bar, Btn, EmptyState, PageHead, Panel, Pill, Stat, inputClass } from "@/components/tl";
import { downloadCSV } from "@/lib/export";
import { DEMO_QUALITY, type QualityCheck } from "@/lib/demo-data";
import { useTrustLoop } from "@/lib/trustloop-store";
import { pct } from "@/lib/ui-maps";

export const Route = createFileRoute("/data-quality")({
  head: () => ({
    meta: [
      { title: "Data Quality Monitoring | TrustLoop" },
      {
        name: "description",
        content:
          "Continuous data-quality checks across evidence intake, logistics feeds, computer vision and human labelling, with live coverage from the demo dataset.",
      },
      { property: "og:title", content: "Data Quality Monitoring | TrustLoop" },
      {
        property: "og:description",
        content: "Coverage, drift and completeness checks for every signal feeding the risk model.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DataQualityPage,
});

const STATUS_TONE = { pass: "positive", warn: "warning", fail: "negative" } as const;

function DataQualityPage() {
  const { cases, groundTruth, log } = useTrustLoop();
  const [status, setStatus] = useState<"all" | QualityCheck["status"]>("all");
  const [lastRun, setLastRun] = useState<string | null>(null);

  const live = useMemo<QualityCheck[]>(() => {
    const withEvidence = cases.filter((c) => c.evidenceState !== "insufficient").length;
    const conflict = cases.filter((c) => c.evidenceState === "conflict").length;
    const labelled = Math.min(1, groundTruth.length / 50);
    return [
      {
        name: "Live evidence coverage",
        domain: "Demo dataset",
        status: withEvidence / Math.max(1, cases.length) > 0.9 ? "pass" : "warn",
        coverage: withEvidence / Math.max(1, cases.length),
        detail: `${withEvidence} of ${cases.length} cases carry usable evidence.`,
      },
      {
        name: "Evidence conflict rate",
        domain: "Computer vision",
        status: conflict / Math.max(1, cases.length) < 0.15 ? "pass" : "warn",
        coverage: 1 - conflict / Math.max(1, cases.length),
        detail: `${conflict} cases show a conflict between claim text and vision output.`,
      },
      {
        name: "Ground-truth label volume",
        domain: "Human verification",
        status: labelled >= 1 ? "pass" : "fail",
        coverage: labelled,
        detail: `${groundTruth.length} of 50 verified labels required for the next candidate.`,
      },
    ];
  }, [cases, groundTruth.length]);

  const all = useMemo(() => [...live, ...DEMO_QUALITY], [live]);
  const rows = useMemo(
    () => all.filter((c) => (status === "all" ? true : c.status === status)),
    [all, status],
  );

  const failing = all.filter((c) => c.status === "fail").length;
  const warning = all.filter((c) => c.status === "warn").length;
  const avgCoverage = all.reduce((s, c) => s + c.coverage, 0) / Math.max(1, all.length);

  return (
    <AppShell>
      <main className="flex-1">
        <PageHead
          eyebrow="Governance // Signal Integrity"
          title="Data Quality"
          description="Every model input is monitored for completeness, drift and integrity. Failing checks block model promotion automatically."
          actions={
            <>
              <Btn
                icon="play_circle"
                onClick={() => {
                  const at = new Date().toLocaleTimeString();
                  setLastRun(at);
                  log("quality.suite_run", "data-quality", `${all.length} checks re-evaluated against live demo state.`);
                  toast.success(`${all.length} checks re-evaluated`);
                }}
              >
                Run checks
              </Btn>
              <Btn
                icon="download"
                onClick={() => {
                  downloadCSV("trustloop-data-quality", rows);
                  toast.success("Quality report exported");
                }}
              >
                Export report
              </Btn>
            </>
          }
        />

        <div className="space-y-4 px-6 py-5">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Stat label="Checks monitored" value={String(all.length)} icon="query_stats" />
            <Stat
              label="Failing"
              value={String(failing)}
              hint={failing ? "blocks promotion" : "clear"}
              tone={failing ? "negative" : "positive"}
              icon="error"
            />
            <Stat label="Warnings" value={String(warning)} tone="warning" hint="monitor" icon="warning" />
            <Stat label="Average coverage" value={pct(avgCoverage)} icon="donut_large" />
          </div>

          <Panel
            title="Check results"
            subtitle={lastRun ? `Last run at ${lastRun}` : "Continuous monitoring — run the suite to refresh."}
            actions={
              <select
                aria-label="Filter by status"
                value={status}
                onChange={(e) => setStatus(e.target.value as typeof status)}
                className={`${inputClass} w-auto`}
              >
                <option value="all">All statuses</option>
                <option value="pass">Pass</option>
                <option value="warn">Warn</option>
                <option value="fail">Fail</option>
              </select>
            }
          >
            {rows.length === 0 ? (
              <EmptyState
                icon="filter_alt_off"
                title="No checks in this status"
                detail="Switch the filter to see the remaining monitors."
              />
            ) : (
              <ul className="space-y-2">
                {rows.map((c) => (
                  <li
                    key={c.name}
                    className="rounded border border-outline-variant/30 bg-surface-container-low p-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-title-md text-title-md font-semibold text-on-surface">{c.name}</p>
                        <p className="font-label-code-sm text-label-code-sm uppercase tracking-wider text-outline">
                          {c.domain}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-label-code-sm text-label-code-sm text-on-surface-variant">
                          {pct(c.coverage)}
                        </span>
                        <Pill tone={STATUS_TONE[c.status]}>{c.status}</Pill>
                      </div>
                    </div>
                    <p className="mt-1 text-body-md text-on-surface-variant">{c.detail}</p>
                    <div className="mt-2">
                      <Bar value={c.coverage} tone={STATUS_TONE[c.status]} />
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
