
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalSection } from './PersonalSection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { SkillsSection } from './SkillsSection';
import { ProjectsSection } from './ProjectsSection';

export const ResumeEditor = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="personal">
            <PersonalSection />
          </TabsContent>
          
          <TabsContent value="experience">
            <ExperienceSection />
          </TabsContent>
          
          <TabsContent value="education">
            <EducationSection />
          </TabsContent>
          
          <TabsContent value="skills">
            <SkillsSection />
          </TabsContent>
          
          <TabsContent value="projects">
            <ProjectsSection />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
