import ar from "../locales/ar";
import en from "../locales/en";

export const translations = { ar, en };


// Single source of truth for personal info. Edit here, not in components.
export const SITE = {
  name: "Mohamed Abdelmoneim",
  brand: {en: "MOHAMED", ar: "محمد"},
  email: "mohamedabdelmoneim664@gmail.com",
  location: { en: "Kafr El-Sheikh, Egypt", ar: "كفر الشيخ، مصر" },
  siteUrl: "", // Set after deployment, used for Open Graph URLs.
  social: {
    github: "https://github.com/mohamedabdelmoneim-dev",
    linkedin: "https://www.linkedin.com/in/mohamed-abdelmoneim-284854292/",
    facebook: "https://www.facebook.com/mohamed.abdelmoneim.478706",
    instagram: "https://www.instagram.com/me.n.3m/",
  },
};
