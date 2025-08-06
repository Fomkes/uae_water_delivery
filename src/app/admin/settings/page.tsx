'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAdmin } from '@/contexts/AdminContext';
import {
  Settings as SettingsIcon,
  User,
  Globe,
  Shield,
  Bell,
  Database,
  Save,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function SettingsPage() {
  const { admin } = useAdmin();
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const [settings, setSettings] = useState({
    // Общие настройки
    siteName: 'UAE Water Delivery',
    siteDescription: 'Quality water delivery service across UAE',
    defaultCurrency: 'EUR',
    defaultLanguage: 'en',

    // Парсинг настройки
    parseTimeoutSeconds: 30,
    maxImagesPerProduct: 5,
    autoTranslateToArabic: true,
    parseRetryAttempts: 3,

    // Уведомления
    emailNotifications: true,
    parseSuccessNotifications: true,
    errorNotifications: true,
    lowStockNotifications: true,
    lowStockThreshold: 10,

    // Безопасность
    sessionTimeoutMinutes: 120,
    requireStrongPasswords: true,
    enableTwoFactor: false,
    logRetentionDays: 30,

    // Производительность
    enableCaching: true,
    cacheTimeoutMinutes: 60,
    maxConcurrentParsing: 3
  });

  const handleSettingChange = (key: string, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      // В реальном приложении здесь будет API вызов
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Сохранение настроек:', settings);
      setSaveMessage('Настройки успешно сохранены!');

      // Очистить сообщение через 3 секунды
      setTimeout(() => setSaveMessage(''), 3000);

    } catch (error) {
      setSaveMessage('Ошибка при сохранении настроек');
    }

    setIsSaving(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Настройки</h1>
        <p className="text-gray-600">Конфигурация системы и админ панели</p>
      </div>

      {/* Сообщения */}
      {saveMessage && (
        <Alert variant={saveMessage.includes('Ошибка') ? 'destructive' : 'default'}>
          {saveMessage.includes('Ошибка') ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <CheckCircle className="h-4 w-4" />
          )}
          <AlertDescription>{saveMessage}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Общие настройки */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Общие настройки
            </CardTitle>
            <CardDescription>
              Основные параметры сайта
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Название сайта</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleSettingChange('siteName', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="siteDescription">Описание сайта</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="defaultCurrency">Валюта по умолчанию</Label>
                <Select
                  value={settings.defaultCurrency}
                  onValueChange={(value) => handleSettingChange('defaultCurrency', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="AED">AED (د.إ)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="defaultLanguage">Язык по умолчанию</Label>
                <Select
                  value={settings.defaultLanguage}
                  onValueChange={(value) => handleSettingChange('defaultLanguage', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Настройки парсинга */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Настройки парсинга
            </CardTitle>
            <CardDescription>
              Параметры автоматического парсинга товаров
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="parseTimeout">Таймаут парсинга (сек)</Label>
                <Input
                  id="parseTimeout"
                  type="number"
                  value={settings.parseTimeoutSeconds}
                  onChange={(e) => handleSettingChange('parseTimeoutSeconds', Number(e.target.value))}
                />
              </div>

              <div>
                <Label htmlFor="maxImages">Макс. изображений</Label>
                <Input
                  id="maxImages"
                  type="number"
                  value={settings.maxImagesPerProduct}
                  onChange={(e) => handleSettingChange('maxImagesPerProduct', Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="retryAttempts">Попытки повтора</Label>
              <Input
                id="retryAttempts"
                type="number"
                value={settings.parseRetryAttempts}
                onChange={(e) => handleSettingChange('parseRetryAttempts', Number(e.target.value))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoTranslate">Автоперевод на арабский</Label>
                <p className="text-sm text-gray-500">
                  Автоматически переводить названия и описания
                </p>
              </div>
              <Switch
                id="autoTranslate"
                checked={settings.autoTranslateToArabic}
                onCheckedChange={(checked) => handleSettingChange('autoTranslateToArabic', checked)}
              />
            </div>

            <div>
              <Label htmlFor="maxConcurrent">Макс. одновременных парсингов</Label>
              <Input
                id="maxConcurrent"
                type="number"
                value={settings.maxConcurrentParsing}
                onChange={(e) => handleSettingChange('maxConcurrentParsing', Number(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Уведомления */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Уведомления
            </CardTitle>
            <CardDescription>
              Настройки оповещений
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email уведомления</Label>
                <p className="text-sm text-gray-500">
                  Получать уведомления на email
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Успешный парсинг</Label>
                <p className="text-sm text-gray-500">
                  Уведомления о успешном парсинге товаров
                </p>
              </div>
              <Switch
                checked={settings.parseSuccessNotifications}
                onCheckedChange={(checked) => handleSettingChange('parseSuccessNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Ошибки системы</Label>
                <p className="text-sm text-gray-500">
                  Уведомления об ошибках парсинга
                </p>
              </div>
              <Switch
                checked={settings.errorNotifications}
                onCheckedChange={(checked) => handleSettingChange('errorNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Низкий остаток</Label>
                <p className="text-sm text-gray-500">
                  Уведомления о низком остатке товаров
                </p>
              </div>
              <Switch
                checked={settings.lowStockNotifications}
                onCheckedChange={(checked) => handleSettingChange('lowStockNotifications', checked)}
              />
            </div>

            <div>
              <Label htmlFor="lowStockThreshold">Порог низкого остатка</Label>
              <Input
                id="lowStockThreshold"
                type="number"
                value={settings.lowStockThreshold}
                onChange={(e) => handleSettingChange('lowStockThreshold', Number(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Безопасность */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Безопасность
            </CardTitle>
            <CardDescription>
              Параметры безопасности и аутентификации
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="sessionTimeout">Таймаут сессии (мин)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeoutMinutes}
                onChange={(e) => handleSettingChange('sessionTimeoutMinutes', Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="logRetention">Хранение логов (дней)</Label>
              <Input
                id="logRetention"
                type="number"
                value={settings.logRetentionDays}
                onChange={(e) => handleSettingChange('logRetentionDays', Number(e.target.value))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Сложные пароли</Label>
                <p className="text-sm text-gray-500">
                  Требовать сложные пароли для админов
                </p>
              </div>
              <Switch
                checked={settings.requireStrongPasswords}
                onCheckedChange={(checked) => handleSettingChange('requireStrongPasswords', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Двухфакторная аутентификация</Label>
                <p className="text-sm text-gray-500">
                  Включить 2FA для админов
                </p>
              </div>
              <Switch
                checked={settings.enableTwoFactor}
                onCheckedChange={(checked) => handleSettingChange('enableTwoFactor', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Информация об админе */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Информация об аккаунте
            </CardTitle>
            <CardDescription>
              Данные текущего администратора
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label>Имя пользователя</Label>
                <p className="text-sm font-medium mt-1">{admin?.username}</p>
              </div>
              <div>
                <Label>Email</Label>
                <p className="text-sm font-medium mt-1">{admin?.email}</p>
              </div>
              <div>
                <Label>Роль</Label>
                <p className="text-sm font-medium mt-1">{admin?.role}</p>
              </div>
              <div>
                <Label>Последний вход</Label>
                <p className="text-sm font-medium mt-1">
                  {admin?.lastLogin ? new Date(admin.lastLogin).toLocaleString('ru-RU') : 'Н/Д'}
                </p>
              </div>
              <div>
                <Label>ID администратора</Label>
                <p className="text-sm font-medium mt-1">{admin?.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Кнопка сохранения */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <SettingsIcon className="h-4 w-4 mr-2 animate-spin" />
              Сохранение...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Сохранить настройки
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
