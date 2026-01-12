# EzStudyFrontend

## 📝 Description
EzStudy is an AI-powered learning platform that transforms the way students study and learn. Built with React and Express.js, it provides an intelligent learning console with AI-driven insights, personalized study plans, and smart document analysis capabilities.

## ✨ Features
- **AI Learning Assistant**: Interactive chatbot powered by Groq API for personalized learning support
- **Document Analysis**: Upload and analyze PDF, DOC, PPT files with AI-powered summarization
- **Chat History Persistence**: Save and restore conversations across sessions (localStorage)
- **User Authentication**: Secure login/signup with Clerk authentication
- **Responsive Design**: Modern, mobile-friendly interface built with Tailwind CSS with special optimizations for mobile
- **Smooth Navigation**: Elegant 1.5-second smooth scroll animation when clicking EzStudy logo
- **Gradient UI Effects**: Beautiful gradient color effects on EzStudy branding throughout the app
- **Mobile-Optimized AI Console**: Enhanced chat input with mobile-friendly options menu (Upload, Library Context, Compact Chat)
- **Cambria Math Typography**: Elegant serif fonts applied to key UI labels for premium feel
- **Real-time Chat**: Interactive learning conversations with markdown support
- **File Upload & Library**: Support for multiple document formats with local file management

## 🔧 Technologies Used
- **Frontend**: React (Functional Components), Vite, Tailwind CSS, Lucide React icons
- **Routing**: React Router DOM for SPA navigation
- **Backend Integration**: Express.js API integration with Groq AI
- **AI/ML**: Groq API (Llama 3.3 70B model) for chat completions and document analysis
- **Authentication**: Clerk for user management
- **Markdown Rendering**: React Markdown with GitHub Flavored Markdown support
- **Animations**: CSS animations (popOut, fadeIn, smooth scroll) and Tailwind transitions
- **State Management**: React Hooks (useState, useEffect, useRef, useContext)

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Setup Instructions

1. **Clone the repository**
```sh
git clone https://github.com/Atanu2k4/EzStudyFrontend.git
cd EzStudyFrontend
```

2. **Install dependencies**
```sh
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory with the following variables:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:3001
```

4. **Start the development server**
```sh
npm run dev
```

5. **Backend Setup** (in a separate terminal)
```sh
cd ../EzStudyBackend
npm install
npm run dev
```

## 🚀 Usage
1. Register/Login using the authentication modal
2. Click "Go to AI Learning Console" to access the main learning interface
3. Upload documents for AI analysis or start chatting with the AI assistant
4. Create multiple chat sessions and switch between them
5. Your chat history is automatically saved and restored

## 🤝 Contribution
We welcome contributions! Here's how you can contribute:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them
4. Push your changes to your fork
5. Submit a pull request

---

Built with ❤️ for the EzStudy learning platform. Updated as of January 12, 2026.

