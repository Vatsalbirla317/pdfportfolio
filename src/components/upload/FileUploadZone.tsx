
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/contexts/AppContext';
import { UploadProgress } from './UploadProgress';

export const FileUploadZone = () => {
  const { dispatch } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    if (!file) return;

    // Validate file
    if (file.type !== 'application/pdf') {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PDF file only.',
        variant: 'destructive'
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: 'File too large',
        description: 'Please upload a file smaller than 5MB.',
        variant: 'destructive'
      });
      return;
    }

    setIsUploading(true);
    dispatch({ type: 'SET_UPLOADED_FILE', payload: file });

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    toast({
      title: 'Upload successful!',
      description: 'Your resume has been uploaded. Starting parsing...'
    });

    // Navigate to parsing page
    setTimeout(() => {
      navigate('/parsing');
    }, 1000);
  }, [dispatch, navigate, toast]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    disabled: isUploading
  });

  if (isUploading) {
    return <UploadProgress progress={uploadProgress} />;
  }

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 cursor-pointer
          ${isDragActive 
            ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20' 
            : 'border-border hover:border-purple-400 hover:bg-accent/50'
          }
        `}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">
              {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
            </h3>
            <p className="text-muted-foreground mb-4">
              or <span className="text-purple-600 font-medium">browse files</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Supports PDF files up to 5MB
            </p>
          </div>
        </div>
      </div>

      {fileRejections.length > 0 && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="w-4 h-4" />
            <span className="font-medium">Upload failed</span>
          </div>
          <div className="mt-2 text-sm text-destructive/80">
            {fileRejections[0].errors[0].message}
          </div>
        </div>
      )}

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          <FileText className="w-4 h-4 inline mr-1" />
          Your resume will be processed securely and never stored permanently
        </p>
      </div>
    </div>
  );
};
