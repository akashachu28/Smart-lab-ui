import { Scale, Database, CheckCircle, XCircle, FileText } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export function GovernAI() {
  const complianceStandards = [
    { name: 'ISO 42001', status: 'compliant', score: 94, lastAudit: '2024-05-15' },
    { name: 'ISO 27001', status: 'compliant', score: 98, lastAudit: '2024-05-10' },
    { name: 'NIST AI RMF', status: 'partial', score: 76, lastAudit: '2024-05-20' },
    { name: 'EU AI Act', status: 'compliant', score: 89, lastAudit: '2024-05-18' },
    { name: 'SOC 2', status: 'compliant', score: 96, lastAudit: '2024-05-12' }
  ];

  const aiAssets = [
    {
      id: 'MDL-2847',
      name: 'customer-sentiment-llm',
      type: 'Model',
      owner: 'ML Team',
      riskScore: 42,
      compliance: 'compliant',
      lastUpdated: '2024-05-30'
    },
    {
      id: 'DS-1923',
      name: 'customer-feedback-dataset',
      type: 'Dataset',
      owner: 'Data Team',
      riskScore: 28,
      compliance: 'compliant',
      lastUpdated: '2024-05-28'
    },
    {
      id: 'PIP-5621',
      name: 'fraud-detection-pipeline',
      type: 'Pipeline',
      owner: 'MLOps Team',
      riskScore: 56,
      compliance: 'review',
      lastUpdated: '2024-06-01'
    },
    {
      id: 'AGT-8834',
      name: 'support-agent-orchestrator',
      type: 'Agent',
      owner: 'AI Team',
      riskScore: 67,
      compliance: 'review',
      lastUpdated: '2024-06-02'
    },
    {
      id: 'VDB-3345',
      name: 'knowledge-base-vectors',
      type: 'Vector DB',
      owner: 'Data Team',
      riskScore: 34,
      compliance: 'compliant',
      lastUpdated: '2024-05-25'
    }
  ];

  return (
    <div className="p-6 min-h-full">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-1">GovernAI</h2>
        <p className="text-xs text-slate-600">Governance, compliance, and auditability</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Overall Compliance"
          value="91%"
          subtitle="Across all standards"
          icon={CheckCircle}
          status="success"
        />
        <MetricCard
          title="Total AI Assets"
          value="287"
          subtitle="Being tracked"
          icon={Database}
          status="info"
        />
        <MetricCard
          title="Pending Reviews"
          value="12"
          subtitle="Requires attention"
          icon={FileText}
          status="warning"
        />
        <MetricCard
          title="Audit Reports"
          value="45"
          subtitle="Generated this month"
          icon={Scale}
          status="info"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Compliance Monitoring */}
        <Card title="Compliance Monitoring" subtitle="Regulatory framework status">
          <div className="space-y-3">
            {complianceStandards.map((standard) => (
              <div
                key={standard.name}
                className={`p-4 rounded-lg border ${
                  standard.status === 'compliant'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-amber-50 border-amber-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {standard.status === 'compliant' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-amber-600" />
                    )}
                    <span className="font-medium text-slate-900">{standard.name}</span>
                  </div>
                  <Badge
                    variant={standard.status === 'compliant' ? 'success' : 'warning'}
                    size="sm"
                  >
                    {standard.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-600">Compliance Score</span>
                      <span className="font-semibold text-slate-900">{standard.score}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          standard.score >= 90 ? 'bg-green-500' :
                          standard.score >= 75 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${standard.score}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">
                    {standard.lastAudit}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-lg hover:shadow-md transition-all duration-200 font-medium text-xs">
            Run Compliance Audit
          </button>
        </Card>

        {/* Risk Management */}
        <Card title="Risk Management Reports" subtitle="Generate compliance documentation">
          <div className="space-y-3 mb-6">
            <button className="w-full p-3 text-left bg-cyan-50/60 hover:bg-cyan-100 rounded-lg border border-cyan-200/60 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-cyan-900 mb-0.5 text-sm">Compliance Score Report</div>
                  <div className="text-xs text-cyan-700">Detailed breakdown by standard</div>
                </div>
                <FileText className="w-4 h-4 text-cyan-600" />
              </div>
            </button>

            <button className="w-full p-3 text-left bg-slate-50/60 hover:bg-slate-100 rounded-lg border border-slate-200/60 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900 mb-0.5 text-sm">Risk Score Analysis</div>
                  <div className="text-xs text-slate-600">AI asset risk assessment</div>
                </div>
                <FileText className="w-4 h-4 text-slate-600" />
              </div>
            </button>

            <button className="w-full p-3 text-left bg-slate-50/60 hover:bg-slate-100 rounded-lg border border-slate-200/60 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900 mb-0.5 text-sm">Audit Evidence Package</div>
                  <div className="text-xs text-slate-600">Complete audit trail and logs</div>
                </div>
                <FileText className="w-4 h-4 text-slate-600" />
              </div>
            </button>

            <button className="w-full p-3 text-left bg-slate-50/60 hover:bg-slate-100 rounded-lg border border-slate-200/60 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900 mb-0.5 text-sm">Governance Dashboard</div>
                  <div className="text-xs text-slate-600">Executive summary report</div>
                </div>
                <FileText className="w-4 h-4 text-slate-600" />
              </div>
            </button>
          </div>

          <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:shadow-md transition-all duration-200 font-medium text-xs">
            Generate All Reports
          </button>
        </Card>
      </div>

      {/* AI Asset Inventory */}
      <Card title="AI Asset Inventory" subtitle="Comprehensive asset tracking and management">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-3 font-medium text-slate-700 text-xs">Asset ID</th>
                <th className="text-left py-2 px-3 font-medium text-slate-700 text-xs">Name</th>
                <th className="text-left py-2 px-3 font-medium text-slate-700 text-xs">Type</th>
                <th className="text-left py-2 px-3 font-medium text-slate-700 text-xs">Owner</th>
                <th className="text-left py-2 px-3 font-medium text-slate-700 text-xs">Risk Score</th>
                <th className="text-left py-2 px-3 font-medium text-slate-700 text-xs">Compliance</th>
                <th className="text-left py-2 px-3 font-medium text-slate-700 text-xs">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {aiAssets.map((asset) => (
                <tr key={asset.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2 px-3 font-mono text-xs text-slate-900">{asset.id}</td>
                  <td className="py-2 px-3 font-medium text-slate-900 text-xs">{asset.name}</td>
                  <td className="py-2 px-3">
                    <Badge variant="neutral" size="sm">{asset.type}</Badge>
                  </td>
                  <td className="py-2 px-3 text-xs text-slate-700">{asset.owner}</td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold text-xs ${
                        asset.riskScore < 40 ? 'text-green-600' :
                        asset.riskScore < 60 ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {asset.riskScore}
                      </span>
                      <div className="w-16 bg-slate-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            asset.riskScore < 40 ? 'bg-green-500' :
                            asset.riskScore < 60 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${asset.riskScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <Badge
                      variant={asset.compliance === 'compliant' ? 'success' : 'warning'}
                      size="sm"
                    >
                      {asset.compliance}
                    </Badge>
                  </td>
                  <td className="py-2 px-3 text-xs text-slate-600">{asset.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
