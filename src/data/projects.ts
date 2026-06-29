import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "01",
    slug: "mecaflow",
    title: "MecaFlow",
    tagline: "An operations brain for auto repair shops, run from WhatsApp.",
    description:
      "A multi-tenant SaaS that turns a mechanic's WhatsApp into a real operation: automated service, scheduling, customers and vehicles, conversation history and AI agents that handle the repetitive parts.",
    meta: {
      category: "SaaS / Automotive",
      role: "Software Engineer",
      focus: "Automation / AI / Operations",
      year: "2026",
    },
    technologies: [
      "React",
      "Python",
      "FastAPI",
      "n8n",
      "PostgreSQL",
      "WhatsApp API",
      "OpenAI",
      "Redis",
    ],
    accentColor: "pastel-sage",
    systemState: "mecaflow",
    coverImage: "/projects/mecaflow-cover.webp",
    sections: [
      {
        id: "overview",
        label: "Overview",
        title: "One inbox, one source of truth",
        body: [
          "Repair shops live in WhatsApp, but WhatsApp forgets. MecaFlow sits on top of it and gives a shop a real backbone: every conversation, appointment, customer and vehicle in one place, with automation handling first contact and follow-ups.",
          "It's built multi-tenant from day one — each shop is an isolated workspace sharing the same hardened platform.",
        ],
      },
      {
        id: "problem",
        label: "Problem",
        title: "Service that doesn't scale past the owner",
        body: [
          "A small shop answers the same five questions all day, loses appointments in the chat scroll, and has no history when a returning customer shows up. The owner becomes the database.",
          "The goal wasn't a chatbot. It was to take the predictable load off people while keeping a human in control of anything that matters.",
        ],
      },
      {
        id: "context",
        label: "Context",
        title: "WhatsApp-first, low-friction",
        body: [
          "The product had to meet shops where they already are. No new app to learn for the customer, no behavior change — the entry point stays WhatsApp, the structure happens behind it.",
        ],
      },
      {
        id: "responsibilities",
        label: "Role",
        title: "End to end",
        body: [
          "I own the system across the stack: data model, API, automation layer, AI agents and the operator-facing interface.",
        ],
        bullets: [
          "Multi-tenant data model and async API (FastAPI + SQLAlchemy 2)",
          "WhatsApp ingestion and outbound via a self-hosted gateway",
          "n8n flows for scheduling, reminders and routing",
          "Conversational AI agents with guardrails and handoff",
          "Operator dashboard in React with real-time updates",
        ],
      },
      {
        id: "architecture",
        label: "Architecture",
        title: "Layered, async, event-driven",
        body: [
          "FastAPI is split strictly into api / services / models / schemas, with SQLAlchemy 2 async over PostgreSQL (Supabase). Redis backs caching and queues; Server-Sent Events push live updates to the dashboard.",
          "Messaging runs through a self-hosted WhatsApp gateway into n8n, which orchestrates flows and calls the AI layer. Agents are scoped per tenant and can hand a conversation back to a human at any point.",
        ],
      },
      {
        id: "interface",
        label: "Interface",
        title: "Built for the counter, not the showroom",
        body: [
          "The operator view is dense but calm: live conversations, today's schedule, customer and vehicle history one click away. It assumes someone busy, mid-task, on a shop computer.",
        ],
      },
      {
        id: "decisions",
        label: "Decisions",
        title: "Choices that kept it honest",
        body: [
          "A few decisions shaped everything else.",
        ],
        bullets: [
          "Multi-tenant from the first migration — retrofitting isolation is a tax you pay forever.",
          "Async everywhere so a slow third-party call never blocks the request path.",
          "AI as an assistant with explicit handoff, never an unsupervised black box.",
          "n8n for orchestration so non-code changes don't require a deploy.",
        ],
      },
      {
        id: "limitations",
        label: "Limitations",
        title: "Known edges",
        body: [
          "The WhatsApp gateway is self-hosted, which trades convenience for control and adds an operational surface. Agent quality depends on per-tenant context that still needs curation. Both are deliberate, both are on the roadmap.",
        ],
      },
      {
        id: "results",
        label: "Results",
        title: "Less typing, fewer dropped threads",
        body: [
          "First contact and routine follow-ups are handled automatically; the team steps in where judgment is needed. Conversations, appointments and history stop living in someone's memory.",
        ],
      },
      {
        id: "next",
        label: "Next",
        title: "Where it goes",
        body: [
          "Deeper analytics per shop, richer agent tooling (parts, quotes, payments), and a path toward a multi-channel inbox beyond WhatsApp.",
        ],
      },
    ],
  },

  {
    id: "02",
    slug: "automation-platform",
    title: "Automation Platform",
    tagline: "The plumbing behind the products: queues, webhooks, agents.",
    description:
      "A reusable architecture for automations, integrations, queues, AI agents and WhatsApp communication — the shared substrate that other products plug into instead of rebuilding.",
    meta: {
      category: "Platform / Infrastructure",
      role: "Software Engineer",
      focus: "Integration / Queues / AI Agents",
      year: "2026",
    },
    technologies: [
      "n8n",
      "Webhooks",
      "RabbitMQ",
      "Redis",
      "Python",
      "FastAPI",
      "WhatsApp API",
      "AI Agents",
    ],
    accentColor: "pastel-lilac",
    systemState: "automation",
    coverImage: "/projects/automation-cover.webp",
    sections: [
      {
        id: "overview",
        label: "Overview",
        title: "Stop rebuilding the same wiring",
        body: [
          "Every automation project needs the same backbone: a way to receive events, a queue to absorb spikes, a place to run agents, and a channel to talk to people. This platform is that backbone, made once and made well.",
        ],
      },
      {
        id: "problem",
        label: "Problem",
        title: "Integrations rot in isolation",
        body: [
          "One-off webhooks and scripts work until they don't — a provider rate-limits, a job fails silently, a retry storm takes down a downstream. Without shared infrastructure, every project relearns the same lessons.",
        ],
      },
      {
        id: "context",
        label: "Context",
        title: "A substrate, not a product",
        body: [
          "This isn't user-facing. It exists so user-facing things can be built faster and survive contact with the real world.",
        ],
      },
      {
        id: "architecture",
        label: "Architecture",
        title: "Events in, work out",
        body: [
          "Webhooks land on thin FastAPI endpoints that validate and enqueue. RabbitMQ handles durable work distribution; Redis covers fast state, dedup and rate limiting. n8n orchestrates the human-readable flows, and an agent layer handles the language-shaped tasks.",
          "Everything is designed to degrade gracefully: backpressure over dropped messages, retries with idempotency, dead-letter queues over silent failure.",
        ],
      },
      {
        id: "decisions",
        label: "Decisions",
        title: "Reliability first",
        body: ["The platform optimizes for not losing work."],
        bullets: [
          "Idempotency keys on every side effect so retries are safe.",
          "Queues as shock absorbers between fast intake and slow processing.",
          "n8n for orchestration, code for the parts that need tests.",
          "Observability baked in — a failed job should be visible, not mysterious.",
        ],
      },
      {
        id: "limitations",
        label: "Limitations",
        title: "Known edges",
        body: [
          "A shared platform is a shared blast radius; changes need discipline. Operational complexity is higher than a script — justified only because it's reused.",
        ],
      },
      {
        id: "results",
        label: "Results",
        title: "New automations in days, not weeks",
        body: [
          "Products like MecaFlow stand on this layer instead of reinventing it, which means new automations ship faster and fail more gracefully.",
        ],
      },
      {
        id: "next",
        label: "Next",
        title: "Where it goes",
        body: [
          "A clearer agent SDK, first-class tracing across flows, and templated blueprints for the most common integration shapes.",
        ],
      },
    ],
  },

  {
    id: "03",
    slug: "cloudysolutions",
    title: "CloudySolutions",
    tagline: "A workshop for software, automations and AI — not an agency.",
    description:
      "An ecosystem for building systems, automations, bots, AI agents and digital modernization. Less a service menu, more a place where ideas become running software.",
    meta: {
      category: "Studio / Ecosystem",
      role: "Founder",
      focus: "Systems / Automation / AI",
      year: "2025",
    },
    technologies: [
      "Python",
      "C#",
      "React",
      "TypeScript",
      "n8n",
      "PostgreSQL",
      "AI Agents",
    ],
    accentColor: "pastel-blue",
    systemState: "cloudy",
    coverImage: "/projects/cloudy-cover.webp",
    sections: [
      {
        id: "overview",
        label: "Overview",
        title: "An ecosystem, not a deliverable",
        body: [
          "CloudySolutions is the umbrella over the work — products like MecaFlow, the automation platform underneath them, and the client systems built on the same foundations.",
          "The thesis is simple: most businesses don't need another tool, they need their existing tools to actually talk to each other and run themselves.",
        ],
      },
      {
        id: "problem",
        label: "Problem",
        title: "Software that stops at the demo",
        body: [
          "Plenty of solutions look great and never reach production. The hard part is the unglamorous middle — integration, reliability, the operation around the feature.",
        ],
      },
      {
        id: "context",
        label: "Context",
        title: "Building in public, end to end",
        body: [
          "CloudySolutions exists to take ideas the whole distance: from the first webhook to a system someone depends on every day.",
        ],
      },
      {
        id: "decisions",
        label: "Approach",
        title: "How the work is run",
        body: ["A consistent way of building underneath every project."],
        bullets: [
          "Shared platform and conventions, so each project compounds the last.",
          "Automation and AI as leverage, applied where they remove real toil.",
          "Systems thinking over feature lists — design the whole loop.",
          "Ship to production; a demo is not a result.",
        ],
      },
      {
        id: "results",
        label: "Results",
        title: "A compounding portfolio",
        body: [
          "Each product feeds the next: patterns, infrastructure and agents built for one engagement become the starting point for the following one.",
        ],
      },
      {
        id: "next",
        label: "Next",
        title: "Where it goes",
        body: [
          "More productized offerings around automation and AI operations, and a clearer public face for the ecosystem.",
        ],
      },
    ],
  },
];

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const projectIndexBySlug = (slug: string): number =>
  projects.findIndex((p) => p.slug === slug);
