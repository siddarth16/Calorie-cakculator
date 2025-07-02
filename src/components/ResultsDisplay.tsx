import React, { useState } from 'react';
import { CalculationResult, UserData } from '../types';
import { Download, Copy, Share2, Info, X, ChevronDown, ChevronUp } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';

interface ResultsDisplayProps {
  result: CalculationResult;
  userData: UserData;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, userData, onReset }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    const text = `Calorie Calculator Results for ${userData.name || 'You'}:
    
BMR: ${result.bmr.toLocaleString()} calories/day
TDEE: ${result.tdee.toLocaleString()} calories/day

Recommendations:
- Maintain Weight: ${result.recommendations.maintain.toLocaleString()} calories/day
- Mild Weight Loss: ${result.recommendations.mild_loss.toLocaleString()} calories/day
- Moderate Weight Loss: ${result.recommendations.moderate_loss.toLocaleString()} calories/day
- Aggressive Weight Loss: ${result.recommendations.aggressive_loss.toLocaleString()} calories/day
- Mild Weight Gain: ${result.recommendations.mild_gain.toLocaleString()} calories/day
- Moderate Weight Gain: ${result.recommendations.moderate_gain.toLocaleString()} calories/day
- Aggressive Weight Gain: ${result.recommendations.aggressive_gain.toLocaleString()} calories/day

${result.summary}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const shareResults = () => {
    const text = `Check out my calorie calculation results! ${result.summary}`;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Calorie Calculator Results',
        text: text,
        url: url
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(twitterUrl, '_blank');
    }
  };

  const downloadPDF = () => {
    generatePDF(result, userData);
  };

  return (
    <div className="space-y-12 animate-fade-in-up">
      {/* Header */}
      <div className="text-center animate-fade-in-down">
        <h2 className="text-5xl font-bold text-white mb-6 text-glow">
          Your Results
        </h2>
        <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          {result.summary}
        </p>
      </div>

      {/* Main Result Card */}
      <div className="glass-card glass-card-hover p-12 animate-scale-in">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Your Daily Calorie Needs
            </h2>
            <p className="text-xl text-white/80">
              {result.summary}
            </p>
          </div>
          <button
            onClick={onReset}
            className="text-white/60 hover:text-white hover:bg-white/10 p-3 rounded-2xl transition-all duration-300 hover:scale-110"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="text-center p-8 glass-card glass-card-hover animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 glow-effect">
              <span className="text-2xl">🔥</span>
            </div>
            <div className="text-lg text-white/70 mb-2">BMR</div>
            <div className="text-4xl font-bold text-blue-400 mb-2">
              {result.bmr.toLocaleString()}
            </div>
            <div className="text-sm text-white/50">calories/day</div>
          </div>
          
          <div className="text-center p-8 glass-card glass-card-hover animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-4 glow-effect">
              <span className="text-2xl">⚡</span>
            </div>
            <div className="text-lg text-white/70 mb-2">TDEE</div>
            <div className="text-4xl font-bold text-purple-400 mb-2">
              {result.tdee.toLocaleString()}
            </div>
            <div className="text-sm text-white/50">calories/day</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-6">
          <button
            onClick={downloadPDF}
            className="btn-primary flex items-center text-lg px-8 py-4"
          >
            <Download size={20} className="mr-3" />
            Save as PDF
          </button>
          
          <button
            onClick={copyToClipboard}
            className={`btn-secondary flex items-center text-lg px-8 py-4 ${
              copied ? 'bg-green-500/20 border-green-500/30 text-green-300' : ''
            }`}
          >
            <Copy size={20} className="mr-3" />
            {copied ? 'Copied!' : 'Copy Results'}
          </button>
          
          <button
            onClick={shareResults}
            className="btn-secondary flex items-center text-lg px-8 py-4"
          >
            <Share2 size={20} className="mr-3" />
            Share
          </button>
        </div>
      </div>

      {/* Detailed Recommendations */}
      <div className="card">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Detailed Recommendations
            </h3>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
            >
              {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>

          {showDetails && (
            <div className="space-y-4 animate-slide-up">
              {/* Weight Loss Section */}
              <div className="border-l-4 border-success-500 pl-4">
                <h4 className="font-medium text-success-700 dark:text-success-300 mb-2">
                  Weight Loss Recommendations
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Mild (0.5 lb/week):</span>
                    <span className="font-medium">{result.recommendations.mild_loss.toLocaleString()} calories</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Moderate (1 lb/week):</span>
                    <span className="font-medium">{result.recommendations.moderate_loss.toLocaleString()} calories</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Aggressive (1.5 lb/week):</span>
                    <span className="font-medium">{result.recommendations.aggressive_loss.toLocaleString()} calories</span>
                  </div>
                </div>
              </div>

              {/* Weight Gain Section */}
              <div className="border-l-4 border-warning-500 pl-4">
                <h4 className="font-medium text-warning-700 dark:text-warning-300 mb-2">
                  Weight Gain Recommendations
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Mild (0.5 lb/week):</span>
                    <span className="font-medium">{result.recommendations.mild_gain.toLocaleString()} calories</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Moderate (1 lb/week):</span>
                    <span className="font-medium">{result.recommendations.moderate_gain.toLocaleString()} calories</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Aggressive (1.5 lb/week):</span>
                    <span className="font-medium">{result.recommendations.aggressive_gain.toLocaleString()} calories</span>
                  </div>
                </div>
              </div>

              {/* Information Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start">
                  <Info size={16} className="text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <p className="font-medium mb-1">How to use these recommendations:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Start with the mild recommendation and adjust based on your progress</li>
                      <li>Monitor your weight weekly and adjust calories as needed</li>
                      <li>Combine with regular exercise for best results</li>
                      <li>Consult a healthcare professional for personalized advice</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay; 