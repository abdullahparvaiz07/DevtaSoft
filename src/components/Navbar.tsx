import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { ArrowRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onContactClick: () => void;
  onServiceClick: (service: string) => void;
  onProjectsClick: () => void;
  onHomeClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onContactClick,
  onServiceClick,
  onProjectsClick,
  onHomeClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', id: 'Home', path: '/' },
    { label: 'About Us', id: 'About', path: '/about' },
    { label: 'Products', id: 'Products', path: '/products' },
    { label: 'Services', id: 'Services', path: '/services' },
    { label: 'Portfolio', id: 'Portfolio', path: '/portfolio' },
    { label: 'Contact', id: 'Contact', path: '#contact' },
  ];

  const isItemActive = (id: string, path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path === '/about' && location.pathname === '/about') return true;
    if (path === '/portfolio' && location.pathname === '/portfolio') return true;
    if (path === '/products' && location.pathname === '/products') return true;
    if (path === '/services' && location.pathname === '/services') return true;
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
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        onContactClick();
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative z-50 w-full h-[76px] px-3 sm:px-6 lg:px-8 bg-transparent outline-none border-none transition-all duration-300">
      <div className="w-full flex items-center justify-between h-full relative">
        {/* Left Logo */}
        <button
          onClick={onHomeClick}
          className="text-left focus:outline-none rounded-lg p-1 transition-opacity hover:opacity-90 cursor-pointer flex items-center shrink-0"
        >
          <Logo />
        </button>

        {/* Desktop Floating Pill-Shaped Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 absolute left-1/2 -translate-x-1/2 px-3 py-2 rounded-full bg-white/90 backdrop-blur-xl border border-slate-200/60 shadow-[0_10px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_14px_45px_rgba(0,0,0,0.12)]">
          {navItems.map((item) => {
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

        {/* Right Action Button */}
        <div className="hidden md:flex items-center shrink-0">
          <button
            onClick={onContactClick}
            className="group h-12 px-[28px] rounded-[16px] bg-gradient-to-r from-[#FF6B00] to-[#FA6400] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-xl hover:shadow-[#FF6B00]/35 active:translate-y-0 cursor-pointer"
          >
            <span>Let's Talk</span>
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="w-3.5 h-3.5 text-white stroke-[3]" />
            </div>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#0D152A] hover:text-[#FF6B00] rounded-xl focus:outline-none cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl flex flex-col gap-3 z-40 animate-in fade-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => {
            const active = isItemActive(item.id, item.path);
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left font-semibold text-lg py-2 transition-colors ${
                  active ? 'text-[#FF6B00]' : 'text-[#0D152A] hover:text-[#FF6B00]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
