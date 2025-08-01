
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Mail, Phone, MapPin, Github, ExternalLink, Calendar } from 'lucide-react';

export const PortfolioPreview = () => {
  const { state } = useApp();
  const data = state.resumeFormData;
  const theme = state.themeSettings;

  return (
    <div className={`p-8 text-gray-900 font-${theme.font.toLowerCase()}`} style={{
      '--theme-color': theme.color === 'purple' ? '#8B5CF6' : 
                      theme.color === 'blue' ? '#3B82F6' :
                      theme.color === 'green' ? '#10B981' : '#8B5CF6'
    } as React.CSSProperties}>
      {/* Header */}
      <header className="text-center mb-12 pb-8 border-b-2" style={{ borderColor: 'var(--theme-color)' }}>
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--theme-color)' }}>
          {data.name || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-gray-600">
          {data.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {data.email}
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {data.phone}
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--theme-color)' }}>
            About Me
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--theme-color)' }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: 'var(--theme-color)' }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--theme-color)' }}>
            Work Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="border-l-4 pl-6" style={{ borderColor: 'var(--theme-color)' }}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <p className="text-lg font-medium mb-2" style={{ color: 'var(--theme-color)' }}>
                  {exp.company}
                </p>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--theme-color)' }}>
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="border-l-4 pl-6" style={{ borderColor: 'var(--theme-color)' }}>
                <h3 className="text-xl font-semibold">{edu.degree}</h3>
                <p className="text-lg font-medium" style={{ color: 'var(--theme-color)' }}>
                  {edu.school}
                </p>
                <p className="text-gray-500">{edu.year}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--theme-color)' }}>
            Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.projects.map((project) => (
              <div key={project.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-700 mb-4">{project.description}</p>
                
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded"
                        style={{ backgroundColor: 'var(--theme-color)', opacity: 0.1, color: 'var(--theme-color)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm hover:underline"
                      style={{ color: 'var(--theme-color)' }}
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm hover:underline"
                      style={{ color: 'var(--theme-color)' }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
