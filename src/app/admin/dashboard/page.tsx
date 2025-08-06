'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/data/products';
import Link from 'next/link';
import {
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  Plus,
  Upload,
  Eye,
  Edit,
  AlertTriangle
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    inStockProducts: 0,
    outOfStockProducts: 0,
    totalValue: 0,
    averagePrice: 0
  });

  const [recentProducts, setRecentProducts] = useState(products.slice(0, 5));

  useEffect(() => {
    // Вычисляем статистику
    const inStock = products.filter(p => p.inStock).length;
    const outOfStock = products.filter(p => !p.inStock).length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stockQuantity), 0);
    const averagePrice = products.reduce((sum, p) => sum + p.price, 0) / products.length;

    setStats({
      totalProducts: products.length,
      totalCategories: categories.length,
      inStockProducts: inStock,
      outOfStockProducts: outOfStock,
      totalValue: totalValue,
      averagePrice: averagePrice
    });
  }, []);

  const statCards = [
    {
      title: 'Всего товаров',
      value: stats.totalProducts,
      description: 'Общее количество товаров',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Категории',
      value: stats.totalCategories,
      description: 'Активные категории',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'В наличии',
      value: stats.inStockProducts,
      description: 'Товары в наличии',
      icon: ShoppingCart,
      color: 'text-emerald-600'
    },
    {
      title: 'Нет в наличии',
      value: stats.outOfStockProducts,
      description: 'Требуют пополнения',
      icon: AlertTriangle,
      color: 'text-red-600'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Панель управления</h1>
          <p className="text-gray-600">Обзор магазина UAE Water Delivery</p>
        </div>
        <div className="space-x-2">
          <Button asChild>
            <Link href="/admin/products/add">
              <Plus className="h-4 w-4 mr-2" />
              Добавить товар
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/products/parse">
              <Upload className="h-4 w-4 mr-2" />
              Парсинг товаров
            </Link>
          </Button>
        </div>
      </div>

      {/* Статистические карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Финансовая статистика */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Общая стоимость товаров</CardTitle>
            <CardDescription>
              Суммарная стоимость всех товаров в наличии
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              €{stats.totalValue.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Средняя цена товара</CardTitle>
            <CardDescription>
              Средняя цена по всем товарам
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              €{stats.averagePrice.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Недавние товары */}
      <Card>
        <CardHeader>
          <CardTitle>Последние товары</CardTitle>
          <CardDescription>
            Обзор недавно добавленных товаров
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">€{product.price}</p>
                    <Badge variant={product.inStock ? 'default' : 'destructive'}>
                      {product.inStock ? 'В наличии' : 'Нет в наличии'}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/products/${product.slug}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/admin/products/edit/${product.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
