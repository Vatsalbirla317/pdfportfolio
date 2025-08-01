
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Upload } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                AI-Powered Portfolio Generation
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Upload your resume.{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Get your portfolio
                </span>{' '}
                instantly.
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Let AI turn your static PDF into a modern, responsive personal website. 
                Choose from beautiful themes, customize your branding, and go live in minutes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/upload">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-6 h-auto">
                  <Upload className="w-5 h-5 mr-2" />
                  Generate My Portfolio
                </Button>
              </Link>
              
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto">
                View Sample
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Generate in under 2 minutes
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Export to any platform
              </div>
            </div>
          </div>

          {/* Right side - Mockup */}
          <div className="relative animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="relative">
              {/* Floating portfolio preview mockup */}
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                <div className="space-y-4">
                  {/* Mock portfolio header */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                      <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-24"></div>
                    </div>
                  </div>
                  
                  {/* Mock content sections */}
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full"></div>
                    <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/2"></div>
                  </div>
                  
                  {/* Mock skills */}
                  <div className="flex gap-2 flex-wrap">
                    <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full text-xs">React</div>
                    <div className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 rounded-full text-xs">Node.js</div>
                    <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-xs">TypeScript</div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
