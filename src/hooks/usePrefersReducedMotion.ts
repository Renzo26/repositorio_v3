import { MEDIA } from "@/constants/breakpoints";
import { useMediaQuery } from "./useMediaQuery";

/** True when the user asked the OS to reduce motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery(MEDIA.reducedMotion);
}
