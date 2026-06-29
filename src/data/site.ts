/**
 * Fonte única de identidade + textos editoriais.
 * Mantenha todas as strings legíveis aqui para os componentes seguirem estruturais.
 */
export const site = {
  name: "Arthur Renzo",
  monogram: "AR",
  title: "Engenheiro de Software",
  roles: [
    "Engenheiro de Software",
    "Desenvolvedor Full-Stack",
    "Especialista em Automação",
  ],
  location: "Santo André · Brasil",
  locationShort: "Santo André, Brasil",
  timezone: "GMT-3",
  email: "arthur.renzospider@gmail.com",
  availability: "Disponível para projetos selecionados",

  company: {
    name: "CloudySolutions",
    role: "Fundador",
    description:
      "Um ecossistema de software, automações, bots e agentes de IA — não uma agência, mas uma oficina de sistemas digitais.",
  },

  seo: {
    title: "Arthur Renzo — Engenheiro de Software & Especialista em Automação",
    description:
      "Portfólio de Arthur Renzo, Engenheiro de Software focado em sistemas full-stack, automações inteligentes, APIs e soluções com IA.",
    url: "https://arthurrenzo.dev",
  },

  hero: {
    /** Renderizado linha a linha, com revelações por máscara mais à frente. */
    headline: ["Eu construo sistemas,", "automações e", "experiências digitais."],
    support:
      "Engenheiro de Software focado em sistemas full-stack, automações inteligentes, APIs e operações potencializadas por IA.",
    technologies: ["PYTHON", "C#", "REACT", "N8N", "APIS", "SISTEMAS DE IA"],
  },

  manifesto: {
    statement: [
      "A tecnologia não deveria apenas funcionar.",
      "Ela deveria conectar pessoas, processos",
      "e decisões.",
    ],
    body: "Eu projeto e construo sistemas completos — de interfaces e APIs a automações, integrações e agentes de IA — para que as partes em movimento se comportem como um único produto coerente.",
  },

  about: {
    lead: "Sou um engenheiro de software que gosta do meio pouco glamouroso das coisas: o contrato da API, a fila que nunca perde uma mensagem, a automação que roda quietinha às 3 da manhã.",
    paragraphs: [
      "Trabalho em toda a stack — Python e C# no back-end, React e TypeScript no front — mas o que me importa é o sistema como um todo: como os dados se movem, como os serviços conversam, onde ainda é preciso ter uma pessoa no circuito.",
      "Ultimamente, boa parte dessa energia vai para automações e operações com IA: produtos com o WhatsApp em primeiro lugar, fluxos no n8n, filas de mensagens e agentes conversacionais que tiram trabalho real das mãos das pessoas.",
      "Toco a CloudySolutions, onde levo essas ideias de ponta a ponta — do primeiro webhook ao produto rodando.",
    ],
    interests: [
      "Construir produtos",
      "Resolver problemas reais",
      "Automações",
      "Integração de sistemas",
      "Experiências digitais",
      "Empreender",
    ],
    education: "Autodidata · Contínuo",
  },

  contact: {
    headline: ["Vamos construir", "algo útil."],
    body: "Tem um sistema para projetar, uma automação para colocar no ar ou uma operação para deixar mais inteligente? Vamos conversar.",
    cta: "Iniciar uma conversa",
  },
} as const;

export type Site = typeof site;
