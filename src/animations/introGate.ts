/**
 * Tiny handoff between the site intro overlay and the Hero entrance.
 *
 * The Hero builds its timeline paused and registers a waiter; the SiteIntro
 * calls `completeIntro()` as its curtain lifts, so the Hero animates in exactly
 * as it is revealed. If the intro is skipped (reduced-motion), it resolves
 * immediately and the Hero plays right away. Module-level so there is no
 * provider to thread through — it lives for one page load.
 */
let resolved = false;
let waiters: Array<() => void> = [];

export function completeIntro(): void {
  if (resolved) return;
  resolved = true;
  const pending = waiters;
  waiters = [];
  pending.forEach((fn) => fn());
}

export function whenIntroDone(cb: () => void): void {
  if (resolved) cb();
  else waiters.push(cb);
}

export function isIntroDone(): boolean {
  return resolved;
}
