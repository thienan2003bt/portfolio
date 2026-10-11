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

The homepage introduces selected work and links to the career-wide project collection at `/projects`. Dedicated case studies at `/projects/[slug]` now use a shared detail layout, with explicitly labeled draft content until approved. Implementation and remaining content work follow [PROJECTS-PLAN.md](./PROJECTS-PLAN.md). Company work is described without leaking private code or client IP.

---

## For AI agents

Read this file and [`ARCHITECTURE.md`](./ARCHITECTURE.md) before changing the codebase. Architecture is mandatory; do not introduce a second UI kit, CMS, backend, or animation library without updating those docs first.

### Product constraints

- Audience: recruiters, hiring managers, freelance clients.
- The homepage remains **one long page** with anchored sections. The project collection and detail pages extend it without changing its section order. Route rollout and reserved coming-soon paths are documented in [ARCHITECTURE.md](./ARCHITECTURE.md).
- Do **not** add: blog, services pricing, testimonials placeholders, contact forms, or a dump of old unfinished projects.
- Contact surfaces: **email** (`mailto:` + visible address) and **GitHub**. No other social by default.

### Page sections (order)

1. **Header** — name, role, GitHub, email, optional resume PDF.
2. **Hero** — one-line pitch, short support copy, CTAs (email / view work).
3. **Selected work** — three project cards (one featured). Each card: title, one-line outcome, stack tags, role, year, links (live / GitHub / case study).
4. **Case studies** — concise previews collapsed inside homepage project cards, with links to `/projects/[slug]` when implemented. Include context, contribution, stack, simple architecture, outcome, and available links. No secrets.
5. **Experience** — company, title, dates, 3–5 impact bullets, stack used.
6. **Skills** — Frontend / Backend / Practices. Interview-honest only.
7. **About** — short bio and how I work.
8. **Contact** — email and GitHub.
9. **Footer** — name, email, GitHub, year.

### Content vs UI

Copy and structured data live in typed modules (and MDX later if a case study needs long-form). Do not hardcode recruiter-facing facts across random components. During UI development, clearly labeled project and case-study placeholders are permitted at the owner's request; replace them before public launch. Never invent working demo links or present sample outcomes as facts. Empty sections should not ship; omit them instead.

The project collection covers completed work and meaningful ongoing work throughout the owner's career, including every homepage selection. Use one catalog with an explicit homepage selection; do not duplicate entries or invent projects to fill the archive. Webshare.space is the first case-study draft: the owner reports working as a Full-stack Developer since approximately April 15, 2025, with responsibility for its Vite/React/JavaScript frontend. Its backend uses Rust with Actix; the owner wrote the multipart-upload backend code and otherwise rarely touches the backend. Its public description provides product context; detailed implementation stories and results still require input. The owner permits clearly labeled suggested reasoning for later revision. Mention Webshare by name without an external product link, as requested. Screenshots, employer attribution, and internal technical details require an approved disclosure scope.

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

The homepage UI is implemented: header, technology code tabs, selected work, on-page case study, skills, about, contact, and footer. Project stages 1 through 3 add a shared catalog, explicit homepage selection, the `/projects` collection, and static `/projects/[slug]` detail pages. Cards link to the detail pages, which include breadcrumbs and return-to-collection actions. Stage 4 adds Webshare's confirmed role, period, stack, and scope plus clearly labeled suggested engineering narratives for encryption, multipart upload, resumable download, and Core Web Vitals. Unconfirmed architecture, results, and lessons are omitted; the narratives still need revision and approval. The two remaining design entries get shorter labeled pages. Experience is implemented but hidden until employment details are supplied. The collection and detail pages remain noindex while their content is unfinished.

Content is maintained in typed modules under `content/`. See [PROJECTS-PLAN.md](./PROJECTS-PLAN.md) for the next implementation stages, proposed layouts, Webshare research, and content interview. The completed homepage plan has been retired; its outstanding launch checks are preserved below and in the new plan.

### Outstanding launch checks

- Replace project and case-study placeholders with approved content, images, and real links. Add experience entries only when supplied; city, availability, and resume remain optional.
- Run lint and a production build for application changes, then inspect the production pages, icon, and social preview images.
- Check mobile and desktop layouts, 200% zoom, keyboard navigation, code tabs, anchors, contact links, and reduced motion in a browser. Previous completion work had no browser tools; these checks remain pending.
- Configure the production origin and review a Vercel preview on an actual phone before public launch. The retired plan recorded successful lint, build, and HTTP checks, not a deployment or completed browser verification.

### Deployment

Deploy the repository to Vercel with the Next.js preset and the existing npm build command. The production origin is read from Vercel's `VERCEL_PROJECT_PRODUCTION_URL`; set `NEXT_PUBLIC_SITE_URL` to your custom origin if needed (see [.env.example](./.env.example)). Redeploy after changing the origin because social preview URLs are generated during the build.

Before public launch, replace project placeholders and complete the browser checks in the release checklist. No analytics, backend service, or secret environment variables are required.
