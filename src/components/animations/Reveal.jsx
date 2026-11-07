import { useLayoutEffect, useRef } from "react";
import gsap from "../../utils/gsap";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";

/**
 * Scroll-triggered fade/slide-in.
 * Set `stagger` (seconds) to animate the direct children one after another.
 * All tweens are scoped to a gsap.context and reverted on unmount.
 */
export default function Reveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  y = 36,
  stagger = 0,
  ...rest
}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const el = ref.current;
    const targets = stagger ? el.children : el;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reduced, delay, y, stagger]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
