import type { AccentColor, SystemCoreState } from "@/types";

/** Where the System Core sits (in view space) for each section state. */
export interface CoreTarget {
  position: [number, number, number];
  scale: number;
  rotation: [number, number, number];
  accent: AccentColor;
  /** Accent point-light intensity multiplier. */
  light: number;
  /** Module orbit-radius multiplier. */
  separation: number;
}

/**
 * Camera is at z=6, fov 35 → roughly ±3.2 horizontal at the core plane.
 * x≈±1.8 places the core to one side (echoing the editorial column layout);
 * x=0 centers it. Accent + light shift the mood per project/section.
 */
export const CORE_TARGETS: Record<SystemCoreState, CoreTarget> = {
  hero: { position: [1.75, 0.1, 0], scale: 1.0, rotation: [0.1, 0.5, 0], accent: "pastel-lilac", light: 1.0, separation: 1.0 },
  manifesto: { position: [1.5, -0.3, -1.2], scale: 0.72, rotation: [0.2, 1.0, 0], accent: "pastel-lilac", light: 0.5, separation: 1.0 },
  mecaflow: { position: [1.85, 0.0, -0.2], scale: 0.95, rotation: [0.0, 0.8, 0], accent: "pastel-sage", light: 1.0, separation: 1.0 },
  automation: { position: [-1.85, 0.0, -0.2], scale: 0.95, rotation: [0.0, -0.8, 0], accent: "pastel-lilac", light: 1.05, separation: 1.08 },
  cloudy: { position: [1.85, 0.0, -0.2], scale: 0.95, rotation: [0.0, 0.9, 0], accent: "pastel-blue", light: 1.0, separation: 1.0 },
  experience: { position: [-1.7, 0.2, -0.8], scale: 0.78, rotation: [0.1, -1.0, 0], accent: "pastel-peach", light: 0.7, separation: 1.0 },
  ecosystem: { position: [0, 0.0, -1.0], scale: 0.9, rotation: [0.15, 0.6, 0], accent: "pastel-lilac", light: 0.85, separation: 1.12 },
  about: { position: [1.6, 0.0, -0.6], scale: 0.72, rotation: [0.1, 0.7, 0], accent: "pastel-peach", light: 0.6, separation: 1.0 },
  contact: { position: [0, 0.0, 0.3], scale: 1.2, rotation: [0.0, 0.4, 0], accent: "pastel-lilac", light: 1.1, separation: 1.15 },
};

export const getCoreTarget = (state: SystemCoreState): CoreTarget =>
  CORE_TARGETS[state];
