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
            Trabalhos Selecionados
          </SectionLabel>
          <p className="max-w-xs text-pretty text-sm leading-relaxed text-text-secondary">
            Três sistemas, lidos como capítulos — produtos, a plataforma por
            baixo deles e o ecossistema ao redor.
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
