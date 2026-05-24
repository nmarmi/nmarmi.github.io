# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running locally

No build step — open `index.html` directly in a browser, or serve it with any static server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Architecture

Static single-page portfolio site. Three files do everything:

- **`index.html`** — all content and markup; one long document with sections `#top`, `#about`, `#projects`, `#skills`, `#experience`, `#contact`
- **`styles.css`** — all styling; design tokens defined as CSS custom properties in `:root` (colors, spacing scale, radii, animation durations)
- **`script.js`** — all interactivity; no framework or bundler

### Key JS patterns

- `document.documentElement.classList.add("js-enabled")` runs immediately to enable progressive enhancement (the mobile nav is hidden via `.js-enabled .site-nav` rules and revealed only when JS is available)
- **Scroll reveal**: `.reveal` elements start at `opacity:0; transform:translateY(1rem)` and gain `.is-visible` via `IntersectionObserver`
- **Active nav link**: a second `IntersectionObserver` watches `main section[id]` elements and sets `aria-current="true"` on the matching nav link
- **Photo gallery**: self-contained IIFE at the bottom of `script.js`; manages slide state with `current` index and dot indicators
- **`modeContent` object + `setMode()`**: drives a "how I work" panel with three modes (build / analyze / collaborate). The panel's DOM nodes (`#mode-label`, `#mode-title`, etc.) must exist in `index.html` for this to work — if they're absent the functions silently no-op

### CSS layout

Responsive via three breakpoints: default (mobile), `≥720px` (2-col grids), `≥960px` (3-col project/skills grid, inline nav). The nav switches from an absolute dropdown to an inline flex row at 960px.
