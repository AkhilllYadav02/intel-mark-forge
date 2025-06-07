
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Target, Users, Megaphone, Rocket, Heart, Brain } from "lucide-react";

const strategyTypes = [
  {
    id: "customer-acquisition",
    title: "Customer Acquisition",
    description: "Strategies to attract and convert new customers",
    icon: Users,
    features: ["Lead generation", "Conversion optimization", "Growth hacking", "Performance marketing"]
  },
  {
    id: "marketing-campaign",
    title: "Marketing Campaign",
    description: "Comprehensive campaign strategies for brand promotion",
    icon: Megaphone,
    features: ["Campaign planning", "Multi-channel approach", "Brand messaging", "Creative strategy"]
  },
  {
    id: "product-launch",
    title: "Product Launch",
    description: "Go-to-market strategies for new product introductions",
    icon: Rocket,
    features: ["Launch timeline", "Market positioning", "PR strategy", "Early adopter targeting"]
  },
  {
    id: "brand-positioning",
    title: "Brand Positioning",
    description: "Strategies to establish and strengthen brand identity",
    icon: Target,
    features: ["Brand differentiation", "Value proposition", "Market positioning", "Competitive analysis"]
  },
  {
    id: "customer-retention",
    title: "Customer Retention",
    description: "Strategies to keep existing customers engaged and loyal",
    icon: Heart,
    features: ["Loyalty programs", "Customer experience", "Retention campaigns", "Upselling strategies"]
  },
  {
    id: "general-marketing",
    title: "General Marketing Advice",
    description: "Comprehensive marketing strategy and business growth advice",
    icon: Brain,
    features: ["Strategic planning", "Market analysis", "Growth opportunities", "Best practices"]
  }
];

interface StrategyTypeSelectorProps {
  onNext: (data: any) => void;
  onPrevious: () => void;
  selectedBrand: any;
  canGoBack: boolean;
}

const StrategyTypeSelector = ({ onNext, onPrevious, selectedBrand, canGoBack }: StrategyTypeSelectorProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
  };

  const handleContinue = () => {
    const selectedStrategyType = strategyTypes.find(type => type.id === selectedType);
    if (selectedStrategyType) {
      onNext(selectedStrategyType);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 flex items-center">
            <Target className="w-6 h-6 mr-3 text-blue-600" />
            Choose Your Strategy Type
          </CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            Select the type of marketing strategy you want to create using {selectedBrand?.name}'s approach.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {strategyTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <Card
              key={type.id}
              className={`
                cursor-pointer transition-all duration-300 border-2
                ${selectedType === type.id 
                  ? 'bg-blue-50 border-blue-300 shadow-lg ring-2 ring-blue-200' 
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                }
              `}
              onClick={() => handleTypeSelect(type.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${selectedType === type.id ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      <IconComponent className={`w-6 h-6 ${selectedType === type.id ? 'text-blue-600' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <CardTitle className="text-gray-900 text-lg">{type.title}</CardTitle>
                    </div>
                  </div>
                  {selectedType === type.id && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-900">Key Features:</h4>
                  <ul className="space-y-1">
                    {type.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-between pt-6">
        {canGoBack && (
          <Button
            onClick={onPrevious}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Brand Selection
          </Button>
        )}
        
        <Button
          onClick={handleContinue}
          disabled={!selectedType}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg ml-auto"
        >
          Continue to Business Details
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default StrategyTypeSelector;
