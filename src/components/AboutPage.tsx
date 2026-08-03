import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  MessageSquare,
  FileText,
  Code,
  Rocket,
  Play,
  Award,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Sparkles,
} from 'lucide-react';
import { DotGrid } from './DotGrid';

interface AboutPageProps {
  onContactClick: () => void;
  onStartProjectClick?: () => void;
}

/* ── Custom Pixel-Accurate Service Logos matching Reference Image ── */

const CodeIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="13.5" y1="4" x2="10.5" y2="20" />
  </svg>
);

const RobotIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="10" width="18" height="11" rx="3" />
    <circle cx="8.5" cy="15" r="1.5" fill="currentColor" />
    <circle cx="15.5" cy="15" r="1.5" fill="currentColor" />
    <line x1="12" y1="3" x2="12" y2="7" />
    <circle cx="12" cy="3" r="1.5" fill="currentColor" />
    <path d="M9.5 19c1 .6 2 .6 3 0" />
  </svg>
);

const MobileIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="2" width="12" height="20" rx="3" />
    <line x1="11.5" y1="18" x2="12.5" y2="18" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const WebIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <line x1="2" y1="9" x2="22" y2="9" />
    <circle cx="5.5" cy="6.5" r="1" fill="currentColor" />
    <circle cx="8.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);

const VectorIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a3 3 0 0 0-3 3c0 .8.3 1.5.8 2L5 12l-2-2a2 2 0 1 0-2.8 2.8l3 3A2 2 0 0 0 5 16h.2l4.8 4.8A3 3 0 1 0 14.2 19L19 14.2v-.2a2 2 0 0 0 .2-3.8l3-3A2 2 0 1 0 19.4 4.4l-2 2a3 3 0 0 0-2.6-1.6z" />
    <circle cx="12" cy="6" r="1.5" fill="currentColor" />
  </svg>
);

const InfinityIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 12c-2-2.5-4-4-6.5-4A4.5 4.5 0 0 0 1 12.5 4.5 4.5 0 0 0 5.5 17C8 17 10 15.5 12 13c2 2.5 4 4 6.5 4a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0-4.5-4.5C16 8 14 9.5 12 12z" />
  </svg>
);

const SeoIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.5" y2="16.5" />
  </svg>
);

const PencilIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

const WordpressLogo: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#FF6B00">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 1.2c5.964 0 10.8 4.836 10.8 10.8 0 2.22-.67 4.28-1.815 6L16.35 4.57c.895-.425 1.905-.67 2.97-.67 1.066 0 2.076.245 2.97.67l-1.59 3.96zm-7.653 4.24l4.167 11.458C7.548 16.284 6.766 15.47 6.244 14.492L4.347 5.44zm12.302.007c.692.684 1.127 1.624 1.127 2.66 0 1.258-.616 2.374-1.393 3.655l-1.35 2.276 3.615-10.373c-1.32-.932-2.93-1.488-4.675-1.488-1.025 0-2.008.193-2.915.545l5.59 2.725zM12 22.8c-2.107 0-4.07-.568-5.757-1.558l2.62-7.616 3.53 7.638L12.158 13.48l-2.698 7.84c.806.236 1.657.365 2.54.365 2.64 0 4.97-1.107 6.61-2.887l-1.636-4.767-4.816-.551z" />
  </svg>
);

const ShopifyLogo: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M15.8 4.2c-.3 0-.6.2-.8.5l-1.1 1.7c-.2.3-.6.5-1 .5H8.1c-.4 0-.8-.2-1-.5L6 4.7c-.2-.3-.5-.5-.8-.5H3v2.2h1.4l2.1 10.3c.2 1.1 1.2 1.8 2.3 1.8h8.4c1.1 0 2.1-.7 2.3-1.8l2.1-10.3H23V4.2h-4.2z" fill="#5E8E3E"/>
    <path d="M12.5 12.8c-.8 0-1.2-.4-1.2-1 0-.7.6-1 1.5-1.1l1.5-.2v-1c0-.6-.4-.9-1.1-.9-.7 0-1.1.2-1.4.6l-.8-.6c.5-.7 1.3-1 2.3-1 1.4 0 2.2.7 2.2 1.9v3.4h-1.1v-.7c-.4.5-1.1.8-1.9.8zm.3-1c.6 0 1.2-.3 1.5-.7v-.9l-1.3.2c-.5.1-.8.3-.8.7 0 .4.3.7.6.7z" fill="#FFFFFF"/>
  </svg>
);

/* ── Animation Variants ── */
const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
      duration: 1,
    },
  },
};

const heroFadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

const heroSlideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

const cardStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

/* ── What Can We Do Cards Data (10 Service Cards from Reference Image) ── */
const servicesData = [
  {
    title: 'Custom Software Development',
    desc: 'Scalable, secure and high-performance software tailored to your business goals.',
    icon: CodeIcon,
    bgClass: 'bg-[#FFF0E5] text-[#FF6B00]',
  },
  {
    title: 'AI & Automation',
    desc: 'Intelligent automation and AI solutions that streamline operations.',
    icon: RobotIcon,
    bgClass: 'bg-[#E3FAF6] text-[#00C2C7]',
  },
  {
    title: 'Mobile App Development',
    desc: 'User-friendly mobile apps for iOS and Android that engage users.',
    icon: MobileIcon,
    bgClass: 'bg-[#E3FAF6] text-[#00C2C7]',
  },
  {
    title: 'Web Development',
    desc: 'Modern, responsive websites that represent your brand and drive results.',
    icon: WebIcon,
    bgClass: 'bg-[#EDE7FE] text-[#7C5CFF]',
  },
  {
    title: 'UI/UX Design',
    desc: 'Beautiful, intuitive and user-centered designs that create impact.',
    icon: VectorIcon,
    bgClass: 'bg-[#EDE7FE] text-[#7C5CFF]',
  },
  {
    title: 'DevOps',
    desc: 'Streamline development and deployment with reliable DevOps practices.',
    icon: InfinityIcon,
    bgClass: 'bg-[#E3FAF6] text-[#00C2C7]',
  },
  {
    title: 'SEO (Search Engine Optimization)',
    desc: 'Improve rankings, increase organic traffic and grow your online visibility.',
    icon: SeoIcon,
    bgClass: 'bg-[#E3FAF6] text-[#00C2C7]',
  },
  
  {
    title: 'WordPress Development',
    desc: 'Fast, secure and responsive WordPress websites built to perform.',
    icon: WordpressLogo,
    bgClass: 'bg-[#FFF0E5] text-[#FF6B00]',
  },
  {
    title: 'Shopify Store Development',
    desc: 'High-converting Shopify stores designed to boost sales and grow your brand.',
    icon: ShopifyLogo,
    bgClass: 'bg-[#E6F9EC] text-[#5E8E3E]',
  },
];

/* ── Timeline Data (Process) ── */
const timelineSteps = [
  {
    num: '01',
    title: 'Discover',
    desc: 'We understand your goals, challenges and requirements through deep conversations.',
    icon: MessageSquare,
    iconColor: '#FF8706',
    bgColor: '#FFEFE5',
  },
  {
    num: '02',
    title: 'Plan',
    desc: 'We analyze, research and create a strategic plan tailored to your needs.',
    icon: FileText,
    iconColor: '#14B8B0',
    bgColor: '#E6F8F9',
  },
  {
    num: '03',
    title: 'Design',
    desc: 'We design intuitive interfaces and experiences that are simple and effective.',
    icon: PencilIcon,
    iconColor: '#FF8706',
    bgColor: '#FFEFE5',
  },
  {
    num: '04',
    title: 'Develop',
    desc: 'We build robust, scalable and secure solutions using modern technologies.',
    icon: Code,
    iconColor: '#14B8B0',
    bgColor: '#E6F8F9',
  },
  {
    num: '05',
    title: 'Launch & Support',
    desc: 'We test, deploy and support you to ensure long-term success and growth.',
    icon: Rocket,
    iconColor: '#7C3AED',
    bgColor: '#F3E8FF',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onContactClick, onStartProjectClick }) => {
  /* Scroll to top on mount */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="w-full bg-white text-[#2A285F] font-sans overflow-hidden selection:bg-[#FF8706]/20 selection:text-[#FF8706]">
      
      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-white pt-12 lg:pt-16 pb-20 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* LEFT COLUMN: 48% Width */}
            <motion.div
              className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-4"
              initial="hidden"
              animate="visible"
              variants={heroContainer}
            >
              {/* Eyebrow label */}
              <motion.div className="flex items-center gap-2.5 mb-6" variants={heroFadeUp}>
                <span className="text-[#14B8B0] font-extrabold text-sm sm:text-base uppercase tracking-[0.2em]">
                  ABOUT US
                </span>
                <span className="h-[2px] w-8 bg-[#14B8B0] rounded-full inline-block" />
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[58px] xl:text-[62px] text-[#2A285F] leading-[1.12] tracking-tight mb-6"
                variants={heroFadeUp}
              >
                We are a team <br />
                of builders, thinkers <br />
                and{' '}
                <span className="text-[#FF8706] inline-block">
                  problem solvers.
                </span>
              </motion.h1>

              {/* Paragraph Text */}
              <motion.p
                className="text-base sm:text-lg text-[#475569] max-w-[560px] leading-relaxed font-normal mb-10"
                variants={heroFadeUp}
              >
                DevtaSoft is a software house focused on creating intelligent solutions, AI-driven systems, custom applications and scalable digital products that help businesses grow, automate and lead in the digital world.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                className="flex items-center gap-4 sm:gap-6 flex-wrap"
                variants={heroFadeUp}
              >
                {/* Primary Button */}
                <button
                  onClick={onContactClick}
                  className="group bg-[#FF8706] hover:bg-[#E07200] text-white font-semibold text-base sm:text-lg px-8 py-4 rounded-2xl shadow-lg shadow-[#FF8706]/25 flex items-center gap-3 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-xl hover:shadow-[#FF8706]/35 active:scale-[0.98] cursor-pointer"
                >
                  <span>Let's Build Together</span>
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
                  </div>
                </button>

                {/* Secondary Button */}
                <button
                  onClick={() => {
                    const servicesElem = document.getElementById('what-can-we-do');
                    if (servicesElem) servicesElem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group bg-transparent hover:bg-slate-50 text-[#2A285F] font-semibold text-base sm:text-lg px-7 py-4 rounded-2xl border border-slate-200 hover:border-[#FF8706]/40 flex items-center gap-3 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-[#2A285F]/5 flex items-center justify-center transition-colors group-hover:bg-[#FF8706]/10">
                    <Play className="w-3.5 h-3.5 text-[#2A285F] fill-[#2A285F] group-hover:text-[#FF8706] group-hover:fill-[#FF8706] transition-colors" />
                  </div>
                  <span>Know More About Us</span>
                </button>
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN: 52% Width Illustration */}
            <motion.div
              className="lg:col-span-6 flex justify-center lg:justify-end relative"
              initial="hidden"
              animate="visible"
              variants={heroSlideRight}
            >
              <div className="relative w-full max-w-[580px] flex items-center justify-center">
                
                {/* Soft Organic Orange Blob Behind Image (No Gradients) */}
                <div
                  className="absolute inset-0 -m-6 sm:-m-10 bg-[#FFEFE5]/80 rounded-[48px] pointer-events-none transform rotate-[-2deg] scale-[0.96]"
                  style={{
                    borderRadius: '60% 40% 55% 45% / 45% 55% 45% 55%',
                  }}
                />


                {/* Team Illustration Image */}
                <div className="relative z-10 w-full rounded-[24px] overflow-hidden">
                  <img
                    src="/illustration.png"
                    alt="DevtaSoft Team Builders and Thinkers"
                    className="w-full h-auto object-contain max-h-[500px] drop-shadow-sm transition-transform duration-700 hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 1.5 — EXECUTIVE LEADERSHIP PROFILE (EXACT MATCH TO REFERENCE IMAGE)
      ═══════════════════════════════════════════ */}
      <section className="relative w-full py-20 sm:py-28 bg-[#FAFCFF] text-[#0D152A] overflow-hidden border-t border-slate-100">
        
        {/* Left Cyan DotGrid Background Asset */}
        <div className="absolute top-12 left-6 opacity-30 pointer-events-none hidden lg:block">
          <DotGrid width={160} height={160} dotColor="#00C2CC" />
        </div>

        {/* Right Circular Concentric Ring Outlines */}
        <div className="absolute top-8 right-0 w-[450px] h-[450px] border border-orange-200/40 rounded-full pointer-events-none translate-x-1/3 -translate-y-1/4">
          <div className="w-full h-full border border-orange-200/30 rounded-full m-8" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          
          {/* Section Header Left Aligned (Matching Hero Section Alignment) */}
          <motion.div
            className="flex flex-col items-start text-left max-w-3xl mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={heroContainer}
          >
            {/* Eyebrow Label */}
            <motion.div className="flex items-center gap-3 mb-4" variants={heroFadeUp}>
              <span className="text-[#FF6B00] font-extrabold text-xs sm:text-sm uppercase tracking-[0.25em]">
                EXECUTIVE LEADERSHIP
              </span>
              <span className="h-[2px] w-8 bg-[#FF6B00] rounded-full inline-block" />
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[46px] text-[#0D152A] leading-tight tracking-tight mb-4"
              variants={heroFadeUp}
            >
              Leadership Driving Innovation
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="text-slate-500 font-medium text-base sm:text-lg leading-relaxed max-w-2xl"
              variants={heroFadeUp}
            >
              Guided by vision, powered by expertise. Our leadership drives innovation, delivers results, and builds the future at{' '}
              <span className="text-[#FF6B00] font-extrabold">DevtaSoft</span>.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* LEFT COLUMN: CEO Main Profile Card */}
            <motion.div
              className="lg:col-span-6 bg-white border border-slate-200/80 rounded-[32px] p-8 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] flex flex-col justify-between"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={heroFadeUp}
            >
              <div>
                {/* Header: Dark Avatar Box + Name & Role */}
                <div className="flex items-center gap-6 mb-7">
                  <div className="w-24 h-24 rounded-2xl bg-[#070B19] shadow-xl shadow-[#070B19]/20 flex items-center justify-center text-white text-3xl font-extrabold font-display shrink-0 border border-slate-800">
                    AQ
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-3xl text-[#0D152A] tracking-tight">
                      Awais Qarni
                    </h3>
                    <p className="text-[#00C2CC] font-bold text-base sm:text-lg mt-1">
                      Chief Executive Officer & Lead Architect
                    </p>
                  </div>
                </div>

                {/* Tagline Container */}
                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 mb-6 flex flex-wrap items-center gap-3 text-xs sm:text-sm font-bold text-slate-700">
                  <div className="flex items-center gap-1.5 text-[#FF6B00]">
                    <Code className="w-4 h-4" />
                    <span>Full Stack Developer</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="flex items-center gap-1 text-[#0D152A]">
                    <span className="font-mono text-[#00C2CC]">P</span>
                    <span>PHP</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="flex items-center gap-1 text-[#FF6B00]">
                    <Rocket className="w-3.5 h-3.5" />
                    <span>Laravel</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="flex items-center gap-1 text-[#00C2CC]">
                    <span className="animate-spin text-[11px]">⚛</span>
                    <span>React</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="flex items-center gap-1 text-[#7C5CFF]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Automation</span>
                  </div>
                </div>

                {/* Bio Paragraph matching reference image */}
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8">
                  Awais leads engineering teams to craft high-concurrency web architectures, enterprise API solutions, and AI-driven workflow systems designed for maximum scale and resilience. At DevtaSoft, he spearheads technical innovation and ensures excellence across every solution we build.
                </p>
              </div>

              {/* Core Expertise Section */}
              <div className="pt-6 border-t border-slate-100">
                <h4 className="font-display font-extrabold text-base text-[#0D152A] mb-4">
                  Core Expertise
                </h4>

                <div className="flex flex-wrap gap-2.5">
                  {[
                    { name: 'PHP', color: 'bg-slate-100 text-slate-800' },
                    { name: 'Laravel', color: 'bg-[#FFF0E5] text-[#FF6B00]' },
                    { name: 'React.js', color: 'bg-[#E3FAF6] text-[#00C2CC]' },
                    { name: 'AI Automation', color: 'bg-[#EDE7FE] text-[#7C5CFF]' },
                    { name: 'MySQL', color: 'bg-[#E6F9EC] text-[#5E8E3E]' },
                    { name: 'REST APIs', color: 'bg-[#E3FAF6] text-[#00C2CC]' },
                    { name: 'System Architecture', color: 'bg-slate-100 text-slate-800' },
                  ].map((chip) => (
                    <span
                      key={chip.name}
                      className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border border-slate-200/50 shadow-2xs ${chip.color}`}
                    >
                      <span>{chip.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: 3 Cards matching Reference Image */}
            <motion.div
              className="lg:col-span-6 flex flex-col justify-between gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={cardStagger}
            >
              
              {/* Top Row Grid: 01. Certification & 02. Credential */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* 01. CERTIFICATION */}
                <motion.div
                  className="bg-white border border-slate-200/80 border-l-4 border-l-[#FF6B00] rounded-[24px] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 group"
                  variants={cardFadeUp}
                >
                  <div className="w-11 h-11 rounded-2xl bg-[#FFF0E5] text-[#FF6B00] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Award className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#FF6B00]">
                    01. CERTIFICATION
                  </span>
                  <h4 className="font-display font-extrabold text-lg text-[#0D152A] mt-1 mb-1 leading-snug">
                    Web Developer Certificate
                  </h4>
                  <p className="text-slate-600 font-bold text-xs mb-3">
                    Cybex IT Group (2023)
                  </p>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Advanced Web Development Certification specializing in modern web frameworks and full-stack software architecture.
                  </p>
                </motion.div>

                {/* 02. CREDENTIAL */}
                <motion.div
                  className="bg-white border border-slate-200/80 border-l-4 border-l-[#00C2CC] rounded-[24px] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 group"
                  variants={cardFadeUp}
                >
                  <div className="w-11 h-11 rounded-2xl bg-[#E3FAF6] text-[#00C2CC] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00C2CC]">
                    02. CREDENTIAL
                  </span>
                  <h4 className="font-display font-extrabold text-lg text-[#0D152A] mt-1 mb-1 leading-snug">
                    IEEE Member
                  </h4>
                  <p className="text-slate-600 font-bold text-xs mb-3">
                    IEEE Membership & Event Org (2025)
                  </p>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Active IEEE member promoting innovation, technical engineering standards, and collaborative digital solutions.
                  </p>
                </motion.div>

              </div>

              {/* Bottom Card: 03. CORE ENGINEERING FOCUS / Professional Focus Areas */}
              <motion.div
                className="bg-white border border-slate-200/80 border-l-4 border-l-[#00C2CC] rounded-[28px] p-7 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
                variants={cardFadeUp}
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#00C2CC] text-white flex items-center justify-center font-mono font-bold text-base shrink-0 shadow-md shadow-[#00C2CC]/25">
                    &gt;_
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00C2CC]">
                      03. CORE ENGINEERING FOCUS
                    </span>
                    <h4 className="font-display font-extrabold text-xl text-[#0D152A]">
                      Professional Focus Areas
                    </h4>
                  </div>
                </div>

                <p className="text-slate-500 text-xs sm:text-sm font-semibold mb-5">
                  My development priorities include:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    'Laravel ecosystem structures and API engineering.',
                    'Optimizing SQL database structures & relational schemas.',
                    'Clean architecture & secure input validations.',
                    'Third-party platform integrations (Stripe, external REST services).',
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-slate-200/70 flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium shadow-2xs hover:border-[#00C2CC]/50 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00C2CC] shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

            </motion.div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — WHAT CAN WE DO?
      ═══════════════════════════════════════════ */}
      <section id="what-can-we-do" className="relative w-full py-24 sm:py-32 bg-white border-t border-slate-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          
          {/* Section Header Left Aligned (Matching Hero Section Alignment) */}
          <motion.div
            className="flex flex-col items-start text-left max-w-3xl mb-16 sm:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={heroContainer}
          >
            {/* Eyebrow Label */}
            <motion.div className="flex items-center gap-2.5 mb-4" variants={heroFadeUp}>
              <span className="text-[#14B8B0] font-extrabold text-sm sm:text-base uppercase tracking-[0.2em]">
                WHAT CAN WE DO?
              </span>
              <span className="h-[2px] w-8 bg-[#14B8B0] rounded-full inline-block" />
            </motion.div>

            {/* Title */}
            <motion.h2
              className="font-display font-extrabold text-3xl sm:text-5xl text-[#2A285F] leading-tight tracking-tight"
              variants={heroFadeUp}
            >
              We build digital solutions <br />
              that solve <span className="text-[#FF8706]">real problems.</span>
            </motion.h2>
          </motion.div>

          {/* 10 Service Cards Grid matching Reference Image */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-6 sm:gap-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={cardStagger}
          >
            {servicesData.map((service) => {
              const IconComp = service.icon;
              return (
                <motion.div
                  key={service.title}
                  className="flex items-start gap-4 sm:gap-5 pb-6 border-b border-slate-100 transition-all duration-300 hover:translate-x-1 group cursor-pointer"
                  variants={cardFadeUp}
                >
                  {/* Circle Icon Badge */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${service.bgClass}`}>
                    <IconComp className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2]" />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col pt-0.5">
                    <h3 className="font-display font-extrabold text-[#1E1B4B] text-lg sm:text-xl leading-snug group-hover:text-[#FF8706] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[#64748B] font-medium text-sm sm:text-base leading-relaxed mt-1">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 3 — PROCESS / HOW DO WE DO IT?
      ═══════════════════════════════════════════ */}
      <section className="relative w-full py-24 sm:py-32 bg-[#F9FAFC] border-t border-b border-[#ECECEC]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          
          {/* Header Row */}
          <motion.div
            className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-20 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={heroContainer}
          >
            {/* Left Headline */}
            <motion.div variants={heroFadeUp}>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-[#2A285F] leading-[1.12] tracking-tight">
                A clear process. <br />
                <span className="text-[#FF8706]">Better results.</span>
              </h2>
            </motion.div>

            {/* Right Subtitle */}
            <motion.div variants={heroFadeUp} className="max-w-md">
              <p className="text-[#667085] font-medium text-base sm:text-lg leading-relaxed">
                We follow a collaborative and agile approach to deliver quality solutions on time and with transparency at every step.
              </p>
            </motion.div>
          </motion.div>

          {/* Timeline Nodes Row */}
          <div className="relative w-full pt-4 pb-8">
            
            {/* Connecting Horizontal Line (Desktop) */}
            <div className="hidden lg:block absolute top-[52px] left-[8%] right-[8%] h-[2px] bg-[#ECECEC] z-0">
              {/* Active Animated Glowing Line Overlay */}
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF8706] via-[#14B8B0] to-[#7C3AED] rounded-full"
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </div>

            {/* 5 Steps Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6 relative z-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={cardStagger}
            >
              {timelineSteps.map((step) => {
                const StepIcon = step.icon;
                return (
                  <motion.div
                    key={step.num}
                    className="flex flex-col items-center text-center group"
                    variants={heroFadeUp}
                  >
                    {/* Circle Icon Node */}
                    <div className="relative mb-6">
                      <motion.div
                        className="w-20 h-20 rounded-full bg-white border-2 border-slate-100 shadow-[0_8px_25px_rgba(0,0,0,0.05)] flex items-center justify-center transition-all duration-400 group-hover:border-[#FF8706] group-hover:shadow-[0_12px_35px_rgba(255,135,6,0.18)]"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                          style={{ backgroundColor: step.bgColor }}
                        >
                          <StepIcon className="w-7 h-7 stroke-[2]" style={{ color: step.iconColor }} />
                        </div>
                      </motion.div>

                      {/* Small Active Indicator Dot */}
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#14B8B0] border-2 border-white group-hover:bg-[#FF8706] transition-colors" />
                    </div>

                    {/* Step Number */}
                    <span className="font-display font-extrabold text-xs tracking-widest text-[#14B8B0] uppercase mb-1">
                      {step.num}
                    </span>

                    {/* Step Title */}
                    <h3 className="font-display font-extrabold text-xl text-[#2A285F] mb-2 group-hover:text-[#FF8706] transition-colors">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-[#667085] font-medium text-sm leading-relaxed max-w-[220px]">
                      {step.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 4 — CTA BANNER
      ═══════════════════════════════════════════ */}
      <section className="relative w-full py-20 sm:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <motion.div
            className="relative w-full bg-white rounded-[24px] border border-[#FF8706]/30 shadow-[0_20px_60px_rgba(255,135,6,0.06)] p-10 sm:p-14 lg:p-16 overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={heroContainer}
          >
            {/* Background Tiny Floating Particles / Dot Grid */}
            <div className="absolute top-4 left-4 opacity-40 pointer-events-none">
              <DotGrid rows={6} cols={8} dotColor="#FF8706" />
            </div>
            <div className="absolute bottom-4 right-4 opacity-30 pointer-events-none">
              <DotGrid rows={6} cols={8} dotColor="#53E5E7" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              
              {/* LEFT COLUMN: Text & CTA Button */}
              <motion.div className="lg:col-span-7 flex flex-col items-start" variants={heroFadeUp}>
                
                {/* Headline */}
                <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[52px] text-[#2A285F] leading-[1.12] tracking-tight mb-4">
                  Have an idea? <br />
                  Let's turn it into <br />
                  something{' '}
                  <span className="text-[#FF8706] inline-block">
                    incredible.
                  </span>
                </h2>

                {/* Paragraph */}
                <p className="text-[#667085] font-medium text-base sm:text-lg mb-8">
                  We'd love to hear about your project and explore how we can help.
                </p>

                {/* Button */}
                <button
                  onClick={onStartProjectClick || onContactClick}
                  className="group bg-[#FF8706] hover:bg-[#E07200] text-white font-semibold text-base sm:text-lg px-8 py-4 rounded-2xl shadow-lg shadow-[#FF8706]/25 flex items-center gap-3 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-xl hover:shadow-[#FF8706]/35 active:scale-[0.98] cursor-pointer"
                >
                  <span>Start Your Project</span>
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
                  </div>
                </button>
              </motion.div>

              {/* RIGHT COLUMN: DevtaSoft Logo */}
              <motion.div
                className="lg:col-span-5 flex justify-center lg:justify-end"
                variants={heroFadeUp}
              >
                <div className="relative p-2">
                  {/* Logo Image */}
                  <img
                    src="/logo.png"
                    alt="DevtaSoft Logo"
                    className="w-64 sm:w-80 lg:w-[400px] h-auto object-contain relative z-10"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>

            </div>

          </motion.div>

        </div>
      </section>

    </div>
  );
};
