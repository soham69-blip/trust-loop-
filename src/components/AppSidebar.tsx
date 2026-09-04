import { Link } from "@tanstack/react-router";

import { useMetrics } from "@/lib/trustloop-store";

const BASE =
  "flex items-center gap-2.5 px-2.5 py-1.5 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors";
const ACTIVE = `${BASE} bg-primary-container text-on-primary font-semibold`;

interface Item {
  icon: string;
  label: string;
  to: string;
  params?: Record<string, string>;
  badge?: "queue" | "mine";
}

const SECTIONS: { title: string; items: Item[] }[] = [
  {
    title: "Overview",
    items: [{ icon: "space_dashboard", label: "Dashboard", to: "/dashboard" }],
  },
  {
    title: "Returns Workspace",
    items: [
      { icon: "document_scanner", label: "Analyze Return", to: "/analyze-return" },
      { icon: "swap_horizontal_circle", label: "All Returns", to: "/returns" },
      {
        icon: "policy",
        label: "Investigation Case",
        to: "/case/$caseId",
        params: { caseId: "CASE-89241" },
      },
    ],
  },
  {
    title: "Human Verification",
    items: [
      { icon: "rule", label: "Review Queue", to: "/review-queue", badge: "queue" },
      { icon: "assignment_ind", label: "Assigned to Me", to: "/assigned", badge: "mine" },
    ],
  },
  {
    title: "Intelligence",
    items: [
      { icon: "radar", label: "Fraud & Savings Radar", to: "/fraud-radar" },
      { icon: "insights", label: "Analytics & Exposure", to: "/analytics" },
    ],
  },
  {
    title: "Governance & Learning",
    items: [
      { icon: "psychology", label: "Controlled Learning", to: "/controlled-learning" },
      { icon: "query_stats", label: "Data Quality", to: "/data-quality" },
      { icon: "model_training", label: "Safe Retraining", to: "/governance/retraining" },
      { icon: "fact_check", label: "Model Registry & Gates", to: "/model-registry" },
      { icon: "receipt_long", label: "Audit Log", to: "/audit-log" },
    ],
  },
  {
    title: "System",
    items: [{ icon: "tune", label: "Settings & Thresholds", to: "/settings" }],
  },
];

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const metrics = useMetrics();

  return (
    <aside className="flex h-full w-72 flex-col justify-between select-none border-r border-outline-variant/30 bg-surface-container-lowest">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-2 border-b border-outline-variant/20 px-5 py-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-container text-on-primary">
              <span className="material-symbols-outlined text-[19px]">all_inclusive</span>
            </div>
            <div className="flex min-w-0 flex-col">
              <div className="flex items-center gap-1.5">
                <span className="truncate font-headline-sm text-headline-sm font-bold tracking-tight text-on-surface">
                  TrustLoop
                </span>
                <span className="material-symbols-outlined shrink-0 text-[14px] text-outline">
                  verified_user
                </span>
              </div>
              <span className="truncate font-label-code-sm text-label-code-sm uppercase tracking-wider text-on-surface-variant">
                Return Intelligence
              </span>
            </div>
          </div>
          <div className="inline-flex items-center gap-1 rounded border border-outline-variant/40 bg-surface-container-high px-1.5 py-0.5 text-on-surface-variant">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
            <span className="font-label-code-sm text-label-code-sm font-semibold uppercase tracking-wider">
              DEMO
            </span>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-3 py-3">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <div className="px-2.5 pb-1">
                <span className="font-label-code-sm text-label-code-sm font-semibold uppercase tracking-widest text-outline">
                  {section.title}
                </span>
              </div>
              <nav className="space-y-0.5">
                {section.items.map((item) => {
                  const badgeValue =
                    item.badge === "queue"
                      ? metrics.queue
                      : item.badge === "mine"
                        ? metrics.assignedToMe
                        : null;
                  return (
                    <Link
                      key={item.label}
                      to={item.to}
                      {...(item.params ? { params: item.params } : {})}
                      onClick={onNavigate}
                      className={BASE}
                      activeProps={{ className: ACTIVE }}
                    >
                      <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      <span className="flex-1 truncate font-body-md text-body-md">{item.label}</span>
                      {badgeValue ? (
                        <span
                          className={`rounded px-1.5 py-0.5 font-label-code-sm text-label-code-sm font-semibold ${
                            item.badge === "queue"
                              ? "bg-error-container text-on-error-container"
                              : "bg-surface-container-high text-on-surface-variant"
                          }`}
                        >
                          {badgeValue}
                        </span>
                      ) : null}
                    </Link>
                  );
                })}
              </nav>
            </section>
          ))}
        </div>
      </div>

      <div className="border-t border-outline-variant/30 bg-surface-container-lowest p-3.5">
        <div className="flex flex-col items-center gap-1 rounded border border-outline-variant/20 bg-surface-container-low px-2 py-2 text-center">
          <span className="font-label-code-sm text-label-code-sm font-medium tracking-tight text-outline">
            AI ASSISTS • HUMANS VERIFY
          </span>
          <span className="font-label-code-sm text-label-code-sm font-semibold tracking-wider text-secondary">
            TRUSTLOOP LEARNS
          </span>
        </div>
      </div>
    </aside>
  );
}
