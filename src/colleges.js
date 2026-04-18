// ==============================================================
// MAJORS — link undergraduate majors to careers in careers.js
// ==============================================================

export const MAJORS = [
  {
    id: 'cs', name: 'Computer Science', icon: '💻',
    description: 'Algorithms, systems, software. Most employable STEM major.',
    careers: ['software_engineer', 'data_scientist', 'entrepreneur'],
  },
  {
    id: 'mech_eng', name: 'Mechanical Engineering', icon: '⚙️',
    description: 'Machines, thermodynamics, robotics. The generalist engineer.',
    careers: ['mechanical_engineer', 'aerospace_engineer'],
  },
  {
    id: 'elec_eng', name: 'Electrical Engineering', icon: '🔌',
    description: 'Circuits, signals, power, embedded systems, semiconductors.',
    careers: ['electrical_engineer', 'software_engineer'],
  },
  {
    id: 'comp_eng', name: 'Computer Engineering', icon: '🖥️',
    description: 'Hardware + software — processors, embedded systems, firmware, IoT.',
    careers: ['computer_engineer', 'software_engineer', 'electrical_engineer'],
  },
  {
    id: 'civil_eng', name: 'Civil Engineering', icon: '🏗️',
    description: 'Infrastructure, structures, transportation, environment.',
    careers: ['civil_engineer'],
  },
  {
    id: 'aero_eng', name: 'Aerospace Engineering', icon: '✈️',
    description: 'Aircraft, spacecraft, propulsion, aerodynamics.',
    careers: ['aerospace_engineer', 'mechanical_engineer'],
  },
  {
    id: 'chem_eng', name: 'Chemical Engineering', icon: '⚗️',
    description: 'Process design for pharma, energy, materials, food.',
    careers: ['chemical_engineer', 'researcher'],
  },
  {
    id: 'bme', name: 'Biomedical Engineering', icon: '🧬',
    description: 'Medical devices, imaging, prosthetics, biotech.',
    careers: ['biomedical_engineer', 'doctor'],
  },
  {
    id: 'bio', name: 'Biology / Pre-Med', icon: '🧪',
    description: 'Life sciences, pre-med track, research foundation.',
    careers: ['doctor', 'researcher', 'biomedical_engineer'],
  },
  {
    id: 'nursing', name: 'Nursing (BSN)', icon: '🩺',
    description: 'Direct patient care, highly practical, 4-year BSN.',
    careers: ['nurse'],
  },
  {
    id: 'poli_sci', name: 'Political Science / Pre-Law', icon: '⚖️',
    description: 'Government, policy, law school prep.',
    careers: ['lawyer'],
  },
  {
    id: 'econ', name: 'Economics', icon: '📈',
    description: 'Markets, decisions, data. Flexible entry to finance and policy.',
    careers: ['finance', 'data_scientist', 'entrepreneur'],
  },
  {
    id: 'finance', name: 'Finance / Business', icon: '💼',
    description: 'Investing, accounting, strategy, operations.',
    careers: ['finance', 'entrepreneur'],
  },
  {
    id: 'physics', name: 'Physics', icon: '⚛️',
    description: 'Fundamental science. Opens doors to nearly any quantitative field.',
    careers: ['researcher', 'data_scientist', 'aerospace_engineer'],
  },
  {
    id: 'math', name: 'Mathematics', icon: '∑',
    description: 'Pure + applied. Pathway to finance, CS, research.',
    careers: ['data_scientist', 'finance', 'software_engineer', 'researcher'],
  },
  {
    id: 'education', name: 'Education', icon: '📚',
    description: 'Teaching, curriculum, child development. Certification-track.',
    careers: ['teacher'],
  },
  {
    id: 'arts', name: 'Fine Arts / Design', icon: '🎨',
    description: 'Visual arts, illustration, design. Portfolio-driven.',
    careers: ['artist', 'influencer'],
  },
  {
    id: 'film', name: 'Film / Media', icon: '🎬',
    description: 'Production, screenwriting, directing, new media.',
    careers: ['influencer', 'artist'],
  },
  {
    id: 'comms', name: 'Communications / Journalism', icon: '📰',
    description: 'Storytelling, media, PR, modern content strategy.',
    careers: ['influencer', 'artist', 'marketing_manager'],
  },
  {
    id: 'psych', name: 'Psychology', icon: '💭',
    description: 'Mind, behavior, cognition. Clinical, research, or applied paths.',
    careers: ['psychologist', 'teacher', 'ux_designer'],
  },
  {
    id: 'chem', name: 'Chemistry', icon: '🧫',
    description: 'Reactions, synthesis, analysis. Gateway to pharma, materials, medicine.',
    careers: ['pharmacist', 'researcher', 'chemical_engineer'],
  },
  {
    id: 'neuro', name: 'Neuroscience', icon: '🧠',
    description: 'Brain, nervous system, cognition. Med school or research pipeline.',
    careers: ['doctor', 'psychologist', 'researcher'],
  },
  {
    id: 'arch', name: 'Architecture', icon: '🏛️',
    description: 'Design buildings and spaces. 5-year B.Arch typical.',
    careers: ['architect', 'civil_engineer'],
  },
  {
    id: 'env_eng', name: 'Environmental Engineering', icon: '🌍',
    description: 'Sustainability, water systems, remediation. Interdisciplinary STEM.',
    careers: ['environmental_engineer', 'civil_engineer', 'researcher'],
  },
  {
    id: 'ind_eng', name: 'Industrial Engineering', icon: '🏭',
    description: 'Optimize systems, supply chains, processes. "Engineering for efficiency."',
    careers: ['management_consultant', 'data_scientist', 'finance'],
  },
  {
    id: 'pub_health', name: 'Public Health', icon: '🏥',
    description: 'Population health, epidemiology, health policy.',
    careers: ['physician_assistant', 'nurse', 'researcher'],
  },
  {
    id: 'accounting', name: 'Accounting', icon: '📒',
    description: 'Financial reporting, auditing, tax. CPA pipeline.',
    careers: ['accountant', 'finance'],
  },
  {
    id: 'marketing', name: 'Marketing', icon: '📣',
    description: 'Consumer behavior, branding, digital strategy.',
    careers: ['marketing_manager', 'influencer', 'entrepreneur'],
  },
  {
    id: 'cyber', name: 'Cybersecurity', icon: '🔒',
    description: 'Network defense, ethical hacking, digital forensics.',
    careers: ['cybersecurity_analyst', 'software_engineer'],
  },
];

// ==============================================================
// COLLEGES
//
// Sources for stats (2024 cycle):
//   cost      — IPEDS total 4-yr COA (OOS for publics, sticker for privates)
//   avgAid    — avg institutional grant (IPEDS)
//   avgDebt   — College Scorecard median fed debt at graduation
//   accept    — Common Data Set 2023-24
//   size      — IPEDS fall undergrad enrollment
//   gradRate  — IPEDS 6-year graduation rate (%)
//   recGPA    — recommended (middle-50 admitted) unweighted GPA
//   recSAT    — recommended (middle-50 composite) SAT score
//
// programs — maps major id → national ranking score (0-100)
//   Based on USNews 2024 undergrad program rankings + QS subject
//   99 = top 3 nationally, 95 = top 5, 90 = top 10, 85 = top 15,
//   80 = top 20, 75 = top 25, 70 = top 30, 60 = offered/solid
// ==============================================================

export const COLLEGES = [
  // ===== Elite Private =====
  { id: 'mit', name: 'MIT', city: 'Cambridge, MA', type: 'Private', region: 'Northeast',
    cost: 338000, avgAid: 48000, avgDebt: 21300, accept: 0.039, size: 4657, gradRate: 95,
    recGPA: 3.97, recSAT: 1560,
    programs: { cs: 99, elec_eng: 99, mech_eng: 99, comp_eng: 98, aero_eng: 98, chem_eng: 97, bme: 93, physics: 99, math: 99, econ: 90, bio: 88, arch: 92, chem: 95, cyber: 90, ind_eng: 85, env_eng: 88, neuro: 88 },
    vibe: { academic: 99, social: 62, outdoors: 55, weather: 38 },
    motto: 'Mens et Manus — mind and hand. Quant-heavy culture, strongest STEM outcomes in the world.' },

  { id: 'stanford', name: 'Stanford', city: 'Stanford, CA', type: 'Private', region: 'West',
    cost: 342000, avgAid: 56000, avgDebt: 14800, accept: 0.037, size: 7645, gradRate: 95,
    recGPA: 3.96, recSAT: 1550,
    programs: { cs: 99, elec_eng: 97, mech_eng: 95, comp_eng: 96, bme: 90, physics: 94, math: 92, econ: 95, finance: 85, psych: 95, neuro: 92, env_eng: 90, ind_eng: 82, chem: 88 },
    vibe: { academic: 97, social: 86, outdoors: 92, weather: 95 },
    motto: 'Silicon Valley\'s front door. Startup pipeline unmatched; year-round sunshine.' },

  { id: 'harvard', name: 'Harvard', city: 'Cambridge, MA', type: 'Private', region: 'Northeast',
    cost: 340000, avgAid: 60000, avgDebt: 5800, accept: 0.032, size: 7240, gradRate: 97,
    recGPA: 3.94, recSAT: 1550,
    programs: { econ: 99, poli_sci: 99, bio: 95, math: 96, physics: 94, cs: 85, finance: 88, psych: 95, neuro: 92, pub_health: 95, chem: 90 },
    vibe: { academic: 98, social: 78, outdoors: 50, weather: 38 },
    motto: 'Veritas. Broadest alumni network on earth. ~55% of students graduate debt-free.' },

  { id: 'princeton', name: 'Princeton', city: 'Princeton, NJ', type: 'Private', region: 'Northeast',
    cost: 340000, avgAid: 62000, avgDebt: 4600, accept: 0.056, size: 5604, gradRate: 97,
    recGPA: 3.94, recSAT: 1540,
    programs: { econ: 97, cs: 93, physics: 97, math: 98, poli_sci: 93, psych: 88, neuro: 85, chem: 85, arch: 78 },
    vibe: { academic: 97, social: 75, outdoors: 55, weather: 55 },
    motto: 'No-loan aid — every dollar is grants. Undergrad-focused Ivy with the fattest endowment per student.' },

  { id: 'yale', name: 'Yale', city: 'New Haven, CT', type: 'Private', region: 'Northeast',
    cost: 344000, avgAid: 58000, avgDebt: 6200, accept: 0.035, size: 6590, gradRate: 97,
    recGPA: 3.95, recSAT: 1540,
    programs: { poli_sci: 97, econ: 93, arts: 92, film: 85, bio: 90, math: 88, psych: 92, neuro: 88, pub_health: 82, arch: 82 },
    vibe: { academic: 96, social: 82, outdoors: 55, weather: 48 },
    motto: 'Residential college system, famously tight-knit. Humanities + arts powerhouse.' },

  { id: 'columbia', name: 'Columbia', city: 'New York, NY', type: 'Private', region: 'Northeast',
    cost: 348000, avgAid: 54000, avgDebt: 19500, accept: 0.039, size: 8832, gradRate: 95,
    recGPA: 3.92, recSAT: 1540,
    programs: { comms: 99, econ: 93, cs: 88, poli_sci: 92, film: 88, math: 85, psych: 85, neuro: 88, pub_health: 90, arch: 88 },
    vibe: { academic: 96, social: 85, outdoors: 38, weather: 55 },
    motto: 'Core Curriculum + NYC. Journalism school is the best in the country.' },

  { id: 'upenn', name: 'UPenn', city: 'Philadelphia, PA', type: 'Private', region: 'Northeast',
    cost: 346000, avgAid: 52000, avgDebt: 19200, accept: 0.054, size: 9872, gradRate: 95,
    recGPA: 3.92, recSAT: 1530,
    programs: { finance: 99, econ: 95, nursing: 96, bme: 88, cs: 82, psych: 82, accounting: 92, marketing: 90, pub_health: 78 },
    vibe: { academic: 95, social: 88, outdoors: 55, weather: 55 },
    motto: 'Home of Wharton — the most feared undergrad business school.' },

  { id: 'cornell', name: 'Cornell', city: 'Ithaca, NY', type: 'Private', region: 'Northeast',
    cost: 356000, avgAid: 46000, avgDebt: 24800, accept: 0.072, size: 15503, gradRate: 94,
    recGPA: 3.88, recSAT: 1510,
    programs: { mech_eng: 92, elec_eng: 90, comp_eng: 89, cs: 90, civil_eng: 88, chem_eng: 88, bio: 85, arch: 95, ind_eng: 88, env_eng: 82, chem: 85, psych: 80 },
    vibe: { academic: 93, social: 78, outdoors: 88, weather: 22 },
    motto: 'Hardest Ivy to get into for engineering. Beautiful, brutal winters.' },

  { id: 'caltech', name: 'Caltech', city: 'Pasadena, CA', type: 'Private', region: 'West',
    cost: 332000, avgAid: 50000, avgDebt: 15200, accept: 0.027, size: 982, gradRate: 92,
    recGPA: 3.98, recSAT: 1570,
    programs: { physics: 99, cs: 92, mech_eng: 90, elec_eng: 93, comp_eng: 88, chem_eng: 92, math: 95, aero_eng: 95, chem: 97, env_eng: 82 },
    vibe: { academic: 100, social: 48, outdoors: 75, weather: 92 },
    motto: 'Tiny, intense, elite. Produces more Nobel laureates per capita than anywhere.' },

  { id: 'cmu', name: 'Carnegie Mellon', city: 'Pittsburgh, PA', type: 'Private', region: 'Northeast',
    cost: 324000, avgAid: 38000, avgDebt: 36500, accept: 0.113, size: 7522, gradRate: 90,
    recGPA: 3.87, recSAT: 1520,
    programs: { cs: 99, elec_eng: 93, comp_eng: 94, mech_eng: 82, arts: 82, film: 78, cyber: 98, ind_eng: 78, psych: 78 },
    vibe: { academic: 97, social: 64, outdoors: 58, weather: 38 },
    motto: 'SCS is a top-3 CS program globally. Drama and CS in the same building.' },

  { id: 'chicago', name: 'U Chicago', city: 'Chicago, IL', type: 'Private', region: 'Midwest',
    cost: 348000, avgAid: 48000, avgDebt: 22400, accept: 0.052, size: 7544, gradRate: 94,
    recGPA: 3.93, recSAT: 1540,
    programs: { econ: 99, math: 97, physics: 95, poli_sci: 93, bio: 80, psych: 85, chem: 88, neuro: 82, accounting: 78 },
    vibe: { academic: 99, social: 58, outdoors: 48, weather: 28 },
    motto: '"Where fun goes to die." Intense intellectual culture; strongest econ department alive.' },

  { id: 'duke', name: 'Duke', city: 'Durham, NC', type: 'Private', region: 'Southeast',
    cost: 344000, avgAid: 50000, avgDebt: 17800, accept: 0.05, size: 6717, gradRate: 96,
    recGPA: 3.93, recSAT: 1530,
    programs: { bio: 93, bme: 95, econ: 88, poli_sci: 90, cs: 78, psych: 88, neuro: 90, pub_health: 85, chem: 82 },
    vibe: { academic: 95, social: 88, outdoors: 78, weather: 75 },
    motto: 'Basketball + pre-med. Gothic campus, strong southern identity.' },

  { id: 'jhu', name: 'Johns Hopkins', city: 'Baltimore, MD', type: 'Private', region: 'Northeast',
    cost: 342000, avgAid: 44000, avgDebt: 26500, accept: 0.062, size: 5567, gradRate: 93,
    recGPA: 3.92, recSAT: 1530,
    programs: { bme: 99, bio: 95, chem_eng: 85, physics: 83, pub_health: 99, neuro: 92, psych: 75, chem: 80 },
    vibe: { academic: 95, social: 54, outdoors: 48, weather: 58 },
    motto: '#1 biomedical engineering in the country. #1 in NIH research funding.' },

  { id: 'northwestern', name: 'Northwestern', city: 'Evanston, IL', type: 'Private', region: 'Midwest',
    cost: 342000, avgAid: 46000, avgDebt: 20600, accept: 0.069, size: 8679, gradRate: 95,
    recGPA: 3.90, recSAT: 1520,
    programs: { comms: 97, film: 88, mech_eng: 78, econ: 85, poli_sci: 82, psych: 85, marketing: 82, ind_eng: 78 },
    vibe: { academic: 94, social: 82, outdoors: 65, weather: 32 },
    motto: 'Medill (journalism) and theater are elite. Lakefront campus.' },

  { id: 'rice', name: 'Rice', city: 'Houston, TX', type: 'Private', region: 'South',
    cost: 304000, avgAid: 42000, avgDebt: 21700, accept: 0.077, size: 4480, gradRate: 93,
    recGPA: 3.90, recSAT: 1520,
    programs: { mech_eng: 88, elec_eng: 85, comp_eng: 84, cs: 82, bme: 82, chem_eng: 80, physics: 78, arch: 90, env_eng: 75 },
    vibe: { academic: 94, social: 84, outdoors: 62, weather: 68 },
    motto: 'Tiny, rigorous, residential-college system. Great engineering, cheaper than most privates.' },

  { id: 'notre_dame', name: 'Notre Dame', city: 'South Bend, IN', type: 'Private', region: 'Midwest',
    cost: 332000, avgAid: 40000, avgDebt: 27200, accept: 0.119, size: 8971, gradRate: 96,
    recGPA: 3.85, recSAT: 1480,
    programs: { finance: 90, econ: 78, mech_eng: 72, poli_sci: 80, accounting: 85, marketing: 78, psych: 70 },
    vibe: { academic: 90, social: 93, outdoors: 62, weather: 32 },
    motto: 'Strong Catholic tradition, football culture, loyal alumni network.' },

  // ===== University of California system =====
  // Costs shown at OOS sticker. In-state ~60% of listed cost.
  { id: 'uc_berkeley', name: 'UC Berkeley', city: 'Berkeley, CA', type: 'Public', region: 'West',
    cost: 308000, avgAid: 22000, avgDebt: 16200, accept: 0.116, acceptIS: 0.155, acceptOOS: 0.085, size: 32143, gradRate: 92,
    recGPA: 3.89, recSAT: 1460,
    programs: { cs: 98, elec_eng: 98, comp_eng: 96, mech_eng: 92, physics: 93, math: 92, econ: 90, chem_eng: 90, civil_eng: 95, env_eng: 92, chem: 90, psych: 88, ind_eng: 85, cyber: 88 },
    vibe: { academic: 96, social: 80, outdoors: 88, weather: 92 },
    motto: 'Top public university in the US. Tech/progressive/activist energy.' },

  { id: 'ucla', name: 'UCLA', city: 'Los Angeles, CA', type: 'Public', region: 'West',
    cost: 292000, avgAid: 21000, avgDebt: 17600, accept: 0.086, acceptIS: 0.12, acceptOOS: 0.06, size: 32423, gradRate: 92,
    recGPA: 3.90, recSAT: 1430,
    programs: { film: 95, cs: 82, bio: 88, bme: 78, econ: 82, arts: 80, psych: 90, neuro: 82, pub_health: 78 },
    vibe: { academic: 92, social: 92, outdoors: 88, weather: 97 },
    motto: '#1 applied-to university in America. Film + pre-med dual identity.' },

  { id: 'ucsd', name: 'UC San Diego', city: 'La Jolla, CA', type: 'Public', region: 'West',
    cost: 288000, avgAid: 20000, avgDebt: 19800, accept: 0.247, acceptIS: 0.32, acceptOOS: 0.18, size: 33096, gradRate: 88,
    recGPA: 3.82, recSAT: 1390,
    programs: { cs: 85, bio: 90, bme: 85, chem_eng: 78, mech_eng: 75, elec_eng: 80, comp_eng: 78, neuro: 85, chem: 82, psych: 78 },
    vibe: { academic: 90, social: 68, outdoors: 96, weather: 98 },
    motto: 'Ocean-side research campus. Strong biotech + neuroscience.' },

  { id: 'uci', name: 'UC Irvine', city: 'Irvine, CA', type: 'Public', region: 'West',
    cost: 288000, avgAid: 20000, avgDebt: 18500, accept: 0.21, acceptIS: 0.27, acceptOOS: 0.16, size: 30382, gradRate: 83,
    recGPA: 3.76, recSAT: 1340,
    programs: { cs: 78, bio: 75, bme: 72, finance: 68, chem: 72, psych: 70 },
    vibe: { academic: 87, social: 72, outdoors: 80, weather: 96 },
    motto: 'Planned campus, suburban feel. Fast-rising CS program.' },

  { id: 'ucsb', name: 'UC Santa Barbara', city: 'Santa Barbara, CA', type: 'Public', region: 'West',
    cost: 284000, avgAid: 18000, avgDebt: 19200, accept: 0.259, acceptIS: 0.33, acceptOOS: 0.19, size: 23196, gradRate: 82,
    recGPA: 3.78, recSAT: 1360,
    programs: { physics: 88, econ: 72, elec_eng: 78, mech_eng: 75, chem: 80, env_eng: 72, psych: 70 },
    vibe: { academic: 89, social: 90, outdoors: 96, weather: 97 },
    motto: 'Beachfront campus, 6 Nobel laureates in physics. Legendary vibe.' },

  { id: 'ucd', name: 'UC Davis', city: 'Davis, CA', type: 'Public', region: 'West',
    cost: 280000, avgAid: 18000, avgDebt: 17400, accept: 0.369, acceptIS: 0.46, acceptOOS: 0.28, size: 31162, gradRate: 85,
    recGPA: 3.72, recSAT: 1310,
    programs: { bio: 85, chem_eng: 75, civil_eng: 78, mech_eng: 70, nursing: 72, env_eng: 82, chem: 78, psych: 72, pub_health: 70 },
    vibe: { academic: 87, social: 70, outdoors: 82, weather: 85 },
    motto: 'AgSci and veterinary heavyweight. Bike-friendly, chill culture.' },

  { id: 'ucsc', name: 'UC Santa Cruz', city: 'Santa Cruz, CA', type: 'Public', region: 'West',
    cost: 276000, avgAid: 18000, avgDebt: 19800, accept: 0.472, acceptIS: 0.58, acceptOOS: 0.36, size: 17932, gradRate: 76,
    recGPA: 3.55, recSAT: 1250,
    programs: { cs: 72, bio: 68, arts: 65, film: 68, psych: 65, env_eng: 68 },
    vibe: { academic: 82, social: 75, outdoors: 98, weather: 88 },
    motto: 'Redwood forest campus. Games design and marine biology standouts.' },

  // ===== Public Flagships =====
  { id: 'umich', name: 'U Michigan', city: 'Ann Arbor, MI', type: 'Public', region: 'Midwest',
    cost: 260000, avgAid: 18000, avgDebt: 25400, accept: 0.177, acceptIS: 0.37, acceptOOS: 0.14, size: 32282, gradRate: 92,
    recGPA: 3.88, recSAT: 1460,
    programs: { mech_eng: 93, cs: 88, elec_eng: 88, comp_eng: 87, finance: 85, aero_eng: 90, bio: 80, psych: 90, pub_health: 88, ind_eng: 88, env_eng: 82, accounting: 82, marketing: 80 },
    vibe: { academic: 93, social: 93, outdoors: 68, weather: 28 },
    motto: 'Ross (business) + Ford School (policy) + elite engineering. Football Saturdays.' },

  { id: 'uva', name: 'UVA', city: 'Charlottesville, VA', type: 'Public', region: 'Southeast',
    cost: 236000, avgAid: 18000, avgDebt: 22600, accept: 0.163, acceptIS: 0.27, acceptOOS: 0.13, size: 17496, gradRate: 94,
    recGPA: 3.85, recSAT: 1430,
    programs: { finance: 85, econ: 82, poli_sci: 80, bio: 72, accounting: 78, psych: 72 },
    vibe: { academic: 92, social: 90, outdoors: 82, weather: 68 },
    motto: 'Jefferson\'s academical village. Strong honor code culture.' },

  { id: 'ut_austin', name: 'UT Austin', city: 'Austin, TX', type: 'Public', region: 'South',
    cost: 176000, avgAid: 14000, avgDebt: 24300, accept: 0.31, acceptIS: 0.40, acceptOOS: 0.16, size: 42444, gradRate: 83,
    recGPA: 3.74, recSAT: 1370,
    programs: { cs: 90, elec_eng: 88, comp_eng: 86, finance: 82, mech_eng: 80, film: 72, arch: 78, accounting: 88, marketing: 75, psych: 72, cyber: 78 },
    vibe: { academic: 91, social: 95, outdoors: 72, weather: 62 },
    motto: 'McCombs (biz) + top-10 CS. Live-music capital culture.' },

  { id: 'unc', name: 'UNC Chapel Hill', city: 'Chapel Hill, NC', type: 'Public', region: 'Southeast',
    cost: 160000, avgAid: 16000, avgDebt: 19200, accept: 0.168, acceptIS: 0.38, acceptOOS: 0.08, size: 19783, gradRate: 91,
    recGPA: 3.82, recSAT: 1410,
    programs: { comms: 88, bio: 78, finance: 82, nursing: 85, pub_health: 90, psych: 78, marketing: 72 },
    vibe: { academic: 91, social: 90, outdoors: 78, weather: 75 },
    motto: 'Kenan-Flagler biz + elite journalism school. Basketball culture.' },

  { id: 'gatech', name: 'Georgia Tech', city: 'Atlanta, GA', type: 'Public', region: 'Southeast',
    cost: 140000, avgAid: 14000, avgDebt: 24400, accept: 0.163, acceptIS: 0.35, acceptOOS: 0.12, size: 18415, gradRate: 90,
    recGPA: 3.85, recSAT: 1470,
    programs: { cs: 95, mech_eng: 95, elec_eng: 95, comp_eng: 94, aero_eng: 95, civil_eng: 90, chem_eng: 85, bme: 90, ind_eng: 98, cyber: 95, env_eng: 78 },
    vibe: { academic: 95, social: 72, outdoors: 64, weather: 72 },
    motto: 'Pure engineering focus. Ranked #4 undergrad engineering nationally.' },

  { id: 'uiuc', name: 'UIUC', city: 'Urbana-Champaign, IL', type: 'Public', region: 'Midwest',
    cost: 152000, avgAid: 14000, avgDebt: 24600, accept: 0.436, acceptIS: 0.58, acceptOOS: 0.35, size: 35120, gradRate: 85,
    recGPA: 3.68, recSAT: 1380,
    programs: { cs: 95, elec_eng: 93, comp_eng: 94, mech_eng: 82, aero_eng: 82, civil_eng: 85, ind_eng: 82, accounting: 88, cyber: 85 },
    vibe: { academic: 92, social: 82, outdoors: 52, weather: 28 },
    motto: 'Grainger engineering, top-5 CS. Corn fields and dominant PhD output.' },

  { id: 'uw', name: 'U Washington', city: 'Seattle, WA', type: 'Public', region: 'West',
    cost: 168000, avgAid: 16000, avgDebt: 21300, accept: 0.442, acceptIS: 0.55, acceptOOS: 0.38, size: 36872, gradRate: 84,
    recGPA: 3.72, recSAT: 1360,
    programs: { cs: 90, nursing: 88, bio: 82, bme: 80, aero_eng: 75, pub_health: 82, psych: 78, env_eng: 75, cyber: 72 },
    vibe: { academic: 91, social: 78, outdoors: 93, weather: 58 },
    motto: 'Paul Allen CS. Tight tech pipeline to Microsoft & Amazon.' },

  { id: 'purdue', name: 'Purdue', city: 'West Lafayette, IN', type: 'Public', region: 'Midwest',
    cost: 124000, avgAid: 12000, avgDebt: 26800, accept: 0.528, acceptIS: 0.62, acceptOOS: 0.47, size: 37949, gradRate: 82,
    recGPA: 3.65, recSAT: 1330,
    programs: { aero_eng: 95, mech_eng: 90, elec_eng: 85, comp_eng: 85, cs: 82, civil_eng: 80, ind_eng: 85, chem_eng: 78, cyber: 82, env_eng: 72 },
    vibe: { academic: 89, social: 78, outdoors: 58, weather: 38 },
    motto: '"Cradle of Astronauts" — Armstrong, Cernan. Frozen tuition for a decade.' },

  { id: 'vtech', name: 'Virginia Tech', city: 'Blacksburg, VA', type: 'Public', region: 'Southeast',
    cost: 140000, avgAid: 10000, avgDebt: 30800, accept: 0.57, acceptIS: 0.66, acceptOOS: 0.48, size: 30434, gradRate: 84,
    recGPA: 3.58, recSAT: 1290,
    programs: { mech_eng: 78, aero_eng: 75, civil_eng: 78, elec_eng: 75, comp_eng: 74, cs: 72, arch: 78, env_eng: 72, ind_eng: 72, cyber: 72 },
    vibe: { academic: 85, social: 86, outdoors: 90, weather: 58 },
    motto: 'Hokie Nation. Strong engineering, big school spirit in a small Appalachian town.' },

  // ===== Other Private =====
  { id: 'usc', name: 'USC', city: 'Los Angeles, CA', type: 'Private', region: 'West',
    cost: 328000, avgAid: 38000, avgDebt: 27400, accept: 0.099, size: 21000, gradRate: 92,
    recGPA: 3.80, recSAT: 1450,
    programs: { film: 99, finance: 78, cs: 76, comms: 82, arts: 78, arch: 85, marketing: 80, psych: 72, accounting: 75 },
    vibe: { academic: 89, social: 92, outdoors: 80, weather: 96 },
    motto: '#1 film school in the US. Trojan network runs Hollywood and LA tech.' },

  { id: 'nyu', name: 'NYU', city: 'New York, NY', type: 'Private', region: 'Northeast',
    cost: 332000, avgAid: 34000, avgDebt: 38400, accept: 0.08, size: 29401, gradRate: 85,
    recGPA: 3.78, recSAT: 1470,
    programs: { finance: 92, film: 95, arts: 88, comms: 80, poli_sci: 78, math: 80, marketing: 82, psych: 78, accounting: 88 },
    vibe: { academic: 88, social: 93, outdoors: 32, weather: 55 },
    motto: 'No campus, just Manhattan. Stern, Tisch, Courant — each elite in its field.' },

  // ===== Florida =====
  { id: 'florida_tech', name: 'Florida Tech', city: 'Melbourne, FL', type: 'Private', region: 'South',
    cost: 196000, avgAid: 24000, avgDebt: 36800, accept: 0.686, size: 3570, gradRate: 62,
    recGPA: 3.40, recSAT: 1200,
    programs: { aero_eng: 72, mech_eng: 68, elec_eng: 66, comp_eng: 65, cs: 62, bio: 60 },
    vibe: { academic: 78, social: 68, outdoors: 85, weather: 92 },
    motto: 'On the Space Coast, 15 min from Cape Canaveral. Aviation + aerospace focus.' },

  { id: 'uf', name: 'U Florida', city: 'Gainesville, FL', type: 'Public', region: 'South',
    cost: 116000, avgAid: 12000, avgDebt: 18400, accept: 0.23, acceptIS: 0.38, acceptOOS: 0.15, size: 34552, gradRate: 88,
    recGPA: 3.78, recSAT: 1380,
    programs: { bio: 82, mech_eng: 75, finance: 78, cs: 72, civil_eng: 72, accounting: 82, marketing: 72, psych: 70 },
    vibe: { academic: 90, social: 93, outdoors: 82, weather: 85 },
    motto: 'Top-5 public, growing rankings, huge school spirit and SEC sports.' },

  { id: 'fsu', name: 'Florida State', city: 'Tallahassee, FL', type: 'Public', region: 'South',
    cost: 92000, avgAid: 10000, avgDebt: 21400, accept: 0.25, acceptIS: 0.33, acceptOOS: 0.18, size: 33270, gradRate: 82,
    recGPA: 3.55, recSAT: 1280,
    programs: { film: 78, poli_sci: 68, finance: 65, bio: 62, psych: 65, marketing: 62, accounting: 60 },
    vibe: { academic: 84, social: 94, outdoors: 72, weather: 80 },
    motto: 'Big film school, state capital, football tradition.' },

  { id: 'miami', name: 'U Miami', city: 'Coral Gables, FL', type: 'Private', region: 'South',
    cost: 296000, avgAid: 36000, avgDebt: 25800, accept: 0.19, size: 12873, gradRate: 82,
    recGPA: 3.60, recSAT: 1350,
    programs: { bio: 78, finance: 75, comms: 72, film: 70, psych: 65, marketing: 68, nursing: 72 },
    vibe: { academic: 85, social: 95, outdoors: 92, weather: 94 },
    motto: 'Marine bio by the beach. Latin American business hub.' },

  // ===== Additional Private =====
  { id: 'vanderbilt', name: 'Vanderbilt', city: 'Nashville, TN', type: 'Private', region: 'Southeast',
    cost: 340000, avgAid: 52000, avgDebt: 18200, accept: 0.054, size: 7057, gradRate: 94,
    recGPA: 3.93, recSAT: 1530,
    programs: { econ: 85, poli_sci: 82, bio: 88, nursing: 82, psych: 80, neuro: 82, education: 90, pub_health: 78 },
    vibe: { academic: 94, social: 92, outdoors: 72, weather: 72 },
    motto: 'Southern Ivy. Greek life capital. Peabody (education) is #1 nationally.' },

  { id: 'georgetown', name: 'Georgetown', city: 'Washington, DC', type: 'Private', region: 'Northeast',
    cost: 344000, avgAid: 48000, avgDebt: 21000, accept: 0.12, size: 7598, gradRate: 95,
    recGPA: 3.90, recSAT: 1500,
    programs: { poli_sci: 98, finance: 88, econ: 82, comms: 78, pub_health: 72, psych: 72 },
    vibe: { academic: 93, social: 86, outdoors: 58, weather: 62 },
    motto: 'DC\'s school. SFS (foreign service) is unmatched. Policy + diplomacy pipeline.' },

  { id: 'emory', name: 'Emory', city: 'Atlanta, GA', type: 'Private', region: 'Southeast',
    cost: 316000, avgAid: 46000, avgDebt: 22400, accept: 0.108, size: 7086, gradRate: 91,
    recGPA: 3.88, recSAT: 1490,
    programs: { bio: 88, pub_health: 92, nursing: 80, psych: 82, neuro: 85, finance: 78, econ: 75, chem: 80 },
    vibe: { academic: 92, social: 80, outdoors: 72, weather: 72 },
    motto: 'Rollins (pub health) is top 5 nationally. Pre-med powerhouse in the South.' },

  { id: 'washu', name: 'WashU', city: 'St. Louis, MO', type: 'Private', region: 'Midwest',
    cost: 340000, avgAid: 50000, avgDebt: 20800, accept: 0.10, size: 8068, gradRate: 94,
    recGPA: 3.92, recSAT: 1520,
    programs: { bio: 90, bme: 82, finance: 85, psych: 82, arch: 82, poli_sci: 78, chem: 78, econ: 82 },
    vibe: { academic: 94, social: 82, outdoors: 62, weather: 52 },
    motto: 'Olin (business) + top pre-med. "Where fun comes to study." Need-blind, debt-free pledge.' },

  { id: 'bu', name: 'Boston University', city: 'Boston, MA', type: 'Private', region: 'Northeast',
    cost: 320000, avgAid: 38000, avgDebt: 29800, accept: 0.115, size: 18515, gradRate: 88,
    recGPA: 3.78, recSAT: 1450,
    programs: { comms: 85, finance: 78, bio: 75, bme: 75, cs: 72, pub_health: 80, psych: 72, marketing: 70 },
    vibe: { academic: 89, social: 84, outdoors: 52, weather: 38 },
    motto: 'Commonwealth Ave mega-campus. Strong pre-med, COM (communications), and Questrom (biz).' },

  { id: 'northeastern', name: 'Northeastern', city: 'Boston, MA', type: 'Private', region: 'Northeast',
    cost: 316000, avgAid: 36000, avgDebt: 24200, accept: 0.052, size: 16302, gradRate: 92,
    recGPA: 3.88, recSAT: 1490,
    programs: { cs: 82, elec_eng: 78, comp_eng: 76, finance: 75, cyber: 82, marketing: 72, psych: 68 },
    vibe: { academic: 90, social: 80, outdoors: 52, weather: 38 },
    motto: 'Co-op king — 6 months of paid work built into every degree. Massive employer pipeline.' },

  // ===== Additional Public Flagships =====
  { id: 'penn_state', name: 'Penn State', city: 'State College, PA', type: 'Public', region: 'Northeast',
    cost: 152000, avgAid: 12000, avgDebt: 35400, accept: 0.54, acceptIS: 0.62, acceptOOS: 0.45, size: 41359, gradRate: 85,
    recGPA: 3.58, recSAT: 1280,
    programs: { mech_eng: 78, elec_eng: 75, cs: 72, ind_eng: 82, accounting: 78, finance: 75, marketing: 72, psych: 70 },
    vibe: { academic: 85, social: 95, outdoors: 78, weather: 35 },
    motto: 'Happy Valley. Massive alumni network, Nittany Lion pride. Engineering + business strength.' },

  { id: 'ohio_state', name: 'Ohio State', city: 'Columbus, OH', type: 'Public', region: 'Midwest',
    cost: 132000, avgAid: 12000, avgDebt: 26200, accept: 0.53, acceptIS: 0.60, acceptOOS: 0.44, size: 46820, gradRate: 83,
    recGPA: 3.62, recSAT: 1320,
    programs: { mech_eng: 78, cs: 72, finance: 78, nursing: 78, psych: 78, accounting: 80, marketing: 75, ind_eng: 75 },
    vibe: { academic: 86, social: 95, outdoors: 68, weather: 38 },
    motto: 'THE Ohio State University. Fisher (business) and massive football culture.' },

  { id: 'uw_madison', name: 'U Wisconsin', city: 'Madison, WI', type: 'Public', region: 'Midwest',
    cost: 160000, avgAid: 14000, avgDebt: 27800, accept: 0.49, acceptIS: 0.57, acceptOOS: 0.41, size: 35474, gradRate: 87,
    recGPA: 3.72, recSAT: 1380,
    programs: { cs: 78, mech_eng: 78, chem_eng: 82, bio: 82, econ: 78, psych: 80, accounting: 82, env_eng: 75, pub_health: 78 },
    vibe: { academic: 89, social: 92, outdoors: 80, weather: 22 },
    motto: 'State Street → Capitol → Camp Randall. Ranked research powerhouse with killer social scene.' },

  { id: 'asu', name: 'Arizona State', city: 'Tempe, AZ', type: 'Public', region: 'West',
    cost: 120000, avgAid: 10000, avgDebt: 23600, accept: 0.88, acceptIS: 0.92, acceptOOS: 0.85, size: 65492, gradRate: 68,
    recGPA: 3.25, recSAT: 1190,
    programs: { cs: 70, finance: 68, marketing: 72, comms: 68, psych: 65, ind_eng: 68, pub_health: 65 },
    vibe: { academic: 78, social: 92, outdoors: 88, weather: 82 },
    motto: 'Most innovative university (8 years running). Huge, accessible, warm, and growing fast.' },

  { id: 'tamu', name: 'Texas A&M', city: 'College Station, TX', type: 'Public', region: 'South',
    cost: 120000, avgAid: 10000, avgDebt: 24600, accept: 0.63, acceptIS: 0.72, acceptOOS: 0.48, size: 56780, gradRate: 82,
    recGPA: 3.58, recSAT: 1290,
    programs: { mech_eng: 85, aero_eng: 88, elec_eng: 80, comp_eng: 78, cs: 72, civil_eng: 82, chem_eng: 80, ind_eng: 78, accounting: 78, marketing: 68 },
    vibe: { academic: 86, social: 90, outdoors: 72, weather: 62 },
    motto: 'Aggie traditions run deep. Top-15 engineering overall. Corps of Cadets + SEC football.' },

  { id: 'umd', name: 'U Maryland', city: 'College Park, MD', type: 'Public', region: 'Northeast',
    cost: 148000, avgAid: 14000, avgDebt: 26400, accept: 0.44, acceptIS: 0.52, acceptOOS: 0.35, size: 31272, gradRate: 86,
    recGPA: 3.72, recSAT: 1380,
    programs: { cs: 85, elec_eng: 80, comp_eng: 82, cyber: 90, mech_eng: 78, econ: 72, finance: 72, psych: 72 },
    vibe: { academic: 88, social: 85, outdoors: 62, weather: 58 },
    motto: 'DC suburb powerhouse. Top-20 CS, #1 cybersecurity. Smith (business) is climbing.' },

  { id: 'cu_boulder', name: 'U Colorado Boulder', city: 'Boulder, CO', type: 'Public', region: 'West',
    cost: 152000, avgAid: 12000, avgDebt: 25200, accept: 0.80, acceptIS: 0.86, acceptOOS: 0.74, size: 31813, gradRate: 72,
    recGPA: 3.48, recSAT: 1250,
    programs: { aero_eng: 82, physics: 78, env_eng: 78, cs: 72, mech_eng: 70, chem_eng: 68, psych: 65, film: 62 },
    vibe: { academic: 83, social: 90, outdoors: 99, weather: 72 },
    motto: 'Flatirons campus is the most scenic in America. Aerospace + physics are legit. Ski culture.' },

  { id: 'nc_state', name: 'NC State', city: 'Raleigh, NC', type: 'Public', region: 'Southeast',
    cost: 108000, avgAid: 10000, avgDebt: 22800, accept: 0.47, acceptIS: 0.55, acceptOOS: 0.35, size: 27492, gradRate: 79,
    recGPA: 3.58, recSAT: 1310,
    programs: { cs: 78, elec_eng: 82, mech_eng: 78, civil_eng: 75, comp_eng: 76, ind_eng: 72, env_eng: 68, cyber: 72 },
    vibe: { academic: 84, social: 82, outdoors: 78, weather: 72 },
    motto: 'Research Triangle engineering. Affordable, practical, strong career outcomes.' },

  { id: 'clemson', name: 'Clemson', city: 'Clemson, SC', type: 'Public', region: 'Southeast',
    cost: 124000, avgAid: 10000, avgDebt: 26400, accept: 0.43, acceptIS: 0.52, acceptOOS: 0.35, size: 22566, gradRate: 82,
    recGPA: 3.55, recSAT: 1290,
    programs: { mech_eng: 72, civil_eng: 72, cs: 68, bio: 65, marketing: 65, accounting: 62, ind_eng: 68 },
    vibe: { academic: 82, social: 92, outdoors: 88, weather: 72 },
    motto: 'Death Valley football + lakeside campus. Strong engineering, tight-knit Clemson Family culture.' },

  { id: 'rutgers', name: 'Rutgers', city: 'New Brunswick, NJ', type: 'Public', region: 'Northeast',
    cost: 148000, avgAid: 14000, avgDebt: 27800, accept: 0.66, acceptIS: 0.74, acceptOOS: 0.56, size: 36158, gradRate: 80,
    recGPA: 3.50, recSAT: 1280,
    programs: { cs: 72, elec_eng: 72, finance: 72, bio: 70, chem: 70, psych: 68, accounting: 72, marketing: 65, cyber: 68 },
    vibe: { academic: 84, social: 80, outdoors: 55, weather: 52 },
    motto: 'NJ\'s flagship. NYC access + pharma industry pipeline. Rising fast in CS rankings.' },
];

// ==============================================================
// FIT SCORING
//
// Combines program-level ranking (60%), institutional academic
// quality (15%), graduation rate (15%), and affordability (10%).
// Returns 0-100.
// ==============================================================

export function majorFitScore(college, majorId) {
  const programScore = college.programs[majorId] ?? 0;
  if (programScore === 0) {
    return Math.round(college.vibe.academic * 0.35 + college.gradRate * 0.15);
  }
  const academic = college.vibe.academic;
  const grad = college.gradRate;
  const debtPenalty = Math.max(0, (college.avgDebt - 15000) / 50000) * 10;

  return Math.round(
    programScore * 0.60 +
    academic * 0.15 +
    grad * 0.15 +
    (10 - debtPenalty) * 1.0
  );
}

// Rank colleges for a given major — highest fit first.
export function collegesForMajor(majorId) {
  return [...COLLEGES].sort((a, b) => {
    const aFit = majorFitScore(a, majorId);
    const bFit = majorFitScore(b, majorId);
    if (bFit !== aFit) return bFit - aFit;
    return a.accept - b.accept;
  });
}

// ==============================================================
// COLLEGE EXPERIENCE — 4-year happiness & stress heuristic
//
// Happiness drivers: social life, weather, outdoors, low debt burden
// Stress drivers: academic rigor, debt load, selectivity pressure,
//                 poor weather, low social score
// Returns { happiness: 0-100, stress: 0-100, verdict: string }
// ==============================================================

export function collegeExperience(college) {
  const { academic, social, outdoors, weather } = college.vibe;

  const debtBurden = Math.min(40, college.avgDebt / 1000);

  const happiness = Math.round(
    social * 0.30 +
    weather * 0.18 +
    outdoors * 0.12 +
    academic * 0.10 +
    (100 - debtBurden) * 0.15 +
    Math.min(100, college.gradRate) * 0.15
  );

  const academicPressure = academic > 95 ? 30 : academic > 90 ? 20 : academic > 85 ? 12 : 5;
  const debtStress = Math.min(25, (college.avgDebt / 40000) * 25);
  const weatherDrag = Math.max(0, (50 - weather) * 0.15);
  const socialRelief = social > 85 ? -8 : social > 75 ? -4 : 0;

  const stress = Math.round(
    Math.max(10, Math.min(95,
      35 + academicPressure + debtStress + weatherDrag + socialRelief
    ))
  );

  let verdict;
  if (happiness >= 78 && stress <= 50) verdict = 'Best years of your life';
  else if (happiness >= 72 && stress <= 60) verdict = 'Great college experience';
  else if (happiness >= 65) verdict = 'Solid four years';
  else if (stress >= 70) verdict = 'Grind mode — worth it?';
  else if (stress >= 60) verdict = 'Challenging but rewarding';
  else verdict = 'Mixed bag';

  return { happiness, stress, verdict };
}

// ==============================================================
// ADMISSION CHANCE ESTIMATOR
//
// Inputs: student { gpa (0-4.0), sat (400-1600), extra (0-100) }
// Uses logistic-style curve anchored to school's recGPA, recSAT,
// and base acceptance rate.
//
// - At exactly rec stats + avg extras → ~baseRate * multiplier
// - Above rec → chance climbs (diminishing)
// - Below rec → chance drops (accelerating)
// - Extras (ECs, essays, awards) shift the curve ±15%
// Returns 0-99 (never shows 100% or 0% — admissions is uncertain)
// ==============================================================

export function getCollegeState(college) {
  const parts = college.city.split(', ');
  return parts[parts.length - 1];
}

// ACT → SAT concordance (College Board 2018 table, simplified)
const CONCORDANCE = [
  [36,1590],[35,1570],[34,1550],[33,1530],[32,1500],[31,1480],
  [30,1450],[29,1420],[28,1390],[27,1360],[26,1330],[25,1300],
  [24,1260],[23,1220],[22,1190],[21,1160],[20,1130],[19,1100],
  [18,1060],[17,1020],[16,980],[15,940],[14,900],[13,860],[12,820],
];

export function actToSAT(act) {
  const entry = CONCORDANCE.find(([a]) => a <= act);
  return entry ? entry[1] : 800;
}

export function satToACT(sat) {
  for (let i = 0; i < CONCORDANCE.length; i++) {
    if (sat >= CONCORDANCE[i][1]) return CONCORDANCE[i][0];
  }
  return 12;
}

export function estimateRecWGPA(recGPA) {
  if (!recGPA) return null;
  if (recGPA >= 3.9) return Math.min(5.0, recGPA + 0.50);
  if (recGPA >= 3.7) return Math.min(5.0, recGPA + 0.42);
  if (recGPA >= 3.5) return Math.min(5.0, recGPA + 0.35);
  return Math.min(5.0, recGPA + 0.30);
}

export function admissionChance(college, student, inState = null) {
  const { gpa, weightedGPA, sat, act, extra = 50 } = student;
  if (!college.recGPA || !college.recSAT) return null;

  const satFromACT = act ? actToSAT(act) : 0;
  const bestSAT = Math.max(sat || 0, satFromACT);
  if (bestSAT === 0 && !gpa) return null;

  const baseRate = inState === true && college.acceptIS ? college.acceptIS
    : inState === false && college.acceptOOS ? college.acceptOOS
    : college.accept;

  // ── Selectivity tier (drives all downstream calibration) ──
  const tier =
    baseRate < 0.04 ? 0 :  // ultra (Harvard, MIT, Caltech, Stanford)
    baseRate < 0.08 ? 1 :  // hyper (Yale, Columbia, Duke, Princeton)
    baseRate < 0.13 ? 2 :  // elite (Cornell, CMU, USC, Notre Dame)
    baseRate < 0.25 ? 3 :  // selective (GT, UMich, UVA, UCLA)
    baseRate < 0.50 ? 4 :  // competitive (UT Austin, UIUC, UCSD)
    5;                      // accessible (Purdue, VTech, UCSC, FIT)

  // ── GPA z-score ──
  // Admitted-student GPA spread tightens at more selective schools
  const gpaSigma = [0.06, 0.08, 0.12, 0.18, 0.25, 0.35][tier];
  const gpaZ = gpa ? (gpa - college.recGPA) / gpaSigma : 0;
  // Asymmetric: being below hurts more than being above helps
  const gpaScore = gpaZ >= 0
    ? gpaZ * 0.8                         // diminishing returns above target
    : gpaZ * (1.0 + Math.abs(gpaZ) * 0.15); // accelerating penalty below

  // ── SAT z-score ──
  // Middle-50 SAT range is ~30pts at MIT, ~100pts at state schools
  const satSigma = [30, 40, 50, 65, 80, 100][tier];
  const satZ = bestSAT ? (bestSAT - college.recSAT) / satSigma : 0;
  const satScore = satZ >= 0
    ? satZ * 0.75
    : satZ * (1.0 + Math.abs(satZ) * 0.12);

  // ── Course rigor (weighted GPA gap) ──
  // AP/IB/honors load — selective schools weight this heavily
  const rigorGap = weightedGPA ? weightedGPA - gpa : 0;
  let rigorScore;
  if      (rigorGap >= 0.7) rigorScore =  1.8;
  else if (rigorGap >= 0.5) rigorScore =  1.2;
  else if (rigorGap >= 0.35) rigorScore = 0.7;
  else if (rigorGap >= 0.2) rigorScore =  0.3;
  else if (rigorGap >= 0.1) rigorScore =  0.0;
  else                       rigorScore = -0.5;

  // ── Extracurriculars / holistic profile ──
  // Normalized with non-linear scaling: outstanding (90+) matters more
  const extraNorm = (extra - 50) / 50;
  const extraScore = extraNorm >= 0
    ? extraNorm * (1 + extraNorm * 0.8)   // outstanding ECs compound
    : extraNorm * (1 + Math.abs(extraNorm) * 0.4);

  // ── Factor weights by tier ──
  // Ultra-selective = holistic (ECs, rigor dominate when everyone has 4.0/1560)
  // Accessible = stats-driven
  const weights = [
    [0.22, 0.22, 0.18, 0.38],  // tier 0: ultra — ECs/rigor decisive
    [0.26, 0.26, 0.15, 0.33],  // tier 1: hyper
    [0.30, 0.30, 0.13, 0.27],  // tier 2: elite
    [0.34, 0.34, 0.11, 0.21],  // tier 3: selective
    [0.38, 0.36, 0.10, 0.16],  // tier 4: competitive
    [0.40, 0.38, 0.08, 0.14],  // tier 5: accessible
  ][tier];

  const composite =
    gpaScore   * weights[0] +
    satScore   * weights[1] +
    rigorScore * weights[2] +
    extraScore * weights[3];

  // ── Probability calculation (hybrid curve) ──
  const baseLogit = Math.log(baseRate / (1 - baseRate));
  const steepness = [3.8, 3.2, 2.6, 2.1, 1.7, 1.3][tier];
  const ceiling = [20, 35, 55, 82, 93, 98][tier];
  const floor   = [ 1,  1,  2,  3,  5,  8][tier];
  const floorRate = floor / 100;

  let prob;
  if (composite >= 0) {
    // Above target → logistic (diminishing returns toward ceiling)
    const logit = baseLogit + composite * steepness;
    prob = 1 / (1 + Math.exp(-logit));

    // Yield protection: mid-tier schools reject obviously overqualified
    if (tier >= 3 && tier <= 5 && composite > 3.0) {
      prob *= 1 - Math.min(0.10, (composite - 3.0) * 0.025);
    }
  } else {
    // Below target → linear interpolation (realistic non-zero chances)
    // Depth controls how far below target before hitting floor
    const depth = [2, 2.5, 3, 3, 3.5, 4][tier];
    const t = Math.max(0, 1 + composite / depth);
    prob = floorRate + t * (baseRate - floorRate);
  }

  return Math.max(floor, Math.min(ceiling, Math.round(prob * 1000) / 10));
}
