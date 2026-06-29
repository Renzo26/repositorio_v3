import type { ExperienceItem } from "@/types";

/**
 * PLACEHOLDER timeline — structure is final, dates/companies should be
 * confirmed with real history before launch. Most recent first.
 */
export const experience: ExperienceItem[] = [
  {
    id: "cloudysolutions",
    role: "Founder & Software Engineer",
    company: "CloudySolutions",
    period: "2025 — Present",
    location: "Santo André, Brazil",
    current: true,
    summary:
      "Building products, automation infrastructure and AI agents end to end — from the first webhook to the running system.",
    responsibilities: [
      "Architect multi-tenant SaaS and shared automation infrastructure",
      "Design and ship AI agents and conversational automation",
      "Own delivery across back end, front end and operations",
    ],
    technologies: ["Python", "FastAPI", "React", "n8n", "PostgreSQL", "AI Agents"],
    highlights: [
      "Launched MecaFlow — WhatsApp-first operations SaaS",
      "Built a reusable queue + webhook + agent platform",
    ],
  },
  {
    id: "fullstack-dev",
    role: "Full-Stack Developer",
    company: "Independent / Contract",
    period: "2023 — 2025",
    location: "Remote",
    summary:
      "Delivered web systems and integrations across the stack, with a growing focus on automation and APIs.",
    responsibilities: [
      "Build REST APIs and front-end interfaces for client systems",
      "Integrate third-party services, webhooks and message flows",
      "Modernize and maintain existing applications",
    ],
    technologies: ["C#", ".NET", "React", "TypeScript", "SQL Server", "Redis"],
    highlights: ["Shipped integrations connecting legacy systems to modern APIs"],
  },
  {
    id: "systems-dev",
    role: "Software Developer",
    company: "Industry / Systems",
    period: "2021 — 2023",
    location: "Santo André, Brazil",
    summary:
      "Developed and maintained business systems with C# and .NET, building a foundation in backend and data.",
    responsibilities: [
      "Develop business logic and data access with C# / .NET",
      "Model and query relational databases",
      "Support and evolve production systems",
    ],
    technologies: ["C#", ".NET", "SQL Server", "MySQL"],
  },
];
