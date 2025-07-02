import React from 'react';
import { Heart, Github, ExternalLink, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="glass-card border-t border-white/20 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="flex justify-center items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 glow-effect">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white text-glow">
              Calorie Calculator
            </h3>
          </div>
          
          <p className="text-white/70 mb-8 text-lg">
            Built with <Heart className="inline w-5 h-5 text-red-400 animate-bounce-gentle" /> by fitness enthusiasts
          </p>
          
          <div className="flex justify-center items-center space-x-8 mb-8">
            <a
              href="https://github.com/yourusername/calorie-calculator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white hover:bg-white/10 px-4 py-2 rounded-2xl transition-all duration-300 hover:scale-105 flex items-center"
            >
              <Github className="w-5 h-5 mr-2" />
              Source Code
            </a>
            
            <a
              href="https://en.wikipedia.org/wiki/Basal_metabolic_rate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white hover:bg-white/10 px-4 py-2 rounded-2xl transition-all duration-300 hover:scale-105 flex items-center"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Learn More
            </a>
            
            <a
              href="https://www.cdc.gov/healthyweight/calories/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white hover:bg-white/10 px-4 py-2 rounded-2xl transition-all duration-300 hover:scale-105 flex items-center"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              CDC Guidelines
            </a>
          </div>
          
          <div className="text-white/50 text-sm max-w-3xl mx-auto leading-relaxed space-y-2">
            <p>
              This calculator uses the Mifflin-St Jeor formula for BMR calculation. 
              Results are estimates and should not replace professional medical advice.
            </p>
            <p>
              Free calorie calculator for weight loss, weight gain, and maintenance. 
              Calculate your daily calorie needs with our BMR and TDEE calculator.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 