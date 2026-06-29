import type { NavLink, SectionRef } from "@/types";

/** Top navigation. Hash targets resolve to home sections. */
export const navLinks: NavLink[] = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

/**
 * Home sections in scroll order. `index` powers the authorial
 * "SECTION 01 / 06" labels and the nav section-indicator (Etapa 3+).
 */
export const sections: SectionRef[] = [
  { id: "manifesto", label: "Manifesto", index: "01" },
  { id: "work", label: "Selected Work", index: "02" },
  { id: "experience", label: "Experience", index: "03" },
  { id: "ecosystem", label: "Technical Ecosystem", index: "04" },
  { id: "about", label: "About", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
];

export const TOTAL_SECTIONS = sections.length;
