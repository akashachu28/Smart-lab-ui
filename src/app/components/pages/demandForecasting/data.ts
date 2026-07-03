import { 
  ForecastDataPoint, 
  CategoryData, 
  ReorderItem,
  ChemicalDemand,
  InventoryHealth,
  PurchaseOrder,
  StockoutPrediction,
  SupplierPerformance,
  ConsumptionByDay,
  DepartmentConsumption
} from './types';

export const forecastData: ForecastDataPoint[] = [
  { date: 'Jun 1', actual: 42, forecast: null, safety: 20 },
  { date: 'Jun 5', actual: 38, forecast: null, safety: 20 },
  { date: 'Jun 10', actual: 55, forecast: null, safety: 20 },
  { date: 'Jun 15', actual: 48, forecast: null, safety: 20 },
  { date: 'Jun 20', actual: 60, forecast: 62, safety: 20 },
  { date: 'Jun 25', actual: null, forecast: 58, safety: 20 },
  { date: 'Jun 30', actual: null, forecast: 65, safety: 20 },
  { date: 'Jul 5', actual: null, forecast: 72, safety: 20 },
  { date: 'Jul 10', actual: null, forecast: 68, safety: 20 },
];

export const reorderItems: ReorderItem[] = [
  { id: 'CHM-001', name: 'Acetone', currentStock: 4, forecastNeed: 25, reorderQty: 30, suggestedDate: '2024-06-22', confidence: 'High', sapSynced: true, stockout: false },
  { id: 'CHM-003', name: 'Hydrogen Peroxide', currentStock: 2, forecastNeed: 18, reorderQty: 20, suggestedDate: '2024-06-20', confidence: 'High', sapSynced: true, stockout: true },
  { id: 'AST-011', name: 'pH Buffer 7.0', currentStock: 0, forecastNeed: 5, reorderQty: 10, suggestedDate: '2024-06-18', confidence: 'Medium', sapSynced: false, stockout: true },
  { id: 'CHM-014', name: 'Ethanol 96%', currentStock: 8, forecastNeed: 22, reorderQty: 25, suggestedDate: '2024-06-28', confidence: 'High', sapSynced: true, stockout: false },
];

export const categoryData: CategoryData[] = [
  { name: 'Solvents', value: 38, color: '#06b6d4' },
  { name: 'Acids', value: 22, color: '#8b5cf6' },
  { name: 'Reagents', value: 25, color: '#10b981' },
  { name: 'Consumables', value: 15, color: '#f59e0b' },
];

export const chemicalDemands: ChemicalDemand[] = [
  { chemical: 'Ethanol', currentStock: '120 L', forecast30Days: '210 L', daysRemaining: 17, risk: 'High' },
  { chemical: 'Acetone', currentStock: '180 L', forecast30Days: '165 L', daysRemaining: 32, risk: 'Normal' },
  { chemical: 'Nitric Acid', currentStock: '42 L', forecast30Days: '96 L', daysRemaining: 11, risk: 'Critical' },
  { chemical: 'Methanol', currentStock: '210 L', forecast30Days: '180 L', daysRemaining: 35, risk: 'Normal' },
  { chemical: 'IPA', currentStock: '320 L', forecast30Days: '280 L', daysRemaining: 34, risk: 'Normal' },
];

export const inventoryHealth: InventoryHealth = {
  healthy: 214,
  lowStock: 21,
  critical: 9,
  overstock: 17
};

export const purchaseOrders: PurchaseOrder[] = [
  { po: 'PO1023', supplier: 'Sigma', expectedDelivery: 'Jul 8', status: 'In Transit' },
  { po: 'PO1028', supplier: 'Merck', expectedDelivery: 'Jul 6', status: 'Approved' },
  { po: 'PO1031', supplier: 'Local Vendor', expectedDelivery: 'Jul 12', status: 'Pending' },
];

export const stockoutPredictions: StockoutPrediction[] = [
  { chemical: 'Ethanol', expectedDate: 'Jul 18', probability: 94 },
  { chemical: 'Nitric Acid', expectedDate: 'Jul 12', probability: 98 },
  { chemical: 'Acetone', expectedDate: 'Jul 25', probability: 78 },
];

export const supplierPerformance: SupplierPerformance[] = [
  { supplier: 'Sigma', onTimeDelivery: '98%', avgLeadTime: '5 Days', reliability: 'Excellent' },
  { supplier: 'Merck', onTimeDelivery: '95%', avgLeadTime: '7 Days', reliability: 'Good' },
  { supplier: 'Local Vendor', onTimeDelivery: '84%', avgLeadTime: '10 Days', reliability: 'Average' },
];

export const dailyConsumption: ConsumptionByDay[] = [
  { day: 'Mon', value: 40 },
  { day: 'Tue', value: 70 },
  { day: 'Wed', value: 50 },
  { day: 'Thu', value: 80 },
  { day: 'Fri', value: 90 },
];

export const departmentConsumption: DepartmentConsumption[] = [
  { department: 'Research', value: 100 },
  { department: 'Chemistry', value: 80 },
  { department: 'QA', value: 50 },
  { department: 'Microbiology', value: 60 },
];

export const topConsumedChemicals = [
  { chemical: 'Ethanol', monthlyUsage: '480 L', growth: '+12%' },
  { chemical: 'Acetone', monthlyUsage: '420 L', growth: '+8%' },
  { chemical: 'Methanol', monthlyUsage: '360 L', growth: '+15%' },
  { chemical: 'IPA', monthlyUsage: '320 L', growth: '+6%' },
];

export const aiInsights = [
  'Ethanol demand is projected to increase by 18% over the next four weeks.',
  'Nitric Acid is expected to reach stockout within 11 days if no replenishment occurs.',
  'Current inventory optimization can reduce excess stock value by approximately ₹18 lakhs.',
  'Three purchase orders should be expedited due to supplier lead-time constraints.',
  'Research Laboratory accounts for 41% of total projected chemical demand.',
  'Seasonal trends indicate increased solvent consumption during the upcoming month.',
  'Forecast accuracy has improved from 92.1% to 96.8% after incorporating laboratory scheduling data.',
  'SAP synchronization completed successfully with no inventory discrepancies.',
];

export const recentActivity = [
  { time: '09:12', action: 'AI forecast updated' },
  { time: '09:18', action: 'Stockout alert generated' },
  { time: '09:22', action: 'Reorder recommendation created' },
  { time: '09:31', action: 'Purchase request submitted' },
  { time: '09:48', action: 'SAP synchronized' },
  { time: '10:05', action: 'Purchase order approved' },
  { time: '10:18', action: 'Inventory forecast refreshed' },
];
