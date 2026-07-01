import { useState } from 'react';
import { Trash2, AlertTriangle, CheckCircle, TrendingDown } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const tabs = ['Overview', 'Waste Register', 'Segregation Monitoring', 'Reports'];

const trendData = [
  { week: 'W1', chemical: 45, biological: 12, general: 30 },
  { week: 'W2', chemical: 38, biological: 15, general: 28 },
  { week: 'W3', chemical: 52, biological: 10, general: 35 },
  { week: 'W4', chemical: 41, biological: 18, general: 25 },
];

const complianceData = [
  { name: 'Compliant', value: 87, color: '#10b981' },
  { name: 'Non-Compliant', value: 13, color: '#ef4444' },
];

const wasteEntries = [
  { id: 'WST-0441', type: 'Spent Solvent', classification: 'Chemical', generated: '2024-06-10', stage: 'Stored', handler: 'Lab A', compliance: 'compliant' },
  { id: 'WST-0440', type: 'Culture Media', classification: 'Biological', generated: '2024-06-09', stage: 'Collected', handler: 'Microbio', compliance: 'compliant' },
  { id: 'WST-0439', type: 'Contaminated PPE', classification: 'General', generated: '2024-06-09', stage: 'Disposed', handler: 'Waste Ops', compliance: 'compliant' },
  { id: 'WST-0438', type: 'Sharps Container', classification: 'Sharps', generated: '2024-06-08', stage: 'Non-Compliant', handler: 'Lab B', compliance: 'violation' },
  { id: 'WST-0437', type: 'Acid Waste', classification: 'Chemical', generated: '2024-06-08', stage: 'In Transit', handler: 'Chem Lab', compliance: 'compliant' },
];

const stageColors: Record<string, string> = {
  Generated: 'bg-blue-100 text-blue-700',
  Stored: 'bg-amber-100 text-amber-700',
  Collected: 'bg-purple-100 text-purple-700',
  'In Transit': 'bg-orange-100 text-orange-700',
  Disposed: 'bg-green-100 text-green-700',
  'Non-Compliant': 'bg-red-100 text-red-700',
};

const classColors: Record<string, 'error' | 'warning' | 'info' | 'success' | 'neutral'> = {
  Chemical: 'error',
  Biological: 'warning',
  General: 'neutral',
  Sharps: 'info',
  Radioactive: 'error',
};

const bins = [
  { id: 'BIN-01', zone: 'Lab A', type: 'Chemical', status: 'ok', fill: 65 },
  { id: 'BIN-02', zone: 'Lab B', type: 'General', status: 'violation', fill: 95 },
  { id: 'BIN-03', zone: 'Microbio', type: 'Biological', status: 'ok', fill: 40 },
  { id: 'BIN-04', zone: 'Lab C', type: 'Sharps', status: 'ok', fill: 50 },
];

export function WasteManagement() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="p-5 min-h-full flex flex-col gap-4">
      <div className="mb-1">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Waste Management</h2>
        <p className="text-xs text-slate-500">Track waste from generation to disposal — CV-assisted segregation compliance</p>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-4 gap-3">
        <MetricCard title="Total Waste Generated" value="284 kg" subtitle="This month" icon={Trash2} status="info" />
        <MetricCard title="Compliant Disposals" value="87%" subtitle="Target: 95%" icon={CheckCircle} status="warning" trend="down" trendValue="-3% vs last month" />
        <MetricCard title="Active Violations" value="3" subtitle="Segregation issues" icon={AlertTriangle} status="error" />
        <MetricCard title="Hazardous Pending" value="12 kg" subtitle="Awaiting certified disposal" icon={TrendingDown} status="warning" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200/40">
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
            activeTab === t ? 'border-cyan-500 text-cyan-700' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}>{t}</button>
        ))}
      </div>

      {activeTab === 'Overview' && (
        <div className="grid grid-cols-2 gap-4">
          <Card title="Waste Generation Trend" subtitle="By classification — weekly">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 11 }} />
                <Bar dataKey="chemical" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} />
                <Bar dataKey="biological" stackId="a" fill="#8b5cf6" />
                <Bar dataKey="general" stackId="a" fill="#94a3b8" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card title="Compliance Rate" subtitle="Current period">
            <div className="flex items-center gap-6 pt-2">
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie data={complianceData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value">
                    {complianceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {complianceData.map(d => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }}></div>
                    <span className="text-xs text-slate-600">{d.name}</span>
                    <span className="text-sm font-bold text-slate-800 ml-auto">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'Waste Register' && (
        <div className="bg-white/70 rounded-xl border border-slate-200/40 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100">
                {['Waste ID', 'Type', 'Classification', 'Generated', 'Stage', 'Handler', 'Compliance'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-slate-500 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {wasteEntries.map(w => (
                <tr key={w.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-4 py-2.5 font-mono text-slate-400">{w.id}</td>
                  <td className="px-4 py-2.5 font-medium text-slate-800">{w.type}</td>
                  <td className="px-4 py-2.5"><Badge variant={classColors[w.classification]} size="sm">{w.classification}</Badge></td>
                  <td className="px-4 py-2.5 text-slate-600">{w.generated}</td>
                  <td className="px-4 py-2.5"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${stageColors[w.stage] || 'bg-slate-100 text-slate-600'}`}>{w.stage}</span></td>
                  <td className="px-4 py-2.5 text-slate-600">{w.handler}</td>
                  <td className="px-4 py-2.5"><Badge variant={w.compliance === 'compliant' ? 'success' : 'error'} size="sm">{w.compliance === 'compliant' ? 'Compliant' : 'Violation'}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Segregation Monitoring' && (
        <div className="grid grid-cols-2 gap-3">
          {bins.map(bin => (
            <div key={bin.id} className={`bg-white/70 border rounded-xl p-4 shadow-sm ${bin.status === 'violation' ? 'border-red-200' : 'border-slate-200/40'}`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-slate-800">{bin.id} — {bin.zone}</p>
                  <p className="text-[10px] text-slate-500">{bin.type} waste bin</p>
                </div>
                <Badge variant={bin.status === 'violation' ? 'error' : 'success'} size="sm">{bin.status === 'violation' ? 'Violation' : 'Compliant'}</Badge>
              </div>
              {/* Simulated camera feed */}
              <div className={`rounded-lg h-24 flex items-center justify-center mb-3 ${bin.status === 'violation' ? 'bg-red-900' : 'bg-slate-800'}`}>
                <div className="text-center">
                  <div className={`w-8 h-8 rounded-full mx-auto mb-1 ${bin.status === 'violation' ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                  <p className="text-[10px] text-white/70">{bin.status === 'violation' ? '⚠ Incorrect bin usage detected' : 'CV: Correct segregation'}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-slate-500">Fill level</span>
                    <span className={`text-[10px] font-medium ${bin.fill > 90 ? 'text-red-600' : bin.fill > 70 ? 'text-amber-600' : 'text-green-600'}`}>{bin.fill}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full">
                    <div className={`h-full rounded-full ${bin.fill > 90 ? 'bg-red-400' : bin.fill > 70 ? 'bg-amber-400' : 'bg-green-400'}`} style={{ width: `${bin.fill}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Reports' && (
        <div className="space-y-3">
          {[
            { title: 'Monthly Compliance Report', desc: 'June 2024 — All waste classifications', type: 'PDF' },
            { title: 'Hazardous Waste Manifest', desc: 'Pending disposal items — certified format', type: 'PDF' },
            { title: 'Sustainability Summary', desc: 'Waste reduction vs. targets Q2 2024', type: 'XLSX' },
          ].map(r => (
            <div key={r.title} className="flex items-center justify-between bg-white/70 border border-slate-200/40 rounded-xl p-4 shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-800">{r.title}</p>
                <p className="text-[10px] text-slate-500">{r.desc}</p>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-xs font-medium rounded-lg shadow-sm">
                Export {r.type}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
