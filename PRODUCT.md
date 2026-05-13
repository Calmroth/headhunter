# Product

## Register

product

Hybrid surface: a brand-flavored landing page leads into the product. Default register is `product` because the map app is the centerpiece. Landing-page tasks can override to `brand`.

## Users

Creative talent looking for their next role — designers, 3D artists, art directors, creative directors, motion designers, concept artists. They land on the map to discover which firms hire their discipline, where those firms are, and which open roles they can apply to right now.

Context of use: evenings and weekends, browser on laptop or phone, often comparing cities or planning a relocation. Mood is exploratory but goal-directed — they want to act, not just browse.

Three entry points:
1. **LinkedIn login** — pulls discipline, seniority, and location from the profile. The map highlights roles matching that profile while keeping every other firm and job visible (never hide, only de-emphasize).
2. **Google login** — same surface, no profile inference. User can set discipline/location filters manually.
3. **Email + password** — fallback for users who avoid social logins.

## Product Purpose

A geographic discovery surface for creative jobs. The author curates firms that hire creatives and have enterprise clients; the platform layers their currently-open roles onto the map. A signed-in user with a LinkedIn profile sees roles ranked against their fit, but can pan, filter, and apply to anything.

Success = a logged-in user clicks **Apply** on a posted job, or saves a firm to their shortlist. Secondary: returning visits (the map is worth coming back to as roles change).

## Brand Personality

Editorial, confident, calm. Three-word voice: considered, specific, useful. Tone reads like a well-edited industry guide, not a SaaS product page. No exclamation marks, no growth-hacker urgency.

## Anti-references

- Generic SaaS dashboards: purple gradients, hero-metric templates, identical card grids.
- Recruiter-database CRUD interfaces (Crunchbase/LinkedIn density walls).
- Zillow-style pin-littered maps with sidebar tile clutter.
- Agency-portfolio template look (full-bleed video hero, oversized cursor, "we craft experiences").

## Design Principles

1. **The map is the page.** Geography is the primary navigation. Lists are secondary views of the map, not parallel surfaces.
2. **Specificity over volume.** Every firm earns its place; no padding the data to look full.
3. **Quiet confidence.** Restrained palette, real typography, generous whitespace. The content carries the credibility.
4. **Discoverable signed-out, personalized signed-in.** The map is useful before login. LinkedIn login adds a profile-fit layer; it never gates content or hides options.
5. **Source-cited or not shown.** Every claim (client, contact, role, job listing) traces to a public source.

## Accessibility & Inclusion

- WCAG 2.2 AA target.
- Map must have a list-equivalent (keyboard-navigable, screen-reader friendly). Map-only would fail.
- Auth flows must be keyboard-navigable; OAuth redirect pages must not strand assistive tech.
- Respect `prefers-reduced-motion` — disable pan/zoom animation, fade transitions only.
- Color is never the only carrier of meaning (status, region, fit score, profile-match all need a non-color indicator).
- Body type ≥16px, line length 65–75ch, contrast ≥4.5:1 on text.
