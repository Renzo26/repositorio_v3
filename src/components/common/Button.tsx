import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-text-primary text-background-primary hover:bg-white",
  outline:
    "border border-border-primary text-text-primary hover:border-text-muted hover:bg-surface-primary",
  ghost: "text-text-secondary hover:text-text-primary",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2.5 text-[0.7rem]",
  md: "px-5 py-3 text-xs",
};

const base =
  "inline-flex items-center justify-center gap-2 font-mono uppercase " +
  "tracking-[0.18em] transition-colors duration-300 select-none " +
  "disabled:pointer-events-none disabled:opacity-50";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

interface AsButton extends BaseProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
}

interface AsLink extends BaseProps {
  to: string;
  "aria-label"?: string;
}

interface AsAnchor extends BaseProps {
  href: string;
  external?: boolean;
  "aria-label"?: string;
}

type ButtonProps = AsButton | AsLink | AsAnchor;

/** Editorial button that renders as <button>, router <Link>, or <a>. */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, VARIANTS[variant], SIZES[size], className);

  if ("to" in props) {
    return (
      <Link to={props.to} className={classes} aria-label={props["aria-label"]}>
        {children}
      </Link>
    );
  }

  if ("href" in props) {
    return (
      <a
        href={props.href}
        className={classes}
        aria-label={props["aria-label"]}
        {...(props.external
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-label={props["aria-label"]}
      className={classes}
    >
      {children}
    </button>
  );
}
