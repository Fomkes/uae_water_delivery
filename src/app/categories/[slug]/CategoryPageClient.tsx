'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { CartProvider } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories } from '@/data/products';
import { FilterOptions, SortOptions, Product } from '@/types';
import { Search, Grid, List, Package, Loader2, ArrowLeft } from 'lucide-react';

// Типы для продуктов из Supabase
interface SupabaseProduct {
  id: string;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string | null;
  price: number;
  original_price: number | null;
  image: string;
  images: string[];
  category: string;
  category_ar: string | null;
  in_stock: boolean;
  stock_quantity: number;
  popular: boolean;
  size: string | null;
  size_ar: string | null;
  volume: string | null;
  volume_ar: string | null;
  origin: string | null;
  origin_ar: string | null;
  features: string[];
  features_ar: string[];
  rating: number;
  reviews: number;
  slug: string;
}

// Конвертация из Supabase формата в формат компонентов
const convertSupabaseProduct = (product: SupabaseProduct): Product => ({
  id: product.id,
  name: product.name,
  nameAr: product.name_ar,
  description: product.description,
  descriptionAr: product.description_ar || '',
  price: product.price,
  originalPrice: product.original_price || undefined,
  image: product.image,
  images: product.images,
  category: product.category,
  categoryAr: product.category_ar || product.category,
  inStock: product.in_stock,
  stockQuantity: product.stock_quantity,
  popular: product.popular,
  size: product.size || '',
  sizeAr: product.size_ar || '',
  volume: product.volume || '',
  volumeAr: product.volume_ar || '',
  origin: product.origin || '',
  originAr: product.origin_ar || '',
  features: product.features,
  featuresAr: product.features_ar,
  rating: product.rating,
  reviews: product.reviews,
  slug: product.slug,
});

interface Props {
  categorySlug: string;
}

export function CategoryPageClient({ categorySlug }: Props) {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOptions>({ field: 'name', direction: 'asc' });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Состояние для товаров из Supabase
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Найти информацию о категории
  const currentCategory = categories.find(cat => cat.slug === categorySlug);

  // Загрузка товаров из API для конкретной категории
  useEffect(() => {
    const loadCategoryProducts = async () => {
      if (!currentCategory) {
        setError('Категория не найдена');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log(`Loading products for category: ${currentCategory.name}`);

        const response = await fetch(`/api/products?category=${encodeURIComponent(currentCategory.name)}&limit=100`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        const convertedProducts = data.products?.map(convertSupabaseProduct) || [];
        setProducts(convertedProducts);

      } catch (err) {
        console.error('Error loading category products:', err);
        setError(err instanceof Error ? err.message : 'Ошибка загрузки товаров');
      } finally {
        setLoading(false);
      }
    };

    loadCategoryProducts();
  }, [currentCategory]);

  // Обработанные и отфильтрованные товары
  const processedProducts = useMemo(() => {
    let filtered = [...products];

    // Поиск
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Сортировка
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy.field) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'rating':
          comparison = b.rating - a.rating; // По убыванию для рейтинга
          break;
        default:
          comparison = 0;
      }
      return sortBy.direction === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [products, searchQuery, sortBy]);

  if (!currentCategory) {
    return (
      <CartProvider>
        <div className="min-h-screen bg-white">
          <Navigation language={language} onLanguageChange={setLanguage} />
          <div className="container mx-auto px-4 py-12 text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'الفئة غير موجودة' : 'Category Not Found'}
            </h1>
            <p className="text-gray-600 mb-6">
              {language === 'ar' ? 'الفئة التي تبحث عنها غير موجودة.' : 'The category you are looking for does not exist.'}
            </p>
            <Link href="/categories">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === 'ar' ? 'العودة للفئات' : 'Back to Categories'}
              </Button>
            </Link>
          </div>
          <Footer language={language} />
          <CookieConsent language={language} />
        </div>
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Navigation language={language} onLanguageChange={setLanguage} />

        {/* Хлебные крошки и заголовок */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-blue-600">
                {language === 'ar' ? 'الرئيسية' : 'Home'}
              </Link>
              <span>/</span>
              <Link href="/categories" className="hover:text-blue-600">
                {language === 'ar' ? 'الفئات' : 'Categories'}
              </Link>
              <span>/</span>
              <span className="text-gray-900">
                {language === 'ar' ? currentCategory.nameAr : currentCategory.name}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {language === 'ar' ? currentCategory.nameAr : currentCategory.name}
                </h1>
                <p className="text-gray-600">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
                    </span>
                  ) : (
                    `${processedProducts.length} ${language === 'ar' ? 'منتج' : 'products'}`
                  )}
                </p>
              </div>

              <Link href="/categories">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'العودة للفئات' : 'Back to Categories'}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Фильтры и поиск */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* Поиск */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={language === 'ar' ? 'البحث في المنتجات...' : 'Search products...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Сортировка */}
            <div className="flex gap-2">
              <Select
                value={`${sortBy.field}-${sortBy.direction}`}
                onValueChange={(value) => {
                  const [field, direction] = value.split('-') as ['name' | 'price' | 'rating' | 'popular', 'asc' | 'desc'];
                  setSortBy({ field, direction });
                }}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder={language === 'ar' ? 'ترتيب حسب' : 'Sort by'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">
                    {language === 'ar' ? 'الاسم (أ-ي)' : 'Name (A-Z)'}
                  </SelectItem>
                  <SelectItem value="name-desc">
                    {language === 'ar' ? 'الاسم (ي-أ)' : 'Name (Z-A)'}
                  </SelectItem>
                  <SelectItem value="price-asc">
                    {language === 'ar' ? 'السعر (أقل إلى أعلى)' : 'Price (Low to High)'}
                  </SelectItem>
                  <SelectItem value="price-desc">
                    {language === 'ar' ? 'السعر (أعلى إلى أقل)' : 'Price (High to Low)'}
                  </SelectItem>
                  <SelectItem value="rating-desc">
                    {language === 'ar' ? 'أعلى تقييم' : 'Highest Rated'}
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Переключение вида */}
              <div className="flex rounded-md border">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Контент */}
        <div className="container mx-auto px-4 pb-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'ar' ? 'جاري تحميل المنتجات...' : 'Loading Products...'}
              </h2>
              <p className="text-gray-600">
                {language === 'ar' ? 'يرجى الانتظار بينما نحمل منتجات هذه الفئة' : 'Please wait while we load products from this category'}
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'ar' ? 'خطأ في التحميل' : 'Loading Error'}
              </h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                {language === 'ar' ? 'إعادة المحاولة' : 'Try Again'}
              </Button>
            </div>
          ) : processedProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'ar' ? 'لا توجد منتجات' : 'No Products Found'}
              </h2>
              <p className="text-gray-600">
                {language === 'ar' ? 'لا توجد منتجات في هذه الفئة حالياً.' : 'No products are currently available in this category.'}
              </p>
            </div>
          ) : (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-6'
            }>
              {processedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  language={language}
                />
              ))}
            </div>
          )}
        </div>

        <Footer language={language} />
        <CookieConsent language={language} />
      </div>
    </CartProvider>
  );
}
