import type { SkillGroup } from "@/content/types";

export function Skills({ groups }: { groups: readonly SkillGroup[] }) {
  if (!groups.length) return null;
  return (
    <section id="skills" aria-labelledby="skills-heading" className="grid gap-10 border-t border-border py-14 sm:py-20 lg:grid-cols-[1fr_2fr] lg:gap-16">
      <div>
        <p className="mb-3 font-mono text-xs text-accent">01 / Interface → application</p>
        <h2 id="skills-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">The stack.</h2>
        <p className="mt-4 max-w-sm text-base leading-7 text-muted">From the browser to the logic behind it. Open a layer to take a closer look.</p>
      </div>
      <div className="border-l border-border pl-6 sm:pl-8">
        {groups.map((group, index) => (
          <details key={group.id} open={index === 0} className="group relative border-b border-border py-5 first:pt-0 last:border-b-0">
            <span aria-hidden="true" className={`absolute -left-[29px] h-2 w-2 rounded-full border border-muted bg-background group-open:border-accent group-open:bg-accent sm:-left-[37px] ${index === 0 ? "top-2" : "top-7"}`} />
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <span><span className="mb-1 block font-mono text-xs text-muted">Layer {String(index + 1).padStart(2, "0")}</span><span className="text-xl font-semibold tracking-tight sm:text-2xl">{group.title}</span></span>
              <span aria-hidden="true" className="font-mono text-xl text-accent group-open:hidden">+</span>
              <span aria-hidden="true" className="hidden font-mono text-xl text-accent group-open:block">−</span>
            </summary>
            <div className="pt-5">
              <p className="max-w-xl text-base leading-7 text-muted">{group.description}</p>
              <ul aria-label={`${group.title} skills`} className="mt-4 flex flex-wrap gap-2 font-mono text-xs">
                {group.items.map((item) => <li key={item} className="rounded border border-border bg-surface px-3 py-2">{item}</li>)}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
