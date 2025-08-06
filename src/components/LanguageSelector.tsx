'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets, Globe } from 'lucide-react';

interface LanguageSelectorProps {
  onLanguageSelect: (language: 'en' | 'ar') => void;
}

export function LanguageSelector({ onLanguageSelect }: LanguageSelectorProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if language has been selected before
    const savedLanguage = localStorage.getItem('selected-language');
    if (!savedLanguage) {
      setIsVisible(true);
    } else {
      onLanguageSelect(savedLanguage as 'en' | 'ar');
    }
  }, [onLanguageSelect]);

  const handleLanguageSelect = (language: 'en' | 'ar') => {
    localStorage.setItem('selected-language', language);
    setIsVisible(false);
    onLanguageSelect(language);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <Card className="w-full max-w-md mx-4 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
              <Droplets className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
            UAE Waters
          </CardTitle>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Globe className="w-4 h-4" />
            <span className="text-sm">Choose Your Language / اختر لغتك</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600 text-sm mb-6">
            Please select your preferred language to continue
            <br />
            يرجى اختيار لغتك المفضلة للمتابعة
          </p>

          <div className="grid grid-cols-1 gap-3">
            <Button
              onClick={() => handleLanguageSelect('en')}
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg"
            >
              <span className="mr-3 text-xl">🇺🇸</span>
              English
            </Button>

            <Button
              onClick={() => handleLanguageSelect('ar')}
              className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-medium text-lg"
            >
              <span className="mr-3 text-xl">🇦🇪</span>
              العربية
            </Button>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-gray-500 text-center">
              Quality water delivery service across UAE
              <br />
              خدمة توصيل المياه الفاخرة في جميع أنحاء الإمارات
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
