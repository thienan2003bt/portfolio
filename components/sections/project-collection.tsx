import { ProjectCard } from "@/components/project-card";
import type { Project, ProjectCollectionContent } from "@/content/types";

export function ProjectCollection({ projects, content }: { projects: readonly Project[]; content: ProjectCollectionContent }) {
  const featured = projects.find((project) => project.featured);
  const remaining = projects.filter((project) => project.slug !== featured?.slug);
  const hasDrafts = projects.some((project) => project.status === "draft" || project.placeholder);

  return (
    <>
      <section aria-labelledby="projects-heading" className="border-t border-border pt-10 pb-12 sm:pt-14 sm:pb-16">
        <p className="mb-4 font-mono text-sm text-accent">Project collection</p>
        <h1 id="projects-heading" className="text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">{content.title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">{content.description}</p>
        {hasDrafts && <p className="mt-8 max-w-3xl rounded border border-border bg-surface px-5 py-4 text-sm leading-7 text-muted"><span className="mr-2 font-mono text-xs text-accent">Design preview</span>{content.draftNotice}</p>}
      </section>
      {featured && (
        <section aria-labelledby="featured-work-heading" className="pb-12 sm:pb-16">
          <h2 id="featured-work-heading" className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">{content.featuredHeading}</h2>
          <ProjectCard project={featured} variant="collection" />
        </section>
      )}
      {remaining.length > 0 && (
        <section aria-labelledby="more-projects-heading" className="border-t border-border pt-10 pb-14 sm:pt-12 sm:pb-20">
          <h2 id="more-projects-heading" className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">{featured ? content.remainingHeading : content.allProjectsHeading}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {remaining.map((project) => <ProjectCard key={project.slug} project={project} variant="collection" />)}
          </div>
        </section>
      )}
      {projects.length === 0 && <p className="max-w-2xl pb-14 text-base leading-8 text-muted sm:pb-20">{content.emptyMessage}</p>}
    </>
  );
}
