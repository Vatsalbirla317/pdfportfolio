
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PDFParser, ParseProgress } from '@/services/pdfParser';
import { useApp } from '@/contexts/AppContext';

export interface FileUploadState {
  isUploading: boolean;
  uploadProgress: number;
  isParsing: boolean;
  parseProgress: ParseProgress | null;
  error: string | null;
}

export const useFileUpload = () => {
  const { dispatch } = useApp();
  const { toast } = useToast();
  
  const [state, setState] = useState<FileUploadState>({
    isUploading: false,
    uploadProgress: 0,
    isParsing: false,
    parseProgress: null,
    error: null
  });

  const validateFile = (file: File): boolean => {
    if (file.type !== 'application/pdf') {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PDF file only.',
        variant: 'destructive'
      });
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload a file smaller than 5MB.',
        variant: 'destructive'
      });
      return false;
    }

    return true;
  };

  const simulateUpload = async (): Promise<void> => {
    setState(prev => ({ ...prev, isUploading: true, uploadProgress: 0 }));
    
    for (let i = 0; i <= 100; i += 10) {
      setState(prev => ({ ...prev, uploadProgress: i }));
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    
    setState(prev => ({ ...prev, isUploading: false, uploadProgress: 100 }));
  };

  const parsePDF = async (file: File): Promise<void> => {
    setState(prev => ({ ...prev, isParsing: true, parseProgress: null }));
    
    const parser = new PDFParser((progress) => {
      setState(prev => ({ ...prev, parseProgress: progress }));
    });

    try {
      const parsedData = await parser.parsePDF(file);
      dispatch({ type: 'SET_PARSED_DATA', payload: parsedData });
      
      toast({
        title: 'Success!',
        description: 'Your resume has been parsed successfully.'
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setState(prev => ({ ...prev, error: errorMessage }));
      
      toast({
        title: 'Parsing failed',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setState(prev => ({ ...prev, isParsing: false }));
    }
  };

  const uploadAndParse = useCallback(async (file: File) => {
    if (!validateFile(file)) return;

    setState(prev => ({ ...prev, error: null }));
    dispatch({ type: 'SET_UPLOADED_FILE', payload: file });

    try {
      await simulateUpload();
      await parsePDF(file);
    } catch (error) {
      console.error('Upload and parse error:', error);
    }
  }, [dispatch, toast]);

  const reset = useCallback(() => {
    setState({
      isUploading: false,
      uploadProgress: 0,
      isParsing: false,
      parseProgress: null,
      error: null
    });
  }, []);

  return {
    ...state,
    uploadAndParse,
    reset
  };
};
