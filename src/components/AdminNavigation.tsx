'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  Plus,
  Upload,
  Settings,
  LogOut,
  BarChart3,
  FileText,
  Folder,
  Download,
  Copy,
  TestTube
} from 'lucide-react';

const adminMenuItems = [
  {
    title: 'Панель управления',
    href: '/admin/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Товары',
    href: '/admin/products',
    icon: Package
  },
  {
    title: 'Добавить товар',
    href: '/admin/products/add',
    icon: Plus
  },
  {
    title: 'Парсинг товаров',
    href: '/admin/products/parse',
    icon: Upload
  },
  {
    title: 'Экспорт каталога',
    href: '/admin/products/export',
    icon: Download
  },
  {
    title: 'Управление дубликатами',
    href: '/admin/products/duplicates',
    icon: Copy
  },
  {
    title: 'Тестирование парсера',
    href: '/admin/products/test-parser',
    icon: TestTube
  },
  {
    title: 'Файлы',
    href: '/admin/files',
    icon: Folder
  },
  {
    title: 'Аналитика',
    href: '/admin/analytics',
    icon: BarChart3
  },
  {
    title: 'Логи',
    href: '/admin/logs',
    icon: FileText
  },
  {
    title: 'Настройки',
    href: '/admin/settings',
    icon: Settings
  }
];

export default function AdminNavigation() {
  const pathname = usePathname();
  const { admin, logout } = useAdmin();

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Админ панель</h1>
        <p className="text-sm text-gray-600 mt-1">
          Добро пожаловать, {admin?.username}
        </p>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2 flex-1">
        {adminMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button - теперь в самом низу */}
      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={logout}
          variant="outline"
          className="w-full justify-start"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Выйти
        </Button>
      </div>
    </div>
  );
}
