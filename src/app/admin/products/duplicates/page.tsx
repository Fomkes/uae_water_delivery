'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Search,
  AlertTriangle,
  Trash2,
  RefreshCw,
  CheckCircle,
  Clock,
  Package,
  Users,
  TrendingUp,
  Settings,
  Loader2,
  Eye,
  X,
  Merge
} from 'lucide-react';

// Интерфейсы
interface Product {
  id: string;
  name: string;
  name_ar: string;
  slug: string;
  price: number;
  category: string;
  image: string;
  created_at: string;
}

interface DuplicateGroup {
  id: string;
  products: Product[];
  similarityScore: number;
  reason: string;
}

interface DuplicateResult {
  duplicates: DuplicateGroup[];
  totalChecked: number;
  duplicateGroups: number;
  totalDuplicates: number;
  method: string;
  threshold: number;
  message: string;
}

export default function ProductDuplicatesPage() {
  const [duplicateResult, setDuplicateResult] = useState<DuplicateResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('name');
  const [threshold, setThreshold] = useState(80);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);

  // Поиск дубликатов
  const handleSearchDuplicates = async () => {
    setIsLoading(true);
    setDuplicateResult(null);
    setSelectedProducts(new Set());

    try {
      console.log(`🔍 Searching for duplicates using method: ${selectedMethod}, threshold: ${threshold}%`);

      const response = await fetch(`/api/products/duplicates?method=${selectedMethod}&threshold=${threshold}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result: DuplicateResult = await response.json();
      console.log('📊 Duplicate results:', result);

      setDuplicateResult(result);

    } catch (error) {
      console.error('❌ Error searching duplicates:', error);
      alert(`Ошибка поиска дубликатов: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Переключение выбора товара
  const toggleProductSelection = (productId: string) => {
    const newSelection = new Set(selectedProducts);
    if (newSelection.has(productId)) {
      newSelection.delete(productId);
    } else {
      newSelection.add(productId);
    }
    setSelectedProducts(newSelection);
  };

  // Выбор всех товаров в группе (кроме первого)
  const selectDuplicatesInGroup = (group: DuplicateGroup) => {
    const newSelection = new Set(selectedProducts);
    // Оставляем первый товар (самый старый), выбираем остальные
    group.products.slice(1).forEach(product => {
      newSelection.add(product.id);
    });
    setSelectedProducts(newSelection);
  };

  // Удаление выбранных дубликатов
  const handleDeleteSelected = async () => {
    if (selectedProducts.size === 0) {
      alert('Выберите товары для удаления');
      return;
    }

    if (!confirm(`Удалить ${selectedProducts.size} выбранных товаров? Это действие нельзя отменить.`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch('/api/products/duplicates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'delete',
          productIds: Array.from(selectedProducts)
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`✅ Успешно удалено ${result.deletedCount} товаров`);

        // Обновляем результаты
        setSelectedProducts(new Set());
        await handleSearchDuplicates();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка удаления');
      }

    } catch (error) {
      console.error('❌ Error deleting duplicates:', error);
      alert(`Ошибка удаления: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  // Автоматический выбор дубликатов
  const autoSelectDuplicates = () => {
    if (!duplicateResult) return;

    const newSelection = new Set<string>();
    duplicateResult.duplicates.forEach(group => {
      // В каждой группе оставляем первый товар (самый старый), выбираем остальные
      group.products.slice(1).forEach(product => {
        newSelection.add(product.id);
      });
    });
    setSelectedProducts(newSelection);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">🔍 Управление дубликатами</h1>
        <p className="text-gray-600">Поиск и удаление дублирующихся товаров в каталоге</p>
      </div>

      {/* Настройки поиска */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Настройки поиска дубликатов
          </CardTitle>
          <CardDescription>
            Выберите метод поиска и порог схожести для обнаружения дубликатов
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Метод поиска */}
            <div>
              <label className="text-sm font-medium mb-2 block">Метод поиска</label>
              <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">По названию товара</SelectItem>
                  <SelectItem value="slug">По URL slug</SelectItem>
                  <SelectItem value="price_name">По цене + названию</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Порог схожести */}
            <div>
              <label className="text-sm font-medium mb-2 block">Порог схожести (%)</label>
              <Select value={threshold.toString()} onValueChange={(value) => setThreshold(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60">60% - Низкий</SelectItem>
                  <SelectItem value="70">70% - Средний</SelectItem>
                  <SelectItem value="80">80% - Высокий</SelectItem>
                  <SelectItem value="90">90% - Очень высокий</SelectItem>
                  <SelectItem value="95">95% - Точный</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Кнопка поиска */}
            <div className="flex items-end">
              <Button
                onClick={handleSearchDuplicates}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Поиск...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Найти дубликаты
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Объяснение методов */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm text-gray-600">
            <div className="p-3 bg-gray-50 rounded-lg">
              <strong>По названию:</strong> Сравнивает названия товаров на английском и арабском языках
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <strong>По URL slug:</strong> Находит товары с похожими URL-адресами
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <strong>По цене + названию:</strong> Комбинированный поиск по цене и названию
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Результаты поиска */}
      {duplicateResult && (
        <>
          {/* Статистика */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <p className="text-2xl font-bold">{duplicateResult.totalChecked}</p>
                    <p className="text-sm text-gray-600">Проверено товаров</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-orange-600 mr-3" />
                  <div>
                    <p className="text-2xl font-bold">{duplicateResult.duplicateGroups}</p>
                    <p className="text-sm text-gray-600">Групп дубликатов</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
                  <div>
                    <p className="text-2xl font-bold">{duplicateResult.totalDuplicates}</p>
                    <p className="text-sm text-gray-600">Всего дубликатов</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <p className="text-2xl font-bold">{Math.round((duplicateResult.totalDuplicates / duplicateResult.totalChecked) * 100)}%</p>
                    <p className="text-sm text-gray-600">Процент дубликатов</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Управление выбором */}
          {duplicateResult.duplicates.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Управление дубликатами
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    onClick={autoSelectDuplicates}
                    variant="outline"
                    size="sm"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Выбрать все дубликаты ({duplicateResult.totalDuplicates - duplicateResult.duplicateGroups})
                  </Button>

                  <Button
                    onClick={() => setSelectedProducts(new Set())}
                    variant="outline"
                    size="sm"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Снять выбор
                  </Button>

                  <Separator orientation="vertical" className="h-6" />

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      Выбрано: <strong>{selectedProducts.size}</strong> товаров
                    </span>
                  </div>

                  {selectedProducts.size > 0 && (
                    <Button
                      onClick={handleDeleteSelected}
                      disabled={isDeleting}
                      variant="destructive"
                      size="sm"
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Удаление...
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Удалить выбранные ({selectedProducts.size})
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Список групп дубликатов */}
          {duplicateResult.duplicates.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Дубликаты не найдены!</h3>
                <p className="text-gray-600">
                  Проверено {duplicateResult.totalChecked} товаров. Дублирующиеся товары не обнаружены.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {duplicateResult.duplicates.map((group, groupIndex) => (
                <Card key={group.id} className="border border-orange-200">
                  <CardHeader className="bg-orange-50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                        Группа дубликатов #{groupIndex + 1}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          Схожесть: {Math.round(group.similarityScore)}%
                        </Badge>
                        <Button
                          onClick={() => selectDuplicatesInGroup(group)}
                          variant="outline"
                          size="sm"
                        >
                          Выбрать дубликаты
                        </Button>
                      </div>
                    </div>
                    <CardDescription>{group.reason}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                      {group.products.map((product, productIndex) => (
                        <div
                          key={product.id}
                          className={`p-6 border-r border-b last:border-r-0 ${
                            productIndex === 0
                              ? 'bg-green-50 border-l-4 border-l-green-500'
                              : selectedProducts.has(product.id)
                              ? 'bg-red-50 border-l-4 border-l-red-500'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {/* Чекбокс и статус */}
                          <div className="flex items-center justify-between mb-3">
                            {productIndex === 0 ? (
                              <Badge className="bg-green-600 text-white">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Оригинал
                              </Badge>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  checked={selectedProducts.has(product.id)}
                                  onCheckedChange={() => toggleProductSelection(product.id)}
                                />
                                <Badge variant="destructive">
                                  Дубликат
                                </Badge>
                              </div>
                            )}
                            <span className="text-xs text-gray-500">
                              {new Date(product.created_at).toLocaleDateString()}
                            </span>
                          </div>

                          {/* Изображение товара */}
                          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/uploads/products/default-water.jpg';
                              }}
                            />
                          </div>

                          {/* Информация о товаре */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm line-clamp-2">{product.name}</h4>
                            {product.name_ar && (
                              <p className="text-xs text-gray-600 line-clamp-1" dir="rtl">
                                {product.name_ar}
                              </p>
                            )}

                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-green-600">
                                AED {product.price.toFixed(2)}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {product.category}
                              </Badge>
                            </div>

                            <div className="text-xs text-gray-500">
                              ID: {product.id.slice(0, 8)}...
                            </div>
                            <div className="text-xs text-gray-500">
                              Slug: {product.slug}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {/* Справка */}
      {!duplicateResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              О поиске дубликатов
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Как это работает:</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Система сравнивает товары по выбранному методу</li>
                  <li>Вычисляется процент схожести между товарами</li>
                  <li>Товары группируются по уровню схожести</li>
                  <li>Самый старый товар в группе считается оригиналом</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Рекомендации:</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Начните с высокого порога схожести (80-90%)</li>
                  <li>Всегда проверяйте результаты перед удалением</li>
                  <li>Сохраняйте резервные копии важных данных</li>
                  <li>Используйте разные методы для полной проверки</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
