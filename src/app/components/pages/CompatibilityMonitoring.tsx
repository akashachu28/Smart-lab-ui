import { AlertOctagon, ShieldCheck, Search, Clock } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 5x5 storage rack map
const rackData = [
  ['safe', 'safe', 'incompatible', 'safe', 'safe'],
  ['safe', 'warning', 'safe', 'safe', 'empty'],
  ['safe', 'safe', 'safe', 'incompatible', 'safe'],
  ['empty', 'safe', 'safe', 'safe', 'safe'],
  ['safe', 'safe', 'warning', 'empty', 'safe'],
];

const rackLabels: Record<string, string> = {
  safe: 'Safe',
  incompatible: 'Incompatible',
  warning: 'Warning',
  empty: 'Empty',
};

const rackColors: Record<string, string> = {
  safe: 'bg-green-100 border-green-300 text-green-700',
  incompatible: 'bg-red-200 border-red-400 text-red-700 animate-pulse',
  warning: 'bg-amber-100 border-amber-300 text-amber-700',
  empty: 'bg-slate-50 border-slate-200 text-slate-300',
};

const violations = [
  { id: 1, chemA: 'Acetone', chemB: 'Hydrogen Peroxide 30%', reason: 'Oxidiser + Flammable', location: 'Rack A-3', severity: 'error' as const, recommended: 'Move Acetone to Cabinet F (flammables)' },
  { id: 2, chemA: 'Sodium Hydroxide', chemB: 'Hydrochloric Acid', reason: 'Acid + Base', location: 'Rack B-2', severity: 'error' as const, recommended: 'Separate to dedicated acid/base cabinets' },
  { id: 3, chemA: 'Ethanol', chemB: 'Potassium Permanganate', reason: 'Oxidiser + Flammable (proximity)', location: 'Rack E-3', severity: 'warning' as const, recommended: 'Increase separation distance or relocate' },
];

const trendData = [
  { date: 'Jun 1', violations: 4 },
  { date: 'Jun 5', violations: 3 },
  { date: 'Jun 10', violations: 5 },
  { date: 'Jun 15', violations: 2 },
  { date: 'Jun 20', violations: 3 },
  { date: 'Jun 25', violations: 2 },
];

export function CompatibilityMonitoring() {
  return (
    <div className="p-5 min-h-full flex flex-col gap-4">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">Chemical Compatibility Monitoring</h2>
          <p className="text-xs text-slate-500">Real-time validation of storage against compatibility rules — unsafe pairing detection</p>
        </div>
        <span className="text-[10px] text-slate-400">Last scan: 09:41:00 · Auto-scan every 5 min</span>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-4 gap-3">
        <MetricCard title="Chemicals Monitored" value="128" subtitle="All locations scanned" icon={ShieldCheck} status="info" />
        <MetricCard title="Active Violations" value="2" subtitle="Critical incompatibilities" icon={AlertOctagon} status="error" />
        <MetricCard title="Storage Warnings" value="1" subtitle="Non-critical, monitor" icon={Search} status="warning" />
        <MetricCard title="Last Full Scan" value="4 min ago" subtitle="All racks validated" icon={Clock} status="success" />
      </div>

      <div className="flex gap-4 flex-1">
        {/* Storage Matrix */}
        <div className="flex-1">
          <p className="text-xs font-semibold text-slate-700 mb-3">Storage Rack Compatibility Map — Section A–E</p>
          <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
            {rackData.flat().map((cell, i) => {
              const row = Math.floor(i / 5);
              const col = i % 5;
              return (
                <div key={i} className={`h-12 rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer hover:opacity-80 transition-opacity ${rackColors[cell]}`}>
                  <span className="text-[9px] font-bold">{String.fromCharCode(65 + row)}{col + 1}</span>
                  <span className="text-[8px]">{cell !== 'empty' ? rackLabels[cell] : '—'}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex gap-3">
            {Object.entries(rackColors).map(([k, v]) => (
              <div key={k} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded border ${v.replace(' animate-pulse', '')}`}></div>
                <span className="text-[10px] text-slate-500 capitalize">{k}</span>
              </div>
            ))}
          </div>

          {/* AI Widget */}
          <div className="mt-4 bg-gradient-to-r from-cyan-50 to-slate-50 border border-cyan-200/60 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded bg-cyan-500 flex items-center justify-center">
                <Search className="w-3 h-3 text-white" />
              </div>
              <p className="text-xs font-semibold text-slate-700">AI Safety Assistant</p>
            </div>
            <input placeholder="Ask: Can I store Acetone next to Hydrogen Peroxide?" className="w-full text-xs bg-white border border-cyan-200/60 rounded-lg px-3 py-2 outline-none text-slate-700 placeholder:text-slate-400" />
          </div>
        </div>

        {/* Violations Panel */}
        <div className="w-72 flex flex-col gap-3">
          <p className="text-xs font-semibold text-slate-700">Active Violations & Alerts</p>
          {violations.map(v => (
            <div key={v.id} className={`bg-white/70 border rounded-xl p-3.5 shadow-sm ${v.severity === 'error' ? 'border-red-200' : 'border-amber-200'}`}>
              <div className="flex items-start justify-between mb-2">
                <Badge variant={v.severity} size="sm">{v.severity === 'error' ? 'Critical' : 'Warning'}</Badge>
                <button className="text-[10px] text-cyan-600 hover:underline">Ack</button>
              </div>
              <div className="flex items-center gap-1 mb-1.5">
                <span className="text-xs font-semibold text-slate-800">{v.chemA}</span>
                <span className="text-[10px] text-slate-400">+</span>
                <span className="text-xs font-semibold text-slate-800">{v.chemB}</span>
              </div>
              <div className="inline-flex px-2 py-0.5 bg-red-50 border border-red-100 rounded-full text-[10px] text-red-700 font-medium mb-2">{v.reason}</div>
              <p className="text-[10px] text-slate-500 mb-1">Location: {v.location}</p>
              <p className="text-[10px] text-slate-600">Recommended: {v.recommended}</p>
              <div className="flex gap-1.5 mt-2.5">
                <button className="flex-1 px-2 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] rounded-lg font-medium">Reassign</button>
                <button className="flex-1 px-2 py-1 border border-slate-200 text-slate-600 text-[10px] rounded-lg">Log Action</button>
              </div>
            </div>
          ))}

          {/* Trend */}
          <div className="bg-white/70 border border-slate-200/40 rounded-xl p-3">
            <p className="text-xs font-semibold text-slate-700 mb-2">Violations Trend</p>
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={trendData}>
                <XAxis dataKey="date" tick={{ fontSize: 8 }} />
                <YAxis tick={{ fontSize: 8 }} width={15} />
                <Tooltip contentStyle={{ fontSize: 10 }} />
                <Line type="monotone" dataKey="violations" stroke="#ef4444" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
