import { useEffect, useMemo, useRef, useState } from 'react';
import { JOBS } from '../data/jobs';
import { FIRMS_BY_ID } from '../data/firms';
import { JobRow } from './JobRow';
import './JobsList.css';

type Props = {
  query: string;
  focusedCountryCode: string | null; // alpha-2
  focusedFirmId?: string | null;
  focusedRegionLabel: string | null;
  profileDisciplines?: ReadonlyArray<string>;
  matchingJobIds?: ReadonlySet<string>;
  filteredJobIds?: ReadonlySet<string>;
  hasProfile?: boolean;
  filtersActive?: boolean;
  showOnboard?: boolean;
  onDismissOnboard?: () => void;
  onSignIn?: () => void;
  isSeen: (id: string) => boolean;
  markSeen: (id: string) => void;
  onOpenJob: (id: string) => void;
  onClearRegion: () => void;
  onHoverFirm?: (firmId: string | null) => void;
};

const TOTAL_JOBS = JOBS.length;

export function JobsList({
  query,
  focusedCountryCode,
  focusedFirmId,
  focusedRegionLabel,
  profileDisciplines,
  matchingJobIds,
  filteredJobIds,
  hasProfile,
  filtersActive,
  showOnboard,
  onDismissOnboard,
  onSignIn,
  isSeen,
  markSeen,
  onOpenJob,
  onClearRegion,
  onHoverFirm,
}: Props) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = JOBS.filter((j) => {
      const firm = FIRMS_BY_ID[j.firmId];
      if (!firm) return false;
      if (filteredJobIds && !filteredJobIds.has(j.id)) return false;
      if (focusedFirmId && j.firmId !== focusedFirmId) return false;
      if (focusedCountryCode && firm.countryCode !== focusedCountryCode) return false;
      if (!q) return true;
      return (
        j.title.toLowerCase().includes(q) ||
        firm.name.toLowerCase().includes(q) ||
        firm.city.toLowerCase().includes(q) ||
        j.discipline.toLowerCase().includes(q)
      );
    });

    // Sort: agent-found + unseen first, then by recency.
    return list.sort((a, b) => {
      const aNew = !!a.agentFound && !isSeen(a.id);
      const bNew = !!b.agentFound && !isSeen(b.id);
      if (aNew !== bNew) return aNew ? -1 : 1;

      // Profile-fit (signed-in): roles matching the user's disciplines float to the top of remaining.
      if (profileDisciplines && profileDisciplines.length > 0) {
        const aFit = profileDisciplines.includes(a.discipline) ? 1 : 0;
        const bFit = profileDisciplines.includes(b.discipline) ? 1 : 0;
        if (aFit !== bFit) return bFit - aFit;
      }

      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    });
  }, [query, focusedCountryCode, focusedFirmId, profileDisciplines, filteredJobIds, isSeen]);

  const label = focusedRegionLabel ?? 'Worldwide';
  const count = filtered.length;

  // Keyboard list nav. Tracks an index into `filtered`. j/k step, Enter opens.
  const [kbdIndex, setKbdIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Reset focus index whenever the result set changes.
    setKbdIndex(null);
  }, [count, focusedCountryCode, focusedFirmId, query]);

  useEffect(() => {
    const isTyping = () => {
      const el = document.activeElement as HTMLElement | null;
      if (!el) return false;
      const tag = el.tagName;
      return (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        el.isContentEditable
      );
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTyping()) return;
      if (filtered.length === 0) return;

      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault();
        setKbdIndex((i) => {
          const next = i === null ? 0 : Math.min(filtered.length - 1, i + 1);
          return next;
        });
      } else if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault();
        setKbdIndex((i) => {
          const next = i === null ? 0 : Math.max(0, i - 1);
          return next;
        });
      } else if (e.key === 'Enter') {
        if (kbdIndex !== null && filtered[kbdIndex]) {
          e.preventDefault();
          onOpenJob(filtered[kbdIndex].id);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [filtered, kbdIndex, onOpenJob]);

  // Keep the kbd-focused row in view.
  useEffect(() => {
    if (kbdIndex === null || !scrollRef.current) return;
    const node = scrollRef.current.querySelector<HTMLElement>(
      `[data-job-index="${kbdIndex}"]`
    );
    node?.scrollIntoView({ block: 'nearest' });
  }, [kbdIndex]);

  // Show pulse on the count cell when filters/region change.
  const pulseKey = `${count}-${focusedCountryCode ?? 'all'}-${focusedFirmId ?? 'none'}`;

  return (
    <aside className="jobs">
      <header className="jobs-header">
        <div className="jobs-label-row">
          <span className="mono jobs-label">
            {label.toUpperCase()} ·{' '}
            <span key={pulseKey} className="jobs-label-count">
              {count}
            </span>{' '}
            {count === 1 ? 'ROLE' : 'ROLES'}
          </span>
          {focusedCountryCode && (
            <button type="button" className="jobs-clear mono" onClick={onClearRegion}>
              Clear region
            </button>
          )}
        </div>
        {filtersActive && count < TOTAL_JOBS && (
          <p className="mono jobs-filter-meta">
            Showing {count} of {TOTAL_JOBS}
          </p>
        )}
      </header>

      <div className="jobs-scroll rail-scroll" ref={scrollRef}>
        {showOnboard && (
          <div className="jobs-onboard" role="note">
            <p className="jobs-onboard-body">
              <button
                type="button"
                className="jobs-onboard-link"
                onClick={onSignIn}
              >
                Sign in with LinkedIn
              </button>{' '}
              to highlight roles that fit your profile, or pick a country to
              narrow down.
            </p>
            <button
              type="button"
              className="jobs-onboard-dismiss mono"
              aria-label="Dismiss"
              onClick={onDismissOnboard}
            >
              ×
            </button>
          </div>
        )}
        {count === 0 ? (
          <div className="jobs-empty">
            <p className="jobs-empty-body">
              No open roles here yet. We'll let you know when one appears.
            </p>
          </div>
        ) : (
          filtered.map((j, idx) => {
            const isNew = !!j.agentFound && !isSeen(j.id);
            const isMatch = !!hasProfile && !!matchingJobIds?.has(j.id);
            return (
              <JobRow
                key={j.id}
                job={j}
                isNew={isNew}
                isMatch={isMatch}
                isKbdFocused={kbdIndex === idx}
                index={idx}
                onSeen={markSeen}
                onOpen={onOpenJob}
                onHoverFirm={onHoverFirm}
              />
            );
          })
        )}
      </div>
    </aside>
  );
}
