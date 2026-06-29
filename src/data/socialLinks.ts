import { Mail } from "lucide-react";
import type { SocialLink } from "@/types";
import { site } from "./site";

/**
 * Social links. URLs are placeholders (`#`) until the real handles land —
 * only the email is wired. Replace `href` values here. (lucide-react v1
 * dropped brand icons, so GitHub/LinkedIn/Instagram render as labels.)
 */
export const socialLinks: SocialLink[] = [
  { label: "GitHub", handle: "@arthurrenzo", href: "#" },
  { label: "LinkedIn", handle: "in/arthurrenzo", href: "#" },
  { label: "Instagram", handle: "@cloudysolutions", href: "#" },
  {
    label: "Email",
    handle: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
  },
];

/** Subset shown inline in the hero. */
export const heroLinks = [
  { label: "GitHub", href: "#", external: true },
  { label: "LinkedIn", href: "#", external: true },
] as const;
