import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseAnonKey) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Клиент для использования в браузере
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Серверный клиент с повышенными правами (для API роутов)
export const createServerClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY not found, using anon key');
    return createClient<Database>(supabaseUrl, supabaseAnonKey);
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// Хелпер для создания Storage URL
export const getStorageUrl = (bucket: string, path: string) => {
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
};

// Хелпер для загрузки изображений в Storage
export const uploadImage = async (
  file: File,
  bucket: string = 'product-images',
  folder: string = 'products'
) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw error;
  }

  return {
    path: data.path,
    url: getStorageUrl(bucket, data.path),
  };
};

// Хелпер для удаления изображений из Storage
export const deleteImage = async (
  filePath: string,
  bucket: string = 'product-images'
) => {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([filePath]);

  if (error) {
    throw error;
  }

  return true;
};
