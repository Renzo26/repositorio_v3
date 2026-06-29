import type { ExperienceItem } from "@/types";

/**
 * Timeline PLACEHOLDER — a estrutura é final, mas datas/empresas devem ser
 * confirmadas com o histórico real antes do lançamento. Mais recente primeiro.
 */
export const experience: ExperienceItem[] = [
  {
    id: "cloudysolutions",
    role: "Fundador & Engenheiro de Software",
    company: "CloudySolutions",
    period: "2025 — Atual",
    location: "Santo André, Brasil",
    current: true,
    summary:
      "Construindo produtos, infraestrutura de automação e agentes de IA de ponta a ponta — do primeiro webhook ao sistema rodando.",
    responsibilities: [
      "Arquitetar SaaS multi-tenant e infraestrutura de automação compartilhada",
      "Projetar e entregar agentes de IA e automação conversacional",
      "Ser dono da entrega no back-end, front-end e operações",
    ],
    technologies: ["Python", "FastAPI", "React", "n8n", "PostgreSQL", "Agentes de IA"],
    highlights: [
      "Lancei o MecaFlow — SaaS de operação com WhatsApp em primeiro lugar",
      "Construí uma plataforma reutilizável de filas + webhooks + agentes",
    ],
  },
  {
    id: "fullstack-dev",
    role: "Desenvolvedor Full-Stack",
    company: "Independente / Contrato",
    period: "2023 — 2025",
    location: "Remoto",
    summary:
      "Entreguei sistemas web e integrações em toda a stack, com foco crescente em automação e APIs.",
    responsibilities: [
      "Construir APIs REST e interfaces front-end para sistemas de clientes",
      "Integrar serviços de terceiros, webhooks e fluxos de mensagens",
      "Modernizar e manter aplicações existentes",
    ],
    technologies: ["C#", ".NET", "React", "TypeScript", "SQL Server", "Redis"],
    highlights: ["Entreguei integrações conectando sistemas legados a APIs modernas"],
  },
  {
    id: "systems-dev",
    role: "Desenvolvedor de Software",
    company: "Indústria / Sistemas",
    period: "2021 — 2023",
    location: "Santo André, Brasil",
    summary:
      "Desenvolvi e mantive sistemas de negócio com C# e .NET, construindo uma base sólida em back-end e dados.",
    responsibilities: [
      "Desenvolver lógica de negócio e acesso a dados com C# / .NET",
      "Modelar e consultar bancos de dados relacionais",
      "Dar suporte e evoluir sistemas em produção",
    ],
    technologies: ["C#", ".NET", "SQL Server", "MySQL"],
  },
];
