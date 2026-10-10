import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { hero } from "@/content/hero";
import { site } from "@/content/site";

export default function Home() {
  return (
    <div id="home" className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 sm:px-8">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-accent focus:px-5 focus:py-3 focus:text-accent-foreground">
        Skip to content
      </a>
      <Header site={site} />
      <main id="main" tabIndex={-1} className="flex-1">
        <Hero site={site} content={hero} />
        <Contact site={site} />
      </main>
      <Footer site={site} />
    </div>
  );
}
