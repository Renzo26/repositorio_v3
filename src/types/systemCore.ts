/**
 * Narrative states of the System Core 3D object.
 * Each home section maps to one of these; the Core lerps between
 * per-state configurations (position / rotation / scale / accent / lighting).
 * Implemented for real in Etapa 4 — declared here so data + sections can
 * reference states already.
 */
export type SystemCoreState =
  | "hero"
  | "manifesto"
  | "mecaflow"
  | "automation"
  | "cloudy"
  | "experience"
  | "ecosystem"
  | "about"
  | "contact";

export type AccentColor =
  | "pastel-lilac"
  | "pastel-sage"
  | "pastel-peach"
  | "pastel-blue";

/** CSS variable map for accent colors, usable in inline styles. */
export const ACCENT_VAR: Record<AccentColor, string> = {
  "pastel-lilac": "var(--color-pastel-lilac)",
  "pastel-sage": "var(--color-pastel-sage)",
  "pastel-peach": "var(--color-pastel-peach)",
  "pastel-blue": "var(--color-pastel-blue)",
};

/** Raw hex per accent (for the 3D lighting + canvas in later stages). */
export const ACCENT_HEX: Record<AccentColor, string> = {
  "pastel-lilac": "#b9aae8",
  "pastel-sage": "#a9c3b2",
  "pastel-peach": "#e2b3a6",
  "pastel-blue": "#a9bed1",
};
