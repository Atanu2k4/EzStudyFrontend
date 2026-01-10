import React, { useState, useEffect } from "react";
import { DotLottiePlayer } from '@dotlottie/react-player';
import { ArrowRight, Zap, Clock, Target, Bot } from "lucide-react";

const Hero = ({ setShowLearningPage, onDemoClick, isReady, user, onLoginClick, onSignupClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleGoToConsole = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setShowLearningPage(true);
  };

  useEffect(() => {
    if (isReady) {
      // Small delay to sync with the main container animation
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  return (
    <section className="w-full min-h-screen lg:h-screen flex flex-col lg:flex-row items-center justify-center text-center lg:text-left bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-gray-900 dark:to-indigo-950 px-4 sm:px-6 lg:px-16 pt-32 pb-12 lg:py-0 overflow-hidden relative">
      {/* Enhanced Background Elements - Hidden on Mobile */}
      <div className="hidden sm:block absolute -top-20 -left-20 w-64 sm:w-96 h-64 sm:h-96 bg-blue-400 opacity-10 dark:opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="hidden sm:block absolute bottom-20 right-20 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-700 opacity-10 dark:opacity-20 rounded-full blur-3xl"></div>
      <div className="hidden md:block absolute top-1/4 right-1/3 w-64 h-64 bg-red-300 opacity-10 dark:opacity-20 rounded-full blur-3xl"></div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-indigo-700/5 to-blue-600/5 dark:from-indigo-400/10 dark:to-blue-400/10"></div>

      {/* Content */}
      <div className={`flex-1 space-y-4 sm:space-y-6 z-10 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight max-w-2xl font-['Playfair_Display']">
          <span className="text-gray-900 dark:text-white">Unlock </span>
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-red-500 text-transparent bg-clip-text">AI-Powered Learning</span>
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-xl font-['Rubik'] font-medium">
          Transform your study with AI insights, tailored plans & smart notes.
        </p>
        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 pt-2 sm:pt-3">
          {user ? (
            <button
              onClick={handleGoToConsole}
              className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-full text-xs sm:text-sm shadow-xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span>Go to AI Learning Console</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={onSignupClick}
              className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-600 via-purple-500 to-red-500 text-white font-bold rounded-full text-xs sm:text-sm shadow-xl hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span>Start Learning</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
            </button>
          )}
          <a href="#about" className="px-4 sm:px-6 py-2 bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-full text-xs sm:text-sm hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 w-full sm:w-auto text-center">
            Learn More
          </a>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-2 pt-2 justify-center">
          <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium border border-blue-100 dark:border-blue-800/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:text-blue-700 dark:hover:text-blue-300 hover:border-blue-200 dark:hover:border-blue-700/70 hover:scale-105 hover:shadow-lg hover:shadow-blue-200/50 dark:hover:shadow-blue-900/50 transition-all duration-300 cursor-default relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            <span className="relative">AI-Powered</span>
          </span>
          <span className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs font-medium border border-purple-100 dark:border-purple-800/50 hover:bg-purple-100 dark:hover:bg-purple-900/50 hover:text-purple-700 dark:hover:text-purple-300 hover:border-purple-200 dark:hover:border-purple-700/70 hover:scale-105 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/50 transition-all duration-300 cursor-default relative overflow-hidden group">
            <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            <span className="relative">Personalized</span>
          </span>
          <span className="px-3 py-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs font-medium border border-red-100 dark:border-red-800/50 hover:bg-red-100 dark:hover:bg-red-900/50 hover:text-red-700 dark:hover:text-red-300 hover:border-red-200 dark:hover:border-red-700/70 hover:scale-105 hover:shadow-lg hover:shadow-red-200/50 dark:hover:shadow-red-900/50 transition-all duration-300 cursor-default relative overflow-hidden group">
            <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            <span className="relative">Adaptive</span>
          </span>
        </div>
      </div>

      {/* Animations - Reduced Size */}
      <div className={`flex-1 flex flex-col items-center justify-center mt-12 lg:mt-0 relative z-10 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="relative w-full max-w-md">
          <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-blue-200 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-lg rotate-6 shadow-lg"></div>
          <div className="absolute -top-2 -left-2 w-full h-full bg-gradient-to-br from-indigo-100 to-red-100 dark:from-indigo-900/40 dark:to-red-900/40 rounded-lg -rotate-3 shadow-lg"></div>

          {/* Lottie Animation Container - Reduced Size and Padding */}
          <div className="relative p-4 rounded-lg shadow-2xl border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center backdrop-blur-md bg-white/90 dark:bg-gray-800/90 group hover:scale-[1.02] transition-transform duration-500">
            <div className="absolute -right-2 -top-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-2 rounded-full shadow-lg z-20 group-hover:scale-110 transition-transform duration-300">
              <Zap size={16} fill="currentColor" className="group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
            </div>

            <div className="w-full h-32 overflow-hidden flex items-center justify-center">
              <DotLottiePlayer
                src="https://lottie.host/940d982d-7f6f-4100-b740-e874954cea02/HIYUCWcoQJ.lottie"
                loop
                autoplay
                style={{ height: '128px' }}
              />
            </div>
            <div className="w-full h-px bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-800 dark:to-indigo-800 rounded-full my-2"></div>
            <div className="w-full h-32 overflow-hidden flex items-center justify-center">
              <DotLottiePlayer
                src="https://lottie.host/a33024c3-2554-45d7-8959-ef10c82ccb96/Z2KJN74cgJ.lottie"
                loop
                autoplay
                style={{ height: '128px' }}
              />
            </div>

            {/* Stats Section - Smaller Text and Compact Layout */}
            <div className="grid grid-cols-3 gap-2 w-full mt-3 text-center">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer group">
                <div className="flex items-center justify-center mb-1">
                  <Clock size={14} className="text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                </div>
                <p className="text-base font-bold text-blue-600 dark:text-blue-400 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors duration-300">24/7</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">Learning</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-1 rounded hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors cursor-pointer group">
                <div className="flex items-center justify-center mb-1">
                  <Target size={14} className="text-indigo-600 dark:text-purple-400 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300" />
                </div>
                <p className="text-base font-bold text-indigo-600 dark:text-purple-400 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">100%</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">Personalized</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer group">
                <div className="flex items-center justify-center mb-1">
                  <Bot size={14} className="text-red-500 dark:text-orange-400 group-hover:scale-110 group-hover:animate-pulse transition-all duration-300" />
                </div>
                <p className="text-base font-bold text-red-500 dark:text-orange-400 group-hover:text-orange-600 dark:group-hover:text-yellow-400 transition-colors duration-300">AI</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">Powered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;