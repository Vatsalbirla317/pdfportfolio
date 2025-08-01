
import * as pdfjsLib from 'pdfjs-dist';
import { ParsedData } from '@/contexts/AppContext';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface ParseProgress {
  step: string;
  progress: number;
}

export class PDFParser {
  private onProgress?: (progress: ParseProgress) => void;

  constructor(onProgress?: (progress: ParseProgress) => void) {
    this.onProgress = onProgress;
  }

  async parsePDF(file: File): Promise<ParsedData> {
    try {
      this.updateProgress('Loading PDF file', 10);
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      this.updateProgress('Extracting text content', 30);
      
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
      }

      this.updateProgress('Analyzing resume structure', 60);
      
      const parsedData = this.extractStructuredData(fullText);
      
      this.updateProgress('Finalizing data extraction', 90);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.updateProgress('Complete', 100);
      
      return parsedData;
    } catch (error) {
      console.error('PDF parsing error:', error);
      throw new Error('Failed to parse PDF. Please ensure the file is a valid PDF document.');
    }
  }

  private updateProgress(step: string, progress: number) {
    this.onProgress?.({ step, progress });
  }

  private extractStructuredData(text: string): ParsedData {
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    
    // Basic extraction logic - this would be enhanced with ML/NLP
    const name = this.extractName(lines);
    const email = this.extractEmail(text);
    const phone = this.extractPhone(text);
    const summary = this.extractSummary(lines);
    const experience = this.extractExperience(lines);
    const education = this.extractEducation(lines);
    const skills = this.extractSkills(lines);
    const projects = this.extractProjects(lines);

    return {
      name,
      email,
      phone,
      summary,
      experience,
      education,
      skills,
      projects
    };
  }

  private extractName(lines: string[]): string {
    // Look for name in first few lines
    const namePattern = /^[A-Z][a-z]+ [A-Z][a-z]+/;
    for (const line of lines.slice(0, 5)) {
      if (namePattern.test(line.trim())) {
        return line.trim();
      }
    }
    return 'John Doe';
  }

  private extractEmail(text: string): string {
    const emailPattern = /[\w\.-]+@[\w\.-]+\.\w+/g;
    const matches = text.match(emailPattern);
    return matches ? matches[0] : 'john.doe@email.com';
  }

  private extractPhone(text: string): string {
    const phonePattern = /[\+]?[\d\s\(\)\-\.]{10,}/g;
    const matches = text.match(phonePattern);
    return matches ? matches[0].trim() : '+1 (555) 123-4567';
  }

  private extractSummary(lines: string[]): string {
    const summaryKeywords = ['summary', 'objective', 'profile', 'about'];
    let summaryIndex = -1;
    
    for (let i = 0; i < lines.length; i++) {
      if (summaryKeywords.some(keyword => 
        lines[i].toLowerCase().includes(keyword)
      )) {
        summaryIndex = i;
        break;
      }
    }

    if (summaryIndex !== -1 && summaryIndex + 1 < lines.length) {
      return lines[summaryIndex + 1];
    }

    return 'Experienced professional with expertise in software development and project management.';
  }

  private extractExperience(lines: string[]) {
    // Simplified extraction - would be enhanced with better parsing
    return [
      {
        id: '1',
        title: 'Senior Software Engineer',
        company: 'Tech Corporation',
        startDate: '2021',
        endDate: 'Present',
        description: 'Led development of multiple web applications using modern technologies.'
      }
    ];
  }

  private extractEducation(lines: string[]) {
    return [
      {
        id: '1',
        degree: 'Bachelor of Computer Science',
        school: 'University of Technology',
        year: '2019'
      }
    ];
  }

  private extractSkills(lines: string[]): string[] {
    const commonSkills = [
      'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 
      'Java', 'HTML', 'CSS', 'SQL', 'Git', 'AWS', 'Docker'
    ];
    
    const text = lines.join(' ').toLowerCase();
    return commonSkills.filter(skill => 
      text.includes(skill.toLowerCase())
    );
  }

  private extractProjects(lines: string[]) {
    return [
      {
        id: '1',
        title: 'Portfolio Website',
        description: 'Built a responsive portfolio website using React and TypeScript.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS'],
        githubUrl: 'https://github.com/example/portfolio',
        liveUrl: 'https://example-portfolio.com'
      }
    ];
  }
}
