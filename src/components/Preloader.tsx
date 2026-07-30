import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Keep loader active for initial load experience
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className="fixed inset-0 z-[99999] bg-[#090D16] flex flex-col items-center justify-center p-6 overflow-hidden select-none"
        >
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#FF8706]/15 via-[#53E5E7]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* DevtaSoft Light Logo */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Logo isLight={true} />
            </motion.div>

            {/* Custom Dual-Block Animated Spinner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="my-2"
            >
              <div className="spinner" />
            </motion.div>

            {/* Subtitle Copy & Loading Line */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <span className="font-display font-extrabold text-sm tracking-[0.2em] text-[#53E5E7] uppercase">
                DevtaSoft Digital Studio
              </span>
              <p className="text-slate-400 font-medium text-xs sm:text-sm">
                Engineering high-performance software & web solutions...
              </p>

              {/* Progress Line */}
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mt-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#FF8706] to-[#53E5E7] rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.6, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
