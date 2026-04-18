export default function LogoMark({ size = 200, className = '', animate = true }) {
  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
        className="relative"
      >
        <defs>
          <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.35" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* glow behind origin */}
        <circle cx="30" cy="170" r="40" fill="url(#dotGlow)" className={animate ? 'logo-glow' : ''} />

        {/* origin dot */}
        <circle cx="30" cy="170" r="9" fill="currentColor" className={animate ? 'logo-dot' : ''} />

        {/* inner arc */}
        <path
          d="M30 120 A 50 50 0 0 1 80 170"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          className={animate ? 'logo-arc a1' : ''}
          pathLength="1"
        />
        {/* middle arc */}
        <path
          d="M30 75 A 95 95 0 0 1 125 170"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.55"
          className={animate ? 'logo-arc a2' : ''}
          pathLength="1"
        />
        {/* outer arc */}
        <path
          d="M30 30 A 140 140 0 0 1 170 170"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.3"
          className={animate ? 'logo-arc a3' : ''}
          pathLength="1"
        />
      </svg>

      <style>{`
        .logo-arc {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawArc 1.4s cubic-bezier(0.7, 0, 0.3, 1) forwards;
        }
        .logo-arc.a1 { animation-delay: 0.1s; }
        .logo-arc.a2 { animation-delay: 0.35s; }
        .logo-arc.a3 { animation-delay: 0.6s; }
        @keyframes drawArc {
          to { stroke-dashoffset: 0; }
        }
        .logo-dot {
          transform-origin: 30px 170px;
          animation: popDot 0.5s ease-out forwards;
          opacity: 0;
        }
        @keyframes popDot {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .logo-glow {
          animation: glowPulse 3.5s ease-in-out infinite;
          transform-origin: 30px 170px;
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; transform: scale(0.9); }
          50%      { opacity: 1;   transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
