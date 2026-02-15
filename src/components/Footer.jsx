import React from "react";
import { Link } from "react-router-dom";
import { Mail, Github, Globe, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black text-gray-600 dark:text-gray-400 py-12 px-6 border-t border-gray-100 dark:border-gray-900 transition-all duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center text-center md:text-left">
          
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 text-transparent bg-clip-text font-['Cambria_Math'] hover:scale-105 transition-transform duration-300 cursor-default">
              EzStudy
            </div>
            <p className="text-sm max-w-xs font-['Cambria_Math'] leading-relaxed">
              Empowering learners with AI-driven insights and smarter study tools.
            </p>
          </div>

          {/* Contact Section - The "Creative" Part */}
          <div className="flex flex-col items-center space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">Get in Touch</h4>
            <a 
              href="mailto:support@ezstudy.ai" 
              className="group relative flex items-center gap-2 text-lg font-medium transition-all duration-300 hover:text-blue-500"
            >
              <span className="p-2 rounded-full bg-gray-50 dark:bg-gray-900 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:rotate-12 transition-all duration-300">
                <Mail size={20} className="group-hover:scale-110" />
              </span>
              <span className="font-['Cambria_Math']">support@ezstudy.ai</span>
              {/* Floating Underline Animation */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-500 group-hover:w-full"></span>
              <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
            </a>
          </div>

          {/* Links Section */}
          <div className="flex flex-col items-center md:items-end space-y-4 text-sm font-['Cambria_Math']">
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="hover:text-blue-500 transition-colors relative group">
                Privacy Policy
                <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
              <Link to="/services" className="hover:text-purple-500 transition-colors relative group">
                Terms
                <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
            </div>
            <div className="flex gap-4">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all hover:-translate-y-1">
                <Github size={18} />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all hover:-translate-y-1">
                <Globe size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-50 dark:border-gray-900 flex flex-col items-center space-y-2">
          <p className="text-xs tracking-wide opacity-60 font-['Cambria_Math']">
            &copy; {new Date().getFullYear()} EzStudyAI. Built for the future of education.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;