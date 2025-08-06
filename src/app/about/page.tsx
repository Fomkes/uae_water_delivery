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
  Droplets,
  Shield,
  Award,
  Truck,
  Users,
  Heart,
  CheckCircle,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const stats = [
    {
      number: '50,000+',
      label: language === 'ar' ? 'عميل سعيد' : 'Happy Customers',
      icon: Users
    },
    {
      number: '1M+',
      label: language === 'ar' ? 'لتر تم توصيله' : 'Liters Delivered',
      icon: Droplets
    },
    {
      number: '24/7',
      label: language === 'ar' ? 'خدمة العملاء' : 'Customer Support',
      icon: Phone
    },
    {
      number: '99.9%',
      label: language === 'ar' ? 'معدل الرضا' : 'Satisfaction Rate',
      icon: Heart
    }
  ];

  const values = [
    {
      icon: Shield,
      title: language === 'ar' ? 'الجودة والسلامة' : 'Quality & Safety',
      description: language === 'ar'
        ? 'نضمن أعلى معايير النقاء والسلامة في جميع منتجاتنا'
        : 'We ensure the highest standards of purity and safety in all our products'
    },
    {
      icon: Award,
      title: language === 'ar' ? 'التميز في الخدمة' : 'Service Excellence',
      description: language === 'ar'
        ? 'نسعى دائماً لتقديم أفضل تجربة خدمة لعملائنا'
        : 'We strive to deliver the best service experience to our customers'
    },
    {
      icon: Truck,
      title: language === 'ar' ? 'التوصيل السريع' : 'Fast Delivery',
      description: language === 'ar'
        ? 'نوصل المياه النقية إلى بابك في نفس اليوم'
        : 'We deliver pure water to your doorstep same day'
    }
  ];

  const teamMembers = [
    {
      name: 'Ahmed Al-Mansouri',
      nameAr: 'أحمد المنصوري',
      position: 'CEO & Founder',
      positionAr: 'الرئيس التنفيذي والمؤسس',
      description: '15 years of experience in water and beverage industry',
      descriptionAr: '15 عاماً من الخبرة في صناعة المياه والمشروبات',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
    },
    {
      name: 'Sarah Johnson',
      nameAr: 'سارة جونسون',
      position: 'Quality Manager',
      positionAr: 'مدير الجودة',
      description: 'Quality assurance expert with international certifications',
      descriptionAr: 'خبيرة ضمان الجودة مع شهادات دولية',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'
    },
    {
      name: 'Omar Hassan',
      nameAr: 'عمر حسان',
      position: 'Operations Manager',
      positionAr: 'مدير العمليات',
      description: 'Specialist in supply chain management and logistics',
      descriptionAr: 'متخصص في إدارة سلسلة التوريد واللوجستيات',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    }
  ];

  const achievements = [
    language === 'ar' ? 'شهادة ISO 22000 لسلامة الغذاء' : 'ISO 22000 Food Safety Certification',
    language === 'ar' ? 'جائزة أفضل خدمة توصيل في الإمارات 2023' : 'Best Delivery Service Award UAE 2023',
    language === 'ar' ? 'شراكة مع أكثر من 50 مورد محلي' : 'Partnership with over 50 local suppliers',
    language === 'ar' ? 'صفر شكاوى جودة المياه لمدة عامين متتاليين' : 'Zero water quality complaints for 2 consecutive years'
  ];

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
                {language === 'ar' ? 'من نحن' : 'About Us'}
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {language === 'ar' ? 'من نحن' : 'About UAE Waters'}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                {language === 'ar'
                  ? 'رائدون في توصيل المياه عالية الجودة عبر دولة الإمارات العربية المتحدة'
                  : 'Leading the way in quality water delivery across the United Arab Emirates'
                }
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    {language === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                    {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {language === 'ar' ? 'قصتنا' : 'Our Story'}
                </h2>
                <p className="text-xl text-gray-600">
                  {language === 'ar'
                    ? 'رحلة من الرؤية إلى الواقع في خدمة المجتمع الإماراتي'
                    : 'A journey from vision to reality in serving the UAE community'
                  }
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {language === 'ar' ? 'الرؤية والرسالة' : 'Vision & Mission'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {language === 'ar'
                      ? 'تأسست شركة UAE Waters بهدف توفير المياه النقية عالية الجودة لجميع سكان دولة الإمارات. نؤمن أن المياه النظيفة حق أساسي لكل إنسان، ونسعى لتوفيرها بأعلى معايير الجودة والسلامة.'
                      : 'UAE Waters was founded with the goal of providing high-quality pure water to all residents of the UAE. We believe that clean water is a fundamental right for every person, and we strive to provide it with the highest standards of quality and safety.'
                    }
                  </p>
                  <p className="text-gray-600">
                    {language === 'ar'
                      ? 'من خلال شراكاتنا مع أفضل موردي المياه المحليين والعالميين، نضمن وصول أجود أنواع المياه إلى منازلكم ومكاتبكم في جميع أنحاء الإمارات.'
                      : 'Through our partnerships with the best local and international water suppliers, we ensure that the finest types of water reach your homes and offices throughout the Emirates.'
                    }
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=500&h=300&fit=crop"
                    alt={language === 'ar' ? 'رؤيتنا' : 'Our Vision'}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {language === 'ar' ? 'قيمنا الأساسية' : 'Our Core Values'}
              </h2>
              <p className="text-xl text-gray-600">
                {language === 'ar'
                  ? 'المبادئ التي نؤمن بها ونعمل من خلالها'
                  : 'The principles we believe in and work by'
                }
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
                      <value.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {language === 'ar' ? 'فريقنا' : 'Our Team'}
              </h2>
              <p className="text-xl text-gray-600">
                {language === 'ar'
                  ? 'تعرف على الأشخاص المتفانين الذين يجعلون خدمتنا ممكنة'
                  : 'Meet the dedicated people who make our service possible'
                }
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={language === 'ar' ? member.nameAr : member.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-semibold">
                        {language === 'ar' ? member.nameAr : member.name}
                      </h3>
                      <p className="text-blue-200">
                        {language === 'ar' ? member.positionAr : member.position}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600">
                      {language === 'ar' ? member.descriptionAr : member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'ar' ? 'إنجازاتنا' : 'Our Achievements'}
              </h2>
              <p className="text-xl text-blue-100">
                {language === 'ar'
                  ? 'فخورون بالإنجازات التي حققناها خلال رحلتنا'
                  : 'Proud of the achievements we have accomplished during our journey'
                }
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 bg-blue-700/50 p-4 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-blue-100">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'ar' ? 'جاهز للانضمام إلى عائلتنا؟' : 'Ready to Join Our Family?'}
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {language === 'ar'
                  ? 'ابدأ رحلتك معنا اليوم واختبر أجود جودة مياه في الإمارات'
                  : 'Start your journey with us today and experience the finest water quality in UAE'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    {language === 'ar' ? 'ابدأ التسوق' : 'Start Shopping'}
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
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
