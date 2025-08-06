'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { CartProvider, useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products } from '@/data/products';
import { Product } from '@/types';
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  CheckCircle,
  Plus,
  Minus,
  ArrowLeft,
  ThumbsUp,
  Calendar,
  User
} from 'lucide-react';

interface ProductPageClientProps {
  product: Product;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Navigation language={language} onLanguageChange={setLanguage} />
        <ProductPageContent language={language} product={product} />
        <Footer language={language} />
        <CookieConsent language={language} />
      </div>
    </CartProvider>
  );
}

interface ProductPageContentProps {
  language: 'en' | 'ar';
  product: Product;
}

function ProductPageContent({ language, product }: ProductPageContentProps) {
  const { addItem } = useCart();
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      addItem(product, quantity);
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsLoading(false);
    }
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const reviews = [
    {
      id: 1,
      name: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      rating: 5,
      date: '2024-01-15',
      comment: language === 'ar'
        ? 'منتج ممتاز وتوصيل سريع. سأطلب مرة أخرى بالتأكيد!'
        : 'Excellent product and fast delivery. Will definitely order again!',
      verified: true
    },
    {
      id: 2,
      name: language === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
      rating: 5,
      date: '2024-01-10',
      comment: language === 'ar'
        ? 'أفضل مياه جربتها في دبي. طعم رائع وجودة عالية.'
        : 'Best water I\'ve tried in Dubai. Great taste and high quality.',
      verified: true
    },
    {
      id: 3,
      name: language === 'ar' ? 'محمد خالد' : 'Mohammed Khalid',
      rating: 4,
      date: '2024-01-05',
      comment: language === 'ar'
        ? 'منتج جيد جداً، التغليف ممتاز والتوصيل في الوقت المحدد.'
        : 'Very good product, excellent packaging and on-time delivery.',
      verified: false
    }
  ];

  const features = [
    {
      icon: Truck,
      title: language === 'ar' ? 'توصيل مجاني' : 'Free Delivery',
      description: language === 'ar' ? 'للطلبات أكثر من 50€' : 'On orders over €50',
    },
    {
      icon: Shield,
      title: language === 'ar' ? 'ضمان الجودة' : 'Quality Guarantee',
      description: language === 'ar' ? '100% مياه نقية' : '100% pure water',
    },
    {
      icon: RotateCcw,
      title: language === 'ar' ? 'إرجاع سهل' : 'Easy Returns',
      description: language === 'ar' ? 'خلال 7 أيام' : 'Within 7 days',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-blue-600">
              {language === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/products" className="text-gray-500 hover:text-blue-600">
              {language === 'ar' ? 'المنتجات' : 'Products'}
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900">
              {language === 'ar' ? product.nameAr : product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src={product.images[currentImage] || product.image}
                alt={language === 'ar' ? product.nameAr : product.name}
                fill
                className="object-cover"
                priority
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">

                {product.popular && (
                  <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    {language === 'ar' ? 'شائع' : 'Popular'}
                  </Badge>
                )}
                {product.originalPrice && (
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    {language === 'ar' ? 'خصم' : 'Sale'}
                  </Badge>
                )}
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/80 backdrop-blur-sm"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/80 backdrop-blur-sm"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 ${
                      currentImage === index ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${language === 'ar' ? product.nameAr : product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {language === 'ar' ? product.nameAr : product.name}
              </h1>
              <p className="text-lg text-gray-600">
                {language === 'ar' ? product.sizeAr : product.size}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} {language === 'ar' ? 'تقييم' : 'reviews'})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              {product.originalPrice && (
                <span className="text-2xl text-gray-500 line-through">
                  €{product.originalPrice}
                </span>
              )}
              <span className="text-3xl font-bold text-blue-600">
                €{product.price}
              </span>
              {product.originalPrice && (
                <Badge className="bg-green-100 text-green-800">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  {language === 'ar' ? ' خصم' : ' OFF'}
                </Badge>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-medium">
                    {language === 'ar' ? 'متوفر في المخزون' : 'In Stock'}
                  </span>
                  {product.stockQuantity <= 10 && (
                    <span className="text-orange-600 text-sm">
                      ({product.stockQuantity} {language === 'ar' ? 'متبقي' : 'left'})
                    </span>
                  )}
                </>
              ) : (
                <span className="text-red-600 font-medium">
                  {language === 'ar' ? 'نفد المخزون' : 'Out of Stock'}
                </span>
              )}
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

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {language === 'ar' ? 'المميزات' : 'Features'}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {(language === 'ar' ? product.featuresAr : product.features).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">
                  {language === 'ar' ? 'الكمية:' : 'Quantity:'}
                </span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock || isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {language === 'ar' ? 'جاري الإضافة...' : 'Adding...'}
                  </div>
                ) : !product.inStock ? (
                  language === 'ar' ? 'نفد المخزون' : 'Out of Stock'
                ) : (
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    {language === 'ar' ? 'أضف للسلة' : 'Add to Cart'}
                  </div>
                )}
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{feature.title}</p>
                      <p className="text-xs text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">
                {language === 'ar' ? 'التفاصيل' : 'Details'}
              </TabsTrigger>
              <TabsTrigger value="reviews">
                {language === 'ar' ? 'التقييمات' : 'Reviews'} ({product.reviews})
              </TabsTrigger>
              <TabsTrigger value="delivery">
                {language === 'ar' ? 'التوصيل' : 'Delivery'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        {language === 'ar' ? 'معلومات المنتج' : 'Product Information'}
                      </h4>
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-gray-600">{language === 'ar' ? 'الحجم:' : 'Size:'}</dt>
                          <dd className="font-medium">{language === 'ar' ? product.sizeAr : product.size}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">{language === 'ar' ? 'الحجم:' : 'Volume:'}</dt>
                          <dd className="font-medium">{language === 'ar' ? product.volumeAr : product.volume}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">{language === 'ar' ? 'المصدر:' : 'Origin:'}</dt>
                          <dd className="font-medium">{language === 'ar' ? product.originAr : product.origin}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">{language === 'ar' ? 'الفئة:' : 'Category:'}</dt>
                          <dd className="font-medium">{language === 'ar' ? product.categoryAr : product.category}</dd>
                        </div>
                      </dl>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        {language === 'ar' ? 'المواصفات' : 'Specifications'}
                      </h4>
                      <ul className="space-y-2">
                        {(language === 'ar' ? product.featuresAr : product.features).map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">{review.name}</span>
                                {review.verified && (
                                  <Badge variant="secondary" className="text-xs">
                                    {language === 'ar' ? 'مشترٍ موثق' : 'Verified Purchase'}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex">
                                  {Array.from({ length: 5 }, (_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? 'fill-yellow-400 text-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {review.date}
                                </span>
                              </div>
                            </div>
                          </div>

                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="w-4 h-4" />
                          </Button>
                        </div>

                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="delivery" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        {language === 'ar' ? 'مناطق التوصيل' : 'Delivery Areas'}
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>{language === 'ar' ? '• دبي: نفس اليوم' : '• Dubai: Same day'}</li>
                        <li>{language === 'ar' ? '• أبوظبي: نفس اليوم' : '• Abu Dhabi: Same day'}</li>
                        <li>{language === 'ar' ? '• الشارقة: 1-2 أيام' : '• Sharjah: 1-2 days'}</li>
                        <li>{language === 'ar' ? '• باقي الإمارات: 2-3 أيام' : '• Other Emirates: 2-3 days'}</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        {language === 'ar' ? 'رسوم التوصيل' : 'Delivery Charges'}
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>{language === 'ar' ? '• مجاني للطلبات أكثر من 50€' : '• Free on orders over €50'}</li>
                        <li>{language === 'ar' ? '• دبي وأبوظبي: 15€' : '• Dubai & Abu Dhabi: €15'}</li>
                        <li>{language === 'ar' ? '• باقي الإمارات: 25€' : '• Other Emirates: €25'}</li>
                        <li>{language === 'ar' ? '• التوصيل السريع: +10€' : '• Express delivery: +€10'}</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {language === 'ar' ? 'منتجات ذات صلة' : 'Related Products'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  language={language}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
