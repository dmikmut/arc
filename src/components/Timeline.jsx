export default function Timeline({ events }) {
  if (!events.length) {
    return (
      <div className="text-center text-neutral-500 text-sm py-12">
        No major life events yet. Try adjusting your preferences.
      </div>
    );
  }
  return (
    <div className="divide-y divide-white/5">
      {events.map((ev, i) => (
        <div key={i} className="flex items-center gap-6 py-4">
          <div className="text-xs text-neutral-500 tracking-wider mono w-16">
            AGE {ev.age}
          </div>
          <div className="flex-1">
            <div className="text-sm text-white">{ev.title}</div>
            <div className="text-[11px] text-neutral-500 mt-0.5">
              {Object.entries(ev.impact).map(([k, v]) => {
                const label = k === 'netWorth' ? 'net worth' : k;
                const val =
                  k === 'salary' ? `${v > 1 ? '+' : ''}${Math.round((v - 1) * 100)}%` :
                  k === 'netWorth' ? (v > 0 ? `+$${v.toLocaleString()}` : `-$${Math.abs(v).toLocaleString()}`) :
                  `${v > 0 ? '+' : ''}${v}`;
                return <span key={k} className="mr-4">{label} <span className={ev.negative ? 'text-rose-300' : 'text-emerald-300'}>{val}</span></span>;
              })}
            </div>
          </div>
          <div className={`text-[10px] tracking-[0.2em] uppercase ${ev.negative ? 'text-rose-400' : 'text-emerald-400'}`}>
            {ev.negative ? '— DOWN' : '+ UP'}
          </div>
        </div>
      ))}
    </div>
  );
}
