import React from 'react';
import { Logo } from './Logo';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Instagram, 
  ArrowUp, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight 
} from 'lucide-react';

interface FooterProps {
  onLinkClick?: (sectionId: string) => void;
  onContactClick?: () => void;
  onProjectsClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onLinkClick,
  onContactClick,
  onProjectsClick,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (sectionId: string) => {
    if (onLinkClick) {
      onLinkClick(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="w-full bg-[#090D16] pt-20 pb-12 border-t border-white/10 font-sans relative overflow-hidden">
      
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#00C2CC]/10 via-transparent to-transparent pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#FF6B00]/10 via-transparent to-transparent pointer-events-none rounded-full" />

      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
        
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Brand Box Column */}
          <div className="lg:col-span-4 flex flex-col items-start gap-6">
            <Logo isLight={true} />
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-sm font-medium mt-2">
              Empowering startups, entrepreneurs, and global brands with next-generation digital products, robust software architectures, and intelligent AI tools.
            </p>
            
            {/* Social Media Link Icons with Official Brand Colors */}
            <div className="flex items-center gap-3 mt-2">
              {/* LinkedIn: #0A66C2 */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full bg-[#0A66C2]/15 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-all duration-300 border border-[#0A66C2]/30 shadow-sm hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 stroke-[2]" />
              </a>

              {/* GitHub: #FFFFFF / #24292E */}
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white hover:text-[#0D152A] flex items-center justify-center transition-all duration-300 border border-white/20 shadow-sm hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 stroke-[2]" />
              </a>

              {/* Twitter / X: #1DA1F2 */}
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full bg-[#1DA1F2]/15 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center transition-all duration-300 border border-[#1DA1F2]/30 shadow-sm hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 stroke-[2]" />
              </a>

              {/* Facebook: #1877F2 */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full bg-[#1877F2]/15 text-[#1877F2] hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all duration-300 border border-[#1877F2]/30 shadow-sm hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 stroke-[2]" />
              </a>

              {/* Instagram: Gradient #E4405F */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full bg-[#E4405F]/15 text-[#E4405F] hover:bg-gradient-to-tr hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:text-white flex items-center justify-center transition-all duration-300 border border-[#E4405F]/30 shadow-sm hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 stroke-[2]" />
              </a>
            </div>
          </div>

          {/* Quick Links Column (About, Services, Portfolio, Products, Contact) */}
          <div className="lg:col-span-2 flex flex-col gap-5 md:pl-4">
            <h4 className="font-display font-black text-white text-sm tracking-wider uppercase">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <button 
                  onClick={() => handleNavClick('about')}
                  className="text-slate-400 hover:text-[#FF6B00] transition-colors text-sm sm:text-base font-semibold cursor-pointer flex items-center gap-1 group bg-transparent border-none p-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] opacity-0 group-hover:opacity-100 transition-all duration-200" />
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('portfolio')}
                  className="text-slate-400 hover:text-[#FF6B00] transition-colors text-sm sm:text-base font-semibold cursor-pointer flex items-center gap-1 group bg-transparent border-none p-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] opacity-0 group-hover:opacity-100 transition-all duration-200" />
                  <span>Portfolio</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('products')}
                  className="text-slate-400 hover:text-[#FF6B00] transition-colors text-sm sm:text-base font-semibold cursor-pointer flex items-center gap-1 group bg-transparent border-none p-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] opacity-0 group-hover:opacity-100 transition-all duration-200" />
                  <span>Our Products</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('contact')}
                  className="text-slate-400 hover:text-[#FF6B00] transition-colors text-sm sm:text-base font-semibold cursor-pointer flex items-center gap-1 group bg-transparent border-none p-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] opacity-0 group-hover:opacity-100 transition-all duration-200" />
                  <span>Get in Touch</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Core Suite Products Column */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <h4 className="font-display font-black text-white text-sm tracking-wider uppercase">
              Featured Tools
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a 
                  href="#products" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('products'); }}
                  className="text-slate-400 hover:text-[#FF6B00] transition-colors text-sm sm:text-base font-semibold flex items-center gap-2"
                >
                  <span className="text-[#8E44AD] font-bold text-xs">REPOSTSEO</span>
                  <span className="text-slate-600 text-xs">•</span>
                  <span className="text-[11px] text-[#FF6B00] bg-[#FF6B00]/10 px-1.5 py-0.5 rounded font-black">AI</span>
                </a>
              </li>
              <li>
                <a 
                  href="#products" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('products'); }}
                  className="text-slate-400 hover:text-[#FF6B00] transition-colors text-sm sm:text-base font-semibold flex items-center gap-2"
                >
                  <span className="text-[#14B8B0] font-bold text-xs">Editpad</span>
                  <span className="text-slate-600 text-xs">•</span>
                  <span className="text-[11px] text-slate-500">Editor</span>
                </a>
              </li>
              <li>
                <a 
                  href="#products" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('products'); }}
                  className="text-slate-400 hover:text-[#FF6B00] transition-colors text-sm sm:text-base font-semibold flex items-center gap-2"
                >
                  <span className="text-[#10B981] font-bold text-xs">AllMath</span>
                  <span className="text-slate-600 text-xs">•</span>
                  <span className="text-[11px] text-slate-500">Solver</span>
                </a>
              </li>
              <li>
                <a 
                  href="#products" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('products'); }}
                  className="text-slate-400 hover:text-[#FF6B00] transition-colors text-sm sm:text-base font-semibold flex items-center gap-2"
                >
                  <span className="text-slate-300 font-bold text-xs">Calculators.tech</span>
                </a>
              </li>
              <li>
                <a 
                  href="#products" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('products'); }}
                  className="text-slate-400 hover:text-[#FF6B00] transition-colors text-sm sm:text-base font-semibold flex items-center gap-2"
                >
                  <span className="text-[#06B6D4] font-bold text-xs">Online Notepad</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Contact & Info Card Column */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <h4 className="font-display font-black text-white text-sm tracking-wider uppercase">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-4 bg-white/5 rounded-2xl p-5 border border-white/5">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FF8706] shrink-0 mt-0.5" />
                <span className="text-slate-300 text-xs sm:text-sm font-semibold">
                  Faisalabad, Pakistan
                </span>
              </div>
              
              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#14B8B0] shrink-0 mt-0.5" />
                <a href="mailto:hello@devtasoft.com" className="text-slate-300 hover:text-[#FF6B00] text-xs sm:text-sm font-semibold truncate transition-colors">
                  hello@devtasoft.com
                </a>
              </div>

              {/* Quick CTA */}
              <button 
                onClick={onContactClick}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-[#E05B00] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md shadow-[#FF6B00]/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: Copyright & Legal + Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10">
          
          {/* Copyright text */}
          <div className="text-slate-500 text-xs sm:text-sm text-center sm:text-left font-medium">
            <span>© {new Date().getFullYear()} </span>
            <span className="font-bold text-white">DevtaSoft</span>
            <span>. All rights reserved. Designed with precision & pride.</span>
          </div>

          {/* Legal and Back to Top Row */}
          <div className="flex items-center gap-6">
            
            {/* Back to top dynamic float circular link */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-[#FF6B00] hover:text-white border border-white/10 hover:border-[#FF6B00] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <span>Back to top</span>
              <ArrowUp className="w-4 h-4 text-[#FF6B00] group-hover:text-white transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>

          </div>

        </div>

      </div>
    </footer>
  );
};
