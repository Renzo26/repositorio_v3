import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import { gsap } from "@/animations/gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Run GSAP setup scoped to a ref, with automatic cleanup via gsap.context().
 * Skipped entirely under prefers-reduced-motion so content stays in its
 * natural, fully-visible state (no from-states left applied).
 *
 * Selectors used inside `setup` are auto-scoped to the ref element.
 */
export function useGsap(
  scope: RefObject<HTMLElement | null>,
  setup: (scope: HTMLElement) => void,
  deps: unknown[] = [],
): void {
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const el = scope.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => setup(el), el);
    return () => ctx.revert();
  }, [reduced, ...deps]);
}
