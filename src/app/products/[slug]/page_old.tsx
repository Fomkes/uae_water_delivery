'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { CartProvider, useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { categories } from '@/data/products';
import { Product } from '@/types';
import {
  ShoppingCart,
  Star,
  Truck,
  Shield,
  ArrowLeft,
  Plus,
  Minus,
  Package,
  Loader2,
  Check,
  Heart,
  Share2,
  MapPin,
  Clock
} from 'lucide-react';

// Типы для продукта из Supabase
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

function ProductPageContent() {
  const params = useParams();
  const productSlug = params.slug as string;
  const { addItem } = useCart();

  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Загрузка товара из API по slug
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // Сначала получаем все товары и ищем по slug
        const response = await fetch('/api/products?limit=1000');

        if (!response.ok) {
          throw new Error('Ошибка загрузки товара');
        }

        const data = await response.json();
        const foundProduct = data.products.find((p: SupabaseProduct) => p.slug === productSlug);

        if (!foundProduct) {
          setError('Товар не найден');
          return;
        }

        const convertedProduct = convertSupabaseProduct(foundProduct);
        setProduct(convertedProduct);

      } catch (err) {
        console.error('Error loading product:', err);
        setError(err instanceof Error ? err.message : 'Ошибка загрузки товара');

        // Fallback на статичные данные при ошибке
        try {
          const { products: fallbackProducts } = await import('@/data/products');
          const fallbackProduct = fallbackProducts.find(p => p.slug === productSlug);
          if (fallbackProduct) {
            setProduct(fallbackProduct);
            setError(null);
          }
        } catch (fallbackError) {
          console.error('Fallback error:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productSlug]);

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAddingToCart(true);

    try {
      addItem(product, quantity);

      // Simulated delay for UX
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsAddingToCart(false);
    }
  };

  const increaseQuantity = () => {
    if (product && quantity < product.stockQuantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation language={language} onLanguageChange={setLanguage} />

        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {language === 'ar' ? 'جاري تحميل المنتج...' : 'Loading Product...'}
            </h2>
            <p className="text-gray-600">
              {language === 'ar' ? 'يرجى الانتظار بينما نحمل تفاصيل المنتج' : 'Please wait while we load the product details'}
            </p>
          </div>
        </div>

        <Footer language={language} />
        <CookieConsent language={language} />
      </div>
    );
  }

  // Error state or product not found
  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation language={language} onLanguageChange={setLanguage} />

        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Package className="h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {language === 'ar' ? 'المنتج غير موجود' : 'Product Not Found'}
            </h2>
            <p className="text-gray-600 mb-4">
              {error || (language === 'ar'
                ? 'المنتج الذي تبحث عنه غير موجود أو تم حذفه'
                : 'The product you are looking for does not exist or has been removed'
              )}
            </p>
            <Link href="/products">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === 'ar' ? 'العودة للمنتجات' : 'Back to Products'}
              </Button>
            </Link>
          </div>
        </div>

        <Footer language={language} />
        <CookieConsent language={language} />
      </div>
    );
  }

  // Find the category for breadcrumb
  const category = categories.find(cat => cat.name === product.category);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation language={language} onLanguageChange={setLanguage} />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              {language === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/products" className="text-gray-500 hover:text-gray-700">
              {language === 'ar' ? 'المنتجات' : 'Products'}
            </Link>
            {category && (
              <>
                <span className="text-gray-300">/</span>
                <Link href={`/categories/${category.slug}`} className="text-gray-500 hover:text-gray-700">
                  {language === 'ar' ? category.nameAr : category.name}
                </Link>
              </>
            )}
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">
              {language === 'ar' ? product.nameAr : product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg border border-gray-200 overflow-hidden">
              <Image
                src={product.images[selectedImageIndex] || product.image}
                alt={language === 'ar' ? product.nameAr : product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-white rounded border-2 overflow-hidden transition-colors ${
                      selectedImageIndex === index
                        ? 'border-blue-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} image ${index + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.popular && (
                  <Badge className="bg-blue-600 text-white">
                    {language === 'ar' ? 'شائع' : 'Popular'}
                  </Badge>
                )}
                {!product.inStock && (
                  <Badge variant="destructive">
                    {language === 'ar' ? 'نفد المخزون' : 'Out of Stock'}
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {language === 'ar' ? product.nameAr : product.name}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews} {language === 'ar' ? 'تقييم' : 'reviews'})
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  €{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    €{product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <Badge variant="destructive">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% {language === 'ar' ? 'خصم' : 'OFF'}
                  </Badge>
                )}
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {language === 'ar' ? 'الوصف' : 'Description'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {language === 'ar' ? product.descriptionAr : product.description}
              </p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4">
              {product.size && (
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    {language === 'ar' ? 'الحجم:' : 'Size:'}
                  </span>
                  <span className="text-sm text-gray-600 ml-2">
                    {language === 'ar' ? product.sizeAr : product.size}
                  </span>
                </div>
              )}
              {product.volume && (
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    {language === 'ar' ? 'الحجم:' : 'Volume:'}
                  </span>
                  <span className="text-sm text-gray-600 ml-2">
                    {language === 'ar' ? product.volumeAr : product.volume}
                  </span>
                </div>
              )}
              {product.origin && (
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    {language === 'ar' ? 'المنشأ:' : 'Origin:'}
                  </span>
                  <span className="text-sm text-gray-600 ml-2">
                    {language === 'ar' ? product.originAr : product.origin}
                  </span>
                </div>
              )}
              <div>
                <span className="text-sm font-medium text-gray-700">
                  {language === 'ar' ? 'المتوفر:' : 'Stock:'}
                </span>
                <span className="text-sm text-gray-600 ml-2">
                  {product.stockQuantity} {language === 'ar' ? 'قطعة' : 'units'}
                </span>
              </div>
            </div>

            {/* Features */}
            {product.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {language === 'ar' ? 'المميزات' : 'Features'}
                </h3>
                <ul className="space-y-2">
                  {(language === 'ar' ? product.featuresAr : product.features).map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator />

            {/* Add to Cart */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">
                  {language === 'ar' ? 'الكمية:' : 'Quantity:'}
                </span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="rounded-r-none"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={increaseQuantity}
                    disabled={!product || quantity >= product.stockQuantity}
                    className="rounded-l-none"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAddingToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  {isAddingToCart ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <ShoppingCart className="w-4 h-4 mr-2" />
                  )}
                  {language === 'ar' ? 'أضف للسلة' : 'Add to Cart'}
                </Button>

                <Button variant="outline" size="lg" className="border-gray-300">
                  <Heart className="w-4 h-4" />
                </Button>

                <Button variant="outline" size="lg" className="border-gray-300">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>

              {!product.inStock && (
                <p className="text-sm text-red-600">
                  {language === 'ar' ? 'هذا المنتج غير متوفر حالياً' : 'This product is currently out of stock'}
                </p>
              )}
            </div>

            <Separator />

            {/* Delivery Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {language === 'ar' ? 'توصيل مجاني' : 'Free Delivery'}
                  </p>
                  <p className="text-xs text-gray-600">
                    {language === 'ar' ? 'للطلبات أكثر من 50€' : 'On orders over €50'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {language === 'ar' ? 'توصيل سريع' : 'Fast Delivery'}
                  </p>
                  <p className="text-xs text-gray-600">
                    {language === 'ar' ? 'في نفس اليوم في دبي وأبوظبي' : 'Same day in Dubai & Abu Dhabi'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {language === 'ar' ? 'جودة مضمونة' : 'Quality Guaranteed'}
                  </p>
                  <p className="text-xs text-gray-600">
                    {language === 'ar' ? '100% مياه نقية' : '100% pure water'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer language={language} />
      <CookieConsent language={language} />
    </div>
  );
}

export default function ProductPage() {
  return (
    <CartProvider>
      <ProductPageContent />
    </CartProvider>
  );
}
