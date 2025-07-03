
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Lightbulb, Target, Download, Share, Edit, Settings, Users } from "lucide-react";
import { toast } from "sonner";
import BrandSelector from "@/components/BrandSelector";
import StrategyTypeSelector from "@/components/StrategyTypeSelector";
import BusinessContextForm from "@/components/BusinessContextForm";
import AIModelSelector from "@/components/AIModelSelector";
import StrategyGenerator from "@/components/StrategyGenerator";
import StrategyEditor from "@/components/StrategyEditor";
import ResponsiveNavbar from "@/components/ResponsiveNavbar";
import ExplainWhyModal from "@/components/ExplainWhyModal";
import ActionTranslator from "@/components/ActionTranslator";
import StrategyFeedback from "@/components/StrategyFeedback";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [strategyType, setStrategyType] = useState(null);
  const [businessContext, setBusinessContext] = useState(null);
  const [aiModel, setAiModel] = useState(null);
  const [generatedStrategy, setGeneratedStrategy] = useState(null);

  const steps = [
    { title: "Brand Inspiration", icon: Lightbulb, component: BrandSelector },
    { title: "Strategy Type", icon: Target, component: StrategyTypeSelector },
    { title: "Business Context", icon: Users, component: BusinessContextForm },
    { title: "AI Model", icon: Settings, component: AIModelSelector },
    { title: "AI Generation", icon: Brain, component: StrategyGenerator },
    { title: "Edit & Export", icon: Edit, component: StrategyEditor }
  ];

  const handleNext = (data: any) => {
    if (currentStep === 0) setSelectedBrand(data);
    if (currentStep === 1) setStrategyType(data);
    if (currentStep === 2) setBusinessContext(data);
    if (currentStep === 3) setAiModel(data);
    if (currentStep === 4) setGeneratedStrategy(data);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Marketing Strategy - IntelMarkForge',
        text: 'Check out this AI-generated marketing strategy!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleExport = () => {
    if (generatedStrategy) {
      const blob = new Blob([generatedStrategy.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'marketing-strategy.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Strategy exported successfully!");
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BrandSelector
            onNext={handleNext}
            canGoBack={currentStep > 0}
          />
        );
      case 1:
        return (
          <StrategyTypeSelector
            onNext={handleNext}
            onPrevious={handlePrevious}
            selectedBrand={selectedBrand}
            canGoBack={currentStep > 0}
          />
        );
      case 2:
        return (
          <BusinessContextForm
            onNext={handleNext}
            onPrevious={handlePrevious}
            selectedBrand={selectedBrand}
            strategyType={strategyType}
            canGoBack={currentStep > 0}
          />
        );
      case 3:
        return (
          <AIModelSelector
            onNext={handleNext}
            onPrevious={handlePrevious}
            selectedBrand={selectedBrand}
            strategyType={strategyType}
            businessContext={businessContext}
            canGoBack={currentStep > 0}
          />
        );
      case 4:
        return (
          <StrategyGenerator
            onNext={handleNext}
            onPrevious={handlePrevious}
            selectedBrand={selectedBrand}
            strategyType={strategyType}
            businessContext={businessContext}
            aiModel={aiModel}
            canGoBack={currentStep > 0}
          />
        );
      case 5:
        return (
          <StrategyEditor
            onPrevious={handlePrevious}
            generatedStrategy={generatedStrategy}
            selectedBrand={selectedBrand}
            strategyType={strategyType}
            businessContext={businessContext}
            aiModel={aiModel}
            canGoBack={currentStep > 0}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <ResponsiveNavbar 
        showBackButton={currentStep > 0}
        onShare={generatedStrategy ? handleShare : undefined}
        onExport={generatedStrategy ? handleExport : undefined}
      />

      {/* Progress Indicator - Enhanced for mobile */}
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Mobile Progress Bar */}
        <div className="lg:hidden mb-6">
          <Card className="glass-card shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(((currentStep + 1) / steps.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className="gradient-primary h-2 rounded-full transition-all duration-300 shadow-blue"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {steps[currentStep].title}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Desktop Progress Indicator */}
        <div className="hidden lg:flex flex-col lg:flex-row items-center justify-between mb-8 space-y-4 lg:space-y-0">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={index} className="flex items-center w-full lg:w-auto">
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
                  ${isActive ? 'gradient-primary border-transparent text-white shadow-blue' : 
                    isCompleted ? 'gradient-secondary border-transparent text-white shadow-purple' : 
                    'border-gray-300 text-gray-500 bg-white shadow-soft'}
                `}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="ml-3 flex-1 lg:flex-none">
                  <p className={`font-medium ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    hidden lg:block w-24 h-0.5 mx-8 transition-all duration-300
                    ${isCompleted ? 'gradient-secondary' : 'bg-gray-300'}
                  `} />
                )}
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {renderCurrentStep()}
        </div>

        {/* Enhanced Features - Show on final step */}
        {currentStep === steps.length - 1 && generatedStrategy && (
          <div className="max-w-6xl mx-auto mt-8 space-y-6">
            <ActionTranslator 
              strategy={generatedStrategy.content}
              onActionPlan={(actions) => console.log('Action plan:', actions)}
            />
            <StrategyFeedback 
              strategyId={generatedStrategy.id}
              onFeedbackSubmit={(feedback) => console.log('Feedback:', feedback)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
