import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/** Register plugins once, app-wide. Import gsap/ScrollTrigger from here. */
gsap.registerPlugin(ScrollTrigger, SplitText);

// Mirror the CSS easing tokens so JS + CSS animations feel the same.
gsap.config({ nullTargetWarn: false });

export { gsap, ScrollTrigger, SplitText };
