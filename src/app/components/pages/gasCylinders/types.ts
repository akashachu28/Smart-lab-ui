// Shared types and data for Gas Cylinder Management

export interface Cylinder {
  id: string;
  gas: string;
  location: string;
  pressure: number;
  maxPressure: number;
  status: string;
  lastUpdate: string;
  assignedTo?: string;
  department?: string;
  building?: string;
  installDate?: string;
  lastInspection?: string;
  nextInspection?: string;
}

export interface Alert {
  id: number;
  type: string;
  cylinderId: string;
  gas: string;
  time: string;
  severity: 'error' | 'warning' | 'info';
  location?: string;
  status?: string;
}

export interface LeakEvent {
  id: number;
  time: string;
  location: string;
  gas: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'Active' | 'Investigating' | 'Resolved';
}

export interface MaintenanceRecord {
  id: string;
  gas: string;
  lastInspection: string;
  nextDue: string;
  refillStatus: string;
  action: string;
}

export interface ConsumptionData {
  gas: string;
  monthlyUsage: string;
  trend?: number;
}

export interface RefillQueue {
  cylinderId: string;
  gas: string;
  emptySince: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
}

export const statusBadge: Record<string, 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
  'In Service': 'success',
  'Low Pressure': 'warning',
  'Leak Detected': 'error',
  'Inspection Due': 'warning',
  'In Use': 'success',
  'Available': 'info',
  'Reserved': 'info',
  'Empty': 'warning',
  'Under Maintenance': 'neutral',
  'Quarantined': 'error',
  'Retired': 'neutral',
  'Idle': 'neutral',
};
