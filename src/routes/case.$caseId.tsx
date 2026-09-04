import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/case/$caseId")({
  head: () => ({
    meta: [
      { title: "Investigation Case #CASE-89241 | TrustLoop" },
      { name: "description", content: "Trust passport, four-stream evidence fusion and deterministic drivers behind a flagged high-value return." },
      { property: "og:title", content: "Investigation Case #CASE-89241 | TrustLoop" },
      { property: "og:description", content: "Trust passport, four-stream evidence fusion and deterministic drivers behind a flagged high-value return." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PageCase,
});

function PageCase() {
  return (
    <AppShell>
<main className="relative pt-14 w-full px-grid-margin py-space-lg flex-1 bg-surface"><div className="flex flex-col w-full">

<section className="w-full bg-surface-container-low rounded-lg p-space-sm mb-space-base shadow-sm">
<div className="flex flex-wrap items-center justify-between gap-3">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[18px]">alt_route</span>
<span className="font-label-code-sm text-label-code-sm text-outline uppercase tracking-wider font-semibold">Simulated Scenarios</span>
</div>
<div className="flex flex-wrap items-center gap-1.5" id="scenarioGroup">
<button className="px-2.5 py-1 rounded font-label-code-sm text-label-code-sm text-on-surface-variant hover:text-on-surface hover:bg-surface transition-colors flex items-center gap-1" type="button">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim"></span>
          Scenario 1: Auto-Approved
        </button>
<button className="px-2.5 py-1 rounded bg-surface-container-lowest font-label-code-sm text-label-code-sm font-semibold text-on-surface shadow-sm flex items-center gap-1.5" type="button">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
          Scenario 2: Damaged Item - Aligned (Active)
        </button>
<button className="px-2.5 py-1 rounded font-label-code-sm text-label-code-sm text-on-surface-variant hover:text-on-surface hover:bg-surface transition-colors flex items-center gap-1" type="button">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span>
          Scenario 3: Multi-Account Fraud Ring
        </button>
<button className="px-2.5 py-1 rounded font-label-code-sm text-label-code-sm text-on-surface-variant hover:text-on-surface hover:bg-surface transition-colors flex items-center gap-1" type="button">
<span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
          Scenario 4: Vision Conflict Detected
        </button>
</div>
<div className="flex items-center gap-2">
<span className="font-label-code-sm text-label-code-sm text-outline">ENGINE v2.3.9-ENTERPRISE</span>
</div>
</div>
</section>

<header className="w-full bg-surface-container-lowest rounded-xl p-space-lg mb-space-base shadow-sm">
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
<div className="space-y-1.5 min-w-0">
<div className="flex flex-wrap items-center gap-2">
<span className="font-label-code text-label-code font-bold tracking-tight text-on-surface">CASE-89241</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-code-sm text-label-code-sm font-semibold uppercase flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span>
            HUMAN INVESTIGATION REQUIRED
          </span>
<span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-code-sm text-label-code-sm font-semibold uppercase">
            Priority: High
          </span>
</div>
<div className="flex flex-wrap items-baseline gap-2">
<h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
            Arc'teryx Alpha SV Shell Jacket
          </h1>
<span className="font-label-code text-label-code text-secondary font-semibold">$799.00 USD</span>
<span className="font-body-sm text-body-sm text-outline">SKU: ARC-MN-6641-BLK-L</span>
</div>
<div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-body-sm text-body-sm text-on-surface-variant">
<span className="flex items-center gap-1 font-medium text-on-surface">
<span className="material-symbols-outlined text-[16px] text-outline">account_circle</span>
            Marcus Vance
          </span>
<span className="text-outline">•</span>
<span className="px-1.5 py-0.2 rounded bg-surface-container-low text-outline uppercase font-label-code-sm text-label-code-sm font-semibold">Premium Member</span>
<span className="text-outline">•</span>
<span>Account Age: <strong className="text-on-surface">4.2 yrs</strong></span>
<span className="text-outline">•</span>
<span>Return Rate: <strong className="text-on-surface">11.4%</strong> (4 / 35 orders)</span>
<span className="text-outline">•</span>
<span>Lifetime Value: <strong className="text-on-surface">$4,820.00</strong></span>
</div>
</div>

<div className="flex flex-wrap items-center gap-2 self-start lg:self-center shrink-0">
<div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low">
<div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined text-[14px]">shield_person</span>
</div>
<div className="flex flex-col">
<span className="font-label-code-sm text-label-code-sm text-outline leading-none">ASSIGNED REVIEWER</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface leading-tight">Sarah Lin (You)</span>
</div>
</div>
<button className="px-3 py-1.5 rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-sm text-body-sm font-medium transition-colors flex items-center gap-1.5 shadow-sm" type="button">
<span className="material-symbols-outlined text-[16px]">file_download</span>
          Export Audit Dossier
        </button>
<button className="px-3 py-1.5 rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-sm text-body-sm font-medium transition-colors flex items-center gap-1.5 shadow-sm" type="button">
<span className="material-symbols-outlined text-[16px]">share</span>
          Share Case
        </button>
</div>
</div>
</header>

<section className="w-full bg-surface-container-lowest rounded-xl p-space-lg mb-space-base shadow-sm relative overflow-hidden">
<div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
<div className="flex flex-col xl:flex-row items-stretch gap-space-lg">

<div className="w-full xl:w-72 shrink-0 bg-surface-container-low rounded-lg p-space-base flex flex-col items-center justify-between text-center">
<div className="w-full flex items-center justify-between">
<span className="font-label-code-sm text-label-code-sm uppercase tracking-wider text-outline font-semibold">Trust Passport</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container-high text-outline font-label-code-sm text-label-code-sm">v2.4 GA</span>
</div>
<div className="relative my-3 flex items-center justify-center">
<svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 120 120">
<circle className="text-surface-container-high" cx="60" cy="60" fill="transparent" r="48" stroke="currentColor" strokeWidth="9" />
<circle className="text-secondary transition-all duration-700" cx="60" cy="60" fill="transparent" id="trustScoreRing" r="48" stroke="currentColor" strokeDasharray="301.59" strokeDashoffset="96.5" strokeLinecap="round" strokeWidth="9" />
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="font-metric-display text-metric-display text-on-surface leading-none tracking-tight" id="trustScoreValue">68</span>
<span className="font-label-code-sm text-label-code-sm text-outline mt-0.5">/ 100</span>
</div>
</div>
<div className="space-y-1 w-full">
<div className="px-2 py-1 rounded bg-surface-container-high text-on-surface font-label-code-sm text-label-code-sm font-bold tracking-tight uppercase">
            Human Verification Zone
          </div>
<p className="font-body-sm text-body-sm text-outline">Controlled ambiguity score requiring senior operator sign-off.</p>
</div>
</div>

<div className="flex-1 flex flex-col justify-between space-y-4">
<div className="flex flex-wrap items-center justify-between gap-3">
<div className="flex items-center gap-2.5">
<span className="px-2.5 py-1 rounded bg-secondary text-on-secondary font-label-code text-label-code font-bold uppercase tracking-wider">
              Decision: HUMAN INVESTIGATION
            </span>
<span className="font-body-sm text-body-sm text-on-surface-variant">
              Decision Confidence: <strong className="text-on-surface font-label-code text-label-code" id="decisionConfidence">83.93%</strong>
</span>
</div>
<div className="flex items-center gap-1 text-on-surface-variant font-label-code-sm text-label-code-sm">
<span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">verified</span>
            Validated by Safe-Retraining Policy 04
          </div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
<div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col justify-between space-y-1">
<div className="flex items-center justify-between">
<span className="font-label-code-sm text-label-code-sm text-outline font-semibold uppercase">ML Risk Probability</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container-high font-label-code-sm text-label-code-sm font-bold text-on-surface">71.4% RISK</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface leading-tight">
              Class: <span className="font-medium">Legitimate</span> with Outlier Behavioral Footprint (Cart velocity spike)
            </p>
</div>
<div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col justify-between space-y-1">
<div className="flex items-center justify-between">
<span className="font-label-code-sm text-label-code-sm text-outline font-semibold uppercase">Policy Signal</span>
<span className="px-1.5 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-label-code-sm text-label-code-sm font-bold uppercase">COMPLIANT</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface leading-tight">
              Within 30-day window (6 days post-delivery), proof of purchase valid, original packaging retained.
            </p>
</div>
<div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col justify-between space-y-1">
<div className="flex items-center justify-between">
<span className="font-label-code-sm text-label-code-sm text-outline font-semibold uppercase">Vision Signal</span>
<span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-code-sm text-label-code-sm font-bold uppercase">DAMAGE CONFIRMED</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface leading-tight">
              Micro-tear on waterproof seam matches claim. Confidence 94.1% against synthetic defect database.
            </p>
</div>
<div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col justify-between space-y-1">
<div className="flex items-center justify-between">
<span className="font-label-code-sm text-label-code-sm text-outline font-semibold uppercase">Evidence Consistency</span>
<span className="px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-code-sm text-label-code-sm font-bold">88.2% ALIGNED</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface leading-tight">
              Visual damage strictly corroborates text assertion, but high item value ($799) mandates physical verification.
            </p>
</div>
</div>

<div className="p-3 rounded-lg bg-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-3">
<div className="space-y-0.5 min-w-0">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-secondary">gavel</span>
<span className="font-label-code-sm text-label-code-sm uppercase font-bold text-on-surface">Recommended Action</span>
</div>
<p className="font-body-sm text-body-sm font-medium text-on-surface">
              REQUEST SECONDARY SELLER APPROVAL / APPROVE REPLACEMENT
            </p>
<p className="font-body-sm text-body-sm text-on-surface-variant">
              ML and computer vision corroborate customer claim of seam delamination. Human oversight enforced by $500+ value policy gate.
            </p>
</div>
<div className="shrink-0 flex items-center gap-2">
<button className="px-3 py-1.5 rounded bg-primary text-on-primary font-body-sm text-body-sm font-semibold hover:bg-primary-container transition-colors shadow-sm flex items-center gap-1" type="button">
<span className="material-symbols-outlined text-[16px]">touch_app</span>
              Execute Verification
            </button>
</div>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface-container-lowest rounded-xl p-space-lg mb-space-base shadow-sm">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-space-md mb-space-md">
<div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[20px]">hub</span>
<h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Evidence Fusion Engine</h2>
<span className="px-2 py-0.5 rounded bg-surface-container-high text-outline font-label-code-sm text-label-code-sm font-semibold">4-STREAM CROSS-SYNTHESIS</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
          Deterministic alignment graph evaluating divergence between textual claim, policy parameters, computer vision, and behavioral footprints.
        </p>
</div>

<div className="flex items-center p-1 rounded-lg bg-surface-container-low self-start sm:self-auto">
<button className="px-3 py-1 rounded bg-surface-container-lowest font-label-code-sm text-label-code-sm font-semibold text-on-surface shadow-sm transition-all flex items-center gap-1.5" id="toggleAlignedBtn" type="button">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim"></span>
          Evidence Aligned (Current)
        </button>
<button className="px-3 py-1 rounded font-label-code-sm text-label-code-sm font-medium text-outline hover:text-on-surface transition-all flex items-center gap-1.5" id="toggleConflictBtn" type="button">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span>
          Simulate Vision Conflict
        </button>
</div>
</div>

<div className="w-full bg-surface-container-low rounded-xl p-space-md relative overflow-hidden">
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 relative z-10">

<div className="bg-surface-container-lowest rounded-lg p-space-base flex flex-col justify-between space-y-3 shadow-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px] text-secondary">record_voice_over</span>
<span className="font-label-code-sm text-label-code-sm uppercase font-bold text-on-surface">Stream 1: Claim Text</span>
</div>
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant">NLP 96%</span>
</div>
<div className="p-2.5 rounded bg-surface-container-low font-body-sm text-body-sm text-on-surface italic">
            "Zipper separated and seam tore upon first wear during heavy rainfall on Mount Hood trail."
          </div>
<div className="flex items-center justify-between font-label-code-sm text-label-code-sm text-outline">
<span>Entity: Seam Delamination</span>
<span className="text-secondary font-semibold">Matched Vector</span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-lg p-space-base flex flex-col justify-between space-y-3 shadow-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px] text-secondary">policy</span>
<span className="font-label-code-sm text-label-code-sm uppercase font-bold text-on-surface">Stream 2: Policy Rule</span>
</div>
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant">SEC 4.2</span>
</div>
<div className="p-2.5 rounded bg-surface-container-low font-body-sm text-body-sm text-on-surface">
<strong>Section 4.2:</strong> Manufacturer defects occurring within 30 days are eligible for immediate replacement or full credit.
          </div>
<div className="flex items-center justify-between font-label-code-sm text-label-code-sm text-outline">
<span>Window: Day 6 of 30</span>
<span className="text-tertiary-fixed-dim font-bold">✓ In Policy</span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-lg p-space-base flex flex-col justify-between space-y-3 shadow-sm transition-all duration-300" id="streamVisionCard">
<div className="flex items-center justify-between">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px] text-secondary">center_focus_strong</span>
<span className="font-label-code-sm text-label-code-sm uppercase font-bold text-on-surface">Stream 3: Vision Model</span>
</div>
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant" id="visionModelBadge">ResNet-V4</span>
</div>
<div className="space-y-2">
<div className="relative w-full h-24 rounded bg-surface-container-high overflow-hidden">
<img className="w-full h-full object-cover" data-alt="Close up clinical forensic macro photograph of an outdoor high-performance waterproof jacket sleeve seam showing a clean 3.2 centimeter stress separation tear near the seam tape. High sharpness, balanced studio lighting, neutral slate blue color palette." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDFqd2gpENjerIhxK2BWEPf7ZRYKWvZGyJGDvN6IiSzePS46NPsksK0Xt5ixP4kzSbGeuR1-4BW-UJxUyKCFk3-F3io4uNu7XHFcoJjpGHV69YyVsywC8LE5lTTV0ws1rj1-fzVDXYhJQFhSV3oo3qvnKtqk0ilkxklho7A8VAPsgam5XIGTeJYguo3_Ltusi3DH98frNS4rj_4gnbZCvWLCEy1HDac0qRhbSDW2EOevEjdinMR53S" />
<div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent flex items-end p-1.5">
<span className="font-label-code-sm text-label-code-sm text-on-primary bg-primary/80 px-1.5 py-0.5 rounded" id="visionBoundingLabel">
                  Bounding Box #1: 3.2cm Delam
                </span>
</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface leading-snug" id="visionDesc">
              ResNet-Vision confirmed 3.2cm seam tear with <strong className="text-on-surface">94.1%</strong> defect confidence.
            </p>
</div>
<div className="flex items-center justify-between font-label-code-sm text-label-code-sm text-outline">
<span id="visionStatusLabel">Visual Corroboration</span>
<span className="text-tertiary-fixed-dim font-bold" id="visionMatchTag">MATCH CONFIRMED</span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-lg p-space-base flex flex-col justify-between space-y-3 shadow-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px] text-secondary">analytics</span>
<span className="font-label-code-sm text-label-code-sm uppercase font-bold text-on-surface">Stream 4: Behavioral ML</span>
</div>
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant">Risk 0.18</span>
</div>
<div className="p-2.5 rounded bg-surface-container-low font-body-sm text-body-sm text-on-surface leading-tight">
            Order velocity normal; 2 lifetime returns ($0 dispute rate); billing zip and shipping address 100% matched for 4 years.
          </div>
<div className="flex items-center justify-between font-label-code-sm text-label-code-sm text-outline">
<span>Graph Ring Score</span>
<span className="text-tertiary-fixed-dim font-bold">ISOLATED (SAFE)</span>
</div>
</div>
</div>

<div className="mt-space-md p-space-base rounded-lg bg-surface-container-lowest shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3" id="fusionBanner">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center shrink-0" id="fusionBannerIcon">
<span className="material-symbols-outlined text-[18px]">check_circle</span>
</div>
<div>
<div className="flex items-center gap-2">
<span className="font-headline-sm text-headline-sm font-bold text-on-surface" id="fusionTitle">
                EVIDENCE ALIGNED — LOW FRAUD PROBABILITY, HIGH FINANCIAL VALUE
              </span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant" id="fusionSubtitle">
              Textual description, photographic macro inspection, and historical telemetry show zero contradictions. Human approval is strictly triggered by policy threshold ($799 {">"} $500).
            </p>
</div>
</div>
<div className="shrink-0 flex items-center gap-2">
<span className="font-label-code-sm text-label-code-sm px-2 py-1 rounded bg-surface-container-high font-semibold text-on-surface">
            SYNTHESIS MATRIX: STABLE
          </span>
</div>
</div>
</div>
</section>

<div className="grid grid-cols-1 xl:grid-cols-12 gap-space-base mb-space-base items-start">

<div className="xl:col-span-7 space-y-space-base">

<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
<div className="flex items-center justify-between pb-space-sm mb-space-md">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[20px]">troubleshoot</span>
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Why TrustLoop Flagged This Case</h3>
</div>
<span className="font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-surface-container-high text-outline">5 DETERMINISTIC DRIVERS</span>
</div>
<div className="space-y-3">

<div className="p-3 rounded-lg bg-surface-container-low flex items-start justify-between gap-3">
<div className="flex items-start gap-2.5 min-w-0">
<span className="material-symbols-outlined text-tertiary-fixed-dim text-[20px] shrink-0 mt-0.5">verified</span>
<div className="space-y-0.5">
<span className="font-body-md text-body-md font-semibold text-on-surface block">
                  Visual evidence strictly matches reported damage location
                </span>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                  Customer stated left underarm seam delamination. The computer vision model registered a 3.2cm seam tear exactly on the underarm vent with zero signs of knife/scissor alteration.
                </p>
</div>
</div>
<span className="font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-semibold shrink-0">94.1% CONF</span>
</div>

<div className="p-3 rounded-lg bg-surface-container-low flex items-start justify-between gap-3">
<div className="flex items-start gap-2.5 min-w-0">
<span className="material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5">payments</span>
<div className="space-y-0.5">
<span className="font-body-md text-body-md font-semibold text-on-surface block">
                  Item value exceeds autonomous refund threshold
                </span>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                  Jacket price is $799.00 USD. System threshold for no-questions-asked automated refund is hard-capped at $500.00 USD under Policy Rule PR-GOV-901.
                </p>
</div>
</div>
<span className="font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-error-container text-on-error-container font-semibold shrink-0">HARD GATE</span>
</div>

<div className="p-3 rounded-lg bg-surface-container-low flex items-start justify-between gap-3">
<div className="flex items-start gap-2.5 min-w-0">
<span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">local_shipping</span>
<div className="space-y-0.5">
<span className="font-body-md text-body-md font-semibold text-on-surface block">
                  Carrier tracking confirms delivery 6 days prior (Rapid Report)
                </span>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                  Delivered via UPS tracking 1Z9999999999999999 on Nov 14. Report filed Nov 20. Pattern is inconsistent with wear-and-tear fraud or seasonal wardrobe staging.
                </p>
</div>
</div>
<span className="font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-semibold shrink-0">T+6 DAYS</span>
</div>

<div className="p-3 rounded-lg bg-surface-container-low flex items-start justify-between gap-3">
<div className="flex items-start gap-2.5 min-w-0">
<span className="material-symbols-outlined text-tertiary-fixed-dim text-[20px] shrink-0 mt-0.5">loyalty</span>
<div className="space-y-0.5">
<span className="font-body-md text-body-md font-semibold text-on-surface block">
                  Customer lifetime spend ($4,820) suppresses fraud propensity
                </span>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                  High CLV, low claim friction ratio. Bayesian customer trust prior initialized at 0.92 based on historical transactional durability.
                </p>
</div>
</div>
<span className="font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-semibold shrink-0">TOP 5% VIP</span>
</div>

<div className="p-3 rounded-lg bg-surface-container-low flex items-start justify-between gap-3">
<div className="flex items-start gap-2.5 min-w-0">
<span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">inventory_2</span>
<div className="space-y-0.5">
<span className="font-body-md text-body-md font-semibold text-on-surface block">
                  Cluster Match: 14 past cases with identical batch defect confirmed
                </span>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                  Production lot #LOT-ARC-24F-08 shows elevated Gore-Tex seam tape failure rates reported across 3 regional distribution hubs. Arc'teryx engineering defect notice active.
                </p>
</div>
</div>
<span className="font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-semibold shrink-0">LOT #08 CORRELATION</span>
</div>
</div>
</section>

<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
<div className="flex items-center justify-between pb-space-sm mb-space-md">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[20px]">photo_library</span>
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Inspection Artifacts & Metadata</h3>
</div>
<span className="font-label-code-sm text-label-code-sm text-outline font-medium">3 ARTIFACTS VERIFIED</span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
<div className="bg-surface-container-low rounded-lg p-2 space-y-2">
<div className="relative w-full h-32 rounded bg-surface-container-high overflow-hidden group">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="High resolution forensic product photo showing the exterior chest logo and brand tags of an outdoor technical jacket. Studio lighting, dark slate background, crisp fabric texture and intact zippers." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6_us318P0dA-loZDGsst4suwwPzR6ZXzqZzbb8QLC0sVuQWsRzTGy-9YbS2yt7enh4iPHPX7dl2gCnwulg6wnFe1KMiq0MIbOKFw2TzdMfhlmZLfBhrVBTybhppgDdClG5Mb8jqf8HAx1k1NRFkr9wBOkGKEmN42uGodaEvyUAQyE0Ycx_jjHVr16_oj-JmjN5uwtdJESoJoSDHeXaNsfdQoO1YkmxVnFpZWv5AkaCjq5DzXgUwT6" />
<span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-primary/80 text-on-primary font-label-code-sm text-label-code-sm">Overall Garment</span>
</div>
<div className="space-y-0.5">
<span className="font-label-code-sm text-label-code-sm text-on-surface font-semibold block">IMG_0942_FRONT.RAW</span>
<span className="font-label-code-sm text-label-code-sm text-outline block">Condition: Unworn, Tags Intact</span>
</div>
</div>
<div className="bg-surface-container-low rounded-lg p-2 space-y-2">
<div className="relative w-full h-32 rounded bg-surface-container-high overflow-hidden group">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Macro camera shot showing the delaminated seam on the interior lining of a black technical waterproof shell jacket with microscopic weave details visible. Studio lighting, sharp focus." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTK0v3noPE9D_LxPJlRnMCYnyyj6e5tqy-uKNWZS28NalMZhNGDKL9DQ6TdrTeoJjrOGG5VOtfDsrVvCpbkbrNDeCxnUlEmEsMidJAZnN9x5M-YnPlRpyiGMsVRmHrM764N8cjoAIsQVjoYtkHjZn9UPg7GpiJQtyDCRujyx0QRWf82SwovauUidNpp-l82WRv8NQgYm8lpI5m-slH2-ZOvpK_gN78DxXuYLoPuS-tvoJM93JT_u4D" />
<span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-primary/80 text-on-primary font-label-code-sm text-label-code-sm">Defect Close-Up</span>
</div>
<div className="space-y-0.5">
<span className="font-label-code-sm text-label-code-sm text-on-surface font-semibold block">IMG_0943_SEAM.RAW</span>
<span className="font-label-code-sm text-label-code-sm text-error font-semibold block">Delamination Area: 3.2cm</span>
</div>
</div>
<div className="bg-surface-container-low rounded-lg p-2 space-y-2">
<div className="relative w-full h-32 rounded bg-surface-container-high overflow-hidden group">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Clean photograph of an official paper retail invoice receipt and barcoded warranty card for Arc'teryx jacket on a white desk. Natural balanced overhead lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSBsFKfaBJ5Al0SMF-X4EyrrijvdueZNtxvdBZJshD-3bsnj1nFUBNR5J6nOGvIS2UvpfD14yn4LF3M1m7-yEc97gpeUGz4BAuV5T8lyEVmUCw1JyKMKUWDdLlUEaPLawVRSr85tUeHUBuYGKMKOZNPmxrmhFujLVegloE92aYDWLbVphV2SN_hRmPnakpS8uwsG5exuQsZu_Q6Sl18Hn33yhfN_1RrNrXfj_Yfr3pwmj3RKlrdMq6" />
<span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-primary/80 text-on-primary font-label-code-sm text-label-code-sm">Proof of Purchase</span>
</div>
<div className="space-y-0.5">
<span className="font-label-code-sm text-label-code-sm text-on-surface font-semibold block">RECEIPT_89241.PDF</span>
<span className="font-label-code-sm text-label-code-sm text-tertiary-fixed-dim font-semibold block">Auth: Authorized Dealer</span>
</div>
</div>
</div>
</section>
</div>

<div className="xl:col-span-5 space-y-space-base">

<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm" id="verificationActionBox">
<div className="flex items-center justify-between pb-space-sm mb-space-md">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[22px]">rate_review</span>
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Review Copilot & Decision Gate</h3>
</div>
<span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-code-sm text-label-code-sm font-bold">
            STAGE: PENDING VERIFICATION
          </span>
</div>
<form className="space-y-4" id="verificationForm">

<div className="space-y-2">
<label className="font-label-code-sm text-label-code-sm uppercase tracking-wider text-outline font-semibold block">
              1. Assign Ground Truth Classification
            </label>
<div className="grid grid-cols-2 gap-2" id="groundTruthSelector">
<button className="gt-choice p-2.5 rounded-lg bg-surface-container-high text-left transition-all flex flex-col justify-between" type="button">
<div className="flex items-center justify-between">
<span className="font-body-sm text-body-sm font-bold text-on-surface">Legitimate Return</span>
<span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
</div>
<span className="font-label-code-sm text-label-code-sm text-outline mt-1">Defect or Valid Buyer Regret</span>
</button>
<button className="gt-choice p-2.5 rounded-lg bg-surface-container-low text-left transition-all flex flex-col justify-between" type="button">
<div className="flex items-center justify-between">
<span className="font-body-sm text-body-sm font-medium text-on-surface">Policy Abuser</span>
<span className="w-2 h-2 rounded-full bg-outline"></span>
</div>
<span className="font-label-code-sm text-label-code-sm text-outline mt-1">Exceeds limits / terms stretch</span>
</button>
<button className="gt-choice p-2.5 rounded-lg bg-surface-container-low text-left transition-all flex flex-col justify-between" type="button">
<div className="flex items-center justify-between">
<span className="font-body-sm text-body-sm font-medium text-on-surface">Fraudulent Return</span>
<span className="w-2 h-2 rounded-full bg-outline"></span>
</div>
<span className="font-label-code-sm text-label-code-sm text-outline mt-1">Empty box / Swapped item / Ring</span>
</button>
<button className="gt-choice p-2.5 rounded-lg bg-surface-container-low text-left transition-all flex flex-col justify-between" type="button">
<div className="flex items-center justify-between">
<span className="font-body-sm text-body-sm font-medium text-on-surface">Wardrobing</span>
<span className="w-2 h-2 rounded-full bg-outline"></span>
</div>
<span className="font-label-code-sm text-label-code-sm text-outline mt-1">Worn for event then returned</span>
</button>
</div>
</div>

<div className="space-y-1.5">
<label className="font-label-code-sm text-label-code-sm uppercase tracking-wider text-outline font-semibold block">
              2. Resolution Instruction
            </label>
<div className="relative">
<select className="w-full h-9 pl-3 pr-8 rounded bg-surface-container-low font-body-sm text-body-sm font-medium text-on-surface focus:outline-none focus:bg-surface-container-lowest transition-colors appearance-none cursor-pointer" id="resolutionChoice">
<option value="replace">Approve Full Replacement (Direct Manufacturer Return)</option>
<option value="refund">Issue Full Store Credit ($799.00 USD)</option>
<option value="inspect_physical">Require Physical Lab Inspection Prior to Refund</option>
<option value="reject">Deny Claim and Return Item to Customer</option>
</select>
<span className="material-symbols-outlined absolute right-2.5 top-2 text-[18px] text-outline pointer-events-none">expand_more</span>
</div>
</div>

<div className="space-y-1.5">
<div className="flex items-center justify-between">
<label className="font-label-code-sm text-label-code-sm uppercase tracking-wider text-outline font-semibold block">
                3. Lead Reviewer Forensic Rationale
              </label>
<button className="font-label-code-sm text-label-code-sm text-secondary hover:underline" type="button">Reset Prefill</button>
</div>
<textarea className="w-full p-2.5 rounded bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest transition-colors placeholder:text-outline resize-none" id="reviewerNotes" rows={4} defaultValue={"Reviewed underarm seam photo evidence. Confirmed manufacturing batch LOT-ARC-24F-08 tape delamination anomaly. Customer Marcus Vance has 4.2 year spotless history and $4.8k CLV. Approving manufacturer replacement ticket. Safe for model training ground truth ingest."} />
</div>

<div className="p-2.5 rounded-lg bg-surface-container-low flex items-start gap-2.5">
<input className="mt-1 rounded accent-secondary cursor-pointer" id="retrainingConsent" type="checkbox" />
<div className="space-y-0.5">
<label className="font-body-sm text-body-sm font-semibold text-on-surface cursor-pointer block" htmlFor="retrainingConsent">
                Stage for Candidate Model Retraining (Dataset: Defect-v2.4)
              </label>
<p className="font-body-sm text-body-sm text-outline leading-tight">
                Verified feedback will be staged in the Controlled Learning vault to prevent automated model drift.
              </p>
</div>
</div>

<div className="pt-2">
<button className="w-full py-2.5 rounded bg-primary text-on-primary hover:bg-primary-container font-headline-sm text-headline-sm font-semibold tracking-tight transition-all flex items-center justify-center gap-2 shadow-sm" id="submitVerificationBtn" type="submit">
<span className="material-symbols-outlined text-[20px]">task_alt</span>
              Submit Verification & Ingest Feedback
            </button>
</div>
</form>

<div className="mt-4 pt-3 flex items-center justify-between font-label-code-sm text-label-code-sm text-outline">
<div className="flex items-center gap-1.5">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
<span>Audit pipeline: HMAC signed</span>
</div>
<span>SLO SLA: 18m remaining</span>
</div>
</section>

<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
<div className="flex items-center justify-between pb-space-sm mb-space-md">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[20px]">history</span>
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Case Audit Chronology</h3>
</div>
<span className="font-label-code-sm text-label-code-sm text-outline">5 EVENTS</span>
</div>
<div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-high">

<div className="relative flex flex-col space-y-0.5">
<div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-secondary"></div>
<div className="flex items-center justify-between">
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Case Initialized</span>
<span className="font-label-code-sm text-label-code-sm text-outline">Nov 20, 14:22:04</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Customer Marcus Vance submitted return portal claim with 2 raw images.</p>
</div>

<div className="relative flex flex-col space-y-0.5">
<div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-secondary"></div>
<div className="flex items-center justify-between">
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Behavioral ML Scored</span>
<span className="font-label-code-sm text-label-code-sm text-outline">Nov 20, 14:22:06</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Model XGB-Fraud-v4.1 returned baseline risk probability of 0.18 (Low).</p>
</div>

<div className="relative flex flex-col space-y-0.5">
<div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-secondary"></div>
<div className="flex items-center justify-between">
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Vision Defect Analyzer Evaluated</span>
<span className="font-label-code-sm text-label-code-sm text-outline">Nov 20, 14:22:08</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">ResNet-Vision registered 3.2cm seam delamination, 94.1% defect confidence.</p>
</div>

<div className="relative flex flex-col space-y-0.5">
<div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-secondary"></div>
<div className="flex items-center justify-between">
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Evidence Fusion Engine Synthesized</span>
<span className="font-label-code-sm text-label-code-sm text-outline">Nov 20, 14:22:09</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Cross-stream corroboration confirmed: 88.2% coherence. Score clamped to 68/100 due to $799 value rule.</p>
</div>

<div className="relative flex flex-col space-y-0.5">
<div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-error"></div>
<div className="flex items-center justify-between">
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Dispatched to Lead Reviewer</span>
<span className="font-label-code-sm text-label-code-sm text-outline">Nov 20, 14:22:11</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Assigned to Sarah Lin based on Tier-3 high financial value skill routing.</p>
</div>
</div>
</section>
</div>
</div>

<div className="fixed bottom-6 right-6 max-w-md bg-primary text-on-primary p-4 rounded-xl shadow-xl flex items-start gap-3 transform translate-y-32 opacity-0 transition-all duration-300 pointer-events-none z-50" id="toastNotification">
<div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shrink-0">
<span className="material-symbols-outlined text-[18px]">verified</span>
</div>
<div className="space-y-0.5 min-w-0 flex-1">
<span className="font-headline-sm text-headline-sm font-bold block leading-tight text-on-primary">Feedback Added to Pipeline</span>
<p className="font-body-sm text-body-sm text-inverse-primary leading-snug">
        Ground truth verified by Sarah Lin. Labeled instance staged into Candidate Model v2.4 evaluation queue with zero model corruption.
      </p>
</div>
<button className="text-inverse-primary hover:text-on-primary" type="button">
<span className="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
</div>
</main>

    </AppShell>
  );
}
