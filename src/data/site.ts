/**
 * Single source of truth for identity + editorial copy.
 * Keep all human-readable strings here so components stay structural.
 */
export const site = {
  name: "Arthur Renzo",
  monogram: "AR",
  title: "Software Engineer",
  roles: [
    "Software Engineer",
    "Full-Stack Developer",
    "Automation Specialist",
  ],
  location: "Santo André · Brazil",
  locationShort: "Santo André, Brazil",
  timezone: "GMT-3",
  email: "arthur.renzospider@gmail.com",
  availability: "Available for selected projects",

  company: {
    name: "CloudySolutions",
    role: "Founder",
    description:
      "An ecosystem for software, automations, bots and AI agents — not an agency, a workshop for digital systems.",
  },

  seo: {
    title: "Arthur Renzo — Software Engineer & Automation Specialist",
    description:
      "Portfolio of Arthur Renzo, Software Engineer focused on full-stack systems, intelligent automations, APIs and AI-powered solutions.",
    url: "https://arthurrenzo.dev",
  },

  hero: {
    /** Rendered line-by-line with masked reveals later. */
    headline: ["I build systems,", "automations and", "digital experiences."],
    support:
      "Software Engineer focused on full-stack systems, intelligent automations, APIs and AI-powered operations.",
    technologies: ["PYTHON", "C#", "REACT", "N8N", "APIS", "AI SYSTEMS"],
  },

  manifesto: {
    statement: [
      "Technology should not only work.",
      "It should connect people, processes",
      "and decisions.",
    ],
    body: "I design and build complete systems — from interfaces and APIs to automations, integrations and AI agents — so that the moving parts behave like one coherent product.",
  },

  about: {
    lead: "I'm a software engineer who likes the unglamorous middle of things: the API contract, the queue that never drops a message, the automation that quietly runs at 3am.",
    paragraphs: [
      "I work across the stack — Python and C# on the back end, React and TypeScript on the front — but what I care about is the system as a whole: how data moves, how services talk, where a human still needs to be in the loop.",
      "Lately most of that energy goes into automations and AI-powered operations: WhatsApp-first products, n8n workflows, message queues and conversational agents that take real work off people's hands.",
      "I run CloudySolutions, where I get to take these ideas end to end — from the first webhook to the running product.",
    ],
    interests: [
      "Building products",
      "Solving real problems",
      "Automations",
      "System integration",
      "Digital experiences",
      "Entrepreneurship",
    ],
    education: "Self-directed · Continuous",
  },

  contact: {
    headline: ["Let's build", "something useful."],
    body: "Have a system to design, an automation to ship, or an operation to make smarter? Start a conversation.",
    cta: "Start a conversation",
  },
} as const;

export type Site = typeof site;
