import { useEffect, useState } from 'react';
import type { Job } from '../data/jobs';
import { FIRMS_BY_ID } from '../data/firms';
import './JobApply.css';

type Draft = { name: string; email: string; portfolio: string; note: string };
const draftKey = (jobId: string) => `hh.apply.${jobId}`;
function loadDraft(jobId: string): Partial<Draft> | null {
  try {
    const raw = window.localStorage.getItem(draftKey(jobId));
    return raw ? (JSON.parse(raw) as Partial<Draft>) : null;
  } catch {
    return null;
  }
}
function saveDraft(jobId: string, d: Draft) {
  try {
    window.localStorage.setItem(draftKey(jobId), JSON.stringify(d));
  } catch {
    /* unavailable */
  }
}
function clearDraft(jobId: string) {
  try {
    window.localStorage.removeItem(draftKey(jobId));
  } catch {
    /* unavailable */
  }
}

type Props = {
  job: Job;
  applicantName?: string;
  applicantEmail?: string;
  onBack: () => void;
};

export function JobApply({ job, applicantName = '', applicantEmail = '', onBack }: Props) {
  const firm = FIRMS_BY_ID[job.firmId];
  const draft = loadDraft(job.id);
  const [name, setName] = useState(draft?.name ?? applicantName);
  const [email, setEmail] = useState(draft?.email ?? applicantEmail);
  const [portfolio, setPortfolio] = useState(draft?.portfolio ?? '');
  const [note, setNote] = useState(draft?.note ?? '');
  const [submitted, setSubmitted] = useState(false);
  const [restored, setRestored] = useState<boolean>(!!draft);

  // Persist while typing, debounced via microtask coalescing.
  useEffect(() => {
    saveDraft(job.id, { name, email, portfolio, note });
  }, [job.id, name, email, portfolio, note]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearDraft(job.id);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="job-apply">
        <div className="job-apply-inner">
          <h1 className="serif job-apply-title">Application sent</h1>
          <p className="job-apply-text">
            Your application for <strong>{job.title}</strong> at{' '}
            <strong>{firm?.name ?? 'this studio'}</strong> has been forwarded. They'll be in
            touch directly.
          </p>
          <button type="button" className="job-apply-submit" onClick={onBack}>
            Back to role
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="job-apply">
      <div className="job-apply-inner">
        <button type="button" className="job-apply-back" onClick={onBack}>
          <span aria-hidden="true">←</span>
          <span>Back to role</span>
        </button>

        <header className="job-apply-header">
          <p className="mono job-apply-eyebrow">
            APPLY · {(firm?.city ?? '').toUpperCase()} · {firm?.country.toUpperCase() ?? ''}
          </p>
          <h1 className="serif job-apply-title">{job.title}</h1>
          <p className="job-apply-firm serif">{firm?.name ?? 'Unknown firm'}</p>
        </header>

        {restored && (
          <p className="mono job-apply-restored" role="status">
            Draft restored from last visit.{' '}
            <button
              type="button"
              className="job-apply-restored-link"
              onClick={() => {
                setName(applicantName);
                setEmail(applicantEmail);
                setPortfolio('');
                setNote('');
                clearDraft(job.id);
                setRestored(false);
              }}
            >
              Start over
            </button>
          </p>
        )}

        <form className="job-apply-form" onSubmit={onSubmit}>
          <label className="job-apply-field">
            <span className="mono">Full name</span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </label>

          <label className="job-apply-field">
            <span className="mono">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </label>

          <label className="job-apply-field">
            <span className="mono">Portfolio URL</span>
            <input
              type="url"
              placeholder="https://"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
            />
          </label>

          <label className="job-apply-field">
            <span className="mono">A short note (optional)</span>
            <textarea
              rows={5}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={`Why ${firm?.name ?? 'this studio'}? Anything else they should know.`}
            />
          </label>

          <button type="submit" className="job-apply-submit">
            Send application
          </button>
          <p className="mono job-apply-hint">
            Prototype · No data is sent. This is a stand-in for the real apply flow.
          </p>
        </form>
      </div>
    </main>
  );
}
