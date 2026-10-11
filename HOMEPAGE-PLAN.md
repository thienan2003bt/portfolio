# Homepage implementation plan

Status: homepage UI implemented on `feat/homepage-foundation`, based on the supplied "Terminal craft" mockup. The owner requested completing the remaining implementation stages together before feedback. Product scope remains governed by [README.md](./README.md) and [ARCHITECTURE.md](./ARCHITECTURE.md).

## Design decisions

Keep the near-black green palette, lime primary actions, strong sans-serif headings, monospace labels, thin dividers, and restrained terminal panels. Use existing Geist and Geist Mono fonts; no new library is needed. Treat the screenshot as a visual reference, not a complete responsive or interaction specification.

| Gap in the mockup | Implementation decision |
| --- | --- |
| Secondary copy, tags, and code look small and subdued | Use 16px body copy, generally 14px labels, readable line heights, and measured text contrast. Reserve smaller text for nonessential annotations. |
| Six hero tabs compete with the pitch | The owner requested technology tabs; use five manual, keyboard-accessible tabs with a short explanation of each code example. No autoplay. |
| Generic pricing example and simulated lint output offer little proof | Label the prepared examples as illustrative. Do not imply they are a live check or verified project result. |
| Four project selectors plus filters and nested tabs hide evidence | Start with three visible project summaries, one featured. Keep outcomes, role, stack, and links visible. Use a larger featured detail panel for the desktop visual character; stack cards on mobile. Defer filters for this small collection. |
| Experience and About are absent | Restore these sections in the documented order when real content is available. Put "How I work" in About and practices in Skills. |
| Stack layers imply databases, queues, and containers regardless of actual experience | Use the documented Frontend / Backend / Practices groups with actual technologies and project evidence. The vertical line motif can remain. |
| "Tests first", CI/CD, and availability are unverified | Confirm these claims before publishing; do not infer them from the mockup. |
| Footer includes LinkedIn and contact uses a placeholder | Keep email and GitHub only. Render the actual email visibly with a mailto link. |
| Only desktop behavior is shown | Specify single-column mobile layouts, wrapping navigation, readable code overflow, and generous tap targets. |

## Build sequence

### 1. Foundation and first screen

- Establish semantic Tailwind color tokens in [app/globals.css](./app/globals.css), existing font usage, selection styling, and keyboard focus. Initial implementation is complete; palette values are approximations to refine in the browser.
- Add typed `content/site.ts` and `content/hero.ts` after obtaining display name, email, GitHub, and approved pitch. Location and availability are optional.
- Build server-rendered Header, Hero, Contact, and Footer section components and compose them in [app/page.tsx](./app/page.tsx).
- Use a centered container around 1120px wide, responsive side padding, and a two-column hero on wide screens. Stack the pitch before the code panel on small screens.
- Keep navigation limited to rendered sections. Add a skip link. Show "View projects" only once there is a real project section to navigate to.
- Replace starter metadata with verified identity and description in [app/layout.tsx](./app/layout.tsx).

Done when: the starter page is replaced, real contact links work, there are no public placeholders, and the first screen works at mobile and desktop sizes.

### 2. Selected work and case-study evidence

Implementation status: typed project data and Selected Work are connected. Case-study details are now collapsed inside their project cards at the owner's request; there is no separate "Behind the build" section. The owner approved three clearly labeled project placeholders and one case-study placeholder. No fabricated demo or source links are rendered. Replace these entries before public launch. Five technology tabs display complete sample source files from `content/samples/`; the files are display assets, not services executed by this site.

- Define exported project types and one typed data source in `content/projects.ts`.
- Collect title, one-line outcome, role, year, stack, screenshot, available links, and disclosure constraints for each project.
- Build the featured project first, then two supporting projects using shared card primitives. Omit unavailable links instead of rendering disabled or dummy actions.
- Use optimized images with dimensions and descriptive alt text. Keep core summaries visible without interaction.
- Add one on-page case study after Selected work. Only introduce `/projects/[slug]` if the actual write-up needs a separate page; defer MDX until warranted.

Done when: visitors can understand contributions and follow real evidence without opening a sequence of tabs.

### 3. Experience, skills, and about

- Add typed experience, skills, and about modules; omit sections with no content.
- Preserve order: Header, Hero, Selected work, Case studies, Experience, Skills, About, Contact, Footer.
- Reuse the design's timeline treatment for skills or experience, while keeping essential information expanded.
- Include concise working practices in About, supported by real examples. Do not display invented CI or test results.

Done when: the page tells a coherent professional story and every factual claim is supplied or verified.

### 4. Interaction and visual refinement

- Keep page composition and content server-rendered. Add small Client Components only for interactions that survive the simplified design.
- If code tabs are added, implement tab semantics, arrow/Home/End keyboard navigation, selected state, and associated panels. If details are collapsible, prefer native details/summary for supplementary content.
- Use Motion only for short, consistent entry and hover effects. Under reduced motion, show the static layout immediately. Never hide essential content behind animation.
- Refine spacing, focus/hover states, screenshot crops, and code wrapping in a real browser. Avoid making color the only selected-state cue.

### 5. Validation and release preparation

- Run `npm run lint` and `npm run build` for application changes.
- Check 360px, 768px, and 1440px layouts and 200% zoom; no page-level horizontal overflow. Code may scroll inside its own panel.
- Check keyboard-only navigation, skip link, focus visibility, heading order, contrast, reduced motion, and all anchors/external/contact links.
- Check that content remains readable with JavaScript disabled. Core portfolio evidence must be present in server-rendered markup.
- Replace the starter favicon and add social-preview metadata/assets before launch. Confirm the production URL before canonical metadata.
- Review the Vercel preview on an actual phone before release. A passing build alone is not visual verification.

## Content needed

The first screen uses the supplied display name, email, GitHub profile, and screenshot headline. City and availability remain optional and omitted.

Remaining launch content: up to three real projects and screenshots, one approved case-study write-up, and employment details that can be published. Skill groups and a short bio use the facts already documented in the README. The illustrative hero code can be replaced with public project excerpts later.

## Scope of this initial change

The homepage includes typed site, hero, project, skills, about, and experience modules. The hero code tabs display full files with contained vertical and horizontal scrolling. Projects and the case study use owner-approved, clearly marked placeholders. Skills are grouped into Frontend, Backend, and Practices in this portfolio; a single-open accordion uses accessible buttons, controlled state, and reduced-motion-aware transitions. About uses only the role, stack, and experience durations already documented in the README. The experience component stays hidden while its content collection is empty.

Small Motion wrappers animate sections once; markup starts fully visible and reduced motion forces a static layout. The page includes a skip link, semantic headings, visible focus, responsive navigation, and real contact links. Social preview images, metadata, and a terminal-style SVG icon are implemented. Production preview origins use explicit public configuration or Vercel's production URL.

Reserved pages use a shared coming-soon screen: `/about`, `/contact`, `/projects`, `/experience`, `/skills`, `/coming-soon`, and the current project slugs. These static preview pages are marked noindex and link back to the homepage; unknown routes remain 404s. Future real pages should replace these reserved routes deliberately.

Feedback-pass validation: lint and production build passed; five source samples passed syntax transpilation checks, and the pagination sample passed defaults, range, malformed-input, and error-propagation checks. Production HTTP checks verified homepage content, coming-soon pages, a 404 for an unknown path, and deployment tracing of sample source assets. Browser interaction checks are still pending because browser tools are unavailable.

## Release checklist

- Replace all three project placeholders and the case-study outline with approved real content, screenshots, and available links.
- Add approved experience entries in `content/experience.ts` if the section is wanted. Optional city, availability, and resume remain omitted.
- Configure the production origin through `NEXT_PUBLIC_SITE_URL` when using a custom domain. Do not point it at a repository URL.
- Run lint and the production build, then inspect the production homepage, icon, and both social preview images.
- Repeat mobile/desktop, 200% zoom, keyboard, reduced-motion, and tab interaction checks in a browser. Browser tools were unavailable in this completion pass; previous browser checks do not verify the newly added sections.
- Deploy with Vercel's Next.js preset and review the preview on a real phone before public launch. This local implementation has not been deployed.
