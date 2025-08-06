'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Cookie, Settings, Check, X, Shield, BarChart, Target } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CookieConsent as CookieConsentType } from '@/types';

interface CookieConsentProps {
  language?: 'en' | 'ar';
}

export function CookieConsent({ language = 'en' }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<CookieConsentType>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent has been given
    const savedConsent = localStorage.getItem('cookie-consent');
    if (!savedConsent) {
      setIsVisible(true);
    } else {
      try {
        const parsed = JSON.parse(savedConsent);
        setConsent(parsed);
      } catch (error) {
        console.error('Error parsing cookie consent:', error);
        setIsVisible(true);
      }
    }
  }, []);

  const saveConsent = (consentData: CookieConsentType) => {
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    const allConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setConsent(allConsent);
    saveConsent(allConsent);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setConsent(necessaryOnly);
    saveConsent(necessaryOnly);
  };

  const saveCustom = () => {
    saveConsent(consent);
  };

  const toggleConsent = (type: keyof CookieConsentType) => {
    if (type === 'necessary') return; // Always required
    setConsent(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const cookieTypes = [
    {
      key: 'necessary' as const,
      icon: Shield,
      title: language === 'ar' ? 'ضرورية' : 'Necessary',
      description: language === 'ar'
        ? 'هذه الكوكيز ضرورية لعمل الموقع ولا يمكن إلغاؤها'
        : 'These cookies are essential for the website to function and cannot be disabled',
      required: true,
    },
    {
      key: 'analytics' as const,
      icon: BarChart,
      title: language === 'ar' ? 'تحليلية' : 'Analytics',
      description: language === 'ar'
        ? 'تساعدنا في فهم كيفية استخدام الزوار للموقع'
        : 'Help us understand how visitors use our website',
      required: false,
    },
    {
      key: 'marketing' as const,
      icon: Target,
      title: language === 'ar' ? 'تسويقية' : 'Marketing',
      description: language === 'ar'
        ? 'تستخدم لإظهار إعلانات مخصصة وذات صلة'
        : 'Used to show personalized and relevant advertisements',
      required: false,
    },
  ];

  if (!isVisible) return null;

  return (
    <>
      {/* Main Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-md border-t shadow-lg">
        <div className="container mx-auto">
          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Cookie className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {language === 'ar' ? 'نحن نستخدم الكوكيز' : 'We use cookies'}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {language === 'ar'
                        ? 'نستخدم الكوكيز لتحسين تجربتك على موقعنا. يمكنك اختيار الكوكيز التي تريد قبولها.'
                        : 'We use cookies to enhance your experience on our website. You can choose which cookies to accept.'
                      }
                      <Button
                        variant="link"
                        className="p-0 h-auto text-blue-600 text-sm ml-1"
                        onClick={() => setShowSettings(true)}
                      >
                        {language === 'ar' ? 'اعرف المزيد' : 'Learn more'}
                      </Button>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                  <Button
                    variant="outline"
                    onClick={acceptNecessary}
                    className="w-full sm:w-auto"
                  >
                    {language === 'ar' ? 'الضرورية فقط' : 'Necessary Only'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowSettings(true)}
                    className="w-full sm:w-auto"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'إعدادات' : 'Settings'}
                  </Button>
                  <Button
                    onClick={acceptAll}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    {language === 'ar' ? 'قبول الكل' : 'Accept All'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Cookie Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cookie className="w-5 h-5" />
              {language === 'ar' ? 'إعدادات الكوكيز' : 'Cookie Settings'}
            </DialogTitle>
            <DialogDescription>
              {language === 'ar'
                ? 'اختر نوع الكوكيز التي تريد السماح بها. يمكنك تغيير هذه الإعدادات في أي وقت.'
                : 'Choose which types of cookies you want to allow. You can change these settings at any time.'
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {cookieTypes.map((type) => {
              const Icon = type.icon;
              const isEnabled = consent[type.key];

              return (
                <div key={type.key} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isEnabled
                          ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                          : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-4 h-4 ${isEnabled ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-gray-900">{type.title}</h4>
                          {type.required && (
                            <Badge variant="secondary" className="text-xs">
                              {language === 'ar' ? 'مطلوب' : 'Required'}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                    </div>

                    <Button
                      variant={isEnabled ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleConsent(type.key)}
                      disabled={type.required}
                      className={isEnabled ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {isEnabled ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          {language === 'ar' ? 'مفعل' : 'Enabled'}
                        </>
                      ) : (
                        <>
                          <X className="w-4 h-4 mr-1" />
                          {language === 'ar' ? 'معطل' : 'Disabled'}
                        </>
                      )}
                    </Button>
                  </div>

                  {type.key !== 'marketing' && <Separator />}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              variant="outline"
              onClick={acceptNecessary}
              className="w-full sm:w-auto"
            >
              {language === 'ar' ? 'الضرورية فقط' : 'Necessary Only'}
            </Button>
            <Button
              onClick={saveCustom}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              {language === 'ar' ? 'حفظ الإعدادات' : 'Save Settings'}
            </Button>
            <Button
              onClick={acceptAll}
              className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              {language === 'ar' ? 'قبول الكل' : 'Accept All'}
            </Button>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-gray-500">
              {language === 'ar'
                ? 'يمكنك تغيير إعدادات الكوكيز في أي وقت من خلال زيارة صفحة سياسة الكوكيز الخاصة بنا.'
                : 'You can change your cookie settings at any time by visiting our cookie policy page.'
              }
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
