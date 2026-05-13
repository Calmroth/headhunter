import { useEffect, useRef, useState } from 'react';
import { useRotatingPlaceholder } from '../hooks/useRotatingPlaceholder';
import './SearchBar.css';

type Props = {
  examples: readonly string[];
  value: string;
  onChange: (v: string) => void;
  onSubmit: (v: string) => void;
};

export function SearchBar({ examples, value, onChange, onSubmit }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focused, setFocused] = useState(false);

  // Respond to the global "/" accelerator dispatched from App.
  useEffect(() => {
    const onFocusEvt = () => {
      inputRef.current?.focus();
      inputRef.current?.select();
    };
    window.addEventListener('hh:focus-search', onFocusEvt);
    return () => window.removeEventListener('hh:focus-search', onFocusEvt);
  }, []);
  const paused = focused || value.length > 0;
  const { current, index, reduced } = useRotatingPlaceholder(examples, { paused });

  // Reset opacity each tick by keying on index
  const [keyA, setKeyA] = useState(0);
  useEffect(() => {
    setKeyA((k) => k + 1);
  }, [index]);

  return (
    <form
      className="search"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value.trim());
      }}
    >
      <label htmlFor="search-input" className="sr-only">
        Search creative roles
      </label>
      <div className="search-field">
        <SearchIcon />
        <div className="search-input-wrap">
          <input
            ref={inputRef}
            id="search-input"
            type="text"
            value={value}
            autoComplete="off"
            spellCheck={false}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                onChange('');
                inputRef.current?.blur();
              }
            }}
            placeholder={paused ? 'Search roles, firms, cities' : ''}
            className="search-input"
          />
          {!value && !focused && (
            <span
              key={keyA}
              className={`search-cycler ${reduced ? 'is-reduced' : ''}`}
              aria-hidden="true"
            >
              {current}
            </span>
          )}
        </div>
        {value && (
          <button
            type="button"
            className="search-clear mono"
            onClick={() => {
              onChange('');
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="search-icon"
    >
      <circle cx="7" cy="7" r="5" />
      <path d="m11 11 3 3" />
    </svg>
  );
}
