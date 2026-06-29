import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { cn } from "@/utils/cn";
import { navLinks } from "@/data/navigation";
import { hashId, scrollToId } from "@/utils/scroll";
import { useScrollState } from "@/hooks/useScrollState";
import { Monogram } from "./Monogram";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const scrolled = useScrollState(32);
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleHashNav = (href: string) => (e: React.MouseEvent) => {
    const id = hashId(href);
    if (id && pathname === "/") {
      e.preventDefault();
      scrollToId(id);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled
            ? "border-b border-border-secondary bg-background-primary/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[var(--container-page)] items-center justify-between px-6 sm:px-10 lg:px-16">
          <div className="flex items-center gap-4">
            <Monogram />
            <span className="hidden items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-text-muted lg:flex">
              <span aria-hidden className="h-3 w-px bg-border-primary" />
              Systems in Motion
            </span>
          </div>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 md:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={handleHashNav(link.href)}
                className="relative font-mono text-[0.7rem] uppercase tracking-[0.18em] text-text-secondary transition-colors duration-300 hover:text-text-primary after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/#contact"
              onClick={handleHashNav("/#contact")}
              className="border border-border-primary px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-text-primary transition-colors duration-300 hover:border-text-muted hover:bg-surface-primary"
            >
              Let&apos;s talk
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid size-10 place-items-center border border-border-primary text-text-primary transition-colors hover:border-text-muted md:hidden"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
