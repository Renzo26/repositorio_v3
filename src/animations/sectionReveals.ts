import { gsap, ScrollTrigger, SplitText } from "./gsap";

interface RevealOptions {
  y?: number;
  stagger?: number;
  start?: string;
}

/**
 * Fade-and-rise every `[data-reveal]` inside `scope` as it scrolls in.
 * Used for non-text blocks (labels, tags, links, media, meta lists).
 */
export function revealBatch(scope: HTMLElement, opts: RevealOptions = {}): void {
  const items = gsap.utils.toArray<HTMLElement>(
    scope.querySelectorAll("[data-reveal]"),
  );
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

// Scroll window shared by every text reveal — progress is tied to scroll
// position between these two points (scrub) so it reverses naturally upward.
const SCRUB_TRIGGER = { start: "top 85%", end: "top 45%", scrub: 0.8 } as const;

/**
 * Line-by-line entrance for the section texts, driven by SplitText so the
 * line breaks recalculate on resize / font load. Two treatments:
 *
 *  - `[data-reveal-title]`  big headings — each line is masked (overflow
 *    hidden) and slides up from `yPercent: 100` to `0` with a short stagger.
 *  - `[data-reveal-lines]`  paragraphs — each line is wiped open left→right
 *    via `clip-path: inset(...)` (no opacity-only, no horizontal shift, no
 *    layout change).
 *
 * Both are scrubbed to the scroll. Returns a cleanup that reverts every
 * SplitText instance (which also reverts the animations / ScrollTriggers it
 * created via `onSplit`), restoring the original DOM on unmount.
 */
export function revealText(scope: HTMLElement): () => void {
  const titles = gsap.utils.toArray<HTMLElement>(
    scope.querySelectorAll("[data-reveal-title]"),
  );
  const paragraphs = gsap.utils.toArray<HTMLElement>(
    scope.querySelectorAll("[data-reveal-lines]"),
  );

  const splits: SplitText[] = [];

  titles.forEach((el) => {
    splits.push(
      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        linesClass: "reveal-line",
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 100,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: { trigger: el, ...SCRUB_TRIGGER },
          }),
      }),
    );
  });

  paragraphs.forEach((el) => {
    splits.push(
      SplitText.create(el, {
        type: "lines",
        autoSplit: true,
        linesClass: "reveal-line",
        onSplit: (self) =>
          gsap.fromTo(
            self.lines,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              ease: "none",
              stagger: 0.12,
              scrollTrigger: { trigger: el, ...SCRUB_TRIGGER },
            },
          ),
      }),
    );
  });

  return () => splits.forEach((s) => s.revert());
}
