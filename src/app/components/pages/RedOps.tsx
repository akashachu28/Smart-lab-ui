import { Swords, Target, FileText, Download } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export function RedOps() {
  const targets = [
    { name: 'LLM Applications', icon: '🤖', count: 24, lastTest: '2 days ago' },
    { name: 'RAG Systems', icon: '📚', count: 12, lastTest: '1 day ago' },
    { name: 'AI Agents', icon: '⚡', count: 18, lastTest: '3 hours ago' },
    { name: 'Computer Vision APIs', icon: '👁️', count: 8, lastTest: '1 week ago' },
    { name: 'Speech Systems', icon: '🎤', count: 5, lastTest: '5 days ago' }
  ];

  const attackLibraries = [
    { name: 'OWASP LLM Top 10', attacks: 47, enabled: true },
    { name: 'MITRE ATLAS', attacks: 89, enabled: true },
    { name: 'Adversarial ML Attacks', attacks: 156, enabled: true },
    { name: 'Custom Enterprise Threats', attacks: 23, enabled: false }
  ];

  const recentTests = [
    {
      target: 'customer-support-llm',
      framework: 'OWASP LLM',
      vulnerabilities: 7,
      severity: 'high',
      date: '2024-06-01',
      status: 'completed'
    },
    {
      target: 'image-classifier-prod',
      framework: 'Adversarial ML',
      vulnerabilities: 3,
      severity: 'medium',
      date: '2024-05-30',
      status: 'completed'
    },
    {
      target: 'rag-knowledge-base',
      framework: 'MITRE ATLAS',
      vulnerabilities: 12,
      severity: 'critical',
      date: '2024-05-28',
      status: 'completed'
    },
    {
      target: 'voice-assistant-v2',
      framework: 'Custom',
      vulnerabilities: 5,
      severity: 'medium',
      date: '2024-05-25',
      status: 'completed'
    }
  ];

  return (
    <div className="p-6 min-h-full">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-1">RedOps</h2>
        <p className="text-xs text-slate-600">Automated AI Red Teaming Platform</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Total Tests Run"
          value="847"
          subtitle="All time"
          icon={Swords}
          status="info"
        />
        <MetricCard
          title="Vulnerabilities Found"
          value="127"
          subtitle="Last 30 days"
          icon={Target}
          status="warning"
        />
        <MetricCard
          title="Critical Issues"
          value="8"
          subtitle="Requires attention"
          icon={FileText}
          status="error"
        />
        <MetricCard
          title="Attack Patterns"
          value="315"
          subtitle="In library"
          icon={Swords}
          status="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* One-Click Testing */}
        <Card title="One-Click Security Testing" subtitle="Select target system to test">
          <div className="grid grid-cols-1 gap-3 mb-4">
            {targets.map((target) => (
              <button
                key={target.name}
                className="p-3 text-left bg-slate-50/60 hover:bg-slate-100 rounded-lg border border-slate-200/60 hover:border-cyan-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{target.icon}</span>
                    <div>
                      <div className="font-medium text-slate-900 text-sm">{target.name}</div>
                      <div className="text-xs text-slate-600">{target.count} instances</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Last: {target.lastTest}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <button className="w-full px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-md transition-all duration-200 font-medium text-xs">
            Launch Red Team Test
          </button>
        </Card>

        {/* Attack Library */}
        <Card title="Attack Library Configuration" subtitle="Select attack frameworks">
          <div className="space-y-3">
            {attackLibraries.map((library) => (
              <div
                key={library.name}
                className={`p-3 rounded-lg border ${
                  library.enabled
                    ? 'bg-cyan-50 border-cyan-200'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="font-medium text-slate-900 text-sm">{library.name}</div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={library.enabled}
                      readOnly
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>
                <div className="text-xs text-slate-600">
                  {library.attacks} attack patterns available
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-lg hover:shadow-md transition-all duration-200 font-medium text-xs">
            Configure Custom Attacks
          </button>
        </Card>
      </div>

      {/* Recent Tests & Reports */}
      <div className="grid grid-cols-1 gap-4">
        <Card
          title="Recent Red Team Tests"
          subtitle="Test history and results"
          actions={
            <button className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:shadow-md transition-all duration-200 text-xs font-medium">
              <Download className="w-3.5 h-3.5" />
              Export All Reports
            </button>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 px-3 font-medium text-slate-700 text-xs">Target</th>
                  <th className="text-left py-2 px-3 font-medium text-slate-700 text-xs">Framework</th>
                  <th className="text-left py-2 px-3 font-medium text-slate-700 text-xs">Vulnerabilities</th>
                  <th className="text-left py-2 px-3 font-medium text-slate-700 text-xs">Severity</th>
                  <th className="text-left py-2 px-3 font-medium text-slate-700 text-xs">Date</th>
                  <th className="text-left py-2 px-3 font-medium text-slate-700 text-xs">Status</th>
                  <th className="text-left py-2 px-3 font-medium text-slate-700 text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentTests.map((test, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-2 px-3 font-mono text-xs text-slate-900">{test.target}</td>
                    <td className="py-2 px-3 text-xs text-slate-700">{test.framework}</td>
                    <td className="py-2 px-3">
                      <span className="font-semibold text-slate-900 text-xs">{test.vulnerabilities}</span>
                    </td>
                    <td className="py-2 px-3">
                      <Badge
                        variant={
                          test.severity === 'critical' ? 'error' :
                          test.severity === 'high' ? 'warning' : 'info'
                        }
                        size="sm"
                      >
                        {test.severity}
                      </Badge>
                    </td>
                    <td className="py-2 px-3 text-xs text-slate-600">{test.date}</td>
                    <td className="py-2 px-3">
                      <Badge variant="success" size="sm">{test.status}</Badge>
                    </td>
                    <td className="py-2 px-3">
                      <button className="flex items-center gap-1 text-xs text-cyan-600 hover:text-cyan-700 font-medium">
                        <Download className="w-3.5 h-3.5" />
                        Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
