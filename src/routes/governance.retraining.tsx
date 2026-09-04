import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Bar, Btn, PageHead, Panel, Pill, Stat } from "@/components/tl";
import { downloadJSON } from "@/lib/export";
import { useTrustLoop } from "@/lib/trustloop-store";
import { pct, shortDate } from "@/lib/ui-maps";

export const Route = createFileRoute("/governance/retraining")({
  head: () => ({
    meta: [
      { title: "Safe Retraining | TrustLoop" },
      {
        name: "description",
        content:
          "Run a governed retraining cycle on human-verified labels, inspect every promotion gate and promote a candidate model only when all checks pass.",
      },
      { property: "og:title", content: "Safe Retraining | TrustLoop" },
      {
        property: "og:description",
        content: "A governed retraining pipeline with hard promotion gates and a full audit trail.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RetrainingPage,
});

const STEPS = [
  { key: "collect", label: "Collect verified labels", detail: "Only human-confirmed ground truth enters the training set." },
  { key: "validate", label: "Validate data quality", detail: "Schema, drift and coverage checks run before any fitting." },
  { key: "train", label: "Fit candidate model", detail: "Deterministic training run on the staged label set." },
  { key: "evaluate", label: "Evaluate against production", detail: "Macro-F1, abuser recall and latency compared head to head." },
  { key: "gate", label: "Apply promotion gates", detail: "All gates must pass before traffic can move." },
] as const;

const REQUIRED_LABELS = 50;

function RetrainingPage() {
  const { groundTruth, models, audit, promoteCandidate, log } = useTrustLoop();
  const [runStep, setRunStep] = useState(-1);
  const [running, setRunning] = useState(false);

  const production = models.find((m) => m.stage === "production");
  const candidate = models.find((m) => m.stage === "candidate");

  const gates = useMemo(() => {
    const labels = groundTruth.length;
    return [
      {
        name: "Candidate registered",
        ok: Boolean(candidate),
        detail: candidate ? `${candidate.version} available` : "No candidate model in the registry",
      },
      {
        name: `Minimum ${REQUIRED_LABELS} verified labels`,
        ok: labels >= REQUIRED_LABELS,
        detail: `${labels} human-verified labels staged`,
      },
      {
        name: "Macro-F1 uplift ≥ 0.005",
        ok: Boolean(candidate && production && candidate.macroF1 - production.macroF1 >= 0.005),
        detail:
          candidate && production
            ? `${(candidate.macroF1 - production.macroF1).toFixed(4)} uplift`
            : "Needs both models",
      },
      {
        name: "No abuser-recall regression > 0.01",
        ok: Boolean(candidate && production && production.abuserRecall - candidate.abuserRecall <= 0.01),
        detail:
          candidate && production
            ? `${pct(candidate.abuserRecall)} vs ${pct(production.abuserRecall)}`
            : "Needs both models",
      },
      {
        name: "p95 latency ≤ 250 ms",
        ok: Boolean(candidate && candidate.latencyMs <= 250),
        detail: candidate ? `${candidate.latencyMs} ms` : "Needs a candidate",
      },
    ];
  }, [candidate, production, groundTruth.length]);

  const passing = gates.filter((g) => g.ok).length;
  const allPass = passing === gates.length;
  const completed = runStep >= STEPS.length - 1;

  const runCycle = () => {
    if (running) return;
    setRunning(true);
    setRunStep(0);
    STEPS.forEach((_, i) => {
      setTimeout(() => {
        setRunStep(i);
        if (i === STEPS.length - 1) {
          setRunning(false);
          log(
            "retraining.run",
            candidate?.version ?? "candidate",
            `Governed retraining cycle completed on ${groundTruth.length} verified labels — ${passing}/${gates.length} gates passing.`,
          );
          toast.success(`Retraining cycle complete — ${passing}/${gates.length} gates passing`);
        }
      }, 450 * (i + 1));
    });
  };

  return (
    <AppShell>
      <main className="flex-1">
        <PageHead
          eyebrow="Governance // Safe retraining"
          title="Safe retraining pipeline"
          description="Retraining only ever consumes human-verified labels, and a candidate model reaches production traffic only when every promotion gate passes."
          actions={
            <>
              <Btn
                icon="download"
                onClick={() => {
                  downloadJSON("trustloop-retraining-report", {
                    generatedAt: new Date().toISOString(),
                    labels: groundTruth.length,
                    production,
                    candidate,
                    gates,
                  });
                  toast.success("Retraining report exported");
                }}
              >
                Export report
              </Btn>
              <Btn variant="primary" icon="model_training" onClick={runCycle} disabled={running}>
                {running ? "Running cycle..." : "Run retraining cycle"}
              </Btn>
            </>
          }
        />

        <div className="space-y-4 px-6 py-5">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Stat
              label="Verified labels"
              value={String(groundTruth.length)}
              hint={`${REQUIRED_LABELS} required`}
              tone={groundTruth.length >= REQUIRED_LABELS ? "positive" : "warning"}
              icon="fact_check"
            />
            <Stat label="Production model" value={production?.version ?? "—"} hint={production ? `F1 ${production.macroF1.toFixed(3)}` : "none"} icon="rocket_launch" />
            <Stat label="Candidate model" value={candidate?.version ?? "—"} hint={candidate ? `F1 ${candidate.macroF1.toFixed(3)}` : "none"} tone={candidate ? "info" : "neutral"} icon="science" />
            <Stat label="Gates passing" value={`${passing}/${gates.length}`} tone={allPass ? "positive" : "negative"} hint={allPass ? "promotion unlocked" : "promotion blocked"} icon="verified" />
          </div>

          <Panel title="Pipeline" subtitle="Each stage runs in order; the cycle stops at the gate stage until every check is green.">
            <ol className="space-y-2">
              {STEPS.map((s, i) => {
                const state = runStep >= i ? (running && runStep === i ? "active" : "done") : "idle";
                return (
                  <li
                    key={s.key}
                    className="flex items-start gap-3 rounded border border-outline-variant/30 bg-surface-container-low p-3"
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        state === "done" ? "text-tertiary" : state === "active" ? "text-primary" : "text-outline"
                      }`}
                    >
                      {state === "done" ? "check_circle" : state === "active" ? "autorenew" : "radio_button_unchecked"}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-body-md font-semibold text-on-surface">
                          {i + 1}. {s.label}
                        </span>
                        <Pill tone={state === "done" ? "positive" : state === "active" ? "info" : "neutral"}>
                          {state === "idle" ? "pending" : state}
                        </Pill>
                      </div>
                      <p className="mt-0.5 text-body-sm text-on-surface-variant">{s.detail}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="mt-4">
              <Bar value={(runStep + 1) / STEPS.length} tone={completed ? "positive" : "info"} />
            </div>
          </Panel>

          <div className="grid gap-4 xl:grid-cols-2">
            <Panel title="Promotion gates" subtitle="Deterministic checks recomputed from live demo state.">
              <ul className="space-y-2">
                {gates.map((g) => (
                  <li
                    key={g.name}
                    className="flex items-center justify-between gap-3 rounded border border-outline-variant/30 bg-surface-container-low p-3"
                  >
                    <div className="min-w-0">
                      <p className="text-body-md font-semibold text-on-surface">{g.name}</p>
                      <p className="text-body-sm text-on-surface-variant">{g.detail}</p>
                    </div>
                    <Pill tone={g.ok ? "positive" : "negative"}>{g.ok ? "pass" : "blocked"}</Pill>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Btn
                  variant="primary"
                  icon="rocket_launch"
                  disabled={!allPass || !completed}
                  onClick={() => {
                    const result = promoteCandidate();
                    if (result.ok) toast.success(result.reason);
                    else toast.error(result.reason);
                  }}
                >
                  Promote candidate
                </Btn>
                {!completed ? (
                  <span className="text-body-sm text-on-surface-variant">
                    Run the retraining cycle before promoting.
                  </span>
                ) : null}
                <Link to="/controlled-learning" className="text-body-md font-semibold text-primary hover:underline">
                  Add more verified labels
                </Link>
              </div>
            </Panel>

            <Panel title="Model comparison" subtitle="Candidate against the model currently serving traffic.">
              {production && candidate ? (
                <div className="space-y-3">
                  {[
                    { label: "Macro F1", a: production.macroF1, b: candidate.macroF1 },
                    { label: "Weighted F1", a: production.weightedF1, b: candidate.weightedF1 },
                    { label: "Precision", a: production.precision, b: candidate.precision },
                    { label: "Abuser recall", a: production.abuserRecall, b: candidate.abuserRecall },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="flex justify-between text-body-sm text-on-surface-variant">
                        <span>{m.label}</span>
                        <span>
                          {m.a.toFixed(3)} → {m.b.toFixed(3)}
                        </span>
                      </div>
                      <Bar value={m.b} tone={m.b >= m.a ? "positive" : "negative"} />
                    </div>
                  ))}
                  <div className="flex justify-between text-body-sm text-on-surface-variant">
                    <span>p95 latency</span>
                    <span>
                      {production.latencyMs} ms → {candidate.latencyMs} ms
                    </span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant">{candidate.notes}</p>
                </div>
              ) : (
                <p className="text-body-md text-on-surface-variant">
                  A production and a candidate model are both required to compare metrics.
                </p>
              )}
            </Panel>
          </div>

          <Panel
            title="Governance trail"
            subtitle="Model and retraining activity from the audit log."
            actions={
              <Link to="/audit-log" className="text-body-md font-semibold text-primary hover:underline">
                Full audit log
              </Link>
            }
          >
            <ol className="space-y-2">
              {audit
                .filter((a) => a.action.startsWith("model") || a.action.startsWith("retraining") || a.action.startsWith("label"))
                .slice(0, 8)
                .map((a) => (
                  <li key={a.id} className="flex flex-wrap items-center gap-2 text-body-md">
                    <Pill tone="neutral">{a.action}</Pill>
                    <span className="text-on-surface">{a.detail}</span>
                    <span className="ml-auto font-label-code-sm text-label-code-sm text-outline">
                      {a.actor} • {shortDate(a.at)}
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
