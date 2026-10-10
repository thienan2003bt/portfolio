import type { CodeExample } from "./types";

export const codeExamples: readonly CodeExample[] = [
  {
    id: "react",
    technology: "React",
    filename: "search-field.tsx",
    principle: "Accessible by default. Stable IDs, explicit labels, native semantics.",
    code: `import { useId } from "react";

export function SearchField() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Search projects</label>
      <input id={id} name="q" type="search" />
    </div>
  );
}`,
  },
  {
    id: "next",
    technology: "Next.js",
    filename: "projects/[slug]/page.tsx",
    principle: "Resolve content on the server. Missing records get a real 404.",
    code: `import { notFound } from "next/navigation";
import { projects } from "@/content/projects";

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();

  return <h1>{project.title}</h1>;
}`,
  },
  {
    id: "typescript",
    technology: "TypeScript",
    filename: "result.ts",
    principle: "Model success and failure explicitly. Narrow types before using data.",
    code: `type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

export function map<T, U>(
  result: Result<T>,
  transform: (value: T) => U,
): Result<U> {
  if (!result.ok) return result;

  return { ok: true, value: transform(result.value) };
}`,
  },
  {
    id: "express",
    technology: "Express",
    filename: "pagination.ts",
    principle: "Validate at the boundary. Reject ambiguous input and cap page sizes.",
    code: `import type { RequestHandler } from "express";

export const pagination: RequestHandler =
  (req, res, next) => {
    const raw = req.query.limit ?? "20";
    if (typeof raw !== "string" ||
        !/^[1-9]\\d{0,2}$/.test(raw) ||
        Number(raw) > 100) {
      res.status(400).json({ error: "Invalid limit" });
      return;
    }
    res.locals.limit = Number(raw);
    next();
  };`,
  },
  {
    id: "nestjs",
    technology: "NestJS",
    filename: "project-id.dto.ts",
    principle: "Validate route inputs with a reusable DTO and the framework's validation pipe.",
    code: `import { IsUUID } from "class-validator";
import { ValidationPipe } from "@nestjs/common";

export class ProjectIdParams {
  @IsUUID("4")
  id!: string;
}

// Register during application bootstrap.
export const validation = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
});`,
  },
];
