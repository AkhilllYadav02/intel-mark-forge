import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Brain, FileText, Globe, Check, X } from "lucide-react";
import { toast } from "sonner";

interface BrandMemory {
  id: string;
  type: "tone_guide" | "content" | "website" | "campaign";
  title: string;
  content: string;
  createdAt: string;
}

interface BrandToneTrainerProps {
  onBrandMemoryUpdate: (memories: BrandMemory[]) => void;
  existingMemories?: BrandMemory[];
}

const BrandToneTrainer = ({ onBrandMemoryUpdate, existingMemories = [] }: BrandToneTrainerProps) => {
  const [memories, setMemories] = useState<BrandMemory[]>(existingMemories);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Form states
  const [toneGuide, setToneGuide] = useState("");
  const [toneTitle, setToneTitle] = useState("");
  const [contentSample, setContentSample] = useState("");
  const [contentTitle, setContentTitle] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  const addMemory = (memory: Omit<BrandMemory, 'id' | 'createdAt'>) => {
    const newMemory: BrandMemory = {
      ...memory,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const updatedMemories = [...memories, newMemory];
    setMemories(updatedMemories);
    onBrandMemoryUpdate(updatedMemories);
    toast("Brand memory added successfully!");
  };

  const removeMemory = (id: string) => {
    const updatedMemories = memories.filter(m => m.id !== id);
    setMemories(updatedMemories);
    onBrandMemoryUpdate(updatedMemories);
    toast("Brand memory removed");
  };

  const handleToneGuideSubmit = () => {
    if (!toneTitle || !toneGuide) {
      toast("Please fill in all fields");
      return;
    }
    
    addMemory({
      type: "tone_guide",
      title: toneTitle,
      content: toneGuide
    });
    
    setToneTitle("");
    setToneGuide("");
  };

  const handleContentSampleSubmit = () => {
    if (!contentTitle || !contentSample) {
      toast("Please fill in all fields");
      return;
    }
    
    addMemory({
      type: "content",
      title: contentTitle,
      content: contentSample
    });
    
    setContentTitle("");
    setContentSample("");
  };

  const handleWebsiteAnalysis = async () => {
    if (!websiteUrl) {
      toast("Please enter a website URL");
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // Simulate website analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      addMemory({
        type: "website",
        title: `Website Analysis: ${websiteUrl}`,
        content: `Analyzed tone and voice patterns from ${websiteUrl}. Key characteristics: Professional, friendly, solution-oriented communication style with emphasis on customer success and innovation.`
      });
      
      setWebsiteUrl("");
      toast("Website analyzed and added to brand memory!");
    } catch (error) {
      toast("Failed to analyze website. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "tone_guide": return <FileText className="w-4 h-4" />;
      case "content": return <Brain className="w-4 h-4" />;
      case "website": return <Globe className="w-4 h-4" />;
      case "campaign": return <Upload className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "tone_guide": return "Tone Guide";
      case "content": return "Content Sample";
      case "website": return "Website Analysis";
      case "campaign": return "Campaign";
      default: return "Unknown";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="gradient-card glass border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="w-6 h-6 mr-3 text-purple-400" />
            Brand Tone & Memory Engine
          </CardTitle>
          <CardDescription className="text-gray-300">
            Train the AI with your brand's unique voice, tone guides, and content samples for consistent strategy generation.
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="train" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10">
          <TabsTrigger value="train" className="text-white data-[state=active]:bg-white/20">
            Train AI
          </TabsTrigger>
          <TabsTrigger value="memories" className="text-white data-[state=active]:bg-white/20">
            Brand Memories ({memories.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="train" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tone Guide Input */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Brand Tone Guide
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Upload your existing tone of voice guidelines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Tone guide title (e.g., 'Brand Voice Guidelines 2024')"
                  value={toneTitle}
                  onChange={(e) => setToneTitle(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                />
                <Textarea
                  placeholder="Paste your brand tone guide, voice principles, communication style, do's and don'ts..."
                  value={toneGuide}
                  onChange={(e) => setToneGuide(e.target.value)}
                  rows={6}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button
                  onClick={handleToneGuideSubmit}
                  disabled={!toneTitle || !toneGuide}
                  className="w-full gradient-primary text-white"
                >
                  Add Tone Guide
                </Button>
              </CardContent>
            </Card>

            {/* Content Sample Input */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  Content Samples
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Add examples of your best content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Content title (e.g., 'Award-winning Email Campaign')"
                  value={contentTitle}
                  onChange={(e) => setContentTitle(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                />
                <Textarea
                  placeholder="Paste your best emails, social posts, ad copy, or any content that represents your brand well..."
                  value={contentSample}
                  onChange={(e) => setContentSample(e.target.value)}
                  rows={6}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button
                  onClick={handleContentSampleSubmit}
                  disabled={!contentTitle || !contentSample}
                  className="w-full gradient-secondary text-white"
                >
                  Add Content Sample
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Website Analysis */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Website Tone Analysis
              </CardTitle>
              <CardDescription className="text-gray-300">
                Let AI analyze your website's tone and communication style
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="Enter your website URL (e.g., https://yourcompany.com)"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button
                  onClick={handleWebsiteAnalysis}
                  disabled={!websiteUrl || isAnalyzing}
                  className="gradient-accent text-white"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Website"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="memories" className="space-y-4">
          {memories.length === 0 ? (
            <Card className="glass border-white/10">
              <CardContent className="pt-6 text-center py-8">
                <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 mb-4">No brand memories yet</p>
                <p className="text-sm text-gray-400">
                  Add tone guides, content samples, or analyze your website to train the AI with your brand voice.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {memories.map((memory) => (
                <Card key={memory.id} className="glass border-white/10">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="text-purple-400">
                          {getTypeIcon(memory.type)}
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg">{memory.title}</CardTitle>
                          <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
                            {getTypeLabel(memory.type)}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeMemory(memory.id)}
                        className="text-gray-400 hover:text-red-400 hover:bg-red-400/10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300 line-clamp-3">
                      {memory.content}
                    </p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                      <span className="text-xs text-gray-400">
                        Added {new Date(memory.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex items-center text-green-400 text-xs">
                        <Check className="w-3 h-3 mr-1" />
                        Active
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrandToneTrainer;