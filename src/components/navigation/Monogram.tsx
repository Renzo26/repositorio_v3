import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import { site } from "@/data/site";

interface MonogramProps {
  className?: string;
  onClick?: () => void;
}

/**
 * "AR" monogram — links home. Will also be the EXPLODED VIEW easter-egg
 * trigger once the 3D Core lands (Etapa 5); the onClick hook is ready.
 */
export function Monogram({ className, onClick }: MonogramProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${site.name} — home`}
      className={cn(
        "group inline-flex items-center gap-2.5 select-none",
        className,
      )}
    >
      <span className="relative grid size-9 place-items-center border border-border-primary text-sm font-medium tracking-tight text-text-primary transition-colors duration-300 group-hover:border-text-muted">
        {site.monogram}
        <span
          aria-hidden
          className="absolute -right-1 -top-1 size-1.5 rounded-full bg-pastel-lilac"
        />
      </span>
    </Link>
  );
}
