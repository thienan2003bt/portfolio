"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { CodeExample } from "@/content/types";

export function CodeShowcase({ examples }: { examples: readonly CodeExample[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  if (!examples.length) return null;

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowRight": next = (index + 1) % examples.length; break;
      case "ArrowLeft": next = (index - 1 + examples.length) % examples.length; break;
      case "Home": next = 0; break;
      case "End": next = examples.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="min-w-0">
      <div role="tablist" aria-label="Code examples by technology" className="mb-4 flex flex-wrap gap-2 font-mono text-xs">
        {examples.map((example, index) => (
          <button key={example.id} type="button" role="tab" id={`${id}-tab-${example.id}`} aria-controls={`${id}-panel-${example.id}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} ref={(node) => { tabs.current[index] = node; }} onClick={() => setActive(index)} onKeyDown={(event) => onKeyDown(event, index)} className={`min-h-11 rounded border px-3 font-medium ${active === index ? "border-accent bg-accent text-accent-foreground" : "border-border text-muted hover:border-accent hover:text-foreground"}`}>
            {example.technology}
          </button>
        ))}
      </div>
      {examples.map((example, index) => (
        <div key={example.id} role="tabpanel" id={`${id}-panel-${example.id}`} aria-labelledby={`${id}-tab-${example.id}`} hidden={active !== index} tabIndex={0} className="overflow-hidden rounded-lg border border-border bg-surface">
          <div className="flex flex-wrap justify-between gap-2 border-b border-border px-5 py-4 font-mono text-xs text-muted">
            <span className="break-all">{example.filename}</span><span>Complete sample file</span>
          </div>
          <pre tabIndex={0} aria-label={`${example.technology} complete sample file`} className="h-[27rem] overflow-auto overscroll-contain p-5 font-mono text-[13px] leading-7 sm:text-sm"><code className="block w-max min-w-full">{example.code.split("\n").map((line, lineIndex) => (
            <span key={lineIndex} className="block"><span aria-hidden="true" className="mr-5 inline-block w-5 select-none text-right text-muted/70">{lineIndex + 1}</span><span className={line.trimStart().startsWith("//") ? "text-muted" : /^(import|export|type)/.test(line) ? "text-accent" : "text-foreground"}>{line || " "}</span></span>
          ))}</code></pre>
          <p className="min-h-24 border-t border-border px-5 py-4 text-sm leading-6 text-muted">{example.principle}</p>
        </div>
      ))}
    </div>
  );
}
