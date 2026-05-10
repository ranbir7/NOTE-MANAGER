'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center px-6">
        <h2 className="font-heading text-3xl font-semibold text-foreground mb-3">
          Something went wrong
        </h2>
        <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto">
          An unexpected error occurred while loading the app. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-primary text-primary-foreground text-xs font-semibold tracking-widest uppercase hover:bg-primary/80 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
