import type { Decision, Priority, RiskClass, EvidenceState } from "./demo-data";
import type { Tone } from "@/components/tl";

export const decisionTone: Record<Decision, Tone> = {
  auto_approved: "positive",
  auto_rejected: "negative",
  human_investigation: "info",
  pending: "neutral",
};

export const priorityTone: Record<Priority, Tone> = {
  critical: "negative",
  high: "warning",
  normal: "neutral",
  low: "neutral",
};

export const riskTone: Record<RiskClass, Tone> = {
  legitimate: "positive",
  wardrobing: "warning",
  policy_abuser: "warning",
  organized_fraud: "negative",
};

export const evidenceTone: Record<EvidenceState, Tone> = {
  aligned: "positive",
  conflict: "negative",
  insufficient: "warning",
};

export const money = (n: number) =>
  n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export const pct = (n: number, digits = 1) => `${(n * 100).toFixed(digits)}%`;

export const shortDate = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
