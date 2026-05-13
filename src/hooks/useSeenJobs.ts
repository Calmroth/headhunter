import { useCallback, useEffect, useState } from 'react';

const KEY = 'headhunter.seenJobs.v1';

function readSeen(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as string[];
    return new Set(parsed);
  } catch {
    return new Set();
  }
}

function writeSeen(set: Set<string>) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify([...set]));
  } catch {
    /* quota / private mode: silently no-op. NEW marks persist only this session. */
  }
}

export function useSeenJobs() {
  const [seen, setSeen] = useState<Set<string>>(() => readSeen());

  useEffect(() => {
    writeSeen(seen);
  }, [seen]);

  const markSeen = useCallback((id: string) => {
    setSeen((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const isSeen = useCallback((id: string) => seen.has(id), [seen]);

  return { isSeen, markSeen };
}
