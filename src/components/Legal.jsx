import React from 'react';
import { X, ArrowLeft, ShieldCheck, FileText, Lock, Scale, UserCheck, Zap, CreditCard, AlertTriangle, Database, Eye, Cpu, Handshake, Copyright, Activity, XCircle, Bot } from 'lucide-react';

const Legal = ({ type, onClose }) => {
    const content = {
        terms: {
            title: "Terms & Conditions",
            content: <div className="space-y-6"></div>
        },
        privacy: {
            title: "Privacy Policy",
            content: <div className="space-y-6"></div>
        },
        services: {
            title: "Terms of Service",
            content: <div className="space-y-6"></div>
        }
    };

    const current = content[type] || content.terms;

    return (
        <div className="fixed inset-0 z-[100] bg-white dark:bg-gray-950 overflow-y-auto animate-in fade-in slide-in-from-bottom-5 duration-300">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-10 sticky top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md py-4 z-10 border-b border-gray-100 dark:border-gray-800">
                    <button
                        onClick={onClose}
                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="font-medium font-['Inter']">Back to Home</span>
                    </button>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 text-transparent bg-clip-text font-['Rubik']">{current.title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-90 group"
                    >
                        <X size={20} className="dark:text-white group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>

                <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
                    <div className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 text-transparent bg-clip-text mb-2 font-['Playfair_Display']">{current.title}</h1>
                        <p className="text-sm opacity-60 font-['Inter']">Last Updated: January 10, 2026</p>
                    </div>
                    {current.content}
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
                    <p className="text-sm text-gray-500 font-['Inter']">© 2026 EzStudy AI. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Legal;
