"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import ArcDivider from "@/components/ui/ArcDivider";
import type { Project } from "@/types/project";

interface ProjectHeroProps {
  project: Project;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="relative flex h-[70vh] min-h-[480px] w-full items-end overflow-hidden bg-charcoal-deep">
      <Image
        src={project.coverImage}
        alt={project.name}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/50 to-charcoal-deep/10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 pt-32 lg:px-10"
      >
        <span className="inline-flex rounded-full bg-stone-light px-4 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-charcoal-deep">
          {project.statusLabel}
        </span>

        <h1 className="font-display mt-6 max-w-2xl text-4xl font-semibold uppercase leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          {project.name}
        </h1>

        <div className="mt-5 flex items-center gap-2 text-sm text-white/80">
          <MapPin className="h-4 w-4" strokeWidth={1.5} />
          {project.location}
        </div>

        <ArcDivider tone="paper" className="mt-8" />
      </motion.div>
    </section>
  );
}
