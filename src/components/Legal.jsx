import React from 'react';
import { X, ArrowLeft, ShieldCheck, FileText, Lock, Scale, UserCheck, Zap, CreditCard, AlertTriangle, Database, Eye, Cpu, Handshake, Copyright, Activity, XCircle, Bot } from 'lucide-react';

const Legal = ({ type, onClose }) => {
    const content = {
        terms: {
            title: "Terms & Conditions",
            content: (
                <div className="space-y-3">
                    <section className="group bg-blue-50/30 dark:bg-blue-900/10 p-2.5 rounded-lg border border-blue-100/50 dark:border-blue-900/20 hover:shadow-md dark:hover:shadow-blue-900/30 transition-all duration-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/15 hover:-translate-y-0.5 cursor-default">
                        <div className="flex items-center space-x-2 mb-1.5">
                            <Handshake size={14} className="text-blue-600 dark:text-blue-400 flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                            <h3 className="text-[12px] font-semibold text-blue-600 dark:text-blue-400 font-['Cambria_Math']">Agreement to Terms</h3>
                        </div>
                        <p className="text-[11px] text-gray-700 dark:text-gray-300 leading-relaxed font-['Cambria_Math']">By accessing or using EzStudy, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please do not use our services. These terms constitute the entire agreement between you and EzStudy regarding the use of the platform. Your continued use of the service indicates your acceptance of the terms.</p>
                    </section>
                    <section className="group bg-purple-50/30 dark:bg-purple-900/10 p-2.5 rounded-lg border border-purple-100/50 dark:border-purple-900/20 hover:shadow-md dark:hover:shadow-purple-900/30 transition-all duration-300 hover:bg-purple-50/50 dark:hover:bg-purple-900/15 hover:-translate-y-0.5 cursor-default">
                        <div className="flex items-center space-x-2 mb-1.5">
                            <Bot size={14} className="text-purple-600 dark:text-purple-400 flex-shrink-0 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-300" />
                            <h3 className="text-[12px] font-semibold text-purple-600 dark:text-purple-400 font-['Cambria_Math']">Description of Service</h3>
                        </div>
                        <p className="text-[11px] text-gray-700 dark:text-gray-300 leading-relaxed font-['Cambria_Math']">EzStudy provides AI-powered learning tools, including chat-based tutoring, file analysis, quiz generation, and personalized study aids. We use advanced AI models to provide these services. The platform is designed for educational purposes and may not always provide 100% accurate information. Users should verify critical information independently before relying on it.</p>
                    </section>
                    <section className="group bg-indigo-50/30 dark:bg-indigo-900/10 p-2.5 rounded-lg border border-indigo-100/50 dark:border-indigo-900/20 hover:shadow-md dark:hover:shadow-indigo-900/30 transition-all duration-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/15 hover:-translate-y-0.5 cursor-default">
                        <div className="flex items-center space-x-2 mb-1.5">
                            <UserCheck size={14} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                            <h3 className="text-[12px] font-semibold text-indigo-600 dark:text-indigo-400 font-['Cambria_Math']">User Responsibilities</h3>
                        </div>
                        <p className="text-[11px] text-gray-700 dark:text-gray-300 leading-relaxed font-['Cambria_Math']">You agree to use EzStudy only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of EzStudy. You agree not to harass or cause distress or inconvenience to any person, and not to transmit or facilitate transmission of any obscene or offensive content. Violations may result in account suspension.</p>
                    </section>
                    <section className="group bg-pink-50/30 dark:bg-pink-900/10 p-2.5 rounded-lg border border-pink-100/50 dark:border-pink-900/20 hover:shadow-md dark:hover:shadow-pink-900/30 transition-all duration-300 hover:bg-pink-50/50 dark:hover:bg-pink-900/15 hover:-translate-y-0.5 cursor-default">
                        <div className="flex items-center space-x-2 mb-1.5">
                            <AlertTriangle size={14} className="text-pink-600 dark:text-pink-400 flex-shrink-0 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-300" />
                            <h3 className="text-[12px] font-semibold text-pink-600 dark:text-pink-400 font-['Cambria_Math']">Limitation of Liability</h3>
                        </div>
                        <p className="text-[10px] text-gray-700 dark:text-gray-300 leading-relaxed font-['Cambria_Math']">EzStudy is provided "as is" without warranty of any kind. We are not liable for any damages resulting from your use or inability to use the service, including loss of data, loss of profits, or business interruption.</p>
                    </section>
                </div>
            )
        },
        privacy: {
            title: "Privacy Policy",
            content: (
                <div className="space-y-3">
                    <section className="group bg-emerald-50/30 dark:bg-emerald-900/10 p-2.5 rounded-lg border border-emerald-100/50 dark:border-emerald-900/20 hover:shadow-md dark:hover:shadow-emerald-900/30 transition-all duration-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/15 hover:-translate-y-0.5 cursor-default">
                        <div className="flex items-center space-x-2 mb-1.5">
                            <Database size={14} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                            <h3 className="text-[12px] font-semibold text-emerald-600 dark:text-emerald-400 font-['Cambria_Math']">Information We Collect</h3>
                        </div>
                        <p className="text-[11px] text-gray-700 dark:text-gray-300 leading-relaxed font-['Cambria_Math']">We collect information you provide directly, such as when you create an account, upload documents for analysis, set your preferences, or interact with our AI assistant. This may include your name, email address, profile information, and uploaded files or content. We also collect usage data and analytics to improve our services.</p>
                    </section>
                    <section className="group bg-cyan-50/30 dark:bg-cyan-900/10 p-2.5 rounded-lg border border-cyan-100/50 dark:border-cyan-900/20 hover:shadow-md dark:hover:shadow-cyan-900/30 transition-all duration-300 hover:bg-cyan-50/50 dark:hover:bg-cyan-900/15 hover:-translate-y-0.5 cursor-default">
                        <div className="flex items-center space-x-2 mb-1.5">
                            <Eye size={14} className="text-cyan-600 dark:text-cyan-400 flex-shrink-0 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-300" />
                            <h3 className="text-[12px] font-semibold text-cyan-600 dark:text-cyan-400 font-['Cambria_Math']">How We Use Your Information</h3>
                        </div>
                        <p className="text-[11px] text-gray-700 dark:text-gray-300 leading-relaxed font-['Cambria_Math']">Your data is used to provide and improve our AI services, personalize your experience, maintain platform security, and send you service-related announcements. We analyze usage patterns to enhance features and user experience. Your information is never sold to third parties without explicit consent.</p>
                    </section>
                    <section className="group bg-blue-50/30 dark:bg-blue-900/10 p-2.5 rounded-lg border border-blue-100/50 dark:border-blue-900/20 hover:shadow-md dark:hover:shadow-blue-900/30 transition-all duration-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/15 hover:-translate-y-0.5 cursor-default">
                        <div className="flex items-center space-x-2 mb-1.5">
                            <Lock size={14} className="text-blue-600 dark:text-blue-400 flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                            <h3 className="text-[12px] font-semibold text-blue-600 dark:text-blue-400 font-['Cambria_Math']">Data Security</h3>
                        </div>
                        <p className="text-[11px] text-gray-700 dark:text-gray-300 leading-relaxed font-['Cambria_Math']">We implement industry-standard security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security of your data.</p>
                    </section>
                    <section className="group bg-violet-50/30 dark:bg-violet-900/10 p-2.5 rounded-lg border border-violet-100/50 dark:border-violet-900/20 hover:shadow-md dark:hover:shadow-violet-900/30 transition-all duration-300 hover:bg-violet-50/50 dark:hover:bg-violet-900/15 hover:-translate-y-0.5 cursor-default">
                        <div className="flex items-center space-x-2 mb-1.5">
                            <Cpu size={14} className="text-violet-600 dark:text-violet-400 flex-shrink-0 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-300" />
                            <h3 className="text-[12px] font-semibold text-violet-600 dark:text-violet-400 font-['Cambria_Math']">AI and Data Processing</h3>
                        </div>
                        <p className="text-[11px] text-gray-700 dark:text-gray-300 leading-relaxed font-['Cambria_Math']">Your data may be processed by AI models to provide personalized services and improve our algorithms. We do not use your personal information for training AI models without explicit consent. All AI processing complies with data protection regulations.</p>
                    </section>
                </div>
            )
        },
        services: {
            title: "Terms of Service",
            content: (
                <div className="space-y-3">
                    <section className="group bg-amber-50/30 dark:bg-amber-900/10 p-2.5 rounded-lg border border-amber-100/50 dark:border-amber-900/20 hover:shadow-md dark:hover:shadow-amber-900/30 transition-all duration-300 hover:bg-amber-50/50 dark:hover:bg-amber-900/15 hover:-translate-y-0.5 cursor-default">
                        <div className="flex items-center space-x-2 mb-1.5">
                            <CreditCard size={14} className="text-amber-600 dark:text-amber-400 flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                            <h3 className="text-[12px] font-semibold text-amber-600 dark:text-amber-400 font-['Cambria_Math']">Subscription and Access</h3>
                        </div>
                        <p className="text-[11px] text-gray-700 dark:text-gray-300 leading-relaxed font-['Cambria_Math']">Access to certain premium features may require a subscription. We reserve the right to modify our pricing, features, and availability at any time with notice. Subscriptions are non-refundable except where required by law. Your account access may be terminated for violation of these terms.</p>
                    </section>
                    <section className="group bg-orange-50/30 dark:bg-orange-900/10 p-2.5 rounded-lg border border-orange-100/50 dark:border-orange-900/20 hover:shadow-md dark:hover:shadow-orange-900/30 transition-all duration-300 hover:bg-orange-50/50 dark:hover:bg-orange-900/15 hover:-translate-y-0.5 cursor-default">
                        <div className="flex items-center space-x-2 mb-1.5">
                            <Activity size={14} className="text-orange-600 dark:text-orange-400 flex-shrink-0 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-300" />
                            <h3 className="text-[12px] font-semibold text-orange-600 dark:text-orange-400 font-['Cambria_Math']">AI Usage Limits</h3>
                        </div>
                        <p className="text-[11px] text-gray-700 dark:text-gray-300 leading-relaxed font-['Cambria_Math']">To ensure fair usage and platform stability, we may implement rate limits or quotas on AI interactions and file uploads. Users exceeding these limits may have their access temporarily restricted. We reserve the right to adjust usage limits at our discretion without prior notice.</p>
                    </section>
                    <section className="group bg-rose-50/30 dark:bg-rose-900/10 p-2.5 rounded-lg border border-rose-100/50 dark:border-rose-900/20 hover:shadow-md dark:hover:shadow-rose-900/30 transition-all duration-300 hover:bg-rose-50/50 dark:hover:bg-rose-900/15 hover:-translate-y-0.5 cursor-default">
                        <div className="flex items-center space-x-2 mb-1.5">
                            <XCircle size={14} className="text-rose-600 dark:text-rose-400 flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                            <h3 className="text-[12px] font-semibold text-rose-600 dark:text-rose-400 font-['Cambria_Math']">Account Termination</h3>
                        </div>
                        <p className="text-[11px] text-gray-700 dark:text-gray-300 leading-relaxed font-['Cambria_Math']">We reserve the right to suspend or terminate accounts that violate our terms, engage in abusive behavior, or pose security risks. Upon termination, you lose access to your account and all associated data. Termination may be permanent or temporary at our sole discretion.</p>
                    </section>
                    <section className="group bg-teal-50/30 dark:bg-teal-900/10 p-2.5 rounded-lg border border-teal-100/50 dark:border-teal-900/20 hover:shadow-md dark:hover:shadow-teal-900/30 transition-all duration-300 hover:bg-teal-50/50 dark:hover:bg-teal-900/15 hover:-translate-y-0.5 cursor-default">
                        <div className="flex items-center space-x-2 mb-1.5">
                            <Handshake size={14} className="text-teal-600 dark:text-teal-400 flex-shrink-0 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-300" />
                            <h3 className="text-[12px] font-semibold text-teal-600 dark:text-teal-400 font-['Cambria_Math']">Third-Party Services</h3>
                        </div>
                        <p className="text-[11px] text-gray-700 dark:text-gray-300 leading-relaxed font-['Cambria_Math']">EzStudy may integrate with third-party services and APIs. We are not responsible for the availability or performance of these third-party services. Your use of third-party services is governed by their terms of service and privacy policies.</p>
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
                        <span className="font-medium font-['Cambria_Math']">Back to Home</span>
                    </button>
                    <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 text-transparent bg-clip-text font-['Cambria_Math']">{current.title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-90 group"
                    >
                        <X size={20} className="dark:text-white group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>

                <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
                    {current.content}
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
                    <p className="text-[11px] text-gray-500 font-['Cambria_Math']">© 2026 EzStudy AI. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Legal;
