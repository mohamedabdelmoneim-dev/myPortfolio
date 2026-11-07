import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isLight = theme === "light";
  return (
    <button type="button" onClick={toggleTheme} aria-label={t(isLight ? "theme.toDark" : "theme.toLight")} title={t(isLight ? "theme.toDark" : "theme.toLight")} className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent">
      {isLight ? <Moon size={17} aria-hidden="true" /> : <Sun size={17} aria-hidden="true" />}
    </button>
  );
}
