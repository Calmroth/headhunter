import { Component, type ErrorInfo, type ReactNode } from 'react';
import './ErrorBoundary.css';

type Props = {
  children: ReactNode;
  /** Shown in place of the subtree that failed. */
  label: string;
  /** Rendered instead of the default notice when supplied. */
  fallback?: ReactNode;
};

type State = { error: Error | null };

/**
 * Keeps one failing subtree from taking the whole page down.
 *
 * The map is the largest and most dependency-heavy part of this app — Leaflet,
 * an async geometry fetch, third-party tiles, and imperative DOM work in
 * effects. Without a boundary, any throw in there unmounts the entire React
 * tree and the user gets a blank page: no rails, no search, no listings, and
 * no way back. With one, the map area degrades to a notice and everything
 * else on the page keeps working.
 *
 * Deliberately not a retry button: the failures this catches are render-time
 * bugs, and re-rendering the same tree with the same props just throws again.
 * A reload is the honest recovery, so that is what it offers.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surface it where a developer will actually see it. There is no error
    // reporting service wired up; the console is the whole story.
    console.error(`[${this.props.label}] crashed:`, error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    return (
      <div className="error-boundary" role="alert">
        <p className="error-boundary-title serif">{this.props.label} stopped responding</p>
        <p className="error-boundary-body">
          The rest of the page still works — the lists and search are unaffected. Reloading
          usually clears it.
        </p>
        <button
          type="button"
          className="error-boundary-action mono"
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </div>
    );
  }
}
