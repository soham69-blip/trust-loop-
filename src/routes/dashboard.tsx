import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "TrustLoop Overview Dashboard" },
      { name: "description", content: "Monitor enterprise return decisions, adjudication workload, predictive risk signals and autonomous model health." },
      { property: "og:title", content: "TrustLoop Overview Dashboard" },
      { property: "og:description", content: "Monitor enterprise return decisions, adjudication workload, predictive risk signals and autonomous model health." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PageDashboard,
});

function PageDashboard() {
  return (
    <AppShell>
<main className="relative pt-14 w-full px-grid-margin py-space-lg flex-1 bg-surface"><div className="flex flex-col w-full space-y-6 pb-12">

<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-5 rounded-xl shadow-sm">
<div className="space-y-1">
<div className="flex items-center gap-2">
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">TrustLoop Overview</h1>
<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-code-sm text-label-code-sm">
<span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse"></span>
          REALTIME ENGINE
        </span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">
        Monitor enterprise return decisions, manual adjudication workload, predictive risk signals, and autonomous model health.
      </p>
</div>

<div className="flex flex-wrap items-center gap-2">
<div className="inline-flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded text-on-surface">
<span className="material-symbols-outlined text-[16px] text-outline">calendar_today</span>
<span className="font-label-code-sm text-label-code-sm font-semibold">Last 30 Days</span>
<span className="text-outline-variant font-label-code-sm text-label-code-sm">•</span>
<span className="font-label-code-sm text-label-code-sm font-semibold">Global (All Regions)</span>
</div>
<button className="inline-flex items-center gap-1.5 bg-primary text-on-primary hover:bg-on-primary-fixed-variant px-3.5 py-1.5 rounded font-label-code-sm text-label-code-sm font-medium shadow-sm transition-colors" type="button">
<span className="material-symbols-outlined text-[16px]">tune</span>
        Adjust Policy Thresholds
      </button>
<button className="inline-flex items-center justify-center w-8 h-8 rounded bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">file_download</span>
</button>
</div>
</div>

<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">

<div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div className="flex items-center justify-between text-outline">
<span className="font-label-code-sm text-label-code-sm uppercase tracking-wider font-semibold">Total Returns</span>
<span className="material-symbols-outlined text-[18px]">inventory_2</span>
</div>
<div className="mt-3">
<div className="font-metric-display text-metric-display text-on-surface tracking-tight">48,290</div>
<div className="mt-1 flex items-center gap-1.5">
<span className="inline-flex items-center font-label-code-sm text-label-code-sm text-on-tertiary-container font-semibold">
<span className="material-symbols-outlined text-[14px]">arrow_upward</span>4.2%
          </span>
<span className="font-body-sm text-body-sm text-on-surface-variant">vs last month</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div className="flex items-center justify-between text-outline">
<span className="font-label-code-sm text-label-code-sm uppercase tracking-wider font-semibold">Auto Approved</span>
<span className="material-symbols-outlined text-[18px] text-on-tertiary-container">verified</span>
</div>
<div className="mt-3">
<div className="font-metric-display text-metric-display text-on-surface tracking-tight">39,120</div>
<div className="mt-1 flex items-center justify-between">
<span className="font-label-code-sm text-label-code-sm font-semibold text-on-surface-variant">81.0% of total</span>
<span className="font-body-sm text-body-sm text-outline">Instant Grant</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div className="flex items-center justify-between text-outline">
<span className="font-label-code-sm text-label-code-sm uppercase tracking-wider font-semibold">Human Review</span>
<span className="material-symbols-outlined text-[18px] text-secondary">policy</span>
</div>
<div className="mt-3">
<div className="font-metric-display text-metric-display text-on-surface tracking-tight">5,410</div>
<div className="mt-1 flex items-center justify-between">
<span className="font-label-code-sm text-label-code-sm font-semibold text-secondary">11.2% rate</span>
<span className="font-body-sm text-body-sm text-outline">Escalated</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div className="flex items-center justify-between text-outline">
<span className="font-label-code-sm text-label-code-sm uppercase tracking-wider font-semibold">Auto Rejected</span>
<span className="material-symbols-outlined text-[18px] text-error">gpp_bad</span>
</div>
<div className="mt-3">
<div className="font-metric-display text-metric-display text-on-surface tracking-tight">2,140</div>
<div className="mt-1 flex items-center justify-between">
<span className="font-label-code-sm text-label-code-sm font-semibold text-error">4.4% hard block</span>
<span className="font-body-sm text-body-sm text-outline">Policy Breach</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div className="flex items-center justify-between text-outline">
<span className="font-label-code-sm text-label-code-sm uppercase tracking-wider font-semibold">High-Risk Ring</span>
<span className="material-symbols-outlined text-[18px] text-error">crisis_alert</span>
</div>
<div className="mt-3">
<div className="font-metric-display text-metric-display text-on-surface tracking-tight">1,620</div>
<div className="mt-1 flex items-center justify-between">
<span className="font-label-code-sm text-label-code-sm font-semibold text-error">3.4% fraud abuse</span>
<span className="font-body-sm text-body-sm text-outline">$412k saved</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div className="flex items-center justify-between text-outline">
<span className="font-label-code-sm text-label-code-sm uppercase tracking-wider font-semibold">Avg ML Confidence</span>
<span className="material-symbols-outlined text-[18px] text-on-surface-variant">model_training</span>
</div>
<div className="mt-3">
<div className="font-metric-display text-metric-display text-on-surface tracking-tight">91.4%</div>
<div className="mt-1 flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
<span className="font-body-sm text-body-sm text-on-surface-variant">4 active ensembles</span>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

<div className="lg:col-span-5 bg-surface-container-lowest p-5 rounded-xl shadow-sm flex flex-col justify-between space-y-4">
<div className="flex items-center justify-between">
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Resolution Efficiency & Volume</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Stacked weekly resolution path over the last 8 weeks</p>
</div>
<span className="px-2 py-0.5 rounded bg-surface-container font-label-code-sm text-label-code-sm text-on-surface-variant font-medium">8 Wk History</span>
</div>

<div className="grid grid-cols-2 gap-3 bg-surface-container-low p-3 rounded-lg">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-container-lowest flex items-center justify-center text-on-tertiary-container shadow-xs">
<span className="material-symbols-outlined text-[18px]">bolt</span>
</div>
<div>
<div className="font-label-code-sm text-label-code-sm text-outline">AUTO LATENCY</div>
<div className="font-headline-sm text-headline-sm font-bold text-on-surface">1.4 sec</div>
</div>
</div>
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-container-lowest flex items-center justify-center text-secondary shadow-xs">
<span className="material-symbols-outlined text-[18px]">timer</span>
</div>
<div>
<div className="font-label-code-sm text-label-code-sm text-outline">HUMAN LATENCY</div>
<div className="font-headline-sm text-headline-sm font-bold text-on-surface">4.2 hrs</div>
</div>
</div>
</div>

<div className="pt-2">
<div className="h-36 w-full flex items-end justify-between gap-2 px-1">

<div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
<div className="w-full flex flex-col gap-0.5 h-[76%] rounded-t overflow-hidden">
<div className="h-[12%] bg-error" title="Auto Reject 12%"></div>
<div className="h-[18%] bg-secondary" title="Human Review 18%"></div>
<div className="h-[70%] bg-primary" title="Auto Approved 70%"></div>
</div>
<span className="font-label-code-sm text-label-code-sm text-outline">W1</span>
</div>

<div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
<div className="w-full flex flex-col gap-0.5 h-[80%] rounded-t overflow-hidden">
<div className="h-[10%] bg-error"></div>
<div className="h-[16%] bg-secondary"></div>
<div className="h-[74%] bg-primary"></div>
</div>
<span className="font-label-code-sm text-label-code-sm text-outline">W2</span>
</div>

<div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
<div className="w-full flex flex-col gap-0.5 h-[84%] rounded-t overflow-hidden">
<div className="h-[8%] bg-error"></div>
<div className="h-[15%] bg-secondary"></div>
<div className="h-[77%] bg-primary"></div>
</div>
<span className="font-label-code-sm text-label-code-sm text-outline">W3</span>
</div>

<div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
<div className="w-full flex flex-col gap-0.5 h-[81%] rounded-t overflow-hidden">
<div className="h-[7%] bg-error"></div>
<div className="h-[14%] bg-secondary"></div>
<div className="h-[79%] bg-primary"></div>
</div>
<span className="font-label-code-sm text-label-code-sm text-outline">W4</span>
</div>

<div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
<div className="w-full flex flex-col gap-0.5 h-[88%] rounded-t overflow-hidden">
<div className="h-[6%] bg-error"></div>
<div className="h-[13%] bg-secondary"></div>
<div className="h-[81%] bg-primary"></div>
</div>
<span className="font-label-code-sm text-label-code-sm text-outline">W5</span>
</div>

<div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
<div className="w-full flex flex-col gap-0.5 h-[92%] rounded-t overflow-hidden">
<div className="h-[6%] bg-error"></div>
<div className="h-[12%] bg-secondary"></div>
<div className="h-[82%] bg-primary"></div>
</div>
<span className="font-label-code-sm text-label-code-sm text-outline">W6</span>
</div>

<div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
<div className="w-full flex flex-col gap-0.5 h-[89%] rounded-t overflow-hidden">
<div className="h-[5%] bg-error"></div>
<div className="h-[12%] bg-secondary"></div>
<div className="h-[83%] bg-primary"></div>
</div>
<span className="font-label-code-sm text-label-code-sm text-outline">W7</span>
</div>

<div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
<div className="w-full flex flex-col gap-0.5 h-[96%] rounded-t overflow-hidden shadow-xs">
<div className="h-[4.4%] bg-error"></div>
<div className="h-[11.2%] bg-secondary"></div>
<div className="h-[84.4%] bg-primary"></div>
</div>
<span className="font-label-code-sm text-label-code-sm text-primary font-bold">Now</span>
</div>
</div>
</div>

<div className="flex items-center justify-between pt-2 text-on-surface-variant font-label-code-sm text-label-code-sm">
<div className="flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-xs bg-primary"></span>
<span>Auto-Approved (81.0%)</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-xs bg-secondary"></span>
<span>Human Verification (11.2%)</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-xs bg-error"></span>
<span>Auto-Rejected (4.4%)</span>
</div>
</div>
</div>

<div className="lg:col-span-3 bg-surface-container-lowest p-5 rounded-xl shadow-sm flex flex-col justify-between space-y-4">
<div>
<div className="flex items-center justify-between">
<h2 className="font-headline-sm text-headline-sm text-on-surface">Risk Category Mix</h2>
<span className="material-symbols-outlined text-[18px] text-outline">pie_chart</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Automated signal taxonomy breakdown</p>
</div>

<div className="space-y-3">
<div className="w-full h-3 bg-surface-container rounded-full overflow-hidden flex">
<div className="h-full bg-primary" style={{ width: "84.1%" }} title="Legitimate Returns: 84.1%"></div>
<div className="h-full bg-secondary-container" style={{ width: "7.2%" }} title="Wardrobing: 7.2%"></div>
<div className="h-full bg-secondary" style={{ width: "5.5%" }} title="Policy Abusers: 5.5%"></div>
<div className="h-full bg-error" style={{ width: "3.2%" }} title="Fraudulent / Empty Box: 3.2%"></div>
</div>
<div className="space-y-2.5 pt-1">
<div className="flex items-center justify-between p-2 rounded bg-surface-container-low">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-primary"></span>
<span className="font-body-sm text-body-sm font-medium text-on-surface">Legitimate Returns</span>
</div>
<span className="font-label-code text-label-code font-bold text-on-surface">84.1%</span>
</div>
<div className="flex items-center justify-between p-2 rounded bg-surface-container-low">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-secondary-container"></span>
<span className="font-body-sm text-body-sm font-medium text-on-surface">Wardrobing / Use & Ret.</span>
</div>
<span className="font-label-code text-label-code font-bold text-on-surface">7.2%</span>
</div>
<div className="flex items-center justify-between p-2 rounded bg-surface-container-low">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-body-sm text-body-sm font-medium text-on-surface">Serial Policy Abusers</span>
</div>
<span className="font-label-code text-label-code font-bold text-on-surface">5.5%</span>
</div>
<div className="flex items-center justify-between p-2 rounded bg-surface-container-low">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-error"></span>
<span className="font-body-sm text-body-sm font-medium text-error">Fraud / Empty Box Ring</span>
</div>
<span className="font-label-code text-label-code font-bold text-error">3.2%</span>
</div>
</div>
</div>
<div className="pt-2 text-center">
<a className="font-label-code-sm text-label-code-sm text-secondary hover:underline inline-flex items-center gap-1 font-semibold" href="#">
          Deep-dive cluster analytics
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</a>
</div>
</div>

<div className="lg:col-span-4 bg-surface-container-lowest p-5 rounded-xl shadow-sm flex flex-col justify-between space-y-4">
<div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[20px] text-on-surface">fact_check</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Model Registry & Gates</h2>
</div>
<span className="px-2 py-0.5 rounded bg-surface-container-high font-label-code-sm text-label-code-sm font-semibold uppercase text-on-surface-variant">GATED ACTIVE</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Governed retraining pipeline status</p>
</div>

<div className="p-3.5 rounded-lg bg-surface-container-low space-y-2">
<div className="flex items-center justify-between">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-on-tertiary-container"></span>
<span className="font-label-code text-label-code font-bold text-on-surface">v2.3.1 (Production)</span>
</div>
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-medium">In service: 42d</span>
</div>
<div className="flex items-center justify-between text-on-surface-variant">
<span className="font-body-sm text-body-sm">Macro F1 Score</span>
<span className="font-label-code text-label-code font-bold text-on-surface">87.21%</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{ width: "87.2%" }}></div>
</div>
</div>

<div className="p-3.5 rounded-lg bg-error-container/40 space-y-2">
<div className="flex items-center justify-between">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-on-error-container">lock</span>
<span className="font-label-code text-label-code font-bold text-on-error-container">v2.4.0 (Candidate)</span>
</div>
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-error text-on-error font-bold uppercase tracking-wider">PROMOTION BLOCKED</span>
</div>
<div className="flex items-center justify-between text-on-error-container">
<span className="font-body-sm text-body-sm">Candidate Macro F1</span>
<span className="font-label-code text-label-code font-bold">87.17%</span>
</div>
<p className="font-body-sm text-body-sm text-on-error-container leading-relaxed">
          Safe Promotion Gate failed: Protected recall safety constraint breached on luxury outerwear segment (-0.4% recall drop).
        </p>
</div>

<div className="flex items-center justify-between px-3 py-2 rounded bg-surface-container font-label-code-sm text-label-code-sm">
<span className="text-on-surface-variant flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-secondary">psychology</span>
          Verified Human Feedback Staged
        </span>
<span className="font-bold text-on-surface bg-surface-container-lowest px-2 py-0.5 rounded">26 Annotations</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">

<div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-low/40">
<div className="flex items-center gap-3">
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Recent Transaction Intelligence</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Forensic risk scoring and adjudications streamed in real-time</p>
</div>
<span className="font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-surface-container-high font-semibold text-on-surface">5 Active Cases Displayed</span>
</div>
<div className="flex items-center gap-2">
<button className="px-2.5 py-1 rounded bg-surface-container text-on-surface hover:bg-surface-container-high font-label-code-sm text-label-code-sm font-medium flex items-center gap-1 transition-colors">
<span className="material-symbols-outlined text-[15px]">filter_list</span>
          Filter by Status
        </button>
<button className="px-2.5 py-1 rounded bg-surface-container text-on-surface hover:bg-surface-container-high font-label-code-sm text-label-code-sm font-medium flex items-center gap-1 transition-colors">
<span className="material-symbols-outlined text-[15px]">view_column</span>
          Columns
        </button>
</div>
</div>

<div className="overflow-x-auto">
<table className="w-full text-left font-body-md text-body-md">
<thead>
<tr className="bg-surface-container-low text-outline uppercase font-label-code-sm text-label-code-sm">
<th className="py-3 px-4 font-semibold">Case ID</th>
<th className="py-3 px-4 font-semibold">Customer</th>
<th className="py-3 px-4 font-semibold">Product Spec</th>
<th className="py-3 px-4 font-semibold text-right">Order Value</th>
<th className="py-3 px-4 font-semibold">ML Score</th>
<th className="py-3 px-4 font-semibold">Evidence State</th>
<th className="py-3 px-4 font-semibold">Final Decision</th>
<th className="py-3 px-4 font-semibold">Priority</th>
<th className="py-3 px-4 font-semibold">Reviewer</th>
<th className="py-3 px-4 font-semibold text-center">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container">

<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-3 px-4 font-label-code text-label-code font-bold text-on-surface">
<a className="hover:underline flex items-center gap-1 text-primary" href="#">
                #CASE-89241
                <span className="material-symbols-outlined text-[13px] text-outline">open_in_new</span>
</a>
</td>
<td className="py-3 px-4">
<div className="font-medium text-on-surface leading-tight">Marcus Vance</div>
<div className="font-label-code-sm text-label-code-sm text-outline">Tier 2 Loyalty • US-West</div>
</td>
<td className="py-3 px-4">
<div className="text-on-surface font-medium truncate max-w-[180px]">Arc'teryx Alpha SV</div>
<div className="font-label-code-sm text-label-code-sm text-outline">Outerwear / GoreTex</div>
</td>
<td className="py-3 px-4 text-right font-label-code text-label-code font-bold text-on-surface">
              $799.00
            </td>
<td className="py-3 px-4">
<div className="flex items-center gap-2">
<span className="font-label-code text-label-code font-bold text-on-surface">71.4%</span>
<div className="w-12 bg-surface-container-high h-1.5 rounded-full overflow-hidden">
<div className="bg-secondary h-full" style={{ width: "71.4%" }}></div>
</div>
</div>
</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-surface-container font-medium text-on-surface">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                Aligned
              </span>
</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 font-label-code-sm text-label-code-sm px-2.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-semibold">
<span className="material-symbols-outlined text-[14px]">policy</span>
                Human Investigation
              </span>
</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-error-container text-on-error-container font-bold">
                HIGH
              </span>
</td>
<td className="py-3 px-4">
<div className="flex items-center gap-1.5">
<span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-code-sm text-[10px]">SL</span>
<span className="font-medium text-on-surface">Sarah Lin</span>
</div>
</td>
<td className="py-3 px-4 text-center">
<button className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-code-sm text-label-code-sm font-semibold transition-colors">
                Inspect
              </button>
</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-3 px-4 font-label-code text-label-code font-bold text-on-surface">
<a className="hover:underline flex items-center gap-1 text-primary" href="#">
                #CASE-89240
                <span className="material-symbols-outlined text-[13px] text-outline">open_in_new</span>
</a>
</td>
<td className="py-3 px-4">
<div className="font-medium text-on-surface leading-tight">Elena Rostova</div>
<div className="font-label-code-sm text-label-code-sm text-outline">VIP Diamond • EU-North</div>
</td>
<td className="py-3 px-4">
<div className="text-on-surface font-medium truncate max-w-[180px]">Sony WH-1000XM5</div>
<div className="font-label-code-sm text-label-code-sm text-outline">Electronics / Audio</div>
</td>
<td className="py-3 px-4 text-right font-label-code text-label-code font-bold text-on-surface">
              $399.00
            </td>
<td className="py-3 px-4">
<div className="flex items-center gap-2">
<span className="font-label-code text-label-code font-bold text-on-tertiary-container">98.2%</span>
<div className="w-12 bg-surface-container-high h-1.5 rounded-full overflow-hidden">
<div className="bg-on-tertiary-container h-full" style={{ width: "98.2%" }}></div>
</div>
</div>
</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-surface-container font-medium text-on-surface">
<span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
                Aligned
              </span>
</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 font-label-code-sm text-label-code-sm px-2.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
<span className="material-symbols-outlined text-[14px]">check_circle</span>
                Auto-Approved
              </span>
</td>
<td className="py-3 px-4">
<span className="inline-flex items-center font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-medium">
                NORMAL
              </span>
</td>
<td className="py-3 px-4">
<span className="font-label-code-sm text-label-code-sm text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">smart_toy</span>
                System (v2.3)
              </span>
</td>
<td className="py-3 px-4 text-center">
<button className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-code-sm text-label-code-sm font-semibold transition-colors">
                Inspect
              </button>
</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors bg-error-container/10">
<td className="py-3 px-4 font-label-code text-label-code font-bold text-on-surface">
<a className="hover:underline flex items-center gap-1 text-error" href="#">
                #CASE-89239
                <span className="material-symbols-outlined text-[13px] text-error">warning</span>
</a>
</td>
<td className="py-3 px-4">
<div className="font-medium text-error leading-tight flex items-center gap-1">
                Dave K.
                <span className="font-label-code-sm text-[9px] px-1 py-0.2 bg-error text-on-error rounded font-bold">FLAGGED IP</span>
</div>
<div className="font-label-code-sm text-label-code-sm text-outline">Cluster #4912 • Proxy VPN</div>
</td>
<td className="py-3 px-4">
<div className="text-on-surface font-medium truncate max-w-[180px]">Apple iPad Pro 12.9</div>
<div className="font-label-code-sm text-label-code-sm text-outline">High-Value Mobile Tech</div>
</td>
<td className="py-3 px-4 text-right font-label-code text-label-code font-bold text-on-surface">
              $1,199.00
            </td>
<td className="py-3 px-4">
<div className="flex items-center gap-2">
<span className="font-label-code text-label-code font-bold text-error">14.1%</span>
<div className="w-12 bg-surface-container-high h-1.5 rounded-full overflow-hidden">
<div className="bg-error h-full" style={{ width: "14.1%" }}></div>
</div>
</div>
</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-error-container text-on-error-container font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                Conflict (Empty Box)
              </span>
</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 font-label-code-sm text-label-code-sm px-2.5 py-0.5 rounded bg-error text-on-error font-semibold">
<span className="material-symbols-outlined text-[14px]">block</span>
                Auto-Rejected
              </span>
</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-error text-on-error font-extrabold animate-pulse">
                CRITICAL
              </span>
</td>
<td className="py-3 px-4">
<span className="font-label-code-sm text-label-code-sm text-error font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">security</span>
                Fraud Gate Auto
              </span>
</td>
<td className="py-3 px-4 text-center">
<button className="px-2 py-1 rounded bg-error-container hover:bg-error-container/80 text-on-error-container font-label-code-sm text-label-code-sm font-bold transition-colors">
                Audit Dossier
              </button>
</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-3 px-4 font-label-code text-label-code font-bold text-on-surface">
<a className="hover:underline flex items-center gap-1 text-primary" href="#">
                #CASE-89238
                <span className="material-symbols-outlined text-[13px] text-outline">open_in_new</span>
</a>
</td>
<td className="py-3 px-4">
<div className="font-medium text-on-surface leading-tight">Chloe Bennett</div>
<div className="font-label-code-sm text-label-code-sm text-outline">High Return Ratio (44%)</div>
</td>
<td className="py-3 px-4">
<div className="text-on-surface font-medium truncate max-w-[180px]">Reformation Silk Gown</div>
<div className="font-label-code-sm text-label-code-sm text-outline">Apparel / Formal Dress</div>
</td>
<td className="py-3 px-4 text-right font-label-code text-label-code font-bold text-on-surface">
              $348.00
            </td>
<td className="py-3 px-4">
<div className="flex items-center gap-2">
<span className="font-label-code text-label-code font-bold text-on-surface">48.6%</span>
<div className="w-12 bg-surface-container-high h-1.5 rounded-full overflow-hidden">
<div className="bg-secondary h-full" style={{ width: "48.6%" }}></div>
</div>
</div>
</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-medium">
<span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
                Suspected Wardrobe
              </span>
</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 font-label-code-sm text-label-code-sm px-2.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-semibold">
<span className="material-symbols-outlined text-[14px]">person_search</span>
                Human Review
              </span>
</td>
<td className="py-3 px-4">
<span className="inline-flex items-center font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-semibold">
                MEDIUM
              </span>
</td>
<td className="py-3 px-4">
<span className="font-label-code-sm text-label-code-sm text-outline italic">Unassigned</span>
</td>
<td className="py-3 px-4 text-center">
<button className="px-2 py-1 rounded bg-primary text-on-primary hover:bg-on-primary-fixed-variant font-label-code-sm text-label-code-sm font-semibold transition-colors">
                Claim Case
              </button>
</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-3 px-4 font-label-code text-label-code font-bold text-on-surface">
<a className="hover:underline flex items-center gap-1 text-primary" href="#">
                #CASE-89237
                <span className="material-symbols-outlined text-[13px] text-outline">open_in_new</span>
</a>
</td>
<td className="py-3 px-4">
<div className="font-medium text-on-surface leading-tight">TechGiant Corp</div>
<div className="font-label-code-sm text-label-code-sm text-outline">Enterprise B2B SLA</div>
</td>
<td className="py-3 px-4">
<div className="text-on-surface font-medium truncate max-w-[180px]">ThinkPad X1 Carbon</div>
<div className="font-label-code-sm text-label-code-sm text-outline">Workstation HW</div>
</td>
<td className="py-3 px-4 text-right font-label-code text-label-code font-bold text-on-surface">
              $1,850.00
            </td>
<td className="py-3 px-4">
<div className="flex items-center gap-2">
<span className="font-label-code text-label-code font-bold text-on-tertiary-container">92.0%</span>
<div className="w-12 bg-surface-container-high h-1.5 rounded-full overflow-hidden">
<div className="bg-on-tertiary-container h-full" style={{ width: "92%" }}></div>
</div>
</div>
</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-surface-container font-medium text-on-surface">
<span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
                Aligned (Defective)
              </span>
</td>
<td className="py-3 px-4">
<span className="inline-flex items-center gap-1 font-label-code-sm text-label-code-sm px-2.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
<span className="material-symbols-outlined text-[14px]">check_circle</span>
                Auto-Approved
              </span>
</td>
<td className="py-3 px-4">
<span className="inline-flex items-center font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-medium">
                LOW
              </span>
</td>
<td className="py-3 px-4">
<span className="font-label-code-sm text-label-code-sm text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">smart_toy</span>
                System (v2.3)
              </span>
</td>
<td className="py-3 px-4 text-center">
<button className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-code-sm text-label-code-sm font-semibold transition-colors">
                Inspect
              </button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="p-3 bg-surface-container-low flex items-center justify-between">
<div className="font-body-sm text-body-sm text-on-surface-variant">
        Showing <span className="font-semibold text-on-surface">5</span> of <span className="font-semibold text-on-surface">5,410</span> manual investigation candidates
      </div>
<div className="flex items-center gap-2">
<button className="px-3 py-1 rounded bg-surface-container-lowest hover:bg-surface-container font-label-code-sm text-label-code-sm text-on-surface shadow-xs transition-colors">Previous</button>
<button className="px-3 py-1 rounded bg-primary text-on-primary hover:bg-on-primary-fixed-variant font-label-code-sm text-label-code-sm shadow-xs transition-colors">Next</button>
</div>
</div>
</div>

<div className="p-4 rounded-xl bg-primary-container text-on-primary flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-surface-container-lowest/10 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[24px] text-secondary-fixed">hub</span>
</div>
<div>
<div className="flex items-center gap-2">
<span className="font-headline-sm text-headline-sm text-on-primary">The TrustLoop Closed-Loop Safeguard</span>
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-semibold">SOC2 COMPLIANT</span>
</div>
<p className="font-body-sm text-body-sm text-on-primary-container">
          Enterprise guardrails ensure automated decision boundaries remain calibrated and protected against adversarial drifts.
        </p>
</div>
</div>

<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-lowest/10 font-label-code-sm text-label-code-sm tracking-wider font-semibold select-none">
<span className="text-on-primary">AI ASSISTS</span>
<span className="text-on-primary-container">•</span>
<span className="text-on-primary">EVIDENCE EXPLAINS</span>
<span className="text-on-primary-container">•</span>
<span className="text-secondary-fixed">HUMANS VERIFY</span>
<span className="text-on-primary-container">•</span>
<span className="text-tertiary-fixed">TRUSTLOOP LEARNS SAFELY</span>
</div>
</div>
</div></main>

    </AppShell>
  );
}
