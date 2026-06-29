import { Container } from "@/components/common/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { site } from "@/data/site";

export function Manifesto() {
  return (
    <section id="manifesto" className="relative py-28 lg:py-44">
      <Container>
        <SectionLabel index="01" total="06">
          Manifesto
        </SectionLabel>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <h2 className="text-balance lg:col-span-9 text-[clamp(1.9rem,4.6vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            <span className="block overflow-hidden">
              <span className="block text-text-muted">
                Technology should not only work.
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block text-text-primary">
                It should{" "}
                <span className="text-pastel-lilac">connect</span> people,
                processes
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block text-text-primary">and decisions.</span>
            </span>
          </h2>

          <div className="lg:col-span-3 lg:pt-3">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-text-muted">
              On the work
            </p>
            <p className="text-pretty mt-4 text-sm leading-relaxed text-text-secondary">
              {site.manifesto.body}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
