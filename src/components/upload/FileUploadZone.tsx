
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, AlertCircle, X, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useFileUpload } from '@/hooks/useFileUpload';
import { UploadProgress } from './UploadProgress';

interface FileWithPreview extends File {
  preview?: string;
}

export const FileUploadZone = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(null);
  const { isUploading, uploadProgress, isParsing, parseProgress, error, uploadAndParse, reset } = useFileUpload();

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0] as FileWithPreview;
      setSelectedFile(file);
      
      toast({
        title: 'File selected',
        description: `${file.name} is ready to upload.`
      });
    }
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    disabled: isUploading || isParsing
  });

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    await uploadAndParse(selectedFile);
    
    // Navigate to parsing page on success
    if (!error) {
      setTimeout(() => {
        navigate('/parsing');
      }, 1000);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    reset();
  };

  if (isUploading || isParsing) {
    return (
      <UploadProgress 
        progress={isUploading ? uploadProgress : parseProgress?.progress || 0}
        step={isParsing ? parseProgress?.step : 'Uploading file'}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* File Preview */}
      {selectedFile && (
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                <File className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="font-medium text-sm">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="mt-4 flex gap-2">
            <Button onClick={handleUpload} className="flex-1">
              <Upload className="w-4 h-4 mr-2" />
              Upload & Parse Resume
            </Button>
            <Button variant="outline" onClick={removeFile}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Upload Zone */}
      {!selectedFile && (
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
      )}

      {/* Error Display */}
      {(error || fileRejections.length > 0) && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="w-4 h-4" />
            <span className="font-medium">Upload Error</span>
          </div>
          <div className="mt-2 text-sm text-destructive/80">
            {error || fileRejections[0]?.errors[0]?.message}
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
