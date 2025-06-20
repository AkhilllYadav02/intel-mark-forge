
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Lightbulb, 
  Target, 
  Download, 
  Users, 
  Zap,
  Star,
  ArrowRight,
  CheckCircle,
  Play
} from "lucide-react";
import { Link } from "react-router-dom";
import ResponsiveNavbar from "@/components/ResponsiveNavbar";

const LandingPage = () => {
  const aiEngines = [
    { name: "OpenAI GPT", logo: "🤖" },
    { name: "Google Gemini", logo: "💎" },
    { name: "Anthropic Claude", logo: "🧠" },
    { name: "Mistral AI", logo: "⚡" }
  ];

  const useCases = [
    { title: "Small Businesses", description: "Scale your marketing with AI-powered strategies", icon: Users },
    { title: "Startups", description: "Launch with proven marketing frameworks", icon: Zap },
    { title: "Agencies", description: "Deliver expert strategies to clients faster", icon: Target },
    { title: "Product Launches", description: "Create buzz with data-driven campaigns", icon: Lightbulb }
  ];

  const steps = [
    { title: "Pick Brand Inspiration", description: "Choose from successful brands like Apple, Tesla, Nike" },
    { title: "Input Business Details", description: "Share your industry, audience, and goals" },
    { title: "Get AI Strategy", description: "Multiple AI engines craft your custom plan" },
    { title: "Edit & Download", description: "Customize and export in multiple formats" }
  ];

  const aiModels = [
    { name: "OpenAI GPT", icon: Brain, description: "State-of-the-art language model" },
    { name: "Google Gemini", icon: Lightbulb, description: "Advanced natural language processing" },
    { name: "Anthropic Claude", icon: Target, description: "High-quality text generation" },
    { name: "Mistral AI", icon: Download, description: "Efficient and scalable AI model" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Startup Founder",
      content: "Generated a complete marketing strategy in 15 minutes. The AI understood our niche perfectly!",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Marketing Director",
      content: "The multi-LLM approach gives us diverse perspectives. Quality rivals expensive consultants.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <ResponsiveNavbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Build Marketing Strategies
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}Backed by AI
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto">
              Transform your marketing approach with AI-powered strategies inspired by top brands. 
              Generate, customize, and execute winning campaigns in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                  <Brain className="w-5 h-5 mr-2" />
                  Start for Free
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required • 3 free strategies included
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Four simple steps to create professional marketing strategies
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center border-gray-200 hover:shadow-lg transition-all duration-300 group">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supported AI Engines Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Powered by Leading AI Models
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from the best AI models or let our system automatically select the optimal one
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {aiModels.map((model, index) => (
              <Card key={index} className="text-center border-gray-200 hover:shadow-md transition-shadow duration-300">
                <CardContent className="pt-6 pb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <model.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm">{model.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{model.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Perfect for Every Business
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From startups to enterprises, create strategies that drive results
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-all duration-300 group">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                      <useCase.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{useCase.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Strategy Preview */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              See AI in Action
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Preview of a Tesla-inspired product launch strategy
            </p>
          </div>
          
          <Card className="max-w-4xl mx-auto border-gray-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl sm:text-2xl text-gray-900">
                    Tesla-Inspired Product Launch Strategy
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    Generated by Gemini AI • Brand: Tesla • Industry: Technology
                  </CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200 self-start sm:self-center">
                  Sample Output
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <h3 className="text-lg font-semibold mb-3">Executive Summary</h3>
                <p className="mb-4">
                  This Tesla-inspired strategy focuses on building anticipation through innovation storytelling, 
                  creating an exclusive community of early adopters, and leveraging social proof to drive organic growth...
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-blue-800 font-medium">
                    ✨ Want to see the complete strategy? Sign up to generate your personalized marketing plan!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using AI to create winning strategies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-4">
                <Zap className="w-5 h-5 mr-2" />
                Get Started Free
              </Button>
            </Link>
            <div className="flex items-center text-blue-100 text-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              No credit card required
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
