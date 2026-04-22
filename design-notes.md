# Lumo Candles — Design Notes

## Design Choices (150–200 words)

The goal was to make Lumo feel like a premium editorial brand, not a generic e-commerce store. Every decision was made to serve that feeling.

**Typography:** Cormorant Garamond (serif) for headings gives the brand a refined, almost editorial quality — the kind you see on high-end skincare and home goods sites. Jost (geometric sans-serif) handles body copy and UI labels cleanly without competing.

**Color:** The palette stays tight — cream (`#FAF7F2`), warm beige, and deep brown (`#3B2A1A`). No pure black or white. This keeps the mood warm and tactile, like the candles themselves.

**Spacing:** Generous whitespace is the real luxury signal. Sections breathe. Nothing feels crowded.

**Hero:** A full-bleed image with a directional gradient overlay keeps text legible while letting the photography do the heavy lifting. The subtle Ken Burns effect on hover adds life without being distracting.

**Product cards:** The "quick add" slide-up on hover is a common premium UX pattern — it keeps the grid clean but makes the action immediately accessible.

---

## Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Keeping the header balanced with logo centered | Used CSS Grid `1fr auto 1fr` on the header inner — nav left, logo center, actions right — without any absolute positioning hacks |
| Mobile nav without layout shift | Fixed-position overlay nav that slides in, with `overflow: hidden` on body to prevent scroll bleed |
| Product images varying in aspect ratio | Forced `aspect-ratio: 3/4` on the image wrapper with `object-fit: cover` so all cards are perfectly uniform regardless of source image |
| Scroll reveal without a library | Lightweight `IntersectionObserver` implementation with CSS transitions and staggered `--reveal-delay` custom properties per element |
| Newsletter UX | Inline form with focus-ring feedback, client-side email validation, and a simulated async submit state so the interaction feels real |

---

## Shopify Dawn Theme Implementation Notes

To port this to Shopify Dawn:

1. **Colors & Fonts** — Set in `Customize > Theme settings > Colors` and `Typography`. Dawn supports custom font pairings via Google Fonts.
2. **Hero** — Use the built-in `Image banner` section. Paste heading/subtext into the content fields.
3. **Featured Products** — Use `Featured collection` section, set to 4 columns.
4. **Brand Story** — Use `Image with text` section, image on left.
5. **Value Props** — Use `Multicolumn` section with 3 columns and icon images.
6. **Newsletter** — Use the built-in `Email signup` section.
7. **Custom CSS** — Paste overrides into `Customize > Edit code > assets/base.css` or use the Custom CSS field in the theme editor.
8. **Announcement bar** — Built into Dawn under `Header > Announcement bar`.

All Unsplash images used are free for commercial use under the Unsplash License.
