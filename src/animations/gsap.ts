import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Register plugins once, app-wide. Import gsap/ScrollTrigger from here. */
gsap.registerPlugin(ScrollTrigger);

// Mirror the CSS easing tokens so JS + CSS animations feel the same.
gsap.config({ nullTargetWarn: false });

export { gsap, ScrollTrigger };
