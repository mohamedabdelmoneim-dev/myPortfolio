import { Facebook, Github, Linkedin, Instagram  } from "lucide-react";
import { SITE } from "../../config/site";
import { externalLinkProps } from "../../services/externalLink";
import { useLanguage } from "../../hooks/useLanguage";
import { Link } from "react-router-dom";


export default function SocialLinks() {
  const { t } = useLanguage();
  return (
    <nav aria-label={t("hero.socials")} className="flex items-center gap-3">
      <Link to={SITE.social.github} {...externalLinkProps} aria-label="GitHub" className="text-muted transition-colors hover:text-accent">
        <Github size={19} aria-hidden="true" />
      </Link>
      <Link to={SITE.social.linkedin} {...externalLinkProps} aria-label="LinkedIn" className="text-muted transition-colors hover:text-accent">
        <Linkedin size={19} aria-hidden="true" />
      </Link>
      <Link to={SITE.social.facebook} {...externalLinkProps} aria-label="Facebook" className="text-muted transition-colors hover:text-accent">
        <Facebook size={19} aria-hidden="true" />
      </Link>
      <Link to={SITE.social.instagram} {...externalLinkProps} aria-label="Instagram" className="text-muted transition-colors hover:text-accent">
        <Instagram size={19} aria-hidden="true" />
      </Link>
    </nav>
  );
}
