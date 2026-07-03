import { Brain, Activity, TrendingUp } from 'lucide-react';
import { Card } from '../../ui/card';
import { aiInsights, recentActivity, sensorHealth, sensorTypes } from './data';

export function AIInsightsTab() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* AI Operational Insights */}
      <Card title="AI Operational Insights" subtitle="Predictive analytics and recommendations" className="col-span-2 bg-white/70 border-slate-200/40">
        <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto">
          {aiInsights.map((insight, i) => (
            <div key={i} className="flex items-start gap-2 p-3 bg-slate-50/60 border border-slate-200/40 rounded-lg">
              <Brain className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-700 leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card title="Recent Activity" subtitle="Live system events" className="col-span-1 bg-white/70 border-slate-200/40">
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {recentActivity.map((activity, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 bg-slate-50/60 border border-slate-200/40 rounded-lg">
              <div className="w-12 flex-shrink-0">
                <span className="text-[10px] font-mono text-cyan-600 font-bold">{activity.time}</span>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-medium text-slate-800">{activity.event}</p>
                {activity.location && (
                  <p className="text-[9px] text-slate-500 mt-0.5">{activity.location}</p>
                )}
                {activity.cylinder && (
                  <p className="text-[9px] text-slate-500 mt-0.5">{activity.cylinder}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* IoT Sensor Health */}
      <Card title="IoT Sensor Health" subtitle="Connected device monitoring" className="col-span-3 bg-white/70 border-slate-200/40">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/40 rounded-xl p-4 shadow-sm text-center">
              <Activity className="w-5 h-5 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{sensorHealth.connected}</div>
              <p className="text-[10px] text-slate-600">Connected</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200/40 rounded-xl p-4 shadow-sm text-center">
              <div className="w-5 h-5 rounded-full bg-red-200 mx-auto mb-2"></div>
              <div className="text-2xl font-bold text-slate-800 mb-1">{sensorHealth.offline}</div>
              <p className="text-[10px] text-slate-600">Offline</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/40 rounded-xl p-4 shadow-sm text-center">
              <div className="w-5 h-5 rounded-full bg-amber-200 mx-auto mb-2"></div>
              <div className="text-2xl font-bold text-slate-800 mb-1">{sensorHealth.batteryLow}</div>
              <p className="text-[10px] text-slate-600">Battery Low</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200/40 rounded-xl p-4 shadow-sm text-center">
              <div className="w-5 h-5 rounded-full bg-orange-200 mx-auto mb-2"></div>
              <div className="text-2xl font-bold text-slate-800 mb-1">{sensorHealth.communicationErrors}</div>
              <p className="text-[10px] text-slate-600">Comm Errors</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-700 mb-2">Sensor Types</h4>
            <div className="flex items-center justify-between p-2.5 bg-blue-50/60 border border-blue-200/40 rounded-lg">
              <span className="text-xs text-slate-700">Pressure Sensors</span>
              <span className="text-sm font-bold text-blue-700">{sensorTypes.pressureSensors}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-red-50/60 border border-red-200/40 rounded-lg">
              <span className="text-xs text-slate-700">Leak Sensors</span>
              <span className="text-sm font-bold text-red-700">{sensorTypes.leakSensors}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-amber-50/60 border border-amber-200/40 rounded-lg">
              <span className="text-xs text-slate-700">Temperature Sensors</span>
              <span className="text-sm font-bold text-amber-700">{sensorTypes.temperatureSensors}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-purple-50/60 border border-purple-200/40 rounded-lg">
              <span className="text-xs text-slate-700">RFID Readers</span>
              <span className="text-sm font-bold text-purple-700">{sensorTypes.rfidReaders}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
