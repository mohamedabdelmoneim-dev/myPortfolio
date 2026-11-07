import { useLanguage } from "../../hooks/useLanguage";
import Reveal from "../animations/Reveal";

const FACTS = ["location", "focus", "direction"];

export default function About() {
  const { t } = useLanguage();
  const paragraphs = t("about.paragraphs");

  return (
    <section id="about" aria-labelledby="about-title" className="section-y hairline">
      <div className="container-page grid gap-12 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-5">
          <p className="eyebrow mb-4">{t("about.eyebrow")}</p>
          <h2 id="about-title" className="text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl rtl:leading-[1.3]">
            {t("about.title")}
          </h2>
        </Reveal>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal stagger={0.12} className="space-y-6 text-lg leading-relaxed text-muted">
            {paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </Reveal>

          <Reveal as="dl" delay={0.1} className="mt-12 divide-y divide-line border-y border-line">
            {FACTS.map((key) => (
              <div key={key} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="text-sm text-muted">{t(`about.facts.${key}`)}</dt>
                <dd className="text-fg">{t(`about.values.${key}`)}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
