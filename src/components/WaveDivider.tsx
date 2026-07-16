export function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none relative h-16 w-full overflow-hidden ${flip ? "rotate-180" : ""}`}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wg1" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--brand-purple)" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <path
          className="wave-path"
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill="url(#wg1)"
        />
        <path
          className="wave-path wave-path-2"
          d="M0,50 C240,20 480,80 720,50 C960,20 1200,80 1440,50 L1440,80 L0,80 Z"
          fill="url(#wg1)"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
