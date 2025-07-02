import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import CalorieForm from './components/CalorieForm';
import ResultsDisplay from './components/ResultsDisplay';
import AboutModal from './components/AboutModal';
import Footer from './components/Footer';
import { UserData, CalculationResult } from './types';
import { calculateCalories } from './utils/calculations';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleShowAbout = () => {
    setShowAbout(true);
  };

  const handleCloseAbout = () => {
    setShowAbout(false);
  };

  const handleFormSubmit = async (data: UserData) => {
    setIsLoading(true);
    setUserData(data);
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const calculationResult = calculateCalories(data);
      setResult(calculationResult);
    } catch (error) {
      console.error('Calculation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setUserData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: darkMode ? '#374151' : '#ffffff',
            color: darkMode ? '#f9fafb' : '#111827',
            border: darkMode ? '1px solid #4b5563' : '1px solid #e5e7eb',
          },
        }}
      />
      
      <Header
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onShowAbout={handleShowAbout}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        {!result && (
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Calculate Your Daily
              <span className="text-gradient"> Calorie Needs</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get personalized calorie recommendations based on your age, weight, height, 
              activity level, and fitness goals using the scientifically validated Mifflin-St Jeor formula.
            </p>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-8">
          {!result ? (
            <div className="card animate-slide-up">
              <CalorieForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
          ) : (
            <ResultsDisplay
              result={result}
              userData={userData!}
              onReset={handleReset}
            />
          )}
        </div>

        {/* Features Section */}
        {!result && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧮</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Accurate Calculations
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Uses the scientifically validated Mifflin-St Jeor formula for precise BMR and TDEE calculations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Personalized Goals
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get recommendations for weight loss, maintenance, or weight gain based on your specific goals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Mobile Friendly
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fully responsive design that works perfectly on desktop, tablet, and mobile devices.
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />

      <AboutModal isOpen={showAbout} onClose={handleCloseAbout} />
    </div>
  );
};

export default App; 