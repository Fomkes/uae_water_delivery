'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { CartProvider } from '@/contexts/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Headphones,
  Truck,
  Star,
  CheckCircle,
  Instagram
} from 'lucide-react';

export default function ContactPage() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        priority: 'normal'
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: language === 'ar' ? 'الهاتف' : 'Phone',
      details: ['+971 4 123 4567', '+971 50 123 4567'],
      available: language === 'ar' ? '24/7 متاح' : '24/7 Available',
    },
    {
      icon: Mail,
      title: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
      details: ['info@uaewaters.ae', 'support@uaewaters.ae'],
      available: language === 'ar' ? 'استجابة خلال ساعة' : 'Response within 1 hour',
    },
    {
      icon: MapPin,
      title: language === 'ar' ? 'العنوان' : 'Address',
      details: [
        language === 'ar' ? 'مركز دبي التجاري العالمي' : 'Dubai World Trade Centre',
        language === 'ar' ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, United Arab Emirates'
      ],
      available: language === 'ar' ? 'نخدم جميع أنحاء الإمارات' : 'Serving all UAE',
    },
    {
      icon: Clock,
      title: language === 'ar' ? 'ساعات العمل' : 'Business Hours',
      details: [
        language === 'ar' ? 'الأحد - الخميس: 8:00 - 22:00' : 'Sun - Thu: 8:00 AM - 10:00 PM',
        language === 'ar' ? 'الجمعة - السبت: 9:00 - 21:00' : 'Fri - Sat: 9:00 AM - 9:00 PM'
      ],
      available: language === 'ar' ? 'طوارئ: 24/7' : 'Emergency: 24/7',
    },
  ];

  const departments = [
    { value: 'general', label: language === 'ar' ? 'استفسار عام' : 'General Inquiry' },
    { value: 'sales', label: language === 'ar' ? 'المبيعات' : 'Sales' },
    { value: 'support', label: language === 'ar' ? 'الدعم الفني' : 'Technical Support' },
    { value: 'delivery', label: language === 'ar' ? 'التوصيل' : 'Delivery' },
    { value: 'billing', label: language === 'ar' ? 'الفواتير' : 'Billing' },
    { value: 'complaint', label: language === 'ar' ? 'شكوى' : 'Complaint' },
  ];

  const priorities = [
    { value: 'low', label: language === 'ar' ? 'منخفض' : 'Low' },
    { value: 'normal', label: language === 'ar' ? 'عادي' : 'Normal' },
    { value: 'high', label: language === 'ar' ? 'عالي' : 'High' },
    { value: 'urgent', label: language === 'ar' ? 'عاجل' : 'Urgent' },
  ];

  const faqs = [
    {
      question: language === 'ar' ? 'ما هي مناطق التوصيل؟' : 'What are your delivery areas?',
      answer: language === 'ar' ? 'نوصل في جميع أنحاء دولة الإمارات العربية المتحدة' : 'We deliver across all Emirates in the UAE',
    },
    {
      question: language === 'ar' ? 'كم يستغرق التوصيل؟' : 'How long does delivery take?',
      answer: language === 'ar' ? 'نفس اليوم في دبي وأبوظبي، 1-2 أيام في الإمارات الأخرى' : 'Same day in Dubai & Abu Dhabi, 1-2 days in other Emirates',
    },
    {
      question: language === 'ar' ? 'هل تقدمون خدمة طوارئ؟' : 'Do you offer emergency service?',
      answer: language === 'ar' ? 'نعم، نقدم خدمة طوارئ 24/7 للعملاء المسجلين' : 'Yes, we offer 24/7 emergency service for registered customers',
    },
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
                {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {language === 'ar' ? 'نحن هنا لمساعدتك' : 'We\'re Here to Help'}
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                {language === 'ar'
                  ? 'لديك سؤال أو تحتاج مساعدة؟ فريقنا متاح دائماً لخدمتك'
                  : 'Have a question or need assistance? Our team is always available to serve you'
                }
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {language === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <Card key={index} className="border-0 shadow-md">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                              {info.details.map((detail, idx) => (
                                <p key={idx} className="text-gray-600 mb-1">{detail}</p>
                              ))}
                              <p className="text-sm text-blue-600 font-medium mt-2">{info.available}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Social Media */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    {language === 'ar' ? 'تابعنا' : 'Follow Us'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Instagram className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick FAQ */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>
                    {language === 'ar' ? 'أسئلة شائعة' : 'Quick FAQ'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-gray-900 mb-1">{faq.question}</h4>
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {language === 'ar' ? 'أرسل لنا رسالة' : 'Send us a Message'}
                  </CardTitle>
                  <p className="text-gray-600">
                    {language === 'ar'
                      ? 'املأ النموذج أدناه وسنرد عليك في أقرب وقت ممكن'
                      : 'Fill out the form below and we\'ll get back to you as soon as possible'
                    }
                  </p>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {language === 'ar' ? 'تم إرسال الرسالة!' : 'Message Sent!'}
                      </h3>
                      <p className="text-gray-600">
                        {language === 'ar'
                          ? 'شكراً لتواصلك معنا. سنرد عليك قريباً.'
                          : 'Thank you for contacting us. We\'ll respond soon.'
                        }
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {language === 'ar' ? 'الاسم الكامل' : 'Full Name'} *
                          </label>
                          <Input
                            required
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {language === 'ar' ? 'البريد الإلكتروني' : 'Email'} *
                          </label>
                          <Input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                          </label>
                          <Input
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder={language === 'ar' ? 'أدخل رقم هاتفك' : 'Enter your phone number'}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {language === 'ar' ? 'نوع الاستفسار' : 'Inquiry Type'}
                          </label>
                          <Select
                            value={formData.subject}
                            onValueChange={(value) => handleInputChange('subject', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={language === 'ar' ? 'اختر نوع الاستفسار' : 'Select inquiry type'} />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept.value} value={dept.value}>
                                  {dept.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'ar' ? 'الأولوية' : 'Priority'}
                        </label>
                        <Select
                          value={formData.priority}
                          onValueChange={(value) => handleInputChange('priority', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {priorities.map((priority) => (
                              <SelectItem key={priority.value} value={priority.value}>
                                {priority.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'ar' ? 'الرسالة' : 'Message'} *
                        </label>
                        <Textarea
                          required
                          rows={6}
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                          className="resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            {language === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Send className="w-5 h-5" />
                            {language === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
                          </div>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Support Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {language === 'ar' ? 'لماذا تختار دعمنا؟' : 'Why Choose Our Support?'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-6 border-0 shadow-md">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Headphones className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {language === 'ar' ? 'دعم 24/7' : '24/7 Support'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'ar'
                      ? 'فريق الدعم متاح طوال الوقت لحل مشاكلك'
                      : 'Our support team is available around the clock to solve your issues'
                    }
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 border-0 shadow-md">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {language === 'ar' ? 'استجابة سريعة' : 'Fast Response'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'ar'
                      ? 'نرد على استفساراتك خلال ساعة واحدة'
                      : 'We respond to your inquiries within one hour'
                    }
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 border-0 shadow-md">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {language === 'ar' ? 'خدمة ممتازة' : 'Excellent Service'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'ar'
                      ? 'تقييم 5 نجوم من أكثر من 10,000 عميل'
                      : '5-star rating from over 10,000 customers'
                    }
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Footer language={language} />
        <CookieConsent language={language} />
      </div>
    </CartProvider>
  );
}
