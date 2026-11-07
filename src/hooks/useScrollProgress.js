import { useEffect, useState } from "react";

export function useScrollProgress() {
  const [state, setState] = useState({ progress: 0, direction: "up", scrolled: false });

  useEffect(() => {
    let previous = window.scrollY;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setState({
        progress: max > 0 ? Math.min(1, current / max) : 0,
        direction: current >= previous ? "down" : "up",
        scrolled: current > 12,
      });
      previous = current;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return state;
}
