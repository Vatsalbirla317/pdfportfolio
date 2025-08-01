
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileUploadZone } from '@/components/upload/FileUploadZone';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const UploadPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">
              Upload Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Resume</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Upload your PDF resume and let AI transform it into a stunning portfolio website
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <FileUploadZone />
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
