import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Bot,
  Globe,
  Smartphone,
  Palette,
  Cloud,
  ArrowRight,
  Play,
  X,
  CheckCircle2,
  Users,
  Smile,
  Rocket,
  ShieldCheck,
  Zap,
  Sparkles,
  Layers,
  Cpu,
  Database,
  GitBranch,
  Figma,
  MonitorSmartphone,
  Server,
  Lock,
  Search,
  Brush,
  PenTool,
  BarChart3,
  ShoppingBag,
} from 'lucide-react';
import { DotGrid } from './DotGrid';

interface ServiceItem {
  num: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  accentColor: string;
  bgColor: string;
  badgeNum: string;
  illustration: React.ReactNode;
}

const servicesList: ServiceItem[] = [
  {
    num: '01',
    title: 'Custom Software Development',
    desc: 'Transform your ideas into powerful digital solutions with our custom software development services. From concept and planning to development, deployment, and ongoing maintenance, we deliver reliable software that aligns with your business goals and evolves with your needs.',
    icon: Code2,
    accentColor: '#FF8706',
    bgColor: '#FFEFE5',
    badgeNum: '01',
    illustration: (
      <img
        src="/editor.png"
        alt="Editor Mockup"
        className="w-24 h-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
        referrerPolicy="no-referrer"
      />
    ),
  },
  {
    num: '02',
    title: 'AI & Automation',
    desc: 'Empower your business with intelligent AI automation solutions designed to streamline operations, reduce manual effort, and increase efficiency. We develop AI-powered systems that automate repetitive tasks, optimize workflows, and enable data-driven decision-making.',
    icon: Bot,
    accentColor: '#14B8B0',
    bgColor: '#E6F8F9',
    badgeNum: '02',
    illustration: (
      <img
        src="/robotai.png"
        alt="AI & Automation Robot Mockup"
        className="w-24 h-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
        referrerPolicy="no-referrer"
      />
    ),
  },
  {
    num: '03',
    title: 'Web Development',
    desc: 'Modern, responsive, and high-performance websites designed to strengthen your brand and drive results. We develop innovative web solutions that combine cutting-edge technology with intuitive design to help businesses succeed in the digital landscape.',
    icon: Globe,
    accentColor: '#4F46E5',
    bgColor: '#EEF2FF',
    badgeNum: '03',
    illustration: (
      <img
        src="/webpc.png"
        alt="Web Development PC Mockup"
        className="w-24 h-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
        referrerPolicy="no-referrer"
      />
    ),
  },
  {
    num: '04',
    title: 'Mobile App Development',
    desc: 'We design and build high-performance, user-friendly mobile applications for iOS, Android, and cross-platform environments. From concept and UI/UX design to development, testing, deployment, and ongoing support, we deliver secure, scalable, and feature-rich mobile solutions.',
    icon: Smartphone,
    accentColor: '#14B8B0',
    bgColor: '#E6F8F9',
    badgeNum: '04',
    illustration: (
      <img
        src="/mobileapp.png"
        alt="Mobile App Development Mockup"
        className="w-24 h-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
        referrerPolicy="no-referrer"
      />
    ),
  },
  {
    num: '05',
    title: 'UI/UX Design',
    desc: 'Great products begin with great user experiences. Our UI/UX design team combines creativity, strategy, and user research to create intuitive, accessible, and aesthetically refined digital interfaces from user journey mapping and interactive prototypes to responsive interface designs.',
    icon: Palette,
    accentColor: '#FF8706',
    bgColor: '#FFEFE5',
    badgeNum: '05',
    illustration: (
      <img
        src="/uiux.png"
        alt="UI/UX Design Mockup"
        className="w-24 h-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
        referrerPolicy="no-referrer"
      />
    ),
  },
  {
    num: '06',
    title: 'Cloud & DevOps',
    desc: 'Optimize your software delivery lifecycle with our comprehensive Cloud and DevOps services. We design resilient cloud architectures, automate infrastructure, and implement DevOps best practices to enhance collaboration, accelerate deployments, and ensure operational excellence.',
    icon: Cloud,
    accentColor: '#0284C7',
    bgColor: '#E0F2FE',
    badgeNum: '06',
    illustration: (
      <img
        src="/devops.png"
        alt="Cloud & DevOps Mockup"
        className="w-24 h-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
        referrerPolicy="no-referrer"
      />
    ),
  },
  {
    num: '07',
    title: 'SEO',
    desc: 'Dominate search engine rankings and expand your online reach with data-driven SEO strategies. From comprehensive technical audits and keyword research to on-page optimization, content relevance, and backlink authority building, we drive sustainable organic traffic that converts.',
    icon: Search,
    accentColor: '#10B981',
    bgColor: '#ECFDF5',
    badgeNum: '07',
    illustration: (
      <img
        src="/seo.png"
        alt="SEO Mockup"
        className="w-24 h-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
        referrerPolicy="no-referrer"
      />
    ),
  },
  {
    num: '08',
    title: 'WordPress Development',
    desc: 'Empower your content and commerce with custom WordPress solutions built for speed, security, and effortless management. We build bespoke Gutenberg themes, high-converting WooCommerce stores, custom plugin integrations, and scalable headless CMS architectures.',
    icon: Globe,
    accentColor: '#21759B',
    bgColor: '#F0F7FA',
    badgeNum: '08',
    illustration: (
      <img
        src="/wp.png"
        alt="WordPress Development Mockup"
        className="w-24 h-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
        referrerPolicy="no-referrer"
      />
    ),
  },
  {
    num: '09',
    title: 'Shopify Store Development',
    desc: 'Accelerate your e-commerce growth with high-converting Shopify and Shopify Plus storefronts. We craft pixel-perfect custom Liquid themes, headless React/Hydrogen shopping experiences, custom payment app integrations, and conversion rate optimization tailored to scale your brand.',
    icon: ShoppingBag,
    accentColor: '#96BF48',
    bgColor: '#F6F9F0',
    badgeNum: '09',
    illustration: (
      <img
        src="/shopify.png"
        alt="Shopify Store Development Mockup"
        className="w-24 h-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
        referrerPolicy="no-referrer"
      />
    ),
  },
];

// ─── Modal Details Data ───────────────────────────────────────────────────
const serviceDetailsData: Record<string, {
  tagline: string;
  longDesc: string;
  features: { icon: React.ElementType; title: string; desc: string }[];
  techStack: string[];
  stats: { value: string; label: string }[];
}> = {
  'Custom Software Development': {
    tagline: 'Architected for Scale. Built for Impact.',
    longDesc: 'We build enterprise-grade, custom software from the ground up — designed around your workflows, not the other way around. Every system we deliver is scalable, maintainable, and production-hardened.',
    features: [
      { icon: Layers, title: 'Modular Architecture', desc: 'Clean, composable modules that scale independently as your business grows.' },
      { icon: Database, title: 'Database Design', desc: 'Optimized relational and NoSQL schemas for high-throughput data operations.' },
      { icon: Lock, title: 'Security First', desc: 'OWASP-compliant security layers, encryption at rest, and role-based access control.' },
      { icon: GitBranch, title: 'CI/CD Pipelines', desc: 'Automated testing, staging, and deployment workflows for zero-downtime releases.' },
    ],
    techStack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    stats: [{ value: '50+', label: 'Custom Apps Built' }, { value: '99.9%', label: 'Uptime SLA' }, { value: '< 2s', label: 'Avg Load Time' }],
  },
  'AI & Automation': {
    tagline: 'Intelligence That Works While You Sleep.',
    longDesc: 'We design and deploy AI-powered systems that automate your most complex workflows — from intelligent document processing to predictive analytics and conversational agents.',
    features: [
      { icon: Cpu, title: 'Machine Learning Models', desc: 'Custom-trained models for classification, prediction, and anomaly detection.' },
      { icon: Bot, title: 'Conversational AI', desc: 'Context-aware chatbots and virtual assistants powered by LLMs and RAG pipelines.' },
      { icon: Zap, title: 'Workflow Automation', desc: 'End-to-end process automation that eliminates manual bottlenecks.' },
      { icon: Database, title: 'Data Pipelines', desc: 'Real-time ETL pipelines that clean, transform, and serve data at scale.' },
    ],
    techStack: ['Python', 'TensorFlow', 'OpenAI', 'LangChain', 'FastAPI', 'Redis'],
    stats: [{ value: '85%', label: 'Cost Reduction' }, { value: '10x', label: 'Faster Processing' }, { value: '24/7', label: 'Autonomous Ops' }],
  },
  'Web Development': {
    tagline: 'Pixel-Perfect. Lightning-Fast. SEO-Ready.',
    longDesc: 'We craft high-performance web applications and marketing sites that load instantly, rank higher, and convert visitors into customers — built with modern frameworks and best practices.',
    features: [
      { icon: Globe, title: 'Full-Stack Apps', desc: 'End-to-end web applications with responsive frontends and robust backend APIs.' },
      { icon: Rocket, title: 'Performance Optimization', desc: 'Core Web Vitals tuning, lazy loading, and edge caching for sub-second loads.' },
      { icon: MonitorSmartphone, title: 'Responsive Design', desc: 'Fluid layouts that deliver flawless experiences across every device and screen.' },
      { icon: Lock, title: 'SEO & Accessibility', desc: 'Semantic HTML, structured data, and WCAG compliance baked into every build.' },
    ],
    techStack: ['Next.js', 'React', 'TailwindCSS', 'Node.js', 'Vercel', 'Prisma'],
    stats: [{ value: '100', label: 'Lighthouse Score' }, { value: '80+', label: 'Sites Delivered' }, { value: '< 1s', label: 'First Contentful Paint' }],
  },
  'Mobile App Development': {
    tagline: 'One Codebase. Every Platform. Zero Compromise.',
    longDesc: 'We design and build native-quality mobile applications for iOS and Android using cross-platform and native frameworks — delivering smooth, performant apps from prototype to App Store.',
    features: [
      { icon: Smartphone, title: 'Cross-Platform', desc: 'React Native and Flutter apps with native performance and a single codebase.' },
      { icon: Layers, title: 'Offline-First', desc: 'Local data persistence and background sync for reliable offline experiences.' },
      { icon: Zap, title: 'Push & Real-Time', desc: 'Push notifications, WebSockets, and live data feeds for engaged users.' },
      { icon: Rocket, title: 'Store Deployment', desc: 'End-to-end submission, review handling, and CI/CD for App Store & Google Play.' },
    ],
    techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Expo'],
    stats: [{ value: '4.9★', label: 'Avg Store Rating' }, { value: '30+', label: 'Apps Published' }, { value: '2M+', label: 'Total Downloads' }],
  },
  'UI/UX Design': {
    tagline: 'Design That Feels Right. Every Time.',
    longDesc: 'Our design team crafts intuitive, beautiful digital experiences grounded in user research, accessibility standards, and a relentless attention to detail — from wireframe to pixel-perfect handoff.',
    features: [
      { icon: Palette, title: 'Design Systems', desc: 'Reusable component libraries and design tokens for consistent brand expression.' },
      { icon: Users, title: 'User Research', desc: 'Interviews, surveys, and usability testing to validate every design decision.' },
      { icon: Figma, title: 'Prototyping', desc: 'High-fidelity interactive prototypes in Figma with developer-ready specs.' },
      { icon: Sparkles, title: 'Motion Design', desc: 'Micro-interactions and transitions that make interfaces feel alive and premium.' },
    ],
    techStack: ['Figma', 'Framer', 'Adobe XD', 'Principle', 'Lottie', 'Storybook'],
    stats: [{ value: '200+', label: 'Screens Designed' }, { value: '95%', label: 'Usability Score' }, { value: '40+', label: 'Design Systems' }],
  },
  'Cloud & DevOps': {
    tagline: 'Ship Faster. Scale Effortlessly. Sleep Better.',
    longDesc: 'We architect resilient cloud infrastructure and implement DevOps best practices that accelerate your delivery pipeline, reduce costs, and ensure your systems are always available.',
    features: [
      { icon: Cloud, title: 'Cloud Architecture', desc: 'Multi-region, fault-tolerant infrastructure on AWS, GCP, or Azure.' },
      { icon: Server, title: 'Containerization', desc: 'Docker and Kubernetes orchestration for scalable, portable deployments.' },
      { icon: GitBranch, title: 'CI/CD Automation', desc: 'GitHub Actions, Jenkins, and ArgoCD pipelines for continuous delivery.' },
      { icon: ShieldCheck, title: 'Monitoring & Security', desc: 'Observability stacks with Grafana, Prometheus, and automated alerting.' },
    ],
    techStack: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Grafana'],
    stats: [{ value: '99.99%', label: 'SLA Uptime' }, { value: '60%', label: 'Cost Savings' }, { value: '5 min', label: 'Deploy Time' }],
  },
  SEO: {
    tagline: 'Rank Higher. Drive Organic Traffic. Outperform Competitors.',
    longDesc: 'We deliver comprehensive technical SEO, keyword research, on-page optimization, and authoritative backlink building strategies to ensure your brand dominates search engine results.',
    features: [
      { icon: Search, title: 'Technical SEO Audits', desc: 'Fix crawl errors, site architecture, and indexation bottlenecks.' },
      { icon: BarChart3, title: 'Keyword & Competitor Research', desc: 'Identify high-intent keywords and market opportunities.' },
      { icon: Layers, title: 'On-Page & Content Optimization', desc: 'Optimize meta tags, heading structures, and content relevance.' },
      { icon: Zap, title: 'Link Building & Authority', desc: 'Build high-authority backlink profiles to boost domain rank.' },
    ],
    techStack: ['Google Search Console', 'Ahrefs', 'SEMrush', 'Screaming Frog', 'Google Analytics 4', 'Schema.org'],
    stats: [{ value: '+300%', label: 'Organic Traffic Growth' }, { value: '#1', label: 'Page Search Ranks' }, { value: '99%', label: 'SEO Audit Score' }],
  },
  'WordPress Development': {
    tagline: 'Tailored WordPress & WooCommerce Solutions for Growing Brands.',
    longDesc: 'We build secure, ultra-fast custom WordPress sites, custom Gutenberg blocks, WooCommerce stores, and API integrations engineered for speed and ease of management.',
    features: [
      { icon: Globe, title: 'Custom Theme & Gutenberg Blocks', desc: 'Bespoke themes built from scratch with reusable editor blocks.' },
      { icon: ShoppingBag, title: 'WooCommerce E-Commerce', desc: 'Custom online shop setups with seamless cart & checkout.' },
      { icon: Zap, title: 'Speed & Core Web Vitals', desc: 'Caching, image compression, and database tuning for sub-second loads.' },
      { icon: Lock, title: 'Security & Maintenance', desc: 'Hardened security layers, automated backups, and 24/7 uptime monitoring.' },
    ],
    techStack: ['WordPress', 'PHP 8.3', 'WooCommerce', 'MySQL', 'Elementor', 'REST API'],
    stats: [{ value: '150+', label: 'WordPress Sites Built' }, { value: '99.9%', label: 'Uptime & Security' }, { value: '< 1s', label: 'Load Latency' }],
  },
  'Shopify Store Development': {
    tagline: 'Scalable E-Commerce Experiences Built on Shopify.',
    longDesc: 'We design and build custom Shopify and Shopify Plus e-commerce storefronts optimized for mobile conversion, seamless checkout, and scalable store growth.',
    features: [
      { icon: ShoppingBag, title: 'Custom Liquid Themes', desc: 'Pixel-perfect, conversion-driven storefronts built for your brand.' },
      { icon: Sparkles, title: 'Shopify Plus Enterprise', desc: 'Advanced automation, custom checkout scripts, and multi-currency.' },
      { icon: Zap, title: 'App & Gateway Integrations', desc: 'Connect ERPs, CRMs, inventory systems, and custom payment gateways.' },
      { icon: BarChart3, title: 'Conversion Rate Tuning', desc: 'A/B testing, cart abandonment triggers, and mobile checkout optimization.' },
    ],
    techStack: ['Shopify Plus', 'Liquid', 'GraphQL Admin API', 'React / Hydrogen', 'Storefront API', 'Stripe'],
    stats: [{ value: '$10M+', label: 'Client Revenue Processed' }, { value: '99.9%', label: 'Checkout Uptime' }, { value: '+45%', label: 'Avg Conversion Boost' }],
  },
};

// ─── Main ServicesPage Component ─────────────────────────────────────────
export const ServicesPage: React.FC<{ onContactClick: () => void }> = ({ onContactClick }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedService]);

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen font-sans text-[#0D152A] pt-6 pb-24 overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* ─── HERO TOP SECTION ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 pb-16 sm:pb-24">
          
          {/* Left Column Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Top Eyebrow Label */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#14B8B0] font-extrabold text-xs sm:text-sm uppercase tracking-[0.2em]">
                OUR SERVICES —
              </span>
            </div>

            {/* Main Headline matching reference */}
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-[54px] text-[#0D152A] leading-[1.12] tracking-tight mb-6">
              Solutions we build <br />
              to drive your <span className="text-[#FF8706]">success.</span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-[#6B7280] font-medium text-base sm:text-lg leading-relaxed max-w-lg mb-10">
              We combine technology, creativity, and strategy to deliver powerful digital solutions that help your business grow, automate and scale.
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-5">
              {/* Primary Orange Button */}
              <button
                onClick={() => {
                  document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-3 bg-[#FF8706] hover:bg-[#E07200] text-white font-bold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg shadow-[#FF8706]/25 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                <span>Explore Services</span>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5 text-white stroke-[3]" />
                </div>
              </button>

              {/* Secondary Ghost Button: How We Work */}
              <button
                onClick={onContactClick}
                className="group inline-flex items-center gap-2.5 bg-white hover:bg-slate-50 text-[#0D152A] font-bold text-sm sm:text-base px-6 py-4 rounded-full border border-slate-200 shadow-xs transition-all duration-300 hover:border-[#FF8706]/40 hover:scale-[1.02] cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                </div>
                <span>How We Work</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column Illustration Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 flex items-center justify-center lg:justify-end relative select-none"
          >
            {/* Ambient Background Radial Glow */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#14B8B0]/20 via-[#FF8706]/15 to-[#4F46E5]/15 blur-3xl opacity-60 pointer-events-none" />

            <img
              src="/illustrationservice.png"
              alt="DevtaSoft Services Illustration"
              className="relative z-10 w-full h-auto max-w-[580px] object-contain filter drop-shadow-xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>

        </div>

        {/* ─── 6 SERVICES GRID (2 rows × 3 columns = 6 Cards) ─────────────── */}
        <div id="services-grid" className="pt-4 pb-20">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {servicesList.map((service) => {
              const ServiceIcon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  onClick={() => setSelectedService(service)}
                  className="group relative bg-white rounded-[24px] border border-[#ECECEC] p-8 shadow-[0_8px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] hover:border-[#FF8706]/40 transition-all duration-400 hover:-translate-y-1.5 flex flex-col justify-between min-h-[400px] h-full cursor-pointer overflow-hidden"
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  whileHover={{ y: -6, scale: 1.015 }}
                >
                  <div>
                    {/* Top Row: Icon Badge Left, Badge Number Right */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-13 h-13 rounded-2xl flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: service.bgColor }}
                      >
                        <ServiceIcon className="w-6.5 h-6.5 stroke-[2]" style={{ color: service.accentColor === '#14B8B0' ? '#14B8B0' : service.accentColor }} />
                      </div>

                      <span className="font-display font-extrabold text-xs tracking-wider text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
                        {service.badgeNum}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#0D152A] mb-3 group-hover:text-[#FF8706] transition-colors leading-snug">
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-[#6B7280] font-medium text-sm leading-relaxed mb-6">
                      {service.desc}
                    </p>
                  </div>

                  {/* Bottom Row: Learn More Link Left + Graphic Illustration Right */}
                  <div className="pt-5 border-t border-slate-100 flex items-center justify-between mt-auto">
                    {/* Small Orange Learn More Link */}
                    <div className="inline-flex items-center gap-2 font-bold text-sm text-[#FF8706] group-hover:translate-x-1 transition-transform duration-300 -mt-1">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </div>

                    {/* Vector Illustration Badge Graphic */}
                    <div className="shrink-0">
                      {service.illustration}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ─── BOTTOM METRICS STRIP (4 Stat Items) ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full bg-white rounded-[28px] border border-[#ECECEC] shadow-[0_15px_40px_rgba(0,0,0,0.04)] p-8 sm:p-12 mb-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {/* Stat 1 */}
            <div className="flex flex-col items-start pt-4 sm:pt-0">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
                  <Users className="w-6 h-6 stroke-[2.2]" />
                </div>
              </div>
              <span className="font-display font-black text-3xl text-[#0D152A] mb-1">120+</span>
              <h4 className="font-display font-extrabold text-base text-[#0D152A] mb-1">Projects Delivered</h4>
              <p className="text-[#6B7280] font-medium text-xs leading-relaxed">
                Successful digital solutions across industries.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-start pt-6 sm:pt-0 sm:pl-8">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F8F9] text-[#14B8B0] flex items-center justify-center shadow-xs">
                  <Smile className="w-6 h-6 stroke-[2.2]" />
                </div>
              </div>
              <span className="font-display font-black text-3xl text-[#0D152A] mb-1">95%</span>
              <h4 className="font-display font-extrabold text-base text-[#0D152A] mb-1">Client Satisfaction</h4>
              <p className="text-[#6B7280] font-medium text-xs leading-relaxed">
                We're proud of the trust and satisfaction of our clients.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-start pt-6 sm:pt-0 sm:pl-8">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FFEFE5] text-[#FF8706] flex items-center justify-center shadow-xs">
                  <Rocket className="w-6 h-6 stroke-[2.2]" />
                </div>
              </div>
              <span className="font-display font-black text-3xl text-[#0D152A] mb-1">5+</span>
              <h4 className="font-display font-extrabold text-base text-[#0D152A] mb-1">Years of Experience</h4>
              <p className="text-[#6B7280] font-medium text-xs leading-relaxed">
                Delivering innovative solutions with proven expertise.
              </p>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-start pt-6 sm:pt-0 sm:pl-8">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
                </div>
              </div>
              <span className="font-display font-black text-3xl text-[#0D152A] mb-1">24/7</span>
              <h4 className="font-display font-extrabold text-base text-[#0D152A] mb-1">Support &amp; Maintenance</h4>
              <p className="text-[#6B7280] font-medium text-xs leading-relaxed">
                We stay with you to ensure smooth performance always.
              </p>
            </div>
          </div>
        </motion.div>

      </div>

      {/* ─── SERVICE DETAIL POPUP MODAL ──────────────────────────────────── */}
      <AnimatePresence>
        {selectedService && serviceDetailsData[selectedService.title] && (
          <>
            <motion.div
              className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
            />

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
                  onClick={() => setSelectedService(null)}
                  className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-200 hover:scale-110 z-20 cursor-pointer"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>

                {/* Modal Header */}
                <div className="relative p-8 sm:p-10 pb-2 overflow-hidden">
                  <div
                    className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: selectedService.accentColor }}
                  />

                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xs"
                      style={{ backgroundColor: selectedService.bgColor }}
                    >
                      <selectedService.icon className="w-7 h-7 stroke-[2]" style={{ color: selectedService.accentColor === '#14B8B0' ? '#14B8B0' : selectedService.accentColor }} />
                    </div>
                    <div>
                      <span className="text-xs font-black px-3 py-1 rounded-full bg-slate-100 text-slate-500 uppercase tracking-wider">
                        Service {selectedService.badgeNum}
                      </span>
                      <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0D152A] leading-tight mt-1">
                        {selectedService.title}
                      </h2>
                    </div>
                  </div>

                  <p className="font-display font-extrabold text-lg sm:text-xl leading-snug mb-3 text-[#FF8706]">
                    {serviceDetailsData[selectedService.title].tagline}
                  </p>

                  <p className="text-[#6B7280] font-medium text-sm sm:text-base leading-relaxed max-w-2xl">
                    {serviceDetailsData[selectedService.title].longDesc}
                  </p>
                </div>

                {/* Key Stats Bar */}
                <div className="px-8 sm:px-10 py-4">
                  <div className="grid grid-cols-3 gap-4">
                    {serviceDetailsData[selectedService.title].stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-2xl p-4 text-center border border-slate-100 bg-slate-50"
                      >
                        <span className="font-display font-black text-2xl sm:text-3xl block mb-1 text-[#FF8706]">
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
                    What's Included
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {serviceDetailsData[selectedService.title].features.map((feat, i) => {
                      const FeatIcon = feat.icon;
                      return (
                        <motion.div
                          key={feat.title}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.12 + i * 0.07 }}
                          className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:border-slate-200 transition-all duration-300 hover:-translate-y-0.5"
                        >
                          <div className="flex items-start gap-3.5">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-[#FFEFE5] text-[#FF8706]">
                              <FeatIcon className="w-4 h-4 stroke-[2.5]" />
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
                      );
                    })}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="px-8 sm:px-10 pb-6">
                  <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-slate-400 mb-3">
                    Technologies We Use
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {serviceDetailsData[selectedService.title].techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3.5 py-1.5 rounded-full font-bold text-xs bg-[#E6F8F9] text-[#14B8B0] border border-[#14B8B0]/30"
                      >
                        ✓ {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="px-8 sm:px-10 pb-8 sm:pb-10 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-[#667085] font-medium text-sm text-center sm:text-left">
                    Ready to build your next custom solution?
                  </p>
                  <button
                    onClick={() => {
                      setSelectedService(null);
                      onContactClick();
                    }}
                    className="inline-flex items-center gap-2.5 bg-[#FF8706] hover:bg-[#E07200] text-white font-bold text-sm px-7 py-3 rounded-2xl shadow-lg shadow-[#FF8706]/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-4 h-4" />
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
