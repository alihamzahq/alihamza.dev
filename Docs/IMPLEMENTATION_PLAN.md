# Portfolio Website Implementation Plan

## Project Overview

**Goal**: Build a professional portfolio website for Ali Hamza to attract remote software engineering opportunities.

**Tech Stack**:
- Next.js 16 (App Router)
- JavaScript (no TypeScript)
- Tailwind CSS
- System-based dark/light mode with manual toggle

**Target Audience**: Recruiters, hiring managers, CTOs

---

## Project Structure

```
/var/www/portfolio/
├── app/
│   ├── layout.js              # Root layout, metadata, fonts, theme script
│   ├── page.js                # Single-page portfolio (imports all sections)
│   ├── globals.css            # Tailwind imports + custom CSS
│   ├── robots.js              # SEO robots.txt
│   └── sitemap.js             # SEO sitemap
│
├── components/
│   ├── layout/
│   │   ├── Header.jsx         # Sticky nav + theme toggle + mobile menu
│   │   └── Footer.jsx         # Copyright + social links
│   │
│   ├── sections/
│   │   ├── Hero.jsx           # Name, title, tagline, CTAs
│   │   ├── About.jsx          # Professional bio
│   │   ├── Skills.jsx         # Categorized tech stack
│   │   ├── Projects.jsx       # Featured projects showcase
│   │   ├── Experience.jsx     # Work history timeline
│   │   └── Contact.jsx        # Email, LinkedIn, GitHub links
│   │
│   └── ui/
│       ├── Button.jsx         # Reusable button (primary/secondary)
│       ├── Card.jsx           # Project/experience cards
│       ├── SectionWrapper.jsx # Consistent section container
│       ├── SkillBadge.jsx     # Skill tag component
│       └── ThemeToggle.jsx    # Light/dark/system toggle
│
├── hooks/
│   └── useTheme.js            # Theme state management
│
├── lib/
│   ├── data.js                # All portfolio content (projects, experience, skills)
│   └── constants.js           # Social links, metadata constants
│
├── public/
│   ├── images/
│   │   └── og-image.jpg       # Open Graph image (1200x630)
│   └── favicon.ico
│
├── tailwind.config.js         # Dark mode, colors, spacing, typography
├── postcss.config.js
├── jsconfig.json              # Path aliases (@/components, @/lib, etc.)
├── next.config.js
└── package.json
```

---

## Implementation Phases

### Phase 1: Project Setup & Foundation

1. Initialize Next.js 16 project with Tailwind CSS
   ```bash
   npx create-next-app@16 . --js --tailwind --eslint --app --src-dir=false --import-alias "@/*"
   ```

2. Configure `tailwind.config.js`:
   - Enable `darkMode: 'class'`
   - Define color palette (neutral + blue accent)
   - Set up consistent spacing scale (8px base)

3. Set up `jsconfig.json` with path aliases

4. Create `globals.css` with:
   - Tailwind imports
   - `scroll-behavior: smooth`
   - `scroll-margin-top` for sections (header offset)
   - Custom CSS variables for theming

---

### Phase 2: Theme System & Layout

1. Create `hooks/useTheme.js`:
   - Three modes: light, dark, system
   - Persist to localStorage
   - Listen for system preference changes

2. Add inline theme script in `app/layout.js` (prevents FOUC):
   ```javascript
   const themeScript = `
     (function() {
       const theme = localStorage.getItem('theme');
       if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
         document.documentElement.classList.add('dark');
       }
     })();
   `;
   ```

3. Build `components/layout/Header.jsx`:
   - Sticky positioning
   - Navigation links with smooth scroll
   - ThemeToggle component
   - Mobile hamburger menu (responsive)

4. Build `components/layout/Footer.jsx`:
   - Social links (GitHub, LinkedIn, Email)
   - Copyright with dynamic year

5. Create `components/ui/ThemeToggle.jsx`:
   - Sun/Moon/System icons
   - Dropdown or toggle button

---

### Phase 3: UI Components

1. `components/ui/SectionWrapper.jsx`:
   - Consistent max-width container
   - Section padding (py-16 md:py-24)
   - Section ID for anchor links

2. `components/ui/Button.jsx`:
   - Primary variant (filled)
   - Secondary variant (outlined)
   - Hover/focus states

3. `components/ui/Card.jsx`:
   - Shadow, border-radius
   - Dark mode styles
   - Hover lift effect

4. `components/ui/SkillBadge.jsx`:
   - Pill-shaped badges
   - Subtle category colors

---

### Phase 4: Data & Content

Create `lib/data.js` with all portfolio content:

```javascript
export const personalInfo = {
  name: 'Ali Hamza',
  title: 'Full-Stack Developer',
  tagline: '6+ years building scalable SaaS platforms with Laravel, React & AI-augmented workflows',
  email: 'hello@alihamza.dev',
  linkedin: 'https://linkedin.com/in/alihamzadev',
  github: 'https://github.com/alihamzahq',
};

export const skills = {
  backend: ['PHP', 'Laravel', 'REST APIs'],
  frontend: ['JavaScript', 'React.js', 'Vue.js', 'Inertia.js', 'jQuery'],
  database: ['MySQL', 'Redis'],
  devops: ['Git', 'Docker', 'Linux', 'Nginx', 'Cloudflare', 'AWS', 'GCP'],
  ai: ['ChatGPT', 'Claude', 'Cursor AI'],
};

export const projects = [
  {
    title: 'Laravel Multi-Tenant SaaS Starter',
    description: 'Production-ready multi-tenant SaaS boilerplate with team management, billing, and tenant isolation.',
    stack: ['Laravel', 'MySQL', 'Redis', 'Inertia.js'],
    github: 'https://github.com/alihamzahq/laravel-multi-tenant-saas-starter',
    problem: 'Eliminates months of boilerplate setup for SaaS projects',
  },
  {
    title: 'Laravel Stripe SaaS Billing',
    description: 'Complete Stripe integration for SaaS billing with subscriptions, invoices, and payment management.',
    stack: ['Laravel', 'Stripe', 'MySQL'],
    github: 'https://github.com/alihamzahq/laravel-stripe-saas-billing',
    problem: 'Simplifies complex subscription billing implementation',
  },
];

export const experience = [
  {
    company: 'Sixlogics',
    role: 'Full Stack Developer | Team Lead',
    period: 'Apr 2023 - Present',
    location: 'Lahore, Pakistan',
    highlights: [
      'Led 8-member team to architect multi-tenant SaaS platform serving 100+ clients',
      'Reduced OpenAI API costs 70% through optimized token usage and prompt engineering',
      'Improved system performance 60% with MySQL tuning, Redis caching, and code refactoring',
      'Scaled real-time sports updates to 10K+ concurrent users using Socket.io + Redis',
    ],
  },
  {
    company: 'Friday Media Group',
    role: 'Full Stack Developer',
    period: 'Jun 2021 - Apr 2023',
    location: 'Lahore, Pakistan',
    highlights: [
      'Automated attendance tracking and performance workflows, cutting HR workload 40%',
      'Boosted retention 30% with React dashboards for KPI/leave analytics',
      'Reduced API latency 65% through Redis caching and MySQL optimizations',
      'Boosted exhibitor engagement 45% with 3D booths and live Q&A via WebSockets',
    ],
  },
  {
    company: 'Sentax Lab',
    role: 'Laravel Developer',
    period: 'Jul 2019 - Mar 2021',
    location: 'Gujranwala, Pakistan',
    highlights: [
      'Contributed to eCommerce, college management, and ERP projects',
      'Developed RESTful APIs and optimized MySQL queries',
      'Implemented authentication, security, and UI/UX improvements',
    ],
  },
  {
    company: 'VNext Solution',
    role: 'PHP Developer',
    period: 'Mar 2019 - Jun 2019',
    location: 'Gujranwala, Pakistan',
    highlights: [
      'Started as PHP intern, progressed to full-time Web Developer',
      'Gained foundational experience in web application development',
    ],
  },
];
```

---

### Phase 5: Section Components

Build each section in order:

1. **Hero.jsx**: Full viewport height, name, title, tagline, CTA buttons
2. **About.jsx**: Professional bio highlighting remote readiness and AI-augmented approach
3. **Skills.jsx**: Categorized skill badges (Backend, Frontend, Database, DevOps, AI Tools)
4. **Projects.jsx**: Project cards with description, stack, GitHub links, problem solved
5. **Experience.jsx**: Timeline layout with company, role, period, key achievements
6. **Contact.jsx**: Clear CTA with email, LinkedIn, GitHub links

---

### Phase 6: SEO & Metadata

1. Configure metadata in `app/layout.js`:
   - Title: "Ali Hamza | Full-Stack Developer | Laravel & React Expert"
   - Description with ATS-friendly keywords
   - Open Graph tags
   - Twitter cards

2. Add JSON-LD structured data (Person schema)

3. Create `app/robots.js` and `app/sitemap.js`

4. Embed ATS keywords naturally:
   - Full-Stack Developer
   - Laravel Developer
   - React Developer
   - Remote Developer
   - SaaS Development
   - Team Lead

---

### Phase 7: Responsive & Polish

1. Mobile-first responsive design:
   - Mobile: 320px-480px
   - Tablet: 481px-768px
   - Desktop: 769px+

2. Accessibility:
   - Semantic HTML (header, nav, main, section, footer)
   - Proper heading hierarchy
   - Focus indicators
   - ARIA labels for icon buttons
   - Color contrast 4.5:1 minimum

3. Performance:
   - Use next/font for optimized fonts
   - Lazy loading for below-fold content
   - Minimal CSS/JS bundle

4. Animations:
   - Subtle fade-in on scroll
   - Hover transitions (150-200ms)
   - No flashy effects

---

## Design System

### Colors

**Light Mode**:
- Background: `#ffffff`
- Surface: `#f9fafb` (gray-50)
- Text Primary: `#111827` (gray-900)
- Text Secondary: `#6b7280` (gray-500)
- Accent: `#2563eb` (blue-600)

**Dark Mode**:
- Background: `#0f172a` (slate-900)
- Surface: `#1e293b` (slate-800)
- Text Primary: `#f1f5f9` (slate-100)
- Text Secondary: `#94a3b8` (slate-400)
- Accent: `#3b82f6` (blue-500)

### Typography

- Hero heading: `text-5xl` / `text-6xl`
- Section headings: `text-3xl` / `text-4xl`
- Subheadings: `text-xl`
- Body: `text-base`
- Labels: `text-sm`

### Spacing

8px base grid:
- `space-2` = 8px
- `space-4` = 16px
- `space-8` = 32px
- `space-16` = 64px

---

## Critical Files (Priority Order)

1. `tailwind.config.js` - Design system foundation
2. `app/layout.js` - Root layout, metadata, theme script
3. `lib/data.js` - All content data
4. `hooks/useTheme.js` - Theme management
5. `components/layout/Header.jsx` - Navigation
6. Section components (Hero → About → Skills → Projects → Experience → Contact)
7. `components/layout/Footer.jsx`

---

## Deliverables Checklist

- [ ] Next.js project initialized with Tailwind
- [ ] Dark/light mode with system detection + manual toggle
- [ ] Responsive header with smooth scroll navigation
- [ ] Hero section with CTAs
- [ ] About section with professional bio
- [ ] Skills section (categorized)
- [ ] Projects section (2 GitHub projects)
- [ ] Experience timeline (4 roles)
- [ ] Contact section (email, LinkedIn, GitHub)
- [ ] Footer with social links
- [ ] SEO metadata + JSON-LD
- [ ] Mobile responsive (tested)
- [ ] Accessibility compliant
- [ ] Clean, professional code (portfolio-ready)
