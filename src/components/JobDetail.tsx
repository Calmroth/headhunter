import type { Job } from '../data/jobs';
import { FIRMS_BY_ID } from '../data/firms';
import { WEBSITES } from '../data/websites';
import { DISCIPLINE_SHORT } from '../data/taxonomy';
import { ParticleField } from './ParticleField';
import { FirmEmblem3D } from './FirmEmblem3D';
import { monogram } from '../utils/monogram';
import './JobDetail.css';

type Props = {
  job: Job;
  onBack: () => void;
  /** Retained for callers, no longer used — Apply now opens the firm's
   *  external site in a new tab so applicants land on the real listing. */
  onApply?: () => void;
};

export function JobDetail({ job, onBack }: Props) {
  const firm = FIRMS_BY_ID[job.firmId];
  // The "real application site" we can point at without per-job URLs is the
  // firm's own site. Most firms park hiring under /careers; we try that and
  // let the browser surface a 404 if the firm doesn't follow the convention
  // (rather than 404 the user ourselves by guessing a path that doesn't
  // exist). When we have no website on file, fall back to a Google search
  // scoped to the role title + firm name.
  const firmSite = WEBSITES[job.firmId];
  const applyUrl = firmSite
    ? `${firmSite.replace(/\/+$/, '')}/careers`
    : `https://www.google.com/search?q=${encodeURIComponent(
        `${firm?.name ?? job.firmId} ${job.title} apply`
      )}`;

  return (
    <main className="job-detail">
      <ParticleField />

      <div className="job-detail-inner">
        <button type="button" className="job-detail-back" onClick={onBack}>
          <span aria-hidden="true" className="job-detail-back-arrow">←</span>
          <span>Back to search</span>
        </button>

        <header className="job-detail-header">
          <div className="job-detail-header-emblem">
            <FirmEmblem3D monogram={monogram(firm?.name ?? '·')} seed={firm?.id ?? job.firmId} />
          </div>
          <div className="job-detail-header-text">
            <p className="mono job-detail-eyebrow">
              {(firm?.city ?? '').toUpperCase()} · {firm?.country.toUpperCase() ?? ''} ·{' '}
              {DISCIPLINE_SHORT[job.discipline]} · {job.seniority.toUpperCase()}
            </p>
            <h1 className="serif job-detail-title">{job.title}</h1>
            <p className="job-detail-firm serif">{firm?.name ?? 'Unknown firm'}</p>
          </div>
        </header>

        <section className="job-detail-meta">
          <Meta label="Discipline" value={job.discipline} />
          <Meta label="Seniority" value={job.seniority} />
          <Meta label="Location" value={firm ? `${firm.city}, ${firm.country}` : '—'} />
          <Meta label="Posted" value={formatPostedAbsolute(job.postedAt)} />
        </section>

        <section className="job-detail-body">
          <h2 className="serif">About the role</h2>
          <p>
            {firm?.name ?? 'This studio'} is hiring a <strong>{job.title}</strong> to join the
            team in {firm?.city ?? 'their studio'}. You'll work alongside a tight-knit group of
            designers, directors and producers on projects across brand, motion, and digital
            craft — shaping work that travels.
          </p>
          <h2 className="serif">What you'll do</h2>
          <ul>
            <li>Own the visual direction of {job.discipline.toLowerCase()} workstreams.</li>
            <li>Collaborate with creative and strategy leads from concept through delivery.</li>
            <li>Set the bar for craft across project teams and mentor more junior peers.</li>
            <li>Help shape the studio's point of view through writing, talks, or research.</li>
          </ul>
          <h2 className="serif">What we're looking for</h2>
          <ul>
            <li>{job.seniority}-level experience in {job.discipline.toLowerCase()} or adjacent fields.</li>
            <li>A portfolio that reads with a clear voice — taste, not just polish.</li>
            <li>Comfort working transparently with clients and team alike.</li>
          </ul>
        </section>

        <footer className="job-detail-footer">
          <a
            className="job-detail-apply"
            href={applyUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            Apply for this role
          </a>
          <p className="mono job-detail-hint">
            Opens {firm?.name ?? 'this studio'}
            {firmSite ? "'s careers page" : ' on Google'} in a new tab.
          </p>
        </footer>
      </div>
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="job-detail-meta-item">
      <span className="mono">{label}</span>
      <span className="job-detail-meta-value">{value}</span>
    </div>
  );
}

function formatPostedAbsolute(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}
