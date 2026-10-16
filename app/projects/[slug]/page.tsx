import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { ProjectDetail } from "@/components/sections/project-detail";
import { ProjectCard } from "@/components/project-card";
import { projectDetail } from "@/content/project-detail";
import { projects, selectedProjects } from "@/content/projects";
import { site } from "@/content/site";
import type { Project } from "@/content/types";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

async function getProject(params: Props["params"]): Promise<Project> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  return project;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params);
  const draft = project.status === "draft" || project.placeholder;
  const title = `${project.title}${draft ? " | Draft case study" : ""} | ${site.name}`;
  const description = project.summary;
  const url = `/projects/${project.slug}`;
  return {
    title, description,
    alternates: { canonical: url },
    robots: { index: !draft, follow: true },
    openGraph: { title, description, url, type: "article", siteName: site.name, images: [{ url: "/opengraph-image", alt: `${site.name} | ${site.role}` }] },
    twitter: { title, description, card: "summary_large_image", images: ["/twitter-image"] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProject(params);
  const related = projects.filter((entry) => entry.slug !== project.slug && entry.status === "published" && !entry.placeholder).slice(0, 2);
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 sm:px-8">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-accent focus:px-5 focus:py-3 focus:text-accent-foreground">Skip to content</a>
      <Header site={site} hasProjects={selectedProjects.length > 0} homePath="/" />
      <main id="main" tabIndex={-1} className="flex-1">
        <nav aria-label="Breadcrumb" className="pb-6 font-mono text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-3">
            <li><Link href="/" className="inline-flex min-h-11 items-center hover:text-accent">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/projects" className="inline-flex min-h-11 items-center hover:text-accent">Projects</Link></li>
            <li aria-hidden="true">/</li>
            <li className="min-w-0 [overflow-wrap:anywhere]"><span aria-current="page">{project.title}</span></li>
          </ol>
        </nav>
        <ProjectDetail project={project} content={projectDetail} />
        {related.length > 0 && <section aria-labelledby="related-projects-heading" className="border-t border-border py-12 sm:py-16"><h2 id="related-projects-heading" className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">More work</h2><div className="grid gap-5 md:grid-cols-2">{related.map((entry) => <ProjectCard key={entry.slug} project={entry} variant="collection" />)}</div></section>}
        <div className="border-t border-border py-6"><Link href="/projects" className="inline-flex min-h-12 items-center gap-2 font-mono text-sm text-accent hover:text-foreground"><span aria-hidden="true">←</span> Back to all projects</Link></div>
        <Contact site={site} />
      </main>
      <Footer site={site} />
    </div>
  );
}
