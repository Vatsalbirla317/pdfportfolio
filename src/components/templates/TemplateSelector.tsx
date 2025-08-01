
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Check } from 'lucide-react';
import { PortfolioTemplate, PortfolioGenerator } from '@/services/portfolioGenerator';

interface TemplateSelectorProps {
  onTemplateSelect?: (template: PortfolioTemplate) => void;
  selectedTemplateId?: string;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  onTemplateSelect,
  selectedTemplateId
}) => {
  const { state, dispatch } = useApp();
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  const portfolioGenerator = new PortfolioGenerator();
  const templates = portfolioGenerator.getTemplates();

  const categories = [...new Set(templates.map(t => t.category))];

  const handleTemplateSelect = (template: PortfolioTemplate) => {
    dispatch({
      type: 'SET_THEME_SETTINGS',
      payload: {
        ...state.themeSettings,
        template: template.id
      }
    });
    
    if (onTemplateSelect) {
      onTemplateSelect(template);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Choose Your Template</h2>
        <p className="text-muted-foreground">
          Select a professional template that matches your style and profession
        </p>
      </div>

      {categories.map(category => (
        <div key={category} className="space-y-4">
          <h3 className="text-xl font-semibold text-primary">{category}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates
              .filter(template => template.category === category)
              .map(template => (
                <Card
                  key={template.id}
                  className={`relative cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    selectedTemplateId === template.id
                      ? 'ring-2 ring-primary border-primary'
                      : ''
                  }`}
                  onMouseEnter={() => setHoveredTemplate(template.id)}
                  onMouseLeave={() => setHoveredTemplate(null)}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {template.layout}
                        </Badge>
                      </div>
                      {selectedTemplateId === template.id && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <CardDescription className="text-sm">
                      {template.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Template Preview */}
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg overflow-hidden">
                      {/* Mock template preview */}
                      <div className="absolute inset-0 p-4 flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 bg-primary/20 rounded-full" />
                          <div className="space-y-1">
                            <div className="h-2 bg-primary/30 rounded w-16" />
                            <div className="h-1.5 bg-primary/20 rounded w-12" />
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-3">
                          <div className="h-1.5 bg-primary/20 rounded w-full" />
                          <div className="h-1.5 bg-primary/20 rounded w-3/4" />
                          <div className="h-1.5 bg-primary/20 rounded w-1/2" />
                        </div>
                        
                        {template.layout === 'two-column' ? (
                          <div className="grid grid-cols-2 gap-2 mt-auto">
                            <div className="space-y-1">
                              <div className="h-1 bg-primary/30 rounded w-full" />
                              <div className="h-1 bg-primary/20 rounded w-3/4" />
                            </div>
                            <div className="space-y-1">
                              <div className="h-1 bg-primary/30 rounded w-full" />
                              <div className="h-1 bg-primary/20 rounded w-2/3" />
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 gap-1 mt-auto">
                            <div className="h-1 bg-primary/30 rounded w-full" />
                            <div className="h-1 bg-primary/20 rounded w-4/5" />
                            <div className="h-1 bg-primary/20 rounded w-3/5" />
                          </div>
                        )}
                      </div>

                      {/* Hover overlay */}
                      {hoveredTemplate === template.id && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity">
                          <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
