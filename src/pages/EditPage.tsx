
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye } from 'lucide-react';
import { DragDropResumeEditor } from '@/components/edit/DragDropResumeEditor';

const EditPage = () => {
  const { state } = useApp();
  const navigate = useNavigate();

  if (!state.parsedData) {
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
                onClick={() => navigate('/upload')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold">Edit Your Resume</h1>
            </div>
            
            <Button
              onClick={() => navigate('/preview')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview Portfolio
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <DragDropResumeEditor />
      </div>
    </div>
  );
};

export default EditPage;
