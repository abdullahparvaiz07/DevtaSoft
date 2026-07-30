import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { TealDoodleUnderline } from './components/TealDoodleUnderline';
import { StatsBar } from './components/StatsBar';
import { ContactModal } from './components/ContactModal';
import { ProjectsModal } from './components/ProjectsModal';
import { ServicesModal } from './components/ServicesModal';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutPage } from './components/AboutPage';
import { PortfolioPage } from './components/PortfolioPage';
import { ProductsPage } from './components/ProductsPage';
import { ServicesPage } from './components/ServicesPage';
import { PortfolioSection } from './components/PortfolioSection';
import { ProductsSection } from './components/ProductsSection';
import { ContactSection } from './components/ContactSection';
import { IntersectingStrips } from './components/IntersectingStrips';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.35,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

function HomePage({
  onContactClick,
  onProjectsClick,
}: {
  onContactClick: () => void;
  onProjectsClick: (projectId?: string) => void;
}) {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Content Main Container */}
      <main className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 lg:pt-[60px] pb-12 lg:pb-[80px] mt-6 lg:mt-[48px] flex-1 flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-[48px] w-full">
          {/* Left Column: Text & CTAs with Staggered Entrance */}
          <motion.div
            className="lg:w-[48%] w-full max-w-[650px] flex flex-col"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Main Hero Headline */}
            <motion.h1
              className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[58px] xl:text-[66px] leading-[1.08] tracking-tight text-[#0D152A] select-none lg:pl-6 pl-0"
              variants={itemVariants}
            >
              Best developers <br />
              software house <br />
              that{' '}
              <span className="relative inline-block text-[#FF6B00]">
                you'll meet.
                <TealDoodleUnderline />
              </span>
            </motion.h1>

            {/* Hero Subtitle */}
            <motion.p
              className="mt-6 sm:mt-8 text-base sm:text-lg text-[#475569] max-w-[560px] leading-relaxed font-normal"
              variants={itemVariants}
            >
              We build powerful, scalable and modern digital solutions that help brands grow, innovate and lead the future.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-6 flex items-center gap-4 sm:gap-6 flex-wrap"
              variants={itemVariants}
            >
              {/* Primary CTA: Contact Us */}
              <button
                onClick={onContactClick}
                className="group bg-gradient-to-r from-[#FF6B00] to-[#FA6400] text-white font-semibold text-base sm:text-lg px-7 py-3.5 rounded-2xl shadow-lg shadow-[#FF6B00]/25 flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#FF6B00]/35 active:scale-[0.98] cursor-pointer"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>

              {/* Secondary CTA: Explore Work */}
              <button
                onClick={() => onProjectsClick()}
                className="group bg-transparent hover:bg-[#00C2CC]/10 text-[#0D152A] hover:text-[#009099] font-semibold text-base sm:text-lg px-7 py-3.5 rounded-2xl border-2 border-[#00C2CC]/60 hover:border-[#00C2CC] flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
              >
                <span>Explore Work</span>
                <ArrowRight className="w-5 h-5 text-[#0D152A] group-hover:text-[#009099] transition-all duration-300 group-hover:translate-x-1.5" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Image (Prominent & Scaled with Interactive Glow & Entrance) */}
          <motion.div
            className="lg:w-[52%] w-full flex justify-center lg:justify-end"
            initial="hidden"
            animate="visible"
            variants={imageVariants}
          >
            <div className="relative group w-full max-w-xl lg:max-w-none flex justify-center lg:justify-end transition-transform duration-300">
              {/* Soft ambient background glow */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-[#00C2CC]/30 via-[#FF6B00]/25 to-[#00C2CC]/35 blur-3xl opacity-50 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500 pointer-events-none" />

              <img
                src="/heroimage.png"
                alt="DevtaSoft Digital Agency & Software Solutions"
                className="relative z-10 w-full h-auto max-h-[480px] sm:max-h-[580px] lg:max-h-[700px] xl:max-h-[780px] object-contain filter drop-shadow-2xl lg:scale-[1.12] scale-100 lg:origin-right origin-center transition-transform duration-300 group-hover:scale-[1.03] lg:group-hover:scale-[1.16]"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </main>

      {/* Intersecting Marquee Brand Strips (#FF6B00 and #14B8B0) */}
      <IntersectingStrips />

      {/* Completely styled responsive About Us Section */}
      <AboutSection onReadMoreClick={() => navigate('/about')} />

      {/* World-class Services Section */}
      <ServicesSection onContactClick={onContactClick} />

      {/* Beautifully styled filterable Portfolio Section */}
      <PortfolioSection 
        onStartProjectClick={onContactClick} 
      />

      {/* Beautifully styled filterable Products Section */}
      <ProductsSection 
        onExploreAllClick={onContactClick} 
      />

      {/* Beautifully styled custom Contact Us Section */}
      <ContactSection />

      {/* Bottom Statistics Bar */}
      <div className="relative z-10 w-full pb-8 sm:pb-12">
        <StatsBar
          onStatClick={(label) => {
            if (label === 'Projects Completed') {
              onProjectsClick();
            } else {
              onContactClick();
            }
          }}
        />
      </div>
    </>
  );
}

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#F5F6FA] text-[#0D152A] font-sans overflow-x-hidden flex flex-col justify-between selection:bg-[#FF6B00]/20 selection:text-[#FF6B00]">
      {/* Preloader overlay with Uiverse Dual-Block Spinner */}
      <Preloader />

      {/* Main Header / Navigation */}
      <Navbar
        onContactClick={() => {
          const contactElem = document.getElementById('contact');
          if (contactElem) {
            contactElem.scrollIntoView({ behavior: 'smooth' });
          } else {
            setIsContactOpen(true);
          }
        }}
        onServiceClick={(service) => {
          if (service === 'About') {
            navigate('/about');
          } else if (service === 'Products') {
            const productsElem = document.getElementById('products');
            if (productsElem) {
              productsElem.scrollIntoView({ behavior: 'smooth' });
            }
          } else {
            setSelectedService(service);
          }
        }}
        onProjectsClick={() => {
          const portfolioElem = document.getElementById('portfolio');
          if (portfolioElem) {
            portfolioElem.scrollIntoView({ behavior: 'smooth' });
          } else {
            setIsProjectsOpen(true);
          }
        }}
        onHomeClick={() => {
          setIsContactOpen(false);
          setIsProjectsOpen(false);
          setSelectedService(null);
          navigate('/');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onContactClick={() => setIsContactOpen(true)}
              onProjectsClick={() => setIsProjectsOpen(true)}
            />
          }
        />
        <Route
          path="/about"
          element={
            <AboutPage onContactClick={() => setIsContactOpen(true)} />
          }
        />
        <Route
          path="/portfolio"
          element={
            <PortfolioPage onContactClick={() => setIsContactOpen(true)} />
          }
        />
        <Route
          path="/products"
          element={
            <ProductsPage onContactClick={() => setIsContactOpen(true)} />
          }
        />
        <Route
          path="/services"
          element={
            <ServicesPage onContactClick={() => setIsContactOpen(true)} />
          }
        />
      </Routes>

      {/* Deep Footer Section */}
      <Footer 
        onLinkClick={(sectionId) => {
          if (sectionId === 'about') {
            navigate('/about');
          } else if (sectionId === 'portfolio') {
            navigate('/portfolio');
          } else if (sectionId === 'products') {
            navigate('/products');
          } else if (sectionId === 'services') {
            navigate('/services');
          } else {
            if (window.location.pathname !== '/') {
              navigate('/');
              setTimeout(() => {
                const elem = document.getElementById(sectionId);
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            } else {
              const elem = document.getElementById(sectionId);
              if (elem) {
                elem.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }
        }}
        onContactClick={() => setIsContactOpen(true)}
        onProjectsClick={() => setIsProjectsOpen(true)}
      />

      {/* Interactive Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <ProjectsModal
        isOpen={isProjectsOpen}
        onClose={() => setIsProjectsOpen(false)}
        onContactClick={() => setIsContactOpen(true)}
      />

      <ServicesModal
        selectedService={selectedService}
        onClose={() => setSelectedService(null)}
        onContactClick={() => setIsContactOpen(true)}
      />
    </div>
  );
}
