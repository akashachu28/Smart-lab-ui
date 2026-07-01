import { useState } from 'react';
import { TrendingUp, AlertCircle, RefreshCw, ShoppingBag } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, PieChart, Pie, Cell } from 'recharts';

const forecastData = [
  { date: 'Jun 1', actual: 42, forecast: null, safety: 20 },
  { date: 'Jun 5', actual: 38, forecast: null, safety: 20 },
  { date: 'Jun 10', actual: 55, forecast: null, safety: 20 },
  { date: 'Jun 15', actual: 48, forecast: null, safety: 20 },
  { date: 'Jun 20', actual: 60, forecast: 62, safety: 20 },
  { date: 'Jun 25', actual: null, forecast: 58, safety: 20 },
  { date: 'Jun 30', actual: null, forecast: 65, safety: 20 },
  { date: 'Jul 5', actual: null, forecast: 72, safety: 20 },
  { date: 'Jul 10', actual: null, forecast: 68, safety: 20 },
];

const reorders = [
  { id: 'CHM-001', name: 'Acetone', currentStock: 4, forecastNeed: 25, reorderQty: 30, suggestedDate: '2024-06-22', confidence: 'High', sapSynced: true, stockout: false },
  { id: 'CHM-003', name: 'Hydrogen Peroxide', currentStock: 2, forecastNeed: 18, reorderQty: 20, suggestedDate: '2024-06-20', confidence: 'High', sapSynced: true, stockout: true },
  { id: 'AST-011', name: 'pH Buffer 7.0', currentStock: 0, forecastNeed: 5, reorderQty: 10, suggestedDate: '2024-06-18', confidence: 'Medium', sapSynced: false, stockout: true },
  { id: 'CHM-014', name: 'Ethanol 96%', currentStock: 8, forecastNeed: 22, reorderQty: 25, suggestedDate: '2024-06-28', confidence: 'High', sapSynced: true, stockout: false },
];

const categoryData = [
  { name: 'Solvents', value: 38, color: '#06b6d4' },
  { name: 'Acids', value: 22, color: '#8b5cf6' },
  { name: 'Reagents', value: 25, color: '#10b981' },
  { name: 'Consumables', value: 15, color: '#f59e0b' },
];

export function DemandForecasting() {
  const [horizon, setHorizon] = useState('30');

  return (
    <div className="p-5 min-h-full flex flex-col gap-4">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">Demand Forecasting</h2>
          <p className="text-xs text-slate-500">AI-driven consumption predictions, reorder timelines & SAP procurement sync</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400">SAP: Last synced 14 min ago</span>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-50">
            <RefreshCw className="w-3.5 h-3.5" /> Sync Now
          </button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-4 gap-3">
        <MetricCard title="Forecast Accuracy" value="91.4%" subtitle="Last 30 days" icon={TrendingUp} status="success" trend="up" trendValue="+2.1% vs last period" />
        <MetricCard title="Reorder Recommended" value="8 items" subtitle="AI-generated suggestions" icon={ShoppingBag} status="warning" />
        <MetricCard title="Pending SAP Sync" value="3 items" subtitle="Awaiting confirmation" icon={RefreshCw} status="info" />
        <MetricCard title="Stockouts Prevented" value="12" subtitle="This quarter" icon={AlertCircle} status="success" />
      </div>

      {/* Chart + Category */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Card title="Demand Forecast — Acetone" subtitle="Actual (solid) vs AI Prediction (dashed)">
            <div className="flex items-center gap-2 mb-3">
              {['7', '30', '90'].map(h => (
                <button key={h} onClick={() => setHorizon(h)} className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${horizon === h ? 'bg-cyan-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {h} days
                </button>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={{ fontSize: 11 }} />
                <ReferenceLine y={20} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Safety Stock', position: 'right', fontSize: 9, fill: '#f59e0b' }} />
                <Line type="monotone" dataKey="actual" stroke="#06b6d4" strokeWidth={2} dot={false} connectNulls={false} />
                <Line type="monotone" dataKey="forecast" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" dot={false} connectNulls={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
        <Card title="Demand by Category" subtitle="30-day forecast split">
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={55} dataKey="value">
                {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-1">
            {categoryData.map(d => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: d.color }}></div>
                <span className="text-[10px] text-slate-600 flex-1">{d.name}</span>
                <span className="text-[10px] font-medium text-slate-700">{d.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Reorder Table */}
      <div>
        <p className="text-xs font-semibold text-slate-700 mb-2">AI Reorder Recommendations</p>
        <div className="bg-white/70 rounded-xl border border-slate-200/40 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100">
                {['Item', 'Current Stock', 'Forecasted Need', 'Reorder Qty', 'Suggested Date', 'Confidence', 'SAP Status', 'Action'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-slate-500 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reorders.map(r => (
                <tr key={r.id} className={`border-b border-slate-50 hover:bg-slate-50/50 ${r.stockout ? 'bg-red-50/30' : ''}`}>
                  <td className="px-4 py-2.5">
                    <div>
                      <p className="font-medium text-slate-800">{r.name}</p>
                      <p className="text-[10px] text-slate-400">{r.id}</p>
                    </div>
                  </td>
                  <td className={`px-4 py-2.5 font-semibold ${r.currentStock === 0 ? 'text-red-600' : r.currentStock < 5 ? 'text-amber-600' : 'text-slate-700'}`}>{r.currentStock} L</td>
                  <td className="px-4 py-2.5 text-slate-700">{r.forecastNeed} L</td>
                  <td className="px-4 py-2.5 text-slate-700 font-medium">{r.reorderQty} L</td>
                  <td className="px-4 py-2.5 text-slate-600">{r.suggestedDate}</td>
                  <td className="px-4 py-2.5">
                    <Badge variant={r.confidence === 'High' ? 'success' : 'warning'} size="sm">{r.confidence}</Badge>
                  </td>
                  <td className="px-4 py-2.5">
                    {r.sapSynced
                      ? <Badge variant="success" size="sm">Synced</Badge>
                      : <Badge variant="warning" size="sm">Pending</Badge>
                    }
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex gap-1.5">
                      <button className="px-2.5 py-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg text-[10px] font-medium">Push SAP</button>
                      <button className="px-2.5 py-1 border border-slate-200 text-slate-500 rounded-lg text-[10px]">Dismiss</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
