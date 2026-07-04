import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Brain, CheckCircle, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { compatibilityChecks, validationResults } from './data';

export function ValidationTab() {
  const compatibilityDistribution = [
    { name: 'Compatible', value: 99.2, color: '#10b981' },
    { name: 'Minor Warning', value: 0.5, color: '#f59e0b' },
    { name: 'Critical Conflict', value: 0.3, color: '#ef4444' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Validation Results */}
      <div className="col-span-3 grid grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/40 rounded-xl p-4 shadow-sm">
          <Brain className="w-5 h-5 text-blue-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">{validationResults.validated.toLocaleString()}</div>
          <p className="text-xs text-slate-600">Validated</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/40 rounded-xl p-4 shadow-sm">
          <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">{validationResults.compatible.toLocaleString()}</div>
          <p className="text-xs text-slate-600">Compatible</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/40 rounded-xl p-4 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">{validationResults.warning}</div>
          <p className="text-xs text-slate-600">Warning</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200/40 rounded-xl p-4 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-red-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">{validationResults.critical}</div>
          <p className="text-xs text-slate-600">Critical</p>
        </div>
      </div>

      {/* Compatibility Distribution */}
      <Card title="Compatibility Distribution" subtitle="Overall validation results" className="col-span-1 bg-white/70 border-slate-200/40">
        <div className="flex flex-col items-center justify-center py-4">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie data={compatibilityDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value">
                {compatibilityDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-4 w-full">
            {compatibilityDistribution.map(d => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: d.color }}></div>
                <span className="text-xs text-slate-600 flex-1">{d.name}</span>
                <span className="text-xs font-bold text-slate-700">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* AI Compatibility Engine */}
      <Card title="AI Compatibility Engine" subtitle="Recent compatibility checks" className="col-span-2 bg-white/70 border-slate-200/40">
        <div className="overflow-hidden rounded-lg border border-slate-200/40">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Chemical A</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Chemical B</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Risk</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Hazard Type</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {compatibilityChecks.map((check, idx) => (
                <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3 text-slate-700 font-medium">{check.chemicalA}</td>
                  <td className="px-4 py-3 text-slate-700 font-medium">{check.chemicalB}</td>
                  <td className="px-4 py-3">
                    <Badge 
                      variant={check.risk === 'Critical' ? 'error' : check.risk === 'Warning' ? 'warning' : 'success'} 
                      size="sm"
                    >
                      {check.risk}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{check.hazardType}</td>
                  <td className="px-4 py-3 text-slate-600">{check.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
