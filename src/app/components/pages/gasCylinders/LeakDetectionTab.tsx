import { AlertTriangle, Shield, Activity, Flame } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { leakEvents } from './data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const leakTrendData = [
  { day: 'Mon', count: 2 },
  { day: 'Tue', count: 4 },
  { day: 'Wed', count: 2 },
  { day: 'Thu', count: 1 },
  { day: 'Fri', count: 3 },
  { day: 'Sat', count: 0 },
  { day: 'Sun', count: 1 },
];

export function LeakDetectionTab() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Leak Status Summary */}
      <div className="col-span-3 grid grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/40 rounded-xl p-4 shadow-sm">
          <Activity className="w-5 h-5 text-green-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">124</div>
          <p className="text-xs text-slate-600">Active Sensors</p>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200/40 rounded-xl p-4 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-red-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">2</div>
          <p className="text-xs text-slate-600">Leak Events</p>
        </div>
        
        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 border border-cyan-200/40 rounded-xl p-4 shadow-sm">
          <Shield className="w-5 h-5 text-cyan-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">97%</div>
          <p className="text-xs text-slate-600">Safe Zones</p>
        </div>
        <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/40 rounded-xl p-4 shadow-sm">
          <Flame className="w-5 h-5 text-slate-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">0</div>
          <p className="text-xs text-slate-600">Emergency Events</p>
        </div>
      </div>

      {/* Active Leak Events */}
      <Card title="Active Leak Events" subtitle="Real-time leak detection" className="col-span-2 bg-white/70 border-slate-200/40">
        <div className="overflow-hidden rounded-lg border border-slate-200/40">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Time</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Location</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Gas</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Severity</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Status</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {leakEvents.map(event => (
                <tr key={event.id} className={`border-b border-slate-50 hover:bg-slate-50/60 ${
                  event.severity === 'critical' ? 'bg-red-50/20' : event.severity === 'high' ? 'bg-orange-50/20' : ''
                }`}>
                  <td className="px-4 py-2.5 font-mono text-slate-600">{event.time}</td>
                  <td className="px-4 py-2.5 font-medium text-slate-800">{event.location}</td>
                  <td className="px-4 py-2.5 text-slate-700">{event.gas}</td>
                  <td className="px-4 py-2.5">
                    <Badge variant={
                      event.severity === 'critical' ? 'error' :
                      event.severity === 'high' ? 'warning' :
                      'info'
                    } size="sm">
                      {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-4 py-2.5">
                    <Badge variant={
                      event.status === 'Active' ? 'error' :
                      event.status === 'Investigating' ? 'warning' :
                      'success'
                    } size="sm">
                      {event.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-2.5">
                    {event.status === 'Active' && (
                      <button className="px-2.5 py-1 bg-red-100 text-red-700 rounded-lg text-[10px] font-medium">
                        Acknowledge
                      </button>
                    )}
                    {event.status === 'Investigating' && (
                      <button className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-lg text-[10px] font-medium">
                        View Details
                      </button>
                    )}
                    {event.status === 'Resolved' && (
                      <button className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-medium">
                        Report
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Leak Trend Chart */}
      <Card title="Leak Trend" subtitle="Past 7 days" className="col-span-1 bg-white/70 border-slate-200/40">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={leakTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="day" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={{ fontSize: 11 }} />
            <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
