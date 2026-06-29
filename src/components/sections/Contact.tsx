import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Button } from "@/components/common/Button";
import { AnimatedLink } from "@/components/common/AnimatedLink";
import { SystemCorePlaceholder } from "@/components/three/SystemCorePlaceholder";
import { socialLinks } from "@/data/socialLinks";
import { site } from "@/data/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-32 lg:py-48"
    >
      {/* Core returns to the center of the composition */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid place-items-center"
      >
        <SystemCorePlaceholder
          accent="pastel-lilac"
          className="w-[min(120%,52rem)] opacity-[0.16]"
        />
      </div>

      <Container className="relative z-10">
        <SectionLabel index="06" total="06">
          Contact
        </SectionLabel>

        <h2 className="text-balance mt-10 text-[clamp(2rem,8.5vw,6rem)] font-medium leading-[0.98] tracking-[-0.03em] text-text-primary sm:leading-[0.95]">
          {site.contact.headline.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>

        <p className="text-pretty mt-8 max-w-lg text-base leading-relaxed text-text-secondary sm:text-lg">
          {site.contact.body}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
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
          aria-label="Elsewhere"
          className="mt-16 flex flex-wrap gap-x-10 gap-y-4 border-t border-border-secondary pt-8"
        >
          {socialLinks
            .filter((s) => s.label !== "Email")
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
