import type { ExperienceEntry } from "@/content/types";

export function Experience({ entries }: { entries: readonly ExperienceEntry[] }) {
  if (!entries.length) return null;
  return (
    <section id="experience" aria-labelledby="experience-heading" className="border-t border-border py-14 sm:py-20">
      <h2 id="experience-heading" className="mb-10 text-3xl font-semibold tracking-tight sm:text-4xl">Experience</h2>
      <div className="space-y-10">
        {entries.map((entry) => (
          <article key={entry.id} className="grid gap-6 border-l border-accent pl-6 lg:grid-cols-[1fr_2fr]">
            <div><p className="mb-2 font-mono text-sm text-muted">{entry.dates}</p><h3 className="text-xl font-semibold">{entry.title}</h3><p className="mt-1 text-muted">{entry.company}</p></div>
            <div><ul className="list-disc space-y-3 pl-5 text-base leading-7 text-muted">{entry.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul><p className="mt-5 font-mono text-xs leading-6 text-accent">{entry.stack.join(" / ")}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
