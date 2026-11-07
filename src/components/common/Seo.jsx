import { Helmet } from "react-helmet-async";
import { SITE } from "../../config/site";
import { useLanguage } from "../../hooks/useLanguage";

export default function Seo({ titleKey, descriptionKey, path }) {
  const { t, dir, language } = useLanguage();
  const title = t(titleKey);
  const description = t(descriptionKey);
  return (
    <Helmet>
      <html lang={language} dir={dir} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {SITE.siteUrl && <link rel="canonical" href={`${SITE.siteUrl}${path}`} />}
    </Helmet>
  );
}
