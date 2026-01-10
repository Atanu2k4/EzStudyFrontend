import React from 'react';
import { Brain, BookOpen, BarChart3, Bot } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="w-full py-12 sm:py-24 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col items-center px-4 sm:px-6 lg:px-20 transition-colors duration-500 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-6xl text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-10 bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 text-transparent bg-clip-text drop-shadow-lg font-['Rubik']">
          About Personalized Learning AI
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto font-['Inter']">
          Our AI-powered learning platform adapts to your strengths and weaknesses, offering personalized
          study materials, real-time feedback, and AI-generated notes to help you learn more efficiently.
        </p>
      </div>

      <div className="mt-10 sm:mt-20 max-w-6xl text-center w-full">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-12 bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 text-transparent bg-clip-text font-['Merriweather']">Why Choose Our AI?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          <FeatureCard
            icon={<Brain size={48} className="text-blue-500" />}
            title="Adaptive Learning"
            description="AI adjusts content to your learning pace and style."
          />
          <FeatureCard
            icon={<BookOpen size={48} className="text-purple-500" />}
            title="Smart Notes"
            description="AI summarizes key points from PDFs and lectures."
          />
          <FeatureCard
            icon={<BarChart3 size={48} className="text-indigo-500" />}
            title="Progress Tracking"
            description="Monitor your performance with AI-powered insights."
          />
          <FeatureCard
            icon={<Bot size={48} className="text-red-400" />}
            title="AI Tutor"
            description="Get AI-driven explanations and interactive quizzes."
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg dark:shadow-blue-900/10 border border-transparent dark:border-gray-800 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl lg:hover:shadow-blue-500/10 hover:border-blue-500/30 flex flex-col items-center text-center group cursor-default">
      <div className="mb-3 sm:mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
        {icon}
      </div>
      <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 text-transparent bg-clip-text group-hover:from-blue-700 group-hover:via-purple-600 group-hover:to-red-500 transition-all duration-300 font-['Poppins']">
        {title}
      </h4>
      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base lg:text-lg max-w-xs font-['Inter']">{description}</p>
    </div>
  );
};

export default About;
