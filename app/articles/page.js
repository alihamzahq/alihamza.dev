import { getPublishedArticles, articlesIntro } from '@/lib/articles';
import { siteMetadata, personalInfo } from '@/lib/constants';
import ArticleCard from '@/components/articles/ArticleCard';

const title = 'Backend & SaaS Architecture Articles';
const url = `${siteMetadata.url}/articles`;

export const metadata = {
  title,
  description: articlesIntro,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: `${title} | ${personalInfo.name}`,
    description: articlesIntro,
    url,
    type: 'website',
    siteName: personalInfo.name,
    locale: 'en_US',
    images: [
      {
        url: siteMetadata.image,
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} - ${personalInfo.title} and ${personalInfo.secondaryTitle}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | ${personalInfo.name}`,
    description: articlesIntro,
    images: [siteMetadata.image],
  },
};

export default function ArticlesPage() {
  const [featured, ...rest] = getPublishedArticles();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header band (the fixed site header is transparent, so it needs a dark background) */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 dark:bg-[image:var(--hero-gradient)] pt-24 pb-14 md:pt-28 md:pb-16 focus-on-gradient">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white text-balance">
            Technical Articles
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-white/90">{articlesIntro}</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="sr-only">Published articles</h2>
        {featured && <ArticleCard article={featured} featured />}
        {rest.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {rest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
