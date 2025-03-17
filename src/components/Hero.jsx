import React, { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useUser, SignUpButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom"; // Assuming you're using React Router

const Hero = ({ setShowLearningPage }) => {
  const { isSignedIn } = useUser();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="w-full h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left bg-gradient-to-br from-slate-50 via-white to-blue-50 px-6 md:px-16 overflow-hidden relative">
      {/* Enhanced Background Elements */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400 opacity-10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-700 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-red-300 opacity-10 rounded-full blur-3xl"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-blue-600/5 to-indigo-700/5"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-indigo-700/5 to-blue-600/5"></div>

      {/* Content */}
      <div className={`flex-1 space-y-6 z-10 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight max-w-2xl">
          Unlock <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-red-500 text-transparent bg-clip-text">AI-Powered Personalized Learning</span>
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-xl">
          Transform your study experience with AI-driven insights, tailored learning plans, and smart note generation.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-3">
          {isSignedIn ? (
            <button
              onClick={() => setShowLearningPage(true)}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-full text-sm shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Start Learning with AI</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          ) : (
            <SignUpButton mode="modal">
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 via-purple-500 to-red-500 text-white font-bold rounded-full text-sm shadow-xl hover:shadow-pink-500/20 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                <span>Start Learning</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </SignUpButton>
          )}

          <Link to="/about" className="px-6 py-2 bg-transparent border border-gray-300 text-gray-700 font-bold rounded-full text-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-300">
            Learn More
          </Link>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-2 pt-2 justify-center md:justify-start">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">AI-Powered</span>
          <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">Personalized</span>
          <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium">Adaptive</span>
        </div>
      </div>

      {/* Animations - Reduced Size */}
      <div className={`flex-1 flex flex-col items-center justify-center mt-8 md:mt-0 relative z-10 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="relative w-full max-w-md">
          <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-blue-200 to-indigo-100 rounded-lg rotate-6 shadow-lg"></div>
          <div className="absolute -top-2 -left-2 w-full h-full bg-gradient-to-br from-indigo-100 to-red-100 rounded-lg -rotate-3 shadow-lg"></div>

          {/* Lottie Animation Container - Reduced Size and Padding */}
          <div className="relative bg-white p-4 rounded-lg shadow-xl border border-gray-100 flex flex-col items-center justify-center backdrop-blur-sm bg-white/90">
            <div className="absolute -right-2 -top-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-2 rounded-full shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>

            <DotLottieReact
              src="https://lottie.host/940d982d-7f6f-4100-b740-e874954cea02/HIYUCWcoQJ.lottie"
              loop
              autoplay
              className="w-full h-32"
            />
            <div className="w-full h-px bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full my-2"></div>
            <DotLottieReact
              src="https://lottie.host/a33024c3-2554-45d7-8959-ef10c82ccb96/Z2KJN74cgJ.lottie"
              loop
              autoplay
              className="w-full h-32"
            />

            {/* Stats Section - Smaller Text and Compact Layout */}
            <div className="grid grid-cols-3 gap-2 w-full mt-3 text-center">
              <div className="bg-gray-50 p-1 rounded">
                <p className="text-base font-bold text-blue-600">24/7</p>
                <p className="text-xs text-gray-500">Learning</p>
              </div>
              <div className="bg-gray-50 p-1 rounded">
                <p className="text-base font-bold text-indigo-600">100%</p>
                <p className="text-xs text-gray-500">Personalized</p>
              </div>
              <div className="bg-gray-50 p-1 rounded">
                <p className="text-base font-bold text-red-500">AI</p>
                <p className="text-xs text-gray-500">Powered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;