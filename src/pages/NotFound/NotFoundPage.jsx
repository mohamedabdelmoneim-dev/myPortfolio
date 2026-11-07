import { useLanguage } from "../../hooks/useLanguage";
import Seo from "../../components/common/Seo";
import Button from "../../components/ui/Button";

export default function NotFoundPage() {
  const { t } = useLanguage();
  return (
    <section className="container-page flex min-h-[70svh] flex-col items-start justify-center">
      <Seo titleKey="meta.notFoundTitle" descriptionKey="errors.notFoundText" path="/404" />
      <p className="eyebrow mb-4">404</p>
      <h1 className="text-5xl font-semibold">{t("errors.notFoundTitle")}</h1>
      <p className="mt-4 text-muted">{t("errors.notFoundText")}</p>
      <Button to="/" className="mt-8">{t("errors.goHome")}</Button>
    </section>
  );
}
