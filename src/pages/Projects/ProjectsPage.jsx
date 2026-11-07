import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { projects } from "../../data/projects";
import { useLanguage } from "../../hooks/useLanguage";
import Seo from "../../components/common/Seo";
import Reveal from "../../components/animations/Reveal";
import ProjectCard from "../../components/projects/ProjectCard";
import Button from "../../components/ui/Button";

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [category, setCategory] = useState("all");

  // Filters come from the data file, so new categories appear automatically.
  const categories = useMemo(() => ["all", ...new Set(projects.map((p) => p.category))], []);
  const visible = category === "all" ? projects : projects.filter((p) => p.category === category);

  return (
    <section aria-labelledby="all-projects-title" className="pt-32 pb-24 md:pt-44 md:pb-36">
      <Seo titleKey="meta.projectsTitle" descriptionKey="meta.projectsDescription" path="/projects" />
      <div className="container-page">
        <Reveal className="mb-12 md:mb-16">
          <Button to="/" variant="ghost" className="mb-8 text-muted">
            <ArrowLeft size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1" />
            {t("projects.backHome")}
          </Button>
          <p className="eyebrow mb-4">{t("projects.eyebrow")}</p>
          <h1 id="all-projects-title" className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl rtl:leading-[1.25]">
            {t("projects.allTitle")}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">{t("projects.allSubtitle")}</p>
        </Reveal>

        {categories.length > 2 && (
          <Reveal delay={0.1} className="mb-10">
            <div role="group" aria-label={t("projects.filterLabel")} className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                    category === c ? "border-accent bg-accent text-accent-fg" : "border-line text-muted hover:border-accent hover:text-fg"
                  }`}
                >
                  {t(`projects.filters.${c}`)}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        {visible.length > 0 ? (
          <Reveal as="ul" stagger={0.12} delay={0.15} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((project) => (
              <li key={project.id}>
                <ProjectCard project={project} />
              </li>
            ))}
          </Reveal>
        ) : (
          <p className="text-muted">{t("projects.empty")}</p>
        )}
      </div>
    </section>
  );
}
