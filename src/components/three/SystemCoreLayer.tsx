import { Suspense, lazy } from "react";
import { useSystemCore } from "@/contexts/SystemCoreContext";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";

const SystemCoreCanvas = lazy(() => import("./SystemCoreCanvas"));

/**
 * Fixed, behind-content layer that hosts the global 3D core. Renders nothing
 * when the core is disabled (mobile / no-WebGL / reduced-motion) - sections
 * show their SVG fallback instead. Any 3D error degrades to that fallback.
 */
export function SystemCoreLayer() {
  const { enabled, exploded, report3DFailure } = useSystemCore();
  if (!enabled) return null;

  return (
    <>
      {/* Pinned to the hero viewport only (scrolls away with it). The core
          no longer travels through the sections - see useCoreSection. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-screen"
        aria-hidden
      >
        <CanvasErrorBoundary onError={report3DFailure}>
          <Suspense fallback={null}>
            <SystemCoreCanvas />
          </Suspense>
        </CanvasErrorBoundary>
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
