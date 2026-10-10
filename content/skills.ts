import type { SkillGroup } from "./types";

export const skills: readonly SkillGroup[] = [
  {
    id: "frontend", title: "Frontend",
    description: "The interface: structure, interaction, and the experience in the browser.",
    items: ["React", "Next.js", "JavaScript", "TypeScript"],
  },
  {
    id: "backend", title: "Backend",
    description: "The application behind the interface, built with the JavaScript and TypeScript ecosystem.",
    items: ["Express.js", "NestJS", "TypeScript"],
  },
  {
    id: "practices", title: "Practices in this portfolio",
    description: "Explore the page itself: keyboard-accessible interactions, typed content, responsive layouts, and server-rendered sections.",
    items: ["Accessibility", "Typed content", "Responsive UI", "Server rendering"],
  },
];
