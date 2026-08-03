import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { ContactSection } from './ContactSection';
import { DotGrid } from './DotGrid';

interface ContactPageProps {
  onStartProjectClick?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onStartProjectClick }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="w-full bg-[#FCFDFE] font-sans min-h-screen overflow-hidden">
      
      {/* ── Page Hero Header ────────────────────────────────────────────── */}
      <section className="relative pt-12 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-slate-50/80 via-white to-[#FCFDFE]">
        <div className="max-w-[1400px] mx-auto relative z-10 text-center flex flex-col items-center">
          
          {/* Eyebrow Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E6F8F9] text-[#14B8B0] font-extrabold text-xs sm:text-sm uppercase tracking-[0.18em] mb-6 shadow-xs border border-[#14B8B0]/20"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-4 h-4 text-[#14B8B0]" />
            <span>Get In Touch</span>
          </motion.div>

          {/* Hero Headline */}
          <motion.h1
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#0D152A] leading-[1.1] tracking-tight mb-6 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Let’s start a <span className="text-[#FF6B00]">conversation.</span>
          </motion.h1>

          {/* Hero Subtitle */}
          <motion.p
            className="text-[#6B7280] text-base sm:text-xl max-w-2xl leading-relaxed font-normal mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Whether you have a groundbreaking project idea, need custom software development, or simply want to learn more about DevtaSoft, our team is here for you.
          </motion.p>

          {/* Highlight Cards Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mt-4"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#FFEFE5] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-[#FF8706]" />
              </div>
              <h3 className="font-display font-extrabold text-[#0D152A] text-lg mb-1">Email Us</h3>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">hello@devtasoft.com</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F8F9] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-[#14B8B0]" />
              </div>
              <h3 className="font-display font-extrabold text-[#0D152A] text-lg mb-1">Call Us Direct</h3>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">+92 312 1234567</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#FFEFE5] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-[#FF8706]" />
              </div>
              <h3 className="font-display font-extrabold text-[#0D152A] text-lg mb-1">Response Time</h3>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">Within 24 Hours</p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Main Contact Form & Info Section ─────────────────────────────── */}
      <ContactSection />

      {/* ── FAQ / Quick Support Banner ───────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0D152A] mb-4">
              Need immediate project estimation?
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-6 font-medium">
              We specialize in custom web apps, mobile apps, e-commerce, AI automation, and cloud software. Let's scope out your requirements together.
            </p>
            <div className="flex flex-col gap-3">
              {[
                'Transparent pricing & detailed milestones',
                'Dedicated project manager for daily updates',
                'Post-launch maintenance & 24/7 technical support',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#14B8B0] shrink-0" />
                  <span className="text-slate-700 font-semibold text-sm sm:text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0D152A] rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-xl">
            <div className="relative z-10">
              <span className="text-[#14B8B0] font-black text-xs uppercase tracking-widest block mb-2">DEV TASOFT CONSULTATION</span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl mb-4">Book a Free 30-Min Strategy Call</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                Speak directly with our senior engineers and tech leads to evaluate feasibility, tech stack recommendations, and delivery timelines.
              </p>
            </div>
            <button
              onClick={onStartProjectClick}
              className="relative z-10 inline-flex items-center justify-center gap-2.5 bg-[#FF8706] hover:bg-[#E07200] text-white font-bold text-base px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
            >
              <span>Schedule Strategy Call</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
