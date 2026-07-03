import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Search } from 'lucide-react';
import { similarIncidents } from './data';

export function HistoricalSearchTab() {
  const historicalPatterns = [
    { pattern: 'Valve-related failures', occurrences: 18, trend: 'Increasing', severity: 'High' },
    { pattern: 'Chemical spills during transfer', occurrences: 12, trend: 'Stable', severity: 'Medium' },
    { pattern: 'Equipment failures after maintenance', occurrences: 8, trend: 'Decreasing', severity: 'Medium' },
    { pattern: 'Safety protocol violations', occurrences: 6, trend: 'Decreasing', severity: 'Low' },
  ];

  const lessonsLearned = [
    { lesson: 'Preventive valve replacement after 80% of rated service life reduces failures by 65%.', source: 'INC-2023-087' },
    { lesson: 'Enhanced incoming QC procedures reduced supplier-related incidents by 42%.', source: 'INC-2023-098' },
    { lesson: 'Real-time pressure monitoring detected 92% of valve anomalies before failure.', source: 'INC-2024-031' },
  ];

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="bg-white/70 border border-slate-200/40 rounded-xl p-4">
        <p className="text-xs font-semibold text-slate-700 mb-3">AI Historical Search</p>
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            placeholder="Search by keywords, equipment, root cause, department..." 
            className="flex-1 text-xs outline-none bg-transparent text-slate-700 placeholder:text-slate-400" 
          />
          <button className="px-3 py-1 bg-cyan-500 text-white rounded-lg text-xs font-medium">
            Search
          </button>
        </div>
        <p className="text-[10px] text-slate-500 mt-2">
          AI will analyze historical incidents and identify patterns, trends, and lessons learned.
        </p>
      </div>

      {/* Similar Incidents */}
      <Card title="Similar Historical Incidents" subtitle="AI-identified matches" className="bg-white/70 border-slate-200/40">
        <div className="space-y-2">
          {similarIncidents.map((incident) => (
            <div key={incident.id} className="flex items-start justify-between bg-slate-50/60 border border-slate-200/40 rounded-lg p-3 hover:border-cyan-300 transition-colors cursor-pointer">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[10px] font-mono text-slate-400">{incident.id}</p>
                  <Badge variant={incident.similarity > 90 ? 'error' : 'warning'} size="sm">
                    {incident.similarity}% match
                  </Badge>
                </div>
                <p className="text-xs font-medium text-slate-800 mb-1">{incident.title}</p>
                <div className="flex items-center gap-3 text-[10px] text-slate-500">
                  <span>Date: {incident.date}</span>
                  {incident.rootCause && <span>Root Cause: <span className="text-slate-700 font-medium">{incident.rootCause}</span></span>}
                </div>
              </div>
              <button className="text-[10px] text-cyan-600 hover:underline font-medium ml-2">
                View Details →
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Historical Patterns */}
      <Card title="Historical Patterns" subtitle="Recurring incident types" className="bg-white/70 border-slate-200/40">
        <div className="space-y-2">
          {historicalPatterns.map((pattern, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50/60 border border-slate-200/40 rounded-lg">
              <div className="flex-1">
                <p className="text-xs font-medium text-slate-800 mb-1">{pattern.pattern}</p>
                <div className="flex items-center gap-3 text-[10px] text-slate-500">
                  <span>{pattern.occurrences} occurrences</span>
                  <span className={`font-medium ${
                    pattern.trend === 'Increasing' ? 'text-red-600' :
                    pattern.trend === 'Decreasing' ? 'text-green-600' :
                    'text-slate-600'
                  }`}>
                    Trend: {pattern.trend}
                  </span>
                </div>
              </div>
              <Badge 
                variant={
                  pattern.severity === 'High' ? 'error' :
                  pattern.severity === 'Medium' ? 'warning' : 'info'
                } 
                size="sm"
              >
                {pattern.severity}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Lessons Learned */}
      <Card title="Lessons Learned" subtitle="Key insights from historical data" className="bg-white/70 border-slate-200/40">
        <div className="space-y-3">
          {lessonsLearned.map((lesson, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200/40 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-white">{idx + 1}</span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-700 leading-relaxed mb-1">{lesson.lesson}</p>
                <p className="text-[10px] text-cyan-600 font-medium">Source: {lesson.source}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Knowledge Base Updates */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/40 rounded-xl p-4">
        <p className="text-xs font-semibold text-slate-700 mb-2">Knowledge Base Integration</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">Historical incidents indexed</span>
            <span className="font-bold text-slate-800">1,847</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">Lessons learned documented</span>
            <span className="font-bold text-slate-800">342</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">Pattern recognition accuracy</span>
            <span className="font-bold text-cyan-700">94.8%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
