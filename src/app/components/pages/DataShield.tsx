import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export function DataShield() {
  const qualityIssues = [
    { type: 'Missing Labels', count: 247, severity: 'warning' },
    { type: 'Class Imbalance', count: 12, severity: 'error' },
    { type: 'Duplicate Data', count: 89, severity: 'warning' },
    { type: 'Outliers Detected', count: 34, severity: 'info' }
  ];

  const securityThreats = [
    { type: 'Data Poisoning', detected: 5, status: 'critical', timestamp: '2h ago' },
    { type: 'Label Poisoning', detected: 3, status: 'critical', timestamp: '5h ago' },
    { type: 'Backdoor Samples', detected: 2, status: 'high', timestamp: '1d ago' },
    { type: 'Trigger Patterns', detected: 0, status: 'safe', timestamp: 'Never' }
  ];

  return (
    <div className="p-6 min-h-full">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-1">DataShield</h2>
        <p className="text-xs text-slate-600">Secure training datasets before model development</p>
      </div>

      {/* Risk Scoring Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MetricCard
          title="Dataset Quality Score"
          value="87/100"
          subtitle="Good quality with minor issues"
          icon={Shield}
          status="success"
          trend="up"
          trendValue="+3% from last scan"
        />
        <MetricCard
          title="Dataset Security Score"
          value="72/100"
          subtitle="Security concerns detected"
          icon={AlertTriangle}
          status="warning"
          trend="down"
          trendValue="-5% from last scan"
        />
        <MetricCard
          title="Dataset Trust Score"
          value="79/100"
          subtitle="Moderate trust level"
          icon={CheckCircle}
          status="info"
          trend="neutral"
          trendValue="No change"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Dataset Quality Assessment */}
        <Card title="Dataset Quality Assessment" subtitle="Structural and consistency validation">
          <div className="space-y-2.5">
            {qualityIssues.map((issue) => (
              <div key={issue.type} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-lg">
                <div className="flex items-center gap-2">
                  {issue.severity === 'error' ? (
                    <XCircle className="w-4 h-4 text-red-500" />
                  ) : issue.severity === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-cyan-500" />
                  )}
                  <span className="font-medium text-slate-700 text-sm">{issue.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-slate-900">{issue.count}</span>
                  <Badge variant={issue.severity === 'error' ? 'error' : issue.severity === 'warning' ? 'warning' : 'info'}>
                    {issue.severity}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Security Assessment Alerts */}
        <Card title="Security Assessment Alerts" subtitle="Active threat detection results">
          <div className="space-y-2.5">
            {securityThreats.map((threat) => (
              <div
                key={threat.type}
                className={`p-3 rounded-lg border ${
                  threat.status === 'critical'
                    ? 'bg-red-50 border-red-200'
                    : threat.status === 'high'
                    ? 'bg-orange-50 border-orange-200'
                    : 'bg-green-50 border-green-200'
                }`}
              >
                <div className="flex items-start justify-between mb-1.5">
                  <div className="font-medium text-slate-900 text-sm">{threat.type}</div>
                  <Badge
                    variant={
                      threat.status === 'critical'
                        ? 'error'
                        : threat.status === 'high'
                        ? 'warning'
                        : 'success'
                    }
                    size="sm"
                  >
                    {threat.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-semibold ${
                    threat.detected > 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {threat.detected > 0 ? `${threat.detected} instances detected` : 'No threats'}
                  </span>
                  <span className="text-slate-500 text-[10px]">{threat.timestamp}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:shadow-md transition-all duration-200 font-medium text-xs backdrop-blur-sm">
            Run Full Security Scan
          </button>
        </Card>
      </div>
    </div>
  );
}
