import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/navigation/Navbar";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Footer } from "./Footer";

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">
        Carregando…
      </span>
    </div>
  );
}

/** Shared shell: smooth scroll, skip link, nav, routed content, footer. */
export function AppLayout() {
  useSmoothScroll();

  return (
    <div className="relative flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only rounded-sm bg-text-primary px-4 py-2 font-mono text-xs uppercase tracking-widest text-background-primary focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
      >
        Pular para o conteúdo
      </a>

      <Navbar />

      <main id="main" className="flex-1">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
