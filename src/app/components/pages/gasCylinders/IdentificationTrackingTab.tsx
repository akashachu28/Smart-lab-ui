import { QrCode, MapPin, Activity, Search, Barcode as BarcodeIcon, Radio } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { useState } from 'react';

// Tracking Data
const cylinderTrackingData = [
  { id: 'CY-220', gas: 'Nitrogen', trackingMethod: 'RFID', rfidTag: 'RFID-N220', barcodeQr: 'QR-N220-2024', location: 'Lab A', status: 'In Use', lastScanned: '2026-07-02 14:22', scannedBy: 'Dr. Ahmed', visibility: 'Real-time' },
  { id: 'CY-318', gas: 'Argon', trackingMethod: 'Barcode', rfidTag: '—', barcodeQr: 'BC-AR318-2024', location: 'Lab B', status: 'Available', lastScanned: '2026-07-02 11:15', scannedBy: 'Lab Tech', visibility: 'On-scan' },
  { id: 'CY-101', gas: 'Oxygen', trackingMethod: 'RFID + QR', rfidTag: 'RFID-O101', barcodeQr: 'QR-O101-2024', location: 'ICU Lab', status: 'Alert', lastScanned: '2026-07-02 09:30', scannedBy: 'System', visibility: 'Real-time' },
  { id: 'CY-044', gas: 'CO₂', trackingMethod: 'QR Code', rfidTag: '—', barcodeQr: 'QR-CO044-2024', location: 'Chemistry', status: 'In Use', lastScanned: '2026-07-01 16:45', scannedBy: 'Sarah M.', visibility: 'On-scan' },
  { id: 'CY-155', gas: 'Hydrogen', trackingMethod: 'RFID', rfidTag: 'RFID-H155', barcodeQr: 'QR-H155-2024', location: 'Workshop', status: 'Maintenance', lastScanned: '2026-07-01 10:20', scannedBy: 'Technician', visibility: 'Real-time' },
  { id: 'CY-267', gas: 'Nitrogen', trackingMethod: 'Barcode', rfidTag: '—', barcodeQr: 'BC-N267-2024', location: 'Storage', status: 'Available', lastScanned: '2026-07-02 08:00', scannedBy: 'Inventory', visibility: 'On-scan' },
  { id: 'CY-089', gas: 'Argon', trackingMethod: 'RFID', rfidTag: 'RFID-AR089', barcodeQr: 'QR-AR089-2024', location: 'Lab C', status: 'In Use', lastScanned: '2026-07-02 13:55', scannedBy: 'Li Wei', visibility: 'Real-time' },
  { id: 'CY-412', gas: 'Oxygen', trackingMethod: 'QR Code', rfidTag: '—', barcodeQr: 'QR-O412-2024', location: 'Lab A', status: 'Due Soon', lastScanned: '2026-07-02 07:30', scannedBy: 'John S.', visibility: 'On-scan' },
];

const scanActivity = [
  { time: '2026-07-02 14:22', cylinderId: 'CY-220', action: 'Check-Out', user: 'Dr. Ahmed', method: 'RFID', location: 'Lab A' },
  { time: '2026-07-02 13:55', cylinderId: 'CY-089', action: 'Status Check', user: 'Li Wei', method: 'RFID', location: 'Lab C' },
  { time: '2026-07-02 11:15', cylinderId: 'CY-318', action: 'Inventory Audit', user: 'Lab Tech', method: 'Barcode', location: 'Lab B' },
  { time: '2026-07-02 09:30', cylinderId: 'CY-101', action: 'Alert Scan', user: 'System Auto', method: 'RFID', location: 'ICU Lab' },
  { time: '2026-07-02 08:00', cylinderId: 'CY-267', action: 'Check-In', user: 'Inventory', method: 'Barcode', location: 'Storage' },
  { time: '2026-07-01 16:45', cylinderId: 'CY-044', action: 'Check-Out', user: 'Sarah M.', method: 'QR Code', location: 'Chemistry' },
];

export function IdentificationTrackingTab() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCylinders = cylinderTrackingData.filter(c => 
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.gas.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Tracking Overview KPIs */}
      <div className="col-span-3 grid grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/40 rounded-xl p-4 shadow-sm">
          <Radio className="w-5 h-5 text-blue-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">98</div>
          <p className="text-xs text-slate-600">RFID Tracked</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/40 rounded-xl p-4 shadow-sm">
          <QrCode className="w-5 h-5 text-purple-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">24</div>
          <p className="text-xs text-slate-600">QR Code Tracked</p>
        </div>
        
        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 border border-cyan-200/40 rounded-xl p-4 shadow-sm">
          <BarcodeIcon className="w-5 h-5 text-cyan-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">122</div>
          <p className="text-xs text-slate-600">Total Tracked</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/40 rounded-xl p-4 shadow-sm">
          <Activity className="w-5 h-5 text-green-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800 mb-1">847</div>
          <p className="text-xs text-slate-600">Scans This Week</p>
        </div>
      </div>

      {/* Cylinder Tracking Table */}
      <Card title="Cylinder Identification & Tracking" subtitle="Real-time visibility via barcode/QR/RFID" className="col-span-3 bg-white/70 border-slate-200/40">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-2 flex-1 bg-white border border-slate-200/60 rounded-lg px-3 py-1.5 max-w-md">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              placeholder="Search by cylinder ID, gas, or location..." 
              className="flex-1 text-xs outline-none bg-transparent text-slate-700 placeholder:text-slate-400" 
            />
          </div>
          <button className="px-3 py-1.5 text-xs bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 flex items-center gap-1.5">
            <QrCode className="w-3.5 h-3.5" />
            Scan Cylinder
          </button>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200/40">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Cylinder ID</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Gas</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Tracking Method</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">RFID Tag</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Barcode/QR</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Current Location</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Status</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Last Scanned</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Scanned By</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Visibility</th>
              </tr>
            </thead>
            <tbody>
              {filteredCylinders.map(cylinder => (
                <tr key={cylinder.id} className="border-b border-slate-50 hover:bg-slate-50/60">
                  <td className="px-4 py-2.5 font-mono text-slate-400">{cylinder.id}</td>
                  <td className="px-4 py-2.5 font-medium text-slate-800">{cylinder.gas}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-1">
                      {cylinder.trackingMethod.includes('RFID') && (
                        <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[9px] rounded font-medium flex items-center gap-0.5">
                          <Radio className="w-2.5 h-2.5" />
                          RFID
                        </span>
                      )}
                      {cylinder.trackingMethod.includes('QR') && (
                        <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 text-[9px] rounded font-medium flex items-center gap-0.5">
                          <QrCode className="w-2.5 h-2.5" />
                          QR
                        </span>
                      )}
                      {cylinder.trackingMethod.includes('Barcode') && (
                        <span className="px-1.5 py-0.5 bg-cyan-100 text-cyan-700 text-[9px] rounded font-medium flex items-center gap-0.5">
                          <BarcodeIcon className="w-2.5 h-2.5" />
                          BC
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-[10px] text-slate-500">{cylinder.rfidTag}</td>
                  <td className="px-4 py-2.5 font-mono text-[10px] text-slate-500">{cylinder.barcodeQr}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-cyan-500" />
                      <span className="text-cyan-600 font-medium">{cylinder.location}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <Badge variant={
                      cylinder.status === 'Available' ? 'success' :
                      cylinder.status === 'In Use' ? 'info' :
                      cylinder.status === 'Alert' ? 'error' :
                      'warning'
                    } size="sm">
                      {cylinder.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-2.5 text-slate-600 text-[10px]">{cylinder.lastScanned}</td>
                  <td className="px-4 py-2.5 text-slate-600">{cylinder.scannedBy}</td>
                  <td className="px-4 py-2.5">
                    <Badge variant={cylinder.visibility === 'Real-time' ? 'success' : 'info'} size="sm">
                      {cylinder.visibility}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recent Scan Activity */}
      <Card title="Recent Scan Activity" subtitle="Latest tracking events" className="col-span-2 bg-white/70 border-slate-200/40">
        <div className="overflow-hidden rounded-lg border border-slate-200/40">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Timestamp</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Cylinder</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Action</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">User</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Method</th>
                <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Location</th>
              </tr>
            </thead>
            <tbody>
              {scanActivity.map((activity, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/60">
                  <td className="px-4 py-2.5 font-mono text-[10px] text-slate-400">{activity.time}</td>
                  <td className="px-4 py-2.5 font-mono text-slate-600">{activity.cylinderId}</td>
                  <td className="px-4 py-2.5">
                    <Badge variant={
                      activity.action.includes('Check-Out') ? 'warning' :
                      activity.action.includes('Check-In') ? 'success' :
                      'info'
                    } size="sm">
                      {activity.action}
                    </Badge>
                  </td>
                  <td className="px-4 py-2.5 text-slate-700">{activity.user}</td>
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
                      activity.method === 'RFID' ? 'bg-blue-100 text-blue-700' :
                      activity.method === 'QR Code' ? 'bg-purple-100 text-purple-700' :
                      'bg-cyan-100 text-cyan-700'
                    }`}>
                      {activity.method}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-cyan-600 font-medium">{activity.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Tracking Coverage */}
      <Card title="Tracking Coverage" subtitle="Method distribution" className="col-span-1 bg-white/70 border-slate-200/40">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2.5 bg-blue-50/60 border border-blue-200/40 rounded-lg">
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs text-slate-700">RFID</span>
            </div>
            <span className="text-sm font-bold text-blue-700">98</span>
          </div>
          <div className="flex items-center justify-between p-2.5 bg-purple-50/60 border border-purple-200/40 rounded-lg">
            <div className="flex items-center gap-2">
              <QrCode className="w-3.5 h-3.5 text-purple-600" />
              <span className="text-xs text-slate-700">QR Code</span>
            </div>
            <span className="text-sm font-bold text-purple-700">18</span>
          </div>
          <div className="flex items-center justify-between p-2.5 bg-cyan-50/60 border border-cyan-200/40 rounded-lg">
            <div className="flex items-center gap-2">
              <BarcodeIcon className="w-3.5 h-3.5 text-cyan-600" />
              <span className="text-xs text-slate-700">Barcode</span>
            </div>
            <span className="text-sm font-bold text-cyan-700">6</span>
          </div>
          <div className="pt-2 border-t border-slate-100">
            <p className="text-[10px] text-slate-500 mb-2">Coverage Rate</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <span className="text-sm font-bold text-green-600">100%</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
