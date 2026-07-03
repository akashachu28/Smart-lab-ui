import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
}

export function Card({ title, subtitle, className = '', children }: CardProps) {
  return (
    <div className={`bg-white/70 border border-slate-200/40 rounded-xl shadow-sm ${className}`}>
      <div className="p-4">
        {(title || subtitle) && (
          <div className="mb-3">
            {title && <h3 className="text-sm font-semibold text-slate-800">{title}</h3>}
            {subtitle && <p className="text-[10px] text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}
