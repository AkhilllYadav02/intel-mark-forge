
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronRight, Star, TrendingUp, Plus, Search } from "lucide-react";

const brands = [
  {
    id: "apple",
    name: "Apple",
    description: "Premium product positioning, minimalist design, emotional storytelling",
    category: "Technology",
    strengths: ["Brand loyalty", "Premium pricing", "Innovation"],
    image: "🍎"
  },
  {
    id: "nike",
    name: "Nike",
    description: "Inspirational messaging, athlete partnerships, 'Just Do It' mentality",
    category: "Sports & Lifestyle",
    strengths: ["Motivation", "Influencer marketing", "Community building"],
    image: "✓"
  },
  {
    id: "tesla",
    name: "Tesla",
    description: "Disruptive innovation, sustainability focus, CEO personal branding",
    category: "Automotive",
    strengths: ["Innovation", "Sustainability", "Direct-to-consumer"],
    image: "⚡"
  },
  {
    id: "spotify",
    name: "Spotify",
    description: "Personalization, data-driven content, user-generated playlists",
    category: "Entertainment",
    strengths: ["Personalization", "Data insights", "Community"],
    image: "🎵"
  },
  {
    id: "airbnb",
    name: "Airbnb",
    description: "Experience economy, local community, belonging anywhere",
    category: "Travel & Hospitality",
    strengths: ["Community", "Local experiences", "Trust building"],
    image: "🏠"
  },
  {
    id: "starbucks",
    name: "Starbucks",
    description: "Third place concept, premium coffee culture, seasonal campaigns",
    category: "Food & Beverage",
    strengths: ["Experience design", "Seasonal marketing", "Loyalty programs"],
    image: "☕"
  },
  {
    id: "zomato",
    name: "Zomato",
    description: "Local market penetration, food discovery, customer reviews",
    category: "Food Tech",
    strengths: ["Local marketing", "User engagement", "Review system"],
    image: "🍽️"
  },
  {
    id: "mamaearth",
    name: "Mamaearth",
    description: "Natural products, mother-child focus, digital-first approach",
    category: "Personal Care",
    strengths: ["Natural positioning", "Digital marketing", "Niche targeting"],
    image: "🌱"
  }
];

interface BrandSelectorProps {
  onNext: (brand: any) => void;
  canGoBack: boolean;
}

const BrandSelector = ({ onNext, canGoBack }: BrandSelectorProps) => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [customBrands, setCustomBrands] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Custom brand form state
  const [customName, setCustomName] = useState("");
  const [customDescription, setCustomDescription] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [customStrengths, setCustomStrengths] = useState("");

  const allBrands = [...brands, ...customBrands];
  const filteredBrands = allBrands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBrandSelect = (brand: any) => {
    setSelectedBrand(brand.id);
  };

  const handleContinue = () => {
    const brand = allBrands.find(b => b.id === selectedBrand);
    if (brand) {
      onNext(brand);
    }
  };

  const handleCustomBrandSubmit = () => {
    if (customName && customDescription && customCategory) {
      const newBrand = {
        id: `custom-${Date.now()}`,
        name: customName,
        description: customDescription,
        category: customCategory,
        strengths: customStrengths.split(',').map(s => s.trim()).filter(s => s),
        image: "🔥"
      };
      
      setCustomBrands(prev => [...prev, newBrand]);
      setSelectedBrand(newBrand.id);
      
      // Reset form
      setCustomName("");
      setCustomDescription("");
      setCustomCategory("");
      setCustomStrengths("");
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 flex items-center">
            <Star className="w-6 h-6 mr-3 text-yellow-500" />
            Choose Your Brand Inspiration
          </CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            Select a successful brand whose strategy approach resonates with your vision. 
            Our AI will analyze their proven methodologies and adapt them to your business context.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Search and Custom Brand */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search brands by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500"
          />
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
              <Plus className="w-4 h-4 mr-2" />
              Add Custom Brand
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Custom Brand Inspiration</DialogTitle>
              <DialogDescription>
                Create your own brand inspiration based on a company you admire.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Brand Name</label>
                <Input
                  placeholder="e.g., Patagonia"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Category</label>
                <Input
                  placeholder="e.g., Outdoor Apparel"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Strategy Description</label>
                <Textarea
                  placeholder="Describe their marketing approach, key strategies, and what makes them unique..."
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Key Strengths (comma-separated)</label>
                <Input
                  placeholder="Environmental focus, Authentic storytelling, Community building"
                  value={customStrengths}
                  onChange={(e) => setCustomStrengths(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <Button 
                onClick={handleCustomBrandSubmit}
                disabled={!customName || !customDescription || !customCategory}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Add Brand Inspiration
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600">
        Showing {filteredBrands.length} brand{filteredBrands.length !== 1 ? 's' : ''}
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBrands.map((brand) => (
          <Card
            key={brand.id}
            className={`
              cursor-pointer transition-all duration-300 border-2
              ${selectedBrand === brand.id 
                ? 'bg-purple-50 border-purple-300 shadow-lg ring-2 ring-purple-200' 
                : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
              }
            `}
            onClick={() => handleBrandSelect(brand)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{brand.image}</div>
                  <div>
                    <CardTitle className="text-gray-900 text-xl">{brand.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-700 border-blue-200">
                      {brand.category}
                    </Badge>
                    {brand.id.startsWith('custom-') && (
                      <Badge variant="outline" className="mt-1 ml-2 border-green-300 text-green-700 bg-green-50">
                        Custom
                      </Badge>
                    )}
                  </div>
                </div>
                {selectedBrand === brand.id && (
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{brand.description}</p>
              <div className="flex flex-wrap gap-2">
                {brand.strengths.map((strength: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-green-300 text-green-700 bg-green-50"
                  >
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {strength}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No results */}
      {filteredBrands.length === 0 && (
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="pt-6 text-center py-8">
            <p className="text-gray-600 mb-4">No brands found matching "{searchTerm}"</p>
            <Button 
              variant="outline" 
              onClick={() => setSearchTerm("")}
              className="mr-3"
            >
              Clear Search
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(true)}
              className="border-blue-300 text-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Custom Brand
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end pt-6">
        <Button
          onClick={handleContinue}
          disabled={!selectedBrand}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
        >
          Continue to Strategy Type
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default BrandSelector;
