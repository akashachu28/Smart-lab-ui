import { useState } from 'react';
import {
  Package, FlaskConical, Gauge, AlertTriangle, Clock, XCircle,
  TrendingUp, Target, DollarSign, QrCode, Zap, ChevronRight,
  Download, Brain, RefreshCw, Filter
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, AreaChart, Area, ReferenceLine
} from 'recharts';

// ── Palette ──────────────────────────────────────────────────────────────────
const C = {
  cyan: '#06b6d4', purple: '#8b5cf6', green: '#10b981',
  amber: '#f59e0b', red: '#ef4444', orange: '#f97316',
  blue: '#3b82f6', slate: '#94a3b8',
};

// ── Data ─────────────────────────────────────────────────────────────────────
const distributionData = [
  { name: 'Chemicals', value: 45, color: C.cyan },
  { name: 'Samples', value: 22, color: C.purple },
  { name: 'Glassware', value: 10, color: C.blue },
  { name: 'Gas Cylinders', value: 8, color: C.amber },
  { name: 'Consumables', value: 15, color: C.green },
];

const storageLocations = [
  { name: 'Chemistry Lab', pct: 85, capacity: 2400, occupied: 2040 },
  { name: 'Biology Lab', pct: 61, capacity: 1800, occupied: 1098 },
  { name: 'Cold Storage', pct: 91, capacity: 600, occupied: 546 },
  { name: 'Warehouse', pct: 52, capacity: 5000, occupied: 2600 },
  { name: 'Hazard Room', pct: 74, capacity: 400, occupied: 296 },
];

const aiInsights = [
  { text: 'Acetone demand increased by 26% — investigate Project X workload.', tag: 'Consumption' },
  { text: 'Three containers have not been scanned for 18 days — possible displacement.', tag: 'Traceability' },
  { text: 'Two cylinders show abnormal pressure drops — schedule inspection.', tag: 'Cylinders' },
  { text: 'Ethanol stock will run out in 11 days at current consumption rate.', tag: 'Forecast' },
  { text: 'Lab 4 has unusually high solvent usage compared to historical baseline.', tag: 'Anomaly' },
  { text: 'Inventory accuracy improved by 3.2% after last barcode audit.', tag: 'Accuracy' },
  { text: 'Five chemicals nearing expiry — prioritise for use before reorder.', tag: 'Expiry' },
  { text: 'QR scan failure rate increased 2× during evening shift (6–9 PM).', tag: 'Operations' },
];

const alerts = {
  critical: [
    'Nitrogen Cylinder Leak Detected — CY-101',
    'Hydrochloric Acid Expired — CH-0441',
    'Chemical Missing from Assigned Storage — CH-0782',
  ],
  high: [
    'Ethanol below safety stock threshold — 8 L remaining',
    'Barcode unreadable on 13 containers today',
    'Oxygen pressure below minimum threshold',
  ],
  normal: [
    'Shipment received — Acetone 20 L, Batch 2024-0441',
    'Inventory synchronized with ERP system',
    'Monthly audit completed — 99.2% accuracy',
  ],
};

const weeklyConsumption = [
  { day: 'Mon', chemical: 42, department: 28, lab: 35, research: 18 },
  { day: 'Tue', chemical: 68, department: 41, lab: 52, research: 24 },
  { day: 'Wed', chemical: 55, department: 33, lab: 44, research: 20 },
  { day: 'Thu', chemical: 78, department: 50, lab: 61, research: 30 },
  { day: 'Fri', chemical: 63, department: 38, lab: 49, research: 22 },
  { day: 'Sat', chemical: 28, department: 15, lab: 21, research: 9 },
  { day: 'Sun', chemical: 18, department: 10, lab: 14, research: 6 },
];

const topConsumed = [
  { chemical: 'Ethanol', used: '184 L', pct: 92 },
  { chemical: 'Acetone', used: '152 L', pct: 76 },
  { chemical: 'Methanol', used: '118 L', pct: 59 },
  { chemical: 'IPA', used: '102 L', pct: 51 },
];

const forecastData = [
  { date: 'Jun 1', actual: 18, forecast: null },
  { date: 'Jun 8', actual: 15, forecast: null },
  { date: 'Jun 15', actual: 12, forecast: null },
  { date: 'Jun 22', actual: 9, forecast: 8 },
  { date: 'Jun 29', actual: null, forecast: 6 },
  { date: 'Jul 6', actual: null, forecast: 4 },
  { date: 'Jul 13', actual: null, forecast: 5 },
];

const labComparison = [
  { lab: 'Chemistry', inventory: 4200, consumption: 310, waste: 42, expiry: 8 },
  { lab: 'Biotech', inventory: 2800, consumption: 180, waste: 25, expiry: 3 },
  { lab: 'Microbiology', inventory: 3600, consumption: 260, waste: 38, expiry: 12 },
  { lab: 'QA', inventory: 1900, consumption: 120, waste: 15, expiry: 2 },
];

const containerRows = [
  { id: 'CH-1022', chemical: 'Acetone', location: 'Lab A', owner: 'Dr John', qty: '2.5 L', status: 'Active' },
  { id: 'CH-1158', chemical: 'Ethanol', location: 'Storage B', owner: 'Lab Tech', qty: '1 L', status: 'Reserved' },
  { id: 'CH-2209', chemical: 'Nitric Acid', location: 'Lab C', owner: 'Research', qty: '0.2 L', status: 'Low Stock' },
  { id: 'CH-1441', chemical: 'Methanol', location: 'Lab A', owner: 'Dr Sarah', qty: '5 L', status: 'Active' },
  { id: 'CH-0897', chemical: 'IPA', location: 'Storage A', owner: 'Lab Tech', qty: '3 L', status: 'Active' },
  { id: 'CH-0782', chemical: 'HCl 37%', location: '—', owner: 'Lab B', qty: '1.2 L', status: 'Missing' },
];

const cylinderRows = [
  { id: 'CY-220', gas: 'Nitrogen', pressure: 82, leak: 'Safe', location: 'Lab A', status: 'In Use' },
  { id: 'CY-101', gas: 'Oxygen', pressure: 16, leak: 'Low Pressure', location: 'ICU Lab', status: 'Alert' },
  { id: 'CY-318', gas: 'Argon', pressure: 74, leak: 'Safe', location: 'Lab B', status: 'Available' },
  { id: 'CY-044', gas: 'CO₂', pressure: 91, leak: 'Safe', location: 'Chemistry', status: 'In Use' },
];

const pressureTrend = [
  { t: '6h', n2: 88, o2: 42, ar: 79 },
  { t: '5h', n2: 86, o2: 36, ar: 78 },
  { t: '4h', n2: 85, o2: 28, ar: 77 },
  { t: '3h', n2: 84, o2: 22, ar: 76 },
  { t: '2h', n2: 83, o2: 18, ar: 75 },
  { t: '1h', n2: 82, o2: 16, ar: 74 },
];

const expiryItems = [
  { chemical: 'Acetone (Batch A)', expiry: '7 days', remaining: '2 L', risk: 'High' },
  { chemical: 'NaOH Solution', expiry: '12 days', remaining: '0.5 L', risk: 'High' },
  { chemical: 'Ethanol (Batch B)', expiry: '45 days', remaining: '8 L', risk: 'Medium' },
  { chemical: 'HCl 37%', expiry: '21 days', remaining: '1.2 L', risk: 'Medium' },
  { chemical: 'Methanol', expiry: '28 days', remaining: '3 L', risk: 'Medium' },
];

const reorderRows = [
  { item: 'Ethanol', current: '8 L', minimum: '20 L', suggested: '40 L', priority: 'High', erp: 'Pending', reason: 'Usage increased · Delivery 12 days' },
  { item: 'IPA', current: '18 L', minimum: '25 L', suggested: '30 L', priority: 'Medium', erp: 'Approved', reason: 'Below safety stock threshold' },
  { item: 'Nitric Acid', current: '0.2 L', minimum: '2 L', suggested: '5 L', priority: 'High', erp: 'Ordered', reason: 'Critical low — immediate reorder' },
  { item: 'pH Buffer 7.0', current: '0 packs', minimum: '5 packs', suggested: '10 packs', priority: 'High', erp: 'Pending', reason: 'Out of stock' },
];

const hourlyScans = [
  { hour: '8AM', scans: 62 }, { hour: '9AM', scans: 128 },
  { hour: '10AM', scans: 183 }, { hour: '11AM', scans: 114 },
  { hour: '12PM', scans: 97 }, { hour: '1PM', scans: 88 },
  { hour: '2PM', scans: 152 },
];

const movementTimeline = [
  { time: '09:12', event: 'Container CH-1023 issued to Lab A', type: 'issue' },
  { time: '09:34', event: 'Cylinder CY-33 returned from ICU Lab', type: 'return' },
  { time: '09:48', event: 'Acetone batch received — 20 L', type: 'receive' },
  { time: '10:20', event: 'QR scan × 14 items — Storage B audit', type: 'scan' },
  { time: '11:02', event: 'Container CH-0991 relocated to Cold Storage', type: 'move' },
  { time: '11:38', event: 'Low stock alert triggered — Ethanol', type: 'alert' },
  { time: '12:05', event: 'Container CH-0782 marked missing', type: 'alert' },
  { time: '12:40', event: 'Reorder auto-generated — Ethanol 40 L', type: 'receive' },
];

const recentEvents = [
  { time: '10:22', event: 'Container Issued', user: 'Alice', status: 'Success' },
  { time: '10:28', event: 'QR Scan', user: 'Bob', status: 'Success' },
  { time: '10:41', event: 'Reorder Generated', user: 'AI', status: 'Completed' },
  { time: '10:52', event: 'Cylinder Returned', user: 'Charlie', status: 'Success' },
  { time: '11:05', event: 'Expiry Alert Raised', user: 'System', status: 'Active' },
  { time: '11:38', event: 'Low Stock Alert', user: 'System', status: 'Active' },
  { time: '12:05', event: 'Container Missing', user: 'System', status: 'Active' },
];

const eventTypeColor: Record<string, string> = {
  issue: 'bg-cyan-500', return: 'bg-green-500',
  receive: 'bg-purple-500', scan: 'bg-amber-500',
  move: 'bg-blue-500', alert: 'bg-red-500',
};

// ── Shared sub-components ─────────────────────────────────────────────────────

function SectionCard({ title, subtitle, children, className = '' }: {
  title: string; subtitle?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={`bg-white/70 border border-slate-200/40 rounded-xl shadow-sm p-4 ${className}`}>
      <div className="mb-3">
        <p className="text-xs font-semibold text-slate-800">{title}</p>
        {subtitle && <p className="text-[10px] text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, sub, color }: {
  icon: React.ElementType; label: string; value: string; sub?: string; color: string;
}) {
  return (
    <div className="bg-white/70 border border-slate-200/40 rounded-xl p-3 shadow-sm flex items-start gap-2.5">
      <div className="p-1.5 rounded-lg flex-shrink-0" style={{ background: color + '20' }}>
        <Icon className="w-3.5 h-3.5" style={{ color }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] text-slate-500 leading-tight mb-0.5">{label}</p>
        <p className="text-lg font-bold text-slate-800 leading-none">{value}</p>
        {sub && <p className="text-[9px] text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function CircularGauge({ value, label, size = 120 }: { value: number; label: string; size?: number }) {
  const r = 46;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  const color = value >= 90 ? C.green : value >= 70 ? C.amber : C.red;
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={r} fill="none" stroke="#f1f5f9" strokeWidth="10" />
        <circle cx="55" cy="55" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeLinecap="round" strokeDasharray={`${dash} ${circ}`} transform="rotate(-90 55 55)" />
        <text x="55" y="50" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1e293b">{value}%</text>
        <text x="55" y="65" textAnchor="middle" fontSize="9" fill="#64748b">{label}</text>
      </svg>
    </div>
  );
}

const SECTIONS = ['Overview', 'Consumption & Forecast', 'Container & Cylinders', 'Expiry & Reorder', 'Barcode & Activity'];

// ── Main Component ────────────────────────────────────────────────────────────

export function SmartInventory() {
  const [section, setSection] = useState('Overview');
  const [labMetric, setLabMetric] = useState<'inventory' | 'consumption' | 'waste' | 'expiry'>('inventory');

  return (
    <div className="p-5 flex flex-col gap-4 min-h-full">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Smart Inventory</h2>
          <p className="text-xs text-slate-500">Real-time chemical, sample, cylinder & asset intelligence</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-green-600 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block"></span>
            Live · 12s ago
          </span>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50">
            <Filter className="w-3 h-3" /> Filters
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50">
            <Download className="w-3 h-3" /> Export
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg text-xs font-medium shadow-sm">
            <QrCode className="w-3 h-3" /> Scan Item
          </button>
        </div>
      </div>

      {/* ── KPI Strip — always visible ─────────────────────────────── */}
      <div className="grid grid-cols-5 gap-3">
        <KpiCard icon={Package} label="Total Inventory Items" value="18,420" sub="All categories" color={C.cyan} />
        <KpiCard icon={FlaskConical} label="Chemical Containers" value="7,982" sub="Tracked" color={C.purple} />
        <KpiCard icon={Gauge} label="Gas Cylinders" value="324" sub="Active" color={C.blue} />
        <KpiCard icon={AlertTriangle} label="Low Stock Items" value="42" sub="Need replenishment" color={C.amber} />
        <KpiCard icon={XCircle} label="Expired Items" value="12" sub="Immediate attention" color={C.red} />
      </div>
      <div className="grid grid-cols-5 gap-3">
        <KpiCard icon={Clock} label="Expiring Soon" value="91" sub="Within 30 days" color={C.orange} />
        <KpiCard icon={TrendingUp} label="Today's Consumption" value="284 L" sub="Across all labs" color={C.green} />
        <KpiCard icon={Target} label="Inventory Accuracy" value="99.2%" sub="AI estimated" color={C.cyan} />
        <KpiCard icon={DollarSign} label="Inventory Value" value="₹3.28 Cr" sub="Current stock" color={C.purple} />
        <KpiCard icon={Zap} label="Traceability Score" value="96.4%" sub="Fully tracked" color={C.green} />
      </div>

      {/* ── Section Tabs ────────────────────────────────────────────── */}
      <div className="flex gap-1 border-b border-slate-200/40">
        {SECTIONS.map(s => (
          <button key={s} onClick={() => setSection(s)} className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
            section === s ? 'border-cyan-500 text-cyan-700' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}>{s}</button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 1 — OVERVIEW
      ══════════════════════════════════════════════════════════════ */}
      {section === 'Overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">

            {/* Health Score */}
            <SectionCard title="Inventory Health Score" subtitle="AI composite score">
              <div className="flex items-center gap-4">
                <CircularGauge value={94} label="Excellent" />
                <div className="flex-1 space-y-2">
                  {[
                    ['Stock Availability', 30, 96],
                    ['Expiry Risk', 20, 91],
                    ['Inventory Accuracy', 20, 99],
                    ['Traceability', 15, 96],
                    ['Consumption Stability', 15, 88],
                  ].map(([label, weight, score]) => (
                    <div key={label as string}>
                      <div className="flex justify-between mb-0.5">
                        <span className="text-[10px] text-slate-500">{label} <span className="text-slate-300">({weight}%)</span></span>
                        <span className="text-[10px] font-semibold text-slate-700">{score}%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500" style={{ width: `${score as number}%` }}></div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-1 space-y-0.5">
                    {['Low expiry risk', 'Good stock balance', 'No missing containers', 'Accurate scans'].map(f => (
                      <p key={f} className="text-[10px] text-green-600">✓ {f}</p>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Distribution Pie */}
            <SectionCard title="Inventory Distribution" subtitle="By category — all locations">
              <div className="flex items-center gap-3">
                <ResponsiveContainer width={130} height={140}>
                  <PieChart>
                    <Pie data={distributionData} cx="50%" cy="50%" outerRadius={58} innerRadius={32} dataKey="value">
                      {distributionData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: 10 }} formatter={(v: number) => `${v}%`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2.5 flex-1">
                  {distributionData.map(d => (
                    <div key={d.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ background: d.color }}></div>
                        <span className="text-[10px] text-slate-600">{d.name}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-700">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            {/* Storage Heatmap */}
            <SectionCard title="Storage Location Heatmap" subtitle="Capacity utilisation by lab">
              <div className="space-y-3">
                {storageLocations.map(loc => {
                  const color = loc.pct > 88 ? C.red : loc.pct > 75 ? C.amber : C.green;
                  return (
                    <div key={loc.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-medium text-slate-700">{loc.name}</span>
                        <span className="text-[10px] font-bold" style={{ color }}>{loc.pct}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-0.5">
                        <div className="h-full rounded-full" style={{ width: `${loc.pct}%`, background: color }}></div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-[9px] text-slate-400">Cap: {loc.capacity.toLocaleString()}</span>
                        <span className="text-[9px] text-slate-500">Used: {loc.occupied.toLocaleString()}</span>
                        <span className="text-[9px] text-green-600">Avail: {(loc.capacity - loc.occupied).toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionCard>
          </div>

          {/* AI Insights + Alerts */}
          <div className="grid grid-cols-2 gap-4">
            <SectionCard title="AI Insights" subtitle="Auto-updated · 8 active insights">
              <div className="grid grid-cols-2 gap-2">
                {aiInsights.map((ins, i) => (
                  <div key={i} className="flex gap-2 p-2.5 bg-slate-50 border border-slate-100 rounded-lg hover:bg-cyan-50/40 hover:border-cyan-200/40 transition-colors">
                    <Brain className="w-3 h-3 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-slate-700 leading-snug">{ins.text}</p>
                      <span className="text-[9px] text-cyan-500 font-medium">{ins.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Alerts Center" subtitle="Live severity feed">
              <div className="space-y-4">
                {[
                  { level: 'Critical', color: 'bg-red-500', textColor: 'text-red-600', dot: 'text-red-400', items: alerts.critical },
                  { level: 'High', color: 'bg-orange-500', textColor: 'text-orange-600', dot: 'text-orange-400', items: alerts.high },
                  { level: 'Normal', color: 'bg-green-500', textColor: 'text-green-600', dot: 'text-green-400', items: alerts.normal },
                ].map(group => (
                  <div key={group.level}>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className={`w-2 h-2 rounded-full ${group.color}`}></span>
                      <span className={`text-[10px] font-semibold ${group.textColor}`}>{group.level}</span>
                    </div>
                    {group.items.map((a, i) => (
                      <div key={i} className="flex items-start gap-2 py-1.5 border-b border-slate-50">
                        <span className={`${group.dot} text-[10px] mt-0.5`}>●</span>
                        <p className="text-[10px] text-slate-700">{a}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2 — CONSUMPTION & FORECAST
      ══════════════════════════════════════════════════════════════ */}
      {section === 'Consumption & Forecast' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">

            {/* Weekly Consumption Area Chart */}
            <SectionCard title="Weekly Consumption Trend" subtitle="Usage by category — current week" className="col-span-2">
              <ResponsiveContainer width="100%" height={190}>
                <AreaChart data={weeklyConsumption}>
                  <defs>
                    {[C.cyan, C.purple, C.amber, C.green].map((c, i) => (
                      <linearGradient key={i} id={`cg${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={c} stopOpacity={0.18} />
                        <stop offset="95%" stopColor={c} stopOpacity={0.01} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip contentStyle={{ fontSize: 10 }} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                  <Area type="monotone" dataKey="chemical" name="Chemical" stroke={C.cyan} fill="url(#cg0)" strokeWidth={2} />
                  <Area type="monotone" dataKey="department" name="Department" stroke={C.purple} fill="url(#cg1)" strokeWidth={2} />
                  <Area type="monotone" dataKey="lab" name="Lab" stroke={C.amber} fill="url(#cg2)" strokeWidth={2} />
                  <Area type="monotone" dataKey="research" name="Research" stroke={C.green} fill="url(#cg3)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </SectionCard>

            {/* Top Consumed */}
            <SectionCard title="Top Consumed Chemicals" subtitle="This month">
              <div className="space-y-4 pt-1">
                {topConsumed.map(tc => (
                  <div key={tc.chemical}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium text-slate-700">{tc.chemical}</span>
                      <span className="text-xs font-bold text-slate-800">{tc.used}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full" style={{ width: `${tc.pct}%` }}></div>
                    </div>
                  </div>
                ))}
                <div className="mt-3 p-2.5 bg-cyan-50 border border-cyan-200/50 rounded-lg flex gap-2">
                  <Brain className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-cyan-700">
                    Ethanol usage <strong>+18%</strong> vs last month. Likely Project X. Pre-order 40 L recommended.
                  </p>
                </div>
              </div>
            </SectionCard>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Forecast Chart */}
            <SectionCard title="Forecast Demand — Acetone" subtitle="Actual (solid) vs AI prediction (dashed)">
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip contentStyle={{ fontSize: 10 }} />
                  <ReferenceLine y={5} stroke={C.red} strokeDasharray="3 3"
                    label={{ value: 'Safety Stock', position: 'right', fontSize: 8, fill: C.red }} />
                  <Line type="monotone" dataKey="actual" name="Actual" stroke={C.cyan} strokeWidth={2} dot={{ r: 2 }} connectNulls={false} />
                  <Line type="monotone" dataKey="forecast" name="Forecast" stroke={C.purple} strokeWidth={2} strokeDasharray="5 5" dot={false} connectNulls />
                </LineChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-100">
                {[['Current Stock', '18 L', 'text-slate-700'], ['Expected (30d)', '5 L', 'text-amber-600'], ['Recommended', '20 L', 'text-cyan-600'], ['Confidence', '92%', 'text-green-600']].map(([l, v, cls]) => (
                  <div key={l} className="text-center">
                    <p className="text-[9px] text-slate-400">{l}</p>
                    <p className={`text-sm font-bold ${cls}`}>{v}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Lab Comparison + Predictive */}
            <div className="space-y-4">
              <SectionCard title="Laboratory Comparison" subtitle="Inventory metrics by lab">
                <div className="flex gap-1.5 mb-3">
                  {(['inventory', 'consumption', 'waste', 'expiry'] as const).map(m => (
                    <button key={m} onClick={() => setLabMetric(m)} className={`px-2.5 py-1 text-[10px] rounded-lg font-medium capitalize transition-colors ${labMetric === m ? 'bg-cyan-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{m}</button>
                  ))}
                </div>
                <ResponsiveContainer width="100%" height={110}>
                  <BarChart data={labComparison} barSize={22}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="lab" tick={{ fontSize: 9 }} />
                    <YAxis tick={{ fontSize: 9 }} />
                    <Tooltip contentStyle={{ fontSize: 10 }} />
                    <Bar dataKey={labMetric} fill={C.cyan} radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </SectionCard>

              <SectionCard title="Predictive Analytics" subtitle="Next 30 days — ML forecast">
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[
                    { label: 'Demand', delta: '+18%', up: true },
                    { label: 'Inventory', delta: '-11%', up: false },
                    { label: 'Waste', delta: '-6%', up: false },
                    { label: 'Reorder', delta: '+8%', up: true },
                  ].map(p => (
                    <div key={p.label} className="p-2 bg-slate-50 rounded-lg text-center border border-slate-100">
                      <p className="text-[9px] text-slate-500 mb-0.5">{p.label}</p>
                      <p className={`text-sm font-bold ${p.up ? 'text-red-500' : 'text-green-500'}`}>{p.delta}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-1">
                  {['Historical consumption trends', 'Seasonal demand patterns', 'Ongoing research projects', 'Supplier lead times', 'Minimum safety stock', 'Batch expiry dates'].map(m => (
                    <div key={m} className="flex items-center gap-1.5">
                      <ChevronRight className="w-2.5 h-2.5 text-slate-300" />
                      <span className="text-[9px] text-slate-500">{m}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SECTION 3 — CONTAINER & CYLINDERS
      ══════════════════════════════════════════════════════════════ */}
      {section === 'Container & Cylinders' && (
        <div className="space-y-4">
          {/* Container metrics */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Avg Movement / Day', value: '2.4×', color: C.cyan },
              { label: 'Most Accessed Chemical', value: 'Ethanol', color: C.purple },
              { label: 'Idle Containers', value: '34', color: C.amber },
              { label: 'Lost / Missing', value: '1', color: C.red },
            ].map(m => (
              <div key={m.label} className="bg-white/70 border border-slate-200/40 rounded-xl p-3 shadow-sm flex items-center gap-3">
                <div className="p-1.5 rounded-lg" style={{ background: m.color + '20' }}>
                  <Package className="w-3.5 h-3.5" style={{ color: m.color }} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500">{m.label}</p>
                  <p className="text-sm font-bold text-slate-800">{m.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Container Table */}
            <SectionCard title="Chemical Container Tracking" subtitle="Live container status">
              <table className="w-full text-xs mb-3">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['Container ID', 'Chemical', 'Location', 'Owner', 'Qty', 'Status'].map(h => (
                      <th key={h} className="text-left py-2 px-2 text-[10px] text-slate-400 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {containerRows.map(r => (
                    <tr key={r.id} className={`border-b border-slate-50 hover:bg-slate-50/60 ${r.status === 'Missing' ? 'bg-red-50/40' : ''}`}>
                      <td className="py-2 px-2 font-mono text-[10px] text-slate-400">{r.id}</td>
                      <td className="py-2 px-2 font-medium text-slate-800">{r.chemical}</td>
                      <td className="py-2 px-2 text-slate-600">{r.location}</td>
                      <td className="py-2 px-2 text-slate-600">{r.owner}</td>
                      <td className="py-2 px-2 text-slate-700">{r.qty}</td>
                      <td className="py-2 px-2">
                        <Badge
                          variant={r.status === 'Active' ? 'success' : r.status === 'Low Stock' ? 'error' : r.status === 'Missing' ? 'error' : 'info'}
                          size="sm"
                        >{r.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Movement flow */}
              <div>
                <p className="text-[10px] text-slate-400 mb-2">Container lifecycle flow</p>
                <div className="flex items-center gap-1 flex-wrap">
                  {['Created', 'Received', 'Stored', 'Issued', 'Returned', 'Disposed'].map((s, i, arr) => (
                    <div key={s} className="flex items-center gap-1">
                      <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">{s}</span>
                      {i < arr.length - 1 && <ChevronRight className="w-2.5 h-2.5 text-slate-300 flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            {/* Cylinder Tracking */}
            <SectionCard title="Gas Cylinder Tracking" subtitle="IoT pressure & status monitoring">
              {/* Cylinder KPIs */}
              <div className="grid grid-cols-5 gap-1.5 mb-3">
                {[
                  { label: 'Active', value: '122', color: C.green },
                  { label: 'In Use', value: '74', color: C.cyan },
                  { label: 'Available', value: '28', color: C.blue },
                  { label: 'Maintenance', value: '11', color: C.amber },
                  { label: 'Leak Alert', value: '2', color: C.red },
                ].map(m => (
                  <div key={m.label} className="text-center p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <p className="text-base font-bold" style={{ color: m.color }}>{m.value}</p>
                    <p className="text-[9px] text-slate-500">{m.label}</p>
                  </div>
                ))}
              </div>

              <table className="w-full text-xs mb-3">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['ID', 'Gas', 'Pressure', 'Leak', 'Location', 'Status'].map(h => (
                      <th key={h} className="text-left py-2 px-2 text-[10px] text-slate-400 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cylinderRows.map(r => (
                    <tr key={r.id} className={`border-b border-slate-50 hover:bg-slate-50/60 ${r.status === 'Alert' ? 'bg-red-50/40' : ''}`}>
                      <td className="py-2 px-2 font-mono text-[10px] text-slate-400">{r.id}</td>
                      <td className="py-2 px-2 font-medium text-slate-800">{r.gas}</td>
                      <td className="py-2 px-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${r.pressure}%`, background: r.pressure < 20 ? C.red : r.pressure < 50 ? C.amber : C.green }}></div>
                          </div>
                          <span className={`text-[10px] font-medium ${r.pressure < 20 ? 'text-red-600' : r.pressure < 50 ? 'text-amber-600' : 'text-green-600'}`}>{r.pressure}%</span>
                        </div>
                      </td>
                      <td className="py-2 px-2">
                        <Badge variant={r.leak === 'Safe' ? 'success' : 'error'} size="sm">{r.leak}</Badge>
                      </td>
                      <td className="py-2 px-2 text-slate-600">{r.location}</td>
                      <td className="py-2 px-2">
                        <Badge variant={r.status === 'In Use' ? 'info' : r.status === 'Alert' ? 'error' : 'success'} size="sm">{r.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div>
                <p className="text-[10px] text-slate-400 mb-1.5">Pressure trend — N₂ / O₂ / Ar (last 6 hours)</p>
                <ResponsiveContainer width="100%" height={90}>
                  <LineChart data={pressureTrend}>
                    <XAxis dataKey="t" tick={{ fontSize: 8 }} />
                    <YAxis tick={{ fontSize: 8 }} domain={[0, 100]} unit="%" />
                    <Tooltip contentStyle={{ fontSize: 9 }} formatter={(v: number) => `${v}%`} />
                    <Legend iconSize={7} wrapperStyle={{ fontSize: 9 }} />
                    <Line type="monotone" dataKey="n2" name="N₂" stroke={C.cyan} strokeWidth={1.5} dot={false} />
                    <Line type="monotone" dataKey="o2" name="O₂" stroke={C.red} strokeWidth={1.5} dot={false} />
                    <Line type="monotone" dataKey="ar" name="Ar" stroke={C.purple} strokeWidth={1.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SECTION 4 — EXPIRY & REORDER
      ══════════════════════════════════════════════════════════════ */}
      {section === 'Expiry & Reorder' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">

            {/* Expiry Intelligence */}
            <SectionCard title="Expiry Intelligence" subtitle="AI-monitored shelf life tracking">
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  { label: 'Expired', value: '12', bg: 'bg-red-50 border-red-100', text: 'text-red-600' },
                  { label: 'Within 7 days', value: '8', bg: 'bg-orange-50 border-orange-100', text: 'text-orange-600' },
                  { label: 'Within 30 days', value: '41', bg: 'bg-amber-50 border-amber-100', text: 'text-amber-600' },
                  { label: 'Safe', value: '932', bg: 'bg-green-50 border-green-100', text: 'text-green-600' },
                ].map(e => (
                  <div key={e.label} className={`${e.bg} border rounded-xl p-3 text-center`}>
                    <p className={`text-2xl font-bold ${e.text}`}>{e.value}</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">{e.label}</p>
                  </div>
                ))}
              </div>
              <table className="w-full text-xs mb-4">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['Chemical', 'Expiry', 'Remaining', 'Risk'].map(h => (
                      <th key={h} className="text-left py-2 px-2 text-[10px] text-slate-400 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {expiryItems.map(e => (
                    <tr key={e.chemical} className={`border-b border-slate-50 hover:bg-slate-50/60 ${e.risk === 'High' ? 'bg-red-50/30' : ''}`}>
                      <td className="py-2 px-2 font-medium text-slate-800">{e.chemical}</td>
                      <td className={`py-2 px-2 font-semibold ${e.risk === 'High' ? 'text-red-600' : 'text-amber-600'}`}>{e.expiry}</td>
                      <td className="py-2 px-2 text-slate-600">{e.remaining}</td>
                      <td className="py-2 px-2">
                        <Badge variant={e.risk === 'High' ? 'error' : 'warning'} size="sm">{e.risk}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200/50 rounded-lg">
                <Brain className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-amber-700"><strong>AI Suggestion:</strong> Use Batch B (Acetone) before Batch C to minimise waste.</p>
                  <p className="text-[10px] text-amber-600 mt-0.5">Estimated waste reduction: <strong>14%</strong></p>
                </div>
              </div>
            </SectionCard>

            {/* Auto Reorder + Risk */}
            <div className="space-y-4">
              <SectionCard title="Auto Reorder Recommendations" subtitle="AI-generated — pending ERP approval">
                <div className="space-y-2.5 mb-3">
                  {reorderRows.map(r => (
                    <div key={r.item} className={`p-3 rounded-xl border ${r.priority === 'High' ? 'bg-red-50/40 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-xs font-semibold text-slate-800">{r.item}</p>
                          <p className="text-[10px] text-slate-400">{r.reason}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Badge variant={r.priority === 'High' ? 'error' : 'warning'} size="sm">{r.priority}</Badge>
                          <Badge variant={r.erp === 'Pending' ? 'warning' : r.erp === 'Approved' ? 'success' : 'info'} size="sm">{r.erp}</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-1 text-center">
                        {[['Current', r.current], ['Minimum', r.minimum], ['Suggested', r.suggested]].map(([l, v]) => (
                          <div key={l} className="bg-white/80 rounded-lg py-1.5">
                            <p className="text-[9px] text-slate-400">{l}</p>
                            <p className="text-[11px] font-bold text-slate-700">{v}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg text-xs font-medium shadow-sm">Approve All → ERP</button>
                  <button className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs hover:bg-slate-50">Review</button>
                </div>
              </SectionCard>

              <SectionCard title="AI Inventory Risk Assessment" subtitle="Live risk percentages">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Overstock Risk', value: 12, color: C.amber },
                    { label: 'Understock Risk', value: 7, color: C.orange },
                    { label: 'Expiry Risk', value: 5, color: C.red },
                    { label: 'Missing Container', value: 1, color: C.purple },
                  ].map(r => (
                    <div key={r.label} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                      <p className="text-[9px] text-slate-500 mb-1">{r.label}</p>
                      <p className="text-2xl font-bold" style={{ color: r.color }}>{r.value}%</p>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${r.value * 5}%`, background: r.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SECTION 5 — BARCODE & ACTIVITY
      ══════════════════════════════════════════════════════════════ */}
      {section === 'Barcode & Activity' && (
        <div className="space-y-4">
          {/* Scan stat cards */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Today's Scans", value: '824', color: C.slate },
              { label: 'Successful', value: '811', color: C.green },
              { label: 'Failed', value: '13', color: C.red },
              { label: 'Avg Scan Time', value: '0.7s', color: C.cyan },
            ].map(m => (
              <div key={m.label} className="bg-white/70 border border-slate-200/40 rounded-xl p-3 shadow-sm flex items-center gap-3">
                <div className="p-1.5 rounded-lg" style={{ background: m.color + '20' }}>
                  <QrCode className="w-3.5 h-3.5" style={{ color: m.color }} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500">{m.label}</p>
                  <p className="text-lg font-bold text-slate-800">{m.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Hourly scan chart */}
            <SectionCard title="Hourly Scan Volume" subtitle="Today's scanning activity">
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={hourlyScans} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="hour" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip contentStyle={{ fontSize: 10 }} />
                  <Bar dataKey="scans" fill={C.cyan} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </SectionCard>

            {/* Accuracy + failure breakdown */}
            <SectionCard title="Scan Recognition Accuracy" subtitle="AI barcode detection performance">
              <div className="flex items-center gap-4 mb-4">
                <CircularGauge value={98} label="Accuracy" size={100} />
                <div className="space-y-2 flex-1">
                  <p className="text-[10px] text-slate-500 font-medium">Failure breakdown (13 scans)</p>
                  {[
                    { label: 'Unreadable labels', count: 5 },
                    { label: 'Damaged barcode', count: 4 },
                    { label: 'Duplicate labels', count: 2 },
                    { label: 'Wrong item', count: 1 },
                    { label: 'Unknown code', count: 1 },
                  ].map(f => (
                    <div key={f.label} className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">{f.label}</span>
                      <span className="text-[10px] font-semibold text-red-500">{f.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                <p className="text-[10px] text-slate-500">
                  <strong className="text-slate-700">AI detects:</strong> Unreadable labels · Damaged barcodes · Duplicate labels · Wrong items · Unknown codes
                </p>
              </div>
            </SectionCard>

            {/* Inventory Accuracy gauge */}
            <SectionCard title="Inventory Accuracy" subtitle="Multi-source reconciliation">
              <div className="flex items-center gap-4 mb-4">
                <CircularGauge value={99} label="Accuracy" size={100} />
                <div className="space-y-2 flex-1">
                  {['Barcode scans', 'Movement logs', 'Physical audits', 'AI reconciliation'].map(s => (
                    <div key={s} className="flex items-center gap-1.5">
                      <span className="text-green-500 text-xs">✓</span>
                      <span className="text-[10px] text-slate-600">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[['Last Audit', 'Today, 09:00'], ['Items Audited', '18,420'], ['Discrepancies', '15'], ['Auto-resolved', '14']].map(([l, v]) => (
                  <div key={l} className="bg-slate-50 rounded-lg p-2">
                    <p className="text-[9px] text-slate-400">{l}</p>
                    <p className="text-xs font-semibold text-slate-700">{v}</p>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Movement Timeline + Recent Events */}
          <div className="grid grid-cols-2 gap-4">
            <SectionCard title="Inventory Movement Timeline" subtitle="Live activity feed — today">
              <div className="relative">
                <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-slate-100"></div>
                <div className="space-y-3 pl-1">
                  {movementTimeline.map((ev, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center z-10 ${eventTypeColor[ev.type]}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] font-semibold text-slate-400">{ev.time}</span>
                        <p className="text-xs text-slate-700">{ev.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Recent Inventory Events" subtitle="Chronological action log">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['Time', 'Event', 'User', 'Status'].map(h => (
                      <th key={h} className="text-left py-2 px-2 text-[10px] text-slate-400 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentEvents.map((e, i) => (
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50">
                      <td className="py-2.5 px-2 text-slate-400 text-[10px]">{e.time}</td>
                      <td className="py-2.5 px-2 text-slate-700">{e.event}</td>
                      <td className="py-2.5 px-2 text-slate-500">{e.user}</td>
                      <td className="py-2.5 px-2">
                        <Badge variant={e.status === 'Active' ? 'error' : e.status === 'Completed' ? 'info' : 'success'} size="sm">{e.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Legend */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 mb-2">Movement type legend</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    ['bg-cyan-500', 'Issue'], ['bg-green-500', 'Return'],
                    ['bg-purple-500', 'Receive'], ['bg-amber-500', 'Scan'],
                    ['bg-blue-500', 'Move'], ['bg-red-500', 'Alert'],
                  ].map(([c, l]) => (
                    <div key={l} className="flex items-center gap-1.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${c}`}></div>
                      <span className="text-[9px] text-slate-500">{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      )}

    </div>
  );
}
