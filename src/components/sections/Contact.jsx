import { ArrowUpRight } from "lucide-react";
import { SITE } from "../../config/site";
import { externalLinkProps } from "../../services/externalLink";
import { useLanguage } from "../../hooks/useLanguage";
import Reveal from "../animations/Reveal";
import Button from "../ui/Button";

const linkClass = "inline-flex items-center gap-1.5 text-fg transition-colors duration-300 hover:text-accent";

function Row({ label, children }) {
  return (
    <div className="grid gap-1 py-5 lg:grid-cols-[5rem_1fr] md:grid-cols-[3.5rem_1fr] sm:items-center sm:gap-6">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-lg">{children}</dd>
    </div>
  );
}

export default function Contact() {
  const { t, pick } = useLanguage();

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y hairline">
      <div className="container-page grid gap-14 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-6">
          <p className="eyebrow mb-4">{t("contact.eyebrow")}</p>
          <h2 id="contact-title" className="text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl rtl:leading-[1.3]">
            {t("contact.title")}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{t("contact.text")}</p>
          <Button href={SITE.social.linkedin} className="mt-8">
            {t("contact.cta")}
            <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
          </Button>
        </Reveal>

        <Reveal as="dl" delay={0.1} className="divide-y divide-line border-y border-line md:col-span-5 md:col-start-8" style={{ height: "fit-content" }}>
          <Row label={t("contact.email")}>
            {SITE.email ? (
              <a href={`mailto:${SITE.email}`} className={linkClass}>
                <span dir="ltr">{SITE.email}</span>
              </a>
            ) : (
              <span className="email-text">{t("contact.emailSoon")}</span>
            )}
          </Row>
          <Row label={t("contact.linkedin")}>
            <a href={SITE.social.linkedin} {...externalLinkProps} className={linkClass}>
              LinkedIn <ArrowUpRight size={15} aria-hidden="true" className="rtl:-scale-x-100" />
            </a>
          </Row>
          <Row label={t("contact.github")}>
            <a href={SITE.social.github} {...externalLinkProps} className={linkClass}>
              GitHub <ArrowUpRight size={15} aria-hidden="true" className="rtl:-scale-x-100" />
            </a>
          </Row>
          <Row label={t("contact.location")}>{pick(SITE.location)}</Row>
          <Row label={t("contact.availability")}>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
              {t("contact.availabilityValue")}
            </span>
          </Row>
        </Reveal>
      </div>
    </section>
  );
}
