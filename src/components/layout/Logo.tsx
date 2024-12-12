import React from 'react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="text-[rgb(var(--brand-primary))]">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current"
        >
          <path
            d="M3 3v18h18"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 12l4-4 4 4 5-5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-xl font-bold text-[rgb(var(--text-primary))]">
        CRMaster
      </span>
    </div>
  );
}