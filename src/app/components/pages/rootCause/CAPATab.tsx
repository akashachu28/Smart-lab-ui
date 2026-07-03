import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { capaActions } from './data';

export function CAPATab() {
  const capaStats = {
    open: capaActions.filter(c => c.status === 'Pending' || c.status === 'In Progress').length,
    inProgress: capaActions.filter(c => c.status === 'In Progress').length,
    completed: 248,
    overdue: 4,
  };

  return (
    <div className="space-y-4">
      {/* CAPA Stats */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/40 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-slate-800 mb-1">{capaStats.open}</div>
          <p className="text-xs text-slate-600">Open</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/40 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-slate-800 mb-1">{capaStats.inProgress}</div>
          <p className="text-xs text-slate-600">In Progress</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/40 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-slate-800 mb-1">{capaStats.completed}</div>
          <p className="text-xs text-slate-600">Completed</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200/40 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-slate-800 mb-1">{capaStats.overdue}</div>
          <p className="text-xs text-slate-600">Overdue</p>
        </div>
      </div>

      {/* CAPA Recommendations */}
      <Card title="CAPA Recommendations" subtitle="Corrective and preventive actions" className="bg-white/70 border-slate-200/40">
        <div className="space-y-2">
          {capaActions.map((c, i) => (
            <div key={i} className={`bg-white border rounded-xl p-4 ${
              c.priority === 'Critical' ? 'border-red-200' : 'border-slate-200/60'
            }`}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-xs font-semibold text-slate-800 flex-1">{c.action}</p>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Badge variant={c.type === 'Corrective' ? 'error' : 'info'} size="sm">{c.type}</Badge>
                  {c.priority && (
                    <Badge 
                      variant={
                        c.priority === 'Critical' ? 'error' :
                        c.priority === 'High' ? 'warning' :
                        c.priority === 'Medium' ? 'info' :
                        'neutral'
                      } 
                      size="sm"
                    >
                      {c.priority}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 text-[10px] text-slate-500">
                <span>Assigned: <span className="text-slate-700 font-medium">{c.assignee}</span></span>
                <span>Due: <span className="text-slate-700 font-medium">{c.due}</span></span>
                <Badge variant={
                  c.status === 'Completed' ? 'success' :
                  c.status === 'In Progress' ? 'info' :
                  c.status === 'Overdue' ? 'error' :
                  'warning'
                } size="sm">{c.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI CAPA Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-cyan-50 border border-purple-100 rounded-xl p-4">
        <p className="text-xs font-semibold text-slate-700 mb-3">AI CAPA Summary</p>
        <div className="space-y-2">
          {[
            { timeframe: 'Immediate', action: 'Replace defective valve.', color: 'text-red-600' },
            { timeframe: 'Within 24 Hours', action: 'Inspect similar valves.', color: 'text-amber-600' },
            { timeframe: 'Within 7 Days', action: 'Review maintenance schedule.', color: 'text-blue-600' },
            { timeframe: 'Within 30 Days', action: 'Update inspection procedure.', color: 'text-green-600' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 p-2 bg-white/60 rounded-lg">
              <span className={`text-[10px] font-bold ${item.color} min-w-[90px]`}>{item.timeframe}</span>
              <span className="text-xs text-slate-700">{item.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
