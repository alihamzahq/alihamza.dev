export const personalInfo = {
  name: 'Ali Hamza',
  title: 'Senior Full-Stack Engineer',
  secondaryTitle: 'Senior Backend Engineer',
  subtitle: 'PHP/Laravel · React · SaaS Architecture · APIs & Performance',
  tagline: '7+ years building scalable SaaS platforms and high-performance APIs, with hands-on experience leading engineering teams and delivering production systems.',
  email: 'hello@alihamza.dev',
  website: 'https://alihamza.dev',
  linkedin: 'https://linkedin.com/in/alihamzadev',
  github: 'https://github.com/alihamzahq',
  location: 'Lahore, Pakistan',
  // Single place for the downloadable resume (file lives in /public).
  resume: '/Ali_Hamza_Senior_Full_Stack_Engineer.pdf',
};

export const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#contact', label: 'Contact' },
];

export const siteMetadata = {
  title: 'Ali Hamza | Senior Full-Stack & Backend Engineer',
  description: 'Senior Full-Stack and Backend Engineer with 7+ years building Laravel, React, and multi-tenant SaaS platforms. Explore projects, APIs, and architecture.',
  keywords: [
    'Senior Full-Stack Engineer',
    'Senior Backend Engineer',
    'Senior Software Engineer',
    'Laravel Engineer',
    'PHP',
    'React',
    'Next.js',
    'Multi-Tenant SaaS',
    'SaaS Architecture',
    'REST APIs',
    'API Performance',
  ],
  url: 'https://alihamza.dev',
  image: '/images/og-senior-engineer.jpg',
  // ISO date of the last real content change. Used for the sitemap's lastModified
  // so it only moves when the content does. Bump it when you edit lib/data.js or copy.
  contentUpdated: '2026-10-29',
};

// Freelance profile configuration (widgets are currently disabled in Contact)
export const freelanceProfiles = {
  pph: {
    profileUrl: 'https://www.peopleperhour.com/freelancer/technology-programming/ali-hamza-php-laravel-developer-xyyjqav',
    widgetTrackingUrl: 'https://www.peopleperhour.com/hire/me/2785742855/3227504?next=https%3A%2F%2Fwww.peopleperhour.com%2Ffreelancer%2Ftechnology-programming%2Fali-hamza-php-laravel-developer-xyyjqav%3Fref%3Dhireme',
  },
  upwork: {
    profileUrl: 'https://www.upwork.com/freelancers/~01dd9b23973e124584',
  },
};

// Skill category labels for display
export const skillCategories = {
  backend: 'Backend',
  frontend: 'Frontend',
  database: 'Database & Performance',
  engineering: 'Engineering & Architecture',
  infrastructure: 'Infrastructure & Tools',
  ai: 'AI & Development Tools',
};

// Project link types. Labels are intentionally explicit about what a link is, so a
// documentation-only repository is never presented as source code or a live demo.
export const projectLinkTypes = {
  source: { label: 'View Source Code', shortLabel: 'Source Code', icon: 'github' },
  architecture: { label: 'Read Architecture Docs', shortLabel: 'Architecture Docs', icon: 'github' },
  docs: { label: 'API Documentation', shortLabel: 'API Documentation', icon: 'external' },
  'case-study': { label: 'Read Architecture Case Study', shortLabel: 'Architecture Case Study', icon: 'github' },
  product: { label: 'Visit Product Website', shortLabel: 'Product Website', icon: 'external' },
};

// Whether a project's code is public or only documented publicly.
export const projectKinds = {
  commercial: 'Commercial project · private source',
  personal: 'Personal project · public source',
};
