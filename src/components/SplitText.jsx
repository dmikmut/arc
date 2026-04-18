export default function SplitText({ text, className = '', delay = 30, as: Tag = 'span' }) {
  const words = text.split(' ');
  let charIdx = 0;
  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split('').map((ch, ci) => {
            const i = charIdx++;
            return (
              <span
                key={ci}
                className="inline-block split-char"
                style={{ animationDelay: `${i * delay}ms` }}
              >
                {ch}
              </span>
            );
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
      <style>{`
        .split-char {
          opacity: 0;
          transform: translateY(0.4em);
          animation: splitIn 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes splitIn {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Tag>
  );
}
