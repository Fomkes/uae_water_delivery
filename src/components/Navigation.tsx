'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ShoppingCart,
  Menu,
  Droplets,
  Search,
  Globe,
  MapPin,
  Phone
} from 'lucide-react';

interface NavigationProps {
  language?: 'en' | 'ar';
  onLanguageChange?: (lang: 'en' | 'ar') => void;
}

export function Navigation({ language = 'en', onLanguageChange }: NavigationProps) {
  const { itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isRTL = language === 'ar';

  const navItems = [
    {
      href: '/',
      label: language === 'ar' ? 'الرئيسية' : 'Home',
    },
    {
      href: '/products',
      label: language === 'ar' ? 'المنتجات' : 'Products',
    },
    {
      href: '/categories',
      label: language === 'ar' ? 'الفئات' : 'Categories',
    },
    {
      href: '/about',
      label: language === 'ar' ? 'من نحن' : 'About Us',
    },
    {
      href: '/blog',
      label: language === 'ar' ? 'المدونة' : 'Blog',
    },
    {
      href: '/contact',
      label: language === 'ar' ? 'اتصل بنا' : 'Contact',
    },
  ];

  return (
    <div className={`w-full ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+971 4 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{language === 'ar' ? 'التوصيل في جميع أنحاء الإمارات' : 'Delivery across UAE'}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span>{language === 'ar' ? 'توصيل مجاني للطلبات أكثر من 50€' : 'Free delivery on orders over €50'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Droplets className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">
                  {language === 'ar' ? 'مياه الإمارات' : 'UAE Waters'}
                </span>
                <span className="text-xs text-blue-100">
                  {language === 'ar' ? 'خدمة توصيل المياه' : 'Water Delivery Service'}
                </span>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder={language === 'ar' ? 'ابحث عن المنتجات...' : 'Search for products...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 text-gray-900 bg-white border-0 rounded-md focus:ring-2 focus:ring-blue-300"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                    <Globe className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {language === 'ar' ? 'العربية' : 'EN'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem onClick={() => onLanguageChange?.('en')} className="cursor-pointer">
                    <span className="mr-2">🇺🇸</span>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onLanguageChange?.('ar')} className="cursor-pointer">
                    <span className="mr-2">🇦🇪</span>
                    العربية
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative text-white hover:bg-blue-700">
                  <ShoppingCart className="w-5 h-5" />
                  {itemCount > 0 && (
                    <Badge
                      className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs bg-orange-500 text-white border-0"
                    >
                      {itemCount > 99 ? '99+' : itemCount}
                    </Badge>
                  )}
                  <span className="hidden md:inline ml-2">
                    {language === 'ar' ? 'السلة' : 'Cart'}
                  </span>
                </Button>
              </Link>

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden text-white hover:bg-blue-700">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side={isRTL ? 'left' : 'right'} className="w-80 bg-white">
                  <div className="flex flex-col space-y-6 mt-6">
                    {/* Mobile Search */}
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder={language === 'ar' ? 'ابحث عن المنتجات...' : 'Search products...'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 pl-10 pr-4"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>

                    {/* Mobile Navigation */}
                    <div className="flex flex-col space-y-2">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-3 px-4 rounded-md hover:bg-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Categories Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-12 space-x-8 overflow-x-auto">
            <Link href="/categories/bottles" className="text-gray-700 hover:text-blue-600 text-sm font-medium whitespace-nowrap">
              {language === 'ar' ? 'زجاجات المياه' : 'Water Bottles'}
            </Link>
            <Link href="/categories/family-packs" className="text-gray-700 hover:text-blue-600 text-sm font-medium whitespace-nowrap">
              {language === 'ar' ? 'عبوات العائلة' : 'Family Packs'}
            </Link>

            <Link href="/categories/sparkling" className="text-gray-700 hover:text-blue-600 text-sm font-medium whitespace-nowrap">
              {language === 'ar' ? 'المياه الغازية' : 'Sparkling Water'}
            </Link>
            <Link href="/categories/alkaline" className="text-gray-700 hover:text-blue-600 text-sm font-medium whitespace-nowrap">
              {language === 'ar' ? 'المياه القلوية' : 'Alkaline Water'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
