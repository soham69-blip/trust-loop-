import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/governance/retraining")({
  head: () => ({
    meta: [
      { title: "Safe Retraining and Model Gates | TrustLoop" },
      { name: "description", content: "Controlled retraining with deterministic offline evaluation, regression slicing and automated promotion hard-gates." },
      { property: "og:title", content: "Safe Retraining and Model Gates | TrustLoop" },
      { property: "og:description", content: "Controlled retraining with deterministic offline evaluation, regression slicing and automated promotion hard-gates." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PageRetraining,
});

function PageRetraining() {
  return (
    <AppShell>
<main className="relative pt-14 w-full px-grid-margin py-space-lg flex-1 bg-surface"><div className="flex flex-col w-full">

<div className="flex flex-col gap-space-lg mb-space-xl">
<div className="flex flex-wrap items-center justify-between gap-4">
<div className="flex flex-col">
<div className="flex items-center gap-2 mb-1">
<span className="font-label-code-sm text-label-code-sm tracking-wider uppercase px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-semibold">
            Governance Node // Safe Retraining Engine
          </span>
<span className="font-label-code-sm text-label-code-sm text-outline">•</span>
<span className="font-label-code-sm text-label-code-sm text-outline">v2.4.0-cand EVALUATION ID: #TR-8849-G7</span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Controlled Retraining & Model Governance
        </h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
          Verified human feedback loop with deterministic offline evaluation, stratified regression slicing, and automated promotion hard-gates.
        </p>
</div>
<div className="flex flex-col items-end gap-2">
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-error-container text-on-error-container shadow-sm">
<span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
<span className="font-label-code-sm text-label-code-sm font-semibold tracking-wider uppercase">
            PROMOTION BLOCKED — SAFETY THRESHOLD NOT MET
          </span>
</div>
<div className="flex items-center gap-1.5 font-label-code-sm text-label-code-sm text-outline">
<span className="material-symbols-outlined text-[14px]">lock</span>
<span>Zero Autonomous Deployment Mandate Active</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-2">
<span className="font-label-code-sm text-label-code-sm uppercase tracking-widest text-outline font-semibold">
            Deterministic Pipeline Architecture
          </span>
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-surface-container-low text-on-surface-variant">
            SYNCHRONOUS
          </span>
</div>
<span className="font-label-code-sm text-label-code-sm text-secondary font-semibold">
          AI ASSISTS • EVIDENCE EXPLAINS • HUMANS VERIFY • TRUSTLOOP LEARNS SAFELY
        </span>
</div>

<div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">

<div className="bg-surface-container-low p-3 rounded-lg flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container-high transition-colors">
<div className="flex items-center justify-between mb-2">
<span className="font-label-code-sm text-label-code-sm font-semibold text-secondary">01. GROUND TRUTH</span>
<span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
</div>
<div className="mb-2">
<span className="font-headline-sm text-headline-sm text-on-surface block font-bold">26 Samples</span>
<span className="font-body-sm text-body-sm text-on-surface-variant block">Verified T&S Officers</span>
</div>
<div className="pt-2">
<span className="font-label-code-sm text-label-code-sm text-outline">100% Deterministic</span>
</div>
</div>

<div className="bg-surface-container-low p-3 rounded-lg flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container-high transition-colors">
<div className="flex items-center justify-between mb-2">
<span className="font-label-code-sm text-label-code-sm font-semibold text-secondary">02. SAMPLING & WEIGHT</span>
<span className="material-symbols-outlined text-[16px] text-secondary">tune</span>
</div>
<div className="mb-2">
<span className="font-headline-sm text-headline-sm text-on-surface block font-bold">15.0× Boost</span>
<span className="font-body-sm text-body-sm text-on-surface-variant block">Stratified Oversampling</span>
</div>
<div className="pt-2">
<span className="font-label-code-sm text-label-code-sm text-outline">Ground Truth Anchor</span>
</div>
</div>

<div className="bg-surface-container-low p-3 rounded-lg flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container-high transition-colors">
<div className="flex items-center justify-between mb-2">
<span className="font-label-code-sm text-label-code-sm font-semibold text-secondary">03. BENCHMARKING</span>
<span className="material-symbols-outlined text-[16px] text-secondary">analytics</span>
</div>
<div className="mb-2">
<span className="font-headline-sm text-headline-sm text-on-surface block font-bold">60,000 Returns</span>
<span className="font-body-sm text-body-sm text-on-surface-variant block">Offline Historical Holdout</span>
</div>
<div className="pt-2">
<span className="font-label-code-sm text-label-code-sm text-outline">Candidate Evaluated</span>
</div>
</div>

<div className="bg-error-container/40 p-3 rounded-lg flex flex-col justify-between relative overflow-hidden group">
<div className="flex items-center justify-between mb-2">
<span className="font-label-code-sm text-label-code-sm font-semibold text-error">04. SAFETY GATES</span>
<span className="material-symbols-outlined text-[16px] text-error">compress</span>
</div>
<div className="mb-2">
<span className="font-headline-sm text-headline-sm text-on-error-container block font-bold">3 of 5 Failed</span>
<span className="font-body-sm text-body-sm text-on-error-container block">Critical Invariance Break</span>
</div>
<div className="pt-2">
<span className="font-label-code-sm text-label-code-sm text-error font-medium">Auto-Veto Engaged</span>
</div>
</div>

<div className="bg-surface-container-lowest p-3 rounded-lg flex flex-col justify-between relative overflow-hidden opacity-60">
<div className="flex items-center justify-between mb-2">
<span className="font-label-code-sm text-label-code-sm font-semibold text-outline">05. CANARY PROD</span>
<span className="material-symbols-outlined text-[16px] text-outline">block</span>
</div>
<div className="mb-2">
<span className="font-headline-sm text-headline-sm text-outline block font-bold">Blocked (0%)</span>
<span className="font-body-sm text-body-sm text-outline block">Active: v2.3.1 Retained</span>
</div>
<div className="pt-2">
<span className="font-label-code-sm text-label-code-sm text-outline">Pipeline Disarmed</span>
</div>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">

<div className="lg:col-span-7 flex flex-col gap-space-lg">
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-2">
<span className="font-label-code-sm text-label-code-sm uppercase tracking-widest text-outline font-semibold">
              Performance Delta Matrix
            </span>
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-semibold">
              HOLDOUT SPLIT: N=60,000
            </span>
</div>
<span className="font-label-code-sm text-label-code-sm text-outline">
            Refreshed: 14m ago
          </span>
</div>

<div className="overflow-x-auto">
<table className="w-full text-left font-body-sm text-body-sm">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-code-sm text-label-code-sm uppercase tracking-wider">
<th className="py-2.5 px-3 rounded-l">Metric Domain</th>
<th className="py-2.5 px-3">Production (v2.3.1)</th>
<th className="py-2.5 px-3">Candidate (v2.4.0-cand)</th>
<th className="py-2.5 px-3 rounded-r text-right">Variance & Impact</th>
</tr>
</thead>
<tbody className="divide-y divide-transparent">

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-3 font-semibold text-on-surface">
<div className="flex items-center gap-1.5">
<span>Macro F1 Score</span>
<span className="material-symbols-outlined text-[14px] text-outline" title="Harmonic mean of precision and recall across all four classes">info</span>
</div>
</td>
<td className="py-3 px-3 font-label-code text-label-code text-on-surface">87.21%</td>
<td className="py-3 px-3 font-label-code text-label-code text-on-surface font-semibold">87.17%</td>
<td className="py-3 px-3 text-right">
<span className="inline-flex items-center font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-error-container text-on-error-container font-semibold">
                    -0.04 pp ↓
                  </span>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-3 text-on-surface">Weighted F1 Score</td>
<td className="py-3 px-3 font-label-code text-label-code text-on-surface">91.45%</td>
<td className="py-3 px-3 font-label-code text-label-code text-on-surface">91.52%</td>
<td className="py-3 px-3 text-right">
<span className="inline-flex items-center font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                    +0.07 pp ↑
                  </span>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-3 text-on-surface">Global Precision / Accuracy</td>
<td className="py-3 px-3 font-label-code text-label-code text-on-surface">94.10%</td>
<td className="py-3 px-3 font-label-code text-label-code text-on-surface">94.18%</td>
<td className="py-3 px-3 text-right">
<span className="inline-flex items-center font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                    +0.08 pp ↑
                  </span>
</td>
</tr>

<tr className="bg-error-container/20 hover:bg-error-container/30 transition-colors">
<td className="py-3 px-3 font-semibold text-on-error-container">
<div className="flex items-center gap-1.5">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span>
<span>Policy Abuser Recall</span>
</div>
<span className="font-label-code-sm text-label-code-sm text-error font-normal block">Gate 4 Guardrail Violation</span>
</td>
<td className="py-3 px-3 font-label-code text-label-code text-on-surface">79.40%</td>
<td className="py-3 px-3 font-label-code text-label-code text-error font-bold">77.80%</td>
<td className="py-3 px-3 text-right">
<span className="inline-flex items-center gap-1 font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-error text-on-error font-bold shadow-sm">
                    -1.60 pp ↓ REGRESSION
                  </span>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-3 text-on-surface">Fraud Recall (Rings & Stolen)</td>
<td className="py-3 px-3 font-label-code text-label-code text-on-surface">92.10%</td>
<td className="py-3 px-3 font-label-code text-label-code text-on-surface font-semibold">93.40%</td>
<td className="py-3 px-3 text-right">
<span className="inline-flex items-center font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                    +1.30 pp ↑
                  </span>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-3 text-on-surface">Wardrobing & Serial Tag Abuse</td>
<td className="py-3 px-3 font-label-code text-label-code text-on-surface">81.30%</td>
<td className="py-3 px-3 font-label-code text-label-code text-on-surface">81.45%</td>
<td className="py-3 px-3 text-right">
<span className="inline-flex items-center font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                    +0.15 pp ↑
                  </span>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-3 text-on-surface">Legitimate Shopper Recall</td>
<td className="py-3 px-3 font-label-code text-label-code text-on-surface">96.04%</td>
<td className="py-3 px-3 font-label-code text-label-code text-on-surface">95.84%</td>
<td className="py-3 px-3 text-right">
<span className="inline-flex items-center font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-error-container text-on-error-container">
                    -0.20 pp ↓
                  </span>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-3 text-on-surface">Inference Latency (p95 SLA)</td>
<td className="py-3 px-3 font-label-code text-label-code text-on-surface">42 ms</td>
<td className="py-3 px-3 font-label-code text-label-code text-on-surface">44 ms</td>
<td className="py-3 px-3 text-right">
<span className="inline-flex items-center font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-surface-container text-outline">
                    +2 ms (SLA {"<"} 50ms)
                  </span>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between mb-2">
<span className="font-label-code-sm text-label-code-sm uppercase tracking-wider text-outline font-semibold">
              Policy Abuser Error Migration
            </span>
<span className="font-label-code-sm text-label-code-sm text-error font-medium">18 Shifts to Legit</span>
</div>
<div className="my-2">

<svg className="w-full h-16" fill="none" viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg">
<rect fill="#213145" height="14" rx="2" width="100" x="0" y="8" />
<rect fill="#ba1a1a" height="14" rx="2" width="70" x="104" y="8" />
<rect fill="#645efb" height="14" rx="2" width="62" x="178" y="8" />
<rect fill="#213145" height="14" rx="2" width="98" x="0" y="32" />
<rect fill="#ba1a1a" height="14" rx="2" width="56" x="102" y="32" />
<rect fill="#645efb" height="14" rx="2" width="78" x="162" y="32" />
<text fill="#76777d" fontFamily="JetBrains Mono" fontSize="7" x="0" y="6">v2.3.1 PROD (True Abuse 79.4%)</text>
<text fill="#ba1a1a" fontFamily="JetBrains Mono" fontSize="7" x="0" y="54">v2.4.0 CANDIDATE (-1.6% Under-flagging)</text>
</svg>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            Candidate model misclassified 18 repeated free-shipping exploiters as legitimate accounts due to under-weighted lifetime returns in feature slice #F-41.
          </p>
</div>

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between mb-2">
<span className="font-label-code-sm text-label-code-sm uppercase tracking-wider text-outline font-semibold">
              Ground Truth Integrity
            </span>
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
              UNCOMPROMISED
            </span>
</div>
<div className="space-y-1.5 my-1">
<div className="flex justify-between items-center text-body-sm">
<span className="text-on-surface-variant">Verified Officer Submissions:</span>
<span className="font-label-code font-semibold text-on-surface">26 Cases</span>
</div>
<div className="flex justify-between items-center text-body-sm">
<span className="text-on-surface-variant">Unverified Auto-Production:</span>
<span className="font-label-code font-semibold text-on-surface">0 (Air-Gapped)</span>
</div>
<div className="flex justify-between items-center text-body-sm">
<span className="text-on-surface-variant">Inter-Annotator Agreement:</span>
<span className="font-label-code font-semibold text-on-surface">κ = 0.94 (Near Perfect)</span>
</div>
</div>
<div className="pt-2">
<div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
<div className="bg-secondary h-full" style={{ width: "52%" }}></div>
</div>
<div className="flex justify-between font-label-code-sm text-label-code-sm text-outline mt-1">
<span>Current: 26 labels</span>
<span>Req: 50 labels (52%)</span>
</div>
</div>
</div>
</div>
</div>

<div className="lg:col-span-5 flex flex-col gap-space-lg">

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
<div className="flex items-center justify-between pb-3 mb-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[20px] text-error">security</span>
<span className="font-headline-sm text-headline-sm text-on-surface">Strict Promotion Safety Gates</span>
</div>
<span className="font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-error-container text-on-error-container font-bold">
            VETO ACTIVE
          </span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
          TrustLoop enforces immutable automated gate criteria before any weight transfer or model artifact can enter canary deployment.
        </p>

<div className="space-y-3">

<div className="p-3 rounded-lg bg-surface-container-low flex items-start justify-between gap-3">
<div className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[14px]">check</span>
</div>
<div className="flex flex-col">
<span className="font-body-md text-body-md font-semibold text-on-surface leading-tight">
                  Gate 1: All 4 Risk Classes Present
                </span>
<span className="font-body-sm text-body-sm text-on-surface-variant">
                  Legit (8), Abuser (6), Fraud (7), Wardrobing (5) verified.
                </span>
</div>
</div>
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-semibold shrink-0">
              PASSED
            </span>
</div>

<div className="p-3 rounded-lg bg-error-container/30 flex items-start justify-between gap-3">
<div className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-error text-on-error flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[14px]">close</span>
</div>
<div className="flex flex-col">
<span className="font-body-md text-body-md font-semibold text-on-error-container leading-tight">
                  Gate 2: Minimum Verified Feedback Count
                </span>
<span className="font-body-sm text-body-sm text-on-surface-variant">
                  Requires ≥ 50 verified ground-truth labels. Currently only 26 captured.
                </span>
</div>
</div>
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-error text-on-error font-bold shrink-0">
              BLOCKED
            </span>
</div>

<div className="p-3 rounded-lg bg-error-container/30 flex items-start justify-between gap-3">
<div className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-error text-on-error flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[14px]">close</span>
</div>
<div className="flex flex-col">
<span className="font-body-md text-body-md font-semibold text-on-error-container leading-tight">
                  Gate 3: Macro F1 Improvement Threshold
                </span>
<span className="font-body-sm text-body-sm text-on-surface-variant">
                  Requires ≥ +0.50 pp uplift. Current candidate delta is -0.04 pp.
                </span>
</div>
</div>
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-error text-on-error font-bold shrink-0">
              BLOCKED
            </span>
</div>

<div className="p-3 rounded-lg bg-error-container/40 flex items-start justify-between gap-3">
<div className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-error text-on-error flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[14px]">close</span>
</div>
<div className="flex flex-col">
<span className="font-body-md text-body-md font-semibold text-on-error-container leading-tight">
                  Gate 4: Protected Class Recall Guardrail
                </span>
<span className="font-body-sm text-body-sm text-on-surface-variant">
                  Max allowable class drop ≤ 1.00 pp. Policy Abuser dropped by 1.60 pp.
                </span>
</div>
</div>
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-error text-on-error font-bold shrink-0">
              BLOCKED
            </span>
</div>

<div className="p-3 rounded-lg bg-surface-container-low flex items-start justify-between gap-3">
<div className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[14px]">check</span>
</div>
<div className="flex flex-col">
<span className="font-body-md text-body-md font-semibold text-on-surface leading-tight">
                  Gate 5: Production Bias & Drift Scan
                </span>
<span className="font-body-sm text-body-sm text-on-surface-variant">
                  Kolmogorov-Smirnov test p {">"} 0.05. No demographic parity anomalies.
                </span>
</div>
</div>
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-semibold shrink-0">
              PASSED
            </span>
</div>
</div>

<div className="mt-4 p-3.5 rounded-lg bg-primary-container text-on-primary flex flex-col gap-2">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-error">gavel</span>
<span className="font-headline-sm text-headline-sm font-bold">OVERALL GOVERNANCE VERDICT</span>
</div>
<p className="font-body-sm text-body-sm text-on-primary-container">
            PROMOTION BLOCKED — CANDIDATE CANNOT BE DEPLOYED TO PRODUCTION.
          </p>
<div className="bg-primary p-2.5 rounded font-label-code-sm text-label-code-sm text-surface-dim mt-1">
            "TrustLoop never allows automatic retraining in production. Candidate models strictly require human sign-off AND all automated gates satisfied."
          </div>
</div>

<div className="mt-4 pt-3 flex items-center gap-3">
<button className="flex-1 py-2 px-3 rounded bg-surface-container-high text-outline font-label-code text-label-code font-bold cursor-not-allowed flex items-center justify-center gap-2 shadow-none opacity-80" disabled type="button">
<span className="material-symbols-outlined text-[18px]">block</span>
<span>PROMOTE TO CANARY (LOCKED)</span>
</button>
<button className="py-2 px-3 rounded bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-label-code text-label-code font-semibold transition-colors flex items-center gap-1.5" type="button">
<span className="material-symbols-outlined text-[16px]">edit_document</span>
<span>Officer Sign-off</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-2">
<span className="font-label-code-sm text-label-code-sm uppercase tracking-wider text-outline font-semibold mb-1">
          Forensic Artifacts & Audit Tools
        </span>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
<button className="p-2.5 rounded bg-surface-container-low hover:bg-surface-container text-left transition-colors flex flex-col justify-between group" type="button">
<span className="material-symbols-outlined text-[18px] text-secondary mb-1">archive</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Download Audit Package</span>
<span className="font-label-code-sm text-label-code-sm text-outline">SHA-256 Bundle</span>
</button>
<button className="p-2.5 rounded bg-surface-container-low hover:bg-surface-container text-left transition-colors flex flex-col justify-between group" type="button">
<span className="material-symbols-outlined text-[18px] text-error mb-1">troubleshoot</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Inspect Regression Slices</span>
<span className="font-label-code-sm text-label-code-sm text-outline">18 Regressed Returns</span>
</button>
<button className="p-2.5 rounded bg-surface-container-low hover:bg-surface-container text-left transition-colors flex flex-col justify-between group" type="button">
<span className="material-symbols-outlined text-[18px] text-primary mb-1">grid_on</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Export Confusion Matrix</span>
<span className="font-label-code-sm text-label-code-sm text-outline">Raw Multi-class CSV</span>
</button>
</div>
</div>
</div>
</div>

<div className="mt-space-xl bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
<div className="flex flex-wrap items-center justify-between gap-4 mb-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[20px] text-secondary">fact_check</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface">
          Active Verified Ground Truth Records (26 Demo Seed Annotations)
        </h3>
</div>
<div className="flex items-center gap-2">
<span className="font-label-code-sm text-label-code-sm text-outline">Displaying verified supervisor audit log:</span>
<span className="font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-semibold">
          HASH-CHAIN SEALED
        </span>
</div>
</div>

<div className="overflow-x-auto">
<table className="w-full text-left font-body-sm text-body-sm">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-code-sm text-label-code-sm uppercase tracking-wider">
<th className="py-2 px-3 rounded-l">Case Identifier</th>
<th className="py-2 px-3">Original AI Prediction</th>
<th className="py-2 px-3">Verified Human Truth</th>
<th className="py-2 px-3">Reviewing Officer</th>
<th className="py-2 px-3">Assigned Weight</th>
<th className="py-2 px-3 rounded-r text-right">Verification Time</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container-low">

<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-2.5 px-3 font-label-code text-label-code text-on-surface font-semibold">
              #RET-8941-NYC
            </td>
<td className="py-2.5 px-3">
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-surface-container text-outline">
                Legitimate (68% conf)
              </span>
</td>
<td className="py-2.5 px-3">
<span className="font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-error-container text-on-error-container font-semibold">
                Policy Abuser (Serial Wardrobing)
              </span>
</td>
<td className="py-2.5 px-3 text-on-surface flex items-center gap-1.5">
<span className="w-4 h-4 rounded-full bg-primary text-on-primary text-[9px] flex items-center justify-center font-bold">SL</span>
<span>Sarah Lin (Lead T&S)</span>
</td>
<td className="py-2.5 px-3 font-label-code text-label-code text-on-surface">15.0×</td>
<td className="py-2.5 px-3 text-right font-label-code-sm text-label-code-sm text-outline">Today, 09:14:22</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-2.5 px-3 font-label-code text-label-code text-on-surface font-semibold">
              #RET-8938-LON
            </td>
<td className="py-2.5 px-3">
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-surface-container text-outline">
                Organized Fraud (84% conf)
              </span>
</td>
<td className="py-2.5 px-3">
<span className="font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                Legitimate (Carrier Damaged In-Transit)
              </span>
</td>
<td className="py-2.5 px-3 text-on-surface flex items-center gap-1.5">
<span className="w-4 h-4 rounded-full bg-secondary text-on-secondary text-[9px] flex items-center justify-center font-bold">DK</span>
<span>David K. (Senior Analyst)</span>
</td>
<td className="py-2.5 px-3 font-label-code text-label-code text-on-surface">15.0×</td>
<td className="py-2.5 px-3 text-right font-label-code-sm text-label-code-sm text-outline">Today, 08:42:01</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-2.5 px-3 font-label-code text-label-code text-on-surface font-semibold">
              #RET-8924-SFO
            </td>
<td className="py-2.5 px-3">
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-surface-container text-outline">
                Policy Abuser (52% conf)
              </span>
</td>
<td className="py-2.5 px-3">
<span className="font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-error-container text-on-error-container font-semibold">
                Organized Fraud (Mailing Brick Box)
              </span>
</td>
<td className="py-2.5 px-3 text-on-surface flex items-center gap-1.5">
<span className="w-4 h-4 rounded-full bg-primary text-on-primary text-[9px] flex items-center justify-center font-bold">SL</span>
<span>Sarah Lin (Lead T&S)</span>
</td>
<td className="py-2.5 px-3 font-label-code text-label-code text-on-surface">15.0×</td>
<td className="py-2.5 px-3 text-right font-label-code-sm text-label-code-sm text-outline">Yesterday, 17:29:40</td>
</tr>
</tbody>
</table>
</div>
<div className="mt-3 pt-2 flex items-center justify-between">
<span className="font-body-sm text-body-sm text-outline">
        Displaying 3 of 26 total verified audit entries. 24 additional records stored in air-gapped evaluation ledger.
      </span>
<button className="font-label-code-sm text-label-code-sm text-secondary hover:underline font-semibold flex items-center gap-1" type="button">
<span>View Full 26 Truth Records</span>
<span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</button>
</div>
</div>


</div></main>

    </AppShell>
  );
}
