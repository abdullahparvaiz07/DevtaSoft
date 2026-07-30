import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, CheckCircle2, ExternalLink, Zap, Users, ShieldCheck, Sparkles, Star, Globe } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  bgClass: string;
  logo: React.ReactNode;
  textColor: string;
  ctaColor: string;
}

const productsData: Product[] = [
  {
    id: 'repostseo',
    name: 'REPOSTSEO',
    description: 'AI-powered content repurposing tool that helps you rank higher and save time.',
    bgClass: 'bg-[#FAF6FC] border-[#EADDF3]',
    textColor: 'text-[#8E44AD]',
    ctaColor: 'text-[#8E44AD] hover:text-[#7D3C98]',
    logo: (
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8 shrink-0 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 18V6L12 12L4 18Z" fill="#14B8B0" />
            <path d="M12 18V6L20 12L12 18Z" fill="#0D152A" />
          </svg>
        </div>
        <span className="font-sans font-black text-xl text-[#0D152A] tracking-tight">REPOSTSEO</span>
      </div>
    ),
  },
  {
    id: 'editpad',
    name: 'Editpad',
    description: 'A simple and powerful online text editor for writing, editing and managing text content.',
    bgClass: 'bg-[#F0F7FB] border-[#D6EBF4]',
    textColor: 'text-[#14B8B0]',
    ctaColor: 'text-[#14B8B0] hover:text-[#0FA39C]',
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="relative w-7 h-7 shrink-0 bg-[#00C2CC]/10 border border-[#00C2CC]/30 rounded-lg flex items-center justify-center shadow-sm">
          <div className="absolute top-1 left-1.5 w-1 h-1 rounded-full bg-[#00C2CC]" />
          <div className="absolute top-2.5 left-1.5 w-1 h-1 rounded-full bg-[#00C2CC]" />
          <div className="absolute top-4 left-1.5 w-1 h-1 rounded-full bg-[#00C2CC]" />
          <div className="w-3.5 h-4 border-l border-[#00C2CC]/40 ml-2.5 mt-0.5 flex flex-col gap-0.5 justify-center">
            <div className="w-1.5 h-[1.5px] bg-[#00C2CC]/70" />
            <div className="w-2.5 h-[1.5px] bg-[#00C2CC]/70" />
            <div className="w-2 h-[1.5px] bg-[#00C2CC]/70" />
          </div>
        </div>
        <span className="font-sans font-extrabold text-xl text-[#0D152A] tracking-tight">Editpad</span>
      </div>
    ),
  },
  {
    id: 'allmath',
    name: 'AllMath',
    description: 'Smart math solver and calculator that helps students learn and solve problems easily.',
    bgClass: 'bg-[#F1FAF5] border-[#D5EFE0]',
    textColor: 'text-[#10B981]',
    ctaColor: 'text-[#10B981] hover:text-[#059669]',
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#10B981] flex items-center justify-center text-white font-black text-sm shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-2 gap-1 p-1 text-[10px] text-white/90">
            <span>+</span>
            <span>-</span>
            <span>×</span>
            <span>÷</span>
          </div>
        </div>
        <span className="font-sans font-extrabold text-xl text-[#0D152A] tracking-tight">AllMath</span>
      </div>
    ),
  },
  {
    id: 'calculators',
    name: 'Calculators.tech',
    description: 'Collection of free online calculators for everyday use. Fast, accurate and easy to use.',
    bgClass: 'bg-[#F8F9FA] border-[#E5E7EB]',
    textColor: 'text-[#0D152A]',
    ctaColor: 'text-[#0D152A] hover:text-[#FF6B00]',
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#0D152A] flex items-center justify-center text-white shadow-sm shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="16" y1="14" x2="16" y2="18" />
            <circle cx="8" cy="11" r="1" fill="currentColor" />
            <circle cx="12" cy="11" r="1" fill="currentColor" />
            <circle cx="16" cy="11" r="1" fill="currentColor" />
            <circle cx="8" cy="15" r="1" fill="currentColor" />
            <circle cx="12" cy="15" r="1" fill="currentColor" />
            <circle cx="8" cy="18" r="1" fill="currentColor" />
            <circle cx="12" cy="18" r="1" fill="currentColor" />
          </svg>
        </div>
        <span className="font-sans font-extrabold text-xl text-[#0D152A] tracking-tight">Calculators.tech</span>
      </div>
    ),
  },
  {
    id: 'dapa',
    name: 'DA PA Checker',
    description: 'Check Domain Authority and Page Authority instantly and improve your SEO strategy.',
    bgClass: 'bg-[#FAF2F1] border-[#F2DDD9]',
    textColor: 'text-[#EF4444]',
    ctaColor: 'text-[#EF4444] hover:text-[#DC2626]',
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[#EF4444] flex items-center justify-center text-white shadow-sm shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        </div>
        <span className="font-sans font-extrabold text-xl text-[#0D152A] tracking-tight">DA PA Checker</span>
      </div>
    ),
  },
  {
    id: 'summarizer',
    name: 'SUMMARIZER',
    description: 'Summarize long articles and text into short, clear and meaningful content in seconds.',
    bgClass: 'bg-[#F2F4FB] border-[#DCE1F2]',
    textColor: 'text-[#3F51B5]',
    ctaColor: 'text-[#3F51B5] hover:text-[#303F9F]',
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="relative w-8 h-8 shrink-0 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="16" rx="2" fill="#E8EAF6" stroke="#3F51B5" strokeWidth="2" />
            <line x1="7" y1="8" x2="17" y2="8" stroke="#3F51B5" strokeWidth="2" strokeLinecap="round" />
            <line x1="7" y1="12" x2="13" y2="12" stroke="#3F51B5" strokeWidth="2" strokeLinecap="round" />
            <circle cx="16" cy="15" r="3" fill="#E8EAF6" stroke="#FF8706" strokeWidth="2" />
            <line x1="18.5" y1="17.5" x2="21" y2="20" stroke="#FF8706" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <span className="font-sans font-black text-xl text-[#1E3A8A] tracking-tight">SUMMARIZER</span>
      </div>
    ),
  },
  {
    id: 'online_notepad',
    name: 'Online Notepad',
    description: 'A fast and secure online notepad to write, edit and save your notes in the cloud.',
    bgClass: 'bg-[#EFF8FA] border-[#D1EBF0]',
    textColor: 'text-[#06B6D4]',
    ctaColor: 'text-[#06B6D4] hover:text-[#0891B2]',
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#06B6D4] flex flex-col justify-between p-1.5 shadow-sm text-white shrink-0">
          <div className="flex gap-1">
            <span className="w-1 h-1 rounded-full bg-white opacity-40"></span>
            <span className="w-3.5 h-[3px] bg-white rounded-full"></span>
          </div>
          <div className="flex gap-1">
            <span className="w-1 h-1 rounded-full bg-white opacity-40"></span>
            <span className="w-4 h-[3px] bg-white rounded-full"></span>
          </div>
          <div className="flex gap-1">
            <span className="w-1 h-1 rounded-full bg-white opacity-40"></span>
            <span className="w-2.5 h-[3px] bg-white rounded-full"></span>
          </div>
        </div>
        <span className="font-sans font-extrabold text-xl text-[#0D152A] tracking-tight">Online Notepad</span>
      </div>
    ),
  },
  {
    id: 'numblee',
    name: 'NUMBLEE',
    description: 'Fun way to learn math through engaging games and interactive challenges.',
    bgClass: 'bg-[#F2F6FB] border-[#DFE7F2]',
    textColor: 'text-[#3B82F6]',
    ctaColor: 'text-[#3B82F6] hover:text-[#2563EB]',
    logo: (
      <div className="flex items-center gap-0.5 select-none">
        <span className="font-display font-black text-xl bg-[#3B82F6] text-white px-1.5 py-0.5 rounded shadow-sm">N</span>
        <span className="font-display font-black text-xl bg-[#F59E0B] text-white px-1.5 py-0.5 rounded shadow-sm">U</span>
        <span className="font-display font-black text-xl bg-[#10B981] text-white px-1.5 py-0.5 rounded shadow-sm">M</span>
        <span className="font-display font-black text-xl bg-[#EC4899] text-white px-1.5 py-0.5 rounded shadow-sm">B</span>
        <span className="font-display font-black text-xl text-[#0D152A] tracking-tight ml-1">LEE</span>
      </div>
    ),
  },
];

// ─── Product Modal Details Data ──────────────────────────────────────────
const productModalDetails: Record<string, {
  tagline: string;
  longDesc: string;
  stats: { value: string; label: string }[];
  features: { title: string; desc: string }[];
  badges: string[];
  themeColor: string;
  themeBg: string;
}> = {
  repostseo: {
    tagline: 'Transform One Piece of Content Into 10+ SEO Powerhouses',
    longDesc: 'REPOSTSEO automates content repurposing using advanced natural language processing. Convert blog posts into social threads, videos into articles, and rank higher across search engines effortlessly.',
    stats: [
      { value: '1M+', label: 'Articles Repurposed' },
      { value: '99.4%', label: 'SEO Score Match' },
      { value: '5x', label: 'Faster Creation' }
    ],
    features: [
      { title: 'AI Content Transformer', desc: 'Instantly adapt blogs for LinkedIn, Twitter/X, Medium, and Newsletter formats.' },
      { title: 'Keyword Optimization', desc: 'Auto-inject relevant LSI keywords to ensure top search engine rankings.' },
      { title: 'Multi-Language Support', desc: 'Repurpose and translate content seamlessly into 30+ global languages.' },
      { title: 'Plagiarism & AI Detector', desc: 'Ensure 100% unique, human-like readable content with built-in audit tools.' }
    ],
    badges: ['AI Engine 4.0', 'NLP Powered', 'SEO Optimized', 'API Available'],
    themeColor: '#8E44AD',
    themeBg: '#FAF6FC',
  },
  editpad: {
    tagline: 'Distraction-Free Writing & Instant Document Polishing',
    longDesc: 'Editpad is a fast, web-based plain text editor and writing companion trusted by millions of students, writers, and developers worldwide for clean content creation and editing.',
    stats: [
      { value: '10M+', label: 'Monthly Active Users' },
      { value: '< 50ms', label: 'Instant Load' },
      { value: '100%', label: 'Free & Privacy First' }
    ],
    features: [
      { title: 'Smart Paraphrasing', desc: 'Rewrite sentences and paragraphs with varying tone controls.' },
      { title: 'Live Word & Character Count', desc: 'Track reading time, word count, line density, and character metrics live.' },
      { title: 'Cloud Auto-Save', desc: 'Never lose a single word with instant local and cloud session persistence.' },
      { title: 'One-Click File Export', desc: 'Download notes in TXT, DOCX, or PDF formats with zero formatting hassle.' }
    ],
    badges: ['Web Editor', 'No Signup Needed', 'Light & Dark Mode', 'Auto-Save'],
    themeColor: '#14B8B0',
    themeBg: '#F0F7FB',
  },
  allmath: {
    tagline: 'Solve Complex Equations step-by-step in Seconds',
    longDesc: 'AllMath provides comprehensive calculators, step-by-step problem solvers, and interactive math visualizers for students, educators, and STEM professionals.',
    stats: [
      { value: '500+', label: 'Math Calculators' },
      { value: '5M+', label: 'Equations Solved' },
      { value: '99.9%', label: 'Accuracy Rate' }
    ],
    features: [
      { title: 'Step-by-Step Solutions', desc: 'Break down complex algebra, calculus, and geometry problems with clear explanations.' },
      { title: 'Interactive Graphing', desc: 'Plot equations and functions dynamically with real-time parameter tweaking.' },
      { title: 'Formula Database', desc: 'Access thousands of verified mathematical formulas and constants.' },
      { title: 'Unit & Physics Converters', desc: 'Convert units across length, mass, thermodynamics, and electrical engineering.' }
    ],
    badges: ['Calculus & Algebra', 'Interactive Graphs', 'STEM Ready', 'Mobile Friendly'],
    themeColor: '#10B981',
    themeBg: '#F1FAF5',
  },
  calculators: {
    tagline: 'Precision Calculations for Business, Finance, and Daily Tasks',
    longDesc: 'Calculators.tech is an extensive online portal offering specialized calculation utilities ranging from mortgage estimation to scientific data crunching.',
    stats: [
      { value: '300+', label: 'Custom Tools' },
      { value: '15M+', label: 'Calculations / Mo' },
      { value: '0.1s', label: 'Response Time' }
    ],
    features: [
      { title: 'Financial & Mortgage', desc: 'Calculate loan interest, amortization schedules, and ROI effortlessly.' },
      { title: 'Health & Fitness', desc: 'BMI, TDEE, macro ratios, and calorie deficit calculators built for accuracy.' },
      { title: 'Business & Tax', desc: 'Margin, markup, sales tax, and profit break-even tools for entrepreneurs.' },
      { title: 'Embeddable Widgets', desc: 'Embed any calculator directly into your own website with a simple script tag.' }
    ],
    badges: ['Finance & Tax', 'Health & Fitness', 'Embed Widgets', 'Ultra Fast'],
    themeColor: '#FF8706',
    themeBg: '#FFF8F3',
  },
  dapa: {
    tagline: 'Instant Domain Authority & Backlink Health Insights',
    longDesc: 'DA PA Checker provides real-time domain authority, page authority, spam score, and backlink statistics to help SEO specialists boost domain ranking.',
    stats: [
      { value: '50M+', label: 'Domains Scanned' },
      { value: '100%', label: 'Live Moz API Data' },
      { value: 'Bulk', label: 'Multi-URL Support' }
    ],
    features: [
      { title: 'Bulk Domain Search', desc: 'Check DA/PA for up to 50 URLs simultaneously in a single click.' },
      { title: 'Spam Score Detection', desc: 'Identify toxic backlink profiles before they impact your Google ranking.' },
      { title: 'Historical Authority Tracking', desc: 'Monitor domain authority trajectory over time with visual graph reports.' },
      { title: 'Exportable CSV Reports', desc: 'Download audit data formatted for client presentations and SEO audits.' }
    ],
    badges: ['Moz Metric Sync', 'Bulk Auditor', 'Spam Score Filter', 'CSV Export'],
    themeColor: '#EF4444',
    themeBg: '#FAF2F1',
  },
  summarizer: {
    tagline: 'Condense 5,000-Word Documents Into Bullet Points in Seconds',
    longDesc: 'SUMMARIZER leverages state-of-the-art NLP models to distill long research papers, news articles, and business reports into concise key takeaways without losing context.',
    stats: [
      { value: '80%', label: 'Time Saved Reading' },
      { value: '2M+', label: 'Summaries Generated' },
      { value: '100%', label: 'Key Meaning Retained' }
    ],
    features: [
      { title: 'Abstractive & Extractive AI', desc: 'Choose between bullet-point highlights or smooth narrative summaries.' },
      { title: 'Length Slider', desc: 'Control summary length from 10% to 50% of original text size.' },
      { title: 'PDF & Doc Upload', desc: 'Drag and drop PDF, DOCX, or web URLs for direct automated analysis.' },
      { title: 'Key Concepts Extraction', desc: 'Automatically extract entity names, dates, and core metrics.' }
    ],
    badges: ['NLP Engine', 'PDF & Doc Upload', 'Length Slider', 'Research Ready'],
    themeColor: '#3F51B5',
    themeBg: '#F2F4FB',
  },
  online_notepad: {
    tagline: 'Secure, Cloud-Synced Workspace for Quick Ideas',
    longDesc: 'Online Notepad offers a lightweight, distraction-free environment for rapid note-taking, rich-text editing, password-protected notes, and cloud syncing.',
    stats: [
      { value: '100%', label: 'End-to-End Encrypted' },
      { value: 'Zero', label: 'Lag Performance' },
      { value: 'Cloud', label: 'Cross-Device Sync' }
    ],
    features: [
      { title: 'Encrypted Password Lock', desc: 'Protect sensitive notes with AES-256 password protection.' },
      { title: 'Rich Formatting Bar', desc: 'Clean formatting tools for headers, lists, code blocks, and links.' },
      { title: 'Live Collaboration', desc: 'Share editable note links with teammates with live cursor sync.' },
      { title: 'Offline Web App (PWA)', desc: 'Works seamlessly offline and syncs back when connectivity restores.' }
    ],
    badges: ['Encrypted', 'PWA Offline', 'Live Collaboration', 'Cloud Sync'],
    themeColor: '#06B6D4',
    themeBg: '#EFF8FA',
  },
  numblee: {
    tagline: 'Gamified Mathematics That Makes Learning Addictive',
    longDesc: 'NUMBLEE transforms math practice for kids and students into interactive games, timed daily puzzles, and competitive global leaderboards.',
    stats: [
      { value: '500K+', label: 'Active Gamers' },
      { value: '4.9★', label: 'Parent Rating' },
      { value: '100+', label: 'Math Challenges' }
    ],
    features: [
      { title: 'Adaptive Difficulty', desc: 'Game algorithms adjust equation difficulty dynamically to student skill levels.' },
      { title: 'Daily Streak Rewards', desc: 'Encourage daily learning habits with badges, trophies, and avatar customization.' },
      { title: 'Multiplayer Speed Battles', desc: 'Compete against classmates or worldwide players in real-time math duels.' },
      { title: 'Parent & Teacher Dashboard', desc: 'Track progress, accuracy rates, and areas needing improvement.' }
    ],
    badges: ['Gamified STEM', 'Adaptive AI', 'Multiplayer Duels', 'Teacher Portal'],
    themeColor: '#3B82F6',
    themeBg: '#F2F6FB',
  },
};

// ─── Product Detail Modal Component ─────────────────────────────────────
const ProductDetailModal: React.FC<{
  product: Product | null;
  onClose: () => void;
  onExploreAll?: () => void;
}> = ({ product, onClose, onExploreAll }) => {
  if (!product) return null;
  const details = productModalDetails[product.id];
  if (!details) return null;

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Box Container */}
          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 lg:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-[28px] w-full max-w-[860px] max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-200 hover:scale-110 z-20 cursor-pointer"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>

              {/* Modal Header */}
              <div className="relative p-8 sm:p-10 pb-4 overflow-hidden">
                <div
                  className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: details.themeColor }}
                />

                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl border bg-white shadow-sm" style={{ borderColor: `${details.themeColor}30` }}>
                    {product.logo}
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-black px-3.5 py-1.5 rounded-full border shadow-xs"
                    style={{ backgroundColor: details.themeBg, color: details.themeColor, borderColor: `${details.themeColor}40` }}
                  >
                    <Sparkles className="w-3.5 h-3.5" /> DevtaSoft Product Suite
                  </span>
                </div>

                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0D152A] leading-tight mb-2">
                  {details.tagline}
                </h2>

                <p className="text-[#6B7280] font-medium text-sm sm:text-base leading-relaxed max-w-2xl">
                  {details.longDesc}
                </p>
              </div>

              {/* Key Stats Bar */}
              <div className="px-8 sm:px-10 py-4">
                <div className="grid grid-cols-3 gap-4">
                  {details.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl p-4 text-center border border-slate-100 shadow-xs"
                      style={{ backgroundColor: details.themeBg }}
                    >
                      <span className="font-display font-black text-2xl sm:text-3xl block mb-1" style={{ color: details.themeColor }}>
                        {stat.value}
                      </span>
                      <span className="text-[#667085] font-semibold text-xs sm:text-sm">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features List */}
              <div className="px-8 sm:px-10 py-6">
                <h3 className="font-display font-extrabold text-lg text-[#0D152A] mb-4">
                  Core Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {details.features.map((feat, i) => (
                    <motion.div
                      key={feat.title}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.12 + i * 0.07 }}
                      className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:border-slate-200 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: details.themeBg }}
                        >
                          <CheckCircle2 className="w-4 h-4" style={{ color: details.themeColor }} />
                        </div>
                        <div>
                          <h4 className="font-display font-extrabold text-sm text-[#0D152A] mb-1">
                            {feat.title}
                          </h4>
                          <p className="text-[#667085] font-medium text-xs leading-relaxed">
                            {feat.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Feature Badges */}
              <div className="px-8 sm:px-10 pb-6">
                <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-slate-400 mb-3">
                  Highlights
                </h3>
                <div className="flex flex-wrap gap-2">
                  {details.badges.map((badge) => (
                    <span
                      key={badge}
                      className="px-3.5 py-1.5 rounded-full font-bold text-xs border"
                      style={{
                        backgroundColor: details.themeBg,
                        color: details.themeColor,
                        borderColor: `${details.themeColor}30`,
                      }}
                    >
                      ✓ {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="px-8 sm:px-10 pb-8 sm:pb-10 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[#667085] font-medium text-sm text-center sm:text-left">
                  Interested in integrating or deploying {product.name}?
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      onExploreAll?.();
                    }}
                    className="inline-flex items-center gap-2 bg-[#FF6B00] hover:bg-[#E05B00] text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md shadow-[#FF6B00]/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <span>Try Product</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── Main ProductsSection Component ─────────────────────────────────────
interface ProductsSectionProps {
  onExploreAllClick?: () => void;
  onLearnMoreClick?: (productId: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  onExploreAllClick,
  onLearnMoreClick,
}) => {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeProduct]);

  return (
    <section id="products" className="w-full bg-[#FCFDFE] py-20 sm:py-28 px-2 sm:px-4 lg:px-6 font-sans overflow-hidden border-t border-slate-50">
      <div className="max-w-[1400px] mx-auto">
        
        {/* TOP ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#14B8B0] font-black text-xs sm:text-sm uppercase tracking-[0.2em]">
                OUR PRODUCTS
              </span>
              <span className="h-[2px] w-12 bg-[#14B8B0] rounded-full inline-block" />
            </div>

            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[52px] text-[#0D152A] leading-[1.1] tracking-tight mb-6">
              Powerful tools. <br />
              Built for <span className="text-[#FF6B00]">everyone.</span>
            </h2>

            <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed max-w-lg mb-10">
              Explore our suite of products designed to simplify tasks, boost productivity, and help you achieve more.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <button
                onClick={() => navigate('/products')}
                className="inline-flex items-center gap-3 bg-[#FF6B00] hover:bg-[#E05B00] text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
              >
                <span>Explore All Products</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5 text-white stroke-[3]" />
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-6 flex flex-col justify-center items-center lg:items-end relative">
            <motion.div
              className="w-full max-w-[500px] relative select-none"
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <motion.div
                className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#FF6B00]/15 via-[#14B8B0]/20 to-[#7C3AED]/15 blur-2xl pointer-events-none"
                animate={{ opacity: [0.5, 0.85, 0.5], scale: [0.98, 1.05, 0.98] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              />

              <motion.div
                className="relative z-10 bg-white rounded-3xl p-6 shadow-2xl border border-slate-100/90 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(13,21,42,0.12)] hover:border-[#FF6B00]/30"
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <img
                      src="/logo.png"
                      alt="DevtaSoft Logo"
                      className="h-27 w-auto object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-display font-extrabold text-[#0D152A] text-sm leading-tight">DevtaSoft Suite</h4>
                      <p className="text-[11px] font-semibold text-slate-400">Live Product Ecosystem</p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14B8B0]/10 text-[#14B8B0] font-bold text-xs">
                    <span className="w-2 h-2 rounded-full bg-[#14B8B0] animate-pulse" />
                    Active Suite
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <motion.div
                    onClick={() => setActiveProduct(productsData[0])}
                    className="p-3.5 rounded-2xl bg-[#FAF6FC] border border-[#EADDF3] flex flex-col justify-between transition-transform duration-300 cursor-pointer"
                    whileHover={{ scale: 1.06, y: -2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold text-[#8E44AD]">REPOSTSEO</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#8E44AD]/10 text-[#8E44AD]">AI</span>
                    </div>
                    <div className="text-lg font-black text-[#0D152A]">99.4%</div>
                    <span className="text-[10px] font-semibold text-slate-500">SEO Score Boost</span>
                  </motion.div>

                  <motion.div
                    onClick={() => setActiveProduct(productsData[6])}
                    className="p-3.5 rounded-2xl bg-[#F4FBFB] border border-[#D0F2F4] flex flex-col justify-between transition-transform duration-300 cursor-pointer"
                    whileHover={{ scale: 1.06, y: -2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold text-[#14B8B0]">Notepad</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#14B8B0]/10 text-[#14B8B0]">Live</span>
                    </div>
                    <div className="text-lg font-black text-[#0D152A]">50k+</div>
                    <span className="text-[10px] font-semibold text-slate-500">Active Editors</span>
                  </motion.div>

                  <motion.div
                    onClick={() => setActiveProduct(productsData[5])}
                    className="p-3.5 rounded-2xl bg-[#FFF8F3] border border-[#FFE8D6] flex flex-col justify-between transition-transform duration-300 cursor-pointer"
                    whileHover={{ scale: 1.06, y: -2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold text-[#FF6B00]">Summarizer</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FF6B00]/10 text-[#FF6B00]">Fast</span>
                    </div>
                    <div className="text-lg font-black text-[#0D152A]">0.2s</div>
                    <span className="text-[10px] font-semibold text-slate-500">Conversion Latency</span>
                  </motion.div>

                  <motion.div
                    onClick={() => setActiveProduct(productsData[7])}
                    className="p-3.5 rounded-2xl bg-[#F5F3FF] border border-[#DDD6FE] flex flex-col justify-between transition-transform duration-300 cursor-pointer"
                    whileHover={{ scale: 1.06, y: -2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold text-[#7C3AED]">Numblee</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#7C3AED]/10 text-[#7C3AED]">24/7</span>
                    </div>
                    <div className="text-lg font-black text-[#0D152A]">100%</div>
                    <span className="text-[10px] font-semibold text-slate-500">Task Automation</span>
                  </motion.div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Real-time Sync Active</span>
                  </div>
                  <span className="text-[#FF6B00] font-bold">100% Uptime Guaranteed</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* SUITE SUB-LABEL */}
        <div className="flex items-center justify-center gap-2.5 mb-12">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
          <span className="text-[#FF6B00] font-bold text-[11px] sm:text-xs tracking-[0.25em] uppercase">
            OUR SUITE OF PRODUCTS
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
        </div>

        {/* PRODUCTS GRID */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          {productsData.map((product) => (
            <motion.div 
              key={product.id}
              onClick={() => {
                setActiveProduct(product);
              }}
              className={`rounded-[24px] p-8 border ${product.bgClass} shadow-sm hover:shadow-xl hover:shadow-[#0D152A]/5 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between h-full group cursor-pointer`}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } },
              }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <div>
                <div className="mb-6 h-10 flex items-center transition-transform duration-300 group-hover:scale-105 origin-left">
                  {product.logo}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                  {product.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100/50 flex items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveProduct(product);
                  }}
                  className={`inline-flex items-center gap-2 font-bold text-sm ${product.ctaColor} transition-all duration-300 group/btn cursor-pointer`}
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* BOTTOM View All Products central button */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 bg-white border border-[#E5E7EB] hover:border-[#FF6B00] text-[#0D152A] font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
          >
            <span>View all products</span>
            <ArrowRight className="w-4 h-4 text-[#FF6B00] stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onExploreAll={onExploreAllClick}
      />
    </section>
  );
};
