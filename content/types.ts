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
};
