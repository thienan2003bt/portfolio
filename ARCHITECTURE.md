# Architecture

Stack and conventions for this repository. **Obey this file** in every change. If a change needs a different tool, update this document in the same PR.

This app is a **static-friendly marketing site**, not a product backend. NestJS and Express are part of the author’s skill set and appear in **portfolio project demos**, not as servers inside this codebase.

---

## Goals

- Signal the stack used in jobs: TypeScript, Next.js, React.
- Keep the surface area small so content and layout stay easy to change.
- One animation system, one styling system, one content pattern.
- Ship on Vercel with no custom Node API unless a later case study truly needs it.

---



## Stack (required)


| Concern   | Choice                                                                                             | Do not use instead                                                                                                               |
| --------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Framework | **Next.js App Router**                                                                             | Pages Router, Vite SPA, Remix, Astro (unless architecture is revised)                                                            |
| Language  | **TypeScript** (`strict`)                                                                          | JavaScript for app code                                                                                                          |
| UI        | **React** Server Components by default; Client Components only when needed (motion, interactivity) | Class components; unnecessary `"use client"` on whole pages                                                                      |
| Styling   | **Tailwind CSS**                                                                                   | CSS-in-JS (styled-components, Emotion), a second utility framework, UI kits (MUI, Chakra, shadcn) unless explicitly adopted here |
| Animation | **Motion** (`motion` package, formerly Framer Motion)                                              | GSAP, anime.js, Lottie-as-layout, extra scroll libraries                                                                         |
| Content   | **Typed modules** (`*.ts`) as source of truth; **MDX** only for long case-study bodies             | Headless CMS, Markdown scattered in components, hardcoded copy in many files                                                     |
| Icons     | One set (e.g. `lucide-react`) once chosen                                                          | Mixing several icon packs                                                                                                        |
| Fonts     | `next/font`                                                                                        | Runtime Google Fonts `<link>` in layout without `next/font`                                                                      |
| Deploy    | **Vercel**                                                                                         | Required custom Node hosting for v1                                                                                              |


Package manager: **npm** (lockfile: `package-lock.json`). Do not add pnpm/yarn unless the repo standard changes.

---



## Application shape



### Routing

v1:

```
/                     → single landing page (all sections)
/projects/[slug]      → optional case study (only if the project needs it)
```

No other routes unless this file is updated (no `/blog`, `/services`, `/admin`).

### Intended folders

```
app/                  Next.js App Router (layout, page, project slug)
components/           Presentational UI, one concern per file
components/sections/  Page sections matching README order
content/              Typed data: site, hero, projects, experience, skills
lib/                  Pure helpers (e.g. reduced-motion, class names)
public/               Static assets (images, resume PDF, favicon)
```

Keep section components dumb: they receive data from `content/` (or a thin server wrapper). Do not fetch from remote CMSs in v1.

### Rendering

- Prefer **Server Components** for layout, sections, and lists.
- Use **Client Components** at the leaves: Motion wrappers, mobile nav, hover that needs JS.
- Do not put the entire page in one Client Component.



### Images

Use `next/image` for project and profile images. Store files in `public/` or co-locate under `app` as Next allows. Provide width/height or fill + sized parent. No raw huge PNGs without compression.

---



## Content model

Author-facing facts live in `content/`, imported by the app. Suggested modules:


| Module          | Holds                                                                       |
| --------------- | --------------------------------------------------------------------------- |
| `site.ts`       | Name, role, email, GitHub URL, optional resume path                         |
| `hero.ts`       | Pitch, supporting lines, CTA labels                                         |
| `projects.ts`   | Selected work: slug, title, outcome, role, year, tags, links, featured flag |
| `experience.ts` | Jobs: company, title, dates, bullets, stack                                 |
| `skills.ts`     | Groups: frontend, backend, practices                                        |
| `about.ts`      | Bio paragraphs                                                              |


Types live next to the data or in `content/types.ts`. Components must not invent parallel shapes.

Case-study **long form** may be MDX under `content/projects/` keyed by `slug`. Front matter must match `projects.ts` (or MDX is the single source for that slug — pick one and stay consistent).

**Never commit secrets**, client names under NDA, private URLs, or env keys. Company case studies stay anonymized.

---



## Styling conventions

- Tailwind utility classes in JSX. Extract a component when the same cluster repeats.
- Global tokens (color, type, spacing) via `@theme` / Tailwind theme in one CSS entry (e.g. `app/globals.css`). Do not sprinkle magic hex values that bypass the theme once a palette exists.
- Mobile-first. Sections must remain readable without animation.
- No CSS Modules **and** Tailwind in the same feature unless a third-party exception is documented.

---



## Motion conventions

Library: **Motion** for React.

Allowed:

- Section enter (fade + short translate) on scroll, once per section.
- Hover/focus on cards and buttons.
- Header background/elevation on scroll.
- Shared layout or `layout` where it simplifies UI, not as decoration.

Not allowed:

- Scroll-jacking, full-page locomotive/lenis stacks, particle backgrounds, autoplaying decorative video as the hero.
- Animating layout in a way that breaks `prefers-reduced-motion`.

Always gate motion with reduced-motion (CSS `prefers-reduced-motion` and/or Motion’s `useReducedMotion`). If reduced motion is on, show the static layout.

Keep durations short and the same scale site-wide (one easing, a small duration set). Do not add a second animation library for one effect.

---



## Backend and data

**This repo has no application backend in v1.**

- No Express, NestJS, Prisma, or database in this project.
- No Next.js Route Handlers unless they are documented here (e.g. a later contact API — not planned).
- No server actions for a CMS.
- Environment variables: only public site config if needed (`NEXT_PUBLIC_*`). No API secrets.

Backend experience is **shown** through project tags, case studies, and external demo repos.

---



## TypeScript and quality

- `strict` true. No `any` without a one-line justification comment.
- Prefer explicit exported types for content.
- ESLint (Next config) + the project TypeScript config. Do not disable rules repo-wide to ship UI.
- Accessible defaults: semantic landmarks, heading order, visible focus, `mailto` and GitHub as real links, alt text on images.

---



## Dependencies policy

Add a dependency only if:

1. It matches a row in **Stack (required)**, or
2. This file is updated with why.

Avoid: heavy 3D (Three.js), analytics suites, A/B tools, form backends, auth, i18n frameworks until there is a product need.

---



## Out of scope (until architecture changes)

- Multi-language.
- Dark/light as a product requirement (implementation may still follow system preference later).
- CMS, user accounts, comments.
- Nest/Express services inside this app.

---



## How to extend

1. Change **content** → `content/` only.
2. Change **section layout** → `components/sections/` + `app/page.tsx`.
3. Change **stack** → update this file first, then code.

