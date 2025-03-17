import React, { useState, useRef, useEffect } from 'react';
import { useUser, UserButton } from '@clerk/clerk-react';
import { Home, Upload, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import DOMPurify from 'dompurify';

const LearningPage = ({ setShowLearningPage }) => {
  const { user } = useUser();
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      sender: 'ai',
      text: "Welcome to your AI learning assistant! What topic would you like to learn about today? You can also upload files for me to analyze.",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('https://ezstudybackend-1.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: inputText })
      });
      const data = await response.json();
      const aiResponse = {
        id: Date.now(),
        sender: 'ai',
        text: data.response || "I'm not sure how to respond to that.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorResponse = {
        id: Date.now(),
        sender: 'ai',
        text: "Sorry, I couldn't process your request. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    }
    setIsLoading(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFiles(prev => [...prev, file]);
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'user',
      text: `Uploaded: ${file.name}`,
      timestamp: new Date()
    }]);
    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://ezstudybackend-1.onrender.com/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'ai',
        text: data.summary || "I've analyzed your file, but couldn't generate a summary.",
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'ai',
        text: "Sorry, I couldn't process your file. Please try again.",
        timestamp: new Date()
      }]);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <button
            onClick={() => setShowLearningPage(false)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            <Home size={18} />
            <span className="font-medium">Home</span>
          </button>
          <h1 className="text-xl font-bold text-gray-800">AI Learning Assistant</h1>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 max-w-5xl mx-auto w-full">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-md p-4 rounded-xl ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
              <ReactMarkdown>{DOMPurify.sanitize(message.text)}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && <p className="text-gray-500">AI is typing...</p>}
        <div ref={messagesEndRef} />
      </div>
      <div className="bg-white border-t p-4">
        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 border rounded-full px-4 py-2"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full flex items-center"
            >
              <Upload size={18} />
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-full">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
