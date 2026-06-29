import type { ComponentType } from "react";

export interface NavLink {
  label: string;
  /** Route path ("/about") or in-page hash ("#work"). */
  href: string;
  external?: boolean;
}

export interface SocialLink {
  label: string;
  handle?: string;
  href: string;
  /** Optional icon component (lucide dropped brand icons; mostly text labels). */
  icon?: ComponentType<{ className?: string; size?: number | string }>;
}

/** Section registered for the nav section-indicator + command palette. */
export interface SectionRef {
  id: string;
  label: string;
  index: string;
}
