import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

type Options = {
  intervalMs?: number;
  paused?: boolean;
};

/**
 * Cycles through examples on a timer. Returns the current index plus a fade key
 * the consumer can use to crossfade. With reduced motion, just swaps without
 * holding the same animation responsibility.
 */
export function useRotatingPlaceholder(examples: readonly string[], options: Options = {}) {
  const { intervalMs = 2600, paused = false } = options;
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (paused || examples.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % examples.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [paused, intervalMs, examples.length]);

  return {
    current: examples[index] ?? '',
    index,
    reduced,
  };
}
