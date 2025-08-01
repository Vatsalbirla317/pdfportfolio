
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Github, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export const ProjectsSection = () => {
  const { state, dispatch } = useApp();
  const projects = state.resumeFormData.projects || [];

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: [],
      githubUrl: '',
      liveUrl: ''
    };
    
    dispatch({
      type: 'UPDATE_RESUME_DATA',
      payload: { projects: [...projects, newProject] }
    });
  };

  const removeProject = (id: string) => {
    dispatch({
      type: 'UPDATE_RESUME_DATA',
      payload: { projects: projects.filter(proj => proj.id !== id) }
    });
  };

  const updateProject = (id: string, field: string, value: string | string[]) => {
    dispatch({
      type: 'UPDATE_RESUME_DATA',
      payload: {
        projects: projects.map(proj =>
          proj.id === id ? { ...proj, [field]: value } : proj
        )
      }
    });
  };

  const updateTechnologies = (id: string, techString: string) => {
    const technologies = techString.split(',').map(tech => tech.trim()).filter(Boolean);
    updateProject(id, 'technologies', technologies);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-muted-foreground">Showcase your work and side projects</p>
        </div>
        <Button onClick={addProject}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {projects.map((project, index) => (
        <Card key={project.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Project #{index + 1}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeProject(project.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Project Title</Label>
              <Input
                value={project.title}
                onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                placeholder="My Awesome Project"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                placeholder="Describe what this project does and your role in it..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Technologies Used</Label>
              <Input
                value={project.technologies.join(', ')}
                onChange={(e) => updateTechnologies(project.id, e.target.value)}
                placeholder="React, Node.js, MongoDB (separate with commas)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub URL
                </Label>
                <Input
                  value={project.githubUrl || ''}
                  onChange={(e) => updateProject(project.id, 'githubUrl', e.target.value)}
                  placeholder="https://github.com/username/project"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Live Demo URL
                </Label>
                <Input
                  value={project.liveUrl || ''}
                  onChange={(e) => updateProject(project.id, 'liveUrl', e.target.value)}
                  placeholder="https://myproject.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {projects.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-muted-foreground mb-4">No projects added yet</p>
            <Button onClick={addProject}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
