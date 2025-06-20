
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ClipboardList, CheckCircle, Calendar, User, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface ActionTranslatorProps {
  strategy: string;
  onActionPlan?: (actions: any[]) => void;
}

const ActionTranslator = ({ strategy, onActionPlan }: ActionTranslatorProps) => {
  const [actionItems, setActionItems] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [completedItems, setCompletedItems] = useState(new Set());

  const generateActionPlan = async () => {
    setIsGenerating(true);
    
    // Simulate API call to convert strategy to actionable items
    setTimeout(() => {
      const actions = [
        {
          id: 1,
          title: "Define Target Audience Personas",
          description: "Create detailed buyer personas based on strategy insights",
          priority: "High",
          timeline: "Week 1",
          assignee: "Marketing Team",
          category: "Research"
        },
        {
          id: 2,
          title: "Set Up Social Media Accounts",
          description: "Create and optimize profiles on recommended platforms",
          priority: "High",
          timeline: "Week 1-2",
          assignee: "Social Media Manager",
          category: "Setup"
        },
        {
          id: 3,
          title: "Develop Content Calendar",
          description: "Plan content themes and posting schedule",
          priority: "Medium",
          timeline: "Week 2",
          assignee: "Content Creator",
          category: "Planning"
        },
        {
          id: 4,
          title: "Launch Awareness Campaign",
          description: "Execute initial brand awareness campaign",
          priority: "High",
          timeline: "Week 3-4",
          assignee: "Marketing Team",
          category: "Execution"
        },
        {
          id: 5,
          title: "Implement Analytics Tracking",
          description: "Set up tracking for campaign performance",
          priority: "Medium",
          timeline: "Week 2",
          assignee: "Analytics Team",
          category: "Measurement"
        }
      ];
      
      setActionItems(actions);
      setIsGenerating(false);
      onActionPlan?.(actions);
      toast.success("Action plan generated successfully!");
    }, 2000);
  };

  const toggleCompletion = (itemId: number) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(itemId)) {
      newCompleted.delete(itemId);
    } else {
      newCompleted.add(itemId);
    }
    setCompletedItems(newCompleted);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-700 border-red-200";
      case "Medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Low": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-purple-700">
          <ClipboardList className="w-6 h-6 mr-3" />
          Strategy to Action Plan
        </CardTitle>
        <CardDescription>
          Convert your marketing strategy into actionable tasks and timelines
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {actionItems.length === 0 ? (
          <div className="text-center py-8">
            <ClipboardList className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              Transform your strategy into a step-by-step action plan
            </p>
            <Button 
              onClick={generateActionPlan}
              disabled={isGenerating}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Generate Action Plan
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-gray-900">Action Items</h4>
              <Badge variant="secondary">
                {completedItems.size}/{actionItems.length} Completed
              </Badge>
            </div>
            
            {actionItems.map((item) => (
              <div 
                key={item.id}
                className={`p-4 border rounded-lg transition-all ${
                  completedItems.has(item.id) 
                    ? 'bg-green-50 border-green-200 opacity-75' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={completedItems.has(item.id)}
                    onCheckedChange={() => toggleCompletion(item.id)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h5 className={`font-medium ${
                        completedItems.has(item.id) ? 'line-through text-gray-500' : 'text-gray-900'
                      }`}>
                        {item.title}
                      </h5>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {item.timeline}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className={`text-sm ${
                      completedItems.has(item.id) ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {item.description}
                    </p>
                    
                    <div className="flex items-center text-xs text-gray-500">
                      <User className="w-3 h-3 mr-1" />
                      {item.assignee} • {item.category}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <Button 
              onClick={generateActionPlan}
              variant="outline"
              className="w-full mt-4"
              disabled={isGenerating}
            >
              Regenerate Action Plan
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActionTranslator;
