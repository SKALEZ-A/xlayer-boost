'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    // In Vercel, this will show in logs instead of a blank screen
    console.error('App route error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/10">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-lg text-center border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-gray-300 mb-6">{error?.message || 'An unexpected error occurred.'}</p>
        <button
          onClick={() => reset()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Try again
        </button>
      </div>
    </div>
  );
}


