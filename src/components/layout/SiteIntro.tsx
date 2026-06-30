import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/animations/gsap";
import { getLenisInstance } from "@/animations/lenisInstance";
import { completeIntro } from "@/animations/introGate";
import { site } from "@/data/site";

const BOOT_LINES = [
  "inicializando sistema",
  "conectando serviços",
  "carregando automações",
  "montando interface",
];

/**
 * First-load entrance: a brief "system boot" overlay (mono status lines + a
 * 0–100 counter), then a curtain wipe that reveals the site and triggers the
 * Hero entrance via `completeIntro()`. Mounted once in AppLayout, so it never
 * replays on client-side navigation. Skipped under reduced-motion.
 */
export function SiteIntro() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) {
      completeIntro();
      return;
    }

    window.scrollTo(0, 0);
    getLenisInstance()?.stop();
    // Lenis is created by a parent effect that may run after this one.
    const lock = requestAnimationFrame(() => getLenisInstance()?.stop());

    const ctx = gsap.context(() => {
      const count = { v: 0 };
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => setDone(true),
      });

      tl.from("[data-boot-brand]", { yPercent: 60, opacity: 0, duration: 0.7 })
        .from(
          "[data-boot-line]",
          { y: 10, opacity: 0, duration: 0.5, stagger: 0.13 },
          "-=0.25",
        )
        .to(
          count,
          {
            v: 100,
            duration: 1.4,
            ease: "power1.inOut",
            onUpdate: () => {
              if (counter.current) {
                counter.current.textContent = String(
                  Math.round(count.v),
                ).padStart(3, "0");
              }
            },
          },
          "-=0.3",
        )
        .to(bar.current, { scaleX: 1, duration: 1.4, ease: "power1.inOut" }, "<")
        .to("[data-boot-content]", { opacity: 0, duration: 0.35 }, "+=0.1")
        .to(
          el,
          {
            yPercent: -100,
            duration: 0.9,
            ease: "expo.inOut",
            onStart: () => {
              // Hand off exactly as the curtain starts to lift.
              getLenisInstance()?.start();
              completeIntro();
            },
          },
          "-=0.05",
        );
    }, el);

    return () => {
      cancelAnimationFrame(lock);
      ctx.revert();
      getLenisInstance()?.start();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="grain fixed inset-0 z-[200] bg-background-primary"
    >
      <div
        data-boot-content
        className="flex h-full flex-col justify-between px-6 py-7 sm:px-10 sm:py-9"
      >
        {/* top status */}
        <div className="flex items-start justify-between font-mono text-[0.7rem] uppercase tracking-[0.22em] text-text-muted">
          <span data-boot-line>{site.company.name}</span>
          <span>
            <span ref={counter}>000</span>%
          </span>
        </div>

        {/* monogram */}
        <div className="flex flex-1 items-center justify-center overflow-hidden">
          <span
            data-boot-brand
            className="block text-[clamp(3.5rem,13vw,8rem)] font-medium leading-none tracking-[-0.04em] text-text-primary"
          >
            {site.monogram}
          </span>
        </div>

        {/* boot log + progress */}
        <div className="flex flex-col gap-4">
          <ul className="flex flex-col gap-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-text-muted">
            {BOOT_LINES.map((line) => (
              <li key={line} data-boot-line className="flex items-center gap-2">
                <span className="text-text-secondary">›</span>
                {line}
              </li>
            ))}
          </ul>
          <div className="h-px w-full bg-border-secondary">
            <span
              ref={bar}
              className="block h-full origin-left scale-x-0 bg-text-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
