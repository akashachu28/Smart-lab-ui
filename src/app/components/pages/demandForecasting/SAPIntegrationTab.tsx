import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

export function SAPIntegrationTab() {
  const integrationStatus = [
    { module: 'Inventory', status: 'Connected', lastSync: '2 mins ago', synced: true },
    { module: 'Purchase Orders', status: 'Connected', lastSync: '2 mins ago', synced: true },
    { module: 'Goods Receipt', status: 'Connected', lastSync: '5 mins ago', synced: true },
    { module: 'Invoices', status: 'Connected', lastSync: '8 mins ago', synced: true },
    { module: 'Vendor Master', status: 'Connected', lastSync: '1 min ago', synced: true },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <Badge variant="success" size="sm">Online</Badge>
          </div>
          <p className="text-sm font-medium text-emerald-700">SAP Connected</p>
          <p className="text-[10px] text-emerald-600 mt-1">All systems operational</p>
        </div>

        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl border border-cyan-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <RefreshCw className="w-4 h-4 text-cyan-600" />
            <span className="text-xs font-medium text-cyan-600">Active</span>
          </div>
          <p className="text-xl font-bold text-cyan-700">99.8%</p>
          <p className="text-[10px] text-cyan-600 mt-1">Inventory Sync Rate</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-medium text-purple-600">Recent</span>
          </div>
          <p className="text-xl font-bold text-purple-700">2 mins</p>
          <p className="text-[10px] text-purple-600 mt-1">Last Sync</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <Badge variant="warning" size="sm">Pending</Badge>
          </div>
          <p className="text-xl font-bold text-amber-700">3</p>
          <p className="text-[10px] text-amber-600 mt-1">Items Awaiting Sync</p>
        </div>
      </div>

      <Card title="SAP Integration Status" subtitle="Real-time module connectivity">
        <div className="bg-white/70 rounded-xl border border-slate-200/40 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Module</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Status</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Last Sync</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {integrationStatus.map((item, idx) => (
                <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <p className="font-medium text-slate-800">{item.module}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="success" size="sm">{item.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{item.lastSync}</td>
                  <td className="px-4 py-3">
                    <button className="flex items-center gap-1 px-2.5 py-1 border border-slate-200 text-slate-600 rounded-lg text-[10px] hover:bg-slate-50">
                      <RefreshCw className="w-3 h-3" />
                      Sync Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card title="Sync Activity Log" subtitle="Recent synchronization events">
          <div className="space-y-2">
            {[
              { time: '10:18', event: 'Inventory data synchronized', status: 'success' },
              { time: '10:05', event: 'Purchase order PO1028 synced', status: 'success' },
              { time: '09:48', event: 'SAP connection established', status: 'success' },
              { time: '09:31', event: 'Reorder request submitted', status: 'success' },
              { time: '09:22', event: 'Forecast data updated', status: 'success' },
            ].map((log, idx) => (
              <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50">
                <div className="mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-700">{log.event}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="SAP Configuration" subtitle="Connection settings">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
              <span className="text-xs text-slate-600">Server</span>
              <span className="text-xs font-medium text-slate-800">sap-prod-01.company.com</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
              <span className="text-xs text-slate-600">Client ID</span>
              <span className="text-xs font-medium text-slate-800">100</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
              <span className="text-xs text-slate-600">Sync Interval</span>
              <span className="text-xs font-medium text-slate-800">5 minutes</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
              <span className="text-xs text-slate-600">Auto-Sync</span>
              <Badge variant="success" size="sm">Enabled</Badge>
            </div>
          </div>

          <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg text-xs font-medium hover:from-cyan-600 hover:to-cyan-700">
            Configure Settings
          </button>
        </Card>
      </div>
    </div>
  );
}
