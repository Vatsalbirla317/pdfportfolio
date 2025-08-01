
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export const ExperienceSection = () => {
  const { state, dispatch } = useApp();
  const experience = state.resumeFormData.experience || [];

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    
    dispatch({
      type: 'UPDATE_RESUME_DATA',
      payload: { experience: [...experience, newExp] }
    });
  };

  const removeExperience = (id: string) => {
    dispatch({
      type: 'UPDATE_RESUME_DATA',
      payload: { experience: experience.filter(exp => exp.id !== id) }
    });
  };

  const updateExperience = (id: string, field: string, value: string) => {
    dispatch({
      type: 'UPDATE_RESUME_DATA',
      payload: {
        experience: experience.map(exp =>
          exp.id === id ? { ...exp, [field]: value } : exp
        )
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Work Experience</h2>
          <p className="text-muted-foreground">Add your professional experience</p>
        </div>
        <Button onClick={addExperience}>
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {experience.map((exp, index) => (
        <Card key={exp.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Experience #{index + 1}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(exp.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                  placeholder="Senior Developer"
                />
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  placeholder="Company Name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  placeholder="2020"
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  placeholder="Present"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                placeholder="Describe your responsibilities and achievements..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {experience.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-muted-foreground mb-4">No experience added yet</p>
            <Button onClick={addExperience}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Experience
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
