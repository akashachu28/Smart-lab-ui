import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Brain } from 'lucide-react';
import { aiInsights, recentActivity } from './data';

export function AIInsightsTab() {
  return (
    <div className="space-y-4">
      {/* AI Operational Insights */}
      <Card title="AI Operational Insights" subtitle="Key findings and recommendations" className="bg-white/70 border-slate-200/40">
        <div className="grid grid-cols-2 gap-3">
          {aiInsights.map((insight, i) => (
            <div key={i} className="flex items-start gap-2 p-3 bg-slate-50/60 border border-slate-200/40 rounded-lg">
              <div className="w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-cyan-700">{i + 1}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activity Feed */}
      <Card title="Recent Activity Feed" subtitle="Latest investigation events" className="bg-white/70 border-slate-200/40">
        <div className="space-y-2">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50/60 border border-slate-200/40 rounded-lg">
              <div className="text-[10px] text-slate-400 font-mono min-w-[45px]">{activity.time}</div>
              <div className="flex-1">
                <p className="text-xs text-slate-800 font-medium mb-0.5">{activity.event}</p>
                <p className="text-[10px] text-slate-500">{activity.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>


      {/* AI Performance Metrics */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 border border-cyan-200/40 rounded-xl p-4 shadow-sm">
          <Brain className="w-5 h-5 text-cyan-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">94.8%</div>
          <p className="text-xs text-slate-600">AI Accuracy</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/40 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-slate-800 mb-1">3.4 days</div>
          <p className="text-xs text-slate-600">Avg Investigation Time</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/40 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-slate-800 mb-1">91%</div>
          <p className="text-xs text-slate-600">CAPA Success Rate</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/40 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-slate-800 mb-1">1,847</div>
          <p className="text-xs text-slate-600">KB Incidents Indexed</p>
        </div>
      </div>

      {/* AI Recommendations Summary */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/40 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-5 h-5 text-indigo-600" />
          <p className="text-xs font-semibold text-slate-700">AI Recommendations Summary</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Critical Actions', value: '2', badge: 'error' as const },
            { label: 'High Priority', value: '5', badge: 'warning' as const },
            { label: 'Preventive Measures', value: '8', badge: 'info' as const },
            { label: 'Knowledge Updates', value: '12', badge: 'success' as const },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
              <span className="text-xs text-slate-700">{item.label}</span>
              <Badge variant={item.badge} size="sm">{item.value}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
