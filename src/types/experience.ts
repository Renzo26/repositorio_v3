export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  /** Marks the currently active position. */
  current?: boolean;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  /** Headline deliverables / outcomes. */
  highlights?: string[];
}
