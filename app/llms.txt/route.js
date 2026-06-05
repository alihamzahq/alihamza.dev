import { personalInfo, siteMetadata } from '@/lib/constants';
import { skills, projects, experience, aboutContent } from '@/lib/data';

// Concise, AI-readable summary of the site following the llmstxt.org convention.
// Served at /llms.txt. Generated from lib/constants.js + lib/data.js so it never
// drifts out of sync with the rest of the site.
export function GET() {
  const allSkills = Object.values(skills).flat().join(', ');

  const projectLines = projects
    .map((p) => {
      const links = [`${siteMetadata.url}/projects/${p.slug}`];
      if (p.github) links.push(p.github);
      return `- **${p.title}** — ${p.description.split('. ')[0]}.\n  ${links.join(' | ')}`;
    })
    .join('\n');

  const experienceLines = experience
    .map((e) => `- **${e.role}**, ${e.company} (${e.period})`)
    .join('\n');

  const md = `# ${personalInfo.name} — ${personalInfo.title}

> ${siteMetadata.description}

${personalInfo.subtitle}. Based in ${personalInfo.location}. Open to remote opportunities.

## About

${aboutContent.intro}

## Skills

${allSkills}

## Featured Projects

${projectLines}

## Experience

${experienceLines}

## Contact

- Website: ${siteMetadata.url}
- Email: ${personalInfo.email}
- LinkedIn: ${personalInfo.linkedin}
- GitHub: ${personalInfo.github}

## More

- Full detail: ${siteMetadata.url}/llms-full.txt
`;

  return new Response(md, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
