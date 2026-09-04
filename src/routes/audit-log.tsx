import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Btn, EmptyState, PageHead, Panel, Pill, Stat, inputClass } from "@/components/tl";
import { demoHash, downloadCSV, downloadJSON } from "@/lib/export";
import { useTrustLoop } from "@/lib/trustloop-store";
import { shortDate } from "@/lib/ui-maps";

export const Route = createFileRoute("/audit-log")({
  head: () => ({
    meta: [
      { title: "Immutable Audit Log | TrustLoop" },
      {
        name: "description",
        content:
          "Every automated decision, human override, threshold change and model promotion recorded as a tamper-evident, exportable audit trail.",
      },
      { property: "og:title", content: "Immutable Audit Log | TrustLoop" },
      {
        property: "og:description",
        content: "A tamper-evident record of every decision TrustLoop and its reviewers make.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuditLogPage,
});

function tone(action: string) {
  if (action.includes("reject") || action.includes("restricted")) return "negative" as const;
  if (action.includes("approve") || action.includes("promoted") || action.includes("cleared"))
    return "positive" as const;
  if (action.includes("threshold") || action.includes("label")) return "warning" as const;
  return "info" as const;
}

function AuditLogPage() {
  const { audit } = useTrustLoop();
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState("all");

  const scopes = useMemo(
    () => ["all", ...Array.from(new Set(audit.map((a) => a.action.split(".")[0] ?? "other")))],
    [audit],
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return audit
      .filter((a) => (scope === "all" ? true : a.action.startsWith(`${scope}.`)))
      .filter((a) =>
        q
          ? [a.id, a.actor, a.action, a.target, a.detail].some((v) => v.toLowerCase().includes(q))
          : true,
      );
  }, [audit, query, scope]);

  const bundleHash = useMemo(
    () => demoHash(rows.map((r) => `${r.id}${r.at}${r.action}${r.target}`).join("|")),
    [rows],
  );

  return (
    <AppShell>
      <main className="flex-1">
        <PageHead
          eyebrow="Governance // Evidence Chain"
          title="Audit Log"
          description="Append-only record of every decision, assignment, threshold change and model action. Export the filtered slice with its verification hash."
          actions={
            <>
              <Btn
                icon="download"
                onClick={() => {
                  downloadCSV("trustloop-audit-log", rows.map((r) => ({ ...r })));
                  toast.success(`${rows.length} entries exported`);
                }}
              >
                Export CSV
              </Btn>
              <Btn
                icon="data_object"
                onClick={() => {
                  downloadJSON("trustloop-audit-bundle", { bundleHash, entries: rows });
                  toast.success("Signed evidence bundle exported");
                }}
              >
                Export bundle
              </Btn>
            </>
          }
        />

        <div className="space-y-4 px-6 py-5">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Stat label="Total entries" value={String(audit.length)} icon="receipt_long" />
            <Stat label="In current view" value={String(rows.length)} icon="filter_alt" />
            <Stat
              label="Actors"
              value={String(new Set(audit.map((a) => a.actor)).size)}
              icon="group"
            />
            <Stat label="Retention" value="7 yrs" hint="policy" tone="info" icon="lock_clock" />
          </div>

          <Panel
            title="Entries"
            subtitle={`SHA-256 (demo) of current view: ${bundleHash}`}
            actions={
              <>
                <select
                  aria-label="Filter by scope"
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  className={`${inputClass} w-auto`}
                >
                  {scopes.map((s) => (
                    <option key={s} value={s}>
                      {s === "all" ? "All scopes" : s}
                    </option>
                  ))}
                </select>
                <input
                  aria-label="Search audit log"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search actor, target, detail..."
                  className={`${inputClass} w-auto min-w-56`}
                />
              </>
            }
          >
            {rows.length === 0 ? (
              <EmptyState
                icon="search_off"
                title="No matching audit entries"
                detail="Adjust the scope filter or clear the search to see the full trail."
              />
            ) : (
              <ol className="space-y-2">
                {rows.map((a) => (
                  <li
                    key={a.id}
                    className="rounded border border-outline-variant/30 bg-surface-container-low p-3"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Pill tone={tone(a.action)}>{a.action}</Pill>
                      <span className="font-label-code-sm text-label-code-sm text-on-surface-variant">
                        {a.id} • {a.target}
                      </span>
                      <span className="ml-auto font-label-code-sm text-label-code-sm text-outline">
                        {shortDate(a.at)} • {a.actor}
                      </span>
                    </div>
                    <p className="mt-1 text-body-md text-on-surface">{a.detail}</p>
                  </li>
                ))}
              </ol>
            )}
          </Panel>
        </div>
      </main>
    </AppShell>
  );
}
