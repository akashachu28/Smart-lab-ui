import { Badge } from '../../ui/badge';
import { Card } from '../../ui/card';
import { chemicalDemands } from './data';

export function DemandPredictionTab() {
  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'Critical': return 'text-red-600 bg-red-50';
      case 'High': return 'text-amber-600 bg-amber-50';
      case 'Normal': return 'text-emerald-600 bg-emerald-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div>
      <Card title="Demand Prediction by Chemical" subtitle="30-day forecast overview">
        <div className="bg-white/70 rounded-xl border border-slate-200/40 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Chemical</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Current Stock</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Forecast (30 Days)</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Days Remaining</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Risk</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {chemicalDemands.map((item, idx) => (
                <tr 
                  key={idx} 
                  className={`border-b border-slate-50 hover:bg-slate-50/50 ${
                    item.risk === 'Critical' ? 'bg-red-50/30' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-800">{item.chemical}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{item.currentStock}</td>
                  <td className="px-4 py-3 text-slate-700 font-medium">{item.forecast30Days}</td>
                  <td className="px-4 py-3">
                    <span className={`font-semibold ${
                      item.daysRemaining < 15 ? 'text-red-600' : 
                      item.daysRemaining < 25 ? 'text-amber-600' : 
                      'text-emerald-600'
                    }`}>
                      {item.daysRemaining} days
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-medium ${getRiskColor(item.risk)}`}>
                      {item.risk}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-cyan-600 hover:text-cyan-700 font-medium text-[10px]">
                      View Details →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-4 bg-gradient-to-r from-purple-50 to-cyan-50 rounded-xl border border-purple-100 p-4">
        <p className="text-xs font-semibold text-slate-700 mb-2">AI Forecast Detail — Nitric Acid</p>
        <div className="grid grid-cols-5 gap-3">
          <div>
            <p className="text-[10px] text-slate-500 mb-1">Current Stock</p>
            <p className="text-sm font-bold text-slate-800">42 L</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 mb-1">Predicted Demand</p>
            <p className="text-sm font-bold text-slate-800">96 L</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 mb-1">Forecast Confidence</p>
            <p className="text-sm font-bold text-emerald-600">97%</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 mb-1">Recommended Order</p>
            <p className="text-sm font-bold text-cyan-600">80 L</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 mb-1">Expected Stockout</p>
            <p className="text-sm font-bold text-red-600">11 Days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
