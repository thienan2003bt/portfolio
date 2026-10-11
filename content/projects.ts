import type { Project } from "./types";

// One catalog for homepage selections, the future collection, and detail routes.
// Draft prompts are intentional; replace them with approved facts before launch.
export const projects: readonly Project[] = ([
  {
    slug: "webshare-space",
    title: "Webshare.space",
    status: "draft",
    type: "company",
    summary: "A browser-based app for sharing files in private, temporary spaces.",
    outcome: "Outcome — placeholder: add a verified improvement and supporting evidence.",
    role: "Full-stack Developer",
    period: "Apr 2025 — present",
    periodNote: "Started approximately April 15, 2025; involvement is ongoing.",
    tags: [],
    stackNote: "Stack — to confirm",
    selected: true,
    order: 1,
    featured: true,
    // The owner requests naming the product without an external product link.
    links: {},
    caseStudy: {
      context: "Webshare is a company web application for private, temporary file sharing. Context — to confirm: intended users, the starting point, and project constraints.",
      contribution: "I am responsible for the entire frontend. My work includes end-to-end encryption, multipart upload, resumable download, and Core Web Vitals performance improvements. Implementation details and results are still to be documented.",
      decision: "Technical decision — placeholder: explain one choice, the alternatives considered, and the trade-offs.",
      architecture: ["Architecture — placeholder: add confirmed components and their responsibilities."],
      collaboration: "Team and backend scope — to confirm.",
      contributions: [
        {
          title: "End-to-end encryption",
          summary: "Contribution reported by the owner. Details — placeholder: explain personal scope, the difficult part, and how correctness was checked.",
        },
        {
          title: "Multipart upload",
          summary: "Contribution reported by the owner. Details — placeholder: explain the original problem, upload handling, and validation.",
        },
        {
          title: "Resumable download",
          summary: "Contribution reported by the owner. Details — placeholder: explain interrupted downloads, progress recovery, and an edge case.",
        },
        {
          title: "Core Web Vitals performance improvements",
          summary: "Contribution reported by the owner. Details — placeholder: identify the metric, the change, and the measurement method before adding results.",
        },
      ],
    },
  },
  {
    slug: "project-two", title: "Project two", status: "draft", placeholder: true,
    summary: "A frontend project. The interface, users, and core challenge will go here.",
    outcome: "Outcome to be added", role: "Role to be added", period: "Year TBD",
    tags: ["Interface", "Accessibility"], selected: true, order: 2, featured: false, links: {},
  },
  {
    slug: "project-three", title: "Project three", status: "draft", placeholder: true,
    summary: "A backend project. The service boundaries and engineering decisions will go here.",
    outcome: "Outcome to be added", role: "Role to be added", period: "Year TBD",
    tags: ["API", "Data"], selected: true, order: 3, featured: false, links: {},
  },
] satisfies readonly Project[]).sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));

export function selectHomepageProjects(catalog: readonly Project[]): readonly Project[] {
  return catalog
    .filter((project) => project.selected)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order || a.slug.localeCompare(b.slug));
}

export const selectedProjects: readonly Project[] = selectHomepageProjects(projects);
