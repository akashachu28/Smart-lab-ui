import { Card } from '../../ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { rackData, rackLabels, rackColors, trendData, storageHeatmap, violationCategories } from './data';

export function OverviewTab() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Storage Rack Map */}
      <Card title="Storage Rack Compatibility Map" subtitle="Section A–E" className="col-span-1 bg-white/70 border-slate-200/40">
        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          {rackData.flat().map((cell, i) => {
            const row = Math.floor(i / 5);
            const col = i % 5;
            return (
              <div key={i} className={`h-12 rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer hover:opacity-80 transition-opacity ${rackColors[cell]}`}>
                <span className="text-[9px] font-bold">{String.fromCharCode(65 + row)}{col + 1}</span>
                <span className="text-[8px]">{cell !== 'empty' ? rackLabels[cell] : '—'}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex gap-3">
          {Object.entries(rackColors).map(([k, v]) => (
            <div key={k} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded border ${v.replace(' animate-pulse', '')}`}></div>
              <span className="text-[10px] text-slate-500 capitalize">{k}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Violations Trend */}
      <Card title="Violations Trend" subtitle="Last 30 days" className="col-span-1 bg-white/70 border-slate-200/40">
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 9 }} />
            <YAxis tick={{ fontSize: 9 }} />
            <Tooltip contentStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="violations" stroke="#ef4444" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Violation Categories */}
      <Card title="Violation Categories" subtitle="Distribution breakdown" className="col-span-1 bg-white/70 border-slate-200/40">
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={130} height={130}>
            <PieChart>
              <Pie data={violationCategories} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value">
                {violationCategories.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 flex-1">
            {violationCategories.map(d => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: d.color }}></div>
                <span className="text-[10px] text-slate-600 flex-1">{d.name}</span>
                <span className="text-[10px] font-bold text-slate-700">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Storage Heatmap */}
      <Card title="Storage Occupancy Heatmap" subtitle="By location" className="col-span-3 bg-white/70 border-slate-200/40">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={storageHeatmap}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="location" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
            <Tooltip contentStyle={{ fontSize: 11 }} />
            <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
