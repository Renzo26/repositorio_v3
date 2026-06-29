import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SectionLabelProps {
  /** Leading number, e.g. "01". */
  index?: string;
  /** Total count, renders "01 / 06" when provided. */
  total?: string;
  children: ReactNode;
  className?: string;
}

/** Mono kicker used above sections — "SECTION 01 / 06 · SELECTED WORK". */
export function SectionLabel({
  index,
  total,
  children,
  className,
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-text-muted",
        className,
      )}
    >
      {index && (
        <span className="text-text-secondary tabular-nums">
          {index}
          {total && <span className="text-text-muted"> / {total}</span>}
        </span>
      )}
      <span aria-hidden className="h-px w-7 bg-border-primary" />
      <span className="text-text-secondary">{children}</span>
    </div>
  );
}
