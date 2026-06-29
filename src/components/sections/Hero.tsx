import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { AnimatedLink } from "@/components/common/AnimatedLink";
import { SystemCorePlaceholder } from "@/components/three/SystemCorePlaceholder";
import { useLocalTime } from "@/hooks/useLocalTime";
import { site } from "@/data/site";

const metaClass =
  "font-mono text-[0.7rem] uppercase tracking-[0.2em] text-text-muted";

export function Hero() {
  const localTime = useLocalTime();

  return (
    <section
      id="hero"
      className="relative grain flex min-h-screen flex-col justify-center overflow-hidden pt-24 pb-16"
    >
      {/* faint blueprint backdrop, fades toward edges */}
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]"
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Text block */}
          <div className="min-w-0 lg:col-span-7">
            <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-text-secondary">
                {site.name}
              </span>
              <span aria-hidden className="h-3 w-px bg-border-primary" />
              <span className={metaClass}>{site.title}</span>
              <span aria-hidden className="h-3 w-px bg-border-primary" />
              <span className={metaClass}>{site.location}</span>
            </div>

            <h1 className="text-balance text-[clamp(1.85rem,7.5vw,5.4rem)] font-medium leading-[0.98] tracking-[-0.03em] text-text-primary sm:leading-[0.96]">
              {site.hero.headline.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <span className="block">{line}</span>
                </span>
              ))}
            </h1>

            <p className="text-pretty mt-8 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
              {site.hero.support}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
              {site.hero.technologies.map((tech, i) => (
                <span key={tech} className="flex items-center gap-3">
                  {i > 0 && (
                    <span aria-hidden className="size-1 rounded-full bg-border-primary" />
                  )}
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-text-muted">
                    {tech}
                  </span>
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <AnimatedLink
                to="/#work"
                className="font-mono text-xs uppercase tracking-[0.18em]"
              >
                Explore projects
                <ArrowDownRight size={15} />
              </AnimatedLink>
              <AnimatedLink
                to="/about"
                className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary hover:text-text-primary"
              >
                About me
              </AnimatedLink>
              <AnimatedLink
                href="#"
                external
                className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary hover:text-text-primary"
              >
                GitHub
                <ArrowUpRight size={14} />
              </AnimatedLink>
              <AnimatedLink
                href="#"
                external
                className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary hover:text-text-primary"
              >
                LinkedIn
                <ArrowUpRight size={14} />
              </AnimatedLink>
            </div>
          </div>

          {/* System Core */}
          <div className="relative lg:col-span-5">
            <div className="mx-auto w-[min(82%,30rem)] lg:w-full lg:scale-110 lg:translate-x-4">
              <SystemCorePlaceholder accent="pastel-lilac" />
            </div>
          </div>
        </div>
      </Container>

      {/* Availability bar */}
      <Container className="relative z-10 mt-16">
        <div className="flex flex-col gap-3 border-t border-border-secondary pt-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2.5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-text-secondary">
            <span
              aria-hidden
              className="size-1.5 rounded-full bg-pastel-sage animate-pulse"
            />
            {site.availability}
          </span>
          <span className={metaClass}>
            Local time {localTime} · {site.timezone}
          </span>
        </div>
      </Container>
    </section>
  );
}
