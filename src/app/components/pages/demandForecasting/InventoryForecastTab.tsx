import { Card } from '../../ui/Card';
import { inventoryHealth } from './data';

export function InventoryForecastTab() {
  const daysOfInventory = [
    { range: '<7 Days', count: 12, color: 'bg-red-500' },
    { range: '7–30 Days', count: 68, color: 'bg-amber-500' },
    { range: '30–60 Days', count: 124, color: 'bg-emerald-500' },
    { range: '>60 Days', count: 95, color: 'bg-cyan-500' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card title="Inventory Health Status" subtitle="Current distribution">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
            <p className="text-[10px] text-emerald-600 font-medium mb-1">Healthy</p>
            <p className="text-2xl font-bold text-emerald-700">{inventoryHealth.healthy}</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
            <p className="text-[10px] text-amber-600 font-medium mb-1">Low Stock</p>
            <p className="text-2xl font-bold text-amber-700">{inventoryHealth.lowStock}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-3 border border-red-100">
            <p className="text-[10px] text-red-600 font-medium mb-1">Critical</p>
            <p className="text-2xl font-bold text-red-700">{inventoryHealth.critical}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
            <p className="text-[10px] text-purple-600 font-medium mb-1">Overstock</p>
            <p className="text-2xl font-bold text-purple-700">{inventoryHealth.overstock}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-600">Total Items</p>
            <p className="text-lg font-bold text-slate-800">
              {inventoryHealth.healthy + inventoryHealth.lowStock + inventoryHealth.critical + inventoryHealth.overstock}
            </p>
          </div>
        </div>
      </Card>

      <Card title="Days of Inventory Coverage" subtitle="Projected availability">
        <div className="space-y-3">
          {daysOfInventory.map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-600">{item.range}</span>
                <span className="text-xs font-medium text-slate-700">{item.count} items</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className={`${item.color} h-2 rounded-full`} 
                  style={{ width: `${(item.count / 299) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="bg-gradient-to-r from-cyan-50 to-purple-50 rounded-lg p-3">
            <p className="text-[10px] text-slate-600 mb-1">Average Coverage</p>
            <p className="text-xl font-bold text-slate-800">38 Days</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
