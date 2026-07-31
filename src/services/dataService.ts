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

const PRODUCTS_STORAGE_KEY = 'devtasoft_admin_products_v1';
const PORTFOLIO_STORAGE_KEY = 'devtasoft_admin_portfolio_v1';

// Sample Default Products
const defaultProducts: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'AI Essay Writer',
    domain: 'https://aiessaywriter.com',
    description: 'AI powered writing assistant for students and professionals.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 100000,
  },
  {
    id: 'prod-2',
    name: 'SEO Checker',
    domain: 'https://seochecker.dev',
    description: 'Analyze and improve your website SEO in seconds.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 90000,
  },
  {
    id: 'prod-3',
    name: 'Smart Chat AI',
    domain: 'https://smartchatai.app',
    description: 'Intelligent chatbot for customer support.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    createdAt: Date.now() - 80000,
  },
];

// Sample Default Portfolio Projects
const defaultPortfolio: PortfolioItem[] = [
  {
    id: 'port-1',
    name: 'TaskFlow Pro',
    domain: 'https://taskflowpro.com',
    description: 'A modern task management platform for teams.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    category: 'Web Development',
    createdAt: Date.now() - 100000,
  },
  {
    id: 'port-2',
    name: 'FinMate',
    domain: 'https://finmate.io',
    description: 'Finance tracking and analytics platform for businesses.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    category: 'SaaS Platform',
    createdAt: Date.now() - 90000,
  },
  {
    id: 'port-3',
    name: 'EduHub',
    domain: 'https://eduhub.live',
    description: 'E-learning platform connecting students and instructors.',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&auto=format&fit=crop&q=80',
    category: 'AI & Automation',
    createdAt: Date.now() - 80000,
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
