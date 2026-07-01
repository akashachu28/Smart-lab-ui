import { useState } from 'react';
import { Search, Plus, AlertTriangle, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/Badge';

const incidents = [
  { id: 'INC-2024-041', title: 'Reagent contamination in Water Testing', date: '2024-06-10', severity: 'error' as const, status: 'Under Investigation' },
  { id: 'INC-2024-040', title: 'PPE non-compliance — Lab Entrance Zone A', date: '2024-06-09', severity: 'warning' as const, status: 'CAPA Assigned' },
  { id: 'INC-2024-039', title: 'Gas cylinder pressure failure — CYL-003', date: '2024-06-08', severity: 'error' as const, status: 'Open' },
  { id: 'INC-2024-038', title: 'Chemical storage violation — Cabinet A-3', date: '2024-06-07', severity: 'warning' as const, status: 'Closed' },
  { id: 'INC-2024-037', title: 'Sample mislabelling — Batch SMP-0430', date: '2024-06-05', severity: 'warning' as const, status: 'Closed' },
];

const statusConfig: Record<string, { badge: 'error' | 'warning' | 'info' | 'success' | 'neutral'; label: string }> = {
  Open: { badge: 'error', label: 'Open' },
  'Under Investigation': { badge: 'warning', label: 'Under Investigation' },
  'CAPA Assigned': { badge: 'info', label: 'CAPA Assigned' },
  Closed: { badge: 'success', label: 'Closed' },
};

const detailTabs = ['Summary', 'Root Cause', 'CAPA', 'Timeline', 'Related'];

const rootCauses = [
  { cause: 'Contaminated reagent batch from external supplier', confidence: 92, factors: ['Batch QC not performed on receipt', 'Supplier certificate expired'] },
  { cause: 'Inadequate cleaning procedure between test runs', confidence: 65, factors: ['SOP-WQ-03 not followed', 'Technician training gap identified'] },
];

const capas = [
  { action: 'Quarantine and dispose of reagent batch RGT-2024-0441', type: 'Corrective', assignee: 'Reem Al-Musa', due: '2024-06-12', status: 'In Progress' },
  { action: 'Update SOP-WQ-03 to include batch QC on receipt', type: 'Preventive', assignee: 'Lab Manager', due: '2024-06-20', status: 'Pending' },
  { action: 'Conduct reagent handling refresher training', type: 'Preventive', assignee: 'Training Dept', due: '2024-06-30', status: 'Pending' },
];

const timeline = [
  { time: '2024-06-10 07:30', event: 'Anomalous test results flagged by analyst', user: 'Ahmad Karimi' },
  { time: '2024-06-10 08:15', event: 'Incident reported and logged', user: 'Ahmad Karimi' },
  { time: '2024-06-10 09:00', event: 'Batch RGT-2024-0441 quarantined', user: 'Reem Al-Musa' },
  { time: '2024-06-10 10:00', event: 'AI root cause analysis initiated', user: 'System' },
  { time: '2024-06-10 10:05', event: 'RCA report generated — 2 probable causes identified', user: 'AI Copilot' },
];

const related = [
  { id: 'INC-2024-031', title: 'Reagent batch failure — Lab B', similarity: 84 },
  { id: 'INC-2023-098', title: 'Supplier QC gap — Chemicals', similarity: 71 },
];

export function RootCauseAnalysis() {
  const [selected, setSelected] = useState(incidents[0]);
  const [detailTab, setDetailTab] = useState('Summary');

  return (
    <div className="p-5 min-h-full flex flex-col gap-4">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">Root Cause Analysis</h2>
          <p className="text-xs text-slate-500">AI-assisted incident investigation — RCA, CAPA recommendations & historical search</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg text-xs font-medium shadow-sm">
          <Plus className="w-3.5 h-3.5" /> New Incident
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-slate-200/60 rounded-lg px-3 py-1.5 max-w-md">
        <Search className="w-3.5 h-3.5 text-slate-400" />
        <input placeholder="Search all incident history..." className="flex-1 text-xs outline-none bg-transparent text-slate-700 placeholder:text-slate-400" />
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        {/* Incident List */}
        <div className="w-72 flex-shrink-0 space-y-2 overflow-y-auto">
          {incidents.map(inc => (
            <button key={inc.id} onClick={() => { setSelected(inc); setDetailTab('Summary'); }} className={`w-full text-left bg-white/70 border rounded-xl p-3 shadow-sm hover:shadow-md transition-all ${selected.id === inc.id ? 'border-cyan-400 ring-1 ring-cyan-200' : 'border-slate-200/40'}`}>
              <div className="flex items-start justify-between gap-1 mb-1.5">
                <p className="text-[10px] font-mono text-slate-400">{inc.id}</p>
                <Badge variant={statusConfig[inc.status].badge} size="sm">{statusConfig[inc.status].label}</Badge>
              </div>
              <p className="text-xs font-semibold text-slate-800 leading-snug mb-1">{inc.title}</p>
              <div className="flex items-center gap-1.5">
                <Clock className="w-2.5 h-2.5 text-slate-400" />
                <span className="text-[10px] text-slate-400">{inc.date}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="flex-1 bg-white/70 border border-slate-200/40 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-mono text-slate-400 mb-0.5">{selected.id}</p>
                <p className="text-sm font-bold text-slate-800">{selected.title}</p>
              </div>
              <Badge variant={statusConfig[selected.status].badge}>{statusConfig[selected.status].label}</Badge>
            </div>
          </div>

          <div className="flex gap-1 px-5 pt-3 border-b border-slate-100">
            {detailTabs.map(t => (
              <button key={t} onClick={() => setDetailTab(t)} className={`px-3 py-1.5 text-xs font-medium border-b-2 -mb-px transition-colors ${detailTab === t ? 'border-cyan-500 text-cyan-700' : 'border-transparent text-slate-500'}`}>{t}</button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {detailTab === 'Summary' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-cyan-50 to-slate-50 border border-cyan-200/40 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 bg-cyan-500 rounded flex items-center justify-center">
                      <span className="text-[9px] text-white font-bold">AI</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700">AI-Generated Summary</p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    On 10 June 2024, analyst Ahmad Karimi identified anomalous results in Water Quality Testing batch WQ-2024-0441. Investigation indicates <strong>contaminated reagent batch RGT-2024-0441</strong> from external supplier as the primary cause. The batch was not subject to incoming QC verification per SOP-WQ-03. Immediate quarantine was initiated. Two CAPA actions are pending to prevent recurrence.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {[['Date & Time', '2024-06-10, 07:30'], ['Location', 'Water Testing Lab'], ['Assigned To', 'Reem Al-Musa'], ['Equipment', 'Spectrophotometer SP-02']].map(([l, v]) => (
                    <div key={l}>
                      <p className="text-[10px] text-slate-400 mb-0.5">{l}</p>
                      <p className="font-medium text-slate-700">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {detailTab === 'Root Cause' && (
              <div className="space-y-3">
                {rootCauses.map((rc, i) => (
                  <div key={i} className="bg-white border border-slate-200/60 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-xs font-semibold text-slate-800 flex-1 pr-4">#{i + 1} {rc.cause}</p>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full" style={{ width: `${rc.confidence}%` }}></div>
                        </div>
                        <Badge variant={rc.confidence > 80 ? 'error' : 'warning'} size="sm">{rc.confidence}% confidence</Badge>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 mb-1.5">Contributing factors:</p>
                    <ul className="space-y-1">
                      {rc.factors.map(f => (
                        <li key={f} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                          <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {detailTab === 'CAPA' && (
              <div className="space-y-2">
                {capas.map((c, i) => (
                  <div key={i} className="bg-white border border-slate-200/60 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-xs font-semibold text-slate-800">{c.action}</p>
                      <Badge variant={c.type === 'Corrective' ? 'error' : 'info'} size="sm">{c.type}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-slate-500">
                      <span>Assigned: <span className="text-slate-700 font-medium">{c.assignee}</span></span>
                      <span>Due: <span className="text-slate-700 font-medium">{c.due}</span></span>
                      <Badge variant={c.status === 'In Progress' ? 'warning' : 'neutral'} size="sm">{c.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {detailTab === 'Timeline' && (
              <div className="relative">
                <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-100"></div>
                <div className="space-y-4">
                  {timeline.map((t, i) => (
                    <div key={i} className="flex gap-4">
                      <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center ${t.user === 'AI Copilot' ? 'bg-cyan-500' : 'bg-slate-200'}`}>
                        {t.user === 'AI Copilot' ? <span className="text-[8px] text-white font-bold">AI</span> : <CheckCircle className="w-3 h-3 text-slate-500" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] text-slate-400">{t.time}</span>
                          <span className="text-[10px] text-cyan-600 font-medium">{t.user}</span>
                        </div>
                        <p className="text-xs text-slate-700">{t.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {detailTab === 'Related' && (
              <div className="space-y-3">
                <p className="text-[10px] text-slate-500">AI-surfaced similar historical incidents</p>
                {related.map(r => (
                  <div key={r.id} className="flex items-center justify-between bg-white border border-slate-200/60 rounded-xl p-3">
                    <div>
                      <p className="text-[10px] font-mono text-slate-400">{r.id}</p>
                      <p className="text-xs font-medium text-slate-800">{r.title}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={r.similarity > 80 ? 'error' : 'warning'} size="sm">{r.similarity}% match</Badge>
                      <button className="text-[10px] text-cyan-600 hover:underline">View →</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
