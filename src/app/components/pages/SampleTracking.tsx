import { useState } from 'react';
import {
  FlaskConical, Truck, TestTube, Clock, CheckCircle, AlertTriangle,
  Timer, ShieldCheck, QrCode, Brain, Bell, ChevronRight, Plus, Search,
  Download, Filter, Zap, Link
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, FunnelChart, Funnel, LabelList
} from 'recharts';

// ── Palette ──────────────────────────────────────────────────────────────────
const C = {
  cyan: '#06b6d4', purple: '#8b5cf6', green: '#10b981',
  amber: '#f59e0b', red: '#ef4444', orange: '#f97316',
  blue: '#3b82f6', slate: '#94a3b8',
};

// ── Data ─────────────────────────────────────────────────────────────────────

const requestTrend = [
  { day: 'Mon', requests: 58, completed: 42 },
  { day: 'Tue', requests: 82, completed: 61 },
  { day: 'Wed', requests: 104, completed: 78 },
  { day: 'Thu', requests: 71, completed: 55 },
  { day: 'Fri', requests: 93, completed: 70 },
  { day: 'Sat', requests: 38, completed: 30 },
  { day: 'Today', requests: 74, completed: 48 },
];

const requestCategories = [
  { name: 'Chemical Testing', value: 42, color: C.cyan },
  { name: 'Water Analysis', value: 18, color: C.blue },
  { name: 'Environmental', value: 16, color: C.green },
  { name: 'Microbiology', value: 14, color: C.purple },
  { name: 'Calibration', value: 10, color: C.amber },
];

const statusDistribution = [
  { name: 'Collected', value: 18, color: C.blue },
  { name: 'Transit', value: 9, color: C.amber },
  { name: 'Received', value: 15, color: C.cyan },
  { name: 'Testing', value: 31, color: C.purple },
  { name: 'Review', value: 17, color: C.orange },
  { name: 'Completed', value: 10, color: C.green },
];

const funnelData = [
  { value: 4200, name: 'Created', fill: '#06b6d4' },
  { value: 4035, name: 'Collected', fill: '#3b82f6' },
  { value: 3988, name: 'Transported', fill: '#8b5cf6' },
  { value: 3954, name: 'Received', fill: '#f59e0b' },
  { value: 3910, name: 'Tested', fill: '#f97316' },
  { value: 3872, name: 'Approved', fill: '#10b981' },
  { value: 3855, name: 'Archived', fill: '#64748b' },
];

const kanbanColumns = [
  { label: 'New Requests', count: 24, color: 'bg-slate-100 text-slate-600', dot: 'bg-slate-400' },
  { label: 'Awaiting Approval', count: 15, color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-400' },
  { label: 'Approved', count: 62, color: 'bg-cyan-100 text-cyan-700', dot: 'bg-cyan-400' },
  { label: 'Assigned', count: 40, color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-400' },
  { label: 'In Progress', count: 18, color: 'bg-purple-100 text-purple-700', dot: 'bg-purple-400' },
  { label: 'Completed', count: 140, color: 'bg-green-100 text-green-700', dot: 'bg-green-400' },
];

const approvalQueue = [
  { id: 'LR-1023', requester: 'Production Dept', approver: 'Lab Manager', waiting: '4 hrs', priority: 'High' },
  { id: 'LR-1025', requester: 'QA Team', approver: 'Supervisor', waiting: '18 min', priority: 'Medium' },
  { id: 'LR-1029', requester: 'Research Lab', approver: 'QA Review', waiting: '2 hrs', priority: 'High' },
  { id: 'LR-1031', requester: 'Chemistry Lab', approver: 'Supervisor', waiting: '45 min', priority: 'Low' },
];

const approvalStages = ['Submitted', 'Supervisor Approval', 'Lab Manager', 'QA Review', 'Approved'];

const taskAssignment = [
  { tech: 'Alice', assigned: 14, active: 5, completed: 128, load: 78 },
  { tech: 'Bob', assigned: 10, active: 3, completed: 96, load: 52 },
  { tech: 'John', assigned: 16, active: 8, completed: 140, load: 91 },
  { tech: 'Sara', assigned: 12, active: 4, completed: 110, load: 66 },
  { tech: 'Omar', assigned: 8, active: 2, completed: 74, load: 45 },
];

const sampleRows = [
  { id: 'SMP-1023', barcode: 'QR', request: 'Water Analysis', stage: 'Testing', location: 'Chemistry Lab', owner: 'Alice', sla: 'On Time' },
  { id: 'SMP-1024', barcode: 'QR', request: 'Soil Sample', stage: 'In Transit', location: 'Warehouse', owner: 'Logistics', sla: 'Delayed' },
  { id: 'SMP-1025', barcode: 'QR', request: 'Air Quality', stage: 'Review', location: 'QA Department', owner: 'Manager', sla: 'On Time' },
  { id: 'SMP-1026', barcode: 'QR', request: 'Microbiology', stage: 'Collected', location: 'Field Site A', owner: 'John', sla: 'On Time' },
  { id: 'SMP-1027', barcode: 'QR', request: 'Chemical Test', stage: 'Approved', location: 'Archive', owner: 'Sara', sla: 'On Time' },
  { id: 'SMP-1028', barcode: 'QR', request: 'Water Analysis', stage: 'Testing', location: 'Biology Lab', owner: 'Bob', sla: 'At Risk' },
];

const custodyTimeline = [
  { time: '09:22', event: 'Collected', user: 'Alice', device: 'Mobile', location: 'Field Site A', signed: true },
  { time: '10:02', event: 'Packed', user: 'Alice', device: 'Mobile', location: 'Field Site A', signed: true },
  { time: '10:35', event: 'Courier Pickup', user: 'Logistics', device: 'Scanner', location: 'Dispatch Gate', signed: true },
  { time: '11:18', event: 'Received', user: 'Bob', device: 'Scanner', location: 'Chemistry Lab', signed: true },
  { time: '11:42', event: 'Testing Started', user: 'Alice', device: 'Desktop', location: 'Bench 3', signed: true },
  { time: '13:26', event: 'Results Generated', user: 'System', device: 'LIMS', location: 'Auto', signed: true },
  { time: '14:12', event: 'Approved', user: 'QA Manager', device: 'Desktop', location: 'QA Office', signed: true },
];

const hourlyScans = [
  { hour: '8AM', scans: 72 }, { hour: '9AM', scans: 138 },
  { hour: '10AM', scans: 196 }, { hour: '11AM', scans: 124 },
  { hour: '12PM', scans: 88 }, { hour: '1PM', scans: 102 },
  { hour: '2PM', scans: 144 },
];

const slaOverdue = [
  { sample: 'SMP-0220', stage: 'Testing', delay: '2 hrs', priority: 'High' },
  { sample: 'SMP-0441', stage: 'Approval', delay: '6 hrs', priority: 'Critical' },
  { sample: 'SMP-0318', stage: 'Transport', delay: '1.5 hrs', priority: 'Medium' },
];

const turnaroundBreakdown = [
  { stage: 'Collection', hours: 2, color: C.blue },
  { stage: 'Transport', hours: 3, color: C.amber },
  { stage: 'Testing', hours: 8, color: C.purple },
  { stage: 'Approval', hours: 2, color: C.green },
];

const bottlenecks = [
  { stage: 'Testing Queue', pct: 41, color: C.red },
  { stage: 'Approval Queue', pct: 28, color: C.orange },
  { stage: 'Transport', pct: 17, color: C.amber },
  { stage: 'Collection', pct: 14, color: C.blue },
];

const notifications = [
  { type: 'Pending Approval', count: 14, color: 'text-amber-600', bg: 'bg-amber-50' },
  { type: 'Samples Delayed', count: 6, color: 'text-red-600', bg: 'bg-red-50' },
  { type: 'Testing Complete', count: 22, color: 'text-green-600', bg: 'bg-green-50' },
  { type: 'Overdue Requests', count: 8, color: 'text-orange-600', bg: 'bg-orange-50' },
];

const notifFeed = [
  { msg: 'Request LR-1032 approved by Lab Manager', time: '5 min ago', type: 'success' },
  { msg: 'Sample SMP-0552 reached laboratory reception', time: '12 min ago', type: 'info' },
  { msg: 'Testing completed — SMP-0441 results ready', time: '18 min ago', type: 'success' },
  { msg: 'Manager review pending — LR-1029', time: '31 min ago', type: 'warning' },
  { msg: 'SLA exceeded — SMP-0220 Testing stage', time: '42 min ago', type: 'error' },
];

const escalations = [
  { request: 'LR-1002', sla: '24 hrs', escalatedTo: 'QA Manager', since: '8 hrs', resolved: false },
  { request: 'LR-1021', sla: '12 hrs', escalatedTo: 'Lab Head', since: '3 hrs', resolved: false },
  { request: 'LR-0998', sla: '24 hrs', escalatedTo: 'Director', since: '2 days', resolved: true },
];

const auditTrail = [
  { time: '09:14', user: 'Alice', dept: 'Field Ops', action: 'Collected', sample: 'SMP-0221', prevStatus: '—', newStatus: 'Collected', device: 'Mobile', signature: '✓' },
  { time: '09:25', user: 'Bob', dept: 'Logistics', action: 'Received', sample: 'SMP-0221', prevStatus: 'Collected', newStatus: 'Received', device: 'Scanner', signature: '✓' },
  { time: '10:44', user: 'QA Team', dept: 'Quality', action: 'Approved', sample: 'SMP-0221', prevStatus: 'Review', newStatus: 'Approved', device: 'Desktop', signature: '✓' },
  { time: '11:02', user: 'Alice', dept: 'Chemistry', action: 'Testing Started', sample: 'SMP-1023', prevStatus: 'Received', newStatus: 'Testing', device: 'Desktop', signature: '✓' },
  { time: '11:38', user: 'System', dept: 'LIMS', action: 'Results Synced', sample: 'SMP-1023', prevStatus: 'Testing', newStatus: 'Review', device: 'LIMS API', signature: '✓' },
  { time: '12:14', user: 'John', dept: 'QA', action: 'Review Complete', sample: 'SMP-1020', prevStatus: 'Review', newStatus: 'Approved', device: 'Desktop', signature: '✓' },
];

const integrations = [
  { name: 'LIMS', status: 'Connected', syncOk: '99.4%', icon: '🔬' },
  { name: 'SAP', status: 'Connected', syncOk: '99.1%', icon: '💼' },
  { name: 'ERP', status: 'Connected', syncOk: '98.8%', icon: '🏭' },
  { name: 'Courier API', status: 'Connected', syncOk: '99.7%', icon: '🚚' },
  { name: 'Email', status: 'Connected', syncOk: '100%', icon: '📧' },
];

const aiInsights = [
  { text: 'Average sample turnaround improved by 14% vs last month.', tag: 'Performance' },
  { text: '7 samples are approaching SLA limits — immediate attention needed.', tag: 'SLA' },
  { text: 'Approval queue is growing faster than testing capacity.', tag: 'Bottleneck' },
  { text: 'Laboratory 2 has the highest request volume this week.', tag: 'Workload' },
  { text: 'Technician Alice processed 18% more samples than average.', tag: 'Workload' },
  { text: 'Three requests waiting due to missing documentation.', tag: 'Compliance' },
  { text: 'Barcode scan accuracy reached 99.6% — new record.', tag: 'Accuracy' },
  { text: 'Transport delays increased by 9% this week vs last.', tag: 'Logistics' },
  { text: 'Predicted request volume tomorrow: 82 ± 5 requests.', tag: 'Forecast' },
  { text: 'Recommend assigning additional reviewers during 10AM–1PM shift.', tag: 'Recommendation' },
];

const recentActivity = [
  { time: '09:12', event: 'Request LR-220 submitted via portal', type: 'info' },
  { time: '09:18', event: 'Supervisor approved request LR-220', type: 'success' },
  { time: '09:31', event: 'Sample SMP-1028 collected at Field Site B', type: 'info' },
  { time: '09:45', event: 'Barcode scanned — SMP-1023 at Lab entrance', type: 'info' },
  { time: '10:12', event: 'SMP-1023 received at Chemistry Lab', type: 'success' },
  { time: '10:42', event: 'Testing completed — SMP-1019 results ready', type: 'success' },
  { time: '11:08', event: 'QA approved results for SMP-1015', type: 'success' },
];

const stageColor: Record<string, string> = {
  Collected: 'bg-blue-100 text-blue-700',
  'In Transit': 'bg-amber-100 text-amber-700',
  Received: 'bg-cyan-100 text-cyan-700',
  Testing: 'bg-purple-100 text-purple-700',
  Review: 'bg-orange-100 text-orange-700',
  Approved: 'bg-green-100 text-green-700',
  Disposed: 'bg-slate-100 text-slate-500',
};

const actTypeColor: Record<string, string> = {
  info: 'bg-cyan-400', success: 'bg-green-500', warning: 'bg-amber-400', error: 'bg-red-500',
};

// ── Shared sub-components ─────────────────────────────────────────────────────

function SCard({ title, subtitle, children, className = '' }: {
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

function KpiChip({ icon: Icon, label, value, sub, color }: {
  icon: React.ElementType; label: string; value: string; sub?: string; color: string;
}) {
  return (
    <div className="bg-white/70 border border-slate-200/40 rounded-xl p-3 shadow-sm flex items-start gap-2.5">
      <div className="p-1.5 rounded-lg flex-shrink-0" style={{ background: color + '20' }}>
        <Icon className="w-3.5 h-3.5" style={{ color }} />
      </div>
      <div>
        <p className="text-[10px] text-slate-500 leading-tight mb-0.5">{label}</p>
        <p className="text-lg font-bold text-slate-800 leading-none">{value}</p>
        {sub && <p className="text-[9px] text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

const SECTIONS = ['Overview', 'Request & Approval', 'Sample Tracking', 'SLA & Performance', 'Audit & Integration'];

// ── Main Component ────────────────────────────────────────────────────────────

export function SampleTracking() {
  const [section, setSection] = useState('Overview');
  const [search, setSearch] = useState('');
  const [selectedSample, setSelectedSample] = useState(sampleRows[0]);

  return (
    <div className="p-5 flex flex-col gap-4 min-h-full">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Sample Tracking</h2>
          <p className="text-xs text-slate-500">End-to-end chain of custody — request to archive</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-green-600 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block"></span>
            Live · 8s ago
          </span>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50">
            <Filter className="w-3 h-3" /> Filters
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50">
            <QrCode className="w-3 h-3" /> Scan
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg text-xs font-medium shadow-sm">
            <Plus className="w-3 h-3" /> New Request
          </button>
        </div>
      </div>

      {/* ── KPI Strip — always visible ─────────────────────────────── */}
      <div className="grid grid-cols-8 gap-2.5">
        <KpiChip icon={FlaskConical} label="Active Requests" value="682" sub="Open" color={C.cyan} />
        <KpiChip icon={FlaskConical} label="Total Samples" value="4,124" sub="Tracked" color={C.purple} />
        <KpiChip icon={Truck} label="In Transit" value="132" sub="Moving" color={C.amber} />
        <KpiChip icon={TestTube} label="Under Testing" value="286" sub="Analysing" color={C.blue} />
        <KpiChip icon={Clock} label="Pending Approval" value="91" sub="Awaiting" color={C.orange} />
        <KpiChip icon={CheckCircle} label="Completed Today" value="73" sub="Finished" color={C.green} />
        <KpiChip icon={AlertTriangle} label="Overdue" value="11" sub="SLA breached" color={C.red} />
        <KpiChip icon={ShieldCheck} label="CoC Compliance" value="99.7%" sub="Chain of custody" color={C.green} />
      </div>

      {/* ── Dashboard Workflow Flow ─────────────────────────────────── */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {['Request Raised', 'Approval Workflow', 'Sample Collection', 'Barcode Generated', 'Transportation', 'Lab Reception', 'Testing', 'Review', 'Approval', 'Archive / Disposal'].map((s, i, arr) => (
          <div key={s} className="flex items-center gap-1 flex-shrink-0">
            <span className="px-2.5 py-1 bg-slate-100/80 border border-slate-200/60 rounded-full text-[9px] text-slate-600 font-medium whitespace-nowrap">{s}</span>
            {i < arr.length - 1 && <ChevronRight className="w-2.5 h-2.5 text-slate-300 flex-shrink-0" />}
          </div>
        ))}
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

            {/* Request Pipeline Kanban */}
            <SCard title="Laboratory Request Pipeline" subtitle="Kanban — click a stage to filter" className="col-span-2">
              <div className="grid grid-cols-6 gap-2">
                {kanbanColumns.map(col => (
                  <div key={col.label} className="flex flex-col items-center gap-1.5 cursor-pointer group">
                    <div className={`w-full rounded-xl p-3 text-center border transition-all group-hover:shadow-md ${col.color} border-transparent`}>
                      <p className="text-2xl font-bold">{col.count}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${col.dot}`}></span>
                      <p className="text-[9px] text-slate-500 text-center leading-tight">{col.label}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Automated request cards */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-[10px] text-slate-500 font-medium mb-2">Today's Request Management</p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Submitted', value: '74', color: C.cyan },
                    { label: 'Approved', value: '58', color: C.green },
                    { label: 'Rejected', value: '4', color: C.red },
                    { label: 'Pending', value: '12', color: C.amber },
                  ].map(m => (
                    <div key={m.label} className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-center">
                      <p className="text-base font-bold" style={{ color: m.color }}>{m.value}</p>
                      <p className="text-[9px] text-slate-500">{m.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-3 p-2.5 bg-cyan-50 border border-cyan-200/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-cyan-500" />
                    <div>
                      <p className="text-[10px] text-slate-700 font-medium">Workflow Automation</p>
                      <p className="text-[9px] text-slate-500">High-value requests require manual review</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-cyan-600">62%</p>
                    <p className="text-[9px] text-slate-400">Auto-approved</p>
                  </div>
                </div>
              </div>
            </SCard>

            {/* Sample Lifecycle Funnel */}
            <SCard title="Sample Lifecycle Funnel" subtitle="Tracks where bottlenecks occur">
              <div className="space-y-1.5">
                {funnelData.map((f, i) => {
                  const pct = Math.round((f.value / funnelData[0].value) * 100);
                  const drop = i > 0 ? funnelData[i - 1].value - f.value : 0;
                  return (
                    <div key={f.name}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[10px] font-medium text-slate-700">{f.name}</span>
                        <div className="flex items-center gap-2">
                          {drop > 0 && <span className="text-[9px] text-red-400">−{drop}</span>}
                          <span className="text-[10px] font-bold text-slate-800">{f.value.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: f.fill }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </SCard>
          </div>

          {/* Status Distribution + Sample Movement Map */}
          <div className="grid grid-cols-2 gap-4">
            <SCard title="Sample Status Distribution" subtitle="Current snapshot across all samples">
              <div className="flex items-center gap-4">
                <ResponsiveContainer width={140} height={140}>
                  <PieChart>
                    <Pie data={statusDistribution} cx="50%" cy="50%" outerRadius={58} innerRadius={32} dataKey="value">
                      {statusDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: 10 }} formatter={(v: number) => `${v}%`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 flex-1">
                  {statusDistribution.map(d => (
                    <div key={d.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ background: d.color }}></div>
                        <span className="text-[10px] text-slate-600">{d.name}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-700">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </SCard>

            {/* Sample Movement Map — facility flow */}
            <SCard title="Sample Movement Map" subtitle="Inter-facility flow — today">
              <div className="flex items-center justify-between px-2">
                {[
                  { label: 'Collection Site', count: 42, icon: '📍' },
                  { label: 'Regional Lab', count: 38, icon: '🏢' },
                  { label: 'Testing Lab', count: 31, icon: '🔬' },
                  { label: 'QA', count: 17, icon: '✅' },
                  { label: 'Storage', count: 10, icon: '📦' },
                ].map((node, i, arr) => (
                  <div key={node.label} className="flex items-center gap-2">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-lg shadow-sm">
                        {node.icon}
                      </div>
                      <p className="text-[9px] text-slate-600 text-center font-medium leading-tight">{node.label}</p>
                      <p className="text-[10px] font-bold text-slate-800">{node.count}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="flex flex-col items-center gap-0.5 mb-5">
                        <div className="w-6 h-0.5 bg-slate-200"></div>
                        <ChevronRight className="w-3 h-3 text-slate-300 -mt-1" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SCard>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2 — REQUEST & APPROVAL
      ══════════════════════════════════════════════════════════════ */}
      {section === 'Request & Approval' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">

            {/* Request Trend */}
            <SCard title="Request Trend" subtitle="Daily requests vs completions" className="col-span-2">
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={requestTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip contentStyle={{ fontSize: 10 }} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                  <Line type="monotone" dataKey="requests" name="Requests" stroke={C.cyan} strokeWidth={2} dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="completed" name="Completed" stroke={C.green} strokeWidth={2} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </SCard>

            {/* Request Categories */}
            <SCard title="Request Categories" subtitle="By test type">
              <ResponsiveContainer width="100%" height={120}>
                <PieChart>
                  <Pie data={requestCategories} cx="50%" cy="50%" outerRadius={50} innerRadius={26} dataKey="value">
                    {requestCategories.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 10 }} formatter={(v: number) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-1">
                {requestCategories.map(d => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: d.color }}></div>
                      <span className="text-[10px] text-slate-600">{d.name}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-700">{d.value}%</span>
                  </div>
                ))}
              </div>
            </SCard>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Approval Workflow */}
            <SCard title="Approval Workflow" subtitle="Current pending approvals">
              {/* Stage flow */}
              <div className="flex items-center gap-1 mb-4">
                {approvalStages.map((s, i, arr) => (
                  <div key={s} className="flex items-center gap-1 flex-1">
                    <div className={`flex-1 py-1.5 px-2 rounded-lg text-center text-[9px] font-medium ${i < 3 ? 'bg-cyan-100 text-cyan-700' : i === 3 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{s}</div>
                    {i < arr.length - 1 && <ChevronRight className="w-2.5 h-2.5 text-slate-300 flex-shrink-0" />}
                  </div>
                ))}
              </div>
              {/* Pending queue */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[
                  { label: 'Pending', value: '18', color: 'text-amber-600' },
                  { label: 'Avg Wait', value: '3.8 hrs', color: 'text-slate-700' },
                  { label: 'Highest Priority', value: 'Critical', color: 'text-red-600' },
                  { label: 'Longest Waiting', value: '16 hrs', color: 'text-red-600' },
                ].map(m => (
                  <div key={m.label} className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-center">
                    <p className={`text-sm font-bold ${m.color}`}>{m.value}</p>
                    <p className="text-[9px] text-slate-400">{m.label}</p>
                  </div>
                ))}
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['Request ID', 'Requested By', 'Current Approver', 'Waiting', 'Priority'].map(h => (
                      <th key={h} className="text-left py-2 px-2 text-[10px] text-slate-400 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {approvalQueue.map(r => (
                    <tr key={r.id} className="border-b border-slate-50 hover:bg-slate-50/60">
                      <td className="py-2 px-2 font-mono text-[10px] text-slate-400">{r.id}</td>
                      <td className="py-2 px-2 font-medium text-slate-800">{r.requester}</td>
                      <td className="py-2 px-2 text-slate-600">{r.approver}</td>
                      <td className={`py-2 px-2 font-medium ${parseInt(r.waiting) > 3 ? 'text-red-600' : 'text-slate-600'}`}>{r.waiting}</td>
                      <td className="py-2 px-2">
                        <Badge variant={r.priority === 'High' ? 'error' : r.priority === 'Medium' ? 'warning' : 'neutral'} size="sm">{r.priority}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SCard>

            {/* Task Assignment */}
            <SCard title="Task Assignment Dashboard" subtitle="Technician workload distribution">
              <table className="w-full text-xs mb-4">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['Technician', 'Assigned', 'Active', 'Completed', 'Load'].map(h => (
                      <th key={h} className="text-left py-2 px-2 text-[10px] text-slate-400 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {taskAssignment.map(t => (
                    <tr key={t.tech} className="border-b border-slate-50 hover:bg-slate-50/60">
                      <td className="py-2.5 px-2 font-medium text-slate-800">{t.tech}</td>
                      <td className="py-2.5 px-2 text-slate-700">{t.assigned}</td>
                      <td className="py-2.5 px-2 text-cyan-600 font-medium">{t.active}</td>
                      <td className="py-2.5 px-2 text-green-600 font-medium">{t.completed}</td>
                      <td className="py-2.5 px-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${t.load}%`, background: t.load > 80 ? C.red : t.load > 65 ? C.amber : C.green }}></div>
                          </div>
                          <span className={`text-[10px] font-medium ${t.load > 80 ? 'text-red-600' : t.load > 65 ? 'text-amber-600' : 'text-green-600'}`}>{t.load}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-start gap-2 p-2.5 bg-amber-50 border border-amber-200/50 rounded-lg">
                <Brain className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-amber-700 font-medium">AI Workload Insight</p>
                  <p className="text-[10px] text-amber-600">Workload imbalance detected. Recommend assigning next requests to <strong>Bob</strong> and <strong>Omar</strong>.</p>
                </div>
              </div>
            </SCard>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SECTION 3 — SAMPLE TRACKING
      ══════════════════════════════════════════════════════════════ */}
      {section === 'Sample Tracking' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">

            {/* Sample Table */}
            <SCard title="Active Sample Tracking" subtitle="Click a row to view chain of custody">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 flex items-center gap-2 bg-white border border-slate-200/60 rounded-lg px-2.5 py-1.5">
                  <Search className="w-3 h-3 text-slate-400" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search sample ID, request type..." className="flex-1 text-xs outline-none bg-transparent text-slate-700 placeholder:text-slate-400" />
                </div>
                <button className="flex items-center gap-1 px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50">
                  <Download className="w-3 h-3" /> CSV
                </button>
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['Sample ID', 'Request', 'Stage', 'Location', 'Owner', 'SLA'].map(h => (
                      <th key={h} className="text-left py-2 px-2 text-[10px] text-slate-400 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sampleRows.filter(s => !search || s.id.toLowerCase().includes(search.toLowerCase()) || s.request.toLowerCase().includes(search.toLowerCase())).map(s => (
                    <tr key={s.id} onClick={() => setSelectedSample(s)} className={`border-b border-slate-50 cursor-pointer transition-colors ${selectedSample.id === s.id ? 'bg-cyan-50/60' : 'hover:bg-slate-50/60'}`}>
                      <td className="py-2 px-2 font-mono text-[10px] text-slate-500">{s.id}</td>
                      <td className="py-2 px-2 font-medium text-slate-800">{s.request}</td>
                      <td className="py-2 px-2"><span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${stageColor[s.stage] || 'bg-slate-100 text-slate-600'}`}>{s.stage}</span></td>
                      <td className="py-2 px-2 text-slate-600 text-[10px]">{s.location}</td>
                      <td className="py-2 px-2 text-slate-600">{s.owner}</td>
                      <td className="py-2 px-2"><Badge variant={s.sla === 'On Time' ? 'success' : s.sla === 'Delayed' ? 'error' : 'warning'} size="sm">{s.sla}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SCard>

            {/* Digital Chain of Custody */}
            <SCard title="Digital Chain of Custody" subtitle={`Sample ${selectedSample.id} — click a row on the left`}>
              <div className="relative">
                <div className="absolute left-3 top-1 bottom-1 w-0.5 bg-slate-100"></div>
                <div className="space-y-3">
                  {custodyTimeline.map((ev, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center z-10 ${i === custodyTimeline.length - 1 ? 'bg-green-500' : 'bg-cyan-500'}`}>
                        <CheckCircle className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="flex-1 pb-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-bold text-slate-800">{ev.event}</span>
                          <span className="text-[9px] text-slate-400">{ev.time}</span>
                          {ev.signed && <span className="text-[9px] text-green-600">✓ Signed</span>}
                        </div>
                        <div className="flex items-center gap-3 text-[9px] text-slate-400">
                          <span>👤 {ev.user}</span>
                          <span>📍 {ev.location}</span>
                          <span>💻 {ev.device}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SCard>
          </div>

          {/* Barcode/QR Activity */}
          <div className="grid grid-cols-2 gap-4">
            <SCard title="Barcode / QR Scan Activity" subtitle="Today's scanning performance">
              <div className="grid grid-cols-5 gap-2 mb-3">
                {[
                  { label: "Today's Scans", value: '864', color: C.slate },
                  { label: 'Successful', value: '852', color: C.green },
                  { label: 'Failed', value: '12', color: C.red },
                  { label: 'Duplicates', value: '2', color: C.amber },
                  { label: 'Avg Scan', value: '0.6s', color: C.cyan },
                ].map(m => (
                  <div key={m.label} className="bg-slate-50 border border-slate-100 rounded-xl p-2 text-center">
                    <p className="text-base font-bold" style={{ color: m.color }}>{m.value}</p>
                    <p className="text-[8px] text-slate-400 mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={hourlyScans} barSize={18}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="hour" tick={{ fontSize: 8 }} />
                  <YAxis tick={{ fontSize: 8 }} />
                  <Tooltip contentStyle={{ fontSize: 10 }} />
                  <Bar dataKey="scans" fill={C.cyan} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </SCard>

            {/* Recent Activity Feed */}
            <SCard title="Recent Activity Feed" subtitle="Live event stream">
              <div className="relative">
                <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-slate-100"></div>
                <div className="space-y-3 pl-1">
                  {recentActivity.map((ev, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center z-10 ${actTypeColor[ev.type]}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      </div>
                      <div>
                        <p className="text-xs text-slate-700">{ev.event}</p>
                        <p className="text-[9px] text-slate-400">{ev.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SCard>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SECTION 4 — SLA & PERFORMANCE
      ══════════════════════════════════════════════════════════════ */}
      {section === 'SLA & Performance' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">

            {/* SLA Gauge */}
            <SCard title="SLA Monitoring" subtitle="Within SLA vs overdue">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <svg width={110} height={110} viewBox="0 0 110 110">
                    <circle cx="55" cy="55" r="46" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                    <circle cx="55" cy="55" r="46" fill="none" stroke={C.green} strokeWidth="10"
                      strokeLinecap="round" strokeDasharray={`${0.96 * 289.0} 289.0`} transform="rotate(-90 55 55)" />
                    <text x="55" y="50" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1e293b">96%</text>
                    <text x="55" y="64" textAnchor="middle" fontSize="9" fill="#64748b">Within SLA</text>
                  </svg>
                </div>
                <div className="space-y-2">
                  <div><p className="text-[10px] text-slate-400">Within SLA</p><p className="text-xl font-bold text-green-600">96%</p></div>
                  <div><p className="text-[10px] text-slate-400">Overdue</p><p className="text-xl font-bold text-red-600">4%</p></div>
                </div>
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['Sample', 'Stage', 'Delay', 'Priority'].map(h => (
                      <th key={h} className="text-left py-2 px-2 text-[10px] text-slate-400 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {slaOverdue.map(s => (
                    <tr key={s.sample} className="border-b border-slate-50 bg-red-50/30">
                      <td className="py-2 px-2 font-mono text-[10px] text-slate-500">{s.sample}</td>
                      <td className="py-2 px-2 text-slate-700">{s.stage}</td>
                      <td className="py-2 px-2 font-medium text-red-600">{s.delay}</td>
                      <td className="py-2 px-2"><Badge variant={s.priority === 'Critical' ? 'error' : s.priority === 'High' ? 'warning' : 'info'} size="sm">{s.priority}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SCard>

            {/* Turnaround Time */}
            <SCard title="Turnaround Time Analytics" subtitle="Request → completion breakdown">
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: 'Last Week Avg', value: '18 hrs', color: 'text-slate-600' },
                  { label: 'This Week Avg', value: '15 hrs', color: 'text-cyan-600' },
                  { label: 'Improvement', value: '16%', color: 'text-green-600' },
                ].map(m => (
                  <div key={m.label} className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-center">
                    <p className={`text-sm font-bold ${m.color}`}>{m.value}</p>
                    <p className="text-[9px] text-slate-400">{m.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 mb-2">Stage breakdown (hrs)</p>
              <div className="space-y-2">
                {turnaroundBreakdown.map(t => (
                  <div key={t.stage}>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-[10px] text-slate-600">{t.stage}</span>
                      <span className="text-[10px] font-semibold text-slate-700">{t.hours} hrs</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(t.hours / 15) * 100}%`, background: t.color }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </SCard>

            {/* Workflow Bottlenecks */}
            <SCard title="Workflow Bottlenecks" subtitle="AI-identified delay distribution">
              <div className="space-y-3 mb-4">
                {bottlenecks.map(b => (
                  <div key={b.stage}>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-[10px] font-medium text-slate-700">{b.stage}</span>
                      <span className="text-[10px] font-bold" style={{ color: b.color }}>{b.pct}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${b.pct}%`, background: b.color }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2.5 bg-amber-50 border border-amber-200/50 rounded-lg flex gap-2">
                <Brain className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-amber-700"><strong>AI Recommendation:</strong> Increase technician availability between <strong>10AM–1PM</strong> to clear testing queue.</p>
              </div>
            </SCard>
          </div>

          {/* Notifications + Escalations */}
          <div className="grid grid-cols-2 gap-4">
            <SCard title="Notification Center" subtitle="Live alerts & system notifications">
              <div className="grid grid-cols-4 gap-2 mb-3">
                {notifications.map(n => (
                  <div key={n.type} className={`${n.bg} border border-slate-100 rounded-xl p-2.5 text-center`}>
                    <p className={`text-xl font-bold ${n.color}`}>{n.count}</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">{n.type}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {notifFeed.map((n, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${actTypeColor[n.type]}`}></div>
                    <div>
                      <p className="text-[10px] text-slate-700">{n.msg}</p>
                      <p className="text-[9px] text-slate-400">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SCard>

            <SCard title="Escalation Dashboard" subtitle="Breached SLAs escalated to management">
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { label: 'Total Escalations', value: '12', color: 'text-red-600' },
                  { label: 'Resolved', value: '9', color: 'text-green-600' },
                  { label: 'Pending', value: '3', color: 'text-amber-600' },
                ].map(m => (
                  <div key={m.label} className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center">
                    <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
                    <p className="text-[9px] text-slate-500">{m.label}</p>
                  </div>
                ))}
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['Request', 'SLA Limit', 'Escalated To', 'Since', 'Status'].map(h => (
                      <th key={h} className="text-left py-2 px-2 text-[10px] text-slate-400 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {escalations.map(e => (
                    <tr key={e.request} className={`border-b border-slate-50 hover:bg-slate-50/60 ${!e.resolved ? 'bg-red-50/20' : ''}`}>
                      <td className="py-2 px-2 font-mono text-[10px] text-slate-500">{e.request}</td>
                      <td className="py-2 px-2 text-slate-600">{e.sla}</td>
                      <td className="py-2 px-2 font-medium text-slate-800">{e.escalatedTo}</td>
                      <td className="py-2 px-2 text-red-500 font-medium">{e.since}</td>
                      <td className="py-2 px-2"><Badge variant={e.resolved ? 'success' : 'error'} size="sm">{e.resolved ? 'Resolved' : 'Pending'}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SCard>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SECTION 5 — AUDIT & INTEGRATION
      ══════════════════════════════════════════════════════════════ */}
      {section === 'Audit & Integration' && (
        <div className="space-y-4">

          {/* Audit Trail — full width */}
          <SCard title="Audit Trail" subtitle="Complete immutable action log — every event signed & timestamped">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  {['Time', 'User', 'Department', 'Action', 'Sample', 'Prev Status', 'New Status', 'Device', 'Signature'].map(h => (
                    <th key={h} className="text-left py-2.5 px-3 text-[10px] text-slate-400 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {auditTrail.map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="py-2.5 px-3 text-slate-400 text-[10px] font-mono">{row.time}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-800">{row.user}</td>
                    <td className="py-2.5 px-3 text-slate-500">{row.dept}</td>
                    <td className="py-2.5 px-3 font-medium text-cyan-700">{row.action}</td>
                    <td className="py-2.5 px-3 font-mono text-[10px] text-slate-500">{row.sample}</td>
                    <td className="py-2.5 px-3 text-slate-400">{row.prevStatus}</td>
                    <td className="py-2.5 px-3"><span className={`px-1.5 py-0.5 rounded-full text-[9px] font-medium ${stageColor[row.newStatus] || 'bg-slate-100 text-slate-600'}`}>{row.newStatus}</span></td>
                    <td className="py-2.5 px-3 text-slate-500">{row.device}</td>
                    <td className="py-2.5 px-3 text-green-600 font-medium">{row.signature}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-[10px] text-slate-400">Showing 6 of 2,840 audit records today</p>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs hover:bg-slate-50">
                <Download className="w-3 h-3" /> Export Full Audit Log
              </button>
            </div>
          </SCard>

          <div className="grid grid-cols-2 gap-4">

            {/* Enterprise Integration */}
            <SCard title="Enterprise Integration Status" subtitle="Connected systems — live sync health">
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { label: 'Successful Sync', value: '99.4%', color: 'text-green-600', bg: 'bg-green-50 border-green-100' },
                  { label: 'Failed Sync', value: '0.6%', color: 'text-red-600', bg: 'bg-red-50 border-red-100' },
                ].map(m => (
                  <div key={m.label} className={`${m.bg} border rounded-xl p-3 text-center`}>
                    <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
                    <p className="text-[9px] text-slate-500">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {integrations.map(sys => (
                  <div key={sys.name} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{sys.icon}</span>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">{sys.name}</p>
                        <p className="text-[9px] text-slate-400">Sync rate: {sys.syncOk}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <Badge variant="success" size="sm">{sys.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </SCard>

            {/* AI Operational Insights */}
            <SCard title="AI Operational Insights" subtitle="Continuously updated — predictive & operational">
              <div className="space-y-2">
                {aiInsights.map((ins, i) => (
                  <div key={i} className="flex gap-2 p-2.5 bg-slate-50 border border-slate-100 rounded-lg hover:bg-cyan-50/40 hover:border-cyan-200/40 transition-colors">
                    <Brain className="w-3 h-3 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-slate-700 leading-snug">{ins.text}</p>
                      <span className="text-[9px] text-cyan-500 font-medium">{ins.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </SCard>
          </div>
        </div>
      )}

    </div>
  );
}
