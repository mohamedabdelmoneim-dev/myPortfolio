import { useLanguage } from "../../hooks/useLanguage";

export default function LanguageSwitcher() {
  const { t, toggleLanguage } = useLanguage();
  return (
    <button type="button" onClick={toggleLanguage} aria-label={t("language.switchTo")} className="rounded-full border border-line px-3 py-2 text-xs font-medium text-fg transition-colors hover:border-accent hover:text-accent">
      {t("language.short")}
    </button>
  );
}
