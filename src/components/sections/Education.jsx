import { education } from "../../data/education";
import { useLanguage } from "../../hooks/useLanguage";
import Reveal from "../animations/Reveal";
import SectionHeading from "../common/SectionHeading";

export default function Education() {
  const { t, pick } = useLanguage();

  return (
    <section id="education" aria-labelledby="education-title" className="section-y hairline">
      <div className="container-page">
        <SectionHeading
          id="education-title"
          eyebrow={t("education.eyebrow")}
          title={t("education.title")}
          subtitle={t("education.subtitle")}
        />

        <Reveal as="ol" stagger={0.14} className="relative ms-3 border-s border-line">
          {education.map((item) => (
            <li key={item.id} className="relative pb-12 ps-8 last:pb-0 md:ps-12">
              <span
                aria-hidden="true"
                className="absolute start-0 top-2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-bg rtl:translate-x-1/2"
              />
              <p className="text-xs uppercase tracking-[0.2em] text-accent">
                {pick(item.kind)}
                {item.period && <span className="text-muted"> · {item.period}</span>}
              </p>
              <h3 className="mt-2 text-2xl font-semibold md:text-3xl">{pick(item.title)}</h3>
              <p className="mt-2 text-muted">{pick(item.place)}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
