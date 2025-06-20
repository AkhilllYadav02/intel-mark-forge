
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Menu, X, Share, Download, User, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ResponsiveNavbarProps {
  showBackButton?: boolean;
  onShare?: () => void;
  onExport?: () => void;
}

const ResponsiveNavbar = ({ showBackButton, onShare, onExport }: ResponsiveNavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname.includes('/auth');
  const isLandingPage = location.pathname === '/';

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">IntelMarkForge</h1>
                <p className="text-blue-600 text-xs sm:text-sm hidden sm:block">AI-Powered Marketing Strategy Platform</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {!isLandingPage && !isAuthPage && (
              <>
                <Link to="/app" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Dashboard
                </Link>
                <Link to="/app/create" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Create Strategy
                </Link>
                <Link to="/app/strategies" className="text-gray-700 hover:text-blue-600 transition-colors">
                  My Strategies
                </Link>
                <Link to="/app/help" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Help
                </Link>
              </>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Badge */}
            <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 hidden sm:flex">
              Gemini AI Powered
            </Badge>

            {/* Action Buttons - Show on strategy pages */}
            {(onShare || onExport) && (
              <div className="hidden sm:flex items-center space-x-2">
                {onShare && (
                  <Button variant="outline" size="sm" onClick={onShare}>
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                )}
                {onExport && (
                  <Button variant="outline" size="sm" onClick={onExport}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                )}
              </div>
            )}

            {/* User Menu - Show when logged in */}
            {!isLandingPage && !isAuthPage && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden sm:flex">
                    <User className="w-4 h-4 mr-2" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white">
                  <DropdownMenuItem asChild>
                    <Link to="/app/settings" className="flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/" className="flex items-center text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Auth Buttons - Show on landing page */}
            {isLandingPage && (
              <div className="hidden sm:flex items-center space-x-2">
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleMobileMenu}
              className="lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <nav className="flex flex-col space-y-3">
              {!isLandingPage && !isAuthPage ? (
                <>
                  <Link 
                    to="/app" 
                    className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/app/create" 
                    className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Create Strategy
                  </Link>
                  <Link 
                    to="/app/strategies" 
                    className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Strategies
                  </Link>
                  <Link 
                    to="/app/help" 
                    className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Help
                  </Link>
                  
                  <div className="pt-3 border-t border-gray-200">
                    <Link 
                      to="/app/settings" 
                      className="flex items-center text-gray-700 hover:text-blue-600 transition-colors py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                    <Link 
                      to="/" 
                      className="flex items-center text-red-600 hover:text-red-700 transition-colors py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Link>
                  </div>
                  
                  {/* Mobile Action Buttons */}
                  {(onShare || onExport) && (
                    <div className="pt-3 border-t border-gray-200 space-y-2">
                      {onShare && (
                        <Button variant="outline" size="sm" onClick={onShare} className="w-full">
                          <Share className="w-4 h-4 mr-2" />
                          Share Strategy
                        </Button>
                      )}
                      {onExport && (
                        <Button variant="outline" size="sm" onClick={onExport} className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Export Strategy
                        </Button>
                      )}
                    </div>
                  )}
                </>
              ) : isLandingPage ? (
                <div className="space-y-2">
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="sm" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              ) : null}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default ResponsiveNavbar;
