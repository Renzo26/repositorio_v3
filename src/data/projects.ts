import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "01",
    slug: "mecaflow",
    title: "MecaFlow",
    tagline:
      "Um cérebro operacional para oficinas mecânicas, controlado pelo WhatsApp.",
    description:
      "Um SaaS multi-tenant que transforma o WhatsApp de uma oficina em uma operação de verdade: atendimento automatizado, agendamentos, clientes e veículos, histórico de conversas e agentes de IA que cuidam das partes repetitivas.",
    meta: {
      category: "SaaS / Automotivo",
      role: "Engenheiro de Software",
      focus: "Automação / IA / Operações",
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
        label: "Visão geral",
        title: "Uma caixa de entrada, uma fonte da verdade",
        body: [
          "As oficinas vivem no WhatsApp, mas o WhatsApp esquece. O MecaFlow se apoia em cima dele e dá à oficina uma espinha dorsal de verdade: cada conversa, agendamento, cliente e veículo em um só lugar, com a automação cuidando do primeiro contato e dos retornos.",
          "É multi-tenant desde o primeiro dia — cada oficina é um espaço isolado compartilhando a mesma plataforma robusta.",
        ],
      },
      {
        id: "problem",
        label: "Problema",
        title: "Um atendimento que não escala além do dono",
        body: [
          "Uma oficina pequena responde as mesmas cinco perguntas o dia inteiro, perde agendamentos na rolagem do chat e não tem histórico quando um cliente volta. O dono vira o banco de dados.",
          "O objetivo não era um chatbot. Era tirar a carga previsível das pessoas, mantendo um humano no controle de tudo que importa.",
        ],
      },
      {
        id: "context",
        label: "Contexto",
        title: "WhatsApp em primeiro lugar, baixo atrito",
        body: [
          "O produto tinha que encontrar as oficinas onde elas já estão. Nenhum app novo para o cliente aprender, nenhuma mudança de comportamento — o ponto de entrada continua sendo o WhatsApp, a estrutura acontece por trás.",
        ],
      },
      {
        id: "responsibilities",
        label: "Função",
        title: "De ponta a ponta",
        body: [
          "Sou dono do sistema em toda a stack: modelo de dados, API, camada de automação, agentes de IA e a interface para o operador.",
        ],
        bullets: [
          "Modelo de dados multi-tenant e API assíncrona (FastAPI + SQLAlchemy 2)",
          "Recebimento e envio no WhatsApp via gateway self-hosted",
          "Fluxos no n8n para agendamentos, lembretes e roteamento",
          "Agentes de IA conversacionais com guard-rails e transferência para humano",
          "Painel do operador em React com atualizações em tempo real",
        ],
      },
      {
        id: "architecture",
        label: "Arquitetura",
        title: "Em camadas, assíncrona, orientada a eventos",
        body: [
          "O FastAPI é dividido estritamente em api / services / models / schemas, com SQLAlchemy 2 assíncrono sobre PostgreSQL (Supabase). O Redis cuida de cache e filas; Server-Sent Events enviam atualizações ao vivo para o painel.",
          "As mensagens passam por um gateway de WhatsApp self-hosted até o n8n, que orquestra os fluxos e chama a camada de IA. Os agentes têm escopo por tenant e podem devolver a conversa para um humano a qualquer momento.",
        ],
      },
      {
        id: "interface",
        label: "Interface",
        title: "Feito para o balcão, não para a vitrine",
        body: [
          "A visão do operador é densa, mas calma: conversas ao vivo, a agenda do dia, histórico de cliente e veículo a um clique. Ela parte do princípio de que tem alguém ocupado, no meio de uma tarefa, num computador de oficina.",
        ],
      },
      {
        id: "decisions",
        label: "Decisões",
        title: "Escolhas que mantiveram tudo honesto",
        body: ["Algumas decisões moldaram todo o resto."],
        bullets: [
          "Multi-tenant desde a primeira migração — adicionar isolamento depois é um imposto que você paga para sempre.",
          "Assíncrono em todo lugar para que uma chamada lenta a terceiros nunca trave o caminho da requisição.",
          "IA como assistente com transferência explícita, nunca uma caixa-preta sem supervisão.",
          "n8n para orquestração para que mudanças sem código não exijam deploy.",
        ],
      },
      {
        id: "limitations",
        label: "Limitações",
        title: "Arestas conhecidas",
        body: [
          "O gateway de WhatsApp é self-hosted, o que troca conveniência por controle e adiciona uma superfície operacional. A qualidade do agente depende de contexto por tenant que ainda precisa de curadoria. Ambos são deliberados, ambos estão no roadmap.",
        ],
      },
      {
        id: "results",
        label: "Resultados",
        title: "Menos digitação, menos conversas perdidas",
        body: [
          "O primeiro contato e os retornos de rotina são tratados automaticamente; a equipe entra onde é preciso ter julgamento. Conversas, agendamentos e histórico deixam de viver na memória de alguém.",
        ],
      },
      {
        id: "next",
        label: "Próximo",
        title: "Para onde vai",
        body: [
          "Análises mais profundas por oficina, ferramentas mais ricas para os agentes (peças, orçamentos, pagamentos) e um caminho rumo a uma caixa de entrada multicanal para além do WhatsApp.",
        ],
      },
    ],
  },

  {
    id: "02",
    slug: "automation-platform",
    title: "Plataforma de Automação",
    tagline: "O encanamento por trás dos produtos: filas, webhooks, agentes.",
    description:
      "Uma arquitetura reutilizável para automações, integrações, filas, agentes de IA e comunicação por WhatsApp — o substrato compartilhado em que os outros produtos se conectam em vez de reconstruir tudo.",
    meta: {
      category: "Plataforma / Infraestrutura",
      role: "Engenheiro de Software",
      focus: "Integração / Filas / Agentes de IA",
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
      "Agentes de IA",
    ],
    accentColor: "pastel-lilac",
    systemState: "automation",
    coverImage: "/projects/automation-cover.webp",
    sections: [
      {
        id: "overview",
        label: "Visão geral",
        title: "Pare de reconstruir a mesma fiação",
        body: [
          "Todo projeto de automação precisa da mesma espinha dorsal: um jeito de receber eventos, uma fila para absorver picos, um lugar para rodar agentes e um canal para falar com as pessoas. Esta plataforma é essa espinha dorsal, feita uma vez e feita bem.",
        ],
      },
      {
        id: "problem",
        label: "Problema",
        title: "Integrações apodrecem isoladas",
        body: [
          "Webhooks e scripts avulsos funcionam até pararem de funcionar — um provedor limita a taxa, um job falha em silêncio, uma tempestade de retries derruba algo downstream. Sem infraestrutura compartilhada, cada projeto reaprende as mesmas lições.",
        ],
      },
      {
        id: "context",
        label: "Contexto",
        title: "Um substrato, não um produto",
        body: [
          "Isto não é voltado para o usuário final. Existe para que as coisas voltadas ao usuário sejam construídas mais rápido e sobrevivam ao contato com o mundo real.",
        ],
      },
      {
        id: "architecture",
        label: "Arquitetura",
        title: "Eventos entram, trabalho sai",
        body: [
          "Os webhooks chegam em endpoints FastAPI enxutos, que validam e enfileiram. O RabbitMQ cuida da distribuição durável de trabalho; o Redis cobre estado rápido, deduplicação e rate limiting. O n8n orquestra os fluxos legíveis por humanos, e uma camada de agentes cuida das tarefas com cara de linguagem.",
          "Tudo é projetado para degradar com elegância: backpressure em vez de mensagens descartadas, retries com idempotência, dead-letter queues em vez de falha silenciosa.",
        ],
      },
      {
        id: "decisions",
        label: "Decisões",
        title: "Confiabilidade em primeiro lugar",
        body: ["A plataforma é otimizada para não perder trabalho."],
        bullets: [
          "Chaves de idempotência em todo efeito colateral para que os retries sejam seguros.",
          "Filas como amortecedores entre a entrada rápida e o processamento lento.",
          "n8n para orquestração, código para as partes que precisam de testes.",
          "Observabilidade embutida — um job que falhou deve ser visível, não um mistério.",
        ],
      },
      {
        id: "limitations",
        label: "Limitações",
        title: "Arestas conhecidas",
        body: [
          "Uma plataforma compartilhada é um raio de impacto compartilhado; mudanças exigem disciplina. A complexidade operacional é maior que a de um script — justificada só porque é reutilizada.",
        ],
      },
      {
        id: "results",
        label: "Resultados",
        title: "Novas automações em dias, não semanas",
        body: [
          "Produtos como o MecaFlow se apoiam nesta camada em vez de reinventá-la, o que faz novas automações irem ao ar mais rápido e falharem com mais elegância.",
        ],
      },
      {
        id: "next",
        label: "Próximo",
        title: "Para onde vai",
        body: [
          "Um SDK de agentes mais claro, rastreamento de primeira classe entre os fluxos e blueprints prontos para os formatos de integração mais comuns.",
        ],
      },
    ],
  },

  {
    id: "03",
    slug: "cloudysolutions",
    title: "CloudySolutions",
    tagline: "Uma oficina de software, automações e IA — não uma agência.",
    description:
      "Um ecossistema para construir sistemas, automações, bots, agentes de IA e modernização digital. Menos um cardápio de serviços, mais um lugar onde ideias viram software rodando.",
    meta: {
      category: "Estúdio / Ecossistema",
      role: "Fundador",
      focus: "Sistemas / Automação / IA",
      year: "2025",
    },
    technologies: [
      "Python",
      "C#",
      "React",
      "TypeScript",
      "n8n",
      "PostgreSQL",
      "Agentes de IA",
    ],
    accentColor: "pastel-blue",
    systemState: "cloudy",
    coverImage: "/projects/cloudy-cover.webp",
    sections: [
      {
        id: "overview",
        label: "Visão geral",
        title: "Um ecossistema, não uma entrega",
        body: [
          "A CloudySolutions é o guarda-chuva sobre o trabalho — produtos como o MecaFlow, a plataforma de automação por baixo deles e os sistemas de clientes construídos sobre as mesmas fundações.",
          "A tese é simples: a maioria dos negócios não precisa de mais uma ferramenta, precisa que as ferramentas que já tem realmente conversem entre si e funcionem por conta própria.",
        ],
      },
      {
        id: "problem",
        label: "Problema",
        title: "Software que para na demo",
        body: [
          "Muita solução fica linda e nunca chega à produção. A parte difícil é o meio pouco glamouroso — integração, confiabilidade, a operação ao redor da funcionalidade.",
        ],
      },
      {
        id: "context",
        label: "Contexto",
        title: "Construindo à vista, de ponta a ponta",
        body: [
          "A CloudySolutions existe para levar as ideias até o fim: do primeiro webhook a um sistema do qual alguém depende todos os dias.",
        ],
      },
      {
        id: "decisions",
        label: "Abordagem",
        title: "Como o trabalho é tocado",
        body: ["Um jeito consistente de construir por baixo de cada projeto."],
        bullets: [
          "Plataforma e convenções compartilhadas, para que cada projeto componha sobre o anterior.",
          "Automação e IA como alavanca, aplicadas onde removem trabalho braçal de verdade.",
          "Pensamento sistêmico em vez de listas de funcionalidades — projetar o circuito inteiro.",
          "Entregar em produção; uma demo não é um resultado.",
        ],
      },
      {
        id: "results",
        label: "Resultados",
        title: "Um portfólio que compõe",
        body: [
          "Cada produto alimenta o próximo: padrões, infraestrutura e agentes construídos para um trabalho viram o ponto de partida do seguinte.",
        ],
      },
      {
        id: "next",
        label: "Próximo",
        title: "Para onde vai",
        body: [
          "Mais ofertas produtizadas em torno de automação e operações com IA, e uma cara pública mais clara para o ecossistema.",
        ],
      },
    ],
  },
];

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const projectIndexBySlug = (slug: string): number =>
  projects.findIndex((p) => p.slug === slug);
