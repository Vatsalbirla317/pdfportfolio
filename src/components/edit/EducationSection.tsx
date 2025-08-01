
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const EducationSection = () => {
  const { state, dispatch } = useApp();
  const education = state.resumeFormData.education || [];

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      year: ''
    };
    
    dispatch({
      type: 'UPDATE_RESUME_DATA',
      payload: { education: [...education, newEdu] }
    });
  };

  const removeEducation = (id: string) => {
    dispatch({
      type: 'UPDATE_RESUME_DATA',
      payload: { education: education.filter(edu => edu.id !== id) }
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    dispatch({
      type: 'UPDATE_RESUME_DATA',
      payload: {
        education: education.map(edu =>
          edu.id === id ? { ...edu, [field]: value } : edu
        )
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Education</h2>
          <p className="text-muted-foreground">Add your educational background</p>
        </div>
        <Button onClick={addEducation}>
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      {education.map((edu, index) => (
        <Card key={edu.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Education #{index + 1}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(edu.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Degree</Label>
              <Input
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                placeholder="Bachelor of Computer Science"
              />
            </div>
            
            <div className="space-y-2">
              <Label>School/University</Label>
              <Input
                value={edu.school}
                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                placeholder="University Name"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Year</Label>
              <Input
                value={edu.year}
                onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                placeholder="2019"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
