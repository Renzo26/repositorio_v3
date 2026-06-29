import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import { ScrollTrigger } from "@/animations/gsap";
import { useSystemCore } from "@/contexts/SystemCoreContext";
import type { SystemCoreState } from "@/types";

/**
 * Switch the System Core to `sectionState` while this section sits in the
 * middle of the viewport. No-op when the 3D core is disabled.
 */
export function useCoreSection(
  ref: RefObject<HTMLElement | null>,
  sectionState: SystemCoreState,
): void {
  const { setState, enabled } = useSystemCore();

  useLayoutEffect(() => {
    if (!enabled || !ref.current) return;
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top center",
      end: "bottom center",
      onToggle: (self) => {
        if (self.isActive) setState(sectionState);
      },
    });
    return () => trigger.kill();
  }, [enabled, sectionState, setState, ref]);
}
