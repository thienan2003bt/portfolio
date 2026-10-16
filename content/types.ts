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

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type ProjectContribution = {
  title: string;
  summary: string;
  draftNotice?: string;
  problem?: string;
  change?: string;
  reasoning?: string;
  tradeOff?: string;
  evidence?: string;
};

export type ProjectDecision = {
  title: string;
  choice: string;
  alternatives?: readonly string[];
  reasoning?: string;
  tradeOff?: string;
};

export type ProjectChallenge = {
  title: string;
  problem: string;
  investigation?: string;
  solution?: string;
  validation?: string;
};

export type ProjectOutcome = {
  result: string;
  evidence?: string;
};

export type ProjectMilestone = {
  period: string;
  title: string;
  description: string;
};

export type ProjectCaseStudy = {
  context?: string;
  contribution?: string;
  decision?: string;
  architecture?: readonly string[];
  outcome?: string;
  constraints?: readonly string[];
  collaboration?: string;
  contributions?: readonly ProjectContribution[];
  decisions?: readonly ProjectDecision[];
  challenges?: readonly ProjectChallenge[];
  outcomes?: readonly ProjectOutcome[];
  limitations?: readonly string[];
  lessons?: readonly string[];
  milestones?: readonly ProjectMilestone[];
};

export type Project = {
  status: "draft" | "published";
  placeholder?: boolean;
  slug: string;
  title: string;
  summary: string;
  outcome?: string;
  role: string;
  period: string;
  periodNote?: string;
  type?: "company" | "personal" | "open-source";
  tags: readonly string[];
  stackNote?: string;
  selected: boolean;
  order: number;
  featured: boolean;
  links: { live?: string; github?: string };
  image?: ProjectImage;
  gallery?: readonly ProjectImage[];
  caseStudy?: ProjectCaseStudy;
};

export type ProjectCollectionContent = {
  title: string;
  description: string;
  draftNotice: string;
  featuredHeading: string;
  remainingHeading: string;
  allProjectsHeading: string;
  emptyMessage: string;
};

export type ProjectDetailContent = {
  draftNotice: string;
  placeholderNotice: string;
  mediaPlaceholder: string;
  typeLabels: Record<NonNullable<Project["type"]>, string>;
  headings: {
    overview: string;
    context: string;
    role: string;
    contributions: string;
    decisions: string;
    architecture: string;
    challenges: string;
    outcomes: string;
    lessons: string;
    milestones: string;
    gallery: string;
  };
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
