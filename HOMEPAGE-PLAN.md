# Homepage implementation plan

Status: foundation started on `feat/homepage-foundation`. Based on the supplied "Terminal craft" desktop mockup. Product scope remains governed by [README.md](./README.md) and [ARCHITECTURE.md](./ARCHITECTURE.md).

## Design decisions

Keep the near-black green palette, lime primary actions, strong sans-serif headings, monospace labels, thin dividers, and restrained terminal panels. Use existing Geist and Geist Mono fonts; no new library is needed. Treat the screenshot as a visual reference, not a complete responsive or interaction specification.

| Gap in the mockup | Implementation decision |
| --- | --- |
| Secondary copy, tags, and code look small and subdued | Use 16px body copy, generally 14px labels, readable line heights, and measured text contrast. Reserve smaller text for nonessential annotations. |
| Six hero tabs compete with the pitch | Start with one static, readable code example from real work, with its purpose explained. Add manual tabs only if distinct examples provide useful evidence. No autoplay. |
| Generic pricing example and simulated lint output offer little proof | Prefer a public project excerpt with attribution. Do not imply that illustrative terminal output is a live check or verified project result. |
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

First screen: preferred display name, public email, GitHub profile, approved pitch, and optionally city/availability. The screenshot headline is a good draft: "I build the interface, and the API behind it."

Remaining page: up to three real projects and screenshots, one case-study outline, employment details that can be published, honest skill groups, and a short bio. A public code excerpt is needed before the hero panel can serve as evidence.

## Scope of this initial change

The theme, typed site and hero content, shared content types, and server-rendered Header, Hero, Contact, and Footer components are implemented and composed on the homepage. The first screen uses an excerpt from its own typed content for the terminal panel. Identity and contact details are supplied by the owner; optional location and availability are omitted. Page metadata uses the same content sources. Later roadmap steps have not been started.
