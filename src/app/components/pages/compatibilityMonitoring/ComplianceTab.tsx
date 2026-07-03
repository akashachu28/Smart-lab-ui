import { Card } from '../../ui/Card';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { complianceMetrics, complianceChecklist, correctiveActions } from './data';
import { Badge } from '../../ui/Badge';

export function ComplianceTab() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Compliance Metrics */}
      <Card title="Compliance Metrics" subtitle="Current period performance" className="col-span-2 bg-white/70 border-slate-200/40">
        <div className="grid grid-cols-2 gap-4">
          {complianceMetrics.map((metric, idx) => (
            <div key={idx} className="p-3 bg-slate-50/60 border border-slate-200/40 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-600">{metric.category}</span>
                <Badge variant={metric.status === 'Compliant' ? 'success' : 'warning'} size="sm">
                  {metric.status}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold text-slate-800">{metric.score}%</div>
                <div className="flex-1">
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        metric.score >= 98 ? 'bg-green-400' : 
                        metric.score >= 95 ? 'bg-amber-400' : 
                        'bg-red-400'
                      }`} 
                      style={{ width: `${metric.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Compliance Checklist */}
      <Card title="Compliance Checklist" subtitle="Required safety checks" className="col-span-1 bg-white/70 border-slate-200/40">
        <div className="space-y-2.5">
          {complianceChecklist.map((check, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-slate-50/60 border border-slate-200/40 rounded-lg">
              <span className="text-xs text-slate-700">{check.item}</span>
              {check.status ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-500" />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Corrective Actions */}
      <Card title="Corrective Actions Dashboard" subtitle="Pending safety actions" className="col-span-3 bg-white/70 border-slate-200/40">
        <div className="overflow-hidden rounded-lg border border-slate-200/40">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Issue</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Assigned To</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Due</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {correctiveActions.map((action, idx) => (
                <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3 text-slate-700 font-medium">{action.issue}</td>
                  <td className="px-4 py-3 text-slate-600">{action.assignedTo}</td>
                  <td className="px-4 py-3 text-slate-600">{action.due}</td>
                  <td className="px-4 py-3">
                    <Badge 
                      variant={
                        action.status === 'Completed' ? 'success' :
                        action.status === 'In Progress' ? 'info' :
                        action.status === 'Overdue' ? 'error' :
                        'warning'
                      } 
                      size="sm"
                    >
                      {action.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
