import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Layout } from './components/Layout';
import { AIAssistant } from './components/pages/AIAssistant';
import { ComputerVision } from './components/pages/ComputerVision';
import { SampleTracking } from './components/pages/SampleTracking';
import { ChemicalManagement } from './components/pages/ChemicalManagement';
import { GasCylinders } from './components/pages/GasCylinders';
import { WasteManagement } from './components/pages/WasteManagement';
import { DemandForecasting } from './components/pages/DemandForecasting';
import { CompatibilityMonitoring } from './components/pages/CompatibilityMonitoring';
import { RootCauseAnalysis } from './components/pages/RootCauseAnalysis';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/ai-assistant" replace />} />
          <Route path="ai-assistant" element={<AIAssistant />} />
          <Route path="computer-vision" element={<ComputerVision />} />
          <Route path="sample-tracking" element={<SampleTracking />} />
          <Route path="chemical-management" element={<ChemicalManagement />} />
          <Route path="gas-cylinders" element={<GasCylinders />} />
          <Route path="waste-management" element={<WasteManagement />} />
          <Route path="demand-forecasting" element={<DemandForecasting />} />
          <Route path="compatibility-monitoring" element={<CompatibilityMonitoring />} />
          <Route path="root-cause-analysis" element={<RootCauseAnalysis />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
