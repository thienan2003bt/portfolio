import type { Project } from "./types";

// One catalog for homepage selections, the collection, and detail routes.
// Suggested narratives are explicitly labeled and must be verified before launch.
const contributionDraftNotice = "The problem, approach, reasoning, trade-off, and verification below are illustrative suggestions. Replace them with what actually happened before publishing.";
export const projects: readonly Project[] = ([
  {
    slug: "webshare-space",
    title: "Webshare.space",
    status: "draft",
    type: "company",
    summary: "A browser-based app for sharing files in private, temporary spaces.",
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
      context: "Webshare is a company web application for sharing files through a browser in private, temporary spaces.",
      contribution: "I own the entire frontend as a Full-stack Developer. My work includes end-to-end encryption, multipart upload, resumable download, and Core Web Vitals performance improvements.",
      collaboration: "I work in a small startup team. Most of my work is on the frontend, and I rarely touch the Rust backend. The backend code for multipart upload is my own work.",
      contributions: [
        {
          title: "End-to-end encryption",
          summary: "My work on Webshare includes end-to-end encryption.",
          draftNotice: contributionDraftNotice,
          problem: "Draft assumption: encryption needed to fit the file-sharing flow without making transfers confusing or difficult to recover when an error occurred.",
          change: "Suggested approach: connect encryption and decryption to the transfer interface, with clear progress and failure states. Update this with the exact part I implemented.",
          reasoning: "Suggested reasoning: privacy-related work should fit an understandable sharing flow, so users can tell when a transfer is ready and when it needs attention.",
          tradeOff: "Potential trade-off to confirm: processing files in the browser can add work on slower devices, while more detailed error handling adds complexity to the interface.",
          evidence: "Consider checking successful transfers, failed decryption, and error messages with non-sensitive sample files. Record only checks actually performed; do not imply a security audit.",
        },
        {
          title: "Multipart upload",
          summary: "I worked on multipart upload, including writing its backend code.",
          draftNotice: contributionDraftNotice,
          problem: "Draft assumption: uploading a file as one long operation made interruptions expensive and progress difficult to communicate.",
          change: "Suggested approach: coordinate multipart transfers between the frontend and backend, show overall progress, and handle failed parts. Confirm how retries, cancellation, and completion actually worked.",
          reasoning: "Suggested reasoning: handling a transfer in smaller parts can make failures easier to isolate and progress easier to explain than restarting one large request.",
          tradeOff: "Potential trade-off to confirm: more requests and transfer state can improve recovery but require extra coordination and cleanup when a transfer fails or is cancelled.",
          evidence: "Consider an interrupted upload, a failed part, cancellation, and a completed file-integrity check. Replace these suggestions with the actual checks and observed behavior.",
        },
        {
          title: "Resumable download",
          summary: "I worked on resumable download for file transfers.",
          draftNotice: contributionDraftNotice,
          problem: "Draft assumption: interrupted downloads forced recipients to restart, wasting time and repeating transferred data.",
          change: "Suggested approach: retain enough progress information to continue an interrupted download, show its state, and explain when restarting is necessary. Confirm which interruptions were actually supported.",
          reasoning: "Suggested reasoning: recovery should reduce repeated work while making the download's current state and next action clear to the recipient.",
          tradeOff: "Potential trade-off to confirm: keeping recovery state adds complexity, particularly when a shared file is no longer available or encryption affects how a transfer can continue.",
          evidence: "Consider interrupting a download, attempting to continue it, checking an unavailable file, and comparing the completed file with the original. Document the actual recovery limits.",
        },
        {
          title: "Core Web Vitals performance improvements",
          summary: "I worked on performance improvements focused on Core Web Vitals.",
          draftNotice: contributionDraftNotice,
          problem: "Draft assumption: a key page loaded slowly, responded late to interaction, or shifted while rendering. Identify the real page and metric before making this specific.",
          change: "Suggested approach: measure the page, identify the largest source of delay or instability, and reduce unnecessary loading or rendering work. Replace this with the actual bottleneck and code change.",
          reasoning: "Suggested reasoning: improve the measured user-facing bottleneck first, then compare the same page under comparable conditions rather than optimizing from intuition alone.",
          tradeOff: "Potential trade-off to confirm: delaying less urgent work may improve the initial experience but add loading states or make later interactions more complex.",
          evidence: "Record the metric, page, device, measurement method, and before/after conditions. Distinguish lab runs from field data; no improvement score or percentage is claimed yet.",
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
