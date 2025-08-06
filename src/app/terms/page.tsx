'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { CartProvider } from '@/contexts/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Scale, CreditCard, Truck, RotateCcw, Shield, AlertTriangle } from 'lucide-react';

export default function TermsPage() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const sections = [
    {
      icon: FileText,
      title: language === 'ar' ? 'قبول الشروط' : 'Acceptance of Terms',
      content: language === 'ar' ? [
        'باستخدام موقعنا وخدماتنا، فإنكم توافقون على الالتزام بهذه الشروط والأحكام',
        'إذا كنتم لا توافقون على أي من هذه الشروط، يرجى عدم استخدام خدماتنا',
        'نحتفظ بالحق في تعديل هذه الشروط في أي وقت',
        'استمراركم في استخدام الخدمة يعني موافقتكم على الشروط المحدثة'
      ] : [
        'By using our website and services, you agree to be bound by these terms and conditions',
        'If you do not agree to any of these terms, please do not use our services',
        'We reserve the right to modify these terms at any time',
        'Your continued use of the service constitutes acceptance of updated terms'
      ]
    },
    {
      icon: CreditCard,
      title: language === 'ar' ? 'الطلبات والدفع' : 'Orders and Payment',
      content: language === 'ar' ? [
        'جميع الطلبات خاضعة للتوفر والتأكيد',
        'الأسعار قابلة للتغيير دون إشعار مسبق',
        'الدفع مطلوب وقت تقديم الطلب',
        'نقبل البطاقات الائتمانية والخصم والدفع النقدي عند التوصيل',
        'جميع المعاملات آمنة ومشفرة',
        'قد تطبق رسوم إضافية للمناطق النائية'
      ] : [
        'All orders are subject to availability and confirmation',
        'Prices are subject to change without prior notice',
        'Payment is required at the time of placing the order',
        'We accept credit cards, debit cards, and cash on delivery',
        'All transactions are secure and encrypted',
        'Additional charges may apply for remote areas'
      ]
    },
    {
      icon: Truck,
      title: language === 'ar' ? 'التوصيل' : 'Delivery',
      content: language === 'ar' ? [
        'نوصل في جميع أنحاء دولة الإمارات العربية المتحدة',
        'أوقات التوصيل تقديرية وليست مضمونة',
        'يجب أن يكون شخص بالغ متواجداً لاستلام الطلب',
        'نحتفظ بالحق في تأجيل التوصيل بسبب الطقس أو الظروف الاستثنائية',
        'رسوم التوصيل تختلف حسب المنطقة والمسافة',
        'التوصيل مجاني للطلبات أكثر من 50 يورو'
      ] : [
        'We deliver throughout the United Arab Emirates',
        'Delivery times are estimated and not guaranteed',
        'An adult must be present to receive the delivery',
        'We reserve the right to delay delivery due to weather or exceptional circumstances',
        'Delivery charges vary by area and distance',
        'Free delivery on orders over €50'
      ]
    },
    {
      icon: RotateCcw,
      title: language === 'ar' ? 'الإرجاع والاستبدال' : 'Returns and Exchanges',
      content: language === 'ar' ? [
        'يمكن إرجاع المنتجات غير المفتوحة خلال 7 أيام',
        'يجب أن تكون المنتجات في حالتها الأصلية مع العبوة',
        'المنتجات المفتوحة أو المستهلكة جزئياً غير قابلة للإرجاع',
        'نحن نستبدل المنتجات التالفة أو المعيبة مجاناً',
        'يتحمل العميل رسوم الإرجاع ما لم يكن المنتج معيباً',
        'الاسترداد يتم خلال 5-7 أيام عمل'
      ] : [
        'Unopened products can be returned within 7 days',
        'Products must be in original condition with packaging',
        'Opened or partially consumed products are not returnable',
        'We replace damaged or defective products free of charge',
        'Customer bears return shipping costs unless product is defective',
        'Refunds are processed within 5-7 business days'
      ]
    },
    {
      icon: Scale,
      title: language === 'ar' ? 'المسؤولية' : 'Liability',
      content: language === 'ar' ? [
        'منتجاتنا معدة للاستهلاك البشري الطبيعي',
        'لا نتحمل مسؤولية الاستخدام غير السليم للمنتجات',
        'مسؤوليتنا محدودة بقيمة المنتجات المباعة',
        'لا نضمن عدم انقطاع الخدمة أو خلوها من الأخطاء',
        'العميل مسؤول عن تقديم معلومات دقيقة للتوصيل',
        'لا نتحمل مسؤولية التأخير بسبب عوامل خارجة عن سيطرتنا'
      ] : [
        'Our products are intended for normal human consumption',
        'We are not responsible for improper use of products',
        'Our liability is limited to the value of products sold',
        'We do not guarantee uninterrupted or error-free service',
        'Customer is responsible for providing accurate delivery information',
        'We are not liable for delays due to factors beyond our control'
      ]
    },
    {
      icon: Shield,
      title: language === 'ar' ? 'الملكية الفكرية' : 'Intellectual Property',
      content: language === 'ar' ? [
        'جميع المحتويات على موقعنا محمية بحقوق الطبع والنشر',
        'الشعارات والعلامات التجارية ملك لشركة مياه الإمارات',
        'لا يجوز نسخ أو توزيع المحتوى دون إذن كتابي',
        'المعلومات المقدمة للاستخدام الشخصي غير التجاري فقط',
        'انتهاك حقوق الملكية الفكرية قد يؤدي لإجراءات قانونية',
        'نحترم حقوق الملكية الفكرية للآخرين'
      ] : [
        'All content on our website is protected by copyright',
        'Logos and trademarks are owned by UAE Waters',
        'Content may not be copied or distributed without written permission',
        'Information provided is for personal, non-commercial use only',
        'Violation of intellectual property rights may result in legal action',
        'We respect the intellectual property rights of others'
      ]
    }
  ];

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Navigation language={language} onLanguageChange={setLanguage} />

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <Badge className="bg-white/20 text-white px-4 py-2 mb-4">
                <FileText className="w-4 h-4 mr-2" />
                {language === 'ar' ? 'شروط الاستخدام' : 'Terms of Service'}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {language === 'ar' ? 'شروط وأحكام الخدمة' : 'Terms and Conditions'}
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                {language === 'ar'
                  ? 'يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام خدماتنا'
                  : 'Please read these terms and conditions carefully before using our services'
                }
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Last Updated */}
          <div className="text-center mb-8">
            <p className="text-gray-600">
              {language === 'ar' ? 'آخر تحديث: 1 يناير 2024' : 'Last updated: January 1, 2024'}
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">
                {language === 'ar' ? 'مقدمة' : 'Introduction'}
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed text-lg">
                {language === 'ar'
                  ? 'مرحباً بكم في مياه الإمارات. هذه الشروط والأحكام تحكم استخدامكم لموقعنا الإلكتروني وخدمات التوصيل التي نقدمها. تشكل هذه الشروط اتفاقية قانونية ملزمة بينكم وبين شركة مياه الإمارات. نحتفظ بالحق في تعديل هذه الشروط في أي وقت، وسيتم إشعاركم بأي تغييرات جوهرية.'
                  : 'Welcome to UAE Waters. These terms and conditions govern your use of our website and delivery services. These terms constitute a legally binding agreement between you and UAE Waters. We reserve the right to modify these terms at any time, and you will be notified of any material changes.'
                }
              </p>
            </CardContent>
          </Card>

          {/* Main Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quality Guarantee */}
          <Card className="mt-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                {language === 'ar' ? 'ضمان الجودة' : 'Quality Guarantee'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                {language === 'ar'
                  ? 'نحن ملتزمون بتقديم أعلى جودة في جميع منتجاتنا وخدماتنا. إذا لم تكونوا راضين تماماً عن أي منتج، يرجى التواصل معنا خلال 24 ساعة من التوصيل.'
                  : 'We are committed to providing the highest quality in all our products and services. If you are not completely satisfied with any product, please contact us within 24 hours of delivery.'
                }
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">
                    {language === 'ar' ? 'منتجات عالية الجودة' : 'High Quality Products'}
                  </h4>
                  <p className="text-sm text-green-800">
                    {language === 'ar'
                      ? 'جميع منتجاتنا تخضع لفحص صارم للجودة'
                      : 'All our products undergo strict quality testing'
                    }
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    {language === 'ar' ? 'خدمة عملاء ممتازة' : 'Excellent Customer Service'}
                  </h4>
                  <p className="text-sm text-blue-800">
                    {language === 'ar'
                      ? 'فريق دعم متاح 24/7 لمساعدتكم'
                      : '24/7 support team available to help you'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Uses */}
          <Card className="mt-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                {language === 'ar' ? 'الاستخدامات المحظورة' : 'Prohibited Uses'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {language === 'ar'
                  ? 'لا يجوز استخدام خدماتنا للأغراض التالية:'
                  : 'You may not use our services for the following purposes:'
                }
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">
                      {language === 'ar' ? 'أي نشاط غير قانوني أو احتيالي' : 'Any illegal or fraudulent activity'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">
                      {language === 'ar' ? 'انتهاك حقوق الآخرين' : 'Violating the rights of others'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">
                      {language === 'ar' ? 'نشر محتوى ضار أو مسيء' : 'Posting harmful or offensive content'}
                    </span>
                  </li>
                </ul>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">
                      {language === 'ar' ? 'محاولة الوصول غير المصرح به' : 'Attempting unauthorized access'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">
                      {language === 'ar' ? 'التدخل في عمل الموقع' : 'Interfering with website operation'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">
                      {language === 'ar' ? 'استخدام الخدمة لأغراض تجارية' : 'Using service for commercial purposes'}
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="mt-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">
                {language === 'ar' ? 'الاتصال القانوني' : 'Legal Contact'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {language === 'ar'
                  ? 'إذا كانت لديكم أسئلة حول هذه الشروط والأحكام، يرجى التواصل معنا:'
                  : 'If you have questions about these terms and conditions, please contact us:'
                }
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === 'ar' ? 'الشؤون القانونية' : 'Legal Affairs'}
                  </h4>
                  <p className="text-gray-600">legal@uaewaters.ae</p>
                  <p className="text-gray-600">+971 4 123 4567</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === 'ar' ? 'القانون المطبق' : 'Governing Law'}
                  </h4>
                  <p className="text-gray-600">
                    {language === 'ar'
                      ? 'تخضع هذه الشروط لقوانين دولة الإمارات العربية المتحدة'
                      : 'These terms are governed by the laws of the United Arab Emirates'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agreement Notice */}
          <Card className="mt-8 border-0 shadow-lg bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Scale className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">
                    {language === 'ar' ? 'الموافقة على الشروط' : 'Agreement to Terms'}
                  </h4>
                  <p className="text-blue-800">
                    {language === 'ar'
                      ? 'باستخدام خدماتنا، فإنكم تؤكدون أنكم قرأتم وفهمتم ووافقتم على جميع الشروط والأحكام المذكورة أعلاه.'
                      : 'By using our services, you acknowledge that you have read, understood, and agree to all the terms and conditions stated above.'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Footer language={language} />
        <CookieConsent language={language} />
      </div>
    </CartProvider>
  );
}
