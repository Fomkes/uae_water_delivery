'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { categories } from '@/data/products';
import {
  Download,
  FileSpreadsheet,
  FileText,
  FileImage,
  Database,
  Calendar,
  Filter,
  Settings,
  CheckCircle,
  Loader2,
  AlertCircle,
  Package,
  Languages,
  Columns
} from 'lucide-react';

// Интерфейсы
interface ExportConfig {
  format: 'csv' | 'excel' | 'json' | 'pdf';
  language: 'en' | 'ar' | 'both';
  category: string;
  dateFrom: string;
  dateTo: string;
  inStock?: boolean;
  fields: string[];
}

interface ExportStats {
  totalProducts: number;
  byCategory: { [key: string]: number };
  inStock: number;
  outOfStock: number;
}

export default function ProductExportPage() {
  const [exportConfig, setExportConfig] = useState<ExportConfig>({
    format: 'excel',
    language: 'en',
    category: 'all',
    dateFrom: '',
    dateTo: '',
    inStock: undefined,
    fields: []
  });

  const [exportStats, setExportStats] = useState<ExportStats | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  // Доступные поля для экспорта
  const availableFields = [
    { id: 'id', label: 'Product ID', description: 'Unique product identifier' },
    { id: 'name', label: 'Name', description: 'Product name (multilingual)' },
    { id: 'description', label: 'Description', description: 'Product description' },
    { id: 'category', label: 'Category', description: 'Product category' },
    { id: 'price', label: 'Price', description: 'Current price' },
    { id: 'originalPrice', label: 'Original Price', description: 'Original price before discount' },
    { id: 'inStock', label: 'In Stock', description: 'Stock availability' },
    { id: 'stockQuantity', label: 'Stock Quantity', description: 'Available quantity' },
    { id: 'rating', label: 'Rating', description: 'Product rating' },
    { id: 'reviews', label: 'Reviews', description: 'Number of reviews' },
    { id: 'volume', label: 'Volume', description: 'Product volume/size' },
    { id: 'origin', label: 'Origin', description: 'Country/region of origin' },
    { id: 'features', label: 'Features', description: 'Product features list' },
    { id: 'images', label: 'Images', description: 'Product image URLs' },
    { id: 'created_at', label: 'Created Date', description: 'Date when product was added' }
  ];

  // Загрузка статистики товаров
  const loadExportStats = async () => {
    setIsLoadingStats(true);
    try {
      const response = await fetch('/api/products?limit=1000');
      if (response.ok) {
        const data = await response.json();
        const products = data.products || [];

        const stats: ExportStats = {
          totalProducts: products.length,
          byCategory: {},
          inStock: products.filter((p: any) => p.in_stock).length,
          outOfStock: products.filter((p: any) => !p.in_stock).length
        };

        // Подсчет по категориям
        products.forEach((product: any) => {
          const category = product.category || 'Unknown';
          stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
        });

        setExportStats(stats);
      }
    } catch (error) {
      console.error('Error loading export stats:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  useEffect(() => {
    loadExportStats();
    // Выбираем все поля по умолчанию
    setExportConfig(prev => ({
      ...prev,
      fields: availableFields.map(f => f.id)
    }));
  }, []);

  // Обработка изменения конфигурации
  const updateConfig = (key: keyof ExportConfig, value: any) => {
    setExportConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Переключение поля для экспорта
  const toggleField = (fieldId: string) => {
    setExportConfig(prev => ({
      ...prev,
      fields: prev.fields.includes(fieldId)
        ? prev.fields.filter(id => id !== fieldId)
        : [...prev.fields, fieldId]
    }));
  };

  // Выбор/снятие всех полей
  const toggleAllFields = () => {
    const allFieldIds = availableFields.map(f => f.id);
    setExportConfig(prev => ({
      ...prev,
      fields: prev.fields.length === allFieldIds.length ? [] : allFieldIds
    }));
  };

  // Экспорт каталога
  const handleExport = async () => {
    if (exportConfig.fields.length === 0) {
      alert('Выберите хотя бы одно поле для экспорта');
      return;
    }

    setIsExporting(true);

    try {
      const params = new URLSearchParams();
      params.append('format', exportConfig.format);
      params.append('language', exportConfig.language);

      if (exportConfig.category !== 'all') {
        params.append('category', exportConfig.category);
      }

      if (exportConfig.dateFrom) {
        params.append('dateFrom', exportConfig.dateFrom);
      }

      if (exportConfig.dateTo) {
        params.append('dateTo', exportConfig.dateTo);
      }

      if (exportConfig.inStock !== undefined) {
        params.append('inStock', exportConfig.inStock.toString());
      }

      params.append('fields', exportConfig.fields.join(','));

      const response = await fetch(`/api/export?${params.toString()}`);

      if (response.ok) {
        // Получаем имя файла из заголовков
        const contentDisposition = response.headers.get('Content-Disposition');
        const fileName = contentDisposition
          ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
          : `export_${Date.now()}.${exportConfig.format}`;

        // Скачиваем файл
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        alert(`✅ Экспорт завершен! Файл ${fileName} скачан.`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Export failed');
      }
    } catch (error) {
      console.error('Export error:', error);
      alert(`❌ Ошибка экспорта: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExporting(false);
    }
  };

  // Получение иконки формата
  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'excel': return <FileSpreadsheet className="h-4 w-4" />;
      case 'csv': return <FileText className="h-4 w-4" />;
      case 'json': return <Database className="h-4 w-4" />;
      case 'pdf': return <FileImage className="h-4 w-4" />;
      default: return <Download className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">📊 Экспорт каталога товаров</h1>
        <p className="text-gray-600">Выгрузка каталога товаров в различные форматы для анализа и интеграций</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Основные настройки */}
        <div className="lg:col-span-2 space-y-6">
          {/* Формат экспорта */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Формат экспорта
              </CardTitle>
              <CardDescription>
                Выберите формат файла для экспорта каталога
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { format: 'excel', label: 'Excel (XLSX)', desc: 'Для Microsoft Excel' },
                  { format: 'csv', label: 'CSV', desc: 'Для Google Sheets' },
                  { format: 'json', label: 'JSON', desc: 'Для API интеграций' },
                  { format: 'pdf', label: 'PDF', desc: 'Для печати каталога' }
                ].map((item) => (
                  <div
                    key={item.format}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      exportConfig.format === item.format
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => updateConfig('format', item.format)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {getFormatIcon(item.format)}
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <p className="text-xs text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Языковые настройки */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                Языковые настройки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={exportConfig.language} onValueChange={(value: any) => updateConfig('language', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English only</SelectItem>
                  <SelectItem value="ar">العربية only</SelectItem>
                  <SelectItem value="both">Both languages</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Фильтры */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Фильтры экспорта
              </CardTitle>
              <CardDescription>
                Ограничьте экспорт определенными товарами
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Категория */}
              <div>
                <Label>Категория товаров</Label>
                <Select value={exportConfig.category} onValueChange={(value) => updateConfig('category', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
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
              </div>

              {/* Период */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Дата от</Label>
                  <Input
                    type="date"
                    value={exportConfig.dateFrom}
                    onChange={(e) => updateConfig('dateFrom', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Дата до</Label>
                  <Input
                    type="date"
                    value={exportConfig.dateTo}
                    onChange={(e) => updateConfig('dateTo', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Наличие */}
              <div>
                <Label>Статус наличия</Label>
                <Select
                  value={exportConfig.inStock === undefined ? 'all' : exportConfig.inStock.toString()}
                  onValueChange={(value) => updateConfig('inStock', value === 'all' ? undefined : value === 'true')}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все товары</SelectItem>
                    <SelectItem value="true">Только в наличии</SelectItem>
                    <SelectItem value="false">Только отсутствующие</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Выбор полей */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Columns className="h-5 w-5" />
                Поля для экспорта
              </CardTitle>
              <CardDescription>
                Выберите какие поля товаров включить в экспорт
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={exportConfig.fields.length === availableFields.length}
                    onCheckedChange={toggleAllFields}
                  />
                  <Label className="font-medium">
                    Выбрать все поля ({exportConfig.fields.length}/{availableFields.length})
                  </Label>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availableFields.map((field) => (
                    <div key={field.id} className="flex items-start gap-2">
                      <Checkbox
                        checked={exportConfig.fields.includes(field.id)}
                        onCheckedChange={() => toggleField(field.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label className="text-sm font-medium">{field.label}</Label>
                        <p className="text-xs text-gray-600">{field.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Боковая панель */}
        <div className="space-y-6">
          {/* Статистика каталога */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Статистика каталога
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingStats ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                </div>
              ) : exportStats ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{exportStats.totalProducts}</div>
                      <div className="text-sm text-gray-600">Всего товаров</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{exportStats.inStock}</div>
                      <div className="text-sm text-gray-600">В наличии</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">По категориям:</h4>
                    <div className="space-y-2">
                      {Object.entries(exportStats.byCategory).map(([category, count]) => (
                        <div key={category} className="flex justify-between text-sm">
                          <span className="text-gray-600">{category}</span>
                          <span className="font-medium">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  Не удалось загрузить статистику
                </div>
              )}
            </CardContent>
          </Card>

          {/* Предварительный просмотр */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Предварительный просмотр
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Формат:</span>
                <Badge variant="outline">{exportConfig.format.toUpperCase()}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Язык:</span>
                <Badge variant="outline">
                  {exportConfig.language === 'en' ? 'English' :
                   exportConfig.language === 'ar' ? 'العربية' : 'Both'}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Категория:</span>
                <Badge variant="outline">
                  {exportConfig.category === 'all' ? 'Все' : exportConfig.category}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Полей:</span>
                <Badge variant="outline">{exportConfig.fields.length}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Кнопка экспорта */}
          <Card>
            <CardContent className="p-6">
              <Button
                onClick={handleExport}
                disabled={isExporting || exportConfig.fields.length === 0}
                className="w-full"
                size="lg"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Экспорт...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Скачать каталог
                  </>
                )}
              </Button>

              {exportConfig.fields.length === 0 && (
                <Alert className="mt-4" variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Выберите хотя бы одно поле для экспорта
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Справка */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">💡 Справка</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-gray-600 space-y-2">
              <p><strong>Excel:</strong> Лучший выбор для анализа данных</p>
              <p><strong>CSV:</strong> Универсальный формат для импорта</p>
              <p><strong>JSON:</strong> Для API интеграций и разработки</p>
              <p><strong>PDF:</strong> Для печати и презентаций</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
