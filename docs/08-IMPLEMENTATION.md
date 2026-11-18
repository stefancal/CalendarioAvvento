# Execution plan and acceptance criteria
Status: APPROVED priorities.

**Phase A — working shell:** initialize Vite React TS Tailwind, nav Calendar/Diary/Day, responsive iPad layout, global sack overlay, coherent CSS placeholders, date unlock, localStorage. Must build and run without external services.

**Phase B — game engine:** typed day and item registry, day state, correct-answer validator interfaces, hints, success narration, diary gating, item acquisition and exhaustion, persistence, progress export/import, document viewer, clear draft/unavailable behavior. Add unit tests for invariants. Use one small self-contained DEVELOPMENT fixture for end-to-end testing, explicitly labeled noncanonical and excluded from production content; do not claim approved days complete until exact puzzle data exists.

**Phase C — puzzle widgets:** reusable code input, multi-field answers, 8-switch bank, simple logic-grid note helper. Keep features generic; no fake approved puzzle constraints. Add widgets for other days only as authored.

**Phase D — content/assets:** write and validate all 24 final puzzles, narrative/dialogue and documents, replace placeholders with consistent user-approved art. All 24 must be content-ready and manually tested before gift delivery. Validate puzzle uniqueness, wording and cross-day item chains. Test on iPad Safari, portrait and landscape, offline not required.

**Definition of 'functional skeleton':** calendar dates and state work, navigation works, diary reflects completion, sack silhouettes/active/gray derived correctly, one test puzzle can be completed with correct answer, hint/attempts work, export/import works, all routes resilient, responsive layout works, build and tests pass. This is NOT equivalent to 24 finished playable puzzles.

**Definition of 'finished gift':** all 24 days marked ready with authored verified puzzles and final narratives; correct images; no dead ends; full flow tested; published URL working; future dates locked in UI; progress recoverable; user-approved visuals. Explicitly report missing items.

**Run checks:** `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`. If scripts absent, add them; do not report green without execution. Provide a short implementation summary and remaining TODOs.
