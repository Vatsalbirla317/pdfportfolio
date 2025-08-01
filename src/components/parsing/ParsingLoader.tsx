
import React from 'react';
import { Brain, Zap } from 'lucide-react';

export const ParsingLoader = () => {
  return (
    <div className="relative">
      <div className="mx-auto w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
        <Brain className="w-12 h-12 text-white" />
      </div>
      
      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-ping" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-40 h-40 border-2 border-purple-100 dark:border-purple-900 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
      
      <div className="mt-6">
        <div className="flex items-center justify-center gap-2 text-purple-600 dark:text-purple-400">
          <Zap className="w-4 h-4" />
          <span className="font-medium">AI Processing</span>
        </div>
      </div>
    </div>
  );
};
