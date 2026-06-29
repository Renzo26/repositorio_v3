import { getLenisInstance } from "@/animations/lenisInstance";

/** Fixed navbar offset so anchored sections aren't hidden behind it. */
const NAV_OFFSET = -80;

/**
 * Smoothly scroll to an element by id. Uses Lenis when active, falls back to
 * native scroll (and honors reduced-motion).
 */
export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lenis = getLenisInstance();

  if (lenis && !reduce) {
    lenis.scrollTo(el, { offset: NAV_OFFSET });
    return;
  }
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

/** Extract the `#hash` id from a route href like "/#work" or "#work". */
export function hashId(href: string): string | null {
  const i = href.indexOf("#");
  return i >= 0 ? href.slice(i + 1) : null;
}
