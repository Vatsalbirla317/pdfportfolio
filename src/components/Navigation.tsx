
import React from 'react';
import { Moon, Sun, Github, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isDark, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            PDFPortfolio.ai
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#templates" className="text-foreground/80 hover:text-foreground transition-colors">
              Templates
            </a>
            <a href="#github" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2">
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <Button variant="ghost">Login</Button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/50">
            <div className="flex flex-col space-y-2 pt-4">
              <a href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors py-2">
                How It Works
              </a>
              <a href="#templates" className="text-foreground/80 hover:text-foreground transition-colors py-2">
                Templates
              </a>
              <a href="#github" className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2">
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <Button variant="ghost" className="justify-start">Login</Button>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 p-2 text-left"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                Toggle Theme
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
