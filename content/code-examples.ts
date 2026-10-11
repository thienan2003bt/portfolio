import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { CodeExample } from "./types";

const samples = [
  { id: "react", technology: "React", filename: "search-field.tsx", principle: "Debounced search, request cancellation, validated responses, and accessible status updates." },
  { id: "next", technology: "Next.js", filename: "project-page.tsx", principle: "A complete server-rendered page with static paths, metadata, and explicit 404 handling." },
  { id: "typescript", technology: "TypeScript", filename: "pagination.ts", principle: "Untrusted input becomes a typed result. Validation and error handling stay explicit." },
  { id: "express", technology: "Express", filename: "projects-router.ts", principle: "An injected repository, bounded pagination, and centralized error reporting." },
  { id: "nestjs", technology: "NestJS", filename: "projects.module.ts", principle: "A complete module with controller, service, repository adapter, and validated route inputs." },
] as const;

// Read only on the server. Samples are display assets, not application services.
export const codeExamples: readonly CodeExample[] = samples.map((sample) => ({
  ...sample,
  code: readFileSync(join(process.cwd(), "content", "samples", `${sample.filename}.txt`), "utf8").replace(/\r\n/g, "\n").trimEnd(),
}));
