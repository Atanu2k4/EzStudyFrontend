import React from 'react';
import { X, ArrowLeft, ShieldCheck, FileText, Lock, Scale, UserCheck, Zap, CreditCard, AlertTriangle, Database, Eye, Cpu, Handshake, Copyright, Activity, XCircle, Bot } from 'lucide-react';

const Legal = ({ type, onClose }) => {
    const content = {
        terms: {
            title: "Terms & Conditions",
            content: (
                <div className="space-y-4">
                    <section className="bg-blue-50/30 dark:bg-blue-900/10 p-3 rounded-xl border border-blue-100/50 dark:border-blue-900/20">
                        <div className="flex items-center space-x-2 mb-2">
                            <Handshake size={16} className="text-blue-600 dark:text-blue-400" />
                            <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 font-['Inter']">Agreement to Terms</h3>
                        </div>
                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-['Inter']">By accessing or using EzStudy, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please do not use our services. These terms constitute the entire agreement between you and EzStudy regarding the use of the platform.</p>
                    </section>
                    <section className="bg-purple-50/30 dark:bg-purple-900/10 p-3 rounded-xl border border-purple-100/50 dark:border-purple-900/20">
                        <div className="flex items-center space-x-2 mb-2">
                            <Bot size={16} className="text-purple-600 dark:text-purple-400" />
                            <h3 className="text-sm font-semibold text-purple-600 dark:text-purple-400 font-['Inter']">Description of Service</h3>
                        </div>
                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-['Inter']">EzStudy provides AI-powered learning tools, including chat-based tutoring, file analysis, quiz generation, and personalized study aids. We use advanced AI models to provide these services. The platform is designed for educational purposes and may not always provide 100% accurate information.</p>
                    </section>
                    <section className="bg-indigo-50/30 dark:bg-indigo-900/10 p-3 rounded-xl border border-indigo-100/50 dark:border-indigo-900/20">
                        <div className="flex items-center space-x-2 mb-2">
                            <UserCheck size={16} className="text-indigo-600 dark:text-indigo-400" />
                            <h3 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 font-['Inter']">User Responsibilities</h3>
                        </div>
                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-['Inter']">You agree to use EzStudy only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of EzStudy. You agree not to harass or cause distress or inconvenience to any person, and not to transmit or facilitate transmission of any obscene or offensive content.</p>
                    </section>
                </div>
            )
        },
        privacy: {
            title: "Privacy Policy",
            content: (
                <div className="space-y-4">
                    <section className="bg-emerald-50/30 dark:bg-emerald-900/10 p-3 rounded-xl border border-emerald-100/50 dark:border-emerald-900/20">
                        <div className="flex items-center space-x-2 mb-2">
                            <Database size={16} className="text-emerald-600 dark:text-emerald-400" />
                            <h3 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 font-['Inter']">Information We Collect</h3>
                        </div>
                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-['Inter']">We collect information you provide directly, such as when you create an account, upload documents for analysis, set your preferences, or interact with our AI assistant. This may include your name, email address, profile information, and uploaded files or content.</p>
                    </section>
                    <section className="bg-cyan-50/30 dark:bg-cyan-900/10 p-3 rounded-xl border border-cyan-100/50 dark:border-cyan-900/20">
                        <div className="flex items-center space-x-2 mb-2">
                            <Eye size={16} className="text-cyan-600 dark:text-cyan-400" />
                            <h3 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 font-['Inter']">How We Use Your Information</h3>
                        </div>
                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-['Inter']">Your data is used to provide and improve our AI services, personalize your experience, maintain platform security, and send you service-related announcements. We analyze usage patterns to enhance features and user experience. Your information is never sold to third parties.</p>
                    </section>
                    <section className="bg-blue-50/30 dark:bg-blue-900/10 p-3 rounded-xl border border-blue-100/50 dark:border-blue-900/20">
                        <div className="flex items-center space-x-2 mb-2">
                            <Lock size={16} className="text-blue-600 dark:text-blue-400" />
                            <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 font-['Inter']">Data Security</h3>
                        </div>
                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-['Inter']">We implement industry-standard security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security of your data.</p>
                    </section>
                </div>
            )
        },
        services: {
            title: "Terms of Service",
            content: (
                <div className="space-y-4">
                    <section className="bg-amber-50/30 dark:bg-amber-900/10 p-3 rounded-xl border border-amber-100/50 dark:border-amber-900/20">
                        <div className="flex items-center space-x-2 mb-2">
                            <CreditCard size={16} className="text-amber-600 dark:text-amber-400" />
                            <h3 className="text-sm font-semibold text-amber-600 dark:text-amber-400 font-['Inter']">Subscription and Access</h3>
                        </div>
                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-['Inter']">Access to certain premium features may require a subscription. We reserve the right to modify our pricing, features, and availability at any time with notice. Subscriptions are non-refundable except where required by law. Your account access may be terminated for violation of these terms.</p>
                    </section>
                    <section className="bg-orange-50/30 dark:bg-orange-900/10 p-3 rounded-xl border border-orange-100/50 dark:border-orange-900/20">
                        <div className="flex items-center space-x-2 mb-2">
                            <Activity size={16} className="text-orange-600 dark:text-orange-400" />
                            <h3 className="text-sm font-semibold text-orange-600 dark:text-orange-400 font-['Inter']">AI Usage Limits</h3>
                        </div>
                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-['Inter']">To ensure fair usage and platform stability, we may implement rate limits or quotas on AI interactions and file uploads. Users exceeding these limits may have their access temporarily restricted. We reserve the right to adjust usage limits at our discretion.</p>
                    </section>
                    <section className="bg-rose-50/30 dark:bg-rose-900/10 p-3 rounded-xl border border-rose-100/50 dark:border-rose-900/20">
                        <div className="flex items-center space-x-2 mb-2">
                            <XCircle size={16} className="text-rose-600 dark:text-rose-400" />
                            <h3 className="text-sm font-semibold text-rose-600 dark:text-rose-400 font-['Inter']">Account Termination</h3>
                        </div>
                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-['Inter']">We reserve the right to suspend or terminate accounts that violate our terms, engage in abusive behavior, or pose security risks. Upon termination, you lose access to your account and all associated data. Termination may be permanent or temporary at our sole discretion.</p>
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
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 font-['Playfair_Display']">{current.title}</h1>
                        <p className="text-xs opacity-50 font-['Inter']">Last Updated: January 10, 2026</p>
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
