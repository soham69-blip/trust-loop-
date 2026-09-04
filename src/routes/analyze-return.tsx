import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Bar, Btn, Field, PageHead, Panel, Pill, inputClass } from "@/components/tl";
import { downloadJSON } from "@/lib/export";
import { useTrustLoop, type AnalyzeInput, type AnalyzeResult } from "@/lib/trustloop-store";
import { DECISION_LABEL, RISK_CLASS_LABEL } from "@/lib/demo-data";
import { decisionTone, money, pct, riskTone } from "@/lib/ui-maps";

export const Route = createFileRoute("/analyze-return")({
  head: () => ({
    meta: [
      { title: "Analyze a Return | TrustLoop" },
      {
        name: "description",
        content:
          "Run a live return through the TrustLoop evidence engine: policy checks, vision corroboration, behavioural scoring and a deterministic decision.",
      },
      { property: "og:title", content: "Analyze a Return | TrustLoop" },
      {
        property: "og:description",
        content:
          "Score a return in real time and see every deterministic driver behind the decision.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AnalyzeReturnPage,
});

const PRESETS: Record<string, Partial<AnalyzeInput>> = {
  "Clean defect claim": {
    customer: "Nadia Aziz",
    product: "Patagonia Down Sweater",
    category: "Outerwear",
    sku: "PTG-DWN-3312-BLU",
    value: 279,
    claim: "Baffle seam split along the shoulder after two wears.",
    daysSinceDelivery: 5,
    returnRate: 0.09,
    lifetimeValue: 3400,
    accountAgeYrs: 4.1,
    photosAttached: true,
    tagsIntact: true,
    originalPackaging: true,
    knownRing: false,
  },
  "High-value gate": {
    customer: "Oliver Grant",
    product: "Leica Q3 Compact",
    category: "Electronics / Imaging",
    sku: "LCA-Q3-BLK",
    value: 5995,
    claim: "Sensor dust visible in every frame straight out of the box.",
    daysSinceDelivery: 4,
    returnRate: 0.12,
    lifetimeValue: 18400,
    accountAgeYrs: 5.5,
    photosAttached: true,
    tagsIntact: true,
    originalPackaging: true,
    knownRing: false,
  },
  "Wardrobing pattern": {
    customer: "Tara Fields",
    product: "Reformation Silk Gown",
    category: "Formalwear",
    sku: "RFM-GWN-7781-EMR",
    value: 428,
    claim: "Didn't suit me, returning unworn after the weekend.",
    daysSinceDelivery: 3,
    returnRate: 0.64,
    lifetimeValue: 1900,
    accountAgeYrs: 2.2,
    photosAttached: true,
    tagsIntact: false,
    originalPackaging: false,
    knownRing: false,
  },
  "Known fraud ring": {
    customer: "J.M. Apparel",
    product: "Louis Vuitton Neverfull",
    category: "Luxury / Accessories",
    sku: "LVT-NVF-MM-MON",
    value: 2050,
    claim: "Parcel arrived empty, refund to a new card please.",
    daysSinceDelivery: 26,
    returnRate: 0.88,
    lifetimeValue: 2050,
    accountAgeYrs: 0.1,
    photosAttached: false,
    tagsIntact: false,
    originalPackaging: false,
    knownRing: true,
  },
};

const EMPTY: AnalyzeInput = {
  customer: "",
  product: "",
  category: "Outerwear",
  sku: "",
  value: 299,
  claim: "",
  daysSinceDelivery: 6,
  returnRate: 0.12,
  lifetimeValue: 2400,
  accountAgeYrs: 3,
  photosAttached: true,
  tagsIntact: true,
  originalPackaging: true,
  region: "IN-West (Mumbai)",
  tier: "Tier 2 Loyalty",
  knownRing: false,
};

function AnalyzeReturnPage() {
  const { analyzeReturn, thresholdValue } = useTrustLoop();
  const [form, setForm] = useState<AnalyzeInput>(EMPTY);
  const [result, setResult] = useState<AnalyzeResult | null>(null);

  const set = <K extends keyof AnalyzeInput>(key: K, value: AnalyzeInput[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const applyPreset = (name: string) => {
    setForm((prev) => ({ ...prev, ...EMPTY, ...PRESETS[name] }));
    setResult(null);
    toast.success(`Preset loaded: ${name}`);
  };

  const submit = () => {
    if (!form.product.trim()) {
      toast.error("Add a product name before running the engine.");
      return;
    }
    const outcome = analyzeReturn(form);
    setResult(outcome);
    toast.success(
      `${outcome.case.id} • ${DECISION_LABEL[outcome.decision]} at ${pct(outcome.score)} trust score`,
    );
  };

  return (
    <AppShell>
      <main className="flex-1">
        <PageHead
          eyebrow="Returns Workspace // Evidence Engine"
          title="Analyze a Return"
          description="Submit a return and TrustLoop scores it against live policy thresholds, vision corroboration and behavioural history — then writes the decision to the audit trail."
          actions={
            <>
              <Btn icon="restart_alt" onClick={() => { setForm(EMPTY); setResult(null); }}>
                Clear form
              </Btn>
              <Btn variant="primary" icon="bolt" onClick={submit}>
                Run evidence engine
              </Btn>
            </>
          }
        />

        <div className="grid gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="space-y-4">
            <Panel
              title="Return intake"
              subtitle="Everything below feeds the deterministic scoring model."
              actions={
                <div className="flex flex-wrap gap-1.5">
                  {Object.keys(PRESETS).map((name) => (
                    <Btn key={name} onClick={() => applyPreset(name)}>
                      {name}
                    </Btn>
                  ))}
                </div>
              }
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Customer">
                  <input
                    className={inputClass}
                    value={form.customer}
                    onChange={(e) => set("customer", e.target.value)}
                    placeholder="Full name"
                  />
                </Field>
                <Field label="Product">
                  <input
                    className={inputClass}
                    value={form.product}
                    onChange={(e) => set("product", e.target.value)}
                    placeholder="Item returned"
                  />
                </Field>
                <Field label="Category">
                  <select
                    className={inputClass}
                    value={form.category}
                    onChange={(e) => set("category", e.target.value)}
                  >
                    {[
                      "Outerwear",
                      "Formalwear",
                      "Footwear",
                      "Electronics / Audio",
                      "Electronics / Imaging",
                      "Electronics / Display",
                      "Luxury / Accessories",
                      "Home / Kitchen",
                      "Gaming",
                      "Wearables",
                    ].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="SKU">
                  <input
                    className={inputClass}
                    value={form.sku}
                    onChange={(e) => set("sku", e.target.value)}
                    placeholder="Optional"
                  />
                </Field>
                <Field label="Order value (INR ₹)">
                  <input
                    type="number"
                    min={1}
                    className={inputClass}
                    value={form.value}
                    onChange={(e) => set("value", Number(e.target.value))}
                  />
                </Field>
                <Field
                  label="Days since delivery"
                  hint={`Policy window is ${thresholdValue("returnWindowDays")} days`}
                >
                  <input
                    type="number"
                    min={0}
                    className={inputClass}
                    value={form.daysSinceDelivery}
                    onChange={(e) => set("daysSinceDelivery", Number(e.target.value))}
                  />
                </Field>
                <Field label="Region">
                  <select
                    className={inputClass}
                    value={form.region}
                    onChange={(e) => set("region", e.target.value)}
                  >
                    {["IN-West (Mumbai)", "IN-West (Pune)", "IN-North (Delhi NCR)", "IN-North (Jaipur)", "IN-South (Bengaluru)", "IN-South (Chennai)", "IN-East (Kolkata)", "IN-Central (Indore)"].map(
                      (r) => (
                        <option key={r}>{r}</option>
                      ),
                    )}
                  </select>
                </Field>
                <Field label="Loyalty tier">
                  <select
                    className={inputClass}
                    value={form.tier}
                    onChange={(e) => set("tier", e.target.value)}
                  >
                    {["New Account", "Tier 1", "Tier 2 Loyalty", "VIP Gold", "VIP Diamond"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label={`Historical return rate — ${pct(form.returnRate, 0)}`}>
                  <input
                    type="range"
                    min={0}
                    max={0.95}
                    step={0.01}
                    value={form.returnRate}
                    onChange={(e) => set("returnRate", Number(e.target.value))}
                    className="accent-primary"
                  />
                </Field>
                <Field label={`Lifetime value — ${money(form.lifetimeValue)}`}>
                  <input
                    type="range"
                    min={0}
                    max={25000}
                    step={100}
                    value={form.lifetimeValue}
                    onChange={(e) => set("lifetimeValue", Number(e.target.value))}
                    className="accent-primary"
                  />
                </Field>
                <Field label={`Account age — ${form.accountAgeYrs.toFixed(1)} yrs`}>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    step={0.1}
                    value={form.accountAgeYrs}
                    onChange={(e) => set("accountAgeYrs", Number(e.target.value))}
                    className="accent-primary"
                  />
                </Field>
                <Field label="Customer claim">
                  <textarea
                    className={`${inputClass} min-h-[64px]`}
                    value={form.claim}
                    onChange={(e) => set("claim", e.target.value)}
                    placeholder="What did the shopper report?"
                  />
                </Field>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {(
                  [
                    ["photosAttached", "Photographic evidence attached"],
                    ["tagsIntact", "Security tags intact"],
                    ["originalPackaging", "Original packaging retained"],
                    ["knownRing", "Entity graph flags a known ring"],
                  ] as const
                ).map(([key, label]) => (
                  <label
                    key={key}
                    className="flex cursor-pointer items-center gap-2 rounded border border-outline-variant/30 bg-surface-container-low px-3 py-2"
                  >
                    <input
                      type="checkbox"
                      checked={form[key]}
                      onChange={(e) => set(key, e.target.checked)}
                      className="accent-primary"
                    />
                    <span className="text-body-md text-on-surface">{label}</span>
                  </label>
                ))}
              </div>
            </Panel>
          </div>

          <div className="space-y-4">
            {result ? (
              <>
                <Panel
                  title="Decision"
                  subtitle={`${result.case.id} • written to the audit trail`}
                  actions={
                    <Btn
                      icon="download"
                      onClick={() => {
                        downloadJSON(`trustloop-${result.case.id}-analysis`, result);
                        toast.success("Analysis JSON exported");
                      }}
                    >
                      Export
                    </Btn>
                  }
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone={decisionTone[result.decision]}>{DECISION_LABEL[result.decision]}</Pill>
                    <Pill tone={riskTone[result.riskClass]}>{RISK_CLASS_LABEL[result.riskClass]}</Pill>
                  </div>
                  <div className="mt-4 font-display-sm text-display-sm font-bold tracking-tight text-on-surface">
                    {pct(result.score)}
                  </div>
                  <p className="mt-1 text-body-sm text-on-surface-variant">
                    Trust score. Auto-approve at ≥ {pct(thresholdValue("autoApproveScore"), 0)}, auto-reject at ≤{" "}
                    {pct(thresholdValue("autoRejectScore"), 0)}, autonomous cap{" "}
                    {money(thresholdValue("autoApproveValue"))}.
                  </p>
                  <div className="mt-3">
                    <Bar value={result.score} tone={decisionTone[result.decision]} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      to="/case/$caseId"
                      params={{ caseId: result.case.id }}
                      className="inline-flex items-center gap-1.5 rounded bg-primary px-3 py-1.5 text-label-md font-semibold text-on-primary"
                    >
                      <span className="material-symbols-outlined text-[17px]">open_in_new</span>
                      Open investigation case
                    </Link>
                    <Link
                      to="/review-queue"
                      className="inline-flex items-center gap-1.5 rounded border border-outline-variant/40 bg-surface-container-low px-3 py-1.5 text-label-md font-semibold text-on-surface"
                    >
                      Review queue
                    </Link>
                  </div>
                </Panel>

                <Panel title="Deterministic drivers" subtitle={`${result.reasons.length} signals evaluated`}>
                  <ul className="space-y-2">
                    {result.reasons.map((r) => (
                      <li
                        key={r.label}
                        className="rounded border border-outline-variant/30 bg-surface-container-low p-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-title-md text-title-md font-semibold text-on-surface">
                            {r.label}
                          </span>
                          <Pill tone={r.impact >= 0 ? "positive" : "negative"}>
                            {r.impact >= 0 ? "+" : ""}
                            {(r.impact * 100).toFixed(0)} pp
                          </Pill>
                        </div>
                        <p className="mt-1 text-body-sm text-on-surface-variant">{r.detail}</p>
                      </li>
                    ))}
                  </ul>
                </Panel>
              </>
            ) : (
              <Panel title="How the engine decides">
                <ol className="space-y-3">
                  {[
                    ["Claim text", "NLP entity extraction maps the written claim to a defect vector."],
                    ["Policy engine", "Return window, packaging and proof-of-purchase rules are evaluated deterministically."],
                    ["Computer vision", "Submitted imagery is matched against the defect and duplicate-hash databases."],
                    ["Behavioural ML", "Return velocity, lifetime value and entity-graph proximity adjust the trust prior."],
                    ["Human gate", `Anything above ${money(thresholdValue("autoApproveValue"))} always requires a human sign-off.`],
                  ].map(([title, detail], i) => (
                    <li key={title} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary-container font-label-code-sm text-label-code-sm font-bold text-on-primary">
                        {i + 1}
                      </span>
                      <span>
                        <span className="block font-title-md text-title-md font-semibold text-on-surface">
                          {title}
                        </span>
                        <span className="block text-body-sm text-on-surface-variant">{detail}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </Panel>
            )}
          </div>
        </div>
      </main>
    </AppShell>
  );
}
