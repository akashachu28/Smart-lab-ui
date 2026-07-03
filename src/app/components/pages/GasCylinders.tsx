import { useState } from 'react';
import { Gauge, AlertTriangle, Activity, Wind, CheckCircle, Package, Shield, Brain } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { OverviewTab } from './gasCylinders/OverviewTab';
import { PressureMonitoringTab } from './gasCylinders/PressureMonitoringTab';
import { LeakDetectionTab } from './gasCylinders/LeakDetectionTab';
import { LifecycleManagementTab } from './gasCylinders/LifecycleManagementTab';
import { IdentificationTrackingTab } from './gasCylinders/IdentificationTrackingTab';
import { Badge } from '../ui/Badge';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// ── Cylinder Tracking Data ──────────────────────────────────────────────
const C = {
  cyan: '#06b6d4', purple: '#8b5cf6', green: '#10b981',
  amber: '#f59e0b', red: '#ef4444', orange: '#f97316',
  blue: '#3b82f6', slate: '#94a3b8',
};

const cylinderRows = [
  { id: 'CY-220', gas: 'Nitrogen', pressure: 82, leak: 'Safe', location: 'Lab A', status: 'In Use' },
  { id: 'CY-101', gas: 'Oxygen', pressure: 16, leak: 'Low Pressure', location: 'ICU Lab', status: 'Alert' },
  { id: 'CY-318', gas: 'Argon', pressure: 74, leak: 'Safe', location: 'Lab B', status: 'Available' },
  { id: 'CY-044', gas: 'CO₂', pressure: 91, leak: 'Safe', location: 'Chemistry', status: 'In Use' },
];

const pressureTrend = [
  { t: '6h', n2: 88, o2: 42, ar: 79 },
  { t: '5h', n2: 86, o2: 36, ar: 78 },
  { t: '4h', n2: 85, o2: 28, ar: 77 },
  { t: '3h', n2: 84, o2: 22, ar: 76 },
  { t: '2h', n2: 83, o2: 18, ar: 75 },
  { t: '1h', n2: 82, o2: 16, ar: 74 },
];

function SectionCard({ title, subtitle, children, className = '' }: {
  title: string; subtitle?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={`bg-white/70 border border-slate-200/40 rounded-xl shadow-sm p-4 ${className}`}>
      <div className="mb-3">
        <p className="text-xs font-semibold text-slate-800">{title}</p>
        {subtitle && <p className="text-[10px] text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

const tabs = ['Overview', 'Pressure Monitoring', 'Leak Detection', 'Consumption Analytics', 'Maintenance', 'Cylinder Tracking'];

export function GasCylinders() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="p-5 min-h-full flex flex-col gap-4">
      <div className="mb-1">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Gas Cylinder Management</h2>
        <p className="text-xs text-slate-500">Real-time IoT pressure monitoring, leak detection, lifecycle management & predictive analytics</p>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-4 gap-3">
        <MetricCard title="Total Cylinders" value="482" subtitle="Registered" icon={Wind} status="info" />
        <MetricCard title="Active" value="318" subtitle="In use" icon={Activity} status="success" />
        <MetricCard title="Available" value="124" subtitle="Ready" icon={CheckCircle} status="info" />
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
      {activeTab === 'Pressure Monitoring' && <PressureMonitoringTab />}
      {activeTab === 'Leak Detection' && <LeakDetectionTab />}
      {activeTab === 'Consumption Analytics' && <LifecycleManagementTab />}
      {activeTab === 'Maintenance' && <IdentificationTrackingTab />}
      {activeTab === 'Cylinder Tracking' && (
        <div>
          <SectionCard title="Gas Cylinder Tracking" subtitle="IoT pressure & status monitoring">
            {/* Cylinder KPIs */}
            <div className="grid grid-cols-5 gap-1.5 mb-3">
              {[
                { label: 'Active', value: '122', color: C.green },
                { label: 'In Use', value: '74', color: C.cyan },
                { label: 'Available', value: '28', color: C.blue },
                { label: 'Maintenance', value: '11', color: C.amber },
                { label: 'Leak Alert', value: '2', color: C.red },
              ].map(m => (
                <div key={m.label} className="text-center p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="text-base font-bold" style={{ color: m.color }}>{m.value}</p>
                  <p className="text-[9px] text-slate-500">{m.label}</p>
                </div>
              ))}
            </div>

            <table className="w-full text-xs mb-3">
              <thead>
                <tr className="border-b border-slate-100">
                  {['ID', 'Gas', 'Pressure', 'Leak', 'Location', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 px-2 text-[10px] text-slate-400 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cylinderRows.map(r => (
                  <tr key={r.id} className={`border-b border-slate-50 hover:bg-slate-50/60 ${r.status === 'Alert' ? 'bg-red-50/40' : ''}`}>
                    <td className="py-2 px-2 font-mono text-[10px] text-slate-400">{r.id}</td>
                    <td className="py-2 px-2 font-medium text-slate-800">{r.gas}</td>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${r.pressure}%`, background: r.pressure < 20 ? C.red : r.pressure < 50 ? C.amber : C.green }}></div>
                        </div>
                        <span className={`text-[10px] font-medium ${r.pressure < 20 ? 'text-red-600' : r.pressure < 50 ? 'text-amber-600' : 'text-green-600'}`}>{r.pressure}%</span>
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <Badge variant={r.leak === 'Safe' ? 'success' : 'error'} size="sm">{r.leak}</Badge>
                    </td>
                    <td className="py-2 px-2 text-slate-600">{r.location}</td>
                    <td className="py-2 px-2">
                      <Badge variant={r.status === 'In Use' ? 'info' : r.status === 'Alert' ? 'error' : 'success'} size="sm">{r.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              <p className="text-[10px] text-slate-400 mb-1.5">Pressure trend — N₂ / O₂ / Ar (last 6 hours)</p>
              <ResponsiveContainer width="100%" height={90}>
                <LineChart data={pressureTrend}>
                  <XAxis dataKey="t" tick={{ fontSize: 8 }} />
                  <YAxis tick={{ fontSize: 8 }} domain={[0, 100]} unit="%" />
                  <Tooltip contentStyle={{ fontSize: 9 }} formatter={(v: number) => `${v}%`} />
                  <Legend iconSize={7} wrapperStyle={{ fontSize: 9 }} />
                  <Line type="monotone" dataKey="n2" name="N₂" stroke={C.cyan} strokeWidth={1.5} dot={false} />
                  <Line type="monotone" dataKey="o2" name="O₂" stroke={C.red} strokeWidth={1.5} dot={false} />
                  <Line type="monotone" dataKey="ar" name="Ar" stroke={C.purple} strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>
      )}
      
    </div>
  );
}
