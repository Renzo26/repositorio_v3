import { Seo } from "@/components/layout/Seo";
import { useScrollToHash } from "@/hooks/useScrollToHash";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Experience } from "@/components/sections/Experience";
import { TechnicalEcosystem } from "@/components/sections/TechnicalEcosystem";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export function HomePage() {
  useScrollToHash();

  return (
    <>
      <Seo />
      <Hero />
      <Manifesto />
      <SelectedWork />
      <Experience />
      <TechnicalEcosystem />
      <About />
      <Contact />
    </>
  );
}
