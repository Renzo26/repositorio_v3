import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";
import { navLinks } from "@/data/navigation";
import { socialLinks } from "@/data/socialLinks";
import { site } from "@/data/site";
import { hashId, scrollToId } from "@/utils/scroll";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Fullscreen mobile navigation overlay with staggered link reveals. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useBodyScrollLock(open);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleNav = (href: string) => (e: React.MouseEvent) => {
    const id = hashId(href);
    onClose();
    if (id && pathname === "/") {
      e.preventDefault();
      // let the overlay close first, then scroll
      window.setTimeout(() => scrollToId(id), 120);
    } else if (id) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-[60] flex flex-col bg-background-primary md:hidden",
        "transition-[opacity,visibility] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <div className="flex items-center justify-between px-6 py-5">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-text-muted">
          {site.monogram} · Menu
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid size-10 place-items-center border border-border-primary text-text-primary transition-colors hover:border-text-muted"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
        {navLinks.map((link, i) => (
          <Link
            key={link.label}
            to={link.href}
            onClick={handleNav(link.href)}
            style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
            className={cn(
              "border-b border-border-secondary py-5 text-5xl font-medium tracking-tight text-text-primary",
              "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            <span className="mr-3 font-mono text-sm text-text-muted align-middle">
              0{i + 1}
            </span>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex flex-wrap gap-x-6 gap-y-2 px-6 py-8">
        {socialLinks.map((s) => (
          <a
            key={s.label}
            href={s.href}
            {...(s.href.startsWith("http")
              ? { target: "_blank", rel: "noreferrer noopener" }
              : {})}
            className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-text-secondary"
          >
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}
