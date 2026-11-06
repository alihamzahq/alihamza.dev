import Link from 'next/link';
import SectionWrapper, { SectionHeading } from '@/components/ui/SectionWrapper';
import ArticleCard from '@/components/articles/ArticleCard';
import { getPublishedArticles, articlesIntro } from '@/lib/articles';

// Small homepage preview: the newest article only. The full list lives at /articles.
export default function Articles() {
  const [latest] = getPublishedArticles();

  if (!latest) return null;

  return (
    <SectionWrapper id="articles" compact>
      <SectionHeading title="Technical Articles" subtitle={articlesIntro} />

      <div className="mx-auto max-w-3xl">
        <ArticleCard article={latest} compact />

        <div className="mt-8 text-center">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 link-underline"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
