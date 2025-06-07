
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Star, TrendingUp } from "lucide-react";

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
  }
];

interface BrandSelectorProps {
  onNext: (brand: any) => void;
  canGoBack: boolean;
}

const BrandSelector = ({ onNext, canGoBack }: BrandSelectorProps) => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const handleBrandSelect = (brand: any) => {
    setSelectedBrand(brand.id);
  };

  const handleContinue = () => {
    const brand = brands.find(b => b.id === selectedBrand);
    if (brand) {
      onNext(brand);
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {brands.map((brand) => (
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
                {brand.strengths.map((strength, index) => (
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

      <div className="flex justify-end pt-6">
        <Button
          onClick={handleContinue}
          disabled={!selectedBrand}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
        >
          Continue to Business Context
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default BrandSelector;
