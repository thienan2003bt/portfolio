import { projects } from "./projects";

export const reservedPages = [
  { path: "about", title: "About", description: "A closer look at my background is on the way." },
  { path: "contact", title: "Contact", description: "A dedicated contact page is on the way. You can already reach me by email." },
  { path: "projects", title: "Projects", description: "The project collection is taking shape. Explore the homepage preview in the meantime." },
  { path: "experience", title: "Experience", description: "A more detailed look at my experience is on the way." },
  { path: "skills", title: "Skills", description: "More technical detail is on the way. The current stack is available on the homepage." },
  { path: "coming-soon", title: "Coming soon", description: "This part of the portfolio is still taking shape." },
  ...projects.map((project) => ({ path: `projects/${project.slug}`, title: project.title, description: "This project's dedicated page is on the way. The homepage has the current preview." })),
] as const;
