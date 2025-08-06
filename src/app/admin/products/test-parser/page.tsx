'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import {
  TestTube,
  CheckCircle,
  AlertCircle,
  Loader2,
  Globe,
  Clock,
  Package,
  Download,
  ExternalLink,
  Copy,
  Play
} from 'lucide-react';

interface TestResult {
  url: string;
  success: boolean;
  products?: any[];
  totalFound?: number;
  source?: string;
  timestamp?: string;
  message?: string;
  error?: string;
  details?: string;
  suggestions?: string[];
  duration?: number;
}

export default function TestParserPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);

  // Тестовые URL для разных сайтов
  const testUrls = [
    {
      name: 'Carrefour UAE - Water Category',
      url: 'https://www.carrefouruae.com/mafuae/en/c/FMUAE1540000?sortBy=relevance',
      description: 'Категория воды на Carrefour UAE',
      category: 'Natural Water',
      expected: '10-20 товаров'
    },
    {
      name: 'LuLu Hypermarket - Beverages',
      url: 'https://www.luluhypermarket.com/en-ae/category/beverages',
      description: 'Раздел напитков LuLu Hypermarket',
      category: 'Natural Water',
      expected: '15-25 товаров'
    },
    {
      name: 'Spinneys - Water & Beverages',
      url: 'https://www.spinneys.com/en/category/food-cupboard/drinks/water',
      description: 'Категория воды и напитков Spinneys',
      category: 'Natural Water',
      expected: '8-15 товаров'
    },
    {
      name: 'Amazon UAE - Water',
      url: 'https://www.amazon.ae/s?k=water+bottle&ref=nb_sb_noss',
      description: 'Поиск воды на Amazon UAE',
      category: 'Natural Water',
      expected: '5-10 товаров (экспериментально)'
    }
  ];

  // Запуск теста для одного URL
  const runSingleTest = async (testUrl: typeof testUrls[0]): Promise<TestResult> => {
    const startTime = Date.now();

    try {
      console.log(`🧪 Testing URL: ${testUrl.url}`);

      const response = await fetch('/api/parser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: testUrl.url,
          category: testUrl.category,
          maxProducts: 10
        }),
      });

      const duration = Date.now() - startTime;
      const result = await response.json();

      return {
        url: testUrl.url,
        success: response.ok,
        ...result,
        duration
      };

    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`❌ Test failed for ${testUrl.url}:`, error);

      return {
        url: testUrl.url,
        success: false,
        error: 'Network or parsing error',
        details: error instanceof Error ? error.message : 'Unknown error',
        duration
      };
    }
  };

  // Запуск всех тестов
  const runAllTests = async () => {
    setIsRunningTests(true);
    setTestResults([]);

    const results: TestResult[] = [];

    for (const testUrl of testUrls) {
      console.log(`🚀 Running test: ${testUrl.name}`);

      // Обновляем результаты по мере получения
      setTestResults([...results, {
        url: testUrl.url,
        success: false,
        error: 'Running...',
        duration: 0
      }]);

      const result = await runSingleTest(testUrl);
      results.push(result);

      // Обновляем результаты
      setTestResults([...results]);

      // Небольшая задержка между запросами
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsRunningTests(false);
    console.log('✅ All tests completed');
  };

  // Запуск выбранных тестов
  const runSelectedTests = async () => {
    if (selectedUrls.length === 0) {
      alert('Выберите URL для тестирования');
      return;
    }

    setIsRunningTests(true);
    setTestResults([]);

    const results: TestResult[] = [];
    const selectedTestUrls = testUrls.filter(test => selectedUrls.includes(test.url));

    for (const testUrl of selectedTestUrls) {
      console.log(`🚀 Running selected test: ${testUrl.name}`);

      const result = await runSingleTest(testUrl);
      results.push(result);
      setTestResults([...results]);

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsRunningTests(false);
  };

  // Копирование URL в буфер обмена
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Переключение выбора URL
  const toggleUrlSelection = (url: string) => {
    setSelectedUrls(prev =>
      prev.includes(url)
        ? prev.filter(u => u !== url)
        : [...prev, url]
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">🧪 Тестирование парсера</h1>
        <p className="text-gray-600">Проверка работы парсера на реальных сайтах ОАЭ</p>
      </div>

      {/* Управление тестами */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            Управление тестами
          </CardTitle>
          <CardDescription>
            Выберите сайты для тестирования или запустите все тесты сразу
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Button
              onClick={runAllTests}
              disabled={isRunningTests}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isRunningTests ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Тестирование...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Запустить все тесты
                </>
              )}
            </Button>

            <Button
              onClick={runSelectedTests}
              disabled={isRunningTests || selectedUrls.length === 0}
              variant="outline"
            >
              <Play className="h-4 w-4 mr-2" />
              Запустить выбранные ({selectedUrls.length})
            </Button>

            <Button
              onClick={() => setTestResults([])}
              variant="outline"
              disabled={isRunningTests}
            >
              Очистить результаты
            </Button>
          </div>

          {/* Список тестовых URL */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {testUrls.map((testUrl, index) => (
              <div
                key={index}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedUrls.includes(testUrl.url)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleUrlSelection(testUrl.url)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{testUrl.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{testUrl.description}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {testUrl.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {testUrl.expected}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(testUrl.url);
                        }}
                        className="p-1 h-6"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(testUrl.url, '_blank');
                        }}
                        className="p-1 h-6"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                      <span className="text-xs text-gray-500 truncate">
                        {testUrl.url.length > 50 ? `${testUrl.url.substring(0, 50)}...` : testUrl.url}
                      </span>
                    </div>
                  </div>

                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                    selectedUrls.includes(testUrl.url)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedUrls.includes(testUrl.url) && (
                      <CheckCircle className="h-3 w-3 text-white" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Результаты тестов */}
      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Результаты тестирования
            </CardTitle>
            <CardDescription>
              Результаты парсинга с различных сайтов ОАЭ
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Общая статистика */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{testResults.length}</div>
                <div className="text-sm text-gray-600">Всего тестов</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {testResults.filter(r => r.success).length}
                </div>
                <div className="text-sm text-gray-600">Успешных</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {testResults.filter(r => !r.success).length}
                </div>
                <div className="text-sm text-gray-600">Ошибок</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {testResults.reduce((sum, r) => sum + (r.totalFound || 0), 0)}
                </div>
                <div className="text-sm text-gray-600">Товаров найдено</div>
              </div>
            </div>

            {/* Детальные результаты */}
            <div className="space-y-4">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 ${
                    result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {result.success ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      )}
                      <h4 className="font-medium">
                        {testUrls.find(u => u.url === result.url)?.name || 'Unknown Test'}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      {result.duration !== undefined && (
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {(result.duration / 1000).toFixed(1)}s
                        </Badge>
                      )}
                      {result.success && result.totalFound && (
                        <Badge className="bg-green-600 text-white text-xs">
                          {result.totalFound} товаров
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {result.success ? (
                      <div>
                        <p className="text-sm text-green-700">
                          ✅ {result.message || 'Парсинг выполнен успешно'}
                        </p>
                        {result.products && result.products.length > 0 && (
                          <div className="mt-3">
                            <h5 className="font-medium text-sm mb-2">Найденные товары:</h5>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                              {result.products.slice(0, 6).map((product, productIndex) => (
                                <div key={productIndex} className="text-xs p-2 bg-white rounded border">
                                  <div className="font-medium truncate">{product.name}</div>
                                  <div className="text-gray-600">AED {product.price}</div>
                                  <div className="text-gray-500">{product.category}</div>
                                </div>
                              ))}
                            </div>
                            {result.products.length > 6 && (
                              <p className="text-xs text-gray-600 mt-2">
                                И еще {result.products.length - 6} товаров...
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-red-700">
                          ❌ {result.error || 'Произошла ошибка'}
                        </p>
                        {result.details && (
                          <p className="text-xs text-red-600 mt-1">{result.details}</p>
                        )}
                        {result.suggestions && result.suggestions.length > 0 && (
                          <div className="mt-2">
                            <h5 className="font-medium text-xs mb-1">Рекомендации:</h5>
                            <ul className="text-xs text-red-600 space-y-1">
                              {result.suggestions.map((suggestion, suggestionIndex) => (
                                <li key={suggestionIndex}>• {suggestion}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="text-xs text-gray-500 pt-2 border-t">
                      <span>URL: </span>
                      <span className="font-mono">{result.url}</span>
                      {result.timestamp && (
                        <span className="ml-4">
                          Время: {new Date(result.timestamp).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Информация о тестировании */}
      {testResults.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              О тестировании парсера
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Что тестируется:</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Подключение к различным сайтам ОАЭ</li>
                  <li>Извлечение информации о товарах</li>
                  <li>Обработка изображений</li>
                  <li>Время выполнения операций</li>
                  <li>Обработка ошибок и исключений</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Особенности тестирования:</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Некоторые сайты могут блокировать автоматические запросы</li>
                  <li>Скорость работы зависит от сайта</li>
                  <li>Качество данных может варьироваться</li>
                  <li>Тесты выполняются с задержкой между запросами</li>
                </ul>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Важно:</strong> Тестирование выполняется на реальных сайтах.
                Некоторые тесты могут завершиться ошибкой из-за изменений в структуре сайтов
                или мер защиты от автоматических запросов.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
