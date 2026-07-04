import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  status?: 'success' | 'warning' | 'error' | 'info';
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  status = 'info'
}: MetricCardProps) {
  const statusColors = {
    success: 'bg-gradient-to-br from-green-100/60 to-green-50/60 border-green-200/40 text-green-700',
    warning: 'bg-gradient-to-br from-amber-100 to-amber-50 text-amber-700',
    error: 'bg-gradient-to-br from-red-100 to-red-50 text-red-700',
    info: 'bg-gradient-to-br from-cyan-100 to-cyan-50 text-cyan-700'
  };

  const iconBg = {
    success: 'bg-gradient-to-br from-green-100 to-green-50',
    warning: 'bg-gradient-to-br from-amber-100 to-amber-50',
    error: 'bg-gradient-to-br from-red-100 to-red-50',
    info: 'bg-gradient-to-br from-cyan-100 to-cyan-50'
  };

  return (
    <div className={`border rounded-xl p-4 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300 ${statusColors[status]}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="text-xs font-medium opacity-80">{title}</div>
        {Icon && (
          <div className={`p-1.5 rounded-lg ${iconBg[status]}`}>
            <Icon className="w-3.5 h-3.5 opacity-80" />
          </div>
        )}
      </div>

      <div className="mb-1">
        <div className="text-2xl font-bold">{value}</div>
      </div>

      {subtitle && (
        <div className="text-[10px] opacity-70">{subtitle}</div>
      )}

      {trend && trendValue && (
        <div className={`text-[10px] mt-1.5 font-medium ${
          trend === 'up' ? 'text-green-600' :
          trend === 'down' ? 'text-red-600' :
          'text-slate-600'
        }`}>
          {trendValue}
        </div>
      )}
    </div>
  );
}
