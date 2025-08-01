
import React from 'react';
import { ExternalLink, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TemplateSection: React.FC = () => {
  const templates = [
    {
      id: 1,
      name: 'Modern Developer',
      category: 'Developer',
      image: '/api/placeholder/400/300',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      name: 'Creative Designer',
      category: 'Designer',
      image: '/api/placeholder/400/300',
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 3,
      name: 'Professional Business',
      category: 'Business',
      image: '/api/placeholder/400/300',
      color: 'from-pink-500 to-red-500'
    },
    {
      id: 4,
      name: 'Minimal Portfolio',
      category: 'Minimal',
      image: '/api/placeholder/400/300',
      color: 'from-green-500 to-blue-500'
    }
  ];

  return (
    <section id="templates" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Choose from Beautiful <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Themes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional templates designed by experts, customized by AI to match your style
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {templates.map((template, index) => (
            <div
              key={template.id}
              className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:scale-105 hover:border-purple-500/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Template preview */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* Mock template content */}
                <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-20`} />
                <div className="absolute inset-0 p-6 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full" />
                    <div className="space-y-1">
                      <div className="h-2 bg-white/30 rounded w-20" />
                      <div className="h-1.5 bg-white/20 rounded w-16" />
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="h-1.5 bg-white/20 rounded w-full" />
                    <div className="h-1.5 bg-white/20 rounded w-3/4" />
                    <div className="h-1.5 bg-white/20 rounded w-1/2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <div className="h-8 bg-white/10 rounded" />
                    <div className="h-8 bg-white/10 rounded" />
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex gap-3">
                    <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  </div>
                </div>
              </div>

              {/* Template info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg group-hover:text-purple-400 transition-colors">
                    {template.name}
                  </h3>
                  <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                    {template.category}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Perfect for {template.category.toLowerCase()} professionals
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-purple-500/30 hover:bg-purple-500/10">
            View All Templates
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TemplateSection;
