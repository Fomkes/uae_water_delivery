'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
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
  RotateCcw,
  Heart,
  Share2,
  ArrowLeft,
  Plus,
  Minus,
  Package,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

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
  productSlug: string;
}

function ProductDetails({ productSlug }: Props) {
  const { addItem } = useCart();
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Состояние для товара из Supabase
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка товара из API
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(`Loading product with slug: ${productSlug}`);

        // Сначала пытаемся загрузить все товары и найти по slug
        const response = await fetch('/api/products?limit=1000');

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        // Найти товар по slug
        const foundProduct = data.products?.find((p: SupabaseProduct) => p.slug === productSlug);

        if (foundProduct) {
          const convertedProduct = convertSupabaseProduct(foundProduct);
          setProduct(convertedProduct);
        } else {
          setError('Product not found');
        }

      } catch (err) {
        console.error('Error loading product:', err);
        setError(err instanceof Error ? err.message : 'Ошибка загрузки товара');
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

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation language={language} onLanguageChange={setLanguage} />
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Package className="h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {language === 'ar' ? 'المنتج غير موجود' : 'Product Not Found'}
            </h2>
            <p className="text-gray-600 mb-6">
              {error || (language === 'ar' ? 'المنتج الذي تبحث عنه غير موجود.' : 'The product you are looking for does not exist.')}
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation language={language} onLanguageChange={setLanguage} />

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">
              {language === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-blue-600">
              {language === 'ar' ? 'المنتجات' : 'Products'}
            </Link>
            <span>/</span>
            <span className="text-gray-900">
              {language === 'ar' ? product.nameAr : product.name}
            </span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden border">
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
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {language === 'ar' ? product.nameAr : product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">
                    {product.rating} ({product.reviews} {language === 'ar' ? 'تقييم' : 'reviews'})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-blue-600">
                  AED {product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    AED {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'ar' ? 'الوصف' : 'Description'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {language === 'ar' ? product.descriptionAr : product.description}
              </p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
              <div>
                <span className="text-sm font-medium text-gray-700">
                  {language === 'ar' ? 'الحجم:' : 'Size:'}
                </span>
                <span className="text-sm text-gray-600 ml-2">
                  {language === 'ar' ? product.sizeAr : product.size}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">
                  {language === 'ar' ? 'الحجم:' : 'Volume:'}
                </span>
                <span className="text-sm text-gray-600 ml-2">
                  {language === 'ar' ? product.volumeAr : product.volume}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">
                  {language === 'ar' ? 'المنشأ:' : 'Origin:'}
                </span>
                <span className="text-sm text-gray-600 ml-2">
                  {language === 'ar' ? product.originAr : product.origin}
                </span>
              </div>
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
                <div className="flex flex-wrap gap-2">
                  {(language === 'ar' ? product.featuresAr : product.features).map((feature, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">
                  {language === 'ar' ? 'الكمية:' : 'Quantity:'}
                </span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="px-3"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 text-sm font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={increaseQuantity}
                    disabled={!product || quantity >= product.stockQuantity}
                    className="px-3"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Stock Status */}
              {product.inStock ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">
                    {language === 'ar' ? 'متوفر في المخزون' : 'In Stock'}
                  </span>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">
                    {language === 'ar' ? 'غير متوفر' : 'Out of Stock'}
                  </span>
                </div>
              )}

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAddingToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                size="lg"
              >
                {isAddingToCart ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {language === 'ar' ? 'جاري الإضافة...' : 'Adding...'}
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'أضف للسلة' : 'Add to Cart'}
                  </>
                )}
              </Button>
            </div>

            {/* Additional Actions */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1">
                <Heart className="w-4 h-4 mr-2" />
                {language === 'ar' ? 'أضف للمفضلة' : 'Add to Wishlist'}
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                {language === 'ar' ? 'مشاركة' : 'Share'}
              </Button>
            </div>
          </div>
        </div>

        {/* Features Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card>
            <CardContent className="flex items-center p-6">
              <Truck className="w-8 h-8 text-blue-600 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {language === 'ar' ? 'توصيل سريع' : 'Fast Delivery'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'توصيل في نفس اليوم' : 'Same-day delivery'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <Shield className="w-8 h-8 text-blue-600 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {language === 'ar' ? 'جودة مضمونة' : 'Quality Guaranteed'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? '100% نقي وآمن' : '100% pure and safe'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <RotateCcw className="w-8 h-8 text-blue-600 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {language === 'ar' ? 'سهولة الإرجاع' : 'Easy Returns'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'إرجاع مجاني خلال 7 أيام' : '7-day free returns'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer language={language} />
      <CookieConsent language={language} />
    </div>
  );
}

export function ProductPageClient({ productSlug }: Props) {
  return (
    <CartProvider>
      <ProductDetails productSlug={productSlug} />
    </CartProvider>
  );
}
