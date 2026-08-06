import React, { useRef, useState, useEffect } from 'react';
import { useInView, animate } from 'motion/react';
import { Briefcase, Clock, Award, LucideIcon } from 'lucide-react';

interface StatItem {
  targetNum: number;
  suffix: string;
  label: string;
  color: 'orange' | 'cyan';
  icon: LucideIcon;
}

const statsData: StatItem[] = [
  {
    targetNum: 250,
    suffix: '+',
    label: 'Projects Completed',
    color: 'orange',
    icon: Briefcase,
  },
  {
    targetNum: 1600,
    suffix: '+',
    label: 'Work Hours',
    color: 'cyan',
    icon: Clock,
  },
  {
    targetNum: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    color: 'orange',
    icon: Award,
  },
];

interface CountUpProps {
  target: number;
  suffix?: string;
  duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({ target, suffix = '', duration = 2.0 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setCount(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, target, duration]);

  const formatted = target >= 1000 ? count.toLocaleString('en-US') : count.toString();

  return (
    <span ref={ref} className="inline-block tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
};

export const StatsBar: React.FC<{ onStatClick?: (label: string) => void }> = ({ onStatClick }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-xl shadow-slate-900/5 rounded-3xl p-4 sm:p-6 transition-all duration-300">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {statsData.map((stat) => (
            <div
              key={stat.label}
              onClick={() => onStatClick?.(stat.label)}
              className="group cursor-pointer flex items-center justify-center gap-4 px-4 py-3 sm:py-2 rounded-2xl transition-all duration-300 hover:bg-slate-50/90 hover:scale-[1.02]"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                  stat.color === 'orange'
                    ? 'bg-[#FFF0E5] text-[#FF6B00]'
                    : 'bg-[#E3FAF6] text-[#00C2CC]'
                }`}
              >
                <stat.icon className="w-6 h-6 stroke-[2.2]" />
              </div>

              <div className="flex flex-col text-left">
                <span
                  className={`font-display font-black text-2xl sm:text-3xl md:text-[32px] tracking-tight leading-none ${
                    stat.color === 'orange' ? 'text-[#FF6B00]' : 'text-[#00C2CC]'
                  }`}
                >
                  <CountUp target={stat.targetNum} suffix={stat.suffix} />
                </span>
                <span className="font-sans font-semibold text-xs sm:text-sm text-[#475569] tracking-tight group-hover:text-[#0D152A] transition-colors mt-1.5">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
