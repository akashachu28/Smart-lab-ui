import { Gauge, AlertTriangle, Activity, Wind, CheckCircle } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { Badge } from '../ui/Badge';

const cylinders = [
  { id: 'CYL-001', gas: 'Nitrogen', location: 'Bay D-1', pressure: 180, maxPressure: 200, status: 'In Service', lastUpdate: '2s ago' },
  { id: 'CYL-002', gas: 'Oxygen', location: 'Bay D-2', pressure: 45, maxPressure: 200, status: 'Low Pressure', lastUpdate: '5s ago' },
  { id: 'CYL-003', gas: 'Carbon Dioxide', location: 'Bay D-3', pressure: 0, maxPressure: 150, status: 'Leak Detected', lastUpdate: '12s ago' },
  { id: 'CYL-004', gas: 'Argon', location: 'Bay D-4', pressure: 165, maxPressure: 200, status: 'In Service', lastUpdate: '3s ago' },
  { id: 'CYL-005', gas: 'Helium', location: 'Bay E-1', pressure: 190, maxPressure: 200, status: 'In Service', lastUpdate: '1s ago' },
  { id: 'CYL-006', gas: 'Hydrogen', location: 'Bay E-2', pressure: 120, maxPressure: 200, status: 'Inspection Due', lastUpdate: '8s ago' },
];

const alerts = [
  { id: 1, type: 'Leak Detected', cylinderId: 'CYL-003', gas: 'Carbon Dioxide', time: '09:38:21', severity: 'error' as const },
  { id: 2, type: 'Low Pressure', cylinderId: 'CYL-002', gas: 'Oxygen', time: '09:25:04', severity: 'warning' as const },
  { id: 3, type: 'Inspection Due', cylinderId: 'CYL-006', gas: 'Hydrogen', time: '09:00:00', severity: 'warning' as const },
];

const lifecycle = [
  { id: 'CYL-003', gas: 'Carbon Dioxide', lastInspection: '2023-12-10', nextDue: '2024-12-10', refillStatus: 'Empty', action: 'Immediate' },
  { id: 'CYL-006', gas: 'Hydrogen', lastInspection: '2023-06-15', nextDue: '2024-06-15', refillStatus: 'Partial', action: 'Schedule' },
  { id: 'CYL-002', gas: 'Oxygen', lastInspection: '2024-01-20', nextDue: '2025-01-20', refillStatus: 'Low', action: 'Refill' },
];

function PressureGauge({ value, max, status }: { value: number; max: number; status: string }) {
  const pct = Math.max(0, Math.min(1, value / max));
  const color = status === 'Leak Detected' ? '#ef4444' : status === 'Low Pressure' ? '#f59e0b' : '#10b981';
  const angle = -135 + pct * 270;
  return (
    <div className="flex flex-col items-center">
      <svg width="60" height="40" viewBox="0 0 60 40">
        <path d="M 5 38 A 25 25 0 0 1 55 38" fill="none" stroke="#e2e8f0" strokeWidth="5" strokeLinecap="round" />
        <path
          d="M 5 38 A 25 25 0 0 1 55 38"
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${pct * 78.5} 78.5`}
        />
        <text x="30" y="36" textAnchor="middle" fontSize="8" fill="#475569" fontWeight="600">{value} PSI</text>
      </svg>
    </div>
  );
}

const statusBadge: Record<string, 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
  'In Service': 'success',
  'Low Pressure': 'warning',
  'Leak Detected': 'error',
  'Inspection Due': 'warning',
  Idle: 'neutral',
  Retired: 'neutral',
};

export function GasCylinders() {
  return (
    <div className="p-5 min-h-full flex flex-col gap-4">
      <div className="mb-1">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Gas Cylinder Monitoring</h2>
        <p className="text-xs text-slate-500">Real-time IoT pressure monitoring, leak detection, and lifecycle management</p>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-4 gap-3">
        <MetricCard title="Total Cylinders" value="24" subtitle="Tracked across all bays" icon={Wind} status="info" />
        <MetricCard title="In Service" value="18" subtitle="Currently active" icon={Activity} status="success" />
        <MetricCard title="Pressure Alerts" value="2" subtitle="Low pressure detected" icon={Gauge} status="warning" />
        <MetricCard title="Leak Events Today" value="1" subtitle="CYL-003 — Critical" icon={AlertTriangle} status="error" />
      </div>

      <div className="flex gap-4">
        {/* Cylinder Grid */}
        <div className="flex-1">
          <p className="text-xs font-semibold text-slate-700 mb-3">Live Cylinder Status</p>
          <div className="grid grid-cols-3 gap-3">
            {cylinders.map(cyl => (
              <div key={cyl.id} className={`bg-white/70 border rounded-xl p-4 shadow-sm transition-all ${
                cyl.status === 'Leak Detected' ? 'border-red-300 ring-1 ring-red-200' :
                cyl.status === 'Low Pressure' ? 'border-amber-200' :
                cyl.status === 'Inspection Due' ? 'border-orange-200' :
                'border-slate-200/40'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-xs font-bold text-slate-800">{cyl.gas}</p>
                    <p className="text-[10px] text-slate-400">{cyl.id} · {cyl.location}</p>
                  </div>
                  <Badge variant={statusBadge[cyl.status]} size="sm">{cyl.status}</Badge>
                </div>
                <PressureGauge value={cyl.pressure} max={cyl.maxPressure} status={cyl.status} />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[9px] text-slate-400">Live — {cyl.lastUpdate}</span>
                  {cyl.status === 'Leak Detected' && (
                    <span className="text-[9px] text-red-600 font-medium animate-pulse">⚠ Evacuate Area</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alert Feed */}
        <div className="w-60">
          <p className="text-xs font-semibold text-slate-700 mb-3">Alert & Event Feed</p>
          <div className="space-y-2 mb-6">
            {alerts.map(a => (
              <div key={a.id} className={`bg-white/70 border rounded-xl p-3 shadow-sm ${a.severity === 'error' ? 'border-red-200' : 'border-amber-200'}`}>
                <div className="flex items-start justify-between mb-1">
                  <p className="text-xs font-semibold text-slate-800">{a.type}</p>
                  <Badge variant={a.severity} size="sm">{a.severity === 'error' ? 'Critical' : 'Warning'}</Badge>
                </div>
                <p className="text-[10px] text-slate-500">{a.gas} · {a.cylinderId}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[9px] text-slate-400">{a.time}</span>
                  <button className="text-[10px] text-cyan-600 font-medium hover:underline">Ack</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lifecycle Table */}
      <div>
        <p className="text-xs font-semibold text-slate-700 mb-2">Lifecycle & Maintenance</p>
        <div className="bg-white/70 rounded-xl border border-slate-200/40 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100">
                {['Cylinder ID', 'Gas Type', 'Last Inspection', 'Next Due', 'Refill Status', 'Action'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-slate-500 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lifecycle.map(l => (
                <tr key={l.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-4 py-2.5 font-mono text-slate-500">{l.id}</td>
                  <td className="px-4 py-2.5 font-medium text-slate-800">{l.gas}</td>
                  <td className="px-4 py-2.5 text-slate-600">{l.lastInspection}</td>
                  <td className="px-4 py-2.5 text-orange-600 font-medium">{l.nextDue}</td>
                  <td className="px-4 py-2.5">
                    <Badge variant={l.refillStatus === 'Empty' ? 'error' : l.refillStatus === 'Low' ? 'warning' : 'info'} size="sm">{l.refillStatus}</Badge>
                  </td>
                  <td className="px-4 py-2.5">
                    <button className={`px-2.5 py-1 rounded-lg text-[10px] font-medium ${
                      l.action === 'Immediate' ? 'bg-red-100 text-red-700' :
                      l.action === 'Refill' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>{l.action}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
