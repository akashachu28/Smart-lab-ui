import { Clock, CheckCircle, AlertTriangle, Package, Calendar, Activity } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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

export function LifecycleManagementTab() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Lifecycle Overview KPIs */}
      <div className="col-span-3 grid grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/40 rounded-xl p-4 shadow-sm">
          <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">98</div>
          <p className="text-xs text-slate-600">Available Cylinders</p>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/40 rounded-xl p-4 shadow-sm">
          <Clock className="w-5 h-5 text-amber-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">23</div>
          <p className="text-xs text-slate-600">Inspection Due (30d)</p>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200/40 rounded-xl p-4 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-red-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">12</div>
          <p className="text-xs text-slate-600">Refill Required</p>
        </div>

        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 border border-cyan-200/40 rounded-xl p-4 shadow-sm">
          <Activity className="w-5 h-5 text-cyan-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">74</div>
          <p className="text-xs text-slate-600">Currently In Use</p>
        </div>
      </div>

      {/* Cylinder Lifecycle Status Table */}
      <Card title="Cylinder Lifecycle Status" subtitle="Availability, inspection dates, refill status & usage" className="col-span-3 bg-white/70 border-slate-200/40">
        <div className="overflow-hidden rounded-lg border border-slate-200/40">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
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

      {/* Inspection Due Timeline */}
      <Card title="Inspection Due Timeline" subtitle="Distribution by time period" className="col-span-1 bg-white/70 border-slate-200/40">
        <div className="space-y-3">
          {inspectionDueData.map(item => (
            <div key={item.period} className="flex items-center justify-between p-2.5 rounded-lg border" style={{ 
              backgroundColor: item.color + '15',
              borderColor: item.color + '40'
            }}>
              <span className="text-xs text-slate-700 font-medium">{item.period}</span>
              <span className="text-sm font-bold" style={{ color: item.color }}>{item.count}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Refill Status Distribution */}
      <Card title="Refill Status Distribution" subtitle="Current cylinder refill states" className="col-span-2 bg-white/70 border-slate-200/40">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={refillStatusData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="status" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={{ fontSize: 11 }} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {refillStatusData.map((entry, index) => (
                <rect key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
