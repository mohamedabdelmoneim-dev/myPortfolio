import { ArrowRight } from "lucide-react";
import { featuredProjects } from "../../data/projects";
import { useLanguage } from "../../hooks/useLanguage";
import Reveal from "../animations/Reveal";
import SectionHeading from "../common/SectionHeading";
import ProjectCard from "../projects/ProjectCard";
import Button from "../ui/Button";

export default function FeaturedProjects() {
  const { t } = useLanguage();

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-y hairline">
      <div className="container-page">
        <SectionHeading
          id="projects-title"
          eyebrow={t("projects.eyebrow")}
          title={t("projects.title")}
          subtitle={t("projects.subtitle")}
          action={
            <Button to="/projects" variant="ghost" className="border-b border-line pb-1 hover:border-accent">
              {t("projects.viewAll")}
              <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Button>
          }
        />
        <Reveal as="ul" stagger={0.14} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
