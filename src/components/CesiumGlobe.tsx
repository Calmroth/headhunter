import { useEffect, useMemo, useRef, useState } from 'react';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import { FIRMS, type Firm } from '../data/firms';
import { JOBS, type Job } from '../data/jobs';
import { monogram } from '../utils/monogram';
import './CesiumGlobe.css';

type Props = {
  matchingFirmIds?: ReadonlySet<string>;
  hasProfile?: boolean;
  profileCoord?: { lat: number; lng: number };
  onFirmClick: (id: string) => void;
};

const OXBLOOD = Cesium.Color.fromCssColorString('#b8482e');
const FIT_GREEN = Cesium.Color.fromCssColorString('#3a8c54');
const DIM = Cesium.Color.fromCssColorString('#9a948d');
const SELECT_BLUE = Cesium.Color.fromCssColorString('#3a8cc4');

/**
 * Photorealistic globe powered by CesiumJS + Google Photorealistic 3D Tiles.
 * Falls back to a friendly setup card if API keys are missing.
 *
 * Camera defaults: tilted-top-down framing of the user's geolocation.
 * Lighting: Cesium scene globe.enableLighting wired to the current real-world
 * sun position via clockViewModel, so the day/night terminator tracks reality.
 */
export function CesiumGlobe({
  matchingFirmIds,
  hasProfile,
  profileCoord,
  onFirmClick,
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [hoveredFirm, setHoveredFirm] = useState<Firm | null>(null);

  const ionToken = import.meta.env.VITE_CESIUM_ION_TOKEN ?? '';
  const googleKey = import.meta.env.VITE_GOOGLE_3D_TILES_KEY ?? '';
  // Either route works: a Cesium Ion token alone (uses Ion-hosted Google
  // Photorealistic 3D Tiles, asset 2275207), or an Ion token + a direct
  // Google Map Tiles API key.
  const keysReady = !!ionToken;

  // Stash click handler so a parent re-render doesn't tear down the viewer.
  const onFirmClickRef = useRef(onFirmClick);
  useEffect(() => {
    onFirmClickRef.current = onFirmClick;
  }, [onFirmClick]);

  /** First (most recent) job per firm — drives the role line in the tooltip. */
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

  useEffect(() => {
    if (!keysReady || !hostRef.current) return;
    Cesium.Ion.defaultAccessToken = ionToken;

    const viewer = new Cesium.Viewer(hostRef.current, {
      // Minimal chrome — we drive the camera ourselves.
      animation: false,
      timeline: false,
      baseLayerPicker: false,
      geocoder: false,
      navigationHelpButton: false,
      sceneModePicker: false,
      homeButton: false,
      infoBox: false,
      selectionIndicator: false,
      fullscreenButton: false,
      // Photorealistic tiles bring their own surface — disable Cesium's globe
      // so it doesn't fight the tileset.
      globe: false as unknown as Cesium.Globe,
      shouldAnimate: true,
    });

    const scene = viewer.scene;
    // Real-world sun direction & shadows on the tileset surface.
    scene.light = new Cesium.SunLight();
    if (scene.skyAtmosphere) scene.skyAtmosphere.show = true;
    // Clock is set to "now" so the terminator matches real time. Cesium
    // updates the sun every frame from viewer.clock.currentTime.
    viewer.clock.currentTime = Cesium.JulianDate.now();
    viewer.clock.multiplier = 1; // real time

    // Add Google Photorealistic 3D Tiles. If a direct Google key is provided,
    // hit the Google endpoint; otherwise load the Ion-hosted asset (2275207).
    let tileset: Cesium.Cesium3DTileset | null = null;
    const tilesetPromise = googleKey
      ? Cesium.createGooglePhotorealistic3DTileset({ key: googleKey })
      : Cesium.Cesium3DTileset.fromIonAssetId(2275207);
    tilesetPromise
      .then((ts) => {
        tileset = ts;
        scene.primitives.add(ts);
      })
      .catch((err: unknown) => {
        // Log but don't crash — stars + atmosphere still render.
        // eslint-disable-next-line no-console
        console.warn('[CesiumGlobe] Failed to load 3D tileset', err);
      });

    // Sensible camera defaults: shallow tilt over user's region.
    const home = profileCoord ?? { lat: 59.33, lng: 18.06 };
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(home.lng, home.lat, 12_000_000),
      orientation: { heading: 0, pitch: Cesium.Math.toRadians(-70), roll: 0 },
    });
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(home.lng, home.lat, 2_500_000),
      orientation: { heading: 0, pitch: Cesium.Math.toRadians(-60), roll: 0 },
      duration: 2.2,
    });

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(
              pos.coords.longitude,
              pos.coords.latitude,
              2_000_000
            ),
            orientation: { heading: 0, pitch: Cesium.Math.toRadians(-60), roll: 0 },
            duration: 1.5,
          });
        },
        () => {
          /* keep profile/default framing */
        },
        { enableHighAccuracy: false, maximumAge: 5 * 60_000, timeout: 4000 }
      );
    }

    // Camera controls — leave defaults, but enable zoom/tilt with sensible limits.
    const ctrl = scene.screenSpaceCameraController;
    ctrl.minimumZoomDistance = 800;
    ctrl.maximumZoomDistance = 20_000_000;

    // ---- Firm markers as entities (points + labels via popup) ----
    const entityToFirm = new Map<string, Firm>();
    for (const firm of FIRMS) {
      const isMatch = !!hasProfile && !!matchingFirmIds?.has(firm.id);
      const isDim = !!hasProfile && !isMatch;
      const baseColor = isMatch ? FIT_GREEN : isDim ? DIM : OXBLOOD;
      const baseSize = isMatch ? 14 : 10;
      const ent = viewer.entities.add({
        id: `firm:${firm.id}`,
        position: Cesium.Cartesian3.fromDegrees(firm.lng, firm.lat),
        point: {
          pixelSize: baseSize,
          color: baseColor.withAlpha(0.95),
          outlineColor: Cesium.Color.WHITE.withAlpha(0.6),
          outlineWidth: 1.5,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
      });
      entityToFirm.set(ent.id as string, firm);
    }

    // ---- Hover + click handling via ScreenSpaceEventHandler ----
    const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    let lastHoveredId: string | null = null;
    let selectedId: string | null = null;

    const restyle = (id: string) => {
      const firm = entityToFirm.get(`firm:${id}`);
      if (!firm) return;
      const ent = viewer.entities.getById(`firm:${id}`);
      if (!ent || !ent.point) return;
      const isMatch = !!hasProfile && !!matchingFirmIds?.has(firm.id);
      const isDim = !!hasProfile && !isMatch;
      const isSelected = id === selectedId;
      const isHover = id === lastHoveredId;
      const baseColor = isMatch ? FIT_GREEN : isDim ? DIM : OXBLOOD;
      const color = isSelected ? SELECT_BLUE : baseColor;
      const size = isSelected ? 22 : isHover ? (isMatch ? 18 : 14) : isMatch ? 14 : 10;
      ent.point.pixelSize = new Cesium.ConstantProperty(size);
      ent.point.color = new Cesium.ConstantProperty(color.withAlpha(isDim && !isSelected ? 0.6 : 0.98));
      ent.point.outlineWidth = new Cesium.ConstantProperty(isSelected ? 2.5 : 1.5);
    };

    handler.setInputAction((m: Cesium.ScreenSpaceEventHandler.MotionEvent) => {
      const picked = scene.pick(m.endPosition);
      const id = picked?.id?.id as string | undefined;
      const firmId = id && id.startsWith('firm:') ? id.slice(5) : null;
      if (firmId !== lastHoveredId) {
        const prev = lastHoveredId;
        lastHoveredId = firmId;
        if (prev) restyle(prev);
        if (firmId) restyle(firmId);
        const f = firmId ? entityToFirm.get(`firm:${firmId}`) ?? null : null;
        setHoveredFirm(f);
        scene.canvas.style.cursor = firmId ? 'pointer' : '';
      }
      // Position the tooltip if we have a hover target.
      const tip = tooltipRef.current;
      if (tip) {
        if (firmId) {
          tip.style.transform = `translate(${m.endPosition.x}px, ${m.endPosition.y}px)`;
          tip.dataset.visible = 'true';
        } else {
          tip.dataset.visible = 'false';
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    handler.setInputAction((c: Cesium.ScreenSpaceEventHandler.PositionedEvent) => {
      const picked = scene.pick(c.position);
      const id = picked?.id?.id as string | undefined;
      if (!id || !id.startsWith('firm:')) return;
      const firmId = id.slice(5);
      const prev = selectedId;
      selectedId = firmId;
      if (prev) restyle(prev);
      restyle(firmId);
      onFirmClickRef.current(firmId);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    return () => {
      handler.destroy();
      if (tileset) scene.primitives.remove(tileset);
      viewer.destroy();
    };
  }, [keysReady, ionToken, googleKey, profileCoord?.lat, profileCoord?.lng, hasProfile, matchingFirmIds]);

  if (!keysReady) {
    return (
      <div className="cesium-globe cesium-globe--setup">
        <div className="cesium-setup-card">
          <h2 className="serif cesium-setup-title">Photorealistic globe — setup needed</h2>
          <p className="cesium-setup-text">
            The 3D globe runs on <strong>CesiumJS</strong> with{' '}
            <strong>Google Photorealistic 3D Tiles</strong>. A single key is required:
          </p>
          <ol className="cesium-setup-list">
            <li>
              <span className="mono">VITE_CESIUM_ION_TOKEN</span> — free at{' '}
              <a
                href="https://ion.cesium.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                ion.cesium.com
              </a>{' '}
              (uses the Ion-hosted Google Photorealistic 3D Tiles asset 2275207).
            </li>
            <li className="cesium-setup-optional">
              <span className="mono">VITE_GOOGLE_3D_TILES_KEY</span>{' '}
              <em>(optional)</em> — for the direct Google Map Tiles endpoint.
            </li>
          </ol>
          <p className="cesium-setup-text">
            Copy <span className="mono">.env.example</span> →{' '}
            <span className="mono">.env.local</span>, paste your Ion token, then
            restart <span className="mono">npm run dev</span>.
          </p>
        </div>
      </div>
    );
  }

  const tipJob = hoveredFirm ? topJobByFirm.get(hoveredFirm.id) ?? null : null;
  const tipCount = hoveredFirm ? roleCountByFirm.get(hoveredFirm.id) ?? 0 : 0;

  return (
    <div className="cesium-globe">
      <div ref={hostRef} className="cesium-globe-host" />
      <div ref={tooltipRef} className="globe-tip" data-visible="false" role="tooltip">
        {hoveredFirm && (
          <div className="globe-tip-card">
            <span className="globe-tip-mark serif" aria-hidden="true">
              {monogram(hoveredFirm.name)}
            </span>
            <div className="globe-tip-body">
              <span className="globe-tip-name serif">{hoveredFirm.name}</span>
              <span className="globe-tip-meta mono">
                {hoveredFirm.city.toUpperCase()} ·{' '}
                {hoveredFirm.country.toUpperCase()}
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
