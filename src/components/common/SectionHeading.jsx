import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function SectionHeading({ id, eyebrow, title, subtitle, action }) {
  return (
    <header className="mb-12 max-w-2xl md:mb-16">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 id={id} className="text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl rtl:leading-[1.3]">
        {title}
      </h2>
      {subtitle && <p className="mt-5 text-lg text-muted">{subtitle}</p>}
      {action}
    </header>
  );
}
