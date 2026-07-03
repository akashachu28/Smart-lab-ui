export interface CompatibilityViolation {
  id: number;
  chemA: string;
  chemB: string;
  reason: string;
  location: string;
  severity: 'error' | 'warning';
  recommended: string;
  timestamp: string;
}

export interface StorageArea {
  area: string;
  capacity: number;
  occupancy: number;
  compliance: 'Compliant' | 'Warning' | 'Critical';
  status: 'Safe' | 'Near Capacity' | 'Over Capacity';
}

export interface CompatibilityCheck {
  chemicalA: string;
  chemicalB: string;
  risk: 'Critical' | 'Warning' | 'Safe';
  recommendation: string;
  hazardType?: string;
}

export interface VisionAlert {
  id: number;
  time: string;
  area: string;
  issue: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  resolved: boolean;
}

export interface CorrectiveAction {
  issue: string;
  assignedTo: string;
  due: string;
  status: 'Open' | 'In Progress' | 'Completed' | 'Overdue';
}

export interface HighRiskChemical {
  chemical: string;
  riskScore: number;
  location: string;
  casNumber: string;
}

export interface EnvironmentalReading {
  parameter: string;
  value: string;
  status: 'Normal' | 'Warning' | 'Critical';
  unit?: string;
}

export interface ComplianceMetric {
  category: string;
  score: number;
  status: 'Compliant' | 'Warning' | 'Critical';
}
