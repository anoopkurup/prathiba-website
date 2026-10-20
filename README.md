# Prathiba G. — personal website

Static site built with [Astro](https://astro.build), custom CSS, no UI framework. Brief: `prathiba-website-brief.md`.

## Run

Requires Node 22.22+ (`.nvmrc` → `nvm use`).

```sh
npm install
npm run dev       # http://localhost:4321 — drafts (published: false) are visible here
npm run build     # production build → dist/ — drafts are excluded everywhere
npm run preview   # serve dist/
npx astro check   # TypeScript + template checks
```

## Add a case study

Create `src/content/work/<slug>.md`. The filename becomes the URL: `/work/<slug>/`.

```md
---
title: "Title"
industry: "Industry"
summary: "One paragraph: objective and result."
challenge: "Business context and the problem."
contribution: "Role, scope, decisions owned."
approach:
  - "Step one"
  - "Step two"
outcomes:
  - metric: "Metric name"
    value: "Value"
    period: "Optional period"
    evidence: "Optional source"
published: true
order: 1
---

Body = the "06 — Learning" section (Markdown).
```

Set `published: true` to show it on the homepage, `/work/` and in the sitemap. Lower `order` appears first.

## Add an article

Create `src/content/insights/<slug>.md` → `/insights/<slug>/`.

```md
---
title: "Title"
description: "One or two sentences (used for meta description and cards)."
pubDate: 2026-03-01
audience: "CEOs and marketing leaders"
published: true
---

Article body in Markdown.
```

Newest `pubDate` first. The homepage shows the latest three published articles.

## Contact form endpoint

The form posts to `PUBLIC_FORM_ENDPOINT`. Copy `.env.example` to `.env` and set it, or set it as a build-time environment variable on the host.

- Formspree: `https://formspree.io/f/<form-id>`
- Web3Forms: `https://api.web3forms.com/submit` (add a hidden `access_key` input in `ContactForm.astro`)
- Netlify Forms: set the endpoint to `/` and add `data-netlify="true"` to the `<form>`

The honeypot field is named `_gotcha` (Formspree convention). The form works without JavaScript (plain POST) and, with JavaScript, submits via `fetch` and shows success only when the provider returns 2xx.

## TODO before launch

| Item | Where |
|---|---|
| Domain | `astro.config.mjs` (`site`), `src/data/site.ts` (`domain`), `public/robots.txt` |
| Professional enquiry email | `src/data/site.ts` (`email`) — footer and contact links hide until set |
| Portrait | `public/images/portrait-placeholder.jpg` (640×800) |
| OG image | `public/images/og-image.png` (1200×630) |
| Career timeline, milestones, industries, geographies | `src/pages/about.astro` frontmatter |
| CV link | `src/pages/about.astro` (`cvUrl`) |
| Expertise pillar detail (problem / approach / workstreams / outcome) | `src/pages/expertise.astro` (`parts`) |
| Case studies | `src/content/work/` — two drafts with `published: false` |
| Articles | `src/content/insights/` — three drafts with `published: false` |
| Form endpoint | `PUBLIC_FORM_ENDPOINT` |
| Analytics (optional) | commented slot in `src/layouts/BaseLayout.astro` |

Grep for `TODO` to find every placeholder.

## Deploy

Build command `npm run build`, publish directory `dist/`, Node 22.22+.

### Cloudflare Pages

1. Push the repo to GitHub. Pages → Create project → connect the repo.
2. Framework preset: Astro. Build `npm run build`, output `dist`. Add env var `NODE_VERSION=22.23.3` and `PUBLIC_FORM_ENDPOINT`.
3. Custom domains: add `example.com` and `www.example.com`. Cloudflare provisions HTTPS automatically.
4. Redirect to one canonical host: Rules → Redirect Rules → `www.example.com/*` → `https://example.com/$1` (301), or the reverse. Match `site` in `astro.config.mjs`.

### Netlify

1. New site from Git. Build `npm run build`, publish `dist`. Env vars `NODE_VERSION=22.23.3` and `PUBLIC_FORM_ENDPOINT`.
2. Domain management → add custom domain → follow DNS instructions (Netlify DNS or external CNAME/ALIAS). HTTPS via Let's Encrypt is automatic.
3. Set the primary domain in Domain management; Netlify 301-redirects the other host to it.

Replace `YOUR-DOMAIN-HERE` in the three places listed above before the first production deploy, otherwise canonical URLs, the sitemap and JSON-LD point at the placeholder.
