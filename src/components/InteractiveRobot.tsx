import { useEffect, useRef, useState } from "react";

const MESSAGES = [
  "Hi! I'm Bora 🤖 Ready to shape your career?",
  "Tip: Upload your resume to get an instant ATS score!",
  "Curious about a role? Ask me anything in Chat.",
  "Let's build your personalized learning roadmap!",
  "Great careers start with one small step. Take it today ✨",
  "Need interview prep? I've got questions ready for you.",
];

export function InteractiveRobot() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(true);
  const [eye, setEye] = useState({ x: 0, y: 0 });
  const [waving, setWaving] = useState(false);
  const robotRef = useRef<HTMLDivElement>(null);

  // rotate messages
  useEffect(() => {
    const id = setInterval(() => {
      setShowBubble(false);
      setTimeout(() => {
        setMsgIndex((i) => (i + 1) % MESSAGES.length);
        setShowBubble(true);
      }, 400);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // eyes follow cursor
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = robotRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const max = 3;
      setEye({ x: (dx / dist) * max, y: (dy / dist) * max });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const handleClick = () => {
    setWaving(true);
    setShowBubble(false);
    setTimeout(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
      setShowBubble(true);
    }, 300);
    setTimeout(() => setWaving(false), 900);
  };

  return (
    <div
      ref={robotRef}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 flex cursor-pointer select-none items-end gap-3 sm:bottom-8 sm:right-8"
      style={{ animation: "robot-float 4s ease-in-out infinite" }}
      aria-label="Interactive AI assistant"
    >
      {/* Speech bubble */}
      <div
        className={`glass mb-16 hidden max-w-[220px] rounded-2xl rounded-br-sm px-4 py-2.5 text-xs font-medium shadow-xl transition-all duration-300 sm:block ${
          showBubble ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <div className="relative">
          {MESSAGES[msgIndex]}
          <div className="glass absolute -bottom-3 right-2 h-3 w-3 rotate-45 border-t-0 border-l-0" />
        </div>
      </div>

      {/* Robot SVG */}
      <div className="relative transition-transform hover:scale-110 active:scale-95">
        <svg
          width="88"
          height="100"
          viewBox="0 0 88 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          <defs>
            <linearGradient id="botBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--brand)" />
              <stop offset="100%" stopColor="var(--brand-purple)" />
            </linearGradient>
            <radialGradient id="botGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Antenna */}
          <line x1="44" y1="8" x2="44" y2="18" stroke="url(#botBody)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="44" cy="6" r="3.5" fill="url(#botBody)">
            <animate attributeName="r" values="3.5;4.5;3.5" dur="1.2s" repeatCount="indefinite" />
          </circle>

          {/* Head */}
          <rect x="18" y="18" width="52" height="42" rx="14" fill="url(#botBody)" />
          <rect x="22" y="22" width="44" height="34" rx="10" fill="#0b1020" opacity="0.85" />

          {/* Cheeks / glow */}
          <circle cx="27" cy="46" r="3" fill="#ff6ba1" opacity="0.7" />
          <circle cx="61" cy="46" r="3" fill="#ff6ba1" opacity="0.7" />

          {/* Eyes (whites) */}
          <circle cx="34" cy="38" r="6" fill="#fff" />
          <circle cx="54" cy="38" r="6" fill="#fff" />
          {/* Pupils */}
          <circle cx={34 + eye.x} cy={38 + eye.y} r="2.6" fill="#0b1020">
            <animate attributeName="r" values="2.6;0.3;2.6" dur="4s" keyTimes="0;0.05;0.1" repeatCount="indefinite" />
          </circle>
          <circle cx={54 + eye.x} cy={38 + eye.y} r="2.6" fill="#0b1020">
            <animate attributeName="r" values="2.6;0.3;2.6" dur="4s" keyTimes="0;0.05;0.1" repeatCount="indefinite" />
          </circle>

          {/* Mouth (talking) */}
          <rect x="38" y="48" width="12" height="3" rx="1.5" fill="#7de3ff">
            <animate
              attributeName="height"
              values="3;6;2;5;3"
              dur="0.9s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              values="48;46.5;48.5;47;48"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </rect>

          {/* Neck */}
          <rect x="40" y="60" width="8" height="4" fill="url(#botBody)" />

          {/* Body */}
          <rect x="14" y="64" width="60" height="30" rx="10" fill="url(#botBody)" />
          <circle cx="44" cy="79" r="6" fill="#0b1020" opacity="0.85" />
          <circle cx="44" cy="79" r="2.5" fill="#7de3ff">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
          </circle>

          {/* Left arm */}
          <rect x="6" y="68" width="8" height="18" rx="4" fill="url(#botBody)" />
          {/* Right arm (waves) */}
          <g
            style={{
              transformOrigin: "74px 70px",
              animation: waving
                ? "robot-wave 0.3s ease-in-out 3"
                : "robot-idle-arm 3s ease-in-out infinite",
            }}
          >
            <rect x="74" y="68" width="8" height="18" rx="4" fill="url(#botBody)" />
            <circle cx="78" cy="88" r="5" fill="url(#botBody)" />
          </g>
        </svg>

        {/* Shadow */}
        <div className="mx-auto mt-1 h-2 w-16 rounded-full bg-black/30 blur-md" />
      </div>

      <style>{`
        @keyframes robot-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes robot-wave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-35deg); }
        }
        @keyframes robot-idle-arm {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-10deg); }
        }
      `}</style>
    </div>
  );
}
