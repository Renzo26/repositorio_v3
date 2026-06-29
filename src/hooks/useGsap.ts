import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import { gsap } from "@/animations/gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Run GSAP setup scoped to a ref, with automatic cleanup via gsap.context().
 * Always runs — the animation helpers themselves degrade to short opacity
 * fades under prefers-reduced-motion (no transforms / continuous motion).
 * `reduced` stays in the deps so toggling the OS setting re-initialises.
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
    if (!el) return;
    const ctx = gsap.context(() => setup(el), el);
    return () => ctx.revert();
  }, [reduced, ...deps]);
}
