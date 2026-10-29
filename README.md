# Ali Hamza - Portfolio

A modern, responsive portfolio website built with Next.js 16, presenting my work as a Senior Full-Stack and Backend Engineer with 7+ years of experience.

**Live site:** [alihamza.dev](https://alihamza.dev)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Language:** JavaScript
- **Deployment:** Vercel

## Features

- Responsive design optimized for all devices
- Dark/Light mode with system preference detection
- SEO optimized with JSON-LD structured data
- Accessibility-minded: semantic headings, skip link, keyboard-navigable menu with visible focus rings, reduced-motion support, and contrast-checked colors (not formally audited or certified)
- Performance optimized with static generation
- Smooth animations and micro-interactions

## Sections

- **Hero** - Introduction with gradient background and CTAs
- **About** - Background, highlights, and remote work availability
- **Skills** - Technical skills organized by category
- **Projects** - Featured work with descriptions and links, each labeled as commercial (private source) or personal (public source)
- **Experience** - Professional timeline
- **Contact** - Multiple contact methods and CTA

## Getting Started

```bash
# Clone the repository
git clone https://github.com/alihamzahq/alihamza.dev.git

# Navigate to project directory
cd alihamza.dev

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── app/
│   ├── layout.js          # Root layout with metadata
│   ├── page.js             # Home page
│   └── globals.css         # Global styles and CSS variables
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Page sections (Hero, About, etc.)
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── constants.js        # Site configuration
│   └── data.js             # Content data
└── public/                 # Static assets
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint (flat config, `eslint-config-next/core-web-vitals`) |

## Customization

1. Update personal information in `lib/constants.js` (including the resume path, `personalInfo.resume`)
2. Modify content data in `lib/data.js`
3. Adjust theme colors in `app/globals.css`

### Maintenance notes

- **Resume:** the downloadable PDF lives in `public/` and is referenced only through `personalInfo.resume`. The old filename (`/Ali_Hamza_Full_Stack_Developer.pdf`) redirects to it via `next.config.mjs`.
- **Sitemap dates:** bump `siteMetadata.contentUpdated` in `lib/constants.js` whenever content changes, so `lastModified` stays truthful.
- **Open Graph image:** `public/images/og-senior-engineer.jpg` (1200x630). If you replace it, use a new filename so social platforms don't serve a cached preview.
- **Projects:** each project has a `kind` (`commercial` or `personal`) and typed `links`. Use `case-study` for documentation-only repositories, never `source`.

## License

MIT License - feel free to use this as a template for your own portfolio.

## Contact

- **Email:** hello@alihamza.dev
- **LinkedIn:** [alihamzadev](https://linkedin.com/in/alihamzadev)
- **GitHub:** [alihamzahq](https://github.com/alihamzahq)
