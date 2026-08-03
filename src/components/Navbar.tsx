import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { ArrowRight, Menu, X, LogIn } from 'lucide-react';
import { dataService, VisibilitySettings } from '../services/dataService';

interface NavbarProps {
  onContactClick: () => void;
  onServiceClick: (service: string) => void;
  onProjectsClick: () => void;
  onHomeClick: () => void;
  onLoginClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onContactClick,
  onServiceClick,
  onProjectsClick,
  onHomeClick,
  onLoginClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibility, setVisibility] = useState<VisibilitySettings>(dataService.getVisibility());
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const updateVisibility = () => setVisibility(dataService.getVisibility());
    updateVisibility();
    return dataService.subscribe(updateVisibility);
  }, []);

  const navItems = [
    { label: 'Home', id: 'Home', path: '/' },
    { label: 'About Us', id: 'About', path: '/about' },
    { label: 'Products', id: 'Products', path: '/products' },
    { label: 'Services', id: 'Services', path: '/services' },
    { label: 'Portfolio', id: 'Portfolio', path: '/portfolio' },
    { label: 'Contact', id: 'Contact', path: '/contact' },
  ];

  const visibleNavItems = navItems.filter((item) => {
    if (item.id === 'About') return visibility.pages.about;
    if (item.id === 'Products') return visibility.pages.products;
    if (item.id === 'Services') return visibility.pages.services;
    if (item.id === 'Portfolio') return visibility.pages.portfolio;
    if (item.id === 'Contact') return visibility.pages.contact;
    return true;
  });

  const isItemActive = (id: string, path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path === '/about' && location.pathname === '/about') return true;
    if (path === '/portfolio' && location.pathname === '/portfolio') return true;
    if (path === '/products' && location.pathname === '/products') return true;
    if (path === '/services' && location.pathname === '/services') return true;
    if (path === '/contact' && location.pathname === '/contact') return true;
    return false;
  };

  const handleNavClick = (id: string) => {
    if (id === 'Home') {
      onHomeClick();
    } else if (id === 'About') {
      onServiceClick('About');
    } else if (id === 'Portfolio') {
      navigate('/portfolio');
    } else if (id === 'Products') {
      navigate('/products');
    } else if (id === 'Services') {
      navigate('/services');
    } else if (id === 'Contact') {
      navigate('/contact');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative z-50 w-full h-[76px] px-4 sm:px-6 lg:px-8 bg-transparent outline-none border-none transition-all duration-300">
      <div className="w-full flex items-center justify-between h-full relative">
        {/* Left Logo */}
        <button
          onClick={onHomeClick}
          className="text-left focus:outline-none rounded-lg p-0 transition-opacity hover:opacity-90 cursor-pointer flex items-center shrink-0 pl-2 sm:pl-0 ml-1 sm:ml-0 select-none pt-2 sm:pt-2.5 mt-1"
        >
          <Logo />
        </button>

        {/* Desktop Floating Pill-Shaped Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 absolute left-1/2 -translate-x-1/2 px-3 py-2 rounded-full bg-white/90 backdrop-blur-xl border border-slate-200/60 shadow-[0_10px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_14px_45px_rgba(0,0,0,0.12)]">
          {visibleNavItems.map((item) => {
            const active = isItemActive(item.id, item.path);
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full font-semibold text-sm tracking-tight transition-all duration-300 cursor-pointer ${
                  active
                    ? 'bg-[#FF6B00] text-white shadow-md shadow-[#FF6B00]/30'
                    : 'text-[#111827] hover:text-[#FF6B00] hover:bg-slate-100/80'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {/* Let's Talk Button */}
          <button
            onClick={onContactClick}
            className="group h-11 sm:h-12 px-5 sm:px-[26px] rounded-[16px] bg-gradient-to-r from-[#FF6B00] to-[#FA6400] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-xl hover:shadow-[#FF6B00]/35 active:translate-y-0 cursor-pointer"
          >
            <span>Let's Talk</span>
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="w-3.5 h-3.5 text-white stroke-[3]" />
            </div>
          </button>

          {/* Login Button (Always Visible) */}
          <button
            onClick={onLoginClick}
            className="button"
          >
            Login
          </button>
        </div>

        {/* Mobile Hamburger Toggle (Persistent DOM Element for Smooth CSS Animation) */}
        <div id="menuToggle" className="md:hidden flex items-center p-2 relative z-[60]">
          <input
            id="checkbox"
            type="checkbox"
            checked={mobileMenuOpen}
            onChange={(e) => setMobileMenuOpen(e.target.checked)}
          />
          <label className="toggle" htmlFor="checkbox" aria-label="Toggle Navigation Menu">
            <div className="bar bar--top"></div>
            <div className="bar bar--middle"></div>
            <div className="bar bar--bottom"></div>
          </label>
        </div>
      </div>

      {/* Mobile Right Sidebar Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Right Sidebar Container */}
          <div className="relative z-50 w-[290px] sm:w-[320px] max-w-[85vw] h-full bg-white shadow-2xl flex flex-col justify-between px-6 pt-5 pb-6 overflow-y-auto animate-in slide-in-from-right duration-300 ml-auto">
            <div>
              {/* Sidebar Header with Logo */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <button
                  onClick={() => {
                    onHomeClick();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left focus:outline-none cursor-pointer select-none"
                >
                  <Logo />
                </button>
                {/* Spacer box reserving space for persistent top toggle */}
                <div className="w-10 h-10 shrink-0" />
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-2">
                {visibleNavItems.map((item) => {
                  const active = isItemActive(item.id, item.path);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left font-bold text-base px-4 py-3.5 rounded-2xl flex items-center justify-between transition-all duration-200 cursor-pointer ${
                        active
                          ? 'bg-[#FF6B00] text-white shadow-lg shadow-[#FF6B00]/25'
                          : 'text-[#0D152A] hover:bg-slate-100 hover:text-[#FF6B00]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {active && (
                        <span className="w-2.5 h-2.5 rounded-full bg-white" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions inside Sidebar */}
            <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FA6400] text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-[#FF6B00]/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Let's Talk</span>
                <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
              </button>

              {/* Full Width Login Button in Mobile Sidebar */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLoginClick?.();
                }}
                className="button !w-full"
              >
                Login
              </button>

              <div className="text-center text-xs text-slate-400 font-medium pt-1">
                © DevtaSoft. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
