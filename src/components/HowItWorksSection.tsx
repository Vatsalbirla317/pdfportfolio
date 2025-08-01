
import React from 'react';
import { FileUp, Brain, Rocket } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: FileUp,
      title: 'Upload Resume',
      description: 'Drag & drop your PDF resume or upload from your device. We support all standard resume formats.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Brain,
      title: 'AI Analyzes Content',
      description: 'Our AI extracts your skills, experience, and projects to create a structured portfolio layout.',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Rocket,
      title: 'Portfolio Generated',
      description: 'Get your live portfolio with custom domain, responsive design, and SEO optimization.',
      color: 'from-pink-500 to-red-500'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How It <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your resume into a stunning portfolio in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:scale-105 hover:border-purple-500/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Step number */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {index + 1}
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <step.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-400 transition-colors">
                {step.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Hover effect border */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
          ))}
        </div>

        {/* Connection lines for desktop */}
        <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl">
          <div className="flex justify-between items-center px-20">
            <div className="w-24 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 opacity-30" />
            <div className="w-24 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
