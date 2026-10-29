import { siteMetadata } from '@/lib/constants';
import { projects } from '@/lib/data';

// Only real, separately addressable URLs belong here (not /#section anchors).
// lastModified comes from siteMetadata.contentUpdated so it changes only when
// the content does, not on every build.
export default function sitemap() {
  const lastModified = new Date(siteMetadata.contentUpdated);

  return [
    {
      url: siteMetadata.url,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${siteMetadata.url}/projects/${project.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ];
}
