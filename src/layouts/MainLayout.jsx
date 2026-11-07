import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/layout/Footer";
import { useLenis } from "../hooks/useLenis";
import { useLanguage } from "../hooks/useLanguage";

export default function MainLayout() {
  const { t } = useLanguage();
  useLenis();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
      >
        {t("common.skip")}
      </a>
      <Navbar />
      <main id="main">
        <Suspense fallback={<div className="min-h-screen" role="status" aria-label={t("common.loading")} />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
