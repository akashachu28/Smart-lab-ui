import { Card } from '../../ui/Card';
import { aiInsights, recentActivity } from './data';
import { Sparkles, Clock, TrendingUp, AlertCircle } from 'lucide-react';

export function AIInsightsTab() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card title="AI Operational Insights" subtitle="Intelligent recommendations and observations">
        <div className="space-y-2.5">
          {aiInsights.map((insight, idx) => (
            <div key={idx} className="flex items-start gap-2 p-2.5 bg-gradient-to-r from-purple-50 to-cyan-50 rounded-lg border border-purple-100">
              <div className="mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              </div>
              <p className="text-xs text-slate-700 flex-1">{insight}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-cyan-50 rounded-lg p-2 text-center">
              <TrendingUp className="w-4 h-4 text-cyan-600 mx-auto mb-1" />
              <p className="text-xs font-bold text-cyan-700">96.8%</p>
              <p className="text-[10px] text-cyan-600">Model Accuracy</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-2 text-center">
              <Sparkles className="w-4 h-4 text-purple-600 mx-auto mb-1" />
              <p className="text-xs font-bold text-purple-700">326</p>
              <p className="text-[10px] text-purple-600">Active Models</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-2 text-center">
              <AlertCircle className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <p className="text-xs font-bold text-emerald-700">29</p>
              <p className="text-[10px] text-emerald-600">Recommendations</p>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Recent Forecast Activity" subtitle="System events and updates">
        <div className="space-y-2">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-center w-12 h-8 bg-gradient-to-br from-cyan-50 to-purple-50 rounded-lg border border-cyan-100 flex-shrink-0">
                <Clock className="w-3.5 h-3.5 text-cyan-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-700">{activity.action}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100">
          <button className="w-full px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-50">
            View Full Activity Log
          </button>
        </div>
      </Card>
    </div>
  );
}
