
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Brain, 
  Target, 
  Users, 
  BarChart3, 
  Clock, 
  Star,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import ResponsiveNavbar from "@/components/ResponsiveNavbar";

const Dashboard = () => {
  const [userStats] = useState({
    strategiesCreated: 12,
    averageRating: 4.6,
    totalViews: 2847,
    planType: "Pro"
  });

  const recentStrategies = [
    {
      id: 1,
      title: "Tesla-Inspired EV Startup Launch",
      type: "Product Launch",
      brand: "Tesla",
      createdAt: "2 days ago",
      rating: 4.8,
      status: "Complete"
    },
    {
      id: 2,
      title: "Nike-Style Fitness App Campaign",
      type: "Digital Marketing",
      brand: "Nike",
      createdAt: "1 week ago",
      rating: 4.5,
      status: "Draft"
    },
    {
      id: 3,
      title: "Apple-Inspired Tech Product Positioning",
      type: "Brand Positioning",
      brand: "Apple",
      createdAt: "2 weeks ago",
      rating: 4.9,
      status: "Complete"
    }
  ];

  const quickActions = [
    {
      title: "Create New Strategy",
      description: "Start with brand inspiration",
      icon: Plus,
      href: "/app/create",
      gradient: "gradient-primary"
    },
    {
      title: "Browse Templates",
      description: "Explore strategy templates",
      icon: Brain,
      href: "/app/templates",
      gradient: "gradient-secondary"
    },
    {
      title: "View Analytics",
      description: "Track your performance",
      icon: BarChart3,
      href: "/app/analytics",
      gradient: "gradient-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <ResponsiveNavbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gradient mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-gray-600 text-lg">
                Ready to create your next marketing strategy?
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="gradient-secondary text-white px-3 py-1 text-sm font-medium">
                <Award className="w-4 h-4 mr-1" />
                {userStats.planType} Plan
              </Badge>
              <Link to="/app/create">
                <Button className="gradient-primary shadow-blue hover:scale-105 transition-all duration-300">
                  <Plus className="w-4 h-4 mr-2" />
                  New Strategy
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card shadow-soft hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Strategies Created
              </CardTitle>
              <Brain className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{userStats.strategiesCreated}</div>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +2 this week
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card shadow-soft hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Average Rating
              </CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{userStats.averageRating}</div>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${i < Math.floor(userStats.averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card shadow-soft hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Views
              </CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{userStats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% this month
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card shadow-soft hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Success Rate
              </CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">94%</div>
              <Progress value={94} className="mt-2 h-1" />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Zap className="w-6 h-6 mr-2 text-yellow-500" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} to={action.href}>
                  <Card className="glass-card shadow-soft hover:scale-105 transition-all duration-300 cursor-pointer group">
                    <CardHeader>
                      <div className={`w-12 h-12 ${action.gradient} rounded-full flex items-center justify-center mb-3 shadow-blue group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-gray-900 group-hover:text-gradient-primary transition-colors">
                        {action.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {action.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-900 transition-colors">
                        Get started
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Strategies */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-blue-600" />
              Recent Strategies
            </h2>
            <Link to="/app/strategies">
              <Button variant="outline" className="hover:bg-gray-50 transition-colors">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {recentStrategies.map((strategy) => (
              <Card key={strategy.id} className="glass-card shadow-soft hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{strategy.title}</h3>
                        <Badge 
                          variant={strategy.status === 'Complete' ? 'default' : 'secondary'}
                          className={strategy.status === 'Complete' ? 'gradient-secondary text-white' : ''}
                        >
                          {strategy.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Target className="w-4 h-4 mr-1" />
                          {strategy.type}
                        </span>
                        <span className="flex items-center">
                          <Sparkles className="w-4 h-4 mr-1" />
                          Inspired by {strategy.brand}
                        </span>
                        <span>{strategy.createdAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        <span className="text-gray-900">{strategy.rating}</span>
                      </div>
                      <Button variant="outline" size="sm" className="hover:bg-gray-50 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
