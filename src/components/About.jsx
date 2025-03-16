import React from 'react';

const About = () => {
  return (
    <section id="about" className="w-full py-24 bg-gray-50 text-gray-900 flex flex-col items-center px-6 md:px-20">
      <div className="max-w-6xl text-center">
        <h2 className="text-5xl font-extrabold mb-10 bg-gradient-to-r from-gray-700 to-black text-transparent bg-clip-text drop-shadow-lg">
          About Personalized Learning AI
        </h2>
        <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
          Our AI-powered learning platform adapts to your strengths and weaknesses, offering personalized
          study materials, real-time feedback, and AI-generated notes to help you learn more efficiently.
        </p>
      </div>

      <div className="mt-20 max-w-6xl text-center">
        <h3 className="text-4xl font-bold mb-12">Why Choose Our AI?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          <FeatureCard icon="🧠" title="Adaptive Learning" description="AI adjusts content to your learning pace and style." />
          <FeatureCard icon="📚" title="Smart Notes" description="AI summarizes key points from PDFs and lectures." />
          <FeatureCard icon="📊" title="Progress Tracking" description="Monitor your performance with AI-powered insights." />
          <FeatureCard icon="🤖" title="AI Tutor" description="Get AI-driven explanations and interactive quizzes." />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-10 rounded-3xl shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl flex flex-col items-center text-center">
      <div className="text-5xl mb-5">{icon}</div>
      <h4 className="text-2xl font-semibold mb-3">{title}</h4>
      <p className="text-gray-600 text-lg max-w-xs">{description}</p>
    </div>
  );
};

export default About;
