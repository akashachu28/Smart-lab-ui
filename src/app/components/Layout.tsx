import { Outlet, NavLink } from 'react-router';
import {
  Bot,
  Camera,
  Package,
  FlaskConical,
  TestTube,
  Gauge,
  Trash2,
  TrendingUp,
  AlertOctagon,
  Search,
  Bell,
  Settings,
  Globe
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from '../../imports/mialoLogo-1.png';

const navigation = [
  { name: 'AI Assistant', path: '/ai-assistant', icon: Bot, description: 'Lab Copilot' },
  { name: 'Computer Vision', path: '/computer-vision', icon: Camera, description: 'Live Monitoring' },
  { name: 'Smart Inventory', path: '/inventory', icon: Package, description: 'Stock Management' },
  { name: 'Sample Tracking', path: '/sample-tracking', icon: FlaskConical, description: 'Chain of Custody' },
  { name: 'Chemical Mgmt', path: '/chemical-management', icon: TestTube, description: 'Lifecycle & Compliance' },
  { name: 'Gas Cylinders', path: '/gas-cylinders', icon: Gauge, description: 'IoT Monitoring' },
  { name: 'Waste Management', path: '/waste-management', icon: Trash2, description: 'Disposal Tracking' },
  { name: 'Demand Forecasting', path: '/demand-forecasting', icon: TrendingUp, description: 'AI Predictions' },
  { name: 'Compatibility', path: '/compatibility-monitoring', icon: AlertOctagon, description: 'Storage Safety' },
  { name: 'Root Cause', path: '/root-cause-analysis', icon: Search, description: 'Incident Analysis' },
];

export function Layout() {
  return (
    <div className="flex h-screen bg-slate-100 p-4 gap-4">
      {/* Sidebar */}
      <aside className="w-60 bg-white/60 backdrop-blur-md flex flex-col rounded-2xl shadow-sm border border-white/40">
        {/* Logo */}
        <div className="h-14 flex items-center px-5 border-b border-slate-200/40">
          <ImageWithFallback src={logo} alt="mialo" className="h-8 object-contain" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
            >
              {({ isActive }) => (
                <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg mb-0.5 transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/90 to-cyan-600/90 text-white shadow-md shadow-cyan-500/20 backdrop-blur-sm'
                    : 'text-slate-600 hover:bg-slate-100/60'
                }`}>
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate text-xs">{item.name}</div>
                  </div>
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200/40 px-4 py-3">
          <div className="text-[10px] text-slate-400 text-center">
            Platform v1.0
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/40">
        {/* Header */}
        <header className="h-14 flex items-center justify-between px-6 border-b border-slate-200/40">
          <div className="flex items-center gap-4">
            <h1 className="text-base font-semibold text-slate-800">
              Smart Lab Platform
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-slate-600 hover:bg-slate-100/60 rounded-lg transition-all duration-200 text-xs font-medium">
              <Globe className="w-3.5 h-3.5" />
              EN
            </button>
            <button className="p-1.5 text-slate-600 hover:bg-slate-100/60 rounded-lg transition-all duration-200 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-1 ring-white"></span>
            </button>
            <button className="p-1.5 text-slate-600 hover:bg-slate-100/60 rounded-lg transition-all duration-200">
              <Settings className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-2.5 py-1.5 text-slate-700 hover:bg-slate-100/60 rounded-lg transition-all duration-200">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white text-xs font-medium">
                A
              </div>
              <span className="text-xs font-medium">Admin</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
