import React, { useState, useRef, useEffect } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";
import {
  Home,
  Upload,
  Send,
  BookOpen,
  FileText,
  CheckCircle,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const LearningPage = ({ setShowLearningPage }) => {
  const { user } = useUser();
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      sender: "ai",
      text: "Welcome to your AI learning assistant! What topic would you like to learn about today? You can also upload files (PDF, PPT, DOC, TXT) for me to analyze.",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [lastDocSummary, setLastDocSummary] = useState("");
  const [useFileContext, setUseFileContext] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: inputText,
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
    if (!file) return;

    setFiles((prev) => [...prev, file]);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: `Uploaded: ${file.name}`,
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
          id: Date.now(),
          sender: "ai",
          text: "Sorry, I couldn't process your file. Please try again.",
          timestamp: new Date(),
        },
      ]);
    }
    setIsLoading(false);
    setShowAnimation(false);
    fileInputRef.current.value = null;
  };

  // Helper function to format timestamps
  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(timestamp);
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
          <button
            onClick={() => setShowLearningPage(false)}
            className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 backdrop-blur-sm shadow-sm"
          >
            <Home size={18} />
            <span className="font-medium">Home</span>
          </button>
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
        {/* Document analysis card with improved styling */}
        {lastDocSummary && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl mb-6 shadow-sm border border-emerald-200 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="flex items-center mb-3">
              <FileText className="text-emerald-500 mr-2" size={20} />
              <h2 className="font-bold text-lg text-emerald-800">
                Document Analysis
              </h2>
            </div>
            <div className="prose prose-emerald max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {lastDocSummary}
              </ReactMarkdown>
            </div>
            {useFileContext && (
              <div className="mt-3 flex items-center text-sm text-emerald-600">
                <CheckCircle size={14} className="mr-1" />
                <span>Using this context for your questions</span>
              </div>
            )}
          </div>
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
              className={`max-w-md p-4 rounded-xl shadow-sm ${
                message.sender === "user"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                  : "bg-white border border-gray-200"
              } transform transition-all duration-300 hover:shadow-md`}
            >
              <div className="prose max-w-none">
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
  );
};

export default LearningPage;
