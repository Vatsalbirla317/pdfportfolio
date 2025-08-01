
import React from 'react';
import { FileText, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface UploadProgressProps {
  progress: number;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({ progress }) => {
  return (
    <div className="max-w-md mx-auto bg-card border rounded-2xl p-8 text-center">
      <div className="space-y-6">
        <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
          <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Uploading Resume</h3>
          <p className="text-muted-foreground mb-4">
            Please wait while we upload your file...
          </p>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground">{progress}% complete</p>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          Processing...
        </div>
      </div>
    </div>
  );
};
