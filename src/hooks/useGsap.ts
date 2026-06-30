import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import { gsap, ScrollTrigger } from "@/animations/gsap";

/**
 * Run GSAP setup scoped to a ref, with automatic cleanup via gsap.context().
 * Selectors used inside `setup` are auto-scoped to the ref element.
 *
 * Setup is deferred until web fonts are ready + one animation frame, so
 * ScrollTrigger measures the final layout. Otherwise `once: true` reveals
 * fire against a stale layout (fonts/3D not settled) and self-complete
 * off-screen — the section then just appears with no animation on scroll.
 *
 * `setup` may return a cleanup function (e.g. to revert SplitText instances,
 * which `gsap.context()` does not own); it runs before the context revert.
 */
export function useGsap(
  scope: RefObject<HTMLElement | null>,
  setup: (scope: HTMLElement) => void | (() => void),
  deps: unknown[] = [],
): void {
  useLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;

    let ctx: gsap.Context | undefined;
    let cleanup: (() => void) | void;
    let raf = 0;
    let cancelled = false;

    const run = () => {
      if (cancelled || !scope.current) return;
      ctx = gsap.context(() => {
        cleanup = setup(scope.current!);
      }, scope.current);
      ScrollTrigger.refresh();
    };

    const schedule = () => {
      raf = requestAnimationFrame(run);
    };

    if (document.fonts?.ready) {
      void document.fonts.ready.then(schedule);
    } else {
      schedule();
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      cleanup?.();
      ctx?.revert();
    };
  }, [...deps]);
}
