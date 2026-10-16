import type { Project } from "./types";

// One catalog for homepage selections, the collection, and detail routes.
// Webshare editorial source: content/documents/webshare-space.md.
// Keep the public selection consistent with that brief and owner confirmations.
export const projects: readonly Project[] = ([
  {
    slug: "webshare-space",
    title: "Webshare.space",
    status: "draft",
    type: "company",
    summary: "A file-sharing web app that encrypts files in the sender's browser and decrypts them in the recipient's browser.",
    outcome: "62% smaller initial gzipped JavaScript in build measurements; transfers tested up to 15 GB in sandbox.",
    role: "Full-stack Developer",
    period: "Apr 2025 — present",
    periodNote: "Started approximately April 15, 2025; involvement is ongoing.",
    tags: ["Vite", "React", "JavaScript", "Rust", "Actix"],
    stackNote: "Frontend: Vite, React, and JavaScript. Backend: Rust with Actix; my backend contribution includes multipart-upload code.",
    selected: true,
    order: 1,
    featured: true,
    // The owner requests naming the product without an external product link.
    links: {},
    caseStudy: {
      context: "Webshare lets senders create a share, add files, and send a link. Recipients open the share, decrypt files in their browser, and save them. This case study describes implemented work; production deployment has not been confirmed.",
      contribution: "I own the entire frontend as a Full-stack Developer. I integrated browser-side encryption, built multipart upload across the browser and Rust backend, rebuilt downloads to recover from interruptions, and reduced unnecessary initial JavaScript loading.",
      collaboration: "I work in a small startup team. Most of my work is on the frontend, and I rarely touch the Rust backend. The backend code for multipart upload is my own work.",
      contributions: [
        {
          title: "Resumable downloads",
          summary: "I rebuilt recipient downloads to recover from interruptions. Downloads can also recover across page reloads on supported browsers.",
        },
        {
          title: "Multipart upload",
          summary: "I built multipart upload across the browser and Rust backend, connecting the frontend transfer flow with backend upload handling.",
        },
        {
          title: "Browser-side encryption",
          summary: "I integrated browser-side encryption into the web client so files are encrypted before upload and decrypted in the recipient's browser.",
        },
        {
          title: "Frontend performance and loading",
          summary: "I reduced unnecessary initial JavaScript loading in the web app.",
        },
      ],
      outcomes: [
        {
          result: "62% smaller initial JavaScript payload (gzip).",
          evidence: "Build measurement from the project's production-build comparison. This measures the initial bundle size.",
        },
        {
          result: "Encrypted transfers tested up to 15 GB.",
          evidence: "Sandbox test results reported in the project evidence brief. This is a tested transfer size, not a production file-size limit.",
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
