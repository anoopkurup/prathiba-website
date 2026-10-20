# Build Brief: Prathiba G. Personal Website

Hand this file to Claude Code as the project brief. Build exactly what is specified here. Where an input is marked `TODO`, use a clearly labelled placeholder and list it in the README; do not invent the value.

---

## 1. Project summary

Build a custom-coded, static personal website for **Prathiba G.**, a Marketing & Business Growth Leader with 21+ years of experience.

The site serves two audiences through one personal brand:

1. **Leadership path**: CEOs, founders, recruiters and executive search consultants evaluating her for CMO, VP Marketing, Director of Growth or Chief Growth Officer roles.
2. **Consulting path**: Business owners and leadership teams seeking help with growth strategy, go-to-market execution, marketing effectiveness and marketing operations.

Primary objective: build credibility and generate relevant professional conversations. The homepage does most of the positioning work. Every page should make her value easy to understand, credible to evaluate and simple to act on.

Tone: premium editorial, understated, evidence-led, executive. Not an agency site, not a CV page, not a portfolio.

---

## 2. Tech stack (fixed)

| Layer | Choice |
|---|---|
| Framework | Astro (latest stable), `output: 'static'` |
| Language | TypeScript, strict mode |
| Styling | Custom CSS only. No Tailwind, no UI framework. |
| Content | Markdown/MDX via Astro content collections for `work` and `insights` |
| Integrations | `@astrojs/sitemap` only (plus Astro's built-in image optimisation) |
| Client JS | Minimal. Only for mobile nav toggle and contact form submission. No React. |
| Hosting target | Cloudflare Pages or Netlify (build command `npm run build`, publish dir `dist/`) |
| Version control | Git, GitHub repository |
| Fonts | Source Serif 4 (display headings), DM Sans (body, nav, UI). Self-host in `public/fonts/` with `font-display: swap` and a system fallback stack. |

`astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://YOUR-DOMAIN-HERE', // TODO: replace before deploy
  output: 'static',
  integrations: [sitemap()],
  trailingSlash: 'always',
});
```

---

## 3. Project structure

```
prathiba-personal-site/
├── public/
│   ├── images/            # portrait placeholder, og-image
│   ├── fonts/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── Section.astro
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── CaseStudyCard.astro
│   │   ├── ArticleCard.astro
│   │   ├── MetricTile.astro
│   │   └── ContactForm.astro
│   ├── layouts/
│   │   └── BaseLayout.astro   # head, meta, fonts, header, footer, skip link
│   ├── content/
│   │   ├── config.ts          # collection schemas
│   │   ├── work/              # case studies (.md)
│   │   └── insights/          # articles (.md)
│   ├── data/
│   │   └── site.ts            # single source of truth for personal details
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── expertise.astro
│   │   ├── work/index.astro
│   │   ├── work/[slug].astro
│   │   ├── insights/index.astro
│   │   ├── insights/[slug].astro
│   │   └── contact.astro
│   └── styles/
│       └── global.css         # tokens, reset, typography, utilities
├── astro.config.mjs
├── package.json
└── README.md
```

---

## 4. Central site configuration

`src/data/site.ts`. All personal details live here and nowhere else in the codebase.

```ts
export const site = {
  name: 'Prathiba G.',
  title: 'Marketing & Business Growth Leader',
  linkedin: 'https://www.linkedin.com/in/prathibaguru/',
  domain: 'https://YOUR-DOMAIN-HERE', // TODO
  email: '',                           // TODO: professional enquiry email
  experience: '21+ years',
  positioning:
    'Building resilient marketing engines that create clarity, ' +
    'strengthen execution, and drive sustainable business growth.',
};
```

No API keys, form-provider secrets or credentials in this file or anywhere in the repo.

---

## 5. Design system

### Colour tokens (CSS custom properties in `global.css`)

| Token | Hex | Use |
|---|---|---|
| `--navy` | `#172B4D` | Headings, nav, primary buttons, body text |
| `--ivory` | `#F7F5F0` | Primary page background |
| `--stone` | `#E8E4DA` | Cards, metric tiles, secondary surfaces |
| `--gold` | `#B49A76` | Eyebrow labels, small accents, dividers. Never for body text (contrast). |

Check every text/background pair for WCAG AA contrast. Gold on ivory is accent-only.

### Typography

| Element | Spec |
|---|---|
| Display headings (h1, h2) | Source Serif 4, weight 500–600 |
| Body, nav, buttons, h3+ | DM Sans |
| Body size | 16–18px desktop, line-height ~1.6 |
| Hero h1 | 52–68px desktop, fluid with `clamp()` |
| Max content width | 1120px |
| Section spacing | 80–112px desktop, reduced on mobile |
| Border radius | 6–12px on cards and controls |
| Eyebrow labels | DM Sans, uppercase, letter-spaced, gold |

Only these two families. Fonts must not block render.

### Layout and motion

- Generous whitespace, clear hierarchy.
- Subtle hover transitions only. Respect `prefers-reduced-motion`.
- Responsive: desktop (two-column where useful), tablet (compact nav), mobile (single column, large tap targets). No horizontal scroll, no text in images, no content hidden behind hover.
- One professional portrait placeholder (`public/images/portrait-placeholder.jpg`, marked TODO). No stock imagery.

### Header

- Left: wordmark `PRATHIBA G.`
- Centre/right nav: About · Expertise · Work · Insights
- Two CTAs: **Leadership opportunities** (→ `/contact/#leadership`) and **Consulting enquiries** (→ `/contact/#consulting`). Style the consulting CTA as primary (filled navy), leadership as secondary (outlined).
- Mobile: hamburger menu, keep one contact CTA visible.
- Active page is visually identified (`aria-current="page"`).

### Footer

Name, one-line positioning, nav links, LinkedIn link, email link, copyright year (computed at build).

---

## 6. Sitemap and page specs

| Route | Purpose | Primary action |
|---|---|---|
| `/` | Establish positioning, create interest | Choose a pathway |
| `/about/` | Credibility and leadership context | Review profile / LinkedIn |
| `/expertise/` | Capabilities and problems solved | Discuss a business challenge |
| `/work/` + `/work/[slug]/` | Evidence and approach | Explore a case study |
| `/insights/` + `/insights/[slug]/` | Thought leadership | Read an article |
| `/contact/` | Convert interest into a conversation | Email, LinkedIn, form |

### 6.1 Homepage (`/`) — use this copy verbatim

**01 / Hero**

- Eyebrow: `STRATEGY · GROWTH · TRANSFORMATION`
- H1: `Marketing & Business Growth Leader`
- Subhead: `Building resilient marketing engines that drive sustainable business growth.`
- Paragraph 1: `I help organizations create strategic clarity, improve marketing effectiveness, and connect business priorities with disciplined execution.`
- Paragraph 2: `With 21+ years of experience across marketing, business development, operations, partnerships, and digital ecosystems, I bring a practical, business-oriented approach to growth.`
- Buttons: `Explore my expertise ↗` (→ `/expertise/`) · `Let's connect` (→ `/contact/`)
- Portrait placeholder beside copy on desktop, above on mobile.

**02 / Value proposition**

- H2: `Growth requires more than marketing activity.`
- Intro: `Sustainable growth depends on aligning the right strategy with the right capabilities, operating systems, and execution priorities.`
- Lead-in: `I focus on helping organizations address four connected challenges:`
- Four cards:
  - **Strategic clarity**: Defining where to compete, how to position, and what to prioritize.
  - **Marketing effectiveness**: Aligning brand, communication, customer engagement, and demand generation with business goals.
  - **Execution discipline**: Improving processes, accountability, cross-functional coordination, and performance measurement.
  - **Technology-enabled operations**: Applying analytics, martech, and AI to improve how marketing and growth teams work.

**03 / Experience & impact**

- H2: `A business-oriented approach to marketing leadership.`
- Paragraph: `My experience spans established organizations and entrepreneurial ventures, combining operational discipline with marketing strategy, business development, and technology-led initiatives.`
- Metric tiles (stone background): `21+` / `Years of professional experience` · `40` / `Largest team size led`
- Do NOT add other metrics (25% visibility, 20% revenue, 15% efficiency were discussed but are unverified). Leave the tile grid easy to extend.

**04 / Expertise**

- H2: `Connecting strategy with execution.`
- Four numbered pillars (01–04):
  - **Growth Strategy & Go-to-Market**: Market positioning, business growth planning, go-to-market execution, and alignment between marketing priorities and commercial objectives.
  - **Marketing Strategy & Transformation**: Brand development, digital communication, marketing operations, customer engagement, and the adoption of tools that strengthen marketing effectiveness.
  - **Business Development & Partnerships**: Ecosystem development, stakeholder engagement, strategic alliances, and the identification of opportunities for market expansion.
  - **Operational Effectiveness & Leadership**: Team development, process optimization, cross-functional alignment, governance, and performance measurement.
- Link: `View full expertise ↗` → `/expertise/`

**05 / Selected work**

- H2: `Turning business challenges into structured action.`
- Paragraph: `My work brings together problem definition, strategic thinking, stakeholder alignment, and practical execution.`
- Render `CaseStudyCard` for each case study where `published: true`. If none are published, show the paragraph only plus a link to `/work/`. Never render placeholder cards in production.

**06 / Thought leadership**

- H2: `Perspectives on growth, marketing, and transformation.`
- Paragraph: `I explore the practical questions that shape business performance: how organizations build effective marketing systems, connect strategy with revenue, adopt emerging technology, and create the alignment needed to execute well.`
- Themes line (gold eyebrow style): `Marketing and revenue alignment · AI adoption in marketing operations · GTM execution · Organizational alignment`
- Render latest 3 published `ArticleCard`s; if none, link to `/insights/`.

**07 / About**

- H2: `Strategy informed by experience. Execution grounded in reality.`
- Paragraphs:
  - `Over the course of my career, I have worked across corporate environments, entrepreneurial ventures, marketing and communication, operations, and business ecosystem development.`
  - `These experiences have shaped how I approach growth: understand the business context, identify what matters most, bring stakeholders together, and build practical systems that translate priorities into action.`
  - `I value clear thinking, measurable outcomes, collaborative leadership, and solutions that can be sustained beyond the initial initiative.`
- Link: `Read my story ↗` → `/about/`

**08 / Let's connect**

- H2: `Let's create clarity around your next growth challenge.`
- Paragraph: `Whether you are exploring a senior marketing leadership opportunity or looking to strengthen your organization's growth capabilities, I welcome a conversation.`
- Two pathway cards:
  - **Leadership opportunities**: For organizations seeking marketing, growth, and transformation leadership. → `/contact/#leadership`
  - **Business growth consulting**: For business owners and teams looking to improve growth strategy, marketing effectiveness, and execution. → `/contact/#consulting`

### 6.2 About (`/about/`)

- H1: `A career built around growth, execution, and organizational effectiveness.`
- Sections, in order: professional introduction and leadership philosophy (reuse homepage 07 copy, expanded); career timeline (role, organisation, dates, scope: build the component, populate with `TODO` entries); selected career milestones; leadership approach; industry and geographic exposure; LinkedIn and CV links (CV link is `TODO`).
- Timeline is a data array in the page frontmatter so it can be edited without touching layout.

### 6.3 Expertise (`/expertise/`)

- H1: `Connecting business strategy, marketing, and execution.`
- Four pillars from homepage 04, each expanded with the same four-part structure: **The business problem** · **My approach** · **Typical workstreams** · **Intended business outcome**. Write the pillar heading and one-line description from the homepage copy; mark the four sub-sections `TODO` with a short placeholder sentence each.
- Closing CTA: `Discuss a business challenge` → `/contact/#consulting`.

### 6.4 Selected Work (`/work/`, `/work/[slug]/`)

- Listing H1: `Evidence of thinking, decisions, and execution.`
- Content collection `work`, schema:

```ts
{
  title: string;
  industry: string;
  summary: string;
  challenge: string;
  contribution: string;
  approach: string[];
  outcomes: { metric: string; value: string; period?: string; evidence?: string }[];
  published: boolean;   // default false
  order?: number;
}
```

- Detail page template, numbered sections: `01 — Context` · `02 — Objective` · `03 — My contribution` · `04 — Approach` · `05 — Outcome` · `06 — Learning`.
- Create two draft case study files with `published: false` and `TODO` content so the template renders in dev. Production build must exclude unpublished entries everywhere (listing, homepage, sitemap).

### 6.5 Insights (`/insights/`, `/insights/[slug]/`)

- Content collection `insights`, schema: `title`, `description`, `pubDate`, `audience` (string), `published` (boolean, default false), `draft` handled by `published`.
- Create three draft stubs (`published: false`):
  1. `Why marketing activity and business growth often become disconnected` (audience: CEOs and marketing leaders)
  2. `AI in marketing operations: start with the workflow, not the tool` (audience: marketing and operations leaders)
  3. `A go-to-market strategy is only as strong as its execution system` (audience: founders and business growth leaders)
- Article layout: editorial serif title, meta line, readable measure (~68ch), proper typographic styles for Markdown output.

### 6.6 Contact (`/contact/`)

- H1: `Let's discuss what growth could look like for your organization.`
- Short intro.
- Two anchored sections: `#leadership` (**Leadership opportunities**) and `#consulting` (**Business growth consulting**), each with one sentence and the direct links.
- Direct links: email (`mailto:` from `site.email`) and LinkedIn (`site.linkedin`, opens new tab, `rel="noopener"`).
- Contact form (see section 7).

---

## 7. Contact form

Static frontend, managed form-processing provider. Implement `ContactForm.astro` provider-agnostic: the `action` URL comes from an environment variable `PUBLIC_FORM_ENDPOINT` (document in README; default to a `TODO` placeholder). Recommended providers: Formspree, Web3Forms or Netlify Forms. Do not hard-code any provider key.

Fields:

| Field | Rule |
|---|---|
| Name | Required |
| Professional email | Required, `type="email"`, format validated |
| Enquiry type | Required, select: `Leadership opportunity` / `Consulting` |
| Organisation | Optional |
| Message | Required, `maxlength` 2000 |
| Honeypot | Hidden field, must be empty |
| Privacy notice | Visible text above the submit button explaining what is collected, why, and how enquiries are handled |

Behaviour:

- Browser-side validation with accessible error messages (`aria-describedby`, `aria-invalid`).
- Submit via `fetch` with progressive enhancement: form works with plain POST if JS fails.
- Show success message only after the provider returns success.
- On failure, show an error and a fallback `mailto:` link.
- Pre-select enquiry type from `?type=leadership` or `?type=consulting` query param, and from the `#leadership` / `#consulting` anchors.

---

## 8. SEO and metadata

- `BaseLayout` accepts `title`, `description`, `canonical`, optional `ogImage`, optional `noindex`.
- Homepage title: `Prathiba G. | Marketing & Business Growth Leader`
- Homepage description: `Explore Prathiba G.'s experience in marketing strategy, business growth, go-to-market execution, operational effectiveness, and technology-enabled transformation.`
- Every page: unique title and description, canonical URL built from `site.domain`, Open Graph and Twitter card tags, one `h1`.
- JSON-LD `Person` and `WebSite` schema on the homepage using only values from `site.ts`.
- `robots.txt` allowing all, pointing to `/sitemap-index.xml`.
- Unpublished content excluded from sitemap.
- Default OG image placeholder at `public/images/og-image.png` (1200×630), marked `TODO`.

---

## 9. Accessibility and performance targets

- Semantic HTML, landmarks, skip-to-content link, visible focus states, full keyboard operation.
- Colour contrast AA on all text.
- Images: `loading="lazy"` below the fold, explicit width/height, descriptive `alt`.
- Targets: Lighthouse performance and accessibility ≥ 90; LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.
- Zero console errors, zero broken internal links in the production build.
- Site must remain readable if fonts, analytics or the form endpoint fail to load.
- No analytics in the first release. Leave a commented slot in `BaseLayout` for a privacy-conscious script later.

---

## 10. Acceptance criteria (done when all are true)

1. All six primary routes build and share the same header, footer and visual system.
2. Homepage has distinct leadership and consulting conversion paths that resolve to the Contact page anchors.
3. `site.ts` is the only place personal details appear; LinkedIn, email and domain are not hard-coded elsewhere.
4. Case studies and insights are content collections with schema validation; unpublished entries never appear in production output or the sitemap.
5. Direct email and LinkedIn links work.
6. Contact form validates, submits to `PUBLIC_FORM_ENDPOINT`, shows success only on confirmation, and degrades gracefully.
7. Metadata, canonical URLs, sitemap, robots and JSON-LD are present and correct.
8. Responsive on 360px, 768px and 1280px widths with no horizontal scroll.
9. `npm run build` succeeds with no warnings about missing content; `npm run preview` serves the site.
10. README documents: how to run, how to add a case study or article, how to set the form endpoint, which `TODO` values must be replaced before launch, and the deploy steps for Cloudflare Pages or Netlify (DNS, HTTPS, www/non-www redirect to one canonical host).

---

## 11. Rules

- Do not invent client names, metrics, dates, employers or results. Use `TODO` placeholders and list them in the README.
- Do not use stock photography, generic icons sets, or decorative illustrations.
- Do not add React, a CMS, a database, authentication or Tailwind.
- Do not commit secrets. `.env` is gitignored; ship `.env.example`.
- Keep copy exactly as given in section 6 unless it is marked `TODO`.
- Keep the site to one serif and one sans-serif family.

---

## 12. Open inputs (owner to supply)

| Input | Status |
|---|---|
| Domain name | TODO |
| Professional enquiry email | TODO |
| Professional portrait (and OG image) | TODO |
| CV link and verified career timeline | TODO |
| Two or three verified case studies with disclosure permission | TODO |
| Form provider endpoint | TODO |
| Hosting provider choice (Cloudflare Pages or Netlify) | TODO |

Build everything else now with placeholders so the site can go live as soon as these arrive.
