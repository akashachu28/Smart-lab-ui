import { Badge } from '../../ui/badge';
import { reorderItems } from './data';

export function ReorderRecommendationsTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-semibold text-slate-700">AI Reorder Recommendations</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Automated suggestions based on consumption patterns</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="error" size="sm">Critical: 8</Badge>
          <Badge variant="warning" size="sm">High Priority: 14</Badge>
          <Badge variant="info" size="sm">Medium: 21</Badge>
        </div>
      </div>

      <div className="bg-white/70 rounded-xl border border-slate-200/40 overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              {['Item', 'Current Stock', 'Forecasted Need', 'Reorder Qty', 'Suggested Date', 'Confidence', 'SAP Status', 'Action'].map(h => (
                <th key={h} className="text-left px-4 py-2.5 text-slate-500 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reorderItems.map(r => (
              <tr 
                key={r.id} 
                className={`border-b border-slate-50 hover:bg-slate-50/50 ${
                  r.stockout ? 'bg-red-50/30' : ''
                }`}
              >
                <td className="px-4 py-2.5">
                  <div>
                    <p className="font-medium text-slate-800">{r.name}</p>
                    <p className="text-[10px] text-slate-400">{r.id}</p>
                  </div>
                </td>
                <td className={`px-4 py-2.5 font-semibold ${
                  r.currentStock === 0 ? 'text-red-600' : 
                  r.currentStock < 5 ? 'text-amber-600' : 
                  'text-slate-700'
                }`}>
                  {r.currentStock} L
                </td>
                <td className="px-4 py-2.5 text-slate-700">{r.forecastNeed} L</td>
                <td className="px-4 py-2.5 text-slate-700 font-medium">{r.reorderQty} L</td>
                <td className="px-4 py-2.5 text-slate-600">{r.suggestedDate}</td>
                <td className="px-4 py-2.5">
                  <Badge 
                    variant={r.confidence === 'High' ? 'success' : 'warning'} 
                    size="sm"
                  >
                    {r.confidence}
                  </Badge>
                </td>
                <td className="px-4 py-2.5">
                  {r.sapSynced
                    ? <Badge variant="success" size="sm">Synced</Badge>
                    : <Badge variant="warning" size="sm">Pending</Badge>
                  }
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <button className="px-2.5 py-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg text-[10px] font-medium hover:from-cyan-600 hover:to-cyan-700">
                      Push SAP
                    </button>
                    <button className="px-2.5 py-1 border border-slate-200 text-slate-500 rounded-lg text-[10px] hover:bg-slate-50">
                      Dismiss
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 bg-gradient-to-r from-purple-50 to-cyan-50 rounded-xl border border-purple-100 p-4">
        <p className="text-xs font-semibold text-slate-700 mb-2">AI Reasoning — Nitric Acid Order</p>
        <div className="space-y-1.5">
          <div className="flex items-start gap-2">
            <span className="text-purple-600 text-xs">•</span>
            <p className="text-xs text-slate-600">Current stock will be exhausted within 11 days based on historical consumption.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-600 text-xs">•</span>
            <p className="text-xs text-slate-600">Supplier lead time is 7 days, requiring immediate action.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-600 text-xs">•</span>
            <p className="text-xs text-slate-600">Upcoming projects increase expected demand by 18%.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
