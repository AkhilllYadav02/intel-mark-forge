
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import SavedStrategies from "./pages/SavedStrategies";
import Templates from "./pages/Templates";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import ResponsiveFooter from "./components/ResponsiveFooter";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const showFooter = location.pathname === '/';

  return (
    <div className="min-h-screen gradient-soft">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/app/create" element={<Index />} />
        <Route path="/app/strategies" element={<SavedStrategies />} />
        <Route path="/app/templates" element={<Templates />} />
        <Route path="/app/settings" element={<Settings />} />
        <Route path="/app/help" element={<Help />} />
      </Routes>
      {showFooter && <ResponsiveFooter />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div>
        <Toaster />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
