import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/animations/gsap";
import { getLenisInstance, setLenisInstance } from "@/animations/lenisInstance";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * App-wide smooth scroll. Creates a single Lenis instance and bridges it to
 * GSAP's ticker + ScrollTrigger. Disabled entirely under prefers-reduced-motion
 * (native scroll, no JS animation loop). Mounted once in AppLayout.
 */
export function useSmoothScroll(): void {
  const reduced = usePrefersReducedMotion();
  const { pathname } = useLocation();

  // Lenis ⇄ ScrollTrigger bridge.
  useLayoutEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    setLenisInstance(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const onRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    // Recompute trigger positions once fonts/layout settle.
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      window.clearTimeout(refreshId);
      gsap.ticker.remove(onRaf);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, [reduced]);

  // Reset scroll + refresh triggers on route change.
  useLayoutEffect(() => {
    const lenis = getLenisInstance();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => window.clearTimeout(id);
  }, [pathname]);
}
