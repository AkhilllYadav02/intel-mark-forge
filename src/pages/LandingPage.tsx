
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
    <div className="min-h-screen gradient-soft">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-light border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-violet-primary" />
              <span className="text-xl font-heading font-bold text-gradient">StrategIQ</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors font-body">Features</a>
              <a href="#use-cases" className="text-muted-foreground hover:text-foreground transition-colors font-body">Use Cases</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors font-body">Testimonials</a>
              <Link to="/auth">
                <Button className="btn-primary hover-lift">
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
          <Badge className="mb-6 bg-lilac-pink text-violet-primary hover-scale">
            AI-Powered Marketing Intelligence
          </Badge>
          <h1 className="text-display md:text-6xl font-heading font-bold mb-6 text-gradient">
            Transform Your Marketing
            <br />
            <span className="text-gradient-accent">With AI Strategy</span>
          </h1>
          <p className="text-body-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed font-body">
            Generate professional marketing strategies inspired by successful brands. 
            Input your business context and let AI create comprehensive, actionable marketing plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth">
              <Button size="lg" className="btn-primary hover-lift text-btn font-medium">
                Start Creating Strategies
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="btn-secondary hover-lift">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-h2 md:text-4xl font-heading font-bold mb-4 text-gradient">
              Powerful Features
            </h2>
            <p className="text-muted-foreground text-body-lg max-w-2xl mx-auto font-body">
              Everything you need to create compelling marketing strategies that drive results
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="card-elevated hover-lift">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center shadow-violet">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-foreground font-heading">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-center font-body">
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
      <section id="use-cases" className="py-16 px-4 bg-gradient-to-r from-violet-50/50 to-sky-50/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-h2 md:text-4xl font-heading font-bold mb-4 text-gradient">
              Perfect For Every Business
            </h2>
            <p className="text-muted-foreground text-body-lg max-w-2xl mx-auto font-body">
              Whether you're launching a startup or repositioning an established brand
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <Card key={index} className="card-elevated hover-lift">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-secondary rounded-full flex items-center justify-center shadow-soft">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-foreground text-xl font-heading">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-center text-base font-body">
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
            <h2 className="text-h2 md:text-4xl font-heading font-bold mb-4 text-gradient">
              What Our Users Say
            </h2>
            <p className="text-muted-foreground text-body-lg max-w-2xl mx-auto font-body">
              Join thousands of marketers who trust StrategIQ
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-elevated hover-lift">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-light-yellow text-sunset-orange" />
                    ))}
                  </div>
                  <CardTitle className="text-foreground text-lg font-heading">{testimonial.name}</CardTitle>
                  <CardDescription className="text-muted-foreground font-body">{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic font-body">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-violet-100/50 via-sky-100/50 to-orange-100/50">
        <div className="container mx-auto text-center">
          <h2 className="text-h2 md:text-4xl font-heading font-bold mb-4 text-gradient">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-body-lg text-muted-foreground mb-8 max-w-2xl mx-auto font-body">
            Join thousands of businesses using AI to create winning marketing strategies
          </p>
          <Link to="/auth">
            <Button size="lg" className="btn-primary hover-lift text-btn font-medium">
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
