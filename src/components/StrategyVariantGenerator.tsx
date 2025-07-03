import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, RefreshCw, Globe } from "lucide-react";
import { toast } from "sonner";

interface VariantGeneratorProps {
  originalStrategy: string;
  onGenerateVariant: (type: string, option: string) => Promise<string>;
}

const toneOptions = [
  { id: "funny", label: "Funny & Playful", icon: "😄" },
  { id: "bold", label: "Bold & Aggressive", icon: "🔥" },
  { id: "professional", label: "Professional & Formal", icon: "💼" },
  { id: "friendly", label: "Friendly & Casual", icon: "😊" },
  { id: "luxury", label: "Luxury & Premium", icon: "✨" },
  { id: "minimalist", label: "Clean & Minimalist", icon: "⚪" }
];

const regionOptions = [
  { id: "india", label: "India", flag: "🇮🇳" },
  { id: "us", label: "United States", flag: "🇺🇸" },
  { id: "uk", label: "United Kingdom", flag: "🇬🇧" },
  { id: "canada", label: "Canada", flag: "🇨🇦" },
  { id: "australia", label: "Australia", flag: "🇦🇺" },
  { id: "global", label: "Global", flag: "🌍" }
];

const abOptions = [
  { id: "version-a", label: "Version A - Direct", icon: "🎯" },
  { id: "version-b", label: "Version B - Emotional", icon: "❤️" },
  { id: "version-c", label: "Version C - Data-Driven", icon: "📊" }
];

const StrategyVariantGenerator = ({ originalStrategy, onGenerateVariant }: VariantGeneratorProps) => {
  const [variants, setVariants] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const handleGenerateVariant = async (type: string, option: string) => {
    const key = `${type}-${option}`;
    setLoading(prev => ({ ...prev, [key]: true }));
    
    try {
      const variant = await onGenerateVariant(type, option);
      setVariants(prev => ({ ...prev, [key]: variant }));
      toast("Variant generated successfully!");
    } catch (error) {
      toast("Failed to generate variant. Please try again.");
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast("Copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      <Card className="gradient-card glass border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <RefreshCw className="w-6 h-6 mr-3 text-purple-400" />
            Strategy Variant Generator
          </CardTitle>
          <CardDescription className="text-gray-300">
            Generate multiple versions of your strategy with different tones, regional adaptations, and A/B test variations.
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="tone" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
          <TabsTrigger value="tone" className="text-white data-[state=active]:bg-white/20">
            Tone Variants
          </TabsTrigger>
          <TabsTrigger value="region" className="text-white data-[state=active]:bg-white/20">
            Regional Variants
          </TabsTrigger>
          <TabsTrigger value="ab" className="text-white data-[state=active]:bg-white/20">
            A/B Test Variants
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tone" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {toneOptions.map((tone) => (
              <Card key={tone.id} className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <span className="text-2xl mr-2">{tone.icon}</span>
                    {tone.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => handleGenerateVariant("tone", tone.id)}
                    disabled={loading[`tone-${tone.id}`]}
                    className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20"
                    variant="outline"
                  >
                    {loading[`tone-${tone.id}`] ? "Generating..." : "Generate Variant"}
                  </Button>
                  
                  {variants[`tone-${tone.id}`] && (
                    <div className="mt-4 space-y-2">
                      <div className="bg-black/20 rounded-lg p-3 text-sm text-gray-300 max-h-32 overflow-y-auto">
                        {variants[`tone-${tone.id}`].substring(0, 200)}...
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopy(variants[`tone-${tone.id}`])}
                          className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="region" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regionOptions.map((region) => (
              <Card key={region.id} className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <span className="text-2xl mr-2">{region.flag}</span>
                    {region.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => handleGenerateVariant("region", region.id)}
                    disabled={loading[`region-${region.id}`]}
                    className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20"
                    variant="outline"
                  >
                    {loading[`region-${region.id}`] ? "Generating..." : "Localize Strategy"}
                  </Button>
                  
                  {variants[`region-${region.id}`] && (
                    <div className="mt-4 space-y-2">
                      <div className="bg-black/20 rounded-lg p-3 text-sm text-gray-300 max-h-32 overflow-y-auto">
                        {variants[`region-${region.id}`].substring(0, 200)}...
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopy(variants[`region-${region.id}`])}
                          className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ab" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {abOptions.map((version) => (
              <Card key={version.id} className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <span className="text-2xl mr-2">{version.icon}</span>
                    {version.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => handleGenerateVariant("ab", version.id)}
                    disabled={loading[`ab-${version.id}`]}
                    className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20"
                    variant="outline"
                  >
                    {loading[`ab-${version.id}`] ? "Generating..." : "Create Version"}
                  </Button>
                  
                  {variants[`ab-${version.id}`] && (
                    <div className="mt-4 space-y-2">
                      <div className="bg-black/20 rounded-lg p-3 text-sm text-gray-300 max-h-32 overflow-y-auto">
                        {variants[`ab-${version.id}`].substring(0, 200)}...
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopy(variants[`ab-${version.id}`])}
                          className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StrategyVariantGenerator;