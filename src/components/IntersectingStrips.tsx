import React from 'react';

const brands = [
  'Web Development',
  'App Development',
  'AI Agents',
  'SEO',
  'UI/UX Design',
  'Cloud & DevOps',
  'Graphic Design',
  'Content Writing',
];

export const IntersectingStrips: React.FC = () => {
  // Duplicate brand items for seamless infinite scroll
  const marqueeItems = [...brands, ...brands, ...brands, ...brands, ...brands, ...brands];

  return (
    <section className="w-full overflow-hidden py-8 sm:py-12 relative z-20 select-none pointer-events-none">
      <div className="relative w-full flex items-center justify-center min-h-[140px] sm:min-h-[160px]">
        
        {/* Teal/Cyan Strip (#14B8B0) - Slanted Downwards */}
        <div className="absolute w-[160vw] -left-[30vw] sm:w-[120vw] sm:-left-[10vw] bg-[#14B8B0] py-3.5 sm:py-4 shadow-lg border-y border-white/25 transform -rotate-[2deg] sm:-rotate-[2.5deg] z-10 overflow-hidden flex items-center">
          <div className="animate-marquee-left flex items-center gap-6 sm:gap-9 whitespace-nowrap">
            {marqueeItems.map((brand, idx) => (
              <div key={`teal-${idx}`} className="flex items-center gap-6 sm:gap-9">
                <span className="text-white font-black text-xs sm:text-sm md:text-base tracking-wider uppercase font-display leading-none">
                  {brand}
                </span>
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/90 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L22 12L12 22L2 12L12 2Z" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Orange Strip (#FF6B00) - Slanted Upwards */}
        <div className="absolute w-[160vw] -left-[30vw] sm:w-[120vw] sm:-left-[10vw] bg-[#FF6B00] py-3.5 sm:py-4 shadow-xl border-y border-white/25 transform rotate-[2deg] sm:rotate-[2.5deg] z-20 overflow-hidden flex items-center opacity-[0.98]">
          <div className="animate-marquee-right flex items-center gap-6 sm:gap-9 whitespace-nowrap">
            {marqueeItems.map((brand, idx) => (
              <div key={`orange-${idx}`} className="flex items-center gap-6 sm:gap-9">
                <span className="text-white font-black text-xs sm:text-sm md:text-base tracking-wider uppercase font-display leading-none">
                  {brand}
                </span>
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/90 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L22 12L12 22L2 12L12 2Z" />
                </svg>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
