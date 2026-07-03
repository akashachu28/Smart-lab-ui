export interface Incident {
  id: string;
  title: string;
  date: string;
  severity: 'error' | 'warning' | 'info';
  status: 'Open' | 'Under Investigation' | 'CAPA Assigned' | 'Closed';
  type?: string;
  department?: string;
  affectedArea?: string;
  duration?: string;
}

export interface RootCause {
  cause: string;
  confidence: number;
  factors: string[];
  explanation?: string;
}

export interface CAPAAction {
  action: string;
  type: 'Corrective' | 'Preventive';
  assignee: string;
  due: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  priority?: 'Critical' | 'High' | 'Medium' | 'Low';
}

export interface TimelineEvent {
  time: string;
  event: string;
  user: string;
  type?: 'incident' | 'action' | 'ai' | 'system';
}

export interface SimilarIncident {
  id: string;
  title: string;
  similarity: number;
  date: string;
  rootCause?: string;
}

export interface EvidenceSource {
  type: string;
  count: number;
  icon?: string;
}

export interface RiskAssessment {
  overall: 'Critical' | 'High' | 'Medium' | 'Low';
  safety: number;
  environmental: number;
  operational: number;
  compliance: number;
}

export interface InvestigatorWorkload {
  investigator: string;
  assigned: number;
  open: number;
  closed: number;
}
