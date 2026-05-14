import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  GeoJSON,
  Pane,
  Popup,
  Tooltip,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import { feature } from 'topojson-client';
import type { Topology, GeometryObject } from 'topojson-specification';
import type { Feature, FeatureCollection } from 'geojson';
import { FIRMS, FIRMS_BY_ID, type Firm } from '../data/firms';

/** Countries we have firms in. Polygon clicks outside this set are inert. */
const COUNTRIES_WITH_FIRMS = new Set(FIRMS.map((f) => f.countryCode));
import { JOBS } from '../data/jobs';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { NUMERIC_TO_ALPHA2 } from '../data/countryCodeMap';
import { monogram } from '../utils/monogram';
import { FirmPopup } from './FirmPopup';
import { animatePopupIn, closePopupWithFade, pulseClick, pulseHover, startBeacon } from '../utils/animations';
import './MapView.css';

const COUNTRIES_URL = 'https://unpkg.com/world-atlas@2/countries-10m.json';

// Esri World Light Gray Canvas — free, English-only labels, minimal style.
const TILE_BASE_URL =
  'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';
const TILE_LABELS_URL =
  'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}';
const TILE_ATTR =
  'Tiles &copy; <a href="https://www.esri.com">Esri</a> &mdash; Esri, DeLorme, NAVTEQ';

const OXBLOOD = '#b8482e';
const PAPER = '#f8f4ec';
const FIT_GREEN = '#3a8c54';
const DIM_INK = '#9a948d';
// Warm-paper-adjacent tones used for country highlighting. Hover "lifts" a
// country onto card paper instead of washing it with ink (see DESIGN.md §4).
const CARD_TONE = '#f3eee5'; // oklch(95% 0.008 60), one step above warm-paper
const BORDERLINE = '#c8c0b9'; // oklch(80% 0.01 30), thin country edge

// Four-stage stepwise zoom, calibrated for the Europe-focused world view.
// "World" here means "the whole map at rest" — which is Europe, not the planet.
const WORLD_ZOOM = 4;
const REGION_ZOOM = 6;
const COUNTRY_ZOOM = 9;
const CITY_ZOOM = 12;
const ZOOM_STEPS = [WORLD_ZOOM, REGION_ZOOM, COUNTRY_ZOOM, CITY_ZOOM] as const;
// Dblclick collapses the four-step wheel-zoom ladder to a three-step zoom-out
// ladder (city → country → world). REGION_ZOOM is intentionally skipped so
// two dblclicks max take the user from deepest zoom to world view:
//   - From CITY_ZOOM (12): dblclick → COUNTRY_ZOOM. Cities cluster, geography reads.
//   - From COUNTRY_ZOOM (9) or shallower: dblclick → WORLD_ZOOM.
const DBLCLICK_OUT_STEPS = [WORLD_ZOOM, COUNTRY_ZOOM, CITY_ZOOM] as const;

// Europe bounding box, used as the initial view and the soft pan boundary.
// SW = south of Spain / Crete; NE = top of Norway / east of Moscow.
const EUROPE_BOUNDS: L.LatLngBoundsLiteral = [
  [34, -25],
  [72, 45],
];
const EUROPE_MAX_BOUNDS: L.LatLngBoundsLiteral = [
  [20, -45],
  [80, 65],
];

export type MapTarget =
  | { kind: 'world'; key: number }
  | { kind: 'world-at'; lat: number; lng: number; key: number }
  | {
      kind: 'country';
      clickLat: number;
      clickLng: number;
      bboxSW: [number, number];
      bboxNE: [number, number];
      key: number;
    }
  | { kind: 'region'; lat: number; lng: number; key: number }
  | {
      kind: 'firm';
      lat: number;
      lng: number;
      firmId: string;
      /** When true, zoom past country level to kommun so clustered dots separate. */
      isCluster?: boolean;
      key: number;
    }
  /** Soft pan to a firm's coords without changing zoom. Used for rail-hover
      preview so the user can find the dot without disrupting the current view. */
  | { kind: 'preview'; lat: number; lng: number; key: number };

type Props = {
  focusedFirmId: string | null;
  focusedCountryCode: string | null; // alpha-2
  matchingCountryIds?: Set<string>; // alpha-2
  matchingFirmIds?: ReadonlySet<string>;
  /** Firms in the user's home city. Get an ambient beacon to mark "you are here". */
  homeFirmIds?: ReadonlySet<string>;
  hasProfile?: boolean;
  target: MapTarget | null;
  hoveredFirmId: string | null;
  onFirmHover: (id: string | null) => void;
  onFirmClick: (id: string) => void;
  /** Fired when the user clicks a city cluster on the map. Drives the
   *  rails' city-level filter so both columns show only that city. */
  onCityClick?: (city: string, countryCode: string) => void;
  onCountryClick: (
    alpha2: string,
    name: string,
    lat: number,
    lng: number,
    bboxSW: [number, number],
    bboxNE: [number, number]
  ) => void;
  /** Called when user reaches the outermost step (globe) via double-click out. */
  onReturnToGlobe?: () => void;
};

type CountryFeature = Feature & { id: string; properties: { name: string } };

const initialCenter: [number, number] = [54, 10]; // central Europe
const initialZoom = WORLD_ZOOM;

export function MapView({
  focusedFirmId,
  focusedCountryCode,
  matchingCountryIds,
  matchingFirmIds,
  homeFirmIds,
  hasProfile,
  target,
  hoveredFirmId,
  onFirmHover,
  onFirmClick,
  onCityClick,
  onCountryClick,
  onReturnToGlobe,
}: Props) {
  const [countries, setCountries] = useState<CountryFeature[]>([]);

  // Theme awareness — country fills are tuned for the warm-paper light base;
  // on a dark base they read as a bright wash. We branch on theme below to
  // suppress the focused-country fill in dark mode (the stroke already
  // carries the affordance clearly against dark tiles).
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    typeof document !== 'undefined' &&
    document.documentElement.dataset.theme === 'dark'
      ? 'dark'
      : 'light'
  );
  useEffect(() => {
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<'light' | 'dark'>).detail;
      if (detail === 'light' || detail === 'dark') setTheme(detail);
    };
    window.addEventListener('themechange', onChange as EventListener);
    return () => window.removeEventListener('themechange', onChange as EventListener);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(COUNTRIES_URL)
      .then((r) => r.json() as Promise<Topology>)
      .then((topo) => {
        if (cancelled) return;
        const obj = topo.objects.countries as GeometryObject;
        const geo = feature(topo, obj) as FeatureCollection;
        // Render only countries with firms. Skipping the rest fixes the
        // antimeridian-wrap problem at the data layer: Russia, Antarctica,
        // Fiji, etc. simply don't get drawn, so no polygon ring can stretch
        // a band across the map.
        const features = (geo.features as CountryFeature[]).filter((f) => {
          const alpha2 = NUMERIC_TO_ALPHA2[f.id];
          return alpha2 && COUNTRIES_WITH_FIRMS.has(alpha2);
        });
        setCountries(features);
      })
      .catch(() => {
        if (!cancelled) setCountries([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const roleCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const j of JOBS) m.set(j.firmId, (m.get(j.firmId) ?? 0) + 1);
    return m;
  }, []);

  const jobsByFirm = useMemo(() => {
    const m = new Map<
      string,
      Array<{ id: string; title: string; discipline: string; seniority: string }>
    >();
    const sorted = [...JOBS].sort(
      (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
    );
    for (const j of sorted) {
      let bucket = m.get(j.firmId);
      if (!bucket) {
        bucket = [];
        m.set(j.firmId, bucket);
      }
      bucket.push({ id: j.id, title: j.title, discipline: j.discipline, seniority: j.seniority });
    }
    return m;
  }, []);

  const visibleFirms = useMemo<Firm[]>(() => {
    if (!focusedCountryCode) return FIRMS;
    return FIRMS.filter((f) => f.countryCode === focusedCountryCode);
  }, [focusedCountryCode]);

  const countryStyle = (_f: CountryFeature): L.PathOptions => {
    // Country polygons carry NO persistent style. No focus stroke, no match
    // tint, no dim wash. Outline + highlight appear only on mouseover, and
    // only while a continent is in view (zoom <= REGION_ZOOM); past that, the
    // entire countriesPane is hidden via the `.is-zoomed-deep` class set by
    // CountryInteractionGate. Filtering / focus state still drives the firm
    // markers and the rails — just not the polygon ink.
    const fillColor = CARD_TONE;
    const fillOpacity = 0;
    const strokeColor = BORDERLINE;
    const strokeWeight = 0;
    const strokeOpacity = 0;

    return {
      stroke: strokeWeight > 0,
      color: strokeColor,
      weight: strokeWeight,
      opacity: strokeOpacity,
      fillColor,
      fillOpacity,
    };
  };

  return (
    <div className="map-wrap">
      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        minZoom={WORLD_ZOOM}
        maxZoom={CITY_ZOOM}
        maxBounds={EUROPE_MAX_BOUNDS}
        maxBoundsViscosity={0.85}
        worldCopyJump={false}
        zoomControl={false}
        attributionControl={true}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        className="leaflet-root"
      >
        <TileLayer url={TILE_BASE_URL} attribution={TILE_ATTR} maxZoom={16} />
        <TileLayer url={TILE_LABELS_URL} maxZoom={16} pane="tilePane" />

        {countries.length > 0 && (
          <Pane name="countriesPane" style={{ zIndex: 350 }}>
          <GeoJSON
            key={`${theme}-${focusedCountryCode ?? 'none'}-${(matchingCountryIds && [...matchingCountryIds].sort().join(',')) ?? ''}`}
            pane="countriesPane"
            data={{ type: 'FeatureCollection', features: countries } as FeatureCollection}
            style={(f) => countryStyle(f as CountryFeature)}
            onEachFeature={(f, layer) => {
              const cf = f as CountryFeature;
              const alpha2 = NUMERIC_TO_ALPHA2[cf.id];
              if (!alpha2 || !COUNTRIES_WITH_FIRMS.has(alpha2)) return;
              const name = cf.properties?.name ?? '';
              layer.bindTooltip(
                `<span class="country-tooltip-name serif">${escapeHtml(name)}</span>` +
                  `<span class="country-tooltip-meta mono">${alpha2}</span>`,
                {
                  className: 'country-tooltip',
                  sticky: true,
                  direction: 'top',
                  offset: L.point(0, -8),
                  opacity: 1,
                }
              );
              layer.on({
                mouseover: (e) => {
                  const path = e.target as L.Path;
                  // Country outline + fill ONLY appear on hover, and ONLY
                  // while a continent is in view. Past REGION_ZOOM, the
                  // entire countriesPane is hidden via `.is-zoomed-deep`,
                  // but we double-gate here in JS because Leaflet re-enables
                  // pointer-events on individual interactive paths even when
                  // the pane has pointer-events:none.
                  const m = (path as unknown as { _map?: L.Map })._map;
                  if (m && m.getZoom() > REGION_ZOOM) return;
                  // Brief acknowledgment, then auto-fade so the hover doesn't
                  // accumulate as the cursor drags across polygons. Light
                  // mode gets a faint paper fill; dark mode is stroke-only
                  // (paper tones wash against the dark tile base).
                  path.setStyle({
                    fillColor: CARD_TONE,
                    fillOpacity: theme === 'dark' ? 0 : 0.04,
                    stroke: true,
                    color: BORDERLINE,
                    weight: 1.25,
                    opacity: 0.225,
                  });
                  const carrier = layer as L.Layer & { _hhFade?: number };
                  if (carrier._hhFade) window.clearTimeout(carrier._hhFade);
                  carrier._hhFade = window.setTimeout(() => {
                    path.setStyle(countryStyle(cf));
                    carrier._hhFade = undefined;
                  }, 520);
                },
                mouseout: (e) => {
                  const path = e.target as L.Path;
                  const carrier = layer as L.Layer & { _hhFade?: number };
                  if (carrier._hhFade) {
                    window.clearTimeout(carrier._hhFade);
                    carrier._hhFade = undefined;
                  }
                  path.setStyle(countryStyle(cf));
                },
                click: (e) => {
                  const ll = (e as L.LeafletMouseEvent).latlng;
                  const b = (layer as L.Polygon).getBounds();
                  const sw = b.getSouthWest();
                  const ne = b.getNorthEast();
                  onCountryClick(
                    alpha2,
                    name,
                    ll.lat,
                    ll.lng,
                    [sw.lat, sw.lng],
                    [ne.lat, ne.lng]
                  );
                },
              });
            }}
          />
          </Pane>
        )}

        <FirmMarkersLayer
          firms={visibleFirms}
          focusedFirmId={focusedFirmId}
          hoveredFirmId={hoveredFirmId}
          onFirmClick={onFirmClick}
          onFirmHover={onFirmHover}
          onCityClick={onCityClick}
          roleCounts={roleCounts}
          jobsByFirm={jobsByFirm}
          matchingFirmIds={matchingFirmIds}
          homeFirmIds={homeFirmIds}
          hasProfile={hasProfile}
        />

        <FlyToTarget target={target} />
        <DoubleClickZoomOut onReturnToGlobe={onReturnToGlobe} />
        <SteppedWheelZoom />
        <CountryInteractionGate />
        <PopupMountAnimator />
        <PaperBackdrop />
      </MapContainer>
    </div>
  );
}

/**
 * Renders firm markers. Dots respond to native mouse hover and reveal a
 * monogram + company-name tooltip; no permanent label.
 */
function FirmMarkersLayer({
  firms,
  focusedFirmId,
  hoveredFirmId,
  onFirmClick,
  onFirmHover,
  onCityClick,
  roleCounts,
  jobsByFirm,
  matchingFirmIds,
  homeFirmIds,
  hasProfile,
}: {
  firms: Firm[];
  focusedFirmId: string | null;
  hoveredFirmId: string | null;
  onFirmClick: (id: string) => void;
  onFirmHover: (id: string | null) => void;
  onCityClick?: (city: string, countryCode: string) => void;
  roleCounts: Map<string, number>;
  jobsByFirm: Map<string, Array<{ id: string; title: string; discipline: string; seniority: string }>>;
  matchingFirmIds?: ReadonlySet<string>;
  homeFirmIds?: ReadonlySet<string>;
  hasProfile?: boolean;
}) {
  const map = useMap();
  const [zoom, setZoom] = useState<number>(() => map.getZoom());

  // Popup close timer — set by dot mouseout, cleared by re-entry into the
  // dot or the popup. Lets the popup fade out a moment after the cursor
  // leaves the dot, while still letting the user move into the popup to
  // read it without it disappearing mid-glance.
  const closeTimerRef = useRef<number | null>(null);
  const cancelClose = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      closePopupWithFade(map);
    }, 240);
  };

  useMapEvents({
    zoomend: () => setZoom(map.getZoom()),
    // When a popup opens, attach mouse listeners to its DOM so the close
    // timer pauses while the cursor is inside the panel. Leaflet rebuilds
    // the popup element per open, so listeners get garbage-collected with
    // the DOM — no explicit cleanup needed.
    popupopen: (e) => {
      const el = e.popup.getElement();
      if (!el) return;
      el.addEventListener('mouseenter', cancelClose);
      el.addEventListener('mouseleave', scheduleClose);
    },
    popupclose: cancelClose,
  });

  // Refs for programmatic popup open.
  const markerRefs = useRef<Record<string, L.CircleMarker | null>>({});

  // The popup opens after the flyTo finishes; markers for clustered cities
  // only mount once zoom reaches CITY_ZOOM, so we retry across the animation.
  useEffect(() => {
    if (!focusedFirmId) return;
    const tryOpen = () => {
      const m = markerRefs.current[focusedFirmId];
      if (m) {
        m.openPopup();
        return true;
      }
      return false;
    };
    if (tryOpen()) return;
    const timers = [120, 320, 620, 980, 1300].map((d) =>
      window.setTimeout(tryOpen, d)
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [focusedFirmId]);

  // Compute baseRadius the same way the render loop does — keeps the beacon
  // sized to the actual dot regardless of role-count variance.
  const beaconRadiusFor = (firmId: string): number => {
    const count = roleCounts.get(firmId) ?? 0;
    const isMatch = !!hasProfile && !!matchingFirmIds?.has(firmId);
    return isMatch
      ? Math.max(6, Math.min(12, 5 + count))
      : Math.max(5, Math.min(10, 4 + count));
  };

  // Primary beacon on the focused firm dot — bright double-ringed pulse plus
  // a subtle radius breathe on the dot itself. Tears down and re-attaches on
  // focus / zoom changes (Leaflet remounts CircleMarker SVG paths across some
  // zoom transitions). Same retry cadence as the popup opener for cluster-
  // firms that only mount once the zoom reaches CITY_ZOOM.
  useEffect(() => {
    if (!focusedFirmId) return;
    const firm = FIRMS_BY_ID[focusedFirmId];
    if (!firm) return;
    const baseRadius = beaconRadiusFor(focusedFirmId);

    let stop: (() => void) | null = null;
    const tryStart = () => {
      const m = markerRefs.current[focusedFirmId];
      const path = (m as unknown as { _path?: SVGPathElement } | null)?._path;
      if (m && path) {
        stop = startBeacon(m, baseRadius, 'primary');
        return true;
      }
      return false;
    };
    if (tryStart()) {
      return () => {
        stop?.();
      };
    }
    const timers = [120, 320, 620, 980, 1300].map((d) =>
      window.setTimeout(() => {
        if (!stop) tryStart();
      }, d)
    );
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      stop?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedFirmId, zoom, roleCounts, matchingFirmIds, hasProfile]);

  // Ambient beacon on every home-city firm dot — quiet single-ring pulse that
  // marks "you are here" on the map without competing with the primary beacon.
  // Skips the currently-focused firm (its primary beacon supersedes) and
  // re-mounts on zoom so it tracks cluster expansion / collapse.
  useEffect(() => {
    if (!homeFirmIds || homeFirmIds.size === 0) return;
    const stops: Array<() => void> = [];
    const timers: number[] = [];

    const attach = (id: string) => {
      const m = markerRefs.current[id];
      const path = (m as unknown as { _path?: SVGPathElement } | null)?._path;
      if (m && path) {
        const stop = startBeacon(m, beaconRadiusFor(id), 'ambient');
        stops.push(stop);
        return true;
      }
      return false;
    };

    for (const id of homeFirmIds) {
      if (id === focusedFirmId) continue;
      if (attach(id)) continue;
      // Retry for not-yet-mounted (cluster-zoom) markers.
      for (const d of [120, 320, 620, 980, 1300]) {
        const t = window.setTimeout(() => attach(id), d);
        timers.push(t);
      }
    }

    return () => {
      for (const t of timers) window.clearTimeout(t);
      for (const fn of stops) fn();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeFirmIds, focusedFirmId, zoom, roleCounts, matchingFirmIds, hasProfile]);

  const showClusters = zoom < CITY_ZOOM;

  // Group firms by city. Multi-firm cities render as a single cluster marker
  // below CITY_ZOOM, and as a sunflower-jittered set at street level.
  const clusters = useMemo(() => {
    const byCity = new Map<string, Firm[]>();
    for (const f of firms) {
      const key = `${f.countryCode}|${f.city}`;
      const bucket = byCity.get(key);
      if (bucket) bucket.push(f);
      else byCity.set(key, [f]);
    }
    return Array.from(byCity.values()).map((fs) => {
      const jittered = fs.map((f, i) => jitterFirm(f, i, fs.length));
      const bounds = jittered.reduce<L.LatLngBounds | null>((b, j) => {
        const ll = L.latLng(j.lat, j.lng);
        return b ? b.extend(ll) : L.latLngBounds(ll, ll);
      }, null);
      return {
        key: `${fs[0].countryCode}-${fs[0].city}`,
        city: fs[0].city,
        country: fs[0].country,
        centerLat: fs[0].lat,
        centerLng: fs[0].lng,
        firms: fs,
        jittered, // firm coords for street-level layout
        bounds,
      };
    });
  }, [firms]);

  const jitteredById = useMemo(() => {
    const m = new Map<string, { lat: number; lng: number }>();
    for (const c of clusters) {
      for (const j of c.jittered) m.set(j.id, { lat: j.lat, lng: j.lng });
    }
    return m;
  }, [clusters]);

  // Cap each cluster's disc radius so it never reaches another city's center.
  // The cap is half the screen-pixel distance to the nearest other city
  // (cluster or solo), minus a small margin so discs don't touch.
  // Recomputed when zoom changes (pan does not change relative pixel distance).
  const clusterRadii = useMemo(() => {
    const result = new Map<string, number>();
    if (!showClusters) return result;
    const pts = clusters.map((c) => ({
      key: c.key,
      isCluster: c.firms.length > 1,
      pt: map.latLngToContainerPoint([c.centerLat, c.centerLng]),
      desired: Math.max(20, Math.min(36, 14 + c.firms.length * 1.6)),
    }));
    const MARGIN = 4;
    const MIN_RADIUS = 8;
    for (let i = 0; i < pts.length; i++) {
      if (!pts[i].isCluster) continue;
      let minDist = Infinity;
      for (let j = 0; j < pts.length; j++) {
        if (i === j) continue;
        const d = pts[i].pt.distanceTo(pts[j].pt);
        if (d < minDist) minDist = d;
      }
      const cap = minDist === Infinity ? pts[i].desired : minDist / 2 - MARGIN;
      result.set(pts[i].key, Math.max(MIN_RADIUS, Math.min(pts[i].desired, cap)));
    }
    return result;
    // zoom is the controlling input; other deps are stable per layer instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clusters, zoom, showClusters]);

  // Stagger the entrance animation across markers via a CSS custom property.
  // We set --marker-delay on each rendered SVG path after leaflet appends it.
  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      const nodes = document.querySelectorAll<SVGPathElement>('.firm-marker');
      nodes.forEach((n, i) => n.style.setProperty('--marker-delay', `${i * 28}ms`));
    });
    return () => window.cancelAnimationFrame(id);
  }, [firms]);

  return (
    <>
      {showClusters &&
        clusters
          .filter((c) => c.firms.length > 1)
          .map((c) => {
            const totalRoles = c.firms.reduce(
              (n, f) => n + (roleCounts.get(f.id) ?? 0),
              0
            );
            const anyMatch =
              !!hasProfile &&
              c.firms.some((f) => matchingFirmIds?.has(f.id));
            const allDim = !!hasProfile && !anyMatch;
            const focusedInCluster =
              !!focusedFirmId && c.firms.some((f) => f.id === focusedFirmId);
            const dotColor = allDim ? DIM_INK : anyMatch ? FIT_GREEN : OXBLOOD;
            // City-area marker: a generous soft disc that IS the click target
            // for the whole cluster. Underlying firm dots are not rendered at
            // this zoom, so the cluster owns all hit-testing for the city.
            // Radius is capped so the disc never reaches another city's center.
            const desired = Math.max(20, Math.min(36, 14 + c.firms.length * 1.6));
            const radius = clusterRadii.get(c.key) ?? desired;
            const coreRadius = Math.max(
              3,
              Math.min(7, Math.min(3 + c.firms.length * 0.3, radius * 0.55))
            );
            const stateClass = [
              'firm-marker',
              'cluster-marker',
              focusedInCluster ? 'firm-marker--active' : '',
              anyMatch ? 'firm-marker--match' : '',
              allDim ? 'firm-marker--dim' : '',
            ]
              .filter(Boolean)
              .join(' ');
            const onAreaClick = () => {
              if (!c.bounds) return;
              onFirmHover(null);
              // Narrow both rails to this city before flying. Clicking a
              // cluster IS the request to focus the city.
              if (onCityClick && c.firms[0]) {
                onCityClick(c.firms[0].city, c.firms[0].countryCode);
              }
              // Never zoom OUT on a single click. flyToBounds picks the
              // optimal fit zoom which can be shallower than current view —
              // if so, pan-only at current zoom. Otherwise zoom in to the
              // city, capped at CITY_ZOOM.
              const currentZoom = map.getZoom();
              const fitZoom = map.getBoundsZoom(c.bounds, false, L.point(80, 80));
              const targetZoom = Math.max(currentZoom, Math.min(fitZoom, CITY_ZOOM));
              map.flyTo(c.bounds.getCenter(), targetZoom, { duration: 0.9, easeLinearity: 0.1 });
            };
            return (
              <Fragment key={`cluster-${c.key}`}>
              <CircleMarker
                center={[c.centerLat, c.centerLng]}
                radius={radius}
                bubblingMouseEvents={false}
                interactive={true}
                pathOptions={{
                  className: stateClass,
                  color: dotColor,
                  weight: 1,
                  fillColor: dotColor,
                  fillOpacity: allDim ? 0.05 : 0.1,
                  opacity: allDim ? 0.35 : 0.55,
                }}
                eventHandlers={{ click: onAreaClick }}
              >
                <Tooltip
                  direction="top"
                  offset={[0, -radius - 4]}
                  opacity={1}
                  className="cluster-tooltip"
                  sticky={false}
                >
                  <div className="cluster-tooltip-body">
                    <span className="serif cluster-tooltip-city">{c.city}</span>
                    <span className="mono cluster-tooltip-meta">
                      {c.firms.length} {c.firms.length === 1 ? 'FIRM' : 'FIRMS'}
                      {' · '}
                      {totalRoles} {totalRoles === 1 ? 'ROLE' : 'ROLES'}
                    </span>
                  </div>
                </Tooltip>
              </CircleMarker>
              {/* Core dot — visual anchor inside the area. Non-interactive so
                  hover/click always belongs to the area, never a stray
                  pixel-hit on the inner dot. */}
              <CircleMarker
                center={[c.centerLat, c.centerLng]}
                radius={coreRadius}
                interactive={false}
                pathOptions={{
                  className: 'firm-marker cluster-core',
                  color: dotColor,
                  weight: 1.25,
                  fillColor: dotColor,
                  fillOpacity: allDim ? 0.5 : 0.9,
                  opacity: allDim ? 0.6 : 1,
                }}
              />
              </Fragment>
            );
          })}

      {clusters.flatMap((c) => {
        // Solo firms always render. Multi-firm cities only render individuals
        // at street zoom (when showClusters is false).
        const inCluster = c.firms.length > 1;
        if (inCluster && showClusters) return [];
        return c.firms.map((f) => {
        const count = roleCounts.get(f.id) ?? 0;
        const isActive = f.id === focusedFirmId;
        const isHovered = f.id === hoveredFirmId;
        const isMatch = !!hasProfile && !!matchingFirmIds?.has(f.id);
        const isDim = !!hasProfile && !isMatch;
        const pos = jitteredById.get(f.id) ?? { lat: f.lat, lng: f.lng };

        // Resting radius is constant; visual size change on hover/active comes via CSS scale.
        const baseSize = isMatch
          ? Math.max(6, Math.min(12, 5 + count))
          : Math.max(5, Math.min(10, 4 + count));
        const baseRadius = baseSize;

        const stateClass = [
          'firm-marker',
          isActive ? 'firm-marker--active' : '',
          isHovered ? 'firm-marker--hover' : '',
          isMatch ? 'firm-marker--match' : '',
          isDim ? 'firm-marker--dim' : '',
        ]
          .filter(Boolean)
          .join(' ');

        const dotColor = isDim ? DIM_INK : isMatch ? FIT_GREEN : OXBLOOD;
        const fillOpacity = isDim ? 0.5 : isMatch ? 0.92 : 0.78;

        const jobs = jobsByFirm.get(f.id) ?? [];

        return (
          <CircleMarker
            key={f.id}
            ref={(r) => {
              markerRefs.current[f.id] = (r as unknown as L.CircleMarker) ?? null;
            }}
            center={[pos.lat, pos.lng]}
            radius={baseRadius}
            bubblingMouseEvents={false}
            pathOptions={{
              className: stateClass,
              color: dotColor,
              weight: isMatch ? 1.5 : 1,
              fillColor: dotColor,
              fillOpacity,
            }}
            eventHandlers={{
              click: (e) => {
                const marker = e.target as L.CircleMarker;
                pulseClick(marker, baseRadius);
                onFirmClick(f.id);
              },
              mouseover: (e) => {
                // Map dot hover is purely local — pulse + (optional) popup
                // slide. Crucially, do NOT call onFirmHover, otherwise the
                // firm/job rails sort and pan, and the wiring re-routes
                // every time the cursor passes a dot. Rails sync only when
                // the hover originates from a rail row.
                const marker = e.target as L.CircleMarker;
                pulseHover(marker, baseRadius);
                // Re-entering a dot cancels any pending popup close (e.g.
                // user briefly left and came back).
                cancelClose();
                // When a popup is already open on a different firm, slide
                // it to the hovered firm so the user can scan the map.
                if (focusedFirmId && focusedFirmId !== f.id) {
                  onFirmClick(f.id);
                }
              },
              mouseout: (e) => {
                // Reset radius in case the hover pulse left a stale value.
                const marker = e.target as L.CircleMarker;
                marker.setRadius(baseRadius);
                // Schedule a fade-close of the popup. If the cursor moves
                // into the popup itself before the timer fires, popupopen's
                // mouseenter listener cancels it so the user can read.
                scheduleClose();
              },
            }}
          >
            {/* Hover-only tooltip: company mark (monogram) + name, nothing else. */}
            <Tooltip
              direction="top"
              offset={[0, -baseRadius - 6]}
              opacity={1}
              className="map-tooltip"
              sticky={false}
            >
              <div className="map-tooltip-body">
                <span className="map-tooltip-mark serif" aria-hidden="true">
                  {monogram(f.name)}
                </span>
                <span className="map-tooltip-text">
                  <span className="serif">{f.name}</span>
                </span>
              </div>
            </Tooltip>
            <Popup
              className="firm-popup-leaflet"
              closeButton={true}
              autoPan={true}
              autoPanPaddingTopLeft={[16, 16]}
              autoPanPaddingBottomRight={[16, 16]}
            >
              <FirmPopup firm={f} roleCount={count} jobs={jobs} />
            </Popup>
          </CircleMarker>
        );
        });
      })}
    </>
  );
}

/**
 * Deterministic sunflower jitter for firms inside the same city. Index 0 stays
 * at the city center; later indices spiral outward by the golden angle. The
 * radius is in degrees and chosen so 6–8 firms separate cleanly at CITY_ZOOM.
 */
function jitterFirm(
  firm: Firm,
  index: number,
  total: number
): { id: string; lat: number; lng: number } {
  if (total <= 1 || index === 0) {
    return { id: firm.id, lat: firm.lat, lng: firm.lng };
  }
  const goldenAngle = 2.39996323; // radians
  const stepDeg = 0.0042; // ~470m at the equator; shrinks with cos(lat)
  const r = stepDeg * Math.sqrt(index);
  const a = index * goldenAngle;
  const dLat = r * Math.sin(a);
  const dLng = (r * Math.cos(a)) / Math.cos((firm.lat * Math.PI) / 180);
  return { id: firm.id, lat: firm.lat + dLat, lng: firm.lng + dLng };
}

/**
 * Replaces Leaflet's continuous wheel zoom with a four-step ladder
 * (world → region → country → city). Each wheel notch animates to the
 * adjacent step and ignores further wheel input until the flight settles.
 */
function SteppedWheelZoom() {
  const map = useMap();
  const reduced = useReducedMotion();
  const animatingRef = useRef(false);

  useEffect(() => {
    const container = map.getContainer();
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (animatingRef.current) return;
      if (Math.abs(e.deltaY) < 1) return;
      const z = Math.round(map.getZoom());
      const dir: 1 | -1 = e.deltaY < 0 ? 1 : -1;
      const next = nextZoomStep(z, dir);
      if (next === z) return;
      // Anchor the zoom on the cursor latlng so zoom-in points where you're aiming.
      const anchor = map.mouseEventToLatLng(e);
      const targetCenter =
        dir > 0
          ? L.latLng(
              (map.getCenter().lat + anchor.lat) / 2,
              (map.getCenter().lng + anchor.lng) / 2
            )
          : map.getCenter();
      animatingRef.current = true;
      const settle = () => {
        animatingRef.current = false;
      };
      if (reduced) {
        map.setView(targetCenter, next, { animate: false });
        settle();
      } else {
        map.flyTo(targetCenter, next, { duration: 0.85, easeLinearity: 0.1 });
        window.setTimeout(settle, 900);
      }
    };
    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [map, reduced]);

  return null;
}

function nextZoomStep(current: number, dir: 1 | -1): number {
  const steps = ZOOM_STEPS;
  if (dir > 0) {
    for (const s of steps) if (s > current) return s;
    return steps[steps.length - 1];
  }
  for (let i = steps.length - 1; i >= 0; i--) if (steps[i] < current) return steps[i];
  return steps[0];
}

function FlyToTarget({ target }: { target: MapTarget | null }) {
  const map = useMap();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!target) return;
    const current = map.getZoom();

    if (target.kind === 'world') {
      // "World" = the Europe-fit view: frame to EUROPE_BOUNDS.
      const bounds = L.latLngBounds(EUROPE_BOUNDS);
      if (reduced) map.fitBounds(bounds, { padding: [24, 24], animate: false });
      else map.flyToBounds(bounds, { padding: [24, 24], duration: 1.1, easeLinearity: 0.1 });
      return;
    }

    if (target.kind === 'world-at') {
      // Centered Europe view biased toward a coord (e.g. user's location).
      if (reduced) map.setView([target.lat, target.lng], initialZoom, { animate: false });
      else map.flyTo([target.lat, target.lng], initialZoom, { duration: 1.1, easeLinearity: 0.1 });
      return;
    }

    if (target.kind === 'country') {
      // Fit to the firms-in-country bbox (App passes the firm cluster, not
      // the polygon). Cap at COUNTRY_ZOOM so the country-highlight border
      // is still visible at the landing zoom: deeper zooms hide the
      // countriesPane entirely. Cluster / dot clicks take the user past
      // country into city view from here.
      const bounds = L.latLngBounds(target.bboxSW, target.bboxNE);
      if (reduced) {
        map.fitBounds(bounds, { padding: [48, 48], animate: false, maxZoom: COUNTRY_ZOOM });
      } else {
        map.flyToBounds(bounds, { padding: [48, 48], duration: 1.2, maxZoom: COUNTRY_ZOOM, easeLinearity: 0.1 });
      }
      return;
    }

    if (target.kind === 'preview') {
      // Soft pan only — keep zoom. Skips when the point is already on screen
      // so casual rail-hover doesn't drag the map around when not needed.
      const ll = L.latLng(target.lat, target.lng);
      if (map.getBounds().pad(-0.18).contains(ll)) return;
      if (reduced) {
        map.panTo(ll, { animate: false });
      } else {
        map.panTo(ll, { animate: true, duration: 0.55, easeLinearity: 0.25 });
      }
      return;
    }

    // 'region' / 'firm': normally cap zoom at COUNTRY_ZOOM. Clustered firms
    // (same city) push to street level so dots separate and labels appear.
    //
    // RULE: single clicks must never zoom OUT. Only double-click or explicit
    // UI (clear-region, clear-filter) may reduce zoom. So clamp the target
    // zoom to be no shallower than the user's current zoom — if they're
    // already deeper than COUNTRY/CITY_ZOOM, pan only at current zoom.
    const isCluster = target.kind === 'firm' && !!target.isCluster;
    const desiredZoom = isCluster ? CITY_ZOOM : COUNTRY_ZOOM;
    const targetZoom = Math.max(current, desiredZoom);
    if (reduced) {
      map.setView([target.lat, target.lng], targetZoom, { animate: false });
    } else if (current === targetZoom) {
      map.panTo([target.lat, target.lng], { duration: 0.7, easeLinearity: 0.25 });
    } else {
      map.flyTo([target.lat, target.lng], targetZoom, { duration: 1.1, easeLinearity: 0.1 });
    }
  }, [target, map, reduced]);
  return null;
}

/**
 * Double-click steps OUT one rung on the DBLCLICK_OUT_STEPS ladder
 * (city → country → world). REGION_ZOOM is skipped so a user looking at a
 * single firm at street level reaches world view in two dblclicks, never
 * more — first to country (city now reads as a cluster), then to world.
 * At world view, falls through to the optional globe (3D) return handler.
 */
function DoubleClickZoomOut({ onReturnToGlobe }: { onReturnToGlobe?: () => void }) {
  const reduced = useReducedMotion();
  const map = useMapEvents({
    dblclick() {
      const z = Math.round(map.getZoom());
      // Find the next ladder rung strictly below current zoom.
      let next = -Infinity;
      for (let i = DBLCLICK_OUT_STEPS.length - 1; i >= 0; i--) {
        if (DBLCLICK_OUT_STEPS[i] < z) {
          next = DBLCLICK_OUT_STEPS[i];
          break;
        }
      }
      if (next > -Infinity) {
        const center = map.getCenter();
        if (reduced) map.setView(center, next, { animate: false });
        else map.flyTo(center, next, { duration: 0.9, easeLinearity: 0.1 });
        return;
      }
      if (onReturnToGlobe) onReturnToGlobe();
    },
  });
  return null;
}

/**
 * Past country zoom the user is acting on dots and clusters — country
 * tooltips and country hover-fills become noise. This component toggles a
 * `.is-zoomed-deep` class on the Leaflet root so CSS can disable country
 * pointer events and hide the country tooltip at high zoom.
 */
/**
 * Listen for popup mounts inside Leaflet's popupPane and animate them in via
 * anime.js. Replaces the prior CSS keyframe so the entry can stagger inner
 * sections rather than just fading the wrapper.
 */
function PopupMountAnimator() {
  const map = useMap();
  useEffect(() => {
    const pane = map.getPanes().popupPane;
    if (!pane) return;
    const onAdd = (mutations: MutationRecord[]) => {
      for (const mut of mutations) {
        mut.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.classList.contains('firm-popup-leaflet')) {
            animatePopupIn(node);
          }
        });
      }
    };
    const obs = new MutationObserver(onAdd);
    obs.observe(pane, { childList: true });
    return () => obs.disconnect();
  }, [map]);
  return null;
}

function CountryInteractionGate() {
  const map = useMap();
  useEffect(() => {
    const root = map.getContainer();
    const apply = () => {
      // Hide country polygons as soon as the user zooms past continent view.
      // At REGION_ZOOM (6) or shallower, polygons are interactive on hover.
      // At zoom > REGION_ZOOM, the entire pane is hidden via CSS.
      root.classList.toggle('is-zoomed-deep', map.getZoom() > REGION_ZOOM);
    };
    apply();
    map.on('zoomend', apply);
    return () => {
      map.off('zoomend', apply);
      root.classList.remove('is-zoomed-deep');
    };
  }, [map]);
  return null;
}

function PaperBackdrop() {
  const map = useMap();
  useEffect(() => {
    map.getContainer().style.background = PAPER;
  }, [map]);
  return null;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
