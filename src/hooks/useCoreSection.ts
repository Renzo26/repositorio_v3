import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import { ScrollTrigger } from "@/animations/gsap";
import { useSystemCore } from "@/contexts/SystemCoreContext";
import type { SystemCoreState } from "@/types";

/**
 * Switch the System Core to `sectionState` while this section sits in the
 * middle of the viewport. No-op when the 3D core is disabled.
 */
/**
 * TEMPORÁRIO: o System Core fica fixo no Hero, sem descer/percorrer as seções.
 * Mantido `true` para reativar a troca de estado por scroll quando quisermos.
 */
const SCROLL_DRIVEN_CORE = false;

export function useCoreSection(
  ref: RefObject<HTMLElement | null>,
  sectionState: SystemCoreState,
): void {
  const { setState, enabled } = useSystemCore();

  useLayoutEffect(() => {
    if (!SCROLL_DRIVEN_CORE || !enabled || !ref.current) return;
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
