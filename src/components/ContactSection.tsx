import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, User, FileText, PenTool, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { DotGrid } from './DotGrid';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="w-full bg-[#FCFDFE] py-20 sm:py-28 px-2 sm:px-4 lg:px-6 font-sans overflow-hidden border-t border-slate-50 relative">
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT SIDE: Heading & Contact Info (span 5) */}
          <div className="lg:col-span-5 flex flex-col relative">
            
            {/* Eyebrow Label with Teal Accent */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#14B8B0] font-black text-xs sm:text-sm uppercase tracking-[0.2em]">
                CONTACT US
              </span>
              <span className="h-[2px] w-12 bg-[#14B8B0] rounded-full inline-block" />
            </div>

            {/* Main Headline */}
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[52px] text-[#0D152A] leading-[1.1] tracking-tight mb-6">
              Let’s build <br />
              something amazing <br />
              <span className="text-[#FF6B00]">together.</span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#475569] max-w-[560px] leading-relaxed font-normal mb-8">
              Have a project in mind or just want to say hello? We’d love to hear from you. Drop us a message and we’ll get back to you as soon as possible.
            </p>

            {/* Underline Accent */}
            <div className="w-16 h-[2px] bg-[#FF6B00] rounded-full mb-10" />

            {/* Contact Information List */}
            <div className="flex flex-col gap-6">
              
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#FFEFE5] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#FF8706]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-1">Email</div>
                  <a href="mailto:hello@devtasoft.com" className="font-sans font-bold text-[#0D152A] hover:text-[#FF6B00] transition-colors text-base">
                   devtasoftofficial@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#E6F8F9] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#14B8B0]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-1">Phone</div>
                  <a href="tel:+923121234567" className="font-sans font-bold text-[#0D152A] hover:text-[#FF6B00] transition-colors text-base">
                    +92 3085277092
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#FFEFE5] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#FF8706]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-1">Location</div>
                  <div className="font-sans font-bold text-[#0D152A] text-base">
                    Chenab Market, Susan Road, near Soneri Bank, Block X Madina Town, Faisalabad,38000, Pakistan
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#E6F8F9] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#14B8B0]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-1">Working Hours</div>
                  <div className="font-sans font-bold text-[#0D152A] text-base">
                    Mon - Sat: 10AM - 7PM
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE: Interactive Form Container (span 7) */}
          <div className="lg:col-span-7 relative">
            
            {/* Background Dot Grid relative placement */}
            <div className="absolute -top-10 -left-12 pointer-events-none hidden sm:block opacity-60">
              <DotGrid rows={4} cols={5} dotColor="#D1D5DB" />
            </div>

            {/* Main White Card Frame */}
            <div className="relative z-10 bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-100/50 p-8 sm:p-12 lg:p-14">
              
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#0D152A] mb-2 tracking-tight">
                Send us a message
              </h3>
              <p className="text-slate-500 text-sm sm:text-base mb-10 leading-relaxed font-medium">
                Fill out the form below and we’ll get back to you shortly.
              </p>

              {/* Form Element */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Two-column Input Grid (Name & Email) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Your Name */}
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <User className="w-5 h-5 stroke-[1.75]" />
                    </span>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (status === 'error') setStatus('idle');
                      }}
                      className="w-full pl-12 pr-4 py-4 bg-transparent border border-slate-100 hover:border-slate-200 focus:border-[#FF6B00] rounded-2xl text-slate-700 placeholder-slate-400 font-medium text-sm sm:text-base outline-none transition-all duration-300 shadow-sm"
                      required
                    />
                  </div>

                  {/* Your Email */}
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Mail className="w-5 h-5 stroke-[1.75]" />
                    </span>
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (status === 'error') setStatus('idle');
                      }}
                      className="w-full pl-12 pr-4 py-4 bg-transparent border border-slate-100 hover:border-slate-200 focus:border-[#FF6B00] rounded-2xl text-slate-700 placeholder-slate-400 font-medium text-sm sm:text-base outline-none transition-all duration-300 shadow-sm"
                      required
                    />
                  </div>

                </div>

                {/* Subject */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <FileText className="w-5 h-5 stroke-[1.75]" />
                  </span>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-transparent border border-slate-100 hover:border-slate-200 focus:border-[#FF6B00] rounded-2xl text-slate-700 placeholder-slate-400 font-medium text-sm sm:text-base outline-none transition-all duration-300 shadow-sm"
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <span className="absolute left-4 top-6 text-slate-400">
                    <PenTool className="w-5 h-5 stroke-[1.75]" />
                  </span>
                  <textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (status === 'error') setStatus('idle');
                    }}
                    rows={5}
                    className="w-full pl-12 pr-4 py-4 bg-transparent border border-slate-100 hover:border-slate-200 focus:border-[#FF6B00] rounded-2xl text-slate-700 placeholder-slate-400 font-medium text-sm sm:text-base outline-none transition-all duration-300 resize-none shadow-sm"
                    required
                  />
                </div>

                {/* Success & Error State Notifications */}
                {status === 'success' && (
                  <div className="flex items-center gap-3 bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100 text-sm font-semibold animate-fade-in">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Thank you! Your message has been sent successfully. We will get back to you soon.</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="bg-rose-50 text-rose-800 p-4 rounded-xl border border-rose-100 text-sm font-semibold animate-fade-in">
                    Please fill in all the required fields correctly.
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF6B00] to-[#FA6400] hover:from-[#E05B00] hover:to-[#E05B00] disabled:bg-[#FF6B00]/75 text-white font-bold text-sm sm:text-base py-4 sm:py-4.5 rounded-2xl shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#FF6B00]/35 active:scale-[0.99] cursor-pointer group"
                >
                  <span>{status === 'loading' ? 'Sending Message...' : 'Send Message'}</span>
                  {status !== 'loading' && (
                    <ArrowRight className="w-5 h-5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1.5" />
                  )}
                </button>

                {/* Lock Note */}
                <div className="flex items-center justify-center gap-2 mt-4 text-slate-400 text-xs font-semibold">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Your information is safe with us. We never share your data.</span>
                </div>

              </form>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
