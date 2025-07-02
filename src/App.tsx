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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-rotate-slow"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-rotate-slow" style={{animationDelay: '-10s'}}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-rotate-slow" style={{animationDelay: '-5s'}}></div>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
          },
        }}
      />
      
      <Header
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onShowAbout={handleShowAbout}
      />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        {!result && (
          <section className="text-center mb-20">
            <div className="glass-card glass-card-hover p-12 mb-12 animate-fade-in-up">
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 text-glow">
                Calorie
                <span className="hero-gradient bg-clip-text text-transparent"> Calculator</span>
              </h1>
              <p className="text-2xl text-white/80 max-w-4xl mx-auto mb-8 leading-relaxed">
                Calculate your daily calorie needs with scientific precision using the 
                <span className="text-blue-400 font-semibold"> Mifflin-St Jeor formula</span>
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-lg text-white/70">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce-gentle"></div>
                  BMR Calculator
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce-gentle" style={{animationDelay: '0.5s'}}></div>
                  TDEE Calculator
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce-gentle" style={{animationDelay: '1s'}}></div>
                  Weight Goals
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Main Content */}
        <div className="space-y-12">
          {!result ? (
            <div className="glass-card glass-card-hover p-8 animate-scale-in">
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
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card glass-card-hover p-8 text-center animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 glow-effect">
                <span className="text-3xl">🧮</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Scientific Accuracy
              </h3>
              <p className="text-white/70 leading-relaxed">
                Powered by the validated Mifflin-St Jeor formula for precise BMR and TDEE calculations.
              </p>
            </div>
            
            <div className="glass-card glass-card-hover p-8 text-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 glow-effect">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Personalized Goals
              </h3>
              <p className="text-white/70 leading-relaxed">
                Get tailored recommendations for weight loss, maintenance, or weight gain.
              </p>
            </div>
            
            <div className="glass-card glass-card-hover p-8 text-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 glow-effect">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Modern Design
              </h3>
              <p className="text-white/70 leading-relaxed">
                Beautiful, responsive interface that works seamlessly across all devices.
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