import React from 'react';
import { Sun, Moon, Github, Info } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onShowAbout: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode, onShowAbout }) => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CC</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Calorie Calculator
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Calculate your daily calorie needs
              </p>
            </div>
          </div>

          {/* Navigation and Actions */}
          <div className="flex items-center space-x-4">
            {/* About Button */}
            <button
              onClick={onShowAbout}
              className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Info size={16} className="mr-1" />
              About
            </button>

            {/* GitHub Link */}
            <a
              href="https://github.com/yourusername/calorie-calculator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Github size={16} className="mr-1" />
              GitHub
            </a>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 