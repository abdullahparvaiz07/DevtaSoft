import React, { useEffect, useState } from 'react';

interface StatItem {
  number: string;
  targetNum: number;
  prefix?: string;
  suffix: string;
  label: string;
  color: 'orange' | 'cyan';
}

const statsData: StatItem[] = [
  {
    number: '250+',
    targetNum: 250,
    suffix: '+',
    label: 'Projects Completed',
    color: 'orange',
  },
  {
    number: '1600+',
    targetNum: 1600,
    suffix: '+',
    label: 'Work Hours',
    color: 'cyan',
  },
  {
    number: '98%',
    targetNum: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    color: 'orange',
  },
];

export const StatsBar: React.FC<{ onStatClick?: (label: string) => void }> = ({ onStatClick }) => {
  const [counts, setCounts] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    const duration = 1200; // ms
    const steps = 30;
    const intervalTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts(
        statsData.map((stat) => Math.min(Math.round(stat.targetNum * progress), stat.targetNum))
      );

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto pt-6 pb-2 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 text-center">
        {statsData.map((stat, idx) => (
          <React.Fragment key={stat.label}>
            {idx > 0 && (
              <div
                className="hidden sm:block w-[1px] h-6 bg-[#CBD5E1]"
                aria-hidden="true"
              />
            )}
            <div
              onClick={() => onStatClick?.(stat.label)}
              className="group cursor-pointer flex items-center gap-3 px-4 py-2 rounded-2xl transition-all duration-300 hover:scale-108 hover:-translate-y-1 hover:bg-white/80 hover:shadow-lg hover:shadow-slate-200/50"
            >
              <span
                className={`font-display font-black text-2xl sm:text-3xl md:text-[34px] tracking-tight transition-transform duration-300 group-hover:scale-110 ${
                  stat.color === 'orange' ? 'text-[#FF6B00]' : 'text-[#00C2CC]'
                }`}
              >
                {counts[idx]}
                {stat.suffix}
              </span>
              <span className="font-sans font-semibold text-sm sm:text-base text-[#2D3748] tracking-tight group-hover:text-[#0D152A] transition-colors">
                {stat.label}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
