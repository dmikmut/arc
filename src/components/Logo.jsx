export default function Logo({ size = 22, showWord = true, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        {/* the arc */}
        <path
          d="M3 20 C 3 8, 14 4, 21 4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          fill="none"
        />
        {/* start dot (small, muted) */}
        <circle cx="3" cy="20" r="1.6" fill="currentColor" opacity="0.5" />
        {/* end dot (bigger, glowing) */}
        <circle cx="21" cy="4" r="2.2" fill="currentColor" />
        <circle cx="21" cy="4" r="4" fill="currentColor" opacity="0.15" />
      </svg>
      {showWord && (
        <span className="text-sm font-semibold tracking-[0.02em] lowercase">
          arc
          <span className="text-neutral-500 font-normal">.life</span>
        </span>
      )}
    </div>
  );
}
