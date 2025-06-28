
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Web3Provider } from "./contexts/Web3Context";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import UpgradeProfile from "./pages/UpgradeProfile";
import Services from "./pages/Services";
import NotarizationService from "./pages/NotarizationService";
import LightningService from "./pages/LightningService";
import CarbonCreditService from "./pages/CarbonCreditService";
import BusinessDashboard from "./pages/BusinessDashboard";
import KYC from "./pages/KYC";
import BusinessKYC from "./pages/BusinessKYC";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Web3Provider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/kyc" element={<KYC />} />
            <Route path="/business-kyc" element={<BusinessKYC />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/upgrade-profile" element={<UpgradeProfile />} />
            <Route path="/dashboard/services" element={<Services />} />
            <Route path="/dashboard/services/notarization" element={<NotarizationService />} />
            <Route path="/dashboard/services/lightning" element={<LightningService />} />
            <Route path="/dashboard/services/carbon-credits" element={<CarbonCreditService />} />
            <Route path="/business-dashboard" element={<BusinessDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </Web3Provider>
  </QueryClientProvider>
);

export default App;
