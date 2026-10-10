# Portfolio

Personal site for a **full-stack web developer** (2+ years frontend, 1+ year backend). It is a hiring and freelance asset: who I am, what I have shipped, and how to reach me.

**Contact:** email and GitHub only.

This repository is the source of truth for the public site. Visual design comes after structure and content types are in place.

---

## For recruiters

| Aspect| Content|
|---|---|
| **Role** | Full-stack web developer |
| **Frontend** | React, Next.js, JavaScript, TypeScript |
| **Backend** | Express.js, NestJS |
| **Goal of this site** | Job applications and freelance opportunities |
| **What you will find** | Selected work, company experience (case-study style where IP allows), skills grouped by area, a short about section, email + GitHub |

The live site is a single-page portfolio with optional deep-dive case studies. Company work is described without leaking private code or client IP. Personal projects are current, public, and (when possible) demoed live.

---

## For AI agents

Read this file and [`ARCHITECTURE.md`](./ARCHITECTURE.md) before changing the codebase. Architecture is mandatory; do not introduce a second UI kit, CMS, backend, or animation library without updating those docs first.

### Product constraints

- Audience: recruiters, hiring managers, freelance clients.
- v1 is **one long page** with anchored sections. Extra routes only for project case studies (`/projects/[slug]`).
- Do **not** add: blog, services pricing, testimonials placeholders, contact forms, or a dump of old unfinished projects.
- Contact surfaces: **email** (`mailto:` + visible address) and **GitHub**. No other social by default.

### Page sections (order)

1. **Header** — name, role, GitHub, email, optional resume PDF.
2. **Hero** — one-line pitch, short support copy, CTAs (email / view work).
3. **Selected work** — three project cards (one featured). Each card: title, one-line outcome, stack tags, role, year, links (live / GitHub / case study).
4. **Case studies** — one or two deeper write-ups (on-page or `/projects/[slug]`): context, contribution, stack, simple architecture, outcome, links. No secrets.
5. **Experience** — company, title, dates, 3–5 impact bullets, stack used.
6. **Skills** — Frontend / Backend / Practices. Interview-honest only.
7. **About** — short bio and how I work.
8. **Contact** — email and GitHub.
9. **Footer** — name, email, GitHub, year.

### Content vs UI

Copy and structured data live in typed modules (and MDX later if a case study needs long-form). Do not hardcode recruiter-facing facts across random components. During UI development, clearly labeled project and case-study placeholders are permitted at the owner's request; replace them before public launch. Never invent working demo links or present sample outcomes as facts. Empty sections should not ship; omit them instead.

### Motion

Use **Motion** only (see architecture). Prefer small, consistent motion (section enter, card/button hover, header on scroll). Honor `prefers-reduced-motion`.

---

## Tech stack (summary)

| Layer | Choice |
|---|---|
| App | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Motion | Motion (`motion` / Framer Motion) |
| Content | Typed TypeScript modules; MDX only for long case studies |
| Hosting | Vercel |
| Backend on this repo | None for v1. NestJS/Express belong in **project demos**, not this site |

Full rules: [`ARCHITECTURE.md`](./ARCHITECTURE.md).

---

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm run start
npm run lint
```

---

## Project status

The homepage UI is implemented: header, technology code tabs, selected work, on-page case study, skills, about, contact, and footer. Project and case-study content is explicitly labeled as design placeholders. Experience is implemented but hidden until employment details are supplied.

Content is maintained in typed modules under `content/`. See [HOMEPAGE-PLAN.md](./HOMEPAGE-PLAN.md) for the implementation status and release checklist.

### Deployment

Deploy the repository to Vercel with the Next.js preset and the existing npm build command. The production origin is read from Vercel's `VERCEL_PROJECT_PRODUCTION_URL`; set `NEXT_PUBLIC_SITE_URL` to your custom origin if needed (see [.env.example](./.env.example)). Redeploy after changing the origin because social preview URLs are generated during the build.

Before public launch, replace project placeholders and complete the browser checks in the release checklist. No analytics, backend service, or secret environment variables are required.
