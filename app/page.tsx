import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { hero } from "@/content/hero";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { SelectedWork } from "@/components/sections/selected-work";
import { CaseStudies } from "@/components/sections/case-studies";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { SectionReveal } from "@/components/section-reveal";
import { about } from "@/content/about";
import { experience } from "@/content/experience";
import { skills } from "@/content/skills";

export default function Home() {
  return (
    <div id="home" className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 sm:px-8">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-accent focus:px-5 focus:py-3 focus:text-accent-foreground">
        Skip to content
      </a>
      <Header site={site} hasProjects={projects.length > 0} />
      <main id="main" tabIndex={-1} className="flex-1">
        <Hero site={site} content={hero} hasProjects={projects.length > 0} />
        <SectionReveal><SelectedWork projects={projects} /></SectionReveal>
        <SectionReveal><CaseStudies projects={projects} /></SectionReveal>
        {experience.length > 0 && <SectionReveal><Experience entries={experience} /></SectionReveal>}
        <SectionReveal><Skills groups={skills} /></SectionReveal>
        <SectionReveal><About content={about} site={site} /></SectionReveal>
        <SectionReveal><Contact site={site} /></SectionReveal>
      </main>
      <Footer site={site} />
    </div>
  );
}
