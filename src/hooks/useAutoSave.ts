
import { useEffect, useRef } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

export const useAutoSave = (delay: number = 2000) => {
  const { state } = useApp();
  const { toast } = useToast();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastSavedRef = useRef<string>('');

  useEffect(() => {
    const currentData = JSON.stringify(state.resumeFormData);
    
    if (currentData === lastSavedRef.current) {
      return; // No changes
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      // Save to localStorage
      localStorage.setItem('resumeFormData', currentData);
      lastSavedRef.current = currentData;
      
      toast({
        title: 'Draft saved',
        description: 'Your changes have been automatically saved.',
        duration: 2000
      });
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [state.resumeFormData, delay, toast]);
};
