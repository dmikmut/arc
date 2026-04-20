import { useMemo, useState, useEffect, useRef } from 'react';
import { CAREERS, CATEGORIES } from './careers';
import { MAJORS, COLLEGES } from './colleges';
import { simulate } from './simulation';
import CareerCard from './components/CareerCard';
import Slider from './components/Slider';
import StatCard from './components/StatCard';
import Timeline from './components/Timeline';
import { SalaryChart, NetWorthChart, WellbeingChart, ProfileRadar } from './components/Charts';
import Aurora from './components/Aurora';
import SplitText from './components/SplitText';
import ShinyText from './components/ShinyText';
import Spotlight from './components/Spotlight';
import Logo from './components/Logo';
import Magnetic from './components/Magnetic';
import ScrollHint from './components/ScrollHint';
import HeroArc from './components/HeroArc';
import CollegePage from './components/CollegePage';
import useReveal from './hooks/useReveal';

function Reveal({ children, className = '', delay = 0 }) {
  const [ref, shown] = useReveal();
  return (
    <div ref={ref} className={`reveal ${shown ? 'shown' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function SimStateSelect({ value, onChange, states }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const entries = Object.entries(states);
  const filtered = query.trim()
    ? entries.filter(([code, s]) =>
        code.toLowerCase().includes(query.toLowerCase()) ||
        s.name.toLowerCase().includes(query.toLowerCase())
      )
    : entries;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => { setOpen(!open); setTimeout(() => inputRef.current?.focus(), 50); }}
        className="bg-transparent border hairline px-3 py-2 text-sm text-white outline-none focus:border-white/30 transition flex items-center gap-2 min-w-[180px]"
      >
        <span>{states[value]?.name || value}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="2" className="ml-auto shrink-0">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 top-full left-0 mt-1 w-64 bg-neutral-900 border border-white/10 shadow-xl max-h-64 flex flex-col">
          <div className="p-2 border-b border-white/10">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to search..."
              className="w-full bg-transparent text-sm text-white placeholder-neutral-600 outline-none px-2 py-1.5"
            />
          </div>
          <div className="overflow-y-auto flex-1">
            {filtered.map(([code, s]) => (
              <button
                key={code}
                onClick={() => { onChange(code); setQuery(''); setOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm transition ${
                  code === value ? 'bg-white/10 text-white' : 'text-neutral-300 hover:bg-white/5'
                }`}
              >
                <span className="mono text-neutral-500 mr-2">{code}</span>{s.name}
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="px-4 py-3 text-sm text-neutral-600">No match</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Per-state data ──
// stateTax: effective top marginal rate for single filer ~$100k (2024 tables)
// col: cost-of-living multiplier vs national avg (BEA Regional Price Parities 2022)
// Source: Tax Foundation, BEA RPP, BLS CEWS
const STATES = {
  AL: { name: 'Alabama',        stateTax: 0.050, col: 0.87 },
  AK: { name: 'Alaska',         stateTax: 0.000, col: 1.04 },
  AZ: { name: 'Arizona',        stateTax: 0.025, col: 0.97 },
  AR: { name: 'Arkansas',       stateTax: 0.044, col: 0.84 },
  CA: { name: 'California',     stateTax: 0.093, col: 1.39 },
  CO: { name: 'Colorado',       stateTax: 0.044, col: 1.05 },
  CT: { name: 'Connecticut',    stateTax: 0.060, col: 1.12 },
  DE: { name: 'Delaware',       stateTax: 0.066, col: 1.01 },
  DC: { name: 'Washington DC',  stateTax: 0.085, col: 1.49 },
  FL: { name: 'Florida',        stateTax: 0.000, col: 1.01 },
  GA: { name: 'Georgia',        stateTax: 0.055, col: 0.92 },
  HI: { name: 'Hawaii',         stateTax: 0.079, col: 1.36 },
  ID: { name: 'Idaho',          stateTax: 0.058, col: 0.93 },
  IL: { name: 'Illinois',       stateTax: 0.049, col: 0.96 },
  IN: { name: 'Indiana',        stateTax: 0.031, col: 0.90 },
  IA: { name: 'Iowa',           stateTax: 0.057, col: 0.88 },
  KS: { name: 'Kansas',         stateTax: 0.057, col: 0.89 },
  KY: { name: 'Kentucky',       stateTax: 0.040, col: 0.87 },
  LA: { name: 'Louisiana',      stateTax: 0.043, col: 0.88 },
  ME: { name: 'Maine',          stateTax: 0.071, col: 1.00 },
  MD: { name: 'Maryland',       stateTax: 0.057, col: 1.12 },
  MA: { name: 'Massachusetts',  stateTax: 0.090, col: 1.22 },
  MI: { name: 'Michigan',       stateTax: 0.042, col: 0.90 },
  MN: { name: 'Minnesota',      stateTax: 0.068, col: 0.97 },
  MS: { name: 'Mississippi',    stateTax: 0.050, col: 0.83 },
  MO: { name: 'Missouri',       stateTax: 0.048, col: 0.87 },
  MT: { name: 'Montana',        stateTax: 0.059, col: 0.95 },
  NE: { name: 'Nebraska',       stateTax: 0.058, col: 0.90 },
  NV: { name: 'Nevada',         stateTax: 0.000, col: 0.99 },
  NH: { name: 'New Hampshire',  stateTax: 0.000, col: 1.07 },
  NJ: { name: 'New Jersey',     stateTax: 0.064, col: 1.18 },
  NM: { name: 'New Mexico',     stateTax: 0.055, col: 0.92 },
  NY: { name: 'New York',       stateTax: 0.085, col: 1.34 },
  NC: { name: 'North Carolina', stateTax: 0.045, col: 0.91 },
  ND: { name: 'North Dakota',   stateTax: 0.019, col: 0.90 },
  OH: { name: 'Ohio',           stateTax: 0.035, col: 0.90 },
  OK: { name: 'Oklahoma',       stateTax: 0.048, col: 0.86 },
  OR: { name: 'Oregon',         stateTax: 0.090, col: 1.04 },
  PA: { name: 'Pennsylvania',   stateTax: 0.031, col: 0.98 },
  RI: { name: 'Rhode Island',   stateTax: 0.059, col: 1.03 },
  SC: { name: 'South Carolina', stateTax: 0.064, col: 0.89 },
  SD: { name: 'South Dakota',   stateTax: 0.000, col: 0.88 },
  TN: { name: 'Tennessee',      stateTax: 0.000, col: 0.90 },
  TX: { name: 'Texas',          stateTax: 0.000, col: 0.92 },
  UT: { name: 'Utah',           stateTax: 0.047, col: 0.97 },
  VT: { name: 'Vermont',        stateTax: 0.066, col: 1.03 },
  VA: { name: 'Virginia',       stateTax: 0.058, col: 1.04 },
  WA: { name: 'Washington',     stateTax: 0.000, col: 1.10 },
  WV: { name: 'West Virginia',  stateTax: 0.052, col: 0.83 },
  WI: { name: 'Wisconsin',      stateTax: 0.053, col: 0.92 },
  WY: { name: 'Wyoming',        stateTax: 0.000, col: 0.91 },
};

// City-size multiplier on top of state COL
const CITY_TIERS = [
  { id: 'suburb',  label: 'Suburb / Rural', mult: 0.85, note: 'Small town or suburban area' },
  { id: 'midcity', label: 'Mid-size City',  mult: 1.00, note: 'Average city in this state' },
  { id: 'bigcity', label: 'Major City',     mult: 1.22, note: 'Largest metro in the state' },
];

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'how', label: 'How it works' },
  { id: 'college', label: 'College' },
  { id: 'simulator', label: 'Simulator' },
];

const fmtMoney = (n) => {
  if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (Math.abs(n) >= 1e3) return `$${(n / 1e3).toFixed(0)}k`;
  return `$${Math.round(n)}`;
};

function Nav({ active }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b hairline">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <a href="#home" className="text-white hover:text-neutral-200 transition">
          <Logo />
        </a>
        <div className="hidden md:flex gap-1">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`text-xs uppercase tracking-[0.15em] px-3 py-2 transition-colors ${
                active === n.id ? 'text-white' : 'text-neutral-500 hover:text-white'
              }`}
            >
              {n.label}
            </a>
          ))}
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen
              ? <path d="M18 6L6 18M6 6l12 12" />
              : <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t hairline bg-black/95 backdrop-blur-md">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={() => setMenuOpen(false)}
              className={`block px-6 py-3 text-xs uppercase tracking-[0.15em] transition-colors border-b hairline ${
                active === n.id ? 'text-white bg-white/5' : 'text-neutral-500'
              }`}
            >
              {n.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Home() {
  return (
    <section id="home" className="min-h-screen flex flex-col px-4 sm:px-6 pt-20 sm:pt-24 pb-10 relative overflow-hidden">
      {/* Background arc motif */}
      <HeroArc />

      {/* Centered hero */}
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col items-center justify-center text-center relative">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border hairline rounded-full mb-10">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-300">
              <ShinyText>Live simulation · no backend</ShinyText>
            </span>
          </div>
        </Reveal>

        <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.9]">
          <SplitText text="Your life," as="span" className="block" />
          <SplitText text="on an arc." as="span" className="block text-neutral-500" delay={40} />
        </h1>

        <Reveal delay={700}>
          <p className="text-neutral-400 mt-10 max-w-xl text-base sm:text-lg leading-relaxed mx-auto">
            Start with a major and college — see the campus vibe, stress, and what it
            takes to get in. Then pick a career and watch thirty-five years of income,
            wellbeing, and wealth unfold.
          </p>
        </Reveal>

        <Reveal delay={900}>
          <div className="mt-12 flex gap-3 flex-wrap items-center justify-center">
            <Magnetic>
              <a href="#college" className="inline-block px-7 py-3.5 bg-white text-black text-sm font-medium hover:bg-neutral-100 transition">
                Pick a college →
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#simulator" className="inline-block px-7 py-3.5 border hairline text-sm font-medium text-white hover:bg-white/5 transition">
                Skip to simulator
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>

      {/* Bottom row: stats + scroll hint */}
      <div className="max-w-6xl mx-auto w-full mt-10 relative">
        <Reveal delay={1200}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
            {[
              { n: '60', l: 'Colleges' },
              { n: '43', l: 'Careers' },
              { n: '35', l: 'Years modeled' },
              { n: '0', l: 'Backend calls' },
            ].map((s) => (
              <Spotlight key={s.l} className="bg-black p-6 text-center">
                <div className="text-4xl font-semibold tracking-tight">{s.n}</div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mt-2">{s.l}</div>
              </Spotlight>
            ))}
          </div>
        </Reveal>

        <Reveal delay={1400}>
          <div className="flex justify-center mt-14">
            <ScrollHint href="#about" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  const features = [
    { n: '01', t: 'Start at college', d: '60 campuses — universities and community colleges — with acceptance rates, recommended GPA/SAT, cost, debt, and a happiness + stress forecast.' },
    { n: '02', t: 'Real careers, real tradeoffs', d: '43 career paths with BLS-sourced salary curves, stress baselines, creativity, purpose, and job security.' },
    { n: '03', t: 'Your preferences matter', d: 'Ambition, risk tolerance, work-life balance, savings rate, and location. Each dial measurably shifts your trajectory.' },
    { n: '04', t: 'Frontend-only', d: 'No backend. No sign-up. Nothing leaves your browser. The simulation is pure math running live on every render.' },
  ];
  return (
    <section id="about" className="min-h-screen px-4 sm:px-6 py-16 sm:py-28">
      <div className="max-w-6xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-6 mono">—  About</div>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-2xl leading-tight">
          Decisions compound. This tool makes that visible.
        </h2>
        <p className="text-neutral-400 mt-6 max-w-2xl text-base leading-relaxed">
          Life Simulator is a thought experiment you can touch. It isn't predictive —
          it's illustrative. The point is to feel how small tradeoffs ripple across
          decades, and to see tensions between money, meaning, and balance.
        </p>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {features.map((f, i) => (
            <Reveal key={f.n} delay={i * 100}>
              <Spotlight className="bg-black p-8 h-full">
                <div className="text-[11px] mono text-neutral-500 tracking-wider mb-4">{f.n}</div>
                <h3 className="text-xl font-medium text-white">{f.t}</h3>
                <p className="text-sm text-neutral-400 mt-3 leading-relaxed">{f.d}</p>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: '01', t: 'Pick a college', d: 'Choose a major, then browse 60 campuses — from Ivy League to community colleges — ranked by program fit. See the GPA/SAT, cost, and vibe.' },
    { n: '02', t: 'Choose a career', d: 'Your major filters to matching careers. Pick one, tune ambition, savings, risk, and location. The sim recalculates on every frame.' },
    { n: '03', t: 'Read the outcome', d: 'Charts show income, net worth, happiness, stress, and skill over 35 years — starting from your college debt. Life events mark the turning points.' },
  ];
  return (
    <section id="how" className="min-h-screen px-4 sm:px-6 py-16 sm:py-28 border-t hairline">
      <div className="max-w-6xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-6 mono">—  How it works</div>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-2xl leading-tight">
          College to career. Three steps.
        </h2>

        <div className="mt-20 space-y-px bg-white/5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <Spotlight className="bg-black p-5 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start">
                <div className="md:col-span-2 text-5xl font-semibold text-neutral-700 mono">{s.n}</div>
                <div className="md:col-span-4">
                  <h3 className="text-2xl font-medium text-white">{s.t}</h3>
                </div>
                <div className="md:col-span-6">
                  <p className="text-sm text-neutral-400 leading-relaxed">{s.d}</p>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#simulator" className="inline-block px-6 py-3 bg-white text-black text-sm font-medium hover:bg-neutral-200 transition">
            Try the simulator →
          </a>
        </div>
      </div>
    </section>
  );
}

function Simulator({ majorId, collegeId }) {
  const major = MAJORS.find((m) => m.id === majorId);
  const college = collegeId ? COLLEGES.find((c) => c.id === collegeId) : null;
  const majorCareerIds = major ? major.careers : [];

  const [careerId, setCareerId] = useState('software_engineer');
  const [category, setCategory] = useState('all');
  const [ambition, setAmbition] = useState(60);
  const [workLife, setWorkLife] = useState(50);
  const [risk, setRisk] = useState(50);
  const [savingsRate, setSavingsRate] = useState(20);
  const [stateId, setStateId] = useState('TX');
  const [cityTierId, setCityTierId] = useState('midcity');
  const [seed, setSeed] = useState(42);
  const [showMajorOnly, setShowMajorOnly] = useState(false);

  useEffect(() => {
    if (majorCareerIds.length > 0 && !majorCareerIds.includes(careerId)) {
      setCareerId(majorCareerIds[0]);
    }
    if (majorCareerIds.length > 0) setShowMajorOnly(true);
  }, [majorId]);

  const career = CAREERS.find((c) => c.id === careerId);
  const stateData = STATES[stateId];
  const cityTier = CITY_TIERS.find((t) => t.id === cityTierId);
  const location = {
    mult: stateData.col * cityTier.mult,
    stateTax: stateData.stateTax,
  };
  const collegeDebt = college ? college.avgDebt : 0;

  const filteredCareers = showMajorOnly && majorCareerIds.length > 0
    ? CAREERS.filter((c) => majorCareerIds.includes(c.id))
    : category === 'all' ? CAREERS : CAREERS.filter((c) => c.category === category);

  const sim = useMemo(
    () => simulate(career, {
      ambition, workLife, risk, savingsRate,
      collegeDebt,
      location,
    }, seed),
    [career, ambition, workLife, risk, savingsRate, collegeDebt, location.mult, location.stateTax, seed]
  );

  const { series, events, summary } = sim;

  const verdict = useMemo(() => {
    const { avgHappiness, avgStress, finalNetWorth } = summary;
    if (avgHappiness > 72 && finalNetWorth > 1500000) return 'Thriving';
    if (avgHappiness > 62 && finalNetWorth > 600000) return 'Comfortable';
    if (avgStress > 75) return 'Burned out';
    if (finalNetWorth < 100000) return 'Financially tight';
    return 'Middle path';
  }, [summary]);

  return (
    <section id="simulator" className="px-4 sm:px-6 py-16 sm:py-28 border-t hairline">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-6 mono">—  Simulator</div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Run a life.</h2>
          </div>
          <button
            onClick={() => setSeed(Math.floor(Math.random() * 10000))}
            className="hidden sm:flex group items-center gap-3 px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-semibold uppercase tracking-[0.12em] hover:from-violet-400 hover:to-fuchsia-400 active:scale-95 transition-all shadow-lg shadow-violet-500/25 rounded-sm"
          >
            <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 4v6h6" /><path d="M23 20v-6h-6" />
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
            </svg>
            Reroll luck
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/5">

          {/* LEFT: inputs */}
          <div className="lg:col-span-5 bg-black p-4 sm:p-8 space-y-8 sm:space-y-10">

            {/* Career picker */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400">Career</h3>
                <span className="text-[11px] text-neutral-500 mono">{filteredCareers.length} shown</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {majorCareerIds.length > 0 && (
                  <button
                    onClick={() => { setShowMajorOnly(true); setCategory('all'); }}
                    className={`text-[10px] uppercase tracking-wider px-2.5 py-1 border transition ${
                      showMajorOnly
                        ? 'bg-white text-black border-white'
                        : 'border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {major?.name}
                  </button>
                )}
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setCategory(cat.id); setShowMajorOnly(false); }}
                    className={`text-[10px] uppercase tracking-wider px-2.5 py-1 border transition ${
                      !showMajorOnly && category === cat.id
                        ? 'bg-white text-black border-white'
                        : 'border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-1">
                {filteredCareers.map((c) => (
                  <CareerCard key={c.id} career={c} selected={c.id === careerId} onClick={() => setCareerId(c.id)} />
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">Preferences</h3>
              <div className="space-y-8">
                <Slider label="Ambition" value={ambition} onChange={setAmbition} leftLabel="Chill" rightLabel="Relentless" />
                <Slider label="Work-life balance" value={workLife} onChange={setWorkLife} leftLabel="All work" rightLabel="All life" />
                <Slider label="Risk tolerance" value={risk} onChange={setRisk} leftLabel="Safe" rightLabel="Bold" />
                <Slider label="Savings rate" value={savingsRate} onChange={setSavingsRate} min={0} max={60} format={(v) => `${v}%`} leftLabel="Spender" rightLabel="Saver" />
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-4">Location after graduation</h3>
              <div className="flex flex-wrap gap-3 items-end mb-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-500 block mb-1.5">State</label>
                  <SimStateSelect value={stateId} onChange={setStateId} states={STATES} />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-500 block mb-1.5">City size</label>
                  <div className="grid grid-cols-3 gap-px bg-white/10">
                    {CITY_TIERS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setCityTierId(t.id)}
                        className={`py-2 text-[10px] uppercase tracking-wider transition ${
                          cityTierId === t.id ? 'bg-white text-black' : 'bg-black text-neutral-400 hover:text-white'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-neutral-500 leading-relaxed">
                {stateData.name} · {cityTier.note}
                <span className="block text-neutral-400 mt-1 mono">
                  Cost of living {location.mult.toFixed(2)}× · State income tax {stateData.stateTax === 0 ? 'none' : (stateData.stateTax * 100).toFixed(1) + '%'}
                </span>
                {stateData.stateTax === 0 && (
                  <span className="text-emerald-400 text-[10px]">No state income tax</span>
                )}
              </div>
            </div>

            {/* Career profile */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-4">
                Profile · {career.name}
              </h3>
              <ProfileRadar career={career} />
              <p className="text-xs text-neutral-400 leading-relaxed mt-4">{career.description}</p>
              {career.majors && (
                <div className="mt-6 pt-6 border-t hairline">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">Common majors</div>
                  <div className="flex flex-wrap gap-1.5">
                    {career.majors.map((m) => (
                      <span key={m} className="text-[11px] px-2 py-1 border hairline text-neutral-300">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: outputs */}
          <div className="lg:col-span-7 bg-black p-4 sm:p-8 space-y-8 sm:space-y-10">

            {/* Verdict */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Outcome</span>
                <span className="text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 border hairline text-neutral-400 mono">
                  today's $ · BLS-informed
                </span>
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">{verdict}.</div>
              <div className="text-sm text-neutral-400 mt-3">
                As a <span className="text-white">{career.name.toLowerCase()}</span> at the <span className="text-white">{summary.percentile}th percentile</span> in <span className="text-white">{stateData.name}</span> ({cityTier.label.toLowerCase()}) · {events.length} major events
                {college && (
                  <span> · <span className="text-white">{college.name}</span> grad ({fmtMoney(collegeDebt)} debt)</span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
              <StatCard label="Net worth" rawNumber={summary.finalNetWorth} format={fmtMoney} sub={`age ${22 + 35} · today's $`} />
              <StatCard label="Peak salary" rawNumber={summary.peakSalary} format={fmtMoney} sub={`age ${summary.peakAge} · gross`} />
              <StatCard label="Take-home total" rawNumber={summary.totalTakeHome} format={fmtMoney} sub="after tax, 35 yrs" />
              <StatCard label="Taxes paid" rawNumber={summary.totalTaxesPaid} format={fmtMoney} sub="federal · FICA · state" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
              <StatCard label="Avg happiness" rawNumber={summary.avgHappiness} format={(v) => `${Math.round(v)}`} sub="out of 100" />
              <StatCard label="Avg stress" rawNumber={summary.avgStress} format={(v) => `${Math.round(v)}`} sub="out of 100" />
              <StatCard label="Income percentile" rawNumber={summary.percentile} format={(v) => `${Math.round(v)}th`} sub="for this career" />
              <StatCard label="Final skill" rawNumber={summary.finalSkill} format={(v) => `${Math.round(v)}`} sub="experience built" />
            </div>

            {/* Mobile reroll */}
            <button
              onClick={() => setSeed(Math.floor(Math.random() * 10000))}
              className="sm:hidden group flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-semibold uppercase tracking-[0.12em] active:scale-95 transition-all shadow-lg shadow-violet-500/25 rounded-sm"
            >
              <svg className="w-5 h-5 group-active:rotate-180 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 4v6h6" /><path d="M23 20v-6h-6" />
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
              </svg>
              Reroll luck
            </button>

            {/* Charts */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400">Annual income</h3>
                <span className="text-[11px] text-neutral-500 mono">35 YRS</span>
              </div>
              <SalaryChart data={series} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400">Net worth</h3>
                <span className="text-[11px] text-neutral-500 mono">COMPOUNDED</span>
              </div>
              <NetWorthChart data={series} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400">Wellbeing & skill</h3>
                <div className="flex gap-4 text-[10px] uppercase tracking-wider text-neutral-500">
                  <span className="flex items-center gap-2"><span className="w-3 h-[2px] bg-amber-400" /> Happy</span>
                  <span className="flex items-center gap-2"><span className="w-3 h-[2px] bg-rose-400" /> Stress</span>
                  <span className="flex items-center gap-2"><span className="w-3 h-[2px] bg-violet-400" /> Skill</span>
                </div>
              </div>
              <WellbeingChart data={series} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400">Life events</h3>
                <span className="text-[11px] text-neutral-500 mono">{events.length}</span>
              </div>
              <Timeline events={events} />
            </div>

            {/* Methodology */}
            <Methodology />
          </div>
        </div>
      </div>
    </section>
  );
}

function Methodology() {
  const [open, setOpen] = useState(false);
  return (
    <div className="border hairline">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">
          Methodology · how accurate is this?
        </span>
        <span className="text-neutral-500 text-sm mono">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="p-5 border-t hairline text-[13px] text-neutral-400 leading-relaxed space-y-4">
          <p>
            <span className="text-white font-medium">All dollars shown are in 2024 (today's) dollars.</span>{' '}
            Wages are assumed to track inflation, which is roughly true historically.
          </p>
          <div>
            <div className="text-white font-medium mb-1">Grounded in data</div>
            <ul className="list-disc list-inside space-y-1 ml-1">
              <li>
                <span className="text-neutral-300">Salaries:</span> anchored to <a className="underline hover:text-white" target="_blank" rel="noreferrer" href="https://www.bls.gov/oes/">BLS OEWS</a> (May 2023) — entry, mid, peak, and late-career medians per occupation. Ambition picks a percentile from ~10th to ~90th.
              </li>
              <li>
                <span className="text-neutral-300">Federal tax:</span> 2024 IRS brackets (single filer) + standard deduction ($14,600).
              </li>
              <li>
                <span className="text-neutral-300">FICA:</span> 6.2% SS (capped at $168,600) + 1.45% Medicare + 0.9% additional Medicare over $200k.
              </li>
              <li>
                <span className="text-neutral-300">State tax:</span> real per-state effective rates for all 50 states + DC (Tax Foundation 2024). Zero for TX, FL, WA, TN, NV, WY, SD, AK, NH.
              </li>
              <li>
                <span className="text-neutral-300">Cost of living:</span> BLS Consumer Expenditure Survey baseline (~$42k), scaled by BEA Regional Price Parities per state × city-size multiplier.
              </li>
              <li>
                <span className="text-neutral-300">Investment return:</span> 5% real (S&P 500 ~7% nominal − 3% inflation).
              </li>
              <li>
                <span className="text-neutral-300">Training:</span> doctors/scientists/lawyers have realistic training-year wages and debt.
              </li>
            </ul>
          </div>
          <div>
            <div className="text-white font-medium mb-1">Explicitly heuristic</div>
            <ul className="list-disc list-inside space-y-1 ml-1 text-neutral-500">
              <li>Happiness, stress, skill — qualitative models, not predictive.</li>
              <li>Life events (promotions, burnout, downturns) — chance-based, illustrative.</li>
              <li>Single filer, US only, no kids/marriage, no employer benefits modeled.</li>
            </ul>
          </div>
          <p className="text-neutral-500 text-[12px] pt-2 border-t hairline">
            This is a decision-exploration tool, not a financial planner. Real outcomes depend on factors no simulation can capture — relationships, health, luck, where you're born.
          </p>
        </div>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="px-4 sm:px-6 py-12 border-t hairline">
      <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
        <Logo />
        <div className="text-[11px] text-neutral-500 uppercase tracking-[0.2em]">
          Frontend · React + Tailwind · Recharts
        </div>
        <a href="#home" className="text-[11px] text-neutral-500 uppercase tracking-[0.2em] hover:text-white">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

export default function App() {
  const active = useActiveSection();
  const [majorId, setMajorId] = useState('cs');
  const [collegeId, setCollegeId] = useState('mit');
  return (
    <div className="min-h-screen text-white relative">
      <Aurora />
      <Nav active={active} />
      <Home />
      <About />
      <HowItWorks />
      <CollegePage majorId={majorId} setMajorId={setMajorId} collegeId={collegeId} setCollegeId={setCollegeId} />
      <Simulator majorId={majorId} collegeId={collegeId} />
      <Footer />
    </div>
  );
}
