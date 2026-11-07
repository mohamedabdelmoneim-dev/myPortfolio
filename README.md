# Mohamed Abdelmoneim — Portfolio

A bilingual (English / Arabic, LTR / RTL), dark/light personal portfolio built with React, Vite, Tailwind CSS, GSAP and Lenis.

## 1. Overview
Two routes: **Home** (`/`) with Hero, About, Skills, Selected Projects (3), Education and Contact; and **All Projects** (`/projects`) with category filters. Project cards use a 3D flip with a dedicated button. All text lives in locale files and all content in data files.

## 2. Technologies
React 18 · Vite 5 · Tailwind CSS 3 · React Router 6 · GSAP + ScrollTrigger · Lenis · Lucide React · React Helmet Async · Fontsource fonts (self-hosted, no CDN). Swiper is installed for future carousels but is not used yet. Remove it with `npm uninstall swiper` if you don't need it.

## 3. Folder structure
```
src/
  assets/images/{projects,backgrounds,icons}   logos and images
  components/
    animations/   Reveal (GSAP scroll reveal)
    common/       Seo, ErrorBoundary, SectionHeading, SocialLinks
    layout/       Footer
    navigation/   Navbar (+ mobile menu)
    projects/     ProjectCard (3D flip)
    sections/     Hero, About, Skills, FeaturedProjects, Education, Contact
    ui/           Button, ThemeToggle, LanguageSwitcher
  config/         site.js (personal info and links)
  constants/      storage keys, nav items
  context/        ThemeContext, LanguageContext
  data/           projects.js, skills.js, education.js
  hooks/          useTheme, useLanguage, useMediaQuery, useLenis, useScrollProgress, useActiveSection
  layouts/        MainLayout
  locales/{en,ar} all UI text
  pages/          Home, Projects, NotFound
  services/       externalLink.js
  styles/         index.css (design tokens + flip card CSS)
  utils/          gsap.js, lenisStore.js, scroll.js
```

## 4. Requirements
Node.js 18.18+ (20 LTS recommended) and npm.

## 5–8. Commands
```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm run lint       # check code quality
```

## 9. Change personal information
Edit `src/config/site.js`: add your **email**, set `siteUrl` after deploying, update links. The contact section shows the email automatically once it is not empty. Page text (hero, about, etc.) is in `src/locales/en/index.js` and `src/locales/ar/index.js`. Skills are in `src/data/skills.js`, education in `src/data/education.js`.

## 10. Add a new project
Open `src/data/projects.js` and add an object to the `projects` array:
```js
{
  id: "my-app",                       // unique
  featured: false,                    // true = show on Home (keep to 3)
  category: "platform",               // ecommerce | team | platform (or a new one, see below)
  name: { en: "My App", ar: "تطبيقي" },
  description: { en: "…", ar: "…" },
  technologies: ["React.js"],         // [] hides the tag list
  logo: myAppLogo,                    // import at the top of the file
  liveUrl: "",                        // "" hides the button
  githubUrl: "",                      // "" hides the button
  contributions: [],                  // optional list of { en, ar }
}
```
The Projects page picks it up automatically. For a **new category**, also add `projects.filters.<category>` to both locale files.

## 11. Replace project logos
Overwrite the placeholder files in `src/assets/images/projects/` keeping the same names (`luxe-logo.svg`, `depi-logo.svg`, `joblink-logo.svg`). If you use PNG, change the import in `src/data/projects.js`. Use square images with a transparent background, at least 224×224 px.

## 12. Edit translations
Every string is in `src/locales/en/index.js` and `src/locales/ar/index.js`. Keep both files' keys identical. Components read text with `t("section.key")`. Missing Arabic keys fall back to English.

## 13. Customize themes
Colors are CSS variables in `src/styles/index.css` (`:root[data-theme="dark"]` and `"light"`). Change `--accent` to restyle the whole site. Tailwind reads them in `tailwind.config.js`. Fonts are set via `--font-display` and `--font-body`.

## 14. Deploy
`npm run build` creates `dist/`. The site is a single-page app, so the host must serve `index.html` for every path (otherwise refreshing `/projects` gives a 404). Fallback files are already included.

**Vercel** (uses `vercel.json`): push to GitHub, import the repo at vercel.com, framework preset *Vite*. Or from the terminal:
```bash
npm i -g vercel
vercel --prod
```
**Netlify** (uses `public/_redirects`): build command `npm run build`, publish directory `dist`. Or:
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```
**GitHub Pages** needs extra setup for SPA routing; Vercel or Netlify are simpler.

After deploying, set `siteUrl` in `src/config/site.js` and rebuild. To add a social preview image, put `og-image.png` (1200×630) in `public/images/` and add `<meta property="og:image" content="https://YOUR-DOMAIN/images/og-image.png" />` in `src/components/common/Seo.jsx`.
