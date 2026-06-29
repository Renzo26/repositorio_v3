import { Seo } from "@/components/layout/Seo";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/data/site";

export function AboutPage() {
  return (
    <>
      <Seo
        title={`Sobre — ${site.name}`}
        description={site.about.lead}
      />
      <div className="pt-12" />
      <About />
      <Contact />
    </>
  );
}
