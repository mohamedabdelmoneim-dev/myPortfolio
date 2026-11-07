import { useEffect } from "react";
import Lenis from "lenis";
import gsap, { ScrollTrigger } from "../utils/gsap";
import { setLenis } from "../utils/lenisStore";
import { usePrefersReducedMotion } from "./useMediaQuery";

/** Mounts smooth scrolling once and keeps it in sync with GSAP's ticker and ScrollTrigger. */
export function useLenis() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, [reduced]);
}
