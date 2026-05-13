import { animate, stagger } from 'animejs';
import type L from 'leaflet';

const prefersReduce = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

type CircleMarkerWithPath = L.CircleMarker & {
  _path?: SVGPathElement;
};

/**
 * Hover pulse on a CircleMarker: radius springs up briefly then settles.
 * Driven by anime.js so the curve is uniform with the rest of the motion
 * vocabulary (outQuart on the lift, gentler outQuad on the return).
 */
export function pulseHover(marker: L.CircleMarker, baseRadius: number) {
  if (prefersReduce()) return;
  const state = { r: baseRadius };
  animate(state, {
    r: baseRadius * 1.35,
    duration: 160,
    ease: 'outQuart',
    onUpdate: () => marker.setRadius(state.r),
    onComplete: () => {
      animate(state, {
        r: baseRadius,
        duration: 240,
        ease: 'outQuad',
        onUpdate: () => marker.setRadius(state.r),
      });
    },
  });
}

/**
 * Click feedback: bigger radius pulse plus a one-shot ripple ring expanding
 * from the dot. The ripple is a temporary <circle> appended next to the
 * marker's <path> so it inherits Leaflet's transform/zoom anchoring.
 */
export function pulseClick(marker: L.CircleMarker, baseRadius: number) {
  if (prefersReduce()) return;

  // Bigger pulse on the marker itself.
  const state = { r: baseRadius };
  animate(state, {
    r: baseRadius * 1.8,
    duration: 200,
    ease: 'outQuart',
    onUpdate: () => marker.setRadius(state.r),
    onComplete: () => {
      animate(state, {
        r: baseRadius,
        duration: 320,
        ease: 'outQuart',
        onUpdate: () => marker.setRadius(state.r),
      });
    },
  });

  // Ripple ring — append next to the marker path inside the same SVG group
  // so Leaflet's pan/zoom transform carries it.
  const path = (marker as CircleMarkerWithPath)._path;
  if (!path?.parentNode) return;
  const stroke = path.getAttribute('stroke') ?? '#b8482e';
  const bbox = path.getBBox();
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  ring.setAttribute('cx', String(cx));
  ring.setAttribute('cy', String(cy));
  ring.setAttribute('r', String(baseRadius));
  ring.setAttribute('fill', 'none');
  ring.setAttribute('stroke', stroke);
  ring.setAttribute('stroke-width', '1.5');
  ring.setAttribute('pointer-events', 'none');
  ring.setAttribute('stroke-opacity', '0.7');
  path.parentNode.appendChild(ring);

  const ripple = { r: baseRadius, op: 0.7 };
  animate(ripple, {
    r: baseRadius * 4,
    op: 0,
    duration: 560,
    ease: 'outQuart',
    onUpdate: () => {
      ring.setAttribute('r', String(ripple.r));
      ring.setAttribute('stroke-opacity', String(ripple.op));
    },
    onComplete: () => ring.remove(),
  });
}

/**
 * Popup entry animation. Outer wrapper rises and scales; inner sections
 * stagger in just behind. Tip fades alongside the wrapper.
 *
 * IMPORTANT: do NOT animate `.leaflet-popup` itself — Leaflet writes an inline
 * transform on it for positioning. Animate the inner content wrapper instead.
 */
export function animatePopupIn(popupEl: HTMLElement) {
  if (prefersReduce()) return;

  const wrap = popupEl.querySelector<HTMLElement>('.leaflet-popup-content-wrapper');
  const tip = popupEl.querySelector<HTMLElement>('.leaflet-popup-tip');
  if (wrap) {
    animate(wrap, {
      opacity: [0, 1],
      translateY: [10, 0],
      scale: [0.94, 1],
      duration: 320,
      ease: 'outQuart',
    });
  }
  if (tip) {
    animate(tip, {
      opacity: [0, 1],
      duration: 220,
      ease: 'outQuart',
    });
  }

  const sections = popupEl.querySelectorAll<HTMLElement>(
    '.firm-popup-head, .firm-popup-divider, .firm-popup-section'
  );
  if (sections.length > 0) {
    animate(sections, {
      opacity: [0, 1],
      translateY: [6, 0],
      duration: 280,
      delay: stagger(45, { start: 90 }),
      ease: 'outQuart',
    });
  }
}
