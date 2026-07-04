import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Eye, CheckCircle, AlertTriangle, Brain } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { visionAlerts, detectionSummary, detectionTypes } from './data';

export function VisionMonitoringTab() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Detection Summary */}
      <div className="col-span-3 grid grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/40 rounded-xl p-4 shadow-sm">
          <Eye className="w-5 h-5 text-blue-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">{detectionSummary.containersDetected.toLocaleString()}</div>
          <p className="text-xs text-slate-600">Containers Detected</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200/40 rounded-xl p-4 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-red-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">{detectionSummary.violations}</div>
          <p className="text-xs text-slate-600">Storage Violations</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/40 rounded-xl p-4 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">{detectionSummary.misplacedContainers}</div>
          <p className="text-xs text-slate-600">Misplaced Containers</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/40 rounded-xl p-4 shadow-sm">
          <Brain className="w-5 h-5 text-green-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">{detectionSummary.accuracy}%</div>
          <p className="text-xs text-slate-600">Detection Accuracy</p>
        </div>
      </div>

      {/* Detection Types */}
      <Card title="AI Detection Types" subtitle="Classification breakdown" className="col-span-1 bg-white/70 border-slate-200/40">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={detectionTypes} layout="vertical" barSize={16}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 9 }} />
            <YAxis type="category" dataKey="type" tick={{ fontSize: 10 }} width={100} />
            <Tooltip contentStyle={{ fontSize: 11 }} />
            <Bar dataKey="count" fill="#06b6d4" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Live Vision Alerts */}
      <Card title="Live Vision Alerts" subtitle="Real-time detection" className="col-span-2 bg-white/70 border-slate-200/40">
        <div className="space-y-2">
          {visionAlerts.map(alert => (
            <div key={alert.id} className={`p-3 border rounded-lg ${
              alert.severity === 'Critical' ? 'bg-red-50 border-red-200' :
              alert.severity === 'High' ? 'bg-orange-50 border-orange-200' :
              'bg-amber-50 border-amber-200'
            } ${alert.resolved ? 'opacity-50' : ''}`}>
              <div className="flex items-start justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-4 h-4 ${
                    alert.severity === 'Critical' ? 'text-red-600' :
                    alert.severity === 'High' ? 'text-orange-600' :
                    'text-amber-600'
                  }`} />
                  <span className="text-xs font-medium text-slate-800">{alert.issue}</span>
                </div>
                <Badge variant={alert.resolved ? 'success' : 'error'} size="sm">
                  {alert.resolved ? 'Resolved' : 'Active'}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>Location: {alert.area}</span>
                <span>{alert.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
