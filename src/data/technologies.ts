import type { TechCategory } from "@/types";

/**
 * Ecossistema técnico agrupado por área. `projects` em cada item lista os
 * slugs dos projetos em que a tecnologia é usada, o que alimenta as conexões
 * destacadas no hover da seção Ecossistema Técnico (interativo na Etapa 3+).
 */
export const techCategories: TechCategory[] = [
  {
    id: "backend",
    label: "Back-end",
    accent: "pastel-sage",
    items: [
      { name: "Python", projects: ["mecaflow", "automation-platform", "cloudysolutions"] },
      { name: "C#", projects: ["cloudysolutions"] },
      { name: ".NET", projects: ["cloudysolutions"] },
      { name: "FastAPI", projects: ["mecaflow", "automation-platform"] },
      { name: "APIs REST", projects: ["mecaflow", "automation-platform", "cloudysolutions"] },
    ],
  },
  {
    id: "frontend",
    label: "Front-end",
    accent: "pastel-peach",
    items: [
      { name: "React", projects: ["mecaflow", "cloudysolutions"] },
      { name: "TypeScript", projects: ["mecaflow", "cloudysolutions"] },
      { name: "JavaScript", projects: ["mecaflow", "cloudysolutions"] },
      { name: "HTML", projects: ["mecaflow", "cloudysolutions"] },
      { name: "CSS", projects: ["mecaflow", "cloudysolutions"] },
    ],
  },
  {
    id: "automation",
    label: "Automação",
    accent: "pastel-lilac",
    items: [
      { name: "n8n", projects: ["mecaflow", "automation-platform"] },
      { name: "Webhooks", projects: ["automation-platform"] },
      { name: "RabbitMQ", projects: ["automation-platform"] },
      { name: "Redis", projects: ["mecaflow", "automation-platform"] },
    ],
  },
  {
    id: "data",
    label: "Dados",
    accent: "pastel-blue",
    items: [
      { name: "PostgreSQL", projects: ["mecaflow", "cloudysolutions"] },
      { name: "MySQL", projects: ["cloudysolutions"] },
      { name: "SQL Server", projects: ["cloudysolutions"] },
      { name: "Supabase", projects: ["mecaflow"] },
    ],
  },
  {
    id: "ai",
    label: "Inteligência Artificial",
    accent: "pastel-lilac",
    items: [
      { name: "OpenAI", projects: ["mecaflow"] },
      { name: "Agentes de IA", projects: ["mecaflow", "automation-platform", "cloudysolutions"] },
      { name: "RAG", projects: ["mecaflow"] },
      { name: "Automação Conversacional", projects: ["mecaflow", "automation-platform"] },
    ],
  },
];
