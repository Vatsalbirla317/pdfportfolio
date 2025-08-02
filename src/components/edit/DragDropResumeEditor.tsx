import React, { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  GripVertical, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2,
  Undo,
  Redo,
  Save,
  Upload
} from 'lucide-react';
import { PersonalSection } from './PersonalSection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { SkillsSection } from './SkillsSection';
import { ProjectsSection } from './ProjectsSection';
import { useAutoSave } from '@/hooks/useAutoSave';
import { toast } from '@/hooks/use-toast';

interface SectionConfig {
  id: string;
  title: string;
  component: React.ComponentType<any>;
  visible: boolean;
  required: boolean;
}

const defaultSections: SectionConfig[] = [
  { id: 'personal', title: 'Personal Information', component: PersonalSection, visible: true, required: true },
  { id: 'experience', title: 'Experience', component: ExperienceSection, visible: true, required: false },
  { id: 'education', title: 'Education', component: EducationSection, visible: true, required: false },
  { id: 'skills', title: 'Skills', component: SkillsSection, visible: true, required: false },
  { id: 'projects', title: 'Projects', component: ProjectsSection, visible: true, required: false },
];

export const DragDropResumeEditor: React.FC = () => {
  const { state, dispatch } = useApp();
  const [sections, setSections] = useState<SectionConfig[]>(defaultSections);
  const [history, setHistory] = useState<any[]>([state.resumeFormData]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('personal');

  // Auto-save functionality
  useAutoSave(2000);

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    const newSections = Array.from(sections);
    const [reorderedSection] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, reorderedSection);

    setSections(newSections);
    
    toast({
      title: 'Section reordered',
      description: `${reorderedSection.title} has been moved.`
    });
  }, [sections]);

  const toggleSectionVisibility = useCallback((sectionId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, visible: !section.visible }
        : section
    ));
  }, []);

  const addCustomSection = useCallback(() => {
    const newSection: SectionConfig = {
      id: `custom-${Date.now()}`,
      title: 'Custom Section',
      component: () => <div className="p-4 text-center text-muted-foreground">Custom section content</div>,
      visible: true,
      required: false
    };
    
    setSections(prev => [...prev, newSection]);
    
    toast({
      title: 'Section added',
      description: 'New custom section has been added.'
    });
  }, []);

  const removeSection = useCallback((sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section?.required) {
      toast({
        title: 'Cannot remove',
        description: 'This section is required and cannot be removed.',
        variant: 'destructive'
      });
      return;
    }

    setSections(prev => prev.filter(s => s.id !== sectionId));
    
    toast({
      title: 'Section removed',
      description: `${section?.title} has been removed.`
    });
  }, [sections]);

  const saveVersion = useCallback(() => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ ...state.resumeFormData });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    toast({
      title: 'Version saved',
      description: 'A new version of your resume has been saved.'
    });
  }, [state.resumeFormData, history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const previousData = history[historyIndex - 1];
      dispatch({ type: 'UPDATE_RESUME_DATA', payload: previousData });
      setHistoryIndex(historyIndex - 1);
      
      toast({
        title: 'Undone',
        description: 'Last change has been undone.'
      });
    }
  }, [history, historyIndex, dispatch]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextData = history[historyIndex + 1];
      dispatch({ type: 'UPDATE_RESUME_DATA', payload: nextData });
      setHistoryIndex(historyIndex + 1);
      
      toast({
        title: 'Redone',
        description: 'Change has been redone.'
      });
    }
  }, [history, historyIndex, dispatch]);

  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(state.resumeFormData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Data exported',
      description: 'Resume data has been exported as JSON.'
    });
  }, [state.resumeFormData]);

  const importData = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        dispatch({ type: 'UPDATE_RESUME_DATA', payload: data });
        
        toast({
          title: 'Data imported',
          description: 'Resume data has been imported successfully.'
        });
      } catch (error) {
        toast({
          title: 'Import failed',
          description: 'Failed to parse the JSON file.',
          variant: 'destructive'
        });
      }
    };
    reader.readAsText(file);
  }, [dispatch]);

  const visibleSections = sections.filter(section => section.visible);

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={undo}
              disabled={historyIndex === 0}
              className="flex items-center gap-2"
            >
              <Undo className="h-4 w-4" />
              Undo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={redo}
              disabled={historyIndex === history.length - 1}
              className="flex items-center gap-2"
            >
              <Redo className="h-4 w-4" />
              Redo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={saveVersion}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Version
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={exportData}
              className="flex items-center gap-2"
            >
              Export
            </Button>
            <Label htmlFor="import-data" className="cursor-pointer">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="flex items-center gap-2"
              >
                <span>
                  <Upload className="h-4 w-4" />
                  Import
                </span>
              </Button>
            </Label>
            <input
              id="import-data"
              type="file"
              accept=".json"
              onChange={importData}
              className="hidden"
            />
          </div>
        </div>
      </Card>

      {/* Section Visibility Controls */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Section Visibility</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => (
            <div key={section.id} className="flex items-center justify-between">
              <Label htmlFor={`section-${section.id}`} className="flex items-center gap-2">
                {section.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                {section.title}
                {section.required && <Badge variant="secondary" className="text-xs">Required</Badge>}
              </Label>
              <div className="flex items-center gap-2">
                <Switch
                  id={`section-${section.id}`}
                  checked={section.visible}
                  onCheckedChange={() => toggleSectionVisibility(section.id)}
                  disabled={section.required}
                />
                {!section.required && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSection(section.id)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          onClick={addCustomSection}
          className="mt-4 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Custom Section
        </Button>
      </Card>

      {/* Main Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section Navigation */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Sections</h3>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="sections">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {visibleSections.map((section, index) => (
                      <Draggable
                        key={section.id}
                        draggableId={section.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`flex items-center gap-2 p-3 bg-background border rounded-lg cursor-pointer transition-all ${
                              snapshot.isDragging
                                ? 'shadow-lg scale-105'
                                : 'hover:shadow-md'
                            } ${
                              activeTab === section.id
                                ? 'border-primary bg-primary/5'
                                : 'border-border'
                            }`}
                            onClick={() => setActiveTab(section.id)}
                          >
                            <div
                              {...provided.dragHandleProps}
                              className="flex-shrink-0 text-muted-foreground hover:text-foreground"
                            >
                              <GripVertical className="h-4 w-4" />
                            </div>
                            <span className="flex-1 font-medium">{section.title}</span>
                            {section.visible ? (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Card>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              {visibleSections.map((section) => (
                <TabsTrigger key={section.id} value={section.id} className="text-xs">
                  {section.title.split(' ')[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            {visibleSections.map((section) => {
              const SectionComponent = section.component;
              return (
                <TabsContent key={section.id} value={section.id} className="mt-6">
                  <Card className="p-6">
                    <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
                    <SectionComponent />
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
};