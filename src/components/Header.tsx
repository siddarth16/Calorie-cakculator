import React from 'react';
import { Sun, Moon, Github, Info } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onShowAbout: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode, onShowAbout }) => {
  return (
    <header className="glass-card border-b border-white/20 sticky top-0 z-50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center glow-effect">
              <span className="text-white font-bold text-lg">CC</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white text-glow">
                Calorie Calculator
              </h1>
              <p className="text-sm text-white/70">
                Calculate your daily calorie needs
              </p>
            </div>
          </div>

          {/* Navigation and Actions */}
          <div className="flex items-center space-x-4">
            {/* About Button */}
            <button
              onClick={onShowAbout}
              className="flex items-center px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300 hover:scale-105"
            >
              <Info size={18} className="mr-2" />
              About
            </button>

            {/* GitHub Link */}
            <a
              href="https://github.com/yourusername/calorie-calculator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300 hover:scale-105"
            >
              <Github size={18} className="mr-2" />
              GitHub
            </a>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300 hover:scale-110"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 