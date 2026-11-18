# Visual direction and asset workflow
Status: partial APPROVED, final identity TODO (await user reference image).

2D illustrated vintage railway Christmas atmosphere; mixture of dark mysterious and warm nostalgic zones. UI should echo documents and story but remain readable and fast. Static backgrounds may change by day/chapter (train interior, Valbruma city, etc.) without navigable scenes. Prefer one optimized static image per scene/chapter, optional light CSS overlays; no expensive video/3D/parallax.

**Do NOT decide yet:** final palette, fonts, logo, exact textures or illustration prompts. User will provide style reference. Build CSS variables and asset manifest so these can be swapped without component rewrites. Temporary CSS-only backgrounds and system fonts are fine. Use coherent placeholders, not random stock photos.

**Asset slots:** app logo; calendar backdrop; 6 chapter/day background slots; document illustrations; item full-color images and spoiler-safe silhouette variants; optional diary paper texture. Keep aspect ratios, alt text, and fallback visuals. Compress WebP where suitable, lazy load noncritical images. Do not generate imagery without explicit user request/reference.

## Implemented visual conventions — provisional

Following the user's direction, the current interface uses a vintage illustrated-book mood: night blue and muted violet surfaces, lavender-gray text, warm amber details, and restrained paper and ticket frames. These are replaceable CSS choices, not approval of a final palette or illustration. CSS tokens in `src/style.css` centralize color, surface, border, shadow, typography and spacing; system serif and sans-serif fonts avoid external font downloads. Calendar doors distinguish locked, available and completed states with labels as well as color. Documents and puzzle controls remain semantic HTML, with visible focus and touch targets.

Illustrated backgrounds, logo and the sack icon are optional manifest entries in `src/content/assets.ts`. A dark veil protects text over backgrounds; if an image is missing the CSS background and generic symbols remain usable. Day backgrounds take precedence over chapter backgrounds. The existing document and inventory asset conventions are detailed in `ASSET-GUIDE.md`; an exhausted item's revealed image is desaturated with CSS. Landscape uses two columns where space permits, while portrait stacks them. Verify contrast, cropping, touch and focus on iPad with the actual artwork.

The reference image, final illustration style, logo, sack icon, chapter/day scenes, document illustrations, item images and silhouettes remain **TODO** and require user approval. No final image or story content is implied by the provisional interface.
