# Design Brief: Home Surface

The main app surface: interactive earth + role-search bar + region jobs list. Single page.

## 1. Feature Summary

A quiet, editorial homepage centered on an interactive globe. A search bar — prefilled with role examples that animate through the user's matching disciplines — sits at the visual center. A jobs list on the right shows open roles in the user's region (or globally when signed-out). Jobs newly surfaced by background agents are visually marked. The page is the product.

## 2. Primary User Action

Find a job to apply to. Concretely: the user clicks a job row in the right-hand list (or types a different role into the search bar, or clicks a country on the globe to filter geography). Apply is the success event.

## 3. Design Direction

- **Color strategy:** Restrained (default from DESIGN.md). Warm Paper ground, Deep Ink type, Oxblood Accent ≤10% — reserved for primary CTA, new-job mark, and the user's profile-fit halo on the globe.
- **Scene sentence:** *A creative on a weeknight at home, laptop on the kitchen table under a single warm lamp, half-decided about moving cities, browsing slowly with a coffee.* Forces light theme, warm paper, low chroma.
- **Anchor references:** Are.na (library-quiet, content-first), Read.cv (editorial profiles, generous space), Stripe Press (typographic confidence, restrained accent). Map texture nods to Mapbox Studio's *Monochrome* style — tonal, not colorful.
- **Image probes:** Skipped (no native image generation in this harness).

## 4. Scope

- **Fidelity:** High-fi, production-quality visuals.
- **Breadth:** Single screen (home). Auth flow, job-detail page, account page out of scope for this build.
- **Interactivity:** Interactive prototype — globe rotates and accepts clicks, search bar cycles, list scrolls, hover/focus states work. Wired to mock data.
- **Time intent:** Polished enough to validate the centerpiece. Real backend integration follows after this is approved.

## 5. Layout Strategy

Three zones, no chrome:

1. **Center stage (≈60% width on desktop):** The earth, centered both axes. Slowly auto-rotates at rest, pauses on hover. Below the equator of the globe, the search bar floats — same horizontal center as the earth, narrower than the globe's diameter. The search bar visually grounds the globe; the globe visually crowns the search bar.
2. **Right rail (≈30% width, anchored right):** Jobs list. Section label in mono ("STOCKHOLM · 14 ROLES" or "WORLDWIDE · 240 ROLES" signed-out). Rows below. Scrolls independently of the globe.
3. **Top bar (minimal):** Wordmark left, sign-in/account right. No nav, no logo wall, no breadcrumb.

The remaining ≈10% is breathing room — wide gutters left of the globe and between zones. Rhythm: globe is heroic, search is the moment, list is the quiet rail.

## 6. Key States

| State | What the user sees and feels |
|---|---|
| **Signed-out, first load** | Globe auto-rotating, search placeholder cycles a curated generic list ("Senior 3D Artist · Art Director · Motion Designer · Brand Strategist · …"). Right list shows "WORLDWIDE · N ROLES" with recent/featured jobs. Top-right: "Sign in" button. |
| **Signed-in (LinkedIn)** | Globe tilts slightly toward user's region on first load (one transition, then resumes rotation). Search placeholder cycles the user's matching disciplines and seniority ("Senior Art Director · Lead 3D Artist · …"). Right list shows "[USER CITY] · N ROLES" filtered to their region. Account avatar replaces "Sign in." |
| **Signed-in (Google/email, no profile)** | Same as signed-out search behavior. Right list defaults to user's region if they've set one in their profile; otherwise WORLDWIDE. Empty profile prompts inline once. |
| **Region focused** (user clicks a country) | Globe zooms gently to that region (≤600ms ease-out-quart). Right list label updates to that country/city. Globe auto-rotation pauses. A small "Clear region" mono link appears next to the label. |
| **Empty region** | List shows: "No open roles here yet. We'll let you know when one appears." Mono label, Hairline divider. No illustration, no SaaS-empty-state cartoon. |
| **New jobs surfaced this session** | Affected rows carry a 4px Oxblood dot at the leading edge + mono "NEW" label. After the row has been scrolled past or clicked, the mark fades on next render (next session). At most a handful of NEW marks visible at once to honor The One Voice Rule. |
| **Loading** | Globe renders progressively (low-poly first, refines). Search bar visible immediately with static placeholder ("Search roles…"). List shows 5 skeleton rows in Hairline tone, no shimmer animation. |
| **Error (list fetch fails)** | "Couldn't load jobs. Retry." Mono label, single text link. No red banner, no toast. Globe still works. |
| **Reduced-motion preference** | Globe is static (no auto-rotation). Search placeholder cycles through fades only, no slide animation. Country click transitions: opacity only, no camera move. |
| **Mobile (≤768px)** | Single column: small globe (40vh, draggable) above, search bar below the globe, jobs list below the search. Right rail collapses to full-width list. Top bar unchanged. |

## 7. Interaction Model

**Globe**
- At rest: auto-rotates at ~3°/sec on Y-axis. Pauses when cursor is over the canvas or the search/list is focused.
- Drag: rotates manually. Inertia decays with ease-out-quart.
- Hover country: country outline brightens to Deep Ink, mono label appears near cursor showing "[COUNTRY] · N roles."
- Click country: gentle camera tilt + zoom (≤600ms), list filters, "Clear region" link appears.
- `prefers-reduced-motion: reduce`: no auto-rotation, no zoom; click still filters.

**Search bar**
- Empty state: placeholder cycles role examples every ~2.6s. Crossfade (200ms in, 200ms out), no slide.
- Focus: cycle pauses on the current example. The example does not get inserted into the value — it stays a placeholder. Cursor sits at position 0.
- Type: standard input. Below the bar, a 5-row autosuggest dropdown appears with matching role titles (mono label · serif title · sans firm count). Keyboard navigable.
- Submit (Enter or suggest-click): list filters to matching roles. Globe pins the regions where matches exist (small Deep Ink dots, no glow).
- Clear (Esc or × button): returns to the cycling placeholder, list returns to region default.

**Jobs list**
- Click a row: opens the job detail view (out of scope for this build — placeholder route for now).
- Hover row: Card Tone background fade-in (120ms, no movement). Hairline divider above and below the row strengthen.
- Scroll: independent of globe. List has its own scrollbar (custom, Hairline thumb).
- Keyboard: Tab walks rows, Enter opens, ↑↓ also walks.

**Globe ↔ list synchronization**
- Filtering one updates the other. Search filter narrows the list AND highlights regions on the globe. Country click filters the list AND zooms the globe.
- "Clear region" returns to the resting state (auto-rotation + region default list).

## 8. Content Requirements

- **Wordmark:** "Headhunter" — serif, Display weight 400, 22px in the top bar.
- **Search placeholder examples (signed-out, curated):** "Senior 3D Artist · Art Director · Motion Designer · Brand Strategist · Concept Artist · Creative Director · Industrial Designer · UI Designer · Type Designer · CG Generalist." (10-item cycle. Real list pulled from PRODUCT.md user disciplines.)
- **Search placeholder examples (signed-in):** Top 6-10 role titles matching the user's profile, ordered by recency of similar roles posted.
- **Search input label (sr-only):** "Search creative roles."
- **List label format (mono):** `"[REGION] · [N] ROLES"`. Worldwide variant: `"WORLDWIDE · [N] ROLES"`.
- **Row format:**
  - Line 1 (Headline, serif, 400): Job title — e.g., "Senior 3D Artist"
  - Line 2 (Title, sans, 500): Firm name — e.g., "North Kingdom"
  - Line 3 (Label, mono, uppercase): `"STOCKHOLM · 3D · 2D AGO"` — city · discipline shorthand · posted-when
- **NEW mark:** 4px Oxblood dot at the row's leading edge (NOT a stripe). Mono "NEW" label after the timestamp: `"STOCKHOLM · 3D · 2H AGO · NEW"`.
- **Empty state copy:** "No open roles here yet. We'll let you know when one appears."
- **Error copy:** "Couldn't load jobs. Retry."
- **Sign-in button:** "Sign in" (no "Get started", no "Join now").
- **Account state copy:** Avatar circle, 28px, falls back to user initials in mono if no LinkedIn image.

Realistic ranges: 0 to ~50 jobs per region; ~240 worldwide signed-out. Single role title length: up to ~45 characters; firm name up to ~30. Row never wraps title to more than 2 lines; truncate firm + city label with ellipsis if needed.

## 9. Recommended References

When implementing, lean on:
- `motion-design.md` — for the search-bar cycle and globe rotation behavior; ease curves and reduced-motion fallbacks.
- `interaction-design.md` — for search/autosuggest/keyboard model.
- `spatial-design.md` — for the three-zone composition and breathing-room rhythm.
- `responsive-design.md` — for the mobile fallback (single-column, 40vh globe).
- `typography.md` and `color-and-contrast.md` — to apply DESIGN.md tokens correctly.

## 10. Open Questions

1. **Globe library:** Three.js + custom shader, react-globe.gl, or Mapbox GL JS with a globe projection? Performance vs. fidelity tradeoff. Recommend starting with `react-globe.gl` for fastest path to mid-fi, swap to custom Three.js if the editorial monochrome look isn't reachable.
2. **Mock data source:** Hand-curate ~40 firms and ~120 jobs in JSON to make the prototype feel real, or generate synthetic data? Recommend hand-curating from existing `data/firms.json` once firm-finder has populated it.
3. **"Region" definition for signed-in users:** City-level (Stockholm) or country-level (Sweden)? Recommend country-level for the default, with a "Within 100km of [city]" toggle later.
4. **Authoritative role taxonomy:** Where does the canonical list of disciplines + seniorities live? Recommend a small `data/taxonomy.json` that the search cycle, profile-matching, and pin clustering all read from.
5. **NEW persistence:** Is "seen" tracked client-side (localStorage) or server-side (per user)? Server-side scales with multi-device; client-side ships faster. Decide before craft.

---

*Brief awaiting confirmation. Once confirmed, hand to `/impeccable craft home` or implement directly.*
