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
  Search,
  Edit3,
  MoreVertical,
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
  const [showSidebar, setShowSidebar] = useState(true); // Changed to true so sidebar is visible by default on desktop
  const [searchQuery, setSearchQuery] = useState("");
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  // Initialize with the default chat
  const defaultChat = {
    id: "default-chat",
    title: "New Chat",
    preview: "Welcome to your AI learning assistant!",
    date: new Date(),
    isActive: true,
    messages: [
      {
        id: Date.now(),
        sender: "ai",
        text: "Welcome to your AI learning assistant! What topic would you like to learn about today?",
        timestamp: new Date(),
      },
    ],
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

  // Load chat history and messages from localStorage on component mount
  useEffect(() => {
    try {
      const savedChatHistory = localStorage.getItem("chatHistory");
      if (savedChatHistory) {
        const restoredHistory = JSON.parse(savedChatHistory);
        console.log("Restored chat history:", restoredHistory); // Debug log
        // Ensure all chats have messages array
        const historyWithMessages = restoredHistory.map(chat => ({
          ...chat,
          messages: chat.messages || [
            {
              id: Date.now(),
              sender: "ai",
              text: "Welcome to your AI learning assistant! What topic would you like to learn about today?",
              timestamp: new Date(),
            },
          ],
        }));
        setChatHistory(historyWithMessages);

        // Find the last active chat or use the first one
        const activeChatId = localStorage.getItem("activeChatId");
        const chatToLoad =
          historyWithMessages.find((chat) => chat.id === activeChatId) ||
          historyWithMessages[0];

        if (chatToLoad) {
          setCurrentChatId(chatToLoad.id);
          setMessages(chatToLoad.messages);
        }
      }
    } catch (error) {
      console.error("Error restoring chat history:", error);
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    } catch (error) {
      console.error("Error saving chat history:", error);
    }
  }, [chatHistory]);

  // Save active chat ID to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("activeChatId", currentChatId);
    } catch (error) {
      console.error("Error saving active chat ID:", error);
    }
  }, [currentChatId]);

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

      chatContainerRef.current.style.backgroundPosition = `${x * 5}px ${y * 5
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
          messages: messages, // Store messages in chat history object
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

    // Update chat title if this is the first user message
    const updatedMessages = [...messages, userMessage];
    updateChatTitle(currentChatId, updatedMessages);

    setInputText("");
    setIsLoading(true);
    setShowAnimation(true);

    let queryPayload = inputText;
    if (useFileContext && lastDocSummary) {
      queryPayload = `Based on the following document analysis:\n\n${lastDocSummary}\n\nAnswer the following query:\n${inputText}`;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/ask`,
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
        `${import.meta.env.VITE_BACKEND_URL}/upload`,
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
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  // Create a new chat session
  const createNewChat = () => {
    // Save current chat messages to chatHistory state
    setChatHistory((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? { ...chat, messages: [...messages], preview: getPreviewText(messages) }
          : chat
      )
    );

    const newChatId = `chat-${Date.now()}`;
    const welcomeMessage = {
      id: Date.now(),
      sender: "ai",
      text: "Welcome to your AI learning assistant! What topic would you like to learn about today?",
      timestamp: new Date(),
    };

    const newChat = {
      id: newChatId,
      title: "New Chat",
      preview: "Welcome to your AI learning assistant!",
      date: new Date(),
      isActive: true,
      messages: [welcomeMessage],
    };

    // Update chat history - deactivate all other chats, add new chat
    setChatHistory((prev) => [
      newChat,
      ...prev.map((chat) => ({ ...chat, isActive: false })),
    ]);

    // Set new chat as current chat
    setCurrentChatId(newChatId);

    // Reset states for new chat
    setMessages([welcomeMessage]);
    setLastDocSummary("");
    setUseFileContext(false);
    setFiles([]);
  };

  // Generate chat title from first user message
  const generateChatTitle = (messages) => {
    const firstUserMessage = messages.find((msg) => msg.sender === "user");
    if (firstUserMessage) {
      const text = firstUserMessage.text;
      // Take first 30 characters and clean it up
      const title = text.length > 30 ? text.substring(0, 30) + "..." : text;
      return title.replace(/[^\w\s]/g, "").trim() || "New Chat";
    }
    return "New Chat";
  };

  // Update chat title when first message is sent
  const updateChatTitle = (chatId, messages) => {
    setChatHistory((prev) =>
      prev.map((chat) =>
        chat.id === chatId && chat.title === "New Chat"
          ? { ...chat, title: generateChatTitle(messages) }
          : chat
      )
    );
  };

  // Switch to a different chat session
  const switchChat = (chatId) => {
    // Save current chat messages to chatHistory state before switching
    setChatHistory((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? { ...chat, messages: [...messages], preview: getPreviewText(messages) }
          : chat
      )
    );

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

      // Load messages from chatHistory state
      const chatMessages = selectedChat.messages || [
        {
          id: Date.now(),
          sender: "ai",
          text: "Welcome to your AI learning assistant! What topic would you like to learn about today?",
          timestamp: new Date(),
        },
      ];
      setMessages(chatMessages);

      // Reset file context for new chat
      setLastDocSummary("");
      setUseFileContext(false);
      setFiles([]);

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
      const chatMessages = newCurrentChat.messages || [
        {
          id: Date.now(),
          sender: "ai",
          text: "Welcome to your AI learning assistant! What topic would you like to learn about today?",
          timestamp: new Date(),
        },
      ];
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
        {/* Chat History Sidebar - ChatGPT Style */}
        <div
          className={`${showSidebar ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 absolute md:relative md:block z-30 h-[calc(100%-4rem)] w-80 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out flex flex-col`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowSidebar(false)}
              className="md:hidden p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* New Chat Button */}
          <div className="p-3">
            <button
              onClick={createNewChat}
              className="w-full flex items-center justify-center space-x-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm"
            >
              <Plus size={16} />
              <span className="font-medium">New Chat</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="px-3 pb-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto px-2">
            {chatHistory.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <p>No chats yet. Create one to get started!</p>
              </div>
            ) : (
              chatHistory
                .filter((chat) =>
                  chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  chat.preview.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((chat) => (
                  <div
                    key={chat.id}
                    className={`group relative mb-1 rounded-lg transition-all duration-200 ${chat.isActive
                        ? "bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-600"
                        : "hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm"
                      }`}
                  >
                    <button
                      onClick={() => switchChat(chat.id)}
                      className="w-full text-left p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1 min-w-0">
                          <MessageSquare
                            size={16}
                            className={`mt-0.5 flex-shrink-0 ${chat.isActive ? "text-blue-600" : "text-gray-400"
                              }`}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3
                                className={`text-sm font-medium truncate ${chat.isActive
                                    ? "text-gray-900 dark:text-white"
                                    : "text-gray-700 dark:text-gray-300"
                                  }`}
                              >
                                {editingChatId === chat.id ? (
                                  <input
                                    type="text"
                                    value={editingTitle}
                                    onChange={(e) => setEditingTitle(e.target.value)}
                                    onBlur={() => {
                                      if (editingTitle.trim()) {
                                        setChatHistory((prev) =>
                                          prev.map((c) =>
                                            c.id === chat.id
                                              ? { ...c, title: editingTitle.trim() }
                                              : c
                                          )
                                        );
                                      }
                                      setEditingChatId(null);
                                      setEditingTitle("");
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.target.blur();
                                      } else if (e.key === "Escape") {
                                        setEditingChatId(null);
                                        setEditingTitle("");
                                      }
                                    }}
                                    className="w-full bg-transparent border-none outline-none text-sm font-medium"
                                    autoFocus
                                  />
                                ) : (
                                  chat.title
                                )}
                              </h3>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingChatId(chat.id);
                                  setEditingTitle(chat.title);
                                }}
                                className={`opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-opacity ${chat.isActive ? "text-gray-500" : "text-gray-400"
                                  }`}
                              >
                                <Edit3 size={12} />
                              </button>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                              {chat.preview}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              {formatDate(chat.date)}
                            </p>
                          </div>
                        </div>
                      </div>
                      {chatHistory.length > 1 && (
                        <button
                          onClick={(e) => deleteChat(chat.id, e)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 hover:text-red-600 transition-opacity text-gray-400"
                        >
                          <Trash2 size={14} />
                        </button>
                        )}
                      </div>
                    </button>
                  </div>
                ))}
              )}
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
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                  } mb-4 animate-fadeIn`}
              >
                <div
                  className={`w-full sm:max-w-3xl p-4 rounded-xl shadow-sm text-sm ${message.sender === "user"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    : "bg-white border border-gray-200"
                    } transform transition-all duration-300 hover:shadow-md`}
                >
                  <div className="prose prose-sm max-w-none overflow-x-auto break-words">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.text}
                    </ReactMarkdown>
                  </div>
                  <div
                    className={`text-xs mt-2 opacity-70 ${message.sender === "user"
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
                  <p className="text-gray-500 text-xs">AI is thinking...</p>
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
      </div>
    </div>
  );
};

export default LearningPage;
