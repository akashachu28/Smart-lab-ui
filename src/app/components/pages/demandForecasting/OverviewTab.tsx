import { TrendingUp, AlertCircle, RefreshCw, ShoppingBag } from 'lucide-react';
import { MetricCard } from '../../ui/MetricCard';

export function OverviewTab() {
  return (
    <div className="grid grid-cols-4 gap-3">
      <MetricCard 
        title="Forecast Accuracy" 
        value="96.8%" 
        subtitle="Last 30 days" 
        icon={TrendingUp} 
        status="success" 
        trend="up" 
        trendValue="+4.7% vs last period" 
      />
      <MetricCard 
        title="Forecasted Demand" 
        value="48.2 Tons" 
        subtitle="Monthly prediction" 
        icon={TrendingUp} 
        status="info" 
      />
      <MetricCard 
        title="Reorder Recommended" 
        value="29 items" 
        subtitle="AI-generated suggestions" 
        icon={ShoppingBag} 
        status="warning" 
      />
      <MetricCard 
        title="Predicted Stockouts" 
        value="14" 
        subtitle="Critical items" 
        icon={AlertCircle} 
        status="error" 
      />
      <MetricCard 
        title="Inventory Coverage" 
        value="38 Days" 
        subtitle="Average across all items" 
        icon={TrendingUp} 
        status="success" 
      />
      <MetricCard 
        title="Pending SAP Sync" 
        value="3 items" 
        subtitle="Awaiting confirmation" 
        icon={RefreshCw} 
        status="info" 
      />
      <MetricCard 
        title="Procurement Savings" 
        value="₹18.4 Lakhs" 
        subtitle="AI optimization" 
        icon={TrendingUp} 
        status="success" 
        trend="up"
        trendValue="+22% vs manual"
      />
      <MetricCard 
        title="Chemicals Forecasted" 
        value="326" 
        subtitle="Active models" 
        icon={TrendingUp} 
        status="info" 
      />
    </div>
  );
}
