import { useState } from 'react';
import {
  ShieldCheck, MapPin, UserX, Users, Zap, Flame,
  AlertTriangle, CheckCircle, Filter, Download
} from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

// ── Data ────────────────────────────────────────────────────────────────────

const ppeComplianceTrend = [
  { time: '06:00', helmet: 72, gloves: 85, goggles: 68, labCoat: 90, faceShield: 55 },
  { time: '07:00', helmet: 80, gloves: 88, goggles: 74, labCoat: 92, faceShield: 62 },
  { time: '08:00', helmet: 91, gloves: 93, goggles: 88, labCoat: 96, faceShield: 78 },
  { time: '09:00', helmet: 88, gloves: 90, goggles: 85, labCoat: 94, faceShield: 80 },
  { time: '10:00', helmet: 84, gloves: 87, goggles: 80, labCoat: 93, faceShield: 74 },
  { time: '11:00', helmet: 86, gloves: 91, goggles: 83, labCoat: 95, faceShield: 77 },
];

const ppeBreakdown = [
  { item: 'Lab Coat', compliant: 95, violation: 5 },
  { item: 'Gloves', compliant: 91, violation: 9 },
  { item: 'Helmet', compliant: 86, violation: 14 },
  { item: 'Goggles', compliant: 83, violation: 17 },
  { item: 'Face Shield', compliant: 77, violation: 23 },
];

const occupancyData = [
  { time: '06:00', labA: 4, labB: 2, chemBay: 1, corridor: 3 },
  { time: '07:00', labA: 8, labB: 5, chemBay: 3, corridor: 6 },
  { time: '08:00', labA: 14, labB: 10, chemBay: 6, corridor: 9 },
  { time: '09:00', labA: 18, labB: 13, chemBay: 8, corridor: 11 },
  { time: '10:00', labA: 20, labB: 12, chemBay: 7, corridor: 10 },
  { time: '11:00', labA: 17, labB: 11, chemBay: 5, corridor: 8 },
];

const detectionCounts = [
  { category: 'PPE Violations', today: 14, yesterday: 18, week: 97 },
  { category: 'Restricted Breach', today: 3, yesterday: 2, week: 19 },
  { category: 'Unauth. Entry', today: 1, yesterday: 0, week: 6 },
  { category: 'Unsafe Behaviour', today: 5, yesterday: 7, week: 38 },
  { category: 'Fire / Smoke', today: 0, yesterday: 0, week: 1 },
];

const behaviourPie = [
  { name: 'Compliant', value: 78, color: '#10b981' },
  { name: 'PPE Violation', value: 14, color: '#ef4444' },
  { name: 'Unsafe Behaviour', value: 5, color: '#f97316' },
  { name: 'Restricted Breach', value: 3, color: '#f59e0b' },
];

// ── Events log ───────────────────────────────────────────────────────────────

const ALL_LOGS = [
  { id: 'EVT-0901', time: '11:38:42', type: 'PPE Violation', category: 'PPE', zone: 'Lab A — Bench 3', detail: 'Face shield missing during chemical handling', severity: 'high', status: 'Open' },
  { id: 'EVT-0900', time: '11:22:15', type: 'Restricted Area Breach', category: 'Restricted', zone: 'Chemical Bay', detail: 'Unauthorised personnel entered chemical storage zone', severity: 'critical', status: 'Acknowledged' },
  { id: 'EVT-0899', time: '11:05:03', type: 'PPE Violation', category: 'PPE', zone: 'Lab B — Entry', detail: 'No safety goggles detected on entry', severity: 'high', status: 'Open' },
  { id: 'EVT-0898', time: '10:54:30', type: 'Unsafe Behaviour', category: 'Behaviour', zone: 'Corridor C', detail: 'Running detected in proximity to hazardous material rack', severity: 'medium', status: 'Open' },
  { id: 'EVT-0897', time: '10:41:18', type: 'Occupancy Exceeded', category: 'Occupancy', zone: 'Lab A', detail: 'Occupancy reached 20/18 max capacity', severity: 'medium', status: 'Resolved' },
  { id: 'EVT-0896', time: '10:28:55', type: 'PPE Violation', category: 'PPE', zone: 'Lab A — Bench 1', detail: 'Gloves not worn during reagent dispensing', severity: 'high', status: 'Resolved' },
  { id: 'EVT-0895', time: '10:12:00', type: 'Unauthorised Entry', category: 'Access', zone: 'Server Room Annex', detail: 'Badge mismatch — entry denied but proximity detected', severity: 'critical', status: 'Acknowledged' },
  { id: 'EVT-0894', time: '09:58:10', type: 'Unsafe Behaviour', category: 'Behaviour', zone: 'Chemical Bay', detail: 'Improper handling of pressurised container', severity: 'high', status: 'Resolved' },
  { id: 'EVT-0893', time: '09:44:02', type: 'Restricted Area Breach', category: 'Restricted', zone: 'Radiation Lab', detail: 'Door held open beyond timeout — tailgating detected', severity: 'critical', status: 'Resolved' },
  { id: 'EVT-0892', time: '09:30:25', type: 'PPE Violation', category: 'PPE', zone: 'Lab B — Bench 2', detail: 'Helmet not worn in mandatory zone', severity: 'high', status: 'Resolved' },
  { id: 'EVT-0891', time: '08:55:44', type: 'Fire / Smoke Detection', category: 'Fire', zone: 'Lab A — Fume Hood', detail: 'Smoke trace detected near fume hood exhaust — confirmed false positive', severity: 'critical', status: 'Resolved' },
  { id: 'EVT-0890', time: '08:40:11', type: 'PPE Violation', category: 'PPE', zone: 'Lab A — Entry', detail: 'Lab coat not worn on entry', severity: 'medium', status: 'Resolved' },
];

const CATEGORY_FILTER = ['All', 'PPE', 'Restricted', 'Access', 'Occupancy', 'Behaviour', 'Fire'];

// ── PPE Compliance by Area ───────────────────────────────────────────────────

const PPE_COMPLIANCE_BY_AREA = [
  { area: 'Lab A', compliance: 82, violations: 18, totalScans: 145, helmet: 85, gloves: 92, goggles: 78, labCoat: 94, faceShield: 72 },
  { area: 'Lab B', compliance: 88, violations: 12, totalScans: 98, helmet: 90, gloves: 94, goggles: 86, labCoat: 96, faceShield: 80 },
  { area: 'Chemical Bay', compliance: 91, violations: 9, totalScans: 76, helmet: 93, gloves: 96, goggles: 89, labCoat: 98, faceShield: 85 },
  { area: 'Radiation Lab', compliance: 95, violations: 5, totalScans: 42, helmet: 97, gloves: 98, goggles: 94, labCoat: 100, faceShield: 92 },
  { area: 'Corridor C', compliance: 78, violations: 22, totalScans: 112, helmet: 80, gloves: 85, goggles: 74, labCoat: 88, faceShield: 68 },
];

const PPE_RECENT_ALERTS = [
  { time: '11:38', area: 'Lab A — Bench 3', personnel: 'John Smith', violation: 'Face shield missing', severity: 'high' },
  { time: '11:05', area: 'Lab B — Entry', personnel: 'Sarah Johnson', violation: 'No safety goggles', severity: 'high' },
  { time: '10:28', area: 'Lab A — Bench 1', personnel: 'Mike Davis', violation: 'Gloves not worn', severity: 'high' },
  { time: '09:30', area: 'Lab B — Bench 2', personnel: 'Emily Chen', violation: 'Helmet missing', severity: 'high' },
  { time: '08:40', area: 'Lab A — Entry', personnel: 'David Wilson', violation: 'Lab coat not worn', severity: 'medium' },
];

// ── PPE Detection Logs ───────────────────────────────────────────────────────

const PPE_LOGS = [
  { id: 'PPE-0142', date: '2026-07-02', time: '11:38:42', area: 'Lab A — Bench 3', personnel: 'John Smith', helmet: true, gloves: true, goggles: true, labCoat: true, faceShield: false, status: 'Violation' },
  { id: 'PPE-0141', date: '2026-07-02', time: '11:05:03', area: 'Lab B — Entry', personnel: 'Sarah Johnson', helmet: true, gloves: true, goggles: false, labCoat: true, faceShield: true, status: 'Violation' },
  { id: 'PPE-0140', date: '2026-07-02', time: '10:28:55', area: 'Lab A — Bench 1', personnel: 'Mike Davis', helmet: true, gloves: false, goggles: true, labCoat: true, faceShield: true, status: 'Violation' },
  { id: 'PPE-0139', date: '2026-07-02', time: '09:30:25', area: 'Lab B — Bench 2', personnel: 'Emily Chen', helmet: false, gloves: true, goggles: true, labCoat: true, faceShield: true, status: 'Violation' },
  { id: 'PPE-0138', date: '2026-07-02', time: '08:40:11', area: 'Lab A — Entry', personnel: 'David Wilson', helmet: true, gloves: true, goggles: true, labCoat: false, faceShield: true, status: 'Violation' },
  { id: 'PPE-0137', date: '2026-07-02', time: '08:15:30', area: 'Chemical Bay', personnel: 'Lisa Anderson', helmet: true, gloves: true, goggles: true, labCoat: true, faceShield: true, status: 'Compliant' },
  { id: 'PPE-0136', date: '2026-07-02', time: '07:52:18', area: 'Lab B — Bench 1', personnel: 'Robert Brown', helmet: true, gloves: true, goggles: true, labCoat: true, faceShield: true, status: 'Compliant' },
  { id: 'PPE-0135', date: '2026-07-02', time: '07:30:45', area: 'Lab A — Bench 2', personnel: 'Jennifer Lee', helmet: true, gloves: false, goggles: true, labCoat: true, faceShield: false, status: 'Violation' },
  { id: 'PPE-0134', date: '2026-07-01', time: '16:45:22', area: 'Radiation Lab', personnel: 'Thomas Garcia', helmet: true, gloves: true, goggles: true, labCoat: true, faceShield: true, status: 'Compliant' },
  { id: 'PPE-0133', date: '2026-07-01', time: '15:20:10', area: 'Lab A — Entry', personnel: 'Amanda Martinez', helmet: true, gloves: true, goggles: false, labCoat: true, faceShield: true, status: 'Violation' },
];

// ── Restricted Area Monitoring Logs ──────────────────────────────────────────

const RESTRICTED_LOGS = [
  { id: 'RES-0045', date: '2026-07-02', time: '11:22:15', zone: 'Chemical Bay', personnel: 'Unknown', badge: 'N/A', authorized: false, duration: '2m 15s', status: 'Critical', action: 'Security notified' },
  { id: 'RES-0044', date: '2026-07-02', time: '09:44:02', zone: 'Radiation Lab', personnel: 'James Clark', badge: 'EMP-4521', authorized: true, duration: '45s', status: 'Normal', action: 'Authorized access' },
  { id: 'RES-0043', date: '2026-07-02', time: '08:12:30', zone: 'Chemical Bay', personnel: 'Maria Rodriguez', badge: 'EMP-3387', authorized: true, duration: '15m 22s', status: 'Normal', action: 'Authorized access' },
  { id: 'RES-0042', date: '2026-07-01', time: '16:30:45', zone: 'Server Room Annex', personnel: 'Unknown', badge: 'N/A', authorized: false, duration: '30s', status: 'Critical', action: 'Access denied — proximity alert' },
  { id: 'RES-0041', date: '2026-07-01', time: '14:22:10', zone: 'Radiation Lab', personnel: 'Christopher Lee', badge: 'EMP-2156', authorized: true, duration: '8m 45s', status: 'Normal', action: 'Authorized access' },
  { id: 'RES-0040', date: '2026-07-01', time: '11:55:33', zone: 'Chemical Bay', personnel: 'Patricia White', badge: 'EMP-5689', authorized: false, duration: '1m 05s', status: 'Warning', action: 'Clearance level insufficient' },
];

// ── Unsafe Behavior Logs ──────────────────────────────────────────────────────

const UNSAFE_LOGS = [
  { id: 'UNS-0078', date: '2026-07-02', time: '10:54:30', area: 'Corridor C', personnel: 'Michael Turner', behavior: 'Running near hazardous materials', riskLevel: 'Medium', status: 'Open', action: 'Pending review' },
  { id: 'UNS-0077', date: '2026-07-02', time: '09:58:10', area: 'Chemical Bay', personnel: 'Jessica Adams', behavior: 'Improper handling of pressurized container', riskLevel: 'High', status: 'Resolved', action: 'Safety briefing completed' },
  { id: 'UNS-0076', date: '2026-07-02', time: '08:35:20', area: 'Lab A — Bench 4', personnel: 'Daniel Harris', behavior: 'Working without proper ventilation', riskLevel: 'High', status: 'Resolved', action: 'Supervisor notified' },
  { id: 'UNS-0075', date: '2026-07-02', time: '07:45:15', area: 'Lab B — Storage', personnel: 'Laura Thompson', behavior: 'Improper chemical storage', riskLevel: 'Medium', status: 'Open', action: 'Warning issued' },
  { id: 'UNS-0074', date: '2026-07-01', time: '16:20:40', area: 'Chemical Bay', personnel: 'Kevin Moore', behavior: 'Not using fume hood during transfer', riskLevel: 'High', status: 'Resolved', action: 'Retrained on procedures' },
  { id: 'UNS-0073', date: '2026-07-01', time: '14:10:25', area: 'Lab A — Bench 1', personnel: 'Nancy Walker', behavior: 'Eating in laboratory area', riskLevel: 'Low', status: 'Resolved', action: 'Verbal warning' },
];

// ── Fire & Smoke Detection Logs ───────────────────────────────────────────────

const FIRE_LOGS = [
  { id: 'FIRE-0012', date: '2026-07-02', time: '08:55:44', location: 'Lab A — Fume Hood', detectionType: 'Smoke', confidence: '92%', temperature: '28°C', status: 'False Positive', response: 'Investigated — cooking residue on hot plate' },
  { id: 'FIRE-0011', date: '2026-06-28', time: '14:32:18', location: 'Chemical Bay — Zone 3', detectionType: 'Smoke', confidence: '98%', temperature: '45°C', status: 'Confirmed', response: 'Fire suppression activated — minor chemical reaction' },
  { id: 'FIRE-0010', date: '2026-06-25', time: '11:15:30', location: 'Lab B — Electrical Panel', detectionType: 'Heat', confidence: '87%', temperature: '62°C', status: 'Confirmed', response: 'Electrician called — overheating transformer' },
  { id: 'FIRE-0009', date: '2026-06-22', time: '09:40:55', location: 'Corridor C', detectionType: 'Smoke', confidence: '76%', temperature: '24°C', status: 'False Positive', response: 'Steam from autoclave' },
  { id: 'FIRE-0008', date: '2026-06-18', time: '16:22:10', location: 'Lab A — Bench 2', detectionType: 'Flame', confidence: '95%', temperature: '180°C', status: 'Confirmed', response: 'Bunsen burner left on — secured by personnel' },
];

const severityBadge: Record<string, 'error' | 'warning' | 'info' | 'success' | 'neutral'> = {
  critical: 'error',
  high: 'warning',
  medium: 'info',
  low: 'neutral',
};

const severityLabel: Record<string, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const statusBadge: Record<string, 'error' | 'warning' | 'info' | 'success' | 'neutral'> = {
  Open: 'error',
  Acknowledged: 'warning',
  Resolved: 'success',
};

// ── Card Wrapper Component ──────────────────────────────────────────────────

function CardWrapper({ title, subtitle, children, className = '' }: {
  title: string; subtitle?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <Card className={`bg-white/70 border-slate-200/40 shadow-sm ${className}`}>
      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
          {subtitle && <p className="text-[10px] text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        <div>{children}</div>
      </div>
    </Card>
  );
}

// ── Pagination Component ────────────────────────────────────────────────────

function Pagination({ currentPage, totalPages, onPageChange }: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200/40">
      <div className="text-[10px] text-slate-500">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 text-[10px] font-medium text-slate-600 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-2 py-1 text-[10px] font-medium border rounded ${
              currentPage === page
                ? 'bg-cyan-500 text-white border-cyan-500'
                : 'text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 text-[10px] font-medium text-slate-600 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// ── Area occupancy caps ──────────────────────────────────────────────────────

const areaStatus = [
  { area: 'Lab A', current: 17, max: 18, color: 'bg-amber-400' },
  { area: 'Lab B', current: 11, max: 15, color: 'bg-green-400' },
  { area: 'Chemical Bay', current: 5, max: 6, color: 'bg-amber-400' },
  { area: 'Corridor C', current: 8, max: 20, color: 'bg-green-400' },
  { area: 'Radiation Lab', current: 2, max: 4, color: 'bg-green-400' },
];

// ── Component ────────────────────────────────────────────────────────────────

export function ComputerVision() {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [activeSection, setActiveSection] = useState('Overview');
  const [ppeAreaFilter, setPpeAreaFilter] = useState('All Areas');
  
  // Pagination states
  const [ppeLogsPage, setPpeLogsPage] = useState(1);
  const [restrictedLogsPage, setRestrictedLogsPage] = useState(1);
  const [unsafeLogsPage, setUnsafeLogsPage] = useState(1);
  const [fireLogsPage, setFireLogsPage] = useState(1);
  const [eventsPage, setEventsPage] = useState(1);
  
  const ITEMS_PER_PAGE = 5;

  const filteredLogs = categoryFilter === 'All'
    ? ALL_LOGS
    : ALL_LOGS.filter(l => l.category === categoryFilter);

  const filteredPpeLogs = ppeAreaFilter === 'All Areas'
    ? PPE_LOGS
    : PPE_LOGS.filter(l => l.area.startsWith(ppeAreaFilter));

  // Pagination calculations
  const paginatedPpeLogs = filteredPpeLogs.slice((ppeLogsPage - 1) * ITEMS_PER_PAGE, ppeLogsPage * ITEMS_PER_PAGE);
  const ppeTotalPages = Math.ceil(filteredPpeLogs.length / ITEMS_PER_PAGE);
  
  const paginatedRestrictedLogs = RESTRICTED_LOGS.slice((restrictedLogsPage - 1) * ITEMS_PER_PAGE, restrictedLogsPage * ITEMS_PER_PAGE);
  const restrictedTotalPages = Math.ceil(RESTRICTED_LOGS.length / ITEMS_PER_PAGE);
  
  const paginatedUnsafeLogs = UNSAFE_LOGS.slice((unsafeLogsPage - 1) * ITEMS_PER_PAGE, unsafeLogsPage * ITEMS_PER_PAGE);
  const unsafeTotalPages = Math.ceil(UNSAFE_LOGS.length / ITEMS_PER_PAGE);
  
  const paginatedFireLogs = FIRE_LOGS.slice((fireLogsPage - 1) * ITEMS_PER_PAGE, fireLogsPage * ITEMS_PER_PAGE);
  const fireTotalPages = Math.ceil(FIRE_LOGS.length / ITEMS_PER_PAGE);
  
  const paginatedEvents = filteredLogs.slice((eventsPage - 1) * ITEMS_PER_PAGE, eventsPage * ITEMS_PER_PAGE);
  const eventsTotalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);

  // Reset pagination when filters change
  const handleCategoryFilterChange = (filter: string) => {
    setCategoryFilter(filter);
    setEventsPage(1);
  };

  const handlePpeAreaFilterChange = (area: string) => {
    setPpeAreaFilter(area);
    setPpeLogsPage(1);
  };

  const sections = ['Overview', 'PPE Detection', 'Occupancy', 'Restricted Areas', 'Unsafe Behavior', 'Events Log'];

  return (
    <div className="p-5 min-h-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">Safety and Security</h2>
          <p className="text-xs text-slate-500">AI-powered monitoring — PPE, restricted zones, occupancy, behaviour & fire detection</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-green-600 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
            Live · Updated 3s ago
          </span>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs hover:bg-slate-50">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* KPI Strip — one per detection type */}
      <div className="grid grid-cols-5 gap-3">
        <MetricCard title="PPE Compliance" value="84%" subtitle="Overall today" icon={ShieldCheck} status="success" trend="up" trendValue="+4% vs yesterday" />
        <MetricCard title="Restricted Breaches" value="3" subtitle="Today" icon={MapPin} status="error" />
        <MetricCard title="Unauthorized Entries" value="1" subtitle="Today" icon={UserX} status="error" />
        <MetricCard title="Unsafe Behaviour" value="5" subtitle="Incidents today" icon={Zap} status="warning" />
        <MetricCard title="Fire / Smoke" value="0" subtitle="No active events" icon={Flame} status="success" />
      </div>

      {/* Section Tabs */}
      <div className="flex gap-1 border-b border-slate-200/40">
        {sections.map(s => (
          <button key={s} onClick={() => setActiveSection(s)} className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
            activeSection === s ? 'border-cyan-500 text-cyan-700' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}>{s}</button>
        ))}
      </div>

      {/* ── Overview ── */}
      {activeSection === 'Overview' && (
        <div className="grid grid-cols-3 gap-4">
          {/* Detection counts table */}
          <div className="col-span-1 flex flex-col gap-4">
            <CardWrapper title="Detection Summary" subtitle="Today vs yesterday" className="flex-1">
              <div className="divide-y divide-slate-50">
                {detectionCounts.map(d => (
                  <div key={d.category} className="flex items-center justify-between py-2.5">
                    <span className="text-xs text-slate-700">{d.category}</span>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className={`text-sm font-bold ${d.today === 0 ? 'text-green-600' : d.today > 5 ? 'text-red-600' : 'text-amber-600'}`}>{d.today}</span>
                        <span className="text-[9px] text-slate-400 ml-1">today</span>
                      </div>
                      <div className="text-right w-10">
                        <span className="text-[10px] text-slate-400">{d.yesterday} yday</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardWrapper>

            
          </div>

          {/* Bar chart — weekly detection counts */}
          <div className="col-span-2 flex flex-col gap-4">
            <CardWrapper title="Detection Events — This Week" subtitle="By category per day" className="flex-1">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[
                  { day: 'Mon', ppe: 18, breach: 2, behaviour: 7, entry: 0, fire: 0 },
                  { day: 'Tue', ppe: 22, breach: 4, behaviour: 5, entry: 1, fire: 0 },
                  { day: 'Wed', ppe: 15, breach: 1, behaviour: 9, entry: 0, fire: 1 },
                  { day: 'Thu', ppe: 19, breach: 3, behaviour: 6, entry: 2, fire: 0 },
                  { day: 'Fri', ppe: 24, breach: 5, behaviour: 8, entry: 1, fire: 0 },
                  { day: 'Sat', ppe: 9, breach: 1, behaviour: 2, entry: 0, fire: 0 },
                  { day: 'Today', ppe: 14, breach: 3, behaviour: 5, entry: 1, fire: 0 },
                ]} barSize={10}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ fontSize: 11 }} />
                  <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                  <Bar dataKey="ppe" name="PPE Violation" fill="#ef4444" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="breach" name="Restricted Breach" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="behaviour" name="Unsafe Behaviour" fill="#f97316" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="entry" name="Unauth. Entry" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="fire" name="Fire / Smoke" fill="#dc2626" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardWrapper>

            {/* Occupancy area overview */}
            <CardWrapper title="Area Occupancy — Now" subtitle="Current vs maximum capacity" className="flex-1">
              <div className="grid grid-cols-5 gap-3">
                {areaStatus.map(a => {
                  const pct = Math.round((a.current / a.max) * 100);
                  const isOver = a.current > a.max;
                  return (
                    <div key={a.area} className="flex flex-col items-center gap-1.5">
                      <div className="relative w-12 h-12">
                        <svg viewBox="0 0 44 44" className="w-full h-full -rotate-90">
                          <circle cx="22" cy="22" r="18" fill="none" stroke="#f1f5f9" strokeWidth="5" />
                          <circle
                            cx="22" cy="22" r="18" fill="none"
                            stroke={isOver ? '#ef4444' : pct > 80 ? '#f59e0b' : '#10b981'}
                            strokeWidth="5"
                            strokeLinecap="round"
                            strokeDasharray={`${Math.min(pct, 100) * 1.131} 113.1`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-[9px] font-bold ${isOver ? 'text-red-600' : 'text-slate-700'}`}>{pct}%</span>
                        </div>
                      </div>
                      <p className="text-[9px] text-slate-600 font-medium text-center leading-tight">{a.area}</p>
                      <p className={`text-[9px] ${isOver ? 'text-red-600 font-bold' : 'text-slate-400'}`}>{a.current}/{a.max}</p>
                    </div>
                  );
                })}
              </div>
            </CardWrapper>
          </div>
        </div>
      )}

      {/* ── PPE Detection ── */}
      {activeSection === 'PPE Detection' && (
        <div className="grid grid-cols-3 gap-4">
          

          {/* PPE violation summary cards */}
          <div className="col-span-3 grid grid-cols-5 gap-3">
            {[
              { item: 'Lab Coat', icon: '🥼', compliant: 95, violations: 5, trend: 'up', trendValue: 7, color: 'blue' },
              { item: 'Gloves', icon: '🧤', compliant: 91, violations: 9, trend: 'up', trendValue: 3, color: 'purple' },
              { item: 'Helmet', icon: '⛑️', compliant: 86, violations: 14, trend: 'down', trendValue: 2, color: 'orange' },
              { item: 'Goggles', icon: '🥽', compliant: 83, violations: 17, trend: 'down', trendValue: 1, color: 'cyan' },
              { item: 'Face Shield', icon: '🛡️', compliant: 77, violations: 23, trend: 'up', trendValue: 4, color: 'emerald' },
            ].map((p, index) => {
              const colorMap = {
                blue: { bg: 'bg-blue-500', text: 'text-blue-600', bg100: 'bg-blue-100', strokeColor: '#3b82f6' },
                purple: { bg: 'bg-purple-500', text: 'text-purple-600', bg100: 'bg-purple-100', strokeColor: '#8b5cf6' },
                orange: { bg: 'bg-orange-500', text: 'text-orange-600', bg100: 'bg-orange-100', strokeColor: '#f97316' },
                cyan: { bg: 'bg-cyan-500', text: 'text-cyan-600', bg100: 'bg-cyan-100', strokeColor: '#06b6d4' },
                emerald: { bg: 'bg-emerald-500', text: 'text-emerald-600', bg100: 'bg-emerald-100', strokeColor: '#10b981' },
              };
              const colors = colorMap[p.color];
              const trendIcon = p.trend === 'up' ? '↗' : p.trend === 'down' ? '↘' : '→';
              const trendColor = p.trend === 'up' ? 'text-green-600' : p.trend === 'down' ? 'text-red-600' : 'text-slate-400';

              return (
                <div key={p.item} className="bg-white/90 border border-slate-200/40 rounded-xl p-4 shadow-sm">
                  {/* Header with Icon and Good Status */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-2xl`}>
                        {p.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-800">{p.item}</h3>
                      </div>
                    </div>
                    
                  </div>

                  {/* Main Content - Circular Progress and Status */}
                  <div className="flex items-center justify-between mb-4">
                    {/* Circular Progress */}
                    <div className="relative w-16 h-16">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#f1f5f9"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={colors.strokeColor}
                          strokeWidth="3"
                          strokeDasharray={`${p.compliant}, 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-slate-800">{p.compliant}%</span>
                      </div>
                    </div>
                    
                    {/* Status Information */}
                    <div className="flex flex-col gap-2">
                      
                      
                      <div className="flex items-center gap-2">
                        <div className='bg-orange-100 rounded-full p-1'><AlertTriangle className="w-4 h-4  text-orange-600" /></div>
                        <div className="text-left">
                          <p className="text-xs text-slate-500">Violations Today</p>
                          <p className="text-sm font-bold text-orange-600">{p.violations}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* PPE Compliance by Area - Minimal */}
          <CardWrapper title="PPE Compliance by Area" subtitle="Breakdown per laboratory zone" className=" col-span-2">
            <div className="space-y-2 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-100 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-slate-400 max-h-[400px]">
              {PPE_COMPLIANCE_BY_AREA.map(area => (
                <div key={area.area} className="flex items-center justify-between p-2.5 bg-slate-50/50 border border-slate-200/40 rounded-lg hover:bg-slate-100/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-left min-w-[100px]">
                      <h4 className="text-xs font-semibold text-slate-800">{area.area}</h4>
                      <p className="text-[10px] text-slate-400">{area.violations} violations</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2.5">
                      {[
                        { icon: '⛑️', value: area.helmet },
                        { icon: '🧤', value: area.gloves },
                        { icon: '🥽', value: area.goggles },
                        { icon: '🥼', value: area.labCoat },
                        { icon: '🛡️', value: area.faceShield },
                      ].map((item, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-xs mb-0.5">{item.icon}</div>
                          <div className={`text-[10px] font-semibold ${
                            item.value >= 90 ? 'text-green-600' : 
                            item.value >= 80 ? 'text-amber-600' : 
                            'text-red-600'
                          }`}>{item.value}%</div>
                        </div>
                      ))}
                    </div>
                    <div className="text-right border-l border-slate-200 pl-4">
                      <span className={`text-2xl font-bold ${
                        area.compliance >= 90 ? 'text-green-600' : 
                        area.compliance >= 80 ? 'text-amber-600' : 
                        'text-red-600'
                      }`}>{area.compliance}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardWrapper>

          {/* PPE Recent Alerts Card */}
          <CardWrapper title="Recent PPE Violations" subtitle="Latest 5 violation alerts" className="col-span-1">
            <div className="space-y-2 max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-100 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-slate-400">
              {PPE_RECENT_ALERTS.map((alert, idx) => (
                <div key={idx} className={`p-2.5 rounded-lg border ${
                  alert.severity === 'high' ? 'bg-red-50/60 border-red-200/40' : 'bg-amber-50/60 border-amber-200/40'
                }`}>
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle className={`w-3 h-3 ${alert.severity === 'high' ? 'text-red-500' : 'text-amber-500'}`} />
                      <span className="text-[10px] text-slate-500">{alert.time}</span>
                    </div>
                    <Badge variant={alert.severity === 'high' ? 'error' : 'warning'} size="sm">
                      {alert.severity === 'high' ? 'High' : 'Medium'}
                    </Badge>
                  </div>
                  <p className="text-xs font-medium text-slate-800 mb-0.5">{alert.personnel}</p>
                  <p className="text-[10px] text-slate-600">{alert.area}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{alert.violation}</p>
                </div>
              ))}
            </div>
          </CardWrapper>

          

          {/* PPE Detection Logs Table */}
          <div className="col-span-3">
            <CardWrapper title="PPE Detection Logs" subtitle="Recent personnel scans with equipment status">
              {/* Area Filter */}
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-500 mr-1">Area:</span>
                {['All Areas', 'Lab A', 'Lab B', 'Chemical Bay', 'Radiation Lab'].map(area => (
                  <button
                    key={area}
                    onClick={() => handlePpeAreaFilterChange(area)}
                    className={`px-3 py-1 text-[11px] rounded-full border font-medium transition-colors ${
                      ppeAreaFilter === area
                        ? 'bg-cyan-500 text-white border-cyan-500'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >{area}</button>
                ))}
                <span className="ml-auto text-[10px] text-slate-400">{filteredPpeLogs.length} records</span>
              </div>

              <div className="overflow-hidden rounded-lg border border-slate-200/40">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <th className="text-left px-3 py-2 text-slate-500 font-medium">Date</th>
                      <th className="text-left px-3 py-2 text-slate-500 font-medium">Time</th>
                      <th className="text-left px-3 py-2 text-slate-500 font-medium">Area</th>
                      <th className="text-left px-3 py-2 text-slate-500 font-medium">Violations</th>
                      <th className="text-left px-3 py-2 text-slate-500 font-medium">Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPpeLogs.map(log => {
                      const violations = [];
                      if (!log.helmet) violations.push('Helmet');
                      if (!log.gloves) violations.push('Gloves');
                      if (!log.goggles) violations.push('Goggles');
                      if (!log.labCoat) violations.push('Lab Coat');
                      if (!log.faceShield) violations.push('Face Shield');
                      const violationText = violations.length > 0 ? violations.join(', ') : 'Compliant';
                      const isCompliant = violations.length === 0;

                      return (
                        <tr key={log.id} className={`border-b border-slate-50 hover:bg-slate-50/60 transition-colors ${
                          !isCompliant ? 'bg-red-50/20' : ''
                        }`}>
                          <td className="px-3 py-2.5 text-slate-500 whitespace-nowrap">{log.date}</td>
                          <td className="px-3 py-2.5 text-slate-500 whitespace-nowrap">{log.time}</td>
                          <td className="px-3 py-2.5 text-slate-600">{log.area}</td>
                          <td className="px-3 py-2.5">
                            {isCompliant ? (
                              <div className="flex items-center gap-1.5">
                                <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                                <span className="text-green-700 font-medium">{violationText}</span>
                              </div>
                            ) : (
                              <div className="flex items-start gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                                <span className="text-red-700 font-medium">{violationText}</span>
                              </div>
                            )}
                          </td>
                          <td className="px-3 py-2.5">
                            <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center overflow-hidden">
                              <span className="text-[10px] text-slate-400">Image</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <Pagination currentPage={ppeLogsPage} totalPages={ppeTotalPages} onPageChange={setPpeLogsPage} />
            </CardWrapper>
          </div>
        </div>
      )}

      {/* ── Occupancy ── */}
      {activeSection === 'Occupancy' && (
        <div className="grid grid-cols-2 gap-4">
          <CardWrapper title="Occupancy Trend — Today" subtitle="Personnel count per area (hourly)" className="col-span-2">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={occupancyData}>
                <defs>
                  {['#06b6d4', '#8b5cf6', '#f59e0b', '#10b981'].map((c, i) => (
                    <linearGradient key={i} id={`occ${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={c} stopOpacity={0.15} />
                      <stop offset="95%" stopColor={c} stopOpacity={0.01} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={{ fontSize: 11 }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                <Area type="monotone" dataKey="labA" name="Lab A (max 18)" stroke="#06b6d4" fill="url(#occ0)" strokeWidth={2} />
                <Area type="monotone" dataKey="labB" name="Lab B (max 15)" stroke="#8b5cf6" fill="url(#occ1)" strokeWidth={2} />
                <Area type="monotone" dataKey="chemBay" name="Chemical Bay (max 6)" stroke="#f59e0b" fill="url(#occ2)" strokeWidth={2} />
                <Area type="monotone" dataKey="corridor" name="Corridor C (max 20)" stroke="#10b981" fill="url(#occ3)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardWrapper>

          <CardWrapper title="Current Occupancy by Area" subtitle="Live — updated every 30s">
            <div className="space-y-3 pt-1">
              {areaStatus.map(a => {
                const pct = Math.round((a.current / a.max) * 100);
                const isOver = a.current > a.max;
                return (
                  <div key={a.area}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-700">{a.area}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${isOver ? 'text-red-600' : pct > 80 ? 'text-amber-600' : 'text-slate-700'}`}>
                          {a.current} / {a.max}
                        </span>
                        {isOver && <Badge variant="error" size="sm">Over Capacity</Badge>}
                      </div>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${isOver ? 'bg-red-400' : pct > 80 ? 'bg-amber-400' : 'bg-green-400'}`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardWrapper>

          <CardWrapper title="Occupancy Alerts — Today" subtitle="Capacity threshold breaches">
            <div className="space-y-2 pt-1">
              {[
                { area: 'Lab A', time: '10:41', count: 20, max: 18, resolved: true },
                { area: 'Chemical Bay', time: '09:15', count: 7, max: 6, resolved: true },
                { area: 'Lab A', time: '08:55', count: 19, max: 18, resolved: true },
              ].map((ev, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-amber-50/60 border border-amber-200/40 rounded-lg">
                  <div>
                    <p className="text-xs font-medium text-slate-800">{ev.area} — {ev.count}/{ev.max} personnel</p>
                    <p className="text-[10px] text-slate-400">{ev.time}</p>
                  </div>
                  <Badge variant={ev.resolved ? 'success' : 'warning'} size="sm">{ev.resolved ? 'Resolved' : 'Active'}</Badge>
                </div>
              ))}
            </div>
          </CardWrapper>
        </div>
      )}

      {/* ── Restricted Areas ── */}
      {activeSection === 'Restricted Areas' && (
        <div className="grid grid-cols-1 gap-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-3">
            <MetricCard 
              title="Restricted Zones Monitored" 
              value="8" 
              subtitle="Monitored" 
              icon={CheckCircle} 
              status="success" 
            />
            <MetricCard 
              title="Authorized Access Events" 
              value="127" 
              subtitle="Events today" 
              icon={Users} 
              status="info" 
            />
            <MetricCard 
              title="Unauthorized Breaches Today" 
              value="3" 
              subtitle="Today" 
              icon={MapPin} 
              status="error" 
            />
          </div>

          {/* Restricted Area Access Logs */}
          <CardWrapper title="Restricted Area Monitoring — Access Logs" subtitle="Real-time monitoring of designated restricted zones with unauthorized access detection">
            <div className="overflow-hidden rounded-lg border border-slate-200/40">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Date</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Time</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Restricted Zone</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Personnel</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Badge ID</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Authorization</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Duration</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Image</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRestrictedLogs.map(log => (
                    <tr key={log.id} className={`border-b border-slate-50 hover:bg-slate-50/60 transition-colors ${
                      log.status === 'Critical' ? 'bg-red-50/30' : log.status === 'Warning' ? 'bg-amber-50/20' : ''
                    }`}>
                      <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">{log.date}</td>
                      <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">{log.time}</td>
                      <td className="px-4 py-2.5 text-slate-700 font-medium">{log.zone}</td>
                      <td className="px-4 py-2.5 text-slate-600">{log.personnel}</td>
                      <td className="px-4 py-2.5 font-mono text-[10px] text-slate-500">{log.badge}</td>
                      <td className="px-4 py-2.5">
                        <Badge variant={log.authorized ? 'success' : 'error'} size="sm">
                          {log.authorized ? 'Authorized' : 'Unauthorized'}
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5 text-slate-600">{log.duration}</td>
                      <td className="px-4 py-2.5">
                        <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center overflow-hidden">
                          <span className="text-[10px] text-slate-400">Image</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={restrictedLogsPage} totalPages={restrictedTotalPages} onPageChange={setRestrictedLogsPage} />
          </CardWrapper>

          {/* Zone Status Overview */}
          <CardWrapper title="Restricted Zones — Current Status" subtitle="Live monitoring status of all restricted areas">
            <div className="grid grid-cols-4 gap-3">
              {[
                { zone: 'Chemical Bay', status: 'Secure', occupancy: 5, maxOccupancy: 6, lastBreach: '11:22:15', alerts: 1 },
                { zone: 'Radiation Lab', status: 'Secure', occupancy: 2, maxOccupancy: 4, lastBreach: '09:44:02', alerts: 0 },
                { zone: 'Server Room Annex', status: 'Alert', occupancy: 0, maxOccupancy: 2, lastBreach: '16:30:45', alerts: 1 },
                { zone: 'Biocontainment Suite', status: 'Secure', occupancy: 3, maxOccupancy: 3, lastBreach: 'None', alerts: 0 },
                { zone: 'Cryogenic Storage', status: 'Secure', occupancy: 1, maxOccupancy: 2, lastBreach: 'None', alerts: 0 },
                { zone: 'Explosive Materials', status: 'Secure', occupancy: 0, maxOccupancy: 2, lastBreach: 'None', alerts: 0 },
                { zone: 'High Voltage Room', status: 'Secure', occupancy: 2, maxOccupancy: 4, lastBreach: 'None', alerts: 0 },
                { zone: 'Pressure Test Bay', status: 'Secure', occupancy: 1, maxOccupancy: 3, lastBreach: 'None', alerts: 0 },
              ].map(z => (
                <div key={z.zone} className="bg-white/70 border border-slate-200/40 rounded-lg p-3 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-semibold text-slate-800">{z.zone}</h4>
                    <Badge variant={z.status === 'Alert' ? 'error' : 'success'} size="sm">{z.status}</Badge>
                  </div>
                  <div className="space-y-1.5 text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Occupancy:</span>
                      <span className="font-medium text-slate-700">{z.occupancy}/{z.maxOccupancy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Last breach:</span>
                      <span className="font-medium text-slate-700">{z.lastBreach}</span>
                    </div>
                    {z.alerts > 0 && (
                      <div className="mt-2 px-2 py-1 bg-red-50 border border-red-200 rounded text-red-700 font-medium text-center">
                        {z.alerts} active alert{z.alerts > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardWrapper>
        </div>
      )}

      {/* ── Unsafe Behavior ── */}
      {activeSection === 'Unsafe Behavior' && (
        <div className="grid grid-cols-1 gap-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-3">
            <MetricCard 
              title="Total incidents" 
              value="38" 
              subtitle="Today" 
              icon={CheckCircle} 
              status="success" 
            />
            
            <MetricCard 
              title="High-Risk Behaviors" 
              value="2" 
              subtitle="Today" 
              icon={AlertTriangle} 
              status="error" 
            />

            <MetricCard 
              title="Unsafe Incidents detected" 
              value="5" 
              subtitle="Detected today" 
              icon={Zap} 
              status="warning" 
            />
            
          </div>

          {/* Unsafe Behavior Detection Logs */}
          <CardWrapper title="Unsafe Behavior Detection — Activity Logs" subtitle="AI-powered detection of unsafe actions and laboratory safety protocol violations">
            <div className="overflow-hidden rounded-lg border border-slate-200/40">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Date</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Time</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Area</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Unsafe Behavior Detected</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Risk Level</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Image</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUnsafeLogs.map(log => (
                    <tr key={log.id} className={`border-b border-slate-50 hover:bg-slate-50/60 transition-colors ${
                      log.riskLevel === 'High' && log.status === 'Open' ? 'bg-red-50/20' : ''
                    }`}>
                      <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">{log.date}</td>
                      <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">{log.time}</td>
                      <td className="px-4 py-2.5 text-slate-600">{log.area}</td>
                      <td className="px-4 py-2.5 text-slate-600 max-w-xs">{log.behavior}</td>
                      <td className="px-4 py-2.5">
                        <Badge 
                          variant={log.riskLevel === 'High' ? 'error' : log.riskLevel === 'Medium' ? 'warning' : 'info'} 
                          size="sm"
                        >
                          {log.riskLevel}
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center overflow-hidden">
                          <span className="text-[10px] text-slate-400">Image</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={unsafeLogsPage} totalPages={unsafeTotalPages} onPageChange={setUnsafeLogsPage} />
          </CardWrapper>

          {/* Behavior Categories Breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <CardWrapper title="Common Unsafe Behaviors — This Week" subtitle="Frequency of detected behavior types">
              <div className="space-y-2.5">
                {[
                  { behavior: 'Improper chemical handling', count: 12, trend: 'up' },
                  { behavior: 'Missing ventilation usage', count: 8, trend: 'down' },
                  { behavior: 'Running near hazards', count: 7, trend: 'neutral' },
                  { behavior: 'Improper storage procedures', count: 6, trend: 'down' },
                  { behavior: 'Eating/drinking in lab', count: 5, trend: 'up' },
                ].map(item => (
                  <div key={item.behavior} className="flex items-center justify-between p-2.5 bg-slate-50/60 border border-slate-200/40 rounded-lg">
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-800">{item.behavior}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-700">{item.count}</span>
                      <span className="text-[10px] text-slate-400">incidents</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardWrapper>

          </div>
        </div>
      )}

      {/* ── Events Log ── */}
      {activeSection === 'Events Log' && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-500 mr-1">Filter:</span>
            {CATEGORY_FILTER.map(f => (
              <button
                key={f}
                onClick={() => handleCategoryFilterChange(f)}
                className={`px-3 py-1 text-[11px] rounded-full border font-medium transition-colors ${
                  categoryFilter === f
                    ? 'bg-cyan-500 text-white border-cyan-500'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >{f}</button>
            ))}
            <span className="ml-auto text-[10px] text-slate-400">{filteredLogs.length} events</span>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs hover:bg-slate-50">
              <Download className="w-3 h-3" /> CSV
            </button>
          </div>

          <div className="bg-white/70 rounded-xl border border-slate-200/40 overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Event ID</th>
                  <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Time</th>
                  <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Detection Type</th>
                  <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Zone</th>
                  <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Detail</th>
                  <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Severity</th>
                  <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Status</th>
                  <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Image</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEvents.map(ev => (
                  <tr key={ev.id} className={`border-b border-slate-50 hover:bg-slate-50/60 transition-colors ${
                    ev.severity === 'critical' && ev.status === 'Open' ? 'bg-red-50/30' : ''
                  }`}>
                    <td className="px-4 py-2.5 font-mono text-slate-400 text-[10px]">{ev.id}</td>
                    <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">{ev.time}</td>
                    <td className="px-4 py-2.5 font-medium text-slate-800">{ev.type}</td>
                    <td className="px-4 py-2.5 text-slate-600 whitespace-nowrap">{ev.zone}</td>
                    <td className="px-4 py-2.5 text-slate-500 max-w-xs truncate">{ev.detail}</td>
                    <td className="px-4 py-2.5">
                      <Badge variant={severityBadge[ev.severity]} size="sm">{severityLabel[ev.severity]}</Badge>
                    </td>
                    <td className="px-4 py-2.5">
                      <Badge variant={statusBadge[ev.status]} size="sm">{ev.status}</Badge>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center overflow-hidden">
                        <span className="text-[10px] text-slate-400">Image</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination currentPage={eventsPage} totalPages={eventsTotalPages} onPageChange={setEventsPage} />
        </div>
      )}
    </div>
  );
}
