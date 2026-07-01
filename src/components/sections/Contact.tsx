import { Fragment, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Highlight } from "@/components/common/Highlight";
import { Button } from "@/components/common/Button";
import { AnimatedLink } from "@/components/common/AnimatedLink";
import { SystemCorePlaceholder } from "@/components/three/SystemCorePlaceholder";
import { useGsap } from "@/hooks/useGsap";
import { useCoreSection } from "@/hooks/useCoreSection";
import { useSystemCore } from "@/contexts/SystemCoreContext";
import { revealBatch, revealText } from "@/animations/sectionReveals";
import { socialLinks } from "@/data/socialLinks";
import { site } from "@/data/site";

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const { enabled } = useSystemCore();

  useCoreSection(root, "contact");
  useGsap(root, (scope) => {
    revealBatch(scope, { start: "top 80%" });
    return revealText(scope);
  });

  return (
    <section
      ref={root}
      id="contact"
      className="relative overflow-hidden py-32 lg:py-48"
    >
      {/* Core returns to the center of the composition.
          With 3D on, the global canvas core centers here instead. */}
      {!enabled && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid place-items-center"
        >
          <SystemCorePlaceholder
            accent="pastel-lilac"
            className="w-[min(120%,52rem)] opacity-[0.16]"
          />
        </div>
      )}

      <Container className="relative z-10">
        <div data-reveal>
          <SectionLabel index="06" total="06">
            Contato
          </SectionLabel>
        </div>

        <h2
          data-reveal-title
          className="text-balance mt-10 text-[clamp(2rem,8.5vw,6rem)] font-medium leading-[0.98] tracking-[-0.03em] text-text-primary sm:leading-[0.95]"
        >
          {site.contact.headline.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              <Highlight text={line} terms={["útil"]} />
            </Fragment>
          ))}
        </h2>

        <p
          data-reveal-lines
          className="text-pretty mt-8 max-w-lg text-base leading-relaxed text-text-secondary sm:text-lg"
        >
          {site.contact.body}
        </p>

        <div data-reveal className="mt-10 flex flex-wrap items-center gap-6">
          <Button href={`mailto:${site.email}`} size="md">
            {site.contact.cta}
            <ArrowUpRight size={15} />
          </Button>
          <AnimatedLink
            href={`mailto:${site.email}`}
            className="font-mono text-xs uppercase tracking-[0.16em] text-text-secondary hover:text-text-primary"
          >
            {site.email}
          </AnimatedLink>
        </div>

        <nav
          data-reveal
          aria-label="Onde me encontrar"
          className="mt-16 flex flex-wrap gap-x-10 gap-y-4 border-t border-border-secondary pt-8"
        >
          {socialLinks
            .filter((s) => s.label !== "E-mail")
            .map((s) => (
              <AnimatedLink
                key={s.label}
                href={s.href}
                external={s.href.startsWith("http")}
                className="group font-mono text-[0.72rem] uppercase tracking-[0.18em] text-text-secondary hover:text-text-primary"
              >
                {s.label}
                {s.handle && (
                  <span className="ml-2 text-text-muted">{s.handle}</span>
                )}
              </AnimatedLink>
            ))}
        </nav>
      </Container>
    </section>
  );
}
