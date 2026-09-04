import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { useTrustLoop } from "@/lib/trustloop-store";
import { money } from "@/lib/ui-maps";

/**
 * Evidence Intelligence Pipeline hero.
 * Presentation-only: reads live demo cases from the store and lets the
 * operator flip between the escalated scenario and an aligned scenario.
 */
export function HeroEvidence() {
  const { cases } = useTrustLoop();
  const [aligned, setAligned] = useState(false);

  const escalated = useMemo(
    () =>
      cases.find((c) => c.decision === "human_investigation") ??
      cases[0],
    [cases],
  );
  const clean = useMemo(
    () => cases.find((c) => c.decision === "auto_approved") ?? cases[0],
    [cases],
  );

  const c = aligned ? clean : escalated;
  if (!c) return null;

  const resolution = aligned
    ? {
        icon: "verified",
        title: "Auto-Approved",
        desc: `Visual, policy and behavioural signals agree. Order value ${money(c.value)} sits inside the ₹42,000 autonomous refund cap.`,
        gate: "CLEARED",
        route: "No human touch required",
      }
    : {
        icon: "policy",
        title: "Human Investigation",
        desc: `Item value (${money(c.value)}) exceeds the ₹42,000 auto-clear threshold for this category despite high visual signal agreement.`,
        gate: "MANDATE",
        route: `${c.assignee ?? "Ananya Sharma"} (Lead Reviewer)`,
      };

  return (
    <section className="relative overflow-hidden rounded-2xl border border-outline-variant/25 bg-gradient-to-br from-[#0c1424] via-primary-container to-[#101b33] p-6 text-on-primary shadow-lg md:p-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 animate-pulse rounded-full bg-secondary/20 blur-3xl"
        style={{ animationDuration: "8s" }}
      />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-on-tertiary-container/15 blur-3xl" />

      <div className="relative z-10 flex flex-col items-start justify-between gap-8 xl:flex-row xl:items-center">
        {/* Left copy */}
        <div className="max-w-2xl space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-secondary-fixed/30 bg-secondary-container/30 px-2.5 py-1 font-label-code-sm text-label-code-sm font-semibold tracking-wider text-secondary-fixed">
              <span className="h-2 w-2 animate-ping rounded-full bg-secondary-fixed" />
              LIVE EVIDENCE ENGINE V2.4
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-surface-container-lowest/10 px-2.5 py-1 font-label-code-sm text-[11px] tracking-wide text-on-primary-container">
              <span className="material-symbols-outlined text-[14px] text-tertiary-fixed">verified</span>
              AI ASSISTS • EVIDENCE EXPLAINS • HUMANS VERIFY • TRUSTLOOP LEARNS SAFELY
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="font-headline-xl text-headline-xl font-bold leading-tight tracking-tight text-on-primary md:text-[34px]">
              Every return has a story.{" "}
              <span className="bg-gradient-to-r from-tertiary-fixed via-secondary-fixed to-primary-fixed bg-clip-text text-transparent">
                TrustLoop finds the evidence.
              </span>
            </h1>
            <p className="max-w-xl font-body-lg text-body-lg leading-relaxed text-primary-fixed-dim">
              TrustLoop combines AI risk analysis, return policy, visual inspection, and human
              verification to turn uncertain returns into explainable business decisions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/review-queue"
              className="group inline-flex items-center gap-2 rounded-lg bg-on-primary px-4 py-2.5 font-label-code text-label-code font-bold text-on-surface shadow-md transition-all hover:bg-surface-container-high"
            >
              <span>Explore Investigation Engine</span>
              <span className="material-symbols-outlined text-[17px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
            <Link
              to="/case/$caseId"
              params={{ caseId: c.id }}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 font-label-code text-label-code font-medium text-on-primary backdrop-blur-sm transition-all hover:bg-white/15"
            >
              <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">play_circle</span>
              <span>Play Interactive Demo</span>
              <span className="ml-0.5 rounded bg-secondary-fixed/20 px-1.5 py-0.5 font-label-code-sm text-[10px] font-semibold uppercase text-secondary-fixed">
                Scenario {c.id}
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setAligned((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-surface-container-highest/10 px-3 py-2 font-label-code-sm text-label-code-sm text-primary-fixed transition-colors hover:bg-surface-container-highest/20"
            >
              <span className="material-symbols-outlined text-[15px] text-tertiary-fixed">sync_alt</span>
              <span>{aligned ? "Simulate: Escalated Case" : "Simulate: Aligned Case"}</span>
            </button>
          </div>
        </div>

        {/* Right visualizer */}
        <div className="relative w-full flex-1 rounded-xl border border-white/15 bg-surface-container-lowest/[0.04] p-4 shadow-inner backdrop-blur-sm md:p-5 xl:w-auto xl:min-w-[560px] 2xl:min-w-[640px]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-on-tertiary-container" />
              <span className="font-label-code-sm text-label-code-sm font-bold uppercase tracking-widest text-primary-fixed-dim">
                Multi-Stream Evidence Fusion Graph
              </span>
            </div>
            <span className="rounded border border-tertiary-fixed/30 bg-tertiary-fixed/15 px-2 py-0.5 font-label-code-sm text-[11px] font-semibold text-tertiary-fixed">
              TELEMETRY: SYNCHRONIZED
            </span>
          </div>

          <div className="relative grid grid-cols-1 items-center gap-3 py-4 md:grid-cols-12">
            <svg
              className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path className="animate-flow-line opacity-75" d="M 175 42 C 230 42, 230 115, 280 115" fill="none" stroke="#68dba9" strokeWidth="1.75" />
              <path className="animate-flow-line opacity-75" d="M 175 92 C 220 92, 230 115, 280 115" fill="none" stroke="#85f8c4" strokeWidth="1.75" />
              <path className="animate-flow-line opacity-75" d="M 175 142 C 220 142, 230 115, 280 115" fill="none" stroke="#c3c0ff" strokeWidth="1.75" />
              <path className="animate-flow-line opacity-75" d="M 175 192 C 230 192, 230 115, 280 115" fill="none" stroke="#645efb" strokeWidth="1.75" />
              <path className="animate-flow-line opacity-90" d="M 395 115 L 435 115" fill="none" stroke="#85f8c4" strokeWidth="2.5" />
            </svg>

            <div className="relative z-10 space-y-2 md:col-span-5">
              <StreamNode
                icon="chat_bubble_outline"
                iconClass="text-tertiary-fixed"
                title="Customer Story & Claim"
                badge="NLP 96%"
                badgeClass="bg-tertiary-fixed/20 text-tertiary-fixed"
                detail={`Claim: "${c.claim}"`}
              />
              <StreamNode
                icon="gavel"
                iconClass="text-tertiary-fixed-dim"
                title="Return Policy Engine"
                badge="Sec 4.2 Compliant"
                badgeClass="bg-white/10 text-primary-fixed"
                detail={`Eligibility window: Day ${c.policyDay ?? 14} of 30 • Valid proof`}
              />
              <StreamNode
                icon="photo_camera"
                iconClass="text-secondary-fixed"
                title="Computer Vision Stream"
                badge={aligned ? "97.4% Match" : "94.1% Defect"}
                badgeClass="bg-secondary-fixed/20 text-secondary-fixed"
                detail="Micro-abrasion + stitch stress verified"
              />
              <StreamNode
                icon="manage_accounts"
                iconClass="text-secondary"
                title="Behavioral ML Vector"
                badge={`${c.mlScore.toFixed(2)} ${aligned ? "Low" : "Risk"}`}
                badgeClass="bg-tertiary-fixed/20 text-tertiary-fixed"
                detail={`${c.customer} • ${c.region}`}
              />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center px-1 py-3 md:col-span-3">
              <div className="glow-indigo relative w-full rounded-xl border border-secondary-fixed/40 bg-gradient-to-b from-[#1b2540] to-[#0f172a] p-3.5 text-center shadow-lg transition-colors hover:border-secondary-fixed">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-container text-on-primary shadow-sm">
                  <span className="material-symbols-outlined animate-spin text-[22px]" style={{ animationDuration: "12s" }}>
                    hub
                  </span>
                </div>
                <div className="font-label-code-sm text-[11px] font-bold uppercase tracking-wider text-secondary-fixed">
                  Evidence Fusion Core
                </div>
                <div className="mt-0.5 font-body-sm text-[10px] text-primary-fixed-dim">
                  Realtime Cross-Modal Alignment
                </div>
                <div className="mt-2.5 flex items-center justify-center gap-1.5 border-t border-white/10 pt-2">
                  <span className="h-2 w-2 rounded-full bg-tertiary-fixed" />
                  <span className="font-label-code-sm text-[10px] font-semibold text-on-primary">
                    {aligned ? "Signals Aligned" : "Signals Conflicting"}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 md:col-span-4">
              <div className="space-y-2.5 rounded-xl border-2 border-secondary-fixed/60 bg-[#131d33] p-3.5 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="font-label-code-sm text-[10px] font-bold uppercase tracking-widest text-primary-fixed-dim">
                    TrustLoop Resolution
                  </span>
                  <span className="inline-flex items-center gap-1 rounded border border-secondary-fixed/40 bg-secondary-container/40 px-1.5 py-0.5 font-label-code-sm text-[10px] font-bold text-secondary-fixed">
                    <span className="material-symbols-outlined text-[12px]">gavel</span>
                    {resolution.gate}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-secondary-fixed">
                      {resolution.icon}
                    </span>
                    <span className="font-headline-sm text-headline-sm font-bold text-on-primary">
                      {resolution.title}
                    </span>
                  </div>
                  <p className="font-body-sm text-[11px] leading-snug text-primary-fixed-dim">
                    {resolution.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-2 font-label-code-sm text-[11px]">
                  <span className="text-outline-variant">Adjudication Route:</span>
                  <span className="font-bold text-secondary-fixed">{resolution.route}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 font-label-code-sm text-[11px] text-primary-fixed-dim">
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-tertiary-fixed" />
              <span>
                Inference Latency: <strong>38ms</strong>
              </span>
              <span className="text-white/20">•</span>
              <span>
                Policy Rules Checked: <strong>34 Active</strong>
              </span>
            </div>
            <span className="text-on-primary-container">
              Case Context:{" "}
              <strong className="text-on-primary">
                #{c.id} ({c.product})
              </strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function StreamNode({
  icon,
  iconClass,
  title,
  badge,
  badgeClass,
  detail,
}: {
  icon: string;
  iconClass: string;
  title: string;
  badge: string;
  badgeClass: string;
  detail: string;
}) {
  return (
    <div className="group cursor-default rounded-lg border border-white/10 bg-surface-container-lowest/10 p-2.5 transition-all hover:translate-x-1 hover:bg-surface-container-lowest/20">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className={`material-symbols-outlined text-[16px] ${iconClass}`}>{icon}</span>
          <span className="truncate font-label-code-sm text-label-code-sm font-semibold text-on-primary">
            {title}
          </span>
        </div>
        <span className={`shrink-0 rounded px-1.5 py-0.5 font-label-code-sm text-[10px] font-bold ${badgeClass}`}>
          {badge}
        </span>
      </div>
      <p className="mt-0.5 truncate font-body-sm text-[11px] text-primary-fixed-dim">{detail}</p>
    </div>
  );
}
