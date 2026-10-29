// Skills Data (labels live in skillCategories in lib/constants.js)
export const skills = {
  backend: ['PHP', 'Laravel', 'REST APIs', 'API Design', 'Authentication', 'Laravel Horizon'],
  frontend: ['React', 'Next.js', 'JavaScript (ES6+)', 'Vue.js', 'Inertia.js', 'Tailwind CSS'],
  database: ['MySQL', 'PostgreSQL', 'Redis', 'Database Design', 'Query Optimization', 'Caching'],
  engineering: [
    'Multi-Tenant SaaS',
    'System Design',
    'Automated Testing',
    'Queues & Background Jobs',
    'Real-Time Systems (Socket.io)',
    'Stripe & Firebase Integrations',
    'CI/CD',
  ],
  infrastructure: ['Docker', 'Linux', 'Nginx', 'GCP', 'AWS S3', 'Cloudflare', 'Git', 'New Relic'],
  ai: ['Claude Code', 'Cursor', 'OpenAI API'],
};

const shot = (dir, file, alt, width, height) => ({
  src: `/images/projects/${dir}/${file}`,
  alt,
  width,
  height,
});

// Projects Data
//
// Fields:
//   kind     'commercial' (private source) | 'personal' (public source)
//   context  one sentence that states plainly what the public links contain
//   summary  short text for cards, meta descriptions, JSON-LD and llms.txt
//   links    [{ type: 'source' | 'docs' | 'case-study' | 'product', href }]
//            ('case-study' = documentation-only repository, never source code)
export const projects = [
  {
    slug: 'pulsepass-api',
    title: 'Pulsepass API',
    kind: 'personal',
    featured: true,
    context:
      'Personal portfolio project, not a deployed commercial product. The source code, tests, CI configuration, and API documentation are public.',
    summary:
      'Laravel backend demonstrating modular architecture, transactional offer workflows, Stripe subscriptions, automated testing, and documented REST APIs.',
    description:
      'A Laravel 12 backend for a ticket resale platform, built to show how I structure and test a non-trivial API. The interesting part is not the CRUD but what happens when a seller accepts an offer: the offer moves through a guarded state machine, the listing is marked sold, and every competing offer is rejected inside a single database transaction. Around that core sit a scheduled Ticketmaster sync, Stripe-gated listing quotas, and an idempotent webhook layer.',
    stack: ['Laravel 12', 'PHP 8.4', 'MySQL', 'Redis', 'Stripe Cashier', 'Pest', 'PHPStan', 'OpenAPI 3.1', 'GitHub Actions'],
    languages: ['PHP'],
    facts: ['113 Pest tests', 'PHPStan level 8', '27 documented endpoints', 'OpenAPI 3.1 spec', 'GitHub Actions CI'],
    links: [
      { type: 'source', href: 'https://github.com/alihamzahq/pulsepass-api' },
      { type: 'docs', href: 'https://alihamzahq.github.io/pulsepass-api/' },
      { type: 'architecture', href: 'https://github.com/alihamzahq/pulsepass-api/blob/main/docs/architecture.md' },
    ],
    problem:
      'Shows how I model a transactional marketplace workflow with clear domain boundaries, guarded state transitions, and tests that run in CI.',
    role: 'Sole developer (personal portfolio project)',
    highlights: [
      'Organized the code as a modular monolith: five business domains under app/Domain, with thin HTTP controllers and form requests per domain',
      'Modeled offers as a state machine (Sent to Accepted, Rejected, Withdrawn, or Expired) with guarded transitions using spatie/laravel-model-states',
      'Implemented offer acceptance as one transaction: the offer transitions, the listing is marked sold, and all other pending offers on that listing are rejected',
      'Built a scheduled Ticketmaster sync that rate-limits requests and commits each event in its own transaction, so one bad event does not abort the batch',
      'Integrated Stripe subscriptions through Laravel Cashier and enforced per-tier listing quotas (Free: 1, Pro: 10, Festival: unlimited) at listing creation',
      'Handled Stripe webhooks idempotently by recording every event ID, so replayed deliveries are no-ops',
      'Authenticated the API with Laravel Sanctum personal access tokens and authorized actions with policies',
    ],
    architecture: [
      'Domain-oriented layout (Auth, Billing, Events, Listings, Offers, Organizer) keeps business rules free of HTTP concerns, with controllers acting as thin adapters',
      'A state-machine library replaces a status enum, so illegal transitions are rejected in one place (ADR 0002)',
      'Per-event transactions in the sync trade all-or-nothing atomicity for partial-success resilience (ADR 0003)',
      'Sanctum personal access tokens were chosen over JWT (ADR 0004), and plain Action classes over an action package (ADR 0005)',
    ],
    challenges: [
      'Keeping offer acceptance atomic: transitioning one offer, closing the listing, and rejecting sibling offers without leaving a partial state if any step fails',
      'Making Stripe webhook handling safe under retries, so a duplicate delivery never applies the same change twice',
      'Syncing third-party event data in batches without letting a single malformed record block the rest',
    ],
    evidenceNote: 'Counts below were checked against the public repository on October 29, 2026 and may change as it evolves.',
    evidence: [
      { text: '113 Pest test cases', href: 'https://github.com/alihamzahq/pulsepass-api/tree/main/tests' },
      {
        text: 'PHPStan level 8, Laravel Pint, and the Pest suite run in GitHub Actions CI',
        href: 'https://github.com/alihamzahq/pulsepass-api/blob/main/.github/workflows/ci.yml',
      },
      {
        text: '27 REST endpoints, documented in an OpenAPI 3.1 spec generated from the code with Scramble and published as interactive API documentation',
        href: 'https://alihamzahq.github.io/pulsepass-api/',
      },
      {
        text: 'Architecture document with three diagrams: system context, data model, and the offer state machine',
        href: 'https://github.com/alihamzahq/pulsepass-api/blob/main/docs/architecture.md',
      },
      { text: 'Five Architecture Decision Records', href: 'https://github.com/alihamzahq/pulsepass-api/tree/main/docs/adr' },
      {
        text: 'A k6 load-test script and seed command for the offer-create endpoint (tooling only; no performance claim is made)',
        href: 'https://github.com/alihamzahq/pulsepass-api/tree/main/scripts/loadtest',
      },
    ],
  },
  {
    slug: 'enterprise-multitenant-saas-platform',
    title: 'Enterprise Multi-Tenant SaaS Platform (iPublisher)',
    kind: 'commercial',
    context:
      'Commercial product built at Sixlogics. The production source code is private; the linked repository contains architecture documentation only, not the application source.',
    summary:
      'Multi-tenant sports and publishing SaaS platform serving 100+ clients, featuring real-time integrations, centralized administration, tenant-aware APIs, automated domain onboarding, and performance optimization.',
    description:
      'iPublisher is a commercial multi-tenant platform for sports and publishing content, built and maintained at Sixlogics. It serves 100+ clients from one platform, with tenant-aware APIs, a central administration layer, real-time sports data delivery, and automated onboarding of tenant domains. I joined while the system was already in development and later became Team Lead of an eight-person engineering team, staying hands-on with architecture, code reviews, and delivery.',
    stack: [
      'Laravel',
      'React',
      'Inertia.js',
      'Next.js',
      'MySQL',
      'Redis',
      'Laravel Horizon',
      'Socket.io',
      'OpenAI API',
      'Cloudflare',
      'GCP',
    ],
    links: [
      { type: 'case-study', href: 'https://github.com/alihamzahq/enterprise-multitenant-saas-platform' },
      { type: 'product', href: 'https://www.ipublisher.app' },
    ],
    problem:
      'Serves 100+ clients on a single multi-tenant platform with tenant-aware data access, real-time sports data, and automated domain onboarding.',
    role: 'Full Stack Developer | Team Lead',
    team: '8 engineers',
    duration: 'April 2023 – Present',
    highlights: [
      'Stayed hands-on with architecture, development, code reviews, and mentoring while leading the team',
      'Designed and improved the multi-tenant request lifecycle: tenant resolution by domain or request, tenant-aware queries, and centralized authentication with tenant context',
      'Automated tenant onboarding, including Cloudflare DNS, SSL certificate management, and Nginx configuration for custom tenant domains',
      'Delivered real-time sports data to 100+ tenant sites using Socket.io and Redis Pub/Sub',
      'Designed a multi-queue architecture with Laravel Horizon, Redis-backed job prioritization, retry strategies, and real-time monitoring to eliminate recurring queue failures',
      'Designed disposable automated-testing environments spanning 13 databases (one central, one tenant, and eleven sports databases) that isolate test runs and are torn down afterward',
      'Optimized API response times and server cost with MySQL query optimization, indexing, and Redis caching, using New Relic APM to investigate bottlenecks',
      'Reduced OpenAI API usage cost through token optimization, cost-aware model selection, and prompt refinements',
    ],
    architecture: [
      'Row-level tenant scoping: tenant-scoped records carry a tenant identifier and are filtered automatically through model scopes',
      'Tenant resolution runs as middleware ahead of authentication, so every request carries tenant context',
      'Separate central (administration) and tenant contexts, each with its own API and React/Inertia.js panel',
      'Repository and service layers keep business logic out of controllers, and model observers handle cache invalidation',
      'Redis backs caching, sessions, and queues, with Laravel Horizon supervising background workers',
    ],
    challenges: [
      'Joining a system that was mid-development and stabilizing it while continuing to ship features',
      'Keeping tenant data access isolated while serving 100+ clients from one platform',
      'Automating DNS, SSL, and Nginx setup for custom tenant domains without manual steps',
      'Keeping queue-based background processing reliable as more tenants and real-time feeds were added',
      'Testing across a central database, a tenant database, and eleven sports databases without leaving state behind',
      'Coordinating backend and frontend work across an 8-member team',
    ],
    results: [
      'Led an 8-member engineering team delivering and maintaining a multi-tenant SaaS platform serving 100+ clients',
      'Reduced response times for key APIs by 60%, from approximately 500 ms to 200 ms, through MySQL optimization, indexing, and Redis caching',
      'Reduced server costs by approximately 40% through MySQL query optimization, indexing, and Redis and Cloudflare caching',
      'Reduced OpenAI API costs by approximately 70% through token optimization and model selection (a separate saving from the server-cost reduction)',
      'Implemented disposable automated testing environments spanning 13 databases',
    ],
    resultsNote:
      'These figures come from my work on the commercial product. The production code and monitoring data are private, so they cannot be verified from the public repository.',
  },
  {
    slug: 'laravel-multi-tenant-saas-starter',
    title: 'Laravel Multi-Tenant SaaS Starter',
    kind: 'personal',
    context:
      'Personal portfolio project, not a deployed commercial product. The source code is public.',
    summary:
      'Laravel and React SaaS starter featuring database-per-tenant isolation, centralized administration, tenant management, and REST APIs.',
    description:
      'A multi-tenant SaaS starter built with Laravel 12, React, and Inertia.js. Each tenant gets its own database through Stancl/Tenancy and its own subdomain, while a central admin panel handles tenant management and impersonation. It demonstrates tenant isolation and full-stack structure in a compact codebase and is not a production platform.',
    stack: ['Laravel 12', 'React 18', 'Inertia.js', 'Stancl/Tenancy', 'MySQL', 'Sanctum', 'Tailwind CSS'],
    languages: ['PHP', 'JavaScript'],
    links: [{ type: 'source', href: 'https://github.com/alihamzahq/laravel-multi-tenant-saas-starter' }],
    problem:
      'Demonstrates database-per-tenant isolation, subdomain routing, and central administration in a compact, readable codebase.',
    role: 'Sole developer (personal project)',
    coverImage: '/images/projects/multi-tenant-saas/00-hero-cropped.png',
    screenshots: [
      shot('multi-tenant-saas', '01-landing-hero.png', 'Landing page with features overview', 1836, 878),
      shot('multi-tenant-saas', '02-landing-credentials.png', 'Demo credentials and quick start', 1836, 490),
      shot('multi-tenant-saas', '03-admin-dashboard.png', 'Central admin dashboard with tenant stats', 1847, 923),
      shot('multi-tenant-saas', '04-admin-tenants-list.png', 'Tenant management list view', 1850, 922),
      shot('multi-tenant-saas', '05-admin-tenant-detail.png', 'Tenant detail and configuration', 1848, 924),
      shot('multi-tenant-saas', '06-admin-create-tenant.png', 'Create new tenant form', 1851, 922),
      shot('multi-tenant-saas', '07-tenant-dashboard.png', 'Tenant application dashboard', 1836, 924),
      shot('multi-tenant-saas', '08-tenant-projects.png', 'Tenant project management', 1835, 922),
      shot('multi-tenant-saas', '09-tenant-project-detail.png', 'Project detail with status workflow', 1838, 925),
      shot('multi-tenant-saas', '10-tenant-users.png', 'Tenant user management with roles', 1844, 923),
    ],
    highlights: [
      'Implemented database-per-tenant isolation with Stancl/Tenancy, including automatic tenant database provisioning on registration',
      'Built subdomain routing (for example acme.yourdomain.com) with tenant-aware caching, queues, and storage',
      'Created a central admin panel with tenant CRUD, activate/deactivate controls, and tenant impersonation through signed URLs',
      'Added role-based access (Admin and User roles), tenant user management, and a project module with a status workflow',
      'Designed REST APIs with Sanctum: a central API for tenant management and a tenant API for projects and users',
      'Structured business logic in service classes with resource transformers for consistent API responses',
    ],
    architecture: [
      'Database-per-tenant isolation: every tenant has its own database. This differs from the shared-database, row-level scoping used on the commercial iPublisher platform.',
      'The central admin runs on the main domain and each tenant application runs on its own subdomain.',
    ],
  },
  {
    slug: 'laravel-stripe-saas-billing',
    title: 'Laravel Stripe SaaS Billing',
    kind: 'personal',
    context:
      'Personal portfolio project built against Stripe test mode, not a deployed billing service. The source code is public.',
    summary:
      'Laravel and React SaaS billing implementation covering Stripe subscriptions, webhooks, payment methods, invoices, and administrative workflows.',
    description:
      'A subscription billing system built with Laravel 12, Stripe (through Laravel Cashier), React 18, and Inertia.js. It exposes a customer-facing REST API and an admin dashboard for plans, subscriptions, invoices, refunds, and payment activity.',
    stack: ['Laravel 12', 'Stripe Cashier', 'React 18', 'Inertia.js', 'MySQL', 'Sanctum', 'Tailwind CSS'],
    languages: ['PHP', 'JavaScript'],
    links: [{ type: 'source', href: 'https://github.com/alihamzahq/laravel-stripe-saas-billing' }],
    problem:
      'Shows a complete subscription lifecycle, from plan sync to webhooks, invoices, and refunds, behind both a customer API and an admin dashboard.',
    role: 'Sole developer (personal project)',
    coverImage: '/images/projects/stripe-saas/01-hero-section.png',
    screenshots: [
      shot('stripe-saas', '01-hero-section.png', 'Landing page with subscription plans', 1838, 484),
      shot('stripe-saas', '02-pricing-section.png', 'Pricing tiers and plan selection', 1848, 846),
      shot('stripe-saas', '03-admin-dashboard.png', 'Admin dashboard with revenue metrics', 1852, 924),
      shot('stripe-saas', '04-admin-plans.png', 'Plan management with Stripe sync', 1852, 924),
      shot('stripe-saas', '05-admin-users.png', 'User management and payment history', 1839, 922),
      shot('stripe-saas', '06-admin-user-detail.png', 'User detail with subscription info', 1851, 925),
      shot('stripe-saas', '07-admin-subscriptions.png', 'Subscription management overview', 1835, 923),
      shot('stripe-saas', '08-webhook-logs.png', 'Stripe webhook event logs', 1832, 924),
      shot('stripe-saas', '09-payment-logs.png', 'Payment transaction logs', 1838, 926),
      shot('stripe-saas', '10-subscription-details.png', 'Subscription detail view', 1841, 919),
      shot('stripe-saas', '11-admin-login.png', 'Admin login page', 1853, 709),
    ],
    highlights: [
      'Built the subscription lifecycle API: subscribe, cancel, resume, and change plans through RESTful endpoints',
      'Implemented Stripe webhook handling with signature verification, and logged webhook events and payment activity for the admin dashboard',
      'Created an admin dashboard with user and subscription counts, revenue metrics, and activity logs',
      'Synchronized plans with Stripe products and prices through Laravel Cashier',
      'Built payment-method management (add, remove, set default) and invoice access with PDF downloads',
      'Added admin cancel and refund actions for subscriptions',
      'Structured business logic in a service layer, with automated tests for authentication, plans, subscriptions, admin authorization, and webhook signatures',
      'Included a Postman collection with sample requests and an environment file',
    ],
  },
  {
    slug: 'sports-seat-swap-platform',
    title: 'Sports Seat Swapping Platform',
    kind: 'commercial',
    context:
      'Commercial project built at Sixlogics. The application source is private; the linked repository contains architecture documentation (diagrams and technical notes) only.',
    summary:
      'Laravel backend for a sports seat swapping marketplace: versioned REST APIs for mobile apps, Stripe subscriptions, Firebase-backed chat, and an admin CMS.',
    description:
      'The backend for a commercial sports seat swapping marketplace, built at Sixlogics. Fans list stadium seats, propose swaps, chat with each other, and subscribe to premium access through iOS and Android apps that talk to a versioned REST API, with an admin CMS for internal operations. I was the lead backend developer.',
    stack: [
      'Laravel 10',
      'PHP 8.2',
      'MySQL',
      'Redis',
      'Stripe',
      'Firebase Realtime Database',
      'Firebase Cloud Messaging',
      'Sanctum',
    ],
    links: [{ type: 'case-study', href: 'https://github.com/alihamzahq/sports-seat-swap-platform' }],
    problem:
      'Lets fans list, discover, and swap stadium seats with in-app chat, subscription access, and identity verification, delivered through APIs consumed by iOS and Android apps.',
    role: 'Lead Backend Developer',
    team: '4 engineers (2 backend, 2 mobile)',
    duration: '2023 – 2024',
    highlights: [
      'Designed the system architecture, API structure, and database schema',
      'Built a versioned REST API (80+ endpoints) consumed by iOS and Android apps, authenticated with Laravel Sanctum tokens',
      'Implemented the Stripe subscription lifecycle (subscribe, cancel, resume, upgrade) and webhook handling',
      'Built seat listing and swap-offer workflows with approval steps and admin-moderated identity verification',
      'Implemented offer-scoped chat on Firebase Realtime Database, with delivery and read receipts handled by the Laravel API, plus push notifications through Firebase Cloud Messaging',
      'Built the admin CMS with Blade templates, server-side DataTables, and Vite',
      'Built queue-based background jobs, scheduled tasks, and ingestion of multi-sport data from external APIs',
    ],
    architecture: [
      'Controllers delegate to a repository layer, and API responses share one envelope format. The admin panel is a separate route group with session authentication and role-based access control.',
      'Push notifications are dispatched asynchronously by queue jobs after the in-app notification is stored.',
    ],
    challenges: [
      'Designing a versioned API that serves iOS and Android clients at the same time',
      'Handling Stripe subscription events reliably through webhooks',
      'Keeping chat state in Firebase consistent with API-side rules such as delivery receipts and chat lifecycle',
      'Designing identity verification and moderation workflows that admins can operate',
    ],
  },
];

// Experience Data
export const experience = [
  {
    company: 'Sixlogics',
    role: 'Full Stack Developer | Team Lead',
    period: 'April 2023 – Present',
    location: 'Lahore, Pakistan',
    highlights: [
      'Led architecture and delivery of iPublisher, a multi-tenant SaaS platform serving 100+ clients, managing an 8-member cross-functional team and client communication across multiple countries',
      'Automated tenant domain provisioning using Cloudflare DNS, SSL certificate management, and Nginx configuration',
      'Reduced server costs by approximately 40% through MySQL query optimization, indexing, Redis caching, and Cloudflare caching',
      'Reduced response times for key APIs by 60% (500 ms to 200 ms) through MySQL query optimization, indexing, and Redis caching; used New Relic APM to investigate performance bottlenecks',
      'Reduced OpenAI API costs by approximately 70% through optimized token usage, cost-aware model selection, and prompt refinements',
      'Scaled real-time sports data delivery across 100+ tenant sites with sub-second latency using Socket.io and Redis Pub/Sub',
      'Eliminated recurring queue failures by designing a multi-queue architecture using Laravel Horizon with Redis-backed job prioritization, retry strategies, and real-time monitoring',
      'Designed and implemented disposable testing environments for 13 databases (one central, one tenant, and 11 sports databases), isolating test execution and tearing down environments afterward',
      'Deployed Laravel applications to GCP-hosted infrastructure through existing deployment workflows and supported production troubleshooting',
      'Built SwapSeat, a football ticket exchange platform with real-time sports data and live match updates, Stripe subscription billing (webhooks, invoicing, payment methods), Firebase Realtime Database chat, and Firebase Cloud Messaging push notifications',
    ],
  },
  {
    company: 'Friday Media Group',
    role: 'Full Stack Developer',
    period: 'June 2021 – April 2023',
    location: 'Lahore, Pakistan',
    highlights: [
      'HelloFriday (SaaS HR management platform): automated attendance tracking and performance workflows, cutting HR workload by 40%',
      'Boosted employee retention by 30% with React dashboards for KPI and leave analytics',
      'Cut HR processing time by 55% by migrating to a modular Laravel/Inertia.js architecture',
      'VExpo (virtual event platform): reduced API latency by 65% through Redis caching, MySQL optimization, and queue-based processing improvements',
      'Boosted exhibitor engagement by 45% with 3D virtual booths and live Q&A via WebSockets',
    ],
  },
  {
    company: 'Sentax Lab',
    role: 'Laravel Developer',
    period: 'November 2019 – April 2021',
    location: 'Gujranwala, Pakistan',
    highlights: [
      'Developed web applications across eCommerce, college management systems, and ERP solutions using Laravel and CodeIgniter',
      'Designed RESTful APIs, optimized MySQL queries, and implemented authentication and security features',
      'Collaborated with cross-functional teams to deliver scalable codebases across 10+ client projects',
    ],
  },
  {
    company: 'VNext Solution',
    role: 'PHP Developer',
    period: 'August 2019 – November 2019',
    location: 'Gujranwala, Pakistan',
    highlights: [
      'Started as a PHP intern and was promoted to full-time developer within 3 months based on performance',
      'Built foundational skills in PHP development, MySQL database management, and web application best practices',
    ],
  },
];

// Education Data
export const education = [
  {
    degree: 'Bachelor of Science in Computer Science (BSCS)',
    institution: 'Virtual University of Pakistan',
    period: '2024 – 2026',
    note: 'Credit transfer based on prior Associate Degree studies completed in 2019',
  },
  {
    degree: 'Associate Degree (ADP) in Web Design & Development',
    institution: 'Virtual University of Pakistan',
    period: '2017 – 2019',
  },
  {
    degree: 'Web Design & Development Certifications',
    institution: 'Aptech Computer Education, Gujranwala',
    period: '2016 – 2018',
  },
];

// About Section Content
export const aboutContent = {
  intro: [
    `I'm a Senior Full-Stack and Backend Engineer with 7+ years of experience building multi-tenant SaaS platforms, REST APIs, and scalable web applications using PHP, Laravel, React, and modern web technologies.`,
    `I currently lead an 8-member engineering team while remaining hands-on with architecture, development, code reviews, performance optimization, and delivery. My experience includes real-time integrations, subscription billing, background processing, automated testing, and cloud application deployments.`,
  ],

  highlights: [
    'Led an 8-member engineering team working on a multi-tenant SaaS platform serving 100+ clients',
    'Reduced server costs by approximately 40% through database and caching optimizations',
    'Reduced response times for key APIs by 60%, from 500 ms to 200 ms',
    'Reduced OpenAI API costs by approximately 70% through token and model optimization',
    'Implemented disposable automated testing environments spanning 13 databases',
  ],

  remote: `Based in Pakistan and open to full-time international remote engineering roles and long-term contracts.`,
};
