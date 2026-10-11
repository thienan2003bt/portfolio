import Link from "next/link";
import type { Project, ProjectDetailContent } from "@/content/types";
import { ProjectMedia } from "@/components/project-media";
import { ProjectStory } from "@/components/project-story";

export function ProjectDetail({ project, content }: { project: Project; content: ProjectDetailContent }) {
  return (
    <article aria-labelledby="project-heading">
      <header className="border-t border-border pt-10 pb-10 sm:pt-14 sm:pb-12">
        <p className="mb-4 font-mono text-sm text-accent">{project.placeholder ? "Design placeholder" : project.status === "draft" ? "Draft case study" : "Project case study"}</p>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
          <div className="min-w-0">
            <h1 id="project-heading" className="text-4xl font-semibold tracking-[-0.055em] [overflow-wrap:anywhere] sm:text-6xl">{project.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">{project.summary}</p>
            {project.caseStudy?.contribution && <p className="mt-5 max-w-2xl text-base leading-8"><span className="mb-1 block font-mono text-xs text-accent">My contribution</span>{project.caseStudy.contribution}</p>}
            <div className="mt-6 flex flex-wrap gap-3 font-mono text-sm">
              <Link href="/projects" className="inline-flex min-h-12 items-center gap-2 rounded border border-accent/40 px-4 text-accent hover:border-accent hover:bg-surface-raised"><span aria-hidden="true">←</span> All projects</Link>
              {project.links.live && <a href={project.links.live} className="inline-flex min-h-12 items-center rounded border border-border px-4 hover:border-accent hover:text-accent">Visit project ↗</a>}
              {project.links.github && <a href={project.links.github} className="inline-flex min-h-12 items-center rounded border border-border px-4 hover:border-accent hover:text-accent">Source code ↗</a>}
            </div>
          </div>
          <dl className="space-y-5 rounded-lg border border-border bg-surface p-6 text-sm leading-7">
            <div><dt className="mb-1 font-mono text-xs text-muted">Role</dt><dd>{project.role}</dd></div>
            <div><dt className="mb-1 font-mono text-xs text-muted">Period</dt><dd>{project.period}{project.periodNote && <span className="mt-1 block text-xs leading-6 text-muted">{project.periodNote}</span>}</dd></div>
            {project.type && <div><dt className="mb-1 font-mono text-xs text-muted">Project type</dt><dd>{content.typeLabels[project.type]}</dd></div>}
            {(project.tags.length > 0 || project.stackNote) && <div><dt className="mb-2 font-mono text-xs text-muted">Stack</dt><dd>{project.tags.length > 0 && <ul className="flex flex-wrap gap-2">{project.tags.map((tag) => <li key={tag} className="rounded border border-border px-2 py-1 font-mono text-xs">{tag}</li>)}</ul>}{project.stackNote && <p className="mt-2 text-muted">{project.stackNote}</p>}</dd></div>}
          </dl>
        </div>
        {(project.status === "draft" || project.placeholder) && <p className="mt-8 rounded border border-accent/25 bg-surface px-5 py-4 text-sm leading-7 text-muted">{project.placeholder ? content.placeholderNotice : content.draftNotice}</p>}
      </header>
      {(project.image || project.status === "draft" || project.placeholder) && <div className="pb-10 sm:pb-12">
        {project.image ? <ProjectMedia image={project.image} eager /> : (project.status === "draft" || project.placeholder) && <figure>
          <div className="flex aspect-[16/9] items-center justify-center rounded-lg border border-dashed border-border bg-surface p-6 sm:aspect-[16/7]">
            <div className="text-center"><span className="mb-3 block font-mono text-xs text-accent">{project.title} / preview</span><p className="text-xl font-medium sm:text-2xl">Product screenshot — placeholder</p></div>
          </div>
          <figcaption className="mt-3 max-w-3xl text-sm leading-7 text-muted">{content.mediaPlaceholder}</figcaption>
        </figure>}
      </div>}
      <ProjectStory project={project} content={content} />
    </article>
  );
}
