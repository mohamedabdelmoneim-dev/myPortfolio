import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { STORAGE_KEYS, THEMES } from "../constants/storage";

export const ThemeContext = createContext(null);

const readInitialTheme = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.theme) === THEMES.light
      ? THEMES.light
      : THEMES.dark;
  } catch {
    return THEMES.dark;
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    try {
      localStorage.setItem(STORAGE_KEYS.theme, theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    // Short-lived class enables colour transitions only during a manual switch,
    // so initial page load never animates (no flicker).
    root.classList.add("theme-transition");
    setTheme((t) => (t === THEMES.dark ? THEMES.light : THEMES.dark));
    window.setTimeout(() => root.classList.remove("theme-transition"), 450);
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
