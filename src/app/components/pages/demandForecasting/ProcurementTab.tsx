import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { purchaseOrders } from './data';
import { ShoppingCart, CheckCircle, Truck, Clock } from 'lucide-react';

export function ProcurementTab() {
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Delivered': return <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />;
      case 'In Transit': return <Truck className="w-3.5 h-3.5 text-cyan-600" />;
      case 'Approved': return <CheckCircle className="w-3.5 h-3.5 text-blue-600" />;
      default: return <Clock className="w-3.5 h-3.5 text-amber-600" />;
    }
  };

  const getStatusVariant = (status: string): 'success' | 'info' | 'warning' | 'error' => {
    switch(status) {
      case 'Delivered': return 'success';
      case 'In Transit': return 'info';
      case 'Approved': return 'success';
      default: return 'warning';
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl border border-cyan-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <ShoppingCart className="w-4 h-4 text-cyan-600" />
            <span className="text-xs font-medium text-cyan-600">Total</span>
          </div>
          <p className="text-2xl font-bold text-cyan-700">28</p>
          <p className="text-[10px] text-cyan-600 mt-1">Purchase Requests</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-600">Active</span>
          </div>
          <p className="text-2xl font-bold text-emerald-700">22</p>
          <p className="text-[10px] text-emerald-600 mt-1">Approved Orders</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <Truck className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-medium text-purple-600">Transit</span>
          </div>
          <p className="text-2xl font-bold text-purple-700">17</p>
          <p className="text-[10px] text-purple-600 mt-1">In Procurement</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-medium text-amber-600">Complete</span>
          </div>
          <p className="text-2xl font-bold text-amber-700">11</p>
          <p className="text-[10px] text-amber-600 mt-1">Delivered</p>
        </div>
      </div>

      <Card title="Purchase Order Status" subtitle="Current procurement tracking">
        <div className="bg-white/70 rounded-xl border border-slate-200/40 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">PO Number</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Supplier</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Expected Delivery</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Status</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map((po, idx) => (
                <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-800">{po.po}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{po.supplier}</td>
                  <td className="px-4 py-3 text-slate-600">{po.expectedDelivery}</td>
                  <td className="px-4 py-3">
                    <Badge variant={getStatusVariant(po.status)} size="sm">
                      <div className="flex items-center gap-1">
                        {getStatusIcon(po.status)}
                        {po.status}
                      </div>
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-cyan-600 hover:text-cyan-700 font-medium text-[10px]">
                      Track →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Procurement Pipeline" subtitle="End-to-end workflow visualization">
        <div className="flex items-center justify-between py-4">
          {[
            { label: 'AI Recommendation', count: 29, color: 'bg-purple-500' },
            { label: 'Purchase Request', count: 28, color: 'bg-cyan-500' },
            { label: 'Approval', count: 22, color: 'bg-blue-500' },
            { label: 'Purchase Order', count: 22, color: 'bg-emerald-500' },
            { label: 'Supplier', count: 17, color: 'bg-amber-500' },
            { label: 'Delivery', count: 11, color: 'bg-green-500' },
          ].map((stage, idx, arr) => (
            <div key={idx} className="flex items-center">
              <div className="text-center">
                <div className={`${stage.color} text-white rounded-lg px-4 py-2 mb-1`}>
                  <p className="text-lg font-bold">{stage.count}</p>
                </div>
                <p className="text-[10px] text-slate-600 font-medium">{stage.label}</p>
              </div>
              {idx < arr.length - 1 && (
                <div className="mx-2 text-slate-300 text-xl">→</div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
