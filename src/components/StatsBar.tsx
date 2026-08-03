import React, { useRef, useState, useEffect } from 'react';
import { useInView, animate } from 'motion/react';

interface StatItem {
  targetNum: number;
  suffix: string;
  label: string;
  color: 'orange' | 'cyan';
}

const statsData: StatItem[] = [
  {
    targetNum: 250,
    suffix: '+',
    label: 'Projects Completed',
    color: 'orange',
  },
  {
    targetNum: 1600,
    suffix: '+',
    label: 'Work Hours',
    color: 'cyan',
  },
  {
    targetNum: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    color: 'orange',
  },
];

interface CountUpProps {
  target: number;
  suffix?: string;
  duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({ target, suffix = '', duration = 2.2 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration,
        ease: [0.215, 0.61, 0.355, 1],
        onUpdate: (latest) => {
          setCount(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export const StatsBar: React.FC<{ onStatClick?: (label: string) => void }> = ({ onStatClick }) => {
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
                <CountUp target={stat.targetNum} suffix={stat.suffix} />
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
