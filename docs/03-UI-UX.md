# UI/UX specification
Status: APPROVED interaction model. Exact colors/fonts/illustrations TODO until user reference arrives.

**Global shell:** top or side compact navigation with 3 destinations: `Calendario`, `Diario`, `Giorno` (most recently selected/current unlocked day). Persistent bottom-right illustrated Santa sack button on all screens; accessible label `Apri sacchetto degli indizi`. Small story/chapter context. Avoid clutter, autoplay and complex animation. Responsive touch targets >=44px.

**Calendar:** 24 numbered doors/cards in an attractive responsive grid. States: future locked, unlocked unsolved, completed. Current day is apparent. Selecting unlocked day opens it; future day indicates date without leaking puzzle. Previously unlocked days stay accessible. No previous-day prerequisite. Day content may be `draft` during development; production must clearly show unavailable, never pretend solved.

**Day:** title/date, short narrative opening, 2–3 (or as needed) static documents shown as readable cards/thumbnails, tap to open zoomable modal with accessible text; puzzle interaction panel; answer/check button; hint button (one subtle hint, reveal confirmation optional); non-punitive error feedback; success panel with complete narrative/dialogue and any earned objects; button to open diary/calendar. Do not require finding clickable objects in scene. On iPad landscape use two columns (documents and interaction); portrait stack sections. Preserve per-day puzzle work where useful, not required for first prototype.

**Diary:** independent top-level section, not combined with inventory. Book-like chronologically ordered full chapters, not mere summaries. Show narrative and dialogue only for completed days (and optionally opening text of visited unlocked days clearly distinguished); no spoilers from future days. Allow selecting previous completed days, pleasant typography, easy scrolling. Narrative should be authored in content files, not fabricated by UI.

**Sack inventory:** fixed lower-right button opens overlay/drawer, retaining underlying day context. Grid of predetermined generic spoiler-safe silhouettes. States: undiscovered = silhouette, no title revealing spoilers; discovered active = full-color illustration, tap to inspect and zoom/read; exhausted = same item desaturated, still inspectable. Acquired ONLY upon correct completion of `acquiredByDay`; gray ONLY when the last relevant puzzle day has actually been completed. Multiple-use items remain active until last use. Do not remove items. No separate used-items tab.

**Visual placeholders:** atmospheric dark/warm background with CSS gradients while reference art is pending; backgrounds mapped per chapter/day and asset paths configurable. No premature logo/color/font decisions. Maintain consistent document frame, ticket and paper visual language. Use static WebP/PNG assets eventually. Fallback to clean CSS if absent.

**Minimal supporting controls:** accessible help/settings with backup export/import and short usage note; no unnecessary settings or complex menus. Avoid 'hover-only' behavior. Loading/error/empty states are real and helpful.
