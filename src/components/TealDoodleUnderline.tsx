import React from 'react';

export const TealDoodleUnderline: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      width="100%"
      height="18"
      viewBox="0 0 320 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute -bottom-3 left-0 w-full overflow-visible pointer-events-none ${className}`}
      preserveAspectRatio="none"
    >
      {/* Primary hand-drawn teal brush line */}
      <path
        d="M3 10C65 5 180 3 315 12"
        stroke="#2CC4CB"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Secondary accent brush line */}
      <path
        d="M12 14C85 10 210 11 305 16"
        stroke="#00B4D8"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.85"
      />
    </svg>
  );
};
