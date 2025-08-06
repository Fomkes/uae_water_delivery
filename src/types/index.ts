export interface Product {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  categoryAr: string;
  inStock: boolean;
  stockQuantity: number;
  popular: boolean;
  size: string;
  sizeAr: string;
  volume: string;
  volumeAr: string;
  origin: string;
  originAr: string;
  features: string[];
  featuresAr: string[];
  rating: number;
  reviews: number;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  slug: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface CartActions {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export interface FilterOptions {
  category?: string;
  priceRange?: [number, number];
  inStock?: boolean;

  search?: string;
}

export interface SortOptions {
  field: 'name' | 'price' | 'rating' | 'popular';
  direction: 'asc' | 'desc';
}

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export type Language = 'en' | 'ar';

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'super-admin';
  lastLogin: string;
}

export interface ParsedProduct {
  title: string;
  titleAr?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  description: string;
  descriptionAr?: string;
  features: string[];
  featuresAr?: string[];
  brand?: string;
  category?: string;
  sourceUrl: string;
  volume?: string;
  weight?: string;
  availability: boolean;
}

export interface ProductParseResult {
  success: boolean;
  product?: ParsedProduct;
  products?: ParsedProduct[];
  error?: string;
  warnings?: string[];
}

export interface AdminLog {
  id: string;
  adminId: string;
  action: string;
  details: string;
  timestamp: string;
  ip?: string;
}
