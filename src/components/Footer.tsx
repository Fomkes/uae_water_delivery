import Link from 'next/link';
import { Droplets, Phone, Mail, MapPin, Clock, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FooterProps {
  language?: 'en' | 'ar';
}

export function Footer({ language = 'en' }: FooterProps) {
  const isRTL = language === 'ar';

  const quickLinks = [
    { href: '/about', label: language === 'ar' ? 'من نحن' : 'About Us' },
    { href: '/products', label: language === 'ar' ? 'المنتجات' : 'Products' },
    { href: '/categories', label: language === 'ar' ? 'الفئات' : 'Categories' },
    { href: '/contact', label: language === 'ar' ? 'اتصل بنا' : 'Contact Us' },
  ];

  const categories = [
    { href: '/categories/bottles', label: language === 'ar' ? 'زجاجات المياه' : 'Water Bottles' },
    { href: '/categories/gallon', label: language === 'ar' ? 'عبوات العائلة' : 'Family Packs' },

    { href: '/categories/sparkling', label: language === 'ar' ? 'المياه الغازية' : 'Sparkling Water' },
    { href: '/categories/alkaline', label: language === 'ar' ? 'المياه القلوية' : 'Alkaline Water' },
  ];

  const legalLinks = [
    { href: '/privacy', label: language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy' },
    { href: '/terms', label: language === 'ar' ? 'شروط الاستخدام' : 'Terms of Service' },
    { href: '/cookies', label: language === 'ar' ? 'سياسة الكوكيز' : 'Cookie Policy' },
    { href: '/returns', label: language === 'ar' ? 'سياسة الإرجاع' : 'Return Policy' },
  ];

  return (
    <footer className={`bg-gray-900 text-white ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">
                  {language === 'ar' ? 'مياه الإمارات' : 'UAE Waters'}
                </span>
                <span className="text-sm text-gray-400">
                  {language === 'ar' ? 'خدمة توصيل المياه' : 'Water Delivery Service'}
                </span>
              </div>
            </Link>

            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              {language === 'ar'
                ? 'نحن نقدم أفضل خدمات توصيل المياه في دولة الإمارات العربية المتحدة مع ضمان الجودة والتوصيل السريع.'
                : 'We provide the finest water delivery services across the UAE with quality assurance and fast delivery.'
              }
            </p>

            {/* Social Media - Instagram Only */}
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0 text-gray-400 hover:text-white hover:bg-gray-800">
                <Instagram className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              {language === 'ar' ? 'فئات المنتجات' : 'Product Categories'}
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                {language === 'ar' ? 'اتصل بنا' : 'Contact Info'}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300">+971 4 123 4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300">info@uaewaters.ae</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300">
                    {language === 'ar' ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, UAE'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300">
                    {language === 'ar' ? '24/7 خدمة العملاء' : '24/7 Customer Service'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              © 2024 {language === 'ar' ? 'مياه الإمارات' : 'UAE Waters'}.
              {language === 'ar' ? ' جميع الحقوق محفوظة.' : ' All rights reserved.'}
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-xs">
              {language === 'ar'
                ? 'نحن نوفر خدمات التوصيل في جميع أنحاء دولة الإمارات العربية المتحدة • توصيل مجاني للطلبات أكثر من 50 يورو • مورد مياه مرخص'
                : 'We deliver across UAE • Free delivery on orders over €50 • Licensed water supplier'
              }
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
