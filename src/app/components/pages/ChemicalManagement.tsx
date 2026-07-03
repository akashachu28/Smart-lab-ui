import { useState } from 'react';
import { TestTube, AlertTriangle, ShieldCheck, Clock, Search, Barcode, TrendingUp, Package, Activity, Eye, Thermometer, Droplet, Wind, Brain, QrCode, ChevronRight, AlertOctagon } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { Badge } from '../ui/Badge';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area, ReferenceLine } from 'recharts';

const tabs = ['Chemical Register', 'Storage Map', 'Compliance', 'MSDS', 'Analytics', 'Tracking', 'Consumption & Forecast', 'Expiry & Reorder', 'Chemical Compatibility'];

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

// ── Consumption & Forecast Data ──────────────────────────────────────────────
const C = {
  cyan: '#06b6d4', purple: '#8b5cf6', green: '#10b981',
  amber: '#f59e0b', red: '#ef4444', orange: '#f97316',
  blue: '#3b82f6', slate: '#94a3b8',
};

const weeklyConsumption = [
  { day: 'Mon', chemical: 42, department: 28, lab: 35, research: 18 },
  { day: 'Tue', chemical: 68, department: 41, lab: 52, research: 24 },
  { day: 'Wed', chemical: 55, department: 33, lab: 44, research: 20 },
  { day: 'Thu', chemical: 78, department: 50, lab: 61, research: 30 },
  { day: 'Fri', chemical: 63, department: 38, lab: 49, research: 22 },
  { day: 'Sat', chemical: 28, department: 15, lab: 21, research: 9 },
  { day: 'Sun', chemical: 18, department: 10, lab: 14, research: 6 },
];

const topConsumed = [
  { chemical: 'Ethanol', used: '184 L', pct: 92 },
  { chemical: 'Acetone', used: '152 L', pct: 76 },
  { chemical: 'Methanol', used: '118 L', pct: 59 },
  { chemical: 'IPA', used: '102 L', pct: 51 },
];

const forecastData = [
  { date: 'Jun 1', actual: 18, forecast: null },
  { date: 'Jun 8', actual: 15, forecast: null },
  { date: 'Jun 15', actual: 12, forecast: null },
  { date: 'Jun 22', actual: 9, forecast: 8 },
  { date: 'Jun 29', actual: null, forecast: 6 },
  { date: 'Jul 6', actual: null, forecast: 4 },
  { date: 'Jul 13', actual: null, forecast: 5 },
];

const labComparison = [
  { lab: 'Chemistry', inventory: 4200, consumption: 310, waste: 42, expiry: 8 },
  { lab: 'Biotech', inventory: 2800, consumption: 180, waste: 25, expiry: 3 },
  { lab: 'Microbiology', inventory: 3600, consumption: 260, waste: 38, expiry: 12 },
  { lab: 'QA', inventory: 1900, consumption: 120, waste: 15, expiry: 2 },
];

// ── Container Tracking Data ──────────────────────────────────────────────
const containerRows = [
  { id: 'CH-1022', chemical: 'Acetone', location: 'Lab A', owner: 'Dr John', qty: '2.5 L', status: 'Active' },
  { id: 'CH-1158', chemical: 'Ethanol', location: 'Storage B', owner: 'Lab Tech', qty: '1 L', status: 'Reserved' },
  { id: 'CH-2209', chemical: 'Nitric Acid', location: 'Lab C', owner: 'Research', qty: '0.2 L', status: 'Low Stock' },
  { id: 'CH-1441', chemical: 'Methanol', location: 'Lab A', owner: 'Dr Sarah', qty: '5 L', status: 'Active' },
  { id: 'CH-0897', chemical: 'IPA', location: 'Storage A', owner: 'Lab Tech', qty: '3 L', status: 'Active' },
  { id: 'CH-0782', chemical: 'HCl 37%', location: '—', owner: 'Lab B', qty: '1.2 L', status: 'Missing' },
];

const hourlyScans = [
  { hour: '8AM', scans: 62 }, { hour: '9AM', scans: 128 },
  { hour: '10AM', scans: 183 }, { hour: '11AM', scans: 114 },
  { hour: '12PM', scans: 97 }, { hour: '1PM', scans: 88 },
  { hour: '2PM', scans: 152 },
];

const movementTimeline = [
  { time: '09:12', event: 'Container CH-1023 issued to Lab A', type: 'issue' },
  { time: '09:34', event: 'Cylinder CY-33 returned from ICU Lab', type: 'return' },
  { time: '09:48', event: 'Acetone batch received — 20 L', type: 'receive' },
  { time: '10:20', event: 'QR scan × 14 items — Storage B audit', type: 'scan' },
  { time: '11:02', event: 'Container CH-0991 relocated to Cold Storage', type: 'move' },
  { time: '11:38', event: 'Low stock alert triggered — Ethanol', type: 'alert' },
  { time: '12:05', event: 'Container CH-0782 marked missing', type: 'alert' },
  { time: '12:40', event: 'Reorder auto-generated — Ethanol 40 L', type: 'receive' },
];

const eventTypeColor: Record<string, string> = {
  issue: 'bg-cyan-500', return: 'bg-green-500',
  receive: 'bg-purple-500', scan: 'bg-amber-500',
  move: 'bg-blue-500', alert: 'bg-red-500',
};

// ── Expiry & Reorder Data ──────────────────────────────────────────────
const expiryItems = [
  { chemical: 'Acetone (Batch A)', expiry: '7 days', remaining: '2 L', risk: 'High' },
  { chemical: 'NaOH Solution', expiry: '12 days', remaining: '0.5 L', risk: 'High' },
  { chemical: 'Ethanol (Batch B)', expiry: '45 days', remaining: '8 L', risk: 'Medium' },
  { chemical: 'HCl 37%', expiry: '21 days', remaining: '1.2 L', risk: 'Medium' },
  { chemical: 'Methanol', expiry: '28 days', remaining: '3 L', risk: 'Medium' },
];

const reorderRows = [
  { item: 'Ethanol', current: '8 L', minimum: '20 L', suggested: '40 L', priority: 'High', erp: 'Pending', reason: 'Usage increased · Delivery 12 days' },
  { item: 'IPA', current: '18 L', minimum: '25 L', suggested: '30 L', priority: 'Medium', erp: 'Approved', reason: 'Below safety stock threshold' },
  { item: 'Nitric Acid', current: '0.2 L', minimum: '2 L', suggested: '5 L', priority: 'High', erp: 'Ordered', reason: 'Critical low — immediate reorder' },
  { item: 'pH Buffer 7.0', current: '0 packs', minimum: '5 packs', suggested: '10 packs', priority: 'High', erp: 'Pending', reason: 'Out of stock' },
];

// ── Chemical Compatibility Data ──────────────────────────────────────────────
const compatibilityViolations = [
  { id: 1, chemA: 'Acetone', chemB: 'Hydrogen Peroxide 30%', reason: 'Oxidiser + Flammable — Risk of spontaneous combustion', location: 'CAB-A-03', severity: 'error' as const, recommended: 'Move Acetone to dedicated flammables cabinet', timestamp: '09:14' },
  { id: 2, chemA: 'Sodium Hydroxide', chemB: 'Hydrochloric Acid 37%', reason: 'Corrosive Base + Acid — Exothermic reaction hazard', location: 'Cabinet C/B corridor', severity: 'error' as const, recommended: 'Separate to dedicated acid/base cabinets', timestamp: '09:48' },
  { id: 3, chemA: 'Ethanol', chemB: 'Potassium Permanganate', reason: 'Oxidiser + Flammable (proximity)', location: 'Rack E-3', severity: 'warning' as const, recommended: 'Increase separation distance or relocate', timestamp: '10:22' },
];

const compatibilityRackData = [
  ['safe', 'safe', 'incompatible', 'safe', 'safe'],
  ['safe', 'warning', 'safe', 'safe', 'empty'],
  ['safe', 'safe', 'safe', 'incompatible', 'safe'],
  ['empty', 'safe', 'safe', 'safe', 'safe'],
  ['safe', 'safe', 'warning', 'empty', 'safe'],
];

const rackColors: Record<string, string> = {
  safe: 'bg-green-100 border-green-300 text-green-700',
  incompatible: 'bg-red-200 border-red-400 text-red-700 animate-pulse',
  warning: 'bg-amber-100 border-amber-300 text-amber-700',
  empty: 'bg-slate-50 border-slate-200 text-slate-300',
};

const compatibilityMatrix = [
  { category: 'Acids', acids: 'Compatible', bases: 'Incompatible', oxidizers: 'Warning', flammables: 'Warning', organics: 'Warning' },
  { category: 'Bases', acids: 'Incompatible', bases: 'Compatible', oxidizers: 'Warning', flammables: 'Compatible', organics: 'Compatible' },
  { category: 'Oxidizers', acids: 'Warning', bases: 'Warning', oxidizers: 'Compatible', flammables: 'Incompatible', organics: 'Incompatible' },
  { category: 'Flammables', acids: 'Warning', bases: 'Compatible', oxidizers: 'Incompatible', flammables: 'Compatible', organics: 'Warning' },
  { category: 'Organics', acids: 'Warning', bases: 'Compatible', oxidizers: 'Incompatible', flammables: 'Warning', organics: 'Compatible' },
];

const highRiskChemicals = [
  { chemical: 'Nitric Acid', riskScore: 96, location: 'Storage A', casNumber: '7697-37-2' },
  { chemical: 'Hydrogen Peroxide', riskScore: 91, location: 'Oxidizer Room', casNumber: '7722-84-1' },
  { chemical: 'Sodium Metal', riskScore: 89, location: 'Chemical Vault', casNumber: '7440-23-5' },
  { chemical: 'Perchloric Acid', riskScore: 94, location: 'Acid Room', casNumber: '7601-90-3' },
];

const aiSafetyRecommendations = [
  'Two incompatible chemical pairs require immediate separation to eliminate fire risk.',
  'Most compatibility violations involve oxidizers stored near organic solvents.',
  'AI predicts an increased compatibility risk in Storage B due to incoming deliveries scheduled today.',
  'Correcting the current storage violations will improve the overall safety score from 98.9% to 99.6%.',
  'Flammable Storage Room maintains the highest compliance score (99.5%).',
  'Computer Vision detected six misplaced containers during the morning inspection.',
];

const compatibilityStatusBadge: Record<string, string> = {
  Compatible: 'bg-green-100 text-green-700 border-green-200',
  Incompatible: 'bg-red-100 text-red-700 border-red-200',
  Warning: 'bg-amber-100 text-amber-700 border-amber-200',
};

function CircularGauge({ value, label, size = 120 }: { value: number; label: string; size?: number }) {
  const r = 46;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  const color = value >= 90 ? C.green : value >= 70 ? C.amber : C.red;
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={r} fill="none" stroke="#f1f5f9" strokeWidth="10" />
        <circle cx="55" cy="55" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeLinecap="round" strokeDasharray={`${dash} ${circ}`} transform="rotate(-90 55 55)" />
        <text x="55" y="50" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1e293b">{value}%</text>
        <text x="55" y="65" textAnchor="middle" fontSize="9" fill="#64748b">{label}</text>
      </svg>
    </div>
  );
}

function SectionCard({ title, subtitle, children, className = '' }: {
  title: string; subtitle?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={`bg-white/70 border border-slate-200/40 rounded-xl shadow-sm p-4 ${className}`}>
      <div className="mb-3">
        <p className="text-xs font-semibold text-slate-800">{title}</p>
        {subtitle && <p className="text-[10px] text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export function ChemicalManagement() {
  const [activeTab, setActiveTab] = useState('Chemical Register');
  const [search, setSearch] = useState('');
  const [stockSearch, setStockSearch] = useState('');
  const [stockSort, setStockSort] = useState<'none' | 'lowToHigh' | 'highToLow'>('none');
  const [labMetric, setLabMetric] = useState<'inventory' | 'consumption' | 'waste' | 'expiry'>('inventory');

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
                  <div className="mt-2">
                    <Badge 
                      variant={et.severity === 'critical' || et.severity === 'high' ? 'error' : et.severity === 'medium' ? 'warning' : 'success'} 
                      size="sm"
                    >
                      {et.severity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Levels */}
          <div className="bg-white/70 border border-slate-200/40 rounded-xl p-4 shadow-sm">
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Stock Level Monitoring</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Current inventory vs min/max thresholds</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-white border border-slate-200/60 rounded-lg px-2.5 py-1.5">
                    <Search className="w-3 h-3 text-slate-400" />
                    <input 
                      value={stockSearch} 
                      onChange={e => setStockSearch(e.target.value)} 
                      placeholder="Search chemical..." 
                      className="w-32 text-xs outline-none bg-transparent text-slate-700 placeholder:text-slate-400" 
                    />
                  </div>
                  <select 
                    value={stockSort} 
                    onChange={e => setStockSort(e.target.value as 'none' | 'lowToHigh' | 'highToLow')}
                    className="px-2.5 py-1.5 text-xs border border-slate-200 text-slate-600 rounded-lg bg-white hover:bg-slate-50 outline-none"
                  >
                    <option value="none">Default Order</option>
                    <option value="lowToHigh">Lowest to Highest</option>
                    <option value="highToLow">Highest to Lowest</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {(() => {
                let filteredStocks = stockLevels.filter(sl => 
                  !stockSearch || sl.chemical.toLowerCase().includes(stockSearch.toLowerCase())
                );
                
                if (stockSort === 'lowToHigh') {
                  filteredStocks = [...filteredStocks].sort((a, b) => a.current - b.current);
                } else if (stockSort === 'highToLow') {
                  filteredStocks = [...filteredStocks].sort((a, b) => b.current - a.current);
                }
                
                return filteredStocks.map(sl => (
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
                ));
              })()}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Tracking' && (
        <div className="space-y-4">
          {/* Container Metrics Row */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Active Containers', value: '982', color: C.green, icon: Package },
              { label: 'Idle Containers', value: '34', color: C.amber, icon: Clock },
              { label: 'Lost / Missing', value: '1', color: C.red, icon: AlertTriangle },
              { label: 'Total Scans Today', value: '824', color: C.cyan, icon: Barcode },
            ].map(m => (
              <div key={m.label} className="bg-white/70 border border-slate-200/40 rounded-xl p-3 shadow-sm flex items-center gap-3">
                <div className="p-1.5 rounded-lg" style={{ background: m.color + '20' }}>
                  <m.icon className="w-3.5 h-3.5" style={{ color: m.color }} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500">{m.label}</p>
                  <p className="text-sm font-bold text-slate-800">{m.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Container Tracking Table */}
            <SectionCard title="Chemical Container Tracking" subtitle="Live container status" className="col-span-2">
              <table className="w-full text-xs mb-3">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    {['Container ID', 'Chemical', 'Location', 'Owner', 'Qty', 'Status'].map(h => (
                      <th key={h} className="text-left py-2 px-3 text-[10px] text-slate-500 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {containerRows.map(r => (
                    <tr key={r.id} className={`border-b border-slate-50 hover:bg-slate-50/60 ${r.status === 'Missing' ? 'bg-red-50/40' : ''}`}>
                      <td className="py-2.5 px-3 font-mono text-[10px] text-slate-400">{r.id}</td>
                      <td className="py-2.5 px-3 font-medium text-slate-800">{r.chemical}</td>
                      <td className="py-2.5 px-3 text-slate-600">{r.location}</td>
                      <td className="py-2.5 px-3 text-slate-600">{r.owner}</td>
                      <td className="py-2.5 px-3 text-slate-700">{r.qty}</td>
                      <td className="py-2.5 px-3">
                        <Badge
                          variant={r.status === 'Active' ? 'success' : r.status === 'Low Stock' ? 'error' : r.status === 'Missing' ? 'error' : 'info'}
                          size="sm"
                        >{r.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pt-3 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 mb-2">Container lifecycle flow</p>
                <div className="flex items-center gap-1 flex-wrap">
                  {['Created', 'Received', 'Stored', 'Issued', 'Returned', 'Disposed'].map((s, i, arr) => (
                    <div key={s} className="flex items-center gap-1">
                      <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">{s}</span>
                      {i < arr.length - 1 && <ChevronRight className="w-2.5 h-2.5 text-slate-300 flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            {/* Barcode Scan Activity */}
            <SectionCard title="Barcode Scan Activity" subtitle="Hourly scanning volume">
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={hourlyScans} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="hour" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip contentStyle={{ fontSize: 10 }} />
                  <Bar dataKey="scans" fill={C.cyan} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-3 pt-3 border-t border-slate-100">
                <p className="text-[10px] text-slate-500 font-medium mb-2">Today's Scan Summary</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Total', value: '824', color: C.slate },
                    { label: 'Success', value: '811', color: C.green },
                    { label: 'Failed', value: '13', color: C.red },
                  ].map(m => (
                    <div key={m.label} className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-center">
                      <p className="text-base font-bold" style={{ color: m.color }}>{m.value}</p>
                      <p className="text-[9px] text-slate-500">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Recent Tracking Activity Table */}
          <div className="bg-white/70 border border-slate-200/40 rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">Recent Tracking Activity</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Real-time chemical movement log</p>
              </div>
              <div className="flex gap-2">
                <button className="px-2.5 py-1 text-[10px] border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 flex items-center gap-1">
                  <Search className="w-3 h-3" /> Filter
                </button>
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

          {/* Inventory Movement Timeline */}
          <SectionCard title="Inventory Movement Timeline" subtitle="Live activity feed — today">
            <div className="relative">
              <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-slate-100"></div>
              <div className="space-y-3 pl-1">
                {movementTimeline.map((ev, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center z-10 ${eventTypeColor[ev.type]}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-semibold text-slate-400">{ev.time}</span>
                      <p className="text-xs text-slate-700">{ev.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          NEW TAB — CONSUMPTION & FORECAST
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'Consumption & Forecast' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">

            {/* Weekly Consumption Area Chart */}
            <SectionCard title="Weekly Consumption Trend" subtitle="Usage by category — current week" className="col-span-2">
              <ResponsiveContainer width="100%" height={190}>
                <AreaChart data={weeklyConsumption}>
                  <defs>
                    {[C.cyan, C.purple, C.amber, C.green].map((c, i) => (
                      <linearGradient key={i} id={`cg${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={c} stopOpacity={0.18} />
                        <stop offset="95%" stopColor={c} stopOpacity={0.01} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip contentStyle={{ fontSize: 10 }} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                  <Area type="monotone" dataKey="chemical" name="Chemical" stroke={C.cyan} fill="url(#cg0)" strokeWidth={2} />
                  <Area type="monotone" dataKey="department" name="Department" stroke={C.purple} fill="url(#cg1)" strokeWidth={2} />
                  <Area type="monotone" dataKey="lab" name="Lab" stroke={C.amber} fill="url(#cg2)" strokeWidth={2} />
                  <Area type="monotone" dataKey="research" name="Research" stroke={C.green} fill="url(#cg3)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </SectionCard>

            {/* Top Consumed */}
            <SectionCard title="Top Consumed Chemicals" subtitle="This month">
              <div className="space-y-4 pt-1">
                {topConsumed.map(tc => (
                  <div key={tc.chemical}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium text-slate-700">{tc.chemical}</span>
                      <span className="text-xs font-bold text-slate-800">{tc.used}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full" style={{ width: `${tc.pct}%` }}></div>
                    </div>
                  </div>
                ))}
                <div className="mt-3 p-2.5 bg-cyan-50 border border-cyan-200/50 rounded-lg flex gap-2">
                  <Brain className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-cyan-700">
                    Ethanol usage <strong>+18%</strong> vs last month. Likely Project X. Pre-order 40 L recommended.
                  </p>
                </div>
              </div>
            </SectionCard>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Forecast Chart */}
            <SectionCard title="Forecast Demand — Acetone" subtitle="Actual (solid) vs AI prediction (dashed)">
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip contentStyle={{ fontSize: 10 }} />
                  <ReferenceLine y={5} stroke={C.red} strokeDasharray="3 3"
                    label={{ value: 'Safety Stock', position: 'right', fontSize: 8, fill: C.red }} />
                  <Line type="monotone" dataKey="actual" name="Actual" stroke={C.cyan} strokeWidth={2} dot={{ r: 2 }} connectNulls={false} />
                  <Line type="monotone" dataKey="forecast" name="Forecast" stroke={C.purple} strokeWidth={2} strokeDasharray="5 5" dot={false} connectNulls />
                </LineChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-100">
                {[['Current Stock', '18 L', 'text-slate-700'], ['Expected (30d)', '5 L', 'text-amber-600'], ['Recommended', '20 L', 'text-cyan-600'], ['Confidence', '92%', 'text-green-600']].map(([l, v, cls]) => (
                  <div key={l} className="text-center">
                    <p className="text-[9px] text-slate-400">{l}</p>
                    <p className={`text-sm font-bold ${cls}`}>{v}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Lab Comparison + Predictive */}
            <div className="space-y-4">
              <SectionCard title="Laboratory Comparison" subtitle="Inventory metrics by lab">
                <div className="flex gap-1.5 mb-3">
                  {(['inventory', 'consumption', 'waste', 'expiry'] as const).map(m => (
                    <button key={m} onClick={() => setLabMetric(m)} className={`px-2.5 py-1 text-[10px] rounded-lg font-medium capitalize transition-colors ${labMetric === m ? 'bg-cyan-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{m}</button>
                  ))}
                </div>
                <ResponsiveContainer width="100%" height={110}>
                  <BarChart data={labComparison} barSize={22}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="lab" tick={{ fontSize: 9 }} />
                    <YAxis tick={{ fontSize: 9 }} />
                    <Tooltip contentStyle={{ fontSize: 10 }} />
                    <Bar dataKey={labMetric} fill={C.cyan} radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </SectionCard>

              <SectionCard title="Predictive Analytics" subtitle="Next 30 days — ML forecast">
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[
                    { label: 'Demand', delta: '+18%', up: true },
                    { label: 'Inventory', delta: '-11%', up: false },
                    { label: 'Waste', delta: '-6%', up: false },
                    { label: 'Reorder', delta: '+8%', up: true },
                  ].map(p => (
                    <div key={p.label} className="p-2 bg-slate-50 rounded-lg text-center border border-slate-100">
                      <p className="text-[9px] text-slate-500 mb-0.5">{p.label}</p>
                      <p className={`text-sm font-bold ${p.up ? 'text-red-500' : 'text-green-500'}`}>{p.delta}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-1">
                  {['Historical consumption trends', 'Seasonal demand patterns', 'Ongoing research projects', 'Supplier lead times', 'Minimum safety stock', 'Batch expiry dates'].map(m => (
                    <div key={m} className="flex items-center gap-1.5">
                      <ChevronRight className="w-2.5 h-2.5 text-slate-300" />
                      <span className="text-[9px] text-slate-500">{m}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          NEW TAB — EXPIRY & REORDER
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'Expiry & Reorder' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">

            {/* Expiry Intelligence */}
            <SectionCard title="Expiry Intelligence" subtitle="AI-monitored shelf life tracking">
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  { label: 'Expired', value: '12', bg: 'bg-red-50 border-red-100', text: 'text-red-600' },
                  { label: 'Within 7 days', value: '8', bg: 'bg-orange-50 border-orange-100', text: 'text-orange-600' },
                  { label: 'Within 30 days', value: '41', bg: 'bg-amber-50 border-amber-100', text: 'text-amber-600' },
                  { label: 'Safe', value: '932', bg: 'bg-green-50 border-green-100', text: 'text-green-600' },
                ].map(e => (
                  <div key={e.label} className={`${e.bg} border rounded-xl p-3 text-center`}>
                    <p className={`text-2xl font-bold ${e.text}`}>{e.value}</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">{e.label}</p>
                  </div>
                ))}
              </div>
              <table className="w-full text-xs mb-4">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['Chemical', 'Expiry', 'Remaining', 'Risk'].map(h => (
                      <th key={h} className="text-left py-2 px-2 text-[10px] text-slate-400 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {expiryItems.map(e => (
                    <tr key={e.chemical} className={`border-b border-slate-50 hover:bg-slate-50/60 ${e.risk === 'High' ? 'bg-red-50/30' : ''}`}>
                      <td className="py-2 px-2 font-medium text-slate-800">{e.chemical}</td>
                      <td className={`py-2 px-2 font-semibold ${e.risk === 'High' ? 'text-red-600' : 'text-amber-600'}`}>{e.expiry}</td>
                      <td className="py-2 px-2 text-slate-600">{e.remaining}</td>
                      <td className="py-2 px-2">
                        <Badge variant={e.risk === 'High' ? 'error' : 'warning'} size="sm">{e.risk}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200/50 rounded-lg">
                <Brain className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-amber-700"><strong>AI Suggestion:</strong> Use Batch B (Acetone) before Batch C to minimise waste.</p>
                  <p className="text-[10px] text-amber-600 mt-0.5">Estimated waste reduction: <strong>14%</strong></p>
                </div>
              </div>
            </SectionCard>

            {/* Auto Reorder + Risk */}
            <div className="space-y-4">
              <SectionCard title="Auto Reorder Recommendations" subtitle="AI-generated — pending ERP approval">
                <div className="space-y-2.5 mb-3">
                  {reorderRows.map(r => (
                    <div key={r.item} className={`p-3 rounded-xl border ${r.priority === 'High' ? 'bg-red-50/40 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-xs font-semibold text-slate-800">{r.item}</p>
                          <p className="text-[10px] text-slate-400">{r.reason}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Badge variant={r.priority === 'High' ? 'error' : 'warning'} size="sm">{r.priority}</Badge>
                          <Badge variant={r.erp === 'Pending' ? 'warning' : r.erp === 'Approved' ? 'success' : 'info'} size="sm">{r.erp}</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-1 text-center">
                        {[['Current', r.current], ['Minimum', r.minimum], ['Suggested', r.suggested]].map(([l, v]) => (
                          <div key={l} className="bg-white/80 rounded-lg py-1.5">
                            <p className="text-[9px] text-slate-400">{l}</p>
                            <p className="text-[11px] font-bold text-slate-700">{v}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg text-xs font-medium shadow-sm">Approve All → ERP</button>
                  <button className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs hover:bg-slate-50">Review</button>
                </div>
              </SectionCard>

              <SectionCard title="AI Inventory Risk Assessment" subtitle="Live risk percentages">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Overstock Risk', value: 12, color: C.amber },
                    { label: 'Understock Risk', value: 7, color: C.orange },
                    { label: 'Expiry Risk', value: 5, color: C.red },
                    { label: 'Missing Container', value: 1, color: C.purple },
                  ].map(r => (
                    <div key={r.label} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                      <p className="text-[9px] text-slate-500 mb-1">{r.label}</p>
                      <p className="text-2xl font-bold" style={{ color: r.color }}>{r.value}%</p>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${r.value * 5}%`, background: r.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          NEW TAB — CHEMICAL COMPATIBILITY
      ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'Chemical Compatibility' && (
        <div className="space-y-4">
          {/* Active Violations + Storage Rack Map */}
          <div className="grid grid-cols-3 gap-4">
            {/* Active Violations */}
            <SectionCard title="Active Compatibility Violations" subtitle={`${compatibilityViolations.length} critical issues detected`} className="col-span-2">
              <div className="space-y-2">
                {compatibilityViolations.map(v => (
                  <div key={v.id} className={`border rounded-lg p-3 ${v.severity === 'error' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <AlertOctagon className={`w-4 h-4 ${v.severity === 'error' ? 'text-red-600' : 'text-amber-600'}`} />
                        <Badge variant={v.severity} size="sm">{v.severity === 'error' ? 'Critical' : 'Warning'}</Badge>
                      </div>
                      <span className="text-[9px] text-slate-400">{v.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-slate-800">{v.chemA}</span>
                      <span className="text-xs text-slate-400">+</span>
                      <span className="text-xs font-semibold text-slate-800">{v.chemB}</span>
                    </div>
                    <p className="text-[10px] text-slate-600 mb-2">{v.reason}</p>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-500">Location: <span className="font-medium text-cyan-600">{v.location}</span></span>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3 h-3 text-green-600" />
                        <span className="text-slate-500">{v.recommended}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Storage Rack Compatibility Map */}
            <SectionCard title="Storage Rack Map" subtitle="Section A–E" className="col-span-1">
              <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
                {compatibilityRackData.flat().map((cell, i) => {
                  const row = Math.floor(i / 5);
                  const col = i % 5;
                  return (
                    <div key={i} className={`h-12 rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer hover:opacity-80 transition-opacity ${rackColors[cell]}`}>
                      <span className="text-[9px] font-bold">{String.fromCharCode(65 + row)}{col + 1}</span>
                      <span className="text-[8px]">{cell !== 'empty' ? cell.charAt(0).toUpperCase() + cell.slice(1) : '—'}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(rackColors).map(([k, _]) => (
                  <div key={k} className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded border ${rackColors[k].replace(' animate-pulse', '')}`}></div>
                    <span className="text-[10px] text-slate-500 capitalize">{k}</span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>


        </div>
      )}
    </div>
  );
}
