# Technical architecture
Status: APPROVED design direction; detailed names are IMPLEMENTATION CHOICES.

React + Vite + TypeScript + Tailwind CSS. Static client-side app on Cloudflare Pages. No server, DB, auth, Firebase or external APIs. Use client-side view state (Calendar / Day / Diary), optionally URL hash for deep linking and refresh support; no need for React Router. All static files under `public/assets` and data modules under `src/content`. Keep reusable UI in `src/components`, state/storage in `src/game`, puzzle widgets in `src/puzzles`.

**Suggested data contracts:**
- `DayDefinition`: day (1..24), title, chapter, status (`ready` | `draft`), intro narrative, documents (IDs, titles, asset paths and optional accessible text), puzzle type and validated configuration, optional hint, success narrative/dialogue, awarded item IDs, diary content, background asset key.
- `InventoryItemDefinition`: id, title, image path, silhouette path (generic, spoiler-safe), acquiredByDay, lastNeededByDay (only when narratively settled), description.
- `ProgressV1`: version, completedDayIds, revealedHintDayIds, optional per-day draft puzzle state, completedAt, lastVisitedDay. Avoid storing unnecessary personal data.

**Persistence:** one versioned localStorage key, defensive parser and schema validation. Derive acquired inventory from completed days; derive gray/exhausted status from completed *last relevant* day, not merely calendar date. Never automatically grant items. A day can be opened on/after its unlock date regardless of prior completions. Date calculations use local calendar date in Europe/Rome; client clock is not tamperproof. Consider manual testing override only in dev mode, never shipped as a visible cheat control. Define launch year 2026 and allow replay after Dec 24.

**Backup:** explicit export/import progress JSON in a low-profile settings/help panel, with validation and confirmation before replacing progress. This is important because Safari localStorage may be lost or unavailable across browsers. No cloud sync. Store only progress, not assets.

**Validation:** exact-answer checks and dedicated validators for switch states / multi-field answers; never use an answer visible in page copy. Static JS bundle inherently exposes puzzle logic to a technically motivated person; do not claim anti-cheat security. Keep future puzzle content in separately lazy-loaded day modules where practical, but note that static assets remain discoverable.

**Quality:** strict TypeScript, no unnecessary libraries, responsive layouts, image fallbacks, lazy image loading, keyboard/touch accessibility, sensible focus and modal behavior. Provide unit tests for date unlocking, inventory derivation, persistence, and puzzle validators. README with `npm install`, `npm run dev`, `npm run build`, Cloudflare Pages build command `npm run build`, output `dist`.
