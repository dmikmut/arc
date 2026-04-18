export default function CareerCard({ career, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group text-left w-full p-4 transition-all duration-200 border ${
        selected
          ? 'bg-white text-black border-white'
          : 'bg-transparent text-white border-white/10 hover:border-white/30'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-2xl">{career.icon}</div>
        {selected && (
          <span className="text-[9px] font-semibold tracking-[0.2em] mt-1">●</span>
        )}
      </div>
      <h3 className="font-medium text-sm leading-tight">{career.name}</h3>
      <p className={`text-[11px] mt-1 leading-snug ${selected ? 'text-neutral-600' : 'text-neutral-500'}`}>
        {career.tagline}
      </p>
      <div className={`mt-3 pt-3 border-t text-[10px] tracking-wider uppercase flex justify-between ${selected ? 'border-black/10 text-neutral-600' : 'border-white/10 text-neutral-500'}`}>
        <span>${(career.baseSalary / 1000).toFixed(0)}k</span>
        <span>+{(career.growthRate * 100).toFixed(0)}%/yr</span>
      </div>
    </button>
  );
}
