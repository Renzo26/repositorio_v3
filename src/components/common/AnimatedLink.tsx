import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

interface AnimatedLinkProps {
  children: ReactNode;
  /** Internal route. */
  to?: string;
  /** External / mailto href. */
  href?: string;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
}

const base =
  "group relative inline-flex w-fit items-center gap-1.5 text-text-primary " +
  "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full " +
  "after:origin-right after:scale-x-0 after:bg-current after:transition-transform " +
  "after:duration-[var(--ease-out-expo,300ms)] after:ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "hover:after:origin-left hover:after:scale-x-100 " +
  "focus-visible:after:origin-left focus-visible:after:scale-x-100";

/** Editorial link with an underline that wipes in on hover/focus. */
export function AnimatedLink({
  children,
  to,
  href,
  external,
  className,
  onClick,
  ...rest
}: AnimatedLinkProps) {
  const classes = cn(base, className);

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      onClick={onClick}
      {...(external
        ? { target: "_blank", rel: "noreferrer noopener" }
        : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
