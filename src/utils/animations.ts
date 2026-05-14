import { animate, createTimeline, stagger } from 'animejs';
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

type BeaconIntensity = 'primary' | 'ambient';

type BeaconConfig = {
  /** Initial stroke opacity for each ring. */
  startOpacity: number;
  /** Outer extent expressed as a multiple of baseRadius. */
  scale: number;
  /** Duration of one full pulse cycle (ms). */
  duration: number;
  /** Stroke width of each ring in SVG user units. */
  strokeWidth: number;
  /** Number of overlapping rings. Each is phased by duration / count. */
  rings: number;
};

const BEACON_CONFIG: Record<BeaconIntensity, BeaconConfig> = {
  // Primary: the "this is the selected firm" emphasis. One confident ring —
  // DESIGN.md calls for responsive motion, not choreographed; one expanding
  // outQuart ring at solid opacity carries the cue without turning the dot
  // into a radar transmitter.
  primary: {
    startOpacity: 0.7,
    scale: 3.4,
    duration: 1500,
    strokeWidth: 1.5,
    rings: 1,
  },
  // Ambient: the "you are here" cue on home-city dots. Slower than primary
  // so a screenful of them doesn't beat against the focused firm's cadence,
  // and so the eye still reads them as quieter siblings, not peers.
  ambient: {
    startOpacity: 0.3,
    scale: 2.6,
    duration: 2600,
    strokeWidth: 1,
    rings: 1,
  },
};

/**
 * Persistent beacon on a CircleMarker. A pulsing ring (or two overlapping
 * rings) that radiates outward from the dot, fades, and repeats. Used to
 * advertise the focused firm ("primary" intensity) and to mark home-city
 * firms ("ambient").
 *
 * Returns a `stop()` function that cancels the loop and removes the rings.
 * Caller is responsible for invoking it when the marker's state changes
 * (focus moves, firm leaves home-city set, marker unmounts).
 *
 * No-op (returns a noop stop) when prefers-reduced-motion is set.
 */
export function startBeacon(
  marker: L.CircleMarker,
  baseRadius: number,
  intensity: BeaconIntensity = 'primary'
): () => void {
  if (prefersReduce()) return () => {};

  const path = (marker as CircleMarkerWithPath)._path;
  if (!path?.parentNode) return () => {};

  const cfg = BEACON_CONFIG[intensity];
  const stroke = path.getAttribute('stroke') ?? '#b8482e';
  const bbox = path.getBBox();
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  const cleanups: Array<() => void> = [];
  const ringElements: SVGCircleElement[] = [];

  for (let i = 0; i < cfg.rings; i++) {
    const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ring.setAttribute('cx', String(cx));
    ring.setAttribute('cy', String(cy));
    ring.setAttribute('r', String(baseRadius));
    ring.setAttribute('fill', 'none');
    ring.setAttribute('stroke', stroke);
    ring.setAttribute('stroke-width', String(cfg.strokeWidth));
    ring.setAttribute('pointer-events', 'none');
    ring.setAttribute('stroke-opacity', '0');
    ring.classList.add('firm-beacon-ring', `firm-beacon-ring--${intensity}`);
    path.parentNode.appendChild(ring);
    ringElements.push(ring);

    const state = { r: baseRadius, op: cfg.startOpacity };
    const startRing = () => {
      const animation = animate(state, {
        r: baseRadius * cfg.scale,
        op: 0,
        duration: cfg.duration,
        ease: 'outQuart',
        loop: true,
        onUpdate: () => {
          ring.setAttribute('r', String(state.r));
          ring.setAttribute('stroke-opacity', String(state.op));
        },
      });
      cleanups.push(() => {
        try {
          (animation as unknown as { pause?: () => void }).pause?.();
        } catch {
          /* no-op */
        }
      });
    };

    if (i === 0) {
      startRing();
    } else {
      // Phase-offset subsequent rings so the pulses interleave instead of
      // stacking on top of each other.
      const delay = (cfg.duration / cfg.rings) * i;
      const timer = window.setTimeout(startRing, delay);
      cleanups.push(() => window.clearTimeout(timer));
    }
  }

  return () => {
    for (const fn of cleanups) fn();
    for (const ring of ringElements) ring.remove();
  };
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

/**
 * First-paint splash orchestration. Choreographs the brand chrome of the home
 * view as one timeline: wordmark → topbar actions → three columns (center
 * leads, rails follow) → searchbar → footer.
 *
 * Driven by `html.splash-pending` (set in index.html before first paint) so
 * the targets are hidden until the timeline overrides their opacity. The
 * class is removed as soon as the timeline begins, handing visibility
 * control to anime.js.
 *
 * Idempotent — safe to call more than once; subsequent calls are no-ops via
 * the `splashPlayed` module-level flag.
 *
 * Respects prefers-reduced-motion: clears `splash-pending` and returns,
 * leaving the chrome at its natural opacity.
 */
let splashPlayed = false;

export function playSplashIntro() {
  if (splashPlayed) return;
  splashPlayed = true;

  const root = document.documentElement;

  if (prefersReduce()) {
    root.classList.remove('splash-pending');
    return;
  }

  // GPU-prime the targets so transform/opacity don't trigger layout. Cleared
  // on timeline completion to avoid leaking will-change long-term.
  const primed: HTMLElement[] = [];
  const prime = (selector: string) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      el.style.willChange = 'transform, opacity';
      primed.push(el);
    });
  };
  prime('.wordmark');
  prime('.topbar-actions > *');
  prime('.stage > .firms');
  prime('.stage > .center-stage');
  prime('.stage > .jobs');
  prime('.search');
  prime('.app-footer');

  const tl = createTimeline({
    defaults: { ease: 'outQuart' },
    onComplete: () => {
      for (const el of primed) el.style.willChange = '';
    },
  });

  // Wordmark — the brand stamp lands first. Long, quiet rise.
  tl.add(
    '.wordmark',
    {
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 720,
    },
    0
  );

  // TopBar trailing actions (theme toggle, sign-in). Drift in from the right
  // so the entry direction reads as "settling into place" rather than "popping".
  tl.add(
    '.topbar-actions > *',
    {
      opacity: [0, 1],
      translateX: [10, 0],
      duration: 520,
      delay: stagger(80),
    },
    120
  );

  // Three columns. `from: 'center'` means MapView leads and the two rails
  // arrive a beat later — the map *is* the product, so the eye lands there
  // first and the supporting rails fill in around it.
  tl.add(
    '.stage > .firms, .stage > .center-stage, .stage > .jobs',
    {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 760,
      delay: stagger(90, { from: 'center' }),
    },
    220
  );

  // Search bar tucks under the map once the column has settled. outExpo gives
  // it a slightly punchier deceleration than the rest — it's the only
  // interactive surface in the entry, and the extra emphasis advertises that.
  tl.add(
    '.search',
    {
      opacity: [0, 1],
      translateY: [16, 0],
      scale: [0.985, 1],
      duration: 620,
      ease: 'outExpo',
    },
    480
  );

  // Footer byline last. Quietest curve, smallest distance — it's just
  // metadata, doesn't deserve attention, but shouldn't pop in cold either.
  tl.add(
    '.app-footer',
    {
      opacity: [0, 1],
      translateY: [6, 0],
      duration: 480,
      ease: 'outQuad',
    },
    560
  );

  // Hand opacity control over to anime.js — strip the CSS pre-hide. Done
  // immediately so the from-values in the timeline's first frame take effect
  // without a perceptible flash.
  root.classList.remove('splash-pending');
}
