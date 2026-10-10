export type SiteContent = {
  name: string;
  role: string;
  email: string;
  github: string;
};

export type HeroContent = {
  headline: string;
  description: string;
  technologies: readonly string[];
  contactLabel: string;
  githubLabel: string;
  workLabel: string;
};

export type ProjectCaseStudy = {
  context: string;
  contribution: string;
  decision: string;
  architecture: readonly string[];
  outcome: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  outcome: string;
  role: string;
  year: string;
  tags: readonly string[];
  featured: boolean;
  links: { live?: string; github?: string };
  image?: { src: string; alt: string; width: number; height: number };
  caseStudy?: ProjectCaseStudy;
};
