import Seo from "../../components/common/Seo";
import Hero from "../../components/sections/Hero";
import About from "../../components/sections/About";
import Skills from "../../components/sections/Skills";
import FeaturedProjects from "../../components/sections/FeaturedProjects";
import Education from "../../components/sections/Education";
import Contact from "../../components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Seo titleKey="meta.homeTitle" descriptionKey="meta.homeDescription" path="/" />
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <Education />
      <Contact />
    </>
  );
}
