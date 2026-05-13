import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './LinkedInSignIn.css';

type Props = {
  open: boolean;
  onClose: () => void;
  onAuthorized: () => void;
};

type Stage = 'consent' | 'authorizing' | 'success' | 'error';

const AUTHORIZE_MS = 700;
const SUCCESS_HOLD_MS = 1700;
const FAILURE_RATE = 0.15;
const ERROR_REASONS = [
  'LinkedIn declined the request.',
  'Connection to LinkedIn timed out.',
] as const;

export function LinkedInSignIn({ open, onClose, onAuthorized }: Props) {
  const [stage, setStage] = useState<Stage>('consent');
  const [errorReason, setErrorReason] = useState<string>(ERROR_REASONS[0]);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const pendingTimers = useRef<number[]>([]);
  // Hold the latest onClose in a ref so the setup effect doesn't re-run (and
  // cancel pending timers) every time the parent passes a new inline handler.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Clear any in-flight timers (authorize delay / success auto-close).
  const clearPending = () => {
    pendingTimers.current.forEach((t) => window.clearTimeout(t));
    pendingTimers.current = [];
  };

  useEffect(() => {
    if (!open) {
      clearPending();
      return;
    }
    setStage('consent');
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const getFocusable = (): HTMLElement[] => {
      if (!modalRef.current) return [];
      return Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('aria-hidden'));
    };

    queueMicrotask(() => {
      const focusables = getFocusable();
      const primary =
        modalRef.current?.querySelector<HTMLElement>('.li-btn-primary') ??
        focusables[0];
      primary?.focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key === 'Tab') {
        const focusables = getFocusable();
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearPending();
      previouslyFocused.current?.focus();
    };
    // onClose is consumed via onCloseRef; depending on its identity here would
    // re-run this effect on every parent render and cancel in-flight timers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Move focus to the primary action of each new stage so the keyboard path is sane.
  useEffect(() => {
    if (!open) return;
    if (stage === 'error') {
      queueMicrotask(() => {
        modalRef.current
          ?.querySelector<HTMLElement>('.li-btn-primary')
          ?.focus();
      });
    }
  }, [stage, open]);

  if (!open) return null;
  // Portal to document.body so the modal escapes any parent stacking context
  // (TopBar at z 1, .stage, etc.). Otherwise Connectors at z 50 paints over
  // the modal even though the scrim itself is z 1000.

  const authorize = () => {
    setStage('authorizing');
    clearPending();
    const t = window.setTimeout(() => {
      const failed = Math.random() < FAILURE_RATE;
      if (failed) {
        const reason =
          ERROR_REASONS[Math.floor(Math.random() * ERROR_REASONS.length)];
        setErrorReason(reason);
        setStage('error');
        return;
      }
      setStage('success');
      const close = window.setTimeout(() => {
        onAuthorized();
      }, SUCCESS_HOLD_MS);
      pendingTimers.current.push(close);
    }, AUTHORIZE_MS);
    pendingTimers.current.push(t);
  };

  return createPortal(
    <div
      className="li-modal-scrim"
      role="dialog"
      aria-modal="true"
      aria-label="Sign in with LinkedIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="li-modal" ref={modalRef}>
        <header className="li-modal-head">
          <LinkedInLogo />
          <button
            type="button"
            className="li-modal-close"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        {stage === 'consent' && (
          <div className="li-modal-body">
            <h2 className="li-modal-title">Continue with LinkedIn</h2>
            <p className="li-modal-text">
              Headhunter will receive your <strong>name</strong>, <strong>profile photo</strong>,
              <strong> headline</strong>, <strong>location</strong>, and{' '}
              <strong>current and past roles</strong> to tailor role recommendations.
            </p>
            <ul className="li-modal-perms">
              <li>Read basic profile</li>
              <li>Read email address</li>
              <li>Read work experience</li>
            </ul>
            <div className="li-modal-actions">
              <button type="button" className="li-btn li-btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="button" className="li-btn li-btn-primary" onClick={authorize}>
                Allow
              </button>
            </div>
            <p className="li-modal-fineprint">
              Prototype · This authorization is simulated; no LinkedIn data leaves your browser.
            </p>
          </div>
        )}

        {stage === 'authorizing' && (
          <div className="li-modal-body li-modal-loading">
            <Spinner />
            <p className="li-modal-text">Signing you in…</p>
          </div>
        )}

        {stage === 'success' && (
          <div
            className="li-modal-body li-result li-result--success"
            aria-live="polite"
          >
            <SuccessMark />
            <h2 className="li-modal-title">You're all set</h2>
            <p className="li-modal-text">
              Tailoring recommendations to your profile.
            </p>
          </div>
        )}

        {stage === 'error' && (
          <div
            className="li-modal-body li-result li-result--error"
            aria-live="assertive"
            role="alert"
          >
            <ErrorMark />
            <h2 className="li-modal-title">Couldn't sign you in</h2>
            <p className="li-modal-text">{errorReason}</p>
            <div className="li-modal-actions">
              <button type="button" className="li-btn li-btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="button" className="li-btn li-btn-primary" onClick={authorize}>
                Try again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

function LinkedInLogo() {
  return (
    <span className="li-logo" aria-label="LinkedIn">
      <span className="li-logo-mark" aria-hidden="true">
        in
      </span>
      <span className="li-logo-text">LinkedIn</span>
    </span>
  );
}

function Spinner() {
  return <span className="li-spinner" aria-hidden="true" />;
}

function SuccessMark() {
  return (
    <span className="li-result-mark li-result-mark--success" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

function ErrorMark() {
  return (
    <span className="li-result-mark li-result-mark--error" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v6" />
        <path d="M12 16.5v.5" />
      </svg>
    </span>
  );
}
