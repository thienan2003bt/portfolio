import type { AboutContent, SiteContent } from "@/content/types";

export function About({ content, site }: { content: AboutContent; site: SiteContent }) {
  return (
    <section id="about" aria-labelledby="about-heading" className="grid gap-10 border-t border-border py-14 sm:py-20 lg:grid-cols-[1fr_2fr] lg:gap-16">
      <div><p className="mb-3 font-mono text-xs text-accent">02 / About</p><h2 id="about-heading" className="max-w-sm text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{content.title}</h2></div>
      <div className="max-w-2xl space-y-5 text-base leading-8 text-muted sm:text-lg">
        {content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <a href={site.github} className="inline-flex min-h-11 items-center gap-3 font-mono text-sm text-accent underline-offset-4 hover:underline">Explore my GitHub <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
