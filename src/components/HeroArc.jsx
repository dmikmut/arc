export default function HeroArc() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="heroArcGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="40%" stopColor="white" stopOpacity="0.18" />
            <stop offset="100%" stopColor="white" stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id="endGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* faint grid-like trajectory guides */}
        <path
          d="M 0 680 C 200 680, 500 550, 1200 350"
          stroke="white"
          strokeOpacity="0.06"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 0 680 C 300 680, 700 400, 1200 150"
          stroke="white"
          strokeOpacity="0.05"
          strokeWidth="1"
          fill="none"
        />

        {/* main arc */}
        <path
          className="hero-main-arc"
          d="M 0 680 C 250 680, 650 500, 1200 100"
          stroke="url(#heroArcGrad)"
          strokeWidth="1.5"
          fill="none"
          pathLength="1"
        />

        {/* end glow + dot */}
        <circle cx="1200" cy="100" r="60" fill="url(#endGlow)" className="hero-glow" />
        <circle cx="1200" cy="100" r="4" fill="white" className="hero-end-dot" />
      </svg>

      <style>{`
        .hero-main-arc {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: heroDraw 2.4s cubic-bezier(0.7, 0, 0.3, 1) 0.3s forwards;
        }
        @keyframes heroDraw { to { stroke-dashoffset: 0; } }

        .hero-end-dot {
          opacity: 0;
          animation: heroFade 0.6s ease-out 2.4s forwards;
        }
        .hero-glow {
          opacity: 0;
          transform-origin: 1200px 100px;
          animation: heroFade 0.6s ease-out 2.4s forwards, heroGlowPulse 4s ease-in-out 3s infinite;
        }
        @keyframes heroFade { to { opacity: 1; } }
        @keyframes heroGlowPulse {
          0%,100% { transform: scale(0.85); }
          50%     { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
