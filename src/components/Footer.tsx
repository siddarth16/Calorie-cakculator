import React from 'react';
import { Heart, Github, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Credits */}
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <span>Built with</span>
            <Heart size={16} className="text-red-500 animate-pulse" />
            <span>by</span>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors font-medium"
            >
              Your Name
            </a>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6 text-sm">
            <a
              href="https://github.com/yourusername/calorie-calculator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Github size={16} className="mr-1" />
              Source Code
            </a>
            
            <a
              href="https://en.wikipedia.org/wiki/Basal_metabolic_rate"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <ExternalLink size={16} className="mr-1" />
              Learn More
            </a>
            
            <a
              href="https://www.cdc.gov/healthyweight/calories/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <ExternalLink size={16} className="mr-1" />
              CDC Guidelines
            </a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            This calculator uses the Mifflin-St Jeor formula for BMR calculation. 
            Results are estimates and should not replace professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 