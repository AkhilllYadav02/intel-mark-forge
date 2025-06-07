
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Lightbulb, Target, Download, Share, Edit } from "lucide-react";
import BrandSelector from "@/components/BrandSelector";
import BusinessContextForm from "@/components/BusinessContextForm";
import StrategyGenerator from "@/components/StrategyGenerator";
import StrategyEditor from "@/components/StrategyEditor";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [businessContext, setBusinessContext] = useState(null);
  const [generatedStrategy, setGeneratedStrategy] = useState(null);

  const steps = [
    { title: "Brand Inspiration", icon: Lightbulb, component: BrandSelector },
    { title: "Business Context", icon: Target, component: BusinessContextForm },
    { title: "AI Strategy Generation", icon: Brain, component: StrategyGenerator },
    { title: "Edit & Export", icon: Edit, component: StrategyEditor }
  ];

  const handleNext = (data: any) => {
    if (currentStep === 0) setSelectedBrand(data);
    if (currentStep === 1) setBusinessContext(data);
    if (currentStep === 2) setGeneratedStrategy(data);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
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
          <BusinessContextForm
            onNext={handleNext}
            onPrevious={handlePrevious}
            selectedBrand={selectedBrand}
            canGoBack={currentStep > 0}
          />
        );
      case 2:
        return (
          <StrategyGenerator
            onNext={handleNext}
            onPrevious={handlePrevious}
            selectedBrand={selectedBrand}
            businessContext={businessContext}
            canGoBack={currentStep > 0}
          />
        );
      case 3:
        return (
          <StrategyEditor
            onPrevious={handlePrevious}
            generatedStrategy={generatedStrategy}
            canGoBack={currentStep > 0}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">IntelMarkForge</h1>
                <p className="text-indigo-600 text-sm">AI-Powered Marketing Strategy Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                Multi-LLM Powered
              </Badge>
              <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8 space-y-4 lg:space-y-0">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={index} className="flex items-center w-full lg:w-auto">
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
                  ${isActive ? 'bg-indigo-500 border-indigo-500 text-white' : 
                    isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                    'border-gray-300 text-gray-400 bg-white'}
                `}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="ml-3 flex-1 lg:flex-none">
                  <p className={`font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    hidden lg:block w-24 h-0.5 mx-8 transition-all duration-300
                    ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
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
      </div>
    </div>
  );
};

export default Index;
