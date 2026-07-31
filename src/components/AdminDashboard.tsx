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
} from 'lucide-react';
import { Logo } from './Logo';
import { dataService, ProductItem, PortfolioItem } from '../services/dataService';

interface AdminDashboardProps {
  onViewWebsite: () => void;
  onLogout: () => void;
}

type TabType = 'dashboard' | 'products' | 'portfolio';

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

  // Load items on mount and subscribe to data service changes
  useEffect(() => {
    const loadData = () => {
      setProducts(dataService.getProducts());
      setPortfolio(dataService.getPortfolio());
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
          LEFT SIDEBAR (Dark Indigo #0D152A / #2A285F)
      ═══════════════════════════════════════════ */}
      <aside className="hidden lg:flex w-[260px] xl:w-[280px] bg-[#070B19] border-r border-slate-800 flex-col justify-between p-6 shrink-0 fixed top-0 bottom-0 left-0 z-40 select-none">
        <div>
          {/* Top Brand Logo */}
          <div className="flex items-center gap-3 pb-8 border-b border-slate-800/80 mb-8 pt-2">
            <Logo />
          </div>

          {/* MAIN MENU Navigation */}
          <div className="mb-8">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-500 mb-3 px-3">
              MAIN MENU
            </p>
            <nav className="flex flex-col gap-1.5">
              <button
                onClick={() => setActiveTab('dashboard')}
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
                onClick={() => setActiveTab('products')}
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
                onClick={() => setActiveTab('portfolio')}
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
                onClick={onViewWebsite}
                className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm text-slate-400 hover:text-white hover:bg-slate-800/40 transition-all cursor-pointer"
              >
                <Globe className="w-5 h-5 text-slate-400" />
                <span>View Website</span>
              </button>

              <button
                onClick={onLogout}
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
          <div>
            <h1 className="font-display font-extrabold text-2xl text-[#1E2340]">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'products' && 'Products'}
              {activeTab === 'portfolio' && 'Portfolio Projects'}
            </h1>
            <p className="text-xs sm:text-sm text-[#667085] font-medium hidden sm:block">
              {activeTab === 'dashboard' && "Welcome back! Here's what's happening."}
              {activeTab === 'products' && 'Manage all products displayed on the DevtaSoft website.'}
              {activeTab === 'portfolio' && 'Manage all portfolio projects displayed on the website.'}
            </p>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
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
                  <svg className="w-28 h-14 text-[#FF8706]/40 stroke-[2.5]" viewBox="0 0 100 40" fill="none">
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
                  <svg className="w-28 h-14 text-[#00C2CC]/40 stroke-[2.5]" viewBox="0 0 100 40" fill="none">
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
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#E7EAF0] text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                          <th className="py-3 px-4">IMAGE</th>
                          <th className="py-3 px-4">NAME</th>
                          <th className="py-3 px-4">DOMAIN</th>
                          <th className="py-3 px-4">DESCRIPTION</th>
                          <th className="py-3 px-4 text-right">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                        {products.slice(0, 5).map((prod) => (
                          <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-12 h-10 rounded-xl object-cover border border-slate-200 shadow-2xs"
                              />
                            </td>
                            <td className="py-3.5 px-4 font-extrabold text-[#1E2340]">
                              {prod.name}
                            </td>
                            <td className="py-3.5 px-4">
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
                            <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">
                              {prod.description || '—'}
                            </td>
                            <td className="py-3.5 px-4 text-right">
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
                )}
              </div>

              {/* Portfolio Table Overview Card */}
              <div className="bg-white border border-[#E7EAF0] rounded-3xl p-6 sm:p-8 shadow-xs">
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
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#E7EAF0] text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                          <th className="py-3 px-4">IMAGE</th>
                          <th className="py-3 px-4">NAME</th>
                          <th className="py-3 px-4">DOMAIN</th>
                          <th className="py-3 px-4">DESCRIPTION</th>
                          <th className="py-3 px-4 text-right">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                        {portfolio.slice(0, 5).map((port) => (
                          <tr key={port.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4">
                              <img
                                src={port.image}
                                alt={port.name}
                                className="w-14 h-10 rounded-xl object-cover border border-slate-200 shadow-2xs"
                              />
                            </td>
                            <td className="py-3.5 px-4 font-extrabold text-[#1E2340]">
                              {port.name}
                            </td>
                            <td className="py-3.5 px-4">
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
                            <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">
                              {port.description || '—'}
                            </td>
                            <td className="py-3.5 px-4 text-right">
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
                )}
              </div>

            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGEMENT PAGE */}
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
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#E7EAF0] text-xs font-extrabold uppercase tracking-wider text-slate-400">
                          <th className="py-4 px-4">IMAGE</th>
                          <th className="py-4 px-4">NAME</th>
                          <th className="py-4 px-4">DOMAIN</th>
                          <th className="py-4 px-4">DESCRIPTION</th>
                          <th className="py-4 px-4 text-right">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm">
                        {products.map((prod) => (
                          <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-4 px-4">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-14 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs"
                              />
                            </td>
                            <td className="py-4 px-4 font-extrabold text-[#1E2340]">
                              {prod.name}
                            </td>
                            <td className="py-4 px-4">
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
                            <td className="py-4 px-4 text-slate-500 max-w-sm">
                              {prod.description || '—'}
                            </td>
                            <td className="py-4 px-4 text-right">
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
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PORTFOLIO MANAGEMENT PAGE */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-[#E7EAF0] rounded-3xl p-6 sm:p-8 shadow-xs">
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
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#E7EAF0] text-xs font-extrabold uppercase tracking-wider text-slate-400">
                          <th className="py-4 px-4">IMAGE</th>
                          <th className="py-4 px-4">NAME</th>
                          <th className="py-4 px-4">DOMAIN</th>
                          <th className="py-4 px-4">DESCRIPTION</th>
                          <th className="py-4 px-4 text-right">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm">
                        {portfolio.map((port) => (
                          <tr key={port.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-4 px-4">
                              <img
                                src={port.image}
                                alt={port.name}
                                className="w-16 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs"
                              />
                            </td>
                            <td className="py-4 px-4 font-extrabold text-[#1E2340]">
                              {port.name}
                            </td>
                            <td className="py-4 px-4">
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
                            <td className="py-4 px-4 text-slate-500 max-w-sm">
                              {port.description || '—'}
                            </td>
                            <td className="py-4 px-4 text-right">
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-[#E7EAF0] rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-[#E7EAF0] rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            
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
