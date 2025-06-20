
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Download, Share, Save, RefreshCw, Edit3, Copy, FileText } from "lucide-react";
import { toast } from "sonner";

interface StrategyEditorProps {
  onPrevious: () => void;
  generatedStrategy: any;
  selectedBrand: any;
  strategyType: any;
  businessContext: any;
  aiModel: any;
  canGoBack: boolean;
}

const StrategyEditor = ({ 
  onPrevious, 
  generatedStrategy, 
  selectedBrand,
  strategyType,
  businessContext,
  aiModel,
  canGoBack 
}: StrategyEditorProps) => {
  const [editedContent, setEditedContent] = useState(generatedStrategy?.content || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    toast.success("Strategy saved successfully!");
  };

  const handleExport = (format: string) => {
    const blob = new Blob([editedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marketing-strategy-${businessContext.companyName}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Strategy exported as ${format.toUpperCase()}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Marketing Strategy for ${businessContext.companyName}`,
        text: editedContent.substring(0, 100) + "...",
      });
    } else {
      navigator.clipboard.writeText(editedContent);
      toast.success("Strategy copied to clipboard!");
    }
  };

  const regenerateStrategy = async () => {
    toast.info("Regenerating strategy with Gemini AI...");
    // Add regeneration logic here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 flex items-center">
            <Edit3 className="w-6 h-6 mr-3 text-blue-600" />
            Edit & Export Strategy
          </CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            Review, edit, and export your AI-generated marketing strategy for {businessContext.companyName}.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Strategy Metadata */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Brand Inspiration:</span>
              <p className="text-gray-900">{selectedBrand.name}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Strategy Type:</span>
              <p className="text-gray-900">{strategyType.title}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">AI Model:</span>
              <p className="text-gray-900">{aiModel.name}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Generated:</span>
              <p className="text-gray-900">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "default" : "outline"}
          className="flex-1 sm:flex-none"
        >
          <Edit3 className="w-4 h-4 mr-2" />
          {isEditing ? "Preview" : "Edit"}
        </Button>
        
        <Button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        
        <Button
          onClick={regenerateStrategy}
          variant="outline"
          className="flex-1 sm:flex-none"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Regenerate
        </Button>
        
        <Button
          onClick={handleShare}
          variant="outline"
          className="flex-1 sm:flex-none"
        >
          <Share className="w-4 h-4 mr-2" />
          Share
        </Button>
        
        <div className="flex gap-2">
          <Button
            onClick={() => handleExport("txt")}
            variant="outline"
            size="sm"
          >
            <FileText className="w-4 h-4 mr-1" />
            TXT
          </Button>
          <Button
            onClick={() => handleExport("md")}
            variant="outline"
            size="sm"
          >
            <Download className="w-4 h-4 mr-1" />
            MD
          </Button>
        </div>
      </div>

      {/* Strategy Content */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardContent className="pt-6">
          {isEditing ? (
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="min-h-[600px] font-mono text-sm border-gray-300 focus:border-blue-500"
              placeholder="Edit your marketing strategy here..."
            />
          ) : (
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {editedContent}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      {canGoBack && (
        <div className="flex justify-start pt-6">
          <Button
            onClick={onPrevious}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Generation
          </Button>
        </div>
      )}
    </div>
  );
};

export default StrategyEditor;
