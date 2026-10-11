import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";
import { ProjectCaseStudyContent } from "./project-case-study";

export function ProjectCard({ project, variant = "homepage" }: { project: Project; variant?: "homepage" | "collection" }) {
  const titleId = `project-${project.slug}`;
  const collectionFeatured = variant === "collection" && project.featured;
  const previewBorder = collectionFeatured ? "lg:border-r lg:border-b-0" : "";

  return (
    <article aria-labelledby={titleId} className={`flex min-w-0 flex-col overflow-hidden rounded-lg border bg-surface ${project.featured ? "border-accent/50 md:col-span-2" : "border-border"} ${collectionFeatured ? "lg:grid lg:grid-cols-2" : ""}`}>
      {project.status === "draft" && !project.image && (
        <div className={`flex items-center justify-center border-b border-border bg-surface-raised p-6 ${collectionFeatured ? "aspect-[16/9] lg:aspect-auto lg:min-h-80" : "aspect-[16/7]"} ${previewBorder}`} aria-label="Project image placeholder">
          <div className="w-full max-w-sm rounded border border-border bg-background p-4" aria-hidden="true">
            <div className="mb-4 flex gap-1.5">{[0, 1, 2].map((dot) => <span key={dot} className="h-1.5 w-1.5 rounded-full bg-muted/40" />)}</div>
            <div className="flex gap-3"><div className="w-1/4 rounded border border-border" /><div className="flex-1 space-y-3"><div className="h-2 w-2/3 rounded bg-accent/25" /><div className="h-2 rounded bg-muted/15" /><div className="h-12 rounded border border-dashed border-border" /></div></div>
            <p className="mt-4 text-center font-mono text-xs text-muted">Project preview · placeholder</p>
          </div>
        </div>
      )}
      {project.image && (
        <div className={`border-b border-border bg-surface-raised p-4 sm:p-6 ${previewBorder}`}>
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes={collectionFeatured ? "(max-width: 1024px) 100vw, 544px" : project.featured ? "(max-width: 1152px) 100vw, 1088px" : "(max-width: 768px) 100vw, 544px"}
            className="h-auto w-full rounded object-contain"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-muted">
          <span>{project.role} · {project.period}</span>
          {project.featured && <span className="rounded border border-accent/40 px-2 py-1 text-accent">Featured project</span>}
        </div>
        <div>
          {project.placeholder && <p className="mb-2 font-mono text-xs text-accent">Design placeholder</p>}
          {project.status === "draft" && !project.placeholder && <p className="mb-2 font-mono text-xs text-accent">Draft case study · details pending</p>}
          <h3 id={titleId} className="text-2xl font-semibold tracking-tight sm:text-3xl">{project.title}</h3>
          <p className="mt-3 max-w-3xl text-base leading-7 text-muted">{project.summary}</p>
          {variant === "collection" && project.caseStudy?.contribution && <p className="mt-4 max-w-3xl text-base leading-7"><span className="mb-1 block font-mono text-xs text-accent">My contribution</span>{project.caseStudy.contribution}</p>}
          <p className="mt-4 max-w-3xl text-base leading-7"><span className="mr-2 text-accent" aria-hidden="true">↳</span>{project.outcome}</p>
        </div>
        {project.tags.length > 0 && <ul aria-label={`${project.title} technologies`} className="flex flex-wrap gap-2 font-mono text-xs text-muted">
          {project.tags.map((tag) => <li key={tag} className="rounded border border-border px-3 py-2">{tag}</li>)}
        </ul>}
        {project.stackNote && <p className="font-mono text-xs text-muted">{project.stackNote}</p>}
        <div className="mt-auto flex flex-wrap gap-3 font-mono text-sm">
          <Link href={`/projects/${project.slug}`} className="inline-flex min-h-12 items-center gap-2 rounded border border-accent/40 px-4 text-accent hover:border-accent hover:bg-surface-raised" aria-label={`Project page preview for ${project.title}`}>Project page preview <span aria-hidden="true">→</span></Link>
          {project.links.live && <a href={project.links.live} className="inline-flex min-h-12 items-center rounded bg-accent px-4 text-accent-foreground hover:bg-foreground" aria-label={`Live demo of ${project.title}`}>Live demo ↗</a>}
          {project.links.github && <a href={project.links.github} className="inline-flex min-h-12 items-center rounded border border-border px-4 hover:border-accent hover:text-accent" aria-label={`Source code for ${project.title}`}>Source code ↗</a>}
        </div>
        {variant === "homepage" && project.caseStudy && <details className="group border-t border-border pt-4">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-mono text-sm text-accent [&::-webkit-details-marker]:hidden">
            {project.status === "draft" ? "Case-study preview" : "Behind the build"}
            <span aria-hidden="true" className="group-open:rotate-45 motion-safe:transition-transform">+</span>
          </summary>
          <ProjectCaseStudyContent study={project.caseStudy} outcome={project.outcome} />
        </details>}
      </div>
    </article>
  );
}
