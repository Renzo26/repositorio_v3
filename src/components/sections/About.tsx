import { Container } from "@/components/common/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { site } from "@/data/site";

export function About() {
  return (
    <section id="about" className="relative py-28 lg:py-36">
      <Container>
        <SectionLabel index="05" total="06">
          Sobre
        </SectionLabel>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          {/* Portrait + meta */}
          <div className="lg:col-span-4">
            <div className="grain relative aspect-[4/5] overflow-hidden border border-border-primary bg-background-secondary">
              <div className="bg-grid absolute inset-0 opacity-30" />
              <div
                className="absolute inset-0 opacity-[0.18]"
                style={{
                  background:
                    "radial-gradient(70% 60% at 50% 30%, var(--color-pastel-peach), transparent 70%)",
                }}
              />
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-text-muted">
                  Retrato
                </span>
              </div>
              <span className="absolute bottom-4 left-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-text-secondary">
                {site.monogram} · {site.locationShort}
              </span>
            </div>

            <dl className="mt-6 flex flex-col gap-3 border-t border-border-secondary pt-6">
              {[
                ["Localização", site.locationShort],
                ["Estúdio", `${site.company.name} · ${site.company.role}`],
                ["Formação", site.about.education],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-text-muted">
                    {label}
                  </dt>
                  <dd className="text-right font-mono text-[0.7rem] uppercase tracking-[0.06em] text-text-secondary">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Editorial text */}
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="text-balance text-[clamp(1.4rem,2.6vw,2.1rem)] font-medium leading-[1.2] tracking-[-0.01em] text-text-primary">
              {site.about.lead}
            </p>

            <div className="mt-8 flex max-w-xl flex-col gap-5">
              {site.about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-pretty text-base leading-relaxed text-text-secondary"
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-10">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-text-muted">
                Interesses
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {site.about.interests.map((interest) => (
                  <li
                    key={interest}
                    className="text-sm text-text-secondary"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
