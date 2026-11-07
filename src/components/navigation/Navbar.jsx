import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "../../constants/navigation";
import { SITE } from "../../config/site";
import { useLanguage } from "../../hooks/useLanguage";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useActiveSection } from "../../hooks/useActiveSection";
import { getLenis } from "../../utils/lenisStore";
import { scrollToTarget, scrollToTop } from "../../utils/scroll";
import ThemeToggle from "../ui/ThemeToggle";
import LanguageSwitcher from "../ui/LanguageSwitcher";

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export default function Navbar() {
  const { t, isRTL } = useLanguage();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === "/";
  const { progress, direction, scrolled } = useScrollProgress();
  const activeId = useActiveSection(SECTION_IDS, isHome);
  const [open, setOpen] = useState(false);

  const closeMenu = useCallback(() => setOpen(false), []);

  const goTo = (event, id) => {
    event.preventDefault();
    closeMenu();
    if (isHome) scrollToTarget(`#${id}`);
    else navigate("/", { state: { scrollTo: id } });
  };

  const goHome = (event) => {
    event.preventDefault();
    closeMenu();
    if (isHome) scrollToTop();
    else navigate("/");
  };

  // Close the menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scrolling and close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return undefined;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const hidden = direction === "down" && scrolled && !open;
  const isActive = (id) => (isHome ? activeId === id : id === "projects" && pathname === "/projects");

  const linkClass = (id) =>
    `relative py-2 text-sm transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-center after:bg-accent after:transition-transform after:duration-300 ${
      isActive(id) ? "text-fg after:scale-x-100" : "text-muted after:scale-x-0 hover:text-fg hover:after:scale-x-100"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out ${hidden ? "-translate-y-full" : "translate-y-0"} ${
        scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <a href="/" onClick={goHome} className="font-display text-lg font-semibold tracking-[0.18em] text-fg">
          {SITE.brand}
          <span className="text-accent">.</span>
        </a>

        <nav aria-label={t("nav.label")} className="hidden items-center gap-9 md:flex">
          {NAV_ITEMS.map(({ id, labelKey }) => (
            <a
              key={id}
              href={`/#${id}`}
              onClick={(e) => goTo(e, id)}
              aria-current={isActive(id) ? "true" : undefined}
              className={linkClass(id)}
            >
              {t(labelKey)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg md:hidden"
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 start-0 h-px w-full bg-accent"
        style={{ transform: `scaleX(${progress})`, transformOrigin: isRTL ? "right" : "left" }}
      />

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto bg-bg md:hidden"
      >
        <nav aria-label={t("nav.label")} className="container-page flex flex-col py-8">
          {NAV_ITEMS.map(({ id, labelKey }, index) => (
            <a
              key={id}
              href={`/#${id}`}
              onClick={(e) => goTo(e, id)}
              aria-current={isActive(id) ? "true" : undefined}
              className={`flex items-baseline gap-4 border-b border-line py-5 font-display text-3xl ${
                isActive(id) ? "text-accent" : "text-fg"
              }`}
            >
              <span className="text-xs text-muted" aria-hidden="true">
                0{index + 1}
              </span>
              {t(labelKey)}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
