import { gsap, ScrollTrigger } from "./gsap";

interface RevealOptions {
  y?: number;
  stagger?: number;
  start?: string;
}

/**
 * Fade-and-rise every `[data-reveal]` inside `scope` as it scrolls in.
 * Uses ScrollTrigger.batch so adjacent elements animate together.
 */
export function revealBatch(scope: HTMLElement, opts: RevealOptions = {}): void {
  const items = gsap.utils.toArray<HTMLElement>(scope.querySelectorAll("[data-reveal]"));
  if (!items.length) return;

  const y = opts.y ?? 26;
  gsap.set(items, { opacity: 0, y });

  ScrollTrigger.batch(items, {
    start: opts.start ?? "top 86%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: opts.stagger ?? 0.08,
        overwrite: true,
      }),
  });
}

/**
 * Masked line reveal for editorial headings. Each line must sit inside an
 * `overflow-hidden` wrapper; `selector` targets the inner moving element.
 */
export function maskReveal(
  scope: HTMLElement,
  selector: string,
  opts: { start?: string; stagger?: number } = {},
): void {
  const lines = scope.querySelectorAll<HTMLElement>(selector);
  if (!lines.length) return;

  gsap.from(lines, {
    yPercent: 120,
    duration: 1,
    ease: "expo.out",
    stagger: opts.stagger ?? 0.12,
    scrollTrigger: { trigger: scope, start: opts.start ?? "top 72%" },
  });
}
