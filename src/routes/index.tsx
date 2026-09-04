import { createFileRoute, Link } from "@tanstack/react-router";

import { useMetrics, useTrustLoop } from "@/lib/trustloop-store";
import { money, pct } from "@/lib/ui-maps";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TrustLoop | Every return has a story" },
      {
        name: "description",
        content:
          "AI risk analysis, policy checks, computer vision and human verification turn uncertain returns into explainable decisions. Explore the full live demo.",
      },
      { property: "og:title", content: "TrustLoop | Every return has a story" },
      {
        property: "og:description",
        content:
          "Explore a fully interactive returns-intelligence demo: analyse returns, adjudicate cases, break fraud rings and govern model promotion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const FEATURES: { icon: string; title: string; detail: string; to: string }[] = [
  {
    icon: "document_scanner",
    title: "Analyze a return",
    detail: "Run the deterministic scoring engine on any scenario and watch the decision and drivers change live.",
    to: "/analyze-return",
  },
  {
    icon: "rule",
    title: "Human review queue",
    detail: "Claim, assign, prioritise and adjudicate every escalation with a full audit trail.",
    to: "/review-queue",
  },
  {
    icon: "radar",
    title: "Fraud & savings radar",
    detail: "Inspect entity-graph rings, restrict or clear them, and see the exposure you protect.",
    to: "/fraud-radar",
  },
  {
    icon: "insights",
    title: "Analytics & exposure",
    detail: "Decision mix, category risk and financial exposure across the whole return ledger.",
    to: "/analytics",
  },
  {
    icon: "psychology",
    title: "Controlled learning",
    detail: "Stage human-verified ground truth; the model only learns from labels a person confirmed.",
    to: "/controlled-learning",
  },
  {
    icon: "fact_check",
    title: "Model registry & gates",
    detail: "Five hard gates stand between a candidate model and production traffic.",
    to: "/model-registry",
  },
];

function LandingPage() {
  const { cases, clusters, audit } = useTrustLoop();
  const metrics = useMetrics();

  return (
    <div className="min-h-screen bg-background text-on-surface antialiased">
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-outline-variant/30 bg-surface-container-lowest/90 px-5 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-container text-on-primary">
            <span className="material-symbols-outlined text-[19px]">all_inclusive</span>
          </div>
          <span className="font-headline-sm text-headline-sm font-bold tracking-tight">TrustLoop</span>
          <span className="rounded border border-outline-variant/40 bg-surface-container-high px-1.5 py-0.5 font-label-code-sm text-label-code-sm font-semibold uppercase tracking-wider text-on-surface-variant">
            Demo
          </span>
        </div>
        <nav className="flex items-center gap-2">
          <Link
            to="/analyze-return"
            className="hidden rounded px-3 py-1.5 text-label-md font-semibold text-on-surface-variant hover:bg-surface-container-low sm:inline-flex"
          >
            Analyze a return
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 rounded bg-primary px-3 py-1.5 text-label-md font-semibold text-on-primary hover:opacity-90"
          >
            <span className="material-symbols-outlined text-[17px]">play_arrow</span>
            Launch live demo
          </Link>
        </nav>
      </header>

      <main>
        <section className="border-b border-outline-variant/30 bg-surface-container-lowest px-6 py-14">
          <div className="mx-auto max-w-5xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-outline-variant/40 bg-surface-container-low px-2.5 py-1 font-label-code-sm text-label-code-sm font-semibold uppercase tracking-wider text-on-surface-variant">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              Live evidence engine v2.4 • synthetic data only
            </span>
            <h1 className="mt-4 font-display-sm text-display-sm font-bold tracking-tight text-on-surface">
              Every return has a story. TrustLoop finds the evidence.
            </h1>
            <p className="mt-3 max-w-2xl text-body-lg text-on-surface-variant">
              TrustLoop combines AI risk analysis, return policy, visual inspection and human
              verification to turn uncertain returns into explainable business decisions. Every screen
              in this demo is interactive and runs on dummy data stored in your browser.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 rounded bg-primary px-4 py-2 text-label-md font-semibold text-on-primary hover:opacity-90"
              >
                <span className="material-symbols-outlined text-[18px]">space_dashboard</span>
                Open the dashboard
              </Link>
              <Link
                to="/analyze-return"
                className="inline-flex items-center gap-1.5 rounded border border-outline-variant/40 bg-surface-container-low px-4 py-2 text-label-md font-semibold text-on-surface hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-[18px]">science</span>
                Score a return now
              </Link>
              <Link
                to="/review-queue"
                className="inline-flex items-center gap-1.5 rounded border border-outline-variant/40 bg-surface-container-low px-4 py-2 text-label-md font-semibold text-on-surface hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-[18px]">rule</span>
                Work the review queue
              </Link>
            </div>

            <dl className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Demo returns loaded", value: String(cases.length) },
                { label: "Autonomous decision rate", value: pct(metrics.pctAuto) },
                { label: "Exposure protected", value: money(metrics.protectedExposure) },
                { label: "Audit entries", value: String(audit.length) },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-outline-variant/30 bg-surface-container-low p-4"
                >
                  <dt className="font-label-code-sm text-label-code-sm font-semibold uppercase tracking-widest text-outline">
                    {s.label}
                  </dt>
                  <dd className="mt-2 font-display-sm text-display-sm font-bold tracking-tight text-on-surface">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-headline-sm text-headline-sm font-bold tracking-tight text-on-surface">
              Explore every part of the loop
            </h2>
            <p className="mt-1 text-body-md text-on-surface-variant">
              {clusters.length} synthetic fraud rings, {cases.length} returns and a full governance
              trail are preloaded so you can test each feature end to end.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {FEATURES.map((f) => (
                <Link
                  key={f.to}
                  to={f.to}
                  className="group rounded-lg border border-outline-variant/30 bg-surface-container-lowest p-4 transition-colors hover:border-primary/60 hover:bg-surface-container-low"
                >
                  <span className="material-symbols-outlined text-[22px] text-primary">{f.icon}</span>
                  <h3 className="mt-2 font-title-md text-title-md font-semibold text-on-surface">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-body-sm text-on-surface-variant">{f.detail}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-body-md font-semibold text-primary">
                    Open
                    <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                      arrow_forward
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-outline-variant/30 bg-surface-container-lowest px-6 py-12">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-headline-sm text-headline-sm font-bold tracking-tight text-on-surface">
                AI assists • Evidence explains • Humans verify
              </h2>
              <p className="mt-1 max-w-xl text-body-md text-on-surface-variant">
                No real or sensitive data is used anywhere in this demo. Reset the dataset any time
                from Settings.
              </p>
            </div>
            <Link
              to="/settings"
              className="inline-flex items-center gap-1.5 rounded border border-outline-variant/40 bg-surface-container-low px-4 py-2 text-label-md font-semibold text-on-surface hover:bg-surface-container-high"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              Settings & thresholds
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-outline-variant/30 px-6 py-6 text-center font-label-code-sm text-label-code-sm text-outline">
        TrustLoop demo sandbox — synthetic data only.
      </footer>
    </div>
  );
}
