'use client';

import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import {
  Upload,
  X,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';

interface UploadedImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  originalName: string;
  size: number;
  originalSize: number;
}

interface ImageUploadProps {
  onImagesUploaded: (images: UploadedImage[]) => void;
  maxImages?: number;
  existingImages?: string[];
  className?: string;
}

export default function ImageUpload({
  onImagesUploaded,
  maxImages = 5,
  existingImages = [],
  className = ''
}: ImageUploadProps) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(async (files: FileList) => {
    if (files.length === 0) return;

    const totalImages = uploadedImages.length + existingImages.length + files.length;
    if (totalImages > maxImages) {
      setError(`Максимум ${maxImages} изображений разрешено`);
      return;
    }

    setIsUploading(true);
    setError('');
    setUploadProgress(0);

    const newImages: UploadedImage[] = [];
    const totalFiles = files.length;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Ошибка загрузки');
        }

        const result = await response.json();

        newImages.push({
          id: `${Date.now()}-${i}`,
          url: result.imageUrl,
          thumbnailUrl: result.thumbnailUrl,
          originalName: result.originalName,
          size: result.size,
          originalSize: result.originalSize
        });

        setUploadProgress(((i + 1) / totalFiles) * 100);

      } catch (error) {
        console.error('Ошибка загрузки файла:', error);
        setError(error instanceof Error ? error.message : 'Ошибка загрузки файла');
        break;
      }
    }

    const allImages = [...uploadedImages, ...newImages];
    setUploadedImages(allImages);
    onImagesUploaded(allImages);
    setIsUploading(false);
    setUploadProgress(0);
  }, [uploadedImages, existingImages.length, maxImages, onImagesUploaded]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const removeImage = useCallback((imageId: string) => {
    const newImages = uploadedImages.filter(img => img.id !== imageId);
    setUploadedImages(newImages);
    onImagesUploaded(newImages);
  }, [uploadedImages, onImagesUploaded]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Зона загрузки */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${isUploading ? 'pointer-events-none opacity-50' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="text-center">
          {isUploading ? (
            <div className="space-y-2">
              <Loader2 className="h-8 w-8 mx-auto animate-spin text-blue-500" />
              <p className="text-sm text-gray-600">Загрузка изображений...</p>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="h-8 w-8 mx-auto text-gray-400" />
              <p className="text-lg font-medium text-gray-900">
                Перетащите изображения сюда
              </p>
              <p className="text-sm text-gray-600">
                или нажмите для выбора файлов
              </p>
              <p className="text-xs text-gray-500">
                Максимум {maxImages} изображений, до 10MB каждое
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Сообщения об ошибках */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Загруженные изображения */}
      {uploadedImages.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">
            Загруженные изображения ({uploadedImages.length}/{maxImages})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedImages.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={image.thumbnailUrl}
                    alt={image.originalName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Информация об изображении */}
                <div className="mt-1 text-xs text-gray-600">
                  <p className="truncate">{image.originalName}</p>
                  <p>
                    {formatFileSize(image.size)}
                    {image.originalSize !== image.size && (
                      <span className="text-green-600">
                        {' '}(было {formatFileSize(image.originalSize)})
                      </span>
                    )}
                  </p>
                </div>

                {/* Кнопка удаления */}
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(image.id);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>

                {/* Индикатор успешной загрузки */}
                <div className="absolute bottom-1 right-1 bg-green-500 rounded-full p-1">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Существующие изображения */}
      {existingImages.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">
            Существующие изображения ({existingImages.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {existingImages.map((imageUrl, index) => (
              <div key={index} className="relative">
                <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={imageUrl}
                    alt={`Existing image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-1 right-1 bg-blue-500 rounded-full p-1">
                  <ImageIcon className="h-3 w-3 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
