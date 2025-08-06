export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string
          username: string
          email: string
          password_hash: string
          role: 'admin' | 'super_admin'
          is_active: boolean
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          username: string
          email: string
          password_hash: string
          role?: 'admin' | 'super_admin'
          is_active?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          email?: string
          password_hash?: string
          role?: 'admin' | 'super_admin'
          is_active?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          name_ar: string
          description: string
          description_ar: string | null
          price: number
          original_price: number | null
          image: string
          images: string[]
          category: string
          category_ar: string | null
          in_stock: boolean
          stock_quantity: number
          popular: boolean
          size: string | null
          size_ar: string | null
          volume: string | null
          volume_ar: string | null
          origin: string | null
          origin_ar: string | null
          features: string[]
          features_ar: string[]
          rating: number
          reviews: number
          slug: string
          source_url: string | null
          parsed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          name_ar: string
          description: string
          description_ar?: string | null
          price: number
          original_price?: number | null
          image: string
          images?: string[]
          category: string
          category_ar?: string | null
          in_stock?: boolean
          stock_quantity?: number
          popular?: boolean
          size?: string | null
          size_ar?: string | null
          volume?: string | null
          volume_ar?: string | null
          origin?: string | null
          origin_ar?: string | null
          features?: string[]
          features_ar?: string[]
          rating?: number
          reviews?: number
          slug: string
          source_url?: string | null
          parsed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          name_ar?: string
          description?: string
          description_ar?: string | null
          price?: number
          original_price?: number | null
          image?: string
          images?: string[]
          category?: string
          category_ar?: string | null
          in_stock?: boolean
          stock_quantity?: number
          popular?: boolean
          size?: string | null
          size_ar?: string | null
          volume?: string | null
          volume_ar?: string | null
          origin?: string | null
          origin_ar?: string | null
          features?: string[]
          features_ar?: string[]
          rating?: number
          reviews?: number
          slug?: string
          source_url?: string | null
          parsed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      admin_logs: {
        Row: {
          id: string
          admin_id: string
          action: string
          details: string | null
          metadata: Json | null
          ip_address: string | null
          user_agent: string | null
          timestamp: string
        }
        Insert: {
          id?: string
          admin_id: string
          action: string
          details?: string | null
          metadata?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          timestamp?: string
        }
        Update: {
          id?: string
          admin_id?: string
          action?: string
          details?: string | null
          metadata?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          timestamp?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      log_admin_action: {
        Args: {
          p_admin_id: string
          p_action: string
          p_details: string
          p_metadata?: Json
          p_ip_address?: string
          p_user_agent?: string
        }
        Returns: string
      }
    }
    Enums: {
      admin_role: 'admin' | 'super_admin'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Вспомогательные типы для удобства
export type AdminUser = Database['public']['Tables']['admin_users']['Row'];
export type AdminUserInsert = Database['public']['Tables']['admin_users']['Insert'];
export type AdminUserUpdate = Database['public']['Tables']['admin_users']['Update'];

export type Product = Database['public']['Tables']['products']['Row'];
export type ProductInsert = Database['public']['Tables']['products']['Insert'];
export type ProductUpdate = Database['public']['Tables']['products']['Update'];

export type AdminLog = Database['public']['Tables']['admin_logs']['Row'];
export type AdminLogInsert = Database['public']['Tables']['admin_logs']['Insert'];

// Типы для работы с парсингом
export interface ParsedProductData {
  name: string;
  name_ar?: string;
  description: string;
  description_ar?: string;
  price: number;
  original_price?: number;
  image: string;
  images?: string[];
  category: string;
  category_ar?: string;
  size?: string;
  size_ar?: string;
  volume?: string;
  volume_ar?: string;
  origin?: string;
  origin_ar?: string;
  features?: string[];
  features_ar?: string[];
  source_url: string;
}

// Типы для статистики
export interface AdminStats {
  total_products: number;
  in_stock_products: number;
  out_of_stock_products: number;
  total_categories: number;
  recent_products: Product[];
  low_stock_products: Product[];
}
