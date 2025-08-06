'use client';

import { useState, useMemo, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { CartProvider } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories } from '@/data/products'; // Только категории остаются статичными
import { FilterOptions, SortOptions, Product } from '@/types';
import { Search, Filter, Grid, List, SlidersHorizontal, Package, Loader2 } from 'lucide-react';

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
  created_at: string;
  updated_at: string;
}

// Конвертер типов для совместимости
const convertSupabaseProduct = (product: SupabaseProduct) => ({
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

export default function ProductsPage() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortBy, setSortBy] = useState<SortOptions>({ field: 'name', direction: 'asc' });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Состояние для товаров из Supabase
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка товаров из API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/products?limit=100');

        if (!response.ok) {
          throw new Error('Ошибка загрузки товаров');
        }

        const data = await response.json();
        const convertedProducts = data.products.map(convertSupabaseProduct);
        setProducts(convertedProducts);

      } catch (err) {
        console.error('Error loading products:', err);
        setError(err instanceof Error ? err.message : 'Ошибка загрузки товаров');

        // Fallback на статичные данные при ошибке
        const { products: fallbackProducts } = await import('@/data/products');
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    if (loading || products.length === 0) return [];

    const filtered = products.filter(product => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query) ||
                           product.nameAr.toLowerCase().includes(query);
        const matchesDescription = product.description.toLowerCase().includes(query) ||
                                  product.descriptionAr.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);

        if (!matchesName && !matchesDescription && !matchesCategory) {
          return false;
        }
      }

      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Stock filter
      if (filters.inStock !== undefined && product.inStock !== filters.inStock) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (product.price < min || product.price > max) {
          return false;
        }
      }

      return true;
    });

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      let aValue, bValue;

      switch (sortBy.field) {
        case 'name':
          aValue = language === 'ar' ? a.nameAr : a.name;
          bValue = language === 'ar' ? b.nameAr : b.name;
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'popular':
          aValue = a.popular ? 1 : 0;
          bValue = b.popular ? 1 : 0;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (sortBy.direction === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return sorted;
  }, [products, searchQuery, filters, sortBy, language, loading]);

  const handleFilterChange = (key: keyof FilterOptions, value: string | boolean | [number, number] | undefined) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  const priceRanges = [
    { label: language === 'ar' ? 'جميع الأسعار' : 'All Prices', value: undefined },
    { label: '€0 - €25', value: [0, 25] as [number, number] },
    { label: '€25 - €50', value: [25, 50] as [number, number] },
    { label: '€50 - €75', value: [50, 75] as [number, number] },
    { label: '€75+', value: [75, 1000] as [number, number] },
  ];

  // Loading state
  if (loading) {
    return (
      <CartProvider>
        <div className="min-h-screen bg-white">
          <Navigation language={language} onLanguageChange={setLanguage} />

          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'ar' ? 'جاري تحميل المنتجات...' : 'Loading Products...'}
              </h2>
              <p className="text-gray-600">
                {language === 'ar' ? 'يرجى الانتظار بينما نحمل أحدث المنتجات' : 'Please wait while we load the latest products'}
              </p>
            </div>
          </div>

          <Footer language={language} />
          <CookieConsent language={language} />
        </div>
      </CartProvider>
    );
  }

  // Error state
  if (error && products.length === 0) {
    return (
      <CartProvider>
        <div className="min-h-screen bg-white">
          <Navigation language={language} onLanguageChange={setLanguage} />

          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <Package className="h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'ar' ? 'خطأ في تحميل المنتجات' : 'Error Loading Products'}
              </h2>
              <p className="text-gray-600 mb-4">
                {error}
              </p>
              <Button onClick={() => window.location.reload()}>
                {language === 'ar' ? 'إعادة المحاولة' : 'Try Again'}
              </Button>
            </div>
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

        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm">
              <span className="text-gray-500">{language === 'ar' ? 'الرئيسية' : 'Home'}</span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">{language === 'ar' ? 'المنتجات' : 'Products'}</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <section className="bg-white py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {language === 'ar' ? 'جميع المنتجات' : 'All Products'}
                </h1>
                <p className="text-gray-600">
                  {language === 'ar'
                    ? 'اكتشف مجموعتنا الكاملة من المياه النقية عالية الجودة'
                    : 'Discover our complete collection of high quality pure water'
                  }
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                <span className="text-lg font-semibold text-gray-900">
                  {filteredAndSortedProducts.length} {language === 'ar' ? 'منتج' : 'Products'}
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Filter className="w-5 h-5 text-blue-600" />
                    {language === 'ar' ? 'تصفية النتائج' : 'Filter Products'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'البحث' : 'Search'}
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder={language === 'ar' ? 'ابحث عن المنتجات...' : 'Search products...'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 border-gray-300"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'الفئة' : 'Category'}
                    </label>
                    <Select
                      value={filters.category || ''}
                      onValueChange={(value) => handleFilterChange('category', value || undefined)}
                    >
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder={language === 'ar' ? 'جميع الفئات' : 'All Categories'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">
                          {language === 'ar' ? 'جميع الفئات' : 'All Categories'}
                        </SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {language === 'ar' ? category.nameAr : category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'نطاق السعر' : 'Price Range'}
                    </label>
                    <Select
                      value={filters.priceRange ? `${filters.priceRange[0]}-${filters.priceRange[1]}` : ''}
                      onValueChange={(value) => {
                        const range = priceRanges.find(r => r.value && `${r.value[0]}-${r.value[1]}` === value);
                        handleFilterChange('priceRange', range?.value);
                      }}
                    >
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder={language === 'ar' ? 'جميع الأسعار' : 'All Prices'} />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map((range, index) => (
                          <SelectItem key={index} value={range.value ? `${range.value[0]}-${range.value[1]}` : ''}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Stock Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {language === 'ar' ? 'التوفر' : 'Availability'}
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="stock"
                          checked={filters.inStock === undefined}
                          onChange={() => handleFilterChange('inStock', undefined)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">{language === 'ar' ? 'الكل' : 'All'}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="stock"
                          checked={filters.inStock === true}
                          onChange={() => handleFilterChange('inStock', true)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">{language === 'ar' ? 'متوفر' : 'In Stock'}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="stock"
                          checked={filters.inStock === false}
                          onChange={() => handleFilterChange('inStock', false)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">{language === 'ar' ? 'غير متوفر' : 'Out of Stock'}</span>
                      </label>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <Button variant="outline" onClick={clearFilters} className="w-full border-gray-300">
                    {language === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Toolbar */}
              <Card className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="lg:hidden border-gray-300"
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                        {language === 'ar' ? 'فلاتر' : 'Filters'}
                      </Button>

                      <span className="text-sm text-gray-600">
                        {language === 'ar' ? 'عرض' : 'Showing'} {filteredAndSortedProducts.length} {language === 'ar' ? 'منتج' : 'products'}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Sort */}
                      <Select
                        value={`${sortBy.field}-${sortBy.direction}`}
                        onValueChange={(value) => {
                          const [field, direction] = value.split('-') as [SortOptions['field'], SortOptions['direction']];
                          setSortBy({ field, direction });
                        }}
                      >
                        <SelectTrigger className="w-48 border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name-asc">
                            {language === 'ar' ? 'الاسم: أ-ي' : 'Name: A-Z'}
                          </SelectItem>
                          <SelectItem value="name-desc">
                            {language === 'ar' ? 'الاسم: ي-أ' : 'Name: Z-A'}
                          </SelectItem>
                          <SelectItem value="price-asc">
                            {language === 'ar' ? 'السعر: من الأقل' : 'Price: Low to High'}
                          </SelectItem>
                          <SelectItem value="price-desc">
                            {language === 'ar' ? 'السعر: من الأكثر' : 'Price: High to Low'}
                          </SelectItem>
                          <SelectItem value="rating-desc">
                            {language === 'ar' ? 'التقييم: الأعلى' : 'Rating: Highest'}
                          </SelectItem>
                          <SelectItem value="popular-desc">
                            {language === 'ar' ? 'الأكثر شيوعاً' : 'Most Popular'}
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      {/* View Mode */}
                      <div className="flex border border-gray-300 rounded-md">
                        <Button
                          variant={viewMode === 'grid' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setViewMode('grid')}
                          className="rounded-r-none"
                        >
                          <Grid className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={viewMode === 'list' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setViewMode('list')}
                          className="rounded-l-none"
                        >
                          <List className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Products Grid */}
              {filteredAndSortedProducts.length > 0 ? (
                <div className={viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
                }>
                  {filteredAndSortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      language={language}
                    />
                  ))}
                </div>
              ) : (
                <Card className="border border-gray-200">
                  <CardContent className="text-center py-16">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Search className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {language === 'ar' ? 'لم يتم العثور على منتجات' : 'No products found'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {language === 'ar'
                        ? 'جرب تغيير الفلاتر أو البحث بكلمات مختلفة'
                        : 'Try adjusting your filters or search with different keywords'
                      }
                    </p>
                    <Button onClick={clearFilters} className="bg-blue-600 hover:bg-blue-700">
                      {language === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        <Footer language={language} />
        <CookieConsent language={language} />
      </div>
    </CartProvider>
  );
}
