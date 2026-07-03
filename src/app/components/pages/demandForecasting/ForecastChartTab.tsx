import { useState } from 'react';
import { Card } from '../../ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, PieChart, Pie, Cell } from 'recharts';
import { forecastData, categoryData } from './data';

export function ForecastChartTab() {
  const [horizon, setHorizon] = useState('30');

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <Card title="AI Demand Forecast — Acetone" subtitle="Actual (solid) vs AI Prediction (dashed)">
          <div className="flex items-center gap-2 mb-3">
            {['7', '30', '90'].map(h => (
              <button 
                key={h} 
                onClick={() => setHorizon(h)} 
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                  horizon === h 
                    ? 'bg-cyan-500 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {h} days
              </button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <ReferenceLine 
                y={20} 
                stroke="#f59e0b" 
                strokeDasharray="4 4" 
                label={{ value: 'Safety Stock', position: 'right', fontSize: 9, fill: '#f59e0b' }} 
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#06b6d4" 
                strokeWidth={2} 
                dot={false} 
                connectNulls={false} 
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="#8b5cf6" 
                strokeWidth={2} 
                strokeDasharray="5 5" 
                dot={false} 
                connectNulls={false} 
              />
            </LineChart>
          </ResponsiveContainer>
          
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="bg-cyan-50 rounded-lg p-3">
              <p className="text-[10px] text-slate-500 mb-1">Next Week</p>
              <p className="text-lg font-bold text-cyan-600">+6%</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <p className="text-[10px] text-slate-500 mb-1">Next Month</p>
              <p className="text-lg font-bold text-purple-600">+12%</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3">
              <p className="text-[10px] text-slate-500 mb-1">Next Quarter</p>
              <p className="text-lg font-bold text-emerald-600">+18%</p>
            </div>
          </div>
        </Card>
      </div>
      
      <Card title="Demand by Category" subtitle="30-day forecast split">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie 
              data={categoryData} 
              cx="50%" 
              cy="50%" 
              outerRadius={65} 
              dataKey="value"
            >
              {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-1.5 mt-2">
          {categoryData.map(d => (
            <div key={d.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: d.color }}></div>
              <span className="text-xs text-slate-600 flex-1">{d.name}</span>
              <span className="text-xs font-medium text-slate-700">{d.value}%</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
