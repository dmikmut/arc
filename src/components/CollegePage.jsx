import { useMemo, useState } from 'react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
} from 'recharts';
import { MAJORS, COLLEGES, collegesForMajor, majorFitScore, collegeExperience, admissionChance, actToSAT, satToACT, estimateRecWGPA, getCollegeState } from '../colleges';
import { CAREERS } from '../careers';

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DC','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY',
  'LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH',
  'OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
];

const fmtMoney = (n) => {
  if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (Math.abs(n) >= 1e3) return `$${(n / 1e3).toFixed(0)}k`;
  return `$${Math.round(n)}`;
};

const difficulty = (accept) => {
  if (accept < 0.06) return { label: 'Near-impossible', tone: 'text-rose-300' };
  if (accept < 0.12) return { label: 'Extremely selective', tone: 'text-amber-300' };
  if (accept < 0.25) return { label: 'Highly selective', tone: 'text-yellow-200' };
  if (accept < 0.5)  return { label: 'Selective', tone: 'text-emerald-300' };
  return { label: 'Accessible', tone: 'text-sky-300' };
};

function MajorChip({ major, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-left p-4 border transition-all duration-150 ${
        selected
          ? 'bg-white text-black border-white'
          : 'border-white/10 hover:border-white/30 text-white'
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{major.icon}</span>
        <span className="text-sm font-medium leading-tight">{major.name}</span>
      </div>
      <p className={`text-[11px] leading-snug ${selected ? 'text-neutral-600' : 'text-neutral-500'}`}>
        {major.description}
      </p>
    </button>
  );
}

function CollegeCard({ college, fit, chance, chanceIS, chanceOOS, testMode, studentState, selected, onClick }) {
  const isPublic = college.type === 'Public';
  const collegeState = getCollegeState(college);
  const isInState = studentState && studentState === collegeState;
  const diff = difficulty(college.accept);
  return (
    <button
      onClick={onClick}
      className={`text-left p-5 border transition-all duration-150 ${
        selected
          ? 'bg-white text-black border-white'
          : 'border-white/10 hover:border-white/30 text-white bg-black'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <div className={`text-base font-medium leading-tight ${selected ? 'text-black' : 'text-white'}`}>
            {college.name}
          </div>
          <div className={`text-[11px] mt-1 ${selected ? 'text-neutral-600' : 'text-neutral-500'}`}>
            {college.city} · {college.type}
          </div>
        </div>
        <div className="text-right flex items-start gap-3">
          {chance != null && (
            <div className="text-right">
              <div className={`text-[10px] uppercase tracking-wider ${selected ? 'text-neutral-600' : 'text-neutral-500'}`}>
                {isPublic && studentState ? (isInState ? 'In-state' : 'Out-of-state') : 'You'}
              </div>
              <div className={`text-lg font-semibold mono ${selected ? 'text-black' : chanceColor(isPublic && studentState ? (isInState ? chanceIS : chanceOOS) ?? chance : chance)}`}>
                {isPublic && studentState ? ((isInState ? chanceIS : chanceOOS) ?? chance) : chance}%
              </div>
              {isPublic && studentState && chanceIS != null && chanceOOS != null && (
                <div className={`text-[9px] mono mt-0.5 ${selected ? 'text-neutral-500' : 'text-neutral-600'}`}>
                  {isInState ? `OOS: ${chanceOOS}%` : `IS: ${chanceIS}%`}
                </div>
              )}
            </div>
          )}
          <div>
            <div className={`text-[10px] uppercase tracking-wider ${selected ? 'text-neutral-600' : 'text-neutral-500'}`}>
              Fit
            </div>
            <div className={`text-lg font-semibold mono ${selected ? 'text-black' : 'text-white'}`}>
              {fit}
            </div>
          </div>
        </div>
      </div>
      <div className={`mt-3 pt-3 border-t grid grid-cols-4 gap-2 text-[10px] uppercase tracking-wider ${
        selected ? 'border-black/10 text-neutral-600' : 'border-white/10 text-neutral-500'
      }`}>
        <div>
          <div>Accept</div>
          <div className={`mono text-[12px] mt-0.5 ${selected ? 'text-black' : diff.tone}`}>
            {(college.accept * 100).toFixed(1)}%
          </div>
        </div>
        <div>
          <div>Rec GPA</div>
          <div className={`mono text-[12px] mt-0.5 ${selected ? 'text-black' : 'text-white'}`}>
            {college.recGPA?.toFixed(2) || '—'}
          </div>
        </div>
        {testMode !== 'act' && (
          <div>
            <div>Rec SAT</div>
            <div className={`mono text-[12px] mt-0.5 ${selected ? 'text-black' : 'text-white'}`}>
              {college.recSAT || '—'}
            </div>
          </div>
        )}
        {testMode !== 'sat' && (
          <div>
            <div>Rec ACT</div>
            <div className={`mono text-[12px] mt-0.5 ${selected ? 'text-black' : 'text-white'}`}>
              {college.recSAT ? satToACT(college.recSAT) : '—'}
            </div>
          </div>
        )}
        <div>
          <div>Debt</div>
          <div className={`mono text-[12px] mt-0.5 ${selected ? 'text-black' : 'text-white'}`}>
            {fmtMoney(college.avgDebt)}
          </div>
        </div>
      </div>
    </button>
  );
}

function VibeRadar({ vibe }) {
  const data = [
    { axis: 'Academic', v: vibe.academic },
    { axis: 'Social', v: vibe.social },
    { axis: 'Outdoors', v: vibe.outdoors },
    { axis: 'Weather', v: vibe.weather },
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

function StatPill({ label, value, sub }) {
  return (
    <div className="bg-black p-4">
      <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">{label}</div>
      <div className="text-2xl font-semibold mt-2 mono tracking-tight">{value}</div>
      {sub && <div className="text-[11px] text-neutral-500 mt-1">{sub}</div>}
    </div>
  );
}

function chanceColor(pct) {
  if (pct >= 60) return 'text-emerald-400';
  if (pct >= 35) return 'text-yellow-300';
  if (pct >= 15) return 'text-amber-400';
  return 'text-rose-400';
}

function chanceLabel(pct) {
  if (pct >= 70) return 'Strong chance';
  if (pct >= 50) return 'Good chance';
  if (pct >= 30) return 'Competitive';
  if (pct >= 15) return 'Reach';
  if (pct >= 5) return 'Big reach';
  return 'Moonshot';
}

function StatInput({ label, value, onChange, min, max, step, sliderMin, sliderMax, sliderStep, unit }) {
  const sMin = sliderMin ?? min;
  const sMax = sliderMax ?? max;
  const sStep = sliderStep ?? step;
  const pct = ((value - sMin) / (sMax - sMin)) * 100;
  const [draft, setDraft] = useState(null);
  const editing = draft !== null;

  const commit = () => {
    if (draft === null) return;
    const v = parseFloat(draft);
    if (!isNaN(v)) onChange(Math.max(min, Math.min(max, v)));
    setDraft(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-[11px] uppercase tracking-wider text-neutral-400">{label}</label>
        <div className="flex items-center gap-1">
          <input
            type="text"
            inputMode="decimal"
            value={editing ? draft : value}
            onFocus={() => setDraft(String(value))}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => { if (e.key === 'Enter') { commit(); e.target.blur(); } }}
            className="w-20 bg-transparent border hairline px-2 py-1 text-sm text-right text-white mono outline-none focus:border-white/30 transition"
          />
          {unit && <span className="text-[10px] text-neutral-500">{unit}</span>}
        </div>
      </div>
      <input
        type="range"
        min={sMin}
        max={sMax}
        step={sStep}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
        style={{ '--val': `${pct}%` }}
      />
    </div>
  );
}

export default function CollegePage({ majorId, setMajorId, collegeId, setCollegeId }) {
  const [search, setSearch] = useState('');
  const [studentGPA, setStudentGPA] = useState(3.7);
  const [studentWGPA, setStudentWGPA] = useState(4.2);
  const [studentSAT, setStudentSAT] = useState(1400);
  const [studentACT, setStudentACT] = useState(31);
  const [studentExtra, setStudentExtra] = useState(50);
  const [testMode, setTestMode] = useState('both');
  const [studentState, setStudentState] = useState('');
  const student = {
    gpa: studentGPA,
    weightedGPA: studentWGPA,
    sat: testMode !== 'act' ? studentSAT : 0,
    act: testMode !== 'sat' ? studentACT : 0,
    extra: studentExtra,
  };
  const major = MAJORS.find((m) => m.id === majorId);
  const majorCareers = useMemo(
    () => (major ? major.careers.map((cid) => CAREERS.find((c) => c.id === cid)).filter(Boolean) : []),
    [major]
  );

  const rankedColleges = useMemo(() => collegesForMajor(majorId), [majorId]);

  const displayedColleges = useMemo(() => {
    if (!search.trim()) return rankedColleges;
    const q = search.toLowerCase();
    return rankedColleges.filter((c) =>
      c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q)
    );
  }, [rankedColleges, search]);

  const college = COLLEGES.find((c) => c.id === collegeId) || rankedColleges[0];

  const fit = majorFitScore(college, majorId);
  const diff = difficulty(college.accept);
  const yearlyCost = college.cost / 4;
  const totalAid = (college.avgAid || 0) * 4;
  const netCost = college.cost - totalAid;
  const outOfPocket = netCost - college.avgDebt;
  const experience = collegeExperience(college);

  return (
    <section id="college" className="min-h-screen px-6 py-28 border-t hairline">
      <div className="max-w-6xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-6 mono">—  Before the career</div>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl leading-tight">
          Pick a major, pick a campus.
        </h2>
        <p className="text-neutral-400 mt-6 max-w-2xl text-base leading-relaxed">
          Every career starts somewhere. Choose a major, see the colleges that are
          strongest for it, and preview the cost, debt, and campus vibe you'd be
          walking into — before you even start working.
        </p>

        {/* ==== YOUR STATS ==== */}
        <div className="mt-16 border hairline p-6 bg-black">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mono">Your profile</div>
              <div className="text-xl font-medium mt-1">Enter your high school stats</div>
            </div>
            <div className="text-[11px] text-neutral-500">Admission % updates live on every college below</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {/* GPA row */}
            <div className="bg-black p-5 space-y-5">
              <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">GPA</div>
              <StatInput label="Unweighted GPA" value={studentGPA} onChange={setStudentGPA}
                min={1.0} max={4.0} step={0.01} sliderMin={2.0} sliderMax={4.0} sliderStep={0.01} />
              <StatInput label="Weighted GPA" value={studentWGPA} onChange={setStudentWGPA}
                min={1.0} max={5.0} step={0.01} sliderMin={2.0} sliderMax={5.0} sliderStep={0.01} />
              <p className="text-[10px] text-neutral-600 leading-relaxed">
                Weighted GPA above unweighted signals AP/honors rigor — colleges notice.
              </p>
            </div>

            {/* Test scores row */}
            <div className="bg-black p-5 space-y-5">
              <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Test scores</div>
                <div className="flex gap-px bg-white/5">
                  {['sat', 'act', 'both'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setTestMode(m)}
                      className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-medium transition-all ${
                        testMode === m
                          ? 'bg-white text-black'
                          : 'text-neutral-500 hover:text-white'
                      }`}
                    >
                      {m === 'both' ? 'Both' : m.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              {testMode !== 'act' && (
                <StatInput label="SAT" value={studentSAT} onChange={(v) => setStudentSAT(Math.round(v))}
                  min={400} max={1600} step={10} sliderMin={800} sliderMax={1600} sliderStep={10} />
              )}
              {testMode !== 'sat' && (
                <StatInput label="ACT" value={studentACT} onChange={(v) => setStudentACT(Math.round(v))}
                  min={1} max={36} step={1} sliderMin={12} sliderMax={36} sliderStep={1} />
              )}
              <p className="text-[10px] text-neutral-600 leading-relaxed">
                {testMode === 'both'
                  ? 'We use your best score (SAT or converted ACT) automatically.'
                  : testMode === 'sat'
                    ? 'Admission chance based on your SAT score.'
                    : 'Your ACT is converted to SAT equivalent for comparison.'}
              </p>
            </div>
          </div>

          {/* State + Extracurriculars */}
          <div className="bg-black p-5 mt-px border-t hairline">
            <div className="flex items-center gap-4 mb-5 flex-wrap">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1.5">Your state</label>
                <select
                  value={studentState}
                  onChange={(e) => setStudentState(e.target.value)}
                  className="bg-transparent border hairline px-3 py-1.5 text-sm text-white outline-none focus:border-white/30 transition appearance-none cursor-pointer pr-8"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23737373' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
                >
                  <option value="">— Select —</option>
                  {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {studentState && (
                <p className="text-[10px] text-neutral-600 leading-relaxed">
                  In-state / out-of-state admission rates shown for public colleges.
                </p>
              )}
            </div>
            <div className="max-w-xl">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] uppercase tracking-wider text-neutral-400">Extracurriculars / profile strength</label>
                <span className="text-sm font-semibold mono">
                  {studentExtra < 20 ? 'Minimal' : studentExtra < 40 ? 'Light' : studentExtra < 60 ? 'Moderate' : studentExtra < 80 ? 'Strong' : 'Outstanding'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={studentExtra}
                onChange={(e) => setStudentExtra(parseInt(e.target.value))}
                className="w-full"
                style={{ '--val': `${studentExtra}%` }}
              />
              <div className="flex justify-between text-[10px] text-neutral-600 mt-1">
                <span>Minimal</span>
                <span>Light</span>
                <span>Moderate</span>
                <span>Strong</span>
                <span>Outstanding</span>
              </div>
            </div>
            <p className="text-[11px] text-neutral-500 mt-3 leading-relaxed">
              Clubs, sports, leadership, volunteering, research, competitions, awards, and essay quality.
              This is a rough estimator — real admissions is holistic and unpredictable.
            </p>
          </div>
        </div>

        {/* ==== MAJOR PICKER ==== */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400">Major</h3>
            <span className="text-[11px] text-neutral-500 mono">{MAJORS.length} options</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5">
            {MAJORS.map((m) => (
              <MajorChip
                key={m.id}
                major={m}
                selected={m.id === majorId}
                onClick={() => setMajorId(m.id)}
              />
            ))}
          </div>
        </div>

        {/* ==== MAJOR → CAREERS ==== */}
        {major && (
          <div className="mt-10 border hairline p-6 bg-black">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mono">Careers this major feeds</div>
                <div className="text-xl font-medium mt-1">{major.name} → {majorCareers.length} paths</div>
              </div>
              <span className="text-2xl">{major.icon}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-white/5 mt-2">
              {majorCareers.map((c) => (
                <div key={c.id} className="bg-black p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.icon}</span>
                    <span className="font-medium text-sm">{c.name}</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-2 leading-snug">{c.tagline}</p>
                  <div className="mt-3 pt-3 border-t hairline text-[10px] uppercase tracking-wider text-neutral-500 mono flex justify-between">
                    <span>start ${(c.salary.start / 1000).toFixed(0)}k</span>
                    <span>peak ${(c.salary.peak / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==== COLLEGE PICKER + DETAIL ==== */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/5">

          {/* LEFT: ranked college list */}
          <div className="lg:col-span-5 bg-black p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                Colleges for {major?.name}
              </h3>
              <span className="text-[11px] text-neutral-500 mono">{displayedColleges.length} shown</span>
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search colleges or cities..."
                className="w-full bg-transparent border hairline px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none focus:border-white/30 transition"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 gap-2 max-h-[580px] overflow-y-auto pr-1">
              {displayedColleges.map((c) => (
                <CollegeCard
                  key={c.id}
                  college={c}
                  fit={majorFitScore(c, majorId)}
                  chance={admissionChance(c, student)}
                  chanceIS={c.acceptIS ? admissionChance(c, student, true) : null}
                  chanceOOS={c.acceptOOS ? admissionChance(c, student, false) : null}
                  testMode={testMode}
                  studentState={studentState}
                  selected={c.id === college.id}
                  onClick={() => setCollegeId(c.id)}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: selected college */}
          <div className="lg:col-span-7 bg-black p-8 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Campus</span>
                <span className="text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 border hairline text-neutral-400 mono">
                  {college.region}
                </span>
                <span className={`text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 border hairline mono ${diff.tone}`}>
                  {diff.label}
                </span>
              </div>
              <div className="text-4xl md:text-5xl font-semibold tracking-tight">{college.name}</div>
              <div className="text-sm text-neutral-400 mt-2">{college.city} · {college.type}</div>
              <p className="text-sm text-neutral-300 mt-5 leading-relaxed border-l-2 border-white/20 pl-4">
                {college.motto}
              </p>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
              <StatPill
                label="Accept rate"
                value={`${(college.accept * 100).toFixed(1)}%`}
                sub={college.acceptIS ? `IS ${(college.acceptIS * 100).toFixed(0)}% / OOS ${(college.acceptOOS * 100).toFixed(0)}%` : 'class of 2028'}
              />
              <StatPill label="Net cost" value={fmtMoney(netCost)} sub={`after ~${fmtMoney(college.avgAid || 0)}/yr aid`} />
              <StatPill label="Avg debt" value={fmtMoney(college.avgDebt)} sub="College Scorecard" />
              <StatPill label="Enrollment" value={college.size.toLocaleString()} sub="undergrads" />
            </div>

            {/* Admissions + college experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
              <div className="bg-black p-5">
                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4">
                  Admissions
                </div>
                {(() => {
                  const myChance = admissionChance(college, student);
                  const isPublic = college.type === 'Public';
                  const collegeState = getCollegeState(college);
                  const isInState = studentState && studentState === collegeState;
                  const chanceIS = college.acceptIS ? admissionChance(college, student, true) : null;
                  const chanceOOS = college.acceptOOS ? admissionChance(college, student, false) : null;
                  const displayChance = isPublic && studentState ? (isInState ? chanceIS : chanceOOS) ?? myChance : myChance;
                  const gpaDelta = studentGPA - (college.recGPA || 0);
                  const recWGPA = estimateRecWGPA(college.recGPA);
                  const wgpaDelta = recWGPA ? studentWGPA - recWGPA : 0;
                  const recACT = college.recSAT ? satToACT(college.recSAT) : null;
                  const satDelta = studentSAT - (college.recSAT || 0);
                  const actDelta = recACT ? studentACT - recACT : 0;
                  return (
                    <>
                      <div className="flex items-baseline gap-3 mb-1">
                        <div className={`text-5xl font-semibold mono tracking-tight ${displayChance != null ? chanceColor(displayChance) : ''}`}>
                          {displayChance != null ? `${displayChance}%` : '—'}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {displayChance != null ? chanceLabel(displayChance) : 'No data'}
                        </div>
                      </div>
                      {isPublic && chanceIS != null && chanceOOS != null && (
                        <div className="flex gap-4 mb-3 text-[11px] mono">
                          <span className={isInState ? 'text-emerald-400' : 'text-neutral-500'}>
                            In-state: {chanceIS}%
                          </span>
                          <span className={!isInState && studentState ? 'text-amber-400' : 'text-neutral-500'}>
                            Out-of-state: {chanceOOS}%
                          </span>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-neutral-500">Rec GPA</div>
                          <div className="text-lg mono mt-0.5">{college.recGPA?.toFixed(2) || '—'}</div>
                          <div className={`text-[11px] mono mt-0.5 ${gpaDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            You: {studentGPA.toFixed(2)} ({gpaDelta >= 0 ? '+' : ''}{gpaDelta.toFixed(2)})
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-neutral-500">Rec Weighted GPA</div>
                          <div className="text-lg mono mt-0.5">{recWGPA?.toFixed(2) || '—'}</div>
                          <div className={`text-[11px] mono mt-0.5 ${wgpaDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            You: {studentWGPA.toFixed(2)} ({wgpaDelta >= 0 ? '+' : ''}{wgpaDelta.toFixed(2)})
                          </div>
                        </div>
                        {testMode !== 'act' && (
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-neutral-500">Rec SAT</div>
                            <div className="text-lg mono mt-0.5">{college.recSAT || '—'}</div>
                            <div className={`text-[11px] mono mt-0.5 ${satDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              You: {studentSAT} ({satDelta >= 0 ? '+' : ''}{satDelta})
                            </div>
                          </div>
                        )}
                        {testMode !== 'sat' && (
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-neutral-500">Rec ACT</div>
                            <div className="text-lg mono mt-0.5">{recACT || '—'}</div>
                            <div className={`text-[11px] mono mt-0.5 ${actDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              You: {studentACT} ({actDelta >= 0 ? '+' : ''}{actDelta})
                            </div>
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-4 leading-relaxed border-t hairline pt-3">
                        {testMode === 'both'
                          ? 'Uses your best test score (SAT or converted ACT).'
                          : testMode === 'sat'
                            ? 'Using your SAT score for admission estimate.'
                            : 'ACT converted to SAT equivalent for comparison.'}
                        {' '}Weighted GPA shows course rigor. Real admissions is holistic.
                      </p>
                    </>
                  );
                })()
                }
              </div>
              <div className="bg-black p-5">
                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4">
                  College experience
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-neutral-500">Happiness</div>
                    <div className="text-3xl font-semibold mono mt-1">{experience.happiness}</div>
                    <div className="mt-2 h-1 bg-white/10 w-full">
                      <div className="h-full bg-amber-400 transition-all" style={{ width: `${experience.happiness}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-neutral-500">Stress</div>
                    <div className="text-3xl font-semibold mono mt-1">{experience.stress}</div>
                    <div className="mt-2 h-1 bg-white/10 w-full">
                      <div className="h-full bg-rose-400 transition-all" style={{ width: `${experience.stress}%` }} />
                    </div>
                  </div>
                </div>
                <div className="mt-4 border-t hairline pt-3 text-sm font-medium">
                  {experience.verdict}.
                </div>
              </div>
            </div>

            {/* Major fit + vibe */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
              <div className="bg-black p-5">
                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
                  Fit for {major?.name}
                </div>
                <div className="flex items-baseline gap-3">
                  <div className="text-5xl font-semibold mono tracking-tight">{fit}</div>
                  <div className="text-sm text-neutral-500">/ 100</div>
                </div>
                <div className="mt-4 h-1 bg-white/10 w-full">
                  <div
                    className="h-full bg-white transition-all"
                    style={{ width: `${fit}%` }}
                  />
                </div>
                <p className="text-[11px] text-neutral-500 mt-4 leading-relaxed">
                  {college.programs[majorId]
                    ? `Program strength: ${college.programs[majorId]}/100 nationally. ${college.programs[majorId] >= 95 ? 'Top-5 program.' : college.programs[majorId] >= 90 ? 'Top-10 program.' : college.programs[majorId] >= 80 ? 'Top-20 program.' : 'Solid program.'}`
                    : 'This school doesn\'t have a ranked program in this major — general academics apply.'}
                </p>
                {college.gradRate && (
                  <div className="mt-3 pt-3 border-t hairline flex justify-between text-[10px] uppercase tracking-wider text-neutral-500">
                    <span>Grad rate <span className="text-white mono">{college.gradRate}%</span></span>
                    {college.avgAid > 0 && <span>Avg aid <span className="text-white mono">{fmtMoney(college.avgAid)}</span>/yr</span>}
                  </div>
                )}
              </div>
              <div className="bg-black p-5">
                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-1">
                  Campus vibe
                </div>
                <VibeRadar vibe={college.vibe} />
              </div>
            </div>

            {/* 4-year preview */}
            <div className="border hairline p-5">
              <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mono mb-4">
                —  Four-year preview
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-neutral-500">Sticker price</div>
                  <div className="text-xl font-semibold mono mt-1">{fmtMoney(college.cost)}</div>
                  <div className="text-[11px] text-neutral-500 mt-1">~{fmtMoney(yearlyCost)} / yr</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-neutral-500">Net after aid</div>
                  <div className="text-xl font-semibold mono mt-1">{fmtMoney(netCost)}</div>
                  <div className="text-[11px] text-neutral-500 mt-1">avg {fmtMoney(college.avgAid || 0)}/yr aid</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-neutral-500">Avg debt at grad</div>
                  <div className="text-xl font-semibold mono mt-1">{fmtMoney(college.avgDebt)}</div>
                  <div className="text-[11px] text-neutral-500 mt-1">fed loans at exit</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-neutral-500">Grad rate</div>
                  <div className="text-xl font-semibold mono mt-1">{college.gradRate}%</div>
                  <div className="text-[11px] text-neutral-500 mt-1">6-yr completion</div>
                </div>
              </div>
              <p className="text-[12px] text-neutral-400 mt-5 leading-relaxed">
                The simulator below uses <span className="text-white mono">{fmtMoney(college.avgDebt)}</span> as
                your starting debt. Top careers for your major are highlighted. Change either above and
                the trajectory updates live.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a
                href="#simulator"
                className="inline-block px-6 py-3 bg-white text-black text-sm font-medium hover:bg-neutral-200 transition"
              >
                Run life simulation with this background →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
