import { CodeShowcase } from "@/components/code-showcase";
import type { HeroContent, SiteContent } from "@/content/types";

export function Hero({ site, content, hasProjects = false }: { site: SiteContent; content: HeroContent; hasProjects?: boolean }) {
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
          <a href={hasProjects ? "#work" : site.github} className="inline-flex min-h-12 items-center justify-center rounded border border-border px-5 hover:border-accent hover:text-accent">{hasProjects ? content.workLabel : content.githubLabel}</a>
        </div>
      </div>
      <CodeShowcase examples={content.examples} />
    </section>
  );
}
