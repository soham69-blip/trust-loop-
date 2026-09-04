import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Btn, EmptyState, PageHead, Panel, Pill, inputClass } from "@/components/tl";
import { downloadCSV, downloadJSON } from "@/lib/export";
import { DECISION_LABEL, RISK_CLASS_LABEL, type Decision, type RiskClass } from "@/lib/demo-data";
import { useTrustLoop } from "@/lib/trustloop-store";
import { decisionTone, evidenceTone, money, pct, priorityTone, riskTone, shortDate } from "@/lib/ui-maps";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "All Returns | TrustLoop" },
      {
        name: "description",
        content:
          "Search, filter, sort and export every return decision with trust scores, evidence state and reviewer assignment.",
      },
      { property: "og:title", content: "All Returns | TrustLoop" },
      {
        property: "og:description",
        content: "The full return ledger with live filters and CSV export.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AllReturnsPage,
});

type SortKey = "createdAt" | "value" | "mlScore" | "customer";

function AllReturnsPage() {
  const { cases } = useTrustLoop();
  const [q, setQ] = useState("");
  const [decision, setDecision] = useState<Decision | "all">("all");
  const [risk, setRisk] = useState<RiskClass | "all">("all");
  const [region, setRegion] = useState("all");
  const [sort, setSort] = useState<SortKey>("createdAt");
  const [asc, setAsc] = useState(false);
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const regions = useMemo(
    () => Array.from(new Set(cases.map((c) => c.region))).sort(),
    [cases],
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const rows = cases.filter((c) => {
      if (decision !== "all" && c.decision !== decision) return false;
      if (risk !== "all" && c.riskClass !== risk) return false;
      if (region !== "all" && c.region !== region) return false;
      if (!needle) return true;
      return (
        c.id.toLowerCase().includes(needle) ||
        c.customer.toLowerCase().includes(needle) ||
        c.product.toLowerCase().includes(needle) ||
        c.sku.toLowerCase().includes(needle)
      );
    });
    const dir = asc ? 1 : -1;
    return [...rows].sort((a, b) => {
      if (sort === "customer") return a.customer.localeCompare(b.customer) * dir;
      if (sort === "createdAt")
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * dir;
      return ((a[sort] as number) - (b[sort] as number)) * dir;
    });
  }, [cases, q, decision, risk, region, sort, asc]);

  const pageRows = filtered.slice(page * pageSize, page * pageSize + pageSize);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const exposure = filtered.reduce((s, c) => s + c.value, 0);

  const exportRows = () =>
    filtered.map((c) => ({
      case_id: c.id,
      created_at: c.createdAt,
      customer: c.customer,
      tier: c.tier,
      region: c.region,
      product: c.product,
      sku: c.sku,
      order_value_usd: c.value,
      trust_score: c.mlScore,
      risk_class: RISK_CLASS_LABEL[c.riskClass],
      evidence_state: c.evidenceState,
      decision: DECISION_LABEL[c.decision],
      priority: c.priority,
      reviewer: c.reviewer ?? "unassigned",
    }));

  const toggleSort = (key: SortKey) => {
    if (sort === key) setAsc((v) => !v);
    else {
      setSort(key);
      setAsc(false);
    }
  };

  return (
    <AppShell>
      <main className="flex-1">
        <PageHead
          eyebrow="Returns Workspace // Ledger"
          title="All Returns"
          description="Every return processed by the engine, with the trust score, evidence state and adjudication route that produced each decision."
          actions={
            <>
              <Btn
                icon="download"
                onClick={() => {
                  downloadCSV(`trustloop-returns-${filtered.length}`, exportRows());
                  toast.success(`${filtered.length} rows exported to CSV`);
                }}
              >
                Export CSV
              </Btn>
              <Btn
                icon="data_object"
                onClick={() => {
                  downloadJSON("trustloop-returns", exportRows());
                  toast.success("Ledger exported as JSON");
                }}
              >
                Export JSON
              </Btn>
              <Link
                to="/analyze-return"
                className="inline-flex items-center gap-1.5 rounded bg-primary px-3 py-1.5 text-label-md font-semibold text-on-primary"
              >
                <span className="material-symbols-outlined text-[17px]">add</span>
                New analysis
              </Link>
            </>
          }
        />

        <div className="space-y-4 p-4">
          <Panel
            title={`${filtered.length} returns matched`}
            subtitle={`${money(exposure)} of order value in the current filter`}
            actions={
              <Btn
                icon="filter_alt_off"
                onClick={() => {
                  setQ("");
                  setDecision("all");
                  setRisk("all");
                  setRegion("all");
                  setPage(0);
                }}
              >
                Reset filters
              </Btn>
            }
          >
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              <input
                className={inputClass}
                placeholder="Search case, customer, product, SKU"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(0);
                }}
              />
              <select
                className={inputClass}
                value={decision}
                onChange={(e) => {
                  setDecision(e.target.value as Decision | "all");
                  setPage(0);
                }}
              >
                <option value="all">All decisions</option>
                {(Object.keys(DECISION_LABEL) as Decision[]).map((d) => (
                  <option key={d} value={d}>
                    {DECISION_LABEL[d]}
                  </option>
                ))}
              </select>
              <select
                className={inputClass}
                value={risk}
                onChange={(e) => {
                  setRisk(e.target.value as RiskClass | "all");
                  setPage(0);
                }}
              >
                <option value="all">All risk classes</option>
                {(Object.keys(RISK_CLASS_LABEL) as RiskClass[]).map((r) => (
                  <option key={r} value={r}>
                    {RISK_CLASS_LABEL[r]}
                  </option>
                ))}
              </select>
              <select
                className={inputClass}
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  setPage(0);
                }}
              >
                <option value="all">All regions</option>
                {regions.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>

            {pageRows.length === 0 ? (
              <div className="mt-4">
                <EmptyState
                  icon="search_off"
                  title="No returns match these filters"
                  detail="Widen the search or reset the filters to see the full ledger again."
                />
              </div>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant/30 text-left">
                      {(
                        [
                          ["Case", "createdAt"],
                          ["Customer", "customer"],
                          ["Product", null],
                          ["Value", "value"],
                          ["Trust score", "mlScore"],
                          ["Evidence", null],
                          ["Decision", null],
                          ["Priority", null],
                          ["Reviewer", null],
                        ] as [string, SortKey | null][]
                      ).map(([label, key]) => (
                        <th
                          key={label}
                          className="px-2 py-2 font-label-code-sm text-label-code-sm uppercase tracking-wider text-outline"
                        >
                          {key ? (
                            <button
                              type="button"
                              onClick={() => toggleSort(key)}
                              className="inline-flex items-center gap-1 hover:text-on-surface"
                            >
                              {label}
                              {sort === key ? (
                                <span className="material-symbols-outlined text-[14px]">
                                  {asc ? "arrow_upward" : "arrow_downward"}
                                </span>
                              ) : null}
                            </button>
                          ) : (
                            label
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pageRows.map((c) => (
                      <tr
                        key={c.id}
                        className="border-b border-outline-variant/20 align-top hover:bg-surface-container-low"
                      >
                        <td className="px-2 py-2">
                          <Link
                            to="/case/$caseId"
                            params={{ caseId: c.id }}
                            className="font-label-code-sm text-label-code-sm font-semibold text-primary hover:underline"
                          >
                            {c.id}
                          </Link>
                          <div className="font-label-code-sm text-label-code-sm text-outline">
                            {shortDate(c.createdAt)}
                          </div>
                        </td>
                        <td className="px-2 py-2">
                          <div className="text-body-md text-on-surface">{c.customer}</div>
                          <div className="font-label-code-sm text-label-code-sm text-outline">
                            {c.tier} • {c.region}
                          </div>
                        </td>
                        <td className="px-2 py-2">
                          <div className="text-body-md text-on-surface">{c.product}</div>
                          <div className="font-label-code-sm text-label-code-sm text-outline">
                            {c.category}
                          </div>
                        </td>
                        <td className="px-2 py-2 font-label-code-sm text-label-code-sm text-on-surface">
                          {money(c.value)}
                        </td>
                        <td className="px-2 py-2 font-label-code-sm text-label-code-sm text-on-surface">
                          {pct(c.mlScore)}
                        </td>
                        <td className="px-2 py-2">
                          <Pill tone={evidenceTone[c.evidenceState]}>{c.evidenceState}</Pill>
                        </td>
                        <td className="px-2 py-2">
                          <Pill tone={decisionTone[c.decision]}>{DECISION_LABEL[c.decision]}</Pill>
                          <div className="mt-1">
                            <Pill tone={riskTone[c.riskClass]}>{RISK_CLASS_LABEL[c.riskClass]}</Pill>
                          </div>
                        </td>
                        <td className="px-2 py-2">
                          <Pill tone={priorityTone[c.priority]}>{c.priority}</Pill>
                        </td>
                        <td className="px-2 py-2 text-body-md text-on-surface-variant">
                          {c.reviewer ?? "Unassigned"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <span className="font-label-code-sm text-label-code-sm text-on-surface-variant">
                Page {page + 1} of {pages}
              </span>
              <div className="flex gap-2">
                <Btn icon="chevron_left" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
                  Previous
                </Btn>
                <Btn
                  icon="chevron_right"
                  disabled={page + 1 >= pages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Btn>
              </div>
            </div>
          </Panel>
        </div>
      </main>
    </AppShell>
  );
}
