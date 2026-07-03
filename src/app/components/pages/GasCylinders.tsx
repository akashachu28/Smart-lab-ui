import { useState } from 'react';
import { Gauge, AlertTriangle, Activity, Wind, CheckCircle, Package, Shield, Brain } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { OverviewTab } from './gasCylinders/OverviewTab';
import { PressureMonitoringTab } from './gasCylinders/PressureMonitoringTab';
import { LeakDetectionTab } from './gasCylinders/LeakDetectionTab';
import { ConsumptionTab } from './gasCylinders/ConsumptionTab';
import { MaintenanceTab } from './gasCylinders/MaintenanceTab';
import { AIInsightsTab } from './gasCylinders/AIInsightsTab';

const tabs = ['Overview', 'Pressure Monitoring', 'Leak Detection', 'Consumption Analytics', 'Maintenance', 'AI Insights'];

export function GasCylinders() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="p-5 min-h-full flex flex-col gap-4">
      <div className="mb-1">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Gas Cylinder Management</h2>
        <p className="text-xs text-slate-500">Real-time IoT pressure monitoring, leak detection, lifecycle management & predictive analytics</p>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-10 gap-3">
        <MetricCard title="Total Cylinders" value="482" subtitle="Registered" icon={Wind} status="info" />
        <MetricCard title="Active" value="318" subtitle="In use" icon={Activity} status="success" />
        <MetricCard title="Available" value="124" subtitle="Ready" icon={CheckCircle} status="info" />
        <MetricCard title="Low Pressure" value="19" subtitle="Below threshold" icon={Gauge} status="warning" />
        <MetricCard title="Critical Alerts" value="4" subtitle="Immediate action" icon={AlertTriangle} status="error" />
        <MetricCard title="Leak Alerts" value="2" subtitle="Active events" icon={AlertTriangle} status="error" />
        <MetricCard title="Inspection Due" value="17" subtitle="Pending" icon={Package} status="warning" />
        <MetricCard title="Awaiting Refill" value="31" subtitle="Empty cylinders" icon={Package} status="warning" />
        <MetricCard title="Sensors Online" value="98.9%" subtitle="IoT devices" icon={Activity} status="success" />
        <MetricCard title="System Health" value="96.8%" subtitle="Overall" icon={Shield} status="success" />
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

      {/* Tab Content */}
      {activeTab === 'Overview' && <OverviewTab />}
      {activeTab === 'Pressure Monitoring' && <PressureMonitoringTab />}
      {activeTab === 'Leak Detection' && <LeakDetectionTab />}
      {activeTab === 'Consumption Analytics' && <ConsumptionTab />}
      {activeTab === 'Maintenance' && <MaintenanceTab />}
      {activeTab === 'AI Insights' && <AIInsightsTab />}
    </div>
  );
}
