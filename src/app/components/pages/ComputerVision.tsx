import { useState } from 'react';
import {
  ShieldCheck, MapPin, UserX, Users, Zap, Flame,
  AlertTriangle, CheckCircle, Filter, Download
} from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

// ── Data ────────────────────────────────────────────────────────────────────

const ppeComplianceTrend = [
  { time: '06:00', helmet: 72, gloves: 85, goggles: 68, labCoat: 90, faceShield: 55 },
  { time: '07:00', helmet: 80, gloves: 88, goggles: 74, labCoat: 92, faceShield: 62 },
  { time: '08:00', helmet: 91, gloves: 93, goggles: 88, labCoat: 96, faceShield: 78 },
  { time: '09:00', helmet: 88, gloves: 90, goggles: 85, labCoat: 94, faceShield: 80 },
  { time: '10:00', helmet: 84, gloves: 87, goggles: 80, labCoat: 93, faceShield: 74 },
  { time: '11:00', helmet: 86, gloves: 91, goggles: 83, labCoat: 95, faceShield: 77 },
];

const ppeBreakdown = [
  { item: 'Lab Coat', compliant: 95, violation: 5 },
  { item: 'Gloves', compliant: 91, violation: 9 },
  { item: 'Helmet', compliant: 86, violation: 14 },
  { item: 'Goggles', compliant: 83, violation: 17 },
  { item: 'Face Shield', compliant: 77, violation: 23 },
];

const occupancyData = [
  { time: '06:00', labA: 4, labB: 2, chemBay: 1, corridor: 3 },
  { time: '07:00', labA: 8, labB: 5, chemBay: 3, corridor: 6 },
  { time: '08:00', labA: 14, labB: 10, chemBay: 6, corridor: 9 },
  { time: '09:00', labA: 18, labB: 13, chemBay: 8, corridor: 11 },
  { time: '10:00', labA: 20, labB: 12, chemBay: 7, corridor: 10 },
  { time: '11:00', labA: 17, labB: 11, chemBay: 5, corridor: 8 },
];

const detectionCounts = [
  { category: 'PPE Violations', today: 14, yesterday: 18, week: 97 },
  { category: 'Restricted Breach', today: 3, yesterday: 2, week: 19 },
  { category: 'Unauth. Entry', today: 1, yesterday: 0, week: 6 },
  { category: 'Unsafe Behaviour', today: 5, yesterday: 7, week: 38 },
  { category: 'Fire / Smoke', today: 0, yesterday: 0, week: 1 },
];

const behaviourPie = [
  { name: 'Compliant', value: 78, color: '#10b981' },
  { name: 'PPE Violation', value: 14, color: '#ef4444' },
  { name: 'Unsafe Behaviour', value: 5, color: '#f97316' },
  { name: 'Restricted Breach', value: 3, color: '#f59e0b' },
];

// ── Events log ───────────────────────────────────────────────────────────────

const ALL_LOGS = [
  { id: 'EVT-0901', time: '11:38:42', type: 'PPE Violation', category: 'PPE', zone: 'Lab A — Bench 3', detail: 'Face shield missing during chemical handling', severity: 'high', status: 'Open' },
  { id: 'EVT-0900', time: '11:22:15', type: 'Restricted Area Breach', category: 'Restricted', zone: 'Chemical Bay', detail: 'Unauthorised personnel entered chemical storage zone', severity: 'critical', status: 'Acknowledged' },
  { id: 'EVT-0899', time: '11:05:03', type: 'PPE Violation', category: 'PPE', zone: 'Lab B — Entry', detail: 'No safety goggles detected on entry', severity: 'high', status: 'Open' },
  { id: 'EVT-0898', time: '10:54:30', type: 'Unsafe Behaviour', category: 'Behaviour', zone: 'Corridor C', detail: 'Running detected in proximity to hazardous material rack', severity: 'medium', status: 'Open' },
  { id: 'EVT-0897', time: '10:41:18', type: 'Occupancy Exceeded', category: 'Occupancy', zone: 'Lab A', detail: 'Occupancy reached 20/18 max capacity', severity: 'medium', status: 'Resolved' },
  { id: 'EVT-0896', time: '10:28:55', type: 'PPE Violation', category: 'PPE', zone: 'Lab A — Bench 1', detail: 'Gloves not worn during reagent dispensing', severity: 'high', status: 'Resolved' },
  { id: 'EVT-0895', time: '10:12:00', type: 'Unauthorised Entry', category: 'Access', zone: 'Server Room Annex', detail: 'Badge mismatch — entry denied but proximity detected', severity: 'critical', status: 'Acknowledged' },
  { id: 'EVT-0894', time: '09:58:10', type: 'Unsafe Behaviour', category: 'Behaviour', zone: 'Chemical Bay', detail: 'Improper handling of pressurised container', severity: 'high', status: 'Resolved' },
  { id: 'EVT-0893', time: '09:44:02', type: 'Restricted Area Breach', category: 'Restricted', zone: 'Radiation Lab', detail: 'Door held open beyond timeout — tailgating detected', severity: 'critical', status: 'Resolved' },
  { id: 'EVT-0892', time: '09:30:25', type: 'PPE Violation', category: 'PPE', zone: 'Lab B — Bench 2', detail: 'Helmet not worn in mandatory zone', severity: 'high', status: 'Resolved' },
  { id: 'EVT-0891', time: '08:55:44', type: 'Fire / Smoke Detection', category: 'Fire', zone: 'Lab A — Fume Hood', detail: 'Smoke trace detected near fume hood exhaust — confirmed false positive', severity: 'critical', status: 'Resolved' },
  { id: 'EVT-0890', time: '08:40:11', type: 'PPE Violation', category: 'PPE', zone: 'Lab A — Entry', detail: 'Lab coat not worn on entry', severity: 'medium', status: 'Resolved' },
];

const CATEGORY_FILTER = ['All', 'PPE', 'Restricted', 'Access', 'Occupancy', 'Behaviour', 'Fire'];

const severityBadge: Record<string, 'error' | 'warning' | 'info' | 'success' | 'neutral'> = {
  critical: 'error',
  high: 'warning',
  medium: 'info',
  low: 'neutral',
};

const severityLabel: Record<string, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const statusBadge: Record<string, 'error' | 'warning' | 'info' | 'success' | 'neutral'> = {
  Open: 'error',
  Acknowledged: 'warning',
  Resolved: 'success',
};

// ── Area occupancy caps ──────────────────────────────────────────────────────

const areaStatus = [
  { area: 'Lab A', current: 17, max: 18, color: 'bg-amber-400' },
  { area: 'Lab B', current: 11, max: 15, color: 'bg-green-400' },
  { area: 'Chemical Bay', current: 5, max: 6, color: 'bg-amber-400' },
  { area: 'Corridor C', current: 8, max: 20, color: 'bg-green-400' },
  { area: 'Radiation Lab', current: 2, max: 4, color: 'bg-green-400' },
];

// ── Component ────────────────────────────────────────────────────────────────

export function ComputerVision() {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [activeSection, setActiveSection] = useState('Overview');

  const filteredLogs = categoryFilter === 'All'
    ? ALL_LOGS
    : ALL_LOGS.filter(l => l.category === categoryFilter);

  const sections = ['Overview', 'PPE Detection', 'Occupancy', 'Events Log'];

  return (
    <div className="p-5 min-h-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">Computer Vision</h2>
          <p className="text-xs text-slate-500">AI-powered monitoring — PPE, restricted zones, occupancy, behaviour & fire detection</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-green-600 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
            Live · Updated 3s ago
          </span>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs hover:bg-slate-50">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* KPI Strip — one per detection type */}
      <div className="grid grid-cols-6 gap-3">
        <MetricCard title="PPE Compliance" value="84%" subtitle="Overall today" icon={ShieldCheck} status="warning" trend="up" trendValue="+4% vs yesterday" />
        <MetricCard title="Restricted Breaches" value="3" subtitle="Today" icon={MapPin} status="error" />
        <MetricCard title="Unauth. Entries" value="1" subtitle="Today" icon={UserX} status="error" />
        <MetricCard title="Peak Occupancy" value="20" subtitle="Lab A (max 18)" icon={Users} status="warning" />
        <MetricCard title="Unsafe Behaviour" value="5" subtitle="Incidents today" icon={Zap} status="warning" />
        <MetricCard title="Fire / Smoke" value="0" subtitle="No active events" icon={Flame} status="success" />
      </div>

      {/* Section Tabs */}
      <div className="flex gap-1 border-b border-slate-200/40">
        {sections.map(s => (
          <button key={s} onClick={() => setActiveSection(s)} className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
            activeSection === s ? 'border-cyan-500 text-cyan-700' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}>{s}</button>
        ))}
      </div>

      {/* ── Overview ── */}
      {activeSection === 'Overview' && (
        <div className="grid grid-cols-3 gap-4">
          {/* Detection counts table */}
          <div className="col-span-1">
            <Card title="Detection Summary" subtitle="Today vs yesterday">
              <div className="divide-y divide-slate-50">
                {detectionCounts.map(d => (
                  <div key={d.category} className="flex items-center justify-between py-2.5">
                    <span className="text-xs text-slate-700">{d.category}</span>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className={`text-sm font-bold ${d.today === 0 ? 'text-green-600' : d.today > 5 ? 'text-red-600' : 'text-amber-600'}`}>{d.today}</span>
                        <span className="text-[9px] text-slate-400 ml-1">today</span>
                      </div>
                      <div className="text-right w-10">
                        <span className="text-[10px] text-slate-400">{d.yesterday} yday</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Behaviour breakdown pie */}
            <Card title="Behaviour Breakdown" subtitle="Current session" className="mt-4">
              <div className="flex items-center gap-3">
                <ResponsiveContainer width={100} height={100}>
                  <PieChart>
                    <Pie data={behaviourPie} cx="50%" cy="50%" innerRadius={28} outerRadius={44} dataKey="value">
                      {behaviourPie.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-1.5 flex-1">
                  {behaviourPie.map(d => (
                    <div key={d.name} className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }}></div>
                      <span className="text-[10px] text-slate-600 flex-1 truncate">{d.name}</span>
                      <span className="text-[10px] font-semibold text-slate-700">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Bar chart — weekly detection counts */}
          <div className="col-span-2">
            <Card title="Detection Events — This Week" subtitle="By category per day">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[
                  { day: 'Mon', ppe: 18, breach: 2, behaviour: 7, entry: 0, fire: 0 },
                  { day: 'Tue', ppe: 22, breach: 4, behaviour: 5, entry: 1, fire: 0 },
                  { day: 'Wed', ppe: 15, breach: 1, behaviour: 9, entry: 0, fire: 1 },
                  { day: 'Thu', ppe: 19, breach: 3, behaviour: 6, entry: 2, fire: 0 },
                  { day: 'Fri', ppe: 24, breach: 5, behaviour: 8, entry: 1, fire: 0 },
                  { day: 'Sat', ppe: 9, breach: 1, behaviour: 2, entry: 0, fire: 0 },
                  { day: 'Today', ppe: 14, breach: 3, behaviour: 5, entry: 1, fire: 0 },
                ]} barSize={10}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ fontSize: 11 }} />
                  <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                  <Bar dataKey="ppe" name="PPE Violation" fill="#ef4444" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="breach" name="Restricted Breach" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="behaviour" name="Unsafe Behaviour" fill="#f97316" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="entry" name="Unauth. Entry" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="fire" name="Fire / Smoke" fill="#dc2626" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Occupancy area overview */}
            <Card title="Area Occupancy — Now" subtitle="Current vs maximum capacity" className="mt-4">
              <div className="grid grid-cols-5 gap-3">
                {areaStatus.map(a => {
                  const pct = Math.round((a.current / a.max) * 100);
                  const isOver = a.current > a.max;
                  return (
                    <div key={a.area} className="flex flex-col items-center gap-1.5">
                      <div className="relative w-12 h-12">
                        <svg viewBox="0 0 44 44" className="w-full h-full -rotate-90">
                          <circle cx="22" cy="22" r="18" fill="none" stroke="#f1f5f9" strokeWidth="5" />
                          <circle
                            cx="22" cy="22" r="18" fill="none"
                            stroke={isOver ? '#ef4444' : pct > 80 ? '#f59e0b' : '#10b981'}
                            strokeWidth="5"
                            strokeLinecap="round"
                            strokeDasharray={`${Math.min(pct, 100) * 1.131} 113.1`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-[9px] font-bold ${isOver ? 'text-red-600' : 'text-slate-700'}`}>{pct}%</span>
                        </div>
                      </div>
                      <p className="text-[9px] text-slate-600 font-medium text-center leading-tight">{a.area}</p>
                      <p className={`text-[9px] ${isOver ? 'text-red-600 font-bold' : 'text-slate-400'}`}>{a.current}/{a.max}</p>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ── PPE Detection ── */}
      {activeSection === 'PPE Detection' && (
        <div className="grid grid-cols-2 gap-4">
          <Card title="PPE Compliance Rate — Today" subtitle="Hourly trend by equipment type">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={ppeComplianceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 9 }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 9 }} unit="%" />
                <Tooltip contentStyle={{ fontSize: 11 }} formatter={(v: number) => `${v}%`} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                <Line type="monotone" dataKey="labCoat" name="Lab Coat" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="gloves" name="Gloves" stroke="#06b6d4" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="helmet" name="Helmet" stroke="#f59e0b" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="goggles" name="Goggles" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="faceShield" name="Face Shield" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Compliance by PPE Item" subtitle="Today — compliant vs violations">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ppeBreakdown} layout="vertical" barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 9 }} unit="%" />
                <YAxis type="category" dataKey="item" tick={{ fontSize: 10 }} width={68} />
                <Tooltip contentStyle={{ fontSize: 11 }} formatter={(v: number) => `${v}%`} />
                <Bar dataKey="compliant" name="Compliant" stackId="a" fill="#10b981" />
                <Bar dataKey="violation" name="Violation" stackId="a" fill="#ef4444" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* PPE violation summary cards */}
          <div className="col-span-2 grid grid-cols-5 gap-3">
            {[
              { item: 'Lab Coat', icon: '🥼', compliant: 95, violations: 5, trend: 'down' },
              { item: 'Gloves', icon: '🧤', compliant: 91, violations: 9, trend: 'up' },
              { item: 'Helmet', icon: '⛑️', compliant: 86, violations: 14, trend: 'neutral' },
              { item: 'Goggles', icon: '🥽', compliant: 83, violations: 17, trend: 'down' },
              { item: 'Face Shield', icon: '🛡️', compliant: 77, violations: 23, trend: 'up' },
            ].map(p => (
              <div key={p.item} className="bg-white/70 border border-slate-200/40 rounded-xl p-3 shadow-sm text-center">
                <div className="text-2xl mb-1">{p.icon}</div>
                <p className="text-xs font-semibold text-slate-800 mb-2">{p.item}</p>
                <div className="text-xl font-bold text-slate-800">{p.compliant}%</div>
                <p className="text-[10px] text-slate-400 mb-2">compliance</p>
                <div className="w-full h-1.5 bg-red-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400 rounded-full" style={{ width: `${p.compliant}%` }}></div>
                </div>
                <p className={`text-[10px] mt-1.5 font-medium ${p.violations > 15 ? 'text-red-600' : p.violations > 8 ? 'text-amber-600' : 'text-green-600'}`}>
                  {p.violations} violations today
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Occupancy ── */}
      {activeSection === 'Occupancy' && (
        <div className="grid grid-cols-2 gap-4">
          <Card title="Occupancy Trend — Today" subtitle="Personnel count per area (hourly)" className="col-span-2">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={occupancyData}>
                <defs>
                  {['#06b6d4', '#8b5cf6', '#f59e0b', '#10b981'].map((c, i) => (
                    <linearGradient key={i} id={`occ${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={c} stopOpacity={0.15} />
                      <stop offset="95%" stopColor={c} stopOpacity={0.01} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={{ fontSize: 11 }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                <Area type="monotone" dataKey="labA" name="Lab A (max 18)" stroke="#06b6d4" fill="url(#occ0)" strokeWidth={2} />
                <Area type="monotone" dataKey="labB" name="Lab B (max 15)" stroke="#8b5cf6" fill="url(#occ1)" strokeWidth={2} />
                <Area type="monotone" dataKey="chemBay" name="Chemical Bay (max 6)" stroke="#f59e0b" fill="url(#occ2)" strokeWidth={2} />
                <Area type="monotone" dataKey="corridor" name="Corridor C (max 20)" stroke="#10b981" fill="url(#occ3)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Current Occupancy by Area" subtitle="Live — updated every 30s">
            <div className="space-y-3 pt-1">
              {areaStatus.map(a => {
                const pct = Math.round((a.current / a.max) * 100);
                const isOver = a.current > a.max;
                return (
                  <div key={a.area}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-700">{a.area}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${isOver ? 'text-red-600' : pct > 80 ? 'text-amber-600' : 'text-slate-700'}`}>
                          {a.current} / {a.max}
                        </span>
                        {isOver && <Badge variant="error" size="sm">Over Capacity</Badge>}
                      </div>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${isOver ? 'bg-red-400' : pct > 80 ? 'bg-amber-400' : 'bg-green-400'}`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card title="Occupancy Alerts — Today" subtitle="Capacity threshold breaches">
            <div className="space-y-2 pt-1">
              {[
                { area: 'Lab A', time: '10:41', count: 20, max: 18, resolved: true },
                { area: 'Chemical Bay', time: '09:15', count: 7, max: 6, resolved: true },
                { area: 'Lab A', time: '08:55', count: 19, max: 18, resolved: true },
              ].map((ev, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-amber-50/60 border border-amber-200/40 rounded-lg">
                  <div>
                    <p className="text-xs font-medium text-slate-800">{ev.area} — {ev.count}/{ev.max} personnel</p>
                    <p className="text-[10px] text-slate-400">{ev.time}</p>
                  </div>
                  <Badge variant={ev.resolved ? 'success' : 'warning'} size="sm">{ev.resolved ? 'Resolved' : 'Active'}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ── Events Log ── */}
      {activeSection === 'Events Log' && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-500 mr-1">Filter:</span>
            {CATEGORY_FILTER.map(f => (
              <button
                key={f}
                onClick={() => setCategoryFilter(f)}
                className={`px-3 py-1 text-[11px] rounded-full border font-medium transition-colors ${
                  categoryFilter === f
                    ? 'bg-cyan-500 text-white border-cyan-500'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >{f}</button>
            ))}
            <span className="ml-auto text-[10px] text-slate-400">{filteredLogs.length} events</span>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs hover:bg-slate-50">
              <Download className="w-3 h-3" /> CSV
            </button>
          </div>

          <div className="bg-white/70 rounded-xl border border-slate-200/40 overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Event ID</th>
                  <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Time</th>
                  <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Detection Type</th>
                  <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Zone</th>
                  <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Detail</th>
                  <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Severity</th>
                  <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Status</th>
                  <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map(ev => (
                  <tr key={ev.id} className={`border-b border-slate-50 hover:bg-slate-50/60 transition-colors ${
                    ev.severity === 'critical' && ev.status === 'Open' ? 'bg-red-50/30' : ''
                  }`}>
                    <td className="px-4 py-2.5 font-mono text-slate-400 text-[10px]">{ev.id}</td>
                    <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">{ev.time}</td>
                    <td className="px-4 py-2.5 font-medium text-slate-800">{ev.type}</td>
                    <td className="px-4 py-2.5 text-slate-600 whitespace-nowrap">{ev.zone}</td>
                    <td className="px-4 py-2.5 text-slate-500 max-w-xs truncate">{ev.detail}</td>
                    <td className="px-4 py-2.5">
                      <Badge variant={severityBadge[ev.severity]} size="sm">{severityLabel[ev.severity]}</Badge>
                    </td>
                    <td className="px-4 py-2.5">
                      <Badge variant={statusBadge[ev.status]} size="sm">{ev.status}</Badge>
                    </td>
                    <td className="px-4 py-2.5">
                      {ev.status === 'Open' ? (
                        <button className="px-2.5 py-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg text-[10px] font-medium">Acknowledge</button>
                      ) : (
                        <button className="px-2.5 py-1 border border-slate-200 text-slate-500 rounded-lg text-[10px]">View</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
