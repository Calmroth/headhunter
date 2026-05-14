import { useEffect, useMemo, useRef, useState } from 'react';
import { FIRMS } from '../data/firms';
import { JOBS } from '../data/jobs';
import { monogram } from '../utils/monogram';
import { FirmsFilters, type FirmsFiltersState } from './FirmsFilters';
import './FirmsList.css';

type Props = {
  focusedCountryCode: string | null; // alpha-2
  /** ISO alpha-2 of the user's home country, used to float home firms to the top. */
  homeCountryCode?: string | null;
  residentCity?: string;
  focusedFirmId: string | null;
  hoveredFirmId?: string | null;
  matchingFirmIds?: ReadonlySet<string>;
  hasProfile?: boolean;
  filters: FirmsFiltersState;
  onFiltersChange: (next: FirmsFiltersState) => void;
  filteredFirmIds: ReadonlySet<string>;
  onHoverFirm?: (id: string | null) => void;
  onSelectFirm: (id: string | null) => void;
};

export function FirmsList({
  focusedCountryCode,
  homeCountryCode,
  residentCity,
  focusedFirmId,
  hoveredFirmId,
  matchingFirmIds,
  hasProfile,
  filters,
  onFiltersChange,
  filteredFirmIds,
  onHoverFirm,
  onSelectFirm,
}: Props) {
  const firms = useMemo(() => {
    const list = (focusedCountryCode
      ? FIRMS.filter((f) => f.countryCode === focusedCountryCode)
      : [...FIRMS]
    ).filter((f) => filteredFirmIds.has(f.id));

    const counts = new Map<string, number>();
    for (const j of JOBS) counts.set(j.firmId, (counts.get(j.firmId) ?? 0) + 1);

    // Sort order (no clicked-firm pin — clicked stays where geography says):
    //  1) Home country first (the user's current location).
    //  2) Home city first within the home country.
    //  3) Country name alphabetical for everyone else.
    //  4) City name alphabetical within country.
    //  5) Role count desc within city (busiest firms surface first).
    //  6) Firm name alphabetical (stable tiebreak).
    list.sort((a, b) => {
      const aIsHomeCountry = !!homeCountryCode && a.countryCode === homeCountryCode;
      const bIsHomeCountry = !!homeCountryCode && b.countryCode === homeCountryCode;
      if (aIsHomeCountry !== bIsHomeCountry) return aIsHomeCountry ? -1 : 1;

      if (aIsHomeCountry && bIsHomeCountry) {
        const aIsHomeCity = !!residentCity && a.city === residentCity;
        const bIsHomeCity = !!residentCity && b.city === residentCity;
        if (aIsHomeCity !== bIsHomeCity) return aIsHomeCity ? -1 : 1;
      }

      const byCountry = a.country.localeCompare(b.country);
      if (byCountry !== 0) return byCountry;

      const byCity = a.city.localeCompare(b.city);
      if (byCity !== 0) return byCity;

      const aN = counts.get(a.id) ?? 0;
      const bN = counts.get(b.id) ?? 0;
      if (aN !== bN) return bN - aN;

      return a.name.localeCompare(b.name);
    });

    return list.map((f) => ({ firm: f, roleCount: counts.get(f.id) ?? 0 }));
  }, [focusedCountryCode, homeCountryCode, residentCity, filteredFirmIds]);

  const heading = focusedCountryCode ? 'Consultancies in region' : 'Featured consultancies';

  // Scroll the hovered row into view when the hover came from the map.
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Keyboard list nav — mirrors JobsList. j/k step, Enter opens.
  const [kbdIndex, setKbdIndex] = useState<number | null>(null);
  useEffect(() => {
    setKbdIndex(null);
  }, [focusedCountryCode, firms.length]);
  useEffect(() => {
    const isTyping = () => {
      const el = document.activeElement as HTMLElement | null;
      if (!el) return false;
      const tag = el.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTyping()) return;
      if (firms.length === 0) return;
      // Only act when this rail is the one holding kbd focus (an h/l toggle).
      // Default: shift+j / shift+k steps the firms rail; plain j/k drives jobs.
      if (e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        setKbdIndex((i) => (i === null ? 0 : Math.min(firms.length - 1, i + 1)));
      } else if (e.shiftKey && (e.key === 'K' || e.key === 'k')) {
        e.preventDefault();
        setKbdIndex((i) => (i === null ? 0 : Math.max(0, i - 1)));
      } else if (e.shiftKey && e.key === 'Enter') {
        if (kbdIndex !== null && firms[kbdIndex]) {
          e.preventDefault();
          onSelectFirm(firms[kbdIndex].firm.id);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [firms, kbdIndex, onSelectFirm]);
  useEffect(() => {
    if (kbdIndex === null || !scrollRef.current) return;
    const idx = firms[kbdIndex]?.firm.id;
    if (!idx) return;
    const node = scrollRef.current.querySelector<HTMLElement>(
      `[data-firm-id="${CSS.escape(idx)}"]`
    );
    node?.scrollIntoView({ block: 'nearest' });
  }, [kbdIndex, firms]);
  // When a firm is clicked (focused), scroll its row into view so the user
  // can see what they selected — but only if it isn't already on screen.
  // No longer scrolls to row 0; the firm stays in its sort position.
  useEffect(() => {
    if (!focusedFirmId || !scrollRef.current) return;
    const node = scrollRef.current.querySelector<HTMLElement>(
      `[data-firm-id="${CSS.escape(focusedFirmId)}"]`
    );
    node?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [focusedFirmId]);

  return (
    <aside className="firms" aria-labelledby="firms-heading">
      <header className="firms-header">
        <h2 id="firms-heading" className="mono firms-label">
          {heading.toUpperCase()} ·{' '}
          <span key={`${firms.length}-${focusedCountryCode ?? 'all'}`} className="firms-label-count">
            {firms.length}
          </span>
        </h2>
      </header>

      <FirmsFilters value={filters} onChange={onFiltersChange} />

      <div className="firms-scroll rail-scroll" ref={scrollRef}>
        {firms.length === 0 ? (
          <p className="firms-empty">No consultancies indexed here yet.</p>
        ) : (
          firms.map(({ firm, roleCount }) => {
            const active = focusedFirmId === firm.id;
            const hovered = hoveredFirmId === firm.id;
            const isHome = residentCity && firm.city === residentCity;
            const isMatch = hasProfile && matchingFirmIds?.has(firm.id);
            const isDim = hasProfile && !isMatch;
            const isKbd = kbdIndex !== null && firms[kbdIndex]?.firm.id === firm.id;
            return (
              <button
                key={firm.id}
                type="button"
                data-firm-id={firm.id}
                className={`firm-row ${active ? 'is-active' : ''} ${hovered ? 'is-hovered' : ''} ${isMatch ? 'is-match' : ''} ${isDim ? 'is-dim' : ''} ${isKbd ? 'is-kbd-focused' : ''}`}
                aria-pressed={active}
                onClick={() => onSelectFirm(active ? null : firm.id)}
                onMouseEnter={() => onHoverFirm?.(firm.id)}
                onMouseLeave={() => onHoverFirm?.(null)}
                onFocus={() => onHoverFirm?.(firm.id)}
                onBlur={() => onHoverFirm?.(null)}
              >
                <span className="firm-row-mark serif" aria-hidden="true">
                  {monogram(firm.name)}
                </span>
                <span className="firm-row-body">
                  <span className="firm-row-name serif">{firm.name}</span>
                  <span className="firm-row-meta mono">
                    {firm.city.toUpperCase()} · {roleCount} {roleCount === 1 ? 'ROLE' : 'ROLES'}
                    {isHome ? ' · HOME' : ''}
                    {isMatch ? ' · FIT' : ''}
                  </span>
                </span>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}
