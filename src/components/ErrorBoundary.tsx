import React from 'react';
import { Link } from 'react-router-dom';

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('App error boundary caught:', error);
    if (typeof window !== 'undefined' && window.location.pathname !== '/500') {
      window.location.href = '/500';
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6 text-center">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold mb-3">Something went wrong</h1>
            <p className="text-muted-foreground mb-6">
              We couldn't load this view. Try refreshing or head back to the homepage.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-md border border-black/20 px-4 py-2 text-sm font-medium hover:bg-black/5"
              >
                Refresh
              </button>
              <Link
                to="/"
                className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
              >
                Go home
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
