import React from 'react';

export const SparkRays: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      width="42"
      height="32"
      viewBox="0 0 42 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left ray */}
      <path
        d="M2 24L12 18"
        stroke="#2CC4CB"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Center ray */}
      <path
        d="M17 12L17 2"
        stroke="#2CC4CB"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Right ray */}
      <path
        d="M26 18L36 22"
        stroke="#2CC4CB"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};
