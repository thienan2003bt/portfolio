import type { ProjectCaseStudy } from "@/content/types";

export function ProjectCaseStudyContent({ study }: { study: ProjectCaseStudy }) {
  return (
    <div className="pt-6">
      <div className="grid gap-6 md:grid-cols-2">
        {[["Context", study.context], ["Contribution", study.contribution], ["Technical decision", study.decision], ["Outcome", study.outcome]].map(([heading, body]) => (
          <div key={heading}><h4 className="mb-2 font-medium">{heading}</h4><p className="text-sm leading-7 text-muted">{body}</p></div>
        ))}
      </div>
      <h4 className="mt-6 mb-3 font-medium">Architecture</h4>
      <ol className="grid gap-3 md:grid-cols-3">
        {study.architecture.map((step, index) => <li key={step} className="rounded border border-border bg-background p-4 text-sm leading-6 text-muted"><span className="mb-2 block font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>{step}</li>)}
      </ol>
    </div>
  );
}
