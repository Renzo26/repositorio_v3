import { Container } from "@/components/common/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { techCategories } from "@/data/technologies";
import { projects } from "@/data/projects";
import { ACCENT_VAR } from "@/types";
import { site } from "@/data/site";

const titleBySlug: Record<string, string> = Object.fromEntries(
  projects.map((p) => [p.slug, p.title]),
);

export function TechnicalEcosystem() {
  return (
    <section id="ecosystem" className="relative py-28 lg:py-36">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionLabel index="04" total="06">
            Technical Ecosystem
          </SectionLabel>
          <p className="max-w-xs text-pretty text-sm leading-relaxed text-text-secondary">
            A working map, grouped by area. Each technology connects to the
            projects it ships in.
          </p>
        </div>

        {/* Center identity */}
        <div className="mt-16 flex flex-col items-center text-center lg:mt-20">
          <span
            aria-hidden
            className="mb-5 size-2 rounded-full bg-pastel-lilac"
          />
          <h3 className="text-[clamp(1.8rem,4vw,3rem)] font-medium leading-none tracking-[-0.02em] text-text-primary">
            {site.name}
          </h3>
          <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-text-muted">
            Software Engineering
          </p>
        </div>

        {/* Connector */}
        <div
          aria-hidden
          className="mx-auto mt-8 h-12 w-px bg-gradient-to-b from-border-primary to-transparent"
        />

        {/* Category map — hairline grid */}
        <div className="grid grid-cols-1 gap-px border border-border-secondary bg-border-secondary sm:grid-cols-2 lg:grid-cols-5">
          {techCategories.map((cat) => {
            const accent = ACCENT_VAR[cat.accent];
            return (
              <div
                key={cat.id}
                className="bg-background-secondary p-6 lg:p-7"
              >
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  <h4
                    className="font-mono text-[0.7rem] uppercase tracking-[0.18em]"
                    style={{ color: accent }}
                  >
                    {cat.label}
                  </h4>
                </div>

                <ul className="mt-5 flex flex-col gap-px">
                  {cat.items.map((tech) => {
                    const related = tech.projects
                      .map((s) => titleBySlug[s])
                      .filter(Boolean)
                      .join(" · ");
                    return (
                      <li key={tech.name}>
                        <button
                          type="button"
                          title={`Used in: ${related}`}
                          className="group/tech flex w-full items-center justify-between gap-2 py-1.5 text-left text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
                          style={
                            { "--tw-accent": accent } as React.CSSProperties
                          }
                        >
                          <span className="transition-colors group-hover/tech:[color:var(--tw-accent)]">
                            {tech.name}
                          </span>
                          <span className="font-mono text-[0.6rem] text-text-muted opacity-0 transition-opacity group-hover/tech:opacity-100">
                            {tech.projects.length.toString().padStart(2, "0")}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
