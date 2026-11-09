// import luxeLogo from "../assets/images/projects/luxe-logo.svg";
import luxeLogo from "../assets/images/projects/logo.png";
// import depiLogo from "../assets/images/projects/depi-logo.svg";
import jobLink from "../assets/images/projects/jobLink.png";
// import joblinkLogo from "../assets/images/projects/joblink-logo.svg";
import guessYheWordGame from "../assets/images/projects/guessYheWordGame.png";

/**
 * Add, edit, or remove projects here, nothing else needs to change.
 * - featured: true  -> shown on the Home page (keep it to three)
 * - category: "ecommerce" | "team" | "platform" (must match a key in locales projects.filters)
 * - liveUrl / githubUrl: leave "" to hide the button. Never invent URLs.
 * - logo: replace the file in src/assets/images/projects/ (same filename) with your own.
 */
export const projects = [
  {
    id: "luxe",
    featured: true,
    category: "ecommerce",
    name: { en: "LUXE – E-commerce Website", ar: "LUXE – متجر إلكتروني" },
    description: {
      en: "An e-commerce storefront with routing, a shopping cart, and persistent state.",
      ar: "واجهة متجر إلكتروني مع تنقّل بين الصفحات وسلة مشتريات وحالة محفوظة.",
    },
    technologies: ["React.js", "Vite", "React Router", "Context API", "useReducer", "Bootstrap", "Local Storage"],
    logo: luxeLogo,
    liveUrl: "https://men3ms-ecommerce.vercel.app/",
    githubUrl: "https://github.com/mohamedabdelmoneim-dev/my-ecommerce",
    contributions: [
      { en: "The Whole Project", ar: "المشروع كاملاً" }
    ],
  },
  {
    id: "depi-job-portal",
    featured: true,
    category: "team",
    name: { en: "DEPI Job Portal", ar: "بوابة وظائف DEPI" },
    description: {
      en: "A collaborative frontend project built with a team during the DEPI React track.",
      ar: "مشروع واجهات أمامية تعاوني نُفّذ مع فريق خلال مسار React في DEPI.",
    },
    technologies: ["React.js", "Bootstrap"],
    logo: jobLink,
    liveUrl: "https://job-portal-kappa-bay.vercel.app/",
    githubUrl: "https://github.com/mohamedabdelmoneim-dev/jobPortal",
    contributions: [
      { en: "Saved Jobs", ar: "الوظائف المحفوظة" },
      { en: "Job Alerts", ar: "تنبيهات الوظائف" },
      { en: "Interview Scheduling UI", ar: "واجهة جدولة المقابلات" },
      { en: "Admin User Management UI", ar: "واجهة إدارة المستخدمين للمشرف" },
    ],
  },
  {
    id: "guess-the-word-game",
    featured: true,
    category: "personal",
    name: { en: "Guess The Word Game", ar: "لعبة تخمين الكلمة" },
    description: {
      en: "An interactive word guessing game built with HTML, CSS, and JavaScript, following the Elzero Web School tutorial.",
      ar: "لعبة تفاعلية لتخمين الكلمات باستخدام HTML وCSS وJavaScript، تنفيذًا لتطبيق عملي من قناة Elzero Web School.",
    },
    technologies: ["HTML", "CSS", "JavaScript"],
    logo: guessYheWordGame,
    liveUrl: "https://mohamedabdelmoneim-dev.github.io/Guess-the-word-game/",
    githubUrl: "https://github.com/mohamedabdelmoneim-dev/Guess-the-word-game",
    contributions: [
      { en: "The Whole Project", ar: "المشروع كاملاً" }
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
