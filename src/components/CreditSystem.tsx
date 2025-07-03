import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, Star, Zap, Crown } from "lucide-react";

interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  popular?: boolean;
  features: string[];
}

const creditPackages: CreditPackage[] = [
  {
    id: "starter",
    credits: 3,
    price: 9,
    features: ["3 AI Strategy Generations", "Basic Templates", "PDF Export"]
  },
  {
    id: "growth",
    credits: 15,
    price: 29,
    popular: true,
    features: ["15 AI Strategy Generations", "Premium Templates", "Multiple Export Formats", "Strategy Variants"]
  },
  {
    id: "professional",
    credits: 50,
    price: 79,
    features: ["50 AI Strategy Generations", "All Templates", "Team Collaboration", "Advanced Analytics"]
  },
  {
    id: "enterprise",
    credits: 150,
    price: 199,
    features: ["150 AI Strategy Generations", "Custom Brand Training", "Priority Support", "API Access"]
  }
];

interface CreditSystemProps {
  currentCredits: number;
  onPurchase: (packageId: string) => void;
}

const CreditSystem = ({ currentCredits, onPurchase }: CreditSystemProps) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const getIcon = (packageId: string) => {
    switch (packageId) {
      case "starter": return <Coins className="w-6 h-6" />;
      case "growth": return <Star className="w-6 h-6" />;
      case "professional": return <Zap className="w-6 h-6" />;
      case "enterprise": return <Crown className="w-6 h-6" />;
      default: return <Coins className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="gradient-card glass border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Coins className="w-6 h-6 mr-3 text-blue-400" />
            Your Credits
          </CardTitle>
          <CardDescription className="text-gray-300">
            Current balance: <span className="text-2xl font-bold text-white">{currentCredits}</span> credits
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {creditPackages.map((pkg) => (
          <Card
            key={pkg.id}
            className={`
              cursor-pointer transition-all duration-300 glass border-white/10
              ${selectedPackage === pkg.id ? 'ring-2 ring-blue-400 glow-blue' : ''}
              ${pkg.popular ? 'ring-2 ring-purple-400 glow' : ''}
              hover:scale-105
            `}
            onClick={() => setSelectedPackage(pkg.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="text-blue-400">
                  {getIcon(pkg.id)}
                </div>
                {pkg.popular && (
                  <Badge className="gradient-secondary text-white">
                    Popular
                  </Badge>
                )}
              </div>
              <CardTitle className="text-white text-xl">
                {pkg.credits} Credits
              </CardTitle>
              <CardDescription className="text-gray-300">
                <span className="text-3xl font-bold text-white">${pkg.price}</span>
                <span className="text-sm"> / ${(pkg.price / pkg.credits).toFixed(1)} per credit</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-300 mb-4">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onPurchase(pkg.id);
                }}
                className={`w-full ${
                  pkg.popular 
                    ? 'gradient-secondary text-white glow' 
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
                variant={pkg.popular ? "default" : "outline"}
              >
                Purchase Credits
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CreditSystem;