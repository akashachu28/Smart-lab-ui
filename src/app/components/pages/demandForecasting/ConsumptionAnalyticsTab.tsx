import { Card } from '../../ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { dailyConsumption, departmentConsumption, topConsumedChemicals } from './data';

export function ConsumptionAnalyticsTab() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card title="Daily Consumption Pattern" subtitle="Average usage by weekday">
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={dailyConsumption}>
            <XAxis dataKey="day" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={{ fontSize: 11 }} />
            <Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Department Consumption" subtitle="Usage distribution">
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={departmentConsumption} layout="vertical">
            <XAxis type="number" tick={{ fontSize: 10 }} />
            <YAxis dataKey="department" type="category" tick={{ fontSize: 10 }} width={80} />
            <Tooltip contentStyle={{ fontSize: 11 }} />
            <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Top Consumed Chemicals" subtitle="Monthly usage leaders">
        <div className="space-y-3">
          {topConsumedChemicals.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-700">{item.chemical}</p>
                <p className="text-[10px] text-slate-500">{item.monthlyUsage}</p>
              </div>
              <span className={`text-xs font-semibold ${
                item.growth.startsWith('+') ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {item.growth}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
