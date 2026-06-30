import { useRef } from "react";
import { Container } from "@/components/common/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { useGsap } from "@/hooks/useGsap";
import { useCoreSection } from "@/hooks/useCoreSection";
import { revealBatch, revealText } from "@/animations/sectionReveals";
import { site } from "@/data/site";

export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useCoreSection(root, "manifesto");
  useGsap(root, (scope) => {
    revealBatch(scope, { start: "top 75%" });
    return revealText(scope);
  });

  return (
    <section ref={root} id="manifesto" className="relative py-28 lg:py-44">
      <Container>
        <SectionLabel index="01" total="06">
          Manifesto
        </SectionLabel>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <h2
            data-reveal-title
            className="text-balance lg:col-span-9 text-[clamp(1.9rem,4.6vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-text-primary"
          >
            <span className="text-text-muted">
              A tecnologia não deveria apenas funcionar.
            </span>
            <br />
            Ela deveria <span className="text-pastel-lilac">conectar</span>{" "}
            pessoas, processos
            <br />e decisões.
          </h2>

          <div className="lg:col-span-3 lg:pt-3">
            <p
              data-reveal
              className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-text-muted"
            >
              Sobre o trabalho
            </p>
            <p
              data-reveal-lines
              className="text-pretty mt-4 text-sm leading-relaxed text-text-secondary"
            >
              {site.manifesto.body}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
