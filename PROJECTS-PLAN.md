# Projects implementation plan

Status: stages 1 through 3 complete on `feat/project-pages`; stage 4 has confirmed scope/stack and suggested narratives for all four Webshare contributions. The owner requested illustrative reasoning labeled for later revision. Technical stories, results, media, and disclosure approval remain pending; stage 4 is still in progress and stage 5 has not started. This document replaces the completed homepage plan and preserves its outstanding release checks. Scope and stack are governed by [README.md](./README.md), [ARCHITECTURE.md](./ARCHITECTURE.md), and [AGENTS.md](./AGENTS.md).

## Goal and boundaries

Give recruiters and clients two reading paths: scan a career-wide collection, or read the engineering story behind one project. Include homepage projects in the collection using one source of truth. Start with Webshare.space, the owner's largest project. The owner reports working as a Full-stack Developer since approximately April 15, 2025, with no fixed contract end date and responsibility for the whole frontend. Use `Apr 2025 — present` in the draft, retaining the approximate start date in author notes; do not turn the earlier rough duration into a calendar claim. The frontend uses Vite, React, and JavaScript (not TypeScript); the backend uses Rust with Actix. The owner works in a small startup team, rarely touches backend code, and wrote the multipart-upload backend code. Exact team size, implementation detail, and results remain unknown.

The owner identified end-to-end encryption, multipart upload, resumable download, and Core Web Vitals performance improvements as problems they solved. These are owner-reported candidate contributions; their precise scope, decisions, and evidence remain to be collected. Mention Webshare by name without an external product link, including in draft UI. Research citations below are planning references only. Screenshot and internal-detail disclosure scope remains unconfirmed.

Build the layouts with explicit placeholders first; collect and refine facts afterward. Cover meaningful completed and ongoing work across the career, including older projects that demonstrate relevant experience. Avoid unfinished-project dumps, invented entries, fabricated metrics, private source links, and feature lists that imply personal ownership. There is no required archive count. Keep the existing Next.js, React, TypeScript, Tailwind, Motion, npm, and Vercel setup.

## Visual direction

Extend the homepage's near-black green palette, lime actions, Geist headings, Geist Mono labels, thin borders, and restrained terminal framing. The collection should feel easy to scan; detail pages should feel like readable engineering articles. Use screenshots and explanatory captions as evidence when available. Until then, use labeled image frames made with the existing styling system, not invented screenshots of a real product.

Use the current container width and responsive gutters. Body text stays about 16px with generous line spacing; article text has a narrower reading measure than galleries. Avoid repeated decorative cards for every paragraph, carousels, autoplay, and essential content behind tabs. No new dependencies are planned.

## Layout: `/projects`

Reading order:

1. Shared header with a clear Home link, Projects navigation, and existing contact surfaces. Homepage section links resolve to `/#skills`, `/#about`, and `/#contact`.
2. Breadcrumb `Home / Projects`, then H1 `Projects` and a brief introduction: selected and additional work across the career. A draft notice appears while entries are placeholders; do not claim a verified project count or years of career coverage yet.
3. Featured Webshare card: wide preview on desktop, product summary, personal contribution summary, role, period, confirmed stack, and a detail action once implemented. Mark product context and contribution placeholders distinctly.
4. Remaining catalog entries in a two-column desktop grid, stacked on mobile. Each shows title, purpose/outcome, role, year or period, stack, preview, and available detail/live/source links. Do not repeat Webshare in this list.
5. Short contact invitation with the visible email address and GitHub, then the shared footer.

Feature the primary project first; order the rest by explicit editorial order until dates are confirmed, then prefer recent work. All homepage selections remain present. With one confirmed project, a single featured entry is a valid layout. Existing generic entries may remain only as clearly labeled design placeholders during preview.

Defer search, filters, pagination, and year grouping until enough real entries make them useful. The initial collection is server-rendered and fully readable without JavaScript. Use separate, descriptive links rather than wrapping a card containing other links in one large anchor.

## Layout: `/projects/[slug]`

The initial real slug will be `/projects/webshare-space`. Show a useful summary before asking visitors to read the full case study.

| Order | Block | Needed information / draft treatment |
| --- | --- | --- |
| 1 | Header and breadcrumb | `Home / Projects / Webshare.space`; link back to the collection. |
| 2 | Project hero | Title, product purpose, personal contribution, project type, role, period, verified stack, available links. For Webshare: Full-stack Developer, `Apr 2025 — present`, whole frontend ownership, Vite/React/JavaScript frontend and Rust/Actix backend; detailed achievements remain drafts. No external product link. |
| 3 | Main product preview | Approved screenshot with caption explaining the flow and what the owner worked on; otherwise `Product screenshot — placeholder`. |
| 4 | At a glance | Concise problem, ownership, and result summary. These should be understandable without expanding anything. |
| 5 | Context and constraints | Intended users, their problem, project state on joining, business/technical constraints. |
| 6 | My role and collaboration | Personal scope, team responsibilities, decision authority, and boundaries between individual and team work. |
| 7 | Contributions and user flows | Two or three meaningful contributions with before/problem, personal change, visual evidence, and resulting behavior. Public product features alone do not fill this section. |
| 8 | Technical decisions and architecture | Confirmed stack and a simple diagram; one or two alternatives/trade-offs with reasons and consequences. Keep diagrams anonymized where needed. |
| 9 | Challenges and improvements | One substantial problem with investigation, solution, validation, and remaining limitations. |
| 10 | Outcomes and lessons | Verified measurements where available; otherwise specific qualitative changes with evidence. Explain what the owner would improve next. |
| 11 | More work and contact | Back to all projects; one or two genuine related entries only when available; visible email and GitHub; footer. |

For a long case study, add a small desktop table of contents beside the article and an ordinary link list above the body on mobile. Generate it only from rendered headings. Native anchors, visible focus, and appropriate scroll spacing are sufficient; no scrolling library or required scroll tracking.

Gallery images live near the story they substantiate, with descriptive alt text and captions. Optional milestones can explain the evolution since April 2025 once events are supplied. Supplementary detail can use native disclosure elements, but ownership, decisions, and results stay expanded. Omit unfilled optional sections in approved content rather than filling them with generic prose.

## Webshare public research

Reviewed on October 11, 2026. These are public product descriptions, not an implementation audit or evidence of the owner's contribution. No account was created, files uploaded, transfers tested, or private systems accessed.

- **Purpose:** temporary, private file sharing through a browser. The landing page presents file selection and drag-and-drop. [Product homepage](https://webshare.space/).
- **Advertised features:** device-side encryption, access-code protection, no account requirement, link/QR sharing, expiry, and no tracking. These are product statements; personal ownership remains unconfirmed. [Features](https://webshare.space/features).
- **Size discrepancy:** the features page advertises up to 5 TB per file and a 100 MB free-share limit. The FAQ instead describes large-file support as coming soon. Do not claim 5 TB as currently shipped or as the owner's achievement without clarification. [Features](https://webshare.space/features), [FAQ](https://webshare.space/docs/faq).
- **Documented constraints:** the FAQ says sender management ends when the creating browser tab closes, transfers expire, and a native mobile app is unavailable. Verify whether these descriptions match the version the owner worked on. [FAQ](https://webshare.space/docs/faq).
- **Research limit:** the privacy-policy fetch failed and the agreement page provided no readable body. This plan makes no legal-policy or independently verified security claims.

Potential strengths to investigate are low-friction sharing and privacy-oriented workflows. Potential trade-offs are recovery/control without accounts and time-limited access. These are interpretations of the public descriptions, not tested pros/cons. A portfolio should explain why constraints existed, how users experienced them, and which improvements the owner delivered.

### Proposed Webshare draft content

| Field | Initial draft |
| --- | --- |
| Title / slug | `Webshare.space` / `webshare-space` |
| Type | Company web application, supplied by the owner. Employer identity omitted pending disclosure scope. |
| Product summary | `A browser-based app for sharing files in private, temporary spaces.` Public product context, not a personal achievement. |
| Involvement | Ongoing since approximately April 15, 2025; no fixed contract end date reported. |
| Personal contribution | `Responsible for the entire frontend.` Detailed stories for encryption, multipart upload, resumable download, and Core Web Vitals remain outlines pending specifics. |
| Role / period | `Full-stack Developer` / `Apr 2025 — present`. Start date is approximate. Small startup team; whole frontend and multipart-upload backend code owned by the author. |
| Stack | Frontend: Vite, React, JavaScript. Backend: Rust, Actix. Distinguish whole-frontend ownership from the specific multipart-upload backend contribution. |
| Result | Omitted until a verified improvement and supporting evidence are supplied. |
| Media | Labeled preview frame until an approved screenshot and caption are available. |
| Links | No external product link, per the owner's request. No source link supplied. Internal collection/detail navigation is allowed; render the project name as plain text. |
| Status | Draft with explicit placeholder labels and noindex. Shipped feature status remains unconfirmed. |

Prioritize the four owner-reported contributions: end-to-end encryption, multipart upload, resumable download, and Core Web Vitals. The first three can form one transfer-flow story, with performance as a second focused story, if the actual work supports that grouping. Access-code and expiry/time-zone behavior remain optional interview prompts, not confirmed contributions. A public sender → temporary space → recipient flow may explain the product; service boundaries, storage, algorithms, and deployment architecture must come from the owner.

## Content model and implementation locations

- Extend exported `Project` and `ProjectCaseStudy` in `content/types.ts`; avoid separate competing data shapes for different pages.
- Keep `content/projects.ts` as the full catalog and source of project identity, shared summaries, external links, draft status, and structured detail content. Start without MDX; introduce it only if actual long-form writing warrants it and document one body source per slug.
- Add explicit homepage selection and deterministic order. `featured` controls emphasis, not whether a project is listed on the homepage. Derive homepage selections and all-project lists from the catalog, with no duplicated records.
- Support optional media/captions, contributions, decisions with alternatives, architecture notes, challenges, outcomes/evidence, lessons, and milestones. Keep missing facts explicit in drafts, and optional where omission is valid after approval.
- Add `app/projects/page.tsx` and `app/projects/[slug]/page.tsx`; use existing Header, Footer, ProjectCard, and SectionReveal where appropriate. Extend shared cards with a small typed presentation option only if homepage and collection layouts need it.
- Keep route composition in `app/`, substantial page blocks in `components/sections/`, small shared UI in `components/`, and optimized approved images in `public/projects/` when needed. Add a pure catalog lookup helper only if reuse warrants it.
- Retain the concise collapsed homepage case-study preview. Its wording must agree with the dedicated detail; do not maintain two independently edited copies of the same fact.
- Retire matching entries from `content/coming-soon.ts` as dedicated routes are added. Other reserved previews remain untouched. If `project-one` becomes `webshare-space`, remove the old draft URL from generated params deliberately; absent a separate redirect requirement it returns 404.
- Use static params from the catalog, asynchronous page params, unknown-slug guards, route-specific metadata, and noindex for draft detail pages. The initial collection remains noindex while it contains design placeholders. Follow the installed Next.js guides again during each implementation step.

## Build sequence

Each stage is a separate implementation prompt and suggested commit. Update this document's status and record actual checks with each stage. Do not bundle later stages into an earlier task.

| Stage | Status | Deliverable |
| --- | --- | --- |
| 0. Scope, research, and layouts | Complete | This plan, aligned scope docs, retired homepage plan. No application changes. |
| 1. Shared project catalog | Complete | Typed full catalog, explicit homepage selections, Webshare draft. |
| 2. Collection and homepage link | Complete | `/projects` layout and working homepage entry point. |
| 3. Detail layout | Complete | Reusable `/projects/[slug]` page with Webshare outline. |
| 4. Approved Webshare story | In progress: suggested narratives added | Confirmed scope/stack and labeled drafts; actual stories, evidence, and approval pending. |
| 5. Validation and release readiness | Pending | Browser/production checks, content review, launch checklist. |

### 1. Shared project catalog

Implemented October 11, 2026:

- `content/types.ts` supports draft/published status, project period/type, explicit selection/order, captioned media, and optional structured case-study contributions, decisions, challenges, outcomes/evidence, milestones, limitations, and lessons.
- `content/projects.ts` remains the full catalog. `selected` controls homepage membership; `featured` controls emphasis. Entries use `order` with slug tie-breaking, and homepage selections put featured entries first. `selectHomepageProjects` derives selections without mutating the catalog; `selectedProjects` feeds the homepage and its work navigation.
- Webshare replaces `project-one` with the confirmed role, approximate period, whole-frontend responsibility, and four owner-reported contribution topics. Stack tags remain empty, with a visible confirmation prompt. Results, architecture, and detailed decisions remain labeled outlines; no external product/source link is present. The other two generic design entries remain clearly labeled placeholders.
- The existing card distinguishes a real project's unfinished case study from a wholly illustrative design entry. The collapsed preview reads the shared outcome when no longer-form outcome is supplied and omits absent optional summaries/architecture. No new client boundary, routes, images, or dependencies were added.
- Coming-soon reservations continue to derive from the full catalog: `/projects/webshare-space` replaces `/projects/project-one`. The retired draft URL returns 404; collection/detail implementation remains pending.

Validation: `npm.cmd run lint` and `npm.cmd run build` passed, including Next.js TypeScript validation and static generation. On this Windows host, `npm.cmd` runs the existing scripts without changing PowerShell execution policy. Ad hoc catalog checks passed for unique slugs, explicit selection, an added unselected featured entry, deterministic order, empty selection, confirmed Webshare facts, absent external links, and reserved-path membership. Production HTTP checks passed for the homepage, collection/detail previews, and all remaining reserved pages; retired, unknown, and extra-segment paths returned 404. Server-rendered homepage markup retained three selections, draft labels, the collapsed case study, section anchors, and real contact links. Browser tools were unavailable, so visual, keyboard, zoom, and reduced-motion checks remain pending. No test framework was added and no deployment was performed.

Original stage checklist:

- Extend the existing types for the agreed summary/detail fields and draft handling. Keep current components compatible with the changed model.
- Replace the first generic project with the Webshare draft, preserve remaining clearly labeled layout entries, and add explicit homepage selection/order. New unselected records must not appear on the homepage.
- Wire the homepage to derived selections; keep section order, featured styling, and collapsed previews.
- Let current coming-soon project params derive from the updated catalog until real detail routes take over. No premature detail implementation or added archive filters.
- Run lint and a production build; review selected/all-project membership and updated reserved URLs.

Done when: the shared catalog can grow without expanding the homepage, Webshare's known facts are distinct from placeholders, and existing previews still build.

Suggested implementation prompt: `Implement stage 1 of PROJECTS-PLAN.md only: extend the shared project catalog and homepage selection, starting with the labeled Webshare draft.`

### 2. Collection and homepage link

Implemented October 11, 2026:

- `app/projects/page.tsx` replaces the collection's coming-soon reservation. The Server Component page includes a skip link, shared navigation/footer, breadcrumb, typed introduction, draft notice, featured entry, remaining responsive grid, and contact invitation. Copy lives in `content/project-collection.ts`; every card uses the full existing catalog, including homepage selections.
- The homepage header now has a Projects link, and Selected work has a visible `View all projects` action. Existing Work/hero anchors remain intact. Subpage header links resolve to homepage sections, with Home navigation and an accessible current-page marker on the collection.
- The shared card's collection variant presents the featured preview beside its text on desktop, stacks on small screens, and shows contribution text without a disclosure. Homepage case-study previews remain collapsed. All catalog cards link to their existing reserved detail URL with the explicit label `Project page preview`; those previews have a `Back to all projects` action.
- Only `/projects` was removed from catch-all reservations. Detail previews and unrelated reserved pages remain statically generated. Collection metadata has its own title, description, canonical, and existing social images; noindex remains while drafts/placeholders exist. Webshare has no external product/source link.

Validation: `npm.cmd run lint` and `npm.cmd run build` passed with TypeScript validation and static generation. Server render checks passed for the full catalog, a single project, an empty catalog, a catalog without a featured entry, and draft-notice handling; Webshare renders once and existing preview URLs remain reserved. Production HTTP checks passed for the homepage, collection, all detail previews, and remaining reserved pages; retired/unknown/extra-segment URLs returned 404. Checked all rendered internal link and anchor targets across homepage, collection, and Webshare preview, plus contact links, collection metadata/noindex, and both social image responses. Core collection text and links are present in server-rendered markup. Browser tools were unavailable, so mobile/desktop visual inspection, keyboard interaction, zoom, and reduced-motion checks remain pending. No dependency changes, test framework, or deployment were added.

Original stage checklist:

- Implement `/projects` with the shared header/footer, introduction, featured entry, remaining grid, and contact invitation.
- Add a visible `View all projects` link near the homepage Selected work heading or end. Preserve the hero's existing `#work` action and homepage Work anchor.
- Add Projects navigation for subpages and ensure other header links return to the correct homepage sections.
- Remove only the collection's coming-soon reservation. Detail links can use existing explicit preview routes, labeled `Project page preview`; change to `View project` when stage 3 replaces them. Omit a detail action if no route exists.
- Check the one-project layout as well as the current multi-entry design preview. Keep the archive noindex while placeholders remain.
- Run lint/build and route/link checks; inspect mobile/desktop and keyboard behavior if browser access is available.

Done when: visitors can reach the career collection from the homepage, see homepage selections alongside additional work, and navigate back without broken anchors.

Suggested implementation prompt: `Implement stage 2 of PROJECTS-PLAN.md only: build the project collection and link it from the homepage using the shared catalog.`

### 3. Detail layout

Implemented October 11, 2026:

- `app/projects/[slug]/page.tsx` generates all catalog slugs at build time, awaits params, and uses a shared lookup with `notFound()` for unknown slugs. It composes the shared header/footer, skip link, breadcrumb, typed detail layout, return-to-collection action, and contact. Metadata comes from the project record, with draft labels, noindex for draft/design entries, a per-slug canonical, and existing social images.
- `ProjectDetail` shows the project purpose, personal contribution, role/period/type/stack, clear draft notice, screenshot placeholder or captioned image, and expanded story. `ProjectStory` supports summary/context/role, contributions, alternatives and trade-offs, architecture notes, challenges, outcomes/evidence, lessons/limitations, milestones, and gallery images. It builds contents links from the exact rendered section list; long entries show a mobile list and sticky desktop sidebar. Shorter entries omit the contents navigation.
- `content/project-detail.ts` holds presentation copy; project facts remain in `content/projects.ts`. Webshare's existing owner-reported facts are supplemented only by explicit constraint/challenge/lesson prompts. No architecture, metrics, technologies, screenshot, employer identity, or source/product URL was invented. Optional absent sections are omitted. Reusable `ProjectMedia` uses image dimensions and captions, with eager loading for a supplied main preview and lazy gallery images.
- All cards now use `View project` links. The two generic design entries have concise detail pages and retain their design-placeholder labels. Other published real work may appear at the end of a detail page when supplied; current drafts/placeholders are excluded from that section.
- Project reservations and their temporary coming-soon return-link code were removed. Only the five unrelated reserved pages remain in the catch-all; the homepage's collapsed case-study preview remains intact.

Validation: `npm.cmd run lint` and `npm.cmd run build` passed, including TypeScript and static generation of all three detail routes. Ad hoc server render checks passed for Webshare's full outline, shorter design entries, sparse approved content, and optional images/captions, structured decisions, evidence, and milestones. Production HTTP checks passed for homepage, collection, all details, and remaining reserved pages; retired/unknown/extra-segment paths returned 404. Verified every rendered internal link and contents/section anchor across homepage, collection, and detail pages; single H1/unique main IDs, draft metadata/canonicals/social-image references, contact links, visible contribution content, absent external Webshare URL, and preserved homepage disclosures. Browser tools were unavailable, so visual, keyboard, zoom, and reduced-motion checks remain pending. No dependencies, test framework, or deployment were added.

Original stage checklist:

- Implement static detail pages from catalog slugs, beginning with the Webshare draft. Every linked draft entry gets a valid labeled page; it may be shorter when detail content is absent.
- Build the hero, facts, image placeholder/gallery, article sections, optional contents links, and back/contact actions. Use reusable blocks with proper heading levels rather than transplanting homepage `h4` sections unchanged.
- Remove project detail reservations from the catch-all as the dedicated route takes ownership. Retain unrelated coming-soon pages.
- Add real internal detail actions to homepage and collection cards. Keep external source actions absent for private repos and omit Webshare's product link entirely, per the owner's request.
- Generate metadata from the same project record. Keep draft pages noindex; validate known, unknown, and extra-segment routes.
- Run lint/build and route/link checks, then available responsive, keyboard, and reduced-motion checks.

Done when: `/projects/webshare-space` demonstrates the full story layout, all catalog detail links resolve, and unknown routes remain 404s.

Suggested implementation prompt: `Implement stage 3 of PROJECTS-PLAN.md only: build the reusable static project detail layout and Webshare draft, then connect project detail links.`

### 4. Approved Webshare story

Draft revision implemented October 11, 2026:

- Added the owner's confirmed Vite/React/JavaScript frontend, Rust/Actix backend, small startup team, and personal ownership of multipart-upload backend code. The frontend language is JavaScript; do not substitute the portfolio's TypeScript stack.
- At the owner's request, added suggested problem, approach, reasoning, trade-off, and verification copy for **all four** reported contributions. Each topic keeps its confirmed summary separate from a visible `Suggested narrative · update later` notice. The proposed details are examples to revise, not assertions about the actual implementation or completed checks.
- Omitted unsupported architecture, decisions, challenge, outcome, and lesson sections instead of leaving generic author questions in the article. Made the shared project outcome optional and guarded the card/preview display, so missing evidence does not require an invented result. Existing illustrative catalog entries remain unchanged.
- Screenshot and internal-detail permissions remain uncertain. Retained the labeled media frame, omitted internal diagrams/source and product links, and kept the entry and collection noindex. No security algorithm, storage provider, file limit, team count, measured score, or completed verification is asserted.
- The owner will revise the suggested narratives in upcoming work. Stage 4 cannot be marked approved until actual actions/results and disclosure scope are confirmed; do not remove draft labeling or noindex as part of this revision.

Validation: `npm.cmd run lint` and `npm.cmd run build` passed, including TypeScript validation and static generation. Production HTTP/HTML checks passed for the homepage, collection, and all three details: shared confirmed facts, four visible narrative notices/reasoning/trade-off/suggested-verification blocks, absent unsupported sections, draft noindex, no external Webshare URL, native anchors, and the preserved homepage disclosure. An unknown slug returned 404. Documentation links and the final diff were checked. Browser tools were unavailable; visual, keyboard, zoom, and reduced-motion checks remain pending. No dependency changes, commit, or deployment were made.

Remaining stage checklist:

- Use the interview below to refine the confirmed role/frontend ownership/start date and establish team setup, backend scope, stack, disclosure permissions, and evidence.
- Choose two or three strongest contributions and one substantial challenge. Write concrete problem → personal action → decision → result narratives; distinguish individual and team work.
- Add approved optimized screenshots and captions, a factual architecture diagram, and available evidence. Qualitative outcomes are acceptable; measured claims need a baseline and measurement method.
- Reconcile public-site discrepancies with the owner's version/history. Describe current product features separately from the version worked on when necessary.
- Replace draft prompts in the content source. Remove noindex only when the full entry and disclosure scope are approved, and reconsider collection indexing separately if other placeholders remain.
- Run lint/build for content-module or UI changes and review homepage/collection/detail consistency. Do not create extra projects to complete a layout.

Done when: Webshare reads as a credible account of the owner's work, with no placeholder achievements or unsupported attribution.

Suggested implementation prompt: `Implement stage 4 of PROJECTS-PLAN.md only using my supplied Webshare answers and approved assets; leave unsupported sections out.`

### 5. Validation and release readiness

- Run `npm run lint` and `npm run build`; serve the production build when checking routes. There is no test script or requirement to add a test framework.
- Verify `/`, `/projects`, each listed detail, and remaining reserved previews; unknown top-level, unknown-slug, and extra-segment URLs must return 404.
- Verify homepage → collection → detail → collection/home navigation, all section anchors, product/source links, visible email/mailto, and GitHub. No dummy `#` actions.
- Inspect 360px, 768px, and 1440px widths, 200% zoom, keyboard-only use, focus visibility, skip links, heading order, contrast, table-of-contents anchors, and reduced motion. All core stories must be readable with JavaScript disabled.
- Check screenshot cropping, dimensions, loading, and alt text; avoid page-level overflow. Code/diagrams may have contained scrolling where needed.
- Inspect titles, descriptions, canonical origins, inherited social previews, and noindex status for each route. Do not leak draft achievements into metadata.
- Review the final diff for unrelated edits, invented facts, confidential details, and dependency churn. If browser access is unavailable, record those checks as pending rather than claiming a visual pass.

Done when: the implementation has a recorded production verification and browser review, with every unresolved content/release issue stated clearly. Deployment is a separate action when requested.

## Information to collect

For every project, start with title, project type, purpose/users, role, dates, personal contribution, actual stack, outcome, publishable screenshot, real links, and disclosure constraints. A short summary is enough for an archive entry; every project does not need a Webshare-length case study.

### First Webshare interview

Initial and follow-up answers received; rough bullet points are sufficient. Preserve these facts and avoid asking the same questions again:

1. **Role and period:** Full-stack Developer; start approximately April 15, 2025; ongoing, with no fixed contract end date; the whole frontend is the owner's responsibility. Follow-up team/backend facts are recorded below.
2. **Problems solved:** end-to-end encryption, multipart upload, resumable download, and Core Web Vitals performance improvements. The owner may add more as they remember. Implementation narratives and results were not supplied.
3. **Naming and links:** mention Webshare by name, without linking externally to the app. Screenshot and internal-detail permissions were not supplied. Omit employer attribution until confirmed.
4. **Stack and team:** Vite, React, and JavaScript on the frontend; Rust with Actix on the backend. A small startup team, with no exact size supplied. The owner rarely touches the backend, but wrote the backend multipart-upload code.
5. **Draft writing preference:** generate suitable reasoning for every reported contribution with labels requiring later revision. These suggestions are not evidence of the actual implementation. Replace them with owner-confirmed stories before approval.
6. **Disclosure follow-up:** the owner is unsure what technical details or screenshots can be published and requests ambiguous descriptions for now. Keep the draft high-level and omit internal designs, code, and real media until scope is confirmed.

### Next interview: turn a named contribution into a story

Choose one topic first; there is no need to answer every topic at once:

| Topic | Focused follow-up |
| --- | --- |
| End-to-end encryption | What part did you own in the browser or backend? What made it difficult, which alternative did you reject, and how did you verify correct encryption/decryption and failure behavior? Keep implementation details within the publishable scope. |
| Multipart upload | What broke or became slow before multipart upload? How did you choose part sizes/concurrency, handle failure or cancellation, and validate that the new flow helped? Include only concerns you actually handled. |
| Resumable download | What event interrupted downloads, how did you track/recover progress, and did encrypted transfers introduce extra constraints? Describe one edge case and how you checked it. |
| Core Web Vitals | Which metric did you target (LCP, INP, or CLS), what caused the problem, and what did you change? Were comparisons from Lighthouse/lab runs or real-user field data, on which page/device, and over what period? No numbers are required until evidence is available. |

The frontend/backend technologies and qualitative team setup are now supplied. Clarify individual decisions, implementation details, and actual results when revising each suggested narrative. Request approved screenshots later when disclosure scope is known; a labeled media placeholder is sufficient for now.

### Follow-up prompts for the engineering story

- **Starting point:** Did you join an existing system or build the initial version? What was working, missing, or difficult for users at the time?
- **User flow:** Walk through one share from file selection to recipient download. Which steps did you build or improve? What did you change about errors, progress, cancellation, or mobile use?
- **Stack and boundaries:** What frameworks/services were actually used during your involvement? Which frontend/backend/storage/deployment pieces did you own, integrate with, or only consume?
- **Reliability:** Did you handle interruption, retry, concurrency, memory pressure, large files, or slow devices? Choose one concrete incident rather than a generic best-practice list.
- **Privacy/security, if owned:** What part of encryption or access-code behavior did you implement? Who chose/reviewed the approach? Explain only publishable design decisions, with no secret values or private source.
- **Expiry, if owned:** How did you handle time zones, deletion, sender control, and expired links? What edge case changed your design?
- **Evolution:** What were two or three major changes since April 2025, and why were they necessary? Exact milestones can follow later.
- **Trade-offs:** What option did you reject? Which constraint mattered, what cost did the chosen solution introduce, and what would you revisit today?
- **Evidence:** Is there an approved before/after screenshot, bug reproduction, release note, benchmark, or anonymized feedback? If using a number, what were its baseline, timeframe, method, and attribution?
- **Outcome:** What improved for users or maintainers? What remained difficult? A specific qualitative result is better than an invented percentage.
- **Product discrepancies:** Which file limits and transfer capabilities were actually released in the version you worked on? How should the differing public descriptions be explained?

## Public launch checklist carried forward

- Replace homepage/collection/detail placeholders with approved real content and images; omit unsupplied entries instead of inventing facts. Optional experience entries, city, availability, and resume remain omitted until provided.
- Preserve the Webshare naming-only preference: no external product link in cards, detail pages, metadata, or rendered content. Confirm remaining company disclosure and screenshot permissions; private source code, client identities under NDA, and private URLs never enter the repository.
- Configure the production origin through `NEXT_PUBLIC_SITE_URL` for a custom domain, or retain Vercel's production URL fallback. Redeploy after an origin change.
- Complete production lint/build and review pages, favicon, and both existing social preview images. The homepage's previous successful checks do not verify these new routes.
- Complete browser checks including homepage code tabs and the new project-page navigation. The retired plan's browser checks were still pending.
- Review a Vercel preview on an actual phone before public launch. This planning change does not deploy the site or certify launch readiness.
