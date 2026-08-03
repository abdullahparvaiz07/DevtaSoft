import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { ArrowRight, Lightbulb, Users, Award } from 'lucide-react';

interface AboutSectionProps {
  onReadMoreClick?: () => void;
}

interface CountUpProps {
  target: number;
  suffix?: string;
  duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({ target, suffix = '', duration = 2 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration,
        ease: 'easeOut',
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

const stats = [
  {
    number: 5,
    suffix: '+',
    label: 'Years of Experience',
    color: 'text-[#FF8706]',
  },
  {
    number: 250,
    suffix: '+',
    label: 'Projects Completed',
    color: 'text-[#14B8B0]',
  },
  {
    number: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    color: 'text-[#7C3AED]',
  },
];

const values = [
  {
    number: '01',
    title: 'Innovation',
    description:
      'We embrace new ideas and technologies to build smart, future-ready solutions that create real impact.',
    icon: Lightbulb,
    iconColor: '#FF8706',
    bgColor: '#FFEFE5',
    numColor: 'text-[#FF8706]',
  },
  {
    number: '02',
    title: 'Collaboration',
    description:
      'We work closely with our clients as partners, ensuring transparency, communication, and shared success at every step.',
    icon: Users,
    iconColor: '#14B8B0',
    bgColor: '#E6F8F9',
    numColor: 'text-[#14B8B0]',
  },
  {
    number: '03',
    title: 'Quality',
    description:
      'We are committed to delivering reliable, scalable, and secure solutions with the highest standards of quality.',
    icon: Award,
    iconColor: '#FF8706',
    bgColor: '#FFEFE5',
    numColor: 'text-[#FF8706]',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.2,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

export const AboutSection: React.FC<AboutSectionProps> = ({ onReadMoreClick }) => {
  return (
    <section id="about" className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-12 font-sans overflow-hidden relative">
      
      {/* Floating Decorative Dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <motion.div
          className="absolute top-1/2 left-8 w-3 h-3 rounded-full bg-[#FF8706]/40"
          animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-2/3 right-12 w-2.5 h-2.5 rounded-full bg-[#53E5E7]/50"
          animate={{ y: [0, 8, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute bottom-16 left-1/3 w-2 h-2 rounded-full bg-[#FF8706]/30"
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto py-4 relative z-10 flex flex-col gap-20 sm:gap-24">
        
        {/* ═══════════════════════════════════════════════════════════════
            TOP SECTION: Preserved exact headline, text, button & avatar.png
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Main Headline, Description & CTA */}
          <motion.div 
            className="lg:col-span-5 flex flex-col justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={containerVariants}
          >
            {/* Eyebrow Label */}
            <motion.div className="flex items-center gap-2.5 mb-5" variants={itemVariants}>
              <span className="h-[3px] w-8 bg-[#14B8B0] rounded-full inline-block" />
              <span className="text-[#14B8B0] font-extrabold text-sm sm:text-base uppercase tracking-[0.18em]">
                ABOUT US
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2 
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[52px] text-[#2A285F] leading-[1.1] tracking-tight mb-4"
              variants={itemVariants}
            >
              Building Digital <br />
              Solutions That <br />
              <span className="text-[#FF8706] inline-block">
                Drive Real Impact.
              </span>
            </motion.h2>

            {/* Decorative Teal Squiggle Underline */}
            <motion.div className="mb-6" variants={itemVariants}>
              <svg width="140" height="14" viewBox="0 0 120 12" fill="none" className="text-[#14B8B0]">
                <path
                  d="M2 6 C 20 1, 40 11, 60 6 C 80 1, 100 11, 118 6"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>

            {/* Paragraph Text */}
            <motion.p 
              className="text-[#6B7280] text-lg sm:text-xl leading-relaxed max-w-lg mb-8 font-normal"
              variants={itemVariants}
            >
              DevtaSoft is a team of passionate thinkers, designers, and developers building intelligent, scalable and impactful digital solutions for businesses worldwide.
            </motion.p>

            {/* CTA Button */}
            <motion.div className="flex items-center gap-4" variants={itemVariants}>
              <button
                onClick={onReadMoreClick}
                className="group inline-flex items-center gap-3 bg-[#FF8706] hover:bg-[#E07200] text-white font-bold text-base sm:text-lg px-9 py-4 rounded-full shadow-lg shadow-[#FF8706]/25 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
              >
                <span>Read more</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Developer Illustration (avatar.png) & Statistics Card */}
          <motion.div 
            className="lg:col-span-7 relative flex flex-col items-center justify-center pt-4 pb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={imageVariants}
          >
            {/* Main Image Container */}
            <div className="relative z-10 w-full max-w-xl">

              {/* Image Box with Smooth Hover Zoom */}
              <div className="relative rounded-2xl overflow-hidden group">
                <img
                  src="/avatar.png"
                  alt="DevtaSoft Team"
                  className="w-full h-[320px] sm:h-[400px] lg:h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out border-none outline-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Stats Card Overlapping Image */}
              <motion.div 
                className="absolute -bottom-10 sm:-bottom-8 left-1/2 -translate-x-1/2 w-[92%] sm:w-[90%] bg-white rounded-2xl py-4 px-3 sm:px-6 shadow-xl z-20 flex items-center justify-between transition-transform duration-300 hover:scale-[1.02]"
                animate={{ y: [0, -4, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 4,
                  ease: 'easeInOut',
                }}
              >
                {stats.map((stat, i) => (
                  <React.Fragment key={stat.label}>
                    <div className="flex flex-col items-center text-center px-1 group cursor-pointer">
                      <span className={`font-display font-extrabold text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110 ${stat.color}`}>
                        <CountUp target={stat.number} suffix={stat.suffix} />
                      </span>
                      <span className="text-[10px] sm:text-xs font-semibold text-[#6b7280] mt-0.5 leading-snug group-hover:text-[#0D152A] transition-colors">
                        {stat.label}
                      </span>
                    </div>

                    {/* Vertical Divider between stats */}
                    {i < stats.length - 1 && (
                      <div className="w-[1px] h-10 bg-gray-100 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </motion.div>

            </div>
          </motion.div>

        </div>


        {/* ═══════════════════════════════════════════════════════════════
            NEW LOWER SECTION: "WHAT DRIVES US" — Premium Company Values
        ═══════════════════════════════════════════════════════════════ */}
        <div className="pt-8 sm:pt-12">
          
          {/* Section Header Left Aligned (Matching Hero Section Alignment) */}
          <motion.div
            className="flex flex-col items-start text-left max-w-3xl mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={containerVariants}
          >
            {/* Eyebrow Label */}
            <motion.div className="flex items-center gap-2.5 mb-3" variants={itemVariants}>
              <span className="text-[#53E5E7] font-extrabold text-sm uppercase tracking-[0.2em]">
                WHAT DRIVES US
              </span>
              <span className="h-[2px] w-7 bg-[#53E5E7] rounded-full inline-block" />
            </motion.div>

            {/* Heading */}
            <motion.h3 
              className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] text-[#2A285F] leading-tight tracking-tight mb-4"
              variants={itemVariants}
            >
              Driven by ideas. Built with <span className="text-[#FF8706]">purpose.</span>
            </motion.h3>

            {/* Short Description */}
            <motion.p 
              className="text-[#6B7280] font-normal text-base sm:text-lg max-w-2xl leading-relaxed"
              variants={itemVariants}
            >
              Our values are at the heart of everything we do. They guide our decisions, shape our work, and define how we build digital solutions.
            </motion.p>
          </motion.div>

          {/* Editorial 3-Column Values Block (No heavy cards, thin vertical separators) */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 lg:divide-x divide-slate-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={containerVariants}
          >
            {values.map((val, idx) => {
              const IconComp = val.icon;
              const isCenteredTablet = idx === 2 ? 'md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:max-w-none' : '';
              return (
                <motion.div
                  key={val.number}
                  className={`flex flex-col items-start px-6 lg:px-10 py-8 lg:py-4 transition-all duration-300 hover:translate-y-[-2px] group ${isCenteredTablet}`}
                  variants={itemVariants}
                >
                  {/* Soft Circular Icon Container */}
                  <motion.div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-xs border border-white/60 transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: val.bgColor }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <IconComp className="w-6 h-6 stroke-[2]" style={{ color: val.iconColor }} />
                  </motion.div>

                  {/* Number Accent */}
                  <span className={`font-display font-extrabold text-base sm:text-lg tracking-wider mb-2 ${val.numColor}`}>
                    {val.number}
                  </span>

                  {/* Title */}
                  <h4 className="font-display font-extrabold text-2xl text-[#2A285F] mb-3 leading-snug group-hover:text-[#FF8706] transition-colors">
                    {val.title}
                  </h4>

                  {/* Description */}
                  <p className="text-[#6B7280] font-normal text-sm sm:text-base leading-relaxed">
                    {val.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
