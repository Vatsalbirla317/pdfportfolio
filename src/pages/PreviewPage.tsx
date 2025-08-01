
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Edit, Share, Download, ExternalLink, Wand2 } from 'lucide-react';
import { PortfolioPreview } from '@/components/preview/PortfolioPreview';
import { ThemeCustomizer } from '@/components/preview/ThemeCustomizer';
import { TemplateSelector } from '@/components/templates/TemplateSelector';
import { ShareModal } from '@/components/sharing/ShareModal';
import { usePortfolioGeneration } from '@/hooks/usePortfolioGeneration';

const PreviewPage = () => {
  const { state } = useApp();
  const navigate = useNavigate();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { isGenerating, generatedPortfolio, generatePortfolio } = usePortfolioGeneration();

  if (!state.resumeFormData.name) {
    navigate('/upload');
    return null;
  }

  const handleGeneratePortfolio = async () => {
    await generatePortfolio();
    if (generatedPortfolio) {
      setIsShareModalOpen(true);
    }
  };

  const handleDownload = async () => {
    if (!generatedPortfolio) {
      await generatePortfolio();
    }
    // Download logic will be handled by the ShareModal
  };

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
              <Button
                onClick={handleGeneratePortfolio}
                disabled={isGenerating}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate Portfolio'}
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleDownload}
                disabled={isGenerating}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setIsShareModalOpen(true)}
                disabled={!generatedPortfolio}
              >
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
            <Tabs defaultValue="theme" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="theme">Theme</TabsTrigger>
                <TabsTrigger value="template">Template</TabsTrigger>
              </TabsList>
              
              <TabsContent value="theme">
                <ThemeCustomizer />
              </TabsContent>
              
              <TabsContent value="template" className="space-y-4">
                <div className="max-h-[80vh] overflow-y-auto">
                  <TemplateSelector selectedTemplateId={state.themeSettings.template} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="border-b p-4 bg-muted/50">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Live Preview</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(generatedPortfolio?.url, '_blank')}
                      disabled={!generatedPortfolio}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in New Tab
                    </Button>
                  </div>
                </div>
              </div>
              <PortfolioPreview />
            </div>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        portfolio={generatedPortfolio}
      />
    </div>
  );
};

export default PreviewPage;
