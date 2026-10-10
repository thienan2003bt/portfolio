import type { SiteContent } from "@/content/types";

export function Header({ site }: { site: SiteContent }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-6 sm:py-8">
      <a href="#home" aria-label={`${site.name}, home`} className="inline-flex min-h-11 items-center font-mono text-sm font-medium tracking-tight">
        {site.name}<span aria-hidden="true" className="text-accent">_</span>
      </a>
      <nav aria-label="Main navigation" className="flex flex-wrap gap-x-6 font-mono text-sm text-muted">
        <a href={site.github} className="inline-flex min-h-11 items-center hover:text-accent">GitHub</a>
        <a href="#contact" className="inline-flex min-h-11 items-center hover:text-accent">Contact <span aria-hidden="true" className="ml-2 text-accent">↗</span></a>
      </nav>
    </header>
  );
}
