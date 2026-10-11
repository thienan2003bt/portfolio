import type { SiteContent } from "@/content/types";

export function Contact({ site }: { site: SiteContent }) {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="flex flex-col justify-between gap-8 border-t border-border py-14 sm:py-20 lg:flex-row lg:items-center">
      <h2 id="contact-heading" className="max-w-lg text-4xl leading-tight font-semibold tracking-[-0.045em] text-balance sm:text-5xl">Have something to build? Let’s talk.</h2>
      <a href={`mailto:${site.email}`} className="inline-flex min-h-12 max-w-full items-center justify-center gap-4 self-start rounded bg-accent px-5 py-3 font-mono text-sm text-accent-foreground hover:bg-foreground lg:self-auto">
        <span className="min-w-0 [overflow-wrap:anywhere]">{site.email}</span><span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
