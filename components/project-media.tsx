import Image from "next/image";
import type { ProjectImage } from "@/content/types";

export function ProjectMedia({ image, eager = false }: { image: ProjectImage; eager?: boolean }) {
  return (
    <figure className="min-w-0">
      <div className="overflow-hidden rounded-lg border border-border bg-surface p-3 sm:p-5">
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 1152px) 100vw, 1088px" loading={eager ? "eager" : "lazy"} className="h-auto w-full rounded object-contain" />
      </div>
      {image.caption && <figcaption className="mt-3 max-w-3xl text-sm leading-7 text-muted">{image.caption}</figcaption>}
    </figure>
  );
}
