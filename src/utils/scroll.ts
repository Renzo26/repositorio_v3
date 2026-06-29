/**
 * Smoothly scroll to an element by id. Honors reduced-motion.
 * Replaced by a Lenis-aware version in Etapa 3.
 */
export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

/** Extract the `#hash` id from a route href like "/#work" or "#work". */
export function hashId(href: string): string | null {
  const i = href.indexOf("#");
  return i >= 0 ? href.slice(i + 1) : null;
}
