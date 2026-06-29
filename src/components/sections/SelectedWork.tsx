import { Container } from "@/components/common/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { projects } from "@/data/projects";
import { ProjectChapter } from "./ProjectChapter";

export function SelectedWork() {
  return (
    <section id="work" className="relative py-28 lg:py-36">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionLabel index="02" total="06">
            Selected Work
          </SectionLabel>
          <p className="max-w-xs text-pretty text-sm leading-relaxed text-text-secondary">
            Three systems, read as chapters — products, the platform beneath
            them, and the ecosystem around them.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-28 lg:mt-24 lg:gap-40">
          {projects.map((project, i) => (
            <ProjectChapter key={project.slug} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
