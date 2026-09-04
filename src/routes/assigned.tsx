import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Bar, Btn, EmptyState, PageHead, Panel, Pill, Stat, inputClass } from "@/components/tl";
import { downloadCSV } from "@/lib/export";
import { REVIEWERS, RISK_CLASS_LABEL } from "@/lib/demo-data";
import { useTrustLoop } from "@/lib/trustloop-store";
import { money, pct, priorityTone, riskTone, shortDate } from "@/lib/ui-maps";

export const Route = createFileRoute("/assigned")({
  head: () => ({
    meta: [
      { title: "Assigned to Me | TrustLoop" },
      {
        name: "description",
        content:
          "Your personal adjudication worklist: cases you claimed, their SLA pressure, and one-click decisions with reviewer notes.",
      },
      { property: "og:title", content: "Assigned to Me | TrustLoop" },
      {
        property: "og:description",
        content: "Work through the cases assigned to you and clear the queue.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssignedPage,
});

function AssignedPage() {
  const { cases, officer, decideCase, assignCase } = useTrustLoop();
  const [note, setNote] = useState("");

  const mine = useMemo(
    () => cases.filter((c) => c.reviewer === officer).sort((a, b) => b.value - a.value),
    [cases, officer],
  );
  const open = mine.filter((c) => c.decision === "human_investigation" || c.decision === "pending");
  const closed = mine.filter((c) => c.decision === "auto_approved" || c.decision === "auto_rejected");
  const exposure = open.reduce((s, c) => s + c.value, 0);

  return (
    <AppShell>
      <main className="flex-1">
        <PageHead
          eyebrow="Human Verification // My Work"
          title="Assigned to Me"
          description={`Everything currently routed to ${officer}. Decisions here close the case, write the audit entry and feed the controlled learning pipeline.`}
          actions={
            <Btn
              icon="download"
              onClick={() => {
                downloadCSV(
                  "trustloop-my-worklist",
                  mine.map((c) => ({
                    case_id: c.id,
                    customer: c.customer,
                    value_usd: c.value,
                    trust_score: c.mlScore,
                    priority: c.priority,
                    decision: c.decision,
                  })),
                );
                toast.success("Worklist exported");
              }}
            >
              Export worklist
            </Btn>
          }
        />

        <div className="space-y-4 p-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Stat label="Open cases" value={String(open.length)} icon="pending_actions" tone="warning" hint="need a decision" />
            <Stat label="Closed today" value={String(closed.length)} icon="task_alt" tone="positive" hint="adjudicated by you" />
            <Stat label="Open exposure" value={money(exposure)} icon="payments" hint="refund value at stake" />
            <Stat
              label="Avg trust score"
              value={open.length ? pct(open.reduce((s, c) => s + c.mlScore, 0) / open.length) : "—"}
              icon="speed"
              tone="info"
              hint="across open cases"
            />
          </div>

          <Panel title="Open worklist" subtitle="Sorted by refund exposure — highest risk first.">
            <input
              className={`${inputClass} mb-3`}
              placeholder="Reviewer note attached to your next decision"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            {open.length === 0 ? (
              <EmptyState
                icon="beach_access"
                title="Worklist empty"
                detail="Claim cases from the review queue to build your worklist."
              />
            ) : (
              <ul className="space-y-3">
                {open.map((c) => (
                  <li key={c.id} className="rounded-lg border border-outline-variant/30 bg-surface-container-low p-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Link
                            to="/case/$caseId"
                            params={{ caseId: c.id }}
                            className="font-label-code-sm text-label-code-sm font-bold text-primary hover:underline"
                          >
                            {c.id}
                          </Link>
                          <Pill tone={priorityTone[c.priority]}>{c.priority}</Pill>
                          <Pill tone={riskTone[c.riskClass]}>{RISK_CLASS_LABEL[c.riskClass]}</Pill>
                        </div>
                        <div className="mt-1 font-title-md text-title-md font-semibold text-on-surface">
                          {c.customer} • {c.product}
                        </div>
                        <div className="font-label-code-sm text-label-code-sm text-outline">
                          {money(c.value)} • filed {shortDate(c.createdAt)} • {c.daysSinceDelivery} days since delivery
                        </div>
                      </div>
                      <div className="w-40 shrink-0">
                        <div className="flex items-center justify-between font-label-code-sm text-label-code-sm text-on-surface-variant">
                          <span>Trust</span>
                          <span className="font-bold text-on-surface">{pct(c.mlScore)}</span>
                        </div>
                        <div className="mt-1">
                          <Bar value={c.mlScore} tone={c.mlScore > 0.6 ? "positive" : c.mlScore > 0.35 ? "warning" : "negative"} />
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 border-t border-outline-variant/20 pt-3">
                      <Btn
                        variant="primary"
                        icon="check"
                        onClick={() => {
                          decideCase(c.id, "auto_approved", { note, stageForTraining: true });
                          toast.success(`${c.id} approved`);
                          setNote("");
                        }}
                      >
                        Approve
                      </Btn>
                      <Btn
                        variant="danger"
                        icon="block"
                        onClick={() => {
                          decideCase(c.id, "auto_rejected", { note, riskClass: "policy_abuser", stageForTraining: true });
                          toast.success(`${c.id} rejected`);
                          setNote("");
                        }}
                      >
                        Reject
                      </Btn>
                      <select
                        className={inputClass}
                        value={c.reviewer ?? ""}
                        onChange={(e) => {
                          assignCase(c.id, e.target.value || null);
                          toast.success("Reassigned");
                        }}
                      >
                        <option value="">Release to queue</option>
                        {REVIEWERS.map((r) => (
                          <option key={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="Recently closed by you" subtitle="Kept here for audit reference.">
            {closed.length === 0 ? (
              <EmptyState icon="history" title="Nothing closed yet" detail="Adjudicate a case to see it here." />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant/30 text-left font-label-code-sm text-label-code-sm uppercase tracking-wider text-outline">
                      <th className="px-2 py-2">Case</th>
                      <th className="px-2 py-2">Customer</th>
                      <th className="px-2 py-2">Value</th>
                      <th className="px-2 py-2">Outcome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {closed.map((c) => (
                      <tr key={c.id} className="border-b border-outline-variant/20">
                        <td className="px-2 py-2">
                          <Link
                            to="/case/$caseId"
                            params={{ caseId: c.id }}
                            className="font-label-code-sm text-label-code-sm text-primary hover:underline"
                          >
                            {c.id}
                          </Link>
                        </td>
                        <td className="px-2 py-2 text-body-md text-on-surface">{c.customer}</td>
                        <td className="px-2 py-2 font-label-code-sm text-label-code-sm text-on-surface">
                          {money(c.value)}
                        </td>
                        <td className="px-2 py-2">
                          <Pill tone={c.decision === "auto_approved" ? "positive" : "negative"}>
                            {c.decision === "auto_approved" ? "Refund approved" : "Claim rejected"}
                          </Pill>
                        </td>
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
