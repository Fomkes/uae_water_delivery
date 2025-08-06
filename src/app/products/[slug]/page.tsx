import { ProductPageClient } from './ProductPageClient';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Генерируем статические параметры для некоторых популярных товаров
export async function generateStaticParams() {
  // Возвращаем популярные slug'и товаров для предварительной генерации
  return [
    { slug: 'premium-natural-spring-water' },
    { slug: 'alkaline-water-plus' },
    { slug: 'sparkling-mineral-water' },
    { slug: 'electrolyte-sports-water' },
    { slug: 'vitamin-enhanced-water' },
    { slug: 'pure-distilled-water' }
  ];
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  return <ProductPageClient productSlug={slug} />;
}
