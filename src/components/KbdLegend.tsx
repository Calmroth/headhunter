import './KbdLegend.css';

type Props = {
  open: boolean;
  onClose: () => void;
};

const SHORTCUTS: ReadonlyArray<{ keys: string[]; action: string }> = [
  { keys: ['/'], action: 'Focus search' },
  { keys: ['j', '↓'], action: 'Next role' },
  { keys: ['k', '↑'], action: 'Previous role' },
  { keys: ['Enter'], action: 'Open focused role' },
  { keys: ['⇧ J'], action: 'Next firm' },
  { keys: ['⇧ K'], action: 'Previous firm' },
  { keys: ['⇧ Enter'], action: 'Focus firm on map' },
  { keys: ['Esc'], action: 'Clear region, close menus' },
  { keys: ['?'], action: 'Toggle this list' },
];

export function KbdLegend({ open, onClose }: Props) {
  return (
    <aside
      className={`kbd-legend ${open ? 'is-open' : ''}`}
      aria-hidden={!open}
      role="dialog"
      aria-label="Keyboard shortcuts"
    >
      <header className="kbd-legend-head">
        <span className="mono kbd-legend-title">Keyboard</span>
        <button
          type="button"
          className="kbd-legend-close mono"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </header>
      <dl className="kbd-legend-list">
        {SHORTCUTS.map((s) => (
          <div key={s.action} className="kbd-legend-row">
            <dt className="kbd-legend-keys">
              {s.keys.map((k, i) => (
                <span key={k}>
                  <kbd className="mono">{k}</kbd>
                  {i < s.keys.length - 1 && <span className="kbd-legend-or"> or </span>}
                </span>
              ))}
            </dt>
            <dd className="kbd-legend-action">{s.action}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
