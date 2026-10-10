import Image from "next/image";
import type { Project } from "@/content/types";

export function ProjectCard({ project }: { project: Project }) {
  const titleId = `project-${project.slug}`;

  return (
    <article aria-labelledby={titleId} className={`flex min-w-0 flex-col overflow-hidden rounded-lg border bg-surface ${project.featured ? "border-accent/50 md:col-span-2" : "border-border"}`}>
      {project.image && (
        <div className="border-b border-border bg-surface-raised p-4 sm:p-6">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes={project.featured ? "(max-width: 1152px) 100vw, 1088px" : "(max-width: 768px) 100vw, 544px"}
            className="h-auto w-full rounded object-contain"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-muted">
          <span>{project.role} · {project.year}</span>
          {project.featured && <span className="rounded border border-accent/40 px-2 py-1 text-accent">Featured project</span>}
        </div>
        <div>
          <h3 id={titleId} className="text-2xl font-semibold tracking-tight sm:text-3xl">{project.title}</h3>
          <p className="mt-3 max-w-3xl text-base leading-7 text-muted">{project.summary}</p>
          <p className="mt-4 max-w-3xl text-base leading-7"><span className="mr-2 text-accent" aria-hidden="true">↳</span>{project.outcome}</p>
        </div>
        <ul aria-label={`${project.title} technologies`} className="flex flex-wrap gap-2 font-mono text-xs text-muted">
          {project.tags.map((tag) => <li key={tag} className="rounded border border-border px-3 py-2">{tag}</li>)}
        </ul>
        <div className="mt-auto flex flex-wrap gap-3 font-mono text-sm">
          {project.links.live && <a href={project.links.live} className="inline-flex min-h-12 items-center rounded bg-accent px-4 text-accent-foreground hover:bg-foreground" aria-label={`Live demo of ${project.title}`}>Live demo ↗</a>}
          {project.links.github && <a href={project.links.github} className="inline-flex min-h-12 items-center rounded border border-border px-4 hover:border-accent hover:text-accent" aria-label={`Source code for ${project.title}`}>Source code ↗</a>}
          {project.caseStudy && <a href={`#case-study-${project.slug}`} className="inline-flex min-h-12 items-center px-2 text-accent underline-offset-4 hover:underline" aria-label={`Read the ${project.title} case study`}>Read case study ↓</a>}
        </div>
      </div>
    </article>
  );
}
