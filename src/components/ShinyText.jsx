export default function ShinyText({ children, className = '' }) {
  return (
    <span className={`shiny-text ${className}`}>
      {children}
      <style>{`
        .shiny-text {
          background: linear-gradient(
            110deg,
            #737373 0%,
            #737373 40%,
            #ffffff 50%,
            #737373 60%,
            #737373 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shine 4s linear infinite;
        }
        @keyframes shine {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </span>
  );
}
