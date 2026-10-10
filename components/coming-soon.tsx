import Image from "next/image";
import Link from "next/link";
import { Header } from "./sections/header";
import { Footer } from "./sections/footer";
import { site } from "@/content/site";

export function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 sm:px-8">
      <Header site={site} hasProjects homePath="/" />
      <main className="flex flex-1 flex-col items-center justify-center py-16 text-center sm:py-24">
        <Image src="/icon.svg" alt="" width={64} height={64} className="mb-8" />
        <p className="mb-4 font-mono text-sm text-accent">{title} / In progress</p>
        <h1 className="text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">Good things take shape.</h1>
        <p className="mt-6 max-w-lg text-base leading-8 text-muted sm:text-lg">{description}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3 font-mono text-sm">
          <Link href="/" className="inline-flex min-h-12 items-center rounded bg-accent px-5 text-accent-foreground hover:bg-foreground">Back to the homepage</Link>
          <a href={`mailto:${site.email}`} className="inline-flex min-h-12 items-center rounded border border-border px-5 hover:border-accent hover:text-accent">Get in touch ↗</a>
        </div>
        <p className="mt-10 max-w-full break-all font-mono text-xs text-muted">{site.email}</p>
      </main>
      <Footer site={site} />
    </div>
  );
}
