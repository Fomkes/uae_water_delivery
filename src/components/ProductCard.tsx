'use client';

import { Product } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Star, ShoppingCart, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  language?: 'en' | 'ar';
}

export function ProductCard({ product, language = 'en' }: ProductCardProps) {
  const { addItem } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      addItem(product, 1);
      await new Promise(resolve => setTimeout(resolve, 300));
    } finally {
      setIsLoading(false);
    }
  };

  const name = language === 'ar' ? product.nameAr : product.name;
  const description = language === 'ar' ? product.descriptionAr : product.description;
  const size = language === 'ar' ? product.sizeAr : product.size;

  return (
    <Card className="group relative overflow-hidden bg-white border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md">
      {/* Product Link */}
      <Link href={`/products/${product.slug}`}>
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.image}
            alt={name}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.popular && (
              <Badge className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-2 py-1">
                {language === 'ar' ? 'شائع' : 'Popular'}
              </Badge>
            )}
            {product.originalPrice && (
              <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-2 py-1">
                {language === 'ar' ? 'خصم' : 'Save'}
              </Badge>
            )}
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <Badge variant="destructive" className="text-white font-medium">
                {language === 'ar' ? 'نفد المخزون' : 'Out of Stock'}
              </Badge>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/products/${product.slug}`}>
          <div className="space-y-2">
            {/* Product Name */}
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
              {name}
            </h3>

            {/* Product Size */}
            <p className="text-sm text-gray-600 font-medium">{size}</p>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">
                ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-blue-600">
                €{product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    €{product.originalPrice}
                  </span>
                  <Badge variant="outline" className="text-xs text-red-600 border-red-200">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </Badge>
                </>
              )}
            </div>

            {/* Stock Warning */}
            {product.inStock && product.stockQuantity <= 10 && (
              <p className="text-xs text-orange-600 font-medium">
                {language === 'ar'
                  ? `${product.stockQuantity} متبقي فقط`
                  : `Only ${product.stockQuantity} left`
                }
              </p>
            )}
          </div>
        </Link>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock || isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-9"
          size="sm"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">{language === 'ar' ? 'جاري الإضافة...' : 'Adding...'}</span>
            </div>
          ) : !product.inStock ? (
            <span className="text-sm">{language === 'ar' ? 'نفد المخزون' : 'Out of Stock'}</span>
          ) : (
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span className="text-sm">{language === 'ar' ? 'أضف للسلة' : 'Add to Cart'}</span>
            </div>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
