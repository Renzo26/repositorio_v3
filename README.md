# Arthur Renzo — Portfólio · *Sistemas em Movimento*

Portfólio pessoal de **Arthur Renzo** — Engenheiro de Software, Desenvolvedor
Full-Stack, especialista em automações e IA, fundador da CloudySolutions.

O conceito — **Sistemas em Movimento** ("Systems in Motion") — visualiza
sistemas de software, APIs, automações, bancos de dados e IA trabalhando como
um só. Design editorial (70%) encontra uma experiência 3D interativa (30%):
fundo quase preto, tipografia grande, muito espaço negativo e um objeto 3D
autoral — o **System Core** — que funciona como elemento narrativo persistente
ao longo da página.

## Stack

- **React 19** + **TypeScript** (strict) + **Vite**
- **React Router** (data router, rotas com code-splitting)
- **Tailwind CSS v4** (design tokens via `@theme`)
- **Geist** + **Geist Mono** (auto-hospedadas via `@fontsource-variable`)
- **lucide-react** para ícones
- _Planejados:_ GSAP + ScrollTrigger, Lenis (smooth scroll), Three.js / React
  Three Fiber / Drei (o System Core)

## Estrutura do projeto

```
src/
  components/   common · layout · navigation · sections · three
  pages/        Home · Project (estudo de caso) · About · Contact · NotFound
  routes/       router (createBrowserRouter + lazy)
  data/         site · projects · experience · technologies · social · navigation
  types/        modelo de conteúdo tipado
  hooks/  utils/  constants/  styles/
```

Todo o conteúdo vive em `src/data/*` — adicionar um projeto é editar dados, não
componentes.

## Scripts

```bash
npm install
npm run dev       # inicia o servidor de desenvolvimento
npm run build     # type-check (strict) + build de produção
npm run preview   # pré-visualiza o build de produção
```

## Roadmap

Construído em etapas, executável a cada checkpoint:

1. **Scaffold + design tokens** ✅
2. **Home estática e responsiva + roteamento** ✅
3. Lenis + GSAP / ScrollTrigger (animações)
4. System Core (Three.js / R3F) com estados por seção
5. Transições de rota · command palette · microinterações
6. Performance · acessibilidade · SEO (polimento final)

> Estado atual: **etapas 1–2 concluídas**. Parte do conteúdo (URLs sociais,
> timeline de experiência, foto e imagens de capa dos projetos) é placeholder,
> marcado em `src/data/*`, aguardando os assets reais.
