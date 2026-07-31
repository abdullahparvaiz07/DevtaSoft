export interface ProductItem {
  id: string;
  name: string;
  domain: string;
  description?: string;
  image: string;
  createdAt: number;
}

export interface PortfolioItem {
  id: string;
  name: string;
  domain: string;
  description?: string;
  image: string;
  category?: string;
  createdAt: number;
}

const PRODUCTS_STORAGE_KEY = 'devtasoft_admin_products_v4';
const PORTFOLIO_STORAGE_KEY = 'devtasoft_admin_portfolio_v4';

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
    id: 'sarastore-pk',
    name: 'sarastore.pk',
    domain: 'https://sarastore.pk',
    description: 'High-performance custom WordPress & WooCommerce e-commerce platform built for SaraStore with instant search and custom payment checkout.',
    image: '/sspc.png',
    category: 'WordPress Development',
    createdAt: Date.now() - 150000,
  },
  {
    id: 'boxwala-pk',
    name: 'boxwala.pk',
    domain: 'https://boxwala.pk',
    description: 'Custom packaging boxes and product packaging solution e-commerce platform.',
    image: '/bw.jpg',
    category: 'WordPress Development',
    createdAt: Date.now() - 140000,
  },
  {
    id: 'hafiztalha-com',
    name: 'hafiztalha.com',
    domain: 'https://hafiztalha.com',
    description: 'Personalized online Quran learning portal with live audio & video sessions.',
    image: '/ht.jpg',
    category: 'WordPress Development',
    createdAt: Date.now() - 130000,
  },
  {
    id: 'trendfits-net',
    name: 'trendfits.net',
    domain: 'https://trendfits.net',
    description: 'Fashion e-commerce apparel storefront for TrendFits.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=80',
    category: 'WordPress Development',
    createdAt: Date.now() - 120000,
  },
  {
    id: 'shortconverter-com',
    name: 'shortconverter.com',
    domain: 'https://shortconverter.com',
    description: 'Lightning-fast media conversion and online video utility web platform built with React, Next.js, and browser WebAssembly.',
    image: '/shortc.png',
    category: 'Web Development',
    createdAt: Date.now() - 110000,
  },
  {
    id: 'nexcojapan-com',
    name: 'nexcojapan.com',
    domain: 'https://nexcojapan.com',
    description: 'Japanese vehicle export and automotive trading platform for Nexco Japan.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
    category: 'Web Development',
    createdAt: Date.now() - 100000,
  },
  {
    id: 'coursepro-today',
    name: 'coursepro.today',
    domain: 'https://coursepro.today',
    description: 'Online learning and digital course platform for CoursePro.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=80',
    category: 'Web Development',
    createdAt: Date.now() - 90000,
  },
  {
    id: 'lookingglassacademy-net',
    name: 'lookingglassacademy.net',
    domain: 'https://lookingglassacademy.net',
    description: 'Educational academy portal and online learning platform.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
    category: 'Web Development',
    createdAt: Date.now() - 80000,
  },
  {
    id: 'pos-software',
    name: 'POS Software',
    domain: 'https://pos-software.devtasoft.com',
    description: 'All-in-one retail POS and inventory management software with offline receipt printing.',
    image: '/possw.png',
    category: 'Custom Software Development',
    createdAt: Date.now() - 70000,
  },
  {
    id: 'logistics-fleet-management',
    name: 'Logistics Fleet Management',
    domain: 'https://fleet-management.devtasoft.com',
    description: 'Real-time GPS tracking and fleet dispatch management software.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    category: 'Custom Software Development',
    createdAt: Date.now() - 60000,
  },
  {
    id: 'coffee-shop-pos',
    name: 'Coffee Shop POS',
    domain: 'https://coffeeshop-pos.devtasoft.com',
    description: 'Custom order management and point of sale solution for coffee shops.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80',
    category: 'Custom Software Development',
    createdAt: Date.now() - 50000,
  },
  {
    id: 'essence-vault-fragrances',
    name: 'Essence Vault Fragrances',
    domain: 'https://theessencevault.com',
    description: 'Luxury fragrance and perfume e-commerce storefront.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    category: 'Shopify Store Development',
    createdAt: Date.now() - 40000,
  },
  {
    id: 'oakcha-fragrances',
    name: 'OAKCHA Fragrances',
    domain: 'https://oakcha.com',
    description: 'Artisanal fragrance e-commerce store for OAKCHA Perfumes.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80',
    category: 'Shopify Store Development',
    createdAt: Date.now() - 30000,
  },
  {
    id: 'mirrormate-com',
    name: 'mirrormate.com',
    domain: 'https://mirrormate.com',
    description: 'Custom mirror framing and home decor e-commerce platform.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80',
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
      return JSON.parse(stored);
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

  subscribe(callback: () => void): () => void {
    window.addEventListener('devtasoft-data-changed', callback);
    return () => {
      window.removeEventListener('devtasoft-data-changed', callback);
    };
  },
};
