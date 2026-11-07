import { skillGroups } from "../../data/skills";
import { useLanguage } from "../../hooks/useLanguage";
import Reveal from "../animations/Reveal";
import SectionHeading from "../common/SectionHeading";

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" aria-labelledby="skills-title" className="section-y hairline">
      <div className="container-page">
        <SectionHeading
          id="skills-title"
          eyebrow={t("skills.eyebrow")}
          title={t("skills.title")}
          subtitle={t("skills.subtitle")}
        />

        <Reveal stagger={0.12} className="grid gap-5 md:grid-cols-3">
          {skillGroups.map((group, index) => (
            <article
              key={group.id}
              className="group rounded-2xl border border-line bg-surface p-7 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-accent/50"
            >
              <header className="mb-6 flex items-baseline justify-between">
                <h3 className="text-xl font-semibold">{t(`skills.categories.${group.id}`)}</h3>
                <span aria-hidden="true" className="text-xs text-muted">
                  0{index + 1}
                </span>
              </header>
              <ul className="divide-y divide-line">
                {group.items.map((item) => (
                  <li key={item.name} className="flex items-center justify-between gap-3 py-3 text-fg">
                    <span dir="ltr" className="text-start">
                      {item.name}
                    </span>
                    {item.learning && (
                      <span className="rounded-full border border-accent/40 px-2.5 py-0.5 text-xs text-accent">
                        {t("skills.learning")}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
