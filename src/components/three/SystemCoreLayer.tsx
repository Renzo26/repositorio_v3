import { Suspense, lazy } from "react";
import { useSystemCore } from "@/contexts/SystemCoreContext";

const SystemCoreCanvas = lazy(() => import("./SystemCoreCanvas"));

/**
 * Fixed, behind-content layer that hosts the global 3D core. Renders nothing
 * when the core is disabled (mobile / no-WebGL / reduced-motion) — sections
 * show their SVG fallback instead.
 */
export function SystemCoreLayer() {
  const { enabled, exploded } = useSystemCore();
  if (!enabled) return null;

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <Suspense fallback={null}>
          <SystemCoreCanvas />
        </Suspense>
      </div>

      {exploded && (
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
          <span className="border border-border-primary bg-background-primary/80 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-text-secondary backdrop-blur-sm">
            Exploded view
          </span>
        </div>
      )}
    </>
  );
}
