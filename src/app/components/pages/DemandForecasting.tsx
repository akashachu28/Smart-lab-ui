import { useState } from 'react';
import { RefreshCw, TrendingUp, AlertCircle, ShoppingBag } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { OverviewTab } from './demandForecasting/OverviewTab';
import { ForecastChartTab } from './demandForecasting/ForecastChartTab';
import { ConsumptionAnalyticsTab } from './demandForecasting/ConsumptionAnalyticsTab';
import { DemandPredictionTab } from './demandForecasting/DemandPredictionTab';
import { InventoryForecastTab } from './demandForecasting/InventoryForecastTab';
import { ReorderRecommendationsTab } from './demandForecasting/ReorderRecommendationsTab';
import { ProcurementTab } from './demandForecasting/ProcurementTab';
import { SAPIntegrationTab } from './demandForecasting/SAPIntegrationTab';
import { RiskAnalyticsTab } from './demandForecasting/RiskAnalyticsTab';
import { AIInsightsTab } from './demandForecasting/AIInsightsTab';

const tabs = ['Overview', 'AI Forecast & Analytics', 'Inventory & Reorders', 'Procurement & SAP', 'Risk & Insights'];

export function DemandForecasting() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="p-5 min-h-full flex flex-col gap-4">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">Demand Forecasting</h2>
          <p className="text-xs text-slate-500">AI-driven consumption predictions, reorder timelines & SAP procurement sync</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400">SAP: Last synced 2 min ago</span>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-50">
            <RefreshCw className="w-3.5 h-3.5" /> Sync Now
          </button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-8 gap-3">
        <MetricCard title="Forecast Accuracy" value="96.8%" subtitle="Last 30 days" icon={TrendingUp} status="success" trend="up" trendValue="+4.7%" />
        <MetricCard title="Forecasted Demand" value="48.2 T" subtitle="Monthly prediction" icon={TrendingUp} status="info" />
        <MetricCard title="Reorder Recommended" value="29" subtitle="AI suggestions" icon={ShoppingBag} status="warning" />
        <MetricCard title="Predicted Stockouts" value="14" subtitle="Critical items" icon={AlertCircle} status="error" />
        <MetricCard title="Inventory Coverage" value="38 Days" subtitle="Average stock days" icon={TrendingUp} status="success" />
        <MetricCard title="Pending SAP Sync" value="3" subtitle="Awaiting sync" icon={RefreshCw} status="info" />
        <MetricCard title="Procurement Savings" value="₹18.4L" subtitle="AI optimization" icon={TrendingUp} status="success" trend="up" trendValue="+22%" />
        <MetricCard title="Chemicals Forecasted" value="326" subtitle="Active models" icon={TrendingUp} status="info" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200/40">
        {tabs.map(t => (
          <button 
            key={t} 
            onClick={() => setActiveTab(t)} 
            className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === t ? 'border-cyan-500 text-cyan-700' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && <OverviewTab />}

      {activeTab === 'AI Forecast & Analytics' && (
        <div className="space-y-4">
          <ForecastChartTab />
          <ConsumptionAnalyticsTab />
        </div>
      )}

      {activeTab === 'Inventory & Reorders' && (
        <div className="space-y-4">
          <DemandPredictionTab />
          <InventoryForecastTab />
          <ReorderRecommendationsTab />
        </div>
      )}

      {activeTab === 'Procurement & SAP' && (
        <div className="space-y-4">
          <ProcurementTab />
          <SAPIntegrationTab />
        </div>
      )}

      {activeTab === 'Risk & Insights' && (
        <div className="space-y-4">
          <RiskAnalyticsTab />
          <AIInsightsTab />
        </div>
      )}
    </div>
  );
}
