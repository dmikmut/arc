import { useRef } from 'react';

export default function Spotlight({ children, className = '', as: Tag = 'div', ...props }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      className={`spotlight-card ${className}`}
      {...props}
    >
      {children}
      <style>{`
        .spotlight-card {
          position: relative;
          isolation: isolate;
        }
        .spotlight-card::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            400px circle at var(--x, 50%) var(--y, 50%),
            rgba(255,255,255,0.08),
            transparent 40%
          );
          opacity: 0;
          transition: opacity 0.25s ease;
          z-index: 0;
        }
        .spotlight-card:hover::before { opacity: 1; }
        .spotlight-card > * { position: relative; z-index: 1; }
      `}</style>
    </Tag>
  );
}
