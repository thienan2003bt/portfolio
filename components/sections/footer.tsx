import type { SiteContent } from "@/content/types";

export function Footer({ site }: { site: SiteContent }) {
  return (
    <footer className="flex flex-col justify-between gap-4 border-t border-border py-7 font-mono text-xs text-muted sm:flex-row sm:items-center">
      <p>© {new Date().getFullYear()} {site.name}</p>
      <div className="flex flex-wrap gap-x-6">
        <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center break-all hover:text-accent">{site.email}</a>
        <a href={site.github} className="inline-flex min-h-11 items-center hover:text-accent">GitHub ↗</a>
      </div>
    </footer>
  );
}
