import { TrendingUp, Package } from 'lucide-react';
import { Card } from '../../ui/Card';
import { consumptionData, departmentConsumption, consumptionTrend } from './data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

export function ConsumptionTab() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Gas Consumption Trend */}
      <Card title="Gas Consumption Trend" subtitle="Monthly usage by gas type" className="col-span-2 bg-white/70 border-slate-200/40">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={consumptionTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} unit=" m³" />
            <Tooltip contentStyle={{ fontSize: 11 }} />
            <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
            <Line type="monotone" dataKey="nitrogen" name="Nitrogen" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="oxygen" name="Oxygen" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="co2" name="CO₂" stroke="#f59e0b" strokeWidth={2} />
            <Line type="monotone" dataKey="argon" name="Argon" stroke="#8b5cf6" strokeWidth={2} />
            <Line type="monotone" dataKey="hydrogen" name="Hydrogen" stroke="#06b6d4" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Department Consumption */}
      <Card title="Consumption by Department" subtitle="Distribution analysis" className="col-span-1 bg-white/70 border-slate-200/40">
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={110} height={110}>
            <PieChart>
              <Pie data={departmentConsumption} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="usage">
                {departmentConsumption.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 flex-1">
            {departmentConsumption.map(d => (
              <div key={d.department} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: d.color }}></div>
                <span className="text-[10px] text-slate-600 flex-1">{d.department}</span>
                <span className="text-[10px] font-bold text-slate-700">{d.usage}%</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Top Consumed Gases */}
      <Card title="Top Consumed Gases" subtitle="Monthly usage summary" className="col-span-3 bg-white/70 border-slate-200/40">
        <div className="overflow-hidden rounded-lg border border-slate-200/40">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Gas</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Monthly Usage</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Trend</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Progress</th>
              </tr>
            </thead>
            <tbody>
              {consumptionData.map((gas, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/60">
                  <td className="px-4 py-2.5 font-medium text-slate-800">{gas.gas}</td>
                  <td className="px-4 py-2.5 text-slate-700 font-bold">{gas.monthlyUsage}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-1">
                      <TrendingUp className={`w-3.5 h-3.5 ${gas.trend && gas.trend > 0 ? 'text-green-600' : 'text-red-600'}`} />
                      <span className={`text-xs font-medium ${gas.trend && gas.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {gas.trend && gas.trend > 0 ? '+' : ''}{gas.trend}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full"
                        style={{ width: `${Math.min(100, 20 + i * 20)}%` }}
                      ></div>
                    </div>
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
