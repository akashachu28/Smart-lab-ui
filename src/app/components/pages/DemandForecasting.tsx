import { useState } from 'react';
import { Package, AlertTriangle, DollarSign, Target, TrendingUp, Calendar, ShoppingCart, Brain, ChevronDown, AlertCircle, Truck } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { Badge } from '../ui/Badge';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';

// Data
const demandTrendData = [
  { date: 'Jun 1', historical: 820, predicted: null, lower: null, upper: null },
  { date: 'Jun 8', historical: 950, predicted: null, lower: null, upper: null },
  { date: 'Jun 15', historical: 1100, predicted: null, lower: null, upper: null },
  { date: 'Jun 22', historical: 890, predicted: null, lower: null, upper: null },
  { date: 'Jun 29', historical: 1050, predicted: 1080, lower: 980, upper: 1180 },
  { date: 'Jul 6', historical: null, predicted: 1200, lower: 1100, upper: 1300 },
  { date: 'Jul 13', historical: null, predicted: 1350, lower: 1250, upper: 1450 },
  { date: 'Jul 20', historical: null, predicted: 1180, lower: 1080, upper: 1280 },
  { date: 'Jul 27', historical: null, predicted: 1420, lower: 1320, upper: 1520 },
];

const chemicalForecast = [
  { chemical: 'Sulfuric Acid', current: 450, predicted: 610, daysLeft: 12, risk: 'High', order: '500 L', color: '#ef4444' },
  { chemical: 'Sodium Hydroxide', current: 900, predicted: 420, daysLeft: 35, risk: 'Low', order: 'None', color: '#10b981' },
  { chemical: 'Acetone', current: 250, predicted: 700, daysLeft: 6, risk: 'Critical', order: '1000 L', color: '#dc2626' },
  { chemical: 'Ethanol', current: 680, predicted: 520, daysLeft: 21, risk: 'Medium', order: '300 L', color: '#f59e0b' },
  { chemical: 'Methanol', current: 320, predicted: 480, daysLeft: 11, risk: 'High', order: '400 L', color: '#ef4444' },
  { chemical: 'Hydrochloric Acid', current: 550, predicted: 380, daysLeft: 24, risk: 'Low', order: 'None', color: '#10b981' },
];

const inventoryRisk = [
  { chemical: 'Acetone', risk: 95 },
  { chemical: 'Methanol', risk: 82 },
  { chemical: 'Sulfuric Acid', risk: 74 },
  { chemical: 'Ethanol', risk: 58 },
  { chemical: 'HCl', risk: 32 },
  { chemical: 'NaOH', risk: 18 },
];

const consumptionHeatmap = [
  { chemical: 'Acetone', w1: 85, w2: 92, w3: 78, w4: 95 },
  { chemical: 'NaOH', w1: 45, w2: 38, w3: 42, w4: 50 },
  { chemical: 'Ethanol', w1: 72, w2: 68, w3: 55, w4: 62 },
  { chemical: 'H2SO4', w1: 88, w2: 85, w3: 90, w4: 82 },
  { chemical: 'Methanol', w1: 65, w2: 70, w3: 68, w4: 75 },
];

const monthlyComparison = [
  { month: 'Jan', actual: 420, forecast: 410 },
  { month: 'Feb', actual: 380, forecast: 395 },
  { month: 'Mar', actual: 510, forecast: 485 },
  { month: 'Apr', actual: 460, forecast: 475 },
  { month: 'May', actual: 550, forecast: 540 },
  { month: 'Jun', actual: 620, forecast: 605 },
];

const demandDrivers = [
  { name: 'Project Alpha', value: 42, color: '#06b6d4' },
  { name: 'Routine Production', value: 31, color: '#8b5cf6' },
  { name: 'Maintenance', value: 17, color: '#f59e0b' },
  { name: 'Unexpected Repair', value: 10, color: '#ef4444' },
];

const supplierLeadTime = [
  { supplier: 'ABC Chemicals', lead: 5, nextPO: 'Aug 4', risk: 'Low' },
  { supplier: 'Sigma Ltd', lead: 14, nextPO: 'Aug 9', risk: 'Medium' },
  { supplier: 'ChemCorp', lead: 21, nextPO: 'Aug 12', risk: 'High' },
  { supplier: 'Global Chem', lead: 7, nextPO: 'Aug 6', risk: 'Low' },
];

const projectDemand = [
  { project: 'Project A', demand: 280 },
  { project: 'Project B', demand: 150 },
  { project: 'Project C', demand: 340 },
  { project: 'Project D', demand: 120 },
];

const stockCoverage = [
  { chemical: 'Acetone', days: 6, total: 30 },
  { chemical: 'H2SO4', days: 12, total: 30 },
  { chemical: 'NaOH', days: 35, total: 30 },
  { chemical: 'Ethanol', days: 21, total: 30 },
];

const procurementRecommendations = [
  '✔ Order 500L Sulfuric Acid within 5 days.',
  '✔ Delay Ethanol purchase by 2 weeks.',
  '✔ Consolidate purchases with Project Alpha.',
  '✔ Reduce NaOH stock by 18%.',
  '✔ Increase Acetone safety stock by 30%.',
];

const aiInsights = [
  'AI predicts Sulfuric Acid inventory will fall below the safety threshold in 9 days based on current consumption trends.',
  'Acetone demand is expected to increase by 28% due to upcoming maintenance activities.',
  'Sodium Hydroxide inventory exceeds projected demand by 22%, indicating potential overstock.',
  'Consolidating purchase orders for three high-demand chemicals could reduce procurement costs by approximately 8%.',
  'Current demand forecasts maintain a confidence level of 94%, driven by stable historical usage patterns.',
];

const C = {
  cyan: '#06b6d4', purple: '#8b5cf6', green: '#10b981',
  amber: '#f59e0b', red: '#ef4444', blue: '#3b82f6',
  slate: '#94a3b8',
};

function SectionCard({ title, subtitle, children, className = '' }: {
  title: string; subtitle?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={`bg-white/70 border border-slate-200/40 rounded-xl shadow-sm p-4 ${className}`}>
      <div className="mb-3">
        <p className="text-xs font-semibold text-slate-800">{title}</p>
        {subtitle && <p className="text-[10px] text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function getHeatColor(value: number) {
  if (value >= 80) return 'bg-red-500';
  if (value >= 60) return 'bg-orange-400';
  if (value >= 40) return 'bg-yellow-400';
  return 'bg-green-400';
}

function getRiskBadge(risk: string): 'success' | 'warning' | 'error' {
  if (risk === 'Critical' || risk === 'High') return 'error';
  if (risk === 'Medium') return 'warning';
  return 'success';
}

export function DemandForecasting() {
  const [forecastPeriod, setForecastPeriod] = useState('30');
  const [plantFilter, setPlantFilter] = useState('All');

  return (
    <div className="p-5 min-h-full flex flex-col gap-4">
      {/* Header with Filters */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">Demand Forecasting</h2>
          <p className="text-xs text-slate-500">AI-driven consumption predictions, reorder timelines & inventory optimization</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={plantFilter} onChange={(e) => setPlantFilter(e.target.value)} className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white">
            <option>All Plants</option>
            <option>Plant A</option>
            <option>Plant B</option>
          </select>
          <select value={forecastPeriod} onChange={(e) => setForecastPeriod(e.target.value)} className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white">
            <option value="7">7 Days</option>
            <option value="30">30 Days</option>
            <option value="60">60 Days</option>
            <option value="90">90 Days</option>
          </select>
        </div>
      </div>

      {/* KPI Cards (6) */}
      <div className="grid grid-cols-4 gap-3">
        <MetricCard title="Forecasted Demand" value="24,500 L" subtitle="Next 30 days" icon={Package} status="info" />
        <MetricCard title="Materials at Risk" value="7" subtitle="Expected stockout" icon={AlertTriangle} status="error" />
        <MetricCard title="Recommended Orders" value="14" subtitle="AI suggestions" icon={ShoppingCart} status="warning" />
        <MetricCard title="Inventory Coverage" value="19 Days" subtitle="Avg stock days" icon={Calendar} status="info" />
      </div>

      {/* Demand Forecast Trend (Large Line Chart) */}
      <SectionCard title="Demand Forecast Trend" subtitle="Historical vs AI predicted with confidence interval">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={demandTrendData}>
            <defs>
              <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.cyan} stopOpacity={0.1}/>
                <stop offset="95%" stopColor={C.cyan} stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={{ fontSize: 11 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Area type="monotone" dataKey="upper" stroke="none" fill="url(#confidenceGradient)" />
            <Area type="monotone" dataKey="lower" stroke="none" fill="url(#confidenceGradient)" />
            <Line type="monotone" dataKey="historical" stroke={C.blue} strokeWidth={2.5} name="Historical Usage" dot={{ r: 4 }} />
            <Line type="monotone" dataKey="predicted" stroke={C.cyan} strokeWidth={2.5} strokeDasharray="5 5" name="AI Forecast" dot={{ r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </SectionCard>

      {/* Chemical Forecast Table + Inventory Risk */}
      <div className="grid grid-cols-3 gap-4">
        {/* Chemical Forecast Table */}
        <SectionCard title="Chemical Demand Forecast" subtitle="Predicted consumption & reorder recommendations" className="col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left px-3 py-2 text-slate-500 font-medium">Chemical</th>
                  <th className="text-right px-3 py-2 text-slate-500 font-medium">Current</th>
                  <th className="text-right px-3 py-2 text-slate-500 font-medium">Predicted</th>
                  <th className="text-center px-3 py-2 text-slate-500 font-medium">Days Left</th>
                  <th className="text-center px-3 py-2 text-slate-500 font-medium">Risk</th>
                  <th className="text-right px-3 py-2 text-slate-500 font-medium">Recommended Order</th>
                </tr>
              </thead>
              <tbody>
                {chemicalForecast.map((item, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-3 py-2.5 font-medium text-slate-800">{item.chemical}</td>
                    <td className="px-3 py-2.5 text-right text-slate-600">{item.current} L</td>
                    <td className="px-3 py-2.5 text-right font-semibold text-slate-700">{item.predicted} L</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${item.daysLeft <= 7 ? 'bg-red-100 text-red-700' : item.daysLeft <= 14 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                        {item.daysLeft} days
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <Badge variant={getRiskBadge(item.risk)} size="sm">{item.risk}</Badge>
                    </td>
                    <td className="px-3 py-2.5 text-right font-medium text-cyan-600">{item.order}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Inventory Risk Bar Chart */}
        <SectionCard title="Inventory Risk Score" subtitle="Materials requiring attention">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={inventoryRisk} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="chemical" tick={{ fontSize: 10 }} width={80} />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <Bar dataKey="risk" radius={[0, 4, 4, 0]}>
                {inventoryRisk.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.risk >= 80 ? C.red : entry.risk >= 60 ? C.amber : entry.risk >= 40 ? C.purple : C.green} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      {/* Monthly Forecast + Consumption Heatmap */}
      <div className="grid grid-cols-2 gap-4">
        {/* Monthly Demand Comparison */}
        <SectionCard title="Monthly Demand Comparison" subtitle="Actual vs Forecasted - Seasonality trends">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="actual" fill={C.blue} name="Actual" radius={[4, 4, 0, 0]} />
              <Bar dataKey="forecast" fill={C.green} name="Forecast" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Consumption Heatmap */}
        <SectionCard title="Consumption Heatmap" subtitle="Weekly usage intensity by chemical">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-3 py-2 text-slate-500 font-medium">Chemical</th>
                  <th className="text-center px-3 py-2 text-slate-500 font-medium">W1</th>
                  <th className="text-center px-3 py-2 text-slate-500 font-medium">W2</th>
                  <th className="text-center px-3 py-2 text-slate-500 font-medium">W3</th>
                  <th className="text-center px-3 py-2 text-slate-500 font-medium">W4</th>
                </tr>
              </thead>
              <tbody>
                {consumptionHeatmap.map((row, i) => (
                  <tr key={i} className="border-b border-slate-50">
                    <td className="px-3 py-2 font-medium text-slate-700">{row.chemical}</td>
                    {[row.w1, row.w2, row.w3, row.w4].map((val, j) => (
                      <td key={j} className="px-3 py-2 text-center">
                        <div className={`w-12 h-8 rounded flex items-center justify-center text-white font-semibold text-[10px] mx-auto ${getHeatColor(val)}`}>
                          {val}%
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      {/* Demand Drivers + Supplier Lead Time */}
      <div className="grid grid-cols-2 gap-4">
        {/* Demand Drivers Pie Chart */}
        <SectionCard title="Demand Drivers" subtitle="What's causing chemical consumption">
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={demandDrivers} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={(entry) => `${entry.value}%`} labelLine={false}>
                  {demandDrivers.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {demandDrivers.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ background: d.color }}></div>
                  <span className="text-[10px] text-slate-600 flex-1">{d.name}</span>
                  <span className="text-xs font-bold text-slate-700">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* Supplier Lead Time */}
        <SectionCard title="Supplier Lead Time" subtitle="Delivery timelines & risk assessment">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left px-3 py-2 text-slate-500 font-medium">Supplier</th>
                  <th className="text-center px-3 py-2 text-slate-500 font-medium">Avg Delivery</th>
                  <th className="text-center px-3 py-2 text-slate-500 font-medium">Next PO</th>
                  <th className="text-center px-3 py-2 text-slate-500 font-medium">Delay Risk</th>
                </tr>
              </thead>
              <tbody>
                {supplierLeadTime.map((s, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-3 py-2.5 font-medium text-slate-800">{s.supplier}</td>
                    <td className="px-3 py-2.5 text-center text-slate-600">{s.lead} Days</td>
                    <td className="px-3 py-2.5 text-center text-cyan-600 font-medium">{s.nextPO}</td>
                    <td className="px-3 py-2.5 text-center">
                      <Badge variant={getRiskBadge(s.risk)} size="sm">{s.risk}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      {/* Procurement Recommendations */}
      <SectionCard title="Procurement Recommendations" subtitle="AI-generated purchase suggestions">
        <div className="grid grid-cols-2 gap-3">
          {procurementRecommendations.map((rec, i) => (
            <div key={i} className="p-3 bg-gradient-to-r from-green-50 to-cyan-50 border border-green-100 rounded-lg">
              <p className="text-xs text-slate-700">{rec}</p>
            </div>
          ))}
        </div>
      </SectionCard>

    </div>
  );
}
