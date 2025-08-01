
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Upload, Sparkles } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20" />
      
      {/* Animated background blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm">
                  <Sparkles className="w-4 h-4" />
                  AI-Powered Portfolio Generation
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Upload your resume.{' '}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Get your portfolio instantly.
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Let AI turn your static PDF into a modern, responsive personal website. 
                  No coding required, unlimited customization possible.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg group">
                  <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Generate My Portfolio
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-purple-500/30 hover:bg-purple-500/10">
                  View Sample
                </Button>
              </div>

              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  2,000+ portfolios generated
                </div>
                <div>⚡ Generated in under 30 seconds</div>
              </div>
            </div>

            {/* Right side - Mockup */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative mx-auto max-w-md">
                {/* Floating elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl animate-pulse" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
                
                {/* Mock portfolio preview */}
                <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:scale-105 transition-transform duration-500">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                      <div>
                        <div className="h-4 bg-foreground/20 rounded w-24 mb-2" />
                        <div className="h-3 bg-foreground/10 rounded w-32" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="h-3 bg-foreground/10 rounded w-full" />
                      <div className="h-3 bg-foreground/10 rounded w-4/5" />
                      <div className="h-3 bg-foreground/10 rounded w-3/5" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg" />
                      <div className="h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg" />
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <div className="w-16 h-8 bg-purple-500/20 rounded-full" />
                      <div className="w-16 h-8 bg-pink-500/20 rounded-full" />
                      <div className="w-16 h-8 bg-blue-500/20 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
