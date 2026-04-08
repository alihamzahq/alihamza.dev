// Skills Data
export const skills = {
  backend: ['PHP', 'Laravel', 'REST APIs','Authentication', 'API Integration'],
  frontend: ['JavaScript (ES6+)', 'React.js', 'Vue.js','Next.js', 'Inertia.js', 'Tailwind CSS'],
  database: ['MySQL', 'Redis','Database Design','Query Optimization'],
  devops: ['Git', 'Docker',' CI/CD', 'Linux', 'Nginx', 'Cloudflare', 'AWS', 'GCP'],
  ai: ['ChatGPT', 'Claude', 'Cursor AI'],
};

// Projects Data
export const projects = [
  {
    slug: 'enterprise-multitenant-saas-platform',
    title: 'Enterprise Multi-Tenant SaaS Platform',
    description:
      'Large-scale enterprise multi-tenant SaaS platform built for content management and publishing workflows. Features domain and request-based tenant identification, tenant-aware data queries, centralized authentication with tenant context, role-based access controls, and subscription billing. Designed to support thousands of tenants with high availability.',
    stack: ['Laravel', 'React', 'Next.js', 'MySQL', 'Docker', 'AWS'],
    github: 'https://github.com/alihamzahq/enterprise-multitenant-saas-platform',
    demo: 'https://www.ipublisher.app',
    problem: 'Powers scalable content management for multiple organizations with strict tenant isolation and automated infrastructure provisioning',
    role: 'Full Stack Developer & Team Lead',
    team: '8 engineers',
    duration: 'Apr 2023 - Present',
    highlights: [
      'Joined mid-development, progressed to Team Lead — took ownership of stabilizing, scaling, and architecting the system',
      'Designed domain and request-based tenant identification supporting 100+ client organizations',
      'Built tenant-aware data queries with centralized authentication and tenant context isolation',
      'Led backend and frontend development, code reviews, mentoring, and cross-functional collaboration with product, QA, and DevOps',
      'Automated infrastructure provisioning — DNS, Cloudflare, Nginx, and SSL setup per tenant via CI/CD pipelines',
      'Optimized request lifecycle, refactored legacy code, and defined engineering standards',
    ],
    challenges: [
      'Inheriting a mid-development codebase and stabilizing it while adding new features at scale',
      'Ensuring complete data isolation between tenants while maintaining query performance across thousands of tenants',
      'Automating DNS, SSL, and Nginx provisioning for custom tenant domains without manual intervention',
      'Coordinating backend/frontend efforts across an 8-member cross-functional team',
    ],
    results: [
      'Serving 100+ client organizations with 99.9% uptime',
      'Reduced tenant onboarding time from days to minutes with automated provisioning',
      'Improved system performance by 60% with MySQL query tuning, Redis caching, and code refactoring',
      'Reduced OpenAI API costs by 70% through optimized token usage and model-selection strategies',
    ],
  },
  {
    slug: 'sports-seat-swap-platform',
    title: 'Sports Seat Swapping Marketplace',
    description:
      'Production-grade Laravel 10 backend powering a sports seat swapping marketplace. Built with PHP 8.2, MySQL, Redis, Laravel Sanctum, Stripe, and Firebase Cloud Messaging. Features 80+ versioned REST API endpoints, real-time messaging, subscription management, identity verification, and a full admin dashboard with server-side DataTables.',
    stack: ['Laravel 10', 'PHP 8.2', 'MySQL', 'Redis', 'Stripe', 'Firebase', 'Sanctum'],
    github: 'https://github.com/alihamzahq/sports-seat-swap-platform',
    demo: null,
    problem: 'Enables fans to list, discover, and exchange stadium seats with real-time communication, subscription access, and secure payment processing',
    role: 'Senior/Lead Backend Engineer',
    team: '4 engineers (2 backend, 2 mobile)',
    duration: '2023 - 2024',
    highlights: [
      'Designed overall system architecture and built 80+ versioned REST API endpoints serving iOS and Android clients',
      'Implemented complete Stripe subscription billing with full lifecycle — subscribe, cancel, resume, upgrade',
      'Built real-time messaging system with Firebase Cloud Messaging push notifications',
      'Developed seat listing and swap offer workflows with approval processes and identity verification',
      'Created admin dashboard with Blade templates, server-side DataTables, and Vite bundling',
      'Built asynchronous job processing infrastructure with scheduled tasks and queue management',
      'Integrated multi-sport data from external sources for live event updates',
    ],
    challenges: [
      'Scaling real-time seat availability and sports updates to 10K+ concurrent users during peak events',
      'Designing a versioned API architecture flexible enough to serve both iOS and Android clients simultaneously',
      'Building reliable payment webhook integration for peer-to-peer seat transactions with Stripe',
      'Implementing identity verification and moderation workflows for user trust and safety',
    ],
    results: [
      'Delivered production-ready API serving mobile clients with 99.9% uptime',
      'Scaled to 10K+ concurrent users during peak sporting events using Socket.io + Redis Pub/Sub',
      'Achieved 99.9% queue reliability with Redis-backed job processing and auto-failure handling',
    ],
  },
  {
    slug: 'laravel-stripe-saas-billing',
    title: 'Laravel Stripe SaaS Billing',
    description:
      'Production-ready subscription billing system built with Laravel 12, Stripe (via Laravel Cashier), React 18, and Inertia.js. Provides a customer-facing REST API and an admin dashboard for complete SaaS subscription management, invoice handling, and payment processing.',
    stack: ['Laravel 12', 'Stripe', 'React 18', 'Inertia.js', 'MySQL', 'Sanctum', 'Tailwind CSS'],
    github: 'https://github.com/alihamzahq/laravel-stripe-saas-billing',
    demo: null,
    problem: 'Provides a complete, ready-to-use subscription billing system with both customer API and admin dashboard',
    role: 'Solo Developer',
    coverImage: '/images/projects/stripe-saas/01-hero-section.png',
    screenshots: [
      { src: '/images/projects/stripe-saas/01-hero-section.png', alt: 'Landing page with subscription plans' },
      { src: '/images/projects/stripe-saas/02-pricing-section.png', alt: 'Pricing tiers and plan selection' },
      { src: '/images/projects/stripe-saas/03-admin-dashboard.png', alt: 'Admin dashboard with revenue metrics' },
      { src: '/images/projects/stripe-saas/04-admin-plans.png', alt: 'Plan management with Stripe sync' },
      { src: '/images/projects/stripe-saas/05-admin-users.png', alt: 'User management and payment history' },
      { src: '/images/projects/stripe-saas/06-admin-user-detail.png', alt: 'User detail with subscription info' },
      { src: '/images/projects/stripe-saas/07-admin-subscriptions.png', alt: 'Subscription management overview' },
      { src: '/images/projects/stripe-saas/08-webhook-logs.png', alt: 'Stripe webhook event logs' },
      { src: '/images/projects/stripe-saas/09-payment-logs.png', alt: 'Payment transaction logs' },
      { src: '/images/projects/stripe-saas/10-subscription-details.png', alt: 'Subscription detail view' },
      { src: '/images/projects/stripe-saas/11-admin-login.png', alt: 'Admin login page' },
    ],
    highlights: [
      'Built complete subscription lifecycle API — subscribe, cancel, resume, change plans via RESTful endpoints',
      'Implemented Stripe webhook handling for invoice payments, failed attempts, subscription updates, cancellations, and refunds',
      'Created admin dashboard with revenue metrics, subscription counts, user statistics, and activity logging',
      'Designed plan management with full Stripe product/price synchronization via Laravel Cashier',
      'Built payment method CRUD operations and invoice access with PDF downloads',
      'Architected service layer pattern for clean business logic separation',
      'Includes Postman collection with sample requests and environment configuration',
    ],
  },
  {
    slug: 'laravel-multi-tenant-saas-starter',
    title: 'Laravel React Multi-Tenant SaaS Starter',
    description:
      'Portfolio-grade multi-tenant SaaS starter kit built with Laravel 12, React 18, Inertia.js, and Tailwind CSS. Features database-per-tenant isolation via Stancl/Tenancy, subdomain routing, a central admin panel with tenant impersonation, and comprehensive API support with Sanctum authentication.',
    stack: ['Laravel 12', 'React 18', 'Inertia.js', 'MySQL', 'Redis', 'Stancl/Tenancy', 'Sanctum'],
    github: 'https://github.com/alihamzahq/laravel-multi-tenant-saas-starter',
    demo: null,
    problem: 'Eliminates months of boilerplate setup for multi-tenant SaaS projects with production-ready architecture',
    role: 'Solo Developer',
    coverImage: '/images/projects/multi-tenant-saas/00-hero-cropped.png',
    screenshots: [
      { src: '/images/projects/multi-tenant-saas/01-landing-hero.png', alt: 'Landing page with features overview' },
      { src: '/images/projects/multi-tenant-saas/02-landing-credentials.png', alt: 'Demo credentials and quick start' },
      { src: '/images/projects/multi-tenant-saas/03-admin-dashboard.png', alt: 'Central admin dashboard with tenant stats' },
      { src: '/images/projects/multi-tenant-saas/04-admin-tenants-list.png', alt: 'Tenant management list view' },
      { src: '/images/projects/multi-tenant-saas/05-admin-tenant-detail.png', alt: 'Tenant detail and configuration' },
      { src: '/images/projects/multi-tenant-saas/06-admin-create-tenant.png', alt: 'Create new tenant form' },
      { src: '/images/projects/multi-tenant-saas/07-tenant-dashboard.png', alt: 'Tenant application dashboard' },
      { src: '/images/projects/multi-tenant-saas/08-tenant-projects.png', alt: 'Tenant project management' },
      { src: '/images/projects/multi-tenant-saas/09-tenant-project-detail.png', alt: 'Project detail with status workflow' },
      { src: '/images/projects/multi-tenant-saas/10-tenant-users.png', alt: 'Tenant user management with roles' },
    ],
    highlights: [
      'Architected database-per-tenant isolation using Stancl/Tenancy with automatic database provisioning on tenant registration',
      'Built subdomain routing system (e.g., acme.yourdomain.com) with tenant-aware caching, queues, and storage',
      'Created central admin panel with tenant CRUD, activate/deactivate controls, and tenant impersonation (login as tenant)',
      'Implemented role-based access control with Admin and User roles, user management, and project management workflows',
      'Designed RESTful API architecture with central API for tenant management and tenant API for application resources',
      'Built with service classes for business logic and resource transformers for consistent API responses',
    ],
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
    period: 'Nov 2019 - Apr 2021',
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
    period: 'Aug 2019 - Nov 2019',
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
    period: 'Apr 2017 - May 2019',
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
