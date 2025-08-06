'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import {
  FileSpreadsheet,
  FileText,
  Database,
  FileImage,
  Download,
  Info,
  CheckCircle,
  AlertCircle,
  Code,
  BookOpen,
  Lightbulb
} from 'lucide-react';

export default function ExportExamplesPage() {
  const formatExamples = [
    {
      format: 'Excel (XLSX)',
      icon: <FileSpreadsheet className="h-6 w-6 text-green-600" />,
      description: 'Лучший выбор для анализа данных, создания отчетов и работы с формулами',
      useCase: 'Финансовый анализ, создание отчетов, сводные таблицы',
      fields: ['Все поля', 'Автоматическое форматирование', 'Поддержка формул'],
      example: `=AVERAGE(C:C) - средняя цена
=COUNTIF(E:E,"Yes") - товары в наличии
=SUMIF(D:D,"Alkaline Water",C:C) - сумма по категории`,
      pros: ['Удобство работы с данными', 'Встроенные формулы', 'Графики и диаграммы'],
      cons: ['Больший размер файла', 'Требует Excel/LibreOffice']
    },
    {
      format: 'CSV',
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      description: 'Универсальный формат для импорта в любые системы',
      useCase: 'Импорт в CRM, ERP системы, Google Sheets, анализ в Python/R',
      fields: ['Все поля в текстовом формате', 'UTF-8 кодировка', 'Разделители: запятая'],
      example: `ID,Name,Category,Price,In Stock
uuid-123,"Premium Water","Natural Water","AED 25.99","Yes"
uuid-456,"Alkaline Plus","Alkaline Water","AED 32.50","Yes"`,
      pros: ['Универсальность', 'Малый размер', 'Простота обработки'],
      cons: ['Потеря форматирования', 'Только текст', 'Проблемы с кодировкой']
    },
    {
      format: 'JSON',
      icon: <Database className="h-6 w-6 text-purple-600" />,
      description: 'Структурированные данные для API интеграций и веб-разработки',
      useCase: 'API интеграции, веб-разработка, NoSQL базы данных',
      fields: ['Вложенные объекты', 'Массивы данных', 'Метаинформация'],
      example: `{
  "exportInfo": {
    "timestamp": "2024-01-15T10:30:00Z",
    "totalProducts": 156,
    "language": "en"
  },
  "products": [
    {
      "id": "uuid-123",
      "name": "Premium Water",
      "category": "Natural Water",
      "price": 25.99,
      "features": ["Natural", "BPA Free"]
    }
  ]
}`,
      pros: ['Структурированность', 'API совместимость', 'Типы данных'],
      cons: ['Больший размер', 'Нужны знания JSON', 'Сложнее для чтения']
    },
    {
      format: 'PDF',
      icon: <FileImage className="h-6 w-6 text-red-600" />,
      description: 'Готовый к печати каталог товаров с форматированием',
      useCase: 'Печатные каталоги, презентации, архивирование',
      fields: ['Основная информация', 'Красивое форматирование', 'Готов к печати'],
      example: `📄 UAE Waters - Product Catalog
Export Date: 15/01/2024
Total Products: 156

1. Premium Natural Spring Water
   Category: Natural Water
   Price: AED 25.99
   In Stock: Yes

2. Alkaline Water Plus
   Category: Alkaline Water
   Price: AED 32.50
   In Stock: Yes`,
      pros: ['Готов к печати', 'Красивое оформление', 'Постоянное форматирование'],
      cons: ['Нельзя редактировать', 'Большой размер', 'Только для просмотра']
    }
  ];

  const useCaseScenarios = [
    {
      title: 'Финансовый анализ',
      description: 'Анализ прибыльности товаров и категорий',
      format: 'Excel',
      fields: ['name', 'category', 'price', 'originalPrice', 'stockQuantity'],
      steps: [
        'Экспортируйте данные в Excel формате',
        'Добавьте колонку для расчета прибыли',
        'Создайте сводную таблицу по категориям',
        'Постройте графики продаж'
      ]
    },
    {
      title: 'Обновление цен',
      description: 'Массовое обновление цен через внешние системы',
      format: 'CSV',
      fields: ['id', 'name', 'price', 'category'],
      steps: [
        'Экспортируйте минимальный набор полей',
        'Обновите цены в таблице',
        'Импортируйте обратно через API',
        'Проверьте результат'
      ]
    },
    {
      title: 'API интеграция',
      description: 'Синхронизация с мобильным приложением',
      format: 'JSON',
      fields: ['id', 'name', 'price', 'images', 'inStock'],
      steps: [
        'Экспортируйте в JSON формате',
        'Настройте webhook для обновлений',
        'Интегрируйте с мобильным API',
        'Тестируйте синхронизацию'
      ]
    },
    {
      title: 'Печатный каталог',
      description: 'Создание каталога для офлайн продаж',
      format: 'PDF',
      fields: ['name', 'description', 'price', 'volume'],
      steps: [
        'Выберите товары для каталога',
        'Экспортируйте в PDF',
        'Распечатайте или отправьте клиентам',
        'Используйте для презентаций'
      ]
    }
  ];

  const tips = [
    {
      icon: <Lightbulb className="h-5 w-5 text-yellow-600" />,
      title: 'Оптимизация размера файла',
      content: 'Выбирайте только нужные поля для экспорта. Это уменьшит размер файла и ускорит обработку.'
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      title: 'Регулярные экспорты',
      content: 'Настройте регулярные экспорты для создания резервных копий и аналитики продаж.'
    },
    {
      icon: <AlertCircle className="h-5 w-5 text-orange-600" />,
      title: 'Безопасность данных',
      content: 'Не включайте конфиденциальные поля при экспорте для внешних партнеров.'
    },
    {
      icon: <Code className="h-5 w-5 text-blue-600" />,
      title: 'Автоматизация',
      content: 'Используйте API для автоматических экспортов в ваших системах интеграции.'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">📖 Руководство по экспорту</h1>
        <p className="text-gray-600">Подробные инструкции и примеры использования различных форматов экспорта</p>
      </div>

      {/* Форматы экспорта */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Форматы экспорта</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {formatExamples.map((format, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {format.icon}
                  {format.format}
                </CardTitle>
                <CardDescription>{format.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Когда использовать:</h4>
                  <p className="text-sm text-gray-600">{format.useCase}</p>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Особенности:</h4>
                  <div className="flex flex-wrap gap-1">
                    {format.fields.map((field, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {field}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Пример структуры:</h4>
                  <pre className="text-xs bg-gray-50 p-2 rounded border overflow-x-auto">
                    {format.example}
                  </pre>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-xs text-green-700 mb-1">Преимущества:</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {format.pros.map((pro, idx) => (
                        <li key={idx}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-xs text-red-700 mb-1">Ограничения:</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {format.cons.map((con, idx) => (
                        <li key={idx}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Сценарии использования */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Сценарии использования</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCaseScenarios.map((scenario, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {scenario.title}
                  <Badge>{scenario.format}</Badge>
                </CardTitle>
                <CardDescription>{scenario.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Рекомендуемые поля:</h4>
                  <div className="flex flex-wrap gap-1">
                    {scenario.fields.map((field, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {field}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Пошаговая инструкция:</h4>
                  <ol className="text-sm text-gray-600 space-y-1">
                    {scenario.steps.map((step, idx) => (
                      <li key={idx}>{idx + 1}. {step}</li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Полезные советы */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Полезные советы</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip, index) => (
            <Alert key={index}>
              <div className="flex items-start gap-3">
                {tip.icon}
                <div>
                  <h4 className="font-medium text-sm">{tip.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{tip.content}</p>
                </div>
              </div>
            </Alert>
          ))}
        </div>
      </div>

      <Separator />

      {/* API Reference */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">API Reference</h2>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Программный доступ к экспорту
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">GET /api/export</h4>
              <p className="text-sm text-gray-600 mb-3">Скачать каталог товаров в указанном формате</p>

              <h5 className="font-medium text-sm mb-2">Параметры:</h5>
              <div className="bg-gray-50 p-3 rounded text-sm font-mono">
                ?format=excel&category=all&language=en&fields=id,name,price
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">POST /api/export</h4>
              <p className="text-sm text-gray-600 mb-3">Экспорт с расширенными параметрами</p>

              <h5 className="font-medium text-sm mb-2">Тело запроса:</h5>
              <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`{
  "format": "json",
  "language": "both",
  "category": "Natural Water",
  "dateFrom": "2024-01-01",
  "inStock": true,
  "fields": ["id", "name", "price", "category"]
}`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
