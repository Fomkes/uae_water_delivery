'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { categories } from '@/data/products';
import {
  Link as LinkIcon,
  Download,
  CheckCircle,
  AlertCircle,
  Loader2,
  Eye,
  Save,
  RefreshCw,
  Upload,
  ShoppingBag,
  Globe,
  Image as ImageIcon,
  DollarSign,
  Package,
  AlertTriangle,
  Clock,
  Trash2,
  Check,
  X
} from 'lucide-react';

// Интерфейс для результата парсинга
interface ParseResult {
  success: boolean;
  products?: ParsedProduct[];
  totalFound?: number;
  source?: string;
  timestamp?: string;
  message?: string;
  error?: string;
  details?: string;
  suggestions?: string[];
}

// Интерфейс для спарсенного товара
interface ParsedProduct {
  name: string;
  nameAr?: string;
  description: string;
  descriptionAr?: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  categoryAr?: string;
  size?: string;
  sizeAr?: string;
  volume?: string;
  volumeAr?: string;
  origin?: string;
  originAr?: string;
  features: string[];
  featuresAr?: string[];
  rating?: number;
  reviews?: number;
  slug: string;
  sourceUrl: string;
  inStock: boolean;
  stockQuantity: number;
}

export default function ProductParsePage() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [maxProducts, setMaxProducts] = useState(20);
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const [isSavingProducts, setIsSavingProducts] = useState(false);
  const [saveProgress, setSaveProgress] = useState(0);

  // Функция для парсинга товаров (клиентская демо-версия)
  const handleParse = async () => {
    if (!url.trim()) {
      alert('Пожалуйста, введите URL для парсинга');
      return;
    }

    // Проверка формата URL
    try {
      new URL(url);
    } catch {
      alert('Неверный формат URL. Убедитесь, что URL начинается с http:// или https://');
      return;
    }

    setIsLoading(true);
    setParseResult(null);
    setSelectedProducts(new Set());

    try {
      console.log(`🚀 Starting demo parse for: ${url}`);

      // Симуляция сетевого запроса
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Генерируем демо-товары на основе URL
      const siteType =
        url.includes('carrefour') ? 'Carrefour UAE' :
        url.includes('lulu') ? 'LuLu Hypermarket' :
        url.includes('spinneys') ? 'Spinneys' :
        url.includes('amazon') ? 'Amazon UAE' : 'Generic Store';

      const mockProducts: ParsedProduct[] = Array.from({ length: Math.min(maxProducts, 8) }, (_, i) => ({
        name: `${siteType} Water ${i + 1}`,
        nameAr: `ماء ${siteType} ${i + 1}`,
        description: `Premium quality water product from ${siteType}. Perfect for daily hydration needs with natural minerals.`,
        descriptionAr: `منتج ماء عالي الجودة من ${siteType}. مثالي لاحتياجات الترطيب اليومية مع المعادن الطبيعية.`,
        price: 15 + Math.random() * 25,
        originalPrice: Math.random() > 0.7 ? 35 + Math.random() * 15 : undefined,
        image: '/uploads/products/default-water.jpg',
        images: ['/uploads/products/default-water.jpg'],
        category: selectedCategory || 'Natural Water',
        categoryAr: 'المياه الطبيعية',
        size: ['Small', 'Medium', 'Large'][Math.floor(Math.random() * 3)],
        sizeAr: ['صغير', 'متوسط', 'كبير'][Math.floor(Math.random() * 3)],
        volume: ['330ml', '500ml', '750ml', '1L', '1.5L'][Math.floor(Math.random() * 5)],
        volumeAr: ['330 مل', '500 مل', '750 مل', '1 لتر', '1.5 لتر'][Math.floor(Math.random() * 5)],
        origin: 'UAE',
        originAr: 'الإمارات',
        features: ['Natural', 'High Quality', 'BPA Free', 'Refreshing'],
        featuresAr: ['طبيعي', 'جودة عالية', 'خالي من BPA', 'منعش'],
        rating: 4.0 + Math.random() * 1.0,
        reviews: Math.floor(Math.random() * 150) + 10,
        slug: `${siteType.toLowerCase()}-water-${i + 1}`.replace(/\s+/g, '-'),
        sourceUrl: url,
        inStock: Math.random() > 0.2,
        stockQuantity: Math.floor(Math.random() * 100) + 10
      }));

      const result: ParseResult = {
        success: true,
        products: mockProducts,
        totalFound: mockProducts.length,
        source: url,
        timestamp: new Date().toISOString(),
        message: `Successfully parsed ${mockProducts.length} products from ${siteType} (Demo Mode)`
      };

      console.log('📦 Demo parse result:', result);
      setParseResult(result);

      if (result.success && result.products) {
        // Автоматически выбираем все товары
        const allIndices = new Set(result.products.map((_, index) => index));
        setSelectedProducts(allIndices);

        // Автоматически определяем категорию если не выбрана
        if (!selectedCategory && result.products.length > 0) {
          const firstProductCategory = result.products[0].category;
          setSelectedCategory(firstProductCategory);
        }
      }

    } catch (error) {
      console.error('❌ Parse error:', error);
      setParseResult({
        success: false,
        error: 'Ошибка демо-парсинга',
        details: error instanceof Error ? error.message : 'Неизвестная ошибка',
        suggestions: [
          'Это демо-версия парсера',
          'В реальной версии будет подключение к серверу',
          'Попробуйте другой URL',
          'Обратитесь к разработчику для полной версии'
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для сохранения выбранных товаров (демо-версия)
  const handleSaveSelectedProducts = async () => {
    if (!parseResult?.products || selectedProducts.size === 0) {
      alert('Нет выбранных товаров для сохранения');
      return;
    }

    if (!selectedCategory) {
      alert('Пожалуйста, выберите категорию товаров');
      return;
    }

    const selectedProductsList = Array.from(selectedProducts).map(index =>
      parseResult.products![index]
    );

    if (!confirm(`🚀 ДЕМО: Сохранить ${selectedProductsList.length} выбранных товаров в категории "${selectedCategory}"?\n\nЭто демо-версия. В реальной версии товары будут сохранены в базу данных.`)) {
      return;
    }

    setIsSavingProducts(true);
    setSaveProgress(0);

    try {
      // Симуляция сохранения товаров
      for (let i = 0; i < selectedProductsList.length; i++) {
        const product = selectedProductsList[i];

        // Симуляция API запроса
        await new Promise(resolve => setTimeout(resolve, 300));

        console.log(`✅ [DEMO] Saved product: ${product.name}`);

        // Обновляем прогресс
        const progress = ((i + 1) / selectedProductsList.length) * 100;
        setSaveProgress(progress);
      }

      // Показываем результат
      const message = `✅ ДЕМО: Операция завершена!

Обработано: ${selectedProductsList.length} товаров
Категория: ${selectedCategory}
Источник: ${parseResult.source}

📋 Список товаров:
${selectedProductsList.slice(0, 5).map((p, i) => `${i + 1}. ${p.name} - AED ${p.price.toFixed(2)}`).join('\n')}
${selectedProductsList.length > 5 ? `... и еще ${selectedProductsList.length - 5} товаров` : ''}

💡 Это демо-версия. В реальной системе товары будут сохранены в базу данных Supabase.`;

      alert(message);

      // Очищаем форму
      setParseResult(null);
      setUrl('');
      setSelectedProducts(new Set());
      setSelectedCategory('');

    } catch (error) {
      console.error('❌ Demo save error:', error);
      alert('❌ Ошибка демо-сохранения товаров');
    } finally {
      setIsSavingProducts(false);
      setSaveProgress(0);
    }
  };

  // Функция для переключения выбора товара
  const toggleProductSelection = (index: number) => {
    const newSelection = new Set(selectedProducts);
    if (newSelection.has(index)) {
      newSelection.delete(index);
    } else {
      newSelection.add(index);
    }
    setSelectedProducts(newSelection);
  };

  // Функция для выбора/отмены выбора всех товаров
  const toggleSelectAll = () => {
    if (!parseResult?.products) return;

    if (selectedProducts.size === parseResult.products.length) {
      setSelectedProducts(new Set());
    } else {
      const allIndices = new Set(parseResult.products.map((_, index) => index));
      setSelectedProducts(allIndices);
    }
  };

  const supportedSites = [
    { name: 'Carrefour UAE', url: 'carrefouruae.com', status: 'active' },
    { name: 'LuLu Hypermarket', url: 'luluhypermarket.com', status: 'active' },
    { name: 'Spinneys UAE', url: 'spinneys.com', status: 'active' },
    { name: 'Amazon UAE', url: 'amazon.ae', status: 'experimental' },
    { name: 'Noon UAE', url: 'noon.com', status: 'planned' },
    { name: 'Union Coop', url: 'unioncoop.ae', status: 'planned' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">🚀 Улучшенный парсер товаров</h1>
        <p className="text-gray-600">Автоматическое добавление товаров с популярных сайтов ОАЭ</p>
      </div>

      {/* Поддерживаемые сайты */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Поддерживаемые сайты
          </CardTitle>
          <CardDescription>
            Парсер автоматически определяет тип сайта и использует оптимизированные алгоритмы извлечения данных
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportedSites.map((site) => (
              <div key={site.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{site.name}</div>
                  <div className="text-sm text-gray-500">{site.url}</div>
                </div>
                <Badge variant={
                  site.status === 'active' ? 'default' :
                  site.status === 'experimental' ? 'secondary' : 'outline'
                }>
                  {site.status === 'active' ? '✅ Активен' :
                   site.status === 'experimental' ? '🧪 Тест' : '📅 Планируется'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Форма парсинга */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            Настройки парсинга
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* URL и основные настройки */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <Label htmlFor="url">URL страницы с товарами</Label>
              <Input
                id="url"
                placeholder="https://www.carrefouruae.com/mafuae/en/category/water-beverages..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="maxProducts">Максимум товаров</Label>
              <Select value={maxProducts.toString()} onValueChange={(value) => setMaxProducts(parseInt(value))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 товаров</SelectItem>
                  <SelectItem value="20">20 товаров</SelectItem>
                  <SelectItem value="50">50 товаров</SelectItem>
                  <SelectItem value="100">100 товаров</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Категория */}
          <div>
            <Label htmlFor="category">Категория товаров (опционально)</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Автоматическое определение категории" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Автоматическое определение</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Кнопка парсинга */}
          <Button
            onClick={handleParse}
            disabled={isLoading || !url.trim()}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Парсинг в процессе...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                🚀 Начать парсинг
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Результат парсинга */}
      {parseResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {parseResult.success ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              Результат парсинга
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!parseResult.success ? (
              <div className="space-y-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Ошибка:</strong> {parseResult.error}
                    {parseResult.details && (
                      <div className="mt-2 text-sm">{parseResult.details}</div>
                    )}
                  </AlertDescription>
                </Alert>

                {parseResult.suggestions && parseResult.suggestions.length > 0 && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Рекомендации:</strong>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        {parseResult.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-sm">{suggestion}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Успешно!</strong> Найдено {parseResult.totalFound} товаров.
                    {parseResult.source && ` Источник: ${parseResult.source}`}
                  </AlertDescription>
                </Alert>

                {parseResult.products && parseResult.products.length > 0 && (
                  <>
                    {/* Управление выбором */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Checkbox
                          checked={selectedProducts.size === parseResult.products.length}
                          onCheckedChange={toggleSelectAll}
                        />
                        <span className="font-medium">
                          Выбрано {selectedProducts.size} из {parseResult.products.length} товаров
                        </span>
                      </div>

                      {selectedProducts.size > 0 && (
                        <Button
                          onClick={handleSaveSelectedProducts}
                          disabled={isSavingProducts || !selectedCategory}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {isSavingProducts ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Сохранение...
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              Сохранить выбранные ({selectedProducts.size})
                            </>
                          )}
                        </Button>
                      )}
                    </div>

                    {/* Прогресс сохранения */}
                    {isSavingProducts && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Сохранение товаров...</span>
                          <span>{Math.round(saveProgress)}%</span>
                        </div>
                        <Progress value={saveProgress} className="w-full" />
                      </div>
                    )}

                    {/* Список товаров */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {parseResult.products.map((product, index) => (
                        <div
                          key={index}
                          className={`border rounded-lg p-4 space-y-3 ${
                            selectedProducts.has(index)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200'
                          }`}
                        >
                          {/* Чекбокс выбора */}
                          <div className="flex items-center justify-between">
                            <Checkbox
                              checked={selectedProducts.has(index)}
                              onCheckedChange={() => toggleProductSelection(index)}
                            />
                            <Badge variant="outline">{product.category}</Badge>
                          </div>

                          {/* Изображение */}
                          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/uploads/products/default-water.jpg';
                              }}
                            />
                          </div>

                          {/* Информация о товаре */}
                          <div>
                            <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                            <p className="text-xs text-gray-600 line-clamp-2 mt-1">{product.description}</p>

                            <div className="flex items-center justify-between mt-2">
                              <div className="text-lg font-bold text-green-600">
                                AED {product.price.toFixed(2)}
                              </div>
                              {product.originalPrice && (
                                <div className="text-sm text-gray-500 line-through">
                                  AED {product.originalPrice.toFixed(2)}
                                </div>
                              )}
                            </div>

                            {/* Детали */}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {product.volume && (
                                <Badge variant="secondary" className="text-xs">{product.volume}</Badge>
                              )}
                              {product.origin && (
                                <Badge variant="secondary" className="text-xs">{product.origin}</Badge>
                              )}
                              <Badge variant={product.inStock ? 'default' : 'destructive'} className="text-xs">
                                {product.inStock ? 'В наличии' : 'Нет в наличии'}
                              </Badge>
                            </div>

                            {/* Характеристики */}
                            {product.features.length > 0 && (
                              <div className="mt-2">
                                <div className="text-xs text-gray-600">Особенности:</div>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {product.features.slice(0, 3).map((feature, featureIndex) => (
                                    <Badge key={featureIndex} variant="outline" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                  {product.features.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{product.features.length - 3}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Статистика и советы */}
      {!parseResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Советы по использованию
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Лучшие практики
                </h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Используйте прямые ссылки на категории товаров</li>
                  <li>Начинайте с малого количества товаров (10-20)</li>
                  <li>Проверяйте качество данных перед сохранением</li>
                  <li>Указывайте правильную категорию для лучшей организации</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  Ограничения
                </h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Некоторые сайты могут блокировать автоматические запросы</li>
                  <li>Качество данных зависит от структуры сайта</li>
                  <li>Изображения могут потребовать дополнительной обработки</li>
                  <li>Всегда проверяйте результаты перед публикацией</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
