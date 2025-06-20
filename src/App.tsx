
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import SavedStrategies from "./pages/SavedStrategies";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import ResponsiveFooter from "./components/ResponsiveFooter";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const showFooter = location.pathname === '/';

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/app/create" element={<Index />} />
        <Route path="/app/strategies" element={<SavedStrategies />} />
        <Route path="/app/settings" element={<Settings />} />
        <Route path="/app/help" element={<Help />} />
      </Routes>
      {showFooter && <ResponsiveFooter />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
