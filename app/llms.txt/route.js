import { personalInfo, siteMetadata, projectLinkTypes } from '@/lib/constants';
import { skills, projects, experience, aboutContent } from '@/lib/data';

// Concise, AI-readable summary of the site following the llmstxt.org convention.
// Served at /llms.txt. Generated from lib/constants.js + lib/data.js so it never
// drifts out of sync with the rest of the site.
export function GET() {
  const allSkills = Object.values(skills).flat().join(', ');

  const projectLines = projects
    .map((p) => {
      const links = [
        `${siteMetadata.url}/projects/${p.slug}`,
        ...p.links.map((l) => `${projectLinkTypes[l.type].label}: ${l.href}`),
      ];
      return `- **${p.title}** (${p.kind === 'commercial' ? 'commercial, private source' : 'personal, public source'}) — ${p.summary}\n  ${links.join(' | ')}`;
    })
    .join('\n');

  const experienceLines = experience
    .map((e) => `- **${e.role}**, ${e.company} (${e.period})`)
    .join('\n');

  const md = `# ${personalInfo.name} — ${personalInfo.title} | ${personalInfo.secondaryTitle}

> ${siteMetadata.description}

${personalInfo.subtitle}. Location: ${personalInfo.location}. ${aboutContent.remote}

## About

${aboutContent.intro.join('\n\n')}

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
- Resume (PDF): ${siteMetadata.url}${personalInfo.resume}

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
