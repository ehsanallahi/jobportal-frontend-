import React from 'react';

export function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <div
        className="w-6 h-6 border-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"
        role="status"
        aria-label="Loading"
      ></div>
    </div>
  );
}
