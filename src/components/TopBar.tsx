import { useEffect, useRef, useState } from 'react';
import type { Profile } from '../data/profile';
import { LinkedInSignIn } from './LinkedInSignIn';
import './TopBar.css';
import './LinkedInSignIn.css';

type Props = {
  profile: Profile | null;
  onSignIn: () => void;
  onSignOut: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
};

export function TopBar({ profile, onSignIn, onSignOut, theme, onToggleTheme }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

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

  const handleAuthorized = () => {
    setModalOpen(false);
    onSignIn();
  };

  const handleSignOut = () => {
    setMenuOpen(false);
    onSignOut();
  };

  return (
    <header className="topbar">
      <a className="wordmark serif" href="/" aria-label="Headhunter home">
        Headhunter
      </a>

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
            onClick={() => setModalOpen(true)}
          >
            <span className="linkedin-signin-mark" aria-hidden="true">in</span>
            <span>Sign in with LinkedIn</span>
          </button>
        )}
      </nav>

      <LinkedInSignIn
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAuthorized={handleAuthorized}
      />
    </header>
  );
}
