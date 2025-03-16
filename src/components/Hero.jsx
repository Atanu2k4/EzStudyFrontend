import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useUser, SignUpButton } from "@clerk/clerk-react";

const Hero = ({ setShowLearningPage }) => {
  const { isSignedIn } = useUser();

  // Removed the useEffect that was causing automatic redirect

  return (
    <section className="w-full h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left bg-gradient-to-b from-white to-gray-50 px-6 md:px-16 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-gray-400 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-zinc-700 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gray-300 opacity-30 rounded-full blur-xl"></div>
      {/* Content */}
      <div className="flex-1 space-y-6 z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight max-w-3xl">
          Unlock <span className="bg-gradient-to-r from-blue-600 to-red-400 text-transparent bg-clip-text">AI-Powered Personalized Learning</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-xl">
          Transform your study experience with AI-driven insights, tailored learning plans, and smart note generation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          {isSignedIn ? (
            <button
              onClick={() => setShowLearningPage(true)}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Start Learning with AI
            </button>
          ) : (
            <SignUpButton mode="modal">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-red-400 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-transform duration-300">
                Start Learning
              </button>
            </SignUpButton>
          )}
        </div>
      </div>
      {/* Animations */}
      <div className="flex-1 flex flex-col items-center justify-center mt-10 md:mt-0 relative z-10">
        <div className="relative w-full max-w-lg">
          <div className="absolute -top-4 -left-4 w-full h-full bg-zinc-200 rounded-xl rotate-3"></div>
          <div className="absolute -top-2 -left-2 w-full h-full bg-gray-300 rounded-xl -rotate-2"></div>
          {/* Lottie Animation Container */}
          <div className="relative bg-white p-6 rounded-xl shadow-xl border border-gray-100 flex flex-col items-center justify-center">
            <DotLottieReact
              src="https://lottie.host/940d982d-7f6f-4100-b740-e874954cea02/HIYUCWcoQJ.lottie"
              loop
              autoplay
            />
            <DotLottieReact
              src="https://lottie.host/a33024c3-2554-45d7-8959-ef10c82ccb96/Z2KJN74cgJ.lottie"
              loop
              autoplay
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;