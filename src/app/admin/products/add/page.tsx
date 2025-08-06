'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { categories } from '@/data/products';
import { Product } from '@/types';
import ImageUpload from '@/components/ImageUpload';
import {
  Save,
  Plus,
  X,
  Upload,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export default function AddProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    description: '',
    descriptionAr: '',
    price: '',
    originalPrice: '',
    category: '',
    image: '',
    images: [''],
    uploadedImages: [] as string[], // Новое поле для загруженных изображений
    size: '',
    sizeAr: '',
    volume: '',
    volumeAr: '',
    origin: '',
    originAr: '',
    stockQuantity: '',
    features: [''],
    featuresAr: [''],
    popular: false,
    inStock: true
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImagesUploaded = (uploadedImages: Array<{id: string, url: string, thumbnailUrl: string, originalName: string, size: number, originalSize: number}>) => {
    const imageUrls = uploadedImages.map(img => img.url);
    setFormData(prev => ({
      ...prev,
      uploadedImages: imageUrls,
      image: imageUrls[0] || prev.image, // Устанавливаем первое изображение как главное
      images: imageUrls.length > 0 ? imageUrls : prev.images
    }));
  };

  const handleArrayChange = (field: 'images' | 'features' | 'featuresAr', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'images' | 'features' | 'featuresAr') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'images' | 'features' | 'featuresAr', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Валидация
      if (!formData.name || !formData.nameAr || !formData.description || !formData.category) {
        throw new Error('Заполните все обязательные поля');
      }

      if (!formData.price || isNaN(Number(formData.price))) {
        throw new Error('Укажите корректную цену');
      }

      if (!formData.stockQuantity || isNaN(Number(formData.stockQuantity))) {
        throw new Error('Укажите корректное количество на складе');
      }

      // Создание товара для API
      const productData = {
        name: formData.name,
        nameAr: formData.nameAr,
        description: formData.description,
        descriptionAr: formData.descriptionAr,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        image: formData.uploadedImages[0] || formData.image,
        images: formData.uploadedImages.length > 0 ? formData.uploadedImages : formData.images.filter(img => img.trim() !== ''),
        category: formData.category,
        categoryAr: formData.category, // TODO: Добавить перевод
        inStock: formData.inStock,
        stockQuantity: Number(formData.stockQuantity),
        popular: formData.popular,
        size: formData.size,
        sizeAr: formData.sizeAr,
        volume: formData.volume,
        volumeAr: formData.volumeAr,
        origin: formData.origin,
        originAr: formData.originAr,
        features: formData.features.filter(f => f.trim() !== ''),
        featuresAr: formData.featuresAr.filter(f => f.trim() !== ''),
        slug: generateSlug(formData.name),
        rating: 5,
        reviews: 0
      };

      // Реальный API вызов для сохранения товара
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка создания товара');
      }

      const createdProduct = await response.json();
      console.log('Товар создан в базе:', createdProduct);

      setSuccess('Товар успешно добавлен в базу данных!');

      // Переход к списку товаров через 2 секунды
      setTimeout(() => {
        router.push('/admin/products');
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при добавлении товара');
    }

    setIsLoading(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Добавить товар</h1>
        <p className="text-gray-600">Создайте новый товар в каталоге</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Сообщения */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Основная информация */}
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
              <CardDescription>Название, описание и категория товара</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Название */}
              <div>
                <Label htmlFor="name">Название *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Evian Natural Water 1.5L"
                  required
                />
              </div>

              <div>
                <Label htmlFor="nameAr">Название на арабском *</Label>
                <Input
                  id="nameAr"
                  value={formData.nameAr}
                  onChange={(e) => handleInputChange('nameAr', e.target.value)}
                  placeholder="مياه إيفيان الطبيعية"
                  required
                />
              </div>

              {/* Описание */}
              <div>
                <Label htmlFor="description">Описание *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Подробное описание товара..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="descriptionAr">Описание на арабском</Label>
                <Textarea
                  id="descriptionAr"
                  value={formData.descriptionAr}
                  onChange={(e) => handleInputChange('descriptionAr', e.target.value)}
                  placeholder="وصف مفصل للمنتج..."
                  rows={3}
                />
              </div>

              {/* Категория */}
              <div>
                <Label htmlFor="category">Категория *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Цена и наличие */}
          <Card>
            <CardHeader>
              <CardTitle>Цена и наличие</CardTitle>
              <CardDescription>Ценовая информация и складские остатки</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Цена */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Цена (EUR) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="2.49"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="originalPrice">Старая цена (EUR)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                    placeholder="2.99"
                  />
                </div>
              </div>

              {/* Остаток */}
              <div>
                <Label htmlFor="stockQuantity">Количество на складе *</Label>
                <Input
                  id="stockQuantity"
                  type="number"
                  value={formData.stockQuantity}
                  onChange={(e) => handleInputChange('stockQuantity', e.target.value)}
                  placeholder="100"
                  required
                />
              </div>

              {/* Статусы */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={formData.inStock}
                    onChange={(e) => handleInputChange('inStock', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="inStock">В наличии</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="popular"
                    checked={formData.popular}
                    onChange={(e) => handleInputChange('popular', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="popular">Популярный товар</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Характеристики */}
          <Card>
            <CardHeader>
              <CardTitle>Характеристики</CardTitle>
              <CardDescription>Размер, объем, происхождение</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="size">Размер</Label>
                  <Input
                    id="size"
                    value={formData.size}
                    onChange={(e) => handleInputChange('size', e.target.value)}
                    placeholder="1.5L"
                  />
                </div>

                <div>
                  <Label htmlFor="sizeAr">Размер (арабский)</Label>
                  <Input
                    id="sizeAr"
                    value={formData.sizeAr}
                    onChange={(e) => handleInputChange('sizeAr', e.target.value)}
                    placeholder="1.5 لتر"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="volume">Объем</Label>
                  <Input
                    id="volume"
                    value={formData.volume}
                    onChange={(e) => handleInputChange('volume', e.target.value)}
                    placeholder="1.5 liters"
                  />
                </div>

                <div>
                  <Label htmlFor="volumeAr">Объем (арабский)</Label>
                  <Input
                    id="volumeAr"
                    value={formData.volumeAr}
                    onChange={(e) => handleInputChange('volumeAr', e.target.value)}
                    placeholder="1.5 لتر"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="origin">Происхождение</Label>
                  <Input
                    id="origin"
                    value={formData.origin}
                    onChange={(e) => handleInputChange('origin', e.target.value)}
                    placeholder="France"
                  />
                </div>

                <div>
                  <Label htmlFor="originAr">Происхождение (арабский)</Label>
                  <Input
                    id="originAr"
                    value={formData.originAr}
                    onChange={(e) => handleInputChange('originAr', e.target.value)}
                    placeholder="فرنسا"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Загрузка изображений */}
          <Card>
            <CardHeader>
              <CardTitle>Изображения товара</CardTitle>
              <CardDescription>
                Загрузите изображения товара или укажите URL ссылки
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Компонент загрузки изображений */}
              <div>
                <Label className="text-base font-medium">Загрузка файлов</Label>
                <p className="text-sm text-gray-600 mb-3">
                  Рекомендуется использовать загрузку файлов для лучшего качества и производительности
                </p>
                <ImageUpload
                  onImagesUploaded={handleImagesUploaded}
                  maxImages={5}
                  existingImages={formData.images.filter(img => img.trim() !== '')}
                />
              </div>

              {/* Ручной ввод URL (для обратной совместимости) */}
              <div className="border-t pt-4">
                <Label className="text-base font-medium">Ручной ввод URL</Label>
                <p className="text-sm text-gray-600 mb-3">
                  Или укажите URL ссылки на изображения вручную
                </p>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="image">Главное изображение</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <Label>Дополнительные изображения</Label>
                    {formData.images.map((image, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          value={image}
                          onChange={(e) => handleArrayChange('images', index, e.target.value)}
                          placeholder="https://example.com/image.jpg"
                        />
                        {formData.images.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('images', index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem('images')}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Добавить URL изображения
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Особенности */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Особенности товара</CardTitle>
              <CardDescription>Ключевые характеристики и преимущества</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Особенности на английском */}
                <div>
                  <Label>Особенности (английский)</Label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <Input
                        value={feature}
                        onChange={(e) => handleArrayChange('features', index, e.target.value)}
                        placeholder="Natural spring water"
                      />
                      {formData.features.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('features', index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem('features')}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить особенность
                  </Button>
                </div>

                {/* Особенности на арабском */}
                <div>
                  <Label>Особенности (арабский)</Label>
                  {formData.featuresAr.map((feature, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <Input
                        value={feature}
                        onChange={(e) => handleArrayChange('featuresAr', index, e.target.value)}
                        placeholder="مياه ينابيع طبيعية"
                      />
                      {formData.featuresAr.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('featuresAr', index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem('featuresAr')}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить особенность
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Кнопки действий */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/products')}
          >
            Отмена
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Upload className="h-4 w-4 mr-2 animate-spin" />
                Сохранение...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Сохранить товар
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
