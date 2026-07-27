import SectionEyebrow from "@/components/ui/SectionEyebrow";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import type { Project } from "@/types/project";

interface ProjectFactsProps {
  project: Project;
}

export default function ProjectFacts({ project }: ProjectFactsProps) {
  return (
    <section className="bg-paper py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24 lg:px-10">
        <RevealOnScroll>
          <SectionEyebrow>El proyecto</SectionEyebrow>
          <div className="mt-6 space-y-5">
            {project.description.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-8">
            {project.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-stone">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-lg font-medium text-ink sm:text-xl">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </RevealOnScroll>
      </div>
    </section>
  );
}
