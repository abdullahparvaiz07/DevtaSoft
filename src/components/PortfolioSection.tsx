import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight, Cpu, Users, Rocket, Sparkles, X, CheckCircle2, Clock, BarChart3 } from 'lucide-react';
import { DotGrid } from './DotGrid';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  badgeText: string;
  badgeBg: string;
  badgeTextColor: string;
  subtitleColor: string;
  image: string;
}

const projectsData: Project[] = [
  {
    id: 'subledge',
    title: 'Subledge',
    subtitle: 'Subscription Management Platform',
    description: 'A complete subscription management SaaS that helps users track, manage and optimize their recurring payments.',
    category: 'SaaS Platforms',
    badgeText: 'SaaS Platform',
    badgeBg: 'bg-[#E6F8F9]',
    badgeTextColor: 'text-[#14B8B0]',
    subtitleColor: 'text-[#14B8B0]',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'jobora',
    title: 'Jobora',
    subtitle: 'Job Search Platform',
    description: 'A modern job portal connecting talent with opportunities through smart search and personalized recommendations.',
    category: 'Web Applications',
    badgeText: 'Web Application',
    badgeBg: 'bg-[#FFEFE5]',
    badgeTextColor: 'text-[#FF8706]',
    subtitleColor: 'text-[#FF8706]',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cvmaker',
    title: 'CV Maker',
    subtitle: 'AI Resume Builder',
    description: 'AI-powered resume builder that helps users create ATS-friendly resumes in minutes and boost their career opportunities.',
    category: 'AI & Automation',
    badgeText: 'AI & Automation',
    badgeBg: 'bg-[#E6F8F9]',
    badgeTextColor: 'text-[#14B8B0]',
    subtitleColor: 'text-[#14B8B0]',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
  },
];

const categories = [
  'All Projects',
  'Web Applications',
  'AI & Automation',
  'SaaS Platforms',
  'Mobile Apps',
  'Branding',
];

// ─── Case Study Details ─────────────────────────────────────────────────
const caseStudyDetails: Record<string, {
  tagline: string;
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
  techStack: string[];
  timeline: string;
  features: { title: string; desc: string }[];
  color: string;
  bgColor: string;
}> = {
  subledge: {
    tagline: 'Simplifying Subscription Chaos Into Clarity.',
    challenge: 'Users were losing track of dozens of subscriptions across multiple platforms, leading to unwanted charges and budget overruns. Existing tools were too complex or lacked real-time tracking.',
    solution: 'We built Subledge — a clean, intuitive SaaS dashboard that automatically detects, categorizes, and tracks all recurring subscriptions. Smart notifications alert users before renewals, and analytics provide spending insights.',
    results: [
      { value: '12K+', label: 'Active Users' },
      { value: '$2.4M', label: 'Saved for Users' },
      { value: '4.8★', label: 'App Rating' },
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe API', 'AWS', 'Redis'],
    timeline: '14 Weeks',
    features: [
      { title: 'Auto-Detection', desc: 'Automatically detects and imports subscriptions from linked accounts.' },
      { title: 'Smart Alerts', desc: 'Proactive notifications before renewal dates with cancellation reminders.' },
      { title: 'Spending Analytics', desc: 'Monthly and yearly spending breakdown with category insights.' },
      { title: 'Team Management', desc: 'Shared subscription tracking for teams with role-based access.' },
    ],
    color: '#14B8B0',
    bgColor: '#E6F8F9',
  },
  jobora: {
    tagline: 'Connecting Talent with Opportunity, Seamlessly.',
    challenge: 'Job seekers faced fragmented search experiences with poor filtering, while employers struggled with low-quality applicant pipelines and slow hiring cycles.',
    solution: 'Jobora is a modern job portal with AI-powered matching, personalized recommendations, and a clean application flow. Employers get a powerful ATS dashboard with candidate scoring and analytics.',
    results: [
      { value: '50K+', label: 'Jobs Listed' },
      { value: '85%', label: 'Match Accuracy' },
      { value: '3x', label: 'Faster Hiring' },
    ],
    techStack: ['Next.js', 'TypeScript', 'MongoDB', 'Elasticsearch', 'OpenAI', 'Vercel'],
    timeline: '18 Weeks',
    features: [
      { title: 'AI Job Matching', desc: 'Machine learning algorithms that match candidates to roles based on skills and preferences.' },
      { title: 'One-Click Apply', desc: 'Streamlined application flow with saved profiles and auto-filled forms.' },
      { title: 'Employer Dashboard', desc: 'Full ATS with candidate scoring, pipeline management, and analytics.' },
      { title: 'Salary Insights', desc: 'Real-time salary benchmarking and compensation comparisons by role.' },
    ],
    color: '#FF8706',
    bgColor: '#FFEFE5',
  },
  cvmaker: {
    tagline: 'Your Career Story, Perfectly Formatted.',
    challenge: 'Professionals spent hours formatting resumes that often failed ATS screening. Templates were either too basic or too complex, and AI-generated content lacked personalization.',
    solution: 'CV Maker uses fine-tuned AI to generate professionally written, ATS-optimized resumes in minutes. Users choose from beautiful templates, get real-time ATS scoring, and can export in multiple formats.',
    results: [
      { value: '200K+', label: 'Resumes Created' },
      { value: '92%', label: 'ATS Pass Rate' },
      { value: '< 5min', label: 'Avg Build Time' },
    ],
    techStack: ['React', 'Python', 'FastAPI', 'OpenAI GPT-4', 'Puppeteer', 'Firebase'],
    timeline: '10 Weeks',
    features: [
      { title: 'AI Content Writer', desc: 'GPT-powered bullet points and summaries tailored to each job description.' },
      { title: 'ATS Score Checker', desc: 'Real-time feedback on keyword optimization and formatting compliance.' },
      { title: 'Template Library', desc: '25+ professionally designed templates for every industry and experience level.' },
      { title: 'Multi-Format Export', desc: 'Download as PDF, DOCX, or shareable web link with analytics.' },
    ],
    color: '#14B8B0',
    bgColor: '#E6F8F9',
  },
};

// ─── Case Study Modal ───────────────────────────────────────────────────
const CaseStudyModal: React.FC<{
  project: Project | null;
  onClose: () => void;
  onStartProject?: () => void;
}> = ({ project, onClose, onStartProject }) => {
  if (!project) return null;
  const details = caseStudyDetails[project.id];
  if (!details) return null;

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 lg:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-[28px] w-full max-w-[900px] max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Hero Image */}
              <div className="relative h-48 sm:h-56 w-full overflow-hidden rounded-t-[28px]">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all duration-200 hover:scale-110 z-10 cursor-pointer shadow-lg">
                  <X className="w-5 h-5 text-slate-600" />
                </button>
                <div className="absolute bottom-5 left-6 z-10 flex items-center gap-3">
                  <span className={`${project.badgeBg} ${project.badgeTextColor} font-black text-xs px-4 py-1.5 rounded-full shadow-sm`}>{project.badgeText}</span>
                  <span className="bg-white/90 text-slate-600 font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                    <Clock className="w-3.5 h-3.5" />{details.timeline}
                  </span>
                </div>
              </div>

              {/* Header */}
              <div className="px-8 sm:px-10 pt-8">
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0D152A] leading-tight mb-1.5">{project.title}</h2>
                <p className="font-bold text-sm uppercase tracking-wider mb-3" style={{ color: details.color }}>{project.subtitle}</p>
                <p className="font-display font-extrabold text-lg" style={{ color: details.color }}>{details.tagline}</p>
              </div>

              {/* Results */}
              <div className="px-8 sm:px-10 py-6">
                <div className="grid grid-cols-3 gap-4">
                  {details.results.map((stat) => (
                    <div key={stat.label} className="rounded-2xl p-4 text-center border border-slate-100" style={{ backgroundColor: details.bgColor }}>
                      <span className="font-display font-extrabold text-2xl sm:text-3xl block mb-1" style={{ color: details.color }}>{stat.value}</span>
                      <span className="text-[#667085] font-semibold text-xs sm:text-sm">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenge & Solution */}
              <div className="px-8 sm:px-10 pb-6 space-y-5">
                <div>
                  <h3 className="font-display font-extrabold text-base text-[#0D152A] mb-2 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" style={{ color: details.color }} /> The Challenge
                  </h3>
                  <p className="text-[#667085] font-medium text-sm leading-relaxed">{details.challenge}</p>
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-base text-[#0D152A] mb-2 flex items-center gap-2">
                    <Rocket className="w-4 h-4" style={{ color: details.color }} /> Our Solution
                  </h3>
                  <p className="text-[#667085] font-medium text-sm leading-relaxed">{details.solution}</p>
                </div>
              </div>

              {/* Key Features */}
              <div className="px-8 sm:px-10 pb-6">
                <h3 className="font-display font-extrabold text-lg text-[#0D152A] mb-5">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {details.features.map((feat, i) => (
                    <motion.div key={feat.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                      className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:border-slate-200 transition-all duration-300 hover:-translate-y-0.5">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: details.bgColor }}>
                          <CheckCircle2 className="w-4 h-4" style={{ color: details.color }} />
                        </div>
                        <div>
                          <h4 className="font-display font-extrabold text-sm text-[#0D152A] mb-1">{feat.title}</h4>
                          <p className="text-[#667085] font-medium text-xs leading-relaxed">{feat.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="px-8 sm:px-10 pb-6">
                <h3 className="font-display font-extrabold text-lg text-[#0D152A] mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2.5">
                  {details.techStack.map((tech) => (
                    <span key={tech} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs border transition-all duration-200 hover:scale-105 cursor-default"
                      style={{ backgroundColor: details.bgColor, color: details.color, borderColor: `${details.color}30` }}>
                      <CheckCircle2 className="w-3.5 h-3.5" />{tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="px-8 sm:px-10 pb-8 sm:pb-10 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[#667085] font-medium text-sm text-center sm:text-left">Inspired by this project? Let's build yours.</p>
                <button onClick={() => { onClose(); onStartProject?.(); }}
                  className="inline-flex items-center gap-2.5 bg-[#FF6B00] hover:bg-[#E05B00] text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] active:scale-[0.97] cursor-pointer shrink-0">
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────
interface PortfolioSectionProps {
  onStartProjectClick?: () => void;
  onViewCaseStudyClick?: (projectId: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onStartProjectClick,
  onViewCaseStudyClick,
}) => {
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (activeProject) { document.body.style.overflow = 'hidden'; } else { document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [activeProject]);

  const filteredProjects = projectsData.filter((project) => {
    if (activeCategory === 'All Projects') return true;
    return project.category === activeCategory;
  });

  return (
    <section id="portfolio" className="w-full bg-[#FCFDFE] py-20 sm:py-28 px-2 sm:px-4 lg:px-6 font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* TOP ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
          
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#14B8B0] font-black text-xs sm:text-sm uppercase tracking-[0.2em]">OUR PORTFOLIO</span>
              <span className="h-[2px] w-12 bg-[#14B8B0] rounded-full inline-block" />
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[52px] text-[#0D152A] leading-[1.1] tracking-tight mb-6">
              Digital products <br />we're <span className="text-[#FF6B00]">proud of.</span>
            </h2>
            <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed max-w-lg mb-10">
              Explore a selection of our work where design, technology, and strategy come together to create real impact.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {/* Start a Project Button */}
              <button
                onClick={() => {
                  if (location.pathname !== '/') {
                    navigate('/');
                    setTimeout(() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  } else {
                    const contactElem = document.getElementById('contact');
                    if (contactElem) {
                      contactElem.scrollIntoView({ behavior: 'smooth' });
                    } else if (onStartProjectClick) {
                      onStartProjectClick();
                    }
                  }
                }}
                className="inline-flex items-center gap-2.5 bg-[#FF8706] hover:bg-[#E07200] text-white font-bold text-sm sm:text-base px-6 sm:px-7 py-3.5 rounded-full shadow-md shadow-[#FF8706]/20 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 text-white stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* View All Projects Button */}
              <button
                onClick={() => navigate('/portfolio')}
                className="inline-flex items-center gap-2.5 bg-white border border-[#E5E7EB] hover:border-[#14B8B0] text-[#0D152A] font-bold text-sm sm:text-base px-6 sm:px-7 py-3.5 rounded-full shadow-xs hover:shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
              >
                <span>View All</span>
                <ArrowUpRight className="w-4 h-4 text-[#14B8B0] stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center items-center lg:items-end relative">
            <motion.div className="w-full max-w-[520px] relative mb-12 select-none" initial={{ opacity: 0, scale: 0.94, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}>
              <motion.div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#14B8B0]/25 via-[#FF6B00]/20 to-[#7C3AED]/20 blur-2xl pointer-events-none" animate={{ opacity: [0.5, 0.85, 0.5], scale: [0.98, 1.04, 0.98] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
              <motion.div className="relative z-10 bg-[#0D152A]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:border-[#FF6B00]/40" animate={{ y: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                <div className="bg-[#090D16] px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="text-[#14B8B0]">portfolio</span><span>/</span><span className="text-white font-medium">DevtaEngine.tsx</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#14B8B0]/20 text-[#14B8B0] text-[10px] font-mono font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#14B8B0] animate-pulse" />BUILDING
                    </span>
                  </div>
                </div>
                <div className="p-5 font-mono text-xs leading-relaxed text-slate-300 overflow-hidden font-semibold">
                  <div className="flex items-center gap-3"><span className="text-slate-600 select-none">1</span><span><span className="text-[#FF6B00]">import</span> &#123; <span className="text-[#14B8B0]">DevtaEngine</span>, <span className="text-purple-400">AI</span> &#125; <span className="text-[#FF6B00]">from</span> <span className="text-emerald-400">'@devtasoft/core'</span>;</span></div>
                  <div className="flex items-center gap-3 mt-1"><span className="text-slate-600 select-none">2</span><span className="text-slate-500">// Initialize the portfolio engine</span></div>
                  <div className="flex items-center gap-3 mt-1"><span className="text-slate-600 select-none">3</span><span><span className="text-[#FF6B00]">const</span> <span className="text-[#14B8B0]">engine</span> = <span className="text-purple-400">new</span> <span className="text-yellow-300">DevtaEngine</span>(&#123;</span></div>
                  <div className="flex items-center gap-3 mt-1"><span className="text-slate-600 select-none">4</span><span className="pl-4"><span className="text-white">mode</span>: <span className="text-emerald-400">'production'</span>,</span></div>
                  <div className="flex items-center gap-3 mt-1"><span className="text-slate-600 select-none">5</span><span className="pl-4"><span className="text-white">scale</span>: <span className="text-[#FF6B00]">Infinity</span>,</span></div>
                  <div className="flex items-center gap-3 mt-1"><span className="text-slate-600 select-none">6</span><span>&#125;);</span></div>
                  <div className="flex items-center gap-3 mt-1"><span className="text-slate-600 select-none">7</span><span>&nbsp;</span></div>
                  <div className="flex items-center gap-3 mt-1"><span className="text-slate-600 select-none">8</span><span><span className="text-[#FF6B00]">await</span> engine.<span className="text-yellow-300">deploy</span>(); <span className="text-emerald-500">✓</span><span className="inline-block w-1.5 h-3.5 bg-[#FF6B00] ml-1 rounded-sm animate-pulse" /></span></div>
                </div>
              </motion.div>
            </motion.div>

            <div className="flex items-center gap-8 sm:gap-14 w-full max-w-[520px] justify-center lg:justify-end">
              {[
                { icon: Cpu, num: '250+', label: 'Projects', color: '#FF6B00' },
                { icon: Users, num: '100+', label: 'Clients', color: '#14B8B0' },
                { icon: Rocket, num: '98%', label: 'Satisfaction', color: '#FF6B00' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1.5 group">
                  <stat.icon className="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform duration-300" style={{ color: stat.color }} />
                  <span className="font-display font-extrabold text-[#0D152A] text-xl">{stat.num}</span>
                  <span className="font-semibold text-[#6B7280] text-xs">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center flex-wrap gap-2.5 mb-12">
          {categories.map((category) => (
            <button key={category} onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#FF6B00] text-white shadow-md shadow-[#FF6B00]/20 scale-[1.05]'
                  : 'bg-white border border-slate-200 text-slate-500 hover:border-[#FF6B00]/40 hover:text-[#0D152A] hover:shadow-sm'
              }`}>{category}</button>
          ))}
        </div>

        {/* Project Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}>
          {filteredProjects.map((project) => (
            <motion.div key={project.id} className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-[#0D152A]/10 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full group cursor-pointer"
              onClick={() => setActiveProject(project)}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } } }}
              whileHover={{ y: -8, scale: 1.02 }}>
              <div className="relative aspect-[4/3] w-full bg-[#0D152A] overflow-hidden p-4 flex items-center justify-center">
                <div className={`absolute top-6 left-6 z-20 ${project.badgeBg} ${project.badgeTextColor} font-black text-xs px-4 py-1.5 rounded-full shadow-sm transition-transform duration-300 group-hover:scale-105`}>{project.badgeText}</div>
                <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded-2xl object-center opacity-90 transition-transform duration-700 ease-out group-hover:scale-108" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D152A]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              </div>
              <div className="p-8 sm:p-10 flex flex-col flex-grow">
                <h3 className="font-display font-extrabold text-[#0D152A] text-2xl mb-1.5 tracking-tight group-hover:text-[#FF6B00] transition-colors duration-300">{project.title}</h3>
                <p className={`${project.subtitleColor} font-bold text-xs sm:text-sm uppercase tracking-wider mb-4`}>{project.subtitle}</p>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-8 flex-grow">{project.description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                  <button onClick={(e) => { e.stopPropagation(); setActiveProject(project); }}
                    className="inline-flex items-center gap-2 font-bold text-[#0D152A] text-sm sm:text-base group-hover:text-[#FF6B00] transition-colors duration-300 group/btn cursor-pointer">
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 text-[#FF6B00] transition-transform duration-300 group-hover:translate-x-1.5" />
                  </button>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center transition-all duration-300 group-hover:bg-[#FF6B00] group-hover:text-white group-hover:rotate-45 text-[#6B7280] shadow-sm">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Banner */}
        <div className="relative">
          <div className="absolute top-1/2 left-[-20px] -translate-y-1/2 pointer-events-none hidden md:block"><DotGrid rows={3} cols={6} dotColor="#FF6B00" /></div>
          <div className="absolute top-1/2 right-[-20px] -translate-y-1/2 pointer-events-none hidden md:block"><DotGrid rows={3} cols={6} dotColor="#14B8B0" /></div>
          <div className="relative z-10 max-w-[960px] mx-auto bg-white rounded-[24px] border border-slate-100 shadow-md py-6 px-8 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="font-display font-black text-[#0D152A] text-xl sm:text-2xl mb-1.5 tracking-tight">Have a project in mind?</h4>
              <p className="text-[#6B7280] text-sm font-medium">Let's build something amazing together.</p>
            </div>
            <button onClick={onStartProjectClick} className="inline-flex items-center gap-2.5 bg-[#FF6B00] hover:bg-[#E05B00] text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-[#FF6B00]/20 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer group">
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>

      {/* Case Study Modal */}
      <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} onStartProject={onStartProjectClick} />
    </section>
  );
};
