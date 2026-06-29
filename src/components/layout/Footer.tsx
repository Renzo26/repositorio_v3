import { Container } from "@/components/common/Container";
import { AnimatedLink } from "@/components/common/AnimatedLink";
import { socialLinks } from "@/data/socialLinks";
import { site } from "@/data/site";

const metaClass =
  "font-mono text-[0.7rem] uppercase tracking-[0.2em] text-text-muted";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border-secondary bg-background-primary py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className={`${metaClass} flex items-center gap-2`}>
          <span
            aria-hidden
            className="size-1.5 rounded-full bg-pastel-sage animate-pulse"
          />
          Status do sistema · Online
        </p>

        <nav
          aria-label="Redes sociais"
          className="flex flex-wrap gap-x-6 gap-y-2"
        >
          {socialLinks.map((s) => (
            <AnimatedLink
              key={s.label}
              href={s.href}
              external={s.href.startsWith("http")}
              className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-text-secondary hover:text-text-primary"
            >
              {s.label}
            </AnimatedLink>
          ))}
        </nav>

        <p className={metaClass}>
          © {year} {site.name} · {site.locationShort}
        </p>
      </Container>
    </footer>
  );
}
