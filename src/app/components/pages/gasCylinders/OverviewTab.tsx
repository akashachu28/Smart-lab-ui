import { Activity, Clock, CheckCircle, AlertTriangle as AlertTriangleIcon, Package } from 'lucide-react';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { statusSummary, cylinders, alerts } from './data';
import { statusBadge } from './types';
import { PressureGauge } from './PressureGauge';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const statusData = [
  { name: 'In Use', value: statusSummary.inUse, color: '#10b981' },
  { name: 'Available', value: statusSummary.available, color: '#06b6d4' },
  { name: 'Reserved', value: statusSummary.reserved, color: '#8b5cf6' },
  { name: 'Empty', value: statusSummary.empty, color: '#f59e0b' },
  { name: 'Maintenance', value: statusSummary.underMaintenance, color: '#64748b' },
];

// Lifecycle Management Data
const cylinderLifecycleData = [
  { id: 'CY-220', gas: 'Nitrogen', status: 'In Use', availability: 'Occupied', lastInspection: '2026-05-12', nextInspection: '2026-11-12', daysUntilDue: 132, refillStatus: 'Good', pressure: 82, location: 'Lab A', usageHistory: '84 days' },
  { id: 'CY-318', gas: 'Argon', status: 'Available', availability: 'Available', lastInspection: '2026-06-01', nextInspection: '2026-12-01', daysUntilDue: 152, refillStatus: 'Good', pressure: 74, location: 'Lab B', usageHistory: '12 days' },
  { id: 'CY-101', gas: 'Oxygen', status: 'Alert', availability: 'Occupied', lastInspection: '2026-04-20', nextInspection: '2026-10-20', daysUntilDue: 110, refillStatus: 'Low', pressure: 16, location: 'ICU Lab', usageHistory: '156 days' },
  { id: 'CY-044', gas: 'CO₂', status: 'In Use', availability: 'Occupied', lastInspection: '2026-06-15', nextInspection: '2027-01-15', daysUntilDue: 196, refillStatus: 'Good', pressure: 91, location: 'Chemistry', usageHistory: '45 days' },
  { id: 'CY-155', gas: 'Hydrogen', status: 'Maintenance', availability: 'Out of Service', lastInspection: '2026-03-10', nextInspection: '2026-09-10', daysUntilDue: 70, refillStatus: 'Empty', pressure: 0, location: 'Workshop', usageHistory: '201 days' },
  { id: 'CY-267', gas: 'Nitrogen', status: 'Available', availability: 'Available', lastInspection: '2026-05-28', nextInspection: '2026-11-28', daysUntilDue: 148, refillStatus: 'Good', pressure: 88, location: 'Storage', usageHistory: '6 days' },
  { id: 'CY-089', gas: 'Argon', status: 'In Use', availability: 'Occupied', lastInspection: '2026-06-10', nextInspection: '2026-12-10', daysUntilDue: 161, refillStatus: 'Partial', pressure: 45, location: 'Lab C', usageHistory: '78 days' },
  { id: 'CY-412', gas: 'Oxygen', status: 'Due Soon', availability: 'Occupied', lastInspection: '2026-01-15', nextInspection: '2026-07-15', daysUntilDue: 12, refillStatus: 'Good', pressure: 72, location: 'Lab A', usageHistory: '168 days' },
];

const inspectionDueData = [
  { period: 'Overdue', count: 2, color: '#ef4444' },
  { period: '< 30 days', count: 8, color: '#f59e0b' },
  { period: '30-90 days', count: 15, color: '#f59e0b' },
  { period: '90+ days', count: 97, color: '#10b981' },
];

const refillStatusData = [
  { status: 'Good', count: 98, color: '#10b981' },
  { status: 'Partial', count: 12, color: '#f59e0b' },
  { status: 'Low', count: 8, color: '#f97316' },
  { status: 'Empty', count: 4, color: '#ef4444' },
];

export function OverviewTab() {
  return (
    <div className="space-y-4">
      
      {/* Cylinder Lifecycle Status Table */}
      <Card title="Cylinder Lifecycle Status" subtitle="Availability, inspection dates, refill status & usage" className="bg-white/70 border-slate-200/40">
        <div className="overflow-hidden rounded-lg border border-slate-200/40 max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-100 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-slate-400">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-slate-50/95 backdrop-blur-sm z-10">
              <tr className="border-b border-slate-100">
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Cylinder ID</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Gas</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Availability</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Last Inspection</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Next Due</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Days Until Due</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Refill Status</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Pressure</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Location</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Usage History</th>
              </tr>
            </thead>
            <tbody>
              {cylinderLifecycleData.map(cylinder => (
                <tr key={cylinder.id} className={`border-b border-slate-50 hover:bg-slate-50/60 ${
                  cylinder.daysUntilDue < 30 ? 'bg-red-50/20' : ''
                }`}>
                  <td className="px-4 py-2.5 font-mono text-slate-400">{cylinder.id}</td>
                  <td className="px-4 py-2.5 font-medium text-slate-800">{cylinder.gas}</td>
                  <td className="px-4 py-2.5">
                    <Badge variant={
                      cylinder.availability === 'Available' ? 'success' :
                      cylinder.availability === 'Occupied' ? 'info' :
                      'error'
                    } size="sm">
                      {cylinder.availability}
                    </Badge>
                  </td>
                  <td className="px-4 py-2.5 text-slate-600">{cylinder.lastInspection}</td>
                  <td className="px-4 py-2.5 text-slate-600">{cylinder.nextInspection}</td>
                  <td className="px-4 py-2.5">
                    <span className={`font-medium ${
                      cylinder.daysUntilDue < 30 ? 'text-red-600' :
                      cylinder.daysUntilDue < 90 ? 'text-amber-600' :
                      'text-green-600'
                    }`}>
                      {cylinder.daysUntilDue} days
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <Badge variant={
                      cylinder.refillStatus === 'Good' ? 'success' :
                      cylinder.refillStatus === 'Partial' ? 'warning' :
                      'error'
                    } size="sm">
                      {cylinder.refillStatus}
                    </Badge>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            cylinder.pressure < 20 ? 'bg-red-400' :
                            cylinder.pressure < 50 ? 'bg-amber-400' :
                            'bg-green-400'
                          }`}
                          style={{ width: `${cylinder.pressure}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-medium text-slate-600">{cylinder.pressure}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-cyan-600 font-medium">{cylinder.location}</td>
                  <td className="px-4 py-2.5 text-slate-600">{cylinder.usageHistory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
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
            <div className="space-y-2 max-h-[200px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-100 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-slate-400">
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



      {/* Bottom Row - Inspection & Refill Status */}
      <div className="grid grid-cols-3 gap-4">

      </div>
    </div>
  );
}
