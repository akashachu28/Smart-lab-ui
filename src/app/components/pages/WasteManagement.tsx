import { useState } from 'react';
import { Trash2, AlertTriangle, CheckCircle, TrendingDown, Recycle, Leaf, Eye, Brain, MapPin, Clock, Package, TrendingUp, Download } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

const tabs = ['Overview', 'AI Classification', 'Waste Tracking', 'Hazardous Waste', 'Vision Segregation', 'Smart Bins', 'Disposal Ops', 'Sustainability'];


// ========== DATA STRUCTURES ==========

// AI Classification Data
const aiClassificationDistribution = [
  { name: 'Chemical Waste', value: 34, color: '#ef4444' },
  { name: 'Biomedical', value: 18, color: '#f59e0b' },
  { name: 'Glass Waste', value: 11, color: '#06b6d4' },
  { name: 'Plastic', value: 17, color: '#8b5cf6' },
  { name: 'Metal', value: 6, color: '#64748b' },
  { name: 'Paper', value: 8, color: '#10b981' },
  { name: 'General', value: 6, color: '#94a3b8' },
];

const aiPerformanceMetrics = {
  objectsClassified: 18420,
  accuracy: 99.2,
  manualCorrections: 38,
  unknownWaste: 6,
  avgConfidence: 97.8,
};

const aiInsights = [
  'Most chemical waste originates from Organic Chemistry Lab (38%).',
  'Biomedical waste increased by 11% this month.',
  'Plastic waste recycling potential remains high (82% recyclable).',
  'Glass waste contamination rate decreased by 15%.',
  'Average classification time: 1.4 seconds per object.',
];

// Waste Tracking Data
const wasteTracking = [
  { id: 'WT-2102', type: 'Chemical', location: 'Storage Room', status: 'Awaiting Pickup', quantity: '120 kg', lab: 'Organic Chemistry', generated: '2026-07-01 08:30', handler: 'Dr. Smith', container: 'HDPE-200L' },
  { id: 'WT-2108', type: 'Biomedical', location: 'Incineration Area', status: 'Processing', quantity: '40 kg', lab: 'Microbiology', generated: '2026-07-01 09:15', handler: 'Lab Tech A', container: 'Biohazard-50L' },
  { id: 'WT-2116', type: 'Glass', location: 'Recycling', status: 'Completed', quantity: '65 kg', lab: 'Analytical Lab', generated: '2026-06-30 14:20', handler: 'J. Martinez', container: 'Glass-Bin-100L' },
  { id: 'WT-2121', type: 'Plastic', location: 'Recycling Area', status: 'In Transit', quantity: '38 kg', lab: 'Research Lab B', generated: '2026-07-01 07:45', handler: 'Tech Team', container: 'Plastic-Bin-80L' },
  { id: 'WT-2124', type: 'Hazardous', location: 'Secure Storage', status: 'Awaiting Cert', quantity: '85 kg', lab: 'Chemistry Lab', generated: '2026-06-29 16:30', handler: 'Dr. Chen', container: 'Hazmat-150L' },
  { id: 'WT-2129', type: 'Metal', location: 'Recycling', status: 'Collected', quantity: '22 kg', lab: 'Engineering Lab', generated: '2026-07-01 10:00', handler: 'M. Johnson', container: 'Metal-Bin-50L' },
  { id: 'WT-2133', type: 'Paper', location: 'Recycling Area', status: 'In Transit', quantity: '15 kg', lab: 'Administration', generated: '2026-07-01 11:20', handler: 'Admin Staff', container: 'Paper-Bin-60L' },
  { id: 'WT-2138', type: 'Chemical', location: 'Treatment Facility', status: 'Treatment', quantity: '95 kg', lab: 'Organic Chemistry', generated: '2026-06-30 09:00', handler: 'Dr. Patel', container: 'HDPE-200L' },
];

const lifecycleStages = ['Generated', 'Classified', 'Stored', 'Collected', 'Transported', 'Treatment', 'Disposed'];

// Hazardous Waste Compliance Data
const hazardousCompliance = {
  totalContainers: 124,
  compliant: 121,
  violations: 3,
  immediateAttention: 1,
  complianceRate: 98.4,
};

const hazardLevelDistribution = [
  { level: 'Low Risk', value: 32, color: '#10b981' },
  { level: 'Moderate', value: 28, color: '#f59e0b' },
  { level: 'High', value: 24, color: '#ef4444' },
  { level: 'Critical', value: 16, color: '#dc2626' },
];

const complianceChecklist = [
  { item: 'Proper Labeling', status: true },
  { item: 'Correct Container', status: true },
  { item: 'Maximum Storage Time', status: false },
  { item: 'PPE Compliance', status: true },
  { item: 'Authorized Handling', status: true },
  { item: 'Disposal Certificate', status: false },
];

// Vision-Based Segregation Data
const visionDetectionMetrics = {
  objectsDetected: 2182,
  correctDisposal: 2145,
  incorrectDisposal: 37,
  accuracy: 98.6,
};

const detectedWasteTypes = [
  { type: 'Chemical Bottles', count: 847, percentage: 39 },
  { type: 'Glass', count: 612, percentage: 28 },
  { type: 'Plastic', count: 524, percentage: 24 },
  { type: 'Sharps', count: 124, percentage: 6 },
  { type: 'PPE', count: 75, percentage: 3 },
];

const segregationAlerts = [
  { id: 1, time: '2026-07-01 11:30', alert: 'Chemical bottle placed inside Plastic Bin', location: 'Lab A - Bin-A12', severity: 'high', resolved: false },
  { id: 2, time: '2026-07-01 10:45', alert: 'Biohazard bag detected inside General Waste', location: 'Lab B - Bin-B05', severity: 'critical', resolved: false },
  { id: 3, time: '2026-07-01 09:20', alert: 'Glass disposed into Chemical Waste Bin', location: 'Lab C - Bin-C08', severity: 'medium', resolved: true },
  { id: 4, time: '2026-07-01 08:15', alert: 'Needle detected outside Sharps Container', location: 'Lab D - Area 3', severity: 'critical', resolved: true },
];

// Smart Bin Monitoring Data
const smartBinStatus = {
  onlineBins: 42,
  offlineBins: 2,
  nearlyFull: 6,
  overflowRisk: 1,
};

const smartBins = [
  { id: 'BIN-A12', zone: 'Lab A', type: 'Chemical', fill: 82, temp: '22°C', weight: '45 kg', status: 'Normal', battery: 89, lidStatus: 'Closed', rfid: 'Active' },
  { id: 'BIN-B05', zone: 'Lab B', type: 'Biomedical', fill: 96, temp: '24°C', weight: '78 kg', status: 'Nearly Full', battery: 76, lidStatus: 'Closed', rfid: 'Active' },
  { id: 'BIN-C08', zone: 'Lab C', type: 'Glass', fill: 38, temp: '21°C', weight: '28 kg', status: 'Available', battery: 92, lidStatus: 'Open', rfid: 'Active' },
  { id: 'BIN-D14', zone: 'Lab D', type: 'Plastic', fill: 67, temp: '23°C', weight: '34 kg', status: 'Normal', battery: 84, lidStatus: 'Closed', rfid: 'Active' },
  { id: 'BIN-E03', zone: 'Lab E', type: 'General', fill: 55, temp: '22°C', weight: '42 kg', status: 'Normal', battery: 88, lidStatus: 'Closed', rfid: 'Active' },
  { id: 'BIN-F07', zone: 'Lab F', type: 'Sharps', fill: 44, temp: '21°C', weight: '12 kg', status: 'Normal', battery: 94, lidStatus: 'Closed', rfid: 'Active' },
  { id: 'BIN-G09', zone: 'Warehouse', type: 'Metal', fill: 72, temp: '20°C', weight: '56 kg', status: 'Normal', battery: 81, lidStatus: 'Closed', rfid: 'Active' },
  { id: 'BIN-H11', zone: 'Building B', type: 'Paper', fill: 88, temp: '22°C', weight: '39 kg', status: 'Normal', battery: 79, lidStatus: 'Closed', rfid: 'Active' },
];

const fillLevelHeatmap = [
  { location: 'Building A', fillPercent: 68 },
  { location: 'Building B', fillPercent: 89 },
  { location: 'Building C', fillPercent: 42 },
  { location: 'Warehouse', fillPercent: 75 },
];

// Disposal Operations Data
const disposalOperations = [
  { id: 'WT-2102', vendor: 'CleanEarth', pickupTime: '11:20', method: 'Incineration', status: 'Completed', cost: '$420' },
  { id: 'WT-2108', vendor: 'EcoRecycle', pickupTime: '13:10', method: 'Recycling', status: 'In Progress', cost: '$180' },
  { id: 'WT-2116', vendor: 'GlassCycle', pickupTime: '09:45', method: 'Recycling', status: 'Completed', cost: '$95' },
  { id: 'WT-2121', vendor: 'PlasticRegen', pickupTime: '14:30', method: 'Recycling', status: 'Scheduled', cost: '$65' },
  { id: 'WT-2124', vendor: 'HazWaste Pro', pickupTime: '10:00', method: 'Chemical Treatment', status: 'In Progress', cost: '$850' },
];

const disposalMethodDistribution = [
  { method: 'Incineration', value: 42, color: '#ef4444' },
  { method: 'Recycling', value: 26, color: '#10b981' },
  { method: 'Chemical Treatment', value: 18, color: '#f59e0b' },
  { method: 'Landfill', value: 9, color: '#64748b' },
  { method: 'Autoclave', value: 5, color: '#8b5cf6' },
];

// Sustainability & ESG Data
const sustainabilityMetrics = {
  wasteRecycled: 9.4,
  carbonSaved: 18.2,
  plasticRecovered: 3.1,
  wasteDiverted: 42,
};

const recyclingPerformance = [
  { material: 'Plastic', rate: 82 },
  { material: 'Glass', rate: 91 },
  { material: 'Metal', rate: 87 },
  { material: 'Paper', rate: 78 },
];

const esgTrend = [
  { month: 'Jan', generated: 38.2, recycled: 12.4, carbon: 15.8, score: 76 },
  { month: 'Feb', generated: 41.5, recycled: 14.1, carbon: 16.9, score: 78 },
  { month: 'Mar', generated: 39.8, recycled: 13.8, carbon: 17.2, score: 80 },
  { month: 'Apr', generated: 43.1, recycled: 15.2, carbon: 17.8, score: 82 },
  { month: 'May', generated: 40.7, recycled: 14.6, carbon: 18.0, score: 84 },
  { month: 'Jun', generated: 42.6, recycled: 16.1, carbon: 18.2, score: 85 },
];

// Waste Generation by Laboratory
const wasteByLaboratory = [
  { lab: 'Chemistry', waste: 148, percentage: 35 },
  { lab: 'Biotechnology', waste: 96, percentage: 23 },
  { lab: 'QA/QC', waste: 52, percentage: 12 },
  { lab: 'Microbiology', waste: 78, percentage: 18 },
  { lab: 'Research', waste: 110, percentage: 26 },
];

// Daily Waste Trend
const dailyTrend = [
  { day: 'Mon', value: 62 },
  { day: 'Tue', value: 78 },
  { day: 'Wed', value: 48 },
  { day: 'Thu', value: 71 },
  { day: 'Fri', value: 95 },
  { day: 'Sat', value: 38 },
  { day: 'Sun', value: 25 },
];

// Monthly Waste Trend
const monthlyTrend = [
  { month: 'Jan', hazardous: 9.2, biomedical: 3.8, recycled: 12.4, total: 38.2 },
  { month: 'Feb', hazardous: 10.1, biomedical: 4.2, recycled: 14.1, total: 41.5 },
  { month: 'Mar', hazardous: 9.8, biomedical: 3.9, recycled: 13.8, total: 39.8 },
  { month: 'Apr', hazardous: 10.8, biomedical: 4.5, recycled: 15.2, total: 43.1 },
  { month: 'May', hazardous: 10.2, biomedical: 4.1, recycled: 14.6, total: 40.7 },
  { month: 'Jun', hazardous: 11.8, biomedical: 4.4, recycled: 16.1, total: 42.6 },
];

// Waste Source Distribution
const wasteSourceDistribution = [
  { source: 'Research', value: 38, color: '#3b82f6' },
  { source: 'Production', value: 24, color: '#8b5cf6' },
  { source: 'QA/QC', value: 16, color: '#06b6d4' },
  { source: 'Maintenance', value: 12, color: '#10b981' },
  { source: 'Utilities', value: 10, color: '#64748b' },
];

// Cost Analysis
const costAnalysis = [
  { category: 'Collection', value: 35, color: '#ef4444' },
  { category: 'Treatment', value: 31, color: '#f59e0b' },
  { category: 'Transportation', value: 19, color: '#8b5cf6' },
  { category: 'Storage', value: 9, color: '#06b6d4' },
  { category: 'Compliance', value: 6, color: '#10b981' },
];

// Alerts Data
const criticalAlerts = [
  { id: 1, severity: 'critical', message: 'Biomedical waste exceeded storage duration', time: '2026-07-01 11:45', location: 'Storage Room A' },
  { id: 2, severity: 'critical', message: 'Hazardous waste container missing label', time: '2026-07-01 10:30', location: 'Lab B' },
  { id: 3, severity: 'critical', message: 'Chemical waste bin overflow detected', time: '2026-07-01 09:15', location: 'Lab C' },
  { id: 4, severity: 'warning', message: 'Wrong waste segregation detected', time: '2026-07-01 08:50', location: 'Lab A' },
  { id: 5, severity: 'warning', message: 'Disposal pickup delayed by 2 hours', time: '2026-07-01 07:30', location: 'Collection Point' },
  { id: 6, severity: 'info', message: 'Disposal certificate uploaded', time: '2026-07-01 06:45', location: 'Admin' },
  { id: 7, severity: 'info', message: 'Recycling batch completed successfully', time: '2026-07-01 05:20', location: 'Recycling Facility' },
];

// AI Recommendations
const aiRecommendations = [
  'Hazardous waste generation increased by 14% compared to last week.',
  'Chemistry Laboratory contributes 39% of all chemical waste.',
  'Three biomedical bins are expected to reach capacity within 6 hours.',
  'Plastic recycling efficiency improved by 9% this month.',
  'Average disposal turnaround decreased from 36 hours to 28 hours.',
  'Four waste containers have exceeded the recommended storage duration.',
  'Computer Vision detected 27 incorrect segregation events during the last 24 hours.',
  'Predict hazardous waste volume to increase by 12% next week based on laboratory schedules.',
  'Recommend scheduling an additional waste pickup tomorrow to prevent overflow.',
  'Laboratory Building B has the highest segregation compliance score (99.4%).',
];

// Recent Activity
const recentActivity = [
  { time: '09:14', event: 'Chemical waste generated', location: 'Organic Chem Lab' },
  { time: '09:21', event: 'AI classified as Hazardous', confidence: '98.7%' },
  { time: '09:24', event: 'Stored in Hazardous Storage', container: 'WT-2138' },
  { time: '10:15', event: 'Computer Vision verified correct disposal', accuracy: '99.2%' },
  { time: '12:05', event: 'Waste collected by vendor', vendor: 'CleanEarth' },
  { time: '14:18', event: 'Treatment completed', method: 'Incineration' },
  { time: '15:07', event: 'Disposal certificate uploaded', status: 'Verified' },
];

// Operational Performance Metrics
const operationalMetrics = {
  avgClassificationTime: 1.4,
  avgPickupTime: 4.8,
  avgDisposalTime: 28,
  avgComplianceAudit: 98.8,
};

// Regulatory Compliance
const regulatoryCompliance = {
  auditsPassed: 96,
  auditsFailed: 2,
  certificatesGenerated: 84,
  pendingDocumentation: 4,
};

const trendData = [
  { week: 'W1', chemical: 45, biological: 12, general: 30 },
  { week: 'W2', chemical: 38, biological: 15, general: 28 },
  { week: 'W3', chemical: 52, biological: 10, general: 35 },
  { week: 'W4', chemical: 41, biological: 18, general: 25 },
];

const complianceData = [
  { name: 'Compliant', value: 87, color: '#10b981' },
  { name: 'Non-Compliant', value: 13, color: '#ef4444' },
];

const wasteEntries = [
  { id: 'WST-0441', type: 'Spent Solvent', classification: 'Chemical', generated: '2024-06-10', stage: 'Stored', handler: 'Lab A', compliance: 'compliant' },
  { id: 'WST-0440', type: 'Culture Media', classification: 'Biological', generated: '2024-06-09', stage: 'Collected', handler: 'Microbio', compliance: 'compliant' },
  { id: 'WST-0439', type: 'Contaminated PPE', classification: 'General', generated: '2024-06-09', stage: 'Disposed', handler: 'Waste Ops', compliance: 'compliant' },
  { id: 'WST-0438', type: 'Sharps Container', classification: 'Sharps', generated: '2024-06-08', stage: 'Non-Compliant', handler: 'Lab B', compliance: 'violation' },
  { id: 'WST-0437', type: 'Acid Waste', classification: 'Chemical', generated: '2024-06-08', stage: 'In Transit', handler: 'Chem Lab', compliance: 'compliant' },
];

const stageColors: Record<string, string> = {
  Generated: 'bg-blue-100 text-blue-700',
  Stored: 'bg-amber-100 text-amber-700',
  Collected: 'bg-purple-100 text-purple-700',
  'In Transit': 'bg-orange-100 text-orange-700',
  Disposed: 'bg-green-100 text-green-700',
  'Non-Compliant': 'bg-red-100 text-red-700',
};

const classColors: Record<string, 'error' | 'warning' | 'info' | 'success' | 'neutral'> = {
  Chemical: 'error',
  Biological: 'warning',
  General: 'neutral',
  Sharps: 'info',
  Radioactive: 'error',
};

const bins = [
  { id: 'BIN-01', zone: 'Lab A', type: 'Chemical', status: 'ok', fill: 65 },
  { id: 'BIN-02', zone: 'Lab B', type: 'General', status: 'violation', fill: 95 },
  { id: 'BIN-03', zone: 'Microbio', type: 'Biological', status: 'ok', fill: 40 },
  { id: 'BIN-04', zone: 'Lab C', type: 'Sharps', status: 'ok', fill: 50 },
];

export function WasteManagement() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="p-5 min-h-full flex flex-col gap-4">
      <div className="mb-1">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Waste Management</h2>
        <p className="text-xs text-slate-500">Track waste from generation to disposal — CV-assisted segregation compliance</p>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-8 gap-3">
        <MetricCard title="Total Waste" value="42.6 T" subtitle="This month" icon={Trash2} status="info" />
        <MetricCard title="Hazardous" value="11.8 T" subtitle="28% of total" icon={AlertTriangle} status="error" />
        <MetricCard title="Non-Hazardous" value="26.4 T" subtitle="62% of total" icon={CheckCircle} status="success" />
        <MetricCard title="Biomedical" value="4.4 T" subtitle="10% of total" icon={Package} status="warning" />
        <MetricCard title="Pending Disposal" value="3.1 T" subtitle="Awaiting pickup" icon={Clock} status="warning" />
        <MetricCard title="Compliance" value="98.8%" subtitle="Target: 95%" icon={CheckCircle} status="success" trend="up" trendValue="+0.4%" />
        <MetricCard title="Segregation Errors" value="12" subtitle="CV detected today" icon={Eye} status="error" />
        <MetricCard title="Recycled" value="9.4 T" subtitle="22% recycled" icon={Recycle} status="success" trend="up" trendValue="+9%" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200/40">
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
            activeTab === t ? 'border-cyan-500 text-cyan-700' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}>{t}</button>
        ))}
      </div>

      {activeTab === 'Overview' && (
        <div className="grid grid-cols-3 gap-4">
          <Card title="Daily Waste Trend" subtitle="This week" className="bg-white/70 border-slate-200/40">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={dailyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 11 }} />
                <Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Monthly Waste Trend" subtitle="Last 6 months" className="bg-white/70 border-slate-200/40">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={{ fontSize: 11 }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                <Line type="monotone" dataKey="hazardous" stroke="#ef4444" strokeWidth={2} name="Hazardous" />
                <Line type="monotone" dataKey="biomedical" stroke="#f59e0b" strokeWidth={2} name="Biomedical" />
                <Line type="monotone" dataKey="recycled" stroke="#10b981" strokeWidth={2} name="Recycled" />
                <Line type="monotone" dataKey="total" stroke="#64748b" strokeWidth={2} name="Total" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Waste by Laboratory" subtitle="Current month" className="bg-white/70 border-slate-200/40">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={wasteByLaboratory} layout="vertical" barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 9 }} />
                <YAxis type="category" dataKey="lab" tick={{ fontSize: 10 }} width={75} />
                <Tooltip contentStyle={{ fontSize: 11 }} />
                <Bar dataKey="waste" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Waste Source Distribution" subtitle="By department" className="col-span-1 bg-white/70 border-slate-200/40">
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={130} height={130}>
                <PieChart>
                  <Pie data={wasteSourceDistribution} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value">
                    {wasteSourceDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 flex-1">
                {wasteSourceDistribution.map(d => (
                  <div key={d.source} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: d.color }}></div>
                    <span className="text-[10px] text-slate-600 flex-1">{d.source}</span>
                    <span className="text-[10px] font-bold text-slate-700">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Cost Analysis" subtitle="Distribution breakdown" className="col-span-1 bg-white/70 border-slate-200/40">
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={130} height={130}>
                <PieChart>
                  <Pie data={costAnalysis} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value">
                    {costAnalysis.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 flex-1">
                {costAnalysis.map(d => (
                  <div key={d.category} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: d.color }}></div>
                    <span className="text-[10px] text-slate-600 flex-1">{d.category}</span>
                    <span className="text-[10px] font-bold text-slate-700">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Critical Alerts" subtitle="Recent notifications" className="col-span-1 bg-white/70 border-slate-200/40">
            <div className="space-y-2 max-h-[150px] overflow-y-auto">
              {criticalAlerts.slice(0, 4).map(alert => (
                <div key={alert.id} className={`p-2 rounded-lg border text-[10px] ${
                  alert.severity === 'critical' ? 'bg-red-50 border-red-200' :
                  alert.severity === 'warning' ? 'bg-amber-50 border-amber-200' :
                  'bg-blue-50 border-blue-200'
                }`}>
                  <p className="font-medium text-slate-800 mb-0.5">{alert.message}</p>
                  <div className="flex justify-between text-slate-500">
                    <span>{alert.location}</span>
                    <span>{alert.time.split(' ')[1]}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'AI Classification' && (
        <div className="grid grid-cols-3 gap-4">
          <Card title="AI Classification Distribution" subtitle="By waste type" className="col-span-1 bg-white/70 border-slate-200/40">
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie data={aiClassificationDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value">
                    {aiClassificationDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 flex-1">
                {aiClassificationDistribution.map(d => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: d.color }}></div>
                    <span className="text-[10px] text-slate-600 flex-1 truncate">{d.name}</span>
                    <span className="text-[10px] font-bold text-slate-700">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="col-span-2 grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/40 rounded-xl p-4 shadow-sm">
              <Brain className="w-5 h-5 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{aiPerformanceMetrics.objectsClassified.toLocaleString()}</div>
              <p className="text-xs text-slate-600">Objects Classified</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/40 rounded-xl p-4 shadow-sm">
              <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{aiPerformanceMetrics.accuracy}%</div>
              <p className="text-xs text-slate-600">Classification Accuracy</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/40 rounded-xl p-4 shadow-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600 mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{aiPerformanceMetrics.manualCorrections}</div>
              <p className="text-xs text-slate-600">Manual Corrections</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200/40 rounded-xl p-4 shadow-sm">
              <Eye className="w-5 h-5 text-red-600 mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{aiPerformanceMetrics.unknownWaste}</div>
              <p className="text-xs text-slate-600">Unknown Waste Items</p>
            </div>
            <div className="col-span-2 bg-gradient-to-br from-cyan-50 to-cyan-100/50 border border-cyan-200/40 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-600">Average Confidence</span>
                <span className="text-lg font-bold text-cyan-700">{aiPerformanceMetrics.avgConfidence}%</span>
              </div>
              <div className="w-full h-3 bg-cyan-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full" style={{ width: `${aiPerformanceMetrics.avgConfidence}%` }}></div>
              </div>
            </div>
          </div>

          <Card title="AI Insights & Analytics" subtitle="Key findings from classification data" className="col-span-3 bg-white/70 border-slate-200/40">
            <div className="grid grid-cols-2 gap-3">
              {aiInsights.map((insight, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-slate-50/60 border border-slate-200/40 rounded-lg">
                  <div className="w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-cyan-700">{i + 1}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'Waste Tracking' && (
        <div className="space-y-4">
          <Card title="Waste Lifecycle Timeline" subtitle="From generation to disposal" className="bg-white/70 border-slate-200/40">
            <div className="flex items-center justify-between px-4">
              {lifecycleStages.map((stage, i) => (
                <div key={stage} className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i < 4 ? 'bg-cyan-500 text-white' : 'bg-slate-200 text-slate-400'
                  }`}>
                    <span className="text-[10px] font-bold">{i + 1}</span>
                  </div>
                  <p className="text-[9px] text-slate-600 mt-1 text-center">{stage}</p>
                  {i < lifecycleStages.length - 1 && (
                    <div className={`h-0.5 w-full mt-4 -mx-12 ${i < 3 ? 'bg-cyan-500' : 'bg-slate-200'}`}></div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card title="Waste Tracking Registry" subtitle="Complete waste movement tracking" className="bg-white/70 border-slate-200/40">
            <div className="overflow-hidden rounded-lg border border-slate-200/40">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Waste ID</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Type</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Current Location</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Status</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Quantity</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Laboratory</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Generated</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Handler</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Container</th>
                  </tr>
                </thead>
                <tbody>
                  {wasteTracking.map(w => (
                    <tr key={w.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-2.5 font-mono text-slate-400 text-[10px]">{w.id}</td>
                      <td className="px-4 py-2.5">
                        <Badge variant={w.type === 'Hazardous' || w.type === 'Chemical' ? 'error' : w.type === 'Biomedical' ? 'warning' : 'info'} size="sm">
                          {w.type}
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5 text-slate-600">{w.location}</td>
                      <td className="px-4 py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          w.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          w.status === 'Processing' || w.status === 'Treatment' ? 'bg-blue-100 text-blue-700' :
                          w.status === 'In Transit' ? 'bg-purple-100 text-purple-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>{w.status}</span>
                      </td>
                      <td className="px-4 py-2.5 font-medium text-slate-700">{w.quantity}</td>
                      <td className="px-4 py-2.5 text-slate-600">{w.lab}</td>
                      <td className="px-4 py-2.5 text-slate-500 text-[10px]">{w.generated}</td>
                      <td className="px-4 py-2.5 text-slate-600">{w.handler}</td>
                      <td className="px-4 py-2.5 text-slate-500 text-[10px]">{w.container}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="Recent Waste Activity" subtitle="Real-time tracking events" className="bg-white/70 border-slate-200/40">
            <div className="space-y-2">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 p-2.5 bg-slate-50/60 border border-slate-200/40 rounded-lg">
                  <div className="w-12 flex-shrink-0">
                    <span className="text-[10px] font-mono text-cyan-600 font-bold">{activity.time}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-800">{activity.event}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {activity.location || activity.container || activity.vendor || activity.method || activity.confidence || activity.status}
                    </p>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'Hazardous Waste' && (
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 grid grid-cols-4 gap-3">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/40 rounded-xl p-4 shadow-sm">
              <Package className="w-5 h-5 text-slate-600 mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{hazardousCompliance.totalContainers}</div>
              <p className="text-xs text-slate-600">Total Containers</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/40 rounded-xl p-4 shadow-sm">
              <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{hazardousCompliance.compliant}</div>
              <p className="text-xs text-slate-600">Compliant</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200/40 rounded-xl p-4 shadow-sm">
              <AlertTriangle className="w-5 h-5 text-red-600 mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{hazardousCompliance.violations}</div>
              <p className="text-xs text-slate-600">Violations</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/40 rounded-xl p-4 shadow-sm">
              <Clock className="w-5 h-5 text-amber-600 mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{hazardousCompliance.immediateAttention}</div>
              <p className="text-xs text-slate-600">Immediate Attention</p>
            </div>
          </div>

          <Card title="Compliance Rate" subtitle="Current period performance" className="col-span-1 bg-white/70 border-slate-200/40">
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${hazardousCompliance.complianceRate * 2.513} 251.3`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-slate-800">{hazardousCompliance.complianceRate}%</span>
                  <span className="text-[10px] text-slate-500">Compliant</span>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Hazard Level Distribution" subtitle="Risk classification" className="col-span-1 bg-white/70 border-slate-200/40">
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={110} height={110}>
                <PieChart>
                  <Pie data={hazardLevelDistribution} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value">
                    {hazardLevelDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 flex-1">
                {hazardLevelDistribution.map(d => (
                  <div key={d.level} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: d.color }}></div>
                    <span className="text-[10px] text-slate-600 flex-1">{d.level}</span>
                    <span className="text-[10px] font-bold text-slate-700">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Compliance Checklist" subtitle="Required safety checks" className="col-span-1 bg-white/70 border-slate-200/40">
            <div className="space-y-2.5">
              {complianceChecklist.map((check, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-slate-50/60 border border-slate-200/40 rounded-lg">
                  <span className="text-xs text-slate-700">{check.item}</span>
                  {check.status ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card title="Regulatory Compliance Status" subtitle="Audit and documentation" className="col-span-3 bg-white/70 border-slate-200/40">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-3 bg-green-50/60 border border-green-200/40 rounded-lg">
                <div className="text-2xl font-bold text-green-700 mb-1">{regulatoryCompliance.auditsPassed}</div>
                <p className="text-[10px] text-slate-600">Audits Passed</p>
              </div>
              <div className="text-center p-3 bg-red-50/60 border border-red-200/40 rounded-lg">
                <div className="text-2xl font-bold text-red-700 mb-1">{regulatoryCompliance.auditsFailed}</div>
                <p className="text-[10px] text-slate-600">Audits Failed</p>
              </div>
              <div className="text-center p-3 bg-blue-50/60 border border-blue-200/40 rounded-lg">
                <div className="text-2xl font-bold text-blue-700 mb-1">{regulatoryCompliance.certificatesGenerated}</div>
                <p className="text-[10px] text-slate-600">Certificates Generated</p>
              </div>
              <div className="text-center p-3 bg-amber-50/60 border border-amber-200/40 rounded-lg">
                <div className="text-2xl font-bold text-amber-700 mb-1">{regulatoryCompliance.pendingDocumentation}</div>
                <p className="text-[10px] text-slate-600">Pending Documentation</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'Vision Segregation' && (
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 grid grid-cols-4 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/40 rounded-xl p-4 shadow-sm">
              <Eye className="w-5 h-5 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{visionDetectionMetrics.objectsDetected.toLocaleString()}</div>
              <p className="text-xs text-slate-600">Objects Detected</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/40 rounded-xl p-4 shadow-sm">
              <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{visionDetectionMetrics.correctDisposal.toLocaleString()}</div>
              <p className="text-xs text-slate-600">Correct Disposal</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200/40 rounded-xl p-4 shadow-sm">
              <AlertTriangle className="w-5 h-5 text-red-600 mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{visionDetectionMetrics.incorrectDisposal}</div>
              <p className="text-xs text-slate-600">Incorrect Disposal</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 border border-cyan-200/40 rounded-xl p-4 shadow-sm">
              <Brain className="w-5 h-5 text-cyan-600 mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{visionDetectionMetrics.accuracy}%</div>
              <p className="text-xs text-slate-600">Detection Accuracy</p>
            </div>
          </div>

          <Card title="Detected Waste Types" subtitle="Computer vision classification" className="col-span-1 bg-white/70 border-slate-200/40">
            <div className="space-y-2.5">
              {detectedWasteTypes.map(item => (
                <div key={item.type} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-700">{item.type}</span>
                    <span className="text-xs font-bold text-slate-800">{item.count}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                    <span className="text-[10px] text-slate-500 w-8 text-right">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="AI Segregation Alerts" subtitle="Real-time violation detection" className="col-span-2 bg-white/70 border-slate-200/40">
            <div className="space-y-2">
              {segregationAlerts.map(alert => (
                <div key={alert.id} className={`p-3 border rounded-lg ${
                  alert.severity === 'critical' ? 'bg-red-50 border-red-200' :
                  alert.severity === 'high' ? 'bg-orange-50 border-orange-200' :
                  'bg-amber-50 border-amber-200'
                } ${alert.resolved ? 'opacity-50' : ''}`}>
                  <div className="flex items-start justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`w-4 h-4 ${
                        alert.severity === 'critical' ? 'text-red-600' :
                        alert.severity === 'high' ? 'text-orange-600' :
                        'text-amber-600'
                      }`} />
                      <span className="text-xs font-medium text-slate-800">{alert.alert}</span>
                    </div>
                    <Badge variant={alert.resolved ? 'success' : 'error'} size="sm">
                      {alert.resolved ? 'Resolved' : 'Active'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span><MapPin className="w-3 h-3 inline mr-1" />{alert.location}</span>
                    <span>{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Smart Bin Monitoring" subtitle="Real-time bin status" className="col-span-3 bg-white/70 border-slate-200/40">
            <div className="grid grid-cols-4 gap-3">
              {bins.slice(0, 4).map(bin => (
                <div key={bin.id} className={`border rounded-xl p-3 shadow-sm ${
                  bin.status === 'violation' ? 'border-red-200 bg-red-50/30' : 'border-slate-200/40 bg-white/70'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{bin.id}</p>
                      <p className="text-[10px] text-slate-500">{bin.zone}</p>
                    </div>
                    <Badge variant={bin.status === 'violation' ? 'error' : 'success'} size="sm">
                      {bin.type}
                    </Badge>
                  </div>
                  <div className={`rounded-lg h-20 flex items-center justify-center mb-2 ${
                    bin.status === 'violation' ? 'bg-red-900' : 'bg-slate-800'
                  }`}>
                    <div className="text-center">
                      <div className={`w-6 h-6 rounded-full mx-auto mb-1 ${
                        bin.status === 'violation' ? 'bg-red-500 animate-pulse' : 'bg-green-500'
                      }`}></div>
                      <p className="text-[9px] text-white/70">
                        {bin.status === 'violation' ? '⚠ Violation' : 'CV: OK'}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-500">Fill level</span>
                      <span className={`font-medium ${
                        bin.fill > 90 ? 'text-red-600' : bin.fill > 70 ? 'text-amber-600' : 'text-green-600'
                      }`}>{bin.fill}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full">
                      <div className={`h-full rounded-full ${
                        bin.fill > 90 ? 'bg-red-400' : bin.fill > 70 ? 'bg-amber-400' : 'bg-green-400'
                      }`} style={{ width: `${bin.fill}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'Smart Bins' && (
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/40 rounded-xl p-4 shadow-sm">
              <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{smartBinStatus.onlineBins}</div>
              <p className="text-xs text-slate-600">Online Bins</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200/40 rounded-xl p-4 shadow-sm">
              <AlertTriangle className="w-5 h-5 text-red-600 mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{smartBinStatus.offlineBins}</div>
              <p className="text-xs text-slate-600">Offline Bins</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/40 rounded-xl p-4 shadow-sm">
              <Package className="w-5 h-5 text-amber-600 mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{smartBinStatus.nearlyFull}</div>
              <p className="text-xs text-slate-600">Nearly Full</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200/40 rounded-xl p-4 shadow-sm">
              <Trash2 className="w-5 h-5 text-orange-600 mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{smartBinStatus.overflowRisk}</div>
              <p className="text-xs text-slate-600">Overflow Risk</p>
            </div>
          </div>

          <Card title="Smart Bin Registry" subtitle="IoT-enabled waste containers with real-time monitoring" className="bg-white/70 border-slate-200/40">
            <div className="overflow-hidden rounded-lg border border-slate-200/40">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Bin ID</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Zone</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Type</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Fill Level</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Temperature</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Weight</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Status</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Battery</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Lid</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">RFID</th>
                  </tr>
                </thead>
                <tbody>
                  {smartBins.map(bin => (
                    <tr key={bin.id} className={`border-b border-slate-50 hover:bg-slate-50/60 transition-colors ${
                      bin.status === 'Nearly Full' ? 'bg-amber-50/20' : ''
                    }`}>
                      <td className="px-4 py-2.5 font-mono text-slate-400 text-[10px]">{bin.id}</td>
                      <td className="px-4 py-2.5 text-slate-600">{bin.zone}</td>
                      <td className="px-4 py-2.5">
                        <Badge variant={bin.type === 'Chemical' || bin.type === 'Biomedical' ? 'error' : 'info'} size="sm">
                          {bin.type}
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${
                              bin.fill > 90 ? 'bg-red-400' : bin.fill > 70 ? 'bg-amber-400' : 'bg-green-400'
                            }`} style={{ width: `${bin.fill}%` }}></div>
                          </div>
                          <span className={`text-[10px] font-medium ${
                            bin.fill > 90 ? 'text-red-600' : bin.fill > 70 ? 'text-amber-600' : 'text-green-600'
                          }`}>{bin.fill}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-slate-600">{bin.temp}</td>
                      <td className="px-4 py-2.5 text-slate-700 font-medium">{bin.weight}</td>
                      <td className="px-4 py-2.5">
                        <Badge variant={bin.status === 'Nearly Full' ? 'warning' : 'success'} size="sm">
                          {bin.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1">
                          <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${
                              bin.battery > 80 ? 'bg-green-400' : bin.battery > 50 ? 'bg-amber-400' : 'bg-red-400'
                            }`} style={{ width: `${bin.battery}%` }}></div>
                          </div>
                          <span className="text-[10px] text-slate-500">{bin.battery}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-slate-600 text-[10px]">{bin.lidStatus}</td>
                      <td className="px-4 py-2.5">
                        <Badge variant={bin.rfid === 'Active' ? 'success' : 'neutral'} size="sm">
                          {bin.rfid}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="Fill Level Heatmap" subtitle="Occupancy by location" className="bg-white/70 border-slate-200/40">
            <div className="grid grid-cols-4 gap-4">
              {fillLevelHeatmap.map(loc => (
                <div key={loc.location} className="text-center p-4 bg-slate-50/60 border border-slate-200/40 rounded-lg">
                  <p className="text-xs font-medium text-slate-700 mb-2">{loc.location}</p>
                  <div className="relative w-20 h-20 mx-auto">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                      <circle
                        cx="50" cy="50" r="40" fill="none"
                        stroke={loc.fillPercent > 80 ? '#f59e0b' : '#10b981'}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={`${loc.fillPercent * 2.513} 251.3`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-slate-800">{loc.fillPercent}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'Disposal Ops' && (
        <div className="grid grid-cols-2 gap-4">
          <Card title="Disposal Operations" subtitle="Vendor pickup and disposal tracking" className="col-span-2 bg-white/70 border-slate-200/40">
            <div className="overflow-hidden rounded-lg border border-slate-200/40">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Waste ID</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Vendor</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Pickup Time</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Disposal Method</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Status</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {disposalOperations.map(op => (
                    <tr key={op.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-2.5 font-mono text-slate-400 text-[10px]">{op.id}</td>
                      <td className="px-4 py-2.5 text-slate-700 font-medium">{op.vendor}</td>
                      <td className="px-4 py-2.5 text-slate-600">{op.pickupTime}</td>
                      <td className="px-4 py-2.5 text-slate-600">{op.method}</td>
                      <td className="px-4 py-2.5">
                        <Badge variant={
                          op.status === 'Completed' ? 'success' :
                          op.status === 'In Progress' ? 'info' :
                          'warning'
                        } size="sm">
                          {op.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5 text-slate-700 font-medium">{op.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="Disposal Method Distribution" subtitle="Methods used for waste treatment" className="col-span-1 bg-white/70 border-slate-200/40">
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie data={disposalMethodDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value">
                    {disposalMethodDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 flex-1">
                {disposalMethodDistribution.map(d => (
                  <div key={d.method} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: d.color }}></div>
                    <span className="text-[10px] text-slate-600 flex-1">{d.method}</span>
                    <span className="text-[10px] font-bold text-slate-700">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Operational Performance" subtitle="Key performance indicators" className="col-span-1 bg-white/70 border-slate-200/40">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-cyan-50/60 border border-cyan-200/40 rounded-lg">
                <div className="text-xl font-bold text-cyan-700 mb-1">{operationalMetrics.avgClassificationTime}s</div>
                <p className="text-[9px] text-slate-600">Avg Classification</p>
              </div>
              <div className="text-center p-3 bg-blue-50/60 border border-blue-200/40 rounded-lg">
                <div className="text-xl font-bold text-blue-700 mb-1">{operationalMetrics.avgPickupTime}h</div>
                <p className="text-[9px] text-slate-600">Avg Pickup Time</p>
              </div>
              <div className="text-center p-3 bg-purple-50/60 border border-purple-200/40 rounded-lg">
                <div className="text-xl font-bold text-purple-700 mb-1">{operationalMetrics.avgDisposalTime}h</div>
                <p className="text-[9px] text-slate-600">Avg Disposal Time</p>
              </div>
              <div className="text-center p-3 bg-green-50/60 border border-green-200/40 rounded-lg">
                <div className="text-xl font-bold text-green-700 mb-1">{operationalMetrics.avgComplianceAudit}%</div>
                <p className="text-[9px] text-slate-600">Compliance Rate</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'Sustainability' && (
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 grid grid-cols-4 gap-3">
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/40 rounded-xl p-4 shadow-sm">
              <Recycle className="w-5 h-5 text-green-600 mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{sustainabilityMetrics.wasteRecycled} T</div>
              <p className="text-xs text-slate-600">Waste Recycled</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 border border-cyan-200/40 rounded-xl p-4 shadow-sm">
              <Leaf className="w-5 h-5 text-cyan-600 mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{sustainabilityMetrics.carbonSaved} T</div>
              <p className="text-xs text-slate-600">Carbon Saved</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/40 rounded-xl p-4 shadow-sm">
              <Package className="w-5 h-5 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{sustainabilityMetrics.plasticRecovered} T</div>
              <p className="text-xs text-slate-600">Plastic Recovered</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/40 rounded-xl p-4 shadow-sm">
              <TrendingDown className="w-5 h-5 text-amber-600 mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{sustainabilityMetrics.wasteDiverted}%</div>
              <p className="text-xs text-slate-600">Waste Diverted</p>
            </div>
          </div>

          <Card title="ESG Trend — 6 Months" subtitle="Environmental performance tracking" className="col-span-2 bg-white/70 border-slate-200/40">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={esgTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={{ fontSize: 11 }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                <Line type="monotone" dataKey="generated" stroke="#64748b" strokeWidth={2} name="Generated (T)" />
                <Line type="monotone" dataKey="recycled" stroke="#10b981" strokeWidth={2} name="Recycled (T)" />
                <Line type="monotone" dataKey="carbon" stroke="#06b6d4" strokeWidth={2} name="Carbon Saved (T)" />
                <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={2} name="ESG Score" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Recycling Performance" subtitle="Material recovery rates" className="col-span-1 bg-white/70 border-slate-200/40">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={recyclingPerformance} layout="vertical" barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 9 }} unit="%" />
                <YAxis type="category" dataKey="material" tick={{ fontSize: 10 }} width={50} />
                <Tooltip contentStyle={{ fontSize: 11 }} formatter={(v: number) => `${v}%`} />
                <Bar dataKey="rate" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="AI Recommendations" subtitle="Sustainability insights and suggestions" className="col-span-3 bg-white/70 border-slate-200/40">
            <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
              {aiRecommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 bg-slate-50/60 border border-slate-200/40 rounded-lg">
                  <Brain className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-700 leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
