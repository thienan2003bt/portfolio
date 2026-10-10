export type SiteContent = {
  name: string;
  role: string;
  email: string;
  github: string;
};

export type HeroContent = {
  headline: string;
  description: string;
  examples: readonly CodeExample[];
  contactLabel: string;
  githubLabel: string;
  workLabel: string;
};

export type CodeExample = {
  id: string;
  technology: string;
  filename: string;
  principle: string;
  code: string;
};

export type ProjectCaseStudy = {
  context: string;
  contribution: string;
  decision: string;
  architecture: readonly string[];
  outcome: string;
};

export type Project = {
  placeholder?: boolean;
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

export type SkillGroup = {
  id: string;
  title: string;
  description: string;
  items: readonly string[];
};

export type AboutContent = {
  title: string;
  paragraphs: readonly string[];
};

export type ExperienceEntry = {
  id: string;
  company: string;
  title: string;
  dates: string;
  bullets: readonly string[];
  stack: readonly string[];
};
