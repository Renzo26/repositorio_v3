import type { AccentColor } from "@/types";
import { ACCENT_HEX } from "@/types";
import { cn } from "@/utils/cn";

interface SystemCorePlaceholderProps {
  accent?: AccentColor;
  className?: string;
  /** Disable ambient motion (used for reduced-motion / static contexts). */
  still?: boolean;
}

const NODES = [
  { x: 200, y: 60, r: 9, filled: true },
  { x: 332, y: 150, r: 7, filled: false },
  { x: 316, y: 300, r: 11, filled: true },
  { x: 150, y: 340, r: 7, filled: false },
  { x: 58, y: 232, r: 9, filled: false },
  { x: 96, y: 92, r: 6, filled: true },
] as const;

/**
 * Static, abstract representation of the System Core - nodes, connectors
 * and orbiting rings. Used as the no-WebGL / reduced-motion fallback.
 */
export function SystemCorePlaceholder({
  accent = "pastel-lilac",
  className,
  still = false,
}: SystemCorePlaceholderProps) {
  const color = ACCENT_HEX[accent];

  return (
    <div
      className={cn(
        "relative aspect-square w-full select-none",
        !still && "animate-float",
        className,
      )}
      aria-hidden
    >
      <div
        className="absolute inset-[12%] rounded-full blur-3xl opacity-40"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 65%)`,
        }}
      />

      <svg
        viewBox="0 0 400 400"
        fill="none"
        className="relative z-10 h-full w-full overflow-visible"
      >
        <g
          className={cn(!still && "animate-spin-slow")}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <ellipse
            cx="200"
            cy="200"
            rx="152"
            ry="56"
            stroke="var(--color-border-primary)"
            strokeWidth="1"
            transform="rotate(-18 200 200)"
          />
          <circle
            cx="200"
            cy="200"
            r="168"
            stroke="var(--color-border-secondary)"
            strokeWidth="1"
            strokeDasharray="2 9"
          />
        </g>
        <g
          className={cn(!still && "animate-spin-reverse")}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <ellipse
            cx="200"
            cy="200"
            rx="112"
            ry="124"
            stroke="var(--color-border-primary)"
            strokeWidth="1"
            transform="rotate(26 200 200)"
          />
        </g>

        <g stroke={color} strokeWidth="1" opacity="0.55">
          {NODES.map((n, i) => (
            <line key={i} x1="200" y1="200" x2={n.x} y2={n.y} />
          ))}
        </g>

        <g>
          {NODES.map((n, i) => (
            <g
              key={i}
              className={cn(!still && "animate-pulse-node")}
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              <rect
                x={n.x - n.r}
                y={n.y - n.r}
                width={n.r * 2}
                height={n.r * 2}
                rx="3"
                fill={n.filled ? color : "var(--color-surface-secondary)"}
                stroke={color}
                strokeWidth="1"
                opacity={n.filled ? 0.9 : 1}
              />
            </g>
          ))}
        </g>

        <g style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <rect
            x="166"
            y="166"
            width="68"
            height="68"
            rx="10"
            fill="var(--color-surface-primary)"
            stroke="var(--color-border-primary)"
            strokeWidth="1.5"
          />
          <rect
            x="182"
            y="182"
            width="36"
            height="36"
            rx="5"
            fill={color}
            opacity="0.85"
          />
          <circle cx="200" cy="200" r="4" fill="var(--color-background-primary)" />
        </g>
      </svg>
    </div>
  );
}
