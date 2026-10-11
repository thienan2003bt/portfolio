import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/coming-soon";
import { reservedPages } from "@/content/coming-soon";

type Props = { params: Promise<{ path: string[] }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return reservedPages.map((page) => ({ path: page.path.split("/") }));
}

async function getPage(params: Props["params"]) {
  const { path } = await params;
  const page = reservedPages.find((entry) => entry.path === path.join("/"));
  if (!page) notFound();
  return page;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPage(params);
  return { title: `${page.title} | Coming soon`, description: page.description, robots: { index: false, follow: true } };
}

export default async function ReservedPage({ params }: Props) {
  const page = await getPage(params);
  return <ComingSoon title={page.title} description={page.description} />;
}
