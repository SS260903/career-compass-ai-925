import { useRef, type ReactNode, type MouseEvent } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

/**
 * Card wrapper with 3D tilt on hover, cursor-tracked glow, and shine sweep.
 * Purely presentational — wraps existing content without altering it.
 */
export function TiltCard({ children, className = "", intensity = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * intensity;
    const ry = (px - 0.5) * intensity;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tilt-card ${className}`}
    >
      <div className="tilt-card-inner">{children}</div>
      <div className="tilt-card-glow" aria-hidden />
      <div className="tilt-card-shine" aria-hidden />
    </div>
  );
}
