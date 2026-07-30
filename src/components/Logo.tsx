import React from 'react';

export const Logo: React.FC<{ className?: string; isLight?: boolean }> = ({ className = '', isLight = false }) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* DevtaSoft Stylized Geometric S Logo Mark */}
      <img
        src="/logo.png"
        alt="DevtaSoft Logo"
        className="h-50 sm:h-45 w-auto max-h-45 object-contain transition-transform duration-300 hover:scale-105"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};


