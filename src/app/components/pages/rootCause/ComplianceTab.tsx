import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { CheckCircle, XCircle } from 'lucide-react';
import { complianceMetrics, complianceChecklist } from './data';

export function ComplianceTab() {
  const investigationStatus = [
    { stage: 'Incident Reported', status: 'Completed', timestamp: '2024-06-10 08:15' },
    { stage: 'Evidence Collection', status: 'Completed', timestamp: '2024-06-10 09:18' },
    { stage: 'Root Cause Analysis', status: 'Completed', timestamp: '2024-06-10 10:05' },
    { stage: 'CAPA Development', status: 'In Progress', timestamp: '2024-06-10 10:34' },
    { stage: 'Management Review', status: 'Pending', timestamp: '—' },
    { stage: 'Investigation Closure', status: 'Pending', timestamp: '—' },
  ];

  const regulatoryRequirements = [
    { requirement: 'Incident Notification (within 24h)', status: true, timestamp: '2024-06-10 09:30' },
    { requirement: 'Preliminary Report (within 48h)', status: true, timestamp: '2024-06-10 14:20' },
    { requirement: 'Root Cause Analysis Report (within 7 days)', status: false, timestamp: 'Due 2024-06-17' },
    { requirement: 'CAPA Implementation (within 30 days)', status: false, timestamp: 'Due 2024-07-10' },
  ];

  return (
    <div className="space-y-4">
      {/* Compliance Metrics */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/40 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-slate-800 mb-1">{complianceMetrics.investigationsComplete}%</div>
          <p className="text-xs text-slate-600">Investigations Complete</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/40 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-slate-800 mb-1">{complianceMetrics.capaCompliance}%</div>
          <p className="text-xs text-slate-600">CAPA Compliance</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/40 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-slate-800 mb-1">{complianceMetrics.auditReadiness}%</div>
          <p className="text-xs text-slate-600">Audit Readiness</p>
        </div>
        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 border border-cyan-200/40 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-slate-800 mb-1">{complianceMetrics.regulatoryReporting}%</div>
          <p className="text-xs text-slate-600">Regulatory Reporting</p>
        </div>
      </div>

      {/* Investigation Status */}
      <Card title="Investigation Status" subtitle="Workflow progression" className="bg-white/70 border-slate-200/40">
        <div className="space-y-2">
          {investigationStatus.map((stage, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50/60 border border-slate-200/40 rounded-lg">
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                  stage.status === 'Completed' ? 'bg-green-100' :
                  stage.status === 'In Progress' ? 'bg-blue-100' :
                  'bg-slate-100'
                }`}>
                  {stage.status === 'Completed' ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <span className="text-[10px] font-bold text-slate-600">{idx + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-800">{stage.stage}</p>
                  <p className="text-[10px] text-slate-500">{stage.timestamp}</p>
                </div>
              </div>
              <Badge 
                variant={
                  stage.status === 'Completed' ? 'success' :
                  stage.status === 'In Progress' ? 'info' : 'neutral'
                } 
                size="sm"
              >
                {stage.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Compliance Checklist */}
      <Card title="Compliance Checklist" subtitle="Required documentation" className="bg-white/70 border-slate-200/40">
        <div className="grid grid-cols-2 gap-2">
          {complianceChecklist.map((item, idx) => (
            <div key={idx} className={`flex items-center gap-2 p-2 rounded-lg border ${
              item.status ? 'bg-green-50/50 border-green-200/40' : 'bg-amber-50/50 border-amber-200/40'
            }`}>
              {item.status ? (
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              )}
              <span className="text-xs text-slate-700">{item.item}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Regulatory Requirements */}
      <Card title="Regulatory Requirements" subtitle="Mandatory reporting and timelines" className="bg-white/70 border-slate-200/40">
        <div className="space-y-2">
          {regulatoryRequirements.map((req, idx) => (
            <div key={idx} className={`flex items-center justify-between p-3 rounded-lg border ${
              req.status ? 'bg-green-50/50 border-green-200/40' : 'bg-amber-50/50 border-amber-200/40'
            }`}>
              <div className="flex-1">
                <p className="text-xs font-medium text-slate-800 mb-0.5">{req.requirement}</p>
                <p className="text-[10px] text-slate-500">{req.timestamp}</p>
              </div>
              <Badge variant={req.status ? 'success' : 'warning'} size="sm">
                {req.status ? 'Completed' : 'Pending'}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Audit Trail */}
      <Card title="Audit Trail" subtitle="Complete investigation history" className="bg-white/70 border-slate-200/40">
        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {[
            { time: '2024-06-10 08:15', action: 'Incident created', user: 'Ahmad Karimi' },
            { time: '2024-06-10 08:22', action: 'Severity classification updated', user: 'System' },
            { time: '2024-06-10 09:00', action: 'Evidence uploaded (18 documents)', user: 'Investigation Team' },
            { time: '2024-06-10 09:30', action: 'Regulatory notification sent', user: 'Compliance Officer' },
            { time: '2024-06-10 10:05', action: 'AI RCA analysis completed', user: 'AI Copilot' },
            { time: '2024-06-10 10:34', action: 'CAPA actions assigned', user: 'Lab Manager' },
            { time: '2024-06-10 14:20', action: 'Preliminary report submitted', user: 'Investigation Lead' },
          ].map((entry, idx) => (
            <div key={idx} className="flex items-start gap-3 p-2 bg-slate-50/60 border border-slate-200/40 rounded-lg">
              <div className="text-[10px] text-slate-400 min-w-[65px]">{entry.time.split(' ')[1]}</div>
              <div className="flex-1">
                <p className="text-xs text-slate-700">{entry.action}</p>
                <p className="text-[10px] text-slate-500">{entry.user}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
