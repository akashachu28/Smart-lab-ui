import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Brain, ChevronRight } from 'lucide-react';
import { rootCauses, timeline, evidenceSources } from './data';

export function AIAnalysisTab() {
  return (
    <div className="space-y-4">
      {/* AI Summary */}
      <div className="bg-gradient-to-r from-cyan-50 to-slate-50 border border-cyan-200/40 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-cyan-500 rounded flex items-center justify-center">
            <Brain className="w-3 h-3 text-white" />
          </div>
          <p className="text-xs font-semibold text-slate-700">AI-Generated Summary</p>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          On 10 June 2024, analyst Ahmad Karimi identified anomalous results in Water Quality Testing batch WQ-2024-0441. Investigation indicates <strong>contaminated reagent batch RGT-2024-0441</strong> from external supplier as the primary cause. The batch was not subject to incoming QC verification per SOP-WQ-03. Immediate quarantine was initiated. Five CAPA actions are pending to prevent recurrence.
        </p>
      </div>

      {/* Root Causes */}
      <Card title="AI Root Cause Analysis" subtitle="Probable causes ranked by confidence" className="bg-white/70 border-slate-200/40">
        <div className="space-y-3">
          {rootCauses.map((rc, i) => (
            <div key={i} className="bg-white border border-slate-200/60 rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <p className="text-xs font-semibold text-slate-800 flex-1 pr-4">#{i + 1} {rc.cause}</p>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full" style={{ width: `${rc.confidence}%` }}></div>
                  </div>
                  <Badge variant={rc.confidence > 80 ? 'error' : 'warning'} size="sm">{rc.confidence}%</Badge>
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
              {rc.explanation && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <p className="text-[10px] text-slate-600 leading-relaxed">{rc.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Timeline */}
      <Card title="Timeline Reconstruction" subtitle="Event sequence analysis" className="bg-white/70 border-slate-200/40">
        <div className="relative">
          <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-100"></div>
          <div className="space-y-4">
            {timeline.map((t, i) => (
              <div key={i} className="flex gap-4">
                <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center ${
                  t.type === 'ai' ? 'bg-cyan-500' : 
                  t.type === 'incident' ? 'bg-red-500' :
                  t.type === 'action' ? 'bg-green-500' :
                  'bg-slate-300'
                }`}>
                  {t.type === 'ai' && <span className="text-[8px] text-white font-bold">AI</span>}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] text-slate-400">{t.time}</span>
                    <span className={`text-[10px] font-medium ${
                      t.type === 'ai' ? 'text-cyan-600' : 'text-slate-600'
                    }`}>{t.user}</span>
                  </div>
                  <p className="text-xs text-slate-700">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Evidence Correlation */}
      <Card title="Evidence Correlation" subtitle="Data sources analyzed" className="bg-white/70 border-slate-200/40">
        <div className="grid grid-cols-3 gap-3">
          {evidenceSources.map((source, idx) => (
            <div key={idx} className="bg-slate-50/60 border border-slate-200/40 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-slate-800 mb-1">{source.count.toLocaleString()}</p>
              <p className="text-[10px] text-slate-600">{source.type}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
