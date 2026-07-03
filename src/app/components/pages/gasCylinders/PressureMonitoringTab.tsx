import { Gauge, AlertTriangle, TrendingDown } from 'lucide-react';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { pressureDistribution, lowestPressureCylinders } from './data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const pressureTrendData = [
  { time: '00:00', pressure: 220 },
  { time: '04:00', pressure: 215 },
  { time: '08:00', pressure: 205 },
  { time: '12:00', pressure: 195 },
  { time: '16:00', pressure: 180 },
  { time: '20:00', pressure: 165 },
  { time: '24:00', pressure: 150 },
];

export function PressureMonitoringTab() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Pressure Analytics */}
      <div className="col-span-3 grid grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/40 rounded-xl p-4 shadow-sm">
          <Gauge className="w-5 h-5 text-blue-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">168 bar</div>
          <p className="text-xs text-slate-600">Average Pressure</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/40 rounded-xl p-4 shadow-sm">
          <TrendingDown className="w-5 h-5 text-amber-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">4.2 bar/day</div>
          <p className="text-xs text-slate-600">Pressure Drop Rate</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200/40 rounded-xl p-4 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-red-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">18</div>
          <p className="text-xs text-slate-600">Predicted Empty (48h)</p>
        </div>
      </div>
      {/* Pressure Distribution */}
      <Card title="Pressure Distribution" subtitle="Real-time gauge summary" className="col-span-1 bg-white/70 border-slate-200/40">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50/60 border border-green-200/40 rounded-lg">
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-green-600" />
              <span className="text-xs font-medium text-slate-700">Normal</span>
            </div>
            <span className="text-xl font-bold text-green-700">{pressureDistribution.normal}%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-amber-50/60 border border-amber-200/40 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span className="text-xs font-medium text-slate-700">Warning</span>
            </div>
            <span className="text-xl font-bold text-amber-700">{pressureDistribution.warning}%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-red-50/60 border border-red-200/40 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-600" />
              <span className="text-xs font-medium text-slate-700">Critical</span>
            </div>
            <span className="text-xl font-bold text-red-700">{pressureDistribution.critical}%</span>
          </div>
        </div>
      </Card>

      {/* Pressure Trend Chart */}
      <Card title="Pressure Trend" subtitle="Selected cylinder — CYL-002" className="col-span-2 bg-white/70 border-slate-200/40">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={pressureTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} unit=" bar" />
            <Tooltip contentStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="pressure" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Lowest Pressure Cylinders */}
      <Card title="Lowest Pressure Cylinders" subtitle="Immediate attention required" className="col-span-3 bg-white/70 border-slate-200/40">
        <div className="overflow-hidden rounded-lg border border-slate-200/40">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Cylinder</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Gas</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Pressure</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Threshold</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Status</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {lowestPressureCylinders.map((cyl, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/60">
                  <td className="px-4 py-2.5 font-mono text-slate-400">{cyl.cylinder}</td>
                  <td className="px-4 py-2.5 font-medium text-slate-800">{cyl.gas}</td>
                  <td className="px-4 py-2.5">
                    <span className={`font-bold ${cyl.status === 'Critical' ? 'text-red-600' : 'text-amber-600'}`}>
                      {cyl.pressure} bar
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-slate-600">{cyl.threshold} bar</td>
                  <td className="px-4 py-2.5">
                    <Badge variant={cyl.status === 'Critical' ? 'error' : 'warning'} size="sm">{cyl.status}</Badge>
                  </td>
                  <td className="px-4 py-2.5">
                    <button className={`px-2.5 py-1 rounded-lg text-[10px] font-medium ${
                      cyl.status === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {cyl.status === 'Critical' ? 'Replace Now' : 'Schedule'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      
    </div>
  );
}
