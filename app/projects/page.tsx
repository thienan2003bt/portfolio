import type { Metadata } from "next";
import Link from "next/link";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { ProjectCollection } from "@/components/sections/project-collection";
import { projectCollection } from "@/content/project-collection";
import { projects, selectedProjects } from "@/content/projects";
import { site } from "@/content/site";

const title = `${projectCollection.title} | ${site.name}`;
const description = projectCollection.description;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/projects" },
  robots: { index: projects.length > 0 && projects.every((project) => project.status === "published" && !project.placeholder), follow: true },
  openGraph: { title, description, url: "/projects", type: "website", siteName: site.name, images: [{ url: "/opengraph-image", alt: `${site.name} | ${site.role}` }] },
  twitter: { title, description, card: "summary_large_image", images: ["/twitter-image"] },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 sm:px-8">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-accent focus:px-5 focus:py-3 focus:text-accent-foreground">Skip to content</a>
      <Header site={site} hasProjects={selectedProjects.length > 0} homePath="/" currentPage="projects" />
      <main id="main" tabIndex={-1} className="flex-1">
        <nav aria-label="Breadcrumb" className="pb-6 font-mono text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-3">
            <li><Link href="/" className="inline-flex min-h-11 items-center hover:text-accent">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><span aria-current="page">{projectCollection.title}</span></li>
          </ol>
        </nav>
        <ProjectCollection projects={projects} content={projectCollection} />
        <Contact site={site} />
      </main>
      <Footer site={site} />
    </div>
  );
}
