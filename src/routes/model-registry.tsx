import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Bar, Btn, PageHead, Panel, Pill, Stat } from "@/components/tl";
import { downloadJSON } from "@/lib/export";
import { useTrustLoop } from "@/lib/trustloop-store";
import { pct } from "@/lib/ui-maps";

export const Route = createFileRoute("/model-registry")({
  head: () => ({
    meta: [
      { title: "Model Registry & Promotion Gates | TrustLoop" },
      {
        name: "description",
        content:
          "Compare production and candidate risk models, inspect the five promotion hard-gates and promote a candidate only when every gate passes.",
      },
      { property: "og:title", content: "Model Registry & Promotion Gates | TrustLoop" },
      {
        property: "og:description",
        content: "Production vs candidate metrics with enforced promotion gates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ModelRegistryPage,
});

function ModelRegistryPage() {
  const { models, groundTruth, promoteCandidate } = useTrustLoop();
  const production = models.find((m) => m.stage === "production");
  const candidate = models.find((m) => m.stage === "candidate");

  const gates = [
    {
      name: "Gate 1 — Candidate staged",
      ok: Boolean(candidate),
      detail: candidate ? `${candidate.version} awaiting review.` : "No candidate model available.",
    },
    {
      name: "Gate 2 — Verified label volume",
      ok: groundTruth.length >= 50,
      detail: `${groundTruth.length} of 50 human-verified ground-truth labels captured.`,
    },
    {
      name: "Gate 3 — Macro F1 uplift",
      ok: Boolean(candidate && production && candidate.macroF1 - production.macroF1 >= 0.005),
      detail:
        candidate && production
          ? `Uplift ${((candidate.macroF1 - production.macroF1) * 100).toFixed(2)} pp vs required +0.50 pp.`
          : "Requires both a production and candidate model.",
    },
    {
      name: "Gate 4 — No abuser-recall regression",
      ok: Boolean(candidate && production && production.abuserRecall - candidate.abuserRecall <= 0.01),
      detail:
        candidate && production
          ? `Candidate recall ${pct(candidate.abuserRecall)} vs production ${pct(production.abuserRecall)}.`
          : "Requires both a production and candidate model.",
    },
    {
      name: "Gate 5 — Latency budget",
      ok: Boolean(candidate && candidate.latencyMs <= 250),
      detail: candidate ? `p95 inference ${candidate.latencyMs} ms against a 250 ms budget.` : "—",
    },
  ];

  const passing = gates.filter((g) => g.ok).length;

  return (
    <AppShell>
      <main className="flex-1">
        <PageHead
          eyebrow="Governance // Model Lifecycle"
          title="Model Registry & Gates"
          description="No model reaches production autonomously. Every gate below must pass before a candidate can be promoted to canary traffic."
          actions={
            <>
              <Btn
                icon="download"
                onClick={() => {
                  downloadJSON("trustloop-model-registry", { models, gates });
                  toast.success("Registry snapshot exported");
                }}
              >
                Export registry
              </Btn>
              <Btn
                variant="primary"
                icon="rocket_launch"
                onClick={() => {
                  const result = promoteCandidate();
                  if (result.ok) toast.success(result.reason);
                  else toast.error(result.reason);
                }}
              >
                Promote candidate
              </Btn>
            </>
          }
        />

        <div className="space-y-4 px-6 py-5">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Stat
              label="Gates passing"
              value={`${passing}/${gates.length}`}
              hint={passing === gates.length ? "ready" : "blocked"}
              tone={passing === gates.length ? "positive" : "negative"}
              icon="verified"
            />
            <Stat
              label="Production macro F1"
              value={production ? production.macroF1.toFixed(3) : "—"}
              icon="model_training"
            />
            <Stat
              label="Candidate macro F1"
              value={candidate ? candidate.macroF1.toFixed(3) : "—"}
              icon="science"
            />
            <Stat label="Verified labels" value={String(groundTruth.length)} icon="fact_check" />
          </div>

          <Panel title="Promotion gates" subtitle="Deterministic checks evaluated against live demo state.">
            <ul className="space-y-2">
              {gates.map((g) => (
                <li
                  key={g.name}
                  className="flex flex-wrap items-center gap-3 rounded border border-outline-variant/30 bg-surface-container-low p-3"
                >
                  <span
                    className={`material-symbols-outlined text-[20px] ${g.ok ? "text-tertiary" : "text-error"}`}
                  >
                    {g.ok ? "check_circle" : "block"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-title-md text-title-md font-semibold text-on-surface">{g.name}</p>
                    <p className="text-body-sm text-on-surface-variant">{g.detail}</p>
                  </div>
                  <Pill tone={g.ok ? "positive" : "negative"}>{g.ok ? "pass" : "blocked"}</Pill>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Registered models" subtitle="Every trained artefact with its evaluation metrics.">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[880px] text-left">
                <thead>
                  <tr className="font-label-code-sm text-label-code-sm uppercase tracking-wider text-outline">
                    <th className="px-2 py-2">Version</th>
                    <th className="px-2 py-2">Stage</th>
                    <th className="px-2 py-2">Macro F1</th>
                    <th className="px-2 py-2">Weighted F1</th>
                    <th className="px-2 py-2">Precision</th>
                    <th className="px-2 py-2">Abuser recall</th>
                    <th className="px-2 py-2">p95 latency</th>
                    <th className="px-2 py-2">Trained</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((m) => (
                    <tr key={m.version} className="border-t border-outline-variant/20 align-top">
                      <td className="px-2 py-2">
                        <span className="font-label-code-sm text-label-code-sm text-on-surface">
                          {m.version}
                        </span>
                        <p className="text-body-sm text-on-surface-variant">{m.notes}</p>
                      </td>
                      <td className="px-2 py-2">
                        <Pill
                          tone={
                            m.stage === "production"
                              ? "positive"
                              : m.stage === "candidate"
                                ? "warning"
                                : "neutral"
                          }
                        >
                          {m.stage}
                        </Pill>
                      </td>
                      <td className="px-2 py-2">
                        <span className="text-body-md text-on-surface">{m.macroF1.toFixed(3)}</span>
                        <Bar value={m.macroF1} />
                      </td>
                      <td className="px-2 py-2 text-body-md text-on-surface">{m.weightedF1.toFixed(3)}</td>
                      <td className="px-2 py-2 text-body-md text-on-surface">{m.precision.toFixed(3)}</td>
                      <td className="px-2 py-2 text-body-md text-on-surface">{pct(m.abuserRecall)}</td>
                      <td className="px-2 py-2 text-body-md text-on-surface">{m.latencyMs} ms</td>
                      <td className="px-2 py-2 text-body-md text-on-surface-variant">{m.trainedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      </main>
    </AppShell>
  );
}
