
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Search, 
  Calendar, 
  Brain, 
  Edit, 
  Copy, 
  Trash2, 
  Download,
  Eye,
  Filter
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const SavedStrategies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  const strategies = [
    {
      id: 1,
      title: "Tesla-Inspired EV Product Launch",
      description: "Comprehensive launch strategy for electric vehicle startup",
      brand: "Tesla",
      industry: "Automotive",
      dateCreated: "2024-01-15",
      aiModel: "GPT-4",
      status: "Complete",
      type: "Product Launch"
    },
    {
      id: 2,
      title: "Apple-Style Customer Retention",
      description: "Premium customer retention strategy for tech products",
      brand: "Apple",
      industry: "Technology",
      dateCreated: "2024-01-14",
      aiModel: "Claude",
      status: "Draft",
      type: "Customer Retention"
    },
    {
      id: 3,
      title: "Nike Marketing Campaign",
      description: "Athletic brand awareness campaign strategy",
      brand: "Nike",
      industry: "Sports",
      dateCreated: "2024-01-12",
      aiModel: "Gemini",
      status: "Complete",
      type: "Marketing Campaign"
    },
    {
      id: 4,
      title: "Starbucks Customer Acquisition",
      description: "Coffee shop customer acquisition strategy",
      brand: "Starbucks",
      industry: "Food & Beverage",
      dateCreated: "2024-01-10",
      aiModel: "GPT-4",
      status: "Complete",
      type: "Customer Acquisition"
    }
  ];

  const filteredStrategies = strategies.filter(strategy => {
    const matchesSearch = strategy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         strategy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === "all" || strategy.type === filterBy;
    return matchesSearch && matchesFilter;
  });

  const handleViewStrategy = (strategy: any) => {
    toast.success(`Viewing ${strategy.title}`);
  };

  const handleEditStrategy = (strategy: any) => {
    toast.success(`Editing ${strategy.title}`);
  };

  const handleCopyStrategy = (strategy: any) => {
    navigator.clipboard.writeText(strategy.description);
    toast.success("Strategy copied to clipboard!");
  };

  const handleDownloadStrategy = (strategy: any) => {
    const blob = new Blob([strategy.description], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${strategy.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Strategy downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Saved Strategies</h1>
              <p className="text-gray-600">Manage and access your AI-generated marketing strategies</p>
            </div>
            <Link to="/app/create">
              <Button className="gradient-primary text-white shadow-blue hover-scale">
                <FileText className="w-4 h-4 mr-2" />
                Create New Strategy
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <Card className="glass-card shadow-soft mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search strategies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-primary"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterBy === "all" ? "default" : "outline"}
                  onClick={() => setFilterBy("all")}
                  size="sm"
                  className={filterBy === "all" ? "gradient-primary text-white" : ""}
                >
                  All
                </Button>
                <Button
                  variant={filterBy === "Product Launch" ? "default" : "outline"}
                  onClick={() => setFilterBy("Product Launch")}
                  size="sm"
                  className={filterBy === "Product Launch" ? "gradient-primary text-white" : ""}
                >
                  Product Launch
                </Button>
                <Button
                  variant={filterBy === "Marketing Campaign" ? "default" : "outline"}
                  onClick={() => setFilterBy("Marketing Campaign")}
                  size="sm"
                  className={filterBy === "Marketing Campaign" ? "gradient-primary text-white" : ""}
                >
                  Campaigns
                </Button>
                <Button
                  variant={filterBy === "Customer Retention" ? "default" : "outline"}
                  onClick={() => setFilterBy("Customer Retention")}
                  size="sm"
                  className={filterBy === "Customer Retention" ? "gradient-primary text-white" : ""}
                >
                  Retention
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategies Grid */}
        {filteredStrategies.length === 0 ? (
          <Card className="glass-card shadow-soft text-center py-12">
            <CardContent>
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No strategies found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterBy !== "all" 
                  ? "Try adjusting your search or filter criteria" 
                  : "Create your first AI-powered marketing strategy"}
              </p>
              <Link to="/app/create">
                <Button className="gradient-primary text-white shadow-blue">
                  Create Strategy
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredStrategies.map((strategy) => (
              <Card key={strategy.id} className="glass-card shadow-soft hover:shadow-elegant transition-all duration-300 hover-scale">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-gray-900 mb-2">
                        {strategy.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {strategy.description}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant={strategy.status === 'Complete' ? 'default' : 'secondary'}
                      className={strategy.status === 'Complete' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                      }
                    >
                      {strategy.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {strategy.dateCreated}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Brain className="w-4 h-4 mr-2" />
                      {strategy.aiModel}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {strategy.brand}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {strategy.industry}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleViewStrategy(strategy)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditStrategy(strategy)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleCopyStrategy(strategy)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDownloadStrategy(strategy)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedStrategies;
