
import React from 'react';
import { Check, Sparkles, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PricingSection: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      icon: Sparkles,
      features: [
        '1 Portfolio',
        'Basic Templates',
        'PDF Upload',
        'AI Generation',
        'Mobile Responsive',
        'Basic Customization'
      ],
      cta: 'Start Free',
      popular: false,
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      name: 'Pro',
      price: '$9',
      period: 'per month',
      description: 'For professionals who want more',
      icon: Crown,
      features: [
        'Unlimited Portfolios',
        'Premium Templates',
        'Custom Domain',
        'Advanced AI Features',
        'Analytics Dashboard',
        'Priority Support',
        'SEO Optimization',
        'Export HTML/CSS'
      ],
      cta: 'Start Pro Trial',
      popular: true,
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section className="py-24 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Start for <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Free</span>. 
            Upgrade when Ready.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-card/50 backdrop-blur-sm border rounded-3xl p-8 hover:scale-105 transition-all duration-300 animate-fade-in ${
                plan.popular 
                  ? 'border-purple-500/50 shadow-xl shadow-purple-500/20' 
                  : 'border-border/50 hover:border-purple-500/30'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">/{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <div className={`w-5 h-5 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-foreground/90">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                className={`w-full py-6 text-lg ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                    : 'bg-transparent border-purple-500/30 hover:bg-purple-500/10 text-purple-400'
                }`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            ✨ 30-day money-back guarantee • 🔒 Secure payments • 🚀 Instant access
          </p>
          <div className="flex justify-center items-center gap-6 text-sm text-muted-foreground">
            <span>Trusted by 2,000+ professionals</span>
            <span>•</span>
            <span>Cancel anytime</span>
            <span>•</span>
            <span>No setup fees</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
