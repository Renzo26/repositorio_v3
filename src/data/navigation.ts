import type { NavLink, SectionRef } from "@/types";

/** Navegação do topo. Os alvos de hash apontam para as seções da home. */
export const navLinks: NavLink[] = [
  { label: "Trabalhos", href: "/#work" },
  { label: "Sobre", href: "/#about" },
  { label: "Experiência", href: "/#experience" },
  { label: "Contato", href: "/#contact" },
];

/**
 * Seções da home em ordem de scroll. `index` alimenta os rótulos autorais
 * "SEÇÃO 01 / 06" e o indicador de seção do nav (Etapa 3+).
 */
export const sections: SectionRef[] = [
  { id: "manifesto", label: "Manifesto", index: "01" },
  { id: "work", label: "Trabalhos Selecionados", index: "02" },
  { id: "experience", label: "Experiência", index: "03" },
  { id: "ecosystem", label: "Ecossistema Técnico", index: "04" },
  { id: "about", label: "Sobre", index: "05" },
  { id: "contact", label: "Contato", index: "06" },
];

export const TOTAL_SECTIONS = sections.length;
