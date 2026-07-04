import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Layout } from './components/Layout';

// Lazy load page components for code splitting
const AIAssistant = lazy(() => import('./components/pages/AIAssistant').then(m => ({ default: m.AIAssistant })));
const ComputerVision = lazy(() => import('./components/pages/ComputerVision').then(m => ({ default: m.ComputerVision })));
const SampleTracking = lazy(() => import('./components/pages/SampleTracking').then(m => ({ default: m.SampleTracking })));
const ChemicalManagement = lazy(() => import('./components/pages/ChemicalManagement').then(m => ({ default: m.ChemicalManagement })));
const GasCylinders = lazy(() => import('./components/pages/GasCylinders').then(m => ({ default: m.GasCylinders })));
const WasteManagement = lazy(() => import('./components/pages/WasteManagement').then(m => ({ default: m.WasteManagement })));
const DemandForecasting = lazy(() => import('./components/pages/DemandForecasting').then(m => ({ default: m.DemandForecasting })));
const CompatibilityMonitoring = lazy(() => import('./components/pages/CompatibilityMonitoring').then(m => ({ default: m.CompatibilityMonitoring })));
const RootCauseAnalysis = lazy(() => import('./components/pages/RootCauseAnalysis').then(m => ({ default: m.RootCauseAnalysis })));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-gray-500">Loading...</div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/ai-assistant" replace />} />
            <Route path="ai-assistant" element={<AIAssistant />} />
            <Route path="safety-and-security" element={<ComputerVision />} />
            <Route path="sample-tracking" element={<SampleTracking />} />
            <Route path="chemical-management" element={<ChemicalManagement />} />
            <Route path="gas-cylinders" element={<GasCylinders />} />
            <Route path="waste-management" element={<WasteManagement />} />
            <Route path="demand-forecasting" element={<DemandForecasting />} />
            <Route path="compatibility-monitoring" element={<CompatibilityMonitoring />} />
            <Route path="root-cause-analysis" element={<RootCauseAnalysis />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
