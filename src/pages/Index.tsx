
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

  const CurrentComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">IntelMarkForge</h1>
                <p className="text-blue-200 text-sm">AI-Powered Marketing Strategy Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                Multi-LLM Powered
              </Badge>
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={index} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
                  ${isActive ? 'bg-purple-500 border-purple-500 text-white' : 
                    isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                    'border-white/30 text-white/60'}
                `}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="ml-3">
                  <p className={`font-medium ${isActive ? 'text-white' : 'text-white/60'}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-24 h-0.5 mx-8 transition-all duration-300
                    ${isCompleted ? 'bg-green-500' : 'bg-white/20'}
                  `} />
                )}
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <CurrentComponent
            onNext={handleNext}
            onPrevious={handlePrevious}
            selectedBrand={selectedBrand}
            businessContext={businessContext}
            generatedStrategy={generatedStrategy}
            canGoBack={currentStep > 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
