"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import { Images as ImagesIcon } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";

interface GalleryProps {
  projectName: string;
  images: readonly string[];
}

/**
 * Grid + per-cell classes for each possible thumbnail count (1 to 5).
 * Chosen so the mosaic never leaves an empty cell, whatever the photo
 * count for a given project. Projects with more than 5 photos show
 * the first 5 here; every photo is still reachable through the
 * lightbox via the "ver todas las fotos" button.
 */
const LAYOUTS: Record<
  number,
  { wrapper: string; cell: (index: number) => string }
> = {
  1: {
    wrapper: "grid grid-cols-1 aspect-[16/10]",
    cell: () => "",
  },
  2: {
    wrapper: "grid grid-cols-2 gap-2 aspect-[16/7]",
    cell: () => "",
  },
  3: {
    wrapper: "grid grid-cols-3 grid-rows-2 gap-2 aspect-[16/9]",
    cell: (index) => (index === 0 ? "col-span-2 row-span-2" : ""),
  },
  4: {
    wrapper: "grid grid-cols-2 grid-rows-2 gap-2 aspect-[16/9]",
    cell: () => "",
  },
  5: {
    wrapper: "grid grid-cols-4 grid-rows-2 gap-2 aspect-[16/7]",
    cell: (index) => (index === 0 ? "col-span-2 row-span-2" : ""),
  },
};

interface ThumbnailProps {
  src: string;
  index: number;
  projectName: string;
  onSelect: (index: number) => void;
  className?: string;
  sizes: string;
}

function Thumbnail({
  src,
  index,
  projectName,
  onSelect,
  className,
  sizes,
}: ThumbnailProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      className={cn(
        "group relative block h-full w-full overflow-hidden",
        className,
      )}
      aria-label={`Ver foto ${index + 1} de ${projectName} en pantalla completa`}
    >
      <Image
        src={src}
        alt={`${projectName} — fotografía ${index + 1}`}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-charcoal-deep/0 transition-colors group-hover:bg-charcoal-deep/15" />
    </button>
  );
}

export default function Gallery({ projectName, images }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visible = images.slice(0, 5);
  const layout = LAYOUTS[visible.length] ?? LAYOUTS[5];

  return (
    <section className="bg-charcoal-deep py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealOnScroll>
          <SectionEyebrow tone="paper">Galería</SectionEyebrow>
          <h2 className="font-display mt-6 max-w-xl text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl">
            Cada espacio, en detalle
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="relative mt-14">
          {/* Mobile: single lead photo, full width */}
          <div className="aspect-[4/3] sm:hidden">
            <Thumbnail
              src={visible[0]}
              index={0}
              projectName={projectName}
              onSelect={setLightboxIndex}
              sizes="100vw"
            />
          </div>

          {/* Tablet and up: adaptive mosaic */}
          <div className={cn("hidden sm:grid", layout.wrapper)}>
            {visible.map((src, index) => (
              <Thumbnail
                key={src}
                src={src}
                index={index}
                projectName={projectName}
                onSelect={setLightboxIndex}
                className={layout.cell(index)}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            ))}
          </div>

          {images.length > 1 && (
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.15em] text-charcoal-deep shadow-lg transition-transform hover:scale-105"
            >
              <ImagesIcon className="h-4 w-4" strokeWidth={1.5} />
              Ver las {images.length} fotos
            </button>
          )}
        </RevealOnScroll>
      </div>

      <Lightbox
        open={lightboxIndex !== null}
        close={() => setLightboxIndex(null)}
        index={lightboxIndex ?? 0}
        slides={images.map((src) => ({
          src,
          alt: `${projectName} — fotografía`,
        }))}
        plugins={[Thumbnails, Zoom, Counter]}
        styles={{
          container: { backgroundColor: "rgba(28, 29, 33, 0.97)" },
        }}
      />
    </section>
  );
}
