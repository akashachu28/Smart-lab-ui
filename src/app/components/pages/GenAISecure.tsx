import { Sparkles, Shield, Database, Zap, FileWarning } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export function GenAISecure() {
  const promptAttacks = [
    { type: 'Prompt Injection', count: 127, severity: 'high', trend: '+15%' },
    { type: 'Jailbreak Attempts', count: 89, severity: 'critical', trend: '+23%' },
    { type: 'System Prompt Extraction', count: 34, severity: 'medium', trend: '-8%' },
    { type: 'Context Manipulation', count: 56, severity: 'high', trend: '+5%' }
  ];

  const ragThreats = [
    { threat: 'Context Poisoning', detected: 12, blocked: 11, status: 'warning' },
    { threat: 'Malicious Documents', detected: 8, blocked: 8, status: 'success' },
    { threat: 'Retrieval Manipulation', detected: 5, blocked: 4, status: 'warning' },
    { threat: 'Data Exfiltration', detected: 3, blocked: 3, status: 'success' }
  ];

  const contentSafety = [
    { metric: 'Toxicity Score', value: 2.3, threshold: 5.0, status: 'success' },
    { metric: 'Hallucination Rate', value: 8.7, threshold: 10.0, status: 'warning' },
    { metric: 'Bias Detection', value: 4.1, threshold: 5.0, status: 'success' },
    { metric: 'Policy Violations', value: 12, threshold: 15, status: 'warning' }
  ];

  return (
    <div className="p-6 min-h-full">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-1">GenAISecure</h2>
        <p className="text-xs text-slate-600">Protect Generative AI and Agentic AI systems</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Attacks Blocked"
          value="2,847"
          subtitle="Last 7 days"
          icon={Shield}
          status="success"
        />
        <MetricCard
          title="Active Agents"
          value="156"
          subtitle="Being monitored"
          icon={Zap}
          status="info"
        />
        <MetricCard
          title="RAG Queries"
          value="45.2K"
          subtitle="Last 24 hours"
          icon={Database}
          status="info"
        />
        <MetricCard
          title="Policy Violations"
          value="12"
          subtitle="Requires review"
          icon={FileWarning}
          status="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Prompt Protection */}
        <Card title="Prompt Protection Feed" subtitle="Real-time attack detection">
          <div className="space-y-3">
            {promptAttacks.map((attack) => (
              <div
                key={attack.type}
                className={`p-4 rounded-lg border ${
                  attack.severity === 'critical'
                    ? 'bg-red-50 border-red-200'
                    : attack.severity === 'high'
                    ? 'bg-orange-50 border-orange-200'
                    : 'bg-amber-50 border-amber-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-slate-900">{attack.type}</div>
                  <Badge
                    variant={
                      attack.severity === 'critical' ? 'error' :
                      attack.severity === 'high' ? 'warning' : 'warning'
                    }
                    size="sm"
                  >
                    {attack.severity}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-700 font-semibold">{attack.count} detections</span>
                  <span className={`font-medium ${
                    attack.trend.startsWith('+') ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {attack.trend} vs last week
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* RAG Security */}
        <Card title="RAG Security Monitor" subtitle="Retrieval-Augmented Generation protection">
          <div className="space-y-3">
            {ragThreats.map((item) => (
              <div key={item.threat} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium text-slate-900">{item.threat}</div>
                  <Badge variant={item.status as any} size="sm">
                    {item.blocked === item.detected ? 'Protected' : 'Partial'}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-slate-600">
                    Detected: <span className="font-semibold text-slate-900">{item.detected}</span>
                  </div>
                  <div className="text-slate-600">
                    Blocked: <span className="font-semibold text-green-600">{item.blocked}</span>
                  </div>
                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(item.blocked / item.detected) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Agent Security Controls */}
        <Card title="Agent Security Controls" subtitle="Agentic AI protection status">
          <div className="space-y-3">
            <div className="p-3 bg-green-50/60 rounded-lg border border-green-200/50">
              <div className="flex items-center justify-between">
                <span className="font-medium text-green-900 text-sm">Tool Call Validation</span>
                <Badge variant="success" size="sm">Active</Badge>
              </div>
              <div className="text-xs text-green-700 mt-0.5">All tool calls sanitized and validated</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <span className="font-medium text-green-900">API Access Control</span>
                <Badge variant="success" size="sm">Active</Badge>
              </div>
              <div className="text-sm text-green-700 mt-1">Rate limiting and permission checks enabled</div>
            </div>
            <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
              <div className="flex items-center justify-between">
                <span className="font-medium text-cyan-900">Multi-Agent Communication</span>
                <Badge variant="info" size="sm">Monitored</Badge>
              </div>
              <div className="text-sm text-cyan-700 mt-1">156 agent interactions logged today</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <span className="font-medium text-green-900">Escalation Prevention</span>
                <Badge variant="success" size="sm">Active</Badge>
              </div>
              <div className="text-sm text-green-700 mt-1">Privilege escalation attempts blocked</div>
            </div>
          </div>
        </Card>

        {/* Content Safety */}
        <Card title="Content Safety Dashboard" subtitle="Output quality and compliance monitoring">
          <div className="space-y-4">
            {contentSafety.map((item) => (
              <div key={item.metric} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">{item.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">
                      {item.value} / {item.threshold}
                    </span>
                    <Badge variant={item.status as any} size="sm">
                      {item.value < item.threshold ? 'Good' : 'Review'}
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.value < item.threshold * 0.7 ? 'bg-green-500' :
                      item.value < item.threshold ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(item.value / item.threshold) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
