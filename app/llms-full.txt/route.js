import { personalInfo, siteMetadata } from '@/lib/constants';
import { skills, projects, experience, education, aboutContent } from '@/lib/data';

// Full, AI-readable profile of the site following the llmstxt.org convention.
// Served at /llms-full.txt. Like /llms.txt but with complete project detail,
// experience highlights, and education. Generated from lib/data.js (single source).
export function GET() {
  const skillsBlock = Object.entries(skills)
    .map(([cat, list]) => `- **${cat}**: ${list.join(', ')}`)
    .join('\n');

  const projectBlock = projects
    .map((p) => {
      const parts = [`### ${p.title}`, '', p.description, ''];
      parts.push(`- **Role**: ${p.role}`);
      if (p.team) parts.push(`- **Team**: ${p.team}`);
      if (p.duration) parts.push(`- **Duration**: ${p.duration}`);
      parts.push(`- **Stack**: ${p.stack.join(', ')}`);
      parts.push(`- **Page**: ${siteMetadata.url}/projects/${p.slug}`);
      if (p.github) parts.push(`- **Source**: ${p.github}`);
      if (p.demo) parts.push(`- **Demo**: ${p.demo}`);
      if (p.highlights) {
        parts.push('', '**What I built:**', ...p.highlights.map((h) => `- ${h}`));
      }
      if (p.challenges) {
        parts.push('', '**Technical challenges:**', ...p.challenges.map((c) => `- ${c}`));
      }
      if (p.results) {
        parts.push('', '**Results & impact:**', ...p.results.map((r) => `- ${r}`));
      }
      return parts.join('\n');
    })
    .join('\n\n');

  const experienceBlock = experience
    .map((e) => {
      const head = `### ${e.role} — ${e.company}\n${e.period} · ${e.location}`;
      const highlights = e.highlights.map((h) => `- ${h}`).join('\n');
      return `${head}\n\n${highlights}`;
    })
    .join('\n\n');

  const educationBlock = education
    .map((ed) => `- **${ed.degree}**, ${ed.institution} (${ed.period})`)
    .join('\n');

  const md = `# ${personalInfo.name} — ${personalInfo.title}

> ${siteMetadata.description}

${personalInfo.tagline}

Based in ${personalInfo.location}. ${aboutContent.remote}

## About

${aboutContent.intro}

${aboutContent.highlights.map((h) => `- ${h}`).join('\n')}

## Skills

${skillsBlock}

## Projects

${projectBlock}

## Experience

${experienceBlock}

## Education

${educationBlock}

## Contact

- Website: ${siteMetadata.url}
- Email: ${personalInfo.email}
- LinkedIn: ${personalInfo.linkedin}
- GitHub: ${personalInfo.github}
`;

  return new Response(md, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
