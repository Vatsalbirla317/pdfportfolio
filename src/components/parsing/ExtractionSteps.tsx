
import React from 'react';
import { Check, Loader2 } from 'lucide-react';

interface ExtractionStepsProps {
  currentStep: number;
}

export const ExtractionSteps: React.FC<ExtractionStepsProps> = ({ currentStep }) => {
  const steps = [
    'Extracting text from PDF',
    'Identifying resume sections',
    'Parsing work experience and skills',
    'Finalizing structured data'
  ];

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-4 p-4 bg-card border rounded-lg">
          <div className="flex-shrink-0">
            {index < currentStep ? (
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            ) : index === currentStep ? (
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              </div>
            ) : (
              <div className="w-8 h-8 bg-muted border-2 border-border rounded-full" />
            )}
          </div>
          
          <div className="flex-1 text-left">
            <p className={`font-medium ${
              index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {step}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
