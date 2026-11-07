import { lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { ScrollTrigger } from "./utils/gsap";
import { scrollToTarget, scrollToTop } from "./utils/scroll";

const HomePage = lazy(() => import("./pages/Home/HomePage"));
const ProjectsPage = lazy(() => import("./pages/Projects/ProjectsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFound/NotFoundPage"));

/** Resets scroll on route change, or scrolls to a section requested via navigation state. */
function ScrollManager() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    const targetId = state?.scrollTo;
    if (!targetId) {
      scrollToTop({ immediate: true });
      return undefined;
    }
    // The target page is lazy-loaded, so retry until its section exists.
    let tries = 0;
    let timer;
    const attempt = () => {
      const el = document.getElementById(targetId);
      if (el) {
        ScrollTrigger.refresh();
        scrollToTarget(el);
      } else if (tries++ < 20) {
        timer = window.setTimeout(attempt, 100);
      }
    };
    timer = window.setTimeout(attempt, 150);
    return () => window.clearTimeout(timer);
  }, [pathname, state]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
