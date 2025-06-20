
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Lightbulb, Target, Users, TrendingUp } from "lucide-react";

interface ExplainWhyModalProps {
  strategySection: string;
  explanation?: string;
}

const ExplainWhyModal = ({ strategySection, explanation }: ExplainWhyModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getExplanation = () => {
    if (explanation) return explanation;
    
    // Default explanations based on common strategy sections
    const explanations = {
      "target_audience": "This target audience was selected based on demographic analysis, market research, and the brand's positioning strategy. The AI considers factors like purchasing power, digital behavior, and brand affinity.",
      "marketing_channels": "These channels were recommended based on where your target audience is most active, budget efficiency, and proven performance metrics from similar brands.",
      "messaging": "This messaging framework aligns with your brand inspiration while addressing your specific market position and competitive landscape.",
      "timeline": "This timeline considers industry standards, campaign complexity, and optimal market timing for maximum impact.",
      "budget_allocation": "Budget distribution is based on channel effectiveness, reach potential, and ROI projections from similar campaigns."
    };

    return explanations[strategySection.toLowerCase()] || "The AI analyzed multiple factors including market trends, competitor strategies, and your specific business context to generate this recommendation.";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-blue-50">
          <HelpCircle className="h-4 w-4 text-blue-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-blue-700">
            <Lightbulb className="w-5 h-5 mr-2" />
            Why This Recommendation?
          </DialogTitle>
          <DialogDescription className="text-left">
            Understanding the AI's reasoning for: <strong>{strategySection}</strong>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700 leading-relaxed">
              {getExplanation()}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              <Target className="w-3 h-3 mr-1" />
              Data-Driven
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Users className="w-3 h-3 mr-1" />
              Audience-Focused
            </Badge>
            <Badge variant="outline" className="text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              Performance-Optimized
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExplainWhyModal;
