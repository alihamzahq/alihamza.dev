import { personalInfo, siteMetadata } from '@/lib/constants';

// Per-project structured data so LLMs and search engines can understand and cite
// individual projects, not just the homepage. Rendered inside each project page.
export default function ProjectJsonLd({ project }) {
  if (!project) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    description: project.description,
    url: `${siteMetadata.url}/projects/${project.slug}`,
    keywords: project.stack,
    programmingLanguage: project.stack,
    author: {
      '@type': 'Person',
      name: personalInfo.name,
      url: siteMetadata.url,
    },
    ...(project.github && { codeRepository: project.github }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
