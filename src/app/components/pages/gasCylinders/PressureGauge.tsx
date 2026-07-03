export function PressureGauge({ value, max, status }: { value: number; max: number; status: string }) {
  const pct = Math.max(0, Math.min(1, value / max));
  const color = status === 'Leak Detected' ? '#ef4444' : status === 'Low Pressure' || status === 'Critical' ? '#f59e0b' : '#10b981';
  
  return (
    <div className="flex flex-col items-center">
      <svg width="60" height="40" viewBox="0 0 60 40">
        <path d="M 5 38 A 25 25 0 0 1 55 38" fill="none" stroke="#e2e8f0" strokeWidth="5" strokeLinecap="round" />
        <path
          d="M 5 38 A 25 25 0 0 1 55 38"
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${pct * 78.5} 78.5`}
        />
        <text x="30" y="36" textAnchor="middle" fontSize="8" fill="#475569" fontWeight="600">{value} PSI</text>
      </svg>
    </div>
  );
}
