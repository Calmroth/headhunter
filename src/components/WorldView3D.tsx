import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { feature } from 'topojson-client';
import type { Topology, GeometryObject } from 'topojson-specification';
import type { FeatureCollection } from 'geojson';
import { FIRMS, type Firm } from '../data/firms';
import { JOBS, type Job } from '../data/jobs';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { monogram } from '../utils/monogram';
import { NUMERIC_TO_ALPHA2 } from '../data/countryCodeMap';
import './WorldView3D.css';

type Props = {
  matchingFirmIds?: ReadonlySet<string>;
  hasProfile?: boolean;
  /** Fallback target for "face user" rotation when geolocation is unavailable. */
  profileCoord?: { lat: number; lng: number };
  onFirmClick: (id: string) => void;
};

const RADIUS = 1;
const SNAP_PX = 36;
const COUNTRIES_URL = 'https://unpkg.com/world-atlas@2/countries-110m.json';

type Marker = {
  firm: Firm;
  pos: THREE.Vector3;
  mesh: THREE.Mesh;
  halo: THREE.Sprite;
  baseHaloOpacity: number;
  baseMarkerScale: number;
};

/**
 * Wireframe globe with country outline overlay. Cursor snaps to the nearest
 * firm marker within SNAP_PX (screen pixels); the snapped marker grows and
 * shifts to a bluish accent. The globe rotates on mount to face the user's
 * current geolocation (with fallbacks).
 */
export function WorldView3D({
  matchingFirmIds,
  hasProfile,
  profileCoord,
  onFirmClick,
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const countryTipRef = useRef<HTMLDivElement | null>(null);
  const [snappedFirm, setSnappedFirm] = useState<Firm | null>(null);
  const [hoverCountry, setHoverCountry] = useState<{
    name: string;
    firms: number;
    roles: number;
  } | null>(null);
  const reduced = useReducedMotion();

  // Stash the click handler in a ref so a new closure from the parent
  // (App re-renders) doesn't tear down the WebGL scene every keystroke.
  const onFirmClickRef = useRef(onFirmClick);
  useEffect(() => {
    onFirmClickRef.current = onFirmClick;
  }, [onFirmClick]);

  /** First (most recent) job per firm, for the tooltip's role line. */
  const topJobByFirm = useMemo(() => {
    const map = new Map<string, Job>();
    const byTime = [...JOBS].sort(
      (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
    );
    for (const j of byTime) if (!map.has(j.firmId)) map.set(j.firmId, j);
    return map;
  }, []);
  const roleCountByFirm = useMemo(() => {
    const m = new Map<string, number>();
    for (const j of JOBS) m.set(j.firmId, (m.get(j.firmId) ?? 0) + 1);
    return m;
  }, []);

  /** Per-country firm and role aggregates, keyed by ISO alpha-2. */
  const aggregates = useMemo(() => {
    const firms = new Map<string, number>();
    const roles = new Map<string, number>();
    for (const f of FIRMS) firms.set(f.countryCode, (firms.get(f.countryCode) ?? 0) + 1);
    for (const j of JOBS) {
      const f = FIRMS.find((x) => x.id === j.firmId);
      if (!f) continue;
      roles.set(f.countryCode, (roles.get(f.countryCode) ?? 0) + 1);
    }
    return { firms, roles };
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      host.classList.add('world-3d--unsupported');
      return;
    }
    renderer.setClearAlpha(0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.style.cursor = 'grab';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 3.6);

    // Globe pivot — all earth geometry is its child so we can rotate as a unit.
    const globe = new THREE.Group();
    scene.add(globe);

    // Theme-aware palette resolved per render.
    const palette = readPalette();

    // ---- Depth-only occluder ----
    // Writes depth but no color, so anything behind it (back-facing wireframe
    // lines, country outlines, markers and halos) fails the depth test and
    // doesn't render. Result: only the front-facing hemisphere is visible.
    const occluderGeo = new THREE.SphereGeometry(RADIUS * 0.995, 48, 36);
    const occluderMat = new THREE.MeshBasicMaterial({
      colorWrite: false,
      depthWrite: true,
      side: THREE.FrontSide,
    });
    const occluder = new THREE.Mesh(occluderGeo, occluderMat);
    // Render before everything else so depth is laid down first.
    occluder.renderOrder = -1;
    globe.add(occluder);

    // ---- Wireframe sphere ----
    const sphereGeo = new THREE.SphereGeometry(RADIUS, 36, 24);
    const wireGeo = new THREE.WireframeGeometry(sphereGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: palette.wire,
      transparent: true,
      opacity: palette.isDark ? 0.35 : 0.22,
    });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    globe.add(wireMesh);

    // Atmosphere shell — gentle additive glow rendered BEFORE the depth
    // occluder, with depthTest off so the back-side glow halo is preserved.
    const atmoGeo = new THREE.SphereGeometry(RADIUS * 1.05, 48, 32);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: palette.atmosphere,
      transparent: true,
      opacity: palette.isDark ? 0.12 : 0.06,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
    });
    const atmosphere = new THREE.Mesh(atmoGeo, atmoMat);
    atmosphere.renderOrder = -2;
    scene.add(atmosphere);

    // ---- Country outline overlay (filled later via async fetch) ----
    const countriesMat = new THREE.LineBasicMaterial({
      color: palette.countries,
      transparent: true,
      opacity: palette.isDark ? 0.75 : 0.55,
    });
    const countriesGeo = new THREE.BufferGeometry();
    const countriesMesh = new THREE.LineSegments(countriesGeo, countriesMat);
    globe.add(countriesMesh);

    // Highlight overlay — same buffer, bright colour, drawRange swapped to
    // just the hovered country's slice.
    const highlightMat = new THREE.LineBasicMaterial({
      color: palette.highlight,
      transparent: true,
      opacity: 0.95,
      linewidth: 2,
    });
    // Separate geometry so setDrawRange on highlight doesn't affect the
    // base country outline draw range. Position attribute is shared.
    const highlightGeo = new THREE.BufferGeometry();
    const highlightMesh = new THREE.LineSegments(highlightGeo, highlightMat);
    highlightMesh.renderOrder = 2;
    highlightMesh.visible = false;
    globe.add(highlightMesh);

    // Per-country lookups built once polygons load.
    type CountryHit = {
      alpha2: string;
      name: string;
      bbox: [number, number, number, number]; // minLng, minLat, maxLng, maxLat
      rings: Array<Array<[number, number]>>; // (lng, lat)
      segStart: number;
      segCount: number;
    };
    let countryHits: CountryHit[] = [];

    let cancelledLoad = false;
    fetch(COUNTRIES_URL)
      .then((r) => r.json() as Promise<Topology>)
      .then((topo) => {
        if (cancelledLoad) return;
        const obj = topo.objects.countries as GeometryObject;
        const geo = feature(topo, obj) as FeatureCollection;
        const built = buildCountryStructures(geo, RADIUS * 1.002);
        const posAttr = new THREE.Float32BufferAttribute(built.positions, 3);
        countriesGeo.setAttribute('position', posAttr);
        highlightGeo.setAttribute('position', posAttr);
        countriesGeo.computeBoundingSphere();
        highlightGeo.computeBoundingSphere();
        countryHits = built.countries;
      })
      .catch(() => {
        /* offline — wireframe-only fallback */
      });

    // ---- Markers ----
    const markerGeo = new THREE.SphereGeometry(0.022, 16, 16);
    const colorOxblood = new THREE.Color(palette.firm);
    const colorFit = new THREE.Color(palette.fit);
    const colorDim = new THREE.Color(palette.dim);
    const colorSnap = new THREE.Color(palette.snap);

    const haloTex = makeHaloTexture();
    const markers: Marker[] = [];

    const roleCounts = new Map<string, number>();
    for (const j of JOBS) roleCounts.set(j.firmId, (roleCounts.get(j.firmId) ?? 0) + 1);

    for (const firm of FIRMS) {
      const isMatch = !!hasProfile && !!matchingFirmIds?.has(firm.id);
      const isDim = !!hasProfile && !isMatch;
      const color = isMatch ? colorFit : isDim ? colorDim : colorOxblood;
      const baseHaloOpacity = isMatch ? 0.9 : isDim ? 0.22 : 0.55;
      const baseMarkerScale = isMatch ? 1.15 : 1;

      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.95,
      });
      const mesh = new THREE.Mesh(markerGeo, mat);
      const pos = latLngToVec3(firm.lat, firm.lng, RADIUS + 0.005);
      mesh.position.copy(pos);
      mesh.scale.setScalar(baseMarkerScale);
      mesh.userData.firmId = firm.id;
      globe.add(mesh);

      const haloMat = new THREE.SpriteMaterial({
        map: haloTex,
        color,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: baseHaloOpacity,
      });
      const halo = new THREE.Sprite(haloMat);
      halo.position.copy(pos);
      halo.scale.set(isMatch ? 0.13 : 0.09, isMatch ? 0.13 : 0.09, 1);
      globe.add(halo);

      markers.push({ firm, pos, mesh, halo, baseHaloOpacity, baseMarkerScale });
    }

    // ---- Sizing ----
    let width = 1, height = 1;
    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // ---- "Face the user" rotation ----
    // Compose orientation from Euler angles in XYZ order so the north pole
    // stays pointing up — no roll/tilt. Rotating around Y aligns the meridian
    // with the camera; rotating around X tilts the chosen latitude to centre.
    const targetQuat = new THREE.Quaternion();
    const tmpEuler = new THREE.Euler(0, 0, 0, 'XYZ');
    const setFacing = (lat: number, lng: number) => {
      tmpEuler.set(
        -THREE.MathUtils.degToRad(lat),
        THREE.MathUtils.degToRad(lng) + Math.PI / 2,
        0,
        'XYZ'
      );
      targetQuat.setFromEuler(tmpEuler);
    };

    // Default: Stockholm (project user's home market) until geolocation resolves.
    setFacing(profileCoord?.lat ?? 59.33, profileCoord?.lng ?? 18.06);
    globe.quaternion.copy(targetQuat); // jump to initial pose

    // Try the precise position; fall back to time-zone-based guess.
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFacing(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          const tz = guessLatLngFromTimezone();
          if (tz) setFacing(tz.lat, tz.lng);
        },
        { enableHighAccuracy: false, maximumAge: 5 * 60 * 1000, timeout: 4000 }
      );
    } else {
      const tz = guessLatLngFromTimezone();
      if (tz) setFacing(tz.lat, tz.lng);
    }

    // ---- Interaction ----
    let dragging = false;
    let downX = 0, downY = 0;
    let movedDist = 0;
    let snapId: string | null = null;
    let pointerX = -9999, pointerY = -9999;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      downX = e.clientX;
      downY = e.clientY;
      movedDist = 0;
      (e.target as Element).setPointerCapture?.(e.pointerId);
    };
    const onPointerUp = () => {
      const wasClick = movedDist < 6;
      dragging = false;
      if (wasClick && snapId) {
        onFirmClickRef.current(snapId);
      }
    };
    const onPointerMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      if (dragging) {
        const dx = e.clientX - downX;
        const dy = e.clientY - downY;
        movedDist = Math.hypot(dx, dy);
        // Read current orientation as XYZ Euler so the globe never accumulates
        // roll (z). Drag-x → yaw (Y), drag-y → pitch (X, clamped near poles).
        const cur = new THREE.Euler(0, 0, 0, 'XYZ').setFromQuaternion(globe.quaternion, 'XYZ');
        const nextY = cur.y + dx * 0.005;
        const nextX = THREE.MathUtils.clamp(
          cur.x + dy * 0.005,
          -Math.PI / 2 + 0.05,
          Math.PI / 2 - 0.05
        );
        globe.quaternion.setFromEuler(new THREE.Euler(nextX, nextY, 0, 'XYZ'));
        targetQuat.copy(globe.quaternion);
        downX = e.clientX;
        downY = e.clientY;
      }
    };
    const onPointerLeave = () => {
      pointerX = pointerY = -9999;
    };
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('pointerup', onPointerUp);

    // ---- Snap state for hover (computed every frame in screen space) ----
    const vec = new THREE.Vector3();
    const worldPos = new THREE.Vector3();

    let visible = !document.hidden;
    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(raf);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    // Sphere used for ray-sphere hit-testing of the cursor onto the globe.
    const hitSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), RADIUS);
    const ray2 = new THREE.Raycaster();
    const ndc2 = new THREE.Vector2();
    const hitPoint = new THREE.Vector3();
    const localPoint = new THREE.Vector3();
    const invQuat = new THREE.Quaternion();
    let hoveredCountryAlpha2: string | null = null;
    let raf = 0;
    let last = performance.now();
    function tick(now: number) {
      const dt = Math.min(32, now - last);
      last = now;
      const step = dt / 16.6667;

      // Ease toward the target orientation (e.g. after geolocation lands).
      // No idle autorotation — globe stays still unless dragged.
      if (!dragging) {
        globe.quaternion.slerp(targetQuat, 0.06 * step);
      }

      // Snap-to-dot: find nearest marker on screen within SNAP_PX.
      const rect = renderer.domElement.getBoundingClientRect();
      const ndcX = ((pointerX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -(((pointerY - rect.top) / rect.height) * 2 - 1);
      const havePointer =
        pointerX > -1000 && pointerX >= rect.left && pointerX <= rect.right &&
        pointerY >= rect.top && pointerY <= rect.bottom;

      let best: { id: string; dist: number; idx: number } | null = null;
      if (havePointer) {
        for (let i = 0; i < markers.length; i++) {
          const m = markers[i];
          worldPos.copy(m.mesh.position).applyMatrix4(globe.matrixWorld);
          // Cull markers on the back of the globe (facing away from camera).
          const camDir = vec.copy(worldPos).normalize();
          if (camDir.z < -0.1) continue;
          vec.copy(worldPos).project(camera);
          const dxn = vec.x - ndcX;
          const dyn = vec.y - ndcY;
          // Convert NDC delta to pixels.
          const pxDx = (dxn * rect.width) / 2;
          const pxDy = (dyn * rect.height) / 2;
          const d = Math.hypot(pxDx, pxDy);
          if (!best || d < best.dist) best = { id: m.firm.id, dist: d, idx: i };
        }
      }
      const nextSnap = best && best.dist <= SNAP_PX ? best.id : null;
      if (nextSnap !== snapId) {
        snapId = nextSnap;
        renderer.domElement.style.cursor = snapId
          ? 'pointer'
          : dragging
            ? 'grabbing'
            : 'grab';
        // Notify React of the snap change so the tooltip body re-renders.
        const f = snapId ? FIRMS.find((x) => x.id === snapId) ?? null : null;
        setSnappedFirm(f);
      }

      // Position the tooltip at the snapped marker's screen position.
      const tip = tooltipRef.current;
      if (tip) {
        if (snapId) {
          const m = markers[best!.idx];
          worldPos.copy(m.mesh.position).applyMatrix4(globe.matrixWorld);
          vec.copy(worldPos).project(camera);
          const px = ((vec.x + 1) / 2) * rect.width;
          const py = ((-vec.y + 1) / 2) * rect.height;
          tip.style.transform = `translate(${px}px, ${py}px)`;
          tip.dataset.visible = 'true';
        } else {
          tip.dataset.visible = 'false';
        }
      }

      // Country hit-test: ray-sphere intersect → local lat/lng → point-in-poly.
      const countryTip = countryTipRef.current;
      let pickedAlpha2: string | null = null;
      if (havePointer && !snapId && countryHits.length > 0) {
        ndc2.set(ndcX, ndcY);
        ray2.setFromCamera(ndc2, camera);
        const hit = ray2.ray.intersectSphere(hitSphere, hitPoint);
        if (hit) {
          // Transform hit point into globe-local space.
          invQuat.copy(globe.quaternion).invert();
          localPoint.copy(hit).applyQuaternion(invQuat);
          const lat = THREE.MathUtils.radToDeg(Math.asin(localPoint.y / RADIUS));
          const lng = THREE.MathUtils.radToDeg(Math.atan2(-localPoint.z, localPoint.x));
          // bbox prefilter then point-in-polygon
          for (const c of countryHits) {
            if (lng < c.bbox[0] || lng > c.bbox[2]) continue;
            if (lat < c.bbox[1] || lat > c.bbox[3]) continue;
            if (pointInRings(lng, lat, c.rings)) {
              pickedAlpha2 = c.alpha2;
              break;
            }
          }
        }
      }

      if (pickedAlpha2 !== hoveredCountryAlpha2) {
        hoveredCountryAlpha2 = pickedAlpha2;
        if (pickedAlpha2) {
          const c = countryHits.find((x) => x.alpha2 === pickedAlpha2)!;
          highlightMesh.visible = true;
          highlightGeo.setDrawRange(c.segStart, c.segCount);
          setHoverCountry({
            name: c.name || pickedAlpha2,
            firms: aggregates.firms.get(pickedAlpha2) ?? 0,
            roles: aggregates.roles.get(pickedAlpha2) ?? 0,
          });
          if (renderer.domElement.style.cursor !== 'pointer') {
            renderer.domElement.style.cursor = 'grab';
          }
        } else {
          highlightMesh.visible = false;
          setHoverCountry(null);
        }
      }

      if (countryTip) {
        if (pickedAlpha2) {
          countryTip.style.transform = `translate(${pointerX - rect.left}px, ${pointerY - rect.top}px)`;
          countryTip.dataset.visible = 'true';
        } else {
          countryTip.dataset.visible = 'false';
        }
      }

      // Animate markers toward target state (snapped = larger + bluish).
      for (let i = 0; i < markers.length; i++) {
        const m = markers[i];
        const mat = m.mesh.material as THREE.MeshBasicMaterial;
        const hMat = m.halo.material as THREE.SpriteMaterial;
        const isSnap = m.firm.id === snapId;
        const targetScale = isSnap ? m.baseMarkerScale * 2.1 : m.baseMarkerScale;
        const currentScale = m.mesh.scale.x;
        const ns = currentScale + (targetScale - currentScale) * 0.25 * step;
        m.mesh.scale.setScalar(ns);

        // Color blend toward snap.
        const targetCol = isSnap ? colorSnap : initialColor(m, hasProfile, matchingFirmIds, colorFit, colorDim, colorOxblood);
        mat.color.lerp(targetCol, 0.25 * step);
        hMat.color.lerp(targetCol, 0.25 * step);

        // Halo size pulses on snap.
        const t = now * 0.004;
        const haloBase = isSnap ? 0.22 : (m.baseHaloOpacity > 0.6 ? 0.13 : 0.09);
        const haloS = haloBase + (isSnap ? Math.sin(t) * 0.02 : 0);
        m.halo.scale.set(haloS, haloS, 1);
        hMat.opacity = isSnap ? 1 : m.baseHaloOpacity;
      }

      renderer.render(scene, camera);
      if (visible && !reduced) raf = requestAnimationFrame(tick);
    }

    if (reduced) tick(performance.now());
    else raf = requestAnimationFrame(tick);

    // ---- Theme change handler — recolor lines and atmosphere ----
    const onThemeChange = () => {
      const p = readPalette();
      wireMat.color.set(p.wire);
      wireMat.opacity = p.isDark ? 0.35 : 0.22;
      countriesMat.color.set(p.countries);
      countriesMat.opacity = p.isDark ? 0.75 : 0.55;
      highlightMat.color.set(p.highlight);
      atmoMat.color.set(p.atmosphere);
      atmoMat.opacity = p.isDark ? 0.12 : 0.06;
      // Recolor markers back to their base color (snap pulse handles itself).
      colorOxblood.set(p.firm);
      colorFit.set(p.fit);
      colorDim.set(p.dim);
      colorSnap.set(p.snap);
    };
    window.addEventListener('themechange', onThemeChange);

    return () => {
      cancelledLoad = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('themechange', onThemeChange);
      document.removeEventListener('visibilitychange', onVisibility);
      occluderGeo.dispose();
      occluderMat.dispose();
      sphereGeo.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      atmoGeo.dispose();
      atmoMat.dispose();
      countriesGeo.dispose();
      countriesMat.dispose();
      highlightGeo.dispose();
      highlightMat.dispose();
      markerGeo.dispose();
      haloTex.dispose();
      for (const m of markers) {
        (m.mesh.material as THREE.Material).dispose();
        (m.halo.material as THREE.Material).dispose();
      }
      renderer.dispose();
      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement);
      }
    };
    // `onFirmClick` is intentionally NOT in deps — it's accessed through a ref
    // so a fresh parent closure doesn't rebuild the scene.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchingFirmIds, hasProfile, profileCoord?.lat, profileCoord?.lng, reduced]);

  const tipJob = snappedFirm ? topJobByFirm.get(snappedFirm.id) ?? null : null;
  const tipCount = snappedFirm ? roleCountByFirm.get(snappedFirm.id) ?? 0 : 0;

  return (
    <div ref={hostRef} className="world-3d" aria-label="Interactive 3D globe of consultancies">
      <div
        ref={countryTipRef}
        className="globe-country-tip"
        data-visible="false"
        role="tooltip"
      >
        {hoverCountry && (
          <div className="globe-country-tip-card">
            <span className="globe-country-tip-name serif">{hoverCountry.name}</span>
            <span className="globe-country-tip-meta mono">
              {hoverCountry.firms} {hoverCountry.firms === 1 ? 'FIRM' : 'FIRMS'} ·{' '}
              {hoverCountry.roles} {hoverCountry.roles === 1 ? 'ROLE' : 'ROLES'}
            </span>
          </div>
        )}
      </div>

      <div ref={tooltipRef} className="globe-tip" data-visible="false" role="tooltip">
        {snappedFirm && (
          <div className="globe-tip-card">
            <span className="globe-tip-mark serif" aria-hidden="true">
              {monogram(snappedFirm.name)}
            </span>
            <div className="globe-tip-body">
              <span className="globe-tip-name serif">{snappedFirm.name}</span>
              <span className="globe-tip-meta mono">
                {snappedFirm.city.toUpperCase()} · {snappedFirm.country.toUpperCase()}
              </span>
              {tipJob ? (
                <span className="globe-tip-role">
                  {tipJob.title}
                  {tipCount > 1 && (
                    <span className="globe-tip-more mono"> · +{tipCount - 1} more</span>
                  )}
                </span>
              ) : (
                <span className="globe-tip-role globe-tip-role--empty mono">
                  No open roles
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function initialColor(
  m: Marker,
  hasProfile: boolean | undefined,
  matchingFirmIds: ReadonlySet<string> | undefined,
  fit: THREE.Color,
  dim: THREE.Color,
  oxblood: THREE.Color
) {
  if (!hasProfile) return oxblood;
  if (matchingFirmIds?.has(m.firm.id)) return fit;
  return dim;
}

function latLngToVec3(latDeg: number, lngDeg: number, r: number): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(90 - latDeg);
  const theta = THREE.MathUtils.degToRad(lngDeg);
  const x = r * Math.sin(phi) * Math.cos(theta);
  const z = -r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

/**
 * Build line-segment positions per country plus the per-country lookup needed
 * for hover hit-testing and highlight slicing.
 */
function buildCountryStructures(
  geo: FeatureCollection,
  r: number
): {
  positions: number[];
  countries: Array<{
    alpha2: string;
    name: string;
    bbox: [number, number, number, number];
    rings: Array<Array<[number, number]>>;
    segStart: number;
    segCount: number;
  }>;
} {
  const positions: number[] = [];
  const countries: Array<{
    alpha2: string;
    name: string;
    bbox: [number, number, number, number];
    rings: Array<Array<[number, number]>>;
    segStart: number;
    segCount: number;
  }> = [];

  for (const f of geo.features) {
    const g = f.geometry;
    if (!g) continue;
    const id = String(f.id ?? '');
    const alpha2 = NUMERIC_TO_ALPHA2[id] ?? id;
    const name = (f.properties as { name?: string } | undefined)?.name ?? '';

    const rings: Array<Array<[number, number]>> = [];
    if (g.type === 'Polygon') {
      for (const ring of g.coordinates) rings.push(ring as [number, number][]);
    } else if (g.type === 'MultiPolygon') {
      for (const poly of g.coordinates) {
        for (const ring of poly) rings.push(ring as [number, number][]);
      }
    } else {
      continue;
    }

    const segStartVerts = positions.length / 3;
    let minLng = 180, minLat = 90, maxLng = -180, maxLat = -90;
    for (const ring of rings) {
      for (let i = 0; i < ring.length - 1; i++) {
        const a = ring[i];
        const b = ring[i + 1];
        if (a[0] < minLng) minLng = a[0];
        if (a[0] > maxLng) maxLng = a[0];
        if (a[1] < minLat) minLat = a[1];
        if (a[1] > maxLat) maxLat = a[1];
        const pa = latLngToVec3(a[1], a[0], r);
        const pb = latLngToVec3(b[1], b[0], r);
        positions.push(pa.x, pa.y, pa.z, pb.x, pb.y, pb.z);
      }
    }
    const segCountVerts = positions.length / 3 - segStartVerts;
    countries.push({
      alpha2,
      name,
      bbox: [minLng, minLat, maxLng, maxLat],
      rings,
      segStart: segStartVerts,
      segCount: segCountVerts,
    });
  }
  return { positions, countries };
}

/** Standard point-in-polygon ray-cast, summed across all rings of a country. */
function pointInRings(lng: number, lat: number, rings: Array<Array<[number, number]>>) {
  let inside = false;
  for (const ring of rings) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const xi = ring[i][0], yi = ring[i][1];
      const xj = ring[j][0], yj = ring[j][1];
      const intersect =
        yi > lat !== yj > lat &&
        lng < ((xj - xi) * (lat - yi)) / (yj - yi + 1e-12) + xi;
      if (intersect) inside = !inside;
    }
  }
  return inside;
}

function makeHaloTexture(): THREE.Texture {
  const size = 128;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,0.95)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.35)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

type Palette = {
  isDark: boolean;
  wire: number;
  atmosphere: number;
  countries: number;
  highlight: number;
  firm: number;
  fit: number;
  dim: number;
  snap: number;
};

function readPalette(): Palette {
  const isDark =
    typeof document !== 'undefined' &&
    document.documentElement.dataset.theme === 'dark';
  return {
    isDark,
    wire: isDark ? 0x6a6358 : 0x2a221d,
    atmosphere: isDark ? 0x6aa6e0 : 0xb8482e,
    countries: isDark ? 0xf3ece0 : 0x2a221d,
    highlight: 0x3a8cc4,
    firm: 0xb8482e,
    fit: 0x3a8c54,
    dim: isDark ? 0x6f6a63 : 0x9a948d,
    snap: 0x3a8cc4, // bluish
  };
}

/**
 * Coarse lat/lng guess from the user's IANA timezone — used when geolocation
 * is denied/unavailable. Falls back to Stockholm.
 */
function guessLatLngFromTimezone(): { lat: number; lng: number } | null {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!tz) return null;
  const lookup: Record<string, [number, number]> = {
    'Europe/Stockholm': [59.33, 18.06],
    'Europe/Oslo': [59.91, 10.75],
    'Europe/Copenhagen': [55.68, 12.57],
    'Europe/Helsinki': [60.17, 24.94],
    'Europe/London': [51.51, -0.13],
    'Europe/Berlin': [52.52, 13.41],
    'Europe/Paris': [48.86, 2.35],
    'Europe/Madrid': [40.42, -3.7],
    'Europe/Rome': [41.9, 12.5],
    'Europe/Amsterdam': [52.37, 4.9],
    'America/New_York': [40.71, -74.01],
    'America/Los_Angeles': [34.05, -118.24],
    'America/Chicago': [41.88, -87.63],
    'America/Toronto': [43.65, -79.38],
    'America/Sao_Paulo': [-23.55, -46.63],
    'Asia/Tokyo': [35.68, 139.69],
    'Asia/Singapore': [1.35, 103.82],
    'Asia/Hong_Kong': [22.32, 114.17],
    'Asia/Shanghai': [31.23, 121.47],
    'Asia/Dubai': [25.2, 55.27],
    'Australia/Sydney': [-33.87, 151.21],
  };
  const hit = lookup[tz];
  return hit ? { lat: hit[0], lng: hit[1] } : null;
}
