import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { ACCENT_VAR } from "@/types";
import { TechTag } from "@/components/common/TechTag";
import { SystemCorePlaceholder } from "@/components/three/SystemCorePlaceholder";
import { useCoreSection } from "@/hooks/useCoreSection";
import { cn } from "@/utils/cn";

interface ProjectChapterProps {
  project: Project;
  index: number;
}

const META_ROWS = (p: Project): [string, string][] => [
  ["Categoria", p.meta.category],
  ["Função", p.meta.role],
  ["Foco", p.meta.focus],
  ["Ano", p.meta.year],
];

/** One project rendered as an editorial chapter (alternating sides). */
export function ProjectChapter({ project, index }: ProjectChapterProps) {
  const accent = ACCENT_VAR[project.accentColor];
  const reversed = index % 2 === 1;
  const href = `/projects/${project.slug}`;
  const root = useRef<HTMLElement>(null);

  useCoreSection(root, project.systemState);

  return (
    <article
      ref={root}
      className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12"
    >
      {/* Text column */}
      <div className={cn("min-w-0 lg:col-span-5", reversed && "lg:order-2")}>
        <div
          data-reveal
          className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em]"
        >
          <span style={{ color: accent }}>Projeto {project.id}</span>
          <span aria-hidden className="h-px w-7 bg-border-primary" />
          <span className="text-text-muted">{project.meta.category}</span>
        </div>

        <h3
          data-reveal
          className="mt-5 text-[clamp(2rem,4vw,3rem)] font-medium leading-[1] tracking-[-0.02em] text-text-primary"
        >
          {project.title}
        </h3>
        <p
          data-reveal
          className="text-pretty mt-4 max-w-md text-base leading-relaxed text-text-secondary"
        >
          {project.tagline}
        </p>

        <dl
          data-reveal
          className="mt-8 grid max-w-md grid-cols-1 gap-y-2.5 border-t border-border-secondary pt-6 sm:grid-cols-2 sm:gap-x-6"
        >
          {META_ROWS(project).map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 sm:block">
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-text-muted">
                {label}
              </dt>
              <dd className="font-mono text-[0.72rem] uppercase tracking-[0.06em] text-text-secondary sm:mt-1">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <div data-reveal className="mt-7 flex flex-wrap gap-2">
          {project.technologies.slice(0, 6).map((t) => (
            <TechTag key={t}>{t}</TechTag>
          ))}
        </div>

        <Link
          data-reveal
          to={href}
          className="group mt-9 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-text-primary"
        >
          Ver estudo de caso
          <span className="grid size-7 place-items-center border border-border-primary transition-colors duration-300 group-hover:border-text-muted">
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-px group-hover:-translate-y-px"
            />
          </span>
        </Link>
      </div>

      {/* Cover column */}
      <div className={cn("lg:col-span-7", reversed && "lg:order-1")}>
        <Link
          to={href}
          data-cover
          aria-label={`Abrir estudo de caso de ${project.title}`}
          className="group relative block aspect-[4/3] overflow-hidden border border-border-primary bg-background-secondary"
        >
          {/* accent wash */}
          <div
            className="absolute inset-0 opacity-[0.14] transition-opacity duration-500 group-hover:opacity-25"
            style={{
              background: `radial-gradient(80% 80% at 70% 30%, ${accent}, transparent 70%)`,
            }}
          />
          {/* core motif, scales up on hover */}
          <div className="absolute inset-0 grid place-items-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
            <SystemCorePlaceholder
              accent={project.accentColor}
              still
              className="w-[62%] opacity-80"
            />
          </div>

          {/* giant ghosted index */}
          <span
            aria-hidden
            className="absolute left-5 top-3 font-mono text-[5rem] leading-none text-text-primary/[0.04] sm:text-[7rem]"
          >
            {project.id}
          </span>

          {/* bottom meta + hover cue */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-text-secondary">
              {project.title}
            </span>
            <span className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Ver projeto
              <ArrowUpRight size={13} />
            </span>
          </div>
        </Link>
      </div>
    </article>
  );
}
