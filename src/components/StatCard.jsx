import useCountUp from '../hooks/useCountUp';

export default function StatCard({ label, value, rawNumber, format, sub }) {
  const animated = useCountUp(rawNumber ?? 0);
  const display = rawNumber != null && format ? format(animated) : value;

  return (
    <div className="py-6 px-5 border hairline">
      <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
        {label}
      </div>
      <div className="mt-3 text-3xl font-semibold text-white tabular-nums tracking-tight">
        {display}
      </div>
      {sub && <div className="text-[11px] text-neutral-500 mt-1.5">{sub}</div>}
    </div>
  );
}
