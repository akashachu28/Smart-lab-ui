import { GitBranch, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export function AISecOps() {
  const integrations = [
    { name: 'Kubeflow', status: 'connected', lastSync: '5 min ago' },
    { name: 'MLflow', status: 'connected', lastSync: '12 min ago' },
    { name: 'GitHub', status: 'connected', lastSync: '2 min ago' },
    { name: 'GitLab', status: 'disconnected', lastSync: 'Never' },
    { name: 'HuggingFace', status: 'connected', lastSync: '1 hour ago' },
    { name: 'Azure ML', status: 'connected', lastSync: '15 min ago' },
    { name: 'SageMaker', status: 'warning', lastSync: '3 hours ago' },
    { name: 'Vertex AI', status: 'connected', lastSync: '8 min ago' }
  ];

  const securityGates = [
    {
      name: 'Risk Score Threshold',
      description: 'Block deployment if risk score > 75',
      status: 'active',
      blocked: 3,
      passed: 47
    },
    {
      name: 'Robustness Score Policy',
      description: 'Require robustness score ≥ 70',
      status: 'active',
      blocked: 5,
      passed: 45
    },
    {
      name: 'Compliance Validation',
      description: 'Enforce ISO 42001 compliance',
      status: 'active',
      blocked: 2,
      passed: 48
    }
  ];

  const recentDeployments = [
    { model: 'sentiment-classifier-v2', status: 'passed', timestamp: '10 min ago', riskScore: 42 },
    { model: 'fraud-detection-ml', status: 'blocked', timestamp: '1 hour ago', riskScore: 82 },
    { model: 'image-classifier-v3', status: 'passed', timestamp: '2 hours ago', riskScore: 38 },
    { model: 'llm-assistant-beta', status: 'blocked', timestamp: '3 hours ago', riskScore: 79 },
    { model: 'speech-recognition-v1', status: 'passed', timestamp: '5 hours ago', riskScore: 45 }
  ];

  return (
    <div className="p-6 min-h-full">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-1">AISecOps</h2>
        <p className="text-xs text-slate-600">Integrate security into AI development pipelines</p>
      </div>

      {/* Integration Hub */}
      <Card title="Integration Hub" subtitle="Platform connections and sync status" className="mb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className={`p-3 rounded-lg border ${
                integration.status === 'connected'
                  ? 'bg-green-50 border-green-200'
                  : integration.status === 'warning'
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between mb-1.5">
                <div className="font-medium text-slate-900 text-sm">{integration.name}</div>
                {integration.status === 'connected' ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : integration.status === 'warning' ? (
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-600">
                <Clock className="w-2.5 h-2.5" />
                {integration.lastSync}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Security Gates */}
        <Card title="Deployment Security Gates" subtitle="Active policy enforcement">
          <div className="space-y-4">
            {securityGates.map((gate) => (
              <div key={gate.name} className="p-3 bg-slate-50/50 rounded-lg">
                <div className="flex items-start justify-between mb-1.5">
                  <div>
                    <div className="font-medium text-slate-900 text-sm">{gate.name}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{gate.description}</div>
                  </div>
                  <Badge variant="success" size="sm">{gate.status}</Badge>
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-slate-700">{gate.passed} passed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5 text-red-600" />
                    <span className="text-slate-700">{gate.blocked} blocked</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-lg hover:shadow-md transition-all duration-200 font-medium text-xs">
            Configure Policies
          </button>
        </Card>

        {/* Recent Deployments */}
        <Card title="Recent Deployment Attempts" subtitle="Last 24 hours">
          <div className="space-y-3">
            {recentDeployments.map((deployment, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  deployment.status === 'passed'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex-1">
                    <div className="font-medium text-slate-900 font-mono text-xs">
                      {deployment.model}
                    </div>
                    <div className="text-[10px] text-slate-600 mt-0.5">{deployment.timestamp}</div>
                  </div>
                  <Badge
                    variant={deployment.status === 'passed' ? 'success' : 'error'}
                    size="sm"
                  >
                    {deployment.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-slate-700">
                    Risk Score: <span className="font-semibold">{deployment.riskScore}</span>
                  </div>
                  <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        deployment.riskScore > 75 ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${deployment.riskScore}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
