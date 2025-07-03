
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, Target, Users, Zap, Star, CheckCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Strategy",
      description: "Generate comprehensive marketing strategies using advanced AI models tailored to your brand"
    },
    {
      icon: Target,
      title: "Brand-Focused Approach",
      description: "Learn from successful brands and apply proven strategies to your business context"
    },
    {
      icon: Users,
      title: "Business Context Aware",
      description: "Input your specific business details for personalized strategy recommendations"
    },
    {
      icon: Zap,
      title: "Instant Generation",
      description: "Get professional marketing strategies in minutes, not weeks of consulting"
    }
  ];

  const useCases = [
    {
      title: "Startup Launch",
      description: "Perfect for new businesses looking to establish their market presence",
      icon: Sparkles
    },
    {
      title: "Product Marketing",
      description: "Ideal for launching new products or entering new markets",
      icon: Target
    },
    {
      title: "Brand Repositioning",
      description: "Great for established brands seeking fresh strategic direction",
      icon: Star
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      content: "IntelMarkForge transformed our marketing approach. The AI-generated strategies were spot-on!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Startup Founder",
      content: "As a non-marketer, this tool gave me the strategic foundation I needed to launch successfully.",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      role: "Brand Manager",
      content: "The brand-inspired approach helped us find our unique positioning in a crowded market.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-gradient" />
              <span className="text-xl font-bold text-gradient">IntelMarkForge</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#use-cases" className="text-gray-300 hover:text-white transition-colors">Use Cases</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</a>
              <Link to="/auth">
                <Button className="gradient-primary glow hover:scale-105 transition-transform">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 gradient-secondary animate-pulse">
            AI-Powered Marketing Intelligence
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Transform Your Marketing
            <br />
            <span className="text-gradient-primary">With AI Strategy</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Generate professional marketing strategies inspired by successful brands. 
            Input your business context and let AI create comprehensive, actionable marketing plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth">
              <Button size="lg" className="gradient-primary glow hover:scale-105 transition-all duration-300">
                Start Creating Strategies
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="glass hover:bg-white/10 transition-colors">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Powerful Features
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Everything you need to create compelling marketing strategies that drive results
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="gradient-card glass glow hover:scale-105 transition-all duration-300 border-white/10">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 gradient-accent rounded-full flex items-center justify-center glow-blue">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-16 px-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Perfect For Every Business
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Whether you're launching a startup or repositioning an established brand
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <Card key={index} className="gradient-card glass glow-cyan hover:scale-105 transition-all duration-300 border-white/10">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 gradient-secondary rounded-full flex items-center justify-center glow">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 text-center text-base">
                      {useCase.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              What Our Users Say
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Join thousands of marketers who trust IntelMarkForge
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="gradient-card glass glow hover:scale-105 transition-all duration-300 border-white/10">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-white text-lg">{testimonial.name}</CardTitle>
                  <CardDescription className="text-gray-300">{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using AI to create winning marketing strategies
          </p>
          <Link to="/auth">
            <Button size="lg" className="gradient-primary glow hover:scale-105 transition-all duration-300">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
