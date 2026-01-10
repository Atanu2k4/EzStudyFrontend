import React, { useState, useRef, useEffect } from "react";
import { Home, Upload, X, LogOut, User, FileText, Brain, BookOpen, PenTool, BarChart3, Bot, ChevronRight, Menu, Settings, Trash2, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Sub-components moved to top to avoid initialization errors
const StatCard = ({ label, value, sub, color }) => {
  const colorMap = {
    blue: 'border-blue-100 bg-blue-50/30 text-blue-600',
    purple: 'border-purple-100 bg-purple-50/30 text-purple-600',
    green: 'border-green-100 bg-green-50/30 text-green-600',
  };

  return (
    <div className={`p-6 bg-white dark:bg-gray-800 rounded-3xl border ${colorMap[color] || 'border-gray-100'} shadow-sm`}>
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium font-['Inter']">{label}</p>
      <p className="text-2xl font-black mt-1 text-gray-900 dark:text-white">{value}</p>
      <p className="text-[10px] text-gray-400 mt-2">{sub}</p>
    </div>
  );
};

const SidebarLink = ({ active, onClick, icon, label, collapsed }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${active
      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 shadow-md hover:shadow-lg"
      : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 hover:shadow-sm"
      } ${collapsed ? 'justify-center' : ''}`}
  >
    {icon}
    {!collapsed && <span className="text-sm font-bold">{label}</span>}
  </button>
);

const LearningPage = ({ setShowLearningPage, user, onLogout }) => {
  console.log("LearningPage rendering, user:", user);
  const [activeTab, setActiveTab] = useState("chat");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [aiConfig, setAiConfig] = useState({
    tone: "balanced", // 'creative', 'balanced', 'precise'
    mode: "tutor", // 'tutor', 'summarizer', 'examiner'
    personality: "friendly", // 'friendly', 'professional', 'rigorous'
  });
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      sender: "ai",
      text: "Welcome to your AI Learning Console! I'm your **Groq-powered** tutor. I can help you with:\n\n- **Study explanations** and *concept clarification*\n- **Homework assistance** and *problem-solving*\n- **Note summarization** and *key point extraction*\n\nHow can I assist your study session today?",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const textAreaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Insert markdown formatting
  const insertMarkdown = (prefix, suffix = prefix) => {
    const textarea = textAreaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = inputText.substring(start, end);
    const newText = inputText.substring(0, start) + prefix + selectedText + suffix + inputText.substring(end);
    setInputText(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length + selectedText.length, start + prefix.length + selectedText.length + suffix.length);
    }, 0);
  };

  // Handle Sending Messages
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const messageText = inputText.trim();
    if (!messageText || isLoading) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);
    setError("");

    try {
      // Use backend API to avoid CORS issues
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

      const response = await fetch(`${backendUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages.map(msg => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text
          })).concat([{ role: "user", content: messageText }]),
          config: aiConfig
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || "I couldn't generate a response.";

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: aiResponse,
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      console.error("Chat Error:", err);
      setError(err.message);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: `⚠️ **Error:** ${err.message}\n\n**Tip:** Make sure the backend server is running on port 3001.`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle File Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || isLoading) return;

    setFiles((prev) => [...prev, file]);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: `📎 **File uploaded:** ${file.name}`,
        timestamp: new Date(),
      },
    ]);
    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("sessionId", user?.email || "anonymous");

    try {
      const response = await fetch(
        "https://ezstudybackend-1.onrender.com/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: data.summary || "I've analyzed your file. What would you like to know about it?",
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      console.error("Upload Error:", err);
      setError("Failed to upload/process file.");
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: `❌ **Upload Error:** ${err.message}. The document analysis service might be temporarily unavailable.`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the conversation?")) {
      setMessages([{
        id: Date.now(),
        sender: "ai",
        text: "Chat cleared. How can I help you start fresh?",
        timestamp: new Date(),
      }]);
    }
  };

  const downloadTranscript = () => {
    const text = messages.map(m => `${m.sender.toUpperCase()} (${new Date(m.timestamp).toLocaleTimeString()}): ${m.text}`).join('\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EzStudy-Transcript-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
  };

  return (
    <div className="h-screen w-full flex bg-gray-50 dark:bg-gray-950 transition-colors duration-500 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:relative top-0 left-0 h-full z-40 transition-all duration-300 transform 
        ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-20'} 
        flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shrink-0`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          {isSidebarOpen && (
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 truncate">EzStudy Console</span>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 hidden md:block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <Menu size={20} />
          </button>
          <button onClick={() => setIsSidebarOpen(false)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 md:hidden text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-2">
          <SidebarLink active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} icon={<Bot size={20} />} label="AI Tutor" collapsed={!isSidebarOpen} />
          <SidebarLink active={activeTab === 'notes'} onClick={() => setActiveTab('notes')} icon={<BookOpen size={20} />} label="Smart Notes" collapsed={!isSidebarOpen} />
          <SidebarLink active={activeTab === 'quiz'} onClick={() => setActiveTab('quiz')} icon={<PenTool size={20} />} label="Practice Quiz" collapsed={!isSidebarOpen} />
          <SidebarLink active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} icon={<BarChart3 size={20} />} label="Performance" collapsed={!isSidebarOpen} />
          <SidebarLink active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={<Settings size={20} />} label="AI Config" collapsed={!isSidebarOpen} />
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setShowLearningPage(false)}
            className={`flex items-center space-x-3 w-full p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:shadow-sm ${!isSidebarOpen && 'justify-center'}`}
          >
            <Home size={20} />
            {isSidebarOpen && <span className="text-sm font-medium font-['Inter']">Exit Console</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 z-20 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-sm sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 capitalize font-['Merriweather']">
              {activeTab === 'chat' ? 'AI Tutor Assistant' : activeTab.replace(/([A-Z])/g, ' $1')}
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {activeTab === 'chat' && (
              <div className="flex items-center gap-1 sm:gap-2 mr-2 border-r border-gray-200 dark:border-gray-800 pr-2">
                <button onClick={downloadTranscript} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-sm" title="Download Transcript">
                  <Download size={18} />
                </button>
                <button onClick={clearChat} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-sm" title="Clear Chat">
                  <Trash2 size={18} />
                </button>
              </div>
            )}
            <div className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-800 hidden xs:flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300">
                {user?.name || user?.email?.split('@')[0]}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-md hover:text-red-600"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Dynamic Tab Content */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {error && (
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50">
              <div className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium font-['Inter']">
                <X size={16} className="cursor-pointer" onClick={() => setError("")} />
                <span>{error}</span>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-xl p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${message.sender === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-blue-500/5"
                        }`}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        className="prose dark:prose-invert prose-sm max-w-none"
                      >
                        {message.text}
                      </ReactMarkdown>
                      <div className={`text-[10px] mt-2 opacity-50 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start animate-in fade-in duration-300">
                    <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-tl-none shadow-sm flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shrink-0">
                <div className="max-w-3xl mx-auto">
                  {files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800 text-xs">
                          <FileText size={12} className="mr-2 text-blue-500" />
                          <span className="truncate max-w-[150px]">{file.name}</span>
                          <button onClick={() => setFiles(files.filter((_, i) => i !== index))} className="ml-2 hover:text-red-500"><X size={14} /></button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-1 mb-2">
                    <button
                      onClick={() => insertMarkdown('**')}
                      className="p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors font-bold text-sm"
                      title="Bold"
                    >
                      B
                    </button>
                    <button
                      onClick={() => insertMarkdown('*')}
                      className="p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors italic text-sm"
                      title="Italic"
                    >
                      I
                    </button>
                  </div>
                  <form onSubmit={handleSendMessage} className="flex items-end gap-2 bg-gray-50 dark:bg-gray-800 p-2 rounded-[24px] border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <Upload size={20} />
                      <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                    </button>
                    <textarea
                      ref={textAreaRef}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage(e))}
                      placeholder="Ask me anything... (Powered by Groq AI)"
                      className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 dark:text-gray-100 py-2 px-2 resize-none max-h-32 text-sm"
                      rows={1}
                    />
                    <button
                      type="submit"
                      disabled={!inputText.trim()}
                      className={`p-2.5 rounded-full shadow-md transition-all ${inputText.trim() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 dark:bg-gray-700 text-gray-400"}`}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 animate-in fade-in zoom-in-95 duration-300">
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 text-transparent bg-clip-text">
                    <Settings className="text-blue-600" size={24} /> AI Configuration
                  </h3>
                  <p className="text-sm text-gray-500">Fine-tune how your AI assistant interacts and processes information.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* AI Tone */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Response Tone</label>
                    <div className="flex flex-col gap-2">
                      {['creative', 'balanced', 'precise'].map(t => (
                        <button
                          key={t}
                          onClick={() => setAiConfig({ ...aiConfig, tone: t })}
                          className={`px-4 py-3 rounded-xl border text-left transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md ${aiConfig.tone === t
                            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-400 ring-2 ring-blue-500/10 shadow-md'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:shadow-sm'
                            }`}
                        >
                          <span className="block font-bold capitalize text-sm">{t}</span>
                          <span className="text-[10px] opacity-60">
                            {t === 'creative' && 'More expressive and conversational'}
                            {t === 'balanced' && 'Mix of accuracy and natural flow'}
                            {t === 'precise' && 'Strict factual accuracy, concise output'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* AI Mode */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Operational Mode</label>
                    <div className="flex flex-col gap-2">
                      {['tutor', 'summarizer', 'examiner'].map(m => (
                        <button
                          key={m}
                          onClick={() => setAiConfig({ ...aiConfig, mode: m })}
                          className={`px-4 py-3 rounded-xl border text-left transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md ${aiConfig.mode === m
                            ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-500 text-purple-700 dark:text-purple-400 ring-2 ring-purple-500/10 shadow-md'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-300 hover:shadow-sm'
                            }`}
                        >
                          <span className="block font-bold capitalize text-sm">{m}</span>
                          <span className="text-[10px] opacity-60">
                            {m === 'tutor' && 'Deep explanations and step-by-step help'}
                            {m === 'summarizer' && 'Efficient digests of your resources'}
                            {m === 'examiner' && 'Quiz-focused testing and feedback'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
                  <h4 className="text-sm font-bold mb-2">Selected Model</h4>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Llama 3.3 (70B) via Groq Cloud</span>
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-bold">Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 animate-in fade-in slide-in-from-right-2 duration-500">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold flex items-center gap-3 bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 text-transparent bg-clip-text">
                    <BookOpen size={28} className="text-blue-600" /> Smart Study Notes
                  </h3>
                  <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 hover:shadow-xl">
                    <Upload size={16} /> Upload New
                  </button>
                </div>

                {files.length === 0 ? (
                  <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl bg-white/50 dark:bg-gray-900/50">
                    <FileText size={48} className="text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium font-['Inter']">No study materials uploaded yet.</p>
                    <p className="text-xs text-gray-400 mt-1">Upload PDFs or Docs to generate AI summaries.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {files.map((file, idx) => (
                      <div key={idx} className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow group relative">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-600">
                            <FileText size={24} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm truncate pr-6">{file.name}</h4>
                            <p className="text-[10px] text-gray-400 uppercase tracking-tighter mt-1">{Math.round(file.size / 1024)} KB • Just now</p>
                            <button className="mt-3 text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1 transition-all duration-300 hover:scale-105 active:scale-95">
                              View AI Summary <ChevronRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 animate-in fade-in slide-in-from-right-2 duration-500">
              <div className="max-w-4xl mx-auto space-y-8">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <BarChart3 size={28} className="text-blue-600" /> Learning Analytics
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <StatCard label="Total Queries" value={messages.length - 1} sub="This session" color="blue" />
                  <StatCard label="Resources" value={files.length} sub="Uploaded files" color="purple" />
                  <StatCard label="Study Time" value="42m" sub="Estimated" color="green" />
                </div>

                <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
                  <h4 className="font-bold">Weekly Progress</h4>
                  <div className="flex items-end justify-between h-40 gap-2">
                    {[40, 70, 45, 90, 65, 30, 85].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full bg-blue-100 dark:bg-blue-900/30 rounded-t-lg relative group">
                          <div style={{ height: `${h}%` }} className="bg-blue-600 rounded-t-lg transition-all duration-1000 group-hover:bg-blue-500"></div>
                        </div>
                        <span className="text-[10px] text-gray-400">Day {i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95">
              <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-3xl flex items-center justify-center mb-6 border border-red-100 dark:border-red-900/30">
                <PenTool size={48} className="text-red-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Practice Quizzes</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Generate dynamic assessments from your study materials. This feature is being tuned for maximum accuracy.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl w-full">
                <div className="p-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl flex items-center gap-4 text-left opacity-60">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center font-bold">MCQ</div>
                  <div>
                    <p className="text-xs font-bold">Multiple Choice</p>
                    <p className="text-[10px] text-gray-500">Coming Soon</p>
                  </div>
                </div>
                <div className="p-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl flex items-center gap-4 text-left opacity-60">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center font-bold">TF</div>
                  <div>
                    <p className="text-xs font-bold">True / False</p>
                    <p className="text-[10px] text-gray-500">Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'chat' && activeTab !== 'settings' && activeTab !== 'notes' && activeTab !== 'stats' && activeTab !== 'quiz' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
                {activeTab === 'notes' && <BookOpen size={40} className="text-blue-600" />}
                {activeTab === 'quiz' && <PenTool size={40} className="text-blue-600" />}
                {activeTab === 'stats' && <BarChart3 size={40} className="text-blue-600" />}
              </div>
              <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
              <p className="text-gray-500 max-w-md">
                We're currently building the {activeTab} module to provide even deeper AI insights for your learning journey.
              </p>
              <button
                onClick={() => setActiveTab('chat')}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Back to AI Tutor
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LearningPage;
