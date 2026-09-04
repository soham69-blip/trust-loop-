import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Bar, Btn, EmptyState, Field, PageHead, Panel, Pill, Stat, inputClass } from "@/components/tl";
import { downloadCSV } from "@/lib/export";
import { RISK_CLASS_LABEL, type RiskClass } from "@/lib/demo-data";
import { useTrustLoop } from "@/lib/trustloop-store";
import { pct } from "@/lib/ui-maps";

export const Route = createFileRoute("/controlled-learning")({
  head: () => ({
    meta: [
      { title: "Controlled Learning & Ground Truth | TrustLoop" },
      {
        name: "description",
        content:
          "Stage human-verified ground-truth labels, weight them for retraining and track progress toward the label volume the next model candidate requires.",
      },
      { property: "og:title", content: "Controlled Learning & Ground Truth | TrustLoop" },
      {
        property: "og:description",
        content: "Human-verified labels are the only data TrustLoop learns from.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ControlledLearningPage,
});

const CLASSES: RiskClass[] = ["legitimate", "wardrobing", "policy_abuser", "organized_fraud"];
const TARGET = 50;

function ControlledLearningPage() {
  const { cases, groundTruth, addGroundTruth, officer } = useTrustLoop();
  const decided = useMemo(
    () => cases.filter((c) => c.decision !== "human_investigation" && c.decision !== "pending"),
    [cases],
  );
  const [caseId, setCaseId] = useState(decided[0]?.id ?? "");
  const [truth, setTruth] = useState<RiskClass>("legitimate");
  const [weight, setWeight] = useState(15);
  const [query, setQuery] = useState("");

  const selected = cases.find((c) => c.id === caseId);
  const labelled = new Set(groundTruth.map((g) => g.caseId));

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return groundTruth.filter((g) =>
      q ? [g.caseId, g.truth, g.officer, g.prediction].some((v) => v.toLowerCase().includes(q)) : true,
    );
  }, [groundTruth, query]);

  const agreement = useMemo(() => {
    if (!groundTruth.length) return 0;
    const agree = groundTruth.filter((g) => g.prediction.toLowerCase().startsWith(g.truth.toLowerCase()))
      .length;
    return agree / groundTruth.length;
  }, [groundTruth]);

  return (
    <AppShell>
      <main className="flex-1">
        <PageHead
          eyebrow="Governance // Human Feedback Loop"
          title="Controlled Learning"
          description="The model only learns from labels a human verified. Stage a corrected label here and it becomes part of the next candidate's training set."
          actions={
            <Btn
              icon="download"
              onClick={() => {
                downloadCSV("trustloop-ground-truth", rows.map((r) => ({ ...r })));
                toast.success("Ground-truth set exported");
              }}
            >
              Export labels
            </Btn>
          }
        />

        <div className="space-y-4 px-6 py-5">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Stat label="Verified labels" value={String(groundTruth.length)} icon="fact_check" />
            <Stat
              label="Toward next candidate"
              value={`${Math.min(100, Math.round((groundTruth.length / TARGET) * 100))}%`}
              hint={`${TARGET} required`}
              tone={groundTruth.length >= TARGET ? "positive" : "warning"}
              icon="flag"
            />
            <Stat label="Model agreement" value={pct(agreement)} icon="handshake" />
            <Stat
              label="Labelled cases"
              value={`${labelled.size}/${cases.length}`}
              icon="inventory_2"
            />
          </div>

          <Panel title="Label volume gate" subtitle={`${groundTruth.length} of ${TARGET} verified labels captured.`}>
            <Bar
              value={groundTruth.length / TARGET}
              tone={groundTruth.length >= TARGET ? "positive" : "warning"}
            />
            <p className="mt-2 text-body-sm text-on-surface-variant">
              Promotion stays blocked in the{" "}
              <Link to="/model-registry" className="font-semibold text-primary underline">
                model registry
              </Link>{" "}
              until this gate clears.
            </p>
          </Panel>

          <Panel title="Stage a verified label" subtitle="Only decided cases can be labelled.">
            <form
              className="grid gap-3 md:grid-cols-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (!selected) {
                  toast.error("Pick a case to label");
                  return;
                }
                addGroundTruth({
                  caseId: selected.id,
                  prediction: `${selected.riskClass} (${(selected.mlScore * 100).toFixed(0)}% conf)`,
                  truth,
                  officer: `${officer} (Lead T&S)`,
                  weight,
                });
                toast.success(`Label staged for ${selected.id}`);
              }}
            >
              <Field label="Case">
                <select
                  value={caseId}
                  onChange={(e) => setCaseId(e.target.value)}
                  className={inputClass}
                >
                  {decided.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.id} — {c.customer}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Verified truth">
                <select
                  value={truth}
                  onChange={(e) => setTruth(e.target.value as RiskClass)}
                  className={inputClass}
                >
                  {CLASSES.map((c) => (
                    <option key={c} value={c}>
                      {RISK_CLASS_LABEL[c]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Training weight" hint="Human labels outweigh synthetic samples.">
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className={inputClass}
                />
              </Field>
              <div className="flex items-end">
                <Btn type="submit" variant="primary" icon="add_task" className="w-full">
                  Stage label
                </Btn>
              </div>
            </form>
            {selected ? (
              <p className="mt-3 text-body-sm text-on-surface-variant">
                Model predicted <strong>{RISK_CLASS_LABEL[selected.riskClass]}</strong> at{" "}
                {pct(selected.mlScore)} trust for {selected.product}.
              </p>
            ) : null}
          </Panel>

          <Panel
            title="Staged ground truth"
            subtitle="Every label is attributed to the officer who verified it."
            actions={
              <input
                aria-label="Search labels"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search case, class, officer..."
                className={`${inputClass} w-auto min-w-56`}
              />
            }
          >
            {rows.length === 0 ? (
              <EmptyState
                icon="labs"
                title="No labels match"
                detail="Stage a verified label above or clear the search filter."
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left">
                  <thead>
                    <tr className="font-label-code-sm text-label-code-sm uppercase tracking-wider text-outline">
                      <th className="px-2 py-2">Case</th>
                      <th className="px-2 py-2">Model prediction</th>
                      <th className="px-2 py-2">Verified truth</th>
                      <th className="px-2 py-2">Officer</th>
                      <th className="px-2 py-2">Weight</th>
                      <th className="px-2 py-2">Staged</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((g, i) => (
                      <tr key={`${g.caseId}-${i}`} className="border-t border-outline-variant/20">
                        <td className="px-2 py-2">
                          <Link
                            to="/case/$caseId"
                            params={{ caseId: g.caseId }}
                            className="font-label-code-sm text-label-code-sm text-primary underline"
                          >
                            {g.caseId}
                          </Link>
                        </td>
                        <td className="px-2 py-2 text-body-md text-on-surface-variant">{g.prediction}</td>
                        <td className="px-2 py-2">
                          <Pill tone={g.truth === "legitimate" ? "positive" : "negative"}>{g.truth}</Pill>
                        </td>
                        <td className="px-2 py-2 text-body-md text-on-surface">{g.officer}</td>
                        <td className="px-2 py-2 text-body-md text-on-surface">{g.weight}x</td>
                        <td className="px-2 py-2 text-body-md text-on-surface-variant">{g.at}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>
        </div>
      </main>
    </AppShell>
  );
}
