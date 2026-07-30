import React from 'react';
import { motion } from 'motion/react';

const brands = [
  'Web Developement',
  'App Developement',
  'AI Agents',
  'SEO',
  'UI/UX Design',
  'Cloud and DevOps',
  'Graphic deisgning',
  'Content Writing',

];

export const IntersectingStrips: React.FC = () => {
  // Duplicate brand items for seamless infinite scroll
  const marqueeItems = [...brands, ...brands, ...brands, ...brands, ...brands, ...brands];

  return (
    <section className="w-full overflow-hidden py-4 sm:py-8 relative z-20 select-none pointer-events-none">
      <div className="relative w-full flex items-center justify-center min-h-[90px] sm:min-h-[110px]">
        
        {/* Teal Strip (#14B8B0) - Slanted Downwards (-2.5deg) */}
        <div className="absolute w-[130vw] -left-[15vw] sm:w-[115vw] sm:-left-[7vw] bg-[#14B8B0] py-1.5 sm:py-2 shadow-lg border-y border-white/20 transform -rotate-2 sm:-rotate-[2.5deg] z-10 overflow-hidden flex items-center">
          <motion.div
            className="flex items-center gap-6 sm:gap-9 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 30,
            }}
          >
            {marqueeItems.map((brand, idx) => (
              <div key={`teal-${idx}`} className="flex items-center gap-6 sm:gap-9">
                <span className="text-white font-extrabold text-xs sm:text-sm md:text-base tracking-wider uppercase font-display">
                  {brand}
                </span>
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/90 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L22 12L12 22L2 12L12 2Z" />
                </svg>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Orange Strip (#FF6B00) - Slanted Upwards (+2.5deg) */}
        <div className="absolute w-[130vw] -left-[15vw] sm:w-[115vw] sm:-left-[7vw] bg-[#FF6B00] py-1.5 sm:py-2 shadow-xl border-y border-white/20 transform rotate-2 sm:rotate-[2.5deg] z-20 overflow-hidden flex items-center">
          <motion.div
            className="flex items-center gap-6 sm:gap-9 whitespace-nowrap"
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 30,
            }}
          >
            {marqueeItems.map((brand, idx) => (
              <div key={`orange-${idx}`} className="flex items-center gap-6 sm:gap-9">
                <span className="text-white font-extrabold text-xs sm:text-sm md:text-base tracking-wider uppercase font-display">
                  {brand}
                </span>
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/90 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L22 12L12 22L2 12L12 2Z" />
                </svg>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};
