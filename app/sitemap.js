import { siteMetadata } from '@/lib/constants';
import { projects, homepageUpdated } from '@/lib/data';

// Only real, separately addressable URLs belong here (not /#section anchors).
// lastModified is a date kept in the data (homepageUpdated for the homepage, each project's
// `updated` for its page), so it changes only when that page's content is edited,
// not on every build. Dates are emitted as plain YYYY-MM-DD.
export default function sitemap() {
  return [
    {
      url: siteMetadata.url,
      lastModified: homepageUpdated,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${siteMetadata.url}/projects/${project.slug}`,
      lastModified: project.updated,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ];
}
