import { siteMetadata } from '@/lib/constants';
import { projects } from '@/lib/data';
import { getPublishedArticles, getArticlesLastUpdated } from '@/lib/articles';

// Only real, separately addressable URLs belong here (not /#section anchors).
// lastModified is a date kept in the data (siteMetadata.contentUpdated for the homepage, each
// project's `updated` and each article's `updatedAt` for its page), so it changes only when that page's content is edited,
// not on every build. Dates are emitted as plain YYYY-MM-DD.
export default function sitemap() {
  return [
    {
      url: siteMetadata.url,
      lastModified: siteMetadata.contentUpdated,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${siteMetadata.url}/projects/${project.slug}`,
      lastModified: project.updated,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
    {
      url: `${siteMetadata.url}/articles`,
      lastModified: getArticlesLastUpdated(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...getPublishedArticles().map((article) => ({
      url: `${siteMetadata.url}/articles/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ];
}
