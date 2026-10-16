import type { SiteContent } from "@/content/types";
import Image from "next/image";
import Link from "next/link";

export function Header({ site, hasProjects = false, homePath = "", currentPage }: { site: SiteContent; hasProjects?: boolean; homePath?: string; currentPage?: "projects" }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-6 sm:py-8">
      <Link href={`${homePath}#home`} aria-label={`${site.name}, home`} className="inline-flex min-h-11 items-center gap-2 font-mono text-sm font-medium tracking-tight">
        {site.name}<Image src="/icon.svg" alt="" width={24} height={24} className="shrink-0" />
      </Link>
      <nav aria-label="Main navigation" className="flex flex-wrap gap-x-6 font-mono text-sm text-muted">
        {homePath && <Link href="/" className="inline-flex min-h-11 items-center hover:text-accent">Home</Link>}
        {hasProjects && <Link href={`${homePath}#work`} className="inline-flex min-h-11 items-center hover:text-accent">Work</Link>}
        <Link href="/projects" aria-current={currentPage === "projects" ? "page" : undefined} className={`inline-flex min-h-11 items-center hover:text-accent ${currentPage === "projects" ? "text-accent underline underline-offset-4" : ""}`}>Projects</Link>
        <Link href={`${homePath}#skills`} className="inline-flex min-h-11 items-center hover:text-accent">Stack</Link>
        <Link href={`${homePath}#about`} className="inline-flex min-h-11 items-center hover:text-accent">About</Link>
        <a href={site.github} className="inline-flex min-h-11 items-center hover:text-accent">GitHub</a>
        <Link href={`${homePath}#contact`} className="inline-flex min-h-11 items-center hover:text-accent">Contact <span aria-hidden="true" className="ml-2 text-accent">↗</span></Link>
      </nav>
    </header>
  );
}
