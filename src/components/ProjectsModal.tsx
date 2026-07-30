import React, { useState } from 'react';
import { X, ExternalLink, Sparkles, Smartphone, Globe, Palette } from 'lucide-react';
import { Project } from '../types';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'FinTech Digital Banking Platform',
    category: 'Web Apps',
    description: 'High-speed web banking application with real-time portfolio analytics and instant global cross-border payments.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    client: 'FinPulse Capital',
    techStack: ['React', 'TypeScript', 'Node.js', 'Tailwind', 'Chart.js'],
    metrics: '+240% User Engagement',
  },
  {
    id: '2',
    title: 'Pulse Health & Fitness Companion',
    category: 'Mobile Apps',
    description: 'Cross-platform iOS and Android app integrating wearable sensors, real-time heart rate monitoring, and AI workout recommendations.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    client: 'PulseFit Labs',
    techStack: ['React Native', 'TypeScript', 'GraphQL', 'Swift'],
    metrics: '1.2M Active Downloads',
  },
  {
    id: '3',
    title: 'Aether Design System & SaaS Suite',
    category: 'UI/UX Design',
    description: 'Complete end-to-end design system, component library, and responsive UI framework for enterprise cloud platforms.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    client: 'Aether Cloud',
    techStack: ['Figma', 'Design Tokens', 'Tailwind CSS', 'Framer Motion'],
    metrics: '99.8% Accessibility Score',
  },
  {
    id: '4',
    title: 'LogiX Global Logistics Tracker',
    category: 'Web Apps',
    description: 'Real-time supply chain dashboard with GPS fleet tracking, automated route optimization, and live delivery updates.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    client: 'LogiX International',
    techStack: ['Next.js', 'TypeScript', 'Express', 'WebSockets'],
    metrics: '35% Reduced Shipping Latency',
  },
];

export const ProjectsModal: React.FC<ProjectsModalProps> = ({ isOpen, onClose, onContactClick }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'UI/UX Design' | 'Mobile Apps' | 'Web Apps'>('All');

  if (!isOpen) return null;

  const filteredProjects = activeTab === 'All'
    ? sampleProjects
    : sampleProjects.filter(p => p.category === activeTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#00C2CC] font-semibold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>DevtaSoft Portfolio</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0D152A]">
              Explore Our Featured Work
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2.5 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="px-6 sm:px-8 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto">
          {(['All', 'UI/UX Design', 'Mobile Apps', 'Web Apps'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-[#FF6B00] text-white shadow-md shadow-[#FF6B00]/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#0D152A]/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                    {project.category === 'Mobile Apps' && <Smartphone className="w-3.5 h-3.5 text-[#00C2CC]" />}
                    {project.category === 'Web Apps' && <Globe className="w-3.5 h-3.5 text-[#FF6B00]" />}
                    {project.category === 'UI/UX Design' && <Palette className="w-3.5 h-3.5 text-[#00C2CC]" />}
                    <span>{project.category}</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">
                      Client: {project.client}
                    </span>
                    <h3 className="font-display font-bold text-lg text-[#0D152A] group-hover:text-[#FF6B00] transition-colors mt-0.5">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-sm mt-1 line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-0.5 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#00C2CC] bg-[#00C2CC]/10 px-2.5 py-1 rounded-lg">
                        {project.metrics}
                      </span>
                      <button
                        onClick={() => {
                          onClose();
                          onContactClick();
                        }}
                        className="text-xs font-semibold text-[#0D152A] hover:text-[#FF6B00] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        Start Similar Project
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:px-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm text-center sm:text-left">
            Have a custom idea in mind? We'd love to help you build it.
          </p>
          <button
            onClick={() => {
              onClose();
              onContactClick();
            }}
            className="bg-[#FF6B00] hover:bg-[#E25C00] text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-[#FF6B00]/20 transition-all cursor-pointer whitespace-nowrap"
          >
            Start Your Project
          </button>
        </div>
      </div>
    </div>
  );
};
