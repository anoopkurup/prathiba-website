# CLAUDE.md — Prathiba G. personal website

Static personal site for Prathiba G., Marketing & Business Growth Leader. Source of truth for scope and copy is `prathiba-website-brief.md`. Read it before changing copy, structure or design.

## Stack
- Astro (static output), TypeScript strict, custom CSS only. No Tailwind, no React, no CMS.
- Integrations: `@astrojs/sitemap` only.
- Content collections: `src/content/work/` (case studies) and `src/content/insights/` (articles), schemas in `src/content/config.ts`.
- Fonts self-hosted in `public/fonts/`: Source Serif 4 (h1/h2), DM Sans (everything else). No other families.

## Commands
- `npm run dev` — dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — serve `dist/`

## Rules
- All personal details live in `src/data/site.ts` only. Never hard-code name, email, LinkedIn or domain elsewhere.
- Never invent client names, metrics, dates, employers or results. Use `TODO` placeholders and list them in README.
- Copy in brief section 6 is verbatim. Don't rewrite it.
- `published: false` content must never appear in production output (listing, homepage, sitemap). `import.meta.env.PROD` gates it; drafts show in dev only.
- No secrets in repo. Form endpoint comes from `PUBLIC_FORM_ENDPOINT` env var. `.env` is gitignored, `.env.example` is shipped.
- Client JS only for mobile nav toggle and contact form fetch submit. Form must work without JS.
- Colour tokens: `--navy #172B4D`, `--ivory #F7F5F0`, `--stone #E8E4DA`, `--gold #B49A76`. Gold is accent only, never body text.
- Accessibility: semantic landmarks, skip link, visible focus, `aria-current` on active nav, AA contrast, `prefers-reduced-motion` respected.
- Trailing slashes always (`trailingSlash: 'always'`). Internal links end with `/`.

## Layout
- `src/layouts/BaseLayout.astro` — head/meta/OG/canonical, fonts, header, footer, skip link, commented analytics slot.
- `src/components/` — Header, Footer, Hero, Section, Button, Card, CaseStudyCard, ArticleCard, MetricTile, ContactForm.
- `src/pages/` — index, about, expertise, work/, insights/, contact.

## Notes
- Node 22.22+ required (Astro 7). `.nvmrc` pins 22; run `nvm use` first. The machine default is 22.18 which fails.
- Content config lives at `src/content.config.ts` (Astro 5+ glob loader), not `src/content/config.ts` as the brief says. Entry `id` = filename without extension = URL slug.
- Shared draft/publish filtering: `src/data/content.ts` (`getWork`, `getInsights`).
- Visual checks go in `.playwright-mcp/` (gitignored).
