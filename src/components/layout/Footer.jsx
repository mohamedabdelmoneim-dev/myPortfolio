import { ArrowUp } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { scrollToTop } from "../../utils/scroll";
import SocialLinks from "../common/SocialLinks";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="hairline">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">{t("hero.name")}</p>
          <p className="mt-1 text-sm text-muted">{t("footer.closing")}</p>
          <p className="mt-4 text-xs text-muted">
            © {year} {t("hero.name")}. {t("footer.rights")}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SocialLinks />
          <button
            type="button"
            onClick={() => scrollToTop()}
            aria-label={t("footer.backToTop")}
            title={t("footer.backToTop")}
            className="grid h-11 w-11 place-items-center rounded-full bg-accent text-accent-fg transition-transform duration-300 hover:-translate-y-0.5"
          >
            <ArrowUp size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
