# Arthur Renzo — Portfolio · *Systems in Motion*

Personal portfolio of **Arthur Renzo** — Software Engineer, Full-Stack Developer,
automation & AI specialist, founder of CloudySolutions.

The concept — **Systems in Motion** — visualizes software systems, APIs,
automations, databases and AI working as one. Editorial design (70%) meets an
interactive 3D experience (30%): near-black canvas, large typography, generous
negative space, and an authorial 3D object — the **System Core** — that runs as
a persistent narrative element across the page.

## Stack

- **React 19** + **TypeScript** (strict) + **Vite**
- **React Router** (data router, code-split routes)
- **Tailwind CSS v4** (design tokens via `@theme`)
- **Geist** + **Geist Mono** (self-hosted via `@fontsource-variable`)
- **lucide-react** for icons
- _Planned:_ GSAP + ScrollTrigger, Lenis (smooth scroll), Three.js / React Three
  Fiber / Drei (the System Core)

## Project structure

```
src/
  components/   common · layout · navigation · sections · three
  pages/        Home · Project (case study) · About · Contact · NotFound
  routes/       router (createBrowserRouter + lazy)
  data/         site · projects · experience · technologies · social · navigation
  types/        typed content model
  hooks/  utils/  constants/  styles/
```

All copy lives in `src/data/*` — adding a project means editing data, not components.

## Scripts

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check (strict) + production build
npm run preview   # preview the production build
```

## Roadmap

Built in stages, runnable at each checkpoint:

1. **Scaffold + design tokens** ✅
2. **Static, responsive home + routing** ✅
3. Lenis + GSAP / ScrollTrigger animations
4. System Core (Three.js / R3F) with per-section states
5. Route transitions · command palette · microinteractions
6. Performance · accessibility · SEO polish

> Current state: **stages 1–2 complete**. Some content (social URLs, the
> experience timeline, portrait and project cover images) is placeholder,
> marked in `src/data/*`, pending real assets.
