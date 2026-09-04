import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/fraud-radar")({
  head: () => ({
    meta: [
      { title: "Fraud and Savings Radar | TrustLoop" },
      { name: "description", content: "Cross-return entity graph and network pattern detection across devices, payments and addresses." },
      { property: "og:title", content: "Fraud and Savings Radar | TrustLoop" },
      { property: "og:description", content: "Cross-return entity graph and network pattern detection across devices, payments and addresses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PageFraudRadar,
});

function PageFraudRadar() {
  return (
    <AppShell>
<main className="relative pt-14 w-full px-grid-margin py-space-lg flex-1 bg-surface"><div className="flex flex-col w-full gap-space-lg">

<div className="w-full bg-surface-container-high rounded-xl p-space-md shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-sm text-on-surface">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-on-secondary shrink-0 shadow-sm">
<span className="material-symbols-outlined text-[20px]">radar</span>
</div>
<div>
<div className="flex items-center gap-2">
<h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">Fraud & Savings Radar</h1>
<span className="font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-primary-container text-on-primary font-semibold uppercase">Cluster Engine v4.2</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">Cross-return entity graph and network pattern detection across devices, payments, and addresses.</p>
</div>
</div>

<div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface shadow-sm">
<span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
<div className="flex flex-col">
<span className="font-label-code-sm text-label-code-sm uppercase font-semibold text-secondary">DEMO ESTIMATE</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Values shown are simulated operational metrics based on synthetic enterprise benchmark data.</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-sm">

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between text-on-surface-variant mb-2">
<span className="font-label-code-sm text-label-code-sm uppercase tracking-wider font-semibold">Protected Exposure</span>
<span className="material-symbols-outlined text-[18px] text-on-tertiary-container">shield_with_heart</span>
</div>
<div>
<div className="flex items-baseline gap-1">
<span className="font-metric-display text-metric-display text-on-surface font-bold tracking-tight">$148,250</span>
<span className="font-label-code-sm text-label-code-sm text-on-tertiary-container font-semibold">+18.4%</span>
</div>
<div className="flex items-center gap-1 mt-1">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
<span className="font-label-code-sm text-label-code-sm text-outline uppercase tracking-wider">DEMO ESTIMATE</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between text-on-surface-variant mb-2">
<span className="font-label-code-sm text-label-code-sm uppercase tracking-wider font-semibold">Intercepted Returns</span>
<span className="material-symbols-outlined text-[18px] text-secondary">block</span>
</div>
<div>
<div className="flex items-baseline gap-1">
<span className="font-metric-display text-metric-display text-on-surface font-bold tracking-tight">342</span>
<span className="font-label-code-sm text-label-code-sm text-outline">cases</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-1 block">99.1% intercept precision</span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between text-on-surface-variant mb-2">
<span className="font-label-code-sm text-label-code-sm uppercase tracking-wider font-semibold">Abuse Clusters</span>
<span className="material-symbols-outlined text-[18px] text-error">hub</span>
</div>
<div>
<div className="flex items-baseline gap-1">
<span className="font-metric-display text-metric-display text-error font-bold tracking-tight">18</span>
<span className="font-label-code-sm text-label-code-sm text-error font-semibold">active rings</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-1 block">4 flagged high velocity</span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between text-on-surface-variant mb-2">
<span className="font-label-code-sm text-label-code-sm uppercase tracking-wider font-semibold">Similarity Match</span>
<span className="material-symbols-outlined text-[18px] text-secondary">fingerprint</span>
</div>
<div>
<div className="flex items-baseline gap-1">
<span className="font-metric-display text-metric-display text-on-surface font-bold tracking-tight">94.6%</span>
<span className="font-label-code-sm text-label-code-sm text-secondary font-semibold">vector score</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-1 block">Multi-modal cross matching</span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between text-on-surface-variant mb-2">
<span className="font-label-code-sm text-label-code-sm uppercase tracking-wider font-semibold">Time Saved</span>
<span className="material-symbols-outlined text-[18px] text-on-primary-container">timer</span>
</div>
<div>
<div className="flex items-baseline gap-1">
<span className="font-metric-display text-metric-display text-on-surface font-bold tracking-tight">18.5m</span>
<span className="font-label-code-sm text-label-code-sm text-outline">/ case</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-1 block">Autonomous graph synthesis</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">

<div className="lg:col-span-8 flex flex-col gap-space-md">

<div className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col">

<div className="px-space-md py-space-sm bg-surface-container flex items-center justify-between flex-wrap gap-2">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-error animate-pulse"></span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Syndicate Graph #409</span>
<span className="font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-error-container text-on-error-container font-semibold uppercase tracking-wider">High Risk Ring</span>
</div>

<div className="flex items-center gap-1 bg-surface-container-lowest rounded-lg p-0.5 shadow-sm">
<button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface" id="btn-zoom-in" title="Zoom in" type="button">
<span className="material-symbols-outlined text-[18px]">zoom_in</span>
</button>
<button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface" id="btn-zoom-out" title="Zoom out" type="button">
<span className="material-symbols-outlined text-[18px]">zoom_out</span>
</button>
<button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface" id="btn-center" title="Reset view" type="button">
<span className="material-symbols-outlined text-[18px]">center_focus_strong</span>
</button>
<div className="w-px h-4 bg-outline-variant/40 mx-0.5"></div>
<button className="px-2 py-1 rounded bg-surface-container-high font-label-code-sm text-label-code-sm font-semibold text-on-surface flex items-center gap-1" type="button">
<span className="material-symbols-outlined text-[14px]">filter_alt</span> Layer: All Nodes
            </button>
</div>
</div>

<div className="relative w-full h-[580px] bg-surface-container-low overflow-hidden select-none" id="graph-viewport">

<svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
<defs>
<pattern height="40" id="radar-grid" patternUnits="userSpaceOnUse" width="40">
<path d="M 40 0 L 0 0 0 40" fill="none" stroke="#76777d" strokeDasharray="2,2" strokeWidth="0.5" />
</pattern>
</defs>
<rect fill="url(#radar-grid)" height="100%" width="100%" />
</svg>

<svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 900 580">
<defs>
<linearGradient id="edge-crimson" x1="0%" x2="100%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#ba1a1a" stopOpacity="0.8" />
<stop offset="100%" stopColor="#4b41e1" stopOpacity="0.8" />
</linearGradient>
<linearGradient id="edge-secondary" x1="0%" x2="100%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#4b41e1" stopOpacity="0.7" />
<stop offset="100%" stopColor="#0b1c30" stopOpacity="0.5" />
</linearGradient>
</defs>

<path className="animate-[dash_15s_linear_infinite]" d="M 450 280 C 340 280, 240 180, 180 140" fill="none" stroke="url(#edge-crimson)" strokeDasharray="6,4" strokeWidth="2.5" />

<path d="M 450 280 C 560 280, 660 180, 720 140" fill="none" stroke="url(#edge-crimson)" strokeWidth="2.5" />

<path d="M 450 280 C 450 360, 450 420, 450 450" fill="none" stroke="url(#edge-crimson)" strokeWidth="2.5" />

<path d="M 180 140 C 180 260, 230 320, 260 380" fill="none" stroke="url(#edge-secondary)" strokeDasharray="3,3" strokeWidth="1.8" />

<path d="M 720 140 C 680 260, 480 340, 260 380" fill="none" stroke="url(#edge-secondary)" strokeDasharray="3,3" strokeWidth="1.8" />

<path d="M 450 450 C 370 450, 310 420, 260 380" fill="none" stroke="url(#edge-secondary)" strokeDasharray="3,3" strokeWidth="1.8" />

<path d="M 450 280 C 580 280, 650 340, 680 400" fill="none" stroke="#4b41e1" strokeWidth="2" />
</svg>


<div className="absolute top-[240px] left-[350px] w-[200px] z-20 cursor-pointer transition-transform hover:scale-105">
<div className="bg-primary text-on-primary rounded-xl p-3 shadow-xl flex flex-col items-center text-center ring-4 ring-error/20">
<div className="w-10 h-10 rounded-full bg-error flex items-center justify-center text-on-error mb-1.5 shadow">
<span className="material-symbols-outlined text-[24px]">group_remove</span>
</div>
<span className="font-label-code-sm text-label-code-sm text-surface-variant font-semibold tracking-wider">CLUSTER DETECTED</span>
<span className="font-headline-sm text-headline-sm font-bold text-on-primary leading-tight mt-0.5">SYNDICATE #409</span>
<div className="mt-1.5 px-2 py-0.5 rounded bg-surface-container-lowest/15 text-surface font-label-code-sm text-label-code-sm font-medium">
                Wardrobing & Empty Box
              </div>
</div>
</div>

<div className="absolute top-[80px] left-[90px] w-[180px] z-10 cursor-pointer transition-all hover:scale-105">
<div className="bg-surface-container-lowest rounded-xl p-2.5 shadow-md flex flex-col gap-1 hover:bg-surface-container-high transition-colors">
<div className="flex items-center justify-between">
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-error-container text-on-error-container font-semibold">High Risk</span>
<span className="material-symbols-outlined text-[16px] text-error">perm_identity</span>
</div>
<span className="font-headline-sm text-headline-sm font-bold text-on-surface">Jessica M.</span>
<span className="font-label-code-sm text-label-code-sm text-on-surface-variant truncate">ID: #USR-90214</span>
<div className="mt-1 pt-1 bg-surface-container-low rounded p-1.5 flex flex-col gap-0.5">
<span className="font-label-code-sm text-label-code-sm font-semibold text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[12px]">smartphone</span> Shared Device
                </span>
<span className="font-label-code-sm text-label-code-sm text-outline truncate">iPhone 15 Pro • 0x8F9A</span>
</div>
</div>
</div>

<div className="absolute top-[80px] right-[90px] w-[180px] z-10 cursor-pointer transition-all hover:scale-105">
<div className="bg-surface-container-lowest rounded-xl p-2.5 shadow-md flex flex-col gap-1 hover:bg-surface-container-high transition-colors">
<div className="flex items-center justify-between">
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-error-container text-on-error-container font-semibold">High Risk</span>
<span className="material-symbols-outlined text-[16px] text-error">person_alert</span>
</div>
<span className="font-headline-sm text-headline-sm font-bold text-on-surface">Jess Miller</span>
<span className="font-label-code-sm text-label-code-sm text-on-surface-variant truncate">ID: #USR-90482</span>
<div className="mt-1 pt-1 bg-surface-container-low rounded p-1.5 flex flex-col gap-0.5">
<span className="font-label-code-sm text-label-code-sm font-semibold text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[12px]">home_pin</span> Shared Address
                </span>
<span className="font-label-code-sm text-label-code-sm text-outline truncate">Apt 4B, Warehouse Dist</span>
</div>
</div>
</div>

<div className="absolute bottom-[30px] left-[360px] w-[180px] z-10 cursor-pointer transition-all hover:scale-105">
<div className="bg-surface-container-lowest rounded-xl p-2.5 shadow-md flex flex-col gap-1 hover:bg-surface-container-high transition-colors">
<div className="flex items-center justify-between">
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-error-container text-on-error-container font-semibold">High Risk</span>
<span className="material-symbols-outlined text-[16px] text-error">business_center</span>
</div>
<span className="font-headline-sm text-headline-sm font-bold text-on-surface">J.M. Apparel</span>
<span className="font-label-code-sm text-label-code-sm text-on-surface-variant truncate">ID: #USR-90811</span>
<div className="mt-1 pt-1 bg-surface-container-low rounded p-1.5 flex flex-col gap-0.5">
<span className="font-label-code-sm text-label-code-sm font-semibold text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[12px]">credit_card</span> Shared Virtual BIN
                </span>
<span className="font-label-code-sm text-label-code-sm text-outline truncate">Stripe Virtual #4128</span>
</div>
</div>
</div>

<div className="absolute bottom-[80px] left-[170px] w-[180px] z-10 cursor-pointer transition-all hover:scale-105">
<div className="bg-surface-container-lowest rounded-xl p-2.5 shadow-md flex flex-col gap-1.5 hover:bg-surface-container-high transition-colors">
<div className="flex items-center justify-between">
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-semibold">Vision Vector</span>
<span className="material-symbols-outlined text-[16px] text-secondary">image_search</span>
</div>
<span className="font-headline-sm text-headline-sm font-bold text-on-surface">Duplicate Stock Photo</span>
<div className="relative w-full h-16 rounded overflow-hidden shadow-sm">
<img className="w-full h-full object-cover" data-alt="Close up photograph of a damaged luxury handbag gold metallic zipper with scuffs on rich textured black calfskin leather, high resolution product defect forensic evidence shot with studio lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCf9PHjqvATvAhnCCFQAt81QWA3cBMpxB2eROoHg4eNfNgcwMBhNKUQ-NlNCeB17vW8Ku-LUJf3x1edVuqZNlI1cmm6kiCcKtMxr0LIHKfKDRdHTAGMmSXwigB8wOZ55rqTEGZ4VFJsqNbdtKwID7htTF8SpP4thglt84RzHQQA49L0TnWE-ASiadOkiexJTPx9ciav7aZKuJJtJBTk5etdORYR70fs6DR9tWABmf1Sf35O8wNg-uFp" />
<div className="absolute inset-0 bg-primary/30 flex items-center justify-center text-on-primary font-label-code-sm text-label-code-sm font-semibold">
                  3x Accounts
                </div>
</div>
<span className="font-label-code-sm text-label-code-sm text-error font-semibold">Claim: 'Defective zipper'</span>
</div>
</div>

<div className="absolute bottom-[70px] right-[120px] w-[190px] z-10 cursor-pointer transition-all hover:scale-105">
<div className="bg-surface-container-lowest rounded-xl p-2.5 shadow-md flex flex-col gap-1 hover:bg-surface-container-high transition-colors">
<div className="flex items-center justify-between">
<span className="font-label-code-sm text-label-code-sm px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-semibold">Target SKU</span>
<span className="material-symbols-outlined text-[16px] text-outline">shopping_bag</span>
</div>
<span className="font-headline-sm text-headline-sm font-bold text-on-surface">Luxury Handbags</span>
<span className="font-label-code-sm text-label-code-sm text-on-surface font-semibold">$1,200 – $2,400 Range</span>
<div className="text-body-sm font-body-sm text-on-surface-variant">
                5 total returns attempted across cluster in past 96 hours.
              </div>
</div>
</div>

<div className="absolute bottom-3 left-3 bg-surface-container-lowest/95 backdrop-blur-sm p-2 rounded-lg shadow-sm flex items-center gap-3">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-error"></span>
<span className="font-label-code-sm text-label-code-sm text-on-surface">Ring Member</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-label-code-sm text-label-code-sm text-on-surface">Evidence Vector</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-primary-container"></span>
<span className="font-label-code-sm text-label-code-sm text-on-surface">Shared Attribute</span>
</div>
</div>
</div>

<div className="px-space-md py-space-sm bg-surface-container-lowest flex flex-wrap items-center justify-between gap-space-sm">
<div className="flex items-center gap-2">
<span className="font-label-code-sm text-label-code-sm text-outline uppercase font-semibold">Intervention:</span>
<span className="font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-error-container text-on-error-container font-semibold">Automated Return Freeze Active</span>
</div>

<div className="flex items-center gap-2">
<button className="px-3 py-1.5 rounded bg-surface-container-high text-on-surface hover:bg-surface-container-highest font-body-md text-body-md font-semibold flex items-center gap-1.5 shadow-sm transition-colors" type="button">
<span className="material-symbols-outlined text-[16px]">download</span> Export Network Graph
            </button>
<button className="px-3 py-1.5 rounded bg-surface-container-high text-on-surface hover:bg-surface-container-highest font-body-md text-body-md font-semibold flex items-center gap-1.5 shadow-sm transition-colors" type="button">
<span className="material-symbols-outlined text-[16px]">description</span> Generate Forensic Report
            </button>
<button className="px-3 py-1.5 rounded bg-primary text-on-primary hover:bg-primary-container font-body-md text-body-md font-semibold flex items-center gap-1.5 shadow-sm transition-colors" type="button">
<span className="material-symbols-outlined text-[16px]">shield_person</span> Apply Policy Restriction
            </button>
</div>
</div>
</div>
</div>

<div className="lg:col-span-4 flex flex-col gap-space-md">

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[20px]">troubleshoot</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Entity Forensic Detail</h2>
</div>
<span className="font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-semibold uppercase">Realtime Node</span>
</div>

<div className="flex flex-col gap-space-sm" id="inspector-content">

<div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="font-label-code-sm text-label-code-sm text-outline uppercase font-semibold">Cluster Similarity Confidence</span>
<span className="font-metric-display text-headline-md text-error font-bold">98.7%</span>
</div>

<div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden flex">
<div className="h-full bg-error" style={{ width: "98.7%" }}></div>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Cross-correlation coefficient across 7 vector endpoints exceeds enterprise safety threshold (85.0%).</span>
</div>

<div className="flex flex-col gap-2">
<span className="font-label-code-sm text-label-code-sm uppercase font-semibold text-outline tracking-wider">Uncovered Ring Correlates</span>
<div className="p-2.5 rounded-lg bg-surface-container flex flex-col gap-1 shadow-sm">
<div className="flex items-center justify-between">
<span className="font-body-sm text-body-sm font-semibold text-on-surface flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-secondary">devices</span> Device Fingerprint Match
                </span>
<span className="font-label-code-sm text-label-code-sm text-error font-bold">100% Vector</span>
</div>
<p className="font-label-code-sm text-label-code-sm text-on-surface-variant font-medium">iPhone 15 Pro, iOS 17.4, Canvas ID 0x8F9A — Observed across Jessica M. & Jess Miller login sessions.</p>
</div>
<div className="p-2.5 rounded-lg bg-surface-container flex flex-col gap-1 shadow-sm">
<div className="flex items-center justify-between">
<span className="font-body-sm text-body-sm font-semibold text-on-surface flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-secondary">share_location</span> Geolocation & Address Loop
                </span>
<span className="font-label-code-sm text-label-code-sm text-error font-bold">97.4% Match</span>
</div>
<p className="font-label-code-sm text-label-code-sm text-on-surface-variant font-medium">Recipient address 'Apt 4B' paired with variations ('Suite 4-B', 'Unit 4B') at single high-velocity drop spot.</p>
</div>
<div className="p-2.5 rounded-lg bg-surface-container flex flex-col gap-1 shadow-sm">
<div className="flex items-center justify-between">
<span className="font-body-sm text-body-sm font-semibold text-on-surface flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-secondary">account_balance_wallet</span> Payment BIN Re-use
                </span>
<span className="font-label-code-sm text-label-code-sm text-error font-bold">Shared Token</span>
</div>
<p className="font-label-code-sm text-label-code-sm text-on-surface-variant font-medium">Disposible virtual card provider (BIN 412800) generated under corporate profile 'J.M. Apparel'.</p>
</div>
<div className="p-2.5 rounded-lg bg-surface-container flex flex-col gap-1 shadow-sm">
<div className="flex items-center justify-between">
<span className="font-body-sm text-body-sm font-semibold text-on-surface flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-secondary">broken_image</span> Synthesized Claim Evidence
                </span>
<span className="font-label-code-sm text-label-code-sm text-error font-bold">Perceptual Hash 0.0</span>
</div>
<p className="font-label-code-sm text-label-code-sm text-on-surface-variant font-medium">Identical stock photo uploaded 3 times across 3 different accounts with altered EXIF timestamps.</p>
</div>
</div>

<div className="bg-surface-container-high rounded-xl p-3 flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-code-sm text-label-code-sm text-outline uppercase font-semibold">Direct Cluster At-Risk</span>
<span className="font-headline-sm text-headline-sm font-bold text-on-surface">$8,450.00</span>
</div>
<div className="flex flex-col text-right">
<span className="font-label-code-sm text-label-code-sm text-outline uppercase font-semibold">Status</span>
<span className="font-label-code-sm text-label-code-sm text-error font-semibold uppercase">Flagged & Held</span>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col gap-2">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[20px] text-primary">gavel</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Officer Next Steps</h3>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Cluster #409 has been cross-referenced with merchant chargeback registries. Escalation to Tier 3 Trust team is recommended prior to customer contact.</p>
<div className="mt-2 flex items-center justify-between pt-2">
<div className="flex items-center gap-1.5">
<div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-code-sm text-label-code-sm font-bold">SL</div>
<span className="font-body-sm text-body-sm text-on-surface font-medium">Assigned: Sarah Lin</span>
</div>
<span className="font-label-code-sm text-label-code-sm text-secondary font-semibold">Case #TR-8819</span>
</div>
</div>
</div>
</div>

<div className="flex flex-col gap-space-sm mt-space-sm">
<div className="flex items-center justify-between">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface font-semibold">Active Pattern Alerts</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Live surveillance triggers categorized by multi-modal threat vectors across store surfaces.</p>
</div>
<div className="flex items-center gap-2">
<span className="font-label-code-sm text-label-code-sm px-2 py-1 rounded bg-surface-container text-on-surface-variant font-medium">3 New High-Priority Triggers</span>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
<div className="flex flex-col gap-2">
<div className="flex items-start justify-between gap-2">
<span className="font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-error-container text-on-error-container font-semibold uppercase">Device Fingerprint Cluster</span>
<span className="font-label-code-sm text-label-code-sm text-outline">12m ago</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">5 Returns / 48 hrs on Single Hardware</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Shared Device ID detected across 3 unique customer emails with identical claims of missing accessories on high-end audio headphones.</p>
<div className="mt-2 bg-surface-container-low p-2.5 rounded-lg flex flex-col gap-1">
<div className="flex items-center justify-between font-label-code-sm text-label-code-sm">
<span className="text-outline">Impact Value:</span>
<span className="font-bold text-on-surface">$2,450.00</span>
</div>
<div className="flex items-center justify-between font-label-code-sm text-label-code-sm">
<span className="text-outline">Hardware Hash:</span>
<span className="font-mono text-on-surface font-medium">a9f0:33b2:c819</span>
</div>
</div>
</div>
<div className="mt-4 pt-3 flex items-center justify-between">
<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-code-sm text-label-code-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span> Intercepted & Blocked
          </span>
<button className="text-secondary hover:text-on-secondary-fixed-variant font-body-sm text-body-sm font-semibold flex items-center gap-0.5" type="button">
            Review Cluster <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
<div className="flex flex-col gap-2">
<div className="flex items-start justify-between gap-2">
<span className="font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-semibold uppercase">Wardrobing Return Velocity</span>
<span className="font-label-code-sm text-label-code-sm text-outline">44m ago</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Weekend Formal Wear Wardrobing</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Recurring delivery on Friday followed by immediate return initiation on Monday across 6 consecutive weekends. Items returned without original tags.</p>
<div className="mt-2 bg-surface-container-low p-2.5 rounded-lg flex flex-col gap-1">
<div className="flex items-center justify-between font-label-code-sm text-label-code-sm">
<span className="text-outline">Impact Value:</span>
<span className="font-bold text-on-surface">$5,120.00</span>
</div>
<div className="flex items-center justify-between font-label-code-sm text-label-code-sm">
<span className="text-outline">Pattern Cycle:</span>
<span className="text-on-surface font-medium">6 Weekends (100% Rate)</span>
</div>
</div>
</div>
<div className="mt-4 pt-3 flex items-center justify-between">
<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-code-sm text-label-code-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-outline"></span> Flagged for Policy Review
          </span>
<button className="text-secondary hover:text-on-secondary-fixed-variant font-body-sm text-body-sm font-semibold flex items-center gap-0.5" type="button">
            Inspect Timeline <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
<div className="flex flex-col gap-2">
<div className="flex items-start justify-between gap-2">
<span className="font-label-code-sm text-label-code-sm px-2 py-0.5 rounded bg-error-container text-on-error-container font-semibold uppercase">Stock Photo Vision Fraud</span>
<span className="font-label-code-sm text-label-code-sm text-outline">1h 10m ago</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Duplicate Defect Image in 2 States</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Computer vision model identified identical pixel artifact distribution across 4 separate buyer claims located in California and Texas.</p>
<div className="mt-2 bg-surface-container-low p-2.5 rounded-lg flex flex-col gap-1">
<div className="flex items-center justify-between font-label-code-sm text-label-code-sm">
<span className="text-outline">Impact Value:</span>
<span className="font-bold text-on-surface">$3,890.00</span>
</div>
<div className="flex items-center justify-between font-label-code-sm text-label-code-sm">
<span className="text-outline">Visual Hash Distance:</span>
<span className="text-error font-bold">0.02 (Duplicate)</span>
</div>
</div>
</div>
<div className="mt-4 pt-3 flex items-center justify-between">
<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-code-sm text-label-code-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span> Escalated to Fraud Team
          </span>
<button className="text-secondary hover:text-on-secondary-fixed-variant font-body-sm text-body-sm font-semibold flex items-center gap-0.5" type="button">
            Compare Images <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</button>
</div>
</div>
</div>
</div>

<div className="fixed bottom-6 right-6 hidden bg-primary text-on-primary px-4 py-3 rounded-xl shadow-xl z-50 flex items-center gap-3 transition-all duration-300 transform translate-y-4 opacity-0" id="action-toast">
<span className="material-symbols-outlined text-secondary" id="toast-icon">check_circle</span>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm font-semibold" id="toast-title">Action Executed</span>
<span className="font-body-sm text-body-sm text-surface-variant" id="toast-desc">Policy updated across cluster nodes.</span>
</div>
</div>
</div>

</main>

    </AppShell>
  );
}
