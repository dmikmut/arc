import {
  LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, RadarChart,
  PolarGrid, PolarAngleAxis, Radar,
} from 'recharts';

const currency = (n) => {
  if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (Math.abs(n) >= 1e3) return `$${(n / 1e3).toFixed(0)}k`;
  return `$${n}`;
};

function ChartTooltip({ active, payload, label, formatters = {} }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-black border border-white/10 px-3 py-2 text-xs">
      <div className="text-neutral-500 mb-1 mono">AGE {label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-white">
          <span className="w-2 h-[2px]" style={{ background: p.color }} />
          <span className="text-neutral-400">{p.name}</span>
          <span className="font-medium">{formatters[p.dataKey] ? formatters[p.dataKey](p.value) : p.value}</span>
        </div>
      ))}
    </div>
  );
}

const GRID = '#1a1a1a';
const AXIS = '#525252';

export function SalaryChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="salG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ededed" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#ededed" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="2 4" stroke={GRID} />
        <XAxis dataKey="age" stroke={AXIS} fontSize={10} tickLine={false} axisLine={false} />
        <YAxis stroke={AXIS} fontSize={10} tickFormatter={currency} tickLine={false} axisLine={false} />
        <Tooltip content={<ChartTooltip formatters={{ salary: currency }} />} cursor={{ stroke: '#404040' }} />
        <Area type="monotone" dataKey="salary" name="Salary" stroke="#ededed" strokeWidth={1.5} fill="url(#salG)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function NetWorthChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="nwG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ededed" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#ededed" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="2 4" stroke={GRID} />
        <XAxis dataKey="age" stroke={AXIS} fontSize={10} tickLine={false} axisLine={false} />
        <YAxis stroke={AXIS} fontSize={10} tickFormatter={currency} tickLine={false} axisLine={false} />
        <Tooltip content={<ChartTooltip formatters={{ netWorth: currency }} />} cursor={{ stroke: '#404040' }} />
        <Area type="monotone" dataKey="netWorth" name="Net Worth" stroke="#ededed" strokeWidth={1.5} fill="url(#nwG)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function WellbeingChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="2 4" stroke={GRID} />
        <XAxis dataKey="age" stroke={AXIS} fontSize={10} tickLine={false} axisLine={false} />
        <YAxis stroke={AXIS} fontSize={10} domain={[0, 100]} tickLine={false} axisLine={false} />
        <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#404040' }} />
        <Line type="monotone" dataKey="happiness" name="Happiness" stroke="#fbbf24" strokeWidth={1.5} dot={false} />
        <Line type="monotone" dataKey="stress" name="Stress" stroke="#f87171" strokeWidth={1.5} dot={false} />
        <Line type="monotone" dataKey="skill" name="Skill" stroke="#a78bfa" strokeWidth={1.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function ProfileRadar({ career }) {
  const data = [
    { axis: 'Salary', v: Math.min(100, (career.salaryCap / 20000)) },
    { axis: 'Stability', v: career.jobSecurity },
    { axis: 'Prestige', v: career.prestige },
    { axis: 'Creativity', v: career.creativity },
    { axis: 'Purpose', v: career.purpose },
    { axis: 'Low Stress', v: 100 - career.baseStress },
  ];
  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart data={data} outerRadius="72%">
        <PolarGrid stroke="#262626" />
        <PolarAngleAxis dataKey="axis" stroke="#737373" fontSize={10} />
        <Radar dataKey="v" stroke="#ededed" fill="#ededed" fillOpacity={0.15} strokeWidth={1.5} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
