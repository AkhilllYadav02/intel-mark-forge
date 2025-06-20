
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MessageSquare, ThumbsUp, ThumbsDown, Star, Send } from "lucide-react";
import { toast } from "sonner";

interface StrategyFeedbackProps {
  strategyId?: string;
  onFeedbackSubmit?: (feedback: any) => void;
}

const StrategyFeedback = ({ strategyId, onFeedbackSubmit }: StrategyFeedbackProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState("");
  const [effectiveness, setEffectiveness] = useState("");
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!rating || !effectiveness) {
      toast.error("Please provide a rating and effectiveness feedback");
      return;
    }

    setIsSubmitting(true);
    
    const feedback = {
      strategyId,
      rating,
      effectiveness,
      comments,
      timestamp: new Date().toISOString()
    };

    // Simulate API call
    setTimeout(() => {
      onFeedbackSubmit?.(feedback);
      setIsSubmitting(false);
      setIsOpen(false);
      toast.success("Thank you for your feedback! This helps us improve our AI recommendations.");
      
      // Reset form
      setRating("");
      setEffectiveness("");
      setComments("");
    }, 1000);
  };

  return (
    <Card className="w-full border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
      <CardHeader>
        <CardTitle className="flex items-center text-orange-700">
          <MessageSquare className="w-6 h-6 mr-3" />
          Strategy Feedback
        </CardTitle>
        <CardDescription>
          Help us improve by sharing how this strategy performed for your brand
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!isOpen ? (
          <div className="text-center py-4">
            <p className="text-gray-600 mb-4">
              Did this strategy work for your brand? Your feedback helps improve our AI.
            </p>
            <Button 
              onClick={() => setIsOpen(true)}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Star className="w-4 h-4 mr-2" />
              Provide Feedback
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Overall Rating */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Overall Strategy Rating</Label>
              <RadioGroup value={rating} onValueChange={setRating}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="excellent" id="excellent" />
                    <Label htmlFor="excellent" className="flex items-center cursor-pointer">
                      <ThumbsUp className="w-4 h-4 mr-1 text-green-600" />
                      Excellent
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="good" />
                    <Label htmlFor="good" className="cursor-pointer">Good</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="average" id="average" />
                    <Label htmlFor="average" className="cursor-pointer">Average</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poor" id="poor" />
                    <Label htmlFor="poor" className="flex items-center cursor-pointer">
                      <ThumbsDown className="w-4 h-4 mr-1 text-red-600" />
                      Poor
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Effectiveness */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">How effective was this strategy?</Label>
              <RadioGroup value={effectiveness} onValueChange={setEffectiveness}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very_effective" id="very_effective" />
                    <Label htmlFor="very_effective" className="cursor-pointer">
                      Very effective - Significant positive results
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="somewhat_effective" id="somewhat_effective" />
                    <Label htmlFor="somewhat_effective" className="cursor-pointer">
                      Somewhat effective - Some positive results
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not_effective" id="not_effective" />
                    <Label htmlFor="not_effective" className="cursor-pointer">
                      Not effective - No significant results
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="too_early" id="too_early" />
                    <Label htmlFor="too_early" className="cursor-pointer">
                      Too early to tell
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Comments */}
            <div className="space-y-2">
              <Label htmlFor="comments" className="text-sm font-medium">
                Additional Comments (Optional)
              </Label>
              <Textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="What worked well? What could be improved? Any specific results you'd like to share?"
                className="min-h-[100px]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting || !rating || !effectiveness}
                className="bg-orange-600 hover:bg-orange-700 flex-1"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Feedback
                  </>
                )}
              </Button>
              <Button 
                onClick={() => setIsOpen(false)}
                variant="outline"
                className="border-orange-300 text-orange-700 hover:bg-orange-50"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StrategyFeedback;
