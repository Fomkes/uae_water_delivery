'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { CartProvider, useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  ShoppingCart,
  Truck,
  Shield,
  CreditCard
} from 'lucide-react';

interface CartPageContentProps {
  language: 'en' | 'ar';
}

function CartPageContent({ language }: CartPageContentProps) {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const shipping = total >= 50 ? 0 : 15; // Free shipping over €50
  const tax = total * 0.05; // 5% VAT
  const discount = promoApplied ? total * 0.1 : 0; // 10% discount
  const finalTotal = total + shipping + tax - discount;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setPromoApplied(true);
    }
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'سلة التسوق فارغة' : 'Your cart is empty'}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === 'ar'
              ? 'أضف بعض المنتجات الرائعة إلى سلة التسوق الخاصة بك'
              : 'Add some amazing products to your cart to get started'
            }
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
              <ShoppingBag className="w-5 h-5 mr-2" />
              {language === 'ar' ? 'ابدأ التسوق' : 'Start Shopping'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                {language === 'ar' ? 'سلة التسوق' : 'Shopping Cart'}
              </h1>
              <p className="text-blue-100">
                {itemCount} {language === 'ar' ? 'عنصر في السلة' : 'items in your cart'}
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="text-blue-600 border-white bg-white hover:bg-gray-100">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === 'ar' ? 'متابعة التسوق' : 'Continue Shopping'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                  {language === 'ar' ? 'عناصر السلة' : 'Cart Items'}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'مسح الكل' : 'Clear All'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-4 border rounded-lg bg-white">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={language === 'ar' ? item.product.nameAr : item.product.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {language === 'ar' ? item.product.nameAr : item.product.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {language === 'ar' ? item.product.sizeAr : item.product.size}
                          </p>

                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.product.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          {item.product.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              €{(item.product.originalPrice * item.quantity).toFixed(2)}
                            </p>
                          )}
                          <p className="font-semibold text-lg text-blue-600">
                            €{(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'ar' ? 'رمز الخصم' : 'Promo Code'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder={language === 'ar' ? 'أدخل رمز الخصم' : 'Enter promo code'}
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                  />
                  <Button
                    onClick={handleApplyPromo}
                    disabled={promoApplied || !promoCode}
                  >
                    {promoApplied
                      ? (language === 'ar' ? 'مطبق' : 'Applied')
                      : (language === 'ar' ? 'تطبيق' : 'Apply')
                    }
                  </Button>
                </div>
                {promoApplied && (
                  <p className="text-green-600 text-sm mt-2">
                    {language === 'ar' ? '✓ تم تطبيق خصم 10%' : '✓ 10% discount applied'}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  {language === 'ar' ? 'جرب: WELCOME10' : 'Try: WELCOME10'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ar' ? 'ملخص الطلب' : 'Order Summary'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>{language === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span>
                  <span>€{total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    {language === 'ar' ? 'الشحن' : 'Shipping'}
                  </span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>
                    {shipping === 0
                      ? (language === 'ar' ? 'مجاني' : 'Free')
                      : `€${shipping.toFixed(2)}`
                    }
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>{language === 'ar' ? 'ضريبة القيمة المضافة (5%)' : 'VAT (5%)'}</span>
                  <span>€{tax.toFixed(2)}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>{language === 'ar' ? 'خصم (10%)' : 'Discount (10%)'}</span>
                    <span>-€{discount.toFixed(2)}</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>{language === 'ar' ? 'المجموع النهائي' : 'Total'}</span>
                  <span className="text-blue-600">€{finalTotal.toFixed(2)}</span>
                </div>

                {total < 50 && (
                  <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                    {language === 'ar'
                      ? `أضف €${(50 - total).toFixed(2)} أخرى للحصول على شحن مجاني!`
                      : `Add €${(50 - total).toFixed(2)} more for free shipping!`
                    }
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  {language === 'ar' ? 'متابعة للدفع' : 'Proceed to Checkout'}
                </Button>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  {language === 'ar' ? 'دفع آمن ومضمون' : 'Secure & protected payment'}
                </div>
              </CardFooter>
            </Card>

            {/* Trust Signals */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Truck className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{language === 'ar' ? 'توصيل سريع' : 'Fast Delivery'}</p>
                      <p className="text-gray-600">{language === 'ar' ? 'نفس اليوم في دبي' : 'Same day in Dubai'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{language === 'ar' ? 'جودة مضمونة' : 'Quality Guaranteed'}</p>
                      <p className="text-gray-600">{language === 'ar' ? '100% مياه نقية' : '100% pure water'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">{language === 'ar' ? 'دفع آمن' : 'Secure Payment'}</p>
                      <p className="text-gray-600">{language === 'ar' ? 'حماية SSL' : 'SSL protected'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Navigation language={language} onLanguageChange={setLanguage} />
        <CartPageContent language={language} />
        <Footer language={language} />
        <CookieConsent language={language} />
      </div>
    </CartProvider>
  );
}
