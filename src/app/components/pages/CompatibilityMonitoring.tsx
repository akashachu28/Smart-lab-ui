import { useState } from 'react';
import { AlertOctagon, ShieldCheck, Search, Clock, Activity, AlertTriangle, Eye, CheckCircle } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { Badge } from '../ui/Badge';
import { OverviewTab } from './compatibilityMonitoring/OverviewTab';
import { ValidationTab } from './compatibilityMonitoring/ValidationTab';
import { StorageMonitoringTab } from './compatibilityMonitoring/StorageMonitoringTab';
import { VisionMonitoringTab } from './compatibilityMonitoring/VisionMonitoringTab';
import { ComplianceTab } from './compatibilityMonitoring/ComplianceTab';
import { AIInsightsTab } from './compatibilityMonitoring/AIInsightsTab';
import { violations } from './compatibilityMonitoring/data';

const tabs = ['Overview', 'Validation', 'Storage Monitoring', 'Vision Detection', 'Compliance', 'AI Insights'];

export function CompatibilityMonitoring() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="p-5 min-h-full flex flex-col gap-4">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">Chemical Compatibility Monitoring</h2>
          <p className="text-xs text-slate-500">Real-time validation of storage against compatibility rules — unsafe pairing detection</p>
        </div>
        <span className="text-[10px] text-slate-400">Last scan: 09:41:00 · Auto-scan every 5 min</span>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-8 gap-3">
        <MetricCard title="Chemicals Monitored" value="4,826" subtitle="Registered" icon={ShieldCheck} status="info" />
        <MetricCard title="Storage Areas" value="126" subtitle="Active locations" icon={Activity} status="info" />
        <MetricCard title="Checks Today" value="18,642" subtitle="AI validations" icon={Search} status="success" />
        <MetricCard title="Active Violations" value="9" subtitle="Critical issues" icon={AlertOctagon} status="error" />
        <MetricCard title="Critical Alerts" value="2" subtitle="Immediate action" icon={AlertTriangle} status="error" />
        <MetricCard title="Compliance Score" value="98.7%" subtitle="Target: 95%" icon={CheckCircle} status="success" trend="up" trendValue="+0.3%" />
        <MetricCard title="AI Recommendations" value="14" subtitle="Pending actions" icon={Search} status="warning" />
        <MetricCard title="High Risk Zones" value="3" subtitle="Needs attention" icon={Eye} status="warning" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200/40">
        {tabs.map(t => (
          <button 
            key={t} 
            onClick={() => setActiveTab(t)} 
            className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === t ? 'border-cyan-500 text-cyan-700' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && <OverviewTab />}
      {activeTab === 'Validation' && <ValidationTab />}
      {activeTab === 'Storage Monitoring' && <StorageMonitoringTab />}
      {activeTab === 'Vision Detection' && <VisionMonitoringTab />}
      {activeTab === 'Compliance' && <ComplianceTab />}
      {activeTab === 'AI Insights' && <AIInsightsTab />}

      {/* Floating Violations Panel */}
      {violations.length > 0 && (
        <div className="fixed bottom-4 right-4 w-80 bg-white border-2 border-red-200 rounded-xl shadow-2xl p-4 max-h-96 overflow-y-auto">
          <p className="text-xs font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-red-600" />
            Active Violations ({violations.length})
          </p>
          <div className="space-y-2">
            {violations.map(v => (
              <div key={v.id} className={`border rounded-lg p-2.5 ${v.severity === 'error' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
                <div className="flex items-start justify-between mb-1">
                  <Badge variant={v.severity} size="sm">{v.severity === 'error' ? 'Critical' : 'Warning'}</Badge>
                  <span className="text-[9px] text-slate-400">{v.timestamp}</span>
                </div>
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-[10px] font-semibold text-slate-800">{v.chemA}</span>
                  <span className="text-[9px] text-slate-400">+</span>
                  <span className="text-[10px] font-semibold text-slate-800">{v.chemB}</span>
                </div>
                <p className="text-[9px] text-slate-500">{v.location}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
