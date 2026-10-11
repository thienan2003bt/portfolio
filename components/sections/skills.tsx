"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { SkillGroup } from "@/content/types";

export function Skills({ groups }: { groups: readonly SkillGroup[] }) {
  const [open, setOpen] = useState<string | null>(groups[0]?.id ?? null);
  const id = useId();
  const reducedMotion = useReducedMotion();
  if (!groups.length) return null;

  return (
    <section id="skills" aria-labelledby="skills-heading" className="grid gap-10 border-t border-border py-14 sm:py-20 lg:grid-cols-[1fr_2fr] lg:gap-16">
      <div>
        <p className="mb-3 font-mono text-xs text-accent">01 / Interface → application</p>
        <h2 id="skills-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">The stack.</h2>
        <p className="mt-4 max-w-sm text-base leading-7 text-muted">From the browser to the logic behind it. Open a layer to take a closer look.</p>
      </div>
      <div className="border-l border-border pl-6 sm:pl-8">
        {groups.map((group, index) => {
          const expanded = open === group.id;
          return (
            <div key={group.id} className="relative border-b border-border py-5 first:pt-0 last:border-b-0">
              <span aria-hidden="true" className={`absolute -left-[29px] h-2 w-2 rounded-full border sm:-left-[37px] ${index === 0 ? "top-2" : "top-7"} ${expanded ? "border-accent bg-accent" : "border-muted bg-background"}`} />
              <h3>
                <button id={`${id}-trigger-${group.id}`} type="button" aria-expanded={expanded} aria-controls={`${id}-panel-${group.id}`} onClick={() => setOpen(expanded ? null : group.id)} className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-4 text-left">
                  <span><span className="mb-1 block font-mono text-xs text-muted">Layer {String(index + 1).padStart(2, "0")}</span><span className="text-xl font-semibold tracking-tight sm:text-2xl">{group.title}</span></span>
                  <span aria-hidden="true" className="font-mono text-xl text-accent">{expanded ? "−" : "+"}</span>
                </button>
              </h3>
              <motion.div id={`${id}-panel-${group.id}`} role="region" aria-labelledby={`${id}-trigger-${group.id}`} aria-hidden={!expanded} inert={!expanded} initial={false} animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }} className="overflow-hidden">
                <div className="pt-5">
                  <p className="max-w-xl text-base leading-7 text-muted">{group.description}</p>
                  <ul aria-label={`${group.title} skills`} className="mt-4 flex flex-wrap gap-2 font-mono text-xs">
                    {group.items.map((item) => <li key={item} className="rounded border border-border bg-surface px-3 py-2">{item}</li>)}
                  </ul>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
