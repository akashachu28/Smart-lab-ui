import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { riskAssessment } from './data';

export function RiskAssessmentTab() {
  const riskBreakdown = [
    { category: 'Safety Risk', value: riskAssessment.safety, color: '#ef4444', description: 'Potential harm to personnel' },
    { category: 'Environmental Risk', value: riskAssessment.environmental, color: '#10b981', description: 'Environmental impact potential' },
    { category: 'Operational Risk', value: riskAssessment.operational, color: '#f59e0b', description: 'Business disruption potential' },
    { category: 'Compliance Risk', value: riskAssessment.compliance, color: '#8b5cf6', description: 'Regulatory violation potential' },
  ];

  const riskMatrix = [
    { likelihood: 'Very Likely', severity: ['Medium', 'High', 'Critical', 'Critical', 'Critical'] },
    { likelihood: 'Likely', severity: ['Low', 'Medium', 'High', 'Critical', 'Critical'] },
    { likelihood: 'Moderate', severity: ['Low', 'Low', 'Medium', 'High', 'Critical'] },
    { likelihood: 'Unlikely', severity: ['Low', 'Low', 'Low', 'Medium', 'High'] },
    { likelihood: 'Rare', severity: ['Low', 'Low', 'Low', 'Low', 'Medium'] },
  ];

  const severityLabels = ['Insignificant', 'Minor', 'Moderate', 'Major', 'Catastrophic'];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'bg-red-500 text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-slate-800';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-slate-200 text-slate-600';
    }
  };

  return (
    <div className="space-y-4">
      {/* Overall Risk Assessment */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200/40 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-semibold text-slate-700 mb-1">Overall Risk Level</p>
            <p className="text-xs text-slate-600">Based on AI multi-factor analysis</p>
          </div>
          <Badge variant="error" size="sm" className="text-base px-4 py-2">{riskAssessment.overall}</Badge>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          This incident poses a <strong>High</strong> overall risk with significant safety implications. Immediate corrective action is required to prevent recurrence.
        </p>
      </div>

      {/* Risk Breakdown */}
      <Card title="Risk Breakdown" subtitle="By category" className="bg-white/70 border-slate-200/40">
        <div className="space-y-3">
          {riskBreakdown.map((risk) => (
            <div key={risk.category}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-700">{risk.category}</p>
                  <p className="text-[10px] text-slate-500">{risk.description}</p>
                </div>
                <span className="text-xs font-bold" style={{ color: risk.color }}>{risk.value}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500" 
                  style={{ width: `${risk.value}%`, backgroundColor: risk.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Risk Matrix */}
      <Card title="Risk Matrix" subtitle="Likelihood vs. Severity assessment" className="bg-white/70 border-slate-200/40">
        <div className="overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-[9px] text-slate-500 font-medium p-2 border border-slate-200 bg-slate-50/50 w-24">
                  Likelihood →<br />Severity ↓
                </th>
                {severityLabels.map((label) => (
                  <th key={label} className="text-[9px] text-slate-500 font-medium p-2 border border-slate-200 bg-slate-50/50">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {riskMatrix.map((row, i) => (
                <tr key={i}>
                  <td className="text-[9px] text-slate-600 font-medium p-2 border border-slate-200 bg-slate-50/50">
                    {row.likelihood}
                  </td>
                  {row.severity.map((cell, j) => (
                    <td key={j} className={`p-2 border border-slate-200 text-center`}>
                      <div className={`text-[10px] font-bold rounded py-1 ${getRiskColor(cell)}`}>
                        {cell}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-200">
          <p className="text-xs text-slate-700 mb-2">
            <strong>Current Incident:</strong> Moderate Likelihood × Major Severity = <Badge variant="error" size="sm">High Risk</Badge>
          </p>
          <p className="text-[10px] text-slate-600">
            The incident is positioned in the <strong>High Risk</strong> zone requiring immediate management attention and corrective action.
          </p>
        </div>
      </Card>

      {/* Risk Mitigation Actions */}
      <Card title="Risk Mitigation Actions" subtitle="Recommended controls" className="bg-white/70 border-slate-200/40">
        <div className="space-y-2">
          {[
            { action: 'Immediate shutdown and isolation of affected equipment', priority: 'Critical', status: 'Completed' },
            { action: 'Deploy temporary safety controls and monitoring', priority: 'Critical', status: 'In Progress' },
            { action: 'Conduct hazard analysis for similar equipment', priority: 'High', status: 'Pending' },
            { action: 'Update risk assessment documentation', priority: 'Medium', status: 'Pending' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50/60 border border-slate-200/40 rounded-lg">
              <p className="text-xs text-slate-700 flex-1">{item.action}</p>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={
                    item.priority === 'Critical' ? 'error' :
                    item.priority === 'High' ? 'warning' : 'info'
                  } 
                  size="sm"
                >
                  {item.priority}
                </Badge>
                <Badge 
                  variant={
                    item.status === 'Completed' ? 'success' :
                    item.status === 'In Progress' ? 'info' : 'neutral'
                  } 
                  size="sm"
                >
                  {item.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
