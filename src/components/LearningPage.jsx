import React, { useState, useRef, useEffect } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";
import {
  Home,
  Upload,
  Send,
  BookOpen,
  FileText,
  CheckCircle,
  Clock,
  Menu,
  X,
  Plus,
  MessageSquare,
  Trash2,
} from "lucide-react";
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
      text: "Welcome to your AI learning assistant! What topic would you like to learn about today?",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState([]);
  const [lastDocSummary, setLastDocSummary] = useState("");
  const [useFileContext, setUseFileContext] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Initialize with the default chat
  const defaultChat = {
    id: "default-chat",
    title: "Current Chat",
    preview: "Welcome to your AI learning assistant!",
    date: new Date(),
    isActive: true,
  };

  const [chatHistory, setChatHistory] = useState([defaultChat]);
  const [currentChatId, setCurrentChatId] = useState("default-chat");

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Define a color theme for the application
  const colors = {
    primary: "#6366f1", // Indigo
    secondary: "#8b5cf6", // Violet
    accent: "#ec4899", // Pink
    success: "#10b981", // Emerald
    warning: "#f59e0b", // Amber
    info: "#3b82f6", // Blue
    background: "#f8fafc", // Light slate
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add a subtle parallax effect to the background
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!chatContainerRef.current) return;
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      chatContainerRef.current.style.backgroundPosition = `${x * 5}px ${
        y * 5
      }px`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Update chat history when messages change - with proper dependency management
  useEffect(() => {
    // Debounce the update to prevent excessive re-renders
    const timeoutId = setTimeout(() => {
      setChatHistory((prevHistory) => {
        // Find the current chat
        const currentChatIndex = prevHistory.findIndex(
          (chat) => chat.id === currentChatId
        );

        if (currentChatIndex === -1) return prevHistory;

        // Create a new array to avoid direct state mutation
        const updatedHistory = [...prevHistory];

        // Update only the current chat
        updatedHistory[currentChatIndex] = {
          ...updatedHistory[currentChatIndex],
          preview: messages.length > 0 ? getPreviewText(messages) : "New chat",
          date: new Date(),
        };

        return updatedHistory;
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [messages, currentChatId]);

  // Get preview text from messages
  const getPreviewText = (msgs) => {
    const lastUserMessage = [...msgs]
      .reverse()
      .find((msg) => msg.sender === "user");
    if (lastUserMessage) {
      return lastUserMessage.text.length > 40
        ? lastUserMessage.text.substring(0, 40) + "..."
        : lastUserMessage.text;
    }
    const lastAiMessage = [...msgs]
      .reverse()
      .find((msg) => msg.sender === "ai");
    if (lastAiMessage) {
      return lastAiMessage.text.length > 40
        ? lastAiMessage.text.substring(0, 40) + "..."
        : lastAiMessage.text;
    }
    return "New conversation";
  };

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
    setShowAnimation(true);

    let queryPayload = inputText;
    if (useFileContext && lastDocSummary) {
      queryPayload = `Based on the following document analysis:\n\n${lastDocSummary}\n\nAnswer the following query:\n${inputText}`;
    }

    try {
      const response = await fetch(
        "https://ezstudybackend-1.onrender.com/ask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: queryPayload }),
        }
      );
      const data = await response.json();
      const aiResponse = {
        id: Date.now(),
        sender: "ai",
        text: data.response || "I'm not sure how to respond to that.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorResponse = {
        id: Date.now(),
        sender: "ai",
        text: "Sorry, I couldn't process your request. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    }
    setIsLoading(false);
    setShowAnimation(false);
  };

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
    setShowAnimation(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://ezstudybackend-1.onrender.com/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      const aiMsg = {
        id: Date.now(),
        sender: "ai",
        text:
          data.summary ||
          "I've analyzed your file, but couldn't generate a summary.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);

      const allowedExtensions = [
        ".pdf",
        ".ppt",
        ".pptx",
        ".doc",
        ".docx",
        ".txt",
      ];
      if (
        allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
      ) {
        setLastDocSummary(data.summary || "");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "Sorry, I couldn't process your file. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
    setIsLoading(false);
    setShowAnimation(false);
    fileInputRef.current.value = null;
  };

  // Create a new chat session
  const createNewChat = () => {
    // Save current chat messages before creating a new one
    saveChatMessages(currentChatId);

    const newChatId = `chat-${Date.now()}`;
    const welcomeMessage = {
      id: Date.now(),
      sender: "ai",
      text: "Welcome to your AI learning assistant! What topic would you like to learn about today?",
      timestamp: new Date(),
    };

    const newChat = {
      id: newChatId,
      title: `Chat ${chatHistory.length}`,
      preview: "New conversation",
      date: new Date(),
      isActive: true,
    };

    // Update chat history - deactivate all other chats, add new chat
    setChatHistory((prev) => [
      ...prev.map((chat) => ({ ...chat, isActive: false })),
      newChat,
    ]);

    // Set new chat as current chat
    setCurrentChatId(newChatId);

    // Reset states for new chat
    setMessages([welcomeMessage]);
    setLastDocSummary("");
    setUseFileContext(false);
    setFiles([]);
  };

  // Save the current chat's messages to local storage
  const saveChatMessages = (chatId) => {
    // Store current messages in localStorage keyed by chat ID
    try {
      localStorage.setItem(`chat_${chatId}`, JSON.stringify(messages));
    } catch (error) {
      console.error("Error saving chat messages:", error);
    }
  };

  // Load messages for a specific chat
  const loadChatMessages = (chatId) => {
    try {
      const savedMessages = localStorage.getItem(`chat_${chatId}`);
      if (savedMessages) {
        return JSON.parse(savedMessages);
      }
    } catch (error) {
      console.error("Error loading chat messages:", error);
    }

    // Return default welcome message if no saved messages
    return [
      {
        id: Date.now(),
        sender: "ai",
        text: "Welcome to your AI learning assistant! What topic would you like to learn about today?",
        timestamp: new Date(),
      },
    ];
  };

  // Switch to a different chat session
  const switchChat = (chatId) => {
    // Save current chat messages before switching
    saveChatMessages(currentChatId);

    // Find the selected chat
    const selectedChat = chatHistory.find((chat) => chat.id === chatId);

    if (selectedChat) {
      // Update active state in chat history
      setChatHistory((prev) =>
        prev.map((chat) => ({
          ...chat,
          isActive: chat.id === chatId,
        }))
      );

      // Set current chat ID
      setCurrentChatId(chatId);

      // Load messages for selected chat
      const chatMessages = loadChatMessages(chatId);
      setMessages(chatMessages);

      // Hide sidebar on mobile after switching
      setShowSidebar(false);
    }
  };

  // Delete a chat session
  const deleteChat = (chatId, e) => {
    e.stopPropagation();
    if (chatHistory.length <= 1) return; // Don't delete the last chat

    // Remove from local storage
    try {
      localStorage.removeItem(`chat_${chatId}`);
    } catch (error) {
      console.error("Error removing chat messages:", error);
    }

    // Update chat history state
    const updatedHistory = chatHistory.filter((chat) => chat.id !== chatId);
    setChatHistory(updatedHistory);

    // If the current chat is deleted, switch to the first available chat
    if (chatId === currentChatId) {
      const newCurrentChat = updatedHistory[0];
      setCurrentChatId(newCurrentChat.id);
      const chatMessages = loadChatMessages(newCurrentChat.id);
      setMessages(chatMessages);
    }
  };

  // Helper function to format timestamps
  const formatTime = (timestamp) => {
    if (!(timestamp instanceof Date)) {
      timestamp = new Date(timestamp);
    }
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(timestamp);
  };

  // Helper function to format dates for chat history
  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    const now = new Date();

    // Check if it's today
    if (date.toDateString() === now.toDateString()) {
      return "Today";
    }

    // Check if it's yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    // Otherwise, return the date
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Animated header with gradient */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg p-4 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxMzUpIj48cGF0aCBkPSJNMjAgMCBMMjAgNDAgTDAgMjAgTDQwIDIwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')]"
          opacity="0.2"
        ></div>
        <div className="max-w-5xl mx-auto flex justify-between items-center z-10 relative">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowLearningPage(false)}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 backdrop-blur-sm shadow-sm"
            >
              <Home size={18} />
              <span className="font-medium">Home</span>
            </button>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="flex md:hidden items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 backdrop-blur-sm shadow-sm"
            >
              <Menu size={18} />
            </button>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white flex items-center">
            <BookOpen className="mr-2" size={24} />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
              AI Learning Assistant
            </span>
          </h1>
          <div className="bg-white/20 p-1 rounded-full backdrop-blur-sm">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat History Sidebar */}
        <div
          className={`${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 absolute md:relative z-30 h-[calc(100%-4rem)] w-72 bg-white shadow-lg transition-transform duration-300 ease-in-out flex flex-col`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-semibold text-gray-700 flex items-center">
              <Clock size={18} className="mr-2" />
              Chat History
            </h2>
            <button
              onClick={() => setShowSidebar(false)}
              className="md:hidden p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-2">
            <button
              onClick={createNewChat}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-sm"
            >
              <Plus size={18} />
              <span>New Chat</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                onClick={() => switchChat(chat.id)}
                className={`p-3 border-b cursor-pointer hover:bg-indigo-50 transition-colors ${
                  chat.isActive ? "bg-indigo-100" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <MessageSquare size={16} className="text-indigo-600" />
                    <span className="font-medium text-gray-800 truncate">
                      {chat.title}
                    </span>
                  </div>
                  {chatHistory.length > 1 && (
                    <button
                      onClick={(e) => deleteChat(chat.id, e)}
                      className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1 truncate pl-6">
                  {chat.preview}
                </p>
                <p className="text-xs text-gray-400 mt-1 pl-6">
                  {formatDate(chat.date)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Main chat area */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 max-w-5xl mx-auto w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(236, 72, 153, 0.05) 100%)",
              backgroundSize: "200% 200%",
              transition: "background-position 0.3s ease",
            }}
          >
            {/* Backdrop overlay when sidebar is shown on mobile */}
            {showSidebar && (
              <div
                className="fixed inset-0 bg-black/20 z-20 md:hidden"
                onClick={() => setShowSidebar(false)}
              ></div>
            )}

            {/* Messages with improved styling and animations */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } mb-4 animate-fadeIn`}
              >
                <div
                  className={`max-w-2xl p-4 rounded-xl shadow-sm ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                      : "bg-white border border-gray-200"
                  } transform transition-all duration-300 hover:shadow-md`}
                >
                  <div className="prose max-w-none overflow-x-auto break-words">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.text}
                    </ReactMarkdown>
                  </div>
                  <div
                    className={`text-xs mt-2 opacity-70 ${
                      message.sender === "user"
                        ? "text-indigo-100"
                        : "text-gray-500"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator with animation */}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-purple-600 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-pink-600 animate-bounce"
                      style={{ animationDelay: "600ms" }}
                    ></div>
                  </div>
                  <p className="text-gray-500 text-sm">AI is thinking...</p>
                </div>
              </div>
            )}

            {/* Visual animation when processing */}
            {showAnimation && (
              <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-10 animate-ping"></div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area with glass effect */}
          <div className="bg-white/80 backdrop-blur-md border-t border-indigo-100 p-6 shadow-lg">
            <div className="max-w-5xl mx-auto">
              <form
                onSubmit={handleSendMessage}
                className="flex flex-col sm:flex-row sm:space-x-3"
              >
                <div className="flex-1 flex items-center space-x-2 mb-3 sm:mb-0">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Ask something..."
                      className="w-full border border-gray-300 focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-full px-5 py-3 bg-white/90 backdrop-blur-sm transition-all duration-300"
                    />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow"
                    title="Upload a file"
                  >
                    <Upload size={18} />
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-2 text-sm text-gray-700 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-200 cursor-pointer hover:bg-white transition">
                    <input
                      type="checkbox"
                      checked={useFileContext}
                      onChange={(e) => setUseFileContext(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span>Include file context</span>
                  </label>
                  <button
                    type="submit"
                    className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full flex items-center shadow-md hover:shadow-lg transition-all duration-300"
                    disabled={isLoading}
                  >
                    <Send size={18} className="mr-2" />
                    <span>Send</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningPage;
