'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { AdminUser } from '@/types';

interface AdminContextType {
  admin: AdminUser | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in on mount
    const savedAdmin = localStorage.getItem('admin-user');
    if (savedAdmin) {
      try {
        setAdmin(JSON.parse(savedAdmin));
      } catch (error) {
        localStorage.removeItem('admin-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simple authentication - in real app this would be API call
    if (username === 'admin' && password === 'uae-waters-2024') {
      const adminUser: AdminUser = {
        id: 'admin-1',
        username: 'admin',
        email: 'admin@uaewaters.ae',
        role: 'super-admin',
        lastLogin: new Date().toISOString(),
      };

      setAdmin(adminUser);
      localStorage.setItem('admin-user', JSON.stringify(adminUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin-user');
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        isLoading,
        login,
        logout,
        isAuthenticated: !!admin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
