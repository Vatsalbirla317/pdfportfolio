
import { useState, useCallback } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { PortfolioGenerator, GeneratedPortfolio } from '@/services/portfolioGenerator';

export interface PortfolioGenerationState {
  isGenerating: boolean;
  generatedPortfolio: GeneratedPortfolio | null;
  error: string | null;
}

export const usePortfolioGeneration = () => {
  const { state } = useApp();
  const { toast } = useToast();
  const [generationState, setGenerationState] = useState<PortfolioGenerationState>({
    isGenerating: false,
    generatedPortfolio: null,
    error: null
  });

  const portfolioGenerator = new PortfolioGenerator();

  const generatePortfolio = useCallback(async (templateId?: string) => {
    if (!state.resumeFormData.name) {
      toast({
        title: 'Missing Data',
        description: 'Please complete your resume information before generating a portfolio.',
        variant: 'destructive'
      });
      return;
    }

    const selectedTemplate = templateId || state.themeSettings.template || 'modern-dev';
    
    setGenerationState(prev => ({
      ...prev,
      isGenerating: true,
      error: null
    }));

    try {
      // Simulate generation time for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const portfolio = await portfolioGenerator.generatePortfolio(
        state.resumeFormData as any, // Type assertion for now
        state.themeSettings,
        selectedTemplate
      );

      setGenerationState({
        isGenerating: false,
        generatedPortfolio: portfolio,
        error: null
      });

      toast({
        title: 'Portfolio Generated!',
        description: 'Your portfolio has been successfully created and is ready to share.'
      });

      return portfolio;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate portfolio';
      
      setGenerationState({
        isGenerating: false,
        generatedPortfolio: null,
        error: errorMessage
      });

      toast({
        title: 'Generation Failed',
        description: errorMessage,
        variant: 'destructive'
      });
    }
  }, [state.resumeFormData, state.themeSettings, toast]);

  const reset = useCallback(() => {
    setGenerationState({
      isGenerating: false,
      generatedPortfolio: null,
      error: null
    });
  }, []);

  return {
    ...generationState,
    generatePortfolio,
    reset
  };
};
