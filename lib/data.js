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

// Source links in a project's guide are pinned to the repository commit that was reviewed
// (November 5, 2026), so line anchors and "not implemented" statements stay true if the
// repository's main branch moves on. Re-check them against the repository before changing a pin.
const repoLinks = (repo, commit) => ({
  file: (label, path) => `[${label}](https://github.com/alihamzahq/${repo}/blob/${commit}/${path})`,
  dir: (label, path) => `[${label}](https://github.com/alihamzahq/${repo}/tree/${commit}/${path})`,
});
const pulsepass = repoLinks('pulsepass-api', '73f9bad93fca266d1ac465f7a2955c12f4fbc07e');
const pulsepassFile = pulsepass.file;
const pulsepassDir = pulsepass.dir;
const billing = repoLinks('laravel-stripe-saas-billing', '02d7cd21f5bd804a373edd4d58d44e7bbf753145');

// Projects Data
//
// Fields:
//   kind     'commercial' (private source) | 'personal' (public source)
//   context  one sentence that states plainly what the public links contain
//   summary  short text for cards, meta descriptions, JSON-LD and llms.txt
//   links    [{ type: 'source' | 'docs' | 'case-study' | 'product', href }]
//            ('case-study' = documentation-only repository, never source code)
//   seoTitle / seoDescription  search-facing title and meta description (<= 160 chars)
//   updated  ISO date of the last real change to this page's visible content. The sitemap
//            and JSON-LD dateModified read it, so bump it only when the page's content changes.
//   related  [{ slug, note }] links to other project pages, shown on the detail page
//   guide    optional educational section on the detail page:
//            { title, intro, sections: [{ heading, blocks: [...] }] }, where a block is
//            { type: 'p', text } | { type: 'list', label?, items } |
//            { type: 'columns', lists: [{ label, items }] } |
//            { type: 'table', caption, columns, rows }. Keep it general and public-knowledge only.
//            Any guide text may use [label](https://…) for a link and `code` for an identifier.
export const projects = [
  {
    slug: 'pulsepass-api',
    seoTitle: 'Pulsepass API: Laravel Backend Architecture',
    seoDescription:
      'Laravel 12 REST API with domain-oriented design, a transactional offer state machine, Stripe webhook event tracking, and automated tests in CI. Public source.',
    updated: '2026-11-05',
    related: [
      {
        slug: 'laravel-stripe-saas-billing',
        note: 'a second public Stripe project, covering the subscription lifecycle, webhook logs, invoices, and refunds behind an admin dashboard.',
      },
      {
        slug: 'sports-seat-swap-platform',
        note: 'the commercial marketplace backend, with offer workflows, Stripe subscriptions, and chat. Its source is private.',
      },
    ],
    title: 'Pulsepass API',
    kind: 'personal',
    featured: true,
    context:
      'Personal portfolio project, not a deployed commercial product. The source code, tests, CI configuration, and API documentation are public.',
    summary:
      'Laravel backend demonstrating modular architecture, transactional offer workflows, Stripe subscriptions, automated testing, and documented REST APIs.',
    description:
      'A Laravel 12 backend for a ticket resale platform, built to show how I structure and test a non-trivial API. The interesting part is not the CRUD but what happens when a seller accepts an offer: the offer moves through a guarded state machine, the listing is marked sold, and every competing offer is rejected inside a single database transaction. Around that core sit a scheduled Ticketmaster sync, Stripe-gated listing quotas, and a Stripe webhook handler that skips events it has already recorded.',
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
      'Organized the code as a modular monolith: six folders under app/Domain (five business domains plus Auth), with thin HTTP controllers and form requests per domain',
      'Modeled offers as a state machine (Sent to Accepted, Rejected, Withdrawn, or Expired) with guarded transitions using spatie/laravel-model-states',
      'Implemented offer acceptance as one transaction: the offer transitions, the listing is marked sold, and all other pending offers on that listing are rejected',
      'Built a scheduled Ticketmaster sync that rate-limits requests and commits each event in its own transaction, so one bad event does not abort the batch',
      'Integrated Stripe subscriptions through Laravel Cashier and enforced per-tier listing quotas (Free: 1, Pro: 10, Festival: unlimited) at listing creation',
      'Tracked Stripe webhook event IDs, so a redelivered event that was already recorded is acknowledged without being processed again',
      'Authenticated the API with Laravel Sanctum personal access tokens and authorized actions with policies',
    ],
    architecture: [
      'Domain-oriented layout (Billing, Events, Listings, Offers, and Organizer, plus an Auth folder) keeps business rules free of HTTP concerns, with controllers acting as thin adapters',
      'A state-machine library replaces a status enum, so illegal transitions are rejected in one place (ADR 0002)',
      'Per-event transactions in the sync trade all-or-nothing atomicity for partial-success resilience (ADR 0003)',
      'Sanctum personal access tokens were chosen over JWT (ADR 0004), and plain Action classes over an action package (ADR 0005)',
    ],
    challenges: [
      'Keeping offer acceptance atomic: transitioning one offer, closing the listing, and rejecting sibling offers without leaving a partial state if any step fails',
      'Handling Stripe webhook retries: recording event IDs to detect redeliveries, and understanding where that stops short of full idempotency under concurrent deliveries',
      'Syncing third-party event data in batches without letting a single malformed record block the rest',
    ],
    evidenceNote:
      'Counts below were checked against the public repository (commit 73f9bad) on November 5, 2026 and may change as it evolves.',
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
    guide: {
      title: 'Backend Architecture & Reliability Decisions',
      intro:
        'Pulsepass is a portfolio project, not a deployed product, so these notes explain the reasoning and stay explicit about limits, with no claims about production behavior. Source links point to commit 73f9bad of the public repository, which I reviewed on November 5, 2026.',
      sections: [
        {
          heading: 'Why a modular monolith?',
          blocks: [
            {
              type: 'p',
              text: `A modular monolith is one deployable application divided into modules by business capability. Pulsepass keeps its core logic in ${pulsepassDir('app/Domain', 'app/Domain')}: five business domains (Billing, Events, Listings, Offers, Organizer) plus an Auth folder that ${pulsepassFile('ADR 0001', 'docs/adr/0001-modular-monolith-via-domain-folders.md')} treats as scaffolding. Controllers only translate HTTP into calls to single-purpose action classes, so a rule such as accepting an offer can run from a controller, a scheduled command, or a test.`,
            },
            {
              type: 'p',
              text: 'Microservices are not automatically better. They add network boundaries and distributed transactions, and ADR 0001 notes that rejecting sibling offers on accept is simple in one database and painful across services.',
            },
            {
              type: 'columns',
              lists: [
                {
                  label: 'What the structure gives',
                  items: [
                    'Changes to one capability stay in one folder',
                    'Business rules do not depend on HTTP',
                    'Multi-step changes can share one transaction',
                  ],
                },
                {
                  label: 'Trade-offs and limits',
                  items: [
                    'One deployable unit: no independent deployment or fault isolation between modules',
                    "Boundaries are convention only: nothing enforces the ADR's rule that cross-domain calls use public APIs, and Offers code uses the Listings model directly",
                  ],
                },
              ],
            },
          ],
        },
        {
          heading: 'Transactions and state machines: accepting an offer',
          blocks: [
            {
              type: 'p',
              text: "Suppose Ana and Ben both have offers on one listing and the seller accepts Ana's. Three writes must go together: Ana's offer becomes Accepted, the listing becomes Sold, and Ben's offer becomes Rejected. Anything less leaves contradictory data.",
            },
            {
              type: 'p',
              text: `${pulsepassFile('AcceptOffer', 'app/Domain/Offers/Actions/AcceptOffer.php#L18-L33')} runs those writes in one \`DB::transaction\`, so a database error partway through rolls them all back. A state machine adds a second guard: ${pulsepassFile('OfferState', 'app/Domain/Offers/States/OfferState.php')} lets an offer leave Sent only for Accepted, Rejected, Withdrawn, or Expired; any other move throws \`TransitionNotFound\`.`,
            },
            {
              type: 'columns',
              lists: [
                {
                  label: 'Implemented and tested',
                  items: [
                    `Cascade: listing sold, other Sent offers rejected, withdrawn offers untouched (${pulsepassFile('AcceptOfferCascadeTest', 'tests/Feature/Offers/AcceptOfferCascadeTest.php')})`,
                    `Four legal and four blocked transitions (${pulsepassFile('OfferStateMachineTest', 'tests/Feature/Offers/OfferStateMachineTest.php')})`,
                    `Only the listing's organizer can accept a Sent offer (${pulsepassFile('OfferPolicy', 'app/Policies/OfferPolicy.php')})`,
                  ],
                },
                {
                  label: 'Not implemented or not tested',
                  items: [
                    'Rollback after a mid-transaction failure is untested',
                    'No row locks; offer state is not re-read inside the transaction',
                    'No test sends overlapping requests',
                  ],
                },
              ],
            },
            {
              type: 'p',
              text: "Atomicity is not concurrency safety. A transaction makes one request's writes all-or-nothing; it does not stop overlapping requests from acting on stale state. The policy checks Sent before the transaction opens, so two near-simultaneous accepts on different offers for one listing could both pass, and the outcome would depend on timing. The current code does not prevent this.",
            },
            {
              type: 'list',
              label: 'Safeguards I would add (not implemented)',
              items: [
                'Lock the listing row at the start of the transaction, then re-check listing and offer state',
                "Make the update conditional (`UPDATE … WHERE status = 'sent'`) and treat zero affected rows as a conflict, returning 409",
                'Add a test that runs two accepts against one listing',
              ],
            },
          ],
        },
        {
          heading: 'Reliable webhook processing',
          blocks: [
            {
              type: 'p',
              text: 'Payment providers retry webhook deliveries because networks fail: a timeout or error makes the sender resend, and a delivery that succeeded can still look failed. A handler must expect the same event more than once, because repeating a side effect such as granting access can corrupt state.',
            },
            {
              type: 'p',
              text: `${pulsepassFile('WebhookController', 'app/Http/Controllers/Billing/WebhookController.php#L21-L44')} returns 200 if the Stripe event ID is already in the \`webhook_events\` table (unique index), otherwise runs Cashier's handler and then records the ID. If the handler throws, nothing is recorded, so Stripe's retry runs it again. ${pulsepassFile('StripeWebhookTest', 'tests/Feature/Billing/StripeWebhookTest.php')} checks that a second delivery returns 200 and leaves one row.`,
            },
            {
              type: 'p',
              text: 'That is replay detection: it recognizes events already recorded. Stronger idempotency means an overlapping second attempt cannot repeat the effect. This code does not provide that, so it is not exactly-once processing.',
            },
            {
              type: 'columns',
              lists: [
                {
                  label: 'Where it falls short',
                  items: [
                    'Check, processing, and recording are separate steps, not one atomic unit',
                    'Two simultaneous deliveries can both pass the check and both run the handler; the unique index only fails the second insert afterwards',
                    'A crash between the handler and the insert causes reprocessing on retry',
                    'No test sends concurrent deliveries',
                  ],
                },
                {
                  label: 'Stronger designs (not implemented)',
                  items: [
                    "Claim the event ID first with a unique insert, in the same transaction as the handler's database changes",
                    'Make handlers idempotent by design, such as setting state from the event instead of incrementing',
                    'Store a processing status to detect interrupted attempts',
                  ],
                },
              ],
            },
          ],
        },
        {
          heading: 'Engineering quality and what it shows',
          blocks: [
            {
              type: 'table',
              caption: 'Practices in the Pulsepass repository, and what each does not show',
              columns: ['Practice', 'What the repository shows', 'What it does not show'],
              rows: [
                [
                  'Automated tests',
                  `${pulsepassDir('113 Pest tests', 'tests')} passed in CI at this commit (361 assertions) against MySQL 8.4`,
                  'Concurrency, rollback, or a coverage figure',
                ],
                [
                  'Static analysis and CI',
                  `${pulsepassFile('PHPStan level 8, Pint, and the test suite', '.github/workflows/ci.yml')} run as separate [GitHub Actions jobs](https://github.com/alihamzahq/pulsepass-api/actions/workflows/ci.yml) on every push to main and every pull request; the latest run passed`,
                  'Race conditions, or any deployment of the API',
                ],
                [
                  'API documentation',
                  '27 operations in an OpenAPI 3.1 spec generated with Scramble, published as [interactive docs](https://alihamzahq.github.io/pulsepass-api/)',
                  'The business rules behind the contract',
                ],
                [
                  'Decision records',
                  `Five ${pulsepassDir('ADRs', 'docs/adr')} and an ${pulsepassFile('architecture document', 'docs/architecture.md')} with three diagrams`,
                  'That the code follows them, as the boundary rule above shows',
                ],
                [
                  'Reproducible setup',
                  `${pulsepassFile('Docker Compose', 'docker-compose.yml')} stack, Makefile, committed \`composer.lock\`, and \`.env.example\``,
                  'The Docker setup is not exercised in CI',
                ],
              ],
            },
          ],
        },
      ],
    },
  },
  {
    slug: 'enterprise-multitenant-saas-platform',
    seoTitle: 'Enterprise Multi-Tenant SaaS Platform (iPublisher)',
    seoDescription:
      'Commercial multi-tenant SaaS serving 100+ clients: tenant isolation, system design, API performance and caching, and leading an 8-engineer team. Private source.',
    updated: '2026-11-05',
    related: [
      {
        slug: 'laravel-multi-tenant-saas-starter',
        note: 'a public project that uses database-per-tenant isolation instead of the row-level scoping used here.',
      },
      {
        slug: 'pulsepass-api',
        note: 'public source code that shows how I structure, document, and test a Laravel backend, since the iPublisher code is private.',
      },
    ],
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
    seoTitle: 'Laravel Multi-Tenant SaaS Starter: Database per Tenant',
    seoDescription:
      'Multi-tenant SaaS starter with Laravel 12, React, and Inertia.js: database-per-tenant isolation, subdomain routing, tenant management, and Sanctum REST APIs.',
    updated: '2026-11-05',
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
      'Database-per-tenant isolation: every tenant has its own database, which is created, migrated, and seeded automatically when the tenant is created. Tenant migrations are kept separate from the central ones.',
      'The central admin runs on the main domain and each tenant application runs on its own subdomain.',
    ],
    guide: {
      title: 'Choosing a Multi-Tenant Database Architecture',
      intro:
        'In a multi-tenant SaaS application, one deployment serves many customers, called tenants. Where tenant data lives is one of the earliest and hardest-to-reverse design decisions. These are the two common models, described in general terms.',
      sections: [
        {
          heading: 'Shared database',
          blocks: [
            {
              type: 'p',
              text: 'All tenants use the same database and tables. Each tenant-owned record carries a tenant ID, and every query and authorization check must filter by it.',
            },
            {
              type: 'columns',
              lists: [
                {
                  label: 'Typical benefits',
                  items: [
                    'Simplest to provision, with one schema to migrate',
                    'Low per-tenant overhead',
                    'Cross-tenant reporting is a direct query',
                  ],
                },
                {
                  label: 'Typical limitations',
                  items: [
                    'Isolation depends on application code, so a single missing filter can expose data belonging to another tenant',
                    'Needs consistent enforcement, such as global query scopes, and tests that deliberately cross tenant boundaries',
                    'Heavy tenants can affect others, and restoring the data of one tenant is harder',
                  ],
                },
              ],
            },
          ],
        },
        {
          heading: 'Database per tenant',
          blocks: [
            {
              type: 'p',
              text: 'Each tenant has a logically separate database. The application works out which tenant a request belongs to and connects to the matching database. Separate databases can still run on shared infrastructure.',
            },
            {
              type: 'columns',
              lists: [
                {
                  label: 'Typical benefits',
                  items: [
                    'Stronger logical separation between tenants',
                    'Backing up, restoring, or deleting a single tenant is simpler',
                    'Tenant data can be relocated without touching other tenants',
                  ],
                },
                {
                  label: 'Typical limitations',
                  items: [
                    'New databases must be provisioned, and every migration has to run against each one',
                    'Cross-tenant reporting needs aggregation across databases',
                    'Connection management needs care as the tenant count grows',
                    'Separate databases do not by themselves guarantee separate compute: databases on one server still share its resources',
                  ],
                },
              ],
            },
          ],
        },
        {
          heading: 'How the two models compare',
          blocks: [
            {
              type: 'table',
              caption: 'Shared database compared with database per tenant',
              columns: ['Concern', 'Shared database', 'Database per tenant'],
              rows: [
                [
                  'Data isolation',
                  'Enforced by tenant-aware queries and authorization in application code',
                  'Separated at the database level, though the application must still select the right tenant',
                ],
                [
                  'Infrastructure cost',
                  'Typically the lowest per tenant',
                  'Often higher per tenant, depending on how databases are hosted',
                ],
                [
                  'Operational complexity',
                  'One database to run and monitor',
                  'Many databases to provision, monitor, and manage',
                ],
                [
                  'Database migrations',
                  'Run once',
                  'Run once per tenant database, which needs orchestration and failure handling',
                ],
                [
                  'Tenant backup and recovery',
                  'Restoring one tenant means extracting its rows',
                  'The database of one tenant can often be backed up or restored on its own',
                ],
                [
                  'Performance',
                  'Tenants share tables and indexes, so heavy tenants can affect others',
                  'Smaller per-tenant datasets, but databases on the same server still share compute',
                ],
                [
                  'Cross-tenant reporting',
                  'Direct queries across tenants',
                  'Requires aggregation across databases or a separate reporting store',
                ],
                [
                  'Scalability',
                  'Scales with one database until it needs partitioning or sharding',
                  'Scales by spreading databases across servers, with more tenants to manage',
                ],
              ],
            },
          ],
        },
        {
          heading: 'How to choose',
          blocks: [
            {
              type: 'p',
              text: 'There is no universally correct answer. Shared databases tend to suit products with many small tenants, uniform requirements, and a small operations team. Database per tenant tends to suit customers who need stronger separation, per-tenant backup or deletion, or regional data requirements, and tenants whose sizes vary widely.',
            },
            {
              type: 'p',
              text: 'Hybrid approaches also exist, such as shared databases for small tenants and dedicated databases for those that need them. The right choice depends on business requirements, security expectations, operational capacity, and infrastructure.',
            },
          ],
        },
        {
          heading: 'Why this starter uses database per tenant',
          blocks: [
            {
              type: 'p',
              text: 'This starter is a personal portfolio project, not a deployed enterprise product. It uses database per tenant so that tenant isolation is easy to see and study in the code. The public repository demonstrates:',
            },
            {
              type: 'list',
              items: [
                'Tenant database provisioning: creating a tenant creates its database and runs the tenant migrations and seeders automatically',
                'Subdomain routing: each tenant has its own subdomain, tenant routes initialize the tenant from the request domain, and they are blocked on the central domain',
                'Tenant-aware behavior: cache, file storage, and queued jobs are scoped per tenant through Stancl/Tenancy bootstrappers',
                'Central administration: a separate admin panel manages tenants and can sign in as a tenant through signed URLs',
                'Separate schemas: tenant migrations live apart from the central migrations',
              ],
            },
            {
              type: 'p',
              text: 'It makes no claims about performance, security certification, or production scale.',
            },
          ],
        },
      ],
    },
  },
  {
    slug: 'laravel-stripe-saas-billing',
    seoTitle: 'Laravel Stripe SaaS Billing: Subscriptions & Webhooks',
    seoDescription:
      'Laravel and React subscription billing with Stripe Cashier: subscription lifecycle APIs, signature-verified webhooks, invoices, refunds, and automated tests.',
    updated: '2026-11-05',
    related: [
      {
        slug: 'pulsepass-api',
        note: 'Stripe subscriptions with listing quotas. It takes a different approach to duplicate webhook deliveries: it records Stripe event IDs and skips events it has already recorded.',
      },
    ],
    title: 'Laravel Stripe SaaS Billing',
    kind: 'personal',
    context:
      'Personal portfolio project built against Stripe test mode, not a deployed billing service. The source code is public.',
    summary:
      'Laravel and React SaaS billing implementation covering Stripe subscriptions, webhooks, payment methods, invoices, and administrative workflows.',
    description:
      'A subscription billing system built with Laravel 12, Stripe (through Laravel Cashier), React 18, and Inertia.js. It exposes a customer-facing REST API for subscriptions, payment methods, and invoices, and an admin dashboard for plans, subscriptions, refunds, and webhook and payment logs.',
    stack: ['Laravel 12', 'Stripe Cashier', 'React 18', 'Inertia.js', 'MySQL', 'Sanctum', 'Tailwind CSS'],
    languages: ['PHP', 'JavaScript'],
    links: [{ type: 'source', href: 'https://github.com/alihamzahq/laravel-stripe-saas-billing' }],
    problem:
      'Shows how I implement the subscription lifecycle, from plan sync to webhooks, invoices, and refunds, behind both a customer API and an admin dashboard.',
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
      'Synchronized plans with Stripe products and prices through the Stripe API client that Laravel Cashier provides',
      'Built payment-method management (add, remove, set default) and invoice access with PDF downloads',
      'Added admin cancel and refund actions for subscriptions',
      'Structured business logic in a service layer, with automated tests for authentication, plans, subscriptions, admin authorization, and webhook signatures',
      'Included a Postman collection with sample requests and an environment file',
    ],
    guide: {
      title: 'SaaS Subscription Billing: Architecture & Design Decisions',
      intro:
        'This is a personal project built against Stripe test mode, not a deployed billing service, so these notes cover design reasoning and state what the code does not do. Source links point to commit 02d7cd2 of the public repository, which I reviewed on November 5, 2026.',
      sections: [
        {
          heading: 'Subscription lifecycle: what Stripe owns and what the app owns',
          blocks: [
            {
              type: 'p',
              text: `In subscription billing, Stripe owns the billing state: prices, invoices, renewals, and proration. The application translates user intent into Stripe calls and keeps local state for its own screens. ${billing.file('SubscriptionService', 'app/Services/SubscriptionService.php')} delegates each operation to Laravel Cashier and records a local log entry.`,
            },
            {
              type: 'table',
              caption: 'Lifecycle operations and who handles what',
              columns: ['Operation', 'Application code', 'Left to Stripe and Cashier'],
              rows: [
                [
                  'Create',
                  'Picks the Stripe price for the plan and billing period, then stores the plan and payment type locally',
                  'Creates the subscription; a card is charged, while bank transfer sends an invoice due in 7 days',
                ],
                [
                  'Change plan',
                  'Looks up the new price, calls Cashier’s `swap`, then updates the local plan',
                  'Proration: the code sets no option, so Cashier’s default (`create_prorations`) applies',
                ],
                ['Cancel', 'Calls `cancel` and logs it', 'Cancels at period end, so access continues until then'],
                ['Resume', 'Allowed only during the grace period', 'Reactivates the subscription in Stripe'],
                [
                  'Payment failure',
                  'Logs the `invoice.payment_failed` event; local status follows `customer.subscription.updated`',
                  'Retry schedule and dunning are configured in Stripe, not in this code',
                ],
              ],
            },
            {
              type: 'p',
              text: 'The code defines no custom proration, retry policy, or dunning. Tests cover creating and cancelling a subscription, but not plan changes or a successful resume.',
            },
          ],
        },
        {
          heading: 'Keeping Stripe and the local database consistent',
          blocks: [
            {
              type: 'p',
              text: 'Many SaaS applications keep subscription data in two places. Stripe is the source of truth for money; local tables hold what the app needs to query and show, such as which plan a subscription belongs to. A Stripe API call and a database write cannot share one transaction, so a failure between them leaves the two out of step.',
            },
            {
              type: 'p',
              text: `${billing.file('PlanService::create', 'app/Services/PlanService.php#L21-L59')} makes three Stripe calls (a product and two prices) and then inserts the local plan, with no transaction or cleanup, so a failed insert would leave orphaned Stripe objects. ${billing.file('SubscriptionService::create', 'app/Services/SubscriptionService.php#L20-L58')} has the same order: Stripe subscription first, then the local plan reference. Because Stripe prices are immutable, a price edit creates a new price, archives the old one, and only then updates the local row. Calling Stripe first means a failure never leaves a local record pointing at nothing, but it does not close the gap in the other direction.`,
            },
            {
              type: 'list',
              label: 'Possible improvements (not implemented)',
              items: [
                'Idempotency keys on Stripe calls, so a retried request does not create duplicates',
                'A cleanup or retry job for half-completed operations',
                'A periodic reconciliation that compares local and Stripe state',
              ],
            },
          ],
        },
        {
          heading: 'Webhook processing and reliability',
          blocks: [
            {
              type: 'p',
              text: 'Providers send webhooks so an application learns about events it did not start, such as a failed renewal. Signatures must be verified so a forged request cannot change billing state. Deliveries can repeat or arrive late, so handlers must tolerate duplicates, and the HTTP status matters because it tells the provider whether to retry.',
            },
            {
              type: 'p',
              text: `${billing.file('WebhookController', 'app/Http/Controllers/Api/V1/WebhookController.php#L21-L49')} verifies the Stripe signature and returns 400 when it is invalid; ${billing.file('WebhookTest', 'tests/Feature/Api/WebhookTest.php')} covers that. It then stores the event in \`webhook_logs\`, whose \`stripe_event_id\` has a ${billing.file('unique index', 'database/migrations/2025_12_11_205956_create_webhook_logs_table.php#L17')}, and runs the handler. The log gives visibility, but a unique index is not idempotent handling.`,
            },
            {
              type: 'columns',
              lists: [
                {
                  label: 'What the code does not do (from reading it; no test covers these)',
                  items: [
                    'A repeated delivery has no explicit path: the second insert hits the unique index and raises an unhandled database error before any handler runs',
                    'If a handler fails after the log row is written, the row stays at received and Stripe’s retries hit the same constraint, so the handler does not run again',
                    'When the customer lookup fails, the log is marked failed but the endpoint still returns 200, so Stripe stops retrying',
                  ],
                },
                {
                  label: 'Potential improvements (not implemented)',
                  items: [
                    'Treat an already-logged event ID as received and return 200 without reprocessing',
                    'Log and handle the event in one transaction, so a failure rolls the log back and a retry can run',
                    'Return a non-2xx status for failures Stripe should retry, and keep a processing status for the rest',
                  ],
                },
              ],
            },
            {
              type: 'p',
              text: 'So this is event logging, not idempotent or exactly-once processing, and I would not call it production-hardened.',
            },
          ],
        },
        {
          heading: 'Billing operations and observability',
          blocks: [
            {
              type: 'p',
              text: `Billing problems are usually investigated after the fact, so records matter. The project keeps two local logs: \`webhook_logs\` (event type, payload, status, error message) and \`payment_logs\` (action, amount, status, Stripe payment intent). The admin dashboard filters both by status, type or action, and date through ${billing.file('LogController', 'app/Http/Controllers/Admin/LogController.php')}. Customers can list and download invoices through ${billing.file('InvoiceService', 'app/Services/InvoiceService.php')}, and admins can issue full or partial refunds from the subscription page.`,
            },
            {
              type: 'p',
              text: `These are application logs, not monitoring or a ledger: there is no alerting, no automated reconciliation against Stripe, and no audit-compliance claim. The dashboard's monthly revenue is a ${billing.file('sum of locally logged subscribe amounts', 'app/Http/Controllers/Admin/DashboardController.php#L25-L29')} that does not subtract refunds, so it is an overview, not a financial report.`,
            },
          ],
        },
        {
          heading: 'Engineering trade-offs',
          blocks: [
            {
              type: 'list',
              items: [
                'Laravel Cashier removes most subscription plumbing, at the cost of inheriting its model and defaults, such as proration',
                'Service classes keep Stripe calls out of controllers and make them easy to mock, as the unit tests do, but they are not transactional',
                'REST endpoints under `/api/v1` with Sanctum tokens suit any client; the API is described by a Postman collection, not an OpenAPI spec',
                'React with Inertia.js keeps the admin dashboard in the same Laravel app, with no separate admin API, but ties it to Laravel',
              ],
            },
          ],
        },
      ],
    },
  },
  {
    slug: 'sports-seat-swap-platform',
    seoTitle: 'Sports Seat Swapping Platform (SwapSeat) Backend',
    seoDescription:
      'Backend for SwapSeat, a sports seat swap marketplace: versioned REST APIs for mobile apps, Stripe subscriptions, Firebase chat, and admin CMS. Private source.',
    updated: '2026-11-05',
    related: [
      {
        slug: 'pulsepass-api',
        note: 'a public-source Laravel marketplace API with transactional offer workflows, a state machine, and automated tests.',
      },
      {
        slug: 'laravel-stripe-saas-billing',
        note: 'a public Stripe subscription implementation, with webhook logs and an admin dashboard.',
      },
    ],
    title: 'Sports Seat Swapping Platform (SwapSeat)',
    kind: 'commercial',
    context:
      'Commercial project built at Sixlogics. The application source is private; the linked repository contains architecture documentation (diagrams and technical notes) only.',
    summary:
      'Laravel backend for a sports seat swapping marketplace: versioned REST APIs for mobile apps, Stripe subscriptions, Firebase-backed chat, and an admin CMS.',
    description:
      'The backend for SwapSeat, a commercial sports seat swapping marketplace built at Sixlogics. Fans list stadium seats, propose swaps, chat with each other, and subscribe to premium access through iOS and Android apps that talk to a versioned REST API, with an admin CMS for internal operations. I was the lead backend developer.',
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
    `I'm a Senior Software Engineer specializing in full-stack and backend development, with 7+ years of experience building multi-tenant SaaS platforms, REST APIs, and scalable web applications using PHP, Laravel, React, and modern web technologies.`,
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
