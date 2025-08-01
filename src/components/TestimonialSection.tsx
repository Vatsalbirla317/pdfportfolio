
import React, { useState, useEffect } from 'react';
import { Quote, Star } from 'lucide-react';

const TestimonialSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Frontend Developer',
      avatar: '/api/placeholder/64/64',
      rating: 5,
      text: 'PDFPortfolio.ai turned my boring resume into a stunning portfolio that landed me three job interviews in one week!'
    },
    {
      name: 'Marcus Johnson',
      role: 'UX Designer',
      avatar: '/api/placeholder/64/64',
      rating: 5,
      text: 'The AI perfectly captured my design aesthetic and created a portfolio that truly represents my work. Absolutely incredible!'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Data Scientist',
      avatar: '/api/placeholder/64/64',
      rating: 5,
      text: 'I was skeptical about AI-generated portfolios, but this exceeded all my expectations. Professional and modern!'
    },
    {
      name: 'David Park',
      role: 'Product Manager',
      avatar: '/api/placeholder/64/64',
      rating: 5,
      text: 'Generated my portfolio in under 30 seconds. The customization options are endless and the result is beautiful.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-pink-900/10" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Loved by <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Professionals</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who transformed their careers with AI-powered portfolios
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-opacity duration-500 ${
                  index === currentTestimonial ? 'opacity-100' : 'opacity-0 absolute inset-0'
                }`}
              >
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 md:p-12 text-center relative">
                  {/* Quote icon */}
                  <Quote className="w-12 h-12 text-purple-400/50 mx-auto mb-6" />
                  
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <blockquote className="text-xl md:text-2xl leading-relaxed mb-8 text-foreground/90">
                    "{testimonial.text}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-lg">{testimonial.name}</div>
                      <div className="text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial 
                    ? 'bg-purple-500 w-8' 
                    : 'bg-purple-500/30 hover:bg-purple-500/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">2K+</div>
            <div className="text-muted-foreground text-sm">Portfolios Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">98%</div>
            <div className="text-muted-foreground text-sm">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">30s</div>
            <div className="text-muted-foreground text-sm">Avg. Generation Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">24/7</div>
            <div className="text-muted-foreground text-sm">AI Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
