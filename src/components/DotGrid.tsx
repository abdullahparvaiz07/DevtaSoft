import React from 'react';

interface DotGridProps {
  rows?: number;
  cols?: number;
  dotColor?: string;
  className?: string;
}

export const DotGrid: React.FC<DotGridProps> = ({
  rows = 4,
  cols = 5,
  dotColor = '#FFB28A',
  className = '',
}) => {
  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({ r, c, id: `${r}-${c}` });
    }
  }

  return (
    <svg
      width={cols * 16}
      height={rows * 16}
      viewBox={`0 0 ${cols * 16} ${rows * 16}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {dots.map((dot) => (
        <circle
          key={dot.id}
          cx={dot.c * 16 + 6}
          cy={dot.r * 16 + 6}
          r="2.5"
          fill={dotColor}
        />
      ))}
    </svg>
  );
};
