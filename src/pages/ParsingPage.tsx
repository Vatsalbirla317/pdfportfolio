
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { ParsingLoader } from '@/components/parsing/ParsingLoader';
import { ExtractionSteps } from '@/components/parsing/ExtractionSteps';
import { useToast } from '@/hooks/use-toast';

const ParsingPage = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!state.uploadedFile) {
      navigate('/upload');
      return;
    }

    // Simulate parsing process
    const steps = ['Extracting text', 'Analyzing sections', 'Parsing details', 'Finalizing data'];
    
    const simulateParsing = async () => {
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Mock parsed data
      const mockParsedData = {
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        summary: 'Experienced software developer with 5+ years of expertise in full-stack development.',
        experience: [
          {
            id: '1',
            title: 'Senior Software Engineer',
            company: 'Tech Corp',
            startDate: '2021',
            endDate: 'Present',
            description: 'Led development of multiple web applications using React and Node.js'
          },
          {
            id: '2',
            title: 'Software Developer',
            company: 'StartupXYZ',
            startDate: '2019',
            endDate: '2021',
            description: 'Built responsive web applications and RESTful APIs'
          }
        ],
        education: [
          {
            id: '1',
            degree: 'Bachelor of Computer Science',
            school: 'University of Technology',
            year: '2019'
          }
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Python', 'AWS'],
        projects: [
          {
            id: '1',
            title: 'E-commerce Platform',
            description: 'Built a full-stack e-commerce platform with React and Node.js',
            technologies: ['React', 'Node.js', 'MongoDB'],
            githubUrl: 'https://github.com/example/ecommerce',
            liveUrl: 'https://example-ecommerce.com'
          }
        ]
      };

      dispatch({ type: 'SET_PARSED_DATA', payload: mockParsedData });
      
      toast({
        title: 'Parsing completed!',
        description: 'Your resume has been successfully analyzed.'
      });

      setTimeout(() => {
        navigate('/edit');
      }, 1500);
    };

    simulateParsing();
  }, [state.uploadedFile, dispatch, navigate, toast]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-8">
            Analyzing Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Resume</span>
          </h1>
          
          <div className="space-y-8">
            <ParsingLoader />
            <ExtractionSteps currentStep={currentStep} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParsingPage;
