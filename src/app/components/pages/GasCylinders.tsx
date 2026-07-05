import { useState } from 'react';
import { Gauge, AlertTriangle, Activity, Wind, CheckCircle, Package, Shield, Brain } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { OverviewTab } from './gasCylinders/OverviewTab';
import { PressureMonitoringTab } from './gasCylinders/PressureMonitoringTab';
import { LeakDetectionTab } from './gasCylinders/LeakDetectionTab';
import { LifecycleManagementTab } from './gasCylinders/LifecycleManagementTab';
import { IdentificationTrackingTab } from './gasCylinders/IdentificationTrackingTab';
import { Badge } from '../ui/badge';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// ── Cylinder Tracking Data ──────────────────────────────────────────────
const C = {
  cyan: '#06b6d4', purple: '#8b5cf6', green: '#10b981',
  amber: '#f59e0b', red: '#ef4444', orange: '#f97316',
  blue: '#3b82f6', slate: '#94a3b8',
};


const tabs = ['Overview', 'Pressure Monitoring', 'Leak Detection'];

export function GasCylinders() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedCylinder, setSelectedCylinder] = useState<string | null>(null);

  return (
    <div className="p-5 min-h-full flex flex-col gap-4">
      <div className="mb-1">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Gas Monitoring</h2>
        <p className="text-xs text-slate-500">Real-time IoT pressure monitoring, leak detection, lifecycle management & predictive analytics</p>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-6 gap-3">
        <MetricCard title="Total Cylinders" value="482" subtitle="Registered" icon={Wind} status="info" />
        <MetricCard title="Active" value="318" subtitle="In use" icon={Activity} status="success" />
        {/* <MetricCard title="Available" value="124" subtitle="Ready" icon={CheckCircle} status="info" /> */}
        <MetricCard title="Low Pressure" value="19" subtitle="Below threshold" icon={Gauge} status="warning" />
        <MetricCard title="Critical Alerts" value="4" subtitle="Immediate action" icon={AlertTriangle} status="error" />
        <MetricCard title="Leak Alerts" value="2" subtitle="Active events" icon={AlertTriangle} status="error" />
        <MetricCard title="Inspection Due" value="17" subtitle="Pending" icon={Package} status="warning" />
        {/* <MetricCard title="Awaiting Refill" value="31" subtitle="Empty cylinders" icon={Package} status="warning" /> */}
        {/* <MetricCard title="Sensors Online" value="98.9%" subtitle="IoT devices" icon={Activity} status="success" /> */}
        {/* <MetricCard title="System Health" value="96.8%" subtitle="Overall" icon={Shield} status="success" /> */}
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
      {activeTab === 'Pressure Monitoring' && <PressureMonitoringTab selectedCylinder={selectedCylinder} setSelectedCylinder={setSelectedCylinder} />}
      {activeTab === 'Leak Detection' && <LeakDetectionTab />}

      
    </div>
  );
}
