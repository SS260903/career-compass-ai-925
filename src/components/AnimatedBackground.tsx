import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const on = () => setReduced(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ contain: "strict" }}
    >
      {/* Mesh gradient base */}
      <div className="absolute inset-0 mesh-gradient opacity-60" />

      {/* Floating glow blobs */}
      <div className="absolute -top-32 -left-32 h-[32rem] w-[32rem] rounded-full bg-brand/25 blur-3xl animate-blob will-change-transform" />
      <div
        className="absolute top-40 -right-32 h-[36rem] w-[36rem] rounded-full bg-brand-purple/25 blur-3xl animate-blob will-change-transform"
        style={{ animationDelay: "6s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-blob will-change-transform"
        style={{ animationDelay: "12s" }}
      />

      {/* Horizontal flowing wave gradients (parallax layers) */}
      <div className="wave-layer wave-layer-1" />
      <div className="wave-layer wave-layer-2" />
      <div className="wave-layer wave-layer-3" />

      {/* Drifting particles */}
      {!reduced && <Particles />}

      {/* Subtle grain / noise overlay */}
      <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay noise-overlay" />
    </div>
  );
}

function Particles() {
  // Deterministic pseudo-random distribution
  const particles = Array.from({ length: 24 }, (_, i) => {
    const seed = (i + 1) * 9301;
    const rand = (n: number) => (((seed * (n + 1)) % 1000) / 1000);
    return {
      left: rand(1) * 100,
      size: 2 + rand(2) * 3,
      delay: rand(3) * 20,
      duration: 18 + rand(4) * 16,
      drift: (rand(5) - 0.5) * 60,
      opacity: 0.25 + rand(6) * 0.5,
    };
  });

  return (
    <>
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </>
  );
}
