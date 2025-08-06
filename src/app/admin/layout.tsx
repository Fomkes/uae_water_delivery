'use client';

import { usePathname } from 'next/navigation';
import AdminRoute from '@/components/AdminRoute';
import AdminNavigation from '@/components/AdminNavigation';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  // Если это страница логина, не показываем навигацию
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <AdminRoute>
      <div className="flex min-h-screen bg-gray-50">
        <AdminNavigation />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </AdminRoute>
  );
}
