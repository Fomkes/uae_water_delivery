'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AdminLog } from '@/types';
import {
  FileText,
  Search,
  Filter,
  Download,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  Trash2,
  RefreshCw
} from 'lucide-react';

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');

  // Mock данные логов
  const mockLogs: AdminLog[] = [
    {
      id: '1',
      adminId: 'admin-1',
      action: 'LOGIN',
      details: 'Успешный вход в админ панель',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      ip: '192.168.1.100'
    },
    {
      id: '2',
      adminId: 'admin-1',
      action: 'PRODUCT_PARSE',
      details: 'Спарсен товар: Evian Natural Water 1.5L с сайта amazon.ae',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      ip: '192.168.1.100'
    },
    {
      id: '3',
      adminId: 'admin-1',
      action: 'PRODUCT_ADD',
      details: 'Добавлен новый товар: Mai Dubai Water 2L',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      ip: '192.168.1.100'
    },
    {
      id: '4',
      adminId: 'admin-1',
      action: 'PRODUCT_UPDATE',
      details: 'Обновлена цена товара: Masafi Pure Water (€2.99 → €2.79)',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      ip: '192.168.1.100'
    },
    {
      id: '5',
      adminId: 'admin-1',
      action: 'PRODUCT_DELETE',
      details: 'Удален товар: Old Water Brand 1L',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      ip: '192.168.1.100'
    },
    {
      id: '6',
      adminId: 'admin-1',
      action: 'PARSE_ERROR',
      details: 'Ошибка парсинга с сайта carrefour.ae: Товар не найден',
      timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      ip: '192.168.1.100'
    },
    {
      id: '7',
      adminId: 'admin-1',
      action: 'SYSTEM_ERROR',
      details: 'Ошибка подключения к базе данных (автоматически восстановлено)',
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      ip: '192.168.1.100'
    },
    {
      id: '8',
      adminId: 'admin-1',
      action: 'BULK_IMPORT',
      details: 'Массовый импорт 15 товаров с сайта lulu.ae',
      timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
      ip: '192.168.1.100'
    }
  ];

  const getLogLevel = (action: string): 'info' | 'warning' | 'error' | 'success' => {
    if (action.includes('ERROR')) return 'error';
    if (action.includes('DELETE')) return 'warning';
    if (action.includes('ADD') || action.includes('PARSE') || action.includes('IMPORT')) return 'success';
    return 'info';
  };

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <X className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getLogBadgeVariant = (level: string) => {
    switch (level) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'secondary';
      case 'success':
        return 'default';
      default:
        return 'outline';
    }
  };

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || log.action.toLowerCase().includes(filterType.toLowerCase());

    const logLevel = getLogLevel(log.action);
    const matchesLevel = filterLevel === 'all' || logLevel === filterLevel;

    return matchesSearch && matchesType && matchesLevel;
  });

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleExportLogs = () => {
    // В реальном приложении здесь будет экспорт логов
    console.log('Экспорт логов');
    alert('Логи экспортированы в CSV файл');
  };

  const handleClearLogs = () => {
    // В реальном приложении здесь будет очистка логов
    if (confirm('Вы уверены, что хотите очистить все логи? Это действие необратимо.')) {
      console.log('Очистка логов');
      alert('Логи очищены');
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Логи системы</h1>
          <p className="text-gray-600">Журнал действий и событий админ панели</p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={handleExportLogs}>
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Обновить
          </Button>
          <Button variant="destructive" onClick={handleClearLogs}>
            <Trash2 className="h-4 w-4 mr-2" />
            Очистить
          </Button>
        </div>
      </div>

      {/* Фильтры */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Фильтры
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Поиск */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Поиск в логах..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Тип действия */}
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Тип действия" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все действия</SelectItem>
                <SelectItem value="login">Вход в систему</SelectItem>
                <SelectItem value="product">Товары</SelectItem>
                <SelectItem value="parse">Парсинг</SelectItem>
                <SelectItem value="import">Импорт</SelectItem>
                <SelectItem value="error">Ошибки</SelectItem>
              </SelectContent>
            </Select>

            {/* Уровень */}
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Уровень" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все уровни</SelectItem>
                <SelectItem value="info">Информация</SelectItem>
                <SelectItem value="success">Успех</SelectItem>
                <SelectItem value="warning">Предупреждение</SelectItem>
                <SelectItem value="error">Ошибка</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Всего логов</p>
                <p className="text-2xl font-bold">{mockLogs.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Успешных</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockLogs.filter(log => getLogLevel(log.action) === 'success').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Предупреждений</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {mockLogs.filter(log => getLogLevel(log.action) === 'warning').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ошибок</p>
                <p className="text-2xl font-bold text-red-600">
                  {mockLogs.filter(log => getLogLevel(log.action) === 'error').length}
                </p>
              </div>
              <X className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Список логов */}
      <Card>
        <CardHeader>
          <CardTitle>Журнал событий</CardTitle>
          <CardDescription>
            Найдено логов: {filteredLogs.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map((log) => {
              const level = getLogLevel(log.action);
              return (
                <div
                  key={log.id}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${
                      level === 'error' ? 'bg-red-100 text-red-600' :
                      level === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      level === 'success' ? 'bg-green-100 text-green-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {getLogIcon(level)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant={getLogBadgeVariant(level) as "default" | "secondary" | "destructive" | "outline"}>
                          {log.action}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {formatTimestamp(log.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-900">{log.details}</p>
                      {log.ip && (
                        <p className="text-xs text-gray-500 mt-1">IP: {log.ip}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredLogs.length === 0 && (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Логи не найдены
                </h3>
                <p className="text-gray-600">
                  Попробуйте изменить критерии поиска или фильтры.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
