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
    <div className="space-y-6 animate-fade-in">
      {/* Main Result Card */}
      <div className="result-card rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Your Daily Calorie Needs
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {result.summary}
            </p>
          </div>
          <button
            onClick={onReset}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">BMR</div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {result.bmr.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">calories/day</div>
          </div>
          
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">TDEE</div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {result.tdee.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">calories/day</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={downloadPDF}
            className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Download size={16} className="mr-2" />
            Save as PDF
          </button>
          
          <button
            onClick={copyToClipboard}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              copied 
                ? 'bg-success-100 dark:bg-success-900/20 text-success-700 dark:text-success-300' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Copy size={16} className="mr-2" />
            {copied ? 'Copied!' : 'Copy Results'}
          </button>
          
          <button
            onClick={shareResults}
            className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Share2 size={16} className="mr-2" />
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