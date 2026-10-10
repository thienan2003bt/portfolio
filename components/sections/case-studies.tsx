import type { Project } from "@/content/types";

export function CaseStudies({ projects }: { projects: readonly Project[] }) {
  const studies = projects.filter((project) => project.caseStudy);
  if (studies.length === 0) return null;

  return (
    <section aria-labelledby="case-studies-heading" className="border-t border-border py-14 sm:py-20">
      <h2 id="case-studies-heading" className="mb-8 text-3xl font-semibold tracking-tight sm:text-4xl">Behind the build</h2>
      <div className="space-y-12">
        {studies.map((project) => {
          const study = project.caseStudy!;
          return (
            <article id={`case-study-${project.slug}`} key={project.slug} aria-labelledby={`study-title-${project.slug}`} className="scroll-mt-24 rounded-lg border border-border bg-surface p-6 sm:p-8">
              <p className="mb-3 font-mono text-xs text-accent">Case study · {project.year}</p>
              <h3 id={`study-title-${project.slug}`} className="text-2xl font-semibold tracking-tight sm:text-3xl">{project.title}</h3>
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                {[["The context", study.context], ["My contribution", study.contribution], ["A technical decision", study.decision], ["The outcome", study.outcome]].map(([heading, body]) => (
                  <div key={heading}>
                    <h4 className="mb-3 font-medium">{heading}</h4>
                    <p className="text-base leading-7 text-muted">{body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-t border-border pt-6">
                <h4 className="mb-4 font-medium">Architecture</h4>
                <ol className="flex flex-col gap-3 md:flex-row md:flex-wrap">
                  {study.architecture.map((step, index) => <li key={`${index}-${step}`} className="min-w-0 flex-1 rounded border border-border bg-background p-4 text-sm leading-6"><span className="mb-2 block font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>{step}</li>)}
                </ol>
                <p className="mt-5 font-mono text-xs leading-6 text-muted">{project.tags.join(" / ")}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
