'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ImageUpload from '@/components/ImageUpload';
import {
  Search,
  Folder,
  Image as ImageIcon,
  Trash2,
  Download,
  Eye,
  Upload,
  Grid,
  List,
  Filter,
  Calendar,
  FileImage,
  HardDrive
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
  size: number;
  type: string;
  uploadDate: string;
  usedInProducts: string[];
}

export default function FilesPage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FileItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storageStats, setStorageStats] = useState({
    totalFiles: 0,
    totalSize: 0,
    usedSpace: '0 MB',
    availableSpace: '100 GB'
  });

  useEffect(() => {
    loadFiles();
  }, []); // loadFiles не изменяется

  useEffect(() => {
    filterAndSortFiles();
  }, [files, searchTerm, sortBy]); // filterAndSortFiles не изменяется

  const loadFiles = async () => {
    setIsLoading(true);

    // В реальном приложении здесь будет API вызов для получения файлов
    // Симулируем загрузку файлов
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockFiles: FileItem[] = [
      {
        id: '1',
        name: 'evian-water-1.jpg',
        url: '/uploads/products/1704123456789-abc123.jpg',
        thumbnailUrl: '/uploads/products/1704123456789-abc123-thumb.jpg',
        size: 245760, // ~240KB
        type: 'image/jpeg',
        uploadDate: '2024-01-01T10:30:00Z',
        usedInProducts: ['evian-1.5l', 'evian-500ml']
      },
      {
        id: '2',
        name: 'masafi-alkaline.jpg',
        url: '/uploads/products/1704123456790-def456.jpg',
        thumbnailUrl: '/uploads/products/1704123456790-def456-thumb.jpg',
        size: 189440, // ~185KB
        type: 'image/jpeg',
        uploadDate: '2024-01-01T11:15:00Z',
        usedInProducts: ['masafi-alkaline']
      },
      {
        id: '3',
        name: 'mai-dubai-pack.jpg',
        url: '/uploads/products/1704123456791-ghi789.jpg',
        thumbnailUrl: '/uploads/products/1704123456791-ghi789-thumb.jpg',
        size: 312320, // ~305KB
        type: 'image/jpeg',
        uploadDate: '2024-01-01T14:20:00Z',
        usedInProducts: ['mai-dubai-pack']
      }
    ];

    setFiles(mockFiles);

    // Обновляем статистику хранилища
    const totalSize = mockFiles.reduce((sum, file) => sum + file.size, 0);
    setStorageStats({
      totalFiles: mockFiles.length,
      totalSize: totalSize,
      usedSpace: formatFileSize(totalSize),
      availableSpace: '99.7 GB'
    });

    setIsLoading(false);
  };

  const filterAndSortFiles = () => {
    let filtered = [...files];

    // Поиск
    if (searchTerm) {
      filtered = filtered.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Сортировка
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'size':
          return b.size - a.size;
        case 'date':
        default:
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      }
    });

    setFilteredFiles(filtered);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleDeleteFiles = async () => {
    if (selectedFiles.length === 0) return;

    if (confirm(`Удалить ${selectedFiles.length} файл(ов)? Это действие необратимо.`)) {
      // В реальном приложении здесь будет API вызов
      const newFiles = files.filter(file => !selectedFiles.includes(file.id));
      setFiles(newFiles);
      setSelectedFiles([]);
    }
  };

  const handleDownloadFile = (file: FileItem) => {
    // Создаем временную ссылку для скачивания
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    link.click();
  };

  const handleFilesUploaded = (uploadedImages: Array<{id: string, url: string, thumbnailUrl: string, originalName: string, size: number, originalSize: number}>) => {
    // Обновляем список файлов с новыми загруженными файлами
    const newFiles: FileItem[] = uploadedImages.map((img, index) => ({
      id: `new-${Date.now()}-${index}`,
      name: img.originalName,
      url: img.url,
      thumbnailUrl: img.thumbnailUrl,
      size: img.size,
      type: 'image/jpeg',
      uploadDate: new Date().toISOString(),
      usedInProducts: []
    }));

    setFiles(prev => [...newFiles, ...prev]);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Управление файлами</h1>
          <p className="text-gray-600">Загруженные изображения и медиафайлы</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>
          {selectedFiles.length > 0 && (
            <Button variant="destructive" onClick={handleDeleteFiles}>
              <Trash2 className="h-4 w-4 mr-2" />
              Удалить ({selectedFiles.length})
            </Button>
          )}
        </div>
      </div>

      {/* Статистика хранилища */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Всего файлов</p>
                <p className="text-2xl font-bold">{storageStats.totalFiles}</p>
              </div>
              <FileImage className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Использовано</p>
                <p className="text-2xl font-bold">{storageStats.usedSpace}</p>
              </div>
              <HardDrive className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Доступно</p>
                <p className="text-2xl font-bold">{storageStats.availableSpace}</p>
              </div>
              <Folder className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Выбрано</p>
                <p className="text-2xl font-bold">{selectedFiles.length}</p>
              </div>
              <Eye className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Загрузка новых файлов */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Загрузить новые файлы
          </CardTitle>
          <CardDescription>
            Загрузите изображения для использования в товарах
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ImageUpload
            onImagesUploaded={handleFilesUploaded}
            maxImages={10}
          />
        </CardContent>
      </Card>

      {/* Фильтры и поиск */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Фильтры и поиск
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Поиск */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Поиск файлов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Сортировка */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Сортировать по" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Дате загрузки</SelectItem>
                <SelectItem value="name">Названию</SelectItem>
                <SelectItem value="size">Размеру</SelectItem>
              </SelectContent>
            </Select>

            {/* Информация */}
            <div className="text-sm text-gray-600 flex items-center">
              Найдено файлов: {filteredFiles.length}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Список файлов */}
      <Card>
        <CardHeader>
          <CardTitle>Файлы</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-600 mt-2">Загрузка файлов...</p>
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="text-center py-8">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Файлы не найдены
              </h3>
              <p className="text-gray-600">
                Попробуйте изменить критерии поиска или загрузите новые файлы.
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredFiles.map((file) => (
                <div key={file.id} className="relative group">
                  {/* Чекбокс для выбора */}
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(file.id)}
                    onChange={() => handleFileSelect(file.id)}
                    className="absolute top-2 left-2 z-10 rounded"
                  />

                  {/* Изображение */}
                  <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 cursor-pointer">
                    <img
                      src={file.thumbnailUrl || file.url}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Информация о файле */}
                  <div className="mt-2">
                    <p className="text-xs font-medium truncate" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                    {file.usedInProducts.length > 0 && (
                      <Badge variant="secondary" className="text-xs mt-1">
                        Используется в {file.usedInProducts.length} товарах
                      </Badge>
                    )}
                  </div>

                  {/* Действия при наведении */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity space-x-1">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0"
                      onClick={() => window.open(file.url, '_blank')}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0"
                      onClick={() => handleDownloadFile(file)}
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => handleFileSelect(file.id)}
                      className="rounded"
                    />
                    <img
                      src={file.thumbnailUrl || file.url}
                      alt={file.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.size)} • {formatDate(file.uploadDate)}
                      </p>
                      {file.usedInProducts.length > 0 && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          Используется в {file.usedInProducts.length} товарах
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(file.url, '_blank')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadFile(file)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
