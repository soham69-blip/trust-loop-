// Deterministic demo dataset for the TrustLoop demo sandbox.
// No randomness / no Date.now() at module scope (SSR + Workers safe).

export type Decision =
  | "auto_approved"
  | "auto_rejected"
  | "human_investigation"
  | "pending";

export type RiskClass =
  | "legitimate"
  | "wardrobing"
  | "policy_abuser"
  | "organized_fraud";

export type EvidenceState = "aligned" | "conflict" | "insufficient";

export type Priority = "critical" | "high" | "normal" | "low";

export interface Driver {
  icon: string;
  title: string;
  detail: string;
  tag: string;
  tone: "positive" | "negative" | "neutral";
}

export interface ReturnCase {
  id: string;
  createdAt: string;
  customer: string;
  customerId: string;
  tier: string;
  region: string;
  product: string;
  category: string;
  sku: string;
  value: number;
  mlScore: number;
  riskClass: RiskClass;
  evidenceState: EvidenceState;
  decision: Decision;
  priority: Priority;
  reviewer: string | null;
  assignedToMe: boolean;
  returnRate: number;
  accountAgeYrs: number;
  lifetimeValue: number;
  daysSinceDelivery: number;
  policyCompliant: boolean;
  visionConfidence: number;
  visionVerdict: string;
  behavioralRisk: number;
  claim: string;
  clusterId: string | null;
  drivers: Driver[];
}

export const REVIEWERS = [
  "Ananya Sharma",
  "Dhruv Kapoor",
  "Priya Nambiar",
  "Manav Trivedi",
  "System (v2.3)",
] as const;

export const CURRENT_OFFICER = "Ananya Sharma";

export const RISK_CLASS_LABEL: Record<RiskClass, string> = {
  legitimate: "Legitimate Return",
  wardrobing: "Wardrobing / Use & Return",
  policy_abuser: "Policy Abuser",
  organized_fraud: "Organized Fraud",
};

export const DECISION_LABEL: Record<Decision, string> = {
  auto_approved: "Auto-Approved",
  auto_rejected: "Auto-Rejected",
  human_investigation: "Human Investigation",
  pending: "Pending Analysis",
};

function driversFor(c: {
  value: number;
  visionConfidence: number;
  policyCompliant: boolean;
  returnRate: number;
  lifetimeValue: number;
  riskClass: RiskClass;
  clusterId: string | null;
  daysSinceDelivery: number;
}): Driver[] {
  const out: Driver[] = [];
  out.push({
    icon: "photo_camera",
    title:
      c.visionConfidence >= 0.85
        ? "Visual evidence strictly matches reported damage location"
        : "Visual evidence only partially corroborates the written claim",
    detail: `Computer vision model returned ${(c.visionConfidence * 100).toFixed(1)}% confidence against the synthetic defect database.`,
    tag: `${(c.visionConfidence * 100).toFixed(1)}% CONF`,
    tone: c.visionConfidence >= 0.85 ? "positive" : "negative",
  });
  if (c.value >= 42000) {
    out.push({
      icon: "payments",
      title: "Item value exceeds autonomous refund threshold",
      detail: `Order value is ₹${c.value.toLocaleString("en-IN")}. Autonomous refunds are hard-capped at ₹42,000 under Policy Rule PR-GOV-901.`,
      tag: "HARD GATE",
      tone: "negative",
    });
  }
  out.push({
    icon: "local_shipping",
    title: c.policyCompliant
      ? `Carrier tracking confirms delivery ${c.daysSinceDelivery} days prior`
      : "Return window breached against carrier delivery timestamp",
    detail: c.policyCompliant
      ? "Return was filed inside the 30-day eligibility window with proof of purchase retained."
      : `Return filed on day ${c.daysSinceDelivery} of a 30-day window; Section 4.2 eligibility fails.`,
    tag: `T+${c.daysSinceDelivery} DAYS`,
    tone: c.policyCompliant ? "positive" : "negative",
  });
  out.push({
    icon: "sell",
    title:
      c.lifetimeValue >= 170000
        ? `Customer lifetime spend (₹${c.lifetimeValue.toLocaleString("en-IN")}) suppresses fraud propensity`
        : `Thin transactional history (LTV ₹${c.lifetimeValue.toLocaleString("en-IN")}) offers no trust prior`,
    detail: `Historical return rate ${(c.returnRate * 100).toFixed(1)}% across the account lifetime.`,
    tag: c.lifetimeValue >= 170000 ? "TOP 5% VIP" : "LOW PRIOR",
    tone: c.lifetimeValue >= 170000 ? "positive" : "neutral",
  });
  if (c.clusterId) {
    out.push({
      icon: "hub",
      title: `Entity graph links this return to ring ${c.clusterId}`,
      detail:
        "Shared device fingerprint, payment BIN, or drop address matched against an active abuse cluster.",
      tag: "RING MATCH",
      tone: "negative",
    });
  }
  return out;
}

interface Seed {
  id: string;
  createdAt: string;
  customer: string;
  customerId: string;
  tier: string;
  region: string;
  product: string;
  category: string;
  sku: string;
  value: number;
  mlScore: number;
  riskClass: RiskClass;
  evidenceState: EvidenceState;
  decision: Decision;
  priority: Priority;
  reviewer: string | null;
  assignedToMe: boolean;
  returnRate: number;
  accountAgeYrs: number;
  lifetimeValue: number;
  daysSinceDelivery: number;
  policyCompliant: boolean;
  visionConfidence: number;
  visionVerdict: string;
  behavioralRisk: number;
  claim: string;
  clusterId: string | null;
}

const SEEDS: Seed[] = [
  {
    id: "CASE-89241",
    createdAt: "2026-08-31T09:14:00Z",
    customer: "Arjun Mehta",
    customerId: "USR-41288",
    tier: "Tier 2 Loyalty",
    region: "IN-West (Mumbai)",
    product: "Wildcraft Hypadry Pro Shell Jacket",
    category: "Outerwear / GoreTex",
    sku: "WLC-MN-6641-BLK-L",
    value: 67100,
    mlScore: 0.714,
    riskClass: "legitimate",
    evidenceState: "aligned",
    decision: "human_investigation",
    priority: "high",
    reviewer: "Ananya Sharma",
    assignedToMe: true,
    returnRate: 0.114,
    accountAgeYrs: 4.2,
    lifetimeValue: 404900,
    daysSinceDelivery: 6,
    policyCompliant: true,
    visionConfidence: 0.941,
    visionVerdict: "Damage confirmed — 3.2cm seam delamination",
    behavioralRisk: 0.18,
    claim:
      "Zipper separated and seam tore upon first wear during heavy rainfall on the Lonavala trek.",
    clusterId: null,
  },
  {
    id: "CASE-89240",
    createdAt: "2026-08-31T08:42:00Z",
    customer: "Ananya Iyer",
    customerId: "USR-38110",
    tier: "VIP Diamond",
    region: "IN-North (Delhi NCR)",
    product: "boAt Nirvana Ion ANC Headphones",
    category: "Electronics / Audio",
    sku: "BOA-NIR-ION-BLK",
    value: 33500,
    mlScore: 0.982,
    riskClass: "legitimate",
    evidenceState: "aligned",
    decision: "auto_approved",
    priority: "normal",
    reviewer: "System (v2.3)",
    assignedToMe: false,
    returnRate: 0.041,
    accountAgeYrs: 6.1,
    lifetimeValue: 1041600,
    daysSinceDelivery: 3,
    policyCompliant: true,
    visionConfidence: 0.968,
    visionVerdict: "Sealed retail packaging verified",
    behavioralRisk: 0.06,
    claim: "Wrong colourway shipped, box unopened.",
    clusterId: null,
  },
  {
    id: "CASE-89239",
    createdAt: "2026-08-31T07:58:00Z",
    customer: "Rohit K.",
    customerId: "USR-90214",
    tier: "Cluster Flagged",
    region: "IN-West (Mumbai)",
    product: "Apple iPad Pro 12.9 (Wi-Fi)",
    category: "High-Value Mobile",
    sku: "APL-IPDP-129-256",
    value: 100700,
    mlScore: 0.141,
    riskClass: "organized_fraud",
    evidenceState: "conflict",
    decision: "auto_rejected",
    priority: "critical",
    reviewer: "System (v2.3)",
    assignedToMe: false,
    returnRate: 0.72,
    accountAgeYrs: 0.2,
    lifetimeValue: 100700,
    daysSinceDelivery: 21,
    policyCompliant: false,
    visionConfidence: 0.22,
    visionVerdict: "Empty box weight anomaly (-612g)",
    behavioralRisk: 0.94,
    claim: "Parcel arrived empty, requesting immediate refund to new card.",
    clusterId: "SYNDICATE-409",
  },
  {
    id: "CASE-89238",
    createdAt: "2026-08-30T18:12:00Z",
    customer: "Sneha M.",
    customerId: "USR-90214",
    tier: "Ring Member",
    region: "IN-West (Mumbai)",
    product: "Hidesign Kalahari Leather Handbag",
    category: "Luxury / Accessories",
    sku: "HDS-KLH-2249-BRN",
    value: 201600,
    mlScore: 0.098,
    riskClass: "organized_fraud",
    evidenceState: "conflict",
    decision: "human_investigation",
    priority: "critical",
    reviewer: null,
    assignedToMe: false,
    returnRate: 0.83,
    accountAgeYrs: 0.1,
    lifetimeValue: 201600,
    daysSinceDelivery: 12,
    policyCompliant: true,
    visionConfidence: 0.31,
    visionVerdict: "Duplicate stock photo — perceptual hash 0.0",
    behavioralRisk: 0.97,
    claim: "Defective zipper on arrival, photos attached.",
    clusterId: "SYNDICATE-409",
  },
  {
    id: "CASE-89237",
    createdAt: "2026-08-30T16:04:00Z",
    customer: "Kabir Deshmukh",
    customerId: "USR-22019",
    tier: "Tier 1",
    region: "IN-West (Pune)",
    product: "Biba Silk Anarkali Kurta Set",
    category: "Formalwear",
    sku: "BIB-ANK-8871-NVY",
    value: 15900,
    mlScore: 0.312,
    riskClass: "wardrobing",
    evidenceState: "conflict",
    decision: "human_investigation",
    priority: "high",
    reviewer: "Ananya Sharma",
    assignedToMe: true,
    returnRate: 0.61,
    accountAgeYrs: 2.4,
    lifetimeValue: 154600,
    daysSinceDelivery: 8,
    policyCompliant: true,
    visionConfidence: 0.79,
    visionVerdict: "Deodorant transfer + missing security tag",
    behavioralRisk: 0.68,
    claim: "Fit was wrong, never worn outside.",
    clusterId: null,
  },
  {
    id: "CASE-89236",
    createdAt: "2026-08-30T14:31:00Z",
    customer: "Meera Nair",
    customerId: "USR-71553",
    tier: "VIP Gold",
    region: "IN-South (Bengaluru)",
    product: "Dyson Airwrap Complete",
    category: "Home / Beauty",
    sku: "DYS-AWC-4410",
    value: 50300,
    mlScore: 0.874,
    riskClass: "legitimate",
    evidenceState: "aligned",
    decision: "human_investigation",
    priority: "normal",
    reviewer: null,
    assignedToMe: false,
    returnRate: 0.09,
    accountAgeYrs: 3.8,
    lifetimeValue: 521600,
    daysSinceDelivery: 5,
    policyCompliant: true,
    visionConfidence: 0.9,
    visionVerdict: "Motor fault residue confirmed",
    behavioralRisk: 0.12,
    claim: "Motor stopped after third use, burning smell.",
    clusterId: null,
  },
  {
    id: "CASE-89235",
    createdAt: "2026-08-30T12:19:00Z",
    customer: "Aditya Rao",
    customerId: "USR-55402",
    tier: "Tier 2 Loyalty",
    region: "IN-South (Chennai)",
    product: "Campus Rapid Runner Shoes",
    category: "Footwear",
    sku: "CMP-RPR-42",
    value: 11700,
    mlScore: 0.921,
    riskClass: "legitimate",
    evidenceState: "aligned",
    decision: "auto_approved",
    priority: "low",
    reviewer: "System (v2.3)",
    assignedToMe: false,
    returnRate: 0.11,
    accountAgeYrs: 5,
    lifetimeValue: 261200,
    daysSinceDelivery: 4,
    policyCompliant: true,
    visionConfidence: 0.93,
    visionVerdict: "Unworn sole pattern verified",
    behavioralRisk: 0.09,
    claim: "Ordered two sizes, returning the larger pair.",
    clusterId: null,
  },
  {
    id: "CASE-89234",
    createdAt: "2026-08-30T10:02:00Z",
    customer: "Ishita Banerjee",
    customerId: "USR-64871",
    tier: "Tier 1",
    region: "IN-North (Jaipur)",
    product: "Canon EOS R8 Body",
    category: "Electronics / Imaging",
    sku: "CAN-EOSR8-BDY",
    value: 125900,
    mlScore: 0.58,
    riskClass: "policy_abuser",
    evidenceState: "insufficient",
    decision: "human_investigation",
    priority: "high",
    reviewer: "Dhruv Kapoor",
    assignedToMe: false,
    returnRate: 0.47,
    accountAgeYrs: 1.6,
    lifetimeValue: 453600,
    daysSinceDelivery: 27,
    policyCompliant: true,
    visionConfidence: 0.51,
    visionVerdict: "Shutter count 4,120 — heavy use",
    behavioralRisk: 0.55,
    claim: "Not suitable for my workflow, returning within window.",
    clusterId: null,
  },
  {
    id: "CASE-89233",
    createdAt: "2026-08-29T19:44:00Z",
    customer: "Vikram Chauhan",
    customerId: "USR-11930",
    tier: "New Account",
    region: "IN-Central (Indore)",
    product: "PlayStation 5 Slim",
    category: "Gaming",
    sku: "SNY-PS5S-DIG",
    value: 37700,
    mlScore: 0.203,
    riskClass: "organized_fraud",
    evidenceState: "conflict",
    decision: "auto_rejected",
    priority: "critical",
    reviewer: "System (v2.3)",
    assignedToMe: false,
    returnRate: 0.9,
    accountAgeYrs: 0.05,
    lifetimeValue: 37700,
    daysSinceDelivery: 2,
    policyCompliant: true,
    visionConfidence: 0.19,
    visionVerdict: "Serial mismatch against outbound scan",
    behavioralRisk: 0.96,
    claim: "Console dead on arrival, sending back different serial.",
    clusterId: "SYNDICATE-412",
  },
  {
    id: "CASE-89232",
    createdAt: "2026-08-29T17:21:00Z",
    customer: "Divya Pillai",
    customerId: "USR-33489",
    tier: "VIP Gold",
    region: "IN-South (Bengaluru)",
    product: "Hawkins Futura Cookware Set",
    category: "Home / Kitchen",
    sku: "HWK-FUT-CKW-05",
    value: 31900,
    mlScore: 0.905,
    riskClass: "legitimate",
    evidenceState: "aligned",
    decision: "auto_approved",
    priority: "low",
    reviewer: "System (v2.3)",
    assignedToMe: false,
    returnRate: 0.06,
    accountAgeYrs: 7.2,
    lifetimeValue: 750100,
    daysSinceDelivery: 9,
    policyCompliant: true,
    visionConfidence: 0.95,
    visionVerdict: "Enamel chip confirmed on rim",
    behavioralRisk: 0.07,
    claim: "Arrived chipped along the rim.",
    clusterId: null,
  },
  {
    id: "CASE-89231",
    createdAt: "2026-08-29T15:03:00Z",
    customer: "Harsh Vardhan",
    customerId: "USR-77812",
    tier: "Tier 2 Loyalty",
    region: "IN-East (Kolkata)",
    product: "Sony WH-CH720N Headphones",
    category: "Electronics / Audio",
    sku: "SNY-CH720N-BLK",
    value: 37700,
    mlScore: 0.64,
    riskClass: "policy_abuser",
    evidenceState: "aligned",
    decision: "human_investigation",
    priority: "normal",
    reviewer: "Priya Nambiar",
    assignedToMe: false,
    returnRate: 0.38,
    accountAgeYrs: 3.1,
    lifetimeValue: 250300,
    daysSinceDelivery: 14,
    policyCompliant: true,
    visionConfidence: 0.72,
    visionVerdict: "Ear cushions show cosmetic wear",
    behavioralRisk: 0.44,
    claim: "Noise cancelling weaker than advertised.",
    clusterId: null,
  },
  {
    id: "CASE-89230",
    createdAt: "2026-08-29T11:47:00Z",
    customer: "Neha Kulkarni",
    customerId: "USR-49220",
    tier: "Tier 1",
    region: "IN-West (Pune)",
    product: "Decathlon Quechua Puffer Jacket",
    category: "Outerwear",
    sku: "DCT-QCH-MED-GRN",
    value: 20100,
    mlScore: 0.888,
    riskClass: "legitimate",
    evidenceState: "aligned",
    decision: "auto_approved",
    priority: "low",
    reviewer: "System (v2.3)",
    assignedToMe: false,
    returnRate: 0.13,
    accountAgeYrs: 2.9,
    lifetimeValue: 136100,
    daysSinceDelivery: 6,
    policyCompliant: true,
    visionConfidence: 0.91,
    visionVerdict: "Baffle stitching defect verified",
    behavioralRisk: 0.11,
    claim: "Seam opened at the shoulder baffle.",
    clusterId: null,
  },
  {
    id: "CASE-89229",
    createdAt: "2026-08-28T20:38:00Z",
    customer: "Ravi Menon",
    customerId: "USR-58003",
    tier: "Tier 2 Loyalty",
    region: "IN-South (Chennai)",
    product: "Samsung 65\" OLED S90D",
    category: "Electronics / Display",
    sku: "SMS-S90D-65",
    value: 159500,
    mlScore: 0.492,
    riskClass: "policy_abuser",
    evidenceState: "insufficient",
    decision: "human_investigation",
    priority: "critical",
    reviewer: null,
    assignedToMe: true,
    returnRate: 0.29,
    accountAgeYrs: 4.7,
    lifetimeValue: 793800,
    daysSinceDelivery: 24,
    policyCompliant: true,
    visionConfidence: 0.47,
    visionVerdict: "Panel image retention inconclusive",
    behavioralRisk: 0.5,
    claim: "Burn-in visible on static content after three weeks.",
    clusterId: null,
  },
  {
    id: "CASE-89228",
    createdAt: "2026-08-28T16:10:00Z",
    customer: "Pooja Shetty",
    customerId: "USR-60112",
    tier: "New Account",
    region: "IN-North (Lucknow)",
    product: "Lenskart Air Smart Frames",
    category: "Wearables",
    sku: "LNK-AIR-WAY-BLK",
    value: 27600,
    mlScore: 0.267,
    riskClass: "wardrobing",
    evidenceState: "conflict",
    decision: "auto_rejected",
    priority: "high",
    reviewer: "System (v2.3)",
    assignedToMe: false,
    returnRate: 0.66,
    accountAgeYrs: 0.3,
    lifetimeValue: 53800,
    daysSinceDelivery: 29,
    policyCompliant: false,
    visionConfidence: 0.34,
    visionVerdict: "Lens micro-scratching, 41 recorded captures",
    behavioralRisk: 0.71,
    claim: "Battery life poor, returning unused.",
    clusterId: "SYNDICATE-412",
  },
  {
    id: "CASE-89227",
    createdAt: "2026-08-28T13:55:00Z",
    customer: "Sanjay Bhatt",
    customerId: "USR-19845",
    tier: "Tier 1",
    region: "IN-South (Bengaluru)",
    product: "Prestige Gas Tandoor Grill",
    category: "Outdoor",
    sku: "PRS-TND-E325",
    value: 92300,
    mlScore: 0.83,
    riskClass: "legitimate",
    evidenceState: "aligned",
    decision: "human_investigation",
    priority: "high",
    reviewer: "Manav Trivedi",
    assignedToMe: false,
    returnRate: 0.08,
    accountAgeYrs: 8.4,
    lifetimeValue: 623300,
    daysSinceDelivery: 11,
    policyCompliant: true,
    visionConfidence: 0.89,
    visionVerdict: "Cast-iron grate fracture confirmed",
    behavioralRisk: 0.1,
    claim: "Grate cracked during first assembly.",
    clusterId: null,
  },
  {
    id: "CASE-89226",
    createdAt: "2026-08-28T09:26:00Z",
    customer: "Tara Sethi",
    customerId: "USR-84420",
    tier: "VIP Diamond",
    region: "IN-West (Ahmedabad)",
    product: "Tanishq Gold-Plated Clutch",
    category: "Luxury / Accessories",
    sku: "TNQ-CLT-BLK",
    value: 130200,
    mlScore: 0.77,
    riskClass: "legitimate",
    evidenceState: "aligned",
    decision: "human_investigation",
    priority: "high",
    reviewer: "Ananya Sharma",
    assignedToMe: true,
    returnRate: 0.05,
    accountAgeYrs: 9.1,
    lifetimeValue: 2083200,
    daysSinceDelivery: 7,
    policyCompliant: true,
    visionConfidence: 0.87,
    visionVerdict: "Hardware plating defect verified",
    behavioralRisk: 0.08,
    claim: "Clasp plating flaked within a week.",
    clusterId: null,
  },
  {
    id: "CASE-89225",
    createdAt: "2026-08-27T18:02:00Z",
    customer: "Nikhil Joshi",
    customerId: "USR-30991",
    tier: "Tier 2 Loyalty",
    region: "IN-South (Kochi)",
    product: "GoPro Hero 13",
    category: "Electronics / Imaging",
    sku: "GPR-H13-BLK",
    value: 36000,
    mlScore: 0.355,
    riskClass: "wardrobing",
    evidenceState: "conflict",
    decision: "human_investigation",
    priority: "normal",
    reviewer: null,
    assignedToMe: false,
    returnRate: 0.52,
    accountAgeYrs: 1.9,
    lifetimeValue: 185600,
    daysSinceDelivery: 16,
    policyCompliant: true,
    visionConfidence: 0.62,
    visionVerdict: "Housing sand ingress, 3 dive sessions logged",
    behavioralRisk: 0.63,
    claim: "Housing leaked, never taken underwater.",
    clusterId: null,
  },
  {
    id: "CASE-89224",
    createdAt: "2026-08-27T14:48:00Z",
    customer: "Kavya Reddy",
    customerId: "USR-45123",
    tier: "VIP Gold",
    region: "IN-West (Mumbai)",
    product: "Godrej Interio Ergo Chair",
    category: "Furniture",
    sku: "GDJ-ERG-SZB",
    value: 146600,
    mlScore: 0.912,
    riskClass: "legitimate",
    evidenceState: "aligned",
    decision: "human_investigation",
    priority: "high",
    reviewer: "Dhruv Kapoor",
    assignedToMe: false,
    returnRate: 0.04,
    accountAgeYrs: 6.6,
    lifetimeValue: 1285200,
    daysSinceDelivery: 10,
    policyCompliant: true,
    visionConfidence: 0.94,
    visionVerdict: "Gas lift failure reproduced",
    behavioralRisk: 0.07,
    claim: "Chair will not hold height, sinks under load.",
    clusterId: null,
  },
  {
    id: "CASE-89223",
    createdAt: "2026-08-27T10:15:00Z",
    customer: "Sahil M.",
    customerId: "USR-90482",
    tier: "Ring Member",
    region: "IN-West (Mumbai)",
    product: "Sabyasachi Heritage Tote (Boutique)",
    category: "Luxury / Accessories",
    sku: "SBY-TOT-MM-MRN",
    value: 172200,
    mlScore: 0.112,
    riskClass: "organized_fraud",
    evidenceState: "conflict",
    decision: "auto_rejected",
    priority: "critical",
    reviewer: "System (v2.3)",
    assignedToMe: false,
    returnRate: 0.88,
    accountAgeYrs: 0.15,
    lifetimeValue: 172200,
    daysSinceDelivery: 13,
    policyCompliant: true,
    visionConfidence: 0.24,
    visionVerdict: "Counterfeit stitch pattern detected",
    behavioralRisk: 0.98,
    claim: "Bag is not as described, requesting refund.",
    clusterId: "SYNDICATE-409",
  },
  {
    id: "CASE-89222",
    createdAt: "2026-08-26T21:31:00Z",
    customer: "Ritika Saxena",
    customerId: "USR-27784",
    tier: "Tier 1",
    region: "IN-West (Pune)",
    product: "Noise ColorFit Ultra 4 Watch",
    category: "Wearables",
    sku: "NSE-CFU4-51",
    value: 83900,
    mlScore: 0.702,
    riskClass: "legitimate",
    evidenceState: "aligned",
    decision: "human_investigation",
    priority: "normal",
    reviewer: "Priya Nambiar",
    assignedToMe: false,
    returnRate: 0.16,
    accountAgeYrs: 3.4,
    lifetimeValue: 334300,
    daysSinceDelivery: 8,
    policyCompliant: true,
    visionConfidence: 0.85,
    visionVerdict: "Bezel separation confirmed",
    behavioralRisk: 0.19,
    claim: "Bezel lifted after a week of swimming.",
    clusterId: null,
  },
  {
    id: "CASE-89221",
    createdAt: "2026-08-26T16:09:00Z",
    customer: "Imran Sheikh",
    customerId: "USR-51120",
    tier: "New Account",
    region: "IN-North (Chandigarh)",
    product: "Nintendo Switch 2",
    category: "Gaming",
    sku: "NTD-SW2-OLED",
    value: 39400,
    mlScore: 0.238,
    riskClass: "policy_abuser",
    evidenceState: "conflict",
    decision: "auto_rejected",
    priority: "high",
    reviewer: "System (v2.3)",
    assignedToMe: false,
    returnRate: 0.74,
    accountAgeYrs: 0.4,
    lifetimeValue: 115900,
    daysSinceDelivery: 31,
    policyCompliant: false,
    visionConfidence: 0.29,
    visionVerdict: "Missing dock + cables on inbound scan",
    behavioralRisk: 0.79,
    claim: "Changed my mind, want a full refund.",
    clusterId: null,
  },
  {
    id: "CASE-89220",
    createdAt: "2026-08-26T11:24:00Z",
    customer: "Lakshmi Krishnan",
    customerId: "USR-66302",
    tier: "VIP Gold",
    region: "IN-North (Delhi NCR)",
    product: "Eureka Forbes Vacuum Pro",
    category: "Home / Appliance",
    sku: "EFB-VAC-PRO",
    value: 54500,
    mlScore: 0.897,
    riskClass: "legitimate",
    evidenceState: "aligned",
    decision: "auto_approved",
    priority: "low",
    reviewer: "System (v2.3)",
    assignedToMe: false,
    returnRate: 0.07,
    accountAgeYrs: 5.8,
    lifetimeValue: 588800,
    daysSinceDelivery: 5,
    policyCompliant: true,
    visionConfidence: 0.92,
    visionVerdict: "Suction motor fault verified",
    behavioralRisk: 0.09,
    claim: "Motor cuts out after two minutes.",
    clusterId: null,
  },
  {
    id: "CASE-89219",
    createdAt: "2026-08-25T19:52:00Z",
    customer: "Faizan Ansari",
    customerId: "USR-73991",
    tier: "Tier 2 Loyalty",
    region: "IN-East (Bhubaneswar)",
    product: "Dell UltraSharp U3225QE",
    category: "Electronics / Display",
    sku: "DEL-U3225QE",
    value: 104900,
    mlScore: 0.671,
    riskClass: "legitimate",
    evidenceState: "aligned",
    decision: "human_investigation",
    priority: "normal",
    reviewer: null,
    assignedToMe: false,
    returnRate: 0.19,
    accountAgeYrs: 2.2,
    lifetimeValue: 345200,
    daysSinceDelivery: 9,
    policyCompliant: true,
    visionConfidence: 0.83,
    visionVerdict: "Dead pixel cluster confirmed (7 px)",
    behavioralRisk: 0.21,
    claim: "Dead pixel cluster in the top-left quadrant.",
    clusterId: null,
  },
  {
    id: "CASE-89218",
    createdAt: "2026-08-25T13:07:00Z",
    customer: "Shreya Ghosh",
    customerId: "USR-80017",
    tier: "Tier 1",
    region: "IN-South (Bengaluru)",
    product: "Raymond Wool Blazer",
    category: "Formalwear",
    sku: "RYM-BLZ-4402-CHR",
    value: 45800,
    mlScore: 0.291,
    riskClass: "wardrobing",
    evidenceState: "conflict",
    decision: "human_investigation",
    priority: "high",
    reviewer: "Manav Trivedi",
    assignedToMe: false,
    returnRate: 0.58,
    accountAgeYrs: 2.7,
    lifetimeValue: 272200,
    daysSinceDelivery: 4,
    policyCompliant: true,
    visionConfidence: 0.68,
    visionVerdict: "Event lint + cologne residue detected",
    behavioralRisk: 0.66,
    claim: "Sizing incorrect, returning unworn.",
    clusterId: null,
  },
];

export const DEMO_CASES: ReturnCase[] = SEEDS.map((s) => ({
  ...s,
  drivers: driversFor(s),
}));

export interface Cluster {
  id: string;
  label: string;
  risk: string;
  members: { name: string; userId: string; signal: string; detail: string }[];
  sharedAttributes: string[];
  atRiskValue: number;
  similarity: number;
  status: "flagged" | "restricted" | "cleared";
  patterns: string[];
}

export const DEMO_CLUSTERS: Cluster[] = [
  {
    id: "SYNDICATE-409",
    label: "Wardrobing & Empty Box Ring",
    risk: "High Risk Ring",
    members: [
      {
        name: "Sneha M.",
        userId: "USR-90214",
        signal: "Shared Device",
        detail: "iPhone 15 Pro • Canvas 0x8F9A • +91 98••• ••231",
      },
      {
        name: "Sneha Malhotra",
        userId: "USR-90482",
        signal: "Shared Address",
        detail: "Flat 4B, Andheri East, Mumbai 400069",
      },
      {
        name: "S.M. Apparels",
        userId: "USR-90551",
        signal: "Shared Payment",
        detail: "Razorpay Virtual #4128 (BIN 412800)",
      },
    ],
    sharedAttributes: [
      "Device fingerprint 100% vector match",
      "Geolocation & address loop 97.4%",
      "Payment BIN re-use — disposable virtual card",
      "Identical stock photo, altered EXIF",
    ],
    atRiskValue: 709800,
    similarity: 0.987,
    status: "flagged",
    patterns: ["Empty box", "Duplicate imagery", "Luxury handbag target SKU"],
  },
  {
    id: "SYNDICATE-412",
    label: "Serial Swap Electronics Ring",
    risk: "Elevated",
    members: [
      {
        name: "Vikram Chauhan",
        userId: "USR-11930",
        signal: "Shared Device",
        detail: "Pixel 9 • Canvas 0x21C4 • +91 90••• ••847",
      },
      {
        name: "Pooja Shetty",
        userId: "USR-60112",
        signal: "Shared Payment",
        detail: "Prepaid BIN 517805",
      },
    ],
    sharedAttributes: [
      "Serial mismatch on inbound scan",
      "Prepaid BIN re-use across 2 accounts",
      "Return filed within 48h of delivery",
    ],
    atRiskValue: 65400,
    similarity: 0.913,
    status: "flagged",
    patterns: ["Serial swap", "Rapid return velocity"],
  },
  {
    id: "SYNDICATE-401",
    label: "Weekend Formalwear Wardrobing",
    risk: "Monitored",
    members: [
      {
        name: "Shreya Ghosh",
        userId: "USR-80017",
        signal: "Behavioral",
        detail: "6 consecutive weekend cycles",
      },
      {
        name: "Kabir Deshmukh",
        userId: "USR-22019",
        signal: "Behavioral",
        detail: "Tag removal repeat pattern",
      },
    ],
    sharedAttributes: [
      "Friday delivery / Monday return cycle",
      "Security tags removed",
      "Event residue on garments",
    ],
    atRiskValue: 430100,
    similarity: 0.864,
    status: "flagged",
    patterns: ["Wardrobing", "Weekend cycle"],
  },
];

export interface Threshold {
  key: string;
  label: string;
  description: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
}

export const DEFAULT_THRESHOLDS: Threshold[] = [
  {
    key: "autoApproveValue",
    label: "Autonomous refund cap",
    description:
      "Returns above this order value always route to human verification.",
    value: 42000,
    min: 10000,
    max: 200000,
    step: 1000,
    unit: "₹",
  },
  {
    key: "autoApproveScore",
    label: "Auto-approve trust score",
    description: "Minimum ML trust score required for an instant grant.",
    value: 0.85,
    min: 0.5,
    max: 0.99,
    step: 0.01,
    unit: "score",
  },
  {
    key: "autoRejectScore",
    label: "Auto-reject trust score",
    description: "Trust score at or below this value hard-blocks the refund.",
    value: 0.25,
    min: 0.05,
    max: 0.5,
    step: 0.01,
    unit: "score",
  },
  {
    key: "returnWindowDays",
    label: "Policy return window",
    description: "Section 4.2 eligibility window measured from delivery.",
    value: 30,
    min: 7,
    max: 90,
    step: 1,
    unit: "days",
  },
  {
    key: "visionConfidence",
    label: "Vision corroboration floor",
    description:
      "Minimum computer-vision confidence before visual evidence counts as supporting.",
    value: 0.8,
    min: 0.4,
    max: 0.99,
    step: 0.01,
    unit: "score",
  },
];

export interface GroundTruthRecord {
  caseId: string;
  prediction: string;
  truth: string;
  officer: string;
  weight: number;
  at: string;
}

export const DEMO_GROUND_TRUTH: GroundTruthRecord[] = [
  {
    caseId: "RET-8941-BLR",
    prediction: "Legitimate (68% conf)",
    truth: "Policy Abuser (Serial Wardrobing)",
    officer: "Sarah Lin (Lead T&S)",
    weight: 15,
    at: "Today, 09:14:22",
  },
  {
    caseId: "RET-8938-DEL",
    prediction: "Organized Fraud (84% conf)",
    truth: "Legitimate (Carrier Damaged In-Transit)",
    officer: "David K. (Senior Analyst)",
    weight: 15,
    at: "Today, 08:42:01",
  },
  {
    caseId: "RET-8924-MUM",
    prediction: "Policy Abuser (52% conf)",
    truth: "Organized Fraud (Mailing Brick Box)",
    officer: "Sarah Lin (Lead T&S)",
    weight: 15,
    at: "Yesterday, 17:29:40",
  },
];

export interface ModelRecord {
  version: string;
  stage: "production" | "candidate" | "archived";
  macroF1: number;
  weightedF1: number;
  precision: number;
  abuserRecall: number;
  latencyMs: number;
  trainedAt: string;
  notes: string;
}

export const DEMO_MODELS: ModelRecord[] = [
  {
    version: "v2.3.1",
    stage: "production",
    macroF1: 0.8721,
    weightedF1: 0.9145,
    precision: 0.941,
    abuserRecall: 0.794,
    latencyMs: 42,
    trainedAt: "2026-07-19",
    notes: "In service 42 days. Stable across all monitored slices.",
  },
  {
    version: "v2.4.0-cand",
    stage: "candidate",
    macroF1: 0.8717,
    weightedF1: 0.9152,
    precision: 0.9418,
    abuserRecall: 0.778,
    latencyMs: 44,
    trainedAt: "2026-09-02",
    notes:
      "Promotion blocked: protected-class recall guardrail breached (-1.60 pp on Policy Abuser).",
  },
  {
    version: "v2.2.4",
    stage: "archived",
    macroF1: 0.8512,
    weightedF1: 0.9017,
    precision: 0.9284,
    abuserRecall: 0.771,
    latencyMs: 39,
    trainedAt: "2026-05-30",
    notes: "Retired after v2.3.1 promotion. Retained for audit replay.",
  },
];

export interface QualityCheck {
  name: string;
  domain: string;
  status: "pass" | "warn" | "fail";
  coverage: number;
  detail: string;
}

export const DEMO_QUALITY: QualityCheck[] = [
  {
    name: "Vision asset completeness",
    domain: "Evidence intake",
    status: "pass",
    coverage: 0.982,
    detail: "98.2% of returns arrive with at least two usable photographs.",
  },
  {
    name: "Carrier timestamp integrity",
    domain: "Logistics feed",
    status: "pass",
    coverage: 0.996,
    detail: "Delivery events reconciled against carrier webhooks hourly.",
  },
  {
    name: "Ground-truth label volume",
    domain: "Human verification",
    status: "fail",
    coverage: 0.52,
    detail: "26 of 50 required verified labels captured for the v2.4 candidate.",
  },
  {
    name: "Feature drift — return velocity",
    domain: "Behavioral ML",
    status: "warn",
    coverage: 0.87,
    detail: "Population stability index 0.19 on the 7-day rolling window.",
  },
  {
    name: "Duplicate image hashing",
    domain: "Computer vision",
    status: "pass",
    coverage: 1,
    detail: "Perceptual hashes computed for 100% of submitted imagery.",
  },
  {
    name: "PII redaction on export",
    domain: "Governance",
    status: "pass",
    coverage: 1,
    detail: "All dossier exports pass the redaction linter before download.",
  },
];

export interface AuditEntry {
  id: string;
  at: string;
  actor: string;
  action: string;
  target: string;
  detail: string;
}

export const DEMO_AUDIT: AuditEntry[] = [
  {
    id: "AUD-4401",
    at: "2026-08-31T09:20:00Z",
    actor: "Ananya Sharma",
    action: "case.assigned",
    target: "CASE-89241",
    detail: "Case routed to lead reviewer under the ₹40,000 value gate.",
  },
  {
    id: "AUD-4400",
    at: "2026-08-31T08:42:00Z",
    actor: "System (v2.3.1)",
    action: "case.auto_approved",
    target: "CASE-89240",
    detail: "Trust score 0.982 with sealed-packaging vision confirmation.",
  },
  {
    id: "AUD-4399",
    at: "2026-08-31T07:59:00Z",
    actor: "System (v2.3.1)",
    action: "case.auto_rejected",
    target: "CASE-89239",
    detail: "Empty-box weight anomaly plus SYNDICATE-409 ring correlation.",
  },
  {
    id: "AUD-4398",
    at: "2026-08-30T22:11:00Z",
    actor: "Dhruv Kapoor",
    action: "model.promotion_blocked",
    target: "v2.4.0-cand",
    detail: "Gate 4 protected-class recall guardrail breached (-1.60 pp).",
  },
  {
    id: "AUD-4397",
    at: "2026-08-30T18:15:00Z",
    actor: "Ananya Sharma",
    action: "cluster.flagged",
    target: "SYNDICATE-409",
    detail: "Three accounts frozen pending Tier 3 trust escalation.",
  },
];
