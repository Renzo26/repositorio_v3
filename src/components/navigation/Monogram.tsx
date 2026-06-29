import { useRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import { site } from "@/data/site";
import { useSystemCore } from "@/contexts/SystemCoreContext";

interface MonogramProps {
  className?: string;
  onClick?: () => void;
}

/**
 * "AR" monogram — links home. Three quick clicks toggle the EXPLODED VIEW
 * easter egg (only while the 3D core is active).
 */
export function Monogram({ className, onClick }: MonogramProps) {
  const { enabled, exploded, toggleExploded } = useSystemCore();
  const taps = useRef<number[]>([]);

  const handleClick = () => {
    onClick?.();
    if (!enabled) return;
    const now = Date.now();
    taps.current = taps.current.filter((t) => now - t < 1200);
    taps.current.push(now);
    if (taps.current.length >= 3) {
      taps.current = [];
      toggleExploded();
    }
  };

  return (
    <Link
      to="/"
      onClick={handleClick}
      aria-label={`${site.name} — início`}
      className={cn(
        "group inline-flex items-center gap-2.5 select-none",
        className,
      )}
    >
      <span className="relative grid size-9 place-items-center border border-border-primary text-sm font-medium tracking-tight text-text-primary transition-colors duration-300 group-hover:border-text-muted">
        {site.monogram}
        <span
          aria-hidden
          className={cn(
            "absolute -right-1 -top-1 size-1.5 rounded-full transition-colors",
            exploded ? "bg-pastel-peach" : "bg-pastel-lilac",
          )}
        />
      </span>
    </Link>
  );
}
