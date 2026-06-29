import { useEffect, useState } from "react";

function formatTime(timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
    hour12: false,
  }).format(new Date());
}

/**
 * Live local time for a fixed timezone (default São Paulo, GMT-3).
 * Powers the hero "LOCAL TIME" indicator. Updates every 30s.
 */
export function useLocalTime(timeZone = "America/Sao_Paulo"): string {
  const [time, setTime] = useState(() => formatTime(timeZone));

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatTime(timeZone)), 30_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}
