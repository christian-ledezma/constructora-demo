"use client";

import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { Move3d } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const PANO_LANG = {
  zoom: "Zoom",
  move: "Mover",
  download: "Descargar",
  fullscreen: "Pantalla completa",
  menu: "Menú",
  close: "Cerrar",
  twoFingers: "Usa dos dedos para navegar",
  ctrlZoom: "Usa ctrl + scroll para hacer zoom",
  loadError: "No se pudo cargar la panorámica",
};

interface VirtualTourProps {
  projectName: string;
  panoramas: readonly [string, string];
}

export default function VirtualTour({
  projectName,
  panoramas,
}: VirtualTourProps) {
  return (
    <section className="bg-paper py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealOnScroll>
          <SectionEyebrow>Recorrido virtual</SectionEyebrow>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display max-w-xl text-4xl font-semibold uppercase tracking-tight text-ink sm:text-5xl">
              Tour 360°
            </h2>
            <p className="flex items-center gap-2 text-sm text-ink/60">
              <Move3d className="h-4 w-4" strokeWidth={1.5} />
              Arrastra para mirar alrededor
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {panoramas.map((src, index) => (
            <RevealOnScroll key={src} delay={index * 0.1}>
              <div className="flex flex-col gap-3">
                <div className="aspect-[4/3] w-full overflow-hidden bg-charcoal-deep sm:aspect-[16/10]">
                  <ReactPhotoSphereViewer
                    src={src}
                    height="100%"
                    width="100%"
                    lang={PANO_LANG}
                    navbar={["zoom", "move", "fullscreen"]}
                  />
                </div>
                <span className="font-display text-xs font-medium uppercase tracking-[0.2em] text-ink/60">
                  {projectName} — panorámica {index + 1}
                </span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
