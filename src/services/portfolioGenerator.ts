
import { ParsedData, ThemeSettings } from '@/contexts/AppContext';

export interface PortfolioTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string;
  layout: 'single' | 'two-column' | 'minimal' | 'creative';
  features: string[];
}

export interface GeneratedPortfolio {
  html: string;
  css: string;
  assets: string[];
  url: string;
  template: PortfolioTemplate;
}

export class PortfolioGenerator {
  private templates: PortfolioTemplate[] = [
    {
      id: 'modern-dev',
      name: 'Modern Developer',
      description: 'Clean, professional design perfect for software developers',
      category: 'Developer',
      preview: '/templates/modern-dev.jpg',
      layout: 'two-column',
      features: ['Dark/Light Mode', 'GitHub Integration', 'Project Showcase']
    },
    {
      id: 'creative-designer',
      name: 'Creative Designer',
      description: 'Bold, visual design ideal for creative professionals',
      category: 'Designer',
      preview: '/templates/creative-designer.jpg',
      layout: 'creative',
      features: ['Portfolio Gallery', 'Animation Effects', 'Visual Timeline']
    },
    {
      id: 'minimal-business',
      name: 'Minimal Business',
      description: 'Clean, corporate design for business professionals',
      category: 'Business',
      preview: '/templates/minimal-business.jpg',
      layout: 'single',
      features: ['Professional Layout', 'Contact Form', 'Achievement Highlights']
    },
    {
      id: 'academic-researcher',
      name: 'Academic Researcher',
      description: 'Scholarly design for academics and researchers',
      category: 'Academic',
      preview: '/templates/academic-researcher.jpg',
      layout: 'single',
      features: ['Publication List', 'Research Timeline', 'Citation Ready']
    }
  ];

  getTemplates(): PortfolioTemplate[] {
    return this.templates;
  }

  getTemplate(id: string): PortfolioTemplate | undefined {
    return this.templates.find(template => template.id === id);
  }

  async generatePortfolio(
    data: ParsedData,
    theme: ThemeSettings,
    templateId: string
  ): Promise<GeneratedPortfolio> {
    const template = this.getTemplate(templateId);
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }

    const html = this.generateHTML(data, theme, template);
    const css = this.generateCSS(theme, template);
    const assets = this.generateAssets(data, theme);
    const url = this.generateShareableUrl();

    return {
      html,
      css,
      assets,
      url,
      template
    };
  }

  private generateHTML(data: ParsedData, theme: ThemeSettings, template: PortfolioTemplate): string {
    const colorVars = this.getCSSColorVariables(theme.color);
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.name} - Portfolio</title>
    <meta name="description" content="${data.summary}">
    <link href="https://fonts.googleapis.com/css2?family=${theme.font}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        ${this.generateCSS(theme, template)}
    </style>
</head>
<body class="${template.layout}">
    <div class="portfolio-container">
        ${this.generateHeaderHTML(data, theme)}
        ${this.generateSummaryHTML(data)}
        ${this.generateSkillsHTML(data)}
        ${this.generateExperienceHTML(data)}
        ${this.generateEducationHTML(data)}
        ${this.generateProjectsHTML(data)}
    </div>
</body>
</html>
    `.trim();
  }

  private generateHeaderHTML(data: ParsedData, theme: ThemeSettings): string {
    return `
<header class="portfolio-header">
    <div class="header-content">
        ${theme.image ? `<img src="${theme.image}" alt="${data.name}" class="profile-image">` : ''}
        <div class="header-text">
            <h1 class="name">${data.name}</h1>
            <div class="contact-info">
                ${data.email ? `<a href="mailto:${data.email}" class="contact-link">${data.email}</a>` : ''}
                ${data.phone ? `<span class="contact-link">${data.phone}</span>` : ''}
            </div>
        </div>
    </div>
</header>
    `;
  }

  private generateSummaryHTML(data: ParsedData): string {
    if (!data.summary) return '';
    
    return `
<section class="portfolio-section summary-section">
    <h2 class="section-title">About Me</h2>
    <p class="summary-text">${data.summary}</p>
</section>
    `;
  }

  private generateSkillsHTML(data: ParsedData): string {
    if (!data.skills || data.skills.length === 0) return '';
    
    return `
<section class="portfolio-section skills-section">
    <h2 class="section-title">Skills</h2>
    <div class="skills-grid">
        ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
    </div>
</section>
    `;
  }

  private generateExperienceHTML(data: ParsedData): string {
    if (!data.experience || data.experience.length === 0) return '';
    
    return `
<section class="portfolio-section experience-section">
    <h2 class="section-title">Experience</h2>
    <div class="timeline">
        ${data.experience.map(exp => `
            <div class="timeline-item">
                <div class="timeline-content">
                    <h3 class="job-title">${exp.title}</h3>
                    <p class="company">${exp.company}</p>
                    <p class="date-range">${exp.startDate} - ${exp.endDate}</p>
                    <p class="job-description">${exp.description}</p>
                </div>
            </div>
        `).join('')}
    </div>
</section>
    `;
  }

  private generateEducationHTML(data: ParsedData): string {
    if (!data.education || data.education.length === 0) return '';
    
    return `
<section class="portfolio-section education-section">
    <h2 class="section-title">Education</h2>
    <div class="education-list">
        ${data.education.map(edu => `
            <div class="education-item">
                <h3 class="degree">${edu.degree}</h3>
                <p class="school">${edu.school}</p>
                <p class="year">${edu.year}</p>
            </div>
        `).join('')}
    </div>
</section>
    `;
  }

  private generateProjectsHTML(data: ParsedData): string {
    if (!data.projects || data.projects.length === 0) return '';
    
    return `
<section class="portfolio-section projects-section">
    <h2 class="section-title">Projects</h2>
    <div class="projects-grid">
        ${data.projects.map(project => `
            <div class="project-card">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="project-link">GitHub</a>` : ''}
                    ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="project-link">Live Demo</a>` : ''}
                </div>
            </div>
        `).join('')}
    </div>
</section>
    `;
  }

  private generateCSS(theme: ThemeSettings, template: PortfolioTemplate): string {
    const colorVars = this.getCSSColorVariables(theme.color);
    
    return `
:root {
    ${colorVars}
    --font-family: '${theme.font}', sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-family);
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--bg-color);
}

.portfolio-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.portfolio-header {
    text-align: center;
    padding: 3rem 0;
    border-bottom: 2px solid var(--primary-color);
    margin-bottom: 3rem;
}

.header-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
}

.profile-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--primary-color);
}

.name {
    font-size: 3rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.contact-info {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
}

.contact-link {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 1.1rem;
}

.contact-link:hover {
    color: var(--primary-color);
}

.portfolio-section {
    margin-bottom: 3rem;
}

.section-title {
    font-size: 2rem;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--primary-color);
}

.summary-text {
    font-size: 1.2rem;
    line-height: 1.8;
    color: var(--text-color);
}

.skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.skill-tag {
    background-color: var(--primary-color);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 0.9rem;
    font-weight: 500;
}

.timeline {
    position: relative;
    padding-left: 2rem;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: var(--primary-color);
}

.timeline-item {
    position: relative;
    margin-bottom: 2rem;
    padding-left: 2rem;
}

.timeline-item::before {
    content: '';
    position: absolute;
    left: -6px;
    top: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--primary-color);
}

.job-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.company {
    font-size: 1.2rem;
    color: var(--primary-color);
    font-weight: 500;
    margin-bottom: 0.5rem;
}

.date-range {
    color: var(--text-muted);
    margin-bottom: 1rem;
}

.job-description {
    line-height: 1.7;
}

.education-list {
    display: grid;
    gap: 1.5rem;
}

.education-item {
    padding: 1.5rem;
    border-left: 4px solid var(--primary-color);
    background-color: var(--bg-secondary);
    border-radius: 0 8px 8px 0;
}

.degree {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.school {
    font-size: 1.1rem;
    color: var(--primary-color);
    font-weight: 500;
    margin-bottom: 0.5rem;
}

.year {
    color: var(--text-muted);
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.project-card {
    padding: 2rem;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    background-color: var(--bg-secondary);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.project-title {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--primary-color);
}

.project-description {
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.tech-tag {
    background-color: var(--primary-color);
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    opacity: 0.9;
}

.project-links {
    display: flex;
    gap: 1rem;
}

.project-link {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border: 1px solid var(--primary-color);
    border-radius: 6px;
    transition: all 0.3s ease;
}

.project-link:hover {
    background-color: var(--primary-color);
    color: white;
}

@media (max-width: 768px) {
    .portfolio-container {
        padding: 1rem;
    }
    
    .name {
        font-size: 2rem;
    }
    
    .contact-info {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .timeline {
        padding-left: 1rem;
    }
    
    .timeline-item {
        padding-left: 1rem;
    }
    
    .projects-grid {
        grid-template-columns: 1fr;
    }
}
    `;
  }

  private getCSSColorVariables(color: string): string {
    const colorMap = {
      purple: {
        primary: '#8B5CF6',
        text: '#1F2937',
        textMuted: '#6B7280',
        bg: '#FFFFFF',
        bgSecondary: '#F9FAFB',
        border: '#E5E7EB'
      },
      blue: {
        primary: '#3B82F6',
        text: '#1F2937',
        textMuted: '#6B7280',
        bg: '#FFFFFF',
        bgSecondary: '#F9FAFB',
        border: '#E5E7EB'
      },
      green: {
        primary: '#10B981',
        text: '#1F2937',
        textMuted: '#6B7280',
        bg: '#FFFFFF',
        bgSecondary: '#F9FAFB',
        border: '#E5E7EB'
      },
      pink: {
        primary: '#EC4899',
        text: '#1F2937',
        textMuted: '#6B7280',
        bg: '#FFFFFF',
        bgSecondary: '#F9FAFB',
        border: '#E5E7EB'
      }
    };

    const colors = colorMap[color as keyof typeof colorMap] || colorMap.purple;
    
    return `
--primary-color: ${colors.primary};
--text-color: ${colors.text};
--text-muted: ${colors.textMuted};
--bg-color: ${colors.bg};
--bg-secondary: ${colors.bgSecondary};
--border-color: ${colors.border};
    `.trim();
  }

  private generateAssets(data: ParsedData, theme: ThemeSettings): string[] {
    const assets: string[] = [];
    
    if (theme.image) {
      assets.push(theme.image);
    }
    
    // Add any other assets that might be needed
    return assets;
  }

  private generateShareableUrl(): string {
    // Generate a unique ID for the portfolio
    const portfolioId = Math.random().toString(36).substr(2, 9);
    return `${window.location.origin}/portfolio/${portfolioId}`;
  }

  async exportToZip(portfolio: GeneratedPortfolio): Promise<Blob> {
    // This would typically use a library like JSZip
    // For now, we'll create a simple blob with the HTML content
    return new Blob([portfolio.html], { type: 'text/html' });
  }

  async generateShareableUrl(portfolio: GeneratedPortfolio): Promise<string> {
    // This would typically involve uploading to a server
    // For now, we'll return the URL from the portfolio object
    return portfolio.url;
  }
}
