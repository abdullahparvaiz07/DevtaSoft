import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  Box,
  Briefcase,
  Globe,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  UploadCloud,
  X,
  CheckCircle2,
  AlertTriangle,
  Bell,
  ChevronDown,
  Image as ImageIcon,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  Sliders,
  Layers,
  Lock,
  Unlock,
  Menu,
} from 'lucide-react';
import { Logo } from './Logo';
import { dataService, ProductItem, PortfolioItem, VisibilitySettings } from '../services/dataService';

interface AdminDashboardProps {
  onViewWebsite: () => void;
  onLogout: () => void;
}

type TabType = 'dashboard' | 'visibility' | 'products' | 'portfolio';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onViewWebsite, onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Modal States
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(null);

  // Delete Confirmation States
  const [deleteProductConfirmId, setDeleteProductConfirmId] = useState<string | null>(null);
  const [deletePortfolioConfirmId, setDeletePortfolioConfirmId] = useState<string | null>(null);

  // Product Form Data
  const [productName, setProductName] = useState('');
  const [productDomain, setProductDomain] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productLoading, setProductLoading] = useState(false);

  // Portfolio Form Data
  const [portfolioName, setPortfolioName] = useState('');
  const [portfolioDomain, setPortfolioDomain] = useState('');
  const [portfolioDesc, setPortfolioDesc] = useState('');
  const [portfolioImage, setPortfolioImage] = useState('');
  const [portfolioLoading, setPortfolioLoading] = useState(false);

  const productFileInputRef = useRef<HTMLInputElement>(null);
  const portfolioFileInputRef = useRef<HTMLInputElement>(null);

  const [visibilitySettings, setVisibilitySettings] = useState<VisibilitySettings>(dataService.getVisibility());

  // Master Section Lock/Unlock States
  const [isPagesUnlocked, setIsPagesUnlocked] = useState(false);
  const [isSectionsUnlocked, setIsSectionsUnlocked] = useState(false);

  // Load items on mount and subscribe to data service changes
  useEffect(() => {
    const loadData = () => {
      setProducts(dataService.getProducts());
      setPortfolio(dataService.getPortfolio());
      setVisibilitySettings(dataService.getVisibility());
    };

    loadData();
    const unsubscribe = dataService.subscribe(loadData);
    return () => unsubscribe();
  }, []);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Helper URL Normalizer
  const normalizeUrl = (url: string) => {
    let trimmed = url.trim();
    if (!trimmed) return '#';
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      return `https://${trimmed}`;
    }
    return trimmed;
  };

  const getCleanDomain = (url: string) => {
    try {
      const clean = url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');
      return clean;
    } catch {
      return url;
    }
  };

  // Image Upload Handler (Base64 conversion)
  const handleImageUpload = (file: File, callback: (base64: string) => void) => {
    if (!file) return;
    if (!file.type.match(/image\/(png|jpg|jpeg|webp)/i)) {
      showToast('Please upload a valid image (PNG, JPG, JPEG, or WebP).', 'error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size must be under 5MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        callback(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Open Product Modal (Add or Edit)
  const openProductModal = (product?: ProductItem) => {
    if (product) {
      setEditingProductId(product.id);
      setProductName(product.name);
      setProductDomain(product.domain);
      setProductDesc(product.description || '');
      setProductImage(product.image || '');
    } else {
      setEditingProductId(null);
      setProductName('');
      setProductDomain('');
      setProductDesc('');
      setProductImage('');
    }
    setProductModalOpen(true);
  };

  const closeProductModal = () => {
    setProductModalOpen(false);
    setEditingProductId(null);
  };

  // Handle Save Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) {
      showToast('Product name is required.', 'error');
      return;
    }
    if (!productDomain.trim()) {
      showToast('Product domain URL is required.', 'error');
      return;
    }
    if (!productImage) {
      showToast('Product image is required.', 'error');
      return;
    }

    setProductLoading(true);

    setTimeout(() => {
      dataService.saveProduct(
        {
          name: productName.trim(),
          domain: normalizeUrl(productDomain),
          description: productDesc.trim() || undefined,
          image: productImage,
        },
        editingProductId || undefined
      );

      setProductLoading(false);
      closeProductModal();
      showToast(editingProductId ? 'Product updated successfully!' : 'New product added successfully!');
    }, 400);
  };

  // Delete Product
  const handleDeleteProduct = (id: string) => {
    dataService.deleteProduct(id);
    setDeleteProductConfirmId(null);
    showToast('Product deleted successfully.');
  };

  // Open Portfolio Modal (Add or Edit)
  const openPortfolioModal = (project?: PortfolioItem) => {
    if (project) {
      setEditingPortfolioId(project.id);
      setPortfolioName(project.name);
      setPortfolioDomain(project.domain);
      setPortfolioDesc(project.description || '');
      setPortfolioImage(project.image || '');
    } else {
      setEditingPortfolioId(null);
      setPortfolioName('');
      setPortfolioDomain('');
      setPortfolioDesc('');
      setPortfolioImage('');
    }
    setPortfolioModalOpen(true);
  };

  const closePortfolioModal = () => {
    setPortfolioModalOpen(false);
    setEditingPortfolioId(null);
  };

  // Handle Save Portfolio
  const handleSavePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portfolioName.trim()) {
      showToast('Project name is required.', 'error');
      return;
    }
    if (!portfolioDomain.trim()) {
      showToast('Live project URL is required.', 'error');
      return;
    }
    if (!portfolioImage) {
      showToast('Project image mockup is required.', 'error');
      return;
    }

    setPortfolioLoading(true);

    setTimeout(() => {
      dataService.savePortfolio(
        {
          name: portfolioName.trim(),
          domain: normalizeUrl(portfolioDomain),
          description: portfolioDesc.trim() || undefined,
          image: portfolioImage,
        },
        editingPortfolioId || undefined
      );

      setPortfolioLoading(false);
      closePortfolioModal();
      showToast(editingPortfolioId ? 'Project updated successfully!' : 'New portfolio project added successfully!');
    }, 400);
  };

  // Delete Portfolio Project
  const handleDeletePortfolio = (id: string) => {
    dataService.deletePortfolio(id);
    setDeletePortfolioConfirmId(null);
    showToast('Portfolio project deleted successfully.');
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-[#1E2340] font-sans flex overflow-x-hidden selection:bg-[#FF8706]/20 selection:text-[#FF8706]">
      
      {/* Toast Notification Container */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-[200] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-bold animate-in slide-in-from-top-4 duration-300 ${
            toast.type === 'success'
              ? 'bg-[#0D152A] border border-[#00C2CC]/50 text-white'
              : 'bg-red-900 border border-red-500/50 text-white'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-[#00C2CC]" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-400" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* ═══════════════════════════════════════════
      {/* Mobile Sidebar Backdrop Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ═══════════════════════════════════════════
          LEFT SIDEBAR (Dark Indigo #0D152A / #2A285F)
      ═══════════════════════════════════════════ */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-[260px] xl:w-[280px] bg-[#070B19] border-r border-slate-800 flex flex-col justify-between p-6 shrink-0 select-none transition-transform duration-300 ease-in-out ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div>
          {/* Top Brand Logo + Mobile Close Button */}
          <div className="flex items-center justify-between pb-8 border-b border-slate-800/80 mb-8 pt-2">
            <Logo />
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Close Mobile Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MAIN MENU Navigation */}
          <div className="mb-8">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-500 mb-3 px-3">
              MAIN MENU
            </p>
            <nav className="flex flex-col gap-1.5">
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-slate-800/80 text-white shadow-md border-l-4 border-l-[#FF8706]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <LayoutDashboard className={`w-5 h-5 ${activeTab === 'dashboard' ? 'text-[#FF8706]' : 'text-slate-400'}`} />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('visibility');
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                  activeTab === 'visibility'
                    ? 'bg-slate-800/80 text-white shadow-md border-l-4 border-l-[#14B8B0]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <Eye className={`w-5 h-5 ${activeTab === 'visibility' ? 'text-[#14B8B0]' : 'text-slate-400'}`} />
                <span>Site Controls</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('products');
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-slate-800/80 text-white shadow-md border-l-4 border-l-[#FF8706]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <Box className={`w-5 h-5 ${activeTab === 'products' ? 'text-[#FF8706]' : 'text-slate-400'}`} />
                <span>Products</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('portfolio');
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                  activeTab === 'portfolio'
                    ? 'bg-slate-800/80 text-white shadow-md border-l-4 border-l-[#00C2CC]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <Briefcase className={`w-5 h-5 ${activeTab === 'portfolio' ? 'text-[#00C2CC]' : 'text-slate-400'}`} />
                <span>Portfolio</span>
              </button>
            </nav>
          </div>

          {/* OTHER Navigation */}
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-500 mb-3 px-3">
              OTHER
            </p>
            <nav className="flex flex-col gap-1.5">
              <button
                onClick={() => {
                  onViewWebsite();
                  setMobileSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm text-slate-400 hover:text-white hover:bg-slate-800/40 transition-all cursor-pointer"
              >
                <Globe className="w-5 h-5 text-slate-400" />
                <span>View Website</span>
              </button>

              <button
                onClick={() => {
                  onLogout();
                  setMobileSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all cursor-pointer"
              >
                <LogOut className="w-5 h-5 text-red-400" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Sidebar Footer Admin User Badge */}
        <div className="pt-6 border-t border-slate-800/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF8706] to-[#00C2CC] text-white flex items-center justify-center font-extrabold text-xs shadow-md shrink-0">
            DS
          </div>
          <div className="overflow-hidden">
            <p className="text-white font-extrabold text-xs truncate">DevtaSoft Admin</p>
            <p className="text-slate-400 text-[11px] truncate">admin@devtasoft.com</p>
          </div>
        </div>
      </aside>

      {/* ═══════════════════════════════════════════
          MAIN CONTENT AREA
      ═══════════════════════════════════════════ */}
      <div className="flex-1 lg:ml-[260px] xl:ml-[280px] min-h-screen flex flex-col">
        
        {/* Top Sticky Header */}
        <header className="w-full h-20 bg-white border-b border-[#E7EAF0] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer shrink-0"
              aria-label="Toggle Sidebar Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="font-display font-extrabold text-xl sm:text-2xl text-[#1E2340]">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'visibility' && 'Page & Section Controls'}
                {activeTab === 'products' && 'Products'}
                {activeTab === 'portfolio' && 'Portfolio Projects'}
              </h1>
              <p className="text-xs sm:text-sm text-[#667085] font-medium hidden sm:block">
                {activeTab === 'dashboard' && "Welcome back! Here's what's happening."}
                {activeTab === 'visibility' && 'Hide or show pages, navbar items, and landing page sections.'}
                {activeTab === 'products' && 'Manage all products displayed on the DevtaSoft website.'}
                {activeTab === 'portfolio' && 'Manage all portfolio projects displayed on the website.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer relative">
              <Bell className="w-5 h-5" />
              <span className="w-2 h-2 rounded-full bg-[#FF8706] absolute top-2.5 right-2.5" />
            </button>

            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-[#0D152A] text-white flex items-center justify-center font-bold text-xs">
                AD
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-[#1E2340]">Admin User</p>
                <p className="text-[10px] text-slate-400">Authorized</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </header>

        {/* Main Body Content */}
        <main className="p-4 sm:p-8 flex-1 max-w-7xl w-full mx-auto space-y-8">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Summary Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Site Visibility Controls Summary Card */}
                <div
                  onClick={() => setActiveTab('visibility')}
                  className="bg-white border border-[#E7EAF0] rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all cursor-pointer group flex items-center justify-between relative overflow-hidden"
                >
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-[#E6F8F9] text-[#14B8B0] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Eye className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-[#667085]">
                      Site Controls
                    </p>
                    <p className="font-display font-black text-3xl sm:text-4xl text-[#1E2340]">
                      {Object.values(visibilitySettings.pages).filter(Boolean).length + Object.values(visibilitySettings.sections).filter(Boolean).length} <span className="text-sm font-semibold text-slate-400">Active</span>
                    </p>
                    <p className="text-xs font-bold text-[#14B8B0] group-hover:underline flex items-center gap-1 pt-1">
                      <span>Manage page & section visibility</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </p>
                  </div>

                  {/* Decorative Sparkline SVG */}
                  <svg className="w-24 h-14 text-[#14B8B0]/40 stroke-[2.5]" viewBox="0 0 100 40" fill="none">
                    <path d="M0 20 Q25 5, 50 30 T100 15" stroke="currentColor" strokeWidth="3" />
                  </svg>
                </div>

                {/* Total Products Summary Card */}
                <div
                  onClick={() => setActiveTab('products')}
                  className="bg-white border border-[#E7EAF0] rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all cursor-pointer group flex items-center justify-between relative overflow-hidden"
                >
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF0E5] text-[#FF8706] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Box className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-[#667085]">
                      Total Products
                    </p>
                    <p className="font-display font-black text-3xl sm:text-4xl text-[#1E2340]">
                      {products.length} <span className="text-sm font-semibold text-slate-400">Products</span>
                    </p>
                    <p className="text-xs font-bold text-[#FF8706] group-hover:underline flex items-center gap-1 pt-1">
                      <span>Manage your products</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </p>
                  </div>

                  {/* Decorative Sparkline SVG */}
                  <svg className="w-24 h-14 text-[#FF8706]/40 stroke-[2.5]" viewBox="0 0 100 40" fill="none">
                    <path d="M0 30 Q25 5, 50 25 T100 10" stroke="currentColor" strokeWidth="3" />
                  </svg>
                </div>

                {/* Total Portfolio Projects Summary Card */}
                <div
                  onClick={() => setActiveTab('portfolio')}
                  className="bg-white border border-[#E7EAF0] rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all cursor-pointer group flex items-center justify-between relative overflow-hidden"
                >
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-[#E3FAF6] text-[#00C2CC] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Briefcase className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-[#667085]">
                      Total Portfolio Projects
                    </p>
                    <p className="font-display font-black text-3xl sm:text-4xl text-[#1E2340]">
                      {portfolio.length} <span className="text-sm font-semibold text-slate-400">Projects</span>
                    </p>
                    <p className="text-xs font-bold text-[#00C2CC] group-hover:underline flex items-center gap-1 pt-1">
                      <span>Manage your projects</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </p>
                  </div>

                  {/* Decorative Sparkline SVG */}
                  <svg className="w-24 h-14 text-[#00C2CC]/40 stroke-[2.5]" viewBox="0 0 100 40" fill="none">
                    <path d="M0 25 Q25 35, 50 15 T100 20" stroke="currentColor" strokeWidth="3" />
                  </svg>
                </div>

              </div>

              {/* Products Table Overview Card */}
              <div className="bg-white border border-[#E7EAF0] rounded-3xl p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#FFF0E5] text-[#FF8706] flex items-center justify-center">
                      <Box className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-lg text-[#1E2340]">Products</h3>
                      <p className="text-xs text-[#667085]">Manage all products displayed on the website.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => openProductModal()}
                    className="bg-[#FF8706] hover:bg-[#E07200] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-2xl flex items-center gap-2 shadow-md shadow-[#FF8706]/20 cursor-pointer transition-transform active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                  </button>
                </div>

                {products.length === 0 ? (
                  <div className="py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <Box className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="font-extrabold text-base text-[#1E2340]">No products yet</p>
                    <p className="text-xs text-[#667085] mt-1 mb-4">Add your first product to display it on the DevtaSoft website.</p>
                    <button
                      onClick={() => openProductModal()}
                      className="bg-[#FF8706] text-white font-bold text-xs px-4 py-2 rounded-xl"
                    >
                      Add Product
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Mobile Scroll Indicator */}
                    <div className="flex items-center justify-between mb-2 sm:hidden px-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scroll table to view details</span>
                      <span className="text-[11px] text-[#FF8706] font-bold">Swipe →</span>
                    </div>

                    <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 scrollbar-thin">
                      <table className="min-w-[680px] w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-[#E7EAF0] text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                            <th className="py-3 px-3 sm:px-4 w-16">IMAGE</th>
                            <th className="py-3 px-3 sm:px-4 min-w-[140px]">NAME</th>
                            <th className="py-3 px-3 sm:px-4 min-w-[160px]">DOMAIN</th>
                            <th className="py-3 px-3 sm:px-4 min-w-[200px]">DESCRIPTION</th>
                            <th className="py-3 px-3 sm:px-4 text-right w-24">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                          {products.slice(0, 5).map((prod) => (
                            <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-3.5 px-3 sm:px-4">
                                <img
                                  src={prod.image}
                                  alt={prod.name}
                                  className="w-12 h-10 rounded-xl object-cover border border-slate-200 shadow-2xs"
                                />
                              </td>
                              <td className="py-3.5 px-3 sm:px-4 font-extrabold text-[#1E2340]">
                                {prod.name}
                              </td>
                              <td className="py-3.5 px-3 sm:px-4">
                                <a
                                  href={normalizeUrl(prod.domain)}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[#FF8706] font-bold hover:underline inline-flex items-center gap-1"
                                >
                                  <span>{getCleanDomain(prod.domain)}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </td>
                              <td className="py-3.5 px-3 sm:px-4 text-slate-500 max-w-xs truncate">
                                {prod.description || '—'}
                              </td>
                              <td className="py-3.5 px-3 sm:px-4 text-right">
                                <div className="inline-flex items-center gap-2">
                                  <button
                                    onClick={() => openProductModal(prod)}
                                    className="p-2 rounded-xl bg-slate-100 hover:bg-[#00C2CC]/10 text-slate-600 hover:text-[#00C2CC] transition-colors cursor-pointer"
                                    title="Edit Product"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => setDeleteProductConfirmId(prod.id)}
                                    className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-colors cursor-pointer"
                                    title="Delete Product"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Portfolio Table Overview Card */}
              <div className="bg-white border border-[#E7EAF0] rounded-3xl p-4 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#E3FAF6] text-[#00C2CC] flex items-center justify-center">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-lg text-[#1E2340]">Portfolio</h3>
                      <p className="text-xs text-[#667085]">Manage all portfolio projects displayed on the website.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => openPortfolioModal()}
                    className="bg-[#00C2CC] hover:bg-[#00A2AA] text-[#0D152A] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-2xl flex items-center gap-2 shadow-md shadow-[#00C2CC]/20 cursor-pointer transition-transform active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Project</span>
                  </button>
                </div>

                {portfolio.length === 0 ? (
                  <div className="py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="font-extrabold text-base text-[#1E2340]">No portfolio projects yet</p>
                    <p className="text-xs text-[#667085] mt-1 mb-4">Add your first project and showcase your work.</p>
                    <button
                      onClick={() => openPortfolioModal()}
                      className="bg-[#00C2CC] text-[#0D152A] font-bold text-xs px-4 py-2 rounded-xl"
                    >
                      Add Project
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Mobile Scroll Indicator */}
                    <div className="flex items-center justify-between mb-2 sm:hidden px-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scroll table to view details</span>
                      <span className="text-[11px] text-[#00C2CC] font-bold">Swipe →</span>
                    </div>

                    <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 scrollbar-thin">
                      <table className="min-w-[680px] w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-[#E7EAF0] text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                            <th className="py-3 px-3 sm:px-4 w-16">IMAGE</th>
                            <th className="py-3 px-3 sm:px-4 min-w-[140px]">NAME</th>
                            <th className="py-3 px-3 sm:px-4 min-w-[160px]">DOMAIN</th>
                            <th className="py-3 px-3 sm:px-4 min-w-[200px]">DESCRIPTION</th>
                            <th className="py-3 px-3 sm:px-4 text-right w-24">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                          {portfolio.slice(0, 5).map((port) => (
                            <tr key={port.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-3.5 px-3 sm:px-4">
                                <img
                                  src={port.image}
                                  alt={port.name}
                                  className="w-14 h-10 rounded-xl object-cover border border-slate-200 shadow-2xs"
                                />
                              </td>
                              <td className="py-3.5 px-3 sm:px-4 font-extrabold text-[#1E2340]">
                                {port.name}
                              </td>
                              <td className="py-3.5 px-3 sm:px-4">
                                <a
                                  href={normalizeUrl(port.domain)}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[#00C2CC] font-bold hover:underline inline-flex items-center gap-1"
                                >
                                  <span>{getCleanDomain(port.domain)}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </td>
                              <td className="py-3.5 px-3 sm:px-4 text-slate-500 max-w-xs truncate">
                                {port.description || '—'}
                              </td>
                              <td className="py-3.5 px-3 sm:px-4 text-right">
                                <div className="inline-flex items-center gap-2">
                                  <button
                                    onClick={() => openPortfolioModal(port)}
                                    className="p-2 rounded-xl bg-slate-100 hover:bg-[#00C2CC]/10 text-slate-600 hover:text-[#00C2CC] transition-colors cursor-pointer"
                                    title="Edit Project"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => setDeletePortfolioConfirmId(port.id)}
                                    className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-colors cursor-pointer"
                                    title="Delete Project"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PAGE & SECTION VISIBILITY CONTROLS */}
          {activeTab === 'visibility' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Info Alert Box */}
              <div className="bg-[#0D152A] text-white rounded-3xl p-6 sm:p-7 shadow-lg flex items-start gap-4 border border-slate-700">
                <div className="w-12 h-12 rounded-2xl bg-[#14B8B0]/20 text-[#14B8B0] flex items-center justify-center shrink-0 mt-0.5">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-white mb-1">
                    Website Visibility & Navigation Management
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                    Control which pages and landing page sections are visible to your visitors. Hiding a page removes it from the Navbar, Footer, and direct URL routes. Hiding a section removes it from the landing page.
                  </p>
                </div>
              </div>

              {/* PANEL 1: NAV PAGES & ROUTES VISIBILITY */}
              <div className="bg-white border border-[#E7EAF0] rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
                <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#E6F8F9] text-[#14B8B0] flex items-center justify-center shrink-0">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h2 className="font-display font-extrabold text-xl text-[#1E2340]">Navbar Pages & Direct Routes</h2>
                        {isPagesUnlocked ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-200">
                            <Unlock className="w-3 h-3 text-emerald-500" /> Unlocked
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-red-50 text-red-600 border border-red-200">
                            <Lock className="w-3 h-3 text-red-500" /> Locked
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#667085] mt-0.5">
                        {isPagesUnlocked
                          ? 'Hide or show specific pages from navbar, footer, and page URL routes.'
                          : 'Section is locked. Toggle the switch on the right to unlock access.'}
                      </p>
                    </div>
                  </div>

                  {/* Uiverse Lock Toggle for Panel 1 */}
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-2xl shadow-2xs">
                    <span className="text-xs font-extrabold text-[#1E2340]">
                      {isPagesUnlocked ? 'Access Granted' : 'Locked'}
                    </span>
                    <label className="relative inline-flex cursor-pointer items-center select-none shrink-0" title={isPagesUnlocked ? 'Unlocked - Click to lock section' : 'Locked - Click to unlock section'}>
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={isPagesUnlocked}
                        onChange={(e) => {
                          setIsPagesUnlocked(e.target.checked);
                          showToast(
                            e.target.checked ? 'Pages section UNLOCKED - You can now edit page controls!' : 'Pages section LOCKED',
                            e.target.checked ? 'success' : 'error'
                          );
                        }}
                      />
                      <div className="border-slate-400 shadow-md peer-checked:shadow-green-600/40 shadow-red-600/40 border flex h-6 w-12 items-center outline-none rounded-full bg-red-600 pl-7 text-white transition-all duration-300 peer-checked:bg-green-600 peer-checked:pl-2 peer-focus:outline-none"></div>
                      <svg
                        className="peer-checked:opacity-0 transition-all duration-500 opacity-100 absolute left-6 stroke-slate-900 w-5 h-5 fill-white"
                        height="100"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 100 100"
                        width="100"
                        x="0"
                        xmlns="http://www.w3.org/2000/svg"
                        y="0"
                      >
                        <path
                          d="M50,18A19.9,19.9,0,0,0,30,38v8a8,8,0,0,0-8,8V74a8,8,0,0,0,8,8H70a8,8,0,0,0,8-8V54a8,8,0,0,0-8-8H38V38a12,12,0,0,1,23.6-3,4,4,0,1,0,7.8-2A20.1,20.1,0,0,0,50,18Z"
                        ></path>
                      </svg>
                      <svg
                        className="absolute transition-all duration-500 peer-checked:opacity-100 opacity-0 left-1 stroke-slate-900 w-5 h-5 fill-white"
                        height="100"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 100 100"
                        width="100"
                        x="0"
                        xmlns="http://www.w3.org/2000/svg"
                        y="0"
                      >
                        <path
                          d="M30,46V38a20,20,0,0,1,40,0v8a8,8,0,0,1,8,8V74a8,8,0,0,1-8,8H30a8,8,0,0,1-8-8V54A8,8,0,0,1,30,46Zm32-8v8H38V38a12,12,0,0,1,24,0Z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                      <div className="absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 peer-checked:left-7"></div>
                    </label>
                  </div>
                </div>

                {/* Page Cards Container with Lock Shield Overlay */}
                <div className="relative">
                  {!isPagesUnlocked && (
                    <div 
                      onClick={() => showToast('Pages section is locked! Unlock the toggle switch at the top-right to edit.', 'error')}
                      className="absolute -inset-2 z-20 bg-slate-900/10 backdrop-blur-[2px] rounded-2xl cursor-not-allowed flex items-center justify-center transition-all"
                    >
                      <div className="bg-white/95 shadow-xl border border-slate-200 px-5 py-3 rounded-2xl text-xs font-extrabold text-[#1E2340] flex items-center gap-2.5 animate-pulse">
                        <div className="w-7 h-7 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                          <Lock className="w-4 h-4" />
                        </div>
                        <span>Section Locked — Toggle unlock switch at top right to edit</span>
                      </div>
                    </div>
                  )}

                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-300 ${!isPagesUnlocked ? 'opacity-50 pointer-events-none select-none' : ''}`}>
                    {[
                      { key: 'about' as const, name: 'About Us Page', path: '/about', desc: 'Main About Us page showcasing company story, team & values.' },
                      { key: 'services' as const, name: 'Services Page', path: '/services', desc: 'Services overview page listing digital engineering solutions.' },
                      { key: 'portfolio' as const, name: 'Portfolio Page', path: '/portfolio', desc: 'Case studies & full client portfolio project gallery.' },
                      { key: 'products' as const, name: 'Products Page', path: '/products', desc: 'Product showcase page highlighting proprietary tools.' },
                      { key: 'contact' as const, name: 'Contact Us Page', path: '/contact', desc: 'Dedicated contact page with interactive contact form.' },
                    ].map((item) => {
                      const isVisible = visibilitySettings.pages[item.key];
                      return (
                        <div
                          key={item.key}
                          className={`p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                            isVisible
                              ? 'bg-white border-slate-200 shadow-2xs'
                              : 'bg-slate-50/70 border-slate-200/60 opacity-75'
                          }`}
                        >
                          <div className="space-y-1 overflow-hidden">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-sm text-[#1E2340]">{item.name}</span>
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">{item.path}</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-snug">{item.desc}</p>
                            <div className="pt-1">
                              {isVisible ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                                  <Eye className="w-3 h-3" /> Visible on Website
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                                  <EyeOff className="w-3 h-3 text-slate-400" /> Hidden from Navbar & Website
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Toggle Switch */}
                          <button
                            onClick={() => {
                              const updated = dataService.togglePageVisibility(item.key);
                              setVisibilitySettings(updated);
                              showToast(
                                `${item.name} is now ${updated.pages[item.key] ? 'VISIBLE' : 'HIDDEN'} on the website!`
                              );
                            }}
                            className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              isVisible ? 'bg-[#14B8B0]' : 'bg-slate-300'
                            }`}
                            role="switch"
                            aria-checked={isVisible}
                          >
                            <span
                              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                isVisible ? 'translate-x-6' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* PANEL 2: LANDING PAGE SECTIONS VISIBILITY */}
              <div className="bg-white border border-[#E7EAF0] rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
                <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#FFEFE5] text-[#FF8706] flex items-center justify-center shrink-0">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h2 className="font-display font-extrabold text-xl text-[#1E2340]">Landing Page Sections</h2>
                        {isSectionsUnlocked ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-200">
                            <Unlock className="w-3 h-3 text-emerald-500" /> Unlocked
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-red-50 text-red-600 border border-red-200">
                            <Lock className="w-3 h-3 text-red-500" /> Locked
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#667085] mt-0.5">
                        {isSectionsUnlocked
                          ? 'Hide or show individual sections on the main landing page (`/`).'
                          : 'Section is locked. Toggle the switch on the right to unlock access.'}
                      </p>
                    </div>
                  </div>

                  {/* Uiverse Lock Toggle for Panel 2 */}
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-2xl shadow-2xs">
                    <span className="text-xs font-extrabold text-[#1E2340]">
                      {isSectionsUnlocked ? 'Access Granted' : 'Locked'}
                    </span>
                    <label className="relative inline-flex cursor-pointer items-center select-none shrink-0" title={isSectionsUnlocked ? 'Unlocked - Click to lock section' : 'Locked - Click to unlock section'}>
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={isSectionsUnlocked}
                        onChange={(e) => {
                          setIsSectionsUnlocked(e.target.checked);
                          showToast(
                            e.target.checked ? 'Landing Page Sections UNLOCKED - You can now edit section controls!' : 'Landing Page Sections LOCKED',
                            e.target.checked ? 'success' : 'error'
                          );
                        }}
                      />
                      <div className="border-slate-400 shadow-md peer-checked:shadow-green-600/40 shadow-red-600/40 border flex h-6 w-12 items-center outline-none rounded-full bg-red-600 pl-7 text-white transition-all duration-300 peer-checked:bg-green-600 peer-checked:pl-2 peer-focus:outline-none"></div>
                      <svg
                        className="peer-checked:opacity-0 transition-all duration-500 opacity-100 absolute left-6 stroke-slate-900 w-5 h-5 fill-white"
                        height="100"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 100 100"
                        width="100"
                        x="0"
                        xmlns="http://www.w3.org/2000/svg"
                        y="0"
                      >
                        <path
                          d="M50,18A19.9,19.9,0,0,0,30,38v8a8,8,0,0,0-8,8V74a8,8,0,0,0,8,8H70a8,8,0,0,0,8-8V54a8,8,0,0,0-8-8H38V38a12,12,0,0,1,23.6-3,4,4,0,1,0,7.8-2A20.1,20.1,0,0,0,50,18Z"
                        ></path>
                      </svg>
                      <svg
                        className="absolute transition-all duration-500 peer-checked:opacity-100 opacity-0 left-1 stroke-slate-900 w-5 h-5 fill-white"
                        height="100"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 100 100"
                        width="100"
                        x="0"
                        xmlns="http://www.w3.org/2000/svg"
                        y="0"
                      >
                        <path
                          d="M30,46V38a20,20,0,0,1,40,0v8a8,8,0,0,1,8,8V74a8,8,0,0,1-8,8H30a8,8,0,0,1-8-8V54A8,8,0,0,1,30,46Zm32-8v8H38V38a12,12,0,0,1,24,0Z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                      <div className="absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 peer-checked:left-7"></div>
                    </label>
                  </div>
                </div>

                {/* Section Cards Container with Lock Shield Overlay */}
                <div className="relative">
                  {!isSectionsUnlocked && (
                    <div 
                      onClick={() => showToast('Landing Page Sections are locked! Unlock the toggle switch at the top-right to edit.', 'error')}
                      className="absolute -inset-2 z-20 bg-slate-900/10 backdrop-blur-[2px] rounded-2xl cursor-not-allowed flex items-center justify-center transition-all"
                    >
                      <div className="bg-white/95 shadow-xl border border-slate-200 px-5 py-3 rounded-2xl text-xs font-extrabold text-[#1E2340] flex items-center gap-2.5 animate-pulse">
                        <div className="w-7 h-7 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                          <Lock className="w-4 h-4" />
                        </div>
                        <span>Section Locked — Toggle unlock switch at top right to edit</span>
                      </div>
                    </div>
                  )}

                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-300 ${!isSectionsUnlocked ? 'opacity-50 pointer-events-none select-none' : ''}`}>
                    {[
                      { key: 'aboutSection' as const, name: 'About Us Section', anchor: '#about', desc: 'Overview about section with developer graphic & company values.' },
                      { key: 'servicesSection' as const, name: 'Services Section', anchor: '#services', desc: 'Interactive services grid with digital capabilities.' },
                      { key: 'portfolioSection' as const, name: 'Portfolio Section', anchor: '#portfolio', desc: 'Featured projects card gallery with live code typewriter.' },
                      { key: 'productsSection' as const, name: 'Products Section', anchor: '#products', desc: 'DevtaSoft digital tools & software showcase.' },
                      { key: 'statsBar' as const, name: 'Stats Bar', anchor: '#stats', desc: 'Bottom stats summary bar at the footer of landing page.' },
                    ].map((item) => {
                      const isVisible = visibilitySettings.sections[item.key];
                      return (
                        <div
                          key={item.key}
                          className={`p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                            isVisible
                              ? 'bg-white border-slate-200 shadow-2xs'
                              : 'bg-slate-50/70 border-slate-200/60 opacity-75'
                          }`}
                        >
                          <div className="space-y-1 overflow-hidden">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-sm text-[#1E2340]">{item.name}</span>
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">{item.anchor}</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-snug">{item.desc}</p>
                            <div className="pt-1">
                              {isVisible ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                                  <Eye className="w-3 h-3" /> Visible on Landing Page
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                                  <EyeOff className="w-3 h-3 text-slate-400" /> Hidden from Landing Page
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Toggle Switch */}
                          <button
                            onClick={() => {
                              const updated = dataService.toggleSectionVisibility(item.key);
                              setVisibilitySettings(updated);
                              showToast(
                                `${item.name} is now ${updated.sections[item.key] ? 'VISIBLE' : 'HIDDEN'} on landing page!`
                              );
                            }}
                            className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              isVisible ? 'bg-[#FF8706]' : 'bg-slate-300'
                            }`}
                            role="switch"
                            aria-checked={isVisible}
                          >
                            <span
                              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                isVisible ? 'translate-x-6' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: PRODUCTS MANAGEMENT PAGE */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-[#E7EAF0] rounded-3xl p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                  <div>
                    <h2 className="font-display font-extrabold text-2xl text-[#1E2340]">Products</h2>
                    <p className="text-xs sm:text-sm text-[#667085] mt-1">Manage products displayed on the DevtaSoft website.</p>
                  </div>
                  <button
                    onClick={() => openProductModal()}
                    className="bg-[#FF8706] hover:bg-[#E07200] text-white font-bold text-sm px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-[#FF8706]/20 cursor-pointer transition-transform active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add New Product</span>
                  </button>
                </div>

                {products.length === 0 ? (
                  <div className="py-16 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                    <Box className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="font-extrabold text-lg text-[#1E2340]">No products yet</h3>
                    <p className="text-xs sm:text-sm text-[#667085] max-w-sm mx-auto mt-1 mb-6">
                      Add your first product to display it on the DevtaSoft website.
                    </p>
                    <button
                      onClick={() => openProductModal()}
                      className="bg-[#FF8706] text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md"
                    >
                      Add Product
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Mobile Scroll Indicator */}
                    <div className="flex items-center justify-between mb-2 sm:hidden px-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scroll table to view details</span>
                      <span className="text-[11px] text-[#FF8706] font-bold">Swipe →</span>
                    </div>

                    <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 scrollbar-thin">
                      <table className="min-w-[680px] w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-[#E7EAF0] text-xs font-extrabold uppercase tracking-wider text-slate-400">
                            <th className="py-4 px-3 sm:px-4 w-16">IMAGE</th>
                            <th className="py-4 px-3 sm:px-4 min-w-[140px]">NAME</th>
                            <th className="py-4 px-3 sm:px-4 min-w-[160px]">DOMAIN</th>
                            <th className="py-4 px-3 sm:px-4 min-w-[200px]">DESCRIPTION</th>
                            <th className="py-4 px-3 sm:px-4 text-right w-24">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                          {products.map((prod) => (
                            <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-4 px-3 sm:px-4">
                                <img
                                  src={prod.image}
                                  alt={prod.name}
                                  className="w-14 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs"
                                />
                              </td>
                              <td className="py-4 px-3 sm:px-4 font-extrabold text-[#1E2340]">
                                {prod.name}
                              </td>
                              <td className="py-4 px-3 sm:px-4">
                                <a
                                  href={normalizeUrl(prod.domain)}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[#FF8706] font-bold hover:underline inline-flex items-center gap-1.5"
                                >
                                  <span>{getCleanDomain(prod.domain)}</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </td>
                              <td className="py-4 px-3 sm:px-4 text-slate-500 max-w-sm">
                                {prod.description || '—'}
                              </td>
                              <td className="py-4 px-3 sm:px-4 text-right">
                                <div className="inline-flex items-center gap-2">
                                  <button
                                    onClick={() => openProductModal(prod)}
                                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-[#00C2CC]/10 text-slate-600 hover:text-[#00C2CC] transition-colors cursor-pointer"
                                    title="Edit Product"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => setDeleteProductConfirmId(prod.id)}
                                    className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-colors cursor-pointer"
                                    title="Delete Product"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PORTFOLIO MANAGEMENT PAGE */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-[#E7EAF0] rounded-3xl p-4 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                  <div>
                    <h2 className="font-display font-extrabold text-2xl text-[#1E2340]">Portfolio Projects</h2>
                    <p className="text-xs sm:text-sm text-[#667085] mt-1">Manage projects displayed in the DevtaSoft portfolio.</p>
                  </div>
                  <button
                    onClick={() => openPortfolioModal()}
                    className="bg-[#00C2CC] hover:bg-[#00A2AA] text-[#0D152A] font-bold text-sm px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-[#00C2CC]/20 cursor-pointer transition-transform active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add New Project</span>
                  </button>
                </div>

                {portfolio.length === 0 ? (
                  <div className="py-16 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                    <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="font-extrabold text-lg text-[#1E2340]">No portfolio projects yet</h3>
                    <p className="text-xs sm:text-sm text-[#667085] max-w-sm mx-auto mt-1 mb-6">
                      Add your first project and showcase your work.
                    </p>
                    <button
                      onClick={() => openPortfolioModal()}
                      className="bg-[#00C2CC] text-[#0D152A] font-bold text-sm px-6 py-3 rounded-2xl shadow-md"
                    >
                      Add Project
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Mobile Scroll Indicator */}
                    <div className="flex items-center justify-between mb-2 sm:hidden px-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scroll table to view details</span>
                      <span className="text-[11px] text-[#00C2CC] font-bold">Swipe →</span>
                    </div>

                    <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 scrollbar-thin">
                      <table className="min-w-[680px] w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-[#E7EAF0] text-xs font-extrabold uppercase tracking-wider text-slate-400">
                            <th className="py-4 px-3 sm:px-4 w-16">IMAGE</th>
                            <th className="py-4 px-3 sm:px-4 min-w-[140px]">NAME</th>
                            <th className="py-4 px-3 sm:px-4 min-w-[160px]">DOMAIN</th>
                            <th className="py-4 px-3 sm:px-4 min-w-[200px]">DESCRIPTION</th>
                            <th className="py-4 px-3 sm:px-4 text-right w-24">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                          {portfolio.map((port) => (
                            <tr key={port.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-4 px-3 sm:px-4">
                                <img
                                  src={port.image}
                                  alt={port.name}
                                  className="w-16 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs"
                                />
                              </td>
                              <td className="py-4 px-3 sm:px-4 font-extrabold text-[#1E2340]">
                                {port.name}
                              </td>
                              <td className="py-4 px-3 sm:px-4">
                                <a
                                  href={normalizeUrl(port.domain)}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[#00C2CC] font-bold hover:underline inline-flex items-center gap-1.5"
                                >
                                  <span>{getCleanDomain(port.domain)}</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </td>
                              <td className="py-4 px-3 sm:px-4 text-slate-500 max-w-sm">
                                {port.description || '—'}
                              </td>
                              <td className="py-4 px-3 sm:px-4 text-right">
                              <div className="inline-flex items-center gap-2">
                                <button
                                  onClick={() => openPortfolioModal(port)}
                                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-[#00C2CC]/10 text-slate-600 hover:text-[#00C2CC] transition-colors cursor-pointer"
                                  title="Edit Project"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setDeletePortfolioConfirmId(port.id)}
                                  className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-colors cursor-pointer"
                                  title="Delete Project"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ═══════════════════════════════════════════
          ADD / EDIT PRODUCT MODAL DRAWER
      ═══════════════════════════════════════════ */}
      {productModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white border border-[#E7EAF0] rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto my-auto">
            
            <button
              onClick={closeProductModal}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 p-2 rounded-full cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-display font-extrabold text-xl text-[#1E2340] mb-6">
              {editingProductId ? 'Edit Product' : 'Add New Product'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-5">
              
              {/* Image Upload Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Product Image *
                </label>
                
                {productImage ? (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-36 bg-slate-50 group">
                    <img src={productImage} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setProductImage('')}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => productFileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-200 hover:border-[#FF8706] bg-slate-50/50 hover:bg-slate-50 rounded-2xl p-6 text-center cursor-pointer transition-colors"
                  >
                    <UploadCloud className="w-8 h-8 text-[#FF8706] mx-auto mb-2" />
                    <p className="text-xs font-bold text-[#1E2340]">Upload image or drag & drop</p>
                    <p className="text-[11px] text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                )}
                <input
                  ref={productFileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, setProductImage);
                  }}
                />
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#FF8706] focus:ring-2 focus:ring-[#FF8706]/20 outline-none text-sm font-semibold transition-all"
                />
              </div>

              {/* Product Domain / URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Product Domain / URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://example.com"
                  value={productDomain}
                  onChange={(e) => setProductDomain(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#FF8706] focus:ring-2 focus:ring-[#FF8706]/20 outline-none text-sm font-semibold transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter description"
                  value={productDesc}
                  onChange={(e) => setProductDesc(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#FF8706] focus:ring-2 focus:ring-[#FF8706]/20 outline-none text-sm font-medium transition-all resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={closeProductModal}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={productLoading}
                  className="px-6 py-2.5 rounded-xl bg-[#FF8706] hover:bg-[#E07200] text-white font-bold text-xs shadow-md shadow-[#FF8706]/20 cursor-pointer transition-all disabled:opacity-50"
                >
                  {productLoading ? 'Saving...' : editingProductId ? 'Save Changes' : 'Add Product'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          ADD / EDIT PORTFOLIO MODAL DRAWER
      ═══════════════════════════════════════════ */}
      {portfolioModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white border border-[#E7EAF0] rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto my-auto">
            
            <button
              onClick={closePortfolioModal}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 p-2 rounded-full cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-display font-extrabold text-xl text-[#1E2340] mb-6">
              {editingPortfolioId ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
            </h3>

            <form onSubmit={handleSavePortfolio} className="space-y-5">
              
              {/* Image Upload Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Project Image / Mockup *
                </label>
                
                {portfolioImage ? (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-36 bg-slate-50 group">
                    <img src={portfolioImage} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPortfolioImage('')}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => portfolioFileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-200 hover:border-[#00C2CC] bg-slate-50/50 hover:bg-slate-50 rounded-2xl p-6 text-center cursor-pointer transition-colors"
                  >
                    <UploadCloud className="w-8 h-8 text-[#00C2CC] mx-auto mb-2" />
                    <p className="text-xs font-bold text-[#1E2340]">Upload image or drag & drop</p>
                    <p className="text-[11px] text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                )}
                <input
                  ref={portfolioFileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, setPortfolioImage);
                  }}
                />
              </div>

              {/* Project Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Project Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter project name"
                  value={portfolioName}
                  onChange={(e) => setPortfolioName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#00C2CC] focus:ring-2 focus:ring-[#00C2CC]/20 outline-none text-sm font-semibold transition-all"
                />
              </div>

              {/* Live Project URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Live Project Domain / URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://example.com"
                  value={portfolioDomain}
                  onChange={(e) => setPortfolioDomain(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#00C2CC] focus:ring-2 focus:ring-[#00C2CC]/20 outline-none text-sm font-semibold transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter description"
                  value={portfolioDesc}
                  onChange={(e) => setPortfolioDesc(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#00C2CC] focus:ring-2 focus:ring-[#00C2CC]/20 outline-none text-sm font-medium transition-all resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={closePortfolioModal}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={portfolioLoading}
                  className="px-6 py-2.5 rounded-xl bg-[#00C2CC] hover:bg-[#00A2AA] text-[#0D152A] font-bold text-xs shadow-md shadow-[#00C2CC]/20 cursor-pointer transition-all disabled:opacity-50"
                >
                  {portfolioLoading ? 'Saving...' : editingPortfolioId ? 'Save Changes' : 'Add Project'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Deletion Confirmation Modal: Product */}
      {deleteProductConfirmId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-[#E7EAF0] rounded-3xl w-full max-w-sm p-6 text-center shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="font-display font-extrabold text-lg text-[#1E2340]">Delete Product?</h4>
            <p className="text-xs text-slate-500">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteProductConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteProductConfirmId)}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-500/20"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deletion Confirmation Modal: Portfolio */}
      {deletePortfolioConfirmId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-[#E7EAF0] rounded-3xl w-full max-w-sm p-6 text-center shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="font-display font-extrabold text-lg text-[#1E2340]">Delete Portfolio Project?</h4>
            <p className="text-xs text-slate-500">
              Are you sure you want to delete this project? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletePortfolioConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeletePortfolio(deletePortfolioConfirmId)}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-500/20"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
