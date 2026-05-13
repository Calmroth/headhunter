import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './FirmEmblem3D.css';

type Props = {
  /** Monogram text to engrave on the front face. */
  monogram: string;
  /** Stable seed (e.g. firm id) so each firm gets a consistent geometry. */
  seed: string;
};

/**
 * Slowly-rotating extruded medallion bearing a firm's monogram.
 * Pointer-follow tilt, soft ambient lighting, additive rim wireframe.
 */
export function FirmEmblem3D({ monogram, seed }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
    } catch {
      host.classList.add('firm-emblem-3d--unsupported');
      return;
    }
    renderer.setClearAlpha(0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.set(0, 0, 5);

    const ambient = new THREE.AmbientLight(0xfff1de, 0.55);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xfff5e6, 1.1);
    key.position.set(2, 3, 4);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xb8482e, 0.4);
    fill.position.set(-3, -2, 2);
    scene.add(fill);

    // Medallion: extruded rounded square shape.
    const shape = new THREE.Shape();
    const w = 1.4;
    const r = 0.2;
    shape.moveTo(-w + r, -w);
    shape.lineTo(w - r, -w);
    shape.quadraticCurveTo(w, -w, w, -w + r);
    shape.lineTo(w, w - r);
    shape.quadraticCurveTo(w, w, w - r, w);
    shape.lineTo(-w + r, w);
    shape.quadraticCurveTo(-w, w, -w, w - r);
    shape.lineTo(-w, -w + r);
    shape.quadraticCurveTo(-w, -w, -w + r, -w);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.28,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 4,
      curveSegments: 12,
    };
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center();

    // Front-face monogram texture.
    const monogramTex = makeMonogramTexture(monogram);

    // Materials: front (textured), sides + back (solid ink).
    const matFront = new THREE.MeshStandardMaterial({
      map: monogramTex,
      color: 0xf3ece0,
      roughness: 0.55,
      metalness: 0.15,
    });
    const matSide = new THREE.MeshStandardMaterial({
      color: 0x2a221d,
      roughness: 0.7,
      metalness: 0.2,
    });

    // Solid ink body; monogram lives on a separate plane glued to the front face.
    const medallion = new THREE.Mesh(geo, matSide);
    scene.add(medallion);

    const planeGeo = new THREE.PlaneGeometry(w * 2 - 0.08, w * 2 - 0.08);
    const plane = new THREE.Mesh(planeGeo, matFront);
    plane.position.z = extrudeSettings.depth! / 2 + 0.0001 + extrudeSettings.bevelThickness!;
    medallion.add(plane);

    // Rim wireframe — adds craft & catches light edges.
    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo, 30),
      new THREE.LineBasicMaterial({ color: 0xb8482e, transparent: true, opacity: 0.4 })
    );
    medallion.add(wire);

    // Seed-driven base rotation so each firm reads distinct.
    const seedNum = hashSeed(seed);
    medallion.rotation.x = (seedNum % 100) / 100 * 0.4 - 0.2;
    medallion.rotation.y = ((seedNum * 7) % 100) / 100 * 0.6 - 0.3;

    // Sizing.
    let width = 0;
    let height = 0;
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

    // Pointer tilt — relative to host element, with smoothing.
    const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      ptr.tx = (nx - 0.5) * 2;
      ptr.ty = (ny - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

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

    let raf = 0;
    let last = performance.now();

    function tick(now: number) {
      const dt = Math.min(32, now - last);
      last = now;
      const step = dt / 16.6667;

      // Smooth pointer toward target.
      ptr.x += (ptr.tx - ptr.x) * 0.07 * step;
      ptr.y += (ptr.ty - ptr.y) * 0.07 * step;

      // Slow autorotation + pointer-driven tilt.
      medallion.rotation.y += 0.004 * step;
      medallion.rotation.x += (ptr.y * 0.3 - medallion.rotation.x) * 0.05 * step;
      const ySway = ptr.x * 0.6;
      medallion.rotation.z += (ptr.x * 0.05 - medallion.rotation.z) * 0.05 * step;
      camera.position.x += (ySway * 0.3 - camera.position.x) * 0.05 * step;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      if (visible && !reduced) raf = requestAnimationFrame(tick);
    }

    if (reduced) tick(performance.now());
    else raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
      geo.dispose();
      planeGeo.dispose();
      (wire.geometry as THREE.BufferGeometry).dispose();
      (wire.material as THREE.Material).dispose();
      matFront.dispose();
      matSide.dispose();
      monogramTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [monogram, seed, reduced]);

  return (
    <div ref={hostRef} className="firm-emblem-3d" aria-hidden="true">
      <noscript />
    </div>
  );
}

function hashSeed(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function makeMonogramTexture(text: string): THREE.Texture {
  const size = 512;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  // Background — warm paper.
  ctx.fillStyle = '#f3ece0';
  ctx.fillRect(0, 0, size, size);
  // Subtle vignette.
  const grad = ctx.createRadialGradient(size / 2, size / 2, size * 0.2, size / 2, size / 2, size * 0.7);
  grad.addColorStop(0, 'rgba(184,72,46,0)');
  grad.addColorStop(1, 'rgba(184,72,46,0.10)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  // Monogram glyph.
  ctx.fillStyle = '#2a221d';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `500 ${Math.round(size * 0.5)}px 'Fraunces', Georgia, serif`;
  ctx.fillText(text, size / 2, size / 2 + size * 0.02);
  // Hairline border inset.
  ctx.strokeStyle = 'rgba(42,34,29,0.18)';
  ctx.lineWidth = 2;
  const inset = 28;
  ctx.strokeRect(inset, inset, size - inset * 2, size - inset * 2);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}
