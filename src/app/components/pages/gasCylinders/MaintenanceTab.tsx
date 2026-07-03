import { Wrench, Clock, CheckCircle, AlertTriangle, Package } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { maintenanceRecords, refillQueue } from './data';

export function MaintenanceTab() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Maintenance Overview */}
      <div className="col-span-3 grid grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/40 rounded-xl p-4 shadow-sm">
          <Clock className="w-5 h-5 text-amber-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">17</div>
          <p className="text-xs text-slate-600">Due This Week</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/40 rounded-xl p-4 shadow-sm">
          <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">12</div>
          <p className="text-xs text-slate-600">Completed</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200/40 rounded-xl p-4 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-red-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">3</div>
          <p className="text-xs text-slate-600">Overdue</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/40 rounded-xl p-4 shadow-sm">
          <Wrench className="w-5 h-5 text-blue-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">8</div>
          <p className="text-xs text-slate-600">Scheduled</p>
        </div>
      </div>

      {/* Inspection Schedule */}
      <Card title="Inspection Schedule" subtitle="Preventive maintenance tracking" className="col-span-2 bg-white/70 border-slate-200/40">
        <div className="overflow-hidden rounded-lg border border-slate-200/40">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Cylinder</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Gas</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Last Inspection</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Next Due</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Refill Status</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceRecords.map(record => (
                <tr key={record.id} className="border-b border-slate-50 hover:bg-slate-50/60">
                  <td className="px-4 py-2.5 font-mono text-slate-400">{record.id}</td>
                  <td className="px-4 py-2.5 font-medium text-slate-800">{record.gas}</td>
                  <td className="px-4 py-2.5 text-slate-600">{record.lastInspection}</td>
                  <td className="px-4 py-2.5 text-orange-600 font-medium">{record.nextDue}</td>
                  <td className="px-4 py-2.5">
                    <Badge variant={
                      record.refillStatus === 'Empty' ? 'error' :
                      record.refillStatus === 'Low' || record.refillStatus === 'Partial' ? 'warning' :
                      'success'
                    } size="sm">
                      {record.refillStatus}
                    </Badge>
                  </td>
                  <td className="px-4 py-2.5">
                    <button className={`px-2.5 py-1 rounded-lg text-[10px] font-medium ${
                      record.action === 'Immediate' || record.action === 'Overdue' ? 'bg-red-100 text-red-700' :
                      record.action === 'Refill' || record.action === 'Due Soon' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {record.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Inspection Compliance Gauge */}
      <Card title="Inspection Compliance" subtitle="Overall compliance rate" className="col-span-1 bg-white/70 border-slate-200/40">
        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative w-32 h-32">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="40" fill="none"
                stroke="#10b981"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="245 251.3"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-slate-800">97.4%</span>
              <span className="text-[10px] text-slate-500">Compliant</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Refill & Replacement */}
      <Card title="Refill Queue" subtitle="Pending refills by priority" className="col-span-3 bg-white/70 border-slate-200/40">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-3">
              <div className="text-center p-3 bg-red-50/60 border border-red-200/40 rounded-lg">
                <div className="text-2xl font-bold text-red-700 mb-1">31</div>
                <p className="text-[10px] text-slate-600">Pending Refills</p>
              </div>
              <div className="text-center p-3 bg-green-50/60 border border-green-200/40 rounded-lg">
                <div className="text-2xl font-bold text-green-700 mb-1">14</div>
                <p className="text-[10px] text-slate-600">Completed Today</p>
              </div>
              <div className="text-center p-3 bg-blue-50/60 border border-blue-200/40 rounded-lg">
                <div className="text-2xl font-bold text-blue-700 mb-1">6 hrs</div>
                <p className="text-[10px] text-slate-600">Avg Refill Time</p>
              </div>
              <div className="text-center p-3 bg-purple-50/60 border border-purple-200/40 rounded-lg">
                <div className="text-2xl font-bold text-purple-700 mb-1">5</div>
                <p className="text-[10px] text-slate-600">Vendor Deliveries</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200/40">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Cylinder</th>
                  <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Gas</th>
                  <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Empty Since</th>
                  <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Priority</th>
                </tr>
              </thead>
              <tbody>
                {refillQueue.map((item, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/60">
                    <td className="px-4 py-2.5 font-mono text-slate-400">{item.cylinderId}</td>
                    <td className="px-4 py-2.5 font-medium text-slate-800">{item.gas}</td>
                    <td className="px-4 py-2.5 text-slate-600">{item.emptySince}</td>
                    <td className="px-4 py-2.5">
                      <Badge variant={
                        item.priority === 'Critical' ? 'error' :
                        item.priority === 'High' ? 'warning' :
                        'info'
                      } size="sm">
                        {item.priority}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
