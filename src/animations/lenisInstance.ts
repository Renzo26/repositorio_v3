import type Lenis from "lenis";

/**
 * Module-level handle to the single Lenis instance, so plain utilities
 * (scrollToId) and components (mobile menu) can reach it without prop
 * drilling or a context. Set by useSmoothScroll, cleared on unmount.
 */
let instance: Lenis | null = null;

export function setLenisInstance(l: Lenis | null): void {
  instance = l;
}

export function getLenisInstance(): Lenis | null {
  return instance;
}
