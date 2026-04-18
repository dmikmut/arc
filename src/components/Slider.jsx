export default function Slider({ label, value, onChange, min = 0, max = 100, leftLabel, rightLabel, format }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs uppercase tracking-[0.15em] text-neutral-400 font-medium">
          {label}
        </label>
        <span className="text-sm text-white tabular-nums font-medium">
          {format ? format(value) : value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--val': `${pct}%`, width: '100%' }}
      />
      {(leftLabel || rightLabel) && (
        <div className="flex justify-between text-[10px] text-neutral-500 mt-2 tracking-wider uppercase">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      )}
    </div>
  );
}
