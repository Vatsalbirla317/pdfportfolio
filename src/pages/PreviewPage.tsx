
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Share, Download, ExternalLink } from 'lucide-react';
import { PortfolioPreview } from '@/components/preview/PortfolioPreview';
import { ThemeCustomizer } from '@/components/preview/ThemeCustomizer';

const PreviewPage = () => {
  const { state } = useApp();
  const navigate = useNavigate();

  if (!state.resumeFormData.name) {
    navigate('/upload');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/edit')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Edit
              </Button>
              <h1 className="text-2xl font-bold">Portfolio Preview</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download HTML
              </Button>
              <Button variant="outline">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                onClick={() => navigate('/edit')}
                variant="outline"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ThemeCustomizer />
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <PortfolioPreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
