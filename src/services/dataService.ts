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

const PRODUCTS_STORAGE_KEY = 'devtasoft_admin_products_v3';
const PORTFOLIO_STORAGE_KEY = 'devtasoft_admin_portfolio_v3';

// Full List of Existing Products
const defaultProducts: ProductItem[] = [
  {
    id: 'prod-repostseo',
    name: 'REPOSTSEO',
    domain: 'https://repostseo.com',
    description: 'AI-powered content repurposing tool that helps you rank higher and save time.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 140000,
  },
  {
    id: 'prod-editpad',
    name: 'Editpad',
    domain: 'https://editpad.org',
    description: 'A simple and powerful online text editor for writing, editing and managing text content.',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 130000,
  },
  {
    id: 'prod-allmath',
    name: 'AllMath',
    domain: 'https://allmath.com',
    description: 'Smart math solver and calculator that helps students learn and solve problems easily.',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 120000,
  },
  {
    id: 'prod-calculators',
    name: 'Calculators.tech',
    domain: 'https://calculators.tech',
    description: 'Collection of free online calculators for everyday use. Fast, accurate and easy to use.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 110000,
  },
  {
    id: 'prod-dapachecker',
    name: 'DA PA Checker',
    domain: 'https://dapachecker.com',
    description: 'Check Domain Authority and Page Authority instantly.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 100000,
  },
  {
    id: 'prod-summarizer',
    name: 'SUMMARIZER',
    domain: 'https://summarizer.org',
    description: 'Summarize long articles and text into short, clear content.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 90000,
  },
  {
    id: 'prod-notepad',
    name: 'Online Notepad',
    domain: 'https://onlinenotepad.io',
    description: 'Quick and simple online notepad for your notes.',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 80000,
  },
  {
    id: 'prod-[#FF8706]essay',
    name: 'AI Essay Writer',
    domain: 'https://aiessaywriter.com',
    description: 'Generate high-quality essays in seconds with AI.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 70000,
  },
  {
    id: 'prod-imagetotext',
    name: 'Image To Text',
    domain: 'https://imagetotext.info',
    description: 'Extract text from images using AI OCR technology.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 60000,
  },
  {
    id: 'prod-pdfaword',
    name: 'PDF A WORD',
    domain: 'https://pdfaword.com',
    description: 'Convert PDF files to editable Word documents instantly.',
    image: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 50000,
  },
];

// Full List of Existing Portfolio Projects
const defaultPortfolio: PortfolioItem[] = [
  {
    id: 'port-taskflow',
    name: 'TaskFlow Pro',
    domain: 'https://taskflowpro.com',
    description: 'A modern task management platform for teams.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    category: 'Web Development',
    createdAt: Date.now() - 100000,
  },
  {
    id: 'port-finmate',
    name: 'FinMate',
    domain: 'https://finmate.io',
    description: 'Finance tracking and analytics platform for businesses.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    category: 'SaaS Platform',
    createdAt: Date.now() - 90000,
  },
  {
    id: 'port-eduhub',
    name: 'EduHub',
    domain: 'https://eduhub.live',
    description: 'E-learning platform connecting students and instructors.',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&auto=format&fit=crop&q=80',
    category: 'AI & Automation',
    createdAt: Date.now() - 80000,
  },
  {
    id: 'port-sarastore',
    name: 'sarastore.pk',
    domain: 'https://sarastore.pk',
    description: 'High-performance custom WordPress & WooCommerce e-commerce platform.',
    image: '/sspc.png',
    category: 'WordPress Development',
    createdAt: Date.now() - 70000,
  },
  {
    id: 'port-shortconverter',
    name: 'shortconverter.com',
    domain: 'https://shortconverter.com',
    description: 'Lightning-fast media conversion and online video utility web platform.',
    image: '/shortc.png',
    category: 'Web Development',
    createdAt: Date.now() - 60000,
  },
  {
    id: 'port-pos',
    name: 'POS Software',
    domain: 'https://pos-software.devtasoft.com',
    description: 'All-in-one retail POS and inventory management software.',
    image: '/possw.png',
    category: 'Custom Software Development',
    createdAt: Date.now() - 50000,
  },
  {
    id: 'port-boxwala',
    name: 'boxwala.pk',
    domain: 'https://boxwala.pk',
    description: 'Custom packaging boxes and product packaging solution e-commerce platform.',
    image: '/bw.jpg',
    category: 'Shopify Store Development',
    createdAt: Date.now() - 40000,
  },
  {
    id: 'port-hafiztalha',
    name: 'hafiztalha.com',
    domain: 'https://hafiztalha.com',
    description: 'Personalized online Quran learning portal with live audio & video sessions.',
    image: '/ht.jpg',
    category: 'Web Development',
    createdAt: Date.now() - 30000,
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
