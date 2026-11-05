// Technical articles.
//
// To publish a new article, add one object to `articles` below. The /articles listing, the
// homepage preview, the sitemap, JSON-LD and /llms.txt all read from this list, so nothing
// else needs to change.
//
// Fields:
//   slug         URL segment: /articles/<slug>
//   title        full headline (the page H1 and the JSON-LD headline)
//   seoTitle     shorter <title> text; the site appends " | Ali Hamza" (keep it <= ~50 chars)
//   description  one or two sentences for the meta description and the cards (<= 160 chars)
//   category     short label shown on cards and in the article header
//   author       display name (the author in JSON-LD is the site's Person entity)
//   publishedAt  ISO date (YYYY-MM-DD) the article went live. Never a future date.
//   updatedAt    ISO date of the last real content change. Drives the sitemap lastmod and
//                JSON-LD dateModified, so bump it only when the article's content changes.
//   draft        optional. true hides the article everywhere (listing, sitemap, route).
//   related      optional { projects: [{ slug, note }] } shown at the end of the article
//   references   [{ label, href, note }] sources, rendered as a References section
//   content      ordered blocks:
//                { type: 'h2' | 'h3', text }       headings (the page H1 is the title)
//                { type: 'p', text }               paragraph
//                { type: 'list' | 'ol', items }    bullet or numbered list
//                { type: 'table', caption, columns, rows, compact? }
//                { type: 'code', language, label, code }
//                { type: 'callout', text }         highlighted key question or takeaway
//                { type: 'note', text }            small italic closing note
//                Text may use [label](https://…), [label](/internal-path), `code`,
//                **bold** and *italic*.
export const articlesIntro =
  'Practical notes on software architecture, backend engineering, system design, and the trade-offs behind building reliable applications.';

export const articles = [
  {
    slug: 'shared-vs-separate-database-multitenancy',
    title: 'Shared Database vs. Database per Tenant: What Actually Matters in SaaS Architecture',
    seoTitle: 'Shared vs Database per Tenant in SaaS',
    description:
      'How to choose shared database or database-per-tenant architecture for SaaS, with practical examples covering isolation, recovery, performance, and costs.',
    category: 'Software Architecture',
    author: 'Ali Hamza',
    publishedAt: '2026-11-06',
    updatedAt: '2026-11-06',
    related: {
      projects: [
        {
          slug: 'laravel-multi-tenant-saas-starter',
          note: 'a public Laravel and React starter that uses database-per-tenant isolation.',
        },
      ],
    },
    references: [
      {
        label: 'Multitenant SaaS patterns: Azure SQL Database',
        href: 'https://learn.microsoft.com/en-us/azure/azure-sql/database/saas-tenancy-app-design-patterns',
        note: 'Microsoft Learn. Compares standalone, database-per-tenant, shared, sharded, and hybrid tenancy models.',
      },
      {
        label: 'Multitenancy and Azure SQL Database',
        href: 'https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/service/sql-database',
        note: 'Azure Architecture Center. Tenancy models, the noisy neighbor problem, and automating schema deployments across many databases.',
      },
      {
        label: 'Implementing managed PostgreSQL for multi-tenant SaaS applications on AWS',
        href: 'https://docs.aws.amazon.com/prescriptive-guidance/latest/saas-multitenant-managed-postgresql/introduction.html',
        note: 'AWS Prescriptive Guidance. Compares the pool, bridge, and silo partitioning models for PostgreSQL.',
      },
      {
        label: 'PostgreSQL documentation: Row Security Policies',
        href: 'https://www.postgresql.org/docs/current/ddl-rowsecurity.html',
        note: 'How row-level security policies work, including which roles bypass them by default.',
      },
    ],
    content: [
      {
        type: 'p',
        text: 'Choosing a database architecture for a SaaS product sounds straightforward until you start asking about tenant isolation, backups, migrations, and what happens when one customer consumes most of your resources.',
      },
      {
        type: 'p',
        text: 'A shared database is easier to operate, but tenant isolation needs careful enforcement. Separate databases provide stronger logical separation, but now you have a growing collection of databases to provision, migrate, monitor, and recover.',
      },
      {
        type: 'p',
        text: 'Neither approach eliminates complexity. It changes where that complexity lives.',
      },
      {
        type: 'p',
        text: 'Instead of starting with the question, "Which architecture scales better?", I would start with something more practical:',
      },
      {
        type: 'callout',
        text: 'What does this product need to guarantee to each customer, and what will it cost us to maintain those guarantees?',
      },
      { type: 'p', text: "Let's work through that decision." },

      { type: 'h2', text: 'First, what are we actually choosing?' },
      {
        type: 'p',
        text: 'Consider a SaaS project-management application used by three companies: Acme, Northstar, and Orbit.',
      },
      {
        type: 'p',
        text: "They use the same application, but each company has its own users, projects, and tasks. An employee at Acme must not be able to access Northstar's projects.",
      },
      { type: 'p', text: 'There are two common ways to organize the data.' },

      { type: 'h3', text: 'Option 1: Shared database' },
      { type: 'p', text: 'All three companies use the same database and tables.' },
      { type: 'p', text: 'A simplified `projects` table might look like this:' },
      {
        type: 'table',
        compact: true,
        caption: 'A simplified projects table in a shared database',
        columns: ['id', 'tenant_id', 'name'],
        rows: [
          ['101', 'acme', 'Website Redesign'],
          ['102', 'northstar', 'Mobile App'],
          ['103', 'orbit', 'CRM Migration'],
        ],
      },
      {
        type: 'p',
        text: 'When Acme requests its projects, the application queries only rows belonging to Acme.',
      },
      {
        type: 'code',
        language: 'sql',
        label: 'Tenant-scoped query',
        code: 'SELECT id, name\nFROM projects\nWHERE tenant_id = :current_tenant_id;',
      },
      {
        type: 'p',
        text: 'This is straightforward, but the `tenant_id` condition is important.',
      },
      {
        type: 'p',
        text: 'Imagine an API endpoint that retrieves a project using only its ID:',
      },
      {
        type: 'code',
        language: 'sql',
        label: 'Query with no tenant condition',
        code: 'SELECT *\nFROM projects\nWHERE id = :project_id;',
      },
      {
        type: 'p',
        text: "If authorization and tenant scoping aren't enforced elsewhere, a user could potentially access another company's project by requesting its ID.",
      },
      {
        type: 'p',
        text: 'This is one of the fundamental risks of a shared-database architecture.',
      },
      {
        type: 'p',
        text: "In practice, tenant isolation shouldn't depend on developers remembering to add a `WHERE` condition everywhere. Tenant context should be established from trusted authentication information, enforced consistently, and tested across reads and writes.",
      },
      {
        type: 'p',
        text: 'For PostgreSQL, [row-level security (RLS)](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) can provide an additional database-enforced boundary. But it still needs correct policies, privileges, and connection-context handling.',
      },
      {
        type: 'p',
        text: 'A few additional database design decisions matter here:',
      },
      {
        type: 'list',
        items: [
          'Indexes should account for tenant-scoped access patterns, such as `(tenant_id, status)` when queries justify it.',
          'Uniqueness requirements should be considered per tenant. For example, two companies might legitimately use the same internal project reference.',
          'Relationships and authorization checks must prevent records from being linked across tenant boundaries.',
        ],
      },
      {
        type: 'p',
        text: 'The benefit is operational simplicity: one database, one shared schema, and generally lower infrastructure overhead per customer.',
      },
      {
        type: 'p',
        text: 'The cost is that tenant isolation becomes a concern throughout the application.',
      },

      { type: 'h3', text: 'Option 2: Database per tenant' },
      {
        type: 'p',
        text: 'Now imagine the same application, but Acme, Northstar, and Orbit each have their own database.',
      },
      {
        type: 'p',
        text: 'The application receives a request, determines which tenant it belongs to, and establishes a connection to the corresponding database.',
      },
      {
        type: 'p',
        text: "The application code can remain shared. We aren't necessarily deploying three copies of the application.",
      },
      { type: 'p', text: "We also aren't necessarily running three database servers." },
      {
        type: 'p',
        text: 'Several separate tenant databases might be hosted on the same database instance or managed resource pool.',
      },
      { type: 'p', text: 'The main advantage is stronger logical data separation.' },
      {
        type: 'p',
        text: "Acme's project records aren't mixed with Northstar's records inside the same database.",
      },
      {
        type: 'p',
        text: 'However, the application must still select the correct database. A mistake in tenant resolution or connection management can create an isolation problem even with separate databases.',
      },
      {
        type: 'p',
        text: 'And a new operational responsibility appears: every tenant database needs to be provisioned, maintained, migrated, backed up, and monitored.',
      },
      {
        type: 'p',
        text: 'Database-per-tenant moves some complexity away from query-level isolation and into infrastructure and database lifecycle management.',
      },

      { type: 'h2', text: 'The question I would ask first: Can we restore one customer?' },
      {
        type: 'p',
        text: 'Imagine Northstar accidentally deletes a large collection of project records.',
      },
      { type: 'p', text: 'Their administrator contacts support and asks:' },
      {
        type: 'p',
        text: '"Can you restore our data to how it looked yesterday without affecting anyone else?"',
      },
      {
        type: 'p',
        text: "This is where the database architecture starts to influence the support experience.",
      },
      {
        type: 'p',
        text: "**With a shared database**, restoring the entire database would also affect Acme and Orbit. That's usually unacceptable.",
      },
      { type: 'p', text: 'A possible recovery process would be:' },
      {
        type: 'ol',
        items: [
          'Restore a backup to a separate temporary environment.',
          "Identify Northstar's records and their relationships.",
          'Recover the affected data without overwriting newer, valid changes.',
          "Check referential integrity and ensure no other tenant's data is affected.",
        ],
      },
      {
        type: 'p',
        text: 'The difficulty depends on the data model and recovery requirements.',
      },
      {
        type: 'p',
        text: "**With database-per-tenant**, the recovery boundary is more convenient because Northstar's data is stored separately.",
      },
      { type: 'p', text: 'You may be able to restore that database independently.' },
      {
        type: 'p',
        text: "That doesn't mean recovery is automatic. You still need a valid backup, an appropriate restore procedure, and a way to handle application writes while recovery takes place.",
      },
      {
        type: 'p',
        text: 'But the scope of the operation is usually easier to manage.',
      },
      {
        type: 'p',
        text: 'If individual tenant recovery is a contractual requirement, this can be a meaningful reason to prefer separate databases.',
      },
      {
        type: 'p',
        text: 'If the product primarily serves many small customers with simple recovery expectations, it may not justify the extra operational overhead.',
      },

      { type: 'h2', text: 'What happens when one tenant becomes much larger?' },
      {
        type: 'p',
        text: 'Suppose our SaaS application starts with 40 small companies.',
      },
      {
        type: 'p',
        text: 'Most have a few thousand tasks and relatively light usage.',
      },
      {
        type: 'p',
        text: 'Then one customer imports several million historical records and starts running expensive reports throughout the day.',
      },
      {
        type: 'p',
        text: "Now we're dealing with the *noisy neighbor* problem: one tenant's workload can affect other tenants sharing the same resources.",
      },
      {
        type: 'p',
        text: 'In a shared database, that workload might increase CPU usage, disk I/O, or database contention, affecting queries belonging to other customers.',
      },
      { type: 'p', text: 'Would separate databases solve this?' },
      { type: 'p', text: '**Not necessarily.**' },
      {
        type: 'p',
        text: 'If those databases run on the same server or share a resource pool, their workloads can still compete for compute and I/O.',
      },
      {
        type: 'p',
        text: 'Separate databases make it easier to manage individual workloads and, depending on the platform, move demanding tenants onto dedicated resources.',
      },
      {
        type: 'p',
        text: 'But performance isolation depends on the hosting architecture, not simply the number of databases.',
      },
      {
        type: 'p',
        text: "Before changing the tenancy model, it's worth investigating the actual bottleneck.",
      },
      {
        type: 'p',
        text: 'Perhaps an expensive query needs better indexing. Perhaps reporting should use a separate analytical workload. Perhaps a specific tenant needs resource limits or a different service tier.',
      },
      {
        type: 'p',
        text: 'Changing the entire database architecture is an expensive response to a problem that might have a smaller solution.',
      },

      { type: 'h2', text: 'The operational cost becomes clearer as the product grows' },
      {
        type: 'p',
        text: "Creating a separate database for ten tenants isn't especially intimidating.",
      },
      {
        type: 'p',
        text: 'Creating, migrating, monitoring, and recovering hundreds or thousands of databases is a different problem.',
      },
      {
        type: 'p',
        text: 'Consider a simple application update that adds a column to the `projects` table.',
      },
      {
        type: 'p',
        text: 'With one shared database, the migration normally runs against one schema.',
      },
      {
        type: 'p',
        text: 'With database-per-tenant, you need a reliable process to apply the migration across the tenant database fleet.',
      },
      {
        type: 'p',
        text: 'What happens if database 47 fails while the first 46 have succeeded?',
      },
      {
        type: 'p',
        text: 'Can the application safely serve tenants whose databases are on different schema versions?',
      },
      { type: 'p', text: 'Can you retry only the failed migrations?' },
      {
        type: 'p',
        text: 'How do you know every tenant has received the update?',
      },
      {
        type: 'p',
        text: 'These questions matter more than the mechanics of running a migration command.',
      },
      {
        type: 'p',
        text: 'A database-per-tenant architecture benefits from automated provisioning, migration orchestration, schema-version tracking, monitoring, and recovery procedures.',
      },
      {
        type: 'p',
        text: 'For a small engineering team, that operational responsibility may outweigh the benefits of stronger data separation.',
      },
      {
        type: 'p',
        text: 'For a product with strict tenant-level requirements, it may be a worthwhile investment.',
      },

      { type: 'h2', text: 'Three SaaS products, three reasonable decisions' },
      { type: 'p', text: "Let's look at three hypothetical scenarios." },

      { type: 'h3', text: 'Scenario A: A project-management SaaS for small agencies' },
      { type: 'p', text: 'The product has 60 customers.' },
      {
        type: 'p',
        text: 'Most customers use the same features. Their workloads are relatively small, and there are no contractual requirements for dedicated databases.',
      },
      { type: 'p', text: 'The engineering team has three developers.' },
      {
        type: 'p',
        text: '**My starting choice would be a shared database**, provided the team can implement and test tenant isolation properly.',
      },
      { type: 'p', text: 'Why?' },
      {
        type: 'p',
        text: 'One schema simplifies ongoing development, new tenants are relatively inexpensive to onboard, and operational overhead stays manageable.',
      },
      {
        type: 'p',
        text: 'I would prioritize strict tenant-scoped access, database constraints, authorization tests, query performance, and a documented recovery process.',
      },
      {
        type: 'p',
        text: 'I would also avoid assuming that shared databases must remain the architecture forever.',
      },

      {
        type: 'h3',
        text: 'Scenario B: An enterprise application with individual recovery requirements',
      },
      {
        type: 'p',
        text: 'This product serves a smaller number of organizations.',
      },
      {
        type: 'p',
        text: 'Each customer requires independently managed data recovery, and some require data to remain in a specific geographic region.',
      },
      {
        type: 'p',
        text: '**Database-per-tenant becomes more attractive.**',
      },
      {
        type: 'p',
        text: 'Individual databases provide clearer recovery boundaries and can be placed in the required regions when the infrastructure supports that arrangement.',
      },
      {
        type: 'p',
        text: "However, a separate database doesn't automatically establish regulatory compliance or data residency. Backups, replicas, logs, and connected services also need to meet the requirements.",
      },
      {
        type: 'p',
        text: 'Here, the additional operational work may be justified by customer obligations.',
      },

      {
        type: 'h3',
        text: 'Scenario C: Hundreds of small customers and a few very large ones',
      },
      {
        type: 'p',
        text: 'Now consider a SaaS platform serving 800 customers.',
      },
      {
        type: 'p',
        text: 'Most are small, but five generate a substantial share of the database workload.',
      },
      {
        type: 'p',
        text: 'Should all 800 customers receive dedicated databases?',
      },
      {
        type: 'p',
        text: 'Should every customer continue sharing one database?',
      },
      { type: 'p', text: 'Neither extreme is necessarily ideal.' },
      {
        type: 'p',
        text: 'A **hybrid architecture** might place smaller customers in shared databases while allocating dedicated databases or resources to customers with unusual requirements.',
      },
      {
        type: 'p',
        text: 'This adds complexity: tenant routing, data migration, and different deployment configurations must all be managed.',
      },
      {
        type: 'p',
        text: 'But it can be a reasonable response to a customer base with significantly different workload and isolation needs.',
      },
      {
        type: 'p',
        text: "The important point is that a tenancy model doesn't need to be an all-or-nothing decision for the lifetime of the product.",
      },

      { type: 'h2', text: 'Five questions to answer before choosing' },
      {
        type: 'p',
        text: "Before committing to an architecture, I'd want clear answers to five questions.",
      },
      { type: 'h3', text: '1. What level of isolation do customers actually require?' },
      {
        type: 'p',
        text: 'Is well-enforced logical isolation sufficient, or do contracts and risk requirements demand separate data resources?',
      },
      { type: 'h3', text: '2. What are the backup and recovery expectations?' },
      {
        type: 'p',
        text: 'Can restoring a customer involve application-level data recovery, or must the database be recoverable independently?',
      },
      { type: 'h3', text: '3. How different are tenant workloads?' },
      {
        type: 'p',
        text: 'Are most customers similar, or will a few need substantially more compute, storage, or customization?',
      },
      { type: 'h3', text: '4. Can the team operate the architecture reliably?' },
      {
        type: 'p',
        text: "It's easy to underestimate the long-term cost of provisioning, migrations, monitoring, backups, and incident response.",
      },
      { type: 'h3', text: '5. What happens if we need to move a tenant later?' },
      {
        type: 'p',
        text: 'A useful design anticipates how tenants can be located, exported, migrated, and routed without making the application depend on a permanent physical database location.',
      },
      {
        type: 'p',
        text: 'These answers should drive the decision—not whichever architecture looks more sophisticated in a diagram.',
      },

      { type: 'h2', text: "A few things I'd design carefully either way" },
      {
        type: 'p',
        text: 'Regardless of the chosen model, some problems remain.',
      },
      {
        type: 'list',
        items: [
          "**Tenant identity:** Every request needs a trustworthy tenant context. Authentication and authorization alone don't automatically guarantee tenant isolation.",
          "**Background jobs:** Queue workers need the correct tenant context. The fact that a job runs outside the original HTTP request shouldn't change which customer's data it can access.",
          '**Caches and file storage:** Tenant separation doesn\'t end at the relational database. Cache keys, stored files, and other shared resources need appropriate isolation.',
          '**Observability:** When performance deteriorates, it should be possible to determine whether the issue is system-wide or associated with a particular tenant.',
          "**Recovery testing:** A backup is useful only if the team can restore the required data correctly. Recovery procedures should be tested, not assumed to work.",
        ],
      },
      {
        type: 'p',
        text: 'These concerns are easy to overlook when architecture discussions focus exclusively on database tables.',
      },

      { type: 'h2', text: 'My conclusion' },
      {
        type: 'p',
        text: 'For a new SaaS product with many similar, relatively small customers, I would seriously consider starting with a shared database.',
      },
      {
        type: 'p',
        text: 'It reduces operational overhead and can scale well when tenant isolation, queries, and infrastructure are designed properly.',
      },
      {
        type: 'p',
        text: 'I would lean toward database-per-tenant when stronger isolation boundaries, independent recovery, tenant-specific configuration, or customer obligations justify the cost.',
      },
      {
        type: 'p',
        text: "And where customer requirements differ significantly, I'd evaluate a hybrid approach rather than force everyone into the same model.",
      },
      {
        type: 'p',
        text: "The question isn't whether shared or separate databases are more advanced.",
      },
      {
        type: 'callout',
        text: "It's which complexity your product needs to accept—and whether your team can manage that complexity reliably.",
      },
      {
        type: 'p',
        text: 'For an implementation example using database-per-tenant isolation, see my [Laravel Multi-Tenant SaaS Starter](/projects/laravel-multi-tenant-saas-starter), a personal project with public source code.',
      },
      {
        type: 'note',
        text: 'The scenarios in this article are hypothetical. They illustrate architectural decisions and do not describe any commercial system or customer implementation.',
      },
    ],
  },
];

// Newest first. Drafts are excluded everywhere.
export function getPublishedArticles() {
  return articles
    .filter((article) => !article.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getArticle(slug) {
  return getPublishedArticles().find((article) => article.slug === slug);
}

// Newest `updatedAt` across published articles (used for the /articles sitemap entry).
export function getArticlesLastUpdated() {
  return getPublishedArticles()
    .map((article) => article.updatedAt)
    .sort()
    .pop();
}

// Dates are plain ISO strings; format in UTC so server and client never disagree.
export function formatArticleDate(isoDate) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

// Reading time from the article's own prose (code blocks excluded), at 200 words a minute.
export function getReadingTime(article) {
  const words = article.content
    .flatMap((block) => {
      if (block.type === 'list' || block.type === 'ol') return block.items;
      if (block.type === 'table') return [block.caption, ...block.rows.flat()];
      if (block.type === 'code') return [];
      return [block.text];
    })
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
