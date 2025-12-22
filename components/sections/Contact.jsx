import SectionWrapper, { SectionHeading } from '@/components/ui/SectionWrapper';
import { personalInfo } from '@/lib/constants';

function EnvelopeIcon({ className }) {
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
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    </svg>
  );
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

function LinkedInIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

const contactMethods = [
  {
    name: 'Email',
    description: 'Drop me a line anytime',
    href: `mailto:${personalInfo.email}`,
    value: personalInfo.email,
    icon: EnvelopeIcon,
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  },
  {
    name: 'LinkedIn',
    description: 'Let\'s connect professionally',
    href: personalInfo.linkedin,
    value: 'alihamzadev',
    icon: LinkedInIcon,
    color: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400',
  },
  {
    name: 'GitHub',
    description: 'Check out my code',
    href: personalInfo.github,
    value: 'alihamzahq',
    icon: GitHubIcon,
    color: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  },
];

export default function Contact() {
  return (
    <SectionWrapper id="contact">
      <SectionHeading
        title="Get In Touch"
        subtitle="Have a project in mind? Let's talk about it"
      />

      <div className="max-w-3xl mx-auto">
        {/* Contact Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-12">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <a
                key={method.name}
                href={method.href}
                target={method.name !== 'Email' ? '_blank' : undefined}
                rel={method.name !== 'Email' ? 'noopener noreferrer' : undefined}
                className="group bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <div className={`inline-flex p-3 rounded-lg ${method.color} mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {method.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {method.description}
                </p>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                  {method.value}
                </p>
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Looking for a Full-Stack Developer?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
            I'm currently open to remote opportunities. Whether you need help building a
            new product, scaling your existing platform, or leading a development team,
            I'd love to hear from you.
          </p>
          <a
            href={`mailto:${personalInfo.email}?subject=Job Opportunity`}
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <EnvelopeIcon className="w-5 h-5" />
            Send Me an Email
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
