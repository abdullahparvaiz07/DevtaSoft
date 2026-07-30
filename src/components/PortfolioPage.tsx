import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Layout,
  Smartphone,
  Bot,
  ShoppingBag,
  Heart,
  Cloud,
  X,
  CheckCircle2,
  Clock,
  BarChart3,
  Rocket,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { DotGrid } from './DotGrid';

interface ProjectCardData {
  id: string;
  title: string;
  categoryLabel: string;
  category: 'Web Development' | 'WordPress Development' | 'Shopify Store Development' | 'Custom Software Development';
  description: string;
  techStackTags: string[];
  accentColor: string;
  badgeBg: string;
  badgeTextColor: string;
  mockupType: 'sarastore' | 'boxwala' | 'hafiztalha' | 'trendfits' | 'nexcojapan' | 'coursepro' | 'shortconverter' | 'possw' | 'lfm' | 'coffeesp' | 'lga' | 'evf' | 'of' | 'mirrorm' | 'hm';
}

const portfolioProjects: ProjectCardData[] = [
  {
    id: 'sarastore-pk',
    title: 'sarastore.pk',
    categoryLabel: 'WORDPRESS DEVELOPMENT',
    category: 'WordPress Development',
    description: 'High-performance e-commerce storefront for SaraStore.',
    techStackTags: ['WordPress', 'WooCommerce', 'PHP'],
    accentColor: '#FF8706',
    badgeBg: 'bg-orange-50',
    badgeTextColor: 'text-[#FF8706]',
    mockupType: 'sarastore',
  },
  {
    id: 'boxwala-pk',
    title: 'boxwala.pk',
    categoryLabel: 'WORDPRESS DEVELOPMENT',
    category: 'WordPress Development',
    description: 'Custom packaging e-commerce platform for Boxwala.',
    techStackTags: ['WordPress', 'WooCommerce', 'Elementor'],
    accentColor: '#FF8706',
    badgeBg: 'bg-orange-50',
    badgeTextColor: 'text-[#FF8706]',
    mockupType: 'boxwala',
  },
  {
    id: 'hafiztalha-com',
    title: 'hafiztalha.com',
    categoryLabel: 'WORDPRESS DEVELOPMENT',
    category: 'WordPress Development',
    description: 'Personal portfolio and executive web platform for Hafiz Talha.',
    techStackTags: ['WordPress', 'PHP', 'Custom Theme'],
    accentColor: '#FF8706',
    badgeBg: 'bg-orange-50',
    badgeTextColor: 'text-[#FF8706]',
    mockupType: 'hafiztalha',
  },
  {
    id: 'trendfits-net',
    title: 'trendfits.net',
    categoryLabel: 'WORDPRESS DEVELOPMENT',
    category: 'WordPress Development',
    description: 'Fashion e-commerce apparel storefront for TrendFits.',
    techStackTags: ['WordPress', 'WooCommerce', 'CSS3'],
    accentColor: '#FF8706',
    badgeBg: 'bg-orange-50',
    badgeTextColor: 'text-[#FF8706]',
    mockupType: 'trendfits',
  },
  {
    id: 'shortconverter-com',
    title: 'shortconverter.com',
    categoryLabel: 'WEB DEVELOPMENT',
    category: 'Web Development',
    description: 'Online media converter and video processing utility platform.',
    techStackTags: ['React', 'Next.js', 'FFmpeg'],
    accentColor: '#FF8706',
    badgeBg: 'bg-orange-50',
    badgeTextColor: 'text-[#FF8706]',
    mockupType: 'shortconverter',
  },
  {
    id: 'nexcojapan-com',
    title: 'nexcojapan.com',
    categoryLabel: 'WEB DEVELOPMENT',
    category: 'Web Development',
    description: 'Japanese vehicle export and automotive trading platform for Nexco Japan.',
    techStackTags: ['React', 'Node.js', 'PostgreSQL'],
    accentColor: '#FF8706',
    badgeBg: 'bg-orange-50',
    badgeTextColor: 'text-[#FF8706]',
    mockupType: 'nexcojapan',
  },
  {
    id: 'coursepro-today',
    title: 'coursepro.today',
    categoryLabel: 'WEB DEVELOPMENT',
    category: 'Web Development',
    description: 'Online learning and digital course platform for CoursePro.',
    techStackTags: ['React', 'Next.js', 'Tailwind CSS'],
    accentColor: '#FF8706',
    badgeBg: 'bg-orange-50',
    badgeTextColor: 'text-[#FF8706]',
    mockupType: 'coursepro',
  },
  {
    id: 'lookingglassacademy-net',
    title: 'lookingglassacademy.net',
    categoryLabel: 'WEB DEVELOPMENT',
    category: 'Web Development',
    description: 'Educational academy portal and online learning platform.',
    techStackTags: ['React', 'Next.js', 'Tailwind CSS'],
    accentColor: '#FF8706',
    badgeBg: 'bg-orange-50',
    badgeTextColor: 'text-[#FF8706]',
    mockupType: 'lga',
  },
  {
    id: 'pos-software',
    title: 'POS Software',
    categoryLabel: 'CUSTOM SOFTWARE',
    category: 'Custom Software Development',
    description: 'All-in-one retail point of sale and inventory management software.',
    techStackTags: ['React', 'Electron', 'Node.js'],
    accentColor: '#FF8706',
    badgeBg: 'bg-orange-50',
    badgeTextColor: 'text-[#FF8706]',
    mockupType: 'possw',
  },
  {
    id: 'logistics-fleet-management',
    title: 'Logistics Fleet Management',
    categoryLabel: 'CUSTOM SOFTWARE',
    category: 'Custom Software Development',
    description: 'Real-time GPS tracking and fleet dispatch management software.',
    techStackTags: ['React', 'Node.js', 'Google Maps API'],
    accentColor: '#FF8706',
    badgeBg: 'bg-orange-50',
    badgeTextColor: 'text-[#FF8706]',
    mockupType: 'lfm',
  },
  {
    id: 'coffee-shop-pos',
    title: 'Coffee Shop POS',
    categoryLabel: 'CUSTOM SOFTWARE',
    category: 'Custom Software Development',
    description: 'Custom order management and point of sale solution for coffee shops.',
    techStackTags: ['React', 'Tailwind CSS', 'Node.js'],
    accentColor: '#FF8706',
    badgeBg: 'bg-orange-50',
    badgeTextColor: 'text-[#FF8706]',
    mockupType: 'coffeesp',
  },
  {
    id: 'essence-vault-fragrances',
    title: 'Essence Vault Fragrances',
    categoryLabel: 'SHOPIFY STORE',
    category: 'Shopify Store Development',
    description: 'Luxury fragrance and perfume e-commerce storefront.',
    techStackTags: ['Shopify', 'Liquid', 'Tailwind CSS'],
    accentColor: '#FF8706',
    badgeBg: 'bg-orange-50',
    badgeTextColor: 'text-[#FF8706]',
    mockupType: 'evf',
  },
  {
    id: 'oakcha-fragrances',
    title: 'OAKCHA Fragrances',
    categoryLabel: 'SHOPIFY STORE',
    category: 'Shopify Store Development',
    description: 'Artisanal fragrance e-commerce store for OAKCHA Perfumes.',
    techStackTags: ['Shopify', 'Liquid', 'Tailwind CSS'],
    accentColor: '#FF8706',
    badgeBg: 'bg-orange-50',
    badgeTextColor: 'text-[#FF8706]',
    mockupType: 'of',
  },
  {
    id: 'mirrormate-com',
    title: 'mirrormate.com',
    categoryLabel: 'SHOPIFY STORE',
    category: 'Shopify Store Development',
    description: 'Custom mirror framing and home decor e-commerce platform.',
    techStackTags: ['Shopify', 'Liquid', 'React'],
    accentColor: '#FF8706',
    badgeBg: 'bg-orange-50',
    badgeTextColor: 'text-[#FF8706]',
    mockupType: 'mirrorm',
  },
  {
    id: 'herman-miller',
    title: 'HermanMiller',
    categoryLabel: 'SHOPIFY STORE',
    category: 'Shopify Store Development',
    description: 'Iconic furniture brand luxury digital store & ergonomic showcase.',
    techStackTags: ['Shopify Plus', 'Liquid', 'Tailwind CSS'],
    accentColor: '#FF8706',
    badgeBg: 'bg-orange-50',
    badgeTextColor: 'text-[#FF8706]',
    mockupType: 'hm',
  },
];

const categories = [
  'All Projects',
  'WordPress Development',
  'Web Development',
  'Custom Software Development',
  'Shopify Store Development',
];

// ─── Case Study Modal Data ────────────────────────────────────────────────
const caseStudyModalData: Record<string, {
  tagline: string;
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
  techStack: string[];
  features: { title: string; desc: string }[];
}> = {
  'taskflow-pro': {
    tagline: 'Streamlining Team Collaboration & Sprint Workflows',
    challenge: 'Remote teams struggled with scattered task boards, missing deadlines, and unclear project ownership across multiple software suites.',
    solution: 'We engineered TaskFlow Pro — a unified project management workspace with real-time kanban boards, automated sprint reports, and role-based permissions.',
    results: [
      { value: '40%', label: 'Efficiency Boost' },
      { value: '25K+', label: 'Active Teams' },
      { value: '99.9%', label: 'Uptime SLA' },
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Socket.io', 'TailwindCSS'],
    features: [
      { title: 'Interactive Kanban', desc: 'Drag-and-drop boards with custom column statuses and quick task filters.' },
      { title: 'Automated Sprint Reports', desc: 'Generate velocity charts and burndown graphs in one click.' },
      { title: 'Real-time Chat & Comments', desc: 'Contextual task discussions with file attachments and @mentions.' },
      { title: 'Time Tracking Integration', desc: 'Log billable hours directly against tasks with exportable timesheets.' },
    ],
  },
  'boxwala-pk': {
    tagline: 'Custom Packaging E-Commerce Storefront for Boxwala',
    challenge: 'Boxwala needed a modern, responsive e-commerce web platform to showcase custom packaging solutions, facilitate bulk ordering, and deliver a smooth buying experience.',
    solution: 'We built a tailored, high-performance e-commerce website featuring dynamic product customizers, bulk pricing calculators, and streamlined checkout.',
    results: [
      { value: '4.2x', label: 'Order Growth' },
      { value: '< 850ms', label: 'Page Load Speed' },
      { value: '99.9%', label: 'Uptime SLA' },
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Stripe'],
    features: [
      { title: 'Custom Packaging Catalog', desc: 'Interactive box dimension and material selector.' },
      { title: 'Bulk Quote Calculator', desc: 'Instant price calculations based on order volume.' },
      { title: 'Streamlined Checkout', desc: 'Seamless payment options with order tracking.' },
      { title: 'Responsive Storefront', desc: 'Optimized layout across desktop, tablet, and mobile devices.' },
    ],
  },
  'hafiztalha-com': {
    tagline: 'Personal Portfolio & Executive Consulting Platform',
    challenge: 'Hafiz Talha needed a sleek, high-converting digital platform to showcase consulting services, portfolio projects, and client testimonials with interactive motion design.',
    solution: 'We crafted a bespoke, ultra-responsive web application featuring smooth animations, structured case studies, and an integrated booking funnel.',
    results: [
      { value: '5x', label: 'Inquiry Rate' },
      { value: '< 750ms', label: 'Page Load Speed' },
      { value: '100%', label: 'Mobile Responsive' },
    ],
    techStack: ['React', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    features: [
      { title: 'Interactive Portfolio Showcase', desc: 'Filterable work showcase with dynamic case study modals.' },
      { title: 'Executive Consultation Booking', desc: 'Seamless meeting scheduler integration for client calls.' },
      { title: 'Performance Optimization', desc: 'Sub-second page speeds with zero layout shifts.' },
      { title: 'Custom Fluid Animations', desc: 'Engaging micro-interactions and scroll-triggered transitions.' },
    ],
  },
  'trendfits-net': {
    tagline: 'High-Converting Fashion E-Commerce Storefront',
    challenge: 'TrendFits needed an attractive, fast-loading apparel storefront to showcase seasonal clothing collections and optimize mobile sales conversions.',
    solution: 'We built a modern e-commerce web platform with instant product filtering, high-resolution imagery, and a frictionless checkout flow.',
    results: [
      { value: '3.8x', label: 'Sales Growth' },
      { value: '< 800ms', label: 'Page Load Speed' },
      { value: '99.9%', label: 'Uptime SLA' },
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Shopify Storefront API', 'Stripe'],
    features: [
      { title: 'Responsive Fashion Catalog', desc: 'Grid layout optimized for mobile, tablet, and desktop screens.' },
      { title: 'Instant Product Search', desc: 'Fast filtering by category, size, color, and price.' },
      { title: 'Streamlined Checkout Flow', desc: 'Seamless cart and payment gateway integrations.' },
      { title: 'High-Resolution Media', desc: 'Optimized image loading for fast catalog browsing.' },
    ],
  },
  'nexcojapan-com': {
    tagline: 'Japanese Automotive Export & Vehicle Trading Platform',
    challenge: 'Nexco Japan required a global web platform to display Japanese vehicle inventories, facilitate international bidding, and manage export shipping logistics.',
    solution: 'We built a high-performance vehicle catalog with multi-currency conversion, search filtering by make/model, and an integrated inquiry pipeline.',
    results: [
      { value: '4.5x', label: 'Global Leads' },
      { value: '< 850ms', label: 'Page Load Speed' },
      { value: '99.9%', label: 'Uptime SLA' },
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    features: [
      { title: 'Japanese Vehicle Inventory', desc: 'Real-time catalog with specifications, inspection grades, and photo galleries.' },
      { title: 'Multi-Currency Calculator', desc: 'Instant conversion for global buyers across USD, JPY, and EUR.' },
      { title: 'Responsive Global UX', desc: 'Fast, mobile-optimized experience for international clients.' },
    ],
  },
  'coursepro-today': {
    tagline: 'Modern Online Learning & Digital Course Platform',
    challenge: 'CoursePro needed an interactive, high-speed educational platform to host digital courses, track student progress, and streamline enrollment.',
    solution: 'We built a high-performance e-learning platform with fast video playback, structured course modules, and seamless instant enrollment.',
    results: [
      { value: '50K+', label: 'Active Students' },
      { value: '< 750ms', label: 'Page Load Speed' },
      { value: '99.9%', label: 'Uptime SLA' },
    ],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
    features: [
      { title: 'Interactive Course Catalog', desc: 'Browse courses with video previews, instructor bios, and curriculum outlines.' },
      { title: 'Instant Enrollment & Checkout', desc: 'Frictionless course registration and instant access delivery.' },
      { title: 'Student Progress Dashboard', desc: 'Track completed lessons, quizzes, and certificate achievements.' },
      { title: 'Responsive Learning UX', desc: 'Optimized video learning experience on desktop, tablet, and mobile.' },
    ],
  },
  'shortconverter-com': {
    tagline: 'High-Speed Online Media & Video Conversion Utility',
    challenge: 'ShortConverter needed a fast, browser-based media conversion web tool capable of processing audio/video formats rapidly without server bottlenecks.',
    solution: 'We engineered a WebAssembly-powered online converter with instant file processing, format customization, and cloud storage integrations.',
    results: [
      { value: '100K+', label: 'Conversions Daily' },
      { value: '< 500ms', label: 'Processing Speed' },
      { value: '99.9%', label: 'Uptime SLA' },
    ],
    techStack: ['React', 'Next.js', 'FFmpeg', 'Tailwind CSS', 'WebAssembly'],
    features: [
      { title: 'Multi-Format Conversion', desc: 'Convert MP4, MP3, WAV, AVI, and WebM files instantly.' },
      { title: 'Browser WebAssembly Core', desc: 'Client-side processing for high speed and data privacy.' },
      { title: 'Batch Processing', desc: 'Convert multiple media files simultaneously with custom presets.' },
      { title: 'Responsive Utility UI', desc: 'Clean, distraction-free interface built for desktop and mobile.' },
    ],
  },
  'pos-software': {
    tagline: 'All-In-One Retail Point of Sale & Inventory Solution',
    challenge: 'A growing retail business required a reliable POS application to handle offline billing, sync multi-store inventories, and produce real-time sales reporting.',
    solution: 'We engineered a cross-platform POS application with offline-first local storage, fast barcode scanning, and cloud sync capabilities.',
    results: [
      { value: '3x', label: 'Faster Checkout' },
      { value: '100%', label: 'Offline Availability' },
      { value: '99.9%', label: 'Inventory Accuracy' },
    ],
    techStack: ['React', 'Electron', 'Node.js', 'SQLite', 'Tailwind CSS'],
    features: [
      { title: 'Offline-First Billing', desc: 'Continuous barcode scanning and receipt printing during network outages.' },
      { title: 'Multi-Store Inventory Sync', desc: 'Real-time stock level tracking across warehouse and retail branches.' },
      { title: 'Analytics & Sales Reports', desc: 'Instant breakdown of daily revenue, top-selling items, and profit margins.' },
      { title: 'Receipt & Thermal Printing', desc: 'Native hardware integration with receipt printers and cash drawers.' },
    ],
  },
  'logistics-fleet-management': {
    tagline: 'Real-Time Telematics & Logistics Fleet Management',
    challenge: 'A transport operator struggled with unoptimized delivery routes, high fuel consumption, and lack of real-time visibility across their nationwide vehicle fleet.',
    solution: 'We engineered an enterprise fleet management dashboard with live GPS tracking, automated route optimization, and driver performance telemetry.',
    results: [
      { value: '35%', label: 'Fuel Cost Savings' },
      { value: '99.8%', label: 'On-Time Deliveries' },
      { value: '24/7', label: 'Fleet Telematics' },
    ],
    techStack: ['React', 'Node.js', 'Google Maps API', 'WebSockets', 'Tailwind CSS'],
    features: [
      { title: 'Live GPS Vehicle Tracking', desc: 'Real-time map visualization with speed, route history, and geofencing alerts.' },
      { title: 'Automated Route Optimization', desc: 'AI algorithm calculating fastest routes to minimize mileage and fuel spend.' },
      { title: 'Driver Behavior & Telemetry', desc: 'Monitor harsh braking, idling times, and scheduled vehicle maintenance.' },
      { title: 'Dispatch & Order Management', desc: 'Seamless cargo assignment and instant digital proof-of-delivery receipts.' },
    ],
  },
  'coffee-shop-pos': {
    tagline: 'Streamlined Coffee Shop Billing & Quick Order Terminal',
    challenge: 'A busy coffee shop required a touch-friendly POS terminal to speed up order queues, manage drink customizations, and print kitchen orders instantaneously.',
    solution: 'We developed a clean, touch-optimized POS web app with quick item modifiers, table tracking, and instant order routing to barista stations.',
    results: [
      { value: '2.5x', label: 'Faster Order Speed' },
      { value: '100%', label: 'Order Accuracy' },
      { value: '< 600ms', label: 'Terminal Latency' },
    ],
    techStack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'SQLite'],
    features: [
      { title: 'Touch-Optimized Menu Layout', desc: 'Category tabs with quick visual item cards for rapid order taking.' },
      { title: 'Drink Customization Modifiers', desc: 'Easily select milk options, espresso shots, syrup flavors, and temperatures.' },
      { title: 'Kitchen & Barista Printing', desc: 'Automatic order dispatching to bar tickets and kitchen printers.' },
      { title: 'Daily Sales & Cash Register Audit', desc: 'Real-time shift summary reports with cash drawer tracking.' },
    ],
  },
  'lookingglassacademy-net': {
    tagline: 'Modern Educational Academy & E-Learning Portal',
    challenge: 'Looking Glass Academy required an interactive educational portal for course enrollments, student resources, and virtual classroom schedules.',
    solution: 'We built a high-performance web platform featuring automated course registration, student dashboards, and structured learning modules.',
    results: [
      { value: '4.2x', label: 'Enrollment Growth' },
      { value: '< 750ms', label: 'Page Load Speed' },
      { value: '99.9%', label: 'Uptime SLA' },
    ],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
    features: [
      { title: 'Interactive Course Catalog', desc: 'Browse academy programs, syllabus details, and instructor profiles.' },
      { title: 'Student Portal & Dashboards', desc: 'Secure student portal for assignments, grades, and schedule tracking.' },
      { title: 'Online Admission & Payment', desc: 'Streamlined registration form with instant credit card processing.' },
      { title: 'Responsive Academic Platform', desc: 'Mobile-friendly experience for students on smartphones, tablets, and laptops.' },
    ],
  },
  'essence-vault-fragrances': {
    tagline: 'Luxury Perfume & Fragrance E-Commerce Storefront',
    challenge: 'Essence Vault required an elegant, high-converting online storefront to present premium fragrance collections, scent profiles, and gift bundles.',
    solution: 'We built a bespoke luxury e-commerce experience with interactive fragrance notes exploration, instant cart slide-outs, and quick checkout.',
    results: [
      { value: '3.6x', label: 'Order Volume Growth' },
      { value: '< 800ms', label: 'Page Load Speed' },
      { value: '99.9%', label: 'Uptime SLA' },
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Shopify Storefront API', 'Stripe'],
    features: [
      { title: 'Interactive Scent Profiles', desc: 'Visual fragrance notes breakdown (top, heart, and base notes).' },
      { title: 'Custom Gift Bundle Builder', desc: 'Mix-and-match perfume sets with automatic multi-buy discount logic.' },
      { title: 'Instant Mobile Shopping', desc: 'Frictionless slide-out mini-cart and 1-click checkout integration.' },
      { title: 'Optimized Media Galleries', desc: 'High-definition product imagery rendered with sub-second lazy loading.' },
    ],
  },
  'oakcha-fragrances': {
    tagline: 'Artisanal Perfumes & Custom Fragrance Storefront',
    challenge: 'OAKCHA required a modern e-commerce platform to highlight handcrafted fragrance dupes, note breakdowns, and viral perfume discovery.',
    solution: 'We engineered an immersive shopping experience with scent quiz finders, instant cart drawer, and high-conversion mobile UX.',
    results: [
      { value: '4.8x', label: 'Revenue Growth' },
      { value: '< 750ms', label: 'Page Load Speed' },
      { value: '99.9%', label: 'Uptime SLA' },
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Shopify Storefront API', 'Stripe'],
    features: [
      { title: 'Interactive Fragrance Finder Quiz', desc: 'Personalized scent recommendation quiz driving high sales conversions.' },
      { title: 'Detailed Scent Pyramid', desc: 'Visual top, heart, and base note breakdowns for every fragrance.' },
      { title: 'Seamless Cart & Upsells', desc: 'Fast slide-out cart with sample bundle add-ons.' },
      { title: 'Sub-Second Page Performance', desc: 'Optimized Next.js storefront for fast mobile browsing.' },
    ],
  },
  'mirrormate-com': {
    tagline: 'Custom Frame Visualizer & Home Decor E-Commerce',
    challenge: 'MirrorMate needed an interactive online frame customizer allowing users to preview mirror frames on their walls before placing custom orders.',
    solution: 'We engineered a real-time 3D canvas frame visualizer with instant price calculation and automated order fulfillment integrations.',
    results: [
      { value: '3.4x', label: 'Conversion Lift' },
      { value: '< 800ms', label: 'Page Load Speed' },
      { value: '99.9%', label: 'Uptime SLA' },
    ],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Shopify API', 'Vercel'],
    features: [
      { title: 'Interactive Frame Visualizer', desc: 'Real-time preview of custom mirror frames with dynamic dimension inputs.' },
      { title: 'Instant Price Calculator', desc: 'Automated price calculation based on custom length, width, and frame style.' },
      { title: 'Room Photo Preview', desc: 'Upload wall photos to preview custom frames in virtual home environments.' },
      { title: 'Seamless Mobile Shopping', desc: 'Touch-optimized frame selection experience across all mobile devices.' },
    ],
  },
  'herman-miller': {
    tagline: 'Iconic Luxury Furniture Storefront & Ergonomic Catalog',
    challenge: 'Herman Miller required a world-class digital storefront showcasing legendary office chairs, modern home furniture, and architectural collections.',
    solution: 'We developed a high-end web platform featuring interactive 3D chair configurators, ergonomic seating guides, and enterprise B2B purchasing portals.',
    results: [
      { value: '5.2x', label: 'Digital Sales Surge' },
      { value: '< 650ms', label: 'Page Load Speed' },
      { value: '99.9%', label: 'Uptime SLA' },
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Shopify Plus', 'WebGL', 'Vercel'],
    features: [
      { title: 'Interactive Ergonomic Configurator', desc: 'Real-time chair customization with fabric, armrest, and finish options.' },
      { title: 'B2B Enterprise Portal', desc: 'Custom corporate bulk ordering with automated invoice and quote generation.' },
      { title: 'Seamless Mobile Commerce', desc: 'Sub-second mobile loading speed for premium desktop and mobile shoppers.' },
      { title: 'Architectural Project Gallery', desc: 'Inspirational interior design lookbooks with shoppable hot-spots.' },
    ],
  },
};

// ─── Component: Simulated Visual Mockups ─────────────────────────────────
const MockupPreview: React.FC<{ type: ProjectCardData['mockupType'] }> = ({ type }) => {
  if (type === 'sarastore') {
    return (
      <div className="w-full h-full bg-[#F8FAFC] p-2.5 sm:p-3 select-none relative overflow-hidden group flex items-center justify-center">
        <img
          src="/sspc.png"
          alt="sarastore.pk Storefront"
          className="w-full h-full object-contain object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] drop-shadow-sm rounded-lg"
        />
      </div>
    );
  }

  if (type === 'boxwala') {
    return (
      <div className="w-full h-full bg-[#F8FAFC] p-2.5 sm:p-3 select-none relative overflow-hidden group flex items-center justify-center">
        <img
          src="/boxwala.png"
          alt="boxwala.pk Storefront"
          className="w-full h-full object-contain object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] drop-shadow-sm rounded-lg"
        />
      </div>
    );
  }

  if (type === 'hafiztalha') {
    return (
      <div className="w-full h-full bg-[#F8FAFC] p-2.5 sm:p-3 select-none relative overflow-hidden group flex items-center justify-center">
        <img
          src="/hafiztalha.png"
          alt="hafiztalha.com Storefront"
          className="w-full h-full object-contain object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] drop-shadow-sm rounded-lg"
        />
      </div>
    );
  }

  if (type === 'trendfits') {
    return (
      <div className="w-full h-full bg-[#F8FAFC] p-2.5 sm:p-3 select-none relative overflow-hidden group flex items-center justify-center">
        <img
          src="/trendfits.png"
          alt="trendfits.net Storefront"
          className="w-full h-full object-contain object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] drop-shadow-sm rounded-lg"
        />
      </div>
    );
  }

  if (type === 'nexcojapan') {
    return (
      <div className="w-full h-full bg-[#F8FAFC] p-2.5 sm:p-3 select-none relative overflow-hidden group flex items-center justify-center">
        <img
          src="/nexcoj.png"
          alt="nexcojapan.com Storefront"
          className="w-full h-full object-contain object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] drop-shadow-sm rounded-lg"
        />
      </div>
    );
  }

  if (type === 'coursepro') {
    return (
      <div className="w-full h-full bg-[#F8FAFC] p-2.5 sm:p-3 select-none relative overflow-hidden group flex items-center justify-center">
        <img
          src="/coursepro.png"
          alt="coursepro.today Storefront"
          className="w-full h-full object-contain object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] drop-shadow-sm rounded-lg"
        />
      </div>
    );
  }

  if (type === 'shortconverter') {
    return (
      <div className="w-full h-full bg-[#F8FAFC] p-2.5 sm:p-3 select-none relative overflow-hidden group flex items-center justify-center">
        <img
          src="/shortc.png"
          alt="shortconverter.com Storefront"
          className="w-full h-full object-contain object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] drop-shadow-sm rounded-lg"
        />
      </div>
    );
  }

  if (type === 'possw') {
    return (
      <div className="w-full h-full bg-[#F8FAFC] p-2.5 sm:p-3 select-none relative overflow-hidden group flex items-center justify-center">
        <img
          src="/possw.png"
          alt="POS Software Interface"
          className="w-full h-full object-contain object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] drop-shadow-sm rounded-lg"
        />
      </div>
    );
  }

  if (type === 'lfm') {
    return (
      <div className="w-full h-full bg-[#F8FAFC] p-2.5 sm:p-3 select-none relative overflow-hidden group flex items-center justify-center">
        <img
          src="/lfm.png"
          alt="Logistics Fleet Management Interface"
          className="w-full h-full object-contain object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] drop-shadow-sm rounded-lg"
        />
      </div>
    );
  }

  if (type === 'coffeesp') {
    return (
      <div className="w-full h-full bg-[#F8FAFC] p-2.5 sm:p-3 select-none relative overflow-hidden group flex items-center justify-center">
        <img
          src="/coffeesp.png"
          alt="Coffee Shop POS Interface"
          className="w-full h-full object-contain object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] drop-shadow-sm rounded-lg"
        />
      </div>
    );
  }

  if (type === 'lga') {
    return (
      <div className="w-full h-full bg-[#F8FAFC] p-2.5 sm:p-3 select-none relative overflow-hidden group flex items-center justify-center">
        <img
          src="/lga.png"
          alt="lookingglassacademy.net Platform"
          className="w-full h-full object-contain object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] drop-shadow-sm rounded-lg"
        />
      </div>
    );
  }

  if (type === 'evf') {
    return (
      <div className="w-full h-full bg-[#F8FAFC] p-2.5 sm:p-3 select-none relative overflow-hidden group flex items-center justify-center">
        <img
          src="/evf.png"
          alt="Essence Vault Fragrances Storefront"
          className="w-full h-full object-contain object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] drop-shadow-sm rounded-lg"
        />
      </div>
    );
  }

  if (type === 'of') {
    return (
      <div className="w-full h-full bg-[#F8FAFC] p-2.5 sm:p-3 select-none relative overflow-hidden group flex items-center justify-center">
        <img
          src="/of.png"
          alt="OAKCHA Fragrances Storefront"
          className="w-full h-full object-contain object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] drop-shadow-sm rounded-lg"
        />
      </div>
    );
  }

  if (type === 'mirrorm') {
    return (
      <div className="w-full h-full bg-[#F8FAFC] p-2.5 sm:p-3 select-none relative overflow-hidden group flex items-center justify-center">
        <img
          src="/mirrorm.png"
          alt="mirrormate.com Platform"
          className="w-full h-full object-contain object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] drop-shadow-sm rounded-lg"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#F8FAFC] p-2.5 sm:p-3 select-none relative overflow-hidden group flex items-center justify-center">
      <img
        src="/hm.png"
        alt="HermanMiller Storefront"
        className="w-full h-full object-contain object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] drop-shadow-sm rounded-lg"
      />
    </div>
  );
};

// ─── Main PortfolioPage Component ───────────────────────────────────────
export const PortfolioPage: React.FC<{ onContactClick: () => void }> = ({ onContactClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All Projects');
  const [selectedProject, setSelectedProject] = useState<ProjectCardData | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const filteredProjects = portfolioProjects.filter((p) => {
    if (activeCategory === 'All Projects') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen font-sans text-[#0D152A] pt-6 pb-20 overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* ─── SECTION HEADER ────────────────────────────────────────────── */}
        <div className="relative pt-8 pb-14 text-center max-w-4xl mx-auto">
          
          {/* Left Decorative Dot Grid + Blob */}
          <div className="absolute left-[-60px] top-4 pointer-events-none hidden lg:block opacity-75">
            <div className="w-32 h-32 rounded-full bg-[#FFEFE5] absolute -top-4 -left-4 blur-xl opacity-60" />
            <DotGrid rows={4} cols={6} dotColor="#FF8706" />
          </div>

          {/* Right Decorative Dot Grid + Blob */}
          <div className="absolute right-[-60px] top-4 pointer-events-none hidden lg:block opacity-75">
            <div className="w-32 h-32 rounded-full bg-[#E6F8F9] absolute -top-4 -right-4 blur-xl opacity-60" />
            <DotGrid rows={4} cols={6} dotColor="#14B8B0" />
          </div>

          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="text-[#14B8B0] font-extrabold text-xs sm:text-sm uppercase tracking-[0.2em]">
              OUR PORTFOLIO
            </span>
          </motion.div>

          {/* Main Headline matching reference */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl lg:text-[56px] text-[#0D152A] leading-[1.12] tracking-tight mb-6"
          >
            Work we're proud of, <br />
            results that <span className="text-[#FF8706]">speak.</span>
          </motion.h1>

          {/* Short Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#6B7280] font-medium text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Explore a selection of projects we've designed, developed and delivered for clients across different industries.
          </motion.p>
        </div>

        {/* ─── CATEGORY FILTER PILLS ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center flex-wrap gap-3 mb-16"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#FF8706] border border-[#FF8706]/40 shadow-md shadow-[#FF8706]/15 scale-[1.03]'
                    : 'bg-slate-50 border border-slate-200/80 text-slate-600 hover:bg-white hover:border-[#FF8706]/30 hover:text-[#0D152A]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* ─── PROJECTS GRID (2 rows × 3 columns = 6 Horizontal Cards) ──── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => {
              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative bg-white rounded-[28px] border border-slate-100 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] hover:border-slate-200 transition-all duration-400 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer overflow-hidden min-h-[460px]"
                >
                  {/* Top Graphic Mockup Area */}
                  <div className="w-full h-[260px] sm:h-[280px] relative overflow-hidden shrink-0 rounded-t-[28px]">
                    <MockupPreview type={project.mockupType} />
                  </div>

                  {/* Bottom White Content Box */}
                  <div className="p-6 sm:p-7 bg-white flex flex-col justify-between flex-1">
                    <div>
                      {/* Category Eyebrow in Accent Color */}
                      <span
                        className="font-extrabold text-[11px] tracking-[0.14em] uppercase block mb-1.5"
                        style={{ color: project.accentColor }}
                      >
                        {project.categoryLabel}
                      </span>

                      {/* Main Title */}
                      <h3 className="font-display font-extrabold text-2xl text-[#0D152A] mb-1.5 group-hover:text-[#FF8706] transition-colors leading-tight">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[#6B7280] font-medium text-xs sm:text-sm leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    {/* Bottom Row: Tech Stack Pills Left + Circular Arrow Button Right */}
                    <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100/60">
                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap items-center gap-2">
                        {project.techStackTags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-3.5 py-1 rounded-full text-xs font-bold ${project.badgeBg} ${project.badgeTextColor}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Circular Arrow Button in Accent Color */}
                      <div
                        className="w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-xs"
                        style={{
                          borderColor: `${project.accentColor}50`,
                          color: project.accentColor,
                        }}
                      >
                        <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* ─── BOTTOM VALUE STRIP ("Have a project in mind?") ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-white rounded-[28px] border border-[#ECECEC] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 sm:p-10 lg:p-12 overflow-hidden mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: 3D Rocket Illustration */}
            <div className="lg:col-span-3 flex items-center justify-center">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#FF8706]/10 rounded-full blur-2xl animate-pulse" />
                <Rocket className="w-24 h-24 text-[#FF8706] stroke-[1.5] -rotate-45 drop-shadow-xl transition-transform duration-500 hover:scale-110" />
              </div>
            </div>

            {/* Middle Column: Headline Copy */}
            <div className="lg:col-span-5 text-center lg:text-left">
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0D152A] mb-2 leading-tight">
                Have a project in mind?
              </h3>
              <p className="font-display font-extrabold text-xl sm:text-2xl text-[#0D152A]">
                Let's build something <span className="text-[#FF8706]">amazing</span> together.
              </p>
            </div>

            {/* Right Column: Subtext + Button + DevtaSoft Logo Mark */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end gap-5">
              <p className="text-[#6B7280] font-medium text-xs sm:text-sm text-center lg:text-right max-w-xs">
                We're always excited to work on new ideas and turn them into powerful digital solutions.
              </p>

              <div className="flex items-center gap-4">
                <button
                  onClick={onContactClick}
                  className="group inline-flex items-center gap-3 bg-[#FF8706] hover:bg-[#E07200] text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-lg shadow-[#FF8706]/25 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                >
                  <span>Start Your Project</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="w-3.5 h-3.5 text-white stroke-[3]" />
                  </div>
                </button>

                {/* 3D Isometric DevtaSoft Logo Icon */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#14B8B0] via-[#FF8706] to-[#0D152A] p-0.5 shadow-md shrink-0 hidden sm:block">
                  <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                    <span className="font-black text-[#FF8706] text-xl font-display">S</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>

      {/* ─── CASE STUDY DETAIL MODAL ────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && caseStudyModalData[selectedProject.id] && (
          <>
            <motion.div
              className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />

            <motion.div
              className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 lg:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative bg-white rounded-[28px] w-full max-w-[840px] max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100"
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-200 hover:scale-110 z-20 cursor-pointer"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>

                {/* Header */}
                <div className="p-8 sm:p-10 pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#E6F8F9] text-[#14B8B0] border border-[#14B8B0]/30">
                      {selectedProject.category}
                    </span>
                    <span className="text-xs font-bold text-slate-400">DevtaSoft Case Study</span>
                  </div>

                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0D152A] mb-2">
                    {selectedProject.title}
                  </h2>

                  <p className="font-display font-extrabold text-lg text-[#FF8706] mb-4">
                    {caseStudyModalData[selectedProject.id].tagline}
                  </p>
                </div>

                {/* Results Row */}
                <div className="px-8 sm:px-10 py-4">
                  <div className="grid grid-cols-3 gap-4">
                    {caseStudyModalData[selectedProject.id].results.map((r) => (
                      <div key={r.label} className="bg-[#FFEFE5] rounded-2xl p-4 text-center border border-[#FF8706]/20">
                        <span className="font-display font-black text-2xl sm:text-3xl text-[#FF8706] block mb-1">
                          {r.value}
                        </span>
                        <span className="text-[#667085] font-semibold text-xs sm:text-sm">{r.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenge & Solution */}
                <div className="px-8 sm:px-10 py-6 space-y-4">
                  <div>
                    <h3 className="font-display font-extrabold text-base text-[#0D152A] mb-1">The Challenge</h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed">{caseStudyModalData[selectedProject.id].challenge}</p>
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-base text-[#0D152A] mb-1">Our Solution</h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed">{caseStudyModalData[selectedProject.id].solution}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="px-8 sm:px-10 pb-6">
                  <h3 className="font-display font-extrabold text-lg text-[#0D152A] mb-4">Key Capabilities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {caseStudyModalData[selectedProject.id].features.map((f) => (
                      <div key={f.title} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#14B8B0] shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-display font-extrabold text-sm text-[#0D152A] mb-1">{f.title}</h4>
                            <p className="text-[#6B7280] text-xs leading-relaxed">{f.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="px-8 sm:px-10 pb-6">
                  <h3 className="font-display font-extrabold text-sm text-slate-400 uppercase tracking-wider mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudyModalData[selectedProject.id].techStack.map((tech) => (
                      <span key={tech} className="px-3.5 py-1.5 rounded-full font-bold text-xs bg-[#E6F8F9] text-[#14B8B0] border border-[#14B8B0]/30">
                        ✓ {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="px-8 sm:px-10 pb-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-[#6B7280] font-medium text-sm">Want a similar solution for your business?</p>
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      onContactClick();
                    }}
                    className="inline-flex items-center gap-2 bg-[#FF8706] hover:bg-[#E07200] text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md cursor-pointer"
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
