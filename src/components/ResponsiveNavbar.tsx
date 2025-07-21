
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
    <header className="border-b border-gray-800 bg-black shadow-sm sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1 sm:flex-none">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black" />
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white truncate">StrategIQ</h1>
                <p className="text-gray-300 text-xs sm:text-sm hidden md:block truncate">AI-Powered Marketing Strategy Platform</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {!isLandingPage && !isAuthPage && (
              <>
                <Link to="/app" className="text-gray-300 hover:text-white transition-colors whitespace-nowrap">
                  Dashboard
                </Link>
                <Link to="/app/create" className="text-gray-300 hover:text-white transition-colors whitespace-nowrap">
                  Create Strategy
                </Link>
                <Link to="/app/strategies" className="text-gray-300 hover:text-white transition-colors whitespace-nowrap">
                  My Strategies
                </Link>
                <Link to="/app/help" className="text-gray-300 hover:text-white transition-colors whitespace-nowrap">
                  Help
                </Link>
              </>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
            {/* Badge */}
            <Badge variant="secondary" className="bg-gray-800 text-gray-200 border-gray-700 hidden md:flex text-xs">
              AI Powered
            </Badge>

            {/* Action Buttons - Show on strategy pages */}
            {(onShare || onExport) && (
              <div className="hidden sm:flex items-center space-x-1 lg:space-x-2">
                {onShare && (
                  <Button variant="outline" size="sm" onClick={onShare} className="border-gray-700 text-gray-300 hover:text-white hover:border-gray-600">
                    <Share className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                )}
                {onExport && (
                  <Button variant="outline" size="sm" onClick={onExport} className="border-gray-700 text-gray-300 hover:text-white hover:border-gray-600">
                    <Download className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Export</span>
                  </Button>
                )}
              </div>
            )}

            {/* User Menu - Show when logged in */}
            {!isLandingPage && !isAuthPage && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden sm:flex text-gray-300 hover:text-white">
                    <User className="w-4 h-4 sm:mr-2" />
                    <span className="hidden lg:inline">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-gray-900 border-gray-700">
                  <DropdownMenuItem asChild>
                    <Link to="/app/settings" className="flex items-center text-gray-300 hover:text-white">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem asChild>
                    <Link to="/" className="flex items-center text-red-400 hover:text-red-300">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Auth Buttons - Show on landing page */}
            {isLandingPage && (
              <div className="hidden sm:flex items-center space-x-1 lg:space-x-2">
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:text-white hover:border-gray-600">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm" className="bg-white text-black hover:bg-gray-200">
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
              className="lg:hidden text-gray-300 hover:text-white p-1 sm:p-2"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
            <nav className="flex flex-col space-y-3">
              {!isLandingPage && !isAuthPage ? (
                <>
                  <Link 
                    to="/app" 
                    className="text-gray-300 hover:text-white transition-colors py-2 px-2 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/app/create" 
                    className="text-gray-300 hover:text-white transition-colors py-2 px-2 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Create Strategy
                  </Link>
                  <Link 
                    to="/app/strategies" 
                    className="text-gray-300 hover:text-white transition-colors py-2 px-2 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Strategies
                  </Link>
                  <Link 
                    to="/app/help" 
                    className="text-gray-300 hover:text-white transition-colors py-2 px-2 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Help
                  </Link>
                  
                  <div className="pt-3 border-t border-gray-800">
                    <Link 
                      to="/app/settings" 
                      className="flex items-center text-gray-300 hover:text-white transition-colors py-2 px-2 rounded"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                    <Link 
                      to="/" 
                      className="flex items-center text-red-400 hover:text-red-300 transition-colors py-2 px-2 rounded"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Link>
                  </div>
                  
                  {/* Mobile Action Buttons */}
                  {(onShare || onExport) && (
                    <div className="pt-3 border-t border-gray-800 space-y-2">
                      {onShare && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={onShare} 
                          className="w-full border-gray-700 text-gray-300 hover:text-white hover:border-gray-600"
                        >
                          <Share className="w-4 h-4 mr-2" />
                          Share Strategy
                        </Button>
                      )}
                      {onExport && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={onExport} 
                          className="w-full border-gray-700 text-gray-300 hover:text-white hover:border-gray-600"
                        >
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
                    <Button variant="outline" size="sm" className="w-full border-gray-700 text-gray-300 hover:text-white hover:border-gray-600">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="sm" className="w-full bg-white text-black hover:bg-gray-200">
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
