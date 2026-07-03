import { Card } from '../../ui/Card';
import { Brain, Clock, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { aiInsights, recentSafetyEvents, riskDistribution, highRiskChemicals, environmentalReadings } from './data';

export function AIInsightsTab() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* AI Insights */}
      <Card title="AI Operational Insights" subtitle="Intelligent recommendations and observations" className="col-span-1 bg-white/70 border-slate-200/40">
        <div className="space-y-2.5">
          {aiInsights.map((insight, idx) => (
            <div key={idx} className="flex items-start gap-2 p-2.5 bg-gradient-to-r from-purple-50 to-cyan-50 rounded-lg border border-purple-100">
              <div className="mt-0.5">
                <Brain className="w-3.5 h-3.5 text-purple-600" />
              </div>
              <p className="text-xs text-slate-700 flex-1">{insight}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Safety Events */}
      <Card title="Recent Safety Events" subtitle="System activity log" className="col-span-1 bg-white/70 border-slate-200/40">
        <div className="space-y-2">
          {recentSafetyEvents.map((activity, i) => (
            <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-center w-12 h-8 bg-gradient-to-br from-cyan-50 to-purple-50 rounded-lg border border-cyan-100 flex-shrink-0">
                <Clock className="w-3.5 h-3.5 text-cyan-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-700">{activity.event}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{activity.time} • {activity.detail}</p>
              </div>
              <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
            </div>
          ))}
        </div>
      </Card>

      {/* Risk Distribution */}
      <Card title="Risk Assessment" subtitle="Risk categories distribution" className="col-span-1 bg-white/70 border-slate-200/40">
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={140} height={140}>
            <PieChart>
              <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value">
                {riskDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 flex-1">
            {riskDistribution.map(d => (
              <div key={d.category} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: d.color }}></div>
                <span className="text-[10px] text-slate-600 flex-1">{d.category}</span>
                <span className="text-[10px] font-bold text-slate-700">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* High Risk Chemicals */}
      <Card title="High Risk Chemicals" subtitle="Chemicals requiring attention" className="col-span-1 bg-white/70 border-slate-200/40">
        <div className="space-y-2.5">
          {highRiskChemicals.map((chem, idx) => (
            <div key={idx} className="p-2.5 bg-red-50 border border-red-100 rounded-lg">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-xs font-medium text-slate-800">{chem.chemical}</p>
                  <p className="text-[10px] text-slate-500">{chem.casNumber}</p>
                </div>
                <span className="text-xs font-bold text-red-600">{chem.riskScore}</span>
              </div>
              <p className="text-[10px] text-slate-600">Location: {chem.location}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Environmental Monitoring */}
      <Card title="Environmental Monitoring" subtitle="IoT sensor readings" className="col-span-2 bg-white/70 border-slate-200/40">
        <div className="grid grid-cols-5 gap-3">
          {environmentalReadings.map((reading, idx) => (
            <div key={idx} className="text-center p-3 bg-slate-50/60 border border-slate-200/40 rounded-lg">
              <p className="text-[10px] text-slate-500 mb-1">{reading.parameter}</p>
              <p className="text-lg font-bold text-slate-800">{reading.value}{reading.unit || ''}</p>
              <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-medium ${
                reading.status === 'Normal' ? 'bg-green-100 text-green-700' :
                reading.status === 'Warning' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              }`}>{reading.status}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
