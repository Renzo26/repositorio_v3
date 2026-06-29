import type { AccentColor, SystemCoreState } from "./systemCore";

/** A single block inside a case study (Overview, Problem, Architecture…). */
export interface ProjectSection {
  /** Stable id used for anchors / keys. */
  id: string;
  /** Mono kicker shown above the block, e.g. "OVERVIEW". */
  label: string;
  title?: string;
  /** Paragraphs of body copy. */
  body: string[];
  /** Optional bullet list (responsibilities, decisions…). */
  bullets?: string[];
}

export interface ProjectMeta {
  category: string;
  role: string;
  focus: string;
  year: string;
}

export interface Project {
  /** Display number, e.g. "01". */
  id: string;
  slug: string;
  title: string;
  /** One-line punchline used on cards. */
  tagline: string;
  /** Short paragraph used on the home chapter + case study hero. */
  description: string;
  meta: ProjectMeta;
  technologies: string[];
  accentColor: AccentColor;
  /** State the System Core moves to when this project is in view. */
  systemState: SystemCoreState;
  /** Cover image path (placeholder until real assets land). */
  coverImage?: string;
  /** Detailed case-study blocks (real content can be filled later). */
  sections: ProjectSection[];
}
