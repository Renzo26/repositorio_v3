import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { ProjectSection } from "@/types";
import { ACCENT_VAR } from "@/types";
import { Seo } from "@/components/layout/Seo";
import { Container } from "@/components/common/Container";
import { TechTag } from "@/components/common/TechTag";
import { AnimatedLink } from "@/components/common/AnimatedLink";
import { SystemCorePlaceholder } from "@/components/three/SystemCorePlaceholder";
import { useGsap } from "@/hooks/useGsap";
import { useCoreSection } from "@/hooks/useCoreSection";
import { revealBatch } from "@/animations/sectionReveals";
import {
  projects,
  projectBySlug,
  projectIndexBySlug,
} from "@/data/projects";
import { site } from "@/data/site";

function CaseStudyBlock({ section }: { section: ProjectSection }) {
  return (
    <div
      data-reveal
      className="grid gap-6 border-t border-border-secondary py-14 lg:grid-cols-12 lg:gap-10"
    >
      <div className="lg:col-span-3">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-text-muted lg:sticky lg:top-24">
          {section.label}
        </p>
      </div>
      <div className="lg:col-span-8">
        {section.title && (
          <h2 className="mb-5 text-2xl font-medium tracking-tight text-text-primary sm:text-[1.7rem]">
            {section.title}
          </h2>
        )}
        <div className="flex max-w-2xl flex-col gap-4">
          {section.body.map((p, i) => (
            <p
              key={i}
              className="text-pretty text-base leading-relaxed text-text-secondary"
            >
              {p}
            </p>
          ))}
        </div>
        {section.bullets && section.bullets.length > 0 && (
          <ul className="mt-6 flex max-w-2xl flex-col gap-2.5">
            {section.bullets.map((b) => (
              <li
                key={b}
                className="flex gap-3 text-base leading-relaxed text-text-secondary"
              >
                <span
                  aria-hidden
                  className="mt-2.5 h-px w-4 shrink-0 bg-border-primary"
                />
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function ProjectPage() {
  const { slug } = useParams();
  const project = slug ? projectBySlug(slug) : undefined;
  const root = useRef<HTMLElement>(null);

  useGsap(
    root,
    (scope) => {
      revealBatch(scope, { start: "top 85%" });
    },
    [slug],
  );
  useCoreSection(root, project?.systemState ?? "hero");

  if (!project) {
    return (
      <div className="grid min-h-[70vh] place-items-center px-6 text-center">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-text-muted">
            404 · Projeto não encontrado
          </p>
          <AnimatedLink
            to="/#work"
            className="mt-4 font-mono text-xs uppercase tracking-[0.18em]"
          >
            <ArrowLeft size={14} /> Voltar aos trabalhos
          </AnimatedLink>
        </div>
      </div>
    );
  }

  const accent = ACCENT_VAR[project.accentColor];
  const idx = projectIndexBySlug(project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article ref={root}>
      <Seo
        title={`${project.title} — ${site.name}`}
        description={project.description}
      />

      {/* Hero */}
      <header className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div
          aria-hidden
          className="bg-grid pointer-events-none absolute inset-0 opacity-25 [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]"
        />
        <Container className="relative z-10">
          <AnimatedLink
            to="/#work"
            className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft size={13} /> Trabalhos Selecionados
          </AnimatedLink>

          <div className="mt-10 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em]">
            <span style={{ color: accent }}>Projeto {project.id}</span>
            <span aria-hidden className="h-px w-7 bg-border-primary" />
            <span className="text-text-muted">
              {project.id} / {projects.length.toString().padStart(2, "0")}
            </span>
          </div>

          <h1 className="text-balance mt-5 text-[clamp(2.1rem,8vw,5.5rem)] font-medium leading-[1] tracking-[-0.03em] text-text-primary sm:leading-[0.95]">
            {project.title}
          </h1>
          <p className="text-pretty mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
            {project.description}
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-y-5 border-t border-border-secondary pt-8 sm:grid-cols-4">
            {[
              ["Categoria", project.meta.category],
              ["Função", project.meta.role],
              ["Foco", project.meta.focus],
              ["Ano", project.meta.year],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-text-muted">
                  {label}
                </dt>
                <dd className="mt-2 font-mono text-[0.75rem] uppercase tracking-[0.04em] text-text-secondary">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </header>

      {/* Cover */}
      <Container>
        <div className="relative aspect-[16/8] overflow-hidden border border-border-primary bg-background-secondary">
          <div
            className="absolute inset-0 opacity-[0.16]"
            style={{
              background: `radial-gradient(70% 90% at 60% 20%, ${accent}, transparent 70%)`,
            }}
          />
          <div className="absolute inset-0 grid place-items-center">
            <SystemCorePlaceholder
              accent={project.accentColor}
              className="w-[40%] min-w-[14rem] opacity-90"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-5">
            {project.technologies.map((t) => (
              <TechTag key={t}>{t}</TechTag>
            ))}
          </div>
        </div>
      </Container>

      {/* Body blocks */}
      <Container className="mt-20 lg:mt-28">
        {project.sections.map((section) => (
          <CaseStudyBlock key={section.id} section={section} />
        ))}
      </Container>

      {/* Next project */}
      <Container className="py-24 lg:py-32">
        <Link
          to={`/projects/${next.slug}`}
          className="group block border-t border-border-secondary pt-10"
        >
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-text-muted">
            Próximo projeto — {next.id}
          </span>
          <div className="mt-4 flex items-center justify-between gap-6">
            <h2 className="text-[clamp(2rem,6vw,4rem)] font-medium leading-none tracking-[-0.02em] text-text-primary transition-colors group-hover:text-white">
              {next.title}
            </h2>
            <span className="grid size-12 shrink-0 place-items-center border border-border-primary transition-colors duration-300 group-hover:border-text-muted">
              <ArrowUpRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-px group-hover:-translate-y-px"
              />
            </span>
          </div>
          <p className="text-pretty mt-4 max-w-md text-sm leading-relaxed text-text-secondary">
            {next.tagline}
          </p>
        </Link>
      </Container>
    </article>
  );
}
