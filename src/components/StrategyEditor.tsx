
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { 
  Download, Share, ChevronLeft, Edit, Save, Copy, 
  FileText, RefreshCw, Sparkles 
} from "lucide-react";

interface StrategyEditorProps {
  onPrevious: () => void;
  generatedStrategy: any;
  canGoBack: boolean;
}

const StrategyEditor = ({ onPrevious, generatedStrategy }: StrategyEditorProps) => {
  const [editedContent, setEditedContent] = useState(generatedStrategy?.content || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Strategy Saved",
      description: "Your marketing strategy has been saved successfully.",
    });
  };

  const handleExportPDF = () => {
    // Simulate PDF generation
    toast({
      title: "PDF Export",
      description: "Your strategy is being prepared for download as PDF.",
    });
  };

  const handleExportText = () => {
    const element = document.createElement("a");
    const file = new Blob([editedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${generatedStrategy?.metadata?.context?.companyName || 'marketing'}_strategy.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Text Export",
      description: "Your strategy has been downloaded as a text file.",
    });
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(editedContent);
    toast({
      title: "Copied to Clipboard",
      description: "Strategy content has been copied to your clipboard.",
    });
  };

  const handleShareLink = () => {
    // Simulate sharing functionality
    toast({
      title: "Share Link Generated",
      description: "A shareable link has been created for collaboration.",
    });
  };

  const generateVariant = () => {
    toast({
      title: "Generating Variant",
      description: "Creating an alternative strategy version...",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center">
            <Edit className="w-6 h-6 mr-3 text-green-400" />
            Strategy Editor & Export
          </CardTitle>
          <CardDescription className="text-blue-200 text-lg">
            Customize your AI-generated strategy and export it in your preferred format.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Strategy Metadata */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              Brand: {generatedStrategy?.metadata?.brand?.name}
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              Company: {generatedStrategy?.metadata?.context?.companyName}
            </Badge>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              Focus: {generatedStrategy?.metadata?.context?.strategicFocus}
            </Badge>
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
              Industry: {generatedStrategy?.metadata?.context?.industry}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10"
        >
          <Edit className="w-4 h-4 mr-2" />
          {isEditing ? "Preview" : "Edit"}
        </Button>
        
        <Button
          onClick={generateVariant}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Generate Variant
        </Button>
        
        <Button
          onClick={handleCopyToClipboard}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy
        </Button>
        
        <Button
          onClick={handleShareLink}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10"
        >
          <Share className="w-4 h-4 mr-2" />
          Share
        </Button>
        
        <Button
          onClick={handleExportText}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <FileText className="w-4 h-4 mr-2" />
          Export Text
        </Button>
        
        <Button
          onClick={handleExportPDF}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>

      {/* Strategy Content */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>Your Marketing Strategy</span>
            {isEditing && (
              <Button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="min-h-[600px] bg-black/20 border-white/20 text-white font-mono text-sm leading-relaxed"
              placeholder="Edit your strategy here..."
            />
          ) : (
            <div className="bg-black/20 rounded-lg p-6 max-h-[600px] overflow-y-auto">
              <pre className="text-white/90 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                {editedContent}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/5 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Export Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={handleExportText}
              variant="outline" 
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              <FileText className="w-4 h-4 mr-2" />
              Plain Text (.txt)
            </Button>
            <Button 
              onClick={handleExportPDF}
              variant="outline" 
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              PDF Document
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-white/20 text-white hover:bg-white/10"
              onClick={() => toast({ title: "Coming Soon", description: "Markdown export will be available soon." })}
            >
              <FileText className="w-4 h-4 mr-2" />
              Markdown (.md)
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Strategy Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={generateVariant}
              variant="outline" 
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Alternative
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-white/20 text-white hover:bg-white/10"
              onClick={() => toast({ title: "Coming Soon", description: "Executive summary generation coming soon." })}
            >
              <FileText className="w-4 h-4 mr-2" />
              Executive Summary
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-white/20 text-white hover:bg-white/10"
              onClick={() => toast({ title: "Coming Soon", description: "Action plan generation coming soon." })}
            >
              <Edit className="w-4 h-4 mr-2" />
              Action Plan
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          onClick={onPrevious}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Generation
        </Button>
        
        <Button
          onClick={() => toast({ title: "Success!", description: "Your marketing strategy is ready to implement!" })}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Strategy Complete
        </Button>
      </div>
    </div>
  );
};

export default StrategyEditor;
