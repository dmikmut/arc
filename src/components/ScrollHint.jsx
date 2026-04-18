export default function ScrollHint({ href = '#about' }) {
  return (
    <a
      href={href}
      className="scroll-hint group inline-flex flex-col items-center gap-3 text-neutral-500 hover:text-white transition-colors"
    >
      <span className="text-[10px] uppercase tracking-[0.3em] mono">
        Scroll to explore
      </span>
      <span className="scroll-line">
        <span className="scroll-dot" />
      </span>
      <style>{`
        .scroll-line {
          position: relative;
          display: block;
          width: 1px;
          height: 44px;
          background: rgba(255,255,255,0.15);
          overflow: hidden;
        }
        .scroll-dot {
          position: absolute;
          top: 0;
          left: 0;
          width: 1px;
          height: 14px;
          background: currentColor;
          animation: scrollGlide 2s cubic-bezier(0.6, 0.05, 0.3, 1) infinite;
        }
        @keyframes scrollGlide {
          0%   { transform: translateY(-14px); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(44px); opacity: 0; }
        }
        .scroll-hint:hover .scroll-line { background: rgba(255,255,255,0.3); }
      `}</style>
    </a>
  );
}
