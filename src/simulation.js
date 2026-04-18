import { LIFE_EVENTS } from './careers';

// =====================================================================
// ECONOMIC CONSTANTS — grounded in public data
// =====================================================================

// 2024 US federal income tax brackets (single filer).
// Source: IRS Rev. Proc. 2023-34. Modeled in today's dollars throughout.
const FED_BRACKETS = [
  [0,      0.10],
  [11600,  0.12],
  [47150,  0.22],
  [100525, 0.24],
  [191950, 0.32],
  [243725, 0.35],
  [609350, 0.37],
];
const STD_DEDUCTION = 14600;
const SS_RATE       = 0.062;
const SS_WAGE_BASE  = 168600;
const MEDICARE_RATE = 0.0145;
const ADD_MEDICARE  = 0.009;

// Real (inflation-adjusted) investment return.
// S&P 500 historical avg ~7% nominal − ~3% inflation ≈ ~5% real.
const REAL_RETURN   = 0.05;

// Essential annual spending for a single adult at national average,
// 2024 dollars. Derived from BLS Consumer Expenditure Survey.
const BASE_COST_OF_LIVING = 42000;

// =====================================================================
// TAXES
// =====================================================================

function federalIncomeTax(grossIncome) {
  const taxable = Math.max(0, grossIncome - STD_DEDUCTION);
  if (taxable === 0) return 0;
  let tax = 0;
  for (let i = 0; i < FED_BRACKETS.length; i++) {
    const [lower, rate] = FED_BRACKETS[i];
    const upper = FED_BRACKETS[i + 1]?.[0] ?? Infinity;
    if (taxable > lower) {
      const inBracket = Math.min(taxable, upper) - lower;
      tax += inBracket * rate;
    } else break;
  }
  return tax;
}

function ficaTax(grossIncome) {
  const ss = Math.min(grossIncome, SS_WAGE_BASE) * SS_RATE;
  const med = grossIncome * MEDICARE_RATE;
  const addMed = Math.max(0, grossIncome - 200000) * ADD_MEDICARE;
  return ss + med + addMed;
}

function stateTax(grossIncome, stateRate) {
  const taxable = Math.max(0, grossIncome - STD_DEDUCTION);
  return taxable * stateRate;
}

export function totalTax(gross, stateRate) {
  return federalIncomeTax(gross) + ficaTax(gross) + stateTax(gross, stateRate);
}

// =====================================================================
// SALARY CURVE (BLS-informed age-wage profile)
// =====================================================================

function medianSalaryAtAge(career, age) {
  const { start, mid, peak, late } = career.salary;
  if (age <= 22) return start;
  if (age <= 42) {
    const t = (age - 22) / (42 - 22);
    return start + (mid - start) * smooth(t);
  }
  if (age <= 52) {
    const t = (age - 42) / (52 - 42);
    return mid + (peak - mid) * smooth(t);
  }
  if (age <= 62) {
    const t = (age - 52) / (62 - 52);
    return peak + (late - peak) * t;
  }
  return late;
}

function smooth(t) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

function ambitionToPercentile(ambition) {
  return 0.1 + (ambition / 100) * 0.8;
}

function applyPercentile(median, percentile, dispersion) {
  if (percentile >= 0.5) {
    const t = (percentile - 0.5) / 0.5;
    return median * (1 + t * dispersion);
  }
  const t = (0.5 - percentile) / 0.5;
  return median * (1 - t * Math.min(dispersion, 0.5));
}

// =====================================================================
// SEEDED RNG
// =====================================================================

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// =====================================================================
// MAIN SIMULATION — all dollars are today's (2024) dollars
// =====================================================================

export function simulate(career, prefs, seed = 42) {
  const rand = mulberry32(seed);
  const YEARS = 35;
  const results = [];
  const events = [];

  const { ambition, workLife, risk, savingsRate, location, collegeDebt = 0 } = prefs;

  const percentile = ambitionToPercentile(ambition);
  const volatility = 0.05 + (career.dispersion * 0.04) + ((risk - 50) / 100) * 0.06;
  const costOfLiving = BASE_COST_OF_LIVING * location.mult;

  const delayedStart = career.delayedStart || 0;
  const trainingWage = career.trainingWage ?? 0;
  const trainingDebt = career.trainingDebt ?? 0;

  let netWorth = -trainingDebt - collegeDebt;
  let happiness = 65;
  let stress = career.baseStress;
  let skill = 20;
  let salaryShock = 1;

  for (let year = 0; year <= YEARS; year++) {
    const age = 22 + year;

    // Training period (residency, PhD stipend, law school)
    if (year < delayedStart) {
      const gross = trainingWage;
      const taxes = totalTax(gross, location.stateTax);
      const afterTax = gross - taxes;
      const studentCost = costOfLiving * 0.80;
      const disposable = afterTax - studentCost;
      netWorth = netWorth * (1 + REAL_RETURN * 0.3);
      if (disposable < 0) netWorth += disposable;

      results.push({
        year, age,
        salary: Math.round(gross),
        takeHome: Math.round(afterTax),
        taxes: Math.round(taxes),
        netWorth: Math.round(netWorth),
        happiness: Math.round(happiness - 8),
        stress: Math.round(60 + rand() * 8),
        skill: Math.round(skill),
        savings: Math.round(Math.max(0, disposable)),
        discretionary: Math.round(disposable),
      });
      skill += 5;
      happiness = Math.max(0, happiness - 0.5);
      continue;
    }

    // BLS-based salary for this age at user's percentile
    const median = medianSalaryAtAge(career, age);
    const baseSalary = applyPercentile(median, percentile, career.dispersion);

    salaryShock *= 1 + (rand() - 0.5) * volatility;
    salaryShock = Math.max(0.7, Math.min(1.3, salaryShock));
    let gross = baseSalary * salaryShock;

    // Life events
    LIFE_EVENTS.forEach((ev) => {
      const careerYear = year - delayedStart;
      if (ev.year === careerYear && rand() < ev.chance * (ev.negative ? 1.2 - risk / 150 : 1)) {
        if (ev.impact.salary) { salaryShock *= ev.impact.salary; gross = baseSalary * salaryShock; }
        if (ev.impact.netWorth) netWorth += ev.impact.netWorth;
        if (ev.impact.happiness) happiness += ev.impact.happiness;
        if (ev.impact.stress) stress += ev.impact.stress;
        events.push({ ...ev, age, yearIndex: year });
      }
    });

    const taxes = totalTax(gross, location.stateTax);
    const afterTax = gross - taxes;
    const disposable = afterTax - costOfLiving;

    const saveAmt = Math.max(0, disposable) * (savingsRate / 100);
    const discretionary = disposable - saveAmt;

    netWorth = netWorth * (1 + REAL_RETURN);
    netWorth += saveAmt;
    if (disposable < 0) netWorth += disposable;

    // Heuristic wellbeing
    const workLifeBonus = (workLife - 50) * 0.15;
    const purposeBonus = (career.purpose - 50) * 0.08;
    const moneyBonus = Math.min(15, Math.max(-8, (afterTax - 60000) / 12000));
    const stressPenalty = (stress - 50) * 0.2;
    happiness = Math.max(0, Math.min(100,
      happiness * 0.85 + (60 + workLifeBonus + purposeBonus + moneyBonus - stressPenalty) * 0.15
    ));

    const baseS = career.baseStress + (ambition - 50) * 0.2 - (workLife - 50) * 0.25;
    stress = Math.max(10, Math.min(100, stress * 0.7 + baseS * 0.3 + (rand() - 0.5) * 6));

    skill = Math.min(100, skill + 2.5 + ambition / 50);

    results.push({
      year,
      age,
      salary: Math.round(gross),
      takeHome: Math.round(afterTax),
      taxes: Math.round(taxes),
      netWorth: Math.round(netWorth),
      happiness: Math.round(happiness),
      stress: Math.round(stress),
      skill: Math.round(skill),
      savings: Math.round(saveAmt),
      discretionary: Math.round(discretionary),
    });
  }

  const peak = results.reduce((a, b) => (b.salary > a.salary ? b : a));
  const finalRow = results[results.length - 1];
  const avgHappiness = Math.round(results.reduce((s, r) => s + r.happiness, 0) / results.length);
  const avgStress = Math.round(results.reduce((s, r) => s + r.stress, 0) / results.length);
  const totalTakeHome = results.reduce((s, r) => s + r.takeHome, 0);
  const totalTaxesPaid = results.reduce((s, r) => s + r.taxes, 0);

  return {
    series: results,
    events,
    summary: {
      peakSalary: peak.salary,
      peakAge: peak.age,
      finalNetWorth: finalRow.netWorth,
      finalSalary: finalRow.salary,
      avgHappiness,
      avgStress,
      totalTakeHome,
      totalTaxesPaid,
      finalSkill: finalRow.skill,
      percentile: Math.round(percentile * 100),
    },
  };
}
