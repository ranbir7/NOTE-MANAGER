'use client';

import React, { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="font-heading text-2xl text-foreground mb-2">Something went wrong</p>
            <p className="text-muted-foreground text-sm mb-6">An unexpected error occurred. Please refresh the page.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-6 py-2 bg-primary text-primary-foreground text-xs font-semibold tracking-widest uppercase"
            >
              Try Again
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
