import { useEffect, useRef, useState } from 'react';
import './LinkedInSignIn.css';

type Props = {
  open: boolean;
  onClose: () => void;
  onAuthorized: () => void;
};

export function LinkedInSignIn({ open, onClose, onAuthorized }: Props) {
  const [stage, setStage] = useState<'consent' | 'authorizing'>('consent');
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
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

    // Initial focus: primary "Allow" button if present, else first focusable.
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
        onClose();
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
      // Restore focus to the element that opened the modal.
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const authorize = () => {
    setStage('authorizing');
    window.setTimeout(() => {
      onAuthorized();
    }, 700);
  };

  return (
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

        {stage === 'consent' ? (
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
        ) : (
          <div className="li-modal-body li-modal-loading">
            <Spinner />
            <p className="li-modal-text">Signing you in…</p>
          </div>
        )}
      </div>
    </div>
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
