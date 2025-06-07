
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Target } from "lucide-react";

interface BusinessContextFormProps {
  onNext: (data: any) => void;
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
    competitors: "",
    additionalNotes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onNext(formData);
  };

  const isFormValid = formData.companyName && formData.industry && formData.targetAudience && formData.strategicFocus;

  return (
    <div className="space-y-6">
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 flex items-center">
            <Target className="w-6 h-6 mr-3 text-blue-600" />
            Business Context & Goals
          </CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            Tell us about your business to generate a strategy inspired by {selectedBrand?.name}'s approach.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="companyName" className="text-gray-700">Company Name *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Enter your company name"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="industry" className="text-gray-700">Industry *</Label>
              <Select onValueChange={(value) => handleInputChange('industry', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="food">Food & Beverage</SelectItem>
                  <SelectItem value="fashion">Fashion & Retail</SelectItem>
                  <SelectItem value="travel">Travel & Tourism</SelectItem>
                  <SelectItem value="automotive">Automotive</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="targetAudience" className="text-gray-700">Target Audience *</Label>
              <Input
                id="targetAudience"
                value={formData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                placeholder="e.g., Urban millennials, Small business owners"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Strategy Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="strategicFocus" className="text-gray-700">Strategic Focus *</Label>
              <Select onValueChange={(value) => handleInputChange('strategicFocus', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="What's your main goal?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer-acquisition">Customer Acquisition</SelectItem>
                  <SelectItem value="brand-awareness">Brand Awareness</SelectItem>
                  <SelectItem value="product-launch">Product Launch</SelectItem>
                  <SelectItem value="customer-retention">Customer Retention</SelectItem>
                  <SelectItem value="market-expansion">Market Expansion</SelectItem>
                  <SelectItem value="digital-transformation">Digital Transformation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="budget" className="text-gray-700">Budget Range</Label>
              <Select onValueChange={(value) => handleInputChange('budget', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low ($1K - $10K)</SelectItem>
                  <SelectItem value="medium">Medium ($10K - $50K)</SelectItem>
                  <SelectItem value="high">High ($50K+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="timeline" className="text-gray-700">Timeline</Label>
              <Select onValueChange={(value) => handleInputChange('timeline', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Implementation timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-month">1 Month</SelectItem>
                  <SelectItem value="3-months">3 Months</SelectItem>
                  <SelectItem value="6-months">6 Months</SelectItem>
                  <SelectItem value="1-year">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-gray-200 shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="competitors" className="text-gray-700">Key Competitors (Optional)</Label>
            <Input
              id="competitors"
              value={formData.competitors}
              onChange={(e) => handleInputChange('competitors', e.target.value)}
              placeholder="List your main competitors"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="additionalNotes" className="text-gray-700">Additional Notes (Optional)</Label>
            <Textarea
              id="additionalNotes"
              value={formData.additionalNotes}
              onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
              placeholder="Any specific requirements or context"
              className="mt-1"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-6">
        {canGoBack && (
          <Button
            onClick={onPrevious}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Brand Selection
          </Button>
        )}
        
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg ml-auto"
        >
          Generate Strategy
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default BusinessContextForm;
