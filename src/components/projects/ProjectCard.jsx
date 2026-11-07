import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Github, Plus } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import Button from "../ui/Button";

/**
 * Two-sided project card. Flipping is controlled only by the dedicated buttons,
 * so external links never trigger it. The hidden face is made `inert`, which removes
 * it from tab order and from assistive technology.
 */
export default function ProjectCard({ project }) {
  const { t, pick } = useLanguage();
  const [flipped, setFlipped] = useState(false);
  const flipButton = useRef(null);
  const backButton = useRef(null);
  const mounted = useRef(false);

  const name = pick(project.name);
  const description = pick(project.description);
  const backId = `project-${project.id}-back`;
  const contributions = project.contributions ?? [];
  const technologies = project.technologies ?? [];

  // Move focus to the control on the face that just became visible (skip first render).
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    (flipped ? backButton : flipButton).current?.focus({ preventScroll: true });
  }, [flipped]);

  return (
    <article
      className="flip-scene h-full"
      aria-label={name}
      onKeyDown={(e) => e.key === "Escape" && flipped && setFlipped(false)}
    >
      <div className="flip-inner grid h-full" data-flipped={flipped}>
        {/* FRONT */}
        <div
          className="flip-face flex flex-col overflow-hidden rounded-2xl border border-line bg-surface [grid-area:1/1]"
          inert={flipped ? "" : undefined}
          aria-hidden={flipped}
        >
          <div className="relative grid aspect-[4/3] place-items-center bg-elevated">
            <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-40" />
            <img
              src={project.logo}
              alt={`${name} ${t("projects.logoSuffix")}`}
              width="112"
              height="112"
              loading="lazy"
              decoding="async"
              className="relative h-24 w-24 object-contain md:h-28 md:w-28"
            />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-xl font-semibold leading-snug">{name}</h3>
            <p className="mt-3 text-muted">{description}</p>
            <div className="mt-auto flex justify-end pt-6">
              <button
                ref={flipButton}
                type="button"
                onClick={() => setFlipped(true)}
                aria-label={`${t("projects.flip")}: ${name}`}
                title={t("projects.flip")}
                aria-expanded={flipped}
                aria-controls={backId}
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-fg transition-all duration-300 hover:rotate-90 hover:border-accent hover:text-accent"
              >
                <Plus size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          id={backId}
          className="flip-face flip-back flex flex-col rounded-2xl border border-line bg-surface p-6 [grid-area:1/1]"
          inert={flipped ? undefined : ""}
          aria-hidden={!flipped}
        >
          <h3 className="text-xl font-semibold leading-snug">{name}</h3>
          <p className="mt-3 text-muted">{description}</p>

          {contributions.length > 0 && (
            <div className="mt-5">
              <h4 className="text-xs uppercase tracking-[0.18em] text-accent">{t("projects.contributions")}</h4>
              <ul className="mt-3 space-y-1.5 text-sm text-fg">
                {contributions.map((item) => (
                  <li key={pick(item)} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {pick(item)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {technologies.length > 0 && (
            <div className="mt-5">
              <h4 className="text-xs uppercase tracking-[0.18em] text-accent">{t("projects.technologies")}</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <li key={tech} dir="ltr" className="rounded-full border border-line px-3 py-1 text-xs text-fg">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
            {project.liveUrl && (
              <Button href={project.liveUrl} size="sm">
                {t("projects.visit")}
                <ArrowUpRight size={15} aria-hidden="true" className="rtl:-scale-x-100" />
              </Button>
            )}
            {project.githubUrl && (
              <Button href={project.githubUrl} variant="secondary" size="sm">
                <Github size={15} aria-hidden="true" />
                {t("projects.github")}
              </Button>
            )}
            <Button ref={backButton} variant="ghost" onClick={() => setFlipped(false)} className="ms-auto">
              <ArrowLeft size={15} aria-hidden="true" className="rtl:rotate-180" />
              {t("projects.flipBack")}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
