import { useEffect, useRef, useState } from 'react';
import type { Profile } from '../data/profile';
import './TopBar.css';
import './LinkedInSignIn.css';

type Props = {
  profile: Profile | null;
  onRequestSignIn: () => void;
  onSignOut: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
};

const LIKE_KEY = 'hh.liked';
// Donate destinations. Replace these with your real numbers / URLs:
//   - SWISH_NUMBER: the recipient's Swish phone number (Swedish format).
//   - CARD_URL: a hosted card-checkout URL (PayPal NCP, Stripe Payment Link,
//     Buy Me a Coffee, Ko-fi, etc.). PayPal's NCP page handles both signed-in
//     PayPal flow and unauthenticated card-only flow on the same surface.
const SWISH_NUMBER = '+46 70 569 54 96';
const CARD_URL = 'https://www.paypal.com/ncp/payment/KSQ33L2AGZHNS';

function readLiked(): boolean {
  try {
    return window.localStorage.getItem(LIKE_KEY) === '1';
  } catch {
    return false;
  }
}

export function TopBar({ profile, onRequestSignIn, onSignOut, theme, onToggleTheme }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [liked, setLiked] = useState<boolean>(() =>
    typeof window !== 'undefined' ? readLiked() : false
  );

  // Donate popover state. Stays a popover (not a modal) — donation is a
  // utility, not a focus-stealing action. Closes on outside click or ESC.
  const [donateOpen, setDonateOpen] = useState(false);
  const donateRef = useRef<HTMLDivElement | null>(null);
  const [swishCopied, setSwishCopied] = useState(false);
  useEffect(() => {
    if (!donateOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (donateRef.current && !donateRef.current.contains(e.target as Node)) {
        setDonateOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDonateOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [donateOpen]);

  const copySwish = async () => {
    try {
      await navigator.clipboard.writeText(SWISH_NUMBER);
      setSwishCopied(true);
      window.setTimeout(() => setSwishCopied(false), 1800);
    } catch {
      /* clipboard blocked — fall through; the number is still visible */
    }
  };

  const toggleLike = () => {
    const next = !liked;
    setLiked(next);
    try {
      if (next) window.localStorage.setItem(LIKE_KEY, '1');
      else window.localStorage.removeItem(LIKE_KEY);
    } catch {
      /* localStorage blocked — in-memory only */
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.origin + window.location.pathname;
    const shareTitle = 'Headhunter — creative jobs, mapped';
    const shareText =
      'A geographic discovery surface for creative jobs at firms that contract with large enterprises.';
    // Web Share API is the right surface on mobile + supported browsers.
    // Desktop fallback: open an X (Twitter) compose intent in a new tab.
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({ url: shareUrl, title: shareTitle, text: shareText });
        return;
      } catch {
        /* user cancelled — fall through to nothing */
        return;
      }
    }
    const intent = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(shareText)}`;
    window.open(intent, '_blank', 'noopener,noreferrer');
  };

  const mailHref = (() => {
    if (typeof window === 'undefined') return '#';
    const url = window.location.origin + window.location.pathname;
    const subject = encodeURIComponent('Headhunter — creative jobs, mapped');
    const body = encodeURIComponent(
      `Thought you might find this useful — a geographic discovery surface for creative jobs:\n\n${url}\n`
    );
    return `mailto:?subject=${subject}&body=${body}`;
  })();

  useEffect(() => {
    if (!menuOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const handleSignOut = () => {
    setMenuOpen(false);
    onSignOut();
  };

  return (
    <header className="topbar">
      <a className="wordmark serif" href="/" aria-label="Lead Hunter home">
        Headhunter
      </a>

      <div className="topbar-share" role="group" aria-label="Share & support">
        <button
          type="button"
          className={`topbar-share-button ${liked ? 'is-liked' : ''}`}
          onClick={toggleLike}
          aria-pressed={liked}
          aria-label={liked ? 'Unlike Headhunter' : 'Like Headhunter'}
          title={liked ? 'Liked' : 'Like'}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <button
          type="button"
          className="topbar-share-button"
          onClick={handleShare}
          aria-label="Share Headhunter"
          title="Share"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>

        <a
          className="topbar-share-button"
          href={mailHref}
          aria-label="Share via email"
          title="Email"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </a>

        <span className="topbar-share-divider" aria-hidden="true" />

        <div className="donate" ref={donateRef}>
          <button
            type="button"
            className="topbar-share-donate"
            aria-haspopup="menu"
            aria-expanded={donateOpen}
            aria-label="Donate to support Headhunter"
            onClick={() => setDonateOpen((v) => !v)}
            title="Donate"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>Donate</span>
          </button>

          {donateOpen && (
            <div className="donate-popover" role="menu">
              <p className="mono donate-popover-label">Support Headhunter</p>

              <button
                type="button"
                className="donate-option"
                onClick={copySwish}
                role="menuitem"
              >
                <span
                  className="donate-option-mark donate-option-mark--swish"
                  aria-hidden="true"
                >
                  {/* Approximation of the Swish brand mark: lowercase wordmark
                      in the brand magenta. Recognizable to users in Sweden;
                      swap for the official SVG when available. */}
                  <svg viewBox="0 0 72 32">
                    <rect width="72" height="32" rx="6" fill="#EF2D5E" />
                    <text
                      x="36"
                      y="22"
                      textAnchor="middle"
                      className="swish-wordmark"
                      fill="#ffffff"
                    >
                      swish
                    </text>
                  </svg>
                </span>
                <span className="donate-option-body">
                  <span className="donate-option-name serif">Swish</span>
                  <span className="donate-option-meta mono">
                    {swishCopied ? 'NUMBER COPIED' : SWISH_NUMBER}
                  </span>
                </span>
              </button>

              <a
                className="donate-option"
                href={CARD_URL}
                target="_blank"
                rel="noreferrer noopener"
                role="menuitem"
                onClick={() => setDonateOpen(false)}
              >
                <span className="donate-option-mark mono">Cd</span>
                <span className="donate-option-body">
                  <span className="donate-option-name serif">Card</span>
                  <span className="donate-option-meta mono">SECURE CHECKOUT</span>
                </span>
              </a>
            </div>
          )}
        </div>
      </div>

      <nav className="topbar-actions" aria-label="Account">
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span aria-hidden="true" className="theme-toggle-icon">
            {theme === 'dark' ? '☼' : '☾'}
          </span>
        </button>
        {profile ? (
          <div className="account" ref={menuRef}>
            <button
              type="button"
              className="account-trigger"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="account-avatar mono">{profile.initials}</span>
              <span className="account-name">{profile.name.split(' ')[0]}</span>
              <span className="account-caret" aria-hidden="true">▾</span>
            </button>

            {menuOpen && (
              <div className="account-menu" role="menu">
                <div className="account-menu-header">
                  <span className="account-menu-name">{profile.name}</span>
                  <span className="account-menu-meta mono">
                    {profile.city.toUpperCase()} · {profile.countryCode}
                  </span>
                </div>

                <div className="account-menu-section">
                  <span className="account-menu-label mono">Expertise</span>
                  <ul className="account-menu-chips">
                    {profile.disciplines.map((d) => (
                      <li key={d} className="account-menu-chip">{d}</li>
                    ))}
                  </ul>
                </div>

                <div className="account-menu-section">
                  <span className="account-menu-label mono">Looking for</span>
                  <p className="account-menu-text">
                    {profile.seniorities.join(' / ')} roles in{' '}
                    {profile.disciplines.slice(0, 2).join(' or ')}
                    {profile.disciplines.length > 2 ? ' and adjacent' : ''}
                    , based in or near {profile.city}.
                  </p>
                </div>

                <button
                  type="button"
                  className="account-menu-item is-danger"
                  role="menuitem"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            className="linkedin-signin"
            onClick={onRequestSignIn}
          >
            <span className="linkedin-signin-mark" aria-hidden="true">in</span>
            <span>Sign in with LinkedIn</span>
          </button>
        )}
      </nav>
    </header>
  );
}
