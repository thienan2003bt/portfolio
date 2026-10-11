import type { ReactNode } from "react";
import type { Project, ProjectDetailContent } from "@/content/types";
import { ProjectMedia } from "./project-media";

type StorySection = { id: keyof ProjectDetailContent["headings"]; body: ReactNode };

function Points({ items }: { items?: readonly string[] }) {
  if (!items?.length) return null;
  return <ul className="list-disc space-y-3 pl-5 text-base leading-8 text-muted">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function Notes({ items }: { items: readonly (readonly [string, string | undefined])[] }) {
  const populated = items.filter(([, value]) => value);
  if (!populated.length) return null;
  return <dl className="mt-5 space-y-4">{populated.map(([label, value]) => <div key={label}><dt className="mb-1 text-sm font-medium">{label}</dt><dd className="text-base leading-8 text-muted">{value}</dd></div>)}</dl>;
}

export function ProjectStory({ project, content }: { project: Project; content: ProjectDetailContent }) {
  const study = project.caseStudy;
  const sections: StorySection[] = [{
    id: "overview",
    body: <Notes items={[["The product", project.summary], ["My contribution", study?.contribution], ["The result", study?.outcome ?? project.outcome]]} />,
  }];

  if (study?.context || study?.constraints?.length) sections.push({
    id: "context",
    body: <div className="space-y-5">{study.context && <p className="text-base leading-8 text-muted">{study.context}</p>}<Points items={study.constraints} /></div>,
  });
  if (study?.contribution || study?.collaboration) sections.push({
    id: "role",
    body: <div className="space-y-5">{study.contribution && <p className="text-base leading-8 text-muted">{study.contribution}</p>}{study.collaboration && <p className="text-base leading-8 text-muted">{study.collaboration}</p>}</div>,
  });
  if (study?.contributions?.length) sections.push({
    id: "contributions",
    body: <div className="space-y-8">{study.contributions.map((contribution, index) => (
      <div key={contribution.title} className="border-l border-accent/40 pl-5 sm:pl-6">
        <p className="mb-2 font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</p>
        <h3 className="text-xl font-semibold tracking-tight">{contribution.title}</h3>
        <p className="mt-3 text-base leading-8 text-muted">{contribution.summary}</p>
        {contribution.draftNotice && <p className="mt-4 rounded border border-accent/25 bg-surface px-4 py-3 text-sm leading-7 text-muted"><span className="mb-1 block font-mono text-xs text-accent">Suggested narrative · update later</span>{contribution.draftNotice}</p>}
        <Notes items={[["Problem", contribution.problem], ["My change", contribution.change], ["Reasoning", contribution.reasoning], ["Trade-off", contribution.tradeOff], [contribution.draftNotice ? "Suggested verification" : "Evidence", contribution.evidence]]} />
      </div>
    ))}</div>,
  });
  if (study?.decision || study?.decisions?.length) sections.push({
    id: "decisions",
    body: <div className="space-y-8">
      {study.decision && <p className="text-base leading-8 text-muted">{study.decision}</p>}
      {study.decisions?.map((decision) => <div key={decision.title}><h3 className="text-xl font-semibold">{decision.title}</h3><Notes items={[["Choice", decision.choice], ["Reasoning", decision.reasoning], ["Trade-off", decision.tradeOff]]} />{!!decision.alternatives?.length && <div className="mt-5"><h4 className="mb-3 text-sm font-medium">Alternatives considered</h4><Points items={decision.alternatives} /></div>}</div>)}
    </div>,
  });
  if (study?.architecture?.length) sections.push({
    id: "architecture",
    body: <ol className="space-y-3">{study.architecture.map((step, index) => <li key={step} className="flex gap-4 rounded border border-border bg-surface p-5 text-base leading-8 text-muted"><span className="shrink-0 font-mono text-sm text-accent">{String(index + 1).padStart(2, "0")}</span><span className="min-w-0">{step}</span></li>)}</ol>,
  });
  if (study?.challenges?.length) sections.push({
    id: "challenges",
    body: <div className="space-y-8">{study.challenges.map((challenge) => <div key={challenge.title}><h3 className="text-xl font-semibold">{challenge.title}</h3><Notes items={[["Problem", challenge.problem], ["Investigation", challenge.investigation], ["Solution", challenge.solution], ["Validation", challenge.validation]]} /></div>)}</div>,
  });
  if (study?.outcome || project.outcome || study?.outcomes?.length) sections.push({
    id: "outcomes",
    body: <div className="space-y-5">{(study?.outcome ?? project.outcome) && <p className="text-base leading-8 text-muted">{study?.outcome ?? project.outcome}</p>}{study?.outcomes?.map((outcome) => <div key={outcome.result}><p className="text-base leading-8">{outcome.result}</p><Notes items={[["Evidence", outcome.evidence]]} /></div>)}</div>,
  });
  if (study?.limitations?.length || study?.lessons?.length) sections.push({
    id: "lessons",
    body: <div className="space-y-6">{!!study.limitations?.length && <div><h3 className="mb-3 text-xl font-semibold">Remaining limitations</h3><Points items={study.limitations} /></div>}{!!study.lessons?.length && <div><h3 className="mb-3 text-xl font-semibold">What I learned</h3><Points items={study.lessons} /></div>}</div>,
  });
  if (study?.milestones?.length) sections.push({
    id: "milestones",
    body: <ol className="space-y-6 border-l border-border pl-5">{study.milestones.map((milestone) => <li key={`${milestone.period}-${milestone.title}`}><p className="mb-2 font-mono text-sm text-accent">{milestone.period}</p><h3 className="text-xl font-semibold">{milestone.title}</h3><p className="mt-3 text-base leading-8 text-muted">{milestone.description}</p></li>)}</ol>,
  });
  if (project.gallery?.length) sections.push({
    id: "gallery",
    body: <div className="space-y-8">{project.gallery.map((image) => <ProjectMedia key={image.src} image={image} />)}</div>,
  });

  const showContents = sections.length >= 4;
  return (
    <div className={`border-t border-border py-12 sm:py-16 ${showContents ? "lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12" : ""}`}>
      {showContents && <aside className="mb-10 self-start rounded border border-border bg-surface p-5 lg:sticky lg:top-8 lg:mb-0">
        <nav aria-labelledby="project-contents-heading">
          <h2 id="project-contents-heading" className="mb-3 font-mono text-sm font-medium">In this project</h2>
          <ol className="space-y-1">{sections.map((section) => <li key={section.id}><a href={`#story-${section.id}`} className="flex min-h-11 items-center text-sm leading-6 text-muted hover:text-accent">{content.headings[section.id]}</a></li>)}</ol>
        </nav>
      </aside>}
      <div className="min-w-0 max-w-3xl space-y-12 [overflow-wrap:anywhere] sm:space-y-16">
        {sections.map((section) => <section key={section.id} id={`story-${section.id}`} aria-labelledby={`story-${section.id}-heading`}><h2 id={`story-${section.id}-heading`} className="mb-5 text-2xl font-semibold tracking-tight sm:text-3xl">{content.headings[section.id]}</h2>{section.body}</section>)}
      </div>
    </div>
  );
}
