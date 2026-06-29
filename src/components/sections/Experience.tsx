import { useRef } from "react";
import { Container } from "@/components/common/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { TechTag } from "@/components/common/TechTag";
import { useGsap } from "@/hooks/useGsap";
import { useCoreSection } from "@/hooks/useCoreSection";
import { revealBatch } from "@/animations/sectionReveals";
import { experience } from "@/data/experience";
import { cn } from "@/utils/cn";

export function Experience() {
  const root = useRef<HTMLElement>(null);

  useCoreSection(root, "experience");
  useGsap(root, (scope) => {
    revealBatch(scope, { start: "top 80%", stagger: 0.12 });
  });

  return (
    <section ref={root} id="experience" className="relative py-28 lg:py-36">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div data-reveal>
            <SectionLabel index="03" total="06">
              Experiência
            </SectionLabel>
          </div>
          <p
            data-reveal
            className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-text-muted"
          >
            {experience.length} posições · mais recentes primeiro
          </p>
        </div>

        <ol className="relative mt-16 ml-1 border-l border-border-secondary lg:mt-20">
          {experience.map((item) => (
            <li
              key={item.id}
              data-reveal
              className="relative pb-16 pl-8 last:pb-0 sm:pl-12"
            >
              {/* marker */}
              <span
                aria-hidden
                className={cn(
                  "absolute top-1.5 grid -translate-x-1/2 place-items-center",
                  "left-0",
                )}
              >
                <span
                  className={cn(
                    "size-2.5 rounded-full",
                    item.current
                      ? "bg-pastel-sage"
                      : "bg-border-primary",
                  )}
                />
                {item.current && (
                  <span className="absolute size-5 animate-ping rounded-full border border-pastel-sage/40" />
                )}
              </span>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-text-secondary">
                  {item.period}
                </span>
                {item.location && (
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-text-muted">
                    {item.location}
                  </span>
                )}
                {item.current && (
                  <span className="border border-pastel-sage/40 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-pastel-sage">
                    Atual
                  </span>
                )}
              </div>

              <h3 className="mt-3 text-xl font-medium tracking-tight text-text-primary sm:text-2xl">
                {item.role}
                <span className="text-text-muted"> · {item.company}</span>
              </h3>

              <p className="text-pretty mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
                {item.summary}
              </p>

              <ul className="mt-5 grid max-w-2xl gap-2 sm:grid-cols-2">
                {item.responsibilities.map((r) => (
                  <li
                    key={r}
                    className="flex gap-2.5 text-sm leading-relaxed text-text-secondary"
                  >
                    <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-border-primary" />
                    {r}
                  </li>
                ))}
              </ul>

              {item.highlights && item.highlights.length > 0 && (
                <ul className="mt-5 flex flex-col gap-1.5">
                  {item.highlights.map((h) => (
                    <li
                      key={h}
                      className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-text-muted"
                    >
                      → {h}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                {item.technologies.map((t) => (
                  <TechTag key={t}>{t}</TechTag>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
