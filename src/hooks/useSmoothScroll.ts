import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/animations/gsap";
import { getLenisInstance, setLenisInstance } from "@/animations/lenisInstance";

/**
 * App-wide smooth scroll. Creates a single Lenis instance and bridges it to
 * GSAP's ticker + ScrollTrigger. Mounted once in AppLayout.
 */
export function useSmoothScroll(): void {
  const { pathname } = useLocation();

  // Lenis ⇄ ScrollTrigger bridge.
  useLayoutEffect(() => {

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

    // Recompute trigger positions once the real layout exists. Anchored to
    // fonts being ready (deterministic across machines) rather than a fixed
    // timeout that can fire before/after layout settles.
    if (document.fonts?.ready) {
      void document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    // Safety net for any late layout shift (e.g. 3D canvas mounting).
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      window.clearTimeout(refreshId);
      gsap.ticker.remove(onRaf);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  // Reset scroll + refresh triggers on route change.
  useLayoutEffect(() => {
    const lenis = getLenisInstance();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => window.clearTimeout(id);
  }, [pathname]);
}
