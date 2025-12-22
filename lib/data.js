// Skills Data
export const skills = {
  backend: ['PHP', 'Laravel', 'REST APIs'],
  frontend: ['JavaScript', 'React.js', 'Vue.js', 'Inertia.js', 'jQuery'],
  database: ['MySQL', 'Redis'],
  devops: ['Git', 'Docker', 'Linux', 'Nginx', 'Cloudflare', 'AWS', 'GCP'],
  ai: ['ChatGPT', 'Claude', 'Cursor AI'],
};

// Projects Data
export const projects = [
  {
    title: 'Laravel Multi-Tenant SaaS Starter',
    description:
      'Production-ready multi-tenant SaaS boilerplate with team management, billing integration, and complete tenant isolation. Includes authentication, role-based access control, and subscription management.',
    stack: ['Laravel', 'MySQL', 'Redis', 'Inertia.js', 'React'],
    github: 'https://github.com/alihamzahq/laravel-multi-tenant-saas-starter',
    demo: null,
    problem: 'Eliminates months of boilerplate setup for SaaS projects',
  },
  {
    title: 'Laravel Stripe SaaS Billing',
    description:
      'Complete Stripe integration for SaaS billing with subscriptions, invoices, payment method management, and webhook handling. Supports multiple pricing tiers and usage-based billing.',
    stack: ['Laravel', 'Stripe', 'MySQL', 'REST APIs'],
    github: 'https://github.com/alihamzahq/laravel-stripe-saas-billing',
    demo: null,
    problem: 'Simplifies complex subscription billing implementation',
  },
];

// Experience Data
export const experience = [
  {
    company: 'Sixlogics',
    role: 'Full Stack Developer | Team Lead',
    period: 'Apr 2023 - Present',
    location: 'Lahore, Pakistan',
    highlights: [
      'Led 8-member team to architect multi-tenant SaaS platform (iPublisher) serving 100+ clients with automated DNS, Cloudflare, Nginx, and SSL setup',
      'Reduced OpenAI API costs by 70% through optimized token usage, model-selection strategies (GPT-4 Mini), and prompt-engineering refinements',
      'Improved system performance by 60% with MySQL query tuning, Redis caching, and Laravel code refactoring',
      'Scaled real-time sports updates to 10K+ concurrent users using Socket.io + Redis Pub/Sub',
      'Achieved 99.9% queue reliability by rebuilding Laravel Horizon workflows with Redis prioritization and auto-failure handling',
      'Built SwapSeat - a real-time football ticket exchange platform with Stripe integration and Firebase chat',
    ],
  },
  {
    company: 'Friday Media Group',
    role: 'Full Stack Developer',
    period: 'Jun 2021 - Apr 2023',
    location: 'Lahore, Pakistan',
    highlights: [
      'Built HelloFriday SaaS HR platform - automated attendance tracking and performance workflows, cutting HR workload by 40%',
      'Boosted employee retention 30% with React dashboards for KPI and leave analytics',
      'Cut HR processing time by 55% by migrating to modular Laravel/Inertia.js architecture',
      'Developed VExpo virtual event platform - ensured 99.9% uptime and reduced API latency by 65% through Redis caching and MySQL optimizations',
      'Boosted exhibitor engagement 45% with 3D booths and live Q&A via WebSockets',
    ],
  },
  {
    company: 'Sentax Lab',
    role: 'Laravel Developer',
    period: 'Jul 2019 - Mar 2021',
    location: 'Gujranwala, Pakistan',
    highlights: [
      'Contributed to projects across eCommerce, college management systems, and ERP solutions',
      'Developed RESTful APIs and optimized MySQL queries for improved performance',
      'Implemented authentication, security features, and UI/UX improvements',
      'Collaborated with cross-functional teams to ensure scalable and maintainable codebases',
    ],
  },
  {
    company: 'VNext Solution',
    role: 'PHP Developer',
    period: 'Mar 2019 - Jun 2019',
    location: 'Gujranwala, Pakistan',
    highlights: [
      'Started as PHP intern, progressed to full-time Web Developer',
      'Gained foundational experience in web application development and best practices',
    ],
  },
];

// Education Data
export const education = [
  {
    degree: "Bachelor's degree, Computer Software Engineering",
    institution: 'Virtual University of Pakistan',
    period: 'Jan 2017 - Dec 2019',
  },
  {
    degree: 'Web Design & Development Certifications',
    institution: 'Aptech Computer Education, Gujranwala',
    period: 'Oct 2016 - Dec 2018',
  },
];

// About Section Content
export const aboutContent = {
  intro: `I'm a Full-Stack Developer with over 6 years of experience building scalable web applications and SaaS platforms. I specialize in PHP, Laravel, React, and modern JavaScript frameworks, with a strong focus on performance optimization and clean architecture.`,

  highlights: [
    'Led cross-functional teams to deliver enterprise-grade solutions',
    'Proven track record of reducing operational costs by 70%+ and improving system performance by 60%',
    'Expert in building multi-tenant SaaS platforms with real-time features',
    'Advocate for AI-augmented development using tools like ChatGPT, Claude, and Cursor AI',
  ],

  remote: `I'm actively seeking remote opportunities where I can contribute to challenging projects while maintaining work-life balance. I thrive in async communication environments and have extensive experience collaborating with distributed teams across different time zones.`,
};
