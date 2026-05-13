<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->
---
name: Headhunter
description: Geographic discovery surface for creative jobs at firms that contract with large enterprises.
---

# Design System: Headhunter

## 1. Overview

**Creative North Star: "The Atlas Room"**

Headhunter reads like an industry atlas, not a job board. Geography is the spine; firms and roles are entries in a curated index laid across a quiet map. The surface is warm paper, the type is editorial, the accent is rare. Restraint is the point: the content earns the page, the chrome stays out of the way.

This system explicitly rejects the generic SaaS dashboard (purple gradients, hero-metric templates, identical card grids), recruiter-database density (Crunchbase walls, LinkedIn-style row clutter), Zillow-style pin litter, and agency-portfolio template clichés (full-bleed video heros, oversized cursors, "we craft experiences"). It rejects neon, glassmorphism, and any visual move that signals "AI tool 2025."

**Key Characteristics:**
- Warm off-white ground tinted toward the brand hue; never `#fff`.
- One deep accent used ≤10% of any screen — the rare voice.
- Serif display over a calm sans body; ≥1.25 scale ratio.
- Map is flat with tonal layering, not shadowed cards.
- Motion is responsive, never choreographed. Reduced-motion fully honored.
- Profile-fit signal is a typographic + iconographic mark, never color alone.

## 2. Colors

A warm-paper palette with a single deep accent. Roles are: ground (paper), ink (text and lines), accent (rare emphasis), and three subdued map roles for geography.

### Primary
- **Deep Ink** (`oklch(20% 0.02 30)`): Text, map outlines, primary affordances. Near-black, tinted warm. Never `#000`.

### Secondary
- **Oxblood Accent** (`oklch(38% 0.12 25)`): The rare voice. Used on ≤10% of any screen — primary CTA, the user's profile-fit highlight on the map, the single Apply button. Saturation drops as lightness drops to keep it grounded.

### Tertiary (map roles)
- **Land Tone** (`oklch(94% 0.012 60)`): Default landmass fill, slightly warmer than the ground.
- **Water Tone** (`oklch(90% 0.008 220)`): Cool, low-chroma water; recedes behind land.
- **Borderline** (`oklch(80% 0.01 30)`): Country/region strokes, 1px, soft contrast.

### Neutral
- **Warm Paper** (`oklch(97% 0.008 60)`): Page ground. Tinted toward warm; never `#fff`.
- **Card Tone** (`oklch(95% 0.008 60)`): Subtle layer above paper for grouped content. Differs from paper by tone, not shadow.
- **Hairline** (`oklch(85% 0.008 60)`): Dividers, input strokes.
- **Quiet Ink** (`oklch(45% 0.015 30)`): Secondary text, metadata, labels.

### Named Rules
**The One Voice Rule.** The Oxblood Accent appears on ≤10% of any rendered screen. Two competing accents on one view is forbidden. If a third call-to-action wants color, it doesn't get it.

**The Tonal Map Rule.** Map regions differ by tone, not by hue. Saturation is reserved for data overlays (pins, profile-fit halo). The geography itself is monochromatic warm.

## 3. Typography

**Display Font:** A contemporary editorial serif (Tiempos Headline, GT Sectra, or similar) — to be chosen at implementation
**Body Font:** A neutral humanist sans (Inter, Söhne, or similar) — to be chosen at implementation
**Label/Mono Font:** A single grotesque mono for coordinates, location strings, role IDs — to be chosen at implementation

**Character:** A well-edited industry guide. The serif carries the voice; the sans does the work. No display weights above 600 — confidence comes from size, not stress.

### Hierarchy
- **Display** (serif, 400–500, `clamp(2.5rem, 6vw, 4.5rem)`, line-height 1.05): Section openers on the landing page, region names when a country is focused on the map.
- **Headline** (serif, 400, `clamp(1.75rem, 3vw, 2.5rem)`, line-height 1.15): Firm names in the index, job titles on detail pages.
- **Title** (sans, 500, 1.125rem, line-height 1.3): Card titles, sidebar headings, filter labels.
- **Body** (sans, 400, 1rem / 16px minimum, line-height 1.55, max 65–75ch): All running prose. Never below 16px.
- **Label** (mono, 500, 0.75rem, letter-spacing 0.06em, uppercase): Coordinates, country codes, role disciplines, status chips.

### Named Rules
**The Quiet Display Rule.** Display type never goes above weight 600. Editorial confidence comes from size and space, not stress.

**The 16px Floor Rule.** Body text never goes below 16px, regardless of viewport. Mobile gets the same body size as desktop.

## 4. Elevation

Flat by default with tonal layering. Surfaces stack via tone shifts (Paper → Card Tone → focused region), not shadows. Shadows are reserved for *response*: a hovered pin lifts with a single ambient shadow; a focused dialog earns one structural shadow. Nothing rests on a shadow.

### Shadow Vocabulary
- **Ambient Lift** (`box-shadow: 0 2px 12px oklch(20% 0.02 30 / 0.08)`): Hover state on map pins and firm cards. Diffuse, low-contrast.
- **Structural** (`box-shadow: 0 12px 48px oklch(20% 0.02 30 / 0.16)`): Dialog and command-palette only. Used at most once per screen.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadow is a response to state (hover, focus, dialog open), not a static decoration.

**The No Glass Rule.** No `backdrop-filter`, no glassmorphism, no translucent layered cards. If something needs to feel "above," it earns Card Tone, not blur.

## 5. Components

To be filled on the first scan pass once code exists. The seed defines posture only:

- **Buttons**: Rectangular with subtle 4px radius. Primary is Oxblood Accent on Warm Paper — used sparingly per The One Voice Rule. Secondary is Deep Ink outline on Paper. Ghost is Quiet Ink text only. No gradients, no shadows on rest.
- **Map pin**: A small typographic mark (mono label + dot), not a teardrop. Profile-fit pins carry a Deep Ink ring; default pins carry Hairline. Color is never the only signal.
- **Firm card**: Card Tone background, no border, no shadow. Hairline divider between fields. Headline (firm name), Label row (city · discipline · open roles count), one-line Body description.
- **Inputs**: 1px Hairline stroke on Paper, Deep Ink text, focus moves stroke to Deep Ink (not glow).
- **Auth buttons** (LinkedIn, Google, Email): Equal weight, stacked vertically, no provider-color flooding. Provider mark is a 16px inline SVG, never a full-color logo block.

## 6. Do's and Don'ts

### Do:
- **Do** use Warm Paper (`oklch(97% 0.008 60)`) as the page ground; never `#fff`, never `#000`.
- **Do** reserve Oxblood Accent for ≤10% of any rendered screen (The One Voice Rule).
- **Do** signal profile-fit with a typographic mark *and* a tonal halo, never color alone (accessibility).
- **Do** keep map geography tonal; let only data overlays carry saturation (The Tonal Map Rule).
- **Do** honor `prefers-reduced-motion` fully: disable pan/zoom transitions, keep only fades.
- **Do** keep body type ≥16px at every breakpoint (The 16px Floor Rule).
- **Do** stack auth options vertically with equal visual weight; never lead with one provider's brand color.

### Don't:
- **Don't** ship the generic SaaS dashboard look: purple gradients, hero-metric templates, identical card grids.
- **Don't** use recruiter-database CRUD density (Crunchbase walls, LinkedIn-row clutter).
- **Don't** use Zillow-style price-pin litter or sidebar tile cards repeated down a rail.
- **Don't** use full-bleed video heros, oversized cursors, or "we craft experiences" agency-template moves.
- **Don't** use `background-clip: text` with a gradient. Emphasis comes from weight or size.
- **Don't** use `border-left` greater than 1px as a colored stripe on cards, alerts, or list items.
- **Don't** use `backdrop-filter` blur as decoration. No glassmorphism.
- **Don't** animate CSS layout properties; transform/opacity only.
- **Don't** use ease-in-out or bounce curves; ease-out-quart / quint / expo only.
- **Don't** use em dashes in copy. Commas, colons, semicolons, periods, parentheses.
