# Tsiaro Portfolio — Visual System

The site intentionally changes visual language as the visitor moves through it. The goal is a coherent universe, not one repeated template.

## Core references

- **Cognitive / chromatic mode:** oversized neutral sans-serif typography, orange-red + indigo atmospheric blur, grain, high contrast.
- **Architecture / planetary survey mode:** near-black, mineral brown, warm sand, extremely thin contour lines, technical microtype, mapping and measured observation.
- **Creative / botanical-object mode:** editorial serif typography, deep forest/plum backgrounds, cream text, visible painterly strokes, tactile imagery and asymmetry.
- **Archive mode:** bone/paper backgrounds, black typography, thin rules, generous whitespace and editorial sequencing.

These references are interpreted rather than copied.

## Typography

- **Primary display / interface:** Inter via `--font-display-sans`.
- **Editorial / art:** Cormorant Garamond via `--font-editorial-serif`.
- **Technical microtype:** Geist Mono via `--font-mono-ui`.

The sans is intentionally close to the clean neo-grotesk feeling of the supplied “Cognitive Resonance” reference. The serif provides the high-contrast editorial feeling of the “Botanical Wanderers” reference while remaining web-licensed through `next/font`.

## Palette

Defined in `app/globals.css`:

- Space / deep black
- Bone / paper
- Sand / ochre
- Rust / signal red-orange
- Indigo / violet
- Forest / moss / sage
- Cream

Change these CSS variables to recolor the entire site without rebuilding components.

## Page identities

### Home
**Chromatic resonance → archive → field portals → editorial profile → chromatic contact.**

The opening uses large sans typography over blurred red/orange/indigo atmospheric colour. Architecture and Creative are then introduced as separate worlds.

### Work index
**Archive / catalogue.**

Light paper background. The visitor selects Architecture or Creative. Each selector has a different visual atmosphere before revealing its project grid.

### Architecture projects
**Planetary site survey.**

Dark mineral field, warm topographic lines, technical labels, sans display titles and measured image sequences.

### Creative projects
**Painterly object archive.**

Forest/plum field, cream + rust accents, Cormorant titles, brush strokes, light archival narrative sections and dark visual galleries.

### About
**Field notebook.**

Begins in the architectural/topographic world, shifts to paper/archive for biography, moves into a darker creative-material section for tools, then returns to paper for recognition.

### Contact
**Transmission / chromatic signal.**

Red-orange and indigo atmosphere with oversized sans typography and a translucent communications panel.

## Decorative components

- `components/TopographicField.tsx` — generated SVG contour field, no image dependency.
- `components/BrushField.tsx` — deterministic hand-painted capsule field using the project palette.
- `app/template.tsx` — subtle route transition with reduced-motion support.

## Project imagery

Project image selection is centralized in `data/projectMedia.ts`.

Changing a project cover or gallery image should normally require editing only that file.

## Editing priority

From this point forward, design experimentation should primarily happen in:

1. `app/globals.css` — palette, texture, typography, atmosphere.
2. `components/Hero.tsx` — opening composition.
3. `components/PortfolioGateway.tsx` / `PortfolioSelector.tsx` — field selection.
4. `app/work/[slug]/page.tsx` — architecture vs creative case-study compositions.
5. `data/projectMedia.ts` — image choices and ordering.

The data model, routing and project structure should remain stable unless the content requirements change.
