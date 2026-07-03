export interface ReorderItem {
  id: string;
  name: string;
  currentStock: number;
  forecastNeed: number;
  reorderQty: number;
  suggestedDate: string;
  confidence: 'High' | 'Medium' | 'Low';
  sapSynced: boolean;
  stockout: boolean;
}

export interface ForecastDataPoint {
  date: string;
  actual: number | null;
  forecast: number | null;
  safety: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface ChemicalDemand {
  chemical: string;
  currentStock: string;
  forecast30Days: string;
  daysRemaining: number;
  risk: 'Critical' | 'High' | 'Normal' | 'Low';
}

export interface InventoryHealth {
  healthy: number;
  lowStock: number;
  critical: number;
  overstock: number;
}

export interface PurchaseOrder {
  po: string;
  supplier: string;
  expectedDelivery: string;
  status: 'In Transit' | 'Approved' | 'Pending' | 'Delivered';
}

export interface StockoutPrediction {
  chemical: string;
  expectedDate: string;
  probability: number;
}

export interface SupplierPerformance {
  supplier: string;
  onTimeDelivery: string;
  avgLeadTime: string;
  reliability: 'Excellent' | 'Good' | 'Average' | 'Poor';
}

export interface ConsumptionByDay {
  day: string;
  value: number;
}

export interface DepartmentConsumption {
  department: string;
  value: number;
}
