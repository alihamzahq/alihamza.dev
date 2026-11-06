import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getArticle,
  getPublishedArticles,
  formatArticleDate,
  getReadingTime,
  getArticleToc,
} from '@/lib/articles';
import { projects } from '@/lib/data';
import { siteMetadata, personalInfo } from '@/lib/constants';
import ArticleJsonLd from '@/components/ArticleJsonLd';
import ArticleBody from '@/components/articles/ArticleBody';
import ArticleToc from '@/components/articles/ArticleToc';

export function generateStaticParams() {
  return getPublishedArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) return {};

  const url = `${siteMetadata.url}/articles/${article.slug}`;

  return {
    // The root layout's title template appends " | Ali Hamza", so seoTitle stays short.
    title: article.seoTitle,
    description: article.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      type: 'article',
      siteName: personalInfo.name,
      locale: 'en_US',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [siteMetadata.url],
      section: article.category,
      images: [
        {
          url: siteMetadata.image,
          width: 1200,
          height: 630,
          alt: `${article.title} - ${personalInfo.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [siteMetadata.image],
    },
  };
}

function ArrowLeftIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  );
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedProjects = (article.related?.projects || [])
    .map((rel) => ({ project: projects.find((p) => p.slug === rel.slug), note: rel.note }))
    .filter((rel) => rel.project);
  const toc = getArticleToc(article);
  const showUpdated = article.updatedAt !== article.publishedAt;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <ArticleJsonLd article={article} />

      {/* Header band (the fixed site header is transparent, so it needs a dark background) */}
      <header className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 dark:bg-[image:var(--hero-gradient)] pt-24 pb-12 md:pt-28 md:pb-16 focus-on-gradient">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/articles"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/90 transition-colors hover:text-white"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Articles
          </Link>

          <p className="mb-4 flex w-fit items-center rounded-full border border-white/30 bg-black/20 px-3 py-1 text-xs font-semibold text-white">
            {article.category}
          </p>

          <h1 className="mb-6 text-3xl sm:text-4xl md:text-[2.6rem] md:leading-tight font-bold tracking-tight text-white text-balance">
            {article.title}
          </h1>

          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/90">
            <span>
              By{' '}
              <Link href="/" className="font-medium underline underline-offset-4 hover:text-white">
                {article.author}
              </Link>
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
            {showUpdated && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  Updated <time dateTime={article.updatedAt}>{formatArticleDate(article.updatedAt)}</time>
                </span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>{getReadingTime(article)} min read</span>
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Only worth showing for articles with several sections */}
        {toc.length >= 4 && <ArticleToc items={toc} />}

        <article>
          <ArticleBody content={article.content} />
        </article>

        {article.references?.length > 0 && (
          <section aria-labelledby="references-heading" className="mt-14 border-t border-gray-200 dark:border-slate-700 pt-10">
            <h2 id="references-heading" className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              References
            </h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300 [overflow-wrap:anywhere] sm:[overflow-wrap:normal]">
              {article.references.map((ref) => (
                <li key={ref.href} className="leading-relaxed">
                  <a
                    href={ref.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-indigo-600 dark:text-indigo-400 underline decoration-indigo-300 dark:decoration-indigo-700 underline-offset-4 hover:decoration-current"
                  >
                    {ref.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  {ref.note && <span className="block text-sm text-gray-600 dark:text-gray-400">{ref.note}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {relatedProjects.length > 0 && (
          <nav aria-label="Related projects" className="mt-10 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 p-6">
            <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">Related Project</h2>
            <ul className="space-y-2">
              {relatedProjects.map(({ project, note }) => (
                <li key={project.slug} className="leading-relaxed text-gray-600 dark:text-gray-300">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-medium text-indigo-600 dark:text-indigo-400 underline decoration-indigo-300 dark:decoration-indigo-700 underline-offset-4 hover:decoration-current"
                  >
                    {project.title}
                  </Link>
                  {note ? `: ${note}` : null}
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 p-8 sm:flex-row">
          <div>
            <h2 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
              Interested in working together?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              I&apos;m open to full-time international remote roles and long-term contracts.
            </p>
          </div>
          <Link href="/#contact" className="btn btn-primary btn-lg whitespace-nowrap">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
