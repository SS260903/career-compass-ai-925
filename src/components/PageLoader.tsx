import { useEffect, useState } from "react";

export function PageLoader() {
  const [show, setShow] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 500);
    const t2 = setTimeout(() => setShow(false), 1100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center bg-background transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden
    >
      <div className="absolute inset-0 mesh-gradient opacity-70" />
      <div className="relative flex flex-col items-center gap-4">
        <div className="loader-ring">
          <div />
          <div />
          <div />
        </div>
        <div className="gradient-text font-display text-sm font-semibold tracking-widest">
          LOADING
        </div>
      </div>
    </div>
  );
}
