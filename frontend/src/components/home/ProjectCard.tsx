import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({ project, priority }: ProjectCardProps) {
  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="group relative flex aspect-[4/5] w-full flex-col justify-end overflow-hidden bg-charcoal-deep sm:aspect-[3/4]"
    >
      <Image
        src={project.coverImage}
        alt={project.name}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 45vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/50 to-transparent" />

      <span
        className={cn(
          "absolute left-6 top-6 font-display text-[10px] font-semibold uppercase tracking-[0.25em]",
          "bg-stone-light text-charcoal-deep rounded-full px-4 py-1.5",
        )}
      >
        {project.statusLabel}
      </span>

      <div className="relative z-10 flex flex-col gap-4 p-6 sm:p-8">
        <h3 className="font-display text-2xl font-semibold uppercase tracking-wide text-white sm:text-3xl">
          {project.name}
        </h3>
        <p className="text-sm leading-relaxed text-white/75 sm:text-base">
          {project.tagline}
        </p>
        <span className="mt-2 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors group-hover:text-stone">
          Ver proyecto
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            strokeWidth={1.5}
          />
        </span>
      </div>
    </Link>
  );
}
