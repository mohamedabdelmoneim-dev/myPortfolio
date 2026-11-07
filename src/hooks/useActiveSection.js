import { useEffect, useState } from "react";

export function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (!enabled) return undefined;
    const update = () => {
      const current = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .filter((element) => element.getBoundingClientRect().top <= window.innerHeight * 0.35)
        .at(-1);
      if (current) setActive(current.id);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [enabled, ids]);

  return active;
}
