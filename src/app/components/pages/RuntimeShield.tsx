import { Activity, TrendingUp, AlertTriangle } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function RuntimeShield() {
  const attackTrend = [
    { time: '00:00', attacks: 12 },
    { time: '04:00', attacks: 8 },
    { time: '08:00', attacks: 25 },
    { time: '12:00', attacks: 45 },
    { time: '16:00', attacks: 38 },
    { time: '20:00', attacks: 22 },
    { time: '23:59', attacks: 15 }
  ];

  const riskScoreTrend = [
    { time: '00:00', score: 42 },
    { time: '04:00', score: 38 },
    { time: '08:00', score: 55 },
    { time: '12:00', score: 68 },
    { time: '16:00', score: 62 },
    { time: '20:00', score: 48 },
    { time: '23:59', score: 45 }
  ];

  const requestThreats = [
    { type: 'Adversarial Inputs', count: 234, blocked: 228, severity: 'high' },
    { type: 'Extraction Attempts', count: 89, blocked: 85, severity: 'critical' },
    { type: 'Prompt Attacks', count: 156, blocked: 149, severity: 'high' },
    { type: 'API Abuse', count: 67, blocked: 63, severity: 'medium' }
  ];

  const responseThreats = [
    { type: 'PII Leakage', count: 12, blocked: 12, severity: 'critical' },
    { type: 'Sensitive Data Exposure', count: 8, blocked: 7, severity: 'high' },
    { type: 'Hallucinations', count: 45, blocked: 38, severity: 'medium' },
    { type: 'Policy Violations', count: 23, blocked: 21, severity: 'medium' }
  ];

  const incidents = [
    { id: '#INC-2847', type: 'PII Leak Attempt', severity: 'critical', time: '2 min ago', status: 'blocked' },
    { id: '#INC-2846', type: 'Model Extraction', severity: 'high', time: '15 min ago', status: 'blocked' },
    { id: '#INC-2845', type: 'Jailbreak Attempt', severity: 'high', time: '1 hour ago', status: 'blocked' },
    { id: '#INC-2844', type: 'API Rate Limit', severity: 'medium', time: '2 hours ago', status: 'throttled' }
  ];

  return (
    <div className="p-6 min-h-full">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-1">RuntimeShield</h2>
        <p className="text-xs text-slate-600">Production AI firewall and runtime monitoring</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Requests Monitored"
          value="1.2M"
          subtitle="Last 24 hours"
          icon={Activity}
          status="info"
        />
        <MetricCard
          title="Threats Blocked"
          value="546"
          subtitle="+12% vs yesterday"
          icon={AlertTriangle}
          status="warning"
          trend="up"
          trendValue="+12%"
        />
        <MetricCard
          title="Current Risk Score"
          value="45"
          subtitle="Moderate risk level"
          icon={TrendingUp}
          status="warning"
        />
        <MetricCard
          title="Active Incidents"
          value="3"
          subtitle="Under investigation"
          icon={AlertTriangle}
          status="error"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card title="Attack Trends" subtitle="Last 24 hours">
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={attackTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              />
              <Area type="monotone" dataKey="attacks" stroke="#ef4444" fill="#fee2e2" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Real-Time Risk Score" subtitle="Last 24 hours">
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={riskScoreTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              />
              <Line type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Request Monitoring */}
        <Card title="Request Monitoring" subtitle="Inbound threat detection">
          <div className="space-y-3">
            {requestThreats.map((threat) => (
              <div key={threat.type} className="p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-slate-900">{threat.type}</div>
                  <Badge
                    variant={
                      threat.severity === 'critical' ? 'error' :
                      threat.severity === 'high' ? 'warning' : 'info'
                    }
                    size="sm"
                  >
                    {threat.severity}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-600">
                    {threat.count} detected
                  </span>
                  <span className="text-green-600 font-medium">
                    {threat.blocked} blocked
                  </span>
                  <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: `${(threat.blocked / threat.count) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Response Monitoring */}
        <Card title="Response Monitoring" subtitle="Outbound data protection">
          <div className="space-y-3">
            {responseThreats.map((threat) => (
              <div key={threat.type} className="p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-slate-900">{threat.type}</div>
                  <Badge
                    variant={
                      threat.severity === 'critical' ? 'error' :
                      threat.severity === 'high' ? 'warning' : 'info'
                    }
                    size="sm"
                  >
                    {threat.severity}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-600">
                    {threat.count} detected
                  </span>
                  <span className="text-green-600 font-medium">
                    {threat.blocked} blocked
                  </span>
                  <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: `${(threat.blocked / threat.count) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Incident Timeline */}
      <Card title="Incident Timeline" subtitle="Recent security events">
        <div className="space-y-3">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className={`p-4 rounded-lg border ${
                incident.severity === 'critical' ? 'bg-red-50 border-red-200' :
                incident.severity === 'high' ? 'bg-orange-50 border-orange-200' :
                'bg-amber-50 border-amber-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-medium text-slate-700">{incident.id}</span>
                  <span className="font-medium text-slate-900">{incident.type}</span>
                  <Badge
                    variant={
                      incident.severity === 'critical' ? 'error' :
                      incident.severity === 'high' ? 'warning' : 'warning'
                    }
                    size="sm"
                  >
                    {incident.severity}
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-600">{incident.time}</span>
                  <Badge variant={incident.status === 'blocked' ? 'success' : 'warning'} size="sm">
                    {incident.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
