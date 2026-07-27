import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectFacts from "@/components/project/ProjectFacts";
import Gallery from "@/components/project/Gallery";
import VirtualTour from "@/components/project/VirtualTour";
import { getProjectBySlug, projects } from "@/data/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Proyecto no encontrado | Bernales Constructora" };
  }

  return {
    title: `${project.name} | Bernales Constructora`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <ProjectHero project={project} />
      <ProjectFacts project={project} />
      <Gallery projectName={project.name} images={project.gallery} />
      <VirtualTour projectName={project.name} panoramas={project.tour360} />

      <div className="bg-paper py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Link
            href="/#proyectos"
            className="inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.2em] text-ink/70 transition-colors hover:text-charcoal"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            Volver a proyectos
          </Link>
        </div>
      </div>
    </>
  );
}
