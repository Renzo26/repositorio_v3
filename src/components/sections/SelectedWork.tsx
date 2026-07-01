import { useRef } from "react";
import { Container } from "@/components/common/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/animations/gsap";
import { revealBatch, revealText } from "@/animations/sectionReveals";
import { projects } from "@/data/projects";
import { ProjectChapter } from "./ProjectChapter";

export function SelectedWork() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, (scope) => {
    revealBatch(scope, { start: "top 82%" });

    // Subtle zoom-out reveal on each project cover.
    scope.querySelectorAll<HTMLElement>("[data-cover]").forEach((cover) => {
      gsap.from(cover, {
        scale: 1.05,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: cover, start: "top 85%", once: true },
      });
    });

    return revealText(scope);
  });

  return (
    <section ref={root} id="work" className="relative py-28 lg:py-36">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div data-reveal>
            <SectionLabel index="02" total="06">
              Trabalhos Selecionados
            </SectionLabel>
          </div>
          <p
            data-reveal-lines
            className="max-w-xs text-pretty text-sm leading-relaxed text-text-secondary"
          >
            Três sistemas, lidos como{" "}
            <span className="text-pastel-lilac">capítulos</span> — produtos, a
            plataforma por baixo deles e o ecossistema ao redor.
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
