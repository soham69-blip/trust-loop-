# TrustLoop 🔄

### AI-Powered E-Commerce Returns Intelligence & Fraud Decisioning

TrustLoop is an AI-powered returns intelligence platform that analyzes e-commerce return requests using **machine learning, visual evidence, policy intelligence, and multi-agent investigation** to determine whether a return should be accepted, rejected, or escalated for human review.

---

## 🚀 What TrustLoop Does

TrustLoop evaluates a return case from multiple dimensions:

- 🤖 **ML Risk Scoring** — Detects suspicious return behavior using LightGBM.
- 👁️ **Visual Evidence Analysis** — Analyzes product/return images using Gemini Vision.
- 📚 **Policy Intelligence** — Retrieves and evaluates relevant return policies using RAG.
- 🧠 **Multi-Agent Investigation** — Multiple specialized agents investigate different aspects of a case.
- ⚖️ **Decision Fusion** — Combines ML, evidence, policy, and investigation signals.
- 🔍 **Explainable Decisions** — Provides risk factors, evidence, and reasoning behind decisions.
- 👨‍💼 **Human Escalation** — Sends uncertain or high-risk cases for manual review.
- 📈 **Feedback & Learning** — Captures human feedback for model and decision-system improvement.
- 🕸️ **Evidence Visualization** — Visualizes relationships between cases, evidence, signals, and decisions.

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │   Return Request    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Intake Agent      │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
       ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
       │ Vision /    │ │ Risk Agent  │ │ Policy RAG  │
       │ Evidence    │ │             │ │             │
       └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
              │               │               │
              └───────────────┼───────────────┘
                              ▼
                    ┌─────────────────────┐
                    │ Investigation Agent │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Score Fusion      │
                    └──────────┬──────────┘
                               │
                               ▼
                 ┌───────────────────────────┐
                 │     Decision Engine       │
                 └─────────────┬─────────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
        AUTO_ACCEPT       AUTO_RETURN    HUMAN_ESCALATION
