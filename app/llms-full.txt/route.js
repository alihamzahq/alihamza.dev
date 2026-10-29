import { personalInfo, siteMetadata, skillCategories, projectLinkTypes } from '@/lib/constants';
import { skills, projects, experience, education, aboutContent } from '@/lib/data';

// Full, AI-readable profile of the site following the llmstxt.org convention.
// Served at /llms-full.txt. Like /llms.txt but with complete project detail,
// experience highlights, and education. Generated from lib/data.js (single source).
export function GET() {
  const skillsBlock = Object.entries(skills)
    .map(([cat, list]) => `- **${skillCategories[cat] || cat}**: ${list.join(', ')}`)
    .join('\n');

  const projectBlock = projects
    .map((p) => {
      const parts = [`### ${p.title}`, '', p.description, '', `> ${p.context}`, ''];
      parts.push(`- **Role**: ${p.role}`);
      if (p.team) parts.push(`- **Team**: ${p.team}`);
      if (p.duration) parts.push(`- **Duration**: ${p.duration}`);
      parts.push(`- **Stack**: ${p.stack.join(', ')}`);
      parts.push(`- **Page**: ${siteMetadata.url}/projects/${p.slug}`);
      p.links.forEach((l) => parts.push(`- **${projectLinkTypes[l.type].label}**: ${l.href}`));
      const sections = [
        ['What I built', p.highlights],
        ['Architecture decisions', p.architecture],
        ['Technical challenges', p.challenges],
        ['Results & impact', p.results],
        ['Engineering evidence', p.evidence?.map((e) => e.text)],
      ];
      sections.forEach(([heading, items]) => {
        if (items?.length) parts.push('', `**${heading}:**`, ...items.map((i) => `- ${i}`));
      });
      if (p.resultsNote) parts.push('', `_${p.resultsNote}_`);
      if (p.evidenceNote) parts.push('', `_${p.evidenceNote}_`);
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
    .map((ed) => `- **${ed.degree}**, ${ed.institution} (${ed.period})${ed.note ? `. ${ed.note}` : ''}`)
    .join('\n');

  const md = `# ${personalInfo.name} — ${personalInfo.title} | ${personalInfo.secondaryTitle}

> ${siteMetadata.description}

${personalInfo.tagline}

${aboutContent.remote}

## About

${aboutContent.intro.join('\n\n')}

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
- Resume (PDF): ${siteMetadata.url}${personalInfo.resume}
`;

  return new Response(md, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
