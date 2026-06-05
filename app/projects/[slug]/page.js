import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects } from '@/lib/data';
import { siteMetadata, personalInfo } from '@/lib/constants';
import ProjectJsonLd from '@/components/ProjectJsonLd';

function getProject(slug) {
  return projects.find((p) => p.slug === slug);
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
  const description = `${project.description.slice(0, 155)}...`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteMetadata.url}/projects/${project.slug}`,
    },
    openGraph: {
      title: `${title} | ${personalInfo.name}`,
      description,
      url: `${siteMetadata.url}/projects/${project.slug}`,
      type: 'article',
      images: [
        {
          url: siteMetadata.image,
          width: 1200,
          height: 630,
          alt: `${project.title} - ${personalInfo.name}`,
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
        <span className="text-indigo-600 dark:text-indigo-400">{icon}</span>
        {title}
      </h2>
      {children}
    </div>
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
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Projects
          </Link>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {project.title}
          </h1>

          <p className="text-lg text-white/85 max-w-3xl leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-white/75 mb-8">
            {project.role && (
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                {project.role}
              </span>
            )}
            {project.team && (
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                {project.team}
              </span>
            )}
            {project.duration && (
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                {project.duration}
              </span>
            )}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm font-medium bg-white/15 backdrop-blur-sm text-white rounded-lg border border-white/20"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 backdrop-blur-sm text-white font-medium rounded-lg border border-white/20 hover:bg-white/25 transition-colors"
              >
                <GitHubIcon className="w-5 h-5" />
                View Source Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-indigo-700 font-medium rounded-lg hover:bg-white/90 transition-colors"
              >
                <ExternalLinkIcon className="w-5 h-5" />
                Live Demo
              </a>
            )}
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

          {/* What I Built */}
          {project.highlights && (
            <InfoCard title="What I Built" icon="&lt;&gt;">
              <ul className="space-y-3">
                {project.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                  >
                    <span className="text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0">
                      <CheckIcon className="w-5 h-5" />
                    </span>
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </InfoCard>
          )}

          {/* Challenges */}
          {project.challenges && (
            <InfoCard title="Technical Challenges" icon="&#9889;">
              <ul className="space-y-3">
                {project.challenges.map((challenge, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                  >
                    <span className="text-amber-500 dark:text-amber-400 mt-1 flex-shrink-0 text-sm">
                      &#9679;
                    </span>
                    <span className="leading-relaxed">{challenge}</span>
                  </li>
                ))}
              </ul>
            </InfoCard>
          )}

          {/* Results */}
          {project.results && (
            <InfoCard title="Results & Impact" icon="&#128200;">
              <ul className="space-y-3">
                {project.results.map((result, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                  >
                    <span className="text-indigo-500 dark:text-indigo-400 mt-0.5 flex-shrink-0">
                      <CheckIcon className="w-5 h-5" />
                    </span>
                    <span className="leading-relaxed font-medium">{result}</span>
                  </li>
                ))}
              </ul>
            </InfoCard>
          )}

          {/* Screenshots */}
          {project.screenshots && project.screenshots.length > 0 && (
            <InfoCard title="Screenshots" icon="&#128247;">
              <div className="grid gap-4 sm:grid-cols-2">
                {project.screenshots.map((screenshot, i) => (
                  <a
                    key={i}
                    href={screenshot.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col overflow-hidden rounded-xl border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex-grow bg-gray-50 dark:bg-slate-800/50">
                      <img
                        src={screenshot.src}
                        alt={screenshot.alt}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    </div>
                    <p className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-200 dark:border-slate-700">
                      {screenshot.alt}
                    </p>
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
                I&apos;m open to remote opportunities and exciting projects.
              </p>
            </div>
            <Link
              href="/#contact"
              className="btn btn-primary btn-lg whitespace-nowrap"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
