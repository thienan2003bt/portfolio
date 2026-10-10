# Repository agent guide

## Start here

- Read [README.md](./README.md) for product scope and [ARCHITECTURE.md](./ARCHITECTURE.md) for mandatory technical conventions before changing code.
- Inspect the affected files and [package.json](./package.json) before choosing an implementation. Use the repository for current implementation state and the docs for intended behavior.
- Keep changes focused on the request. Preserve unrelated work. If the request changes the product scope or stack, update the corresponding docs in the same change before implementing it.
- Before writing code, read the relevant installed Next.js guides as required by the managed notice below. Use the installed version's APIs and heed deprecations.

## Product boundaries

This is a hiring and freelance portfolio for a full-stack developer. Prioritize clear evidence of work, readable content, and easy contact.

- v1 is one page at `/` with anchored sections. Only project case studies may add routes at `/projects/[slug]`.
- Preserve section order: Header, Hero, Selected work, Case studies, Experience, Skills, About, Contact, Footer.
- Target three selected projects with one featured and one or two case studies, but omit empty sections instead of inventing content to meet a count.
- Project cards show title, outcome, stack, role, year, and available live/GitHub/case-study links. Case studies explain context, contribution, stack, architecture, and outcome.
- Contact is a visible email address with a `mailto:` link and GitHub. A resume PDF is optional. Do not add other social channels by default.
- Do not add a blog, pricing, placeholder testimonials, contact forms, or unfinished-project dumps.
- Never invent employers, dates, metrics, skills, project outcomes, or links. Ask for missing facts when necessary; do not publish placeholders as real content.
- During the current UI-first phase, the owner explicitly permits clearly labeled project and case-study placeholders. Keep links absent until supplied and replace placeholders before public launch. Hero code examples are illustrative, not claims of shipped work.
- Anonymize company case studies. Never commit secrets, private URLs, NDA-protected client names, or proprietary code.

## Implementation rules

- Use Next.js App Router, strict TypeScript, React, Tailwind CSS, and Motion (`motion`). Use npm and keep `package-lock.json` consistent with dependency changes.
- Default to Server Components. Keep `"use client"` at interactive leaves such as navigation or Motion wrappers; do not turn a whole page into a Client Component for one effect.
- Keep the site static-friendly for Vercel. No application backend, database, auth, CMS, Route Handlers, or CMS server actions in v1. Backend experience belongs in external demos and case studies.
- Use typed content modules as the source of truth. Reuse their types instead of defining parallel component data shapes. MDX is only for long case-study bodies, with one consistent source of truth per slug.
- Use Tailwind utilities and shared theme tokens in [app/globals.css](./app/globals.css). Do not add a UI kit, CSS-in-JS, a second styling system, or another animation library without revising the architecture.
- Use `next/font` for fonts and `next/image` for project/profile images. Supply dimensions or a sized parent for `fill`, and optimize image assets.
- Keep one icon set if one is adopted; do not install dependencies merely because they are common in other projects.
- Keep exported content types explicit. Avoid `any`; any necessary exception requires a one-line justification. Do not disable lint or strictness repo-wide to make a change pass.

## Where changes belong

The folders below are the intended structure; create missing ones only when the task needs them.

| Location | Responsibility |
| --- | --- |
| `app/` | Routes, layout, metadata, global styles, and section composition |
| `components/sections/` | Sections in README order, receiving typed content as props or through a thin server wrapper |
| `components/` | Reusable presentational UI and small interactive components |
| `content/` | Site identity, hero, projects, experience, skills, and about data; types beside data or in `types.ts` |
| `content/projects/` | Optional long-form MDX case studies keyed by project slug |
| `lib/` | Pure shared helpers |
| `public/` | Optimized images, favicon, and optional resume PDF |

For a copy change, edit the content source rather than duplicating facts in components. For layout work, edit the relevant section and page composition. Do not introduce a remote content fetch for v1.

## UI and accessibility

- Build mobile-first with semantic landmarks, logical heading order, descriptive image alt text, real links, and visible keyboard focus.
- Keep content readable without animation. Honor `prefers-reduced-motion` with a static layout.
- Use small, consistent Motion effects: section entry once, card/button hover or focus, and header changes on scroll. Keep easing and duration choices consistent.
- Do not add scroll-jacking, extra scroll libraries, particles, decorative autoplay hero video, or heavy 3D.

## Verify and hand off

Use the scripts actually defined in [package.json](./package.json):

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the locked dependencies when setup is needed |
| `npm run dev` | Run the local development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Check the production build and Next.js TypeScript validation |
| `npm run start` | Serve a completed production build |

- For application changes, run lint and a production build. There is no test script currently; do not claim tests ran or add a test framework for a trivial change.
- For UI changes, check mobile and desktop layouts, keyboard navigation, anchor/contact/project links, and reduced motion when browser access is available.
- For documentation-only changes, check consistency, links, and the diff; an application build is unnecessary.
- Review the final diff for unrelated edits, fabricated content, secrets, and dependency churn.
- Summarize what changed and the checks actually performed. State any failed or unavailable checks and remaining limitations clearly.
- Whenever a prompt produces codebase changes (including documentation), include a suggested commit message in the final response: one sentence, no more than 30 words.
- Keep each implementation prompt scoped to one task and one commit. Finish only the requested roadmap step; do not bundle later steps. Create a commit only when the user asks to commit.

## Managed Next.js guidance

Keep the following block intact: `next dev` checks its exact content and can restore it. Maintain project-specific guidance above it.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
