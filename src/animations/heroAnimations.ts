import { gsap } from "./gsap";
import { prefersReducedMotion } from "@/utils/motion";

/**
 * Hero entrance — plays once on mount.
 * The headline reveals by mask (each line lives in an overflow-hidden wrapper),
 * then the supporting blocks stagger in and the System Core fades up.
 * Under reduced-motion it degrades to a single short opacity fade.
 */
export function playHeroIntro(scope: HTMLElement): gsap.core.Animation {
  const q = gsap.utils.selector(scope);

  if (prefersReducedMotion()) {
    return gsap.from(q("[data-hero-line], [data-hero]"), {
      opacity: 0,
      duration: 0.5,
      ease: "power1.out",
      stagger: 0.04,
    });
  }

  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

  tl.from(q("[data-hero-line]"), { yPercent: 120, duration: 1.1, stagger: 0.12 }, 0.15)
    .from(q('[data-hero="meta"]'), { y: 18, opacity: 0, duration: 0.8 }, 0.15)
    .from(q('[data-hero="support"]'), { y: 18, opacity: 0, duration: 0.9 }, "-=0.55")
    .from(
      q('[data-hero="tech"]'),
      { y: 12, opacity: 0, duration: 0.6, stagger: 0.05 },
      "-=0.6",
    )
    .from(
      q('[data-hero="link"]'),
      { y: 12, opacity: 0, duration: 0.6, stagger: 0.06 },
      "-=0.5",
    )
    .from(q('[data-hero="avail"]'), { y: 14, opacity: 0, duration: 0.7 }, "-=0.5")
    .from(
      q('[data-hero="core"]'),
      { opacity: 0, scale: 0.92, duration: 1.6, ease: "power3.out" },
      0.25,
    );

  return tl;
}
