import { personalInfo, siteMetadata } from '@/lib/constants';

// Per-project structured data so LLMs and search engines can understand and cite
// individual projects, not just the homepage. Rendered inside each project page.
//
// Projects with a public source repository are SoftwareSourceCode. Commercial projects
// (private source, documentation-only repository) are described as a CreativeWork case
// study, with no codeRepository, so the schema never implies the code is public.
export default function ProjectJsonLd({ project }) {
  if (!project) return null;

  const url = `${siteMetadata.url}/projects/${project.slug}`;
  const sourceLink = project.links.find((link) => link.type === 'source');
  const author = {
    '@type': 'Person',
    name: personalInfo.name,
    url: siteMetadata.url,
  };

  const schema = sourceLink
    ? {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: project.title,
        description: project.summary,
        url,
        keywords: project.stack,
        programmingLanguage: project.languages,
        codeRepository: sourceLink.href,
        author,
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: `${project.title}: architecture case study`,
        description: project.summary,
        url,
        keywords: project.stack,
        author,
      };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
