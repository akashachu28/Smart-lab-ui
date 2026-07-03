import { Card } from '../../ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { equipmentFailures, incidentByShift, commonRootCauses, investigatorWorkload } from './data';

export function TrendsTab() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card title="Equipment Failure Analytics" subtitle="Top failure categories" className="col-span-1 bg-white/70 border-slate-200/40">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={equipmentFailures} layout="vertical" barSize={18}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 9 }} />
            <YAxis type="category" dataKey="equipment" tick={{ fontSize: 10 }} width={75} />
            <Tooltip contentStyle={{ fontSize: 11 }} />
            <Bar dataKey="count" fill="#ef4444" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Incident by Shift" subtitle="Distribution analysis" className="col-span-1 bg-white/70 border-slate-200/40">
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={130} height={130}>
            <PieChart>
              <Pie data={incidentByShift} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value">
                {incidentByShift.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 flex-1">
            {incidentByShift.map(d => (
              <div key={d.shift} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: d.color }}></div>
                <span className="text-[10px] text-slate-600 flex-1">{d.shift}</span>
                <span className="text-[10px] font-bold text-slate-700">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card title="Common Root Causes" subtitle="Category breakdown" className="col-span-1 bg-white/70 border-slate-200/40">
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={130} height={130}>
            <PieChart>
              <Pie data={commonRootCauses} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value">
                {commonRootCauses.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 flex-1">
            {commonRootCauses.map(d => (
              <div key={d.cause} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: d.color }}></div>
                <span className="text-[10px] text-slate-600 flex-1">{d.cause}</span>
                <span className="text-[10px] font-bold text-slate-700">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card title="Investigator Workload" subtitle="Current assignments" className="col-span-3 bg-white/70 border-slate-200/40">
        <div className="space-y-2">
          {investigatorWorkload.map((inv) => (
            <div key={inv.investigator} className="p-3 bg-slate-50/60 border border-slate-200/40 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-slate-800">{inv.investigator}</p>
                <div className="flex items-center gap-4 text-[10px]">
                  <span className="text-slate-600">Assigned: <span className="font-bold text-slate-800">{inv.assigned}</span></span>
                  <span className="text-amber-600">Open: <span className="font-bold">{inv.open}</span></span>
                  <span className="text-green-600">Closed: <span className="font-bold">{inv.closed}</span></span>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600" style={{ width: `${(inv.open / inv.assigned) * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
