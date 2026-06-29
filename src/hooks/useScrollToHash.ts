import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToId } from "@/utils/scroll";

/**
 * Scrolls to the URL hash on mount / hash change. Used by the home page so
 * "/#work" style links work after a route change. A small delay lets the
 * route content paint first.
 */
export function useScrollToHash(): void {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const t = window.setTimeout(() => scrollToId(id), 60);
    return () => window.clearTimeout(t);
  }, [hash]);
}
