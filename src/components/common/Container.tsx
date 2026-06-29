import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

/** HTML tags allowed for the container (kept narrow to avoid the global
 * three.js JSX augmentation leaking in via R3F). */
type ContainerTag =
  | "div"
  | "section"
  | "header"
  | "footer"
  | "nav"
  | "main"
  | "article"
  | "aside";

interface ContainerProps {
  as?: ContainerTag;
  className?: string;
  children: ReactNode;
  /** Wider gutter variant for full-bleed editorial sections. */
  bleed?: boolean;
}

/**
 * Centered editorial container. Relies on Tailwind's `mx-auto` — safe now
 * that the CSS reset lives inside @layer base (see project memory).
 */
export function Container({
  as: Tag = "div",
  className,
  children,
  bleed = false,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[var(--container-page)]",
        bleed ? "px-6 sm:px-8" : "px-6 sm:px-10 lg:px-16",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
