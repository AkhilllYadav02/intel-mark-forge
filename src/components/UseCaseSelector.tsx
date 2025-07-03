import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Target, Mail, Users, Megaphone, Rocket, Heart, TrendingUp, ShoppingCart, Calendar } from "lucide-react";

const useCases = [
  {
    id: "product-launch",
    title: "Product Launch Campaign",
    description: "Complete go-to-market strategy for new product launches",
    icon: <Rocket className="w-6 h-6" />,
    category: "Launch",
    features: ["GTM Strategy", "Launch Timeline", "Channel Mix", "PR Plan"],
    popular: true
  },
  {
    id: "customer-retention",
    title: "Customer Retention Strategy",
    description: "Strategies to reduce churn and increase customer lifetime value",
    icon: <Heart className="w-6 h-6" />,
    category: "Retention",
    features: ["Loyalty Programs", "Engagement Tactics", "Win-back Campaigns", "Upselling"]
  },
  {
    id: "email-marketing",
    title: "Email Campaign Strategy",
    description: "Comprehensive email marketing campaigns with automation",
    icon: <Mail className="w-6 h-6" />,
    category: "Email",
    features: ["Campaign Flows", "Segmentation", "Automation", "A/B Testing"]
  },
  {
    id: "influencer-outreach",
    title: "Influencer Marketing",
    description: "Influencer partnership and collaboration strategies",
    icon: <Users className="w-6 h-6" />,
    category: "Influencer",
    features: ["Influencer Discovery", "Partnership Strategy", "Campaign Management", "ROI Tracking"]
  },
  {
    id: "brand-awareness",
    title: "Brand Awareness Campaign",
    description: "Multi-channel campaigns to increase brand visibility",
    icon: <Megaphone className="w-6 h-6" />,
    category: "Awareness",
    features: ["Brand Positioning", "Content Strategy", "Social Media", "PR & Media"]
  },
  {
    id: "conversion-optimization",
    title: "Conversion Rate Optimization",
    description: "Strategies to improve website and campaign conversions",
    icon: <TrendingUp className="w-6 h-6" />,
    category: "Optimization",
    features: ["Funnel Analysis", "A/B Testing", "UX Optimization", "Landing Pages"]
  },
  {
    id: "ecommerce-strategy",
    title: "E-commerce Growth Strategy",
    description: "Complete strategies for online store growth and sales",
    icon: <ShoppingCart className="w-6 h-6" />,
    category: "E-commerce",
    features: ["Sales Funnel", "Product Marketing", "Cart Optimization", "Customer Journey"]
  },
  {
    id: "event-marketing",
    title: "Event Marketing Campaign",
    description: "Comprehensive strategies for event promotion and engagement",
    icon: <Calendar className="w-6 h-6" />,
    category: "Events",
    features: ["Event Promotion", "Registration Strategy", "Engagement Plan", "Follow-up"]
  }
];

interface UseCaseSelectorProps {
  onNext: (useCase: any) => void;
  onPrevious: () => void;
  canGoBack: boolean;
}

const UseCaseSelector = ({ onNext, onPrevious, canGoBack }: UseCaseSelectorProps) => {
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUseCases = useCases.filter(useCase =>
    useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    useCase.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    useCase.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUseCaseSelect = (useCase: any) => {
    setSelectedUseCase(useCase.id);
  };

  const handleContinue = () => {
    const useCase = useCases.find(u => u.id === selectedUseCase);
    if (useCase) {
      onNext(useCase);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="gradient-card glass border-white/10">
        <CardHeader>
          <CardTitle className="text-white text-2xl flex items-center">
            <Target className="w-6 h-6 mr-3 text-blue-400" />
            Select Your Marketing Objective
          </CardTitle>
          <CardDescription className="text-gray-300 text-lg">
            Choose the type of marketing strategy you want to create. Each use case provides specialized templates and frameworks.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search use cases..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
        />
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-400">
        Showing {filteredUseCases.length} use case{filteredUseCases.length !== 1 ? 's' : ''}
      </div>

      {/* Use Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredUseCases.map((useCase) => (
          <Card
            key={useCase.id}
            className={`
              cursor-pointer transition-all duration-300 glass border-white/10
              ${selectedUseCase === useCase.id 
                ? 'ring-2 ring-blue-400 glow-blue' 
                : 'hover:ring-1 hover:ring-white/30'
              }
              hover:scale-105
            `}
            onClick={() => handleUseCaseSelect(useCase)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-blue-400">
                    {useCase.icon}
                  </div>
                  <div>
                    <CardTitle className="text-white text-xl">{useCase.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="border-white/20 text-gray-300">
                        {useCase.category}
                      </Badge>
                      {useCase.popular && (
                        <Badge className="gradient-secondary text-white">
                          Popular
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                {selectedUseCase === useCase.id && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">{useCase.description}</p>
              <div className="space-y-2">
                <p className="text-sm font-medium text-white">Includes:</p>
                <div className="flex flex-wrap gap-2">
                  {useCase.features.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs border-purple-400/50 text-purple-300 bg-purple-400/10"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No results */}
      {filteredUseCases.length === 0 && (
        <Card className="glass border-white/10">
          <CardContent className="pt-6 text-center py-8">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 mb-4">No use cases found matching "{searchTerm}"</p>
            <Button 
              variant="outline" 
              onClick={() => setSearchTerm("")}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              Clear Search
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        {canGoBack && (
          <Button
            onClick={onPrevious}
            variant="outline"
            className="bg-white/10 text-white border-white/20 hover:bg-white/20"
          >
            Back
          </Button>
        )}
        <Button
          onClick={handleContinue}
          disabled={!selectedUseCase}
          className="ml-auto gradient-primary text-white px-8 py-3 text-lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default UseCaseSelector;