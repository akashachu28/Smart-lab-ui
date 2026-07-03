import { Activity } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { statusSummary, cylinders, alerts } from './data';
import { statusBadge } from './types';
import { PressureGauge } from './PressureGauge';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const statusData = [
  { name: 'In Use', value: statusSummary.inUse, color: '#10b981' },
  { name: 'Available', value: statusSummary.available, color: '#06b6d4' },
  { name: 'Reserved', value: statusSummary.reserved, color: '#8b5cf6' },
  { name: 'Empty', value: statusSummary.empty, color: '#f59e0b' },
  { name: 'Maintenance', value: statusSummary.underMaintenance, color: '#64748b' },
];

export function OverviewTab() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Live Cylinder Status */}
      <div className="col-span-2">
        <Card title="Live Cylinder Status" subtitle="Real-time operational summary" className="bg-white/70 border-slate-200/40">
          <div className="grid grid-cols-3 gap-3">
            {cylinders.slice(0, 6).map(cyl => (
              <div key={cyl.id} className={`border rounded-xl p-4 shadow-sm transition-all ${
                cyl.status === 'Leak Detected' ? 'border-red-300 ring-1 ring-red-200 bg-red-50/20' :
                cyl.status === 'Low Pressure' ? 'border-amber-200 bg-amber-50/20' :
                cyl.status === 'Inspection Due' ? 'border-orange-200 bg-orange-50/20' :
                'border-slate-200/40 bg-white/50'
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
        </Card>
      </div>

      {/* Status Distribution */}
      <div className="col-span-1 space-y-4">
        <Card title="Status Distribution" subtitle="Current operational state" className="bg-white/70 border-slate-200/40">
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value">
                  {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 flex-1">
              {statusData.map(d => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: d.color }}></div>
                  <span className="text-[10px] text-slate-600 flex-1">{d.name}</span>
                  <span className="text-[10px] font-bold text-slate-700">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-50/60 border border-green-200/40 rounded-lg text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-green-600" />
              <span className="text-sm font-bold text-green-700">96.8%</span>
            </div>
            <p className="text-[10px] text-slate-600">Operational</p>
          </div>
        </Card>

        {/* Recent Alerts */}
        <Card title="Recent Alerts" subtitle="Latest events" className="bg-white/70 border-slate-200/40">
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {alerts.slice(0, 4).map(alert => (
              <div key={alert.id} className={`p-2 rounded-lg border text-[10px] ${
                alert.severity === 'error' ? 'bg-red-50 border-red-200' :
                'bg-amber-50 border-amber-200'
              }`}>
                <p className="font-medium text-slate-800 mb-0.5">{alert.type}</p>
                <p className="text-slate-600">{alert.gas} · {alert.cylinderId}</p>
                <div className="flex justify-between text-slate-500 mt-1">
                  <span>{alert.time}</span>
                  <Badge variant={alert.severity} size="sm">{alert.severity === 'error' ? 'Critical' : 'Warning'}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
