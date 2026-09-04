import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Bar, Btn, PageHead, Panel, Pill, Stat } from "@/components/tl";
import { downloadJSON } from "@/lib/export";
import { useMetrics, useTrustLoop } from "@/lib/trustloop-store";
import { money, pct } from "@/lib/ui-maps";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings & Decision Thresholds | TrustLoop" },
      {
        name: "description",
        content:
          "Tune autonomous refund caps, trust-score thresholds, policy windows and vision confidence floors, then replay them against the live demo data.",
      },
      { property: "og:title", content: "Settings & Decision Thresholds | TrustLoop" },
      {
        property: "og:description",
        content: "Tune the thresholds that decide when TrustLoop acts alone and when a human must verify.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

function format(value: number, unit: string) {
  if (unit === "₹") return money(value);
  if (unit === "days") return `${value} days`;
  return value.toFixed(2);
}

function SettingsPage() {
  const { thresholds, setThreshold, resetThresholds, resetDemo, log, cases, audit, officer } =
    useTrustLoop();
  const metrics = useMetrics();
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <AppShell>
      <main className="flex-1">
        <PageHead
          eyebrow="System // Policy Control"
          title="Settings & Thresholds"
          description="These values drive every automated decision. Changes apply immediately to new analyses and are written to the audit log."
          actions={
            <>
              <Btn
                icon="download"
                onClick={() => {
                  downloadJSON("trustloop-thresholds", thresholds);
                  toast.success("Threshold policy exported");
                }}
              >
                Export policy
              </Btn>
              <Btn
                icon="restart_alt"
                onClick={() => {
                  resetThresholds();
                  log("settings.reset", "thresholds", "All thresholds restored to shipped defaults.");
                  toast.success("Thresholds restored to defaults");
                }}
              >
                Restore defaults
              </Btn>
            </>
          }
        />

        <div className="space-y-4 px-6 py-5">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Stat label="Cases in demo" value={String(metrics.total)} icon="inventory_2" />
            <Stat
              label="Autonomous rate"
              value={pct(metrics.pctAuto)}
              hint="auto-approved"
              tone="positive"
              icon="bolt"
            />
            <Stat
              label="Escalated to humans"
              value={String(metrics.queue)}
              hint="verification required"
              tone="info"
              icon="rule"
            />
            <Stat
              label="Audit entries"
              value={String(audit.length)}
              hint="immutable"
              tone="neutral"
              icon="receipt_long"
            />
          </div>

          <Panel
            title="Decision thresholds"
            subtitle="Move a slider to change how aggressively the engine acts without a human."
          >
            <div className="space-y-5">
              {thresholds.map((t) => (
                <div key={t.key} className="grid gap-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-title-md text-title-md font-semibold text-on-surface">
                        {t.label}
                      </p>
                      <p className="text-body-sm text-on-surface-variant">{t.description}</p>
                    </div>
                    <Pill tone="info">{format(t.value, t.unit)}</Pill>
                  </div>
                  <input
                    type="range"
                    aria-label={t.label}
                    min={t.min}
                    max={t.max}
                    step={t.step}
                    value={t.value}
                    onChange={(e) => setThreshold(t.key, Number(e.target.value))}
                    onMouseUp={() =>
                      log("settings.threshold_changed", t.key, `${t.label} set to ${format(t.value, t.unit)}.`)
                    }
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between font-label-code-sm text-label-code-sm text-outline">
                    <span>{format(t.min, t.unit)}</span>
                    <span>{format(t.max, t.unit)}</span>
                  </div>
                  <Bar value={(t.value - t.min) / (t.max - t.min)} />
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Operator" subtitle="Demo identity used for every audit entry and case assignment.">
            <dl className="grid gap-3 sm:grid-cols-3">
              <div>
                <dt className="font-label-code-sm text-label-code-sm uppercase tracking-wider text-outline">
                  Officer
                </dt>
                <dd className="text-body-md text-on-surface">{officer}</dd>
              </div>
              <div>
                <dt className="font-label-code-sm text-label-code-sm uppercase tracking-wider text-outline">
                  Environment
                </dt>
                <dd className="text-body-md text-on-surface">Demo sandbox (browser storage only)</dd>
              </div>
              <div>
                <dt className="font-label-code-sm text-label-code-sm uppercase tracking-wider text-outline">
                  Data
                </dt>
                <dd className="text-body-md text-on-surface">{cases.length} synthetic returns, no real customers</dd>
              </div>
            </dl>
          </Panel>

          <Panel
            title="Reset demo"
            subtitle="Restores the original demo dataset and clears every decision, label and audit entry you created."
          >
            <div className="flex flex-wrap items-center gap-2">
              {confirmReset ? (
                <>
                  <Btn
                    variant="danger"
                    icon="delete_forever"
                    onClick={() => {
                      resetDemo();
                      setConfirmReset(false);
                      toast.success("Demo data reset");
                    }}
                  >
                    Yes, reset everything
                  </Btn>
                  <Btn variant="ghost" onClick={() => setConfirmReset(false)}>
                    Cancel
                  </Btn>
                </>
              ) : (
                <Btn variant="secondary" icon="restart_alt" onClick={() => setConfirmReset(true)}>
                  Reset demo data
                </Btn>
              )}
            </div>
          </Panel>
        </div>
      </main>
    </AppShell>
  );
}
