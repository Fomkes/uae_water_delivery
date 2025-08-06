'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { products } from '@/data/products';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Eye
} from 'lucide-react';

export default function AnalyticsPage() {
  // Mock данные для аналитики
  const analytics = {
    totalRevenue: 12450.50,
    totalOrders: 156,
    totalCustomers: 89,
    averageOrderValue: 79.81,
    topSellingProducts: products.slice(0, 5),
    recentActivity: [
      { action: 'Новый заказ', details: 'Заказ #1234 на сумму €45.99', timestamp: '2 минуты назад' },
      { action: 'Товар добавлен', details: 'Evian Natural Water 1.5L', timestamp: '15 минут назад' },
      { action: 'Товар спарсен', details: 'Al Ain Water 500ml с сайта Carrefour', timestamp: '1 час назад' },
      { action: 'Новый клиент', details: 'ahmed.mohamed@email.com', timestamp: '2 часа назад' },
      { action: 'Товар обновлен', details: 'Masafi Pure Water - цена изменена', timestamp: '3 часа назад' }
    ],
    monthlyData: [
      { month: 'Янв', revenue: 8500, orders: 85 },
      { month: 'Фев', revenue: 9200, orders: 92 },
      { month: 'Мар', revenue: 11800, orders: 118 },
      { month: 'Апр', revenue: 12450, orders: 156 }
    ]
  };

  const statsCards = [
    {
      title: 'Общий доход',
      value: `€${analytics.totalRevenue.toFixed(2)}`,
      description: 'За текущий месяц',
      icon: DollarSign,
      trend: '+12.5%',
      trendUp: true
    },
    {
      title: 'Заказы',
      value: analytics.totalOrders.toString(),
      description: 'За текущий месяц',
      icon: ShoppingCart,
      trend: '+8.2%',
      trendUp: true
    },
    {
      title: 'Клиенты',
      value: analytics.totalCustomers.toString(),
      description: 'Уникальные покупатели',
      icon: Users,
      trend: '+15.1%',
      trendUp: true
    },
    {
      title: 'Средний чек',
      value: `€${analytics.averageOrderValue.toFixed(2)}`,
      description: 'За заказ',
      icon: TrendingUp,
      trend: '-2.4%',
      trendUp: false
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Аналитика</h1>
        <p className="text-gray-600">Обзор производительности магазина</p>
      </div>

      {/* Статистические карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                  {stat.trendUp ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={stat.trendUp ? 'text-green-500' : 'text-red-500'}>
                    {stat.trend}
                  </span>
                  <span>{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Топ товары */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Топ товары
            </CardTitle>
            <CardDescription>
              Самые продаваемые товары этого месяца
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.topSellingProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">€{product.price}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{120 - index * 20} продаж</p>
                    <p className="text-xs text-gray-500">€{((120 - index * 20) * product.price).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Последняя активность */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Последняя активность
            </CardTitle>
            <CardDescription>
              Недавние действия в системе
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.details}</p>
                    <p className="text-xs text-gray-400">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Месячная статистика */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Месячная статистика
            </CardTitle>
            <CardDescription>
              Доход и количество заказов по месяцам
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.monthlyData.map((month, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm font-medium w-12">{month.month}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm">
                          <span className="text-gray-600">Доход:</span> €{month.revenue.toFixed(2)}
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Заказы:</span> {month.orders}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(month.revenue / 15000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
