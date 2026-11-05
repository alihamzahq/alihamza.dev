import { siteMetadata } from '@/lib/constants';

// BlogPosting structured data for one article. The author and publisher point at the site's
// Person entity by @id (declared on the homepage), and isPartOf points at the WebSite.
// Dates come from the same fields as the visible dates and the sitemap, so they always agree.
export default function ArticleJsonLd({ article }) {
  if (!article) return null;

  const url = `${siteMetadata.url}/articles/${article.slug}`;
  const person = {
    '@type': 'Person',
    '@id': `${siteMetadata.url}/#person`,
    name: article.author,
    url: siteMetadata.url,
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    articleSection: article.category,
    inLanguage: 'en',
    image: `${siteMetadata.url}${siteMetadata.image}`,
    author: person,
    publisher: person,
    isPartOf: { '@type': 'WebSite', '@id': `${siteMetadata.url}/#website` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
