import { blogArticles } from '@/data/blog';
import BlogArticleClient from './BlogArticleClient';

export async function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function BlogArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const article = blogArticles.find(a => a.slug === resolvedParams.slug);

  return <BlogArticleClient slug={resolvedParams.slug} article={article} />;
}
