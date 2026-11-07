import { useLayoutEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "../../utils/gsap";
import { scrollToTarget } from "../../utils/scroll";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";
import { useLanguage } from "../../hooks/useLanguage";
import Button from "../ui/Button";
import SocialLinks from "../common/SocialLinks";
import myImage from "../../assets/images/myImage.jpeg";
export default function Hero() {
  const { t } = useLanguage();
  const root = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [first, ...rest] = t("hero.name").split(" ");
  const lines = [first, rest.join(" ")].filter(Boolean);

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });
      tl.from("[data-hero-fade='a']", { autoAlpha: 0, y: 24, duration: 0.8 })
        .from("[data-hero-line]", { yPercent: 115, duration: 1.1, stagger: 0.12, ease: "power4.out" }, "-=0.5")
        .from("[data-hero-fade='b']", { autoAlpha: 0, y: 28, duration: 0.9, stagger: 0.12 }, "-=0.6");
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="home" ref={root} aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 end-[-10%] h-[36rem] w-[36rem] rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "radial-gradient(circle, rgb(var(--accent)), transparent 70%)" }}
      />

      <div className="pointer-events-none absolute top-1/5 hidden -translate-y-1/2 overflow-hidden bg-surface/40 md:block" style={{ borderRadius: "50%", width : "28rem", height: "28rem", right: "25%" }}>
        <img src={myImage} alt="" />
      </div>

      <div className="container-page relative">
        <p data-hero-fade="a" className="eyebrow mb-6 md:mb-8">
          {t("hero.greeting")}
        </p>

        <h1 id="hero-title" className="font-semibold tracking-tight text-[clamp(3rem,11vw,9rem)] leading-[0.95] rtl:leading-[1.2]">
          {lines.map((line, i) => (
            <span key={line} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <span data-hero-line className={`block ${i === lines.length - 1 ? "text-muted" : ""}`}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p data-hero-fade="b" className="font-display text-2xl text-fg md:text-3xl">
              {t("hero.role")}
              <span className="text-accent">.</span>
            </p>
            <p data-hero-fade="b" className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              {t("hero.intro")}
            </p>
            <div data-hero-fade="b" className="mt-8 flex flex-wrap gap-3">
              <Button variant="primary" onClick={() => scrollToTarget("#projects")}>
                {t("hero.ctaProjects")}
                <ArrowDown size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </Button>
              <Button variant="secondary" onClick={() => scrollToTarget("#contact")}>
                {t("hero.ctaContact")}
              </Button>
            </div>
          </div>

          <div data-hero-fade="b" className="flex flex-col gap-5 md:items-end">
            <SocialLinks />
            <p className="flex items-center gap-2 text-sm text-muted">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {t("hero.status")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
