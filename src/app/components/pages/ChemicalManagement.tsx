import { useState } from 'react';
import { TestTube, AlertTriangle, ShieldCheck, Clock, Search } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { Badge } from '../ui/Badge';

const tabs = ['Chemical Register', 'Storage Map', 'Compliance', 'MSDS'];

const chemicals = [
  { id: 'CHM-001', name: 'Acetone', cas: '67-64-1', location: 'A-3', qty: '4 L', expiry: '2025-08-12', storageClass: 'Flammable', compliance: 'compliant' },
  { id: 'CHM-002', name: 'Hydrochloric Acid 37%', cas: '7647-01-0', location: 'B-1', qty: '12 L', expiry: '2026-03-01', storageClass: 'Corrosive', compliance: 'compliant' },
  { id: 'CHM-003', name: 'Hydrogen Peroxide 30%', cas: '7722-84-1', location: 'A-3', qty: '2 L', expiry: '2025-07-15', storageClass: 'Oxidiser', compliance: 'violation' },
  { id: 'CHM-004', name: 'Ethanol 96%', cas: '64-17-5', location: 'A-1', qty: '8 L', expiry: '2025-09-30', storageClass: 'Flammable', compliance: 'compliant' },
  { id: 'CHM-005', name: 'Sodium Hydroxide', cas: '1310-73-2', location: 'B-2', qty: '5 kg', expiry: '2027-01-01', storageClass: 'Corrosive', compliance: 'warning' },
];

const violations = [
  { id: 1, chemA: 'Hydrogen Peroxide 30%', chemB: 'Acetone', reason: 'Oxidiser + Flammable', location: 'Cabinet A-3', severity: 'error' as const },
  { id: 2, chemA: 'Sodium Hydroxide', chemB: 'Hydrochloric Acid 37%', reason: 'Acid + Base proximity', location: 'Cabinet B row', severity: 'warning' as const },
];

const msdsItems = [
  { name: 'Acetone', cas: '67-64-1', ghs: ['Flammable', 'Irritant'] },
  { name: 'Hydrochloric Acid', cas: '7647-01-0', ghs: ['Corrosive', 'Toxic'] },
  { name: 'Hydrogen Peroxide', cas: '7722-84-1', ghs: ['Oxidiser', 'Irritant', 'Corrosive'] },
  { name: 'Ethanol', cas: '64-17-5', ghs: ['Flammable'] },
];

// 4x4 storage map cells
const storageMap = [
  ['safe', 'safe', 'violation', 'safe'],
  ['safe', 'warning', 'safe', 'safe'],
  ['safe', 'safe', 'safe', 'safe'],
  ['empty', 'safe', 'empty', 'safe'],
];

const mapColors: Record<string, string> = {
  safe: 'bg-green-200 border-green-300',
  violation: 'bg-red-300 border-red-400 animate-pulse',
  warning: 'bg-amber-200 border-amber-300',
  empty: 'bg-slate-100 border-slate-200',
};

export function ChemicalManagement() {
  const [activeTab, setActiveTab] = useState('Chemical Register');
  const [search, setSearch] = useState('');

  const complianceBadge: Record<string, 'success' | 'error' | 'warning'> = {
    compliant: 'success',
    violation: 'error',
    warning: 'warning',
  };

  return (
    <div className="p-5 min-h-full flex flex-col gap-4">
      <div className="mb-1">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Chemical Management</h2>
        <p className="text-xs text-slate-500">Lifecycle management, storage compliance, compatibility validation & MSDS access</p>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-4 gap-3">
        <MetricCard title="Total Chemicals" value="128" subtitle="Across all locations" icon={TestTube} status="info" />
        <MetricCard title="Compliance Rate" value="94%" subtitle="6 items need attention" icon={ShieldCheck} status="success" trend="up" trendValue="+2% this week" />
        <MetricCard title="Expiring in 30 Days" value="9" subtitle="Action required" icon={Clock} status="warning" />
        <MetricCard title="Compatibility Violations" value="2" subtitle="Immediate action required" icon={AlertTriangle} status="error" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200/40">
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
            activeTab === t ? 'border-cyan-500 text-cyan-700' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}>
            {t}
            {t === 'Compliance' && violations.length > 0 && (
              <span className="ml-1.5 w-4 h-4 inline-flex items-center justify-center bg-red-500 text-white text-[9px] rounded-full">{violations.length}</span>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'Chemical Register' && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-2 flex-1 bg-white border border-slate-200/60 rounded-lg px-3 py-1.5">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or CAS number..." className="flex-1 text-xs outline-none bg-transparent text-slate-700 placeholder:text-slate-400" />
            </div>
          </div>
          <div className="bg-white/70 rounded-xl border border-slate-200/40 overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100">
                  {['ID', 'Name', 'CAS No.', 'Location', 'Quantity', 'Expiry', 'Storage Class', 'Compliance'].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 text-slate-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chemicals.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.cas.includes(search)).map(c => (
                  <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-4 py-2.5 text-slate-400 font-mono">{c.id}</td>
                    <td className="px-4 py-2.5 font-medium text-slate-800">{c.name}</td>
                    <td className="px-4 py-2.5 text-slate-500 font-mono">{c.cas}</td>
                    <td className="px-4 py-2.5 text-slate-600">{c.location}</td>
                    <td className="px-4 py-2.5 text-slate-700">{c.qty}</td>
                    <td className={`px-4 py-2.5 ${c.expiry < '2025-08-01' ? 'text-orange-600 font-medium' : 'text-slate-600'}`}>{c.expiry}</td>
                    <td className="px-4 py-2.5 text-slate-600">{c.storageClass}</td>
                    <td className="px-4 py-2.5">
                      <Badge variant={complianceBadge[c.compliance]} size="sm">
                        {c.compliance === 'compliant' ? 'Compliant' : c.compliance === 'violation' ? 'Violation' : 'Warning'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Storage Map' && (
        <div className="flex gap-6">
          <div>
            <p className="text-xs font-semibold text-slate-700 mb-3">Cabinet Layout — Lab Section A & B</p>
            <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(4, 60px)' }}>
              {storageMap.flat().map((cell, i) => (
                <div key={i} className={`w-14 h-10 rounded border-2 ${mapColors[cell]} flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity`}>
                  <span className="text-[9px] font-medium text-slate-600">{String.fromCharCode(65 + Math.floor(i / 4))}{(i % 4) + 1}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              {[['bg-green-200', 'Safe'], ['bg-amber-200', 'Warning'], ['bg-red-300', 'Violation'], ['bg-slate-100', 'Empty']].map(([c, l]) => (
                <div key={l} className="flex items-center gap-1.5">
                  <div className={`w-3 h-3 rounded ${c} border border-slate-200`}></div>
                  <span className="text-[10px] text-slate-500">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Compliance' && (
        <div className="space-y-3">
          <p className="text-xs text-slate-500 font-medium">{violations.length} active violation(s) require immediate attention</p>
          {violations.map(v => (
            <div key={v.id} className={`bg-white/70 border rounded-xl p-4 shadow-sm ${v.severity === 'error' ? 'border-red-200' : 'border-amber-200'}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-4 h-4 ${v.severity === 'error' ? 'text-red-500' : 'text-amber-500'}`} />
                  <p className="text-xs font-semibold text-slate-800">Incompatible Storage Detected</p>
                  <Badge variant={v.severity} size="sm">{v.severity === 'error' ? 'Critical' : 'Warning'}</Badge>
                </div>
                <button className="text-xs text-cyan-600 font-medium hover:underline">Acknowledge</button>
              </div>
              <div className="flex gap-4 mb-2">
                <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2 text-xs text-red-700 font-medium">{v.chemA}</div>
                <div className="flex items-center text-slate-400 text-xs">+</div>
                <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2 text-xs text-red-700 font-medium">{v.chemB}</div>
              </div>
              <p className="text-[10px] text-slate-500">Reason: <span className="font-medium text-slate-700">{v.reason}</span> · Location: {v.location}</p>
              <div className="flex gap-2 mt-3">
                <button className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-lg font-medium">Reassign Storage</button>
                <button className="px-3 py-1.5 border border-slate-200 text-slate-600 text-xs rounded-lg hover:bg-slate-50">Notify Personnel</button>
                <button className="px-3 py-1.5 border border-slate-200 text-slate-600 text-xs rounded-lg hover:bg-slate-50">Log Corrective Action</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'MSDS' && (
        <div>
          <div className="flex items-center gap-2 mb-3 bg-white border border-slate-200/60 rounded-lg px-3 py-1.5 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input placeholder="Search MSDS library..." className="flex-1 text-xs outline-none bg-transparent text-slate-700 placeholder:text-slate-400" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {msdsItems.map(m => (
              <div key={m.name} className="bg-white/70 border border-slate-200/40 rounded-xl p-4 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{m.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono">CAS: {m.cas}</p>
                  </div>
                  <button className="text-[10px] text-cyan-600 font-medium hover:underline">Query AI →</button>
                </div>
                <div className="flex gap-1.5 flex-wrap mb-3">
                  {m.ghs.map(g => (
                    <span key={g} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-full font-medium">{g}</span>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {['Hazards', 'PPE', 'Storage', 'Emergency'].map(link => (
                    <button key={link} className="py-1 bg-slate-50 border border-slate-200/60 rounded text-[10px] text-slate-600 hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-200 transition-colors">{link}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
