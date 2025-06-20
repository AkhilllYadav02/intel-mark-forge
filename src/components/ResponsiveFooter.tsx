
import { Brain, Mail, Twitter, Github, Linkedin, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ResponsiveFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">IntelMarkForge</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI-powered marketing strategy platform helping businesses create winning campaigns with confidence.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/app/create" className="text-gray-400 hover:text-white transition-colors text-sm">
                Strategy Generator
              </Link>
              <Link to="/app" className="text-gray-400 hover:text-white transition-colors text-sm">
                Dashboard
              </Link>
              <Link to="/app/strategies" className="text-gray-400 hover:text-white transition-colors text-sm">
                Saved Strategies
              </Link>
              <Link to="/app/help" className="text-gray-400 hover:text-white transition-colors text-sm">
                Templates
              </Link>
            </nav>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/app/help" className="text-gray-400 hover:text-white transition-colors text-sm">
                Help Center
              </Link>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Blog
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Case Studies
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Best Practices
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                API Documentation
              </a>
            </nav>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                About Us
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Careers
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Contact
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © 2024 IntelMarkForge. All rights reserved. Powered by Gemini AI.
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-xs">Made with ❤️ for marketers</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={scrollToTop}
                className="text-gray-400 hover:text-white p-2"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ResponsiveFooter;
