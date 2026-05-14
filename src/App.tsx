import { Suspense, lazy, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { playSplashIntro } from './utils/animations';
import { TopBar } from './components/TopBar';
import { LinkedInSignIn } from './components/LinkedInSignIn';
import { MapView, type MapTarget } from './components/MapView';
import { SearchBar } from './components/SearchBar';
import { JobsList } from './components/JobsList';
import { FirmsList } from './components/FirmsList';
const JobDetail = lazy(() => import('./components/JobDetail').then((m) => ({ default: m.JobDetail })));
const JobApply = lazy(() => import('./components/JobApply').then((m) => ({ default: m.JobApply })));
const ParticleField = lazy(() => import('./components/ParticleField').then((m) => ({ default: m.ParticleField })));
import { EMPTY_FILTERS, type FirmsFiltersState } from './components/FirmsFilters';
import { KbdLegend } from './components/KbdLegend';
import { Connectors } from './components/Connectors';
import { DISCIPLINE_INDUSTRY } from './data/taxonomy';
import { useProfile } from './hooks/useProfile';
import { useTheme } from './hooks/useTheme';
import { useSeenJobs } from './hooks/useSeenJobs';
import { JOBS, JOBS_LAST_UPDATED } from './data/jobs';
import { FIRMS, FIRMS_BY_ID } from './data/firms';
import './App.css';

const GENERIC_EXAMPLES = [
  'Senior 3D Artist',
  'Art Director',
  'Motion Designer',
  'Brand Strategist',
  'Concept Artist',
  'Creative Director',
  'Industrial Designer',
  'UI Designer',
  'Type Designer',
  'CG Generalist',
];

export function App() {
  const { profile, signIn, signOut } = useProfile();
  const { theme, toggle: toggleTheme } = useTheme();
  const { isSeen, markSeen } = useSeenJobs();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const requestSignIn = () => setAuthModalOpen(true);
  const handleAuthorized = () => {
    setAuthModalOpen(false);
    signIn();
  };

  const [query, setQuery] = useState('');
  const [focusedCountry, setFocusedCountry] = useState<{
    alpha2: string;
    label: string;
  } | null>(null);
  const [focusedFirmId, setFocusedFirmId] = useState<string | null>(null);
  // Narrows both rails to a single city. Set by clicking a city cluster on
  // the map or by clicking any firm dot (so the rails surface only that
  // city's firms / roles). Cleared by clearRegion, country clicks, country
  // filter changes, and ESC.
  const [focusedCity, setFocusedCity] = useState<{
    city: string;
    countryCode: string;
  } | null>(null);
  const [hoveredFirmId, setHoveredFirmId] = useState<string | null>(null);
  // Tracks which surface produced the current hover. Only firm-rail hovers
  // (and the focused/clicked firm) drive the Connectors overlay — job-row
  // hovers still pan the map and highlight the dot, but no longer draw
  // wiring back to the consultancy. The rule: lines flow consultancies →
  // roles only.
  const [hoverSource, setHoverSource] = useState<'firms' | 'jobs' | null>(null);
  const handleFirmRailHover = (id: string | null) => {
    setHoveredFirmId(id);
    setHoverSource(id ? 'firms' : null);
  };
  const handleJobRailHover = (id: string | null) => {
    setHoveredFirmId(id);
    setHoverSource(id ? 'jobs' : null);
  };
  const wiringFirmId =
    focusedFirmId ?? (hoverSource === 'firms' ? hoveredFirmId : null);
  const [mapTarget, setMapTarget] = useState<MapTarget | null>(null);
  const [openJobId, setOpenJobId] = useState<string | null>(null);
  const [view, setView] = useState<'detail' | 'apply'>('detail');
  const [filters, setFiltersState] = useState<FirmsFiltersState>(EMPTY_FILTERS);

  const [showOnboard, setShowOnboard] = useState<boolean>(() => {
    try {
      return !window.localStorage.getItem('hh.onboardDismissed');
    } catch {
      return true;
    }
  });
  const dismissOnboard = () => {
    try {
      window.localStorage.setItem('hh.onboardDismissed', '1');
    } catch {
      /* localStorage unavailable */
    }
    setShowOnboard(false);
  };

  /** When the filter's country changes, fly the map to that country at country zoom. */
  const setFilters = (next: FirmsFiltersState) => {
    const prevCountry = filters.countryCode;
    setFiltersState(next);

    if (next.countryCode !== prevCountry) {
      if (next.countryCode === 'all') {
        // Returning to "all countries" → full map zoom centered wherever we are.
        setFocusedCountry(null);
        setFocusedFirmId(null);
        setMapTarget({ kind: 'world', key: nextKey() });
        return;
      }
      // Compute a bounding box for the filtered country from its firms.
      const firmsInCountry = FIRMS.filter((f) => f.countryCode === next.countryCode);
      if (firmsInCountry.length === 0) return;
      let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
      let sumLat = 0, sumLng = 0;
      for (const f of firmsInCountry) {
        if (f.lat < minLat) minLat = f.lat;
        if (f.lat > maxLat) maxLat = f.lat;
        if (f.lng < minLng) minLng = f.lng;
        if (f.lng > maxLng) maxLng = f.lng;
        sumLat += f.lat;
        sumLng += f.lng;
      }
      // Pad the bbox so single-city countries still get a reasonable frame.
      const pad = 1.5;
      const sw: [number, number] = [minLat - pad, minLng - pad];
      const ne: [number, number] = [maxLat + pad, maxLng + pad];
      const centerLat = sumLat / firmsInCountry.length;
      const centerLng = sumLng / firmsInCountry.length;
      setFocusedCountry({
        alpha2: next.countryCode,
        label: firmsInCountry[0].country,
      });
      setFocusedFirmId(null);
      setMapTarget({
        kind: 'country',
        clickLat: centerLat,
        clickLng: centerLng,
        bboxSW: sw,
        bboxNE: ne,
        key: nextKey(),
      });
    }
  };
  const keyRef = useRef(1);
  const nextKey = () => ++keyRef.current;

  useEffect(() => {
    if (!profile) return;
    setFocusedCountry({ alpha2: profile.countryCode, label: profile.country });
    setMapTarget({ kind: 'region', lat: profile.lat, lng: profile.lng, key: nextKey() });
  }, [profile]);

  useEffect(() => {
    if (profile) return;
    setFocusedCountry(null);
    setFocusedFirmId(null);
    setMapTarget({ kind: 'world', key: nextKey() });
  }, [profile]);

  // Captured geolocation for unsigned visitors. Also feeds the ambient
  // "you are here" beacon set below — firms within ~30 km of this point
  // get a soft pulse so the user can see their local market at a glance.
  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(
    null
  );

  // On first load, leave the map at the default world view. We still ask the
  // browser for the user's coordinates so the ambient "you are here" beacon
  // can light up nearby firm dots, but we no longer pan to them — the
  // continent-wide view is the intended initial framing.
  useEffect(() => {
    if (profile) return;
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {
        /* user denied — no ambient beacons, world view stays */
      },
      { enableHighAccuracy: false, maximumAge: 10 * 60_000, timeout: 8000 }
    );
    // We only want this on mount for unsigned visitors. profile changes are
    // handled by the other effects above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const examples = useMemo(() => {
    if (!profile) return GENERIC_EXAMPLES;
    const senior = profile.seniorities[0] ?? 'Senior';
    return profile.disciplines.map((d) => `${senior} ${d}`);
  }, [profile]);

  const regionLabel = focusedCountry?.label ?? null;
  const regionAlpha2 = focusedCountry?.alpha2 ?? null;

  // Rail-hover preview: when the user mouses over a firm row or job row,
  // soft-pan the map to that firm's dot so it's easy to find. Debounced
  // so casual cursor traversal doesn't drag the map around. Map dot hover
  // does NOT trigger this — the map handlers no longer call onFirmHover.
  useEffect(() => {
    if (!hoveredFirmId) return;
    if (focusedFirmId === hoveredFirmId) return; // already centered
    const firm = FIRMS_BY_ID[hoveredFirmId];
    if (!firm) return;
    const t = window.setTimeout(() => {
      setMapTarget({
        kind: 'preview',
        lat: firm.lat,
        lng: firm.lng,
        key: nextKey(),
      });
    }, 220);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredFirmId, focusedFirmId]);

  // Keyboard help legend visibility.
  const [helpOpen, setHelpOpen] = useState(false);

  // First-paint splash orchestration. useLayoutEffect (not useEffect) so the
  // timeline starts before the browser commits the first paint of the home
  // view — keeps the splash-pending CSS pre-hide from flashing visible.
  // Idempotent inside playSplashIntro(); ignores the openJob render branch
  // because that branch returns early and never reaches this hook anyway.
  useLayoutEffect(() => {
    playSplashIntro();
  }, []);

  // Global keyboard accelerators. Skips keys when focus is in an input/textarea.
  useEffect(() => {
    const isTyping = () => {
      const el = document.activeElement as HTMLElement | null;
      if (!el) return false;
      const tag = el.tagName;
      return (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        el.isContentEditable
      );
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === '/') {
        if (isTyping()) return;
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('hh:focus-search'));
      } else if (e.key === '?') {
        if (isTyping()) return;
        e.preventDefault();
        setHelpOpen((v) => !v);
      } else if (e.key === 'Escape') {
        // ESC clears the focused region (in addition to whatever the focused
        // element already handles via its own listener).
        if (focusedCountry || focusedFirmId || focusedCity) {
          if (isTyping()) return;
          setFocusedCountry(null);
          setFocusedFirmId(null);
          setFocusedCity(null);
          if (profile) {
            setMapTarget({
              kind: 'region',
              lat: profile.lat,
              lng: profile.lng,
              key: nextKey(),
            });
          } else {
            setMapTarget({ kind: 'world', key: nextKey() });
          }
        }
        setHelpOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedCountry, focusedFirmId, profile?.lat, profile?.lng]);

  const matchingCountryIds = useMemo(() => {
    if (!profile) return new Set<string>();
    const set = new Set<string>();
    for (const job of JOBS) {
      if (!profile.disciplines.includes(job.discipline)) continue;
      const firm = FIRMS_BY_ID[job.firmId];
      if (firm) set.add(firm.countryCode);
    }
    return set;
  }, [profile]);

  /** Firms that have at least one job matching the user's disciplines. */
  const matchingFirmIds = useMemo(() => {
    if (!profile) return new Set<string>();
    const set = new Set<string>();
    for (const job of JOBS) {
      if (profile.disciplines.includes(job.discipline)) set.add(job.firmId);
    }
    return set;
  }, [profile]);

  /** Jobs matching the user's disciplines. */
  const matchingJobIds = useMemo(() => {
    if (!profile) return new Set<string>();
    const set = new Set<string>();
    for (const job of JOBS) {
      if (profile.disciplines.includes(job.discipline)) set.add(job.id);
    }
    return set;
  }, [profile]);

  /**
   * The user's home country + city — derived from the profile when signed
   * in, or from geolocation otherwise. Drives the FirmsList sort order
   * (home country / city floats to the top) and the ambient beacon set.
   * When neither source is available these stay null and the list sorts
   * by country alphabetical without a home group.
   */
  const homeContext = useMemo<{ countryCode: string | null; city: string | null }>(() => {
    if (profile?.city && profile?.countryCode) {
      return { countryCode: profile.countryCode, city: profile.city };
    }
    if (userLoc) {
      // Find the nearest indexed firm and use its country + city as the home
      // proxy. Approximate enough: firm data is city-level, so the nearest
      // firm's city is the user's effective city anyway.
      let nearest: { firm: typeof FIRMS[number]; d2: number } | null = null;
      for (const f of FIRMS) {
        const dLat = f.lat - userLoc.lat;
        const dLng = f.lng - userLoc.lng;
        const d2 = dLat * dLat + dLng * dLng;
        if (!nearest || d2 < nearest.d2) nearest = { firm: f, d2 };
      }
      if (nearest) {
        return { countryCode: nearest.firm.countryCode, city: nearest.firm.city };
      }
    }
    return { countryCode: null, city: null };
  }, [profile?.city, profile?.countryCode, userLoc]);

  /**
   * Firms in the user's home city — used to drive the ambient beacon on the
   * map. Signed-in users: match on profile.city (string). Unsigned users
   * with geolocation: anything within ~30 km of their coords (degree box,
   * good enough — we're picking visual emphasis, not running a search).
   */
  const homeFirmIds = useMemo<ReadonlySet<string>>(() => {
    if (profile?.city) {
      const target = profile.city.toLowerCase();
      const set = new Set<string>();
      for (const f of FIRMS) {
        if (f.city.toLowerCase() === target) set.add(f.id);
      }
      return set;
    }
    if (userLoc) {
      const { lat, lng } = userLoc;
      // ~30 km box. 1° lat ≈ 111 km; longitude shrinks with cos(lat). We use
      // a generous degree window rather than haversine because the data
      // resolution is city-level anyway.
      const dLat = 0.27; // ~30 km north/south
      const cosLat = Math.cos((lat * Math.PI) / 180) || 1;
      const dLng = 0.27 / Math.max(0.1, cosLat); // east/west scaled by lat
      const set = new Set<string>();
      for (const f of FIRMS) {
        if (Math.abs(f.lat - lat) > dLat) continue;
        if (Math.abs(f.lng - lng) > dLng) continue;
        set.add(f.id);
      }
      return set;
    }
    return new Set<string>();
  }, [profile?.city, userLoc]);

  /** Firms whose city contains ≥2 firms — used to decide whether to zoom past country. */
  const clusteredFirmIds = useMemo(() => {
    const cityCount = new Map<string, number>();
    for (const f of FIRMS) {
      const key = `${f.countryCode}|${f.city}`;
      cityCount.set(key, (cityCount.get(key) ?? 0) + 1);
    }
    const set = new Set<string>();
    for (const f of FIRMS) {
      const key = `${f.countryCode}|${f.city}`;
      if ((cityCount.get(key) ?? 0) > 1) set.add(f.id);
    }
    return set;
  }, []);

  /** Pre-compute per-firm role discipline/seniority/industry sets to drive filters. */
  const firmFacets = useMemo(() => {
    const facets = new Map<
      string,
      { disciplines: Set<string>; seniorities: Set<string>; industries: Set<string>; roleCount: number }
    >();
    for (const j of JOBS) {
      let f = facets.get(j.firmId);
      if (!f) {
        f = {
          disciplines: new Set(),
          seniorities: new Set(),
          industries: new Set(),
          roleCount: 0,
        };
        facets.set(j.firmId, f);
      }
      f.disciplines.add(j.discipline);
      f.seniorities.add(j.seniority);
      f.industries.add(DISCIPLINE_INDUSTRY[j.discipline]);
      f.roleCount += 1;
    }
    return facets;
  }, []);

  /** Set of firm IDs that pass the active filters. Used by FirmsList, JobsList, and the map. */
  const filteredFirmIds = useMemo(() => {
    const set = new Set<string>();
    const hasIndustry = filters.industries.size > 0;
    const hasDiscipline = filters.disciplines.size > 0;
    const hasSeniority = filters.seniorities.size > 0;
    for (const firm of FIRMS) {
      if (filters.countryCode !== 'all' && firm.countryCode !== filters.countryCode) continue;
      const facets = firmFacets.get(firm.id);
      if (filters.hasOpenRoles && (!facets || facets.roleCount === 0)) continue;
      if (hasIndustry) {
        let hit = false;
        if (facets) {
          for (const i of filters.industries) if (facets.industries.has(i)) { hit = true; break; }
        }
        if (!hit) continue;
      }
      if (hasDiscipline) {
        let hit = false;
        if (facets) {
          for (const d of filters.disciplines) if (facets.disciplines.has(d)) { hit = true; break; }
        }
        if (!hit) continue;
      }
      if (hasSeniority) {
        let hit = false;
        if (facets) {
          for (const s of filters.seniorities) if (facets.seniorities.has(s)) { hit = true; break; }
        }
        if (!hit) continue;
      }
      set.add(firm.id);
    }
    return set;
  }, [filters, firmFacets]);

  /** Jobs visible under the active filters (firm passes + role-level filters match). */
  const filteredJobIds = useMemo(() => {
    const set = new Set<string>();
    const hasDiscipline = filters.disciplines.size > 0;
    const hasSeniority = filters.seniorities.size > 0;
    const hasIndustry = filters.industries.size > 0;
    for (const j of JOBS) {
      if (!filteredFirmIds.has(j.firmId)) continue;
      if (hasDiscipline && !filters.disciplines.has(j.discipline)) continue;
      if (hasSeniority && !filters.seniorities.has(j.seniority)) continue;
      if (hasIndustry && !filters.industries.has(DISCIPLINE_INDUSTRY[j.discipline])) continue;
      set.add(j.id);
    }
    return set;
  }, [filters, filteredFirmIds]);

  /**
   * Country/region polygon click. MapView decides the camera move:
   * - From world view: fit the country to the viewport.
   * - From country-fit zoom: fly to the click point at region (kommun) zoom.
   * - From region zoom or deeper: pan only.
   */
  const handleCountryClick = (
    alpha2: string,
    name: string,
    lat: number,
    lng: number,
    bboxSW: [number, number],
    bboxNE: [number, number]
  ) => {
    setFocusedCountry({ alpha2, label: name });
    setFocusedFirmId(null);
    setFocusedCity(null);
    // Frame to where the firms ACTUALLY sit, not the country's geographic
    // bbox. Russia → Moscow; Sweden → Stockholm + Gothenburg corridor; etc.
    // Falls back to the polygon bbox when the country has no firms (the
    // click handler is gated on COUNTRIES_WITH_FIRMS, so this is just a
    // safety net).
    const firmsInCountry = FIRMS.filter((f) => f.countryCode === alpha2);
    let sw: [number, number] = bboxSW;
    let ne: [number, number] = bboxNE;
    if (firmsInCountry.length > 0) {
      let minLat = Infinity, minLng = Infinity;
      let maxLat = -Infinity, maxLng = -Infinity;
      for (const f of firmsInCountry) {
        if (f.lat < minLat) minLat = f.lat;
        if (f.lat > maxLat) maxLat = f.lat;
        if (f.lng < minLng) minLng = f.lng;
        if (f.lng > maxLng) maxLng = f.lng;
      }
      // Single-firm countries (or every firm in the same city) collapse to a
      // point — pad so flyToBounds has something to fit.
      const PAD = 0.6; // degrees
      if (maxLat - minLat < PAD) {
        const mid = (minLat + maxLat) / 2;
        minLat = mid - PAD / 2;
        maxLat = mid + PAD / 2;
      }
      if (maxLng - minLng < PAD) {
        const mid = (minLng + maxLng) / 2;
        minLng = mid - PAD / 2;
        maxLng = mid + PAD / 2;
      }
      sw = [minLat, minLng];
      ne = [maxLat, maxLng];
    }
    setMapTarget({
      kind: 'country',
      clickLat: lat,
      clickLng: lng,
      bboxSW: sw,
      bboxNE: ne,
      key: nextKey(),
    });
  };

  const clearRegion = () => {
    setFocusedCountry(null);
    setFocusedFirmId(null);
    setFocusedCity(null);
    if (profile) {
      setMapTarget({ kind: 'region', lat: profile.lat, lng: profile.lng, key: nextKey() });
    } else {
      setMapTarget({ kind: 'world', key: nextKey() });
    }
  };

  /** Firm click — pans to firm AND narrows both rails to the firm's city.
   *  Stays at country zoom unless the firm is part of a same-city cluster,
   *  in which case we zoom in to kommun so the stacked dots separate visually.
   *  When the click came from a map dot, anchorPoint carries the click's
   *  container-pixel position; FlyToTarget uses it to offset the camera so
   *  the dot lands under the cursor instead of recentering the viewport. */
  const handleSelectFirm = (
    id: string | null,
    anchorPoint?: { x: number; y: number }
  ) => {
    setFocusedFirmId(id);
    if (!id) {
      // Deselecting a firm also clears the city focus, so the rails return
      // to country-or-wider scope without an orphaned city filter.
      setFocusedCity(null);
      return;
    }
    const firm = FIRMS_BY_ID[id];
    if (!firm) return;
    setFocusedCity({ city: firm.city, countryCode: firm.countryCode });
    setMapTarget({
      kind: 'firm',
      lat: firm.lat,
      lng: firm.lng,
      firmId: id,
      isCluster: clusteredFirmIds.has(id),
      anchorPoint,
      key: nextKey(),
    });
  };

  /** Cluster click — narrows both rails to that city without focusing a
   *  specific firm. The MapView's onAreaClick still handles the camera move. */
  const handleSelectCity = (city: string, countryCode: string) => {
    setFocusedFirmId(null);
    setFocusedCity({ city, countryCode });
  };

  const handleOpenJob = (jobId: string) => {
    const job = JOBS.find((j) => j.id === jobId);
    if (!job) return;
    // Open the JobDetail overlay WITHOUT touching map state. The map stays
    // mounted underneath (see render below) and returning via Back lands
    // the user on the exact same view they had — same zoom, same center,
    // same focused firm. Previously this also did setFocusedFirmId +
    // setMapTarget, which re-flew the map; combined with the map being
    // unmounted while JobDetail rendered, returning landed at COUNTRY_ZOOM
    // even if the user had been at CITY_ZOOM.
    setOpenJobId(jobId);
    setView('detail');
  };

  const openJob = openJobId ? JOBS.find((j) => j.id === openJobId) ?? null : null;

  return (
    <div className="app">
      <div className="app-particles" aria-hidden="true">
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </div>
      <KbdLegend open={helpOpen} onClose={() => setHelpOpen(false)} />
      <Connectors firmId={wiringFirmId} />
      <TopBar profile={profile} onRequestSignIn={requestSignIn} onSignOut={signOut} theme={theme} onToggleTheme={toggleTheme} />

      <div className="stage">
        <FirmsList
          focusedCountryCode={regionAlpha2 ?? profile?.countryCode ?? null}
          focusedCity={focusedCity}
          homeCountryCode={homeContext.countryCode}
          residentCity={homeContext.city ?? undefined}
          focusedFirmId={focusedFirmId}
          hoveredFirmId={hoveredFirmId}
          matchingFirmIds={matchingFirmIds}
          hasProfile={!!profile}
          filters={filters}
          onFiltersChange={setFilters}
          filteredFirmIds={filteredFirmIds}
          onHoverFirm={handleFirmRailHover}
          onSelectFirm={handleSelectFirm}
        />

        <section className="center-stage" aria-label="Map of consultancies and roles">
          <MapView
            focusedFirmId={focusedFirmId}
            focusedCountryCode={regionAlpha2}
            matchingCountryIds={matchingCountryIds}
            matchingFirmIds={matchingFirmIds}
            homeFirmIds={homeFirmIds}
            hasProfile={!!profile}
            target={mapTarget}
            hoveredFirmId={hoveredFirmId}
            onFirmHover={setHoveredFirmId}
            onFirmClick={handleSelectFirm}
            onCityClick={handleSelectCity}
            onCountryClick={handleCountryClick}
            onReturnToGlobe={() => {
              // No globe anymore — third dblclick out just resets to world view.
              setFocusedCountry(null);
              setFocusedFirmId(null);
              setFocusedCity(null);
              setMapTarget({ kind: 'world', key: nextKey() });
            }}
          />

          <SearchBar
            examples={examples}
            value={query}
            onChange={setQuery}
            onSubmit={() => {
              /* prototype: list filters live as user types. */
            }}
          />
        </section>

        <JobsList
          query={query}
          focusedCountryCode={regionAlpha2}
          focusedFirmId={focusedFirmId}
          focusedCity={focusedCity}
          hoveredFirmId={hoveredFirmId}
          focusedRegionLabel={regionLabel}
          profileDisciplines={profile?.disciplines}
          matchingJobIds={matchingJobIds}
          filteredJobIds={filteredJobIds}
          hasProfile={!!profile}
          filtersActive={
            filters.countryCode !== 'all' ||
            filters.industries.size > 0 ||
            filters.disciplines.size > 0 ||
            filters.seniorities.size > 0 ||
            filters.hasOpenRoles
          }
          showOnboard={!profile && showOnboard}
          onDismissOnboard={dismissOnboard}
          onSignIn={requestSignIn}
          isSeen={isSeen}
          markSeen={markSeen}
          onOpenJob={handleOpenJob}
          onClearRegion={clearRegion}
          onClearFirm={() => setFocusedFirmId(null)}
          onHoverFirm={handleJobRailHover}
        />
      </div>

      <footer className="app-footer">
        <span className="app-footer-byline">
          <span className="app-footer-name">Christian Almroth</span>
          <span className="app-footer-sep">·</span>
          <a
            className="app-footer-link"
            href="https://idfuel.se"
            target="_blank"
            rel="noreferrer"
          >
            IDfuel AB
          </a>
        </span>
        <span className="app-footer-meta">
          Listings updated{' '}
          <time dateTime={JOBS_LAST_UPDATED}>
            {new Date(JOBS_LAST_UPDATED).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
          {' · '}
          {JOBS.length} {JOBS.length === 1 ? 'role' : 'roles'} live
        </span>
      </footer>
      <LinkedInSignIn
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthorized={handleAuthorized}
      />

      {openJob && (
        // Overlay on top of the still-mounted map shell. Back closes the
        // overlay and the user lands on exactly the same map view they had
        // when they clicked into the role — no re-mount, no re-fly.
        <div className="job-overlay">
          <Suspense
            fallback={
              <div className="lazy-skeleton" aria-hidden="true">
                <div className="lazy-skeleton-shimmer" />
              </div>
            }
          >
            {view === 'apply' ? (
              <JobApply
                job={openJob}
                applicantName={profile?.name}
                onBack={() => setView('detail')}
              />
            ) : (
              <JobDetail
                job={openJob}
                onBack={() => {
                  setOpenJobId(null);
                  setView('detail');
                }}
                onApply={() => setView('apply')}
              />
            )}
          </Suspense>
        </div>
      )}
    </div>
  );
}
