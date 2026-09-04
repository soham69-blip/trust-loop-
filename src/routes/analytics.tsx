import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Bar, Btn, PageHead, Panel, Pill, Stat, inputClass } from "@/components/tl";
import { downloadCSV, downloadSVGElement } from "@/lib/export";
import { DECISION_LABEL, RISK_CLASS_LABEL, type Decision, type RiskClass } from "@/lib/demo-data";
import { useTrustLoop } from "@/lib/trustloop-store";
import { decisionTone, money, pct, riskTone } from "@/lib/ui-maps";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Return Analytics | TrustLoop" },
      {
        name: "description",
        content:
          "Analyse every return: decision mix, risk distribution, category and region exposure, reviewer throughput and recovered value trends.",
      },
      { property: "og:title", content: "Return Analytics | TrustLoop" },
      {
        property: "og:description",
        content: "Decision mix, risk distribution and exposure across every return.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AnalyticsPage,
});

function group<T extends string>(rows: { key: T; value: number }[]) {
  const map = new Map<T, { count: number; value: number }>();
  rows.forEach((r) => {
    const cur = map.get(r.key) ?? { count: 0, value: 0 };
    map.set(r.key, { count: cur.count + 1, value: cur.value + r.value });
  });
  return [...map.entries()].sort((a, b) => b[1].value - a[1].value);
}

function AnalyticsPage() {
  const { cases } = useTrustLoop();
  const [dim, setDim] = useState<"category" | "region" | "tier">("category");
  const svgRef = useRef<SVGSVGElement | null>(null);

  const stats = useMemo(() => {
    const total = cases.length;
    const exposure = cases.reduce((s, c) => s + c.value, 0);
    const approved = cases.filter((c) => c.decision === "auto_approved");
    const rejected = cases.filter((c) => c.decision === "auto_rejected");
    const automation = total ? (approved.length + rejected.length) / total : 0;
    const recovered = rejected.reduce((s, c) => s + c.value, 0);
    const decisions = group(cases.map((c) => ({ key: c.decision as Decision, value: c.value })));
    const risks = group(cases.map((c) => ({ key: c.riskClass as RiskClass, value: c.value })));
    const dims = group(cases.map((c) => ({ key: c[dim] as string, value: c.value })));
    const reviewers = group(
      cases.filter((c) => c.reviewer).map((c) => ({ key: c.reviewer as string, value: c.value })),
    );
    const byDay = new Map<string, { count: number; value: number }>();
    cases.forEach((c) => {
      const day = c.createdAt.slice(0, 10);
      const cur = byDay.get(day) ?? { count: 0, value: 0 };
      byDay.set(day, { count: cur.count + 1, value: cur.value + c.value });
    });
    const trend = [...byDay.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    return { total, exposure, approved, rejected, automation, recovered, decisions, risks, dims, reviewers, trend };
  }, [cases, dim]);

  const maxTrend = Math.max(1, ...stats.trend.map(([, v]) => v.value));
  const width = 640;
  const height = 200;
  const points = stats.trend.map(([, v], i) => {
    const x = stats.trend.length > 1 ? (i / (stats.trend.length - 1)) * (width - 32) + 16 : width / 2;
    const y = height - 16 - (v.value / maxTrend) * (height - 40);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return (
    <AppShell>
      <main className="flex-1">
        <PageHead
          eyebrow="Intelligence // Analytics"
          title="Analyse All Returns"
          description="A live rollup of every return in the ledger — recomputed the moment a decision, threshold or new analysis lands."
          actions={
            <>
              <Btn
                icon="download"
                onClick={() => {
                  downloadCSV(
                    "trustloop-analytics-summary",
                    stats.dims.map(([key, v]) => ({
                      dimension: dim,
                      value: key,
                      returns: v.count,
                      exposure_usd: v.value,
                    })),
                  );
                  toast.success("Breakdown exported");
                }}
              >
                Export breakdown
              </Btn>
              <Btn
                variant="primary"
                icon="image"
                onClick={() => {
                  downloadSVGElement(svgRef.current, "trustloop-exposure-trend.svg");
                  toast.success("Trend chart exported as SVG");
                }}
              >
                Export chart
              </Btn>
            </>
          }
        />

        <div className="space-y-4 p-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Stat label="Returns analysed" value={String(stats.total)} icon="inventory_2" hint="entire ledger" />
            <Stat label="Automation rate" value={pct(stats.automation, 0)} icon="bolt" tone="info" hint="decided without a human" />
            <Stat label="Refund exposure" value={money(stats.exposure)} icon="payments" tone="warning" hint="gross claim value" />
            <Stat label="Value protected" value={money(stats.recovered)} icon="shield" tone="positive" hint="rejected claims" />
          </div>

          <Panel title="Exposure trend" subtitle="Claim value per intake day across the ledger.">
            <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} className="h-52 w-full" role="img" aria-label="Exposure trend">
              <polyline
                points={points.join(" ")}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="text-primary"
              />
              {points.map((p, i) => {
                const [x, y] = p.split(",");
                return <circle key={i} cx={x} cy={y} r={3} className="fill-primary" />;
              })}
              <line
                x1={16}
                y1={height - 16}
                x2={width - 16}
                y2={height - 16}
                stroke="currentColor"
                strokeWidth={1}
                className="text-outline-variant"
              />
            </svg>
            <div className="flex flex-wrap justify-between font-label-code-sm text-label-code-sm text-outline">
              <span>{stats.trend[0]?.[0] ?? "—"}</span>
              <span>peak {money(maxTrend)}</span>
              <span>{stats.trend[stats.trend.length - 1]?.[0] ?? "—"}</span>
            </div>
          </Panel>

          <div className="grid gap-4 xl:grid-cols-2">
            <Panel title="Decision mix" subtitle="How the engine routed each return.">
              <ul className="space-y-3">
                {stats.decisions.map(([key, v]) => (
                  <li key={key}>
                    <div className="flex items-center justify-between gap-2">
                      <Pill tone={decisionTone[key]}>{DECISION_LABEL[key]}</Pill>
                      <span className="font-label-code-sm text-label-code-sm text-on-surface">
                        {v.count} • {money(v.value)}
                      </span>
                    </div>
                    <div className="mt-1">
                      <Bar value={v.count / Math.max(1, stats.total)} tone={decisionTone[key]} />
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title="Risk distribution" subtitle="Post-adjudication customer classification.">
              <ul className="space-y-3">
                {stats.risks.map(([key, v]) => (
                  <li key={key}>
                    <div className="flex items-center justify-between gap-2">
                      <Pill tone={riskTone[key]}>{RISK_CLASS_LABEL[key]}</Pill>
                      <span className="font-label-code-sm text-label-code-sm text-on-surface">
                        {v.count} • {money(v.value)}
                      </span>
                    </div>
                    <div className="mt-1">
                      <Bar value={v.count / Math.max(1, stats.total)} tone={riskTone[key]} />
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel
              title="Exposure breakdown"
              subtitle="Where the claim value concentrates."
              actions={
                <select className={inputClass} value={dim} onChange={(e) => setDim(e.target.value as typeof dim)}>
                  <option value="category">By category</option>
                  <option value="region">By region</option>
                  <option value="tier">By loyalty tier</option>
                </select>
              }
            >
              <ul className="space-y-2">
                {stats.dims.map(([key, v]) => (
                  <li key={key}>
                    <div className="flex items-center justify-between gap-2 text-body-md text-on-surface">
                      <span className="truncate">{key}</span>
                      <span className="font-label-code-sm text-label-code-sm text-on-surface-variant">
                        {v.count} • {money(v.value)}
                      </span>
                    </div>
                    <div className="mt-1">
                      <Bar value={v.value / Math.max(1, (stats.dims[0]?.[1].value ?? 1))} tone="info" />
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title="Reviewer throughput" subtitle="Cases carried per human adjudicator.">
              <ul className="space-y-2">
                {stats.reviewers.length === 0 ? (
                  <li className="text-body-md text-on-surface-variant">No cases assigned yet.</li>
                ) : (
                  stats.reviewers.map(([key, v]) => (
                    <li key={key}>
                      <div className="flex items-center justify-between gap-2 text-body-md text-on-surface">
                        <span>{key}</span>
                        <span className="font-label-code-sm text-label-code-sm text-on-surface-variant">
                          {v.count} cases • {money(v.value)}
                        </span>
                      </div>
                      <div className="mt-1">
                        <Bar value={v.count / Math.max(1, (stats.reviewers[0]?.[1].count ?? 1))} tone="positive" />
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </Panel>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
