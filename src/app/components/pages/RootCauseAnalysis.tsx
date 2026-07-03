import { useState } from 'react';
import { AlertTriangle, FileText, CheckCircle, Clock, TrendingUp, Shield, Brain, Activity } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { OverviewTab } from './rootCause/OverviewTab';
import { AIAnalysisTab } from './rootCause/AIAnalysisTab';
import { CAPATab } from './rootCause/CAPATab';
import { RiskAssessmentTab } from './rootCause/RiskAssessmentTab';
import { HistoricalSearchTab } from './rootCause/HistoricalSearchTab';
import { ComplianceTab } from './rootCause/ComplianceTab';
import { TrendsTab } from './rootCause/TrendsTab';
import { AIInsightsTab } from './rootCause/AIInsightsTab';

const tabs = ['Overview', 'AI Analysis', 'CAPA', 'Risk Assessment', 'Historical Search', 'Compliance', 'Trends', 'AI Insights'];

export function RootCauseAnalysis() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="p-5 min-h-full flex flex-col gap-4">
      <div className="mb-1">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Root Cause Analysis</h2>
        <p className="text-xs text-slate-500">AI-assisted incident investigation — RCA, CAPA recommendations & historical search</p>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-8 gap-3">
        <MetricCard title="Total Incidents" value="100" subtitle="This quarter" icon={AlertTriangle} status="info" />
        <MetricCard title="Open Investigations" value="18" subtitle="Active cases" icon={FileText} status="warning" />
        <MetricCard title="Critical Incidents" value="5" subtitle="High priority" icon={AlertTriangle} status="error" />
        <MetricCard title="CAPA Open" value="12" subtitle="Pending actions" icon={CheckCircle} status="warning" />
        <MetricCard title="Investigation Rate" value="96.2%" subtitle="Completion rate" icon={TrendingUp} status="success" trend="up" trendValue="+2.4%" />
        <MetricCard title="Avg Time" value="3.4 days" subtitle="Investigation time" icon={Clock} status="success" trend="down" trendValue="-1.2d" />
        <MetricCard title="Repeat Incidents" value="8" subtitle="Recurring issues" icon={Activity} status="warning" />
        <MetricCard title="AI Confidence" value="94.8%" subtitle="Analysis accuracy" icon={Brain} status="success" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200/40">
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
            activeTab === t ? 'border-cyan-500 text-cyan-700' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}>{t}</button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Overview' && <OverviewTab />}
      {activeTab === 'AI Analysis' && <AIAnalysisTab />}
      {activeTab === 'CAPA' && <CAPATab />}
      {activeTab === 'Risk Assessment' && <RiskAssessmentTab />}
      {activeTab === 'Historical Search' && <HistoricalSearchTab />}
      {activeTab === 'Compliance' && <ComplianceTab />}
      {activeTab === 'Trends' && <TrendsTab />}
      {activeTab === 'AI Insights' && <AIInsightsTab />}
    </div>
  );
}
