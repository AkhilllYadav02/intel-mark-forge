
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  HelpCircle, 
  Search, 
  Book, 
  MessageCircle, 
  Mail, 
  Video,
  FileText,
  Brain,
  Lightbulb,
  Target
} from "lucide-react";

const Help = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const tutorials = [
    {
      title: "Getting Started with IntelMarkForge",
      description: "Learn the basics of creating your first AI marketing strategy",
      duration: "5 min",
      type: "Video",
      icon: Video
    },
    {
      title: "Choosing the Right Brand Inspiration",
      description: "How to select brands that align with your business goals",
      duration: "3 min",
      type: "Article",
      icon: Book
    },
    {
      title: "Understanding AI Model Differences",
      description: "Compare GPT-4, Claude, and Gemini for strategy generation",
      duration: "7 min",
      type: "Video",
      icon: Brain
    },
    {
      title: "Optimizing Your Business Context",
      description: "Tips for providing the best input for AI strategy generation",
      duration: "4 min",
      type: "Article",
      icon: Target
    }
  ];

  const faqs = [
    {
      question: "How does the AI strategy generation work?",
      answer: "Our platform uses advanced AI models (GPT-4, Claude, Gemini) to analyze successful brand strategies and adapt them to your specific business context. The AI considers your industry, target audience, budget, and goals to create customized marketing strategies."
    },
    {
      question: "Can I edit the generated strategies?",
      answer: "Absolutely! All generated strategies come with a built-in rich text editor. You can modify, add, or remove sections to perfectly match your needs. You can also regenerate sections or request alternative versions."
    },
    {
      question: "What AI models are available?",
      answer: "We support multiple leading AI models including OpenAI's GPT-4, Anthropic's Claude, Google's Gemini, and others. You can choose a specific model or let our system automatically select the best one for your use case."
    },
    {
      question: "How many strategies can I generate?",
      answer: "This depends on your subscription plan. Free users get 3 strategies per month, Pro users get 100, and Enterprise users have unlimited generation. You can always upgrade your plan for more capacity."
    },
    {
      question: "Can I export my strategies?",
      answer: "Yes! You can export your strategies in multiple formats including PDF, Word document, or plain text. You can also share them via unique links or email them directly to team members."
    },
    {
      question: "Is my business data secure?",
      answer: "We take security seriously. All data is encrypted in transit and at rest. We don't share your business information with third parties, and you can delete your data at any time. Our AI processing is also done securely."
    },
    {
      question: "How accurate are the AI-generated strategies?",
      answer: "Our AI models are trained on thousands of successful marketing strategies and case studies. While the strategies provide excellent starting points and frameworks, we recommend reviewing and customizing them for your specific market conditions."
    },
    {
      question: "Can I collaborate with my team?",
      answer: "Yes! Pro and Enterprise plans include team collaboration features. You can invite team members, share strategies, leave comments, and work together in real-time on strategy development."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <HelpCircle className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
              <p className="text-gray-600">Get the most out of your AI marketing strategy platform</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Video className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>
                Step-by-step video guides to master the platform
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <CardTitle>Live Chat Support</CardTitle>
              <CardDescription>
                Get instant help from our support team
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Mail className="w-12 h-12 text-purple-600 mx-auto mb-2" />
              <CardTitle>Email Support</CardTitle>
              <CardDescription>
                Send us your questions and get detailed responses
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Tutorials Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="w-6 h-6 mr-3" />
              Tutorials & Guides
            </CardTitle>
            <CardDescription>
              Learn how to create amazing marketing strategies with AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tutorials.map((tutorial, index) => {
                const IconComponent = tutorial.icon;
                return (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <IconComponent className="w-8 h-8 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{tutorial.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{tutorial.description}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {tutorial.type}
                          </Badge>
                          <span className="text-xs text-gray-500">{tutorial.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="w-6 h-6 mr-3" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              Find answers to common questions about IntelMarkForge
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search FAQ */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* FAQ Accordion */}
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFaqs.length === 0 && searchTerm && (
              <div className="text-center py-8">
                <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-4">
                  Try different keywords or browse all FAQs above
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Still Need Help?</CardTitle>
            <CardDescription>
              Our support team is here to help you succeed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1">
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Live Chat
              </Button>
              <Button variant="outline" className="flex-1">
                <Mail className="w-4 h-4 mr-2" />
                Email Support
              </Button>
            </div>
            <p className="text-center text-sm text-gray-600 mt-4">
              Average response time: 2-4 hours during business hours
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help;
