import {
  CompatibilityViolation,
  StorageArea,
  CompatibilityCheck,
  VisionAlert,
  CorrectiveAction,
  HighRiskChemical,
  EnvironmentalReading,
  ComplianceMetric
} from './types';

export const violations: CompatibilityViolation[] = [
  { id: 1, chemA: 'Acetone', chemB: 'Hydrogen Peroxide 30%', reason: 'Oxidiser + Flammable', location: 'Rack A-3', severity: 'error', recommended: 'Move Acetone to Cabinet F (flammables)', timestamp: '09:14' },
  { id: 2, chemA: 'Sodium Hydroxide', chemB: 'Hydrochloric Acid', reason: 'Acid + Base', location: 'Rack B-2', severity: 'error', recommended: 'Separate to dedicated acid/base cabinets', timestamp: '09:48' },
  { id: 3, chemA: 'Ethanol', chemB: 'Potassium Permanganate', reason: 'Oxidiser + Flammable (proximity)', location: 'Rack E-3', severity: 'warning', recommended: 'Increase separation distance or relocate', timestamp: '10:22' },
];

export const rackData = [
  ['safe', 'safe', 'incompatible', 'safe', 'safe'],
  ['safe', 'warning', 'safe', 'safe', 'empty'],
  ['safe', 'safe', 'safe', 'incompatible', 'safe'],
  ['empty', 'safe', 'safe', 'safe', 'safe'],
  ['safe', 'safe', 'warning', 'empty', 'safe'],
];

export const rackLabels: Record<string, string> = {
  safe: 'Safe',
  incompatible: 'Incompatible',
  warning: 'Warning',
  empty: 'Empty',
};

export const rackColors: Record<string, string> = {
  safe: 'bg-green-100 border-green-300 text-green-700',
  incompatible: 'bg-red-200 border-red-400 text-red-700 animate-pulse',
  warning: 'bg-amber-100 border-amber-300 text-amber-700',
  empty: 'bg-slate-50 border-slate-200 text-slate-300',
};

export const trendData = [
  { date: 'Jun 1', violations: 4 },
  { date: 'Jun 5', violations: 3 },
  { date: 'Jun 10', violations: 5 },
  { date: 'Jun 15', violations: 2 },
  { date: 'Jun 20', violations: 3 },
  { date: 'Jun 25', violations: 2 },
];

export const storageAreas: StorageArea[] = [
  { area: 'Acid Room', capacity: 82, occupancy: 78, compliance: 'Compliant', status: 'Safe' },
  { area: 'Solvent Room', capacity: 91, occupancy: 94, compliance: 'Warning', status: 'Near Capacity' },
  { area: 'Flammable Storage', capacity: 68, occupancy: 65, compliance: 'Compliant', status: 'Safe' },
  { area: 'Oxidizer Room', capacity: 75, occupancy: 88, compliance: 'Warning', status: 'Near Capacity' },
  { area: 'Cold Storage', capacity: 60, occupancy: 42, compliance: 'Compliant', status: 'Safe' },
];

export const compatibilityMatrix = [
  { category: 'Acids', acids: 'Compatible', bases: 'Incompatible', oxidizers: 'Warning', flammables: 'Warning', organics: 'Warning' },
  { category: 'Bases', acids: 'Incompatible', bases: 'Compatible', oxidizers: 'Warning', flammables: 'Compatible', organics: 'Compatible' },
  { category: 'Oxidizers', acids: 'Warning', bases: 'Warning', oxidizers: 'Compatible', flammables: 'Incompatible', organics: 'Incompatible' },
  { category: 'Flammables', acids: 'Warning', bases: 'Compatible', oxidizers: 'Incompatible', flammables: 'Compatible', organics: 'Warning' },
  { category: 'Organics', acids: 'Warning', bases: 'Compatible', oxidizers: 'Incompatible', flammables: 'Warning', organics: 'Compatible' },
];

export const compatibilityChecks: CompatibilityCheck[] = [
  { chemicalA: 'Nitric Acid', chemicalB: 'Ethanol', risk: 'Critical', recommendation: 'Separate Immediately', hazardType: 'Fire/Explosion Risk' },
  { chemicalA: 'Hydrochloric Acid', chemicalB: 'Sodium Hydroxide', risk: 'Warning', recommendation: 'Store Independently', hazardType: 'Exothermic Reaction' },
  { chemicalA: 'Acetone', chemicalB: 'IPA', risk: 'Safe', recommendation: 'Compatible', hazardType: 'None' },
  { chemicalA: 'Hydrogen Peroxide', chemicalB: 'Organic Solvents', risk: 'Critical', recommendation: 'Keep Separate', hazardType: 'Oxidation Hazard' },
];

export const visionAlerts: VisionAlert[] = [
  { id: 1, time: '09:14', area: 'Storage A', issue: 'Acid near Flammable', severity: 'Critical', resolved: false },
  { id: 2, time: '09:48', area: 'Warehouse', issue: 'Oxidizer stored incorrectly', severity: 'High', resolved: false },
  { id: 3, time: '10:22', area: 'Chemical Room', issue: 'Missing hazard label', severity: 'Medium', resolved: false },
  { id: 4, time: '08:15', area: 'Lab B', issue: 'Container outside zone', severity: 'High', resolved: true },
];

export const correctiveActions: CorrectiveAction[] = [
  { issue: 'Separate Nitric Acid', assignedTo: 'Safety Officer', due: 'Today', status: 'Open' },
  { issue: 'Relabel Solvent Cabinet', assignedTo: 'Lab Assistant', due: 'Tomorrow', status: 'In Progress' },
  { issue: 'Relocate Hydrogen Peroxide', assignedTo: 'Chemical Manager', due: 'Today', status: 'Open' },
  { issue: 'Update Storage Matrix', assignedTo: 'Safety Team', due: '2 Days', status: 'Completed' },
];

export const highRiskChemicals: HighRiskChemical[] = [
  { chemical: 'Nitric Acid', riskScore: 96, location: 'Storage A', casNumber: '7697-37-2' },
  { chemical: 'Hydrogen Peroxide', riskScore: 91, location: 'Oxidizer Room', casNumber: '7722-84-1' },
  { chemical: 'Sodium Metal', riskScore: 89, location: 'Chemical Vault', casNumber: '7440-23-5' },
  { chemical: 'Perchloric Acid', riskScore: 94, location: 'Acid Room', casNumber: '7601-90-3' },
];

export const environmentalReadings: EnvironmentalReading[] = [
  { parameter: 'Temperature', value: '22.4', status: 'Normal', unit: '°C' },
  { parameter: 'Humidity', value: '48', status: 'Normal', unit: '%' },
  { parameter: 'Ventilation', value: 'Normal', status: 'Normal' },
  { parameter: 'Air Quality', value: 'Good', status: 'Normal' },
  { parameter: 'VOC Level', value: '0.12', status: 'Normal', unit: 'ppm' },
];

export const complianceMetrics: ComplianceMetric[] = [
  { category: 'Storage Compliance', score: 98.6, status: 'Compliant' },
  { category: 'Inspection Compliance', score: 97.9, status: 'Compliant' },
  { category: 'Label Compliance', score: 99.1, status: 'Compliant' },
  { category: 'Audit Readiness', score: 96.4, status: 'Compliant' },
];

export const complianceChecklist = [
  { item: 'Proper Labeling', status: true },
  { item: 'Compatible Storage', status: true },
  { item: 'Fire Cabinet Compliance', status: true },
  { item: 'Temperature Control', status: true },
  { item: 'Segregation Rules', status: false },
  { item: 'Authorized Storage', status: true },
  { item: 'Inventory Match', status: true },
  { item: 'MSDS Available', status: true },
];

export const aiInsights = [
  'Two incompatible chemical pairs require immediate separation to eliminate fire risk.',
  'Flammable Storage Room maintains the highest compliance score (99.5%).',
  'Computer Vision detected six misplaced containers during the morning inspection.',
  'Most compatibility violations involve oxidizers stored near organic solvents.',
  'Storage Area C exceeded the recommended occupancy threshold of 90%.',
  'Label recognition accuracy improved to 99.3% following recent image model updates.',
  'AI predicts an increased compatibility risk in Warehouse B due to incoming deliveries scheduled today.',
  'Correcting the current storage violations will improve the overall safety score from 98.9% to 99.6%.',
];

export const recentSafetyEvents = [
  { time: '09:08', event: 'Chemical received', detail: 'Nitric Acid 68%' },
  { time: '09:10', event: 'AI compatibility check completed', detail: 'Pass' },
  { time: '09:14', event: 'Critical incompatibility detected', detail: 'Storage A' },
  { time: '09:15', event: 'Safety officer notified', detail: 'Alert sent' },
  { time: '09:22', event: 'Chemical relocated', detail: 'To Acid Room' },
  { time: '09:28', event: 'Computer Vision verified compliance', detail: '99.3%' },
  { time: '09:34', event: 'Violation closed', detail: 'Resolved' },
];

export const violationTrendData = [
  { month: 'Jan', count: 8 },
  { month: 'Feb', count: 12 },
  { month: 'Mar', count: 7 },
  { month: 'Apr', count: 4 },
  { month: 'May', count: 9 },
  { month: 'Jun', count: 5 },
];

export const violationCategories = [
  { name: 'Compatibility', value: 38, color: '#ef4444' },
  { name: 'Wrong Cabinet', value: 24, color: '#f59e0b' },
  { name: 'Missing Label', value: 18, color: '#8b5cf6' },
  { name: 'Temperature', value: 12, color: '#06b6d4' },
  { name: 'Other', value: 8, color: '#64748b' },
];

export const storageHeatmap = [
  { location: 'Warehouse', value: 90 },
  { location: 'Chemical Room', value: 95 },
  { location: 'Acid Room', value: 60 },
  { location: 'Flammable Storage', value: 75 },
  { location: 'Cold Storage', value: 45 },
];

export const detectionSummary = {
  containersDetected: 12412,
  violations: 17,
  misplacedContainers: 6,
  accuracy: 99.3,
};

export const detectionTypes = [
  { type: 'Wrong Shelf', count: 6 },
  { type: 'Missing Label', count: 4 },
  { type: 'Container Outside Zone', count: 5 },
  { type: 'Mixed Storage', count: 3 },
  { type: 'Unauthorized Access', count: 2 },
];

export const validationResults = {
  validated: 18642,
  compatible: 18591,
  warning: 38,
  critical: 13,
};

export const riskDistribution = [
  { category: 'Fire Risk', value: 12, color: '#ef4444' },
  { category: 'Explosion Risk', value: 4, color: '#dc2626' },
  { category: 'Chemical Reaction Risk', value: 7, color: '#f59e0b' },
  { category: 'Storage Risk', value: 9, color: '#8b5cf6' },
];
