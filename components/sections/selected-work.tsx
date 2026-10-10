import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/content/types";

export function SelectedWork({ projects }: { projects: readonly Project[] }) {
  if (projects.length === 0) return null;

  const ordered = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <section id="work" aria-labelledby="work-heading" className="border-t border-border py-14 sm:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 id="work-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">Selected work</h2>
        <p className="font-mono text-sm text-muted">The problem. The contribution. The result.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {ordered.map((project) => <ProjectCard key={project.slug} project={project} />)}
      </div>
    </section>
  );
}
