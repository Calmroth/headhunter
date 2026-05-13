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

export function TopBar({ profile, onRequestSignIn, onSignOut, theme, onToggleTheme }: Props) {
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

  const handleSignOut = () => {
    setMenuOpen(false);
    onSignOut();
  };

  return (
    <header className="topbar">
      <a className="wordmark serif" href="/" aria-label="Lead Hunter home">
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
