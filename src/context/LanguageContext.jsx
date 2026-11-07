import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { DIRECTIONS, LANGUAGES, STORAGE_KEYS } from "../constants/storage";
import { translations } from "../locales";

export const LanguageContext = createContext(null);

const readInitialLanguage = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.language) === LANGUAGES.ar
      ? LANGUAGES.ar
      : LANGUAGES.en;
  } catch {
    return LANGUAGES.en;
  }
};

const lookup = (dict, path) =>
  path.split(".").reduce((node, key) => (node == null ? undefined : node[key]), dict);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(readInitialLanguage);
  const dir = DIRECTIONS[language];

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = dir;
    try {
      localStorage.setItem(STORAGE_KEYS.language, language);
    } catch {
      /* storage unavailable */
    }
  }, [language, dir]);

  const toggleLanguage = useCallback(
    () => setLanguage((l) => (l === LANGUAGES.en ? LANGUAGES.ar : LANGUAGES.en)),
    [],
  );

  // t("hero.title") returns a string, array, or object. Falls back to English, then to the key.
  const t = useCallback(
    (path) => {
      const value = lookup(translations[language], path);
      if (value !== undefined) return value;
      const fallback = lookup(translations.en, path);
      return fallback !== undefined ? fallback : path;
    },
    [language],
  );

  // Picks the current-language value from { en, ar } objects used in data files.
  const pick = useCallback(
    (localized) =>
      localized && typeof localized === "object"
        ? (localized[language] ?? localized.en ?? "")
        : (localized ?? ""),
    [language],
  );

  const value = useMemo(
    () => ({ language, dir, isRTL: dir === "rtl", setLanguage, toggleLanguage, t, pick }),
    [language, dir, toggleLanguage, t, pick],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
