import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Plus, 
  FileText, 
  Settings, 
  HelpCircle, 
  Menu,
  Star,
  Calendar,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import ResponsiveNavbar from "@/components/ResponsiveNavbar";
import ResponsiveFooter from "@/components/ResponsiveFooter";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const recentStrategies = [
    {
      id: 1,
      title: "Tesla-Inspired Product Launch",
      date: "2024-01-15",
      aiModel: "GPT-4",
      status: "Completed"
    },
    {
      id: 2,
      title: "Apple-Style Customer Retention",
      date: "2024-01-14",
      aiModel: "Claude",
      status: "Draft"
    },
    {
      id: 3,
      title: "Nike Marketing Campaign",
      date: "2024-01-12",
      aiModel: "Gemini",
      status: "Completed"
    }
  ];

  const tips = [
    "Use specific target audience descriptions for better AI results",
    "Try combining multiple brand inspirations for unique strategies",
    "Export your strategies as PDF for client presentations",
    "Use the 'Regenerate' feature to explore different approaches"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ResponsiveNavbar />
      
      <div className="flex">
        {/* Sidebar - Hidden on mobile, collapsible on desktop */}
        <aside className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          sidebarOpen ? 'w-0 lg:w-64' : 'w-0 lg:w-16'
        } hidden lg:block`}>
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              {sidebarOpen && (
                <span className="text-lg font-bold text-gray-900">Dashboard</span>
              )}
            </div>
            
            <nav className="space-y-2">
              <Link to="/app/create" className="flex items-center space-x-3 w-full p-3 text-left rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                <Plus className="w-5 h-5" />
                {sidebarOpen && <span>Create New Strategy</span>}
              </Link>
              
              <Link to="/app/strategies" className="flex items-center space-x-3 w-full p-3 text-left rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                <FileText className="w-5 h-5" />
                {sidebarOpen && <span>Saved Strategies</span>}
              </Link>
              
              <Link to="/app/settings" className="flex items-center space-x-3 w-full p-3 text-left rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                <Settings className="w-5 h-5" />
                {sidebarOpen && <span>Settings</span>}
              </Link>
              
              <Link to="/app/help" className="flex items-center space-x-3 w-full p-3 text-left rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                <HelpCircle className="w-5 h-5" />
                {sidebarOpen && <span>Help & Tutorials</span>}
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Header - Mobile optimized */}
          <header className="bg-white border-b border-gray-200 p-4 lg:hidden">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Pro Plan
              </Badge>
            </div>
          </header>

          {/* Desktop Header */}
          <header className="hidden lg:block bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Menu className="w-5 h-5" />
                </Button>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Pro Plan
                </Badge>
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-4 lg:p-6">
            {/* Welcome Section */}
            <div className="mb-6 lg:mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Welcome back, Sarah! 👋</h2>
              <p className="text-gray-600">Ready to create your next winning marketing strategy?</p>
            </div>

            {/* Quick Actions - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
              <Card className="border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
                <Link to="/app/create">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">Create New Strategy</CardTitle>
                    <CardDescription>
                      Start with brand inspiration and AI guidance
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
                <Link to="/app/strategies">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">View Strategies</CardTitle>
                    <CardDescription>
                      Access your saved marketing plans
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="border-gray-200 hover:shadow-lg transition-shadow cursor-pointer sm:col-span-2 lg:col-span-1">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Analytics</CardTitle>
                  <CardDescription>
                    Track strategy performance
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Recent Strategies & Tips - Responsive Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
              {/* Recent Strategies */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Recent Strategies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentStrategies.map((strategy) => (
                      <div key={strategy.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg gap-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{strategy.title}</h4>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-1">
                            <span>{strategy.date}</span>
                            <span>•</span>
                            <span>{strategy.aiModel}</span>
                          </div>
                        </div>
                        <Badge 
                          variant={strategy.status === 'Completed' ? 'default' : 'secondary'}
                          className={strategy.status === 'Completed' 
                            ? 'bg-green-100 text-green-700 self-start sm:self-center' 
                            : 'bg-yellow-100 text-yellow-700 self-start sm:self-center'
                          }
                        >
                          {strategy.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Link to="/app/strategies">
                    <Button variant="outline" className="w-full mt-4">
                      View All Strategies
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Tips & Examples */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Tips & Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tips.map((tip, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/app/help">
                    <Button variant="outline" className="w-full mt-4">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <ResponsiveFooter />
    </div>
  );
};

export default Dashboard;
