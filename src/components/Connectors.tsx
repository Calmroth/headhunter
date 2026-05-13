import { useEffect, useState } from 'react';
import './Connectors.css';

type Props = {
  /** ID of the firm to connect to its open roles. Null/undefined hides the layer. */
  firmId: string | null;
};

type Line = { d: string };

/**
 * SVG overlay that draws curved lines from the focused/hovered firm row (left
 * rail) to every job row that belongs to that firm (right rail). Pointer
 * events disabled so it never blocks interaction.
 */
export function Connectors({ firmId }: Props) {
  const [lines, setLines] = useState<Line[]>([]);
  const [viewport, setViewport] = useState<{ w: number; h: number }>({
    w: typeof window !== 'undefined' ? window.innerWidth : 0,
    h: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!firmId) {
      setLines([]);
      return;
    }

    const compute = () => {
      const firmEl = document.querySelector<HTMLElement>(
        `.firm-row[data-firm-id="${CSS.escape(firmId)}"]`
      );
      const jobEls = document.querySelectorAll<HTMLElement>(
        `.job-row[data-job-firm-id="${CSS.escape(firmId)}"]`
      );
      if (!firmEl || jobEls.length === 0) {
        setLines([]);
        return;
      }
      const fRect = firmEl.getBoundingClientRect();
      const src = {
        x: fRect.right,
        y: fRect.top + fRect.height / 2,
      };
      const out: Line[] = [];
      jobEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        const dst = { x: r.left, y: r.top + r.height / 2 };
        const dx = dst.x - src.x;
        // Bezier control points pull the curve out into the map area so the
        // line "swings" rather than going straight across the page.
        const c1 = { x: src.x + dx * 0.35, y: src.y };
        const c2 = { x: src.x + dx * 0.65, y: dst.y };
        out.push({
          d: `M ${src.x} ${src.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${dst.x} ${dst.y}`,
        });
      });
      setLines(out);
    };

    compute();
    // Recompute as the user scrolls either rail.
    const scrollables = document.querySelectorAll<HTMLElement>(
      '.firms-scroll, .jobs-scroll'
    );
    scrollables.forEach((s) => s.addEventListener('scroll', compute, { passive: true }));
    window.addEventListener('resize', compute);
    // Recompute on every animation frame for the duration the layer is active.
    // Cheap: a handful of nodes; lets list reorder/animation track without lag.
    let raf = 0;
    let last = 0;
    const loop = (t: number) => {
      if (t - last > 80) {
        last = t;
        compute();
      }
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);
    return () => {
      scrollables.forEach((s) => s.removeEventListener('scroll', compute));
      window.removeEventListener('resize', compute);
      window.cancelAnimationFrame(raf);
    };
  }, [firmId, viewport.w, viewport.h]);

  if (lines.length === 0) return null;

  return (
    <svg
      className="connectors"
      width={viewport.w}
      height={viewport.h}
      viewBox={`0 0 ${viewport.w} ${viewport.h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {lines.map((l, i) => (
        <path
          key={i}
          className="connectors-line"
          d={l.d}
          fill="none"
          style={{ animationDelay: `${i * 40}ms` }}
        />
      ))}
    </svg>
  );
}
