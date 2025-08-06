'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { CartProvider } from '@/contexts/CartContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  Search,
  Filter,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { blogArticles, getFeaturedArticles, getAllCategories } from '@/data/blog';

export default function BlogPage() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const featuredArticles = getFeaturedArticles();
  const categories = getAllCategories();

  const filteredArticles = blogArticles.filter(article => {
    const matchesSearch = searchTerm === '' ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.titleAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerptAr.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === '' || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'ar'
      ? date.toLocaleDateString('ar-AE')
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Navigation language={language} onLanguageChange={setLanguage} />

        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                {language === 'ar' ? 'الرئيسية' : 'Home'}
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">
                {language === 'ar' ? 'المدونة' : 'Blog'}
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 mr-3" />
                <h1 className="text-4xl md:text-5xl font-bold">
                  {language === 'ar' ? 'مدونة المعرفة المائية' : 'Water Knowledge Hub'}
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                {language === 'ar'
                  ? 'اكتشف أحدث الأبحاث العلمية والابتكارات في علوم المياه والصحة'
                  : 'Discover the latest scientific research and innovations in water science and health'
                }
              </p>
              <div className="flex items-center justify-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                <span className="text-lg">
                  {language === 'ar' ? 'أكثر من 50,000 قارئ شهرياً' : 'Over 50,000 monthly readers'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {language === 'ar' ? 'المقالات المميزة' : 'Featured Articles'}
                </h2>
                <p className="text-xl text-gray-600">
                  {language === 'ar'
                    ? 'أهم المقالات البحثية والاكتشافات في علوم المياه'
                    : 'Top research articles and discoveries in water science'
                  }
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {featuredArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative">
                      <img
                        src={article.image}
                        alt={language === 'ar' ? article.titleAr : article.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-orange-500 text-white">
                          {language === 'ar' ? 'مميز' : 'Featured'}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary">
                          {language === 'ar' ? article.categoryAr : article.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {language === 'ar' ? article.authorAr : article.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(article.publishDate)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {article.readTime} {language === 'ar' ? 'دقيقة' : 'min read'}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {language === 'ar' ? article.titleAr : article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {language === 'ar' ? article.excerptAr : article.excerpt}
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        {language === 'ar' ? article.authorTitleAr : article.authorTitle}
                      </p>
                      <Link href={`/blog/${article.slug}`}>
                        <Button className="w-full">
                          {language === 'ar' ? 'اقرأ المقال كاملاً' : 'Read Full Article'}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Search and Filter */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder={language === 'ar' ? 'ابحث في المقالات...' : 'Search articles...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-4">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 bg-white"
                >
                  <option value="">
                    {language === 'ar' ? 'جميع الفئات' : 'All Categories'}
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* All Articles */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {language === 'ar' ? 'جميع المقالات' : 'All Articles'}
              </h2>
              <p className="text-lg text-gray-600">
                {filteredArticles.length} {language === 'ar' ? 'مقال متاح' : 'articles available'}
              </p>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {language === 'ar' ? 'لا توجد مقالات' : 'No articles found'}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar'
                    ? 'جرب البحث بكلمات مختلفة أو تغيير الفئة'
                    : 'Try searching with different keywords or changing the category'
                  }
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={article.image}
                        alt={language === 'ar' ? article.titleAr : article.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary">
                          {language === 'ar' ? article.categoryAr : article.category}
                        </Badge>
                      </div>
                      {article.featured && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-orange-500 text-white">
                            {language === 'ar' ? 'مميز' : 'Featured'}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <Calendar className="w-3 h-3" />
                        {formatDate(article.publishDate)}
                        <Clock className="w-3 h-3 ml-2" />
                        {article.readTime} {language === 'ar' ? 'د' : 'min'}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {language === 'ar' ? article.titleAr : article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {language === 'ar' ? article.excerptAr : article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          <User className="w-3 h-3 inline mr-1" />
                          {language === 'ar' ? article.authorAr : article.author}
                        </div>
                        <Link href={`/blog/${article.slug}`}>
                          <Button size="sm" variant="outline">
                            {language === 'ar' ? 'اقرأ' : 'Read'}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Subscribe CTA */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'ar' ? 'ابق على اطلاع بأحدث الأبحاث' : 'Stay Updated with Latest Research'}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'اشترك للحصول على أحدث المقالات العلمية والاكتشافات في عالم المياه والصحة'
                : 'Subscribe to get the latest scientific articles and discoveries in water and health'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your email address'}
                className="bg-white text-gray-900"
              />
              <Button className="bg-orange-500 hover:bg-orange-600">
                {language === 'ar' ? 'اشترك' : 'Subscribe'}
              </Button>
            </div>
          </div>
        </section>

        <Footer language={language} />
        <CookieConsent language={language} />
      </div>
    </CartProvider>
  );
}
