'use client';

import { useEffect } from 'react';

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Shop page error occurred');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong!</h2>
        <button
          onClick={() => reset()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
