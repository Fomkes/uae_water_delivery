'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { LanguageSelector } from '@/components/LanguageSelector';
import { CartProvider } from '@/contexts/CartContext';
import { getPopularProducts, categories } from '@/data/products';
import { Product } from '@/types';
import {
  Droplets,
  Truck,
  Shield,
  Clock,
  Star,
  Users,
  MapPin,
  Phone,
  CheckCircle,
  ArrowRight,
  Award
} from 'lucide-react';

export default function HomePage() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);

  useEffect(() => {
    // Check if language was already selected
    const savedLanguage = localStorage.getItem('selected-language');
    if (savedLanguage) {
      setLanguage(savedLanguage as 'en' | 'ar');
      setIsLanguageSelected(true);
    }
  }, []);

  const handleLanguageSelect = (selectedLanguage: 'en' | 'ar') => {
    setLanguage(selectedLanguage);
    setIsLanguageSelected(true);
  };

  const [popularProducts, setPopularProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Загружаем популярные товары из API (Supabase)
    const loadPopularProducts = async () => {
      try {
        const response = await fetch('/api/products?popular=true&limit=4');
        if (response.ok) {
          const data = await response.json();
          // Конвертируем Supabase формат в формат компонентов
          const convertedProducts = data.products?.map((product: {
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
          }) => ({
            id: product.id,
            name: product.name,
            nameAr: product.name_ar,
            description: product.description,
            descriptionAr: product.description_ar || '',
            price: product.price,
            originalPrice: product.original_price,
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
          })) || [];

          setPopularProducts(convertedProducts);
        } else {
          // Fallback на статичные данные при ошибке
          setPopularProducts(getPopularProducts().slice(0, 4));
        }
      } catch (error) {
        console.error('Error loading popular products:', error);
        // Fallback на статичные данные при ошибке
        setPopularProducts(getPopularProducts().slice(0, 4));
      }
    };

    if (isLanguageSelected) {
      loadPopularProducts();
    }
  }, [isLanguageSelected]);


  const features = [
    {
      icon: Truck,
      title: language === 'ar' ? 'توصيل سريع' : 'Fast Delivery',
      description: language === 'ar' ? 'توصيل في نفس اليوم في دبي وأبوظبي' : 'Same-day delivery in Dubai & Abu Dhabi',
    },
    {
      icon: Shield,
      title: language === 'ar' ? 'جودة مضمونة' : 'Quality Guaranteed',
      description: language === 'ar' ? 'مياه نقية 100% مع ضمان الجودة' : '100% pure water with quality assurance',
    },
    {
      icon: Clock,
      title: language === 'ar' ? 'خدمة 24/7' : '24/7 Service',
      description: language === 'ar' ? 'خدمة العملاء متاحة طوال الوقت' : 'Customer service available round the clock',
    },
    {
      icon: Award,
      title: language === 'ar' ? 'أسعار تنافسية' : 'Competitive Prices',
      description: language === 'ar' ? 'أفضل الأسعار في السوق' : 'Best prices in the market',
    },
  ];

  const stats = [
    {
      number: '50,000+',
      label: language === 'ar' ? 'عميل راضٍ' : 'Happy Customers',
    },
    {
      number: '1M+',
      label: language === 'ar' ? 'لتر تم توصيله' : 'Liters Delivered',
    },
    {
      number: '24/7',
      label: language === 'ar' ? 'خدمة العملاء' : 'Customer Support',
    },
    {
      number: '99.9%',
      label: language === 'ar' ? 'معدل الرضا' : 'Satisfaction Rate',
    },
  ];

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        {!isLanguageSelected && (
          <LanguageSelector onLanguageSelect={handleLanguageSelect} />
        )}

        <Navigation language={language} onLanguageChange={setLanguage} />

        {/* Hero Section */}
        <section className="relative bg-white">
          <div className="container mx-auto px-4 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Badge className="bg-blue-600 text-white px-4 py-2 text-sm font-medium">
                    {language === 'ar' ? 'توصيل مجاني للطلبات أكثر من 50€' : 'Free delivery on orders over €50'}
                  </Badge>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    {language === 'ar' ? (
                      <>
                        خدمة توصيل <span className="text-blue-600">المياه</span><br />
                        الأولى في الإمارات
                      </>
                    ) : (
                      <>
                        Premier <span className="text-blue-600">Water</span><br />
                        Delivery Service in UAE
                      </>
                    )}
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                    {language === 'ar'
                      ? 'نوفر أعلى جودة من المياه النقية مع خدمة توصيل موثوقة وسريعة في جميع أنحاء دولة الإمارات العربية المتحدة.'
                      : 'High quality pure water with reliable and fast delivery service across the United Arab Emirates.'
                    }
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/products">
                    <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-medium">
                      {language === 'ar' ? 'تسوق الآن' : 'Shop Now'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-3 border-gray-300 text-gray-700">
                      {language === 'ar' ? 'اعرف المزيد' : 'Learn More'}
                    </Button>
                  </Link>
                </div>

                {/* Contact Info */}
                <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">+971 4 123 4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {language === 'ar' ? 'جميع أنحاء الإمارات' : 'All UAE Areas'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src="https://wildernessawareness.org/wp-content/uploads/2020/03/samara-doole-Gpr19A5NsP0-unsplash.jpg"
                    alt="Quality Water Bottles"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Trust Badges */}
                <div className="absolute -bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-sm text-gray-900">
                        {language === 'ar' ? 'جودة مضمونة' : 'Quality Assured'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-sm text-gray-900">
                        {language === 'ar' ? 'توصيل سريع' : 'Fast Delivery'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {language === 'ar' ? 'لماذا تختارنا؟' : 'Why Choose Us?'}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {language === 'ar'
                  ? 'نحن ملتزمون بتقديم أفضل خدمة توصيل مياه في دولة الإمارات العربية المتحدة'
                  : 'We are committed to providing the finest water delivery experience across the UAE'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="text-center p-6 bg-white border border-gray-200 hover:border-blue-300 transition-colors">
                    <CardContent className="space-y-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Popular Products */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {language === 'ar' ? 'المنتجات الشائعة' : 'Popular Products'}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {language === 'ar'
                  ? 'اكتشف أكثر منتجاتنا مبيعاً والتي يفضلها عملاؤنا'
                  : 'Discover our best-selling products loved by thousands of customers'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularProducts.map((product) => (
                <ProductCard key={product.id} product={product} language={language} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/products">
                <Button size="lg" variant="outline" className="px-8 border-gray-300 text-gray-700">
                  {language === 'ar' ? 'عرض جميع المنتجات' : 'View All Products'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {language === 'ar' ? 'تسوق حسب الفئة' : 'Shop by Category'}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {language === 'ar'
                  ? 'من المياه العادية إلى المياه الفاخرة، اختر ما يناسب احتياجاتك'
                  : 'From everyday hydration to specialized options, find what suits your needs'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.slice(0, 6).map((category) => (
                <Link key={category.id} href={`/categories/${category.slug}`}>
                  <Card className="group overflow-hidden bg-white border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={category.image}
                        alt={language === 'ar' ? category.nameAr : category.name}
                        fill
                        className="object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-lg font-semibold">{language === 'ar' ? category.nameAr : category.name}</h3>
                        <p className="text-sm opacity-90">{category.productCount} {language === 'ar' ? 'منتجات' : 'products'}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>



        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'ar' ? 'جاهز للبدء؟' : 'Ready to Get Started?'}
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-300">
              {language === 'ar'
                ? 'اطلب الآن واستمتع بتوصيل سريع ومياه نقية عالية الجودة'
                : 'Order now and enjoy fast delivery of high quality pure water'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto px-8 bg-blue-600 hover:bg-blue-700">
                  {language === 'ar' ? 'ابدأ التسوق' : 'Start Shopping'}
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto px-8 bg-gray-700 hover:bg-gray-600 text-white border-gray-600">
                  {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer language={language} />
        <CookieConsent language={language} />
      </div>
    </CartProvider>
  );
}
