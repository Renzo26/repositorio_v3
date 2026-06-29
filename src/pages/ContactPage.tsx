import { Seo } from "@/components/layout/Seo";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/data/site";

export function ContactPage() {
  return (
    <>
      <Seo
        title={`Contact — ${site.name}`}
        description={site.contact.body}
      />
      <div className="pt-12" />
      <Contact />
    </>
  );
}
