
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Brain, Zap, Star, Clock } from "lucide-react";

const aiModels = [
  {
    id: "auto",
    name: "Auto-Select Best",
    provider: "Multi-LLM",
    description: "Let our system automatically choose the best AI model for your specific strategy type and context",
    strengths: ["Optimized results", "Adaptive selection", "Best performance"],
    pricing: "Included",
    speed: "Smart",
    recommended: true,
    icon: "🤖"
  },
  {
    id: "gpt-4",
    name: "GPT-4",
    provider: "OpenAI",
    description: "Advanced reasoning capabilities with excellent creative and strategic thinking",
    strengths: ["Creative strategies", "Complex reasoning", "Comprehensive analysis"],
    pricing: "Premium",
    speed: "Fast",
    recommended: false,
    icon: "🧠"
  },
  {
    id: "claude",
    name: "Claude",
    provider: "Anthropic",
    description: "Analytical and detailed approach with strong focus on ethical and practical strategies",
    strengths: ["Analytical depth", "Practical advice", "Risk assessment"],
    pricing: "Premium",
    speed: "Medium",
    recommended: false,
    icon: "⚡"
  },
  {
    id: "gemini",
    name: "Gemini",
    provider: "Google",
    description: "Multimodal AI with strong data analysis and market research capabilities",
    strengths: ["Market analysis", "Data insights", "Trend identification"],
    pricing: "Standard",
    speed: "Fast",
    recommended: false,
    icon: "💎"
  },
  {
    id: "blend",
    name: "Multi-LLM Blend",
    provider: "Combined",
    description: "Combines insights from multiple AI models for the most comprehensive strategy",
    strengths: ["Comprehensive view", "Multiple perspectives", "Validated insights"],
    pricing: "Premium+",
    speed: "Slower",
    recommended: false,
    icon: "🌟"
  }
];

interface AIModelSelectorProps {
  onNext: (data: any) => void;
  onPrevious: () => void;
  selectedBrand: any;
  strategyType: any;
  businessContext: any;
  canGoBack: boolean;
}

const AIModelSelector = ({ onNext, onPrevious, selectedBrand, strategyType, businessContext, canGoBack }: AIModelSelectorProps) => {
  const [selectedModel, setSelectedModel] = useState<string>("auto");

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
  };

  const handleContinue = () => {
    const selectedAiModel = aiModels.find(model => model.id === selectedModel);
    if (selectedAiModel) {
      onNext(selectedAiModel);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 flex items-center">
            <Brain className="w-6 h-6 mr-3 text-purple-600" />
            Choose Your AI Model
          </CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            Select the AI model that will generate your {strategyType?.title} strategy inspired by {selectedBrand?.name}.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Strategy Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Strategy Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Brand Inspiration:</span>
              <p className="text-gray-600">{selectedBrand?.name}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Strategy Type:</span>
              <p className="text-gray-600">{strategyType?.title}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Business:</span>
              <p className="text-gray-600">{businessContext?.companyName}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {aiModels.map((model) => (
          <Card
            key={model.id}
            className={`
              cursor-pointer transition-all duration-300 border-2 relative
              ${selectedModel === model.id 
                ? 'bg-purple-50 border-purple-300 shadow-lg ring-2 ring-purple-200' 
                : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
              }
            `}
            onClick={() => handleModelSelect(model.id)}
          >
            {model.recommended && (
              <div className="absolute -top-3 left-4">
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                  <Star className="w-3 h-3 mr-1" />
                  Recommended
                </Badge>
              </div>
            )}
            
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{model.icon}</div>
                  <div>
                    <CardTitle className="text-gray-900 text-lg">{model.name}</CardTitle>
                    <p className="text-sm text-gray-500">{model.provider}</p>
                  </div>
                </div>
                {selectedModel === model.id && (
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-600 mb-4">{model.description}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm text-gray-900 mb-2">Key Strengths:</h4>
                  <div className="flex flex-wrap gap-1">
                    {model.strengths.map((strength, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-green-300 text-green-700 bg-green-50">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Speed: {model.speed}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{model.pricing}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-6">
        {canGoBack && (
          <Button
            onClick={onPrevious}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Business Details
          </Button>
        )}
        
        <Button
          onClick={handleContinue}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg ml-auto"
        >
          Generate Strategy
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default AIModelSelector;
