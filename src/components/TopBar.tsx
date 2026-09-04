import { Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { useMetrics, useTrustLoop } from "@/lib/trustloop-store";
import { money } from "@/lib/ui-maps";

export function TopBar({ onOpenNav }: { onOpenNav?: () => void }) {
  const { cases, officer } = useTrustLoop();
  const metrics = useMetrics();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("Reviewer");
  const [bellOpen, setBellOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return cases
      .filter(
        (c) =>
          c.id.toLowerCase().includes(q) ||
          c.customer.toLowerCase().includes(q) ||
          c.product.toLowerCase().includes(q) ||
          c.sku.toLowerCase().includes(q),
      )
      .slice(0, 6);
  }, [cases, query]);

  const alerts = useMemo(
    () =>
      cases
        .filter((c) => c.priority === "critical" || (!c.reviewer && c.decision === "human_investigation"))
        .slice(0, 5),
    [cases],
  );

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-3 border-b border-outline-variant/30 bg-surface-container-lowest/90 px-4 backdrop-blur-md">
      <button
        type="button"
        onClick={onOpenNav}
        aria-label="Open navigation"
        className="shrink-0 rounded p-1.5 text-on-surface-variant hover:bg-surface-container-low lg:hidden"
      >
        <span className="material-symbols-outlined text-[20px]">menu</span>
      </button>

      <div className="relative min-w-0 flex-1 max-w-lg">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined pointer-events-none absolute left-2.5 text-[18px] text-outline">
            search
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-8 w-full rounded border border-outline-variant/30 bg-surface-container-low pl-8 pr-3 font-body-md text-body-md text-on-surface transition-colors placeholder:text-outline focus:border-primary focus:bg-surface-container-lowest focus:outline-none"
            placeholder="Quick jump (Case ID, customer, product, SKU)..."
            type="text"
          />
        </div>
        {results.length > 0 ? (
          <div className="absolute left-0 right-0 top-10 z-50 overflow-hidden rounded-lg border border-outline-variant/40 bg-surface-container-lowest shadow-lg">
            {results.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setQuery("");
                  navigate({ to: "/case/$caseId", params: { caseId: c.id } });
                }}
                className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left hover:bg-surface-container-low"
              >
                <span className="min-w-0">
                  <span className="block truncate font-label-code-sm text-label-code-sm text-on-surface-variant">
                    {c.id}
                  </span>
                  <span className="block truncate text-body-md text-on-surface">
                    {c.customer} • {c.product}
                  </span>
                </span>
                <span className="shrink-0 font-label-code-sm text-label-code-sm text-on-surface-variant">
                  {money(c.value)}
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <div className="hidden items-center rounded border border-outline-variant/30 bg-surface-container-high p-0.5 md:flex">
          <span className="flex items-center gap-1 rounded border border-outline-variant/40 bg-surface-container-lowest px-2 py-1 font-label-code-sm text-label-code-sm font-semibold text-on-surface shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            DEMO SANDBOX
          </span>
        </div>
        <div className="hidden items-center gap-1.5 rounded border border-outline-variant/30 bg-surface-container-low px-2 py-1 sm:flex">
          <span className="material-symbols-outlined text-[16px] text-outline">badge</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="cursor-pointer bg-transparent pr-1 font-body-sm text-body-sm font-medium text-on-surface focus:outline-none"
          >
            <option>Reviewer</option>
            <option>Admin</option>
            <option>Operations</option>
            <option>ML Engineer</option>
            <option>Viewer</option>
          </select>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setBellOpen((v) => !v)}
            className="relative rounded p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {alerts.length ? (
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-error ring-2 ring-surface-container-lowest" />
            ) : null}
          </button>
          {bellOpen ? (
            <div className="absolute right-0 top-11 z-50 w-80 overflow-hidden rounded-lg border border-outline-variant/40 bg-surface-container-lowest shadow-lg">
              <div className="border-b border-outline-variant/30 px-3 py-2 font-label-code-sm text-label-code-sm uppercase tracking-wider text-on-surface-variant">
                {metrics.queue} in review queue • {alerts.length} priority alerts
              </div>
              {alerts.map((c) => (
                <Link
                  key={c.id}
                  to="/case/$caseId"
                  params={{ caseId: c.id }}
                  onClick={() => setBellOpen(false)}
                  className="block px-3 py-2 hover:bg-surface-container-low"
                >
                  <span className="block font-label-code-sm text-label-code-sm text-on-surface-variant">
                    {c.id} • {c.priority.toUpperCase()}
                  </span>
                  <span className="block truncate text-body-md text-on-surface">
                    {c.customer} — {money(c.value)}
                  </span>
                </Link>
              ))}
              <Link
                to="/review-queue"
                onClick={() => setBellOpen(false)}
                className="block border-t border-outline-variant/30 px-3 py-2 text-body-md font-semibold text-primary hover:bg-surface-container-low"
              >
                Open review queue
              </Link>
            </div>
          ) : null}
        </div>

        <div className="hidden items-center gap-2.5 pl-1 xl:flex">
          <div className="flex flex-col items-end">
            <span className="font-body-md text-body-md font-semibold leading-tight text-on-surface">
              {officer}
            </span>
            <span className="font-label-code-sm text-label-code-sm leading-tight text-outline">
              Lead Trust &amp; Safety Officer • {role}
            </span>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <span className="material-symbols-outlined text-[18px] text-on-primary">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
