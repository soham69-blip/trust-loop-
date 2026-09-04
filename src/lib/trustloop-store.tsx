import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  CURRENT_OFFICER,
  DEFAULT_THRESHOLDS,
  DEMO_AUDIT,
  DEMO_CASES,
  DEMO_CLUSTERS,
  DEMO_GROUND_TRUTH,
  DEMO_MODELS,
  type AuditEntry,
  type Cluster,
  type Decision,
  type GroundTruthRecord,
  type ModelRecord,
  type Priority,
  type ReturnCase,
  type RiskClass,
  type Threshold,
} from "./demo-data";

const STORAGE_KEY = "trustloop-demo-state-v1";

export interface AnalyzeInput {
  customer: string;
  product: string;
  category: string;
  sku: string;
  value: number;
  claim: string;
  daysSinceDelivery: number;
  returnRate: number;
  lifetimeValue: number;
  accountAgeYrs: number;
  photosAttached: boolean;
  tagsIntact: boolean;
  originalPackaging: boolean;
  region: string;
  tier: string;
  knownRing: boolean;
}

export interface AnalyzeResult {
  case: ReturnCase;
  score: number;
  decision: Decision;
  riskClass: RiskClass;
  reasons: { label: string; impact: number; detail: string }[];
}

interface StoreState {
  cases: ReturnCase[];
  thresholds: Threshold[];
  audit: AuditEntry[];
  groundTruth: GroundTruthRecord[];
  clusters: Cluster[];
  models: ModelRecord[];
  lastAnalysisId: string | null;
}

function initialState(): StoreState {
  return {
    cases: DEMO_CASES,
    thresholds: DEFAULT_THRESHOLDS,
    audit: DEMO_AUDIT,
    groundTruth: DEMO_GROUND_TRUTH,
    clusters: DEMO_CLUSTERS,
    models: DEMO_MODELS,
    lastAnalysisId: null,
  };
}

interface StoreValue extends StoreState {
  hydrated: boolean;
  officer: string;
  thresholdValue: (key: string) => number;
  analyzeReturn: (input: AnalyzeInput) => AnalyzeResult;
  decideCase: (
    id: string,
    decision: Decision,
    options?: { note?: string; riskClass?: RiskClass; stageForTraining?: boolean },
  ) => void;
  assignCase: (id: string, reviewer: string | null) => void;
  claimCase: (id: string) => void;
  setPriority: (id: string, priority: Priority) => void;
  setThreshold: (key: string, value: number) => void;
  resetThresholds: () => void;
  setClusterStatus: (id: string, status: Cluster["status"]) => void;
  addGroundTruth: (record: Omit<GroundTruthRecord, "at">) => void;
  promoteCandidate: () => { ok: boolean; reason: string };
  log: (action: string, target: string, detail: string) => void;
  resetDemo: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

function nowISO() {
  return new Date().toISOString();
}

function scoreReturn(
  input: AnalyzeInput,
  thresholds: Record<string, number>,
): { score: number; reasons: AnalyzeResult["reasons"]; visionConfidence: number } {
  const reasons: AnalyzeResult["reasons"] = [];
  let score = 0.62;

  const visionConfidence = input.photosAttached
    ? Math.min(0.97, 0.72 + (input.tagsIntact ? 0.12 : 0) + (input.originalPackaging ? 0.09 : 0))
    : 0.38;

  const push = (label: string, impact: number, detail: string) => {
    score += impact;
    reasons.push({ label, impact, detail });
  };

  if (input.photosAttached) {
    push(
      "Vision evidence supplied",
      visionConfidence >= (thresholds["visionConfidence"] ?? 0.9) ? 0.14 : 0.04,
      `Computer vision confidence ${(visionConfidence * 100).toFixed(1)}% against the defect database.`,
    );
  } else {
    push(
      "No photographic evidence",
      -0.18,
      "Claim cannot be corroborated by the vision stream; evidence marked insufficient.",
    );
  }

  const inWindow = input.daysSinceDelivery <= (thresholds["returnWindowDays"] ?? 30);
  push(
    inWindow ? "Inside policy return window" : "Return window breached",
    inWindow ? 0.08 : -0.26,
    `Filed on day ${input.daysSinceDelivery} of a ${(thresholds["returnWindowDays"] ?? 30)}-day window (Policy Sec 4.2).`,
  );

  if (input.returnRate >= 0.5) {
    push(
      "Serial return behaviour",
      -0.24,
      `Historical return rate ${(input.returnRate * 100).toFixed(1)}% is far above the 18% cohort mean.`,
    );
  } else if (input.returnRate <= 0.15) {
    push(
      "Healthy return history",
      0.1,
      `Historical return rate ${(input.returnRate * 100).toFixed(1)}% sits below the cohort mean.`,
    );
  }

  if (input.lifetimeValue >= 2000) {
    push(
      "Durable customer value",
      0.09,
      `Lifetime spend $${input.lifetimeValue.toLocaleString()} raises the Bayesian trust prior.`,
    );
  }
  if (input.accountAgeYrs < 0.5) {
    push(
      "New account risk",
      -0.12,
      `Account age ${input.accountAgeYrs.toFixed(2)} yrs offers no behavioural baseline.`,
    );
  }
  if (!input.tagsIntact) {
    push(
      "Security tags removed",
      -0.14,
      "Missing tags are the strongest single wardrobing indicator in the current model.",
    );
  }
  if (!input.originalPackaging) {
    push("Original packaging missing", -0.06, "Resale grade drops; policy requires packaging retention.");
  }
  if (input.knownRing) {
    push(
      "Entity graph ring match",
      -0.35,
      "Device, payment, or address attributes match an active abuse cluster.",
    );
  }
  if (input.value >= (thresholds["autoApproveValue"] ?? 500)) {
    push(
      "Value above autonomous cap",
      -0.02,
      `Order value $${input.value.toFixed(2)} exceeds the $${(thresholds["autoApproveValue"] ?? 500)} autonomous refund cap — human verification is mandatory.`,
    );
  }

  return { score: Math.max(0.02, Math.min(0.99, score)), reasons, visionConfidence };
}

function classify(score: number, input: AnalyzeInput): RiskClass {
  if (input.knownRing || score <= 0.2) return "organized_fraud";
  if (!input.tagsIntact && input.returnRate >= 0.4) return "wardrobing";
  if (input.returnRate >= 0.45 || input.daysSinceDelivery > 30) return "policy_abuser";
  return "legitimate";
}

export function TrustLoopProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<StoreState>;
        setState((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      /* ignore corrupt demo state */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full or blocked — demo still works in memory */
    }
  }, [state, hydrated]);

  const thresholdMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const t of state.thresholds) map[t.key] = t.value;
    return map;
  }, [state.thresholds]);

  const log = useCallback((action: string, target: string, detail: string) => {
    setState((prev) => ({
      ...prev,
      audit: [
        {
          id: `AUD-${4402 + prev.audit.length}`,
          at: nowISO(),
          actor: CURRENT_OFFICER,
          action,
          target,
          detail,
        },
        ...prev.audit,
      ],
    }));
  }, []);

  const analyzeReturn = useCallback(
    (input: AnalyzeInput): AnalyzeResult => {
      const { score, reasons, visionConfidence } = scoreReturn(input, thresholdMap);
      const riskClass = classify(score, input);
      let decision: Decision;
      if (score >= (thresholdMap["autoApproveScore"] ?? 0.8) && input.value < (thresholdMap["autoApproveValue"] ?? 500)) {
        decision = "auto_approved";
      } else if (score <= (thresholdMap["autoRejectScore"] ?? 0.2)) {
        decision = "auto_rejected";
      } else {
        decision = "human_investigation";
      }

      const priority: Priority =
        decision === "auto_rejected"
          ? "critical"
          : input.value >= 1000
            ? "high"
            : decision === "human_investigation"
              ? "normal"
              : "low";

      const id = `CASE-${90000 + Math.floor((Date.now() / 1000) % 9999)}`;
      const newCase: ReturnCase = {
        id,
        createdAt: nowISO(),
        customer: input.customer || "Unnamed Shopper",
        customerId: `USR-${(90000 + input.customer.length * 137) % 99999}`,
        tier: input.tier,
        region: input.region,
        product: input.product,
        category: input.category,
        sku: input.sku || "SKU-PENDING",
        value: input.value,
        mlScore: score,
        riskClass,
        evidenceState: input.photosAttached
          ? visionConfidence >= (thresholdMap["visionConfidence"] ?? 0.9)
            ? "aligned"
            : "conflict"
          : "insufficient",
        decision,
        priority,
        reviewer: decision === "human_investigation" ? null : "System (v2.4)",
        assignedToMe: false,
        returnRate: input.returnRate,
        accountAgeYrs: input.accountAgeYrs,
        lifetimeValue: input.lifetimeValue,
        daysSinceDelivery: input.daysSinceDelivery,
        policyCompliant: input.daysSinceDelivery <= (thresholdMap["returnWindowDays"] ?? 30),
        visionConfidence,
        visionVerdict: input.photosAttached
          ? `Vision stream corroboration ${(visionConfidence * 100).toFixed(1)}%`
          : "No imagery submitted",
        behavioralRisk: Number((1 - score).toFixed(2)),
        claim: input.claim,
        clusterId: input.knownRing ? "SYNDICATE-409" : null,
        drivers: reasons.map((r) => ({
          icon: r.impact >= 0 ? "check_circle" : "report",
          title: r.label,
          detail: r.detail,
          tag: `${r.impact >= 0 ? "+" : ""}${(r.impact * 100).toFixed(0)} pp`,
          tone: r.impact >= 0 ? "positive" : "negative",
        })),
      };

      setState((prev) => ({
        ...prev,
        cases: [newCase, ...prev.cases],
        lastAnalysisId: id,
        audit: [
          {
            id: `AUD-${4402 + prev.audit.length}`,
            at: nowISO(),
            actor: CURRENT_OFFICER,
            action: `return.analyzed.${decision}`,
            target: id,
            detail: `Trust score ${(score * 100).toFixed(1)}% • ${reasons.length} deterministic drivers evaluated.`,
          },
          ...prev.audit,
        ],
      }));

      return { case: newCase, score, decision, riskClass, reasons };
    },
    [thresholdMap],
  );

  const decideCase = useCallback<StoreValue["decideCase"]>(
    (id, decision, options) => {
      setState((prev) => {
        const target = prev.cases.find((c) => c.id === id);
        const cases = prev.cases.map((c) =>
          c.id === id
            ? {
                ...c,
                decision,
                riskClass: options?.riskClass ?? c.riskClass,
                reviewer: CURRENT_OFFICER,
                assignedToMe: false,
              }
            : c,
        );
        const groundTruth =
          options?.stageForTraining && target
            ? [
                {
                  caseId: id,
                  prediction: `${target.riskClass} (${(target.mlScore * 100).toFixed(0)}% conf)`,
                  truth: options.riskClass ?? target.riskClass,
                  officer: `${CURRENT_OFFICER} (Lead T&S)`,
                  weight: 15,
                  at: new Date().toLocaleString(),
                },
                ...prev.groundTruth,
              ]
            : prev.groundTruth;
        return {
          ...prev,
          cases,
          groundTruth,
          audit: [
            {
              id: `AUD-${4402 + prev.audit.length}`,
              at: nowISO(),
              actor: CURRENT_OFFICER,
              action: `case.${decision}`,
              target: id,
              detail:
                options?.note?.trim() ||
                "Human verification recorded without additional rationale.",
            },
            ...prev.audit,
          ],
        };
      });
    },
    [],
  );

  const assignCase = useCallback<StoreValue["assignCase"]>((id, reviewer) => {
    setState((prev) => ({
      ...prev,
      cases: prev.cases.map((c) =>
        c.id === id
          ? { ...c, reviewer, assignedToMe: reviewer === CURRENT_OFFICER }
          : c,
      ),
      audit: [
        {
          id: `AUD-${4402 + prev.audit.length}`,
          at: nowISO(),
          actor: CURRENT_OFFICER,
          action: reviewer ? "case.assigned" : "case.unassigned",
          target: id,
          detail: reviewer ? `Routed to ${reviewer}.` : "Returned to the shared review queue.",
        },
        ...prev.audit,
      ],
    }));
  }, []);

  const claimCase = useCallback(
    (id: string) => assignCase(id, CURRENT_OFFICER),
    [assignCase],
  );

  const setPriority = useCallback<StoreValue["setPriority"]>((id, priority) => {
    setState((prev) => ({
      ...prev,
      cases: prev.cases.map((c) => (c.id === id ? { ...c, priority } : c)),
    }));
  }, []);

  const setThreshold = useCallback((key: string, value: number) => {
    setState((prev) => ({
      ...prev,
      thresholds: prev.thresholds.map((t) => (t.key === key ? { ...t, value } : t)),
    }));
  }, []);

  const resetThresholds = useCallback(() => {
    setState((prev) => ({ ...prev, thresholds: DEFAULT_THRESHOLDS }));
  }, []);

  const setClusterStatus = useCallback<StoreValue["setClusterStatus"]>((id, status) => {
    setState((prev) => ({
      ...prev,
      clusters: prev.clusters.map((c) => (c.id === id ? { ...c, status } : c)),
      audit: [
        {
          id: `AUD-${4402 + prev.audit.length}`,
          at: nowISO(),
          actor: CURRENT_OFFICER,
          action: `cluster.${status}`,
          target: id,
          detail:
            status === "restricted"
              ? "Automated return freeze and policy restriction applied to every ring member."
              : status === "cleared"
                ? "Ring cleared after manual review; restrictions lifted."
                : "Ring flagged for monitoring.",
        },
        ...prev.audit,
      ],
    }));
  }, []);

  const addGroundTruth = useCallback<StoreValue["addGroundTruth"]>((record) => {
    setState((prev) => ({
      ...prev,
      groundTruth: [{ ...record, at: new Date().toLocaleString() }, ...prev.groundTruth],
      audit: [
        {
          id: `AUD-${4402 + prev.audit.length}`,
          at: nowISO(),
          actor: CURRENT_OFFICER,
          action: "training.label_staged",
          target: record.caseId,
          detail: `Verified truth "${record.truth}" staged at ${record.weight}x weight.`,
        },
        ...prev.audit,
      ],
    }));
  }, []);

  const promoteCandidate = useCallback((): { ok: boolean; reason: string } => {
    const labels = state.groundTruth.length;
    const candidate = state.models.find((m) => m.stage === "candidate");
    const production = state.models.find((m) => m.stage === "production");
    if (!candidate || !production) {
      return { ok: false, reason: "No candidate model is staged for promotion." };
    }
    if (labels < 50) {
      return {
        ok: false,
        reason: `Gate 2 blocked — ${labels} of 50 verified ground-truth labels captured.`,
      };
    }
    if (candidate.macroF1 - production.macroF1 < 0.005) {
      return {
        ok: false,
        reason: `Gate 3 blocked — macro F1 uplift is ${((candidate.macroF1 - production.macroF1) * 100).toFixed(2)} pp, below the required +0.50 pp.`,
      };
    }
    if (production.abuserRecall - candidate.abuserRecall > 0.01) {
      return {
        ok: false,
        reason: `Gate 4 blocked — protected-class recall dropped ${((production.abuserRecall - candidate.abuserRecall) * 100).toFixed(2)} pp (max 1.00 pp).`,
      };
    }
    setState((prev) => ({
      ...prev,
      models: prev.models.map((m) =>
        m.stage === "candidate"
          ? { ...m, stage: "production" as const, notes: "Promoted to canary after all gates passed." }
          : m.stage === "production"
            ? { ...m, stage: "archived" as const, notes: "Superseded by candidate promotion." }
            : m,
      ),
      audit: [
        {
          id: `AUD-${4402 + prev.audit.length}`,
          at: nowISO(),
          actor: CURRENT_OFFICER,
          action: "model.promoted",
          target: candidate.version,
          detail: "All five promotion gates satisfied; canary deployment opened at 5% traffic.",
        },
        ...prev.audit,
      ],
    }));
    return { ok: true, reason: `${candidate.version} promoted to canary at 5% traffic.` };
  }, [state.groundTruth.length, state.models]);

  const resetDemo = useCallback(() => {
    setState(initialState());
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      ...state,
      hydrated,
      officer: CURRENT_OFFICER,
      thresholdValue: (key: string) => thresholdMap[key] ?? 0,
      analyzeReturn,
      decideCase,
      assignCase,
      claimCase,
      setPriority,
      setThreshold,
      resetThresholds,
      setClusterStatus,
      addGroundTruth,
      promoteCandidate,
      log,
      resetDemo,
    }),
    [
      state,
      hydrated,
      thresholdMap,
      analyzeReturn,
      decideCase,
      assignCase,
      claimCase,
      setPriority,
      setThreshold,
      resetThresholds,
      setClusterStatus,
      addGroundTruth,
      promoteCandidate,
      log,
      resetDemo,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useTrustLoop(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useTrustLoop must be used inside <TrustLoopProvider>");
  return ctx;
}

export function useMetrics() {
  const { cases, clusters } = useTrustLoop();
  return useMemo(() => {
    const total = cases.length;
    const by = (d: Decision) => cases.filter((c) => c.decision === d).length;
    const autoApproved = by("auto_approved");
    const autoRejected = by("auto_rejected");
    const humanReview = by("human_investigation");
    const fraudValue = cases
      .filter((c) => c.decision === "auto_rejected" || c.riskClass === "organized_fraud")
      .reduce((sum, c) => sum + c.value, 0);
    const protectedExposure =
      fraudValue + clusters.reduce((sum, c) => sum + c.atRiskValue, 0);
    const avgConfidence =
      cases.reduce((sum, c) => sum + c.mlScore, 0) / Math.max(1, total);
    return {
      total,
      autoApproved,
      autoRejected,
      humanReview,
      unassigned: cases.filter(
        (c) => c.decision === "human_investigation" && !c.reviewer,
      ).length,
      assignedToMe: cases.filter((c) => c.assignedToMe).length,
      queue: cases.filter((c) => c.decision === "human_investigation").length,
      fraudValue,
      protectedExposure,
      avgConfidence,
      pctAuto: total ? autoApproved / total : 0,
      pctHuman: total ? humanReview / total : 0,
      pctRejected: total ? autoRejected / total : 0,
      activeRings: clusters.filter((c) => c.status !== "cleared").length,
    };
  }, [cases, clusters]);
}
