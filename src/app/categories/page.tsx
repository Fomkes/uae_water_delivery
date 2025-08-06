'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { CartProvider } from '@/contexts/CartContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/data/products';
import { ArrowRight } from 'lucide-react';

export default function CategoriesPage() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Navigation language={language} onLanguageChange={setLanguage} />

        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm">
              <span className="text-gray-500">{language === 'ar' ? 'الرئيسية' : 'Home'}</span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">{language === 'ar' ? 'الفئات' : 'Categories'}</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'فئات المنتجات' : 'Product Categories'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'ar'
                ? 'استكشف مجموعتنا المتنوعة من المياه النقية عالية الجودة في فئات مختلفة'
                : 'Explore our diverse collection of high quality pure water in different categories'
              }
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link key={category.id} href={`/categories/${category.slug}`}>
                  <Card className="group overflow-hidden bg-white border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-lg">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={category.image}
                        alt={language === 'ar' ? category.nameAr : category.name}
                        fill
                        className="object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold">{language === 'ar' ? category.nameAr : category.name}</h3>
                        <p className="text-sm opacity-90">
                          {category.productCount} {language === 'ar' ? 'منتجات' : 'products'}
                        </p>
                      </div>
                      <Badge className="absolute top-4 right-4 bg-blue-600 text-white">
                        {language === 'ar' ? 'تسوق الآن' : 'Shop Now'}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-gray-600 mb-4">
                        {language === 'ar' ? category.descriptionAr : category.description}
                      </p>
                      <div className="flex items-center text-blue-600 font-medium">
                        <span>{language === 'ar' ? 'عرض المنتجات' : 'View Products'}</span>
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer language={language} />
        <CookieConsent language={language} />
      </div>
    </CartProvider>
  );
}
