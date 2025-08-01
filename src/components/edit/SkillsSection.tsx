
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

export const SkillsSection = () => {
  const { state, dispatch } = useApp();
  const skills = state.resumeFormData.skills || [];
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      dispatch({
        type: 'UPDATE_RESUME_DATA',
        payload: { skills: [...skills, newSkill.trim()] }
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    dispatch({
      type: 'UPDATE_RESUME_DATA',
      payload: { skills: skills.filter(skill => skill !== skillToRemove) }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addSkill();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>
          Add your technical and professional skills
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a skill (e.g., JavaScript, React, etc.)"
            className="flex-1"
          />
          <Button onClick={addSkill}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-sm py-2 px-3">
              {skill}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeSkill(skill)}
                className="ml-2 h-auto p-0 hover:bg-transparent"
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}
        </div>

        {skills.length === 0 && (
          <p className="text-muted-foreground text-center py-8">
            No skills added yet. Start by adding your first skill above.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
