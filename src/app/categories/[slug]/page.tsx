import { CategoryPageClient } from './CategoryPageClient';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

// Генерируем статические параметры для всех категорий
export async function generateStaticParams() {
  // Возвращаем все доступные категории
  return [
    { slug: 'water-bottles' },
    { slug: 'family-packs' },
    { slug: 'sparkling-water' },
    { slug: 'alkaline-water' },
    { slug: 'sports-water' },
    { slug: 'enhanced-water' },
    { slug: 'distilled-water' }
  ];
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  return <CategoryPageClient categorySlug={slug} />;
}
