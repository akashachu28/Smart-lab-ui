import { Card } from '../../ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { incidentDistribution, incidentSeverity, incidentTrend, incidentByDepartment } from './data';

export function OverviewTab() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card title="Incident Distribution" subtitle="By type" className="col-span-1 bg-white/70 border-slate-200/40">
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={130} height={130}>
            <PieChart>
              <Pie data={incidentDistribution} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value">
                {incidentDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 flex-1">
            {incidentDistribution.map(d => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: d.color }}></div>
                <span className="text-[10px] text-slate-600 flex-1 truncate">{d.name}</span>
                <span className="text-[10px] font-bold text-slate-700">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card title="Incident Trend" subtitle="Last 6 months" className="col-span-1 bg-white/70 border-slate-200/40">
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={incidentTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 9 }} />
            <YAxis tick={{ fontSize: 9 }} />
            <Tooltip contentStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Incident Severity" subtitle="Distribution" className="col-span-1 bg-white/70 border-slate-200/40">
        <div className="space-y-3">
          {incidentSeverity.map(item => (
            <div key={item.severity}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-700">{item.severity}</span>
                <span className="text-xs font-bold" style={{ color: item.color }}>{item.value}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full" 
                  style={{ width: `${item.value}%`, backgroundColor: item.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Incident by Department" subtitle="Current period" className="col-span-3 bg-white/70 border-slate-200/40">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={incidentByDepartment} layout="vertical" barSize={20}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 9 }} />
            <YAxis type="category" dataKey="department" tick={{ fontSize: 10 }} width={80} />
            <Tooltip contentStyle={{ fontSize: 11 }} />
            <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
