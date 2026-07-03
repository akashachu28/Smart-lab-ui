import { Incident, RootCause, CAPAAction, TimelineEvent, SimilarIncident, EvidenceSource, RiskAssessment, InvestigatorWorkload } from './types';

export const incidents: Incident[] = [
  { id: 'INC-2024-041', title: 'Reagent contamination in Water Testing', date: '2024-06-10', severity: 'error', status: 'Under Investigation', type: 'Chemical Spill', department: 'Chemistry', affectedArea: 'Organic Chemistry Lab', duration: '18 minutes' },
  { id: 'INC-2024-040', title: 'PPE non-compliance — Lab Entrance Zone A', date: '2024-06-09', severity: 'warning', status: 'CAPA Assigned', type: 'Safety', department: 'Lab A' },
  { id: 'INC-2024-039', title: 'Gas cylinder pressure failure — CYL-003', date: '2024-06-08', severity: 'error', status: 'Open', type: 'Gas Leak', department: 'Storage' },
  { id: 'INC-2024-038', title: 'Chemical storage violation — Cabinet A-3', date: '2024-06-07', severity: 'warning', status: 'Closed', type: 'Chemical Spill', department: 'Chemistry' },
  { id: 'INC-2024-037', title: 'Sample mislabelling — Batch SMP-0430', date: '2024-06-05', severity: 'warning', status: 'Closed', type: 'Other', department: 'QA' },
];

export const rootCauses: RootCause[] = [
  { 
    cause: 'Contaminated reagent batch from external supplier', 
    confidence: 93, 
    factors: ['Batch QC not performed on receipt', 'Supplier certificate expired', 'No incoming inspection record'],
    explanation: 'The most probable root cause is progressive valve wear. Historical maintenance records indicate repeated pressure deviations during the previous two inspection cycles.'
  },
  { 
    cause: 'Inadequate cleaning procedure between test runs', 
    confidence: 81, 
    factors: ['SOP-WQ-03 not followed', 'Technician training gap identified', 'Equipment not calibrated'],
    explanation: 'Operator actions were consistent with standard procedures but maintenance schedule was not followed.'
  },
  { 
    cause: 'Valve failure due to wear and tear', 
    confidence: 76, 
    factors: ['Exceeded recommended service life', 'Maintenance delayed by 2 weeks', 'No preventive replacement'],
    explanation: 'Progressive wear indicated by historical sensor data.'
  },
];

export const capaActions: CAPAAction[] = [
  { action: 'Quarantine and dispose of reagent batch RGT-2024-0441', type: 'Corrective', assignee: 'Reem Al-Musa', due: '2024-06-12', status: 'In Progress', priority: 'Critical' },
  { action: 'Update SOP-WQ-03 to include batch QC on receipt', type: 'Preventive', assignee: 'Lab Manager', due: '2024-06-20', status: 'Pending', priority: 'High' },
  { action: 'Conduct reagent handling refresher training', type: 'Preventive', assignee: 'Training Dept', due: '2024-06-30', status: 'Pending', priority: 'Medium' },
  { action: 'Replace valve assembly', type: 'Corrective', assignee: 'Maintenance', due: 'Today', status: 'In Progress', priority: 'Critical' },
  { action: 'Inspect similar valves', type: 'Preventive', assignee: 'Maintenance', due: 'Within 24 Hours', status: 'Pending', priority: 'High' },
];

export const timeline: TimelineEvent[] = [
  { time: '2024-06-10 07:30', event: 'Anomalous test results flagged by analyst', user: 'Ahmad Karimi', type: 'incident' },
  { time: '2024-06-10 08:15', event: 'Incident reported and logged', user: 'Ahmad Karimi', type: 'action' },
  { time: '2024-06-10 09:00', event: 'Batch RGT-2024-0441 quarantined', user: 'Reem Al-Musa', type: 'action' },
  { time: '2024-06-10 10:00', event: 'AI root cause analysis initiated', user: 'System', type: 'ai' },
  { time: '2024-06-10 10:05', event: 'RCA report generated — 2 probable causes identified', user: 'AI Copilot', type: 'ai' },
  { time: '2024-06-10 10:15', event: 'CAPA recommendations created', user: 'AI Copilot', type: 'ai' },
  { time: '2024-06-10 10:30', event: 'Investigation assigned to team lead', user: 'System', type: 'system' },
];

export const similarIncidents: SimilarIncident[] = [
  { id: 'INC-2024-031', title: 'Reagent batch failure — Lab B', similarity: 97, date: 'Feb 12', rootCause: 'Valve wear' },
  { id: 'INC-2023-098', title: 'Supplier QC gap — Chemicals', similarity: 91, date: 'Jan 04', rootCause: 'Quality control' },
  { id: 'INC-2023-087', title: 'Solvent spill — Transfer line', similarity: 88, date: 'Dec 20', rootCause: 'Equipment failure' },
];

export const evidenceSources: EvidenceSource[] = [
  { type: 'Documents', count: 18 },
  { type: 'Sensor Logs', count: 2814 },
  { type: 'Maintenance Records', count: 42 },
  { type: 'Images', count: 38 },
  { type: 'Video Clips', count: 6 },
  { type: 'Witness Statements', count: 5 },
];

export const riskAssessment: RiskAssessment = {
  overall: 'High',
  safety: 82,
  environmental: 24,
  operational: 67,
  compliance: 18,
};

export const investigatorWorkload: InvestigatorWorkload[] = [
  { investigator: 'Alice', assigned: 8, open: 3, closed: 121 },
  { investigator: 'Bob', assigned: 6, open: 2, closed: 118 },
  { investigator: 'John', assigned: 9, open: 5, closed: 134 },
];

export const incidentDistribution = [
  { name: 'Safety', value: 38, color: '#ef4444' },
  { name: 'Chemical Spill', value: 22, color: '#f59e0b' },
  { name: 'Equipment Failure', value: 18, color: '#8b5cf6' },
  { name: 'Gas Leak', value: 12, color: '#06b6d4' },
  { name: 'Fire', value: 5, color: '#dc2626' },
  { name: 'Other', value: 5, color: '#64748b' },
];

export const incidentSeverity = [
  { severity: 'Critical', value: 5, color: '#dc2626' },
  { severity: 'High', value: 14, color: '#ef4444' },
  { severity: 'Medium', value: 38, color: '#f59e0b' },
  { severity: 'Low', value: 43, color: '#10b981' },
];

export const incidentTrend = [
  { month: 'Jan', count: 42 },
  { month: 'Feb', count: 38 },
  { month: 'Mar', count: 51 },
  { month: 'Apr', count: 46 },
  { month: 'May', count: 39 },
  { month: 'Jun', count: 44 },
];

export const incidentByDepartment = [
  { department: 'Chemistry', value: 90 },
  { department: 'Research', value: 60 },
  { department: 'Production', value: 50 },
  { department: 'QA', value: 30 },
];

export const incidentByShift = [
  { shift: 'Morning', value: 38, color: '#06b6d4' },
  { shift: 'Afternoon', value: 31, color: '#8b5cf6' },
  { shift: 'Night', value: 21, color: '#ef4444' },
  { shift: 'Weekend', value: 10, color: '#64748b' },
];

export const commonRootCauses = [
  { cause: 'Equipment', value: 35, color: '#ef4444' },
  { cause: 'Human Error', value: 28, color: '#f59e0b' },
  { cause: 'Procedure', value: 17, color: '#8b5cf6' },
  { cause: 'Environment', value: 11, color: '#06b6d4' },
  { cause: 'Unknown', value: 9, color: '#64748b' },
];

export const equipmentFailures = [
  { equipment: 'Valve Systems', count: 100 },
  { equipment: 'Pumps', count: 60 },
  { equipment: 'Compressors', count: 50 },
  { equipment: 'Sensors', count: 40 },
];

export const aiInsights = [
  'Equipment failures account for 35% of all recorded incidents this quarter.',
  'Valve-related failures have increased by 14% compared to the previous quarter.',
  'Three recent chemical spills share nearly identical root causes, suggesting a systemic maintenance issue.',
  'Average investigation completion time decreased from 4.6 days to 3.4 days.',
  'Night-shift incidents have a 22% higher recurrence rate than day-shift incidents.',
  '91% of completed CAPAs successfully prevented repeat incidents over the past six months.',
  'Laboratory 2 has maintained the longest incident-free period (118 days).',
  'AI recommends preventive maintenance for 12 additional valves with similar operating conditions.',
];

export const recentActivity = [
  { time: '09:08', event: 'Incident reported', detail: 'INC-2024-041' },
  { time: '09:12', event: 'AI summary generated', detail: 'Confidence 94%' },
  { time: '09:18', event: 'Evidence collected', detail: '18 documents' },
  { time: '09:25', event: 'Root cause identified', detail: 'Valve failure' },
  { time: '09:34', event: 'CAPA recommended', detail: '5 actions' },
  { time: '09:48', event: 'Investigation approved', detail: 'Team Lead' },
  { time: '10:02', event: 'Knowledge base updated', detail: 'Completed' },
];

export const complianceMetrics = {
  investigationsComplete: 96.2,
  capaCompliance: 98,
  auditReadiness: 97,
  regulatoryReporting: 100,
};

export const complianceChecklist = [
  { item: 'Incident Report', status: true },
  { item: 'Investigation', status: true },
  { item: 'Evidence', status: true },
  { item: 'RCA', status: true },
  { item: 'CAPA', status: true },
  { item: 'Approval', status: true },
  { item: 'Closure', status: false },
  { item: 'Lessons Learned', status: false },
];

export const statusConfig: Record<string, { badge: 'error' | 'warning' | 'info' | 'success' | 'neutral'; label: string }> = {
  Open: { badge: 'error', label: 'Open' },
  'Under Investigation': { badge: 'warning', label: 'Under Investigation' },
  'CAPA Assigned': { badge: 'info', label: 'CAPA Assigned' },
  Closed: { badge: 'success', label: 'Closed' },
};
