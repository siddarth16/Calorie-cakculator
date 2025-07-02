import React from 'react';
import { X, Calculator, TrendingUp, Heart, Info } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              About Calorie Calculator
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Introduction */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <Calculator size={20} className="mr-2 text-primary-600" />
                How It Works
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our calorie calculator uses the scientifically validated Mifflin-St Jeor formula to estimate your 
                Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). This provides you with 
                personalized calorie recommendations for your specific goals.
              </p>
            </div>

            {/* BMR Formula */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">BMR Formula (Mifflin-St Jeor)</h4>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <p><strong>For Males:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5</p>
                <p><strong>For Females:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161</p>
                <p><strong>For Other:</strong> Average of male and female calculations</p>
              </div>
            </div>

            {/* Activity Levels */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <TrendingUp size={20} className="mr-2 text-primary-600" />
                Activity Level Multipliers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="font-medium text-gray-900 dark:text-white">Sedentary</div>
                  <div className="text-gray-600 dark:text-gray-300">Little or no exercise, desk job</div>
                  <div className="text-primary-600 font-medium">× 1.2</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="font-medium text-gray-900 dark:text-white">Lightly Active</div>
                  <div className="text-gray-600 dark:text-gray-300">Light exercise/sports 1-3 days/week</div>
                  <div className="text-primary-600 font-medium">× 1.375</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="font-medium text-gray-900 dark:text-white">Moderately Active</div>
                  <div className="text-gray-600 dark:text-gray-300">Moderate exercise/sports 3-5 days/week</div>
                  <div className="text-primary-600 font-medium">× 1.55</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="font-medium text-gray-900 dark:text-white">Very Active</div>
                  <div className="text-gray-600 dark:text-gray-300">Hard exercise/sports 6-7 days a week</div>
                  <div className="text-primary-600 font-medium">× 1.725</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 md:col-span-2">
                  <div className="font-medium text-gray-900 dark:text-white">Extra Active</div>
                  <div className="text-gray-600 dark:text-gray-300">Very hard exercise, physical job or training twice a day</div>
                  <div className="text-primary-600 font-medium">× 1.9</div>
                </div>
              </div>
            </div>

            {/* Weight Goals */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <Heart size={20} className="mr-2 text-primary-600" />
                Weight Goal Adjustments
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="font-medium text-green-800 dark:text-green-200">Weight Loss</span>
                  <span className="text-green-600 dark:text-green-400">15-35% deficit</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="font-medium text-blue-800 dark:text-blue-200">Weight Maintenance</span>
                  <span className="text-blue-600 dark:text-blue-400">No adjustment</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <span className="font-medium text-orange-800 dark:text-orange-200">Weight Gain</span>
                  <span className="text-orange-600 dark:text-orange-400">10-30% surplus</span>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
                <Info size={16} className="mr-2" />
                Important Notes
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• These calculations are estimates and may vary based on individual factors</li>
                <li>• Genetics, medical conditions, and body composition affect actual calorie needs</li>
                <li>• Start with mild recommendations and adjust based on your progress</li>
                <li>• Combine with regular exercise for optimal results</li>
                <li>• Consult a healthcare professional for personalized advice</li>
                <li>• The Mifflin-St Jeor formula is most accurate for adults aged 19-78</li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center border-t border-gray-200 dark:border-gray-700 pt-4">
              <p>
                This calculator is for informational purposes only and should not replace professional medical advice. 
                Always consult with a healthcare provider before making significant changes to your diet or exercise routine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal; 