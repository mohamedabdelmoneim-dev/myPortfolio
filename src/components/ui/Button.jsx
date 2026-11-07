import { Link } from "react-router-dom";
import { externalLinkProps } from "../../services/externalLink";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-offset-4";
const variants = {
  primary: "bg-accent text-accent-fg hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgb(var(--accent)/0.6)]",
  secondary: "border border-line text-fg hover:-translate-y-0.5 hover:border-accent hover:text-accent",
  ghost: "px-0 py-1 text-fg hover:text-accent",
};

/** One button for every case: router link (`to`), external link (`href`), or real button. */
export default function Button({ to, href, variant = "primary", className = "", children, ...rest }) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...externalLinkProps} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
