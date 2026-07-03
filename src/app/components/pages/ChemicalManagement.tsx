import { useState } from 'react';
import { TestTube, AlertTriangle, ShieldCheck, Clock, Search, Barcode, TrendingUp, Package, Activity, Eye, Thermometer, Droplet, Wind } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { Badge } from '../ui/Badge';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';

const tabs = ['Chemical Register', 'Storage Map', 'Compliance', 'MSDS', 'Analytics', 'Tracking'];

const chemicals = [
  { id: 'CHM-001', name: 'Benzene', cas: '71-43-2', location: 'CAB-A-12', qty: '25 L', expiry: '2025-08-12', storageClass: 'Flammable Liquid', compliance: 'compliant', supplier: 'Merck KGaA', batch: 'BZ-2024-0847', barcode: 'BC001847293', rfid: 'RFID-A847', lastScanned: '2026-06-30 14:22', usage7d: '2.4 L', tempRange: '-5 to 25°C', flashPoint: '-11°C', density: '0.876 g/mL' },
  { id: 'CHM-002', name: 'Toluene', cas: '108-88-3', location: 'CAB-A-08', qty: '40 L', expiry: '2026-03-15', storageClass: 'Flammable Liquid', compliance: 'compliant', supplier: 'Sigma-Aldrich', batch: 'TL-2025-1123', barcode: 'BC001934821', rfid: 'RFID-A908', lastScanned: '2026-07-01 09:15', usage7d: '5.8 L', tempRange: '15 to 25°C', flashPoint: '4°C', density: '0.867 g/mL' },
  { id: 'CHM-003', name: 'Xylene (mixed isomers)', cas: '1330-20-7', location: 'CAB-A-09', qty: '30 L', expiry: '2026-11-20', storageClass: 'Flammable Liquid', compliance: 'compliant', supplier: 'Fisher Scientific', batch: 'XY-2025-0456', barcode: 'BC002018374', rfid: 'RFID-A909', lastScanned: '2026-06-29 16:40', usage7d: '3.2 L', tempRange: '15 to 30°C', flashPoint: '27°C', density: '0.864 g/mL' },
  { id: 'CHM-004', name: 'Cyclohexane', cas: '110-82-7', location: 'CAB-A-15', qty: '20 L', expiry: '2025-09-30', storageClass: 'Flammable Liquid', compliance: 'compliant', supplier: 'Merck KGaA', batch: 'CH-2024-2341', barcode: 'BC001672948', rfid: 'RFID-A1015', lastScanned: '2026-07-01 11:05', usage7d: '1.9 L', tempRange: '15 to 25°C', flashPoint: '-18°C', density: '0.779 g/mL' },
  { id: 'CHM-005', name: 'Acetone', cas: '67-64-1', location: 'CAB-A-03', qty: '35 L', expiry: '2026-01-10', storageClass: 'Flammable Liquid', compliance: 'compliant', supplier: 'Sigma-Aldrich', batch: 'AC-2025-0789', barcode: 'BC001847392', rfid: 'RFID-A303', lastScanned: '2026-06-30 13:18', usage7d: '6.1 L', tempRange: '15 to 25°C', flashPoint: '-20°C', density: '0.791 g/mL' },
  { id: 'CHM-006', name: 'Methanol', cas: '67-56-1', location: 'CAB-A-04', qty: '28 L', expiry: '2025-12-05', storageClass: 'Flammable Liquid', compliance: 'compliant', supplier: 'Fisher Scientific', batch: 'ME-2024-1892', barcode: 'BC001923847', rfid: 'RFID-A404', lastScanned: '2026-06-30 15:42', usage7d: '4.3 L', tempRange: '15 to 25°C', flashPoint: '11°C', density: '0.792 g/mL' },
  { id: 'CHM-007', name: 'Ethanol 99.5%', cas: '64-17-5', location: 'CAB-A-01', qty: '50 L', expiry: '2026-04-18', storageClass: 'Flammable Liquid', compliance: 'compliant', supplier: 'Merck KGaA', batch: 'ET-2025-3401', barcode: 'BC002034871', rfid: 'RFID-A101', lastScanned: '2026-07-01 08:20', usage7d: '7.8 L', tempRange: '15 to 30°C', flashPoint: '13°C', density: '0.789 g/mL' },
  { id: 'CHM-008', name: 'Sulfuric Acid 98%', cas: '7664-93-9', location: 'CAB-C-02', qty: '20 L', expiry: '2027-02-28', storageClass: 'Corrosive Acid', compliance: 'compliant', supplier: 'Sigma-Aldrich', batch: 'SA-2026-0124', barcode: 'BC002147823', rfid: 'RFID-C202', lastScanned: '2026-06-29 10:35', usage7d: '1.2 L', tempRange: '15 to 25°C', flashPoint: 'N/A', density: '1.84 g/mL' },
  { id: 'CHM-009', name: 'Hydrochloric Acid 37%', cas: '7647-01-0', location: 'CAB-C-01', qty: '25 L', expiry: '2026-08-12', storageClass: 'Corrosive Acid', compliance: 'compliant', supplier: 'Fisher Scientific', batch: 'HCL-2025-2109', barcode: 'BC001982374', rfid: 'RFID-C101', lastScanned: '2026-06-30 12:50', usage7d: '2.1 L', tempRange: '15 to 25°C', flashPoint: 'N/A', density: '1.18 g/mL' },
  { id: 'CHM-010', name: 'Nitric Acid 70%', cas: '7697-37-2', location: 'CAB-C-05', qty: '15 L', expiry: '2026-06-20', storageClass: 'Corrosive Acid', compliance: 'compliant', supplier: 'Merck KGaA', batch: 'NA-2025-1567', barcode: 'BC001847291', rfid: 'RFID-C505', lastScanned: '2026-06-30 09:28', usage7d: '0.8 L', tempRange: '15 to 25°C', flashPoint: 'N/A', density: '1.42 g/mL' },
  { id: 'CHM-011', name: 'Sodium Hydroxide Pellets', cas: '1310-73-2', location: 'CAB-B-08', qty: '10 kg', expiry: '2028-01-15', storageClass: 'Corrosive Base', compliance: 'compliant', supplier: 'Sigma-Aldrich', batch: 'NaOH-2026-0892', barcode: 'BC002193847', rfid: 'RFID-B808', lastScanned: '2026-07-01 07:45', usage7d: '1.5 kg', tempRange: '15 to 30°C', flashPoint: 'N/A', density: '2.13 g/cm³' },
  { id: 'CHM-012', name: 'Potassium Hydroxide', cas: '1310-58-3', location: 'CAB-B-09', qty: '8 kg', expiry: '2027-11-08', storageClass: 'Corrosive Base', compliance: 'compliant', supplier: 'Fisher Scientific', batch: 'KOH-2025-3421', barcode: 'BC002018473', rfid: 'RFID-B909', lastScanned: '2026-06-29 14:12', usage7d: '0.9 kg', tempRange: '15 to 25°C', flashPoint: 'N/A', density: '2.04 g/cm³' },
  { id: 'CHM-013', name: 'Hydrogen Peroxide 30%', cas: '7722-84-1', location: 'CAB-A-03', qty: '12 L', expiry: '2025-07-15', storageClass: 'Oxidiser', compliance: 'violation', supplier: 'Merck KGaA', batch: 'HP-2024-1893', barcode: 'BC001729384', rfid: 'RFID-A303', lastScanned: '2026-06-28 11:20', usage7d: '1.1 L', tempRange: '2 to 8°C', flashPoint: 'N/A', density: '1.11 g/mL' },
  { id: 'CHM-014', name: 'Potassium Permanganate', cas: '7722-64-7', location: 'CAB-O-01', qty: '5 kg', expiry: '2027-03-22', storageClass: 'Oxidiser', compliance: 'compliant', supplier: 'Sigma-Aldrich', batch: 'KMnO4-2025-0847', barcode: 'BC001938471', rfid: 'RFID-O101', lastScanned: '2026-06-30 16:30', usage7d: '0.3 kg', tempRange: '15 to 30°C', flashPoint: 'N/A', density: '2.70 g/cm³' },
  { id: 'CHM-015', name: 'Dichloromethane', cas: '75-09-2', location: 'CAB-A-11', qty: '22 L', expiry: '2026-09-14', storageClass: 'Flammable Liquid', compliance: 'compliant', supplier: 'Fisher Scientific', batch: 'DCM-2025-2947', barcode: 'BC002047192', rfid: 'RFID-A1011', lastScanned: '2026-07-01 10:18', usage7d: '3.7 L', tempRange: '15 to 25°C', flashPoint: 'None', density: '1.33 g/mL' },
  { id: 'CHM-016', name: 'Chloroform', cas: '67-66-3', location: 'CAB-A-13', qty: '18 L', expiry: '2025-10-28', storageClass: 'Flammable Liquid', compliance: 'warning', supplier: 'Merck KGaA', batch: 'CF-2024-3892', barcode: 'BC001829374', rfid: 'RFID-A1013', lastScanned: '2026-06-29 13:45', usage7d: '2.2 L', tempRange: '15 to 25°C', flashPoint: 'None', density: '1.49 g/mL' },
  { id: 'CHM-017', name: 'Hexane (n-Hexane)', cas: '110-54-3', location: 'CAB-A-06', qty: '32 L', expiry: '2026-05-07', storageClass: 'Flammable Liquid', compliance: 'compliant', supplier: 'Sigma-Aldrich', batch: 'HX-2025-1834', barcode: 'BC001947382', rfid: 'RFID-A606', lastScanned: '2026-06-30 14:55', usage7d: '4.6 L', tempRange: '15 to 25°C', flashPoint: '-22°C', density: '0.659 g/mL' },
  { id: 'CHM-018', name: 'Diethyl Ether', cas: '60-29-7', location: 'CAB-A-14', qty: '10 L', expiry: '2025-08-19', storageClass: 'Flammable Liquid', compliance: 'compliant', supplier: 'Fisher Scientific', batch: 'DE-2024-2901', barcode: 'BC001738291', rfid: 'RFID-A1014', lastScanned: '2026-06-30 11:32', usage7d: '1.3 L', tempRange: '2 to 8°C', flashPoint: '-45°C', density: '0.714 g/mL' },
  { id: 'CHM-019', name: 'Acetic Acid Glacial', cas: '64-19-7', location: 'CAB-C-07', qty: '16 L', expiry: '2026-12-03', storageClass: 'Corrosive Acid', compliance: 'compliant', supplier: 'Merck KGaA', batch: 'AA-2026-0182', barcode: 'BC002183749', rfid: 'RFID-C707', lastScanned: '2026-07-01 08:40', usage7d: '1.7 L', tempRange: '15 to 30°C', flashPoint: '39°C', density: '1.05 g/mL' },
  { id: 'CHM-020', name: 'Phenol', cas: '108-95-2', location: 'CAB-T-03', qty: '5 kg', expiry: '2026-07-25', storageClass: 'Toxic Solid', compliance: 'compliant', supplier: 'Sigma-Aldrich', batch: 'PH-2025-2847', barcode: 'BC002019384', rfid: 'RFID-T303', lastScanned: '2026-06-29 15:20', usage7d: '0.4 kg', tempRange: '15 to 25°C', flashPoint: '79°C', density: '1.07 g/cm³' },
];

const usageAnalytics = [
  { week: 'W23', benzene: 12.4, toluene: 28.3, xylene: 15.7, acetone: 31.2, methanol: 22.1 },
  { week: 'W24', benzene: 14.2, toluene: 32.1, xylene: 18.4, acetone: 35.8, methanol: 26.4 },
  { week: 'W25', benzene: 11.8, toluene: 26.7, xylene: 14.2, acetone: 29.6, methanol: 20.3 },
  { week: 'W26', benzene: 16.5, toluene: 38.9, xylene: 22.1, acetone: 42.7, methanol: 30.1 },
];

const inventoryByClass = [
  { name: 'Flammable Liquids', value: 45, color: '#ef4444' },
  { name: 'Corrosive Acids', value: 25, color: '#f97316' },
  { name: 'Corrosive Bases', value: 12, color: '#f59e0b' },
  { name: 'Oxidisers', value: 8, color: '#8b5cf6' },
  { name: 'Toxic Materials', value: 10, color: '#06b6d4' },
];

const expiryTimeline = [
  { period: '< 7 days', count: 2, severity: 'critical' },
  { period: '7-30 days', count: 7, severity: 'high' },
  { period: '1-3 months', count: 14, severity: 'medium' },
  { period: '3-6 months', count: 23, severity: 'low' },
  { period: '> 6 months', count: 82, severity: 'safe' },
];

const stockLevels = [
  { chemical: 'Ethanol', current: 50, min: 30, max: 80, unit: 'L', status: 'optimal' },
  { chemical: 'Toluene', current: 40, min: 25, max: 60, unit: 'L', status: 'optimal' },
  { chemical: 'Acetone', current: 35, min: 30, max: 70, unit: 'L', status: 'optimal' },
  { chemical: 'Benzene', current: 25, min: 20, max: 50, unit: 'L', status: 'optimal' },
  { chemical: 'Sulfuric Acid', current: 20, min: 15, max: 40, unit: 'L', status: 'optimal' },
  { chemical: 'Hexane', current: 32, min: 20, max: 50, unit: 'L', status: 'optimal' },
  { chemical: 'Methanol', current: 28, min: 25, max: 50, unit: 'L', status: 'optimal' },
  { chemical: 'Diethyl Ether', current: 10, min: 15, max: 30, unit: 'L', status: 'reorder' },
  { chemical: 'Chloroform', current: 18, min: 15, max: 35, unit: 'L', status: 'warning' },
  { chemical: 'Potassium Hydroxide', current: 8, min: 10, max: 20, unit: 'kg', status: 'reorder' },
];

const trackingActivity = [
  { time: '2026-07-01 11:05', chemical: 'Cyclohexane', action: 'Scanned Out', user: 'Dr. Ahmed Khalil', method: 'RFID', qty: '500 mL', location: 'CAB-A-15' },
  { time: '2026-07-01 10:18', chemical: 'Dichloromethane', action: 'Scanned Out', user: 'Sarah Martinez', method: 'Barcode', qty: '250 mL', location: 'CAB-A-11' },
  { time: '2026-07-01 09:15', chemical: 'Toluene', action: 'Scanned In', user: 'Li Wei', method: 'RFID', qty: '1 L', location: 'CAB-A-08' },
  { time: '2026-07-01 08:40', chemical: 'Acetic Acid Glacial', action: 'Scanned Out', user: 'Dr. Priya Sharma', method: 'CV Recognition', qty: '100 mL', location: 'CAB-C-07' },
  { time: '2026-07-01 08:20', chemical: 'Ethanol 99.5%', action: 'Scanned Out', user: 'John Smith', method: 'RFID', qty: '2 L', location: 'CAB-A-01' },
  { time: '2026-07-01 07:45', chemical: 'Sodium Hydroxide Pellets', action: 'Inventory Check', user: 'System Auto', method: 'RFID', qty: '—', location: 'CAB-B-08' },
  { time: '2026-06-30 16:30', chemical: 'Potassium Permanganate', action: 'Scanned In', user: 'Michael Chen', method: 'Barcode', qty: '500 g', location: 'CAB-O-01' },
  { time: '2026-06-30 15:42', chemical: 'Methanol', action: 'Scanned Out', user: 'Emma Johnson', method: 'RFID', qty: '750 mL', location: 'CAB-A-04' },
  { time: '2026-06-30 14:55', chemical: 'Hexane (n-Hexane)', action: 'Scanned Out', user: 'Dr. Ahmed Khalil', method: 'CV Recognition', qty: '1.5 L', location: 'CAB-A-06' },
  { time: '2026-06-30 14:22', chemical: 'Benzene', action: 'Scanned In', user: 'Li Wei', method: 'RFID', qty: '500 mL', location: 'CAB-A-12' },
];

const msdsItems = [
  { name: 'Benzene', cas: '71-43-2', ghs: ['Flammable', 'Carcinogen', 'Toxic', 'Mutagenic'], hazardLevel: 'Severe', ppe: 'Respirator, Nitrile Gloves, Lab Coat, Goggles', flashPoint: '-11°C', autoIgnition: '498°C', explosive: '1.2-8.0% vol', ventilation: 'Fume Hood Required' },
  { name: 'Toluene', cas: '108-88-3', ghs: ['Flammable', 'Toxic', 'Irritant', 'Aspiration Hazard'], hazardLevel: 'High', ppe: 'Safety Goggles, Nitrile Gloves, Lab Coat', flashPoint: '4°C', autoIgnition: '480°C', explosive: '1.1-7.1% vol', ventilation: 'Adequate Local Exhaust' },
  { name: 'Sulfuric Acid 98%', cas: '7664-93-9', ghs: ['Corrosive', 'Skin Burns', 'Eye Damage'], hazardLevel: 'Severe', ppe: 'Face Shield, Acid-Resistant Gloves, Apron, Goggles', flashPoint: 'N/A', autoIgnition: 'N/A', explosive: 'Non-explosive', ventilation: 'Fume Hood Required' },
  { name: 'Hydrogen Peroxide 30%', cas: '7722-84-1', ghs: ['Oxidiser', 'Corrosive', 'Harmful'], hazardLevel: 'High', ppe: 'Safety Goggles, Nitrile Gloves, Lab Coat', flashPoint: 'N/A', autoIgnition: 'N/A', explosive: 'Fire intensifying', ventilation: 'Adequate Ventilation' },
  { name: 'Acetone', cas: '67-64-1', ghs: ['Flammable', 'Eye Irritant'], hazardLevel: 'Moderate', ppe: 'Safety Goggles, Nitrile Gloves', flashPoint: '-20°C', autoIgnition: '465°C', explosive: '2.5-12.8% vol', ventilation: 'Good General Ventilation' },
  { name: 'Methanol', cas: '67-56-1', ghs: ['Flammable', 'Toxic', 'Health Hazard'], hazardLevel: 'High', ppe: 'Respirator, Nitrile Gloves, Goggles, Lab Coat', flashPoint: '11°C', autoIgnition: '385°C', explosive: '6.0-36.0% vol', ventilation: 'Fume Hood Required' },
  { name: 'Hydrochloric Acid 37%', cas: '7647-01-0', ghs: ['Corrosive', 'Irritant', 'Acute Toxicity'], hazardLevel: 'Severe', ppe: 'Face Shield, Acid Gloves, Apron, Goggles', flashPoint: 'N/A', autoIgnition: 'N/A', explosive: 'Non-explosive', ventilation: 'Fume Hood Required' },
  { name: 'Nitric Acid 70%', cas: '7697-37-2', ghs: ['Oxidiser', 'Corrosive', 'Skin Burns'], hazardLevel: 'Severe', ppe: 'Face Shield, Acid Gloves, Apron, Goggles', flashPoint: 'N/A', autoIgnition: 'N/A', explosive: 'Fire intensifying', ventilation: 'Fume Hood Required' },
  { name: 'Phenol', cas: '108-95-2', ghs: ['Toxic', 'Corrosive', 'Mutagenic', 'Fatal if absorbed'], hazardLevel: 'Severe', ppe: 'Respirator, Neoprene Gloves, Full Protection, Goggles', flashPoint: '79°C', autoIgnition: '715°C', explosive: '1.8-8.6% vol', ventilation: 'Fume Hood Required' },
  { name: 'Diethyl Ether', cas: '60-29-7', ghs: ['Extremely Flammable', 'Peroxide Former', 'Irritant'], hazardLevel: 'Severe', ppe: 'Safety Goggles, Nitrile Gloves, Grounding Required', flashPoint: '-45°C', autoIgnition: '160°C', explosive: '1.9-36.0% vol', ventilation: 'Fume Hood + Explosion-Proof' },
];

const violations = [
  { id: 1, chemA: 'Hydrogen Peroxide 30%', chemB: 'Acetone', reason: 'Oxidiser + Flammable — Risk of spontaneous combustion', location: 'CAB-A-03', severity: 'error' as const, distance: '0.3 m', detected: '2026-07-01 09:15', detection: 'CV + RFID' },
  { id: 2, chemA: 'Sodium Hydroxide', chemB: 'Hydrochloric Acid 37%', reason: 'Corrosive Base + Acid — Exothermic reaction hazard', location: 'Cabinet C/B corridor', severity: 'warning' as const, distance: '1.8 m', detected: '2026-06-30 14:22', detection: 'RFID proximity' },
  { id: 3, chemA: 'Diethyl Ether', chemB: 'Nitric Acid 70%', reason: 'Flammable Ether + Oxidising Acid — Extreme fire risk', location: 'CAB-A-14 / CAB-C-05', severity: 'error' as const, distance: '2.1 m', detected: '2026-06-29 16:40', detection: 'Barcode scan' },
];


// Storage map - 8x8 grid for comprehensive petrochemical lab
const storageMap = [
  ['safe', 'safe', 'safe', 'safe', 'empty', 'safe', 'safe', 'safe'],
  ['safe', 'safe', 'safe', 'safe', 'safe', 'safe', 'safe', 'safe'],
  ['safe', 'warning', 'safe', 'violation', 'safe', 'safe', 'safe', 'safe'],
  ['safe', 'safe', 'safe', 'safe', 'safe', 'safe', 'empty', 'safe'],
  ['safe', 'safe', 'safe', 'safe', 'safe', 'warning', 'safe', 'safe'],
  ['empty', 'safe', 'safe', 'safe', 'safe', 'safe', 'safe', 'empty'],
  ['safe', 'safe', 'safe', 'safe', 'safe', 'safe', 'safe', 'safe'],
  ['safe', 'warning', 'safe', 'safe', 'empty', 'safe', 'safe', 'safe'],
];

const storageCabinets = [
  { id: 'CAB-A', name: 'Flammable Liquids Storage', capacity: 15, occupied: 12, temp: '19°C', humidity: '45%', status: 'optimal', ventilation: 'Active' },
  { id: 'CAB-B', name: 'Corrosive Bases Storage', capacity: 10, occupied: 8, temp: '21°C', humidity: '38%', status: 'optimal', ventilation: 'Active' },
  { id: 'CAB-C', name: 'Corrosive Acids Storage', capacity: 8, occupied: 7, temp: '20°C', humidity: '42%', status: 'optimal', ventilation: 'Active' },
  { id: 'CAB-O', name: 'Oxidisers Storage', capacity: 6, occupied: 2, temp: '18°C', humidity: '40%', status: 'optimal', ventilation: 'Active' },
  { id: 'CAB-T', name: 'Toxic Materials Storage', capacity: 8, occupied: 5, temp: '17°C', humidity: '35%', status: 'optimal', ventilation: 'Active' },
  { id: 'CAB-R', name: 'Refrigerated Storage', capacity: 12, occupied: 9, temp: '4°C', humidity: '50%', status: 'optimal', ventilation: 'Active' },
];

const mapColors: Record<string, string> = {
  safe: 'bg-green-200 border-green-300',
  violation: 'bg-red-300 border-red-400 animate-pulse',
  warning: 'bg-amber-200 border-amber-300',
  empty: 'bg-slate-100 border-slate-200',
};

export function ChemicalManagement() {
  const [activeTab, setActiveTab] = useState('Chemical Register');
  const [search, setSearch] = useState('');

  const complianceBadge: Record<string, 'success' | 'error' | 'warning'> = {
    compliant: 'success',
    violation: 'error',
    warning: 'warning',
  };

  return (
    <div className="p-5 min-h-full flex flex-col gap-4">
      <div className="mb-1">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Chemical Management</h2>
        <p className="text-xs text-slate-500">Lifecycle management, storage compliance, compatibility validation & MSDS access</p>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-6 gap-3">
        <MetricCard title="Total Chemicals" value="128" subtitle="20 chemical classes" icon={TestTube} status="info" />
        <MetricCard title="Compliance Rate" value="94.5%" subtitle="3 violations active" icon={ShieldCheck} status="warning" trend="up" trendValue="+1.2% vs last week" />
        <MetricCard title="Expiring Soon" value="9" subtitle="Within 30 days" icon={Clock} status="warning" />
        <MetricCard title="Compatibility Issues" value="3" subtitle="Immediate action" icon={AlertTriangle} status="error" />
        <MetricCard title="Tracked Movements" value="847" subtitle="This week" icon={Activity} status="info" trend="up" trendValue="+12% vs last week" />
        <MetricCard title="RFID Coverage" value="98.4%" subtitle="126/128 tagged" icon={Barcode} status="success" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200/40">
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
            activeTab === t ? 'border-cyan-500 text-cyan-700' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}>
            {t}
            {t === 'Compliance' && violations.length > 0 && (
              <span className="ml-1.5 w-4 h-4 inline-flex items-center justify-center bg-red-500 text-white text-[9px] rounded-full">{violations.length}</span>
            )}
            {t === 'Tracking' && (
              <span className="ml-1.5 px-1.5 py-0.5 inline-flex items-center justify-center bg-green-500 text-white text-[9px] rounded-full">Live</span>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'Chemical Register' && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-2 flex-1 bg-white border border-slate-200/60 rounded-lg px-3 py-1.5">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, CAS number, location, or batch..." className="flex-1 text-xs outline-none bg-transparent text-slate-700 placeholder:text-slate-400" />
            </div>
            <button className="px-3 py-1.5 text-xs bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600">Add Chemical</button>
            <button className="px-3 py-1.5 text-xs border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50">Export CSV</button>
          </div>
          <div className="bg-white/70 rounded-xl border border-slate-200/40 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    {['ID', 'Chemical Name', 'CAS No.', 'Location', 'Qty', 'Batch', 'Expiry', 'Storage Class', 'Last Scan', 'Tracking', 'Status'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-slate-500 font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {chemicals.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.cas.includes(search) || c.location.toLowerCase().includes(search.toLowerCase())).slice(0, 15).map(c => (
                    <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-2.5 text-slate-400 font-mono text-[10px]">{c.id}</td>
                      <td className="px-4 py-2.5 font-medium text-slate-800">{c.name}</td>
                      <td className="px-4 py-2.5 text-slate-500 font-mono text-[10px]">{c.cas}</td>
                      <td className="px-4 py-2.5 text-cyan-600 font-medium">{c.location}</td>
                      <td className="px-4 py-2.5 text-slate-700 font-semibold">{c.qty}</td>
                      <td className="px-4 py-2.5 text-slate-500 font-mono text-[10px]">{c.batch}</td>
                      <td className={`px-4 py-2.5 ${c.expiry < '2025-08-01' ? 'text-orange-600 font-semibold' : 'text-slate-600'}`}>{c.expiry}</td>
                      <td className="px-4 py-2.5 text-slate-600 text-[10px]">{c.storageClass}</td>
                      <td className="px-4 py-2.5 text-slate-400 text-[10px]">{c.lastScanned}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1">
                          {c.rfid && <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[9px] rounded font-medium">RFID</span>}
                          {c.barcode && <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 text-[9px] rounded font-medium">BC</span>}
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <Badge variant={complianceBadge[c.compliance]} size="sm">
                          {c.compliance === 'compliant' ? 'OK' : c.compliance === 'violation' ? 'Violation' : 'Warning'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">Showing {chemicals.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.cas.includes(search)).slice(0, 15).length} of {chemicals.length} chemicals</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map(p => (
                  <button key={p} className={`w-6 h-6 rounded text-[10px] font-medium ${p === 1 ? 'bg-cyan-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{p}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Storage Map' && (
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="bg-white/70 border border-slate-200/40 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Petrochemical Lab Storage Grid</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">8×8 cabinet layout — real-time monitoring</p>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-[10px] text-green-600 font-medium">CV Active</span>
                </div>
              </div>
              <div className="grid gap-2 mb-4" style={{ gridTemplateColumns: 'repeat(8, 52px)' }}>
                {storageMap.flat().map((cell, i) => (
                  <div key={i} className={`w-12 h-10 rounded border-2 ${mapColors[cell]} flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative group`}>
                    <span className="text-[9px] font-medium text-slate-600">{String.fromCharCode(65 + Math.floor(i / 8))}{(i % 8) + 1}</span>
                    {cell === 'violation' && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                {[['bg-green-200', 'Safe Storage'], ['bg-amber-200', 'Proximity Warning'], ['bg-red-300', 'Violation'], ['bg-slate-100', 'Empty']].map(([c, l]) => (
                  <div key={l} className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded ${c} border border-slate-200`}></div>
                    <span className="text-[10px] text-slate-500">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white/70 border border-slate-200/40 rounded-xl p-4 shadow-sm">
              <p className="text-xs font-semibold text-slate-800 mb-3">Storage Cabinets Status</p>
              <div className="space-y-3">
                {storageCabinets.map(cab => (
                  <div key={cab.id} className="border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-semibold text-slate-700">{cab.id}</span>
                      <Badge variant="success" size="sm">{cab.status}</Badge>
                    </div>
                    <p className="text-[10px] text-slate-500 mb-2">{cab.name}</p>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${cab.occupied / cab.capacity > 0.8 ? 'bg-amber-400' : 'bg-green-400'}`}
                          style={{ width: `${(cab.occupied / cab.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-[9px] text-slate-500 font-medium">{cab.occupied}/{cab.capacity}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      <div className="flex items-center gap-1">
                        <Thermometer className="w-2.5 h-2.5 text-blue-500" />
                        <span className="text-[9px] text-slate-600">{cab.temp}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Droplet className="w-2.5 h-2.5 text-cyan-500" />
                        <span className="text-[9px] text-slate-600">{cab.humidity}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wind className="w-2.5 h-2.5 text-green-500" />
                        <span className="text-[9px] text-green-600">{cab.ventilation}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Compliance' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500 font-medium">
              <span className="text-red-600 font-bold">{violations.length}</span> active violation(s) detected — immediate corrective action required
            </p>
            <button className="px-3 py-1.5 text-xs border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50">Generate Report</button>
          </div>
          {violations.map(v => (
            <div key={v.id} className={`bg-white/70 border rounded-xl p-4 shadow-sm ${v.severity === 'error' ? 'border-red-200 bg-red-50/30' : 'border-amber-200 bg-amber-50/30'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-4 h-4 ${v.severity === 'error' ? 'text-red-500' : 'text-amber-500'}`} />
                  <div>
                    <p className="text-xs font-semibold text-slate-800">Incompatible Chemical Storage Detected</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Detected: {v.detected} · Method: {v.detection} · Distance: {v.distance}
                    </p>
                  </div>
                  <Badge variant={v.severity} size="sm">{v.severity === 'error' ? 'Critical' : 'Warning'}</Badge>
                </div>
                <button className="text-xs text-cyan-600 font-medium hover:underline">Acknowledge</button>
              </div>
              <div className="flex gap-4 mb-3">
                <div className="flex-1 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <p className="text-[10px] text-red-500 font-medium mb-1">Chemical A</p>
                  <p className="text-xs text-red-700 font-semibold">{v.chemA}</p>
                </div>
                <div className="flex items-center justify-center px-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
                <div className="flex-1 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <p className="text-[10px] text-red-500 font-medium mb-1">Chemical B</p>
                  <p className="text-xs text-red-700 font-semibold">{v.chemB}</p>
                </div>
              </div>
              <div className="bg-white/80 border border-slate-200 rounded-lg px-3 py-2 mb-3">
                <p className="text-[10px] text-slate-500 mb-1">Incompatibility Reason:</p>
                <p className="text-xs text-slate-800 font-medium">{v.reason}</p>
                <p className="text-[10px] text-slate-500 mt-1">
                  <span className="font-medium">Location:</span> {v.location} · 
                  <span className="font-medium ml-1">Proximity:</span> {v.distance}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-lg font-medium hover:shadow-md transition-shadow">Reassign Storage Location</button>
                <button className="px-3 py-1.5 border border-slate-200 text-slate-600 text-xs rounded-lg hover:bg-slate-50">Notify Lab Manager</button>
                <button className="px-3 py-1.5 border border-slate-200 text-slate-600 text-xs rounded-lg hover:bg-slate-50">Log Corrective Action</button>
                <button className="px-3 py-1.5 border border-slate-200 text-slate-600 text-xs rounded-lg hover:bg-slate-50">View MSDS</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'MSDS' && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-2 flex-1 bg-white border border-slate-200/60 rounded-lg px-3 py-1.5 max-w-md">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input placeholder="Search MSDS library by chemical name or CAS number..." className="flex-1 text-xs outline-none bg-transparent text-slate-700 placeholder:text-slate-400" />
            </div>
            <button className="px-3 py-1.5 text-xs bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5" />
              Bulk Download
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {msdsItems.map(m => (
              <div key={m.name} className="bg-white/70 border border-slate-200/40 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800 mb-1">{m.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono">CAS: {m.cas}</p>
                  </div>
                  <button className="text-[10px] text-cyan-600 font-medium hover:underline flex items-center gap-1">
                    Query AI Assistant →
                  </button>
                </div>
                <div className="flex gap-1.5 flex-wrap mb-3">
                  {m.ghs.map(g => (
                    <span key={g} className={`px-2 py-0.5 text-[10px] rounded-full font-medium ${
                      g.includes('Flammable') ? 'bg-red-100 text-red-700' :
                      g.includes('Corrosive') ? 'bg-orange-100 text-orange-700' :
                      g.includes('Toxic') || g.includes('Carcinogen') ? 'bg-purple-100 text-purple-700' :
                      g.includes('Oxidiser') ? 'bg-yellow-100 text-yellow-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>{g}</span>
                  ))}
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5 mb-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">Hazard Level:</span>
                    <Badge variant={m.hazardLevel === 'Severe' ? 'error' : m.hazardLevel === 'High' ? 'warning' : 'info'} size="sm">{m.hazardLevel}</Badge>
                  </div>
                  <div className="text-[10px]">
                    <span className="text-slate-500">PPE Required:</span>
                    <p className="text-slate-700 font-medium mt-0.5">{m.ppe}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                    <div>
                      <span className="text-slate-500">Flash Point:</span>
                      <p className="text-slate-700 font-medium">{m.flashPoint}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Auto-Ignition:</span>
                      <p className="text-slate-700 font-medium">{m.autoIgnition}</p>
                    </div>
                  </div>
                  <div className="text-[10px] pt-1">
                    <span className="text-slate-500">Ventilation:</span>
                    <p className="text-slate-700 font-medium">{m.ventilation}</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {['Hazards', 'Handling', 'Storage', 'Emergency'].map(link => (
                    <button key={link} className="py-1.5 bg-slate-50 border border-slate-200/60 rounded text-[10px] text-slate-600 hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-200 transition-colors font-medium">{link}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Analytics' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {/* Usage Trend */}
            <div className="col-span-2 bg-white/70 border border-slate-200/40 rounded-xl p-4 shadow-sm">
              <div className="mb-3">
                <p className="text-sm font-semibold text-slate-800">Chemical Consumption Trend</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Weekly usage (Liters) — Top 5 chemicals</p>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={usageAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ fontSize: 11 }} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                  <Line type="monotone" dataKey="acetone" name="Acetone" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="toluene" name="Toluene" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="methanol" name="Methanol" stroke="#8b5cf6" strokeWidth={2} />
                  <Line type="monotone" dataKey="xylene" name="Xylene" stroke="#06b6d4" strokeWidth={2} />
                  <Line type="monotone" dataKey="benzene" name="Benzene" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Inventory Distribution */}
            <div className="bg-white/70 border border-slate-200/40 rounded-xl p-4 shadow-sm">
              <div className="mb-3">
                <p className="text-sm font-semibold text-slate-800">Inventory by Class</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Chemical classification breakdown</p>
              </div>
              <div className="flex items-center gap-3">
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie data={inventoryByClass} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value">
                      {inventoryByClass.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-1.5">
                  {inventoryByClass.map(d => (
                    <div key={d.name} className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }}></div>
                      <span className="text-[10px] text-slate-600 flex-1 truncate">{d.name}</span>
                      <span className="text-[10px] font-semibold text-slate-700">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Expiry Timeline */}
          <div className="bg-white/70 border border-slate-200/40 rounded-xl p-4 shadow-sm">
            <div className="mb-3">
              <p className="text-sm font-semibold text-slate-800">Expiry Timeline Distribution</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Chemical expiry dates grouped by time periods</p>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {expiryTimeline.map(et => (
                <div key={et.period} className={`border-2 rounded-xl p-3 text-center ${
                  et.severity === 'critical' ? 'border-red-300 bg-red-50' :
                  et.severity === 'high' ? 'border-orange-300 bg-orange-50' :
                  et.severity === 'medium' ? 'border-amber-300 bg-amber-50' :
                  et.severity === 'low' ? 'border-blue-300 bg-blue-50' :
                  'border-green-300 bg-green-50'
                }`}>
                  <p className="text-2xl font-bold text-slate-800 mb-1">{et.count}</p>
                  <p className="text-[10px] text-slate-600 font-medium">{et.period}</p>
                  <Badge 
                    variant={et.severity === 'critical' || et.severity === 'high' ? 'error' : et.severity === 'medium' ? 'warning' : 'success'} 
                    size="sm" 
                    className="mt-2"
                  >
                    {et.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Levels */}
          <div className="bg-white/70 border border-slate-200/40 rounded-xl p-4 shadow-sm">
            <div className="mb-3">
              <p className="text-sm font-semibold text-slate-800">Stock Level Monitoring</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Current inventory vs min/max thresholds</p>
            </div>
            <div className="space-y-3">
              {stockLevels.map(sl => (
                <div key={sl.chemical}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-slate-700">{sl.chemical}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-600">{sl.current} {sl.unit}</span>
                      {sl.status === 'reorder' && <Badge variant="error" size="sm">Reorder</Badge>}
                      {sl.status === 'warning' && <Badge variant="warning" size="sm">Low</Badge>}
                      {sl.status === 'optimal' && <Badge variant="success" size="sm">OK</Badge>}
                    </div>
                  </div>
                  <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="absolute h-full bg-slate-200 rounded-full" style={{ width: `${(sl.max / sl.max) * 100}%` }}></div>
                    <div 
                      className={`absolute h-full rounded-full ${
                        sl.current < sl.min ? 'bg-red-400' : 
                        sl.current < sl.min * 1.2 ? 'bg-amber-400' : 
                        'bg-green-400'
                      }`}
                      style={{ width: `${(sl.current / sl.max) * 100}%` }}
                    ></div>
                    <div className="absolute h-full border-l-2 border-dashed border-amber-600" style={{ left: `${(sl.min / sl.max) * 100}%` }}></div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[9px] text-slate-400">Min: {sl.min}</span>
                    <span className="text-[9px] text-slate-400">Max: {sl.max}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Tracking' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200/60 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800">Real-Time Chemical Tracking Active</p>
              <p className="text-[10px] text-slate-600 mt-0.5">Live tracking via RFID, Barcode, and Computer Vision · Last sync: 2s ago</p>
            </div>
            <Badge variant="success" size="sm">● Live</Badge>
          </div>

          <div className="bg-white/70 border border-slate-200/40 rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-800">Recent Tracking Activity</p>
              <div className="flex gap-2">
                <button className="px-2.5 py-1 text-[10px] border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50">Filter</button>
                <button className="px-2.5 py-1 text-[10px] border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50">Export</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/30">
                    {['Timestamp', 'Chemical', 'Action', 'User', 'Method', 'Quantity', 'Location'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-slate-500 font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {trackingActivity.map((act, i) => (
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-2.5 text-slate-400 font-mono text-[10px]">{act.time}</td>
                      <td className="px-4 py-2.5 font-medium text-slate-800">{act.chemical}</td>
                      <td className="px-4 py-2.5">
                        <Badge 
                          variant={act.action.includes('Out') ? 'warning' : act.action.includes('In') ? 'success' : 'info'} 
                          size="sm"
                        >
                          {act.action}
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5 text-slate-600">{act.user}</td>
                      <td className="px-4 py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
                          act.method === 'RFID' ? 'bg-blue-100 text-blue-700' :
                          act.method === 'Barcode' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                        }`}>{act.method}</span>
                      </td>
                      <td className="px-4 py-2.5 text-slate-700 font-medium">{act.qty}</td>
                      <td className="px-4 py-2.5 text-cyan-600 font-medium">{act.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
