import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { storageAreas } from './data';

export function StorageMonitoringTab() {
  return (
    <div className="space-y-4">
      <Card title="Storage Compliance Table" subtitle="Current storage area status" className="bg-white/70 border-slate-200/40">
        <div className="overflow-hidden rounded-lg border border-slate-200/40">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Area</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Capacity</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Occupancy</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Compliance</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {storageAreas.map((area, idx) => (
                <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3 text-slate-700 font-medium">{area.area}</td>
                  <td className="px-4 py-3 text-slate-600">{area.capacity}%</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            area.occupancy > 90 ? 'bg-red-400' : 
                            area.occupancy > 80 ? 'bg-amber-400' : 
                            'bg-green-400'
                          }`} 
                          style={{ width: `${area.occupancy}%` }}
                        ></div>
                      </div>
                      <span className={`text-[10px] font-medium ${
                        area.occupancy > 90 ? 'text-red-600' : 
                        area.occupancy > 80 ? 'text-amber-600' : 
                        'text-green-600'
                      }`}>{area.occupancy}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge 
                      variant={area.compliance === 'Compliant' ? 'success' : 'warning'} 
                      size="sm"
                    >
                      {area.compliance}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      area.status === 'Safe' ? 'bg-green-100 text-green-700' :
                      area.status === 'Near Capacity' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>{area.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
