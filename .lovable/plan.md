# Import & Deploy "Heartfelt App Builder" (TrustLoop returns-fraud dashboard)

## What the upload is
A complete Lovable/TanStack Start project export (no `.git` metadata — safe to copy). It's a client-side demo app for reviewing product-return fraud:

- **Routes:** `/` (redirect/landing), `/dashboard`, `/returns`, `/analyze-return`, `/review-queue`, `/assigned`, `/case/$caseId`, `/fraud-radar`, `/analytics`, `/governance/retraining`
- **Components:** AppShell, AppSidebar, TopBar + full shadcn/ui set
- **State:** `trustloop-store.tsx` context store backed by `demo-data.ts` and localStorage — no backend, no auth, no secrets needed
- Same framework versions as this project (TanStack Start v1, Tailwind v4, React 19)

## Steps

1. **Copy source into this project** — `src/`, `public/`, and config (`package.json`, `vite.config.ts`, `tsconfig.json`, `components.json`, `eslint.config.js`, prettier/bunfig files) from the archive, replacing the placeholder index route. Exclude `.git` (verified absent) and `node_modules`.
2. **Install dependencies** — `bun install` to reconcile the copied `package.json`/`bun.lock` (radix-ui, recharts, embla, vaul, etc.).
3. **Fix head metadata** — set an app-specific title/description ("TrustLoop – Returns Fraud Review") in `__root.tsx`/index head instead of the "Lovable App" template defaults.
4. **Verify** — check the build log is clean and smoke-test `/` and `/dashboard` render with demo data.
5. **Deploy** — publish via the Publish flow so the app is live at its `*.lovable.app` URL.

## Notes / technical details
- No backend or database required: all data is in-memory demo data persisted to localStorage. If you later want real persistence or multi-user auth, that would be a separate Lovable Cloud follow-up.
- The old project README references the original Lovable project; it will be replaced/kept as documentation only.
