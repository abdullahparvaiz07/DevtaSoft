import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  X,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  FileText,
  Calculator,
  PenTool,
  Binary,
  Layers,
  Image as ImageIcon,
  FileType,
  Wand2,
  EyeOff,
  Type,
  Wrench,
  Search,
} from 'lucide-react';
import { DotGrid } from './DotGrid';
import { dataService, ProductItem as DataProductItem } from '../services/dataService';

interface ProductItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  arrowColor: string;
  tagline: string;
  longDesc: string;
  stats: { value: string; label: string }[];
  features: { title: string; desc: string }[];
  badges: string[];
  themeColor: string;
  themeBg: string;
}

const allProductsList: ProductItem[] = [
  // ROW 1
  {
    id: 'repostseo',
    name: 'REPOSTSEO',
    description: 'Plagiarism remover and content reposter with AI-powered rewriting.',
    arrowColor: 'text-[#10B981]',
    tagline: 'Transform One Piece of Content Into 10+ SEO Powerhouses',
    longDesc: 'REPOSTSEO automates content repurposing using advanced natural language processing. Convert blog posts into social threads, videos into articles, and rank higher across search engines effortlessly.',
    stats: [{ value: '1M+', label: 'Articles Repurposed' }, { value: '99.4%', label: 'SEO Score Match' }, { value: '5x', label: 'Faster Creation' }],
    features: [
      { title: 'AI Content Transformer', desc: 'Instantly adapt blogs for LinkedIn, Twitter/X, Medium, and Newsletter formats.' },
      { title: 'Keyword Optimization', desc: 'Auto-inject relevant LSI keywords to ensure top search engine rankings.' },
      { title: 'Multi-Language Support', desc: 'Repurpose and translate content seamlessly into 30+ global languages.' },
      { title: 'Plagiarism & AI Detector', desc: 'Ensure 100% unique, human-like readable content with built-in audit tools.' }
    ],
    badges: ['AI Engine 4.0', 'NLP Powered', 'SEO Optimized', 'API Available'],
    themeColor: '#10B981',
    themeBg: '#ECFDF5',
    icon: (
      <div className="w-12 h-12 shrink-0 flex items-center justify-center">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 18V6L12 12L4 18Z" fill="#10B981" />
          <path d="M12 18V6L20 12L12 18Z" fill="#0D152A" />
        </svg>
      </div>
    ),
  },
  {
    id: 'editpad',
    name: 'Editpad',
    description: 'Free online text editor with advanced editing tools.',
    arrowColor: 'text-[#06B6D4]',
    tagline: 'Distraction-Free Writing & Instant Document Polishing',
    longDesc: 'Editpad is a fast, web-based plain text editor and writing companion trusted by millions of students, writers, and developers worldwide for clean content creation and editing.',
    stats: [{ value: '10M+', label: 'Monthly Active Users' }, { value: '< 50ms', label: 'Instant Load' }, { value: '100%', label: 'Free & Privacy First' }],
    features: [
      { title: 'Smart Paraphrasing', desc: 'Rewrite sentences and paragraphs with varying tone controls.' },
      { title: 'Live Word & Character Count', desc: 'Track reading time, word count, line density, and character metrics live.' },
      { title: 'Cloud Auto-Save', desc: 'Never lose a single word with instant local and cloud session persistence.' },
      { title: 'One-Click File Export', desc: 'Download notes in TXT, DOCX, or PDF formats with zero formatting hassle.' }
    ],
    badges: ['Web Editor', 'No Signup Needed', 'Light & Dark Mode', 'Auto-Save'],
    themeColor: '#06B6D4',
    themeBg: '#ECFEFF',
    icon: (
      <div className="w-12 h-12 shrink-0 bg-[#06B6D4]/10 border border-[#06B6D4]/30 rounded-xl flex items-center justify-center shadow-sm">
        <PenTool className="w-6 h-6 text-[#06B6D4]" />
      </div>
    ),
  },
  {
    id: 'allmath',
    name: 'AllMath',
    description: 'Solve math problems step-by-step with AI assistance.',
    arrowColor: 'text-[#10B981]',
    tagline: 'Solve Complex Equations Step-by-Step in Seconds',
    longDesc: 'AllMath provides comprehensive calculators, step-by-step problem solvers, and interactive math visualizers for students, educators, and STEM professionals.',
    stats: [{ value: '500+', label: 'Math Calculators' }, { value: '5M+', label: 'Equations Solved' }, { value: '99.9%', label: 'Accuracy Rate' }],
    features: [
      { title: 'Step-by-Step Solutions', desc: 'Break down complex algebra, calculus, and geometry problems with clear explanations.' },
      { title: 'Interactive Graphing', desc: 'Plot equations and functions dynamically with real-time parameter tweaking.' },
      { title: 'Formula Database', desc: 'Access thousands of verified mathematical formulas and constants.' },
      { title: 'Unit & Physics Converters', desc: 'Convert units across length, mass, thermodynamics, and electrical engineering.' }
    ],
    badges: ['Calculus & Algebra', 'Interactive Graphs', 'STEM Ready', 'Mobile Friendly'],
    themeColor: '#10B981',
    themeBg: '#ECFDF5',
    icon: (
      <div className="w-12 h-12 rounded-xl bg-[#10B981] flex items-center justify-center text-white font-black text-base shadow-sm relative overflow-hidden shrink-0">
        <div className="grid grid-cols-2 gap-1 p-1 text-[11px] text-white/90">
          <span>+</span><span>-</span><span>×</span><span>÷</span>
        </div>
      </div>
    ),
  },
  {
    id: 'calculators',
    name: 'Calculators.tech',
    description: 'Collection of 100+ smart calculators for everyday use.',
    arrowColor: 'text-[#0D152A]',
    tagline: 'Precision Calculations for Business, Finance, and Daily Tasks',
    longDesc: 'Calculators.tech is an extensive online portal offering specialized calculation utilities ranging from mortgage estimation to scientific data crunching.',
    stats: [{ value: '300+', label: 'Custom Tools' }, { value: '15M+', label: 'Calculations / Mo' }, { value: '0.1s', label: 'Response Time' }],
    features: [
      { title: 'Financial & Mortgage', desc: 'Calculate loan interest, amortization schedules, and ROI effortlessly.' },
      { title: 'Health & Fitness', desc: 'BMI, TDEE, macro ratios, and calorie deficit calculators built for accuracy.' },
      { title: 'Business & Tax', desc: 'Margin, markup, sales tax, and profit break-even tools for entrepreneurs.' },
      { title: 'Embeddable Widgets', desc: 'Embed any calculator directly into your own website with a simple script tag.' }
    ],
    badges: ['Finance & Tax', 'Health & Fitness', 'Embed Widgets', 'Ultra Fast'],
    themeColor: '#0D152A',
    themeBg: '#F8FAFC',
    icon: (
      <div className="w-12 h-12 rounded-xl bg-[#0D152A] flex items-center justify-center text-white shadow-sm shrink-0">
        <Calculator className="w-6 h-6" />
      </div>
    ),
  },
  {
    id: 'numblee',
    name: 'Numblee',
    description: 'Online word games to improve vocabulary while having fun.',
    arrowColor: 'text-[#3B82F6]',
    tagline: 'Gamified Mathematics & Word Games That Make Learning Addictive',
    longDesc: 'Numblee transforms math and vocabulary practice for students into interactive games, timed daily puzzles, and competitive global leaderboards.',
    stats: [{ value: '500K+', label: 'Active Gamers' }, { value: '4.9★', label: 'Parent Rating' }, { value: '100+', label: 'Math Challenges' }],
    features: [
      { title: 'Adaptive Difficulty', desc: 'Game algorithms adjust equation difficulty dynamically to student skill levels.' },
      { title: 'Daily Streak Rewards', desc: 'Encourage daily learning habits with badges, trophies, and avatar customization.' },
      { title: 'Multiplayer Speed Battles', desc: 'Compete against classmates or worldwide players in real-time math duels.' },
      { title: 'Parent & Teacher Dashboard', desc: 'Track progress, accuracy rates, and areas needing improvement.' }
    ],
    badges: ['Gamified STEM', 'Adaptive AI', 'Multiplayer Duels', 'Teacher Portal'],
    themeColor: '#3B82F6',
    themeBg: '#EFF6FF',
    icon: (
      <div className="flex items-center gap-0.5 select-none shrink-0">
        <span className="font-display font-black text-xl bg-[#3B82F6] text-white px-2 py-1 rounded-md shadow-xs">N</span>
      </div>
    ),
  },

  // ROW 2
  {
    id: 'dapa',
    name: 'DA PA Checker',
    description: 'Check Domain Authority and Page Authority instantly.',
    arrowColor: 'text-[#EF4444]',
    tagline: 'Instant Domain Authority & Backlink Health Insights',
    longDesc: 'DA PA Checker provides real-time domain authority, page authority, spam score, and backlink statistics to help SEO specialists boost domain ranking.',
    stats: [{ value: '50M+', label: 'Domains Scanned' }, { value: '100%', label: 'Live Moz API Data' }, { value: 'Bulk', label: 'Multi-URL Support' }],
    features: [
      { title: 'Bulk Domain Search', desc: 'Check DA/PA for up to 50 URLs simultaneously in a single click.' },
      { title: 'Spam Score Detection', desc: 'Identify toxic backlink profiles before they impact your Google ranking.' },
      { title: 'Historical Authority Tracking', desc: 'Monitor domain authority trajectory over time with visual graph reports.' },
      { title: 'Exportable CSV Reports', desc: 'Download audit data formatted for client presentations and SEO audits.' }
    ],
    badges: ['Moz Metric Sync', 'Bulk Auditor', 'Spam Score Filter', 'CSV Export'],
    themeColor: '#EF4444',
    themeBg: '#FEF2F2',
    icon: (
      <div className="w-12 h-12 rounded-full bg-[#EF4444] flex items-center justify-center text-white shadow-sm shrink-0">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      </div>
    ),
  },
  {
    id: 'summarizer',
    name: 'SUMMARIZER',
    description: 'Summarize long articles and text into short, clear content.',
    arrowColor: 'text-[#06B6D4]',
    tagline: 'Condense 5,000-Word Documents Into Bullet Points in Seconds',
    longDesc: 'SUMMARIZER leverages state-of-the-art NLP models to distill long research papers, news articles, and business reports into concise key takeaways without losing context.',
    stats: [{ value: '80%', label: 'Time Saved Reading' }, { value: '2M+', label: 'Summaries Generated' }, { value: '100%', label: 'Key Meaning Retained' }],
    features: [
      { title: 'Abstractive & Extractive AI', desc: 'Choose between bullet-point highlights or smooth narrative summaries.' },
      { title: 'Length Slider', desc: 'Control summary length from 10% to 50% of original text size.' },
      { title: 'PDF & Doc Upload', desc: 'Drag and drop PDF, DOCX, or web URLs for direct automated analysis.' },
      { title: 'Key Concepts Extraction', desc: 'Automatically extract entity names, dates, and core metrics.' }
    ],
    badges: ['NLP Engine', 'PDF & Doc Upload', 'Length Slider', 'Research Ready'],
    themeColor: '#3F51B5',
    themeBg: '#EEF2FF',
    icon: (
      <div className="w-12 h-12 shrink-0 border border-slate-200 rounded-xl bg-white flex items-center justify-center shadow-xs">
        <FileText className="w-6 h-6 text-[#3F51B5]" />
      </div>
    ),
  },
  {
    id: 'online_notepad',
    name: 'Online Notepad',
    description: 'Quick and simple online notepad for your notes.',
    arrowColor: 'text-[#06B6D4]',
    tagline: 'Secure, Cloud-Synced Workspace for Quick Ideas',
    longDesc: 'Online Notepad offers a lightweight, distraction-free environment for rapid note-taking, rich-text editing, password-protected notes, and cloud syncing.',
    stats: [{ value: '100%', label: 'End-to-End Encrypted' }, { value: 'Zero', label: 'Lag Performance' }, { value: 'Cloud', label: 'Cross-Device Sync' }],
    features: [
      { title: 'Encrypted Password Lock', desc: 'Protect sensitive notes with AES-256 password protection.' },
      { title: 'Rich Formatting Bar', desc: 'Clean formatting tools for headers, lists, code blocks, and links.' },
      { title: 'Live Collaboration', desc: 'Share editable note links with teammates with live cursor sync.' },
      { title: 'Offline Web App (PWA)', desc: 'Works seamlessly offline and syncs back when connectivity restores.' }
    ],
    badges: ['Encrypted', 'PWA Offline', 'Live Collaboration', 'Cloud Sync'],
    themeColor: '#06B6D4',
    themeBg: '#ECFEFF',
    icon: (
      <div className="w-12 h-12 rounded-xl bg-[#06B6D4] flex flex-col justify-between p-2 shadow-sm text-white shrink-0">
        <div className="flex gap-1"><span className="w-1 h-1 rounded-full bg-white opacity-40"></span><span className="w-5 h-[3px] bg-white rounded-full"></span></div>
        <div className="flex gap-1"><span className="w-1 h-1 rounded-full bg-white opacity-40"></span><span className="w-6 h-[3px] bg-white rounded-full"></span></div>
        <div className="flex gap-1"><span className="w-1 h-1 rounded-full bg-white opacity-40"></span><span className="w-4 h-[3px] bg-white rounded-full"></span></div>
      </div>
    ),
  },
  {
    id: 'lcm_calculator',
    name: 'LCM Calculator',
    description: 'Find LCM of numbers quickly and accurately.',
    arrowColor: 'text-[#06B6D4]',
    tagline: 'Lowest Common Multiple & Greatest Common Divisor Solver',
    longDesc: 'LCM Calculator provides instant calculation of LCM and HCF/GCD for two or more numbers with step-by-step prime factorization breakdown.',
    stats: [{ value: '100%', label: 'Calculation Accuracy' }, { value: 'Instant', label: 'Prime Factorization' }, { value: 'Free', label: 'No Limits' }],
    features: [
      { title: 'Multi-Number Support', desc: 'Calculate LCM for up to 10 numbers simultaneously.' },
      { title: 'Prime Factorization Steps', desc: 'Displays visual factor trees and division step tables.' },
      { title: 'Formula Explanations', desc: 'Learn the mathematical method used for homework verification.' },
      { title: 'GCD / HCF Toggle', desc: 'Switch instantly between LCM and Greatest Common Divisor.' }
    ],
    badges: ['Math Solver', 'Step-by-Step', 'Prime Factors', 'STEM Tool'],
    themeColor: '#06B6D4',
    themeBg: '#ECFEFF',
    icon: (
      <div className="w-12 h-12 rounded-full border border-cyan-200 bg-cyan-50 flex items-center justify-center text-cyan-600 font-mono font-bold text-xs shrink-0">
        2/4.7
      </div>
    ),
  },
  {
    id: 'utilities_online',
    name: 'Utilities Online',
    description: 'Free essential online tools in one convenient place.',
    arrowColor: 'text-[#06B6D4]',
    tagline: 'All-in-One Developer & Utility Toolkit',
    longDesc: 'Utilities Online combines 50+ essential developer tools — from JSON formatters and Base64 encoders to password generators and hash checkers in one portal.',
    stats: [{ value: '50+', label: 'Utilities Integrated' }, { value: '100%', label: 'Client-side Security' }, { value: '0.01s', label: 'Execution Speed' }],
    features: [
      { title: 'Developer Utilities', desc: 'JSON Formatter, Minifier, Diff Checker, and Regex Tester.' },
      { title: 'Security Tools', desc: 'Generate secure passwords, SHA256 hashes, and inspect JWT tokens.' },
      { title: 'Text Converters', desc: 'Case converter, URL encoder/decoder, and Markdown previewer.' },
      { title: 'Zero Data Storage', desc: 'All operations process locally in your browser memory for maximum security.' }
    ],
    badges: ['Dev Toolkit', 'Browser Native', 'Zero Logging', '50+ Utilities'],
    themeColor: '#0D152A',
    themeBg: '#F8FAFC',
    icon: (
      <div className="w-12 h-12 rounded-xl bg-[#0D152A] flex items-center justify-center text-white shadow-sm shrink-0">
        <Wrench className="w-6 h-6 text-cyan-400" />
      </div>
    ),
  },

  // ROW 3
  {
    id: 'image_to_text',
    name: 'Image To Text',
    description: 'Extract text from images using AI OCR technology.',
    arrowColor: 'text-[#3B82F6]',
    tagline: 'High-Precision AI OCR Optical Character Recognition',
    longDesc: 'Image To Text extracts editable text from scanned documents, screenshots, photos, and handwritten notes in seconds using multi-lingual OCR models.',
    stats: [{ value: '99.8%', label: 'OCR Accuracy' }, { value: '50+', label: 'Languages Supported' }, { value: '< 1s', label: 'Extraction Time' }],
    features: [
      { title: 'Multi-Format Image Support', desc: 'Upload PNG, JPG, WEBP, or scanned PDF documents.' },
      { title: 'Handwriting Recognition', desc: 'Advanced neural networks extract handwritten notes into plain text.' },
      { title: 'Batch Processing', desc: 'Extract text from multiple image files at once.' },
      { title: 'Direct Copy & Download', desc: 'Copy extracted text instantly or save as TXT / DOCX file.' }
    ],
    badges: ['AI OCR Engine', 'Handwriting Recog', 'Batch Processing', 'Multi-Language'],
    themeColor: '#3B82F6',
    themeBg: '#EFF6FF',
    icon: (
      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
        <ImageIcon className="w-6 h-6" />
      </div>
    ),
  },
  {
    id: 'pdf_a_word',
    name: 'PDF A WORD',
    description: 'Convert PDF files to editable Word documents instantly.',
    arrowColor: 'text-[#3B82F6]',
    tagline: 'Frictionless PDF to Editable DOCX Conversion',
    longDesc: 'PDF A WORD converts PDF documents into fully editable Microsoft Word files while preserving original fonts, layouts, tables, and image placements intact.',
    stats: [{ value: '10M+', label: 'Files Converted' }, { value: '100%', label: 'Layout Retention' }, { value: 'AES-256', label: 'Encrypted Deletion' }],
    features: [
      { title: 'Exact Layout Preservation', desc: 'Keep headers, footers, tables, and images perfectly positioned.' },
      { title: 'Scanned PDF Conversion', desc: 'Integrated OCR reads scanned PDF pages into editable Word text.' },
      { title: 'Instant File Deletion', desc: 'Uploaded files are automatically deleted from server memory after 1 hour.' },
      { title: 'No Registration Required', desc: 'Convert files instantly with zero signups or watermarks.' }
    ],
    badges: ['Layout Preserved', 'OCR Conversion', 'Auto Delete', 'Zero Watermarks'],
    themeColor: '#2563EB',
    themeBg: '#EFF6FF',
    icon: (
      <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
        <FileType className="w-6 h-6" />
      </div>
    ),
  },
  {
    id: 'ai_essay_writer',
    name: 'AI Essay Writer',
    description: 'Generate high-quality essays in seconds with AI.',
    arrowColor: 'text-[#10B981]',
    tagline: 'Academic-Grade Essay & Paper Generation Assistance',
    longDesc: 'AI Essay Writer helps students and researchers generate structured outlines, thesis statements, citations, and polished academic drafts tailored to specific topics.',
    stats: [{ value: '500K+', label: 'Essays Generated' }, { value: '100%', label: 'Plagiarism-Free' }, { value: 'MLA / APA', label: 'Citation Formats' }],
    features: [
      { title: 'Thesis & Outline Generator', desc: 'Draft structured essay outlines with logical argument progression.' },
      { title: 'Academic Citation Generator', desc: 'Auto-format citations in APA, MLA, Chicago, or Harvard styles.' },
      { title: 'Tone & Depth Control', desc: 'Customize writing style from High School to Masters / Doctorate level.' },
      { title: 'In-Depth Fact Checking', desc: 'Provides references to peer-reviewed sources and literature.' }
    ],
    badges: ['Academic AI', 'APA & MLA Citations', 'Plagiarism Clean', 'Fact Verified'],
    themeColor: '#10B981',
    themeBg: '#ECFDF5',
    icon: (
      <div className="w-12 h-12 rounded-xl bg-[#10B981] flex items-center justify-center text-white shadow-sm shrink-0">
        <Wand2 className="w-6 h-6" />
      </div>
    ),
  },
  {
    id: 'invisible_character',
    name: 'Invisible Character',
    description: 'Remove invisible characters from your text.',
    arrowColor: 'text-[#0D152A]',
    tagline: 'Clean Hidden Unicode & Zero-Width Spaces from Code & Text',
    longDesc: 'Invisible Character detects and strips hidden zero-width spaces, non-breaking spaces, and invisible Unicode characters that cause code syntax errors and formatting bugs.',
    stats: [{ value: '100%', label: 'Unicode Detection' }, { value: '< 1ms', label: 'Sanitization Latency' }, { value: 'Free', label: 'Developer Utility' }],
    features: [
      { title: 'Zero-Width Space Remover', desc: 'Eliminate hidden U+200B and U+FEFF characters instantly.' },
      { title: 'Invisible Text Generator', desc: 'Copy empty invisible spaces for testing form validation and messaging apps.' },
      { title: 'Code Syntax Inspector', desc: 'Highlight invisible characters breaking JavaScript, Python, or HTML builds.' },
      { title: 'One-Click Copy Cleaned Text', desc: 'Copy sanitized text cleanly directly into your clipboard.' }
    ],
    badges: ['Unicode Sanitizer', 'Zero-Width Clean', 'Dev Utility', 'Instant Copy'],
    themeColor: '#0D152A',
    themeBg: '#F8FAFC',
    icon: (
      <div className="w-12 h-12 rounded-xl bg-[#0D152A] flex items-center justify-center text-white shadow-sm shrink-0 font-mono font-bold text-[#FF8706]">
        [A]
      </div>
    ),
  },
  {
    id: 'aesthetic_font',
    name: 'Aesthetic Font',
    description: 'Beautiful and stylish fonts for your design projects.',
    arrowColor: 'text-[#8B5CF6]',
    tagline: 'Stylish Unicode Font Generator for Instagram, TikTok & Web Design',
    longDesc: 'Aesthetic Font generates hundreds of custom stylized Unicode text styles, calligraphy, symbols, and fancy fonts to elevate social media bios and design titles.',
    stats: [{ value: '200+', label: 'Font Styles' }, { value: '100%', label: 'Copy & Paste Ready' }, { value: 'Universal', label: 'Device Compatible' }],
    features: [
      { title: 'Fancy Bio Generator', desc: 'Transform plain text into aesthetic cursive, gothic, and bold styles.' },
      { title: 'Symbol & Kaomoji Library', desc: 'Combine stylized fonts with cute symbols, stars, and kaomoji.' },
      { title: 'Live Text Previewer', desc: 'Type once and preview text rendered instantly across 200+ fonts.' },
      { title: 'One-Tap Copying', desc: 'Tap any generated font to copy directly to your device clipboard.' }
    ],
    badges: ['200+ Styles', 'Unicode Native', 'Social Bio Ready', 'One-Tap Copy'],
    themeColor: '#8B5CF6',
    themeBg: '#F5F3FF',
    icon: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-sm shrink-0">
        a
      </div>
    ),
  },
];

// ─── Main ProductsPage Component ─────────────────────────────────────────
export const ProductsPage: React.FC<{ onContactClick: () => void }> = ({ onContactClick }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [dynamicProducts, setDynamicProducts] = useState<DataProductItem[]>([]);

  useEffect(() => {
    const update = () => {
      setDynamicProducts(dataService.getProducts());
    };
    update();
    return dataService.subscribe(update);
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProduct]);

  // Map dynamic products from dataService to ProductItem format
  const mappedProducts: ProductItem[] = dynamicProducts.map((p) => {
    // Check if matches default item in allProductsList
    const existing = allProductsList.find((item) => item.name.toLowerCase() === p.name.toLowerCase() || item.id === p.id);
    if (existing) {
      return {
        ...existing,
        description: p.description || existing.description,
      };
    }

    return {
      id: p.id,
      name: p.name,
      description: p.description || 'Intelligent product built by DevtaSoft.',
      arrowColor: 'text-[#FF8706]',
      tagline: p.name,
      longDesc: p.description || `${p.name} is an advanced software solution engineered for maximum efficiency.`,
      stats: [{ value: '99.9%', label: 'Uptime' }, { value: '< 1s', label: 'Response' }, { value: '24/7', label: 'Support' }],
      features: [
        { title: 'High Speed Processing', desc: 'Fast client-side rendering and API integration.' },
        { title: 'Secure & Reliable', desc: 'Enterprise security standards and data encryption.' },
      ],
      badges: ['DevtaSoft Suite', 'Verified'],
      themeColor: '#FF8706',
      themeBg: '#FFF0E5',
      icon: (
        <div className="flex items-center gap-2">
          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-2xs" />
        </div>
      ),
    };
  });

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen font-sans text-[#0D152A] pt-6 pb-24 overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* ─── SECTION HEADER LEFT ALIGNED (Matching Hero Section Alignment) ────────────────── */}
        <div className="relative pt-8 pb-14 flex flex-col items-start text-left max-w-4xl">
          
          {/* Right Decorative Dot Grid + Blob */}
          <div className="absolute right-[0px] top-4 pointer-events-none hidden lg:block opacity-75">
            <div className="w-32 h-32 rounded-full bg-[#E6F8F9] absolute -top-4 -right-4 blur-xl opacity-60" />
            <DotGrid rows={4} cols={6} dotColor="#14B8B0" />
          </div>

          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start gap-1.5 mb-4"
          >
            <span className="text-[#14B8B0] font-extrabold text-xs sm:text-sm uppercase tracking-[0.2em]">
              OUR PRODUCTS
            </span>
            <span className="h-[2.5px] w-10 bg-[#14B8B0] rounded-full inline-block" />
          </motion.div>

          {/* Main Headline matching reference */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl lg:text-[56px] text-[#0D152A] leading-[1.12] tracking-tight mb-6"
          >
            Powerful tools for <span className="text-[#FF8706]">smarter</span> work.
          </motion.h1>

          {/* Short Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#667085] font-medium text-base sm:text-lg leading-relaxed max-w-2xl"
          >
            We design and engineer intelligent SaaS platforms, AI productivity tools, and modern software applications built for speed, scale, and seamless user experiences.
          </motion.p>
        </div>

        {/* ─── PRODUCTS GRID (3 rows × 5 columns = 15 Product Cards) ───── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-20"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 },
            },
          }}
        >
          {mappedProducts.map((product) => (
            <motion.div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group bg-white rounded-[24px] border border-[#ECECEC] p-6 shadow-[0_8px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] hover:border-[#FF8706]/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between h-[270px] cursor-pointer overflow-hidden"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div>
                {/* Logo Graphic Header */}
                <div className="mb-5 h-12 flex items-center transition-transform duration-300 group-hover:scale-105 origin-left">
                  {product.icon}
                </div>

                {/* Product Name */}
                <h3 className="font-display font-extrabold text-lg text-[#0D152A] mb-2 leading-tight group-hover:text-[#FF8706] transition-colors">
                  {product.name}
                </h3>

                {/* Short Description */}
                <p className="text-[#6B7280] font-medium text-xs sm:text-[13px] leading-relaxed line-clamp-3">
                  {product.description}
                </p>
              </div>

              {/* Bottom Arrow Indicator */}
              <div className="pt-3 flex items-center justify-end border-t border-slate-50 mt-auto">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${product.arrowColor} transition-transform duration-300 group-hover:translate-x-1.5`}>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* ─── PRODUCT DETAIL MODAL POPUP ───────────────────────────────── */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
            />

            {/* Modal */}
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
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-200 hover:scale-110 z-20 cursor-pointer"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>

                {/* Header */}
                <div className="relative p-8 sm:p-10 pb-4 overflow-hidden">
                  <div
                    className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: selectedProduct.themeColor }}
                  />

                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-2.5 rounded-2xl border bg-white shadow-sm" style={{ borderColor: `${selectedProduct.themeColor}30` }}>
                      {selectedProduct.icon}
                    </div>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-black px-3.5 py-1.5 rounded-full border shadow-xs"
                      style={{ backgroundColor: selectedProduct.themeBg, color: selectedProduct.themeColor, borderColor: `${selectedProduct.themeColor}40` }}
                    >
                      <Sparkles className="w-3.5 h-3.5" /> DevtaSoft Web Tool
                    </span>
                  </div>

                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0D152A] leading-tight mb-2">
                    {selectedProduct.tagline}
                  </h2>

                  <p className="text-[#6B7280] font-medium text-sm sm:text-base leading-relaxed max-w-2xl">
                    {selectedProduct.longDesc}
                  </p>
                </div>

                {/* Key Stats Bar */}
                <div className="px-8 sm:px-10 py-4">
                  <div className="grid grid-cols-3 gap-4">
                    {selectedProduct.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-2xl p-4 text-center border border-slate-100 shadow-xs"
                        style={{ backgroundColor: selectedProduct.themeBg }}
                      >
                        <span className="font-display font-black text-2xl sm:text-3xl block mb-1" style={{ color: selectedProduct.themeColor }}>
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
                    {selectedProduct.features.map((feat, i) => (
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
                            style={{ backgroundColor: selectedProduct.themeBg }}
                          >
                            <CheckCircle2 className="w-4 h-4" style={{ color: selectedProduct.themeColor }} />
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
                    {selectedProduct.badges.map((badge) => (
                      <span
                        key={badge}
                        className="px-3.5 py-1.5 rounded-full font-bold text-xs border"
                        style={{
                          backgroundColor: selectedProduct.themeBg,
                          color: selectedProduct.themeColor,
                          borderColor: `${selectedProduct.themeColor}30`,
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
                    Ready to launch {selectedProduct.name}?
                  </p>
                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      onContactClick();
                    }}
                    className="inline-flex items-center gap-2 bg-[#FF8706] hover:bg-[#E07200] text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md shadow-[#FF8706]/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <span>Use Web Tool</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
