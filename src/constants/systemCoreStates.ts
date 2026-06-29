import type { SystemCoreState, AccentColor } from "@/types";

export interface SystemCoreConfig {
  accent: AccentColor;
  /** Relative light intensity, 0..1 — drives the 3D lighting in Etapa 4. */
  intensity: number;
  label: string;
}

/**
 * Per-state configuration for the System Core. Sections set the active
 * state on scroll; the Core lerps between these. Declared now so the
 * data + sections can reference states before the 3D layer exists.
 */
export const SYSTEM_CORE_CONFIG: Record<SystemCoreState, SystemCoreConfig> = {
  hero: { accent: "pastel-lilac", intensity: 0.8, label: "Index" },
  manifesto: { accent: "pastel-lilac", intensity: 0.55, label: "Manifesto" },
  mecaflow: { accent: "pastel-sage", intensity: 0.9, label: "MecaFlow" },
  automation: { accent: "pastel-lilac", intensity: 1, label: "Automation" },
  cloudy: { accent: "pastel-blue", intensity: 0.85, label: "CloudySolutions" },
  experience: { accent: "pastel-peach", intensity: 0.7, label: "Experience" },
  contact: { accent: "pastel-lilac", intensity: 0.95, label: "Contact" },
};

export const SYSTEM_CORE_STATES = Object.keys(
  SYSTEM_CORE_CONFIG,
) as SystemCoreState[];

export const DEFAULT_SYSTEM_STATE: SystemCoreState = "hero";
