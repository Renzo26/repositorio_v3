import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface TechTagProps {
  children: ReactNode;
  className?: string;
  active?: boolean;
}

/** Mono chip for a technology / metadata token. No SaaS-pill rounding. */
export function TechTag({ children, className, active = false }: TechTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] transition-colors duration-300",
        active
          ? "border-text-muted text-text-primary"
          : "border-border-secondary text-text-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}
