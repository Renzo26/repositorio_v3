import type { TechCategory } from "@/types";

/**
 * Technical ecosystem grouped by area. `projects` on each item lists the
 * project slugs it's used in, which drives the hover-to-highlight
 * connections in the Technical Ecosystem section (interactive in Etapa 3+).
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
      { name: "REST APIs", projects: ["mecaflow", "automation-platform", "cloudysolutions"] },
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
    label: "Automation",
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
    label: "Data",
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
    label: "Artificial Intelligence",
    accent: "pastel-lilac",
    items: [
      { name: "OpenAI", projects: ["mecaflow"] },
      { name: "AI Agents", projects: ["mecaflow", "automation-platform", "cloudysolutions"] },
      { name: "RAG", projects: ["mecaflow"] },
      { name: "Conversational Automation", projects: ["mecaflow", "automation-platform"] },
    ],
  },
];
