import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black text-gray-600 dark:text-gray-400 py-8 sm:py-12 text-center px-4 border-t border-gray-100 dark:border-gray-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-4">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 text-transparent bg-clip-text font-['Cambria_Math']">
          EzStudy
        </div>
        <p className="text-xs sm:text-sm transition-colors hover:text-gray-900 dark:hover:text-white cursor-default font-['Cambria_Math']">
          &copy; {new Date().getFullYear()} EzStudyAI. Empowering learners with AI.
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <Link to="/privacy-policy" className="relative text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer font-['Cambria_Math']">
            Privacy Policy
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:w-full rounded-full"></span>
          </Link>
          <Link to="/services" className="relative text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer font-['Cambria_Math']">
            Terms of Service
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-red-600 hover:w-full rounded-full"></span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
