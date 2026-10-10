import type { HeroContent, SiteContent } from "@/content/types";

export function Hero({ site, content }: { site: SiteContent; content: HeroContent }) {
  return (
    <section aria-labelledby="hero-heading" className="grid items-center gap-12 pb-20 pt-12 sm:pb-28 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-36 lg:pt-24">
      <div>
        <p className="mb-6 flex items-center gap-3 font-mono text-sm text-muted">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
          {site.role}
        </p>
        <h1 id="hero-heading" className="max-w-xl text-5xl leading-[1.04] font-semibold tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl">
          {content.headline}
        </h1>
        <p className="mt-7 max-w-md text-base leading-7 text-muted sm:text-lg sm:leading-8">{content.description}</p>
        <div className="mt-8 flex flex-wrap gap-3 font-mono text-sm">
          <a href={`mailto:${site.email}`} className="inline-flex min-h-12 items-center justify-center gap-5 rounded bg-accent px-5 font-medium text-accent-foreground hover:bg-foreground">
            {content.contactLabel}<span aria-hidden="true">↗</span>
          </a>
          <a href={site.github} className="inline-flex min-h-12 items-center justify-center rounded border border-border px-5 hover:border-accent hover:text-accent">{content.githubLabel}</a>
        </div>
      </div>
      <div className="min-w-0">
        <ul aria-label="Technologies" className="mb-4 flex flex-wrap gap-2 font-mono text-xs text-muted">
          {content.technologies.map((technology) => <li key={technology} className="rounded border border-border px-3 py-2">{technology}</li>)}
        </ul>
        <figure className="overflow-hidden rounded-lg border border-border bg-surface">
          <figcaption className="flex flex-wrap justify-between gap-2 border-b border-border px-5 py-4 font-mono text-xs text-muted">
            <span>content/hero.ts</span><span>TypeScript · this portfolio</span>
          </figcaption>
          <pre tabIndex={0} aria-label="An excerpt from this portfolio's typed hero content" className="overflow-x-auto px-5 py-8 font-mono text-sm leading-8 sm:px-6"><code><span className="text-muted">{"// One source of truth for the page.\n"}</span><span className="text-accent">{"export const "}</span>{"hero: "}<span className="text-accent">HeroContent</span>{" = {\n  headline:\n    "}<span className="text-accent">{JSON.stringify(content.headline)}</span>{",\n  technologies: [\n"}{content.technologies.map((technology) => `    ${JSON.stringify(technology)},\n`).join("")}{"  ],\n};"}</code></pre>
          <p className="border-t border-border px-5 py-4 font-mono text-xs text-muted">A small excerpt from this portfolio.</p>
        </figure>
      </div>
    </section>
  );
}
