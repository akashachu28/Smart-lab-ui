import { Cylinder, Alert, LeakEvent, MaintenanceRecord, ConsumptionData, RefillQueue } from './types';

// Live Cylinder Data
export const cylinders: Cylinder[] = [
  { id: 'CYL-001', gas: 'Nitrogen', location: 'Bay D-1', pressure: 180, maxPressure: 200, status: 'In Service', lastUpdate: '2s ago', department: 'Chemistry', building: 'Building A' },
  { id: 'CYL-002', gas: 'Oxygen', location: 'Bay D-2', pressure: 45, maxPressure: 200, status: 'Low Pressure', lastUpdate: '5s ago', department: 'ICU Lab', building: 'Building A' },
  { id: 'CYL-003', gas: 'Carbon Dioxide', location: 'Bay D-3', pressure: 0, maxPressure: 150, status: 'Leak Detected', lastUpdate: '12s ago', department: 'Storage', building: 'Building B' },
  { id: 'CYL-004', gas: 'Argon', location: 'Bay D-4', pressure: 165, maxPressure: 200, status: 'In Service', lastUpdate: '3s ago', department: 'Research', building: 'Building A' },
  { id: 'CYL-005', gas: 'Helium', location: 'Bay E-1', pressure: 190, maxPressure: 200, status: 'In Service', lastUpdate: '1s ago', department: 'QA Lab', building: 'Building C' },
  { id: 'CYL-006', gas: 'Hydrogen', location: 'Bay E-2', pressure: 120, maxPressure: 200, status: 'Inspection Due', lastUpdate: '8s ago', department: 'Lab 5', building: 'Building A' },
  { id: 'CYL-007', gas: 'Nitrogen', location: 'Storage A', pressure: 185, maxPressure: 200, status: 'Available', lastUpdate: '15s ago', department: 'Warehouse', building: 'Building B' },
  { id: 'CYL-008', gas: 'Oxygen', location: 'Lab 3', pressure: 195, maxPressure: 200, status: 'In Use', lastUpdate: '4s ago', department: 'Research', building: 'Building A' },
  { id: 'CYL-009', gas: 'CO₂', location: 'Storage B', pressure: 0, maxPressure: 150, status: 'Empty', lastUpdate: '1m ago', department: 'Warehouse', building: 'Building B' },
  { id: 'CYL-010', gas: 'Argon', location: 'Maintenance', pressure: 0, maxPressure: 200, status: 'Under Maintenance', lastUpdate: '5m ago', department: 'Maintenance', building: 'Building C' },
];

// Status Summary
export const statusSummary = {
  inUse: 318,
  available: 124,
  reserved: 18,
  empty: 22,
  underMaintenance: 11,
  quarantined: 5,
  retired: 7,
};

// Alerts
export const alerts: Alert[] = [
  { id: 1, type: 'Leak Detected', cylinderId: 'CYL-003', gas: 'Carbon Dioxide', time: '09:38:21', severity: 'error', location: 'Bay D-3', status: 'Active' },
  { id: 2, type: 'Low Pressure', cylinderId: 'CYL-002', gas: 'Oxygen', time: '09:25:04', severity: 'warning', location: 'Bay D-2', status: 'Acknowledged' },
  { id: 3, type: 'Inspection Due', cylinderId: 'CYL-006', gas: 'Hydrogen', time: '09:00:00', severity: 'warning', location: 'Bay E-2', status: 'Pending' },
  { id: 4, type: 'Critical Pressure', cylinderId: 'CYL-102', gas: 'Oxygen', time: '08:45:12', severity: 'error', location: 'ICU Lab', status: 'Active' },
  { id: 5, type: 'Sensor Offline', cylinderId: 'CYL-245', gas: 'Nitrogen', time: '08:30:00', severity: 'warning', location: 'Storage B', status: 'Investigating' },
];

// Leak Events
export const leakEvents: LeakEvent[] = [
  { id: 1, time: '09:42', location: 'Storage Room B', gas: 'Hydrogen', severity: 'critical', status: 'Active' },
  { id: 2, time: '10:18', location: 'Lab 4', gas: 'Nitrogen', severity: 'high', status: 'Investigating' },
  { id: 3, time: '08:15', location: 'Bay D-3', gas: 'CO₂', severity: 'medium', status: 'Resolved' },
];

// Lifecycle/Maintenance
export const maintenanceRecords: MaintenanceRecord[] = [
  { id: 'CYL-003', gas: 'Carbon Dioxide', lastInspection: '2023-12-10', nextDue: '2024-12-10', refillStatus: 'Empty', action: 'Immediate' },
  { id: 'CYL-006', gas: 'Hydrogen', lastInspection: '2023-06-15', nextDue: '2024-06-15', refillStatus: 'Partial', action: 'Schedule' },
  { id: 'CYL-002', gas: 'Oxygen', lastInspection: '2024-01-20', nextDue: '2025-01-20', refillStatus: 'Low', action: 'Refill' },
  { id: 'CYL-201', gas: 'Nitrogen', lastInspection: '2024-01-10', nextDue: '2024-07-10', refillStatus: 'Full', action: 'Due Soon' },
  { id: 'CYL-084', gas: 'Argon', lastInspection: '2023-12-15', nextDue: '2024-06-25', refillStatus: 'Partial', action: 'Overdue' },
];

// Consumption Data
export const consumptionData: ConsumptionData[] = [
  { gas: 'Nitrogen', monthlyUsage: '3,420 m³', trend: 12 },
  { gas: 'Oxygen', monthlyUsage: '2,980 m³', trend: 18 },
  { gas: 'CO₂', monthlyUsage: '1,540 m³', trend: -5 },
  { gas: 'Argon', monthlyUsage: '980 m³', trend: 8 },
  { gas: 'Hydrogen', monthlyUsage: '620 m³', trend: 15 },
];

// Refill Queue
export const refillQueue: RefillQueue[] = [
  { cylinderId: 'CYL-102', gas: 'Oxygen', emptySince: '2 hrs', priority: 'Critical' },
  { cylinderId: 'CYL-081', gas: 'CO₂', emptySince: '4 hrs', priority: 'High' },
  { cylinderId: 'CYL-156', gas: 'Nitrogen', emptySince: '6 hrs', priority: 'High' },
  { cylinderId: 'CYL-203', gas: 'Argon', emptySince: '8 hrs', priority: 'Medium' },
  { cylinderId: 'CYL-087', gas: 'Helium', emptySince: '12 hrs', priority: 'Medium' },
];

// Pressure Monitoring Data
export const pressureDistribution = {
  normal: 82,
  warning: 13,
  critical: 5,
};

export const lowestPressureCylinders = [
  { cylinder: 'CY-102', gas: 'Oxygen', pressure: 18, threshold: 25, status: 'Critical' },
  { cylinder: 'CY-245', gas: 'Nitrogen', pressure: 32, threshold: 40, status: 'Warning' },
  { cylinder: 'CY-081', gas: 'CO₂', pressure: 29, threshold: 35, status: 'Warning' },
];

// Consumption Trend Data (for charts)
export const consumptionTrend = [
  { month: 'Jan', nitrogen: 3200, oxygen: 2800, co2: 1400, argon: 900, hydrogen: 580 },
  { month: 'Feb', nitrogen: 3100, oxygen: 2750, co2: 1380, argon: 920, hydrogen: 590 },
  { month: 'Mar', nitrogen: 3350, oxygen: 2900, co2: 1520, argon: 950, hydrogen: 610 },
  { month: 'Apr', nitrogen: 3420, oxygen: 2980, co2: 1540, argon: 980, hydrogen: 620 },
];

// Department Consumption
export const departmentConsumption = [
  { department: 'Research', usage: 42, color: '#3b82f6' },
  { department: 'Chemistry', usage: 28, color: '#8b5cf6' },
  { department: 'QA', usage: 15, color: '#06b6d4' },
  { department: 'Production', usage: 10, color: '#10b981' },
  { department: 'Others', usage: 5, color: '#64748b' },
];

// AI Insights
export const aiInsights = [
  'Oxygen consumption increased by 18% during the last seven days.',
  'Cylinder CY-102 is predicted to reach critical pressure within 6 hours.',
  'Pressure loss in Storage Room B indicates a possible valve malfunction.',
  'Two hydrogen cylinders show abnormal pressure decay compared to historical patterns.',
  'Laboratory 3 has the highest cylinder utilization (94%).',
  'Three cylinders have exceeded their recommended inspection interval.',
  'Leak response time improved by 22% compared to last month.',
  'Recommend transferring four reserve nitrogen cylinders to Chemistry Lab based on projected demand.',
  'Sensor connectivity has remained above 99% over the past 30 days.',
  'Refill scheduling optimization can reduce cylinder downtime by approximately 15%.',
];

// Recent Activity
export const recentActivity = [
  { time: '09:10', event: 'Cylinder CY-118 installed', location: 'Lab 5' },
  { time: '09:24', event: 'Pressure dropped below warning level', cylinder: 'CY-102' },
  { time: '09:28', event: 'Leak sensor activated', location: 'Storage B' },
  { time: '09:30', event: 'Safety team notified', type: 'Alert' },
  { time: '09:36', event: 'Cylinder isolated', cylinder: 'CY-003' },
  { time: '09:52', event: 'Replacement cylinder installed', location: 'Bay D-3' },
  { time: '10:15', event: 'Leak resolved', location: 'Storage B' },
];

// IoT Sensor Health
export const sensorHealth = {
  connected: 468,
  offline: 6,
  batteryLow: 9,
  communicationErrors: 2,
};

export const sensorTypes = {
  pressureSensors: 312,
  leakSensors: 74,
  temperatureSensors: 48,
  rfidReaders: 26,
};
