import { ArrowLeft } from "lucide-react";
import { Seo } from "@/components/layout/Seo";
import { Container } from "@/components/common/Container";
import { AnimatedLink } from "@/components/common/AnimatedLink";
import { SystemCorePlaceholder } from "@/components/three/SystemCorePlaceholder";

export function NotFound() {
  return (
    <>
      <Seo title="Not found — Arthur Renzo" />
      <Container className="grid min-h-screen place-items-center text-center">
        <div className="relative flex flex-col items-center">
          <SystemCorePlaceholder
            accent="pastel-peach"
            className="mb-10 w-44 opacity-70"
          />
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-text-muted">
            Error 404 · Disconnected module
          </p>
          <h1 className="mt-5 text-[clamp(3rem,12vw,7rem)] font-medium leading-none tracking-[-0.04em] text-text-primary">
            Lost the signal
          </h1>
          <p className="text-pretty mt-5 max-w-sm text-base leading-relaxed text-text-secondary">
            This route isn&apos;t part of the system. Let&apos;s get you back to
            a connected node.
          </p>
          <AnimatedLink
            to="/"
            className="mt-8 font-mono text-xs uppercase tracking-[0.18em]"
          >
            <ArrowLeft size={14} /> Back to index
          </AnimatedLink>
        </div>
      </Container>
    </>
  );
}
