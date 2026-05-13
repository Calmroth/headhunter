import { useEffect, useRef } from 'react';
import type { Job } from '../data/jobs';
import { FIRMS_BY_ID } from '../data/firms';
import { DISCIPLINE_SHORT } from '../data/taxonomy';
import './JobRow.css';

type Props = {
  job: Job;
  isNew: boolean;
  isMatch?: boolean;
  isKbdFocused?: boolean;
  index?: number;
  onSeen: (id: string) => void;
  onOpen: (id: string) => void;
  onHoverFirm?: (firmId: string | null) => void;
};

export function JobRow({ job, isNew, isMatch, isKbdFocused, index, onSeen, onOpen, onHoverFirm }: Props) {
  const firm = FIRMS_BY_ID[job.firmId];
  const ref = useRef<HTMLButtonElement | null>(null);

  // Mark seen when the row scrolls into view for the first time.
  useEffect(() => {
    if (!isNew) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            window.setTimeout(() => onSeen(job.id), 1500);
            io.disconnect();
          }
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isNew, job.id, onSeen]);

  return (
    <button
      ref={ref}
      type="button"
      className={`job-row ${isNew ? 'is-new' : ''} ${isMatch ? 'is-match' : ''} ${isKbdFocused ? 'is-kbd-focused' : ''}`}
      data-job-index={index}
      data-job-id={job.id}
      data-job-firm-id={job.firmId}
      onMouseEnter={() => onHoverFirm?.(job.firmId)}
      onMouseLeave={() => onHoverFirm?.(null)}
      onFocus={() => onHoverFirm?.(job.firmId)}
      onBlur={() => onHoverFirm?.(null)}
      onClick={() => onOpen(job.id)}
      aria-label={`${job.title} at ${firm?.name ?? 'Unknown firm'}, ${firm?.city ?? ''}${isNew ? ', new posting' : ''}${isMatch ? ', profile fit' : ''}`}
    >
      {isNew && <span className="job-row-mark" aria-hidden="true" />}
      <span className="job-row-title serif">{job.title}</span>
      <span className="job-row-firm">{firm?.name ?? 'Unknown firm'}</span>
      <span className="job-row-meta mono">
        {(firm?.city ?? '').toUpperCase()} · {DISCIPLINE_SHORT[job.discipline]} ·{' '}
        {formatPosted(job.postedAt)}
        {isNew && <span className="job-row-new"> · NEW</span>}
        {isMatch && <span className="job-row-fit"> · FIT</span>}
      </span>
    </button>
  );
}

function formatPosted(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMs = Math.max(0, now - then);
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 60) return `${Math.max(1, mins)}M AGO`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}H AGO`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}D AGO`;
  const weeks = Math.floor(days / 7);
  return `${weeks}W AGO`;
}
