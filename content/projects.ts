import type { Project } from "./types";

// Owner-approved design placeholders. Replace these before public launch.
export const projects: readonly Project[] = [
  {
    slug: "project-one", title: "Project one", placeholder: true,
    summary: "A full-stack project. The real product story will go here.",
    outcome: "Outcome to be added", role: "Role to be added", year: "Year TBD",
    tags: ["Frontend", "API", "Database"], featured: true, links: {},
    caseStudy: {
      context: "Describe who this project is for, the problem they faced, and the constraints that shaped the work.",
      contribution: "Explain what you owned, what you built, and how you worked with others.",
      decision: "Describe a meaningful trade-off, the alternatives considered, and why the chosen approach fit the problem.",
      architecture: ["Interface and user interactions", "Application logic and API boundary", "Persistence and external integrations"],
      outcome: "Add an honest result, supporting evidence, and what you learned from delivering the project.",
    },
  },
  {
    slug: "project-two", title: "Project two", placeholder: true,
    summary: "A frontend project. The interface, users, and core challenge will go here.",
    outcome: "Outcome to be added", role: "Role to be added", year: "Year TBD",
    tags: ["Interface", "Accessibility"], featured: false, links: {},
  },
  {
    slug: "project-three", title: "Project three", placeholder: true,
    summary: "A backend project. The service boundaries and engineering decisions will go here.",
    outcome: "Outcome to be added", role: "Role to be added", year: "Year TBD",
    tags: ["API", "Data"], featured: false, links: {},
  },
];
