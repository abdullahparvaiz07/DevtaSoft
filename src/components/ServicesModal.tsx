import React from 'react';
import { X, CheckCircle2, ArrowRight, Layers, Smartphone, Globe, Users, ShieldCheck, Zap } from 'lucide-react';
import { ServiceDetail } from '../types';

interface ServicesModalProps {
  selectedService: string | null;
  onClose: () => void;
  onContactClick: () => void;
}

const serviceMap: Record<string, ServiceDetail> = {
  'UI/UX Design': {
    id: 'uiux',
    title: 'UI/UX Design & Product Experience',
    tagline: 'Pixel-perfect, human-centered digital experiences.',
    description: 'We transform complex user workflows into intuitive, beautiful, and accessible web and mobile interfaces that drive user retention and brand loyalty.',
    features: [
      'Comprehensive Design Systems & Component Libraries',
      'User Journey Mapping & Interactive Wireframing',
      'Hi-Fi Figma Prototypes & Motion Micro-Interactions',
      'Usability Testing & Conversion Rate Optimization',
    ],
    icon: 'palette',
    tech: ['Figma', 'Adobe XD', 'Framer', 'Tailwind CSS', 'Design Tokens'],
  },
  'Mobile Apps': {
    id: 'mobile',
    title: 'Mobile App Development',
    tagline: 'High-performance native and cross-platform mobile solutions.',
    description: 'Engineered for seamless performance on iOS and Android with smooth 60fps animations, offline capabilities, and native hardware integration.',
    features: [
      'Cross-Platform iOS & Android Apps (React Native / Flutter)',
      'Native Swift & Kotlin Specialized Modules',
      'Offline Data Synchronization & Push Notifications',
      'App Store & Play Store Deployment & Optimization',
    ],
    icon: 'smartphone',
    tech: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'GraphQL'],
  },
  'Web Apps': {
    id: 'web',
    title: 'Full-Stack Web App Development',
    tagline: 'Scalable, lightning-fast web applications built for growth.',
    description: 'Robust cloud architectures, serverless microservices, and modern frontend frameworks designed for enterprise uptime and extreme responsiveness.',
    features: [
      'Custom React, Next.js & TypeScript Frontend Architectures',
      'Secure High-Throughput REST & GraphQL APIs',
      'Real-Time WebSocket Collaboration & Live Data Dashboards',
      'Cloud Deployment & Automated CI/CD Pipelines',
    ],
    icon: 'globe',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'PostgreSQL'],
  },
  'Services': {
    id: 'services',
    title: 'DevtaSoft Engineering & Design Services',
    tagline: 'End-to-end digital product design, development, and scaling.',
    description: 'We deliver full-lifecycle software solutions tailored for high-growth startups and modern enterprises, spanning Web, Mobile, Cloud, and AI.',
    features: [
      'UI/UX Product Design & Component Libraries',
      'Full-Stack Web & SaaS Application Development',
      'Native & Cross-Platform Mobile Apps (iOS & Android)',
      'Cloud Architecture, DevOps & API Infrastructure',
    ],
    icon: 'layers',
    tech: ['React', 'TypeScript', 'Node.js', 'React Native', 'Figma', 'AWS', 'Tailwind'],
  },
  'Products': {
    id: 'products',
    title: 'Digital Products & SaaS Solutions',
    tagline: 'Turnkey enterprise software, design systems & developer tools.',
    description: 'Explore our suite of production-ready digital software products, white-label frameworks, and customizable enterprise SaaS engines built by DevtaSoft.',
    features: [
      'Aether SaaS Cloud & Analytics Engine',
      'DevtaSoft Cross-Platform Design System Tokens',
      'FinPulse Secure Banking & Payment Infrastructure',
      'LogiX Supply Chain Real-Time Tracker',
    ],
    icon: 'zap',
    tech: ['Next.js', 'Microservices', 'WebSockets', 'GraphQL', 'Docker', 'PostgreSQL'],
  },
  'About': {
    id: 'about',
    title: 'About DevtaSoft',
    tagline: 'Your trusted partner in software innovation.',
    description: 'DevtaSoft is an elite team of senior software engineers, product designers, and solution architects dedicated to delivering world-class digital products that empower brands worldwide.',
    features: [
      'Agile Sprints with Transparent Daily Updates',
      'Dedicated Senior Engineering Teams with Proven Track Record',
      'Strict Code Quality Standards, Automated Testing & Security Audits',
      'End-to-End Product Lifecycle Partnership',
    ],
    icon: 'users',
    tech: ['Agile', 'DevOps', 'ISO Certified Standards', 'Clean Architecture'],
  },
  'About Us': {
    id: 'about_us',
    title: 'About DevtaSoft',
    tagline: 'Your trusted partner in software innovation.',
    description: 'DevtaSoft is an elite team of senior software engineers, product designers, and solution architects dedicated to delivering world-class digital products that empower brands worldwide.',
    features: [
      'Agile Sprints with Transparent Daily Updates',
      'Dedicated Senior Engineering Teams with Proven Track Record',
      'Strict Code Quality Standards, Automated Testing & Security Audits',
      'End-to-End Product Lifecycle Partnership',
    ],
    icon: 'users',
    tech: ['Agile', 'DevOps', 'ISO Certified Standards', 'Clean Architecture'],
  },
};

export const ServicesModal: React.FC<ServicesModalProps> = ({
  selectedService,
  onClose,
  onContactClick,
}) => {
  if (!selectedService || !serviceMap[selectedService]) return null;

  const detail = serviceMap[selectedService];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 md:p-10">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2.5 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-[#FF6B00]/10 text-[#FF6B00] rounded-2xl flex items-center justify-center">
            {selectedService === 'Mobile Apps' && <Smartphone className="w-6 h-6 text-[#FF6B00]" />}
            {selectedService === 'Web Apps' && <Globe className="w-6 h-6 text-[#FF6B00]" />}
            {selectedService === 'UI/UX Design' && <Layers className="w-6 h-6 text-[#00C2CC]" />}
            {(selectedService === 'About Us' || selectedService === 'About') && <Users className="w-6 h-6 text-[#00C2CC]" />}
            {selectedService === 'Services' && <Layers className="w-6 h-6 text-[#00C2CC]" />}
            {selectedService === 'Products' && <Zap className="w-6 h-6 text-[#FF6B00]" />}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#00C2CC]">
              {selectedService === 'About Us' ? 'Company Overview' : 'Service Capability'}
            </span>
            <h2 className="font-display font-bold text-2xl text-[#0D152A]">
              {detail.title}
            </h2>
          </div>
        </div>

        <p className="font-semibold text-slate-800 text-base mb-2">
          "{detail.tagline}"
        </p>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {detail.description}
        </p>

        {/* Feature List */}
        <div className="space-y-2.5 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Key Capabilities & Deliverables
          </h4>
          {detail.features.map((feat, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-[#0D152A]">
              <CheckCircle2 className="w-4 h-4 text-[#00C2CC] shrink-0 mt-0.5" />
              <span className="font-medium">{feat}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Technologies & Tools
          </span>
          <div className="flex flex-wrap gap-2">
            {detail.tech.map((t) => (
              <span
                key={t}
                className="bg-[#00C2CC]/10 text-[#00C2CC] font-semibold text-xs px-3 py-1 rounded-lg"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
            <span>Guaranteed Production-Ready Standards</span>
          </div>
          <button
            onClick={() => {
              onClose();
              onContactClick();
            }}
            className="bg-[#FF6B00] hover:bg-[#E25C00] text-white px-6 py-3 rounded-2xl font-semibold text-sm shadow-lg shadow-[#FF6B00]/25 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Consult With Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
