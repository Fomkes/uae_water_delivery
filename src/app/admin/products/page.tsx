'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from '@/data/products';
import { Product } from '@/types';
import {
  Search,
  Plus,
  Upload,
  Edit,
  Trash2,
  Eye,
  Filter,
  SortAsc,
  SortDesc
} from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Загрузка товаров из API (Supabase)
  const loadProducts = async () => {
    try {
      setIsLoading(true);

      // Строим URL с параметрами для фильтрации
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      if (stockFilter !== 'all') {
        params.append('in_stock', stockFilter === 'in-stock' ? 'true' : 'false');
      }
      params.append('limit', '100'); // Загружаем больше товаров для админки

      const response = await fetch(`/api/products?${params.toString()}`);

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
        console.log('Товары загружены из Supabase:', data.products?.length || 0);
      } else {
        const errorData = await response.json();
        console.error('Failed to load products:', errorData.error);
        alert(`Ошибка загрузки товаров: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      alert('Ошибка подключения к серверу');
    } finally {
      setIsLoading(false);
    }
  };

  // Загружаем товары при монтировании компонента
  useEffect(() => {
    loadProducts();
  }, []);

  // Фильтрация и сортировка товаров
  useEffect(() => {
    let filtered = [...products];

    // Поиск по названию
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.nameAr.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Фильтр по категории
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Фильтр по наличию
    if (stockFilter !== 'all') {
      filtered = filtered.filter(product =>
        stockFilter === 'in-stock' ? product.inStock : !product.inStock
      );
    }

    // Сортировка
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'stock':
          aValue = a.stockQuantity;
          bValue = b.stockQuantity;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, stockFilter, sortBy, sortOrder]);

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот товар? Это действие необратимо.')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Товар удален:', productId);
        // Перезагружаем список товаров
        await loadProducts();
      } else {
        const errorData = await response.json();
        alert(`Ошибка удаления: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Ошибка при удалении товара');
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Управление товарами</h1>
          <p className="text-gray-600">Всего товаров: {filteredProducts.length}</p>
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

      {/* Фильтры и поиск */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Фильтры и поиск
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Поиск */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Поиск товаров..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Категория */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Наличие */}
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Наличие" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все товары</SelectItem>
                <SelectItem value="in-stock">В наличии</SelectItem>
                <SelectItem value="out-of-stock">Нет в наличии</SelectItem>
              </SelectContent>
            </Select>

            {/* Сортировка */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Сортировать по" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Название</SelectItem>
                <SelectItem value="price">Цена</SelectItem>
                <SelectItem value="stock">Остаток</SelectItem>
                <SelectItem value="rating">Рейтинг</SelectItem>
              </SelectContent>
            </Select>

            {/* Порядок сортировки */}
            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="justify-start"
            >
              {sortOrder === 'asc' ? (
                <SortAsc className="h-4 w-4 mr-2" />
              ) : (
                <SortDesc className="h-4 w-4 mr-2" />
              )}
              {sortOrder === 'asc' ? 'По возрастанию' : 'По убыванию'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Список товаров */}
      {isLoading ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка товаров...</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.nameAr}</p>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  {/* Цена */}
                  <div className="text-center">
                    <p className="text-lg font-bold">€{product.price}</p>
                    {product.originalPrice && (
                      <p className="text-sm text-gray-500 line-through">
                        €{product.originalPrice}
                      </p>
                    )}
                  </div>

                  {/* Остаток */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Остаток:</p>
                    <p className="font-medium">{product.stockQuantity} шт.</p>
                  </div>

                  {/* Статус */}
                  <div className="text-center">
                    <Badge
                      variant={product.inStock ? 'default' : 'destructive'}
                      className="mb-2"
                    >
                      {product.inStock ? 'В наличии' : 'Нет в наличии'}
                    </Badge>
                    {product.popular && (
                      <Badge variant="secondary" className="block">
                        Популярный
                      </Badge>
                    )}
                  </div>

                  {/* Рейтинг */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Рейтинг:</p>
                    <p className="font-medium">⭐ {product.rating}/5</p>
                    <p className="text-xs text-gray-500">({product.reviews} отзывов)</p>
                  </div>

                  {/* Действия */}
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/products/${product.slug}`} target="_blank">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/admin/products/edit/${product.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        </div>
      )}

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Товары не найдены
            </h3>
            <p className="text-gray-600">
              Попробуйте изменить критерии поиска или добавить новые товары.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
