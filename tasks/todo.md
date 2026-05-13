# Headhunter

## Bootstrap (done)
- [x] `.claude/agents/firm-finder.md`
- [x] `.claude/agents/contact-researcher.md`
- [x] `.claude/agents/contact-manager.md`
- [x] `AGENTS.md` + `CLAUDE.md` pointer
- [x] `PRODUCT.md` (strategic)
- [x] `DESIGN.md` (seed, "The Atlas Room")
- [x] `docs/brief-home.md` (confirmed)

## Craft: home surface

### Scaffold
- [x] `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`
- [x] `src/main.tsx`, `src/App.tsx`
- [x] `src/styles/tokens.css` (DESIGN.md tokens as CSS vars)
- [x] `src/styles/global.css` (reset, base type, scrollbar)
- [x] `npm install`

### Data
- [x] `src/data/taxonomy.ts` — disciplines + seniorities
- [x] `src/data/firms.ts` — ~30 hand-curated firms
- [x] `src/data/jobs.ts` — ~80 jobs across firms/regions
- [x] `src/data/profile.ts` — mock signed-in profile for prototype toggle

### Components
- [x] `TopBar` (wordmark + sign-in/profile)
- [x] `Globe` (react-globe.gl wrapper, auto-rotate, click-country)
- [x] `SearchBar` (cycling placeholder, autosuggest stub)
- [x] `JobsList` (region label + scrollable rows)
- [x] `JobRow` (3-line row + NEW mark)

### Hooks
- [x] `useReducedMotion`
- [x] `useRotatingPlaceholder` (crossfade through role examples)
- [x] `useSeenJobs` (localStorage persistence for NEW fade)
- [x] `useProfile` (mock signed-in/out toggle)

### Verification
- [x] `npm run build` passes
- [x] `npm run dev` renders globe + search + list
- [x] Keyboard nav works (Tab through rows, Enter opens)
- [x] `prefers-reduced-motion` honored (test in DevTools)
- [x] Mobile breakpoint <768px renders single-column

## Review

First pass shipped. `npm run build` passes clean, TypeScript types pass clean, dev server starts on port 5173.

**What's in the prototype**
- Vite + React + TypeScript scaffold, no UI framework dep
- DESIGN.md tokens as CSS custom properties; OKLCH everywhere except the WebGL globe (hex approximations)
- TopBar with wordmark + Sign-in/avatar toggle (mock auth — click "Sign in" to flip the prototype into signed-in state)
- Globe: react-globe.gl with country topojson from unpkg, auto-rotates at 0.35°/sec, pauses on hover, click-country to filter, fly-to camera animation, reduced-motion fully respected
- SearchBar: floats below globe's equator, cycles role examples every 2.6s with crossfade, profile-aware examples when signed in
- JobsList: right rail, mono region label, hairline divider rows, agent-found NEW marks (4px Oxblood dot at leading edge + subtle gradient tint + mono "NEW" label, fades on view via IntersectionObserver + localStorage)
- Mobile (<900px): single column, globe shrinks to 50vh, list flows below

**Known limitations**
- No real auth; "Sign in" toggles a mock profile inline
- Country code map covers ~17 countries (those with firms in mock data); clicking an unmapped country is ignored
- Bundle size warning (three.js heavy). Code-split later.
- Job-detail view is `console.info` placeholder

**Followups for browser iteration pass**
- Validate The One Voice Rule under load: 5 NEW marks at once is at ~10%; if it reads as too much, drop the gradient tint and keep dot+label only
- Globe contrast against Warm Paper might be too low — review at desktop wide and tune Land/Borderline if so
- Search-bar position (bottom: 12%) might overlap globe poles on tall viewports; check

## Iteration 5 — real borders + Cinode customer roster

- [x] Country polygons no longer draw their own stroke. Real borders now come solely from the CartoDB Positron tile basemap (which renders them accurately at every zoom). Polygons are now hit-test-only with a faint fill tint on focus/match. Bumped the polygon dataset to 10m for accurate clicks on small countries.
- [x] Fetched the full customer list from `cinode.com/en/customers-en/` via WebFetch. Added 49 new firms covering: Rejlers, Consid, HiQ, Vincit, Nexer (already had), Knowit (already had), itm8, Silo AI, Qestit, twoday, Nitor, Telia, Knightec, Fujitsu, Prevas, B3, Omegapoint, Softronic, Kvadrat, Nektab, Xlent, Time People Group, CAG, Co-native, H&M, Centigo, byBrick, Forefront, Human IT, Accigo, System Verification, TechSeed, Dynabyte, Influence, DDP, Precio Fishbone, Castra, Agreat, tretton37, Plantvision, TogetherTech, AddPro, M4, Digitalent, Advania, AQC, Softhouse, Sylog, Cygate, Conoa, Accelerate.
- [x] Stockholm-heavy concentration handled via small lat/lng jitter (±0.02°) per firm so markers don't pile on the same pixel.
- [x] 20 sample creative openings added across the Cinode roster (5 flagged `agentFound: true` to demo the NEW mark)
- [x] Firms total: 122 offices across 14 countries; jobs total: 107

## Iteration 4 — sharper borders + broader firm scope (earlier)

- [x] Countries dataset bumped 110m → 50m (~4× more border vertices, snug to real coastlines)
- [x] `firm-finder` agent prompt expanded to three bands: pure agencies (A), global enterprise consultancies with design practices (B), engineering/IT consultancies with creative teams (C). Named examples: Afry, Nexer, Knowit, Accenture Song, Deloitte Digital, IDEO, Designit, Frog, Capgemini Invent, etc. Output schema gains `band`, `parent`, `office_country_code`, `actively_hiring`, `office_city`.
- [x] Mock data expanded from 37 firms / 46 jobs → 73 firms / 87 jobs across 12 countries
- [x] Added country codes for IE (Ireland) and JP (Japan)
- [x] `tsc --noEmit` clean

## Iteration 3 — pivot to flat 2D map

Per user request: "make a flat 2d map like google maps" + "when clicking on a role or company show the location on map."

- [x] Dropped `react-globe.gl` + `three.js` (saved ~600KB bundle)
- [x] Added `leaflet` + `react-leaflet` (lighter, well-supported, free tiles)
- [x] New `MapView` component with CartoDB Positron tile layer, warm CSS filter to blend with paper aesthetic
- [x] Firm markers as `CircleMarker`s in Oxblood, radius scaled by open-role count, active firm gets Deep Ink ring
- [x] Country polygon overlay (transparent, hit-test only) preserves country click-to-filter
- [x] Marker tooltip shows firm name + city + role count on hover
- [x] Clicking a job row in the right list flies the map to that firm's coordinates at zoom 13 (and selects the firm)
- [x] Clicking a firm in the left list does the same
- [x] Bundle: 322KB raw / 98KB gzipped (was 2MB / 575KB on globe build)
- [x] `tsc --noEmit` clean, `npm run build` clean

## Iteration 2 (earlier)

Per user request:
- [x] Stronger borders: polygonAltitude 0.012 (was 0.005), darker BORDERLINE #7a6f66, mid-tone SIDE_WALL #a8a09a → countries now read as raised tiles on paper
- [x] Sign-in lock: rotation stops, camera flies to user's city (Stockholm, altitude 0.55), label shows "Sweden"
- [x] Country click: deeper zoom (altitude 0.9, was 1.4)
- [x] City labels on hover: react-globe.gl labelsData driven by hovered country; shows mono uppercase city names + dot for every city with a firm
- [x] Left rail FirmsList: consultancies filtered by focused country; resident city floats to top with "HOME" tag; click a firm to filter jobs to that firm (camera zooms to firm city, altitude 0.35)
- [x] Three-column layout: left rail | globe | right rail on ≥1200px; collapses thoughtfully at 1100px and 900px breakpoints
- [x] `npx tsc --noEmit` clean

