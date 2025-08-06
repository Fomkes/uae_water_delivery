'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { CartProvider } from '@/contexts/CartContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  BookOpen,
  Tag
} from 'lucide-react';
import Link from 'next/link';
import type { BlogArticle } from '@/data/blog';
import { blogArticles } from '@/data/blog';

interface Props {
  slug: string;
  article?: BlogArticle;
}

export default function BlogArticleClient({ slug, article }: Props) {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  if (!article) {
    return (
      <CartProvider>
        <div className="min-h-screen bg-white">
          <Navigation language={language} onLanguageChange={setLanguage} />
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'المقال غير موجود' : 'Article Not Found'}
            </h1>
            <p className="text-gray-600 mb-8">
              {language === 'ar'
                ? 'المقال الذي تبحث عنه غير متوفر أو تم حذفه'
                : 'The article you are looking for is not available or has been removed'
              }
            </p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === 'ar' ? 'العودة للمدونة' : 'Back to Blog'}
              </Button>
            </Link>
          </div>
          <Footer language={language} />
          <CookieConsent language={language} />
        </div>
      </CartProvider>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'ar'
      ? date.toLocaleDateString('ar-AE')
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const relatedArticles = blogArticles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: language === 'ar' ? article.titleAr : article.title,
          text: language === 'ar' ? article.excerptAr : article.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert(language === 'ar' ? 'تم نسخ الرابط' : 'Link copied to clipboard');
    }
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
              <Link href="/blog" className="text-gray-500 hover:text-blue-600">
                {language === 'ar' ? 'المدونة' : 'Blog'}
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium truncate max-w-xs">
                {language === 'ar' ? article.titleAr : article.title}
              </span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <article className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <div className="mb-8">
                <Link href="/blog">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'العودة للمدونة' : 'Back to Blog'}
                  </Button>
                </Link>
              </div>

              {/* Article Meta */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <Badge variant="secondary">
                    {language === 'ar' ? article.categoryAr : article.category}
                  </Badge>
                  {article.featured && (
                    <Badge className="bg-orange-500 text-white">
                      {language === 'ar' ? 'مميز' : 'Featured'}
                    </Badge>
                  )}
                  <Button onClick={handleShare} size="sm" variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'مشاركة' : 'Share'}
                  </Button>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {language === 'ar' ? article.titleAr : article.title}
                </h1>

                <div className="flex flex-col md:flex-row md:items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <div>
                      <span className="font-medium">
                        {language === 'ar' ? article.authorAr : article.author}
                      </span>
                      <p className="text-sm text-gray-500">
                        {language === 'ar' ? article.authorTitleAr : article.authorTitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(article.publishDate)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {article.readTime} {language === 'ar' ? 'دقيقة قراءة' : 'min read'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Image */}
              <div className="mb-8">
                <img
                  src={article.image}
                  alt={language === 'ar' ? article.titleAr : article.title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>

              {/* Article Excerpt */}
              <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
                <p className="text-lg text-gray-700 italic">
                  {language === 'ar' ? article.excerptAr : article.excerpt}
                </p>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html: language === 'ar' ? article.contentAr : article.content
                  }}
                  className="text-gray-800 leading-relaxed [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mt-6 [&>h3]:mb-3 [&>h4]:text-lg [&>h4]:font-semibold [&>h4]:text-gray-900 [&>h4]:mt-4 [&>h4]:mb-2 [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:pl-6 [&>ul>li]:mb-2 [&>ul>li]:list-disc [&>table]:w-full [&>table]:border-collapse [&>table]:border [&>table]:border-gray-300 [&>table]:mb-4 [&>table>tr>th]:border [&>table>tr>th]:border-gray-300 [&>table>tr>th]:bg-gray-100 [&>table>tr>th]:p-2 [&>table>tr>th]:text-left [&>table>tr>td]:border [&>table>tr>td]:border-gray-300 [&>table>tr>td]:p-2"
                />
              </div>

              {/* Tags */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500 font-medium">
                    {language === 'ar' ? 'العلامات:' : 'Tags:'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(language === 'ar' ? article.tagsAr : article.tags).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {language === 'ar' ? 'مقالات ذات صلة' : 'Related Articles'}
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedArticles.map((relatedArticle) => (
                    <Card key={relatedArticle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={relatedArticle.image}
                          alt={language === 'ar' ? relatedArticle.titleAr : relatedArticle.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="text-xs">
                            {language === 'ar' ? relatedArticle.categoryAr : relatedArticle.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                          {language === 'ar' ? relatedArticle.titleAr : relatedArticle.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {language === 'ar' ? relatedArticle.excerptAr : relatedArticle.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {relatedArticle.readTime} {language === 'ar' ? 'د' : 'min'}
                          </span>
                          <Link href={`/blog/${relatedArticle.slug}`}>
                            <Button size="sm" variant="outline">
                              {language === 'ar' ? 'اقرأ' : 'Read'}
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-6 text-blue-200" />
              <h2 className="text-3xl font-bold mb-4">
                {language === 'ar' ? 'استمتع بقراءة المزيد؟' : 'Enjoyed this article?'}
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                {language === 'ar'
                  ? 'اشترك للحصول على أحدث المقالات العلمية في بريدك الإلكتروني'
                  : 'Subscribe to get the latest scientific articles delivered to your inbox'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/blog">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    {language === 'ar' ? 'تصفح المزيد من المقالات' : 'Browse More Articles'}
                  </Button>
                </Link>
                <Link href="/products">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                    {language === 'ar' ? 'تسوق منتجاتنا' : 'Shop Our Products'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer language={language} />
        <CookieConsent language={language} />
      </div>
    </CartProvider>
  );
}
