import type { SiteContent } from "@/content/types";
import Image from "next/image";

export function Header({ site, hasProjects = false }: { site: SiteContent; hasProjects?: boolean }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-6 sm:py-8">
      <a href="#home" aria-label={`${site.name}, home`} className="inline-flex min-h-11 items-center gap-2 font-mono text-sm font-medium tracking-tight">
        {site.name}<Image src="/icon.svg" alt="" width={24} height={24} className="shrink-0" />
      </a>
      <nav aria-label="Main navigation" className="flex flex-wrap gap-x-6 font-mono text-sm text-muted">
        {hasProjects && <a href="#work" className="inline-flex min-h-11 items-center hover:text-accent">Work</a>}
        <a href="#skills" className="inline-flex min-h-11 items-center hover:text-accent">Stack</a>
        <a href="#about" className="inline-flex min-h-11 items-center hover:text-accent">About</a>
        <a href={site.github} className="inline-flex min-h-11 items-center hover:text-accent">GitHub</a>
        <a href="#contact" className="inline-flex min-h-11 items-center hover:text-accent">Contact <span aria-hidden="true" className="ml-2 text-accent">↗</span></a>
      </nav>
    </header>
  );
}
