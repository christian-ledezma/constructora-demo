import SectionEyebrow from "@/components/ui/SectionEyebrow";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ProjectCard from "@/components/home/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  return (
    <section id="proyectos" className="scroll-mt-24 bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealOnScroll>
          <SectionEyebrow>Proyectos disponibles</SectionEyebrow>
          <h2 className="font-display mt-6 max-w-xl text-4xl font-semibold uppercase tracking-tight text-ink sm:text-5xl">
            Dos formas de habitar Cochabamba
          </h2>
        </RevealOnScroll>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {projects.map((project, index) => (
            <RevealOnScroll key={project.slug} delay={index * 0.1}>
              <ProjectCard project={project} priority={index === 0} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
