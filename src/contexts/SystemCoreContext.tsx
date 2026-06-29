import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { SystemCoreState } from "@/types";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MEDIA } from "@/constants/breakpoints";
import { DEFAULT_SYSTEM_STATE } from "@/constants/systemCoreStates";

interface SystemCoreContextValue {
  state: SystemCoreState;
  setState: (s: SystemCoreState) => void;
  /** Whether the 3D canvas is active (else the SVG fallback is shown). */
  enabled: boolean;
  exploded: boolean;
  toggleExploded: () => void;
}

const SystemCoreContext = createContext<SystemCoreContextValue | null>(null);

function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function SystemCoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SystemCoreState>(DEFAULT_SYSTEM_STATE);
  const [exploded, setExploded] = useState(false);

  const reduced = usePrefersReducedMotion();
  const isDesktop = useMediaQuery(MEDIA.desktop);
  const [webgl] = useState(detectWebGL);

  // 3D runs only on capable desktops that allow motion.
  const enabled = webgl && !reduced && isDesktop;

  const toggleExploded = useCallback(() => setExploded((e) => !e), []);

  const value = useMemo<SystemCoreContextValue>(
    () => ({ state, setState, enabled, exploded, toggleExploded }),
    [state, enabled, exploded, toggleExploded],
  );

  return (
    <SystemCoreContext.Provider value={value}>
      {children}
    </SystemCoreContext.Provider>
  );
}

export function useSystemCore(): SystemCoreContextValue {
  const ctx = useContext(SystemCoreContext);
  if (!ctx)
    throw new Error("useSystemCore must be used within a SystemCoreProvider");
  return ctx;
}
