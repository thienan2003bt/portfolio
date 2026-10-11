import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/content/types";
import Link from "next/link";

export function SelectedWork({ projects }: { projects: readonly Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section id="work" aria-labelledby="work-heading" className="border-t border-border py-14 sm:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 id="work-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">Selected work</h2>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <p className="font-mono text-sm text-muted">The problem. The contribution. The result.</p>
          <Link href="/projects" className="inline-flex min-h-11 items-center gap-2 font-mono text-sm text-accent hover:text-foreground">View all projects <span aria-hidden="true">→</span></Link>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
      </div>
    </section>
  );
}
