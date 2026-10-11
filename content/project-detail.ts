import type { ProjectDetailContent } from "./types";

export const projectDetail: ProjectDetailContent = {
  draftNotice: "This case study is in progress. My role, stack, and contribution topics are confirmed. Suggested engineering narratives are labeled for revision; their implementation details and results have not been verified.",
  placeholderNotice: "This is a design placeholder, not a published account of real work. The project identity, contribution, and evidence still need to be supplied.",
  mediaPlaceholder: "Product screenshot — placeholder. An approved image and explanatory caption will go here.",
  typeLabels: { company: "Company application", personal: "Personal project", "open-source": "Open-source project" },
  headings: {
    overview: "At a glance",
    context: "Context and constraints",
    role: "My role and collaboration",
    contributions: "Contributions and user flows",
    decisions: "Technical decisions",
    architecture: "Architecture",
    challenges: "Challenges and improvements",
    outcomes: "Outcomes and evidence",
    lessons: "Limitations and lessons",
    milestones: "Project evolution",
    gallery: "Project gallery",
  },
};
