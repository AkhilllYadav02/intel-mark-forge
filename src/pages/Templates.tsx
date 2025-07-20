import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Rocket, 
  Search, 
  Star, 
  Users, 
  Target, 
  TrendingUp, 
  ShoppingCart, 
  Heart,
  Coffee,
  Car,
  Smartphone,
  Building,
  Eye,
  Download,
  Copy
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  const templates = [
    {
      id: 1,
      title: "Tesla-Inspired Product Launch",
      description: "Comprehensive launch strategy for innovative products with premium positioning",
      category: "Product Launch",
      brand: "Tesla",
      industry: "Technology",
      rating: 4.9,
      uses: 2847,
      icon: Rocket,
      tags: ["Innovation", "Premium", "Disruptive"],
      preview: "Launch strategy focusing on innovation storytelling, premium brand positioning, and building anticipation through limited releases..."
    },
    {
      id: 2,
      title: "Apple-Style Customer Retention",
      description: "Premium customer retention through ecosystem building and brand loyalty",
      category: "Customer Retention",
      brand: "Apple",
      industry: "Technology",
      rating: 4.8,
      uses: 1923,
      icon: Heart,
      tags: ["Loyalty", "Ecosystem", "Premium"],
      preview: "Retention strategy emphasizing ecosystem lock-in, premium customer experience, and community building..."
    },
    {
      id: 3,
      title: "Nike Athletic Marketing Campaign",
      description: "Performance-driven brand awareness and athlete endorsement strategy",
      category: "Marketing Campaign",
      brand: "Nike",
      industry: "Sports",
      rating: 4.7,
      uses: 3156,
      icon: Target,
      tags: ["Athletics", "Performance", "Inspiration"],
      preview: "Campaign strategy focusing on athletic performance, inspirational messaging, and athlete partnerships..."
    },
    {
      id: 4,
      title: "Starbucks Customer Acquisition",
      description: "Community-focused customer acquisition through experience marketing",
      category: "Customer Acquisition",
      brand: "Starbucks",
      industry: "Food & Beverage",
      rating: 4.6,
      uses: 1567,
      icon: Coffee,
      tags: ["Community", "Experience", "Local"],
      preview: "Acquisition strategy emphasizing third-place experience, community building, and local partnerships..."
    },
    {
      id: 5,
      title: "Amazon E-commerce Growth",
      description: "Data-driven growth strategy for marketplace dominance",
      category: "Growth Strategy",
      brand: "Amazon",
      industry: "E-commerce",
      rating: 4.9,
      uses: 4231,
      icon: TrendingUp,
      tags: ["Data-driven", "Scale", "Marketplace"],
      preview: "Growth strategy focusing on data analytics, marketplace expansion, and customer-centric innovation..."
    },
    {
      id: 6,
      title: "Uber Market Expansion",
      description: "Rapid market penetration and network effects strategy",
      category: "Market Expansion",
      brand: "Uber",
      industry: "Transportation",
      rating: 4.5,
      uses: 987,
      icon: Car,
      tags: ["Network", "Expansion", "Disruption"],
      preview: "Expansion strategy leveraging network effects, local partnerships, and regulatory navigation..."
    }
  ];

  const categories = [
    "all",
    "Product Launch",
    "Customer Retention", 
    "Marketing Campaign",
    "Customer Acquisition",
    "Growth Strategy",
    "Market Expansion"
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterBy === "all" || template.category === filterBy;
    return matchesSearch && matchesFilter;
  });

  const handleUseTemplate = (template: any) => {
    toast.success(`Using ${template.title} template`);
    // Navigate to strategy creation with template pre-selected
  };

  const handlePreview = (template: any) => {
    toast.info(`Previewing ${template.title}`);
  };

  const handleCopyTemplate = (template: any) => {
    navigator.clipboard.writeText(template.preview);
    toast.success("Template preview copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Strategy Templates</h1>
              <p className="text-gray-600">Choose from proven marketing strategies inspired by successful brands</p>
            </div>
            <Link to="/app/create">
              <Button className="gradient-primary text-white shadow-blue hover-scale">
                <Rocket className="w-4 h-4 mr-2" />
                Create Custom Strategy
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <Card className="glass-card shadow-soft mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search templates by name, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-primary"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={filterBy === category ? "default" : "outline"}
                    onClick={() => setFilterBy(category)}
                    size="sm"
                    className={filterBy === category ? "gradient-primary text-white" : ""}
                  >
                    {category === "all" ? "All Templates" : category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Templates Grid */}
        {filteredTemplates.length === 0 ? (
          <Card className="glass-card shadow-soft text-center py-12">
            <CardContent>
              <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterBy !== "all" 
                  ? "Try adjusting your search or filter criteria" 
                  : "No templates available"}
              </p>
              <Link to="/app/create">
                <Button className="gradient-primary text-white shadow-blue">
                  Create Custom Strategy
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <Card key={template.id} className="glass-card shadow-soft hover:shadow-elegant transition-all duration-300 hover-scale">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg gradient-primary">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg text-gray-900 mb-1">
                            {template.title}
                          </CardTitle>
                          <Badge variant="outline" className="text-xs mb-2">
                            {template.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-sm text-gray-600">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{template.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{template.uses.toLocaleString()} uses</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-1 flex-wrap">
                      {template.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Brand & Industry */}
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs text-primary border-primary/30">
                        {template.brand}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {template.industry}
                      </Badge>
                    </div>

                    {/* Preview */}
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {template.preview}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                      <Button 
                        size="sm" 
                        className="flex-1 gradient-primary text-white shadow-blue"
                        onClick={() => handleUseTemplate(template)}
                      >
                        Use Template
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handlePreview(template)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleCopyTemplate(template)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;