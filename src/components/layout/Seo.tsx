import { useEffect } from "react";
import { site } from "@/data/site";

interface SeoProps {
  title?: string;
  description?: string;
}

function setMeta(name: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[name="${name}"]`,
  );
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

/**
 * Per-route document head updates. Intentionally dependency-free
 * (no react-helmet). Replaceable by SSR meta in a later stage.
 */
export function Seo({ title, description }: SeoProps) {
  const resolvedTitle = title ?? site.seo.title;
  const resolvedDescription = description ?? site.seo.description;

  useEffect(() => {
    document.title = resolvedTitle;
    setMeta("description", resolvedDescription);
  }, [resolvedTitle, resolvedDescription]);

  return null;
}
