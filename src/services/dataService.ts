export interface ProductItem {
  id: string;
  name: string;
  domain: string;
  description?: string;
  image: string;
  showOnLanding?: boolean;
  createdAt: number;
}

export interface PortfolioItem {
  id: string;
  name: string;
  domain: string;
  description?: string;
  image: string;
  category?: string;
  showOnLanding?: boolean;
  createdAt: number;
}

export interface VisibilitySettings {
  pages: {
    about: boolean;
    products: boolean;
    services: boolean;
    portfolio: boolean;
    contact: boolean;
  };
  sections: {
    aboutSection: boolean;
    servicesSection: boolean;
    portfolioSection: boolean;
    productsSection: boolean;
    statsBar: boolean;
  };
}

const PRODUCTS_STORAGE_KEY = 'devtasoft_admin_products_v4';
const PORTFOLIO_STORAGE_KEY = 'devtasoft_admin_portfolio_v5';
const VISIBILITY_STORAGE_KEY = 'devtasoft_admin_visibility_v1';

const defaultVisibility: VisibilitySettings = {
  pages: {
    about: true,
    products: true,
    services: true,
    portfolio: true,
    contact: true,
  },
  sections: {
    aboutSection: true,
    servicesSection: true,
    portfolioSection: true,
    productsSection: true,
    statsBar: true,
  },
};

// All 15 Pre-existing Products
const defaultProducts: ProductItem[] = [
  {
    id: 'repostseo',
    name: 'REPOSTSEO',
    domain: 'https://repostseo.com',
    description: 'Plagiarism remover and content reposter with AI-powered rewriting.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 150000,
  },
  {
    id: 'editpad',
    name: 'Editpad',
    domain: 'https://editpad.org',
    description: 'Online text editor for writing, editing, and managing text content.',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 140000,
  },
  {
    id: 'allmath',
    name: 'AllMath',
    domain: 'https://allmath.com',
    description: 'Smart math solver and calculator for students and engineers.',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 130000,
  },
  {
    id: 'calculators',
    name: 'Calculators.tech',
    domain: 'https://calculators.tech',
    description: 'Collection of free online calculators for fast everyday calculations.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 120000,
  },
  {
    id: 'dapachecker',
    name: 'DA PA Checker',
    domain: 'https://dapachecker.com',
    description: 'Check Domain Authority and Page Authority instantly.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 110000,
  },
  {
    id: 'summarizer',
    name: 'SUMMARIZER',
    domain: 'https://summarizer.org',
    description: 'Summarize long articles and text into short, clear content.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 100000,
  },
  {
    id: 'notepad',
    name: 'Online Notepad',
    domain: 'https://onlinenotepad.io',
    description: 'Quick and simple online notepad for your notes.',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 90000,
  },
  {
    id: 'lcmcalc',
    name: 'LCM Calculator',
    domain: 'https://lcmcalculator.dev',
    description: 'Find LCM of numbers quickly and accurately.',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 80000,
  },
  {
    id: 'utilities',
    name: 'Utilities Online',
    domain: 'https://utilitiesonline.info',
    description: 'Free essential online tools in one convenient place.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 70000,
  },
  {
    id: 'imagetotext',
    name: 'Image To Text',
    domain: 'https://imagetotext.info',
    description: 'Extract text from images using AI OCR technology.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 60000,
  },
  {
    id: 'pdfaword',
    name: 'PDF A WORD',
    domain: 'https://pdfaword.com',
    description: 'Convert PDF files to editable Word documents instantly.',
    image: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 50000,
  },
  {
    id: 'aiessay',
    name: 'AI Essay Writer',
    domain: 'https://aiessaywriter.com',
    description: 'Generate high-quality essays in seconds with AI.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 40000,
  },
  {
    id: 'invisiblechar',
    name: 'Invisible Character',
    domain: 'https://invisiblecharacter.com',
    description: 'Remove invisible characters from your text.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 30000,
  },
  {
    id: 'aestheticfont',
    name: 'Aesthetic Font',
    domain: 'https://aestheticfont.com',
    description: 'Beautiful and stylish fonts for your design projects.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 20000,
  },
  {
    id: 'numblee',
    name: 'Numblee',
    domain: 'https://numblee.com',
    description: 'Smart math game & brain trainer for all ages.',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 10000,
  },
];

// All 15 Pre-existing Portfolio Projects
const defaultPortfolio: PortfolioItem[] = [
  {
    id: 'cosme-store',
    name: 'cosme.store',
    domain: 'https://cosme.store',
    description: 'Luxury cosmetics, makeup, face washes, and perfume e-commerce storefront with custom shade finder and instant checkout.',
    image: '/cosme.png',
    category: 'Shopify Store Development',
    createdAt: Date.now() - 220000,
  },
  {
    id: 'quikeat-com',
    name: 'QuikEat.com',
    domain: 'https://quikeat.com',
    description: 'Online restaurant ordering & dining reservation website with digital menu, table booking, and real-time delivery tracking.',
    image: '/quik.png',
    category: 'Web Development',
    showOnLanding: true,
    createdAt: Date.now() - 210000,
  },
  {
    id: 'lms-software',
    name: 'LMS Software',
    domain: 'https://lms.devtasoft.com',
    description: 'Enterprise Learning Management System with automated course builder, student analytics dashboard, live class streaming, and automated grading.',
    image: '/lms.png',
    category: 'Custom Software Development',
    showOnLanding: false,
    createdAt: Date.now() - 200000,
  },
  {
    id: 'plservices-co',
    name: 'Plservices.co',
    domain: 'https://plservices.co',
    description: 'Professional handyman & home maintenance service portal with instant quote builder, online booking system, and technician dispatch tracking.',
    image: '/pl.png',
    category: 'Web Development',
    showOnLanding: false,
    createdAt: Date.now() - 190000,
  },
  {
    id: 'nexflow-com',
    name: 'nexflow.com',
    domain: 'https://nexflow.com',
    description: 'Plumbing & commercial piping contractor web platform with instant booking, emergency service dispatch, and service estimate calculator.',
    image: '/nexf.png',
    category: 'Web Development',
    showOnLanding: false,
    createdAt: Date.now() - 180000,
  },
  {
    id: 'ironclad-co',
    name: 'ironclad.co',
    domain: 'https://ironclad.co',
    description: 'Commercial & residential roofing contractor digital platform with instant estimate calculator, project portfolio, and inspection scheduling.',
    image: '/icr.png',
    category: 'Web Development',
    showOnLanding: false,
    createdAt: Date.now() - 170000,
  },
  {
    id: 'greendoors-com',
    name: 'GreenDoors.com',
    domain: 'https://greendoors.com',
    description: 'Luxury hotel booking & hospitality web portal with real-time reservation management, room customization, and instant payment integration.',
    image: '/hw1.png',
    category: 'Web Development',
    showOnLanding: false,
    createdAt: Date.now() - 160000,
  },
  {
    id: 'nexcojapan-com',
    name: 'nexcojapan.com',
    domain: 'https://nexcojapan.com',
    description: 'Global Japanese vehicle sourcing & auction portal with real-time bidding system and container shipping tracking.',
    image: '/nexcoj.png',
    category: 'Web Development',
    showOnLanding: true,
    createdAt: Date.now() - 150000,
  },
  {
    id: 'logistics-fleet-management',
    name: 'Logistics Fleet Management',
    domain: 'https://fleet-management.devtasoft.com',
    description: 'Real-time GPS tracking and fleet dispatch management software.',
    image: '/lfm.png',
    category: 'Custom Software Development',
    showOnLanding: true,
    createdAt: Date.now() - 140000,
  },
  {
    id: 'mirrormate-com',
    name: 'mirrormate.com',
    domain: 'https://mirrormate.com',
    description: 'Custom mirror framing and home decor e-commerce platform.',
    image: '/mirrorm.png',
    category: 'Shopify Store Development',
    createdAt: Date.now() - 130000,
  },
  {
    id: 'sarastore-pk',
    name: 'sarastore.pk',
    domain: 'https://sarastore.pk',
    description: 'High-performance custom WordPress & WooCommerce e-commerce platform built for SaraStore with instant search and custom payment checkout.',
    image: '/sspc.png',
    category: 'WordPress Development',
    createdAt: Date.now() - 120000,
  },
  {
    id: 'boxwala-pk',
    name: 'boxwala.pk',
    domain: 'https://boxwala.pk',
    description: 'Custom packaging boxes and product packaging solution e-commerce platform.',
    image: '/boxwala.png',
    category: 'WordPress Development',
    createdAt: Date.now() - 110000,
  },
  {
    id: 'hafiztalha-com',
    name: 'hafiztalha.com',
    domain: 'https://hafiztalha.com',
    description: 'Personalized online Quran learning portal with live audio & video sessions.',
    image: '/hafiztalha.png',
    category: 'WordPress Development',
    createdAt: Date.now() - 100000,
  },
  {
    id: 'trendfits-net',
    name: 'trendfits.net',
    domain: 'https://trendfits.net',
    description: 'Fashion e-commerce apparel storefront for TrendFits.',
    image: '/trendfits.png',
    category: 'WordPress Development',
    createdAt: Date.now() - 90000,
  },
  {
    id: 'shortconverter-com',
    name: 'shortconverter.com',
    domain: 'https://shortconverter.com',
    description: 'Lightning-fast media conversion and online video utility web platform built with React, Next.js, and browser WebAssembly.',
    image: '/shortc.png',
    category: 'Web Development',
    createdAt: Date.now() - 80000,
  },
  {
    id: 'coursepro-today',
    name: 'coursepro.today',
    domain: 'https://coursepro.today',
    description: 'Online learning and digital course platform for CoursePro.',
    image: '/coursepro.png',
    category: 'Web Development',
    createdAt: Date.now() - 70000,
  },
  {
    id: 'lookingglassacademy-net',
    name: 'lookingglassacademy.net',
    domain: 'https://lookingglassacademy.net',
    description: 'Educational academy portal and online learning platform.',
    image: '/lga.png',
    category: 'Web Development',
    createdAt: Date.now() - 60000,
  },
  {
    id: 'pos-software',
    name: 'POS Software',
    domain: 'https://pos-software.devtasoft.com',
    description: 'All-in-one retail POS and inventory management software with offline receipt printing.',
    image: '/possw.png',
    category: 'Custom Software Development',
    createdAt: Date.now() - 50000,
  },
  {
    id: 'coffee-shop-pos',
    name: 'Coffee Shop POS',
    domain: 'https://coffeeshop-pos.devtasoft.com',
    description: 'Custom order management and point of sale solution for coffee shops.',
    image: '/coffeesp.png',
    category: 'Custom Software Development',
    createdAt: Date.now() - 40000,
  },
  {
    id: 'essence-vault-fragrances',
    name: 'Essence Vault Fragrances',
    domain: 'https://theessencevault.com',
    description: 'Luxury fragrance and perfume e-commerce storefront.',
    image: '/evf.png',
    category: 'Shopify Store Development',
    createdAt: Date.now() - 30000,
  },
  {
    id: 'oakcha-fragrances',
    name: 'OAKCHA Fragrances',
    domain: 'https://oakcha.com',
    description: 'Artisanal fragrance e-commerce store for OAKCHA Perfumes.',
    image: '/of.png',
    category: 'Shopify Store Development',
    createdAt: Date.now() - 20000,
  },
  {
    id: 'herman-miller',
    name: 'HermanMiller',
    domain: 'https://hermanmiller.com',
    description: 'Iconic furniture brand luxury digital store & ergonomic showcase.',
    image: '/hm.png',
    category: 'Shopify Store Development',
    createdAt: Date.now() - 10000,
  },
];

const notifyDataChanged = () => {
  window.dispatchEvent(new Event('devtasoft-data-changed'));
};

export const dataService = {
  getProducts(): ProductItem[] {
    try {
      const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(defaultProducts));
        return defaultProducts;
      }
      return JSON.parse(stored);
    } catch {
      return defaultProducts;
    }
  },

  saveProduct(data: Omit<ProductItem, 'id' | 'createdAt'>, editId?: string): ProductItem {
    const products = this.getProducts();
    let updatedItem: ProductItem;

    if (editId) {
      const index = products.findIndex((p) => p.id === editId);
      if (index !== -1) {
        updatedItem = {
          ...products[index],
          ...data,
        };
        products[index] = updatedItem;
      } else {
        updatedItem = {
          ...data,
          id: `prod-${Date.now()}`,
          createdAt: Date.now(),
        };
        products.unshift(updatedItem);
      }
    } else {
      updatedItem = {
        ...data,
        id: `prod-${Date.now()}`,
        createdAt: Date.now(),
      };
      products.unshift(updatedItem);
    }

    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    notifyDataChanged();
    return updatedItem;
  },

  deleteProduct(id: string): void {
    const products = this.getProducts().filter((p) => p.id !== id);
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    notifyDataChanged();
  },

  getPortfolio(): PortfolioItem[] {
    try {
      const stored = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(defaultPortfolio));
        return defaultPortfolio;
      }
      let parsed: PortfolioItem[] = JSON.parse(stored);
      let updated = false;

      defaultPortfolio.forEach((defItem) => {
        if (!parsed.some((item) => item.id === defItem.id || item.name.toLowerCase() === defItem.name.toLowerCase())) {
          parsed.unshift(defItem);
          updated = true;
        }
      });

      if (updated) {
        localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(parsed));
      }
      return parsed;
    } catch {
      return defaultPortfolio;
    }
  },

  savePortfolio(data: Omit<PortfolioItem, 'id' | 'createdAt'>, editId?: string): PortfolioItem {
    const portfolio = this.getPortfolio();
    let updatedItem: PortfolioItem;

    if (editId) {
      const index = portfolio.findIndex((p) => p.id === editId);
      if (index !== -1) {
        updatedItem = {
          ...portfolio[index],
          ...data,
        };
        portfolio[index] = updatedItem;
      } else {
        updatedItem = {
          ...data,
          id: `port-${Date.now()}`,
          createdAt: Date.now(),
        };
        portfolio.unshift(updatedItem);
      }
    } else {
      updatedItem = {
        ...data,
        id: `port-${Date.now()}`,
        createdAt: Date.now(),
      };
      portfolio.unshift(updatedItem);
    }

    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolio));
    notifyDataChanged();
    return updatedItem;
  },

  deletePortfolio(id: string): void {
    const portfolio = this.getPortfolio().filter((p) => p.id !== id);
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolio));
    notifyDataChanged();
  },

  toggleProductLanding(id: string): ProductItem[] {
    const products = this.getProducts().map((p) => {
      if (p.id === id) {
        return { ...p, showOnLanding: p.showOnLanding === false ? true : false };
      }
      return p;
    });
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    notifyDataChanged();
    return products;
  },

  togglePortfolioLanding(id: string): PortfolioItem[] {
    const portfolio = this.getPortfolio().map((p) => {
      if (p.id === id) {
        return { ...p, showOnLanding: p.showOnLanding === true ? false : true };
      }
      return p;
    });
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolio));
    notifyDataChanged();
    return portfolio;
  },

  getVisibility(): VisibilitySettings {
    try {
      const stored = localStorage.getItem(VISIBILITY_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(VISIBILITY_STORAGE_KEY, JSON.stringify(defaultVisibility));
        return defaultVisibility;
      }
      return JSON.parse(stored);
    } catch {
      return defaultVisibility;
    }
  },

  saveVisibility(settings: VisibilitySettings): void {
    localStorage.setItem(VISIBILITY_STORAGE_KEY, JSON.stringify(settings));
    notifyDataChanged();
  },

  togglePageVisibility(pageKey: keyof VisibilitySettings['pages']): VisibilitySettings {
    const current = this.getVisibility();
    current.pages[pageKey] = !current.pages[pageKey];
    this.saveVisibility(current);
    return current;
  },

  toggleSectionVisibility(sectionKey: keyof VisibilitySettings['sections']): VisibilitySettings {
    const current = this.getVisibility();
    current.sections[sectionKey] = !current.sections[sectionKey];
    this.saveVisibility(current);
    return current;
  },

  subscribe(callback: () => void): () => void {
    window.addEventListener('devtasoft-data-changed', callback);
    return () => {
      window.removeEventListener('devtasoft-data-changed', callback);
    };
  },
};
