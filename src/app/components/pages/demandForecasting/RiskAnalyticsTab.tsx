import { Card } from '../../ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { stockoutPredictions, supplierPerformance } from './data';
import { AlertTriangle, TrendingUp, Package } from 'lucide-react';

export function RiskAnalyticsTab() {
  const riskDistribution = [
    { name: 'Critical', value: 8, color: '#ef4444' },
    { name: 'Low Stock', value: 14, color: '#f59e0b' },
    { name: 'Healthy', value: 71, color: '#10b981' },
    { name: 'Overstock', value: 7, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Card title="Stock Risk Distribution" subtitle="Current inventory status">
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie 
                data={riskDistribution} 
                cx="50%" 
                cy="50%" 
                outerRadius={55} 
                dataKey="value"
              >
                {riskDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {riskDistribution.map(d => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: d.color }}></div>
                <span className="text-xs text-slate-600 flex-1">{d.name}</span>
                <span className="text-xs font-medium text-slate-700">{d.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Stockout Predictions" subtitle="High-risk items">
          <div className="space-y-2.5">
            {stockoutPredictions.map((item, idx) => (
              <div key={idx} className="p-2 bg-red-50 border border-red-100 rounded-lg">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-xs font-medium text-slate-800">{item.chemical}</p>
                  <span className="text-xs font-bold text-red-600">{item.probability}%</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-600">
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                  Expected: {item.expectedDate}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Overstock Analysis" subtitle="Capital optimization">
          <div className="space-y-3">
            <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
              <div className="flex items-center gap-2 mb-1">
                <Package className="w-4 h-4 text-purple-600" />
                <p className="text-[10px] text-purple-600 font-medium">Inventory Above 90 Days</p>
              </div>
              <p className="text-2xl font-bold text-purple-700">18</p>
              <p className="text-[10px] text-purple-600 mt-1">Chemicals</p>
            </div>
            
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <p className="text-[10px] text-amber-600 font-medium">Capital Locked</p>
              </div>
              <p className="text-2xl font-bold text-amber-700">₹24 L</p>
              <p className="text-[10px] text-amber-600 mt-1">Potential savings</p>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Supplier Performance Analytics" subtitle="Reliability and lead time tracking">
        <div className="bg-white/70 rounded-xl border border-slate-200/40 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Supplier</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">On-Time Delivery</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Avg Lead Time</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Reliability</th>
              </tr>
            </thead>
            <tbody>
              {supplierPerformance.map((supplier, idx) => (
                <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-800">{supplier.supplier}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-semibold ${
                      parseInt(supplier.onTimeDelivery) >= 95 ? 'text-emerald-600' : 
                      parseInt(supplier.onTimeDelivery) >= 90 ? 'text-cyan-600' : 
                      'text-amber-600'
                    }`}>
                      {supplier.onTimeDelivery}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{supplier.avgLeadTime}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-medium ${
                      supplier.reliability === 'Excellent' ? 'bg-emerald-50 text-emerald-700' :
                      supplier.reliability === 'Good' ? 'bg-cyan-50 text-cyan-700' :
                      'bg-amber-50 text-amber-700'
                    }`}>
                      {supplier.reliability}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {supplierPerformance.map((supplier, idx) => (
            <div key={idx} className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs font-medium text-slate-700 mb-1">{supplier.supplier}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 h-1.5 rounded-full" 
                    style={{ width: supplier.onTimeDelivery }}
                  ></div>
                </div>
                <span className="text-[10px] font-medium text-slate-600">{supplier.avgLeadTime}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
