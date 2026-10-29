import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects } from '@/lib/data';
import { siteMetadata, personalInfo, projectLinkTypes, projectKinds } from '@/lib/constants';
import ProjectJsonLd from '@/components/ProjectJsonLd';

function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}

// Keep meta descriptions within ~160 characters without cutting a word in half.
function toMetaDescription(text, max = 160) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  const title = project.title;
  const description = toMetaDescription(project.summary);
  const url = `${siteMetadata.url}/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${personalInfo.name}`,
      description,
      url,
      type: 'website',
      siteName: personalInfo.name,
      locale: 'en_US',
      images: [
        {
          url: siteMetadata.image,
          width: 1200,
          height: 630,
          alt: `${project.title} - ${personalInfo.name}, ${personalInfo.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${personalInfo.name}`,
      description,
      images: [siteMetadata.image],
    },
  };
}

function GitHubIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ExternalLinkIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}

function ArrowLeftIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function InfoCard({ title, icon, children }) {
  return (
    <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white mb-4">
        <span className="text-indigo-600 dark:text-indigo-400" aria-hidden="true">{icon}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}

// Which list sections a project page can show, in display order. Each is skipped
// when the project has no data for it.
const listSections = [
  { key: 'highlights', title: 'What I Built', icon: '<>', marker: 'check', markerClass: 'text-emerald-500 dark:text-emerald-400' },
  { key: 'architecture', title: 'Architecture Decisions', icon: '\u25A6', marker: 'dot', markerClass: 'text-indigo-500 dark:text-indigo-400' },
  { key: 'challenges', title: 'Technical Challenges', icon: '\u26A1', marker: 'dot', markerClass: 'text-amber-500 dark:text-amber-400' },
  { key: 'results', title: 'Results & Impact', icon: '\uD83D\uDCC8', marker: 'check', markerClass: 'text-indigo-500 dark:text-indigo-400', emphasis: true },
  { key: 'evidence', title: 'Engineering Evidence', icon: '\u2713', marker: 'check', markerClass: 'text-emerald-500 dark:text-emerald-400' },
];

const sectionNotes = {
  results: 'resultsNote',
  evidence: 'evidenceNote',
};

const linkButtonClass = {
  source: 'bg-black/20 backdrop-blur-sm text-white border border-white/30 hover:bg-black/30',
  'case-study': 'bg-black/20 backdrop-blur-sm text-white border border-white/30 hover:bg-black/30',
  architecture: 'bg-black/20 backdrop-blur-sm text-white border border-white/30 hover:bg-black/30',
  docs: 'bg-white text-indigo-700 hover:bg-white/90',
  product: 'bg-white text-indigo-700 hover:bg-white/90',
};

function ListItem({ item, section }) {
  const text = typeof item === 'string' ? item : item.text;
  const href = typeof item === 'string' ? null : item.href;

  return (
    <li className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
      <span className={`${section.markerClass} mt-0.5 flex-shrink-0`}>
        {section.marker === 'check' ? (
          <CheckIcon className="w-5 h-5" />
        ) : (
          <span className="block mt-1 text-sm" aria-hidden="true">&#9679;</span>
        )}
      </span>
      <span className={`leading-relaxed ${section.emphasis ? 'font-medium' : ''}`}>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-gray-300 dark:decoration-slate-600 underline-offset-4 hover:text-indigo-600 dark:hover:text-indigo-400 hover:decoration-current"
          >
            {text}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          text
        )}
      </span>
    </li>
  );
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <ProjectJsonLd project={project} />
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 pt-24 pb-16 md:pt-28 md:pb-20 focus-on-gradient">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Projects
          </Link>

          <p className="flex w-fit items-center px-3 py-1 mb-4 text-xs font-semibold text-white bg-black/20 border border-white/30 rounded-full">
            {projectKinds[project.kind]}
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight text-balance">
            {project.title}
          </h1>

          <p className="text-lg text-white/90 max-w-3xl leading-relaxed mb-6">
            {project.description}
          </p>

          {/* What the public links contain */}
          <p className="max-w-3xl mb-6 px-4 py-3 text-sm leading-relaxed text-white bg-black/15 border border-white/20 rounded-xl">
            {project.context}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/90 mb-8">
            {project.role && (
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" aria-hidden="true" />
                {project.role}
              </span>
            )}
            {project.team && (
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" aria-hidden="true" />
                {project.team}
              </span>
            )}
            {project.duration && (
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" aria-hidden="true" />
                {project.duration}
              </span>
            )}
          </div>

          {/* Tech stack */}
          <ul className="flex flex-wrap gap-2 mb-8" aria-label="Technologies">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="px-3 py-1.5 text-sm font-medium bg-black/20 backdrop-blur-sm text-white rounded-lg border border-white/30"
              >
                {tech}
              </li>
            ))}
          </ul>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {project.links.map((link) => {
              const Icon = projectLinkTypes[link.type].icon === 'github' ? GitHubIcon : ExternalLinkIcon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 font-medium rounded-lg transition-colors ${linkButtonClass[link.type]}`}
                >
                  <Icon className="w-5 h-5" />
                  {projectLinkTypes[link.type].label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-8">
          {/* Key Value */}
          <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-2xl border border-indigo-100 dark:border-indigo-900/50">
            <p className="text-indigo-700 dark:text-indigo-300">
              <span className="font-bold text-lg">Key value:</span>{' '}
              <span className="text-base">{project.problem}</span>
            </p>
          </div>

          {/* What I built, architecture, challenges, results, evidence */}
          {listSections.map((section) => {
            const items = project[section.key];
            if (!items || items.length === 0) return null;
            const note = project[sectionNotes[section.key]];

            return (
              <InfoCard key={section.key} title={section.title} icon={section.icon}>
                <ul className="space-y-3">
                  {items.map((item, i) => (
                    <ListItem key={i} item={item} section={section} />
                  ))}
                </ul>
                {note && (
                  <p className="mt-4 text-sm italic text-gray-500 dark:text-gray-400">{note}</p>
                )}
              </InfoCard>
            );
          })}

          {/* Screenshots */}
          {project.screenshots && project.screenshots.length > 0 && (
            <InfoCard title="Screenshots" icon="&#128247;">
              <div className="grid gap-4 sm:grid-cols-2">
                {project.screenshots.map((screenshot) => (
                  <a
                    key={screenshot.src}
                    href={screenshot.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col overflow-hidden rounded-xl border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex-grow bg-gray-50 dark:bg-slate-800/50">
                      <Image
                        src={screenshot.src}
                        alt={screenshot.alt}
                        width={screenshot.width}
                        height={screenshot.height}
                        sizes="(min-width: 896px) 400px, (min-width: 640px) 45vw, 100vw"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <p
                      className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-200 dark:border-slate-700"
                      aria-hidden="true"
                    >
                      {screenshot.alt}
                    </p>
                    <span className="sr-only">(full-size image, opens in a new tab)</span>
                  </a>
                ))}
              </div>
            </InfoCard>
          )}

          {/* CTA */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-200 dark:border-slate-700">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                Interested in working together?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                I&apos;m open to full-time international remote roles and long-term contracts.
              </p>
            </div>
            <Link
              href="/#contact"
              className="btn btn-primary btn-lg whitespace-nowrap"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
