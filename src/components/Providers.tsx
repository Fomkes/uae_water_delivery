'use client';

import { ReactNode } from 'react';
import { CartProvider } from '@/contexts/CartContext';
import { AdminProvider } from '@/contexts/AdminContext';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AdminProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AdminProvider>
  );
}
