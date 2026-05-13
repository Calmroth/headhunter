import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './ParticleField.css';

type Props = {
  /** Particles per 10,000 css px² (clamped 0.02–0.2). */
  density?: number;
  /** Max linking distance in world units. */
  linkDistance?: number;
  /** Cursor repel radius in world units. */
  repelRadius?: number;
};

/**
 * Three.js constellation: THREE.Points + dynamic THREE.LineSegments.
 * Mouse repel projected to z=0 plane; subtle camera parallax follows the pointer.
 * Spatial-hash for O(N·k) line pair finding instead of N².
 */
export function ParticleField({
  density = 0.06,
  linkDistance = 1.6,
  repelRadius = 1.6,
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // WebGL guard — if not supported, render nothing (CSS fallback in stylesheet).
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      });
    } catch {
      host.classList.add('particle-field--unsupported');
      return;
    }

    renderer.setClearAlpha(0);
    host.appendChild(renderer.domElement);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 10);

    let width = 0;
    let height = 0;
    let worldW = 0;
    let worldH = 0;
    const DEPTH = 6; // z range for particle spread

    type P = {
      x: number; y: number; z: number;
      vx: number; vy: number; vz: number;
    };
    let particles: P[] = [];

    // --- Points geometry -----
    const pointsGeo = new THREE.BufferGeometry();
    const pointsMat = new THREE.PointsMaterial({
      size: 14,
      sizeAttenuation: false,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      map: makeDotTexture(),
      color: new THREE.Color('#b8482e'), // oxblood
      opacity: 0.85,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);
    scene.add(points);

    // --- Lines geometry — we size to a max edge budget and update draw range each frame.
    const MAX_EDGES = 1200; // upper bound; we draw up to this many segments
    const linePos = new Float32Array(MAX_EDGES * 2 * 3);
    const lineCol = new Float32Array(MAX_EDGES * 2 * 3);
    const lineGeo = new THREE.BufferGeometry();
    const linePosAttr = new THREE.BufferAttribute(linePos, 3);
    const lineColAttr = new THREE.BufferAttribute(lineCol, 3);
    linePosAttr.setUsage(THREE.DynamicDrawUsage);
    lineColAttr.setUsage(THREE.DynamicDrawUsage);
    lineGeo.setAttribute('position', linePosAttr);
    lineGeo.setAttribute('color', lineColAttr);
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // Mouse — NDC + world point on z=0 plane.
    const ndc = new THREE.Vector2(-2, -2); // out of frame initially
    const mouseWorld = new THREE.Vector3();
    let mouseActive = false;
    const ray = new THREE.Raycaster();
    const zPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    // Compute world-space viewport at z=0 for given camera.
    const updateWorldExtents = () => {
      const dist = camera.position.z;
      const fovY = (camera.fov * Math.PI) / 180;
      worldH = 2 * Math.tan(fovY / 2) * dist;
      worldW = worldH * camera.aspect;
    };

    const seed = () => {
      const targetByArea = (width * height) / 10_000 * density;
      const target = Math.max(48, Math.min(360, Math.round(targetByArea)));
      const arr: P[] = [];
      for (let i = 0; i < target; i++) {
        arr.push({
          x: (Math.random() - 0.5) * worldW,
          y: (Math.random() - 0.5) * worldH,
          z: (Math.random() - 0.5) * DEPTH,
          vx: (Math.random() - 0.5) * 0.01,
          vy: (Math.random() - 0.5) * 0.01,
          vz: (Math.random() - 0.5) * 0.005,
        });
      }
      particles = arr;
      const posBuf = new THREE.BufferAttribute(new Float32Array(particles.length * 3), 3);
      posBuf.setUsage(THREE.DynamicDrawUsage);
      pointsGeo.setAttribute('position', posBuf);
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      updateWorldExtents();
      // Re-seed if particle count target changed materially.
      const desired = Math.max(
        48,
        Math.min(360, Math.round((width * height) / 10_000 * density))
      );
      if (Math.abs(desired - particles.length) > 24 || particles.length === 0) {
        seed();
      }
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ndc.x = (x / rect.width) * 2 - 1;
      ndc.y = -((y / rect.height) * 2 - 1);
      ray.setFromCamera(ndc, camera);
      ray.ray.intersectPlane(zPlane, mouseWorld);
      mouseActive = true;
    };
    const onPointerLeave = () => {
      mouseActive = false;
      ndc.set(-2, -2);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);

    // Visibility — pause when tab hidden.
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

    // --- Spatial hash for line pairs ---
    const cellSize = linkDistance;
    const grid = new Map<number, number[]>();
    const cellKey = (cx: number, cy: number, cz: number) =>
      ((cx + 4096) * 8192 + (cy + 4096)) * 8192 + (cz + 4096);

    const repelR2 = repelRadius * repelRadius;
    const linkD2 = linkDistance * linkDistance;

    let raf = 0;
    let last = performance.now();

    function tick(now: number) {
      const dt = Math.min(32, now - last);
      last = now;
      const step = dt / 16.6667;

      // Subtle camera parallax follows cursor (NDC).
      const targetX = ndc.x * 0.4;
      const targetY = ndc.y * 0.25;
      camera.position.x += (targetX - camera.position.x) * 0.04 * step;
      camera.position.y += (targetY - camera.position.y) * 0.04 * step;
      camera.lookAt(0, 0, 0);

      // Update particles.
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (mouseActive) {
          const dx = p.x - mouseWorld.x;
          const dy = p.y - mouseWorld.y;
          const dz = p.z * 0.4; // shallow z influence so foreground reacts more
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < repelR2 && d2 > 0.0001) {
            const d = Math.sqrt(d2);
            const force = (1 - d / repelRadius) * 0.06;
            p.vx += (dx / d) * force * step;
            p.vy += (dy / d) * force * step;
            p.vz += (dz / d) * force * 0.5 * step;
          }
        }

        p.x += p.vx * step;
        p.y += p.vy * step;
        p.z += p.vz * step;

        // friction
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.vz *= 0.94;

        // gentle drift to avoid full freeze
        if (Math.abs(p.vx) < 0.003) p.vx += (Math.random() - 0.5) * 0.003;
        if (Math.abs(p.vy) < 0.003) p.vy += (Math.random() - 0.5) * 0.003;

        // wrap in x/y, soft bounce in z
        const halfW = worldW / 2 + 0.5;
        const halfH = worldH / 2 + 0.5;
        if (p.x < -halfW) p.x = halfW;
        else if (p.x > halfW) p.x = -halfW;
        if (p.y < -halfH) p.y = halfH;
        else if (p.y > halfH) p.y = -halfH;
        if (p.z < -DEPTH / 2) { p.z = -DEPTH / 2; p.vz = Math.abs(p.vz); }
        else if (p.z > DEPTH / 2) { p.z = DEPTH / 2; p.vz = -Math.abs(p.vz); }
      }

      // Write point positions.
      const posAttr = pointsGeo.getAttribute('position') as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        posArr[i * 3 + 0] = p.x;
        posArr[i * 3 + 1] = p.y;
        posArr[i * 3 + 2] = p.z;
      }
      posAttr.needsUpdate = true;

      // Rebuild spatial grid.
      grid.clear();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const cx = Math.floor(p.x / cellSize);
        const cy = Math.floor(p.y / cellSize);
        const cz = Math.floor(p.z / cellSize);
        const key = cellKey(cx, cy, cz);
        let bucket = grid.get(key);
        if (!bucket) {
          bucket = [];
          grid.set(key, bucket);
        }
        bucket.push(i);
      }

      // Find edges via neighbor cells.
      let edge = 0;
      const maxEdges = MAX_EDGES;
      outer: for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const cx = Math.floor(a.x / cellSize);
        const cy = Math.floor(a.y / cellSize);
        const cz = Math.floor(a.z / cellSize);
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            for (let dz = -1; dz <= 1; dz++) {
              const bucket = grid.get(cellKey(cx + dx, cy + dy, cz + dz));
              if (!bucket) continue;
              for (let k = 0; k < bucket.length; k++) {
                const j = bucket[k];
                if (j <= i) continue;
                const b = particles[j];
                const ex = a.x - b.x;
                const ey = a.y - b.y;
                const ez = a.z - b.z;
                const d2 = ex * ex + ey * ey + ez * ez;
                if (d2 < linkD2) {
                  const t = 1 - d2 / linkD2; // 0..1
                  const o = edge * 6;
                  linePos[o + 0] = a.x;
                  linePos[o + 1] = a.y;
                  linePos[o + 2] = a.z;
                  linePos[o + 3] = b.x;
                  linePos[o + 4] = b.y;
                  linePos[o + 5] = b.z;
                  // Oxblood-tinted, intensity by closeness
                  const r = 0.72 * t;
                  const g = 0.28 * t;
                  const bch = 0.18 * t;
                  lineCol[o + 0] = r;
                  lineCol[o + 1] = g;
                  lineCol[o + 2] = bch;
                  lineCol[o + 3] = r;
                  lineCol[o + 4] = g;
                  lineCol[o + 5] = bch;
                  edge++;
                  if (edge >= maxEdges) break outer;
                }
              }
            }
          }
        }
      }
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;
      lineGeo.setDrawRange(0, edge * 2);

      renderer.render(scene, camera);

      if (visible && !reduced) raf = requestAnimationFrame(tick);
    }

    if (reduced) {
      // One static frame for reduced-motion users.
      tick(performance.now());
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      pointsGeo.dispose();
      pointsMat.dispose();
      (pointsMat.map as THREE.Texture | null)?.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [density, linkDistance, repelRadius, reduced]);

  return <div ref={hostRef} className="particle-field" aria-hidden="true" />;
}

/** Soft round point sprite drawn once and reused. */
function makeDotTexture(): THREE.Texture {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.45, 'rgba(255,255,255,0.55)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}
