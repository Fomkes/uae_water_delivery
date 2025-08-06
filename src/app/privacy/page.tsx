'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { CartProvider } from '@/contexts/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, Lock, Eye, Users, Database, Settings } from 'lucide-react';

export default function PrivacyPage() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const sections = [
    {
      icon: Database,
      title: language === 'ar' ? 'المعلومات التي نجمعها' : 'Information We Collect',
      content: language === 'ar' ? [
        'المعلومات الشخصية مثل الاسم والبريد الإلكتروني ورقم الهاتف',
        'معلومات التوصيل والفوترة',
        'تفضيلات المنتجات وتاريخ الطلبات',
        'معلومات تقنية مثل عنوان IP ونوع المتصفح',
        'ملفات تعريف الارتباط وتقنيات التتبع المماثلة'
      ] : [
        'Personal information such as name, email address, and phone number',
        'Delivery and billing information',
        'Product preferences and order history',
        'Technical information such as IP address and browser type',
        'Cookies and similar tracking technologies'
      ]
    },
    {
      icon: Eye,
      title: language === 'ar' ? 'كيف نستخدم معلوماتك' : 'How We Use Your Information',
      content: language === 'ar' ? [
        'معالجة وتنفيذ طلباتك',
        'توفير خدمة العملاء والدعم',
        'إرسال تحديثات الطلبات والتواصل المهم',
        'تحسين منتجاتنا وخدماتنا',
        'منع الاحتيال وضمان الأمان',
        'الامتثال للمتطلبات القانونية'
      ] : [
        'Process and fulfill your orders',
        'Provide customer service and support',
        'Send order updates and important communications',
        'Improve our products and services',
        'Prevent fraud and ensure security',
        'Comply with legal requirements'
      ]
    },
    {
      icon: Users,
      title: language === 'ar' ? 'مشاركة المعلومات' : 'Information Sharing',
      content: language === 'ar' ? [
        'لا نبيع معلوماتك الشخصية لأطراف ثالثة',
        'قد نشارك المعلومات مع شركاء التوصيل لتنفيذ الطلبات',
        'معالجات الدفع للمعاملات الآمنة',
        'مقدمي الخدمات التقنية لتشغيل موقعنا',
        'السلطات القانونية عند الضرورة',
        'في حالة دمج أو استحواذ تجاري'
      ] : [
        'We do not sell your personal information to third parties',
        'We may share information with delivery partners to fulfill orders',
        'Payment processors for secure transactions',
        'Technical service providers to operate our website',
        'Legal authorities when required',
        'In case of business merger or acquisition'
      ]
    },
    {
      icon: Lock,
      title: language === 'ar' ? 'أمان البيانات' : 'Data Security',
      content: language === 'ar' ? [
        'تشفير SSL لجميع عمليات نقل البيانات',
        'تخزين آمن مع ضوابط وصول صارمة',
        'مراجعات أمنية منتظمة وتحديثات',
        'تدريب الموظفين على حماية البيانات',
        'شراكة مع مقدمي خدمات معتمدين فقط',
        'خطط استجابة للحوادث الأمنية'
      ] : [
        'SSL encryption for all data transmissions',
        'Secure storage with strict access controls',
        'Regular security audits and updates',
        'Employee training on data protection',
        'Partnership only with certified service providers',
        'Incident response plans for security breaches'
      ]
    },
    {
      icon: Settings,
      title: language === 'ar' ? 'حقوقك' : 'Your Rights',
      content: language === 'ar' ? [
        'الوصول إلى معلوماتك الشخصية',
        'تصحيح المعلومات غير الصحيحة',
        'حذف حسابك وبياناتك',
        'تقييد معالجة بياناتك',
        'نقل بياناتك إلى خدمة أخرى',
        'الاعتراض على معالجة معينة'
      ] : [
        'Access your personal information',
        'Correct inaccurate information',
        'Delete your account and data',
        'Restrict processing of your data',
        'Transfer your data to another service',
        'Object to certain processing'
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
                <Shield className="w-4 h-4 mr-2" />
                {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {language === 'ar' ? 'حماية خصوصيتك أولويتنا' : 'Your Privacy is Our Priority'}
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                {language === 'ar'
                  ? 'نحن ملتزمون بحماية معلوماتك الشخصية وضمان شفافية كاملة حول كيفية جمعها واستخدامها'
                  : 'We are committed to protecting your personal information and ensuring complete transparency about how it is collected and used'
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
                  ? 'مرحباً بكم في مياه الإمارات. نحن نقدر ثقتكم بنا ونلتزم بحماية خصوصيتكم. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتكم الشخصية عند استخدام موقعنا وخدماتنا. من خلال استخدام خدماتنا، فإنكم توافقون على الممارسات الموضحة في هذه السياسة.'
                  : 'Welcome to UAE Waters. We value your trust and are committed to protecting your privacy. This policy explains how we collect, use, and protect your personal information when you use our website and services. By using our services, you agree to the practices described in this policy.'
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

          {/* Cookies Section */}
          <Card className="mt-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                {language === 'ar' ? 'ملفات تعريف الارتباط' : 'Cookies and Tracking'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                {language === 'ar'
                  ? 'نستخدم ملفات تعريف الارتباط وتقنيات التتبع المماثلة لتحسين تجربتكم على موقعنا. يمكنكم التحكم في هذه الإعدادات من خلال نافذة موافقة الكوكيز.'
                  : 'We use cookies and similar tracking technologies to improve your experience on our website. You can control these settings through our cookie consent window.'
                }
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === 'ar' ? 'ضرورية' : 'Necessary'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'ar'
                      ? 'مطلوبة لعمل الموقع الأساسي'
                      : 'Required for basic website functionality'
                    }
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === 'ar' ? 'تحليلية' : 'Analytics'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'ar'
                      ? 'تساعدنا في فهم استخدام الموقع'
                      : 'Help us understand website usage'
                    }
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === 'ar' ? 'تسويقية' : 'Marketing'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'ar'
                      ? 'لإظهار إعلانات مخصصة'
                      : 'For personalized advertisements'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="mt-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">
                {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {language === 'ar'
                  ? 'إذا كانت لديكم أسئلة حول سياسة الخصوصية هذه أو ترغبون في ممارسة حقوقكم، يرجى التواصل معنا:'
                  : 'If you have questions about this privacy policy or want to exercise your rights, please contact us:'
                }
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === 'ar' ? 'مسؤول حماية البيانات' : 'Data Protection Officer'}
                  </h4>
                  <p className="text-gray-600">privacy@uaewaters.ae</p>
                  <p className="text-gray-600">+971 4 123 4567</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === 'ar' ? 'العنوان البريدي' : 'Postal Address'}
                  </h4>
                  <p className="text-gray-600">
                    {language === 'ar'
                      ? 'مياه الإمارات، مركز دبي التجاري العالمي، دبي، الإمارات العربية المتحدة'
                      : 'UAE Waters, Dubai World Trade Centre, Dubai, United Arab Emirates'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Changes Notice */}
          <Card className="mt-8 border-0 shadow-lg bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">
                    {language === 'ar' ? 'التغييرات على هذه السياسة' : 'Changes to This Policy'}
                  </h4>
                  <p className="text-blue-800">
                    {language === 'ar'
                      ? 'قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنخطركم بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعار بارز على موقعنا.'
                      : 'We may update this privacy policy from time to time. We will notify you of any material changes via email or a prominent notice on our website.'
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
