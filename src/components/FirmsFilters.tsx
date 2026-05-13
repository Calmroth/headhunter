import { useMemo, useState } from 'react';
import { FIRMS } from '../data/firms';
import {
  DISCIPLINES,
  INDUSTRIES,
  SENIORITIES,
  type Discipline,
  type Industry,
  type Seniority,
} from '../data/taxonomy';
import './FirmsFilters.css';

export type FirmsFiltersState = {
  countryCode: string | 'all';
  industries: ReadonlySet<Industry>;
  disciplines: ReadonlySet<Discipline>;
  seniorities: ReadonlySet<Seniority>;
  hasOpenRoles: boolean;
};

export const EMPTY_FILTERS: FirmsFiltersState = {
  countryCode: 'all',
  industries: new Set(),
  disciplines: new Set(),
  seniorities: new Set(),
  hasOpenRoles: false,
};

type Props = {
  value: FirmsFiltersState;
  onChange: (next: FirmsFiltersState) => void;
};

export function FirmsFilters({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'where' | 'what'>('where');

  const countries = useMemo(() => {
    const seen = new Map<string, string>();
    for (const f of FIRMS) seen.set(f.countryCode, f.country);
    return Array.from(seen.entries()).sort((a, b) => a[1].localeCompare(b[1]));
  }, []);

  const whereCount =
    (value.countryCode !== 'all' ? 1 : 0) + (value.hasOpenRoles ? 1 : 0);
  const whatCount =
    value.industries.size + value.disciplines.size + value.seniorities.size;
  const activeCount = whereCount + whatCount;

  const toggle = <T,>(set: ReadonlySet<T>, item: T): Set<T> => {
    const next = new Set(set);
    if (next.has(item)) next.delete(item);
    else next.add(item);
    return next;
  };

  const clear = () => onChange(EMPTY_FILTERS);

  return (
    <div className={`firms-filters ${open ? 'is-open' : ''}`}>
      <button
        type="button"
        className="firms-filters-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="firms-filters-panel"
      >
        <span className="mono">Filters</span>
        {activeCount > 0 && (
          <span className="firms-filters-badge mono">{activeCount}</span>
        )}
        <span className="firms-filters-caret" aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <div id="firms-filters-panel" className="firms-filters-panel">
          <div className="firms-filters-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'where'}
              className={`firms-filters-tab ${tab === 'where' ? 'is-active' : ''}`}
              onClick={() => setTab('where')}
            >
              <span className="mono">Where</span>
              {whereCount > 0 && (
                <span className="firms-filters-tab-count mono">{whereCount}</span>
              )}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'what'}
              className={`firms-filters-tab ${tab === 'what' ? 'is-active' : ''}`}
              onClick={() => setTab('what')}
            >
              <span className="mono">What</span>
              {whatCount > 0 && (
                <span className="firms-filters-tab-count mono">{whatCount}</span>
              )}
            </button>
          </div>

          {tab === 'where' && (
            <>
              <FilterGroup label="Location">
                <select
                  className="firms-filters-select"
                  value={value.countryCode}
                  onChange={(e) => onChange({ ...value, countryCode: e.target.value })}
                >
                  <option value="all">All countries</option>
                  {countries.map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </FilterGroup>

              <FilterGroup label="Availability">
                <label className="firms-filters-check">
                  <input
                    type="checkbox"
                    checked={value.hasOpenRoles}
                    onChange={(e) =>
                      onChange({ ...value, hasOpenRoles: e.target.checked })
                    }
                  />
                  <span>Only firms with open roles</span>
                </label>
              </FilterGroup>
            </>
          )}

          {tab === 'what' && (
            <>
              <FilterGroup label="Industry">
                <div className="firms-filters-chips">
                  {INDUSTRIES.map((i) => {
                    const active = value.industries.has(i);
                    return (
                      <button
                        key={i}
                        type="button"
                        className={`firms-filters-chip ${active ? 'is-active' : ''}`}
                        onClick={() =>
                          onChange({ ...value, industries: toggle(value.industries, i) })
                        }
                      >
                        {i}
                      </button>
                    );
                  })}
                </div>
              </FilterGroup>

              <FilterGroup label="Roles">
                <div className="firms-filters-chips">
                  {DISCIPLINES.map((d) => {
                    const active = value.disciplines.has(d);
                    return (
                      <button
                        key={d}
                        type="button"
                        className={`firms-filters-chip ${active ? 'is-active' : ''}`}
                        onClick={() =>
                          onChange({ ...value, disciplines: toggle(value.disciplines, d) })
                        }
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </FilterGroup>

              <FilterGroup label="Seniority">
                <div className="firms-filters-chips">
                  {SENIORITIES.map((s) => {
                    const active = value.seniorities.has(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        className={`firms-filters-chip ${active ? 'is-active' : ''}`}
                        onClick={() =>
                          onChange({ ...value, seniorities: toggle(value.seniorities, s) })
                        }
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </FilterGroup>
            </>
          )}

          {activeCount > 0 && (
            <button
              type="button"
              className="firms-filters-clear mono"
              onClick={clear}
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="firms-filters-group">
      <legend className="mono firms-filters-legend">{label}</legend>
      {children}
    </fieldset>
  );
}
