import React, { useState, useRef, useEffect } from "react";
import {
  Home,
  Upload,
  Send,
  BookOpen,
  FileText,
  Menu,
  X,
  Plus,
  MessageSquare,
  Trash2,
  MoreVertical,
  LogOut,
  User,
  Layout,
  Library,
  Copy,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
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
    <div className={`p-6 bg-white dark:bg-gray-800 rounded-3xl border ${colorMap[color] || 'border-gray-100'} dark:${colorMap[color] || 'border-gray-700'} shadow-sm`}>
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium font-['Inter']">{label}</p>
      <p className="text-2xl font-black mt-1 text-gray-900 dark:text-white">{value}</p>
      <p className="text-[10px] text-gray-400 mt-2">{sub}</p>
    </div>
  );
};

const SidebarLink = ({ active, onClick, icon, label, collapsed }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-500 ease-in-out hover:scale-105 active:scale-95 ${active
      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 shadow-md hover:shadow-lg"
      : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 hover:shadow-sm"
      } ${collapsed ? 'justify-center' : ''}`}
  >
    {icon}
    {!collapsed && <span className="text-sm font-bold">{label}</span>}
  </button>
);

const LearningPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("chat"); // 'chat', 'docs', 'stats'

  // Use user-specific keys for localStorage to ensure separation
  // Prefer non-sensitive `id` when available. Do NOT use email/username (PII) or credentials.
  const userPrefix = user?.id || 'guest';
  const CHAT_HISTORY_KEY = `ez_chat_history_${userPrefix}`;
  const ACTIVE_CHAT_KEY = `ez_active_chat_id_${userPrefix}`;
  const FILES_KEY = `ez_files_${userPrefix}`;

  const [aiConfig, setAiConfig] = useState({
    tone: "balanced",
    mode: "tutor",
    personality: "friendly",
  });
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [storedFiles, setStoredFiles] = useState([]); // persisted per-user metadata
  const [lastDocSummary, setLastDocSummary] = useState("");
  const [useFileContext, setUseFileContext] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileClosing, setProfileClosing] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [compactChat, setCompactChat] = useState(false);
  const [showMobileOptions, setShowMobileOptions] = useState(false);

  // Initialize with the default chat if no history exists
  const getDefaultChat = () => ({
    id: `chat-${Date.now()}`,
    title: "New Study Session",
    preview: "Ready to help you excel!",
    date: new Date(),
    isActive: true,
    messages: [
      {
        id: Date.now(),
        sender: "ai",
        text: `Hello ${user?.name || "there"}! I'm your personalized study assistant. I can help you summarize notes, explain complex topics, or quiz you on your materials. What should we focus on today?`,
        timestamp: new Date(),
      },
    ],
  });

  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const profileRef = useRef(null);
  const textareaRef = useRef(null);

  // Helper function to format timestamps
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    try {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      if (isNaN(date.getTime())) return "";
      return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch (error) {
      console.error("Error formatting time:", error);
      return "";
    }
  };

  // Helper function to format dates for chat history
  const formatDate = (date) => {
    if (!date) return "";
    try {
      const d = date instanceof Date ? date : new Date(date);
      if (isNaN(d.getTime())) return "";
      const now = new Date();
      if (d.toDateString() === now.toDateString()) return "Today";
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  // Get device context (date/time, timezone, geolocation)
  const getDeviceContext = async () => {
    const now = new Date();
    const deviceDate = now.toLocaleDateString();
    const deviceTime = now.toLocaleTimeString();
    const deviceYear = now.getFullYear();
    const deviceMonth = now.toLocaleString('default', { month: 'long' });
    const deviceTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

    const location = { label: null, lat: null, lon: null, accuracy: null };
    if (navigator && navigator.geolocation) {
      try {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: false, timeout: 5000 });
        });
        if (pos && pos.coords) {
          location.lat = pos.coords.latitude;
          location.lon = pos.coords.longitude;
          location.accuracy = pos.coords.accuracy;
        }
      } catch (e) {
        // Geolocation failed or denied — silently ignore
      }
    }

    return {
      deviceDate,
      deviceTime,
      deviceYear,
      deviceMonth,
      deviceTimezone,
      location
    };
  };
  // Get preview text from messages
  const getPreviewText = (msgs) => {
    if (!Array.isArray(msgs) || msgs.length === 0) return "New session";
    try {
      const lastUserMessage = [...msgs].reverse().find((msg) => msg?.sender === "user");
      if (lastUserMessage) {
        return lastUserMessage.text.length > 40
          ? lastUserMessage.text.substring(0, 40) + "..."
          : lastUserMessage.text;
      }
      const lastAiMessage = [...msgs].reverse().find((msg) => msg?.sender === "ai");
      if (lastAiMessage) {
        return lastAiMessage.text.length > 40
          ? lastAiMessage.text.substring(0, 40) + "..."
          : lastAiMessage.text;
      }
    } catch (e) {
      console.error("Error generating preview:", e);
    }
    return "New conversation";
  };

  // Load chat history and messages from localStorage on component mount
  useEffect(() => {
    try {
      const savedChatHistory = localStorage.getItem(CHAT_HISTORY_KEY);
      const savedFiles = localStorage.getItem(FILES_KEY);
      if (savedFiles) {
        try {
          const parsed = JSON.parse(savedFiles);
          if (Array.isArray(parsed)) setStoredFiles(parsed);
        } catch (e) {
          console.error('Error parsing stored files:', e);
        }
      }
      if (savedChatHistory) {
        const restoredHistory = JSON.parse(savedChatHistory);

        if (Array.isArray(restoredHistory) && restoredHistory.length > 0) {
          setChatHistory(restoredHistory);

          const activeChatId = localStorage.getItem(ACTIVE_CHAT_KEY);
          const chatToLoad = restoredHistory.find((chat) => chat.id === activeChatId) || restoredHistory[0];

          if (chatToLoad) {
            setCurrentChatId(chatToLoad.id);
            setMessages(Array.isArray(chatToLoad.messages) ? chatToLoad.messages : []);
          }
        } else {
          // Empty array in storage, initialize
          const initialChat = getDefaultChat();
          setChatHistory([initialChat]);
          setCurrentChatId(initialChat.id);
          setMessages(initialChat.messages);
        }
      } else {
        // No history for this user, create first chat
        const initialChat = getDefaultChat();
        setChatHistory([initialChat]);
        setCurrentChatId(initialChat.id);
        setMessages(initialChat.messages);
      }
    } catch (error) {
      console.error("Error restoring chat history:", error);
      // Fallback in case of parse error
      const initialChat = getDefaultChat();
      setChatHistory([initialChat]);
      setCurrentChatId(initialChat.id);
      setMessages(initialChat.messages);
    }
  }, [CHAT_HISTORY_KEY]);

  // Persist storedFiles metadata per user
  useEffect(() => {
    try {
      localStorage.setItem(FILES_KEY, JSON.stringify(storedFiles || []));
    } catch (e) {
      console.error('Error saving stored files:', e);
    }
  }, [storedFiles, FILES_KEY]);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      try {
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatHistory));
      } catch (error) {
        console.error("Error saving chat history:", error);
      }
    }
  }, [chatHistory, CHAT_HISTORY_KEY]);

  // Save active chat ID to localStorage
  useEffect(() => {
    if (currentChatId) {
      try {
        localStorage.setItem(ACTIVE_CHAT_KEY, currentChatId);
      } catch (error) {
        console.error("Error saving active chat ID:", error);
      }
    }
  }, [currentChatId, ACTIVE_CHAT_KEY]);

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

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        handleCloseProfile();
      }
    };
    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

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

  // Close mobile options menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMobileOptions && !event.target.closest('.mobile-options-menu')) {
        setShowMobileOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMobileOptions]);

  // Handle closing profile with pop-out animation
  const handleCloseProfile = () => {
    setProfileClosing(true);
    setTimeout(() => {
      setIsProfileOpen(false);
      setProfileClosing(false);
    }, 400);
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

    const formData = new FormData();

    // Format previous messages for history (exclude current user message)
    const historyMessages = messages.map(msg => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text
    }));

    formData.append('messages', JSON.stringify(historyMessages));
    formData.append('userMessage', messageText);
    // Attach device context (date/time and geolocation) to config
    try {
      const deviceCtx = await getDeviceContext();
      const combinedConfig = { ...aiConfig, deviceContext: deviceCtx };
      formData.append('config', JSON.stringify(combinedConfig));
    } catch (e) {
      formData.append('config', JSON.stringify(aiConfig));
    }

    // Add files to the request if any are stored or recently uploaded
    // Note: In this version, we're sending the current batch of files
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/chat`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();

      // Extract response content - backend seems to return a structure with choices
      const aiContent = data.choices ? data.choices[0]?.message?.content : data.response;

      const aiResponse = {
        id: Date.now(),
        sender: "ai",
        text: aiContent || "I'm not sure how to respond to that.",
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
    formData.append("files", file);
    formData.append("userMessage", `Analyze this file: ${file.name}`);
    formData.append("messages", JSON.stringify([{ role: "user", content: `Analyze this file: ${file.name}` }]));
    // attach device context for file analysis
    try {
      const deviceCtx = await getDeviceContext();
      const combinedConfig = { ...aiConfig, deviceContext: deviceCtx };
      formData.append("config", JSON.stringify(combinedConfig));
    } catch (e) {
      formData.append("config", JSON.stringify(aiConfig));
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/chat`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();

      const aiContent = data.choices ? data.choices[0]?.message?.content : data.response;

      const aiMsg = {
        id: Date.now(),
        sender: "ai",
        text: aiContent || "I've analyzed your file, but couldn't generate a summary.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);

      // If it's a document, store the summary for context
      const allowedExtensions = [".pdf", ".ppt", ".pptx", ".doc", ".docx", ".txt"];
      if (allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))) {
        setLastDocSummary(aiContent || "");
      }

      // Persist file metadata for this user so it appears in Library
      const meta = { name: file.name, size: file.size, type: file.type || 'application/octet-stream', uploadedAt: new Date().toISOString() };
      setStoredFiles((prev) => {
        const deduped = [meta, ...prev.filter(f => f.name !== meta.name)];
        return deduped;
      });
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
      setShowAnimation(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Create a new chat session
  const createNewChat = () => {
    const newChat = getDefaultChat();
    setChatHistory((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setMessages(newChat.messages);
    setActiveTab('chat');
    setLastDocSummary("");
    setFiles([]);
    if (window.innerWidth < 768) setShowSidebar(false);
  };

  // Start a focused discussion for a specific file
  const discussFile = (file) => {
    if (!file) return;
    // Create a fresh chat session and attach the file for context
    const newChat = getDefaultChat();
    setChatHistory((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setMessages(newChat.messages);
    setActiveTab('chat');
    // If we have the actual File object in `files`, move it to front; otherwise use metadata only
    if (file instanceof File) {
      setFiles((prev) => [file, ...prev.filter(f => f.name !== file.name)]);
    } else {
      // push metadata to storedFiles head (already persisted) to surface it
      setStoredFiles((prev) => [file, ...prev.filter(f => f.name !== file.name)]);
    }
    setUseFileContext(true);
    setInputText(`Please analyze and discuss this file: ${file.name}`);
    if (window.innerWidth < 768) setShowSidebar(false);
    // focus the input shortly after switching tabs
    setTimeout(() => textareaRef.current?.focus(), 120);
  };

  // Generate chat title from first user message
  const generateChatTitle = (messages) => {
    const firstUserMessage = messages.find((msg) => msg.sender === "user");
    if (firstUserMessage) {
      const text = firstUserMessage.text;
      const title = text.length > 30 ? text.substring(0, 30) + "..." : text;
      return title.replace(/[^\w\s]/g, "").trim() || "New Chat";
    }
    return "New Chat";
  };

  // Update chat title when first message is sent
  const updateChatTitle = (chatId, messages) => {
    setChatHistory((prev) =>
      prev.map((chat) =>
        chat.id === chatId && chat.title === "New Study Session"
          ? { ...chat, title: generateChatTitle(messages) }
          : chat
      )
    );
  };

  // Switch to a different chat session
  const switchChat = (chatId) => {
    const selectedChat = chatHistory.find((chat) => chat.id === chatId);
    if (selectedChat) {
      setCurrentChatId(chatId);
      setMessages(selectedChat.messages || []);
      setActiveTab('chat');
      if (window.innerWidth < 768) setShowSidebar(false);
    }
  };

  const deleteChat = (chatId, e) => {
    e.stopPropagation();

    setChatHistory((prev) => {
      const updatedHistory = prev.filter((chat) => chat.id !== chatId);

      // If we deleted the current chat, switch to the next available one or create a new one
      if (chatId === currentChatId) {
        if (updatedHistory.length > 0) {
          const nextChat = updatedHistory[0];
          setCurrentChatId(nextChat.id);
          setMessages(nextChat.messages || []);
        } else {
          const newChat = getDefaultChat();
          setCurrentChatId(newChat.id);
          setMessages(newChat.messages);
          return [newChat];
        }
      }
      return updatedHistory;
    });
  };

  const NavItem = ({ id, label, icon: Icon, active, onClick }) => (
    <button
      onClick={onClick}
      className={`group w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-400 ease-in-out ${active
        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:text-white"
        }`}
    >
      <Icon size={18} className="transition-colors duration-400 ease-in-out group-hover:text-black dark:group-hover:text-black transform-gpu transition-transform duration-400 ease-in-out group-hover:scale-110 group-hover:-rotate-6" />
      <span className="font-semibold text-sm transition-colors duration-200 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:via-pink-500 group-hover:to-red-500 font-['Cambria_Math']">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-['Inter']">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Sidebar - Persistent on desktop, overlay on mobile */}
      <div
        className={`${showSidebar ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:relative z-50 h-full w-[280px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Brand & Toggle */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <BookOpen size={20} />
            </div>
            <span className="font-black text-xl tracking-tight bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 text-transparent bg-clip-text drop-shadow-sm hover:scale-105 transition-transform duration-200 font-['Cambria_Math']">EzStudy</span>
          </div>
          <button onClick={() => setShowSidebar(false)} className="md:hidden p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Global Navigation */}
        <div className="px-4 space-y-1 mb-6">
          <NavItem
            id="home"
            label="Go to Home"
            icon={Home}
            active={false}
            onClick={() => navigate('/')}
          />
          <div className="h-px bg-gray-100 my-2 mx-2"></div>
          <NavItem
            id="chat"
            label="AI Chat"
            icon={MessageSquare}
            active={activeTab === 'chat'}
            onClick={() => setActiveTab('chat')}
          />
          <NavItem
            id="docs"
            label="Library"
            icon={Library}
            active={activeTab === 'docs'}
            onClick={() => setActiveTab('docs')}
          />
        </div>

        {/* Dynamic Context Section based on Nav */}
        <div className="flex-1 flex flex-col min-h-0 border-t border-gray-100">
          {activeTab === 'chat' && (
            <>
              <div className="p-4 flex items-center justify-between group">
                <span className="text-base font-bold text-gray-400 uppercase tracking-widest pl-1 transition-colors duration-200 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:via-pink-500 group-hover:to-red-500 font-['Cambria_Math']">Recent Chats</span>
                <button
                  onClick={createNewChat}
                  className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                  title="New Chat"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-3 space-y-1">
                {chatHistory.length === 0 ? (
                  <div className="py-8 text-center px-4">
                    <p className="text-xs text-gray-400">No recent activity</p>
                  </div>
                ) : (
                  chatHistory
                    .filter((chat) =>
                      chat.title.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((chat) => (
                      <div
                        key={chat.id}
                        className={`group relative rounded-lg border transition-all duration-400 ease-in-out ${chat.id === currentChatId
                          ? "bg-indigo-50/50 border-indigo-100"
                          : "bg-transparent border-transparent hover:bg-gray-50"
                          }`}
                      >
                        <button
                          onClick={() => switchChat(chat.id)}
                          className="w-full text-left p-2.5 pr-8 focus:outline-none"
                        >
                          <h3 className={`text-base font-semibold truncate ${chat.id === currentChatId ? "text-indigo-700" : "text-gray-700"} group`}>
                            <span className="transition-colors duration-400 ease-in-out group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:via-pink-500 group-hover:to-red-500">{chat.title}</span>
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5 truncate transition-colors duration-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{chat.preview}</p>
                        </button>
                        <button
                          onClick={(e) => deleteChat(chat.id, e)}
                          className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all rounded"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))
                )}
              </div>
            </>
          )}

          {activeTab === 'docs' && (
            <div className="p-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Knowledge Base</span>
              <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center">
                <Library size={20} className="mx-auto text-gray-300 mb-2" />
                <p className="text-[10px] text-gray-500 font-medium">Your uploaded study materials will appear here</p>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Area */}
        <div className="p-4 border-t border-gray-100">
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="group w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold overflow-hidden shadow-sm">
                {user?.profileImage ? (
                  <img src={user.profileImage} alt="" className="w-full h-full object-cover" />
                ) : (
                  user?.name?.[0] || user?.username?.[0] || "U"
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-xs font-bold text-gray-900 dark:text-white truncate group-hover:text-black dark:group-hover:text-black font-['Cambria_Math']">{user?.name || user?.username || "Guest"}</p>
                <p className="text-[10px] text-gray-400 dark:text-white truncate group-hover:text-black dark:group-hover:text-black font-['Cambria_Math']">{user?.email || "No email"}</p>
              </div>
              <MoreVertical size={14} className="text-gray-400" />
            </button>

            {(isProfileOpen || profileClosing) && (
              <div className={`absolute bottom-full left-0 w-full mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-50 will-change-transform-opacity ${profileClosing ? 'animate-popOut' : 'animate-fadeIn'
                }`}>
                <div className="px-2 py-1">
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center space-x-2 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors rounded-lg"
                  >
                    <LogOut size={14} />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-gray-900 relative">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40">
          <button onClick={() => setShowSidebar(true)} className="p-1 text-gray-400">
            <Menu size={18} />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white">
              <BookOpen size={12} />
            </div>
            <span className="font-extrabold text-base tracking-tight text-gray-900 dark:text-white font-['Cambria_Math']">
              <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 text-transparent bg-clip-text">EzStudy</span>
              <span className="ml-1 text-gray-700 dark:text-gray-200"> AI</span>
            </span>
          </div>
          <button onClick={() => navigate('/')} className="p-1 text-gray-400">
            <Home size={18} />
          </button>
        </div>

        {/* Backdrop for mobile */}
        {showSidebar && (
          <div
            className="md:hidden fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40"
            onClick={() => setShowSidebar(false)}
          />
        )}

        <div className="flex-1 flex flex-col relative overflow-hidden">
          {/* Main Content Render */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-3 py-4 md:px-10 lg:px-20"
          >
            {activeTab === 'chat' && (
              <div className="max-w-4xl mx-auto w-full">
                {/* Home / Greeting Screen */}
                {messages.length <= 1 && (
                  <div className="py-8 md:py-12 animate-fadeIn">
                    <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight group">
                      What are we <span className="transition-colors duration-300 text-indigo-600 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:via-pink-500 group-hover:to-red-500">learning</span> today?
                    </h2>
                    <p className="text-gray-500 dark:text-gray-300 text-xs md:text-sm mb-8 max-w-md leading-relaxed font-medium">
                      Upload lectures, summarize notes, or start a quiz.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      <button
                        onClick={() => setInputText("Explain Quantum Physics like I'm five years old.")}
                        className="p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-left hover:border-indigo-400 hover:shadow-md transition-all group"
                      >
                        <p className="text-[10px] font-bold text-indigo-600 mb-1 uppercase tracking-wider">Concept Quiz</p>
                        <p className="text-xs text-gray-700 dark:text-gray-300 group-hover:text-indigo-900">"Explain Quantum Physics like I'm 5..."</p>
                      </button>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-left hover:border-indigo-400 hover:shadow-md transition-all group"
                      >
                        <p className="text-[10px] font-bold text-purple-600 mb-1 uppercase tracking-wider">Note Summary</p>
                        <p className="text-xs text-gray-700 dark:text-gray-300 group-hover:text-purple-900">Upload PDF to generate study notes</p>
                      </button>
                    </div>
                  </div>
                )}

                {/* Messages */}
                <div className="space-y-6">
                  {Array.isArray(messages) && messages.map((message, index) => {
                    if (!message) return null;
                    const isGreeting = message.sender === "ai" && message.text.startsWith("Hello");
                    return (
                      <div
                        key={message.id || `message-${index}`}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn group`}
                      >
                        <div className={`max-w-[95%] md:max-w-[85%] relative ${message.sender === "user" ? "bg-indigo-50/40 border border-indigo-100/50 rounded-2xl p-3 shadow-sm" : "w-full"}`}>
                          {message.sender === "ai" && (
                            <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-50">
                              <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 bg-indigo-600 rounded-md flex items-center justify-center text-white shadow-sm">
                                  <BookOpen size={11} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 transition-colors duration-400 ease-in-out group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:via-pink-500 group-hover:to-red-500 font-['Cambria_Math']">EzStudy Assistant</span>
                              </div>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(message.text);
                                  setCopiedId(message.id);
                                  setTimeout(() => setCopiedId(null), 2000);
                                }}
                                className="opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300 ease-in-out p-1 text-gray-400 hover:text-indigo-600"
                              >
                                {copiedId === message.id ? <Check size={14} /> : <Copy size={14} />}
                              </button>
                            </div>
                          )}
                          <div className={`${isGreeting ? "prose-sm md:prose-base" : "prose-sm"} max-w-none break-words ${message.sender === "user" ? "text-gray-800 dark:text-gray-100 text-[13px]" : `text-gray-800 dark:text-gray-100 ${isGreeting ? "text-sm md:text-base" : "text-[13px] md:text-sm"} leading-relaxed`}`} style={message.sender === "ai" ? { fontFamily: "'Cambria Math', 'Times New Roman', serif" } : {}}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {message.text || ""}
                            </ReactMarkdown>
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            <div className="text-[9px] text-gray-400 font-medium">
                              {formatTime(message.timestamp)}
                            </div>
                            {message.sender === "user" && (
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(message.text);
                                  setCopiedId(message.id);
                                  setTimeout(() => setCopiedId(null), 2000);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out ml-2 text-gray-400 hover:text-indigo-600"
                              >
                                {copiedId === message.id ? <Check size={10} /> : <Copy size={10} />}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}

            {activeTab === 'docs' && (
              <div className="max-w-5xl mx-auto py-10 px-4">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">Study Library</h2>
                    <p className="text-sm text-gray-500">Manage your uploaded materials and AI summaries</p>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Plus size={18} />
                    <span>Add Material</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {storedFiles.length > 0 ? storedFiles.map((file, idx) => (
                    <div key={file.name || `file-${idx}`} className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow group">
                      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <FileText size={24} />
                      </div>
                      <h3 className="font-bold text-gray-900 truncate mb-1 transition-colors duration-400 ease-in-out group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:via-pink-500 group-hover:to-red-500">{file.name}</h3>
                      <p className="text-xs text-gray-400 mb-4">{file.size ? (file.size / 1024).toFixed(1) : '—'} KB • PDF Document</p>
                      <button type="button" onClick={() => discussFile(file)} className="text-xs font-bold text-indigo-600 hover:underline transition-colors duration-400 ease-in-out hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:via-pink-500 hover:to-red-500">Discuss this file →</button>
                    </div>
                  )) : (
                    <div className="col-span-full py-20 text-center">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Library size={40} className="text-gray-200" />
                      </div>
                      <p className="text-gray-400 font-medium">Your library is currently empty</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Chat Input - Only in Chat Tab */}
          {activeTab === 'chat' && (
            <div className="px-3 pb-6 md:px-10 lg:px-20 bg-white dark:bg-gray-900">
              <div className="max-w-3xl mx-auto relative group">
                <form
                  onSubmit={handleSendMessage}
                  className={`relative flex items-end transition-all duration-500 rounded-[24px] border border-gray-200 outline-none focus:outline-none ${compactChat ? 'py-2 px-3 rounded-lg' : ''} ${isLoading ? 'bg-gray-50 border-gray-100' : 'bg-white dark:bg-gray-800 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'}`}
                >
                  <div className="flex-1 min-h-[60px] sm:min-h-[52px] flex flex-col justify-center px-4 sm:px-5 py-3 sm:py-3">
                    {/* Context Badge if using files */}
                    {files.length > 0 && useFileContext && (
                      <div className="flex items-center space-x-1.5 mb-2 bg-indigo-50/80 text-indigo-700 px-2.5 py-1 rounded-full w-fit border border-indigo-100 animate-fadeIn">
                        <Library size={10} className="animate-pulse" />
                        <span className="text-[9px] font-bold uppercase tracking-widest italic">Smart Context</span>
                      </div>
                    )}
                    <textarea
                      ref={textareaRef}
                      rows="2"
                      value={inputText}
                      onChange={(e) => {
                        setInputText(e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = Math.min(e.target.scrollHeight, window.innerWidth < 640 ? 300 : 200) + 'px';
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                      placeholder="Ask the AI anything..."
                      className={`w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 ${compactChat ? 'text-sm py-0' : 'text-[14px] py-1'} text-gray-800 dark:text-gray-100 resize-none max-h-48 sm:max-h-48 placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium`}
                    />
                  </div>

                  <div className="flex items-center space-x-2 md:space-x-1 pr-3 pb-3">
                    {/* Mobile options menu */}
                    <div className="relative md:hidden">
                      <button
                        type="button"
                        onClick={() => setShowMobileOptions(!showMobileOptions)}
                        className="mobile-options-menu p-3 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-full transition-all duration-200"
                        title="More options"
                      >
                        <MoreVertical size={20} />
                      </button>
                      {showMobileOptions && (
                        <div className="mobile-options-menu absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2 min-w-[160px]">
                          <button
                            type="button"
                            onClick={() => {
                              fileInputRef.current?.click();
                              setShowMobileOptions(false);
                            }}
                            className="w-full flex items-center space-x-3 p-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            <Upload size={18} />
                            <span className="text-sm font-medium font-['Cambria_Math']">Upload File</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setUseFileContext(!useFileContext);
                              setShowMobileOptions(false);
                            }}
                            className={`w-full flex items-center space-x-3 p-3 text-left rounded-lg transition-colors ${useFileContext ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                          >
                            <Library size={18} />
                            <span className="text-sm font-medium font-['Cambria_Math']">Library Context</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setCompactChat(!compactChat);
                              setShowMobileOptions(false);
                            }}
                            className={`w-full flex items-center space-x-3 p-3 text-left rounded-lg transition-colors ${compactChat ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                          >
                            <Layout size={18} />
                            <span className="text-sm font-medium font-['Cambria_Math']">Compact Chat</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Desktop buttons */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="hidden md:flex p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-full transition-all duration-200"
                      title="Upload Study Material"
                    >
                      <Upload size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setUseFileContext(!useFileContext)}
                      className={`hidden md:flex p-2.5 rounded-full transition-all duration-200 ${useFileContext ? 'text-indigo-600 bg-indigo-50 shadow-sm' : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50/50'}`}
                      title="Library Context"
                    >
                      <Library size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCompactChat(!compactChat)}
                      className={`hidden md:flex p-2.5 rounded-full transition-all duration-200 ${compactChat ? 'text-indigo-600 bg-indigo-50 shadow-sm' : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50/50'}`}
                      title="Toggle compact chat"
                    >
                      <Layout size={18} />
                    </button>
                    <button
                      type="submit"
                      disabled={!inputText.trim() || isLoading}
                      className={`p-3 md:p-2.5 text-white bg-indigo-600 rounded-xl transition-all shadow-md ${!inputText.trim() || isLoading ? 'opacity-20 scale-95 cursor-not-allowed' : 'hover:bg-indigo-700 hover:scale-105 active:scale-95 shadow-indigo-200'}`}
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send size={20} className="md:w-4.5 md:h-4.5 rotate-0 transition-transform group-hover:rotate-12" />
                      )}
                    </button>
                  </div>
                </form>
                <div className="flex justify-center items-center space-x-4 mt-3 text-[9px] text-gray-400 uppercase tracking-widest font-bold">
                  <span>Enter to send</span>
                  <span className="w-1 h-1 bg-gray-200 rounded-full" />
                  <span>Shift+Enter for new line</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
