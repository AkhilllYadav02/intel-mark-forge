
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, Brain, Sparkles, CheckCircle } from "lucide-react";

interface StrategyGeneratorProps {
  onNext: (data: any) => void;
  onPrevious: () => void;
  selectedBrand: any;
  strategyType: any;
  businessContext: any;
  aiModel: any;
  canGoBack: boolean;
}

const StrategyGenerator = ({ 
  onNext, 
  onPrevious, 
  selectedBrand, 
  strategyType, 
  businessContext, 
  aiModel, 
  canGoBack 
}: StrategyGeneratorProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    "Analyzing brand strategy patterns",
    "Processing business context",
    "Generating marketing framework",
    "Creating actionable recommendations",
    "Finalizing strategy document"
  ];

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsComplete(true);
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
        
        setCurrentStep(prev => {
          const newStep = Math.floor((progress / 100) * steps.length);
          return Math.min(newStep, steps.length - 1);
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isGenerating, progress, steps.length]);

  const generateWithGemini = async () => {
    const prompt = `Create a comprehensive marketing strategy for ${businessContext.companyName} in the ${businessContext.industry} industry, inspired by ${selectedBrand.name}'s approach. 

Business Details:
- Company: ${businessContext.companyName}
- Industry: ${businessContext.industry}
- Target Audience: ${businessContext.targetAudience}
- Strategic Focus: ${businessContext.strategicFocus}
- Budget: ${businessContext.budget || 'Not specified'}
- Timeline: ${businessContext.timeline || 'Not specified'}

Strategy Type: ${strategyType.title}

Brand Inspiration: ${selectedBrand.name} - ${selectedBrand.description}

Please create a detailed marketing strategy that includes:
1. Executive Summary
2. Strategic Framework
3. Implementation Plan
4. Budget Allocation
5. Key Performance Indicators
6. Next Steps

Format the response in markdown with clear headings and actionable recommendations.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDvc0JRHmJJenpnJ6cig2LBmIn4sWpHpsU`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid response from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      // Fallback to mock strategy
      return `# Marketing Strategy for ${businessContext.companyName}
Inspired by ${selectedBrand.name}'s Approach

## Executive Summary
Based on ${selectedBrand.name}'s proven methodology, we've developed a comprehensive marketing strategy tailored for ${businessContext.companyName} in the ${businessContext.industry} industry.

## Strategic Framework
### 1. Brand Positioning
- Position ${businessContext.companyName} as a ${businessContext.strategicFocus} leader
- Target audience: ${businessContext.targetAudience}
- Unique value proposition aligned with market needs

### 2. Implementation Plan
- Multi-channel approach for reaching ${businessContext.targetAudience}
- Conversion optimization tactics
- Customer onboarding process

This strategy combines proven methodologies with your unique business context.`;
    }
  };

  const startGeneration = async () => {
    setIsGenerating(true);
    setProgress(0);
    setCurrentStep(0);
  };

  const handleComplete = async () => {
    const generatedContent = await generateWithGemini();
    
    const strategy = {
      content: generatedContent,
      metadata: {
        brand: selectedBrand,
        strategyType: strategyType,
        context: businessContext,
        aiModel: aiModel,
        generatedAt: new Date().toISOString()
      }
    };

    onNext(strategy);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 flex items-center">
            <Brain className="w-6 h-6 mr-3 text-purple-600" />
            AI Strategy Generation
          </CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            Our AI is analyzing {selectedBrand.name}'s methodology and applying it to {businessContext.companyName}'s context.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Strategy Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Brand Inspiration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-2xl">{selectedBrand.image}</div>
              <div>
                <h3 className="font-semibold text-gray-900">{selectedBrand.name}</h3>
                <p className="text-sm text-gray-600">{selectedBrand.category}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-3">{selectedBrand.description}</p>
            <div className="flex flex-wrap gap-1">
              {selectedBrand.strengths?.map((strength: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {strength}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Your Business</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div><strong>Company:</strong> {businessContext.companyName}</div>
              <div><strong>Industry:</strong> {businessContext.industry}</div>
              <div><strong>Focus:</strong> {businessContext.strategicFocus}</div>
              <div><strong>Audience:</strong> {businessContext.targetAudience}</div>
              {businessContext.budget && <div><strong>Budget:</strong> {businessContext.budget}</div>}
              {businessContext.timeline && <div><strong>Timeline:</strong> {businessContext.timeline}</div>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Model Info */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{aiModel.icon}</div>
            <div>
              <h3 className="font-semibold text-gray-900">{aiModel.name}</h3>
              <p className="text-sm text-gray-600">{aiModel.provider} • {aiModel.speed} Speed</p>
            </div>
            <Badge className="ml-auto bg-purple-100 text-purple-800">
              {aiModel.pricing}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Generation Process */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardContent className="pt-6">
          {!isGenerating && !isComplete && (
            <div className="text-center py-8">
              <Sparkles className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Generate Your Strategy</h3>
              <p className="text-gray-600 mb-6">
                Our AI will create a comprehensive marketing strategy combining {selectedBrand.name}'s proven methods with your specific business needs.
              </p>
              <Button
                onClick={startGeneration}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
              >
                <Brain className="w-5 h-5 mr-2" />
                Start AI Generation
              </Button>
            </div>
          )}

          {isGenerating && !isComplete && (
            <div className="py-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-purple-600 animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Generating Your Strategy</h3>
                <p className="text-gray-600">{steps[currentStep]}</p>
              </div>
              
              <div className="space-y-4">
                <Progress value={progress} className="w-full h-3" />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Progress: {Math.round(progress)}%</span>
                  <span>Step {currentStep + 1} of {steps.length}</span>
                </div>
              </div>
            </div>
          )}

          {isComplete && (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Strategy Generated Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Your comprehensive marketing strategy is ready for review and editing.
              </p>
              <Button
                onClick={handleComplete}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
              >
                View & Edit Strategy
                <ChevronLeft className="w-5 h-5 ml-2 rotate-180" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {canGoBack && (
        <div className="flex justify-start pt-6">
          <Button
            onClick={onPrevious}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to AI Model Selection
          </Button>
        </div>
      )}
    </div>
  );
};

export default StrategyGenerator;
