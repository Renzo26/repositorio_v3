import type { AccentColor } from "./systemCore";

export interface Technology {
  name: string;
  /** Project slugs where this technology is used (drives hover connections). */
  projects: string[];
}

export interface TechCategory {
  id: string;
  /** Mono heading, e.g. "BACK-END". */
  label: string;
  accent: AccentColor;
  items: Technology[];
}
