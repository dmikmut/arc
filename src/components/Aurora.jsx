export default function Aurora() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vh] opacity-[0.18] aurora-blob-1" />
      <div className="absolute top-[20%] right-[-15%] w-[60vw] h-[60vh] opacity-[0.15] aurora-blob-2" />
      <div className="absolute bottom-[-10%] left-[30%] w-[50vw] h-[50vh] opacity-[0.12] aurora-blob-3" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000_80%)]" />
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      <style>{`
        @keyframes auroraMove1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(15%, 10%) scale(1.2); }
        }
        @keyframes auroraMove2 {
          0%,100% { transform: translate(0,0) scale(1.1); }
          50%     { transform: translate(-10%, -15%) scale(0.9); }
        }
        @keyframes auroraMove3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(-15%, 20%) scale(1.15); }
        }
        .aurora-blob-1 {
          background: radial-gradient(circle at 30% 30%, #6366f1, transparent 60%);
          filter: blur(80px);
          animation: auroraMove1 22s ease-in-out infinite;
        }
        .aurora-blob-2 {
          background: radial-gradient(circle at 70% 50%, #a855f7, transparent 60%);
          filter: blur(80px);
          animation: auroraMove2 28s ease-in-out infinite;
        }
        .aurora-blob-3 {
          background: radial-gradient(circle at 50% 50%, #ec4899, transparent 60%);
          filter: blur(80px);
          animation: auroraMove3 25s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
