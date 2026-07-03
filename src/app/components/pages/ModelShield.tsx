import { useState } from 'react';
import { ShieldCheck, Cpu, Lock, FileCheck } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export function ModelShield() {
  const [selectedModel, setSelectedModel] = useState<'cv' | 'llm' | 'speech' | 'ml'>('llm');

  const modelTypes = [
    { id: 'cv', name: 'Computer Vision', icon: Cpu },
    { id: 'llm', name: 'Large Language Models', icon: ShieldCheck },
    { id: 'speech', name: 'Speech Models', icon: Lock },
    { id: 'ml', name: 'Traditional ML', icon: FileCheck }
  ];

  const cvAttacks = [
    { name: 'FGSM Attack', score: 82, status: 'success' },
    { name: 'PGD Attack', score: 65, status: 'warning' },
    { name: 'CW Attack', score: 71, status: 'warning' },
    { name: 'AutoAttack', score: 88, status: 'success' }
  ];

  const llmAttacks = [
    { name: 'Prompt Injection', score: 76, status: 'warning' },
    { name: 'Jailbreak Testing', score: 58, status: 'error' },
    { name: 'Role Manipulation', score: 81, status: 'success' },
    { name: 'System Bypass', score: 69, status: 'warning' }
  ];

  const extractionRisks = [
    { type: 'Black-box Extraction', risk: 'Medium', score: 65 },
    { type: 'Model Cloning', risk: 'Low', score: 82 },
    { type: 'Query-based Theft', risk: 'High', score: 42 }
  ];

  const currentAttacks = selectedModel === 'cv' ? cvAttacks : llmAttacks;

  return (
    <div className="p-6 min-h-full">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-1">ModelShield</h2>
        <p className="text-xs text-slate-600">Assess model robustness and vulnerability before deployment</p>
      </div>

      {/* Model Type Filter */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {modelTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedModel(type.id as any)}
            className={`p-3 rounded-lg border transition-all ${
              selectedModel === type.id
                ? 'border-cyan-400 bg-gradient-to-br from-cyan-50 to-cyan-100/50 shadow-sm'
                : 'border-slate-200/50 bg-white/70 hover:border-slate-300'
            }`}
          >
            <type.icon className={`w-5 h-5 mb-1.5 ${
              selectedModel === type.id ? 'text-cyan-600' : 'text-slate-600'
            }`} />
            <div className={`text-xs font-medium ${
              selectedModel === type.id ? 'text-cyan-900' : 'text-slate-900'
            }`}>
              {type.name}
            </div>
          </button>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MetricCard
          title="Overall Robustness"
          value="73%"
          subtitle="Moderate resilience"
          icon={ShieldCheck}
          status="warning"
        />
        <MetricCard
          title="Models Scanned"
          value="142"
          subtitle="Last 30 days"
          icon={Cpu}
          status="info"
        />
        <MetricCard
          title="Critical Vulnerabilities"
          value="8"
          subtitle="Requires immediate action"
          icon={Lock}
          status="error"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Adversarial Robustness */}
        <Card
          title={`Adversarial Robustness - ${selectedModel === 'cv' ? 'Computer Vision' : 'LLMs'}`}
          subtitle="Attack resistance evaluation"
        >
          <div className="space-y-4">
            {currentAttacks.map((attack) => (
              <div key={attack.name} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-700">{attack.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900">{attack.score}%</span>
                    <Badge
                      variant={
                        attack.status === 'success' ? 'success' :
                        attack.status === 'warning' ? 'warning' : 'error'
                      }
                      size="sm"
                    >
                      {attack.score >= 80 ? 'Strong' : attack.score >= 60 ? 'Moderate' : 'Weak'}
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      attack.status === 'success' ? 'bg-green-500' :
                      attack.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${attack.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Extraction & Ownership */}
        <Card title="Model Extraction & Ownership" subtitle="Theft prevention and verification">
          <div className="space-y-4 mb-6">
            <h4 className="font-medium text-slate-900 mb-3">Extraction Risk Assessment</h4>
            {extractionRisks.map((risk) => (
              <div key={risk.type} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-700">{risk.type}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">{risk.score}%</span>
                  <Badge
                    variant={
                      risk.risk === 'Low' ? 'success' :
                      risk.risk === 'Medium' ? 'warning' : 'error'
                    }
                    size="sm"
                  >
                    {risk.risk}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h4 className="font-medium text-slate-900 mb-3">Ownership Verification</h4>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <span className="text-sm font-medium text-green-900">Watermark Status</span>
              <Badge variant="success" size="sm">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <span className="text-sm font-medium text-green-900">Fingerprint Match</span>
              <Badge variant="success" size="sm">Verified</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg border border-cyan-200">
              <span className="text-sm font-medium text-cyan-900">Ownership Certificate</span>
              <Badge variant="info" size="sm">Valid</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
