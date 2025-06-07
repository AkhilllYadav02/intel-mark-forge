
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronLeft, Building, Users, DollarSign, Calendar } from "lucide-react";

interface BusinessContextFormProps {
  onNext: (context: any) => void;
  onPrevious: () => void;
  selectedBrand: any;
  canGoBack: boolean;
}

const BusinessContextForm = ({ onNext, onPrevious, selectedBrand, canGoBack }: BusinessContextFormProps) => {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    targetAudience: "",
    budget: "",
    timeline: "",
    strategicFocus: "",
    currentChallenges: "",
    goals: "",
    competitors: ""
  });

  const industries = [
    "Technology", "Healthcare", "Finance", "E-commerce", "Manufacturing", 
    "Education", "Real Estate", "Food & Beverage", "Fashion", "Automotive",
    "Travel & Hospitality", "Entertainment", "Sports", "Beauty & Wellness", "Other"
  ];

  const budgetRanges = [
    "Under $10K", "$10K - $50K", "$50K - $100K", "$100K - $500K", "$500K+", "Flexible"
  ];

  const timelines = [
    "1-3 months", "3-6 months", "6-12 months", "1-2 years", "Ongoing"
  ];

  const strategicFocuses = [
    "Brand Awareness", "Lead Generation", "Customer Acquisition", "Customer Retention",
    "Product Launch", "Market Expansion", "Digital Transformation", "Sales Growth",
    "Influencer Marketing", "Content Marketing", "Social Media Growth"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    if (formData.companyName && formData.industry && formData.strategicFocus) {
      onNext(formData);
    }
  };

  const isFormValid = formData.companyName && formData.industry && formData.strategicFocus;

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center">
            <Building className="w-6 h-6 mr-3 text-blue-400" />
            Business Context
          </CardTitle>
          <CardDescription className="text-blue-200 text-lg">
            Help our AI understand your business to create a tailored strategy inspired by{" "}
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              {selectedBrand?.name}
            </Badge>
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Building className="w-5 h-5 mr-2 text-blue-400" />
              Company Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="companyName" className="text-white">Company Name *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                placeholder="Enter your company name"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            
            <div>
              <Label htmlFor="industry" className="text-white">Industry *</Label>
              <Select onValueChange={(value) => handleInputChange("industry", value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="targetAudience" className="text-white">Target Audience</Label>
              <Input
                id="targetAudience"
                value={formData.targetAudience}
                onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                placeholder="e.g., Urban millennials, Enterprise customers"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Strategic Information */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-400" />
              Strategic Focus
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="strategicFocus" className="text-white">Primary Focus *</Label>
              <Select onValueChange={(value) => handleInputChange("strategicFocus", value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="What's your main goal?" />
                </SelectTrigger>
                <SelectContent>
                  {strategicFocuses.map((focus) => (
                    <SelectItem key={focus} value={focus}>
                      {focus}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="budget" className="text-white">Marketing Budget</Label>
              <Select onValueChange={(value) => handleInputChange("budget", value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="timeline" className="text-white">Timeline</Label>
              <Select onValueChange={(value) => handleInputChange("timeline", value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Expected timeline" />
                </SelectTrigger>
                <SelectContent>
                  {timelines.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Context */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Additional Context (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="goals" className="text-white">Specific Goals</Label>
              <Textarea
                id="goals"
                value={formData.goals}
                onChange={(e) => handleInputChange("goals", e.target.value)}
                placeholder="What specific outcomes are you looking for?"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div>
              <Label htmlFor="currentChallenges" className="text-white">Current Challenges</Label>
              <Textarea
                id="currentChallenges"
                value={formData.currentChallenges}
                onChange={(e) => handleInputChange("currentChallenges", e.target.value)}
                placeholder="What marketing challenges are you facing?"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="competitors" className="text-white">Key Competitors</Label>
            <Input
              id="competitors"
              value={formData.competitors}
              onChange={(e) => handleInputChange("competitors", e.target.value)}
              placeholder="List your main competitors (comma-separated)"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-6">
        <Button
          onClick={onPrevious}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Brand Selection
        </Button>
        
        <Button
          onClick={handleContinue}
          disabled={!isFormValid}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3"
        >
          Generate AI Strategy
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default BusinessContextForm;
