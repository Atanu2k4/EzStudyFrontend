import React from 'react';
import { X, ArrowLeft, ShieldCheck, FileText, Lock, Scale, UserCheck, Zap, CreditCard, AlertTriangle, Database, Eye, Cpu, Handshake, Copyright, Activity, XCircle, Bot } from 'lucide-react';

const Legal = ({ type, onClose }) => {
    const content = {
        terms: {
            title: "Terms & Conditions",
            content: (
                <div className="space-y-6">
                    <section className="bg-blue-50/30 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100/50 dark:border-blue-900/20 group hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                        <div className="flex items-center space-x-3 mb-2">
                            <Handshake size={20} className="text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-['Merriweather']">1. Agreement to Terms</h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-['Inter']">By accessing or using <span className="text-blue-600 dark:text-blue-400 font-semibold">EzStudy</span>, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please do not use our services.</p>
                    </section>
                    <section className="bg-purple-50/30 dark:bg-purple-900/10 p-4 rounded-2xl border border-purple-100/50 dark:border-purple-900/20 group hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                        <div className="flex items-center space-x-3 mb-2">
                            <Bot size={20} className="text-purple-600 dark:text-purple-400 group-hover:scale-110 group-hover:animate-pulse transition-all duration-300" />
                            <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-['Poppins']">2. Description of Service</h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-['Inter']">EzStudy provides <span className="text-purple-600 dark:text-purple-400 font-medium">AI-powered learning tools</span>, including chat-based tutoring, file analysis, and personalized study aids. We use advanced AI models to provide these services.</p>
                    </section>
                    <section className="bg-indigo-50/30 dark:bg-indigo-900/10 p-4 rounded-2xl border border-indigo-100/50 dark:border-indigo-900/20 group hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                        <div className="flex items-center space-x-3 mb-2">
                            <UserCheck size={20} className="text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300" />
                            <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent font-['Poppins']">3. User Conduct</h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-['Inter']">You agree not to use the service for any illegal purposes, to transmit harmful content, or to attempt to interfere with the platform's security or integrity.</p>
                    </section>
                    <section className="bg-pink-50/30 dark:bg-pink-900/10 p-4 rounded-2xl border border-pink-100/50 dark:border-pink-900/20 group hover:border-pink-300 dark:hover:border-pink-700 transition-colors">
                        <div className="flex items-center space-x-3 mb-2">
                            <Copyright size={20} className="text-pink-600 dark:text-pink-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                            <h3 className="text-lg font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent font-['Poppins']">4. Intellectual Property</h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-['Inter']">The platform, its original content, features, and functionality are owned by EzStudy and are protected by international <span className="text-pink-600 dark:text-pink-400 font-medium">copyright and trademark</span> laws.</p>
                    </section>
                    <section className="bg-red-50/30 dark:bg-red-900/10 p-4 rounded-2xl border border-red-100/50 dark:border-red-900/20 group hover:border-red-300 dark:hover:border-red-700 transition-colors">
                        <div className="flex items-center space-x-3 mb-2">
                            <AlertTriangle size={20} className="text-red-600 dark:text-red-400 group-hover:scale-110 group-hover:animate-bounce transition-all duration-300" />
                            <h3 className="text-lg font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent font-['Poppins']">5. Limitation of Liability</h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-['Inter']">EzStudy provides AI-generated content for <span className="text-red-600 dark:text-red-400 font-medium">informational purposes</span>. We do not guarantee the accuracy of AI responses and are not liable for any learning outcomes.</p>
                    </section>
                </div>
            )
        },
        privacy: {
            title: "Privacy Policy",
            content: (
                <div className="space-y-6">
                    <section className="bg-emerald-50/30 dark:bg-emerald-900/10 p-4 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/20 group hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                        <div className="flex items-center space-x-3 mb-2">
                            <Database size={20} className="text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                            <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-['Rubik']">1. Information We Collect</h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-['Inter']">We collect information you provide directly, such as when you create an account, upload documents for analysis, or interact with our <span className="text-emerald-600 dark:text-emerald-400 font-medium">AI assistant</span>.</p>
                    </section>
                    <section className="bg-cyan-50/30 dark:bg-cyan-900/10 p-4 rounded-2xl border border-cyan-100/50 dark:border-cyan-900/20 group hover:border-cyan-300 dark:hover:border-cyan-700 transition-colors">
                        <div className="flex items-center space-x-3 mb-2">
                            <Eye size={20} className="text-cyan-600 dark:text-cyan-400 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300" />
                            <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent font-['Poppins']">2. How We Use Your Information</h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-['Inter']">Your data is used to provide and improve our AI services, <span className="text-cyan-600 dark:text-cyan-400 font-medium">personalize your experience</span>, and maintain platform security.</p>
                    </section>
                    <section className="bg-blue-50/30 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100/50 dark:border-blue-900/20 group hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                        <div className="flex items-center space-x-3 mb-2">
                            <Lock size={20} className="text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:animate-pulse transition-all duration-300" />
                            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-['Poppins']">3. Data Security</h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-['Inter']">We implement <span className="text-blue-600 dark:text-blue-400 font-medium">industry-standard security</span> measures to protect your information. However, no method of transmission is 100% secure.</p>
                    </section>
                    <section className="bg-indigo-50/30 dark:bg-indigo-900/10 p-4 rounded-2xl border border-indigo-100/50 dark:border-indigo-900/20 group hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                        <div className="flex items-center space-x-3 mb-2">
                            <Cpu size={20} className="text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                            <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-['Poppins']">4. AI Processing</h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-['Inter']">Documents you upload are processed by AI models. We <span className="text-indigo-600 dark:text-indigo-400 font-medium">do not use your data</span> to train public AI models without your consent.</p>
                    </section>
                </div>
            )
        },
        services: {
            title: "Terms of Service",
            content: (
                <div className="space-y-6">
                    <section className="bg-amber-50/30 dark:bg-amber-900/10 p-4 rounded-2xl border border-amber-100/50 dark:border-amber-900/20 group hover:border-amber-300 dark:hover:border-amber-700 transition-colors">
                        <div className="flex items-center space-x-3 mb-2">
                            <CreditCard size={20} className="text-amber-600 dark:text-amber-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                            <h3 className="text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-['Playfair_Display']">1. Subscription and Access</h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-['Inter']">Access to certain features may require a subscription. We reserve the right to modify our <span className="text-amber-600 dark:text-amber-400 font-medium">pricing and availability</span>.</p>
                    </section>
                    <section className="bg-orange-50/30 dark:bg-orange-900/10 p-4 rounded-2xl border border-orange-100/50 dark:border-orange-900/20 group hover:border-orange-300 dark:hover:border-orange-700 transition-colors">
                        <div className="flex items-center space-x-3 mb-2">
                            <Activity size={20} className="text-orange-600 dark:text-orange-400 group-hover:scale-110 group-hover:animate-pulse transition-all duration-300" />
                            <h3 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-['Poppins']">2. AI Usage Limits</h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-['Inter']">To ensure <span className="text-orange-600 dark:text-orange-400 font-medium">fair usage</span>, we may implement rate limits or quotas on AI interactions and file uploads.</p>
                    </section>
                    <section className="bg-rose-50/30 dark:bg-rose-900/10 p-4 rounded-2xl border border-rose-100/50 dark:border-rose-900/20 group hover:border-rose-300 dark:hover:border-rose-700 transition-colors">
                        <div className="flex items-center space-x-3 mb-2">
                            <XCircle size={20} className="text-rose-600 dark:text-rose-400 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300" />
                            <h3 className="text-lg font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent font-['Poppins']">3. Account Termination</h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-['Inter']">We reserve the right to <span className="text-rose-600 dark:text-rose-400 font-medium">suspend or terminate</span> accounts that violate our terms or engage in abusive behavior.</p>
                    </section>
                </div>
            )
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
